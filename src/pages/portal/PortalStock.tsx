import { Link } from "react-router-dom";
import { Ship, ChevronRight } from "lucide-react";
import PortalLayout from "@/components/portal/PortalLayout";
import { useAuth } from "@/contexts/AuthContext";
import {
  useMyVehicles,
  VEHICLE_STATUS_LABELS,
  VEHICLE_STATUS_COLORS,
} from "@/hooks/usePortalData";
import type { VehicleStatus } from "@/lib/database.types";
import { format } from "date-fns";

const STATUS_ORDER: VehicleStatus[] = ["in_yard", "waiting_booking", "loaded", "on_ship"];

const STATUS_ICONS: Record<VehicleStatus, string> = {
  in_yard: "🏭",
  waiting_booking: "📋",
  loaded: "📦",
  on_ship: "🚢",
};

const PortalStock = () => {
  const { clientId } = useAuth();
  const { data: vehicles = [], isLoading } = useMyVehicles(clientId);

  const statusCounts = vehicles.reduce<Record<string, number>>((acc, v) => {
    acc[v.status] = (acc[v.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <PortalLayout>
      <div className="mb-8">
        <p className="text-primary/50 text-xs font-display tracking-widest mb-1">在庫状況</p>
        <h1 className="font-display text-3xl text-foreground">Current Stock</h1>
        <p className="text-muted-foreground mt-2">
          Live status of all your vehicles from yard to destination.
        </p>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATUS_ORDER.map((s) => (
          <div key={s} className="border-shoji bg-card/40 p-5 relative">
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-primary/40" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r border-t border-primary/40" />
            <p className="text-xl mb-2">{STATUS_ICONS[s]}</p>
            <p
              className={`inline-flex items-center px-2 py-0.5 text-xs font-medium border mb-3 ${VEHICLE_STATUS_COLORS[s]}`}
            >
              {VEHICLE_STATUS_LABELS[s]}
            </p>
            <p className="font-display text-3xl text-foreground">{statusCounts[s] ?? 0}</p>
            <p className="text-xs text-muted-foreground mt-1">
              vehicle{(statusCounts[s] ?? 0) !== 1 ? "s" : ""}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />

      {/* Grouped by status */}
      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : vehicles.length === 0 ? (
        <div className="border-shoji bg-card/40 p-12 text-center text-muted-foreground">
          No vehicles currently in your stock.
        </div>
      ) : (
        <div className="space-y-8">
          {STATUS_ORDER.map((s) => {
            const group = vehicles.filter((v) => v.status === s);
            if (group.length === 0) return null;
            return (
              <div key={s}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg">{STATUS_ICONS[s]}</span>
                  <h2 className="font-display text-lg text-foreground">
                    {VEHICLE_STATUS_LABELS[s]}
                  </h2>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 text-xs font-medium border ${VEHICLE_STATUS_COLORS[s]}`}
                  >
                    {group.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {group.map((v) => (
                    <Link
                      key={v.id}
                      to={`/portal/vehicles/${v.id}`}
                      className="relative group flex items-center gap-4 border-shoji bg-card/30 hover:bg-card/60 px-5 py-4 transition-all duration-200"
                    >
                      <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 border-r border-t border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l border-b border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm">{v.name}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-0.5">
                          {v.chassis && <span>Chassis: {v.chassis}</span>}
                          {v.make && <span>{v.make}</span>}
                          {v.model && <span>{v.model}</span>}
                          {v.year && <span>{v.year}</span>}
                          <span>
                            Status updated{" "}
                            {format(new Date(v.status_updated_at), "d MMM yyyy")}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200 flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info note */}
      <div className="mt-8 border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <Ship className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-foreground font-medium mb-1">Status updates</p>
            <p className="text-xs text-muted-foreground">
              Status is updated manually by the JapWorld team. Click any vehicle to see its full
              timeline and documents. Contact us if you have questions about a specific vehicle.
            </p>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default PortalStock;
