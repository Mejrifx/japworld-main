import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  useAllVehicles,
  useUpdateVehicleStatus,
  formatCurrency,
  VEHICLE_STATUS_LABELS,
  VEHICLE_STATUS_COLORS,
} from "@/hooks/usePortalData";
import type { VehicleStatus } from "@/lib/database.types";
import { format } from "date-fns";

const VEHICLE_STATUSES: VehicleStatus[] = ["in_yard", "waiting_booking", "loaded", "on_ship"];

const AdminVehicles = () => {
  const { data: vehicles = [], isLoading } = useAllVehicles();
  const updateStatus = useUpdateVehicleStatus();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<VehicleStatus | "all">("all");

  const filtered = vehicles.filter((v) => {
    const matchSearch =
      !search ||
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      (v.chassis ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (v.clients?.company_name ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || v.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statusCounts = vehicles.reduce<Record<string, number>>((acc, v) => {
    acc[v.status] = (acc[v.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <AdminLayout>
      <div className="mb-8">
        <p className="text-primary/50 text-xs font-display tracking-widest mb-1">在庫管理</p>
        <h1 className="font-display text-3xl text-foreground">Vehicles & Stock</h1>
        <p className="text-muted-foreground mt-1">All vehicles across all clients. Update status here.</p>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-4 py-2 text-sm font-medium border transition-all duration-200 ${
            filterStatus === "all"
              ? "bg-primary/10 border-primary/20 text-primary"
              : "border-border/50 text-muted-foreground hover:text-foreground"
          }`}
        >
          All ({vehicles.length})
        </button>
        {VEHICLE_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-4 py-2 text-sm font-medium border transition-all duration-200 ${
              filterStatus === s
                ? `${VEHICLE_STATUS_COLORS[s]} border`
                : "border-border/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            {VEHICLE_STATUS_LABELS[s]} ({statusCounts[s] ?? 0})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by vehicle name, chassis, or client…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-card/40 border border-border/60 text-foreground placeholder-muted-foreground pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="border-shoji bg-card/40 p-12 text-center text-muted-foreground">
          No vehicles found.
        </div>
      ) : (
        <div className="border-shoji bg-card/40 relative overflow-hidden">
          <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  {["Vehicle", "Client", "Chassis", "Status", "Last Updated", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-widest font-normal whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((v) => (
                  <tr key={v.id} className="border-b border-border/20 last:border-0 hover:bg-card/40 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-foreground font-medium">{v.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {v.make && `${v.make} `}{v.model}{v.year && ` (${v.year})`}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {v.clients ? (
                        <Link
                          to={`/admin/clients/${v.client_id}`}
                          className="hover:text-primary transition-colors"
                        >
                          {v.clients.company_name}
                        </Link>
                      ) : "—"}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{v.chassis ?? "—"}</td>
                    <td className="px-5 py-4">
                      <select
                        value={v.status}
                        onChange={(e) =>
                          updateStatus.mutate({
                            id: v.id,
                            status: e.target.value as VehicleStatus,
                            clientId: v.client_id,
                          })
                        }
                        className={`bg-background/60 border px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary/60 ${VEHICLE_STATUS_COLORS[v.status as VehicleStatus]}`}
                      >
                        {VEHICLE_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {VEHICLE_STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground whitespace-nowrap">
                      {format(new Date(v.status_updated_at), "d MMM yyyy")}
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        to={`/admin/clients/${v.client_id}`}
                        className="text-xs text-primary hover:underline"
                      >
                        View client →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminVehicles;
