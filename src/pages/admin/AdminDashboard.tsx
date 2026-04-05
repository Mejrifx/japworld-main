import { Link } from "react-router-dom";
import { Users, Car, ChevronRight, TrendingUp, Warehouse, Clock, Package, Ship } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  useAllClients,
  useAllVehicles,
  formatCurrency,
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
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          <span className="text-xs font-semibold text-primary tracking-wider uppercase">Overview</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm font-medium">
          Manage clients, track vehicles, and monitor operations.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-xl p-6 border border-border/50 card-shadow hover:card-shadow-hover transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
              <TrendingUp className="h-3 w-3" />
              <span>Active</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">{clients.length}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Clients</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border/50 card-shadow hover:card-shadow-hover transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Car className="h-5 w-5 text-primary" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">{vehicles.length}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Vehicles</p>
        </div>

        {STATUS_ORDER.slice(0, 2).map((s) => {
          const StatusIcon = STATUS_ICONS[s];
          return (
            <div
              key={s}
              className="bg-card rounded-xl p-6 border border-border/50 card-shadow hover:card-shadow-hover transition-all duration-300"
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <StatusIcon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{statusCounts[s] ?? 0}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                {VEHICLE_STATUS_LABELS[s]}
              </p>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Stock by Status */}
        <div className="bg-card rounded-xl p-6 border border-border/50 card-shadow">
          <h2 className="text-lg font-bold text-foreground mb-6">Stock by Status</h2>
          <div className="space-y-5">
            {STATUS_ORDER.map((s) => {
              const count = statusCounts[s] ?? 0;
              const pct = vehicles.length > 0 ? (count / vehicles.length) * 100 : 0;
              return (
                <div key={s}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-foreground font-semibold">
                      {VEHICLE_STATUS_LABELS[s]}
                    </span>
                    <span className="text-muted-foreground">
                      {count} <span className="text-xs">({pct.toFixed(0)}%)</span>
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Vehicles */}
        <div className="bg-card rounded-xl p-6 border border-border/50 card-shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">Recent Vehicles</h2>
            <Link
              to="/admin/vehicles"
              className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            >
              View all →
            </Link>
          </div>
          {recentVehicles.length === 0 ? (
            <div className="text-center py-12">
              <Car className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No vehicles yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {recentVehicles.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{v.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {v.clients?.company_name} · {format(new Date(v.created_at), "MMM d")}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-primary/70 bg-primary/5 px-2 py-1 rounded-md ml-3">
                    {VEHICLE_STATUS_LABELS[v.status as VehicleStatus]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Clients */}
      <div className="bg-card rounded-xl p-6 border border-border/50 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">Recent Clients</h2>
          <Link
            to="/admin/clients"
            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View all →
          </Link>
        </div>
        {recentClients.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No clients yet</p>
          </div>
        ) : (
          <div className="space-y-1">
            {recentClients.map((c) => (
              <Link
                key={c.id}
                to={`/admin/clients/${c.id}`}
                className="flex items-center justify-between py-4 px-4 rounded-lg hover:bg-muted/50 transition-all duration-200 group"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">
                      {c.company_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {c.company_name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {c.contact_name} · {c.email}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-3" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
