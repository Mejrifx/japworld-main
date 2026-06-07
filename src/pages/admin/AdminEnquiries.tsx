import { useState } from "react";
import { Mail, Phone, Building2, Car, Clock, Trash2, Eye, MessageSquare, Filter } from "lucide-react";
import { format } from "date-fns";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  useAllEnquiries,
  useUpdateEnquiry,
  useDeleteEnquiry,
  ENQUIRY_STATUS_LABELS,
  ENQUIRY_STATUS_COLORS,
} from "@/hooks/useEnquiries";
import type { EnquiryStatus } from "@/lib/database.types";

const AdminEnquiries = () => {
  const [statusFilter, setStatusFilter] = useState<EnquiryStatus | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const { data: enquiries = [], isLoading } = useAllEnquiries(
    statusFilter === "all" ? undefined : statusFilter
  );
  const updateEnquiry = useUpdateEnquiry();
  const deleteEnquiry = useDeleteEnquiry();

  const selectedEnquiry = enquiries.find((e) => e.id === selectedId);

  const handleStatusChange = async (id: string, status: EnquiryStatus) => {
    try {
      await updateEnquiry.mutateAsync({ id, status });
    } catch (error) {
      console.error("Error updating enquiry:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      await deleteEnquiry.mutateAsync(id);
      if (selectedId === id) setSelectedId(null);
    } catch (error) {
      console.error("Error deleting enquiry:", error);
    }
  };

  const handleAddNote = async (id: string, notes: string) => {
    try {
      await updateEnquiry.mutateAsync({ id, admin_notes: notes });
    } catch (error) {
      console.error("Error updating notes:", error);
    }
  };

  // Mark as read when viewing
  const handleView = async (id: string) => {
    setSelectedId(id);
    const enquiry = enquiries.find((e) => e.id === id);
    if (enquiry && enquiry.status === "new") {
      await handleStatusChange(id, "read");
    }
  };

  const newCount = enquiries.filter((e) => e.status === "new").length;

  return (
    <AdminLayout>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary/50 text-xs font-display tracking-widest mb-1">お問い合わせ</p>
            <h1 className="font-display text-3xl text-foreground">Enquiries</h1>
            <p className="text-muted-foreground mt-2">
              Manage customer enquiries and track responses
            </p>
          </div>
          {newCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-400/10 border border-blue-400/30 text-blue-400">
              <Mail className="h-4 w-4" />
              <span className="text-sm font-medium">{newCount} New</span>
            </div>
          )}
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6 flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Filter:</span>
        {(["all", "new", "read", "responded", "resolved"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 text-xs font-medium transition-all ${
              statusFilter === status
                ? "bg-primary/20 text-primary border border-primary/40"
                : "bg-card/40 text-muted-foreground border border-border/40 hover:bg-card/60"
            }`}
          >
            {status === "all" ? "All" : ENQUIRY_STATUS_LABELS[status as EnquiryStatus]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enquiries List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-48">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : enquiries.length === 0 ? (
            <div className="border-shoji bg-card/40 p-12 text-center">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-40" />
              <p className="text-muted-foreground">No enquiries found</p>
            </div>
          ) : (
            enquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                onClick={() => handleView(enquiry.id)}
                className={`border-shoji bg-card/40 p-5 cursor-pointer transition-all hover:bg-card/60 relative ${
                  selectedId === enquiry.id ? "ring-2 ring-primary/40" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-lg text-foreground">{enquiry.name}</h3>
                      {enquiry.status === "new" && (
                        <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {format(new Date(enquiry.created_at), "d MMM yyyy, HH:mm")}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium border ${
                      ENQUIRY_STATUS_COLORS[enquiry.status]
                    }`}
                  >
                    {ENQUIRY_STATUS_LABELS[enquiry.status]}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  {enquiry.company && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" />
                      {enquiry.company}
                    </div>
                  )}
                  {enquiry.vehicle_interest && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Car className="h-3.5 w-3.5" />
                      {enquiry.vehicle_interest}
                    </div>
                  )}
                  <p className="text-muted-foreground line-clamp-2 mt-2">
                    {enquiry.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Enquiry Detail */}
        <div className="sticky top-6">
          {selectedEnquiry ? (
            <div className="border-shoji bg-card/40 p-6 relative">
              <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-primary/40" />

              <div className="flex items-start justify-between mb-6">
                <h2 className="font-display text-2xl text-foreground">Enquiry Details</h2>
                <button
                  onClick={() => handleDelete(selectedEnquiry.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                  title="Delete enquiry"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                    Contact
                  </p>
                  <p className="text-foreground font-medium">{selectedEnquiry.name}</p>
                  {selectedEnquiry.company && (
                    <p className="text-sm text-muted-foreground">{selectedEnquiry.company}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <a
                      href={`mailto:${selectedEnquiry.email}`}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {selectedEnquiry.email}
                    </a>
                  </div>
                  {selectedEnquiry.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <a
                        href={`tel:${selectedEnquiry.phone}`}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {selectedEnquiry.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Vehicle Interest */}
              {selectedEnquiry.vehicle_interest && (
                <div className="mb-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                    Vehicle Interest
                  </p>
                  <p className="text-foreground">{selectedEnquiry.vehicle_interest}</p>
                </div>
              )}

              {/* Budget Range */}
              {selectedEnquiry.budget_range && (
                <div className="mb-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                    Budget Range
                  </p>
                  <p className="text-foreground">{selectedEnquiry.budget_range}</p>
                </div>
              )}

              {/* Message */}
              <div className="mb-6">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                  Message
                </p>
                <div className="bg-background/60 border border-border/40 p-4 text-sm text-foreground whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Status */}
              <div className="mb-6">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                  Status
                </p>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) =>
                    handleStatusChange(selectedEnquiry.id, e.target.value as EnquiryStatus)
                  }
                  className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                >
                  {(["new", "read", "responded", "resolved"] as const).map((status) => (
                    <option key={status} value={status}>
                      {ENQUIRY_STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Admin Notes */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                  Internal Notes
                </p>
                <textarea
                  value={selectedEnquiry.admin_notes || ""}
                  onChange={(e) => handleAddNote(selectedEnquiry.id, e.target.value)}
                  placeholder="Add internal notes about this enquiry..."
                  rows={4}
                  className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60 resize-none"
                />
              </div>

              {/* Timestamp */}
              <div className="mt-6 pt-6 border-t border-border/40 text-xs text-muted-foreground">
                <p>Received: {format(new Date(selectedEnquiry.created_at), "PPpp")}</p>
                {selectedEnquiry.updated_at !== selectedEnquiry.created_at && (
                  <p className="mt-1">
                    Updated: {format(new Date(selectedEnquiry.updated_at), "PPpp")}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="border-shoji bg-card/40 p-12 text-center">
              <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-40" />
              <p className="text-muted-foreground">Select an enquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEnquiries;
