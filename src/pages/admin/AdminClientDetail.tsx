import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Check,
  X,
  Upload,
  Trash2,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  useClientById,
  useClientTransactions,
  useClientInvoices,
  useClientVehicles,
  useVehicleDocuments,
  useProfileByClientId,
  useUpdateClient,
  useRecordPayment,
  useCreateInvoice,
  useUpdateInvoiceStatus,
  useDeleteInvoice,
  useCreateVehicle,
  useUpdateVehicleStatus,
  useUpdateVehicle,
  useDeleteVehicle,
  useUploadVehicleDocument,
  useDeleteVehicleDocument,
  useSignedDocumentUrl,
  computeBalance,
  computeOutstanding,
  formatCurrency,
  VEHICLE_STATUS_LABELS,
  VEHICLE_STATUS_COLORS,
  INVOICE_STATUS_LABELS,
  INVOICE_STATUS_COLORS,
} from "@/hooks/usePortalData";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import type {
  VehicleStatus,
  InvoiceStatus,
  DocumentType,
} from "@/lib/database.types";
import { format } from "date-fns";

type Tab = "account" | "finance" | "invoices" | "vehicles";
type DocType = DocumentType | "all";

const VEHICLE_STATUSES: VehicleStatus[] = ["in_yard", "waiting_booking", "loaded", "on_ship"];
const INVOICE_STATUSES: InvoiceStatus[] = ["draft", "issued", "paid", "partially_paid", "overdue"];
const DOC_TYPES: DocumentType[] = ["photo", "auction_sheet", "invoice", "other"];

// ─── Inline field edit ───────────────────────────────────
function InlineEdit({
  value,
  onSave,
  placeholder,
}: {
  value: string;
  onSave: (v: string) => void;
  placeholder?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  if (editing) {
    return (
      <span className="inline-flex items-center gap-1">
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="bg-background/60 border border-primary/40 text-foreground px-2 py-0.5 text-sm focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSave(draft);
              setEditing(false);
            }
            if (e.key === "Escape") setEditing(false);
          }}
        />
        <button onClick={() => { onSave(draft); setEditing(false); }} className="text-emerald-400 hover:text-emerald-300">
          <Check className="h-3.5 w-3.5" />
        </button>
        <button onClick={() => setEditing(false)} className="text-muted-foreground hover:text-foreground">
          <X className="h-3.5 w-3.5" />
        </button>
      </span>
    );
  }
  return (
    <button
      onClick={() => { setDraft(value); setEditing(true); }}
      className="group inline-flex items-center gap-1 text-foreground hover:text-primary transition-colors"
    >
      {value || <span className="text-muted-foreground">{placeholder ?? "—"}</span>}
      <Pencil className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
    </button>
  );
}

