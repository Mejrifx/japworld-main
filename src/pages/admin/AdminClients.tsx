import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, ChevronRight, Users, Building2, Copy, Check, Trash2, AlertTriangle } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAllClients, useCreateClient, useDeleteClient, useProfileByClientId } from "@/hooks/usePortalData";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

// Generate a secure temporary password
function generateTempPassword(length = 12): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const AdminClients = () => {
  const { data: clients = [], isLoading } = useAllClients();
  const createClient = useCreateClient();
  const deleteClient = useDeleteClient();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [createdLogin, setCreatedLogin] = useState<{ email: string; password: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // Delete confirmation
  const [clientToDelete, setClientToDelete] = useState<{ id: string; company_name: string } | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const filtered = clients.filter(
    (c) =>
      c.company_name.toLowerCase().includes(search.toLowerCase()) ||
      c.contact_name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setCreatedLogin(null);

    const tempPassword = generateTempPassword();

    try {
      // Step 1: Create the client record
      const newClient = await createClient.mutateAsync(form);

      // Step 2: Create the auth user via Edge Function (doesn't affect admin session)
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error("Not authenticated");
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-client-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            email: form.email,
            password: tempPassword,
            clientId: newClient.id,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create client login");
      }

      // Success! Show the credentials
      setCreatedLogin({ email: form.email, password: tempPassword });
      setForm({ company_name: "", contact_name: "", email: "", phone: "", notes: "" });
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Failed to create client.");
    }
  };

  const handleCopy = () => {
    if (!createdLogin) return;
    navigator.clipboard.writeText(`Email: ${createdLogin.email}\nPassword: ${createdLogin.password}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setShowCreate(false);
    setCreatedLogin(null);
    setFormError(null);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteError(null);

    if (!clientToDelete) return;
    if (deleteConfirmText !== clientToDelete.company_name) {
      setDeleteError("Company name doesn't match. Type exactly as shown to confirm.");
      return;
    }

    try {
      // Fetch the profile for this client to get the auth user ID
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("client_id", clientToDelete.id)
        .maybeSingle();

      await deleteClient.mutateAsync({
        clientId: clientToDelete.id,
        authUserId: profile?.id, // This is the auth.users.id
      });
      setClientToDelete(null);
      setDeleteConfirmText("");
    } catch (err: unknown) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete client.");
    }
  };

  const openDeleteModal = (client: { id: string; company_name: string }) => {
    setClientToDelete(client);
    setDeleteConfirmText("");
    setDeleteError(null);
  };

  return (
    <AdminLayout>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-metric-pulse" />
            <span className="text-xs font-semibold text-primary/80 tracking-widest uppercase">Management</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight mb-2">Clients</h1>
          <p className="text-muted-foreground text-sm">
            Manage client accounts, portal access, and business relationships.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          New Client
        </button>
      </div>

      {/* Delete confirmation modal */}
      {clientToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-card rounded-2xl p-8 border border-border/50 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Delete Client</h2>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-foreground">
                This will permanently delete <strong>{clientToDelete.company_name}</strong> and ALL their data:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1.5 pl-5 list-disc">
                <li>Client account and login access</li>
                <li>All invoices and transaction history</li>
                <li>All vehicles and associated documents</li>
                <li>All files from storage</li>
              </ul>
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                <p className="text-sm text-destructive font-medium">
                  ⚠️ This action cannot be undone.
                </p>
              </div>

              <form onSubmit={handleDelete} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs text-muted-foreground mb-2 font-medium">
                    Type <strong>{clientToDelete.company_name}</strong> to confirm
                  </label>
                  <input
                    autoFocus
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    className="w-full bg-input border border-border text-foreground px-4 py-2.5 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-destructive/50"
                  />
                </div>

                {deleteError && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
                    <p className="text-sm text-destructive">{deleteError}</p>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setClientToDelete(null)}
                    className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={deleteClient.isPending || deleteConfirmText !== clientToDelete.company_name}
                    className="bg-destructive hover:bg-destructive/90 text-white px-5 py-2.5 text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleteClient.isPending ? "Deleting…" : "Permanently Delete"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create client modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg border-shoji bg-card p-8">
            <div className="absolute -top-2 -left-2 w-5 h-5 border-l-2 border-t-2 border-primary/60" />
            <div className="absolute -top-2 -right-2 w-5 h-5 border-r-2 border-t-2 border-primary/60" />
            <div className="absolute -bottom-2 -left-2 w-5 h-5 border-l-2 border-b-2 border-primary/60" />
            <div className="absolute -bottom-2 -right-2 w-5 h-5 border-r-2 border-b-2 border-primary/60" />

            {createdLogin ? (
              // Success state: show credentials
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold text-foreground">Client Created Successfully</h2>
                <p className="text-sm text-muted-foreground font-medium">
                  The client record and portal login have been created. Share these credentials with the client:
                </p>

                <div className="border-shoji bg-primary/5 p-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1.5">Email</p>
                    <p className="text-foreground font-semibold">{createdLogin.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1.5">Temporary Password</p>
                    <p className="text-foreground font-semibold font-mono text-sm">{createdLogin.password}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 border-shoji bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2.5 text-sm font-medium transition-all"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy Credentials"}
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Close
                  </button>
                </div>

                <p className="text-xs text-muted-foreground">
                  The client can sign in at your site’s Client Login page. They should change their password after first login.
                </p>
              </div>
            ) : (
              // Create form
              <>
                <h2 className="text-xl font-bold text-foreground mb-6">Create New Client</h2>

                <form onSubmit={handleCreate} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1.5">
                        Company Name *
                      </label>
                      <input
                        required
                        value={form.company_name}
                        onChange={(e) => setForm((f) => ({ ...f, company_name: e.target.value }))}
                        className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1.5">
                        Contact Name *
                      </label>
                      <input
                        required
                        value={form.contact_name}
                        onChange={(e) => setForm((f) => ({ ...f, contact_name: e.target.value }))}
                        className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      This email will be used for the client&apos;s portal login
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">Internal Notes</label>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                      className="w-full bg-background/60 border border-border/60 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60 resize-none"
                    />
                  </div>

                  {formError && (
                    <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 px-4 py-3">
                      {formError}
                    </p>
                  )}

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={createClient.isPending}
                      className="border-shoji bg-primary/10 hover:bg-primary/20 text-primary px-5 py-2.5 text-sm font-medium transition-all duration-200 disabled:opacity-50"
                    >
                      {createClient.isPending ? "Creating…" : "Create Client + Login"}
                    </button>
                  </div>
                </form>

                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">
                    A temporary password will be auto-generated and displayed after creation. You&apos;ll share it with the client.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by company, contact, or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-card border border-border text-foreground placeholder-muted-foreground pl-12 pr-4 py-3 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>

      {/* Clients list */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">
            {search ? "No clients match your search." : "No clients yet. Create your first one."}
          </p>
        </div>
      ) : (
        <div className="space-y-3 animate-slide-up-fade">
          {filtered.map((c, index) => (
            <div
              key={c.id}
              className="relative group flex items-center gap-5 bg-card border border-border rounded-xl px-6 py-5 hover:border-primary/30 hover:shadow-md transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Link
                to={`/admin/clients/${c.id}`}
                className="flex items-center gap-5 flex-1 min-w-0"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground text-base mb-1 group-hover:text-primary transition-colors">{c.company_name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium">{c.contact_name}</span>
                    <span className="text-border">•</span>
                    <span>{c.email}</span>
                    {c.phone && (
                      <>
                        <span className="text-border">•</span>
                        <span>{c.phone}</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>

              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-semibold text-muted-foreground">Joined</p>
                  <p className="text-sm font-bold text-foreground">{format(new Date(c.created_at), "MMM d, yyyy")}</p>
                </div>
                <Link
                  to={`/admin/clients/${c.id}`}
                  className="h-9 w-9 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-all group/btn"
                  title="View details"
                >
                  <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
                <button
                  onClick={() => openDeleteModal({ id: c.id, company_name: c.company_name })}
                  className="h-9 w-9 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive flex items-center justify-center transition-all"
                  title="Delete client permanently"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminClients;
