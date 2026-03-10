import { Link } from "react-router-dom";
import { Car, ChevronRight } from "lucide-react";
import PortalLayout from "@/components/portal/PortalLayout";
import { useAuth } from "@/contexts/AuthContext";
import {
  useMyVehicles,
  VEHICLE_STATUS_LABELS,
  VEHICLE_STATUS_COLORS,
} from "@/hooks/usePortalData";
import type { VehicleStatus } from "@/lib/database.types";
import { format } from "date-fns";

const PortalVehicles = () => {
  const { clientId } = useAuth();
  const { data: vehicles = [], isLoading } = useMyVehicles(clientId);

  return (
    <PortalLayout>
      <div className="mb-8">
        <p className="text-primary/50 text-xs font-display tracking-widest mb-1">車両履歴</p>
        <h1 className="font-display text-3xl text-foreground">My Vehicles</h1>
        <p className="text-muted-foreground mt-2">
          All vehicles sourced and managed through JapWorld. Click a vehicle to view full
          documents.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : vehicles.length === 0 ? (
        <div className="border-shoji bg-card/40 p-12 text-center text-muted-foreground">
          No vehicles on your account yet.
        </div>
      ) : (
        <div className="space-y-3">
          {vehicles.map((v) => (
            <Link
              key={v.id}
              to={`/portal/vehicles/${v.id}`}
              className="relative group flex items-center gap-4 border-shoji bg-card/40 hover:bg-card/60 p-5 transition-all duration-200"
            >
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-r border-t border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l border-b border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <Car className="h-5 w-5 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="font-medium text-foreground truncate">{v.name}</p>
                  {v.chassis && (
                    <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5">
                      {v.chassis}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  {v.make && <span>{v.make}</span>}
                  {v.model && <span>{v.model}</span>}
                  {v.year && <span>{v.year}</span>}
                  {v.colour && <span>{v.colour}</span>}
                  <span>Added {format(new Date(v.created_at), "d MMM yyyy")}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span
                  className={`hidden sm:inline-flex items-center px-2.5 py-0.5 text-xs font-medium border ${
                    VEHICLE_STATUS_COLORS[v.status as VehicleStatus]
                  }`}
                >
                  {VEHICLE_STATUS_LABELS[v.status as VehicleStatus]}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </PortalLayout>
  );
};

export default PortalVehicles;
