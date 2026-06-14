import { Link } from "react-router-dom";
import { Users, User, Car, ChevronRight, TrendingUp, Warehouse, Clock, Package, Ship } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  useAllClients,
  useAllVehicles,
  useFormatCurrency,
  VEHICLE_STATUS_LABELS,
} from "@/hooks/usePortalData";
import type { VehicleStatus } from "@/lib/database.types";
import { format } from "date-fns";

const STATUS_ORDER: VehicleStatus[] = ["in_yard", "waiting_booking", "loaded", "on_ship"];

// Icon mapping for vehicle statuses
const STATUS_ICONS: Record<VehicleStatus, typeof Warehouse> = {
  in_yard: Warehouse,
  waiting_booking: Clock,
  loaded: Package,
  on_ship: Ship,
};

const AdminDashboard = () => {
  const { data: clients = [] } = useAllClients();
  const { data: vehicles = [] } = useAllVehicles();

  const statusCounts = vehicles.reduce<Record<string, number>>((acc, v) => {
    acc[v.status] = (acc[v.status] ?? 0) + 1;
    return acc;
  }, {});

  const recentClients = [...clients]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const recentVehicles = [...vehicles]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <AdminLayout>
      {/* Page header with breadcrumb */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-metric-pulse" />
          <span className="text-xs font-semibold text-primary/80 tracking-widest uppercase">Admin Overview</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground tracking-tight mb-2">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Monitor operations, track inventory, and manage client accounts.
        </p>
      </div>

      {/* Key Metrics Grid - Enhanced with better hierarchy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 animate-slide-up-fade">
        {/* Total Clients */}
        <div className="metric-card group cursor-pointer" role="button" tabIndex={0}>
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center ring-4 ring-primary/5 group-hover:ring-primary/15 transition-all duration-300">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs font-semibold">Active</span>
            </div>
          </div>
          <div>
            <p className="text-4xl font-bold text-foreground mb-1 tracking-tight">{clients.length}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Total Clients</p>
          </div>
        </div>

        {/* Total Vehicles */}
        <div className="metric-card group cursor-pointer" role="button" tabIndex={0}>
          <div className="flex items-start justify-between mb-5">
            <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center ring-4 ring-secondary/5 group-hover:ring-secondary/15 transition-all duration-300">
              <Car className="h-6 w-6 text-secondary" />
            </div>
          </div>
          <div>
            <p className="text-4xl font-bold text-foreground mb-1 tracking-tight">{vehicles.length}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Total Vehicles</p>
          </div>
        </div>

        {/* Status Cards - In Yard & Waiting Booking */}
        {STATUS_ORDER.slice(0, 2).map((s, index) => {
          const StatusIcon = STATUS_ICONS[s];
          const count = statusCounts[s] ?? 0;
          const colorClasses = index === 0 ? 'bg-blue-500/10 text-blue-600 ring-blue-500/5 group-hover:ring-blue-500/15' : 'bg-amber-500/10 text-amber-600 ring-amber-500/5 group-hover:ring-amber-500/15';
          
          return (
            <div
              key={s}
              className="metric-card group cursor-pointer"
              role="button"
              tabIndex={0}
            >
              <div className="flex items-start mb-5">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ring-4 transition-all duration-300 ${colorClasses}`}>
                  <StatusIcon className="h-6 w-6" />
                </div>
              </div>
              <div>
                <p className="text-4xl font-bold text-foreground mb-1 tracking-tight">{count}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  {VEHICLE_STATUS_LABELS[s]}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid - Side by side sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Stock by Status - Enhanced visualization */}
        <div className="bg-card rounded-xl border border-border p-7 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">Inventory Status</h2>
            <span className="text-xs text-muted-foreground font-medium">{vehicles.length} total</span>
          </div>
          <div className="space-y-6">
            {STATUS_ORDER.map((s, index) => {
              const count = statusCounts[s] ?? 0;
              const pct = vehicles.length > 0 ? (count / vehicles.length) * 100 : 0;
              const StatusIcon = STATUS_ICONS[s];
              
              return (
                <div key={s} className="group">
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <StatusIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground font-semibold">
                          {VEHICLE_STATUS_LABELS[s]}
                        </span>
                        <span className="text-foreground font-bold tabular-nums">
                          {count} <span className="text-xs text-muted-foreground font-normal">({pct.toFixed(0)}%)</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden ml-11">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${pct}%`, animationDelay: `${index * 0.1}s` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {vehicles.length === 0 && (
            <div className="text-center py-12">
              <Car className="h-16 w-16 text-muted-foreground/20 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No vehicles in inventory</p>
            </div>
          )}
        </div>

        {/* Recent Vehicles - Enhanced list */}
        <div className="bg-card rounded-xl border border-border p-7 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">Recent Vehicles</h2>
            <Link
              to="/admin/vehicles"
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-semibold transition-colors group"
            >
              <span>View all</span>
              <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>
          {recentVehicles.length === 0 ? (
            <div className="text-center py-16">
              <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-muted-foreground/30" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">No vehicles yet</p>
              <p className="text-xs text-muted-foreground mt-1">Add your first vehicle to get started</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentVehicles.map((v, index) => (
                <Link
                  key={v.id}
                  to={`/admin/clients`}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group animate-fade-in"
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                >
                  <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Car className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {v.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {v.clients?.company_name} · {format(new Date(v.created_at), "MMM d, yyyy")}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="status-badge text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {VEHICLE_STATUS_LABELS[v.status as VehicleStatus]}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Clients - Enhanced with better visual hierarchy */}
      <div className="bg-card rounded-xl border border-border p-7 animate-slide-up-fade" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">Recent Clients</h2>
          <Link
            to="/admin/clients"
            className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-semibold transition-colors group"
          >
            <span>View all</span>
            <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>
        {recentClients.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-muted-foreground/30" />
            </div>
            <p className="text-sm text-muted-foreground font-medium">No clients yet</p>
            <p className="text-xs text-muted-foreground mt-1">Add your first client to get started</p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentClients.map((c, index) => (
              <Link
                key={c.id}
                to={`/admin/clients/${c.id}`}
                className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group animate-fade-in"
                style={{ animationDelay: `${0.4 + index * 0.05}s` }}
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {c.company_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {c.contact_name} · Joined {format(new Date(c.created_at), "MMM d, yyyy")}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
