import { Link } from "react-router-dom";
import { Users, Car, ChevronRight } from "lucide-react";
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
      <div className="mb-8">
        <p className="text-primary/50 text-xs font-display tracking-widest mb-1">ダッシュボード</p>
        <h1 className="font-display text-3xl text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of all clients and vehicles.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="border-shoji bg-card/40 p-5 relative">
          <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-primary/40" />
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-primary/60" />
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Clients</p>
          </div>
          <p className="font-display text-3xl text-foreground">{clients.length}</p>
        </div>

        <div className="border-shoji bg-card/40 p-5 relative">
          <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-primary/40" />
          <div className="flex items-center gap-2 mb-3">
            <Car className="h-4 w-4 text-primary/60" />
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Vehicles</p>
          </div>
          <p className="font-display text-3xl text-foreground">{vehicles.length}</p>
        </div>

        {STATUS_ORDER.slice(0, 2).map((s) => (
          <div key={s} className="border-shoji bg-card/40 p-5 relative">
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-primary/40" />
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
              {VEHICLE_STATUS_LABELS[s]}
            </p>
            <p className="font-display text-3xl text-foreground">{statusCounts[s] ?? 0}</p>
          </div>
        ))}
      </div>

      {/* Stock breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="border-shoji bg-card/40 p-6 relative">
          <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
          <h2 className="font-display text-lg text-foreground mb-4">Stock by Status</h2>
          <div className="space-y-3">
            {STATUS_ORDER.map((s) => {
              const count = statusCounts[s] ?? 0;
              const pct = vehicles.length > 0 ? (count / vehicles.length) * 100 : 0;
              return (
                <div key={s}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{VEHICLE_STATUS_LABELS[s]}</span>
                    <span className="text-foreground font-medium">{count}</span>
                  </div>
                  <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary/60 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent vehicles */}
        <div className="border-shoji bg-card/40 p-6 relative">
          <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg text-foreground">Recent Vehicles</h2>
            <Link to="/admin/vehicles" className="text-xs text-primary hover:underline">
              View all →
            </Link>
          </div>
          {recentVehicles.length === 0 ? (
            <p className="text-muted-foreground text-sm">No vehicles yet.</p>
          ) : (
            <div className="space-y-3">
              {recentVehicles.map((v) => (
                <div key={v.id} className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0 text-sm">
                  <div>
                    <p className="text-foreground">{v.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {v.clients?.company_name} &bull; {format(new Date(v.created_at), "d MMM yyyy")}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {VEHICLE_STATUS_LABELS[v.status as VehicleStatus]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent clients */}
      <div className="border-shoji bg-card/40 p-6 relative">
        <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg text-foreground">Recent Clients</h2>
          <Link to="/admin/clients" className="text-xs text-primary hover:underline">
            View all →
          </Link>
        </div>
        {recentClients.length === 0 ? (
          <p className="text-muted-foreground text-sm">No clients yet.</p>
        ) : (
          <div className="space-y-2">
            {recentClients.map((c) => (
              <Link
                key={c.id}
                to={`/admin/clients/${c.id}`}
                className="flex items-center justify-between py-3 px-4 hover:bg-card/60 border border-transparent hover:border-border/50 transition-all duration-200"
              >
                <div>
                  <p className="text-sm text-foreground font-medium">{c.company_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.contact_name} &bull; {c.email}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
