import { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Image,
  FileSpreadsheet,
  FileText,
  File,
  Download,
  ExternalLink,
} from "lucide-react";
import PortalLayout from "@/components/portal/PortalLayout";
import {
  useVehicle,
  useVehicleDocuments,
  useVehicleStatusHistory,
  useSignedDocumentUrl,
  VEHICLE_STATUS_LABELS,
  VEHICLE_STATUS_COLORS,
} from "@/hooks/usePortalData";
import type { DocumentType, VehicleStatus } from "@/lib/database.types";
import { format } from "date-fns";

const DOC_TYPE_TABS: { key: DocumentType | "all"; label: string }[] = [
  { key: "all", label: "All Documents" },
  { key: "photo", label: "Photos" },
  { key: "auction_sheet", label: "Auction Sheets" },
  { key: "invoice", label: "Invoices" },
  { key: "other", label: "Other" },
];

const DOC_ICONS: Record<DocumentType, typeof File> = {
  photo: Image,
  auction_sheet: FileSpreadsheet,
  invoice: FileText,
  other: File,
};

const PortalVehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: vehicle, isLoading: vehicleLoading } = useVehicle(id);
  const { data: documents = [], isLoading: docsLoading } = useVehicleDocuments(id);
  const { data: statusHistory = [] } = useVehicleStatusHistory(id);
  const getSignedUrl = useSignedDocumentUrl();

  const [activeTab, setActiveTab] = useState<DocumentType | "all">("all");

  const filteredDocs =
    activeTab === "all" ? documents : documents.filter((d) => d.document_type === activeTab);

  const handleOpenDoc = useCallback(
    async (storagePath: string) => {
      const url = await getSignedUrl(storagePath);
      if (url) window.open(url, "_blank");
    },
    [getSignedUrl]
  );

  const STATUS_ORDER: VehicleStatus[] = ["in_yard", "waiting_booking", "loaded", "on_ship"];

  if (vehicleLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center h-48">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </PortalLayout>
    );
  }

  if (!vehicle) {
    return (
      <PortalLayout>
        <div className="text-center py-20 text-muted-foreground">Vehicle not found.</div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="mb-6">
        <Link
          to="/portal/vehicles"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Vehicles
        </Link>

        <div className="flex flex-wrap items-start gap-4 justify-between">
          <div>
            <p className="text-primary/50 text-xs font-display tracking-widest mb-1">車両詳細</p>
            <h1 className="font-display text-3xl text-foreground">{vehicle.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-2">
              {vehicle.chassis && <span>Chassis: {vehicle.chassis}</span>}
              {vehicle.make && <span>{vehicle.make}</span>}
              {vehicle.model && <span>{vehicle.model}</span>}
              {vehicle.year && <span>{vehicle.year}</span>}
              {vehicle.colour && <span>{vehicle.colour}</span>}
            </div>
          </div>
          <span
            className={`inline-flex items-center px-3 py-1 text-sm font-medium border ${
              VEHICLE_STATUS_COLORS[vehicle.status as VehicleStatus]
            }`}
          >
            {VEHICLE_STATUS_LABELS[vehicle.status as VehicleStatus]}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Documents section */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1 mb-4 border-b border-border/50 pb-3">
            {DOC_TYPE_TABS.map(({ key, label }) => {
              const count =
                key === "all"
                  ? documents.length
                  : documents.filter((d) => d.document_type === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    activeTab === key
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                  {count > 0 && (
                    <span className="ml-1.5 text-xs opacity-70">({count})</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Document list */}
          {docsLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : filteredDocs.length === 0 ? (
            <div className="border-shoji bg-card/40 p-12 text-center text-muted-foreground">
              No documents in this category yet.
            </div>
          ) : (
            <div className="space-y-2">
              {filteredDocs.map((doc) => {
                const Icon = DOC_ICONS[doc.document_type as DocumentType] ?? File;
                return (
                  <div
                    key={doc.id}
                    className="flex items-center gap-4 border-shoji bg-card/40 hover:bg-card/60 px-5 py-4 transition-all duration-200"
                  >
                    <div className="h-10 w-10 rounded bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{doc.display_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.document_type.replace("_", " ")} &bull;{" "}
                        {format(new Date(doc.created_at), "d MMM yyyy")}
                      </p>
                    </div>
                    <button
                      onClick={() => handleOpenDoc(doc.storage_path)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-primary hover:bg-primary/10 border border-primary/20 transition-all duration-200 flex-shrink-0"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Open
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Status history sidebar */}
        <div>
          <div className="border-shoji bg-card/40 p-6 relative">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
            <h3 className="font-display text-base text-foreground mb-5">Status Timeline</h3>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-3 top-0 bottom-0 w-px bg-border/50" />

              <div className="space-y-4">
                {STATUS_ORDER.map((s) => {
                  const historyEntry = statusHistory.find((h) => h.status === s);
                  const isCurrent = vehicle.status === s;
                  const isPast =
                    historyEntry &&
                    STATUS_ORDER.indexOf(s) <= STATUS_ORDER.indexOf(vehicle.status as VehicleStatus);

                  return (
                    <div key={s} className="relative flex items-start gap-3 pl-8">
                      {/* Dot */}
                      <div
                        className={`absolute left-0 top-1 h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                          isCurrent
                            ? "border-primary bg-primary/20"
                            : isPast
                            ? "border-primary/60 bg-primary/10"
                            : "border-border bg-muted/20"
                        }`}
                      >
                        {isCurrent && (
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        )}
                        {!isCurrent && isPast && (
                          <div className="h-2 w-2 rounded-full bg-primary/50" />
                        )}
                      </div>

                      <div>
                        <p
                          className={`text-sm font-medium ${
                            isCurrent
                              ? "text-primary"
                              : isPast
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {VEHICLE_STATUS_LABELS[s]}
                        </p>
                        {historyEntry && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {format(new Date(historyEntry.changed_at), "d MMM yyyy")}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {vehicle.notes && (
            <div className="border-shoji bg-card/40 p-5 mt-4">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Notes</p>
              <p className="text-sm text-muted-foreground">{vehicle.notes}</p>
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  );
};

export default PortalVehicleDetail;