// ─── Vehicle documents sub-panel ─────────────────────────
function VehicleDocPanel({ vehicleId, clientId }: { vehicleId: string; clientId: string }) {
  const { data: docs = [] } = useVehicleDocuments(vehicleId);
  const upload = useUploadVehicleDocument();
  const deleteMut = useDeleteVehicleDocument();
  const getSignedUrl = useSignedDocumentUrl();

  const fileRef = useRef<HTMLInputElement>(null);
  const [docType, setDocType] = useState<DocumentType>("photo");
  const [displayName, setDisplayName] = useState("");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setUploadError(null);
    try {
      await upload.mutateAsync({
        vehicleId,
        clientId,
        file,
        documentType: docType,
        displayName: displayName || file.name,
      });
      setDisplayName("");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    }
  };

  const handleOpen = async (path: string) => {
    const url = await getSignedUrl(path);
    if (url) window.open(url, "_blank");
  };

  return (
    <div className="border border-border/40 bg-card/20 p-4 mt-3">
      {/* Upload form */}
      <form onSubmit={handleUpload} className="flex flex-wrap items-end gap-3 mb-4">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Type</label>
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value as DocumentType)}
            className="bg-background/60 border border-border/60 text-foreground px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary/60"
          >
            {DOC_TYPES.map((t) => (
              <option key={t} value={t}>
                {t.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Display name</label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Leave blank to use filename"
            className="bg-background/60 border border-border/60 text-foreground px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary/60 w-52"
          />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">File</label>
          <input
            ref={fileRef}
            type="file"
            required
            className="text-xs text-muted-foreground file:mr-2 file:py-1 file:px-3 file:border file:border-border/60 file:bg-card/60 file:text-foreground file:text-xs"
          />
        </div>
        <button
          type="submit"
          disabled={upload.isPending}
          className="flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary px-3 py-1.5 text-xs font-medium transition-all disabled:opacity-50"
        >
          <Upload className="h-3.5 w-3.5" />
          {upload.isPending ? "Uploading…" : "Upload"}
        </button>
      </form>
      {uploadError && (
        <p className="text-xs text-destructive mb-3">{uploadError}</p>
      )}

      {docs.length === 0 ? (
        <p className="text-xs text-muted-foreground">No documents yet.</p>
      ) : (
        <div className="space-y-1.5">
          {docs.map((d) => (
            <div key={d.id} className="flex items-center gap-3 text-xs py-1.5 border-b border-border/20 last:border-0">
              <span className="text-muted-foreground capitalize w-20 flex-shrink-0">
                {d.document_type.replace("_", " ")}
              </span>
              <span className="flex-1 text-foreground truncate">{d.display_name}</span>
              <span className="text-muted-foreground hidden sm:block">
                {format(new Date(d.created_at), "d MMM yyyy")}
              </span>
              <button
                onClick={() => handleOpen(d.storage_path)}
                className="text-primary hover:text-primary/80 transition-colors flex-shrink-0"
                title="Open"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() =>
                  deleteMut.mutate({ id: d.id, vehicleId, storagePath: d.storage_path })
                }
                className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                title="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────
const AdminClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const qc = useQueryClient();
  const { data: client, isLoading } = useClientById(id);
  const { data: profile } = useProfileByClientId(id);
  const { data: transactions = [] } = useClientTransactions(id);
  const { data: invoices = [] } = useClientInvoices(id);
  const { data: vehicles = [] } = useClientVehicles(id);

  const updateClient = useUpdateClient();
  const recordPayment = useRecordPayment();
  const createInvoice = useCreateInvoice();
  const updateInvoiceStatus = useUpdateInvoiceStatus();
  const deleteInvoice = useDeleteInvoice();
  const createVehicle = useCreateVehicle();
  const updateVehicleStatus = useUpdateVehicleStatus();
  const updateVehicle = useUpdateVehicle();
  const deleteVehicle = useDeleteVehicle();

  const [activeTab, setActiveTab] = useState<Tab>("account");
  const [expandedVehicles, setExpandedVehicles] = useState<Set<string>>(new Set());

  // Delete confirmations
  const [invoiceToDelete, setInvoiceToDelete] = useState<{ id: string; description: string } | null>(null);
  const [vehicleToDelete, setVehicleToDelete] = useState<{ id: string; name: string } | null>(null);
  const [vehicleDocsToDelete, setVehicleDocsToDelete] = useState<{ id: string; storage_path: string }[]>([]);

  // Finance forms
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    description: "",
    reference: "",
    invoice_id: "",
  });
  const [invoiceForm, setInvoiceForm] = useState({
    amount: "",
    description: "",
    due_date: "",
    invoice_number: "",
  });
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [invoiceError, setInvoiceError] = useState<string | null>(null);

  // Vehicle form
  const [vehicleForm, setVehicleForm] = useState({
    name: "",
    chassis: "",
    make: "",
    model: "",
    year: "",
    colour: "",
    status: "in_yard" as VehicleStatus,
    notes: "",
  });
  const [vehicleError, setVehicleError] = useState<string | null>(null);
  const [showVehicleForm, setShowVehicleForm] = useState(false);

  // Create client portal login
  const [loginForm, setLoginForm] = useState<{ email: string; password: string }>({ email: "", password: "" });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const emailInitialized = useRef(false);

  // Initialize email from client record when showing the form (no profile = no login yet)
  useEffect(() => {
    if (client?.email && !profile && !emailInitialized.current) {
      setLoginForm((f) => ({ ...f, email: client.email }));
      emailInitialized.current = true;
    }
  }, [client?.email, profile]);

  const balance = computeBalance(transactions);
  const outstanding = computeOutstanding(invoices);

  const tabs: { key: Tab; label: string }[] = [
    { key: "account", label: "Account Info" },
    { key: "finance", label: "Balance & Payments" },
    { key: "invoices", label: "Invoices" },
    { key: "vehicles", label: "Vehicles & Docs" },
  ];

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);
    const cents = Math.round(parseFloat(paymentForm.amount) * 100);
    if (!cents || isNaN(cents)) { setPaymentError("Enter a valid amount."); return; }
    try {
      await recordPayment.mutateAsync({
        client_id: id!,
        amount_cents: cents,
        description: paymentForm.description || "Payment received",
        reference: paymentForm.reference || undefined,
        invoice_id: paymentForm.invoice_id || undefined,
      });
      setPaymentForm({ amount: "", description: "", reference: "", invoice_id: "" });
    } catch (err: unknown) {
      setPaymentError(err instanceof Error ? err.message : "Failed.");
    }
  };

  const handleInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setInvoiceError(null);
    const cents = Math.round(parseFloat(invoiceForm.amount) * 100);
    if (!cents || isNaN(cents)) { setInvoiceError("Enter a valid amount."); return; }
    try {
      await createInvoice.mutateAsync({
        client_id: id!,
        amount_cents: cents,
        description: invoiceForm.description,
        due_date: invoiceForm.due_date || undefined,
        invoice_number: invoiceForm.invoice_number || undefined,
        status: "issued",
      });
      setInvoiceForm({ amount: "", description: "", due_date: "", invoice_number: "" });
    } catch (err: unknown) {
      setInvoiceError(err instanceof Error ? err.message : "Failed.");
    }
  };

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    setVehicleError(null);
    try {
      await createVehicle.mutateAsync({
        client_id: id!,
        name: vehicleForm.name,
        chassis: vehicleForm.chassis || undefined,
        make: vehicleForm.make || undefined,
        model: vehicleForm.model || undefined,
        year: vehicleForm.year ? parseInt(vehicleForm.year) : undefined,
        colour: vehicleForm.colour || undefined,
        status: vehicleForm.status,
        notes: vehicleForm.notes || undefined,
      });
      setVehicleForm({ name: "", chassis: "", make: "", model: "", year: "", colour: "", status: "in_yard", notes: "" });
      setShowVehicleForm(false);
    } catch (err: unknown) {
      setVehicleError(err instanceof Error ? err.message : "Failed.");
    }
  };

  const handleCreateLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginSuccess(false);
    const email = loginForm.email.trim();
    const password = loginForm.password;
    if (!email || !password) {
      setLoginError("Email and password are required.");
      return;
    }
    if (password.length < 6) {
      setLoginError("Password must be at least 6 characters.");
      return;
    }
    setLoginLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role: "client", client_id: id },
        },
      });
      if (error) throw error;
      setLoginSuccess(true);
      setLoginForm({ email: "", password: "" });
      qc.invalidateQueries({ queryKey: ["admin_profile_by_client", id] });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create login.";
      setLoginError(
        msg.includes("already registered") || msg.includes("already exists")
          ? "This email is already registered. Use “Send password reset” below so the client can set a new password."
          : msg
      );
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSendResetEmail = async () => {
    if (!client?.email) return;
    setLoginError(null);
    setResetEmailSent(false);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(client.email, {
        redirectTo: `${window.location.origin}/login`,
      });
      if (error) throw error;
      setResetEmailSent(true);
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : "Failed to send reset email.");
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-48">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </AdminLayout>
    );
  }

  if (!client) {
    return (
      <AdminLayout>
        <div className="text-center py-20 text-muted-foreground">Client not found.</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/admin/clients"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Clients
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-primary/50 text-xs font-display tracking-widest mb-1">クライアント詳細</p>
            <h1 className="font-display text-3xl text-foreground">{client.company_name}</h1>
            <p className="text-muted-foreground mt-1">{client.contact_name} &bull; {client.email}</p>
          </div>
          <div className="flex gap-6">
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Balance</p>
              <p className={`font-display text-2xl ${balance >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {formatCurrency(balance)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Outstanding</p>
              <p className="font-display text-2xl text-amber-400">{formatCurrency(outstanding)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border/50 mb-6 overflow-x-auto">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 -mb-px ${
              activeTab === key
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Account Info ── */}
      {activeTab === "account" && (
        <div className="max-w-2xl border-shoji bg-card/40 p-6 relative">
          <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
          <h2 className="font-display text-lg text-foreground mb-5">Company Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {(
              [
                ["Company Name", "company_name"],
                ["Contact Name", "contact_name"],
                ["Email", "email"],
                ["Phone", "phone"],
              ] as [string, keyof typeof client][]
            ).map(([label, field]) => (
              <div key={field}>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
                <InlineEdit
                  value={(client[field] as string) ?? ""}
                  placeholder={`Edit ${label.toLowerCase()}`}
                  onSave={(v) =>
                    updateClient.mutate({ id: client.id, [field]: v })
                  }
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Notes</p>
              <InlineEdit
                value={client.notes ?? ""}
                placeholder="Add internal notes"
                onSave={(v) => updateClient.mutate({ id: client.id, notes: v })}
              />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-border/40">
            <p className="text-xs text-muted-foreground">
              Client since {format(new Date(client.created_at), "d MMMM yyyy")}
            </p>
          </div>

          {/* Portal login */}
          <div className="mt-6 pt-6 border-t border-border/40">
            <h3 className="font-display text-base text-foreground mb-3">Portal login</h3>
            {profile ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  This client has portal access. They can sign in at your site’s Client Login page.
                </p>
                <button
                  type="button"
                  onClick={handleSendResetEmail}
                  disabled={resetEmailSent}
                  className="text-sm text-primary hover:underline disabled:text-muted-foreground disabled:no-underline"
                >
                  {resetEmailSent ? "Reset email sent" : "Send password reset email"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateLogin} className="space-y-4 max-w-sm">
                <p className="text-sm text-muted-foreground">
                  Create a login so this client can access the client portal (balance, invoices, vehicles, documents).
                </p>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                    placeholder={client?.email ?? "client@company.com"}
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Temporary password *</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
                    className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                    placeholder="Min 6 characters"
                    autoComplete="new-password"
                  />
                </div>
                {loginSuccess && (
                  <p className="text-sm text-emerald-400">Login created. Share the email and password with the client.</p>
                )}
                {loginError && (
                  <p className="text-sm text-destructive">{loginError}</p>
                )}
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="border-shoji bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2.5 text-sm font-medium transition-all disabled:opacity-50"
                >
                  {loginLoading ? "Creating…" : "Create login"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── Finance ── */}
      {activeTab === "finance" && (
        <div className="space-y-6">
          {/* Transaction history */}
          <div className="border-shoji bg-card/40 p-6 relative">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
            <h2 className="font-display text-lg text-foreground mb-4">Transaction History</h2>
            {transactions.length === 0 ? (
              <p className="text-muted-foreground text-sm">No transactions yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      {["Date", "Description", "Reference", "Amount"].map((h) => (
                        <th key={h} className="text-left px-3 py-2 text-xs text-muted-foreground uppercase tracking-widest font-normal">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t) => (
                      <tr key={t.id} className="border-b border-border/20 last:border-0 hover:bg-card/40">
                        <td className="px-3 py-3 text-muted-foreground whitespace-nowrap">
                          {format(new Date(t.created_at), "d MMM yyyy")}
                        </td>
                        <td className="px-3 py-3 text-foreground">{t.description}</td>
                        <td className="px-3 py-3 text-muted-foreground">{t.reference ?? "—"}</td>
                        <td className={`px-3 py-3 font-medium whitespace-nowrap ${t.amount_cents >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {t.amount_cents >= 0 ? "+" : ""}{formatCurrency(t.amount_cents)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Record payment */}
          <div className="border-shoji bg-card/40 p-6 relative">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
            <h2 className="font-display text-lg text-foreground mb-4">Record Payment</h2>
            <form onSubmit={handlePayment} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Amount (£) *</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm((f) => ({ ...f, amount: e.target.value }))}
                  className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                  placeholder="e.g. 5000.00"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Description</label>
                <input
                  value={paymentForm.description}
                  onChange={(e) => setPaymentForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                  placeholder="Payment received"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Reference</label>
                <input
                  value={paymentForm.reference}
                  onChange={(e) => setPaymentForm((f) => ({ ...f, reference: e.target.value }))}
                  className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                  placeholder="Bank ref / transfer ID"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Link to invoice (optional)</label>
                <select
                  value={paymentForm.invoice_id}
                  onChange={(e) => setPaymentForm((f) => ({ ...f, invoice_id: e.target.value }))}
                  className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                >
                  <option value="">None</option>
                  {invoices.filter((i) => i.status !== "paid").map((inv) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.invoice_number ? `#${inv.invoice_number} – ` : ""}{inv.description} ({formatCurrency(inv.amount_cents)})
                    </option>
                  ))}
                </select>
              </div>
              {paymentError && (
                <div className="sm:col-span-2">
                  <p className="text-sm text-destructive">{paymentError}</p>
                </div>
              )}
              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={recordPayment.isPending}
                  className="border-shoji bg-emerald-400/10 hover:bg-emerald-400/20 border-emerald-400/20 text-emerald-400 px-5 py-2.5 text-sm font-medium transition-all disabled:opacity-50"
                >
                  {recordPayment.isPending ? "Saving…" : "Record Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Invoices ── */}
      {activeTab === "invoices" && (
        <div className="space-y-6">
          {/* Invoice list */}
          <div className="border-shoji bg-card/40 relative">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
            {invoices.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No invoices yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      {["Invoice", "Date", "Due Date", "Amount", "Status", "Action", ""].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-widest font-normal">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="border-b border-border/20 last:border-0 hover:bg-card/40">
                        <td className="px-4 py-3 text-foreground">
                          <p>{inv.invoice_number ? `#${inv.invoice_number}` : "Invoice"}</p>
                          <p className="text-xs text-muted-foreground">{inv.description}</p>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                          {format(new Date(inv.created_at), "d MMM yyyy")}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                          {inv.due_date ? format(new Date(inv.due_date), "d MMM yyyy") : "—"}
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                          {formatCurrency(inv.amount_cents)}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium border ${INVOICE_STATUS_COLORS[inv.status as InvoiceStatus]}`}>
                            {INVOICE_STATUS_LABELS[inv.status as InvoiceStatus]}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={inv.status}
                            onChange={(e) =>
                              updateInvoiceStatus.mutate({
                                id: inv.id,
                                status: e.target.value as InvoiceStatus,
                                clientId: id!,
                              })
                            }
                            className="bg-background/60 border border-border/60 text-foreground px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary/60"
                          >
                            {INVOICE_STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {INVOICE_STATUS_LABELS[s]}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setInvoiceToDelete({ id: inv.id, description: inv.invoice_number || inv.description })}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                            title="Delete invoice"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Issue invoice */}
          <div className="border-shoji bg-card/40 p-6 relative">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
            <h2 className="font-display text-lg text-foreground mb-4">Issue Invoice</h2>
            <form onSubmit={handleInvoice} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Invoice #</label>
                <input
                  value={invoiceForm.invoice_number}
                  onChange={(e) => setInvoiceForm((f) => ({ ...f, invoice_number: e.target.value }))}
                  className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                  placeholder="e.g. INV-001"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Amount (£) *</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={invoiceForm.amount}
                  onChange={(e) => setInvoiceForm((f) => ({ ...f, amount: e.target.value }))}
                  className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                  placeholder="e.g. 10000.00"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-muted-foreground mb-1.5">Description *</label>
                <input
                  required
                  value={invoiceForm.description}
                  onChange={(e) => setInvoiceForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                  placeholder="e.g. Vehicle purchase: Toyota Supra JZA80"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Due Date</label>
                <input
                  type="date"
                  value={invoiceForm.due_date}
                  onChange={(e) => setInvoiceForm((f) => ({ ...f, due_date: e.target.value }))}
                  className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                />
              </div>
              {invoiceError && (
                <div className="sm:col-span-2">
                  <p className="text-sm text-destructive">{invoiceError}</p>
                </div>
              )}
              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={createInvoice.isPending}
                  className="border-shoji bg-primary/10 hover:bg-primary/20 text-primary px-5 py-2.5 text-sm font-medium transition-all disabled:opacity-50"
                >
                  {createInvoice.isPending ? "Creating…" : "Issue Invoice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Vehicles & Docs ── */}
      {activeTab === "vehicles" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowVehicleForm(!showVehicleForm)}
              className="flex items-center gap-2 border-shoji bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2.5 text-sm font-medium transition-all"
            >
              <Plus className="h-4 w-4" />
              Add Vehicle
            </button>
          </div>

          {/* Add vehicle form */}
          {showVehicleForm && (
            <div className="border-shoji bg-card/40 p-6 relative">
              <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
              <h2 className="font-display text-base text-foreground mb-4">Add Vehicle</h2>
              <form onSubmit={handleAddVehicle} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Vehicle Name *</label>
                  <input
                    required
                    value={vehicleForm.name}
                    onChange={(e) => setVehicleForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                    placeholder="e.g. Toyota Supra RZ"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Chassis</label>
                  <input
                    value={vehicleForm.chassis}
                    onChange={(e) => setVehicleForm((f) => ({ ...f, chassis: e.target.value }))}
                    className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                    placeholder="JZA80-0012345"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Make</label>
                  <input
                    value={vehicleForm.make}
                    onChange={(e) => setVehicleForm((f) => ({ ...f, make: e.target.value }))}
                    className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                    placeholder="Toyota"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Model</label>
                  <input
                    value={vehicleForm.model}
                    onChange={(e) => setVehicleForm((f) => ({ ...f, model: e.target.value }))}
                    className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                    placeholder="Supra"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Year</label>
                  <input
                    type="number"
                    value={vehicleForm.year}
                    onChange={(e) => setVehicleForm((f) => ({ ...f, year: e.target.value }))}
                    className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                    placeholder="1998"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Colour</label>
                  <input
                    value={vehicleForm.colour}
                    onChange={(e) => setVehicleForm((f) => ({ ...f, colour: e.target.value }))}
                    className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                    placeholder="White"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Initial Status</label>
                  <select
                    value={vehicleForm.status}
                    onChange={(e) => setVehicleForm((f) => ({ ...f, status: e.target.value as VehicleStatus }))}
                    className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                  >
                    {VEHICLE_STATUSES.map((s) => (
                      <option key={s} value={s}>{VEHICLE_STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-3">
                  <label className="block text-xs text-muted-foreground mb-1.5">Notes</label>
                  <input
                    value={vehicleForm.notes}
                    onChange={(e) => setVehicleForm((f) => ({ ...f, notes: e.target.value }))}
                    className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                    placeholder="Any notes about this vehicle"
                  />
                </div>
                {vehicleError && (
                  <div className="col-span-2 sm:col-span-3">
                    <p className="text-sm text-destructive">{vehicleError}</p>
                  </div>
                )}
                <div className="col-span-2 sm:col-span-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowVehicleForm(false)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createVehicle.isPending}
                    className="border-shoji bg-primary/10 hover:bg-primary/20 text-primary px-5 py-2.5 text-sm font-medium transition-all disabled:opacity-50"
                  >
                    {createVehicle.isPending ? "Adding…" : "Add Vehicle"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Vehicle list */}
          {vehicles.length === 0 ? (
            <div className="border-shoji bg-card/40 p-12 text-center text-muted-foreground">
              No vehicles assigned to this client yet.
            </div>
          ) : (
            <div className="space-y-3">
              {vehicles.map((v) => {
                const isExpanded = expandedVehicles.has(v.id);
                return (
                  <div key={v.id} className="border-shoji bg-card/40">
                    {/* Vehicle header */}
                    <div className="flex items-center gap-4 px-5 py-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <InlineEdit
                            value={v.name}
                            onSave={(val) =>
                              updateVehicle.mutate({ id: v.id, clientId: id!, name: val })
                            }
                          />
                          {v.chassis && (
                            <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5">
                              {v.chassis}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                          {v.make && <span>{v.make}</span>}
                          {v.model && <span>{v.model}</span>}
                          {v.year && <span>{v.year}</span>}
                          {v.colour && <span>{v.colour}</span>}
                        </div>
                      </div>

                      {/* Status selector */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <select
                          value={v.status}
                          onChange={(e) =>
                            updateVehicleStatus.mutate({
                              id: v.id,
                              status: e.target.value as VehicleStatus,
                              clientId: id!,
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

                        <button
                          onClick={() =>
                            setExpandedVehicles((prev) => {
                              const next = new Set(prev);
                              if (next.has(v.id)) next.delete(v.id);
                              else next.add(v.id);
                              return next;
                            })
                          }
                          className="text-muted-foreground hover:text-primary transition-colors"
                          title={isExpanded ? "Hide documents" : "Show documents"}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <button
                          onClick={() => setVehicleToDelete({ id: v.id, name: v.name })}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          title="Delete vehicle"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Documents panel (expand/collapse) */}
                    {isExpanded && (
                      <div className="border-t border-border/40 px-5 pb-4">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-3 mb-2">
                          Documents
                        </p>
                        <VehicleDocPanel vehicleId={v.id} clientId={id!} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Delete Invoice Confirmation Modal ── */}
      {invoiceToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md border-shoji bg-card p-8">
            <div className="absolute -top-2 -left-2 w-5 h-5 border-l-2 border-t-2 border-destructive/60" />
            <div className="absolute -top-2 -right-2 w-5 h-5 border-r-2 border-t-2 border-destructive/60" />
            <div className="absolute -bottom-2 -left-2 w-5 h-5 border-l-2 border-b-2 border-destructive/60" />
            <div className="absolute -bottom-2 -right-2 w-5 h-5 border-r-2 border-b-2 border-destructive/60" />

            <h2 className="font-display text-xl text-foreground mb-4">Delete Invoice</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to delete the invoice <strong className="text-foreground">{invoiceToDelete.description}</strong>?
            </p>
            <p className="text-sm text-destructive mb-6">
              This will also remove any related transaction records. This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setInvoiceToDelete(null)}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await deleteInvoice.mutateAsync({
                      invoiceId: invoiceToDelete.id,
                      clientId: id!,
                    });
                    setInvoiceToDelete(null);
                  } catch {
                    // Error handled by mutation
                  }
                }}
                disabled={deleteInvoice.isPending}
                className="border-shoji bg-destructive/10 hover:bg-destructive/20 text-destructive border-destructive/30 px-5 py-2.5 text-sm font-medium transition-all disabled:opacity-50"
              >
                {deleteInvoice.isPending ? "Deleting…" : "Delete Invoice"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Vehicle Confirmation Modal ── */}
      {vehicleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md border-shoji bg-card p-8">
            <div className="absolute -top-2 -left-2 w-5 h-5 border-l-2 border-t-2 border-destructive/60" />
            <div className="absolute -top-2 -right-2 w-5 h-5 border-r-2 border-t-2 border-destructive/60" />
            <div className="absolute -bottom-2 -left-2 w-5 h-5 border-l-2 border-b-2 border-destructive/60" />
            <div className="absolute -bottom-2 -right-2 w-5 h-5 border-r-2 border-b-2 border-destructive/60" />

            <h2 className="font-display text-xl text-foreground mb-4">Delete Vehicle</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to delete <strong className="text-foreground">{vehicleToDelete.name}</strong>?
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 mb-4 ml-2">
              <li>Vehicle record and all details</li>
              <li>All photos, auction sheets, and documents</li>
              <li>Status history</li>
              <li>Files from storage</li>
            </ul>
            <p className="text-sm text-destructive mb-6">This action cannot be undone.</p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setVehicleToDelete(null)}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  // Get documents for this vehicle to delete from storage
                  const { data: docs } = await supabase
                    .from("vehicle_documents")
                    .select("id, storage_path")
                    .eq("vehicle_id", vehicleToDelete.id);

                  try {
                    await deleteVehicle.mutateAsync({
                      vehicleId: vehicleToDelete.id,
                      clientId: id!,
                      documents: docs || undefined,
                    });
                    setVehicleToDelete(null);
                  } catch {
                    // Error handled by mutation
                  }
                }}
                disabled={deleteVehicle.isPending}
                className="border-shoji bg-destructive/10 hover:bg-destructive/20 text-destructive border-destructive/30 px-5 py-2.5 text-sm font-medium transition-all disabled:opacity-50"
              >
                {deleteVehicle.isPending ? "Deleting…" : "Delete Vehicle"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminClientDetail;
