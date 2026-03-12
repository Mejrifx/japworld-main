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

      // Step 2: Create the Supabase auth user with the temp password
      const { error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: tempPassword,
        options: {
          data: { role: "client", client_id: newClient.id },
        },
      });

      if (authError) {
        // Auth creation failed - client record exists but no login
        setFormError(
          `Client created, but login creation failed: ${authError.message}. You can create the login manually from the client's detail page.`
        );
        return;
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
      await deleteClient.mutateAsync({
        clientId: clientToDelete.id,
        authUserId: null, // We'll look up the auth user from the profile
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
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-primary/50 text-xs font-display tracking-widest mb-1">クライアント</p>
          <h1 className="font-display text-3xl text-foreground">Clients</h1>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="relative group flex items-center gap-2 border-shoji bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2.5 text-sm font-medium transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          New Client
        </button>
      </div>

      {/* Delete confirmation modal */}
      {clientToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md border-shoji bg-card p-8">
            <div className="absolute -top-2 -left-2 w-5 h-5 border-l-2 border-t-2 border-destructive/60" />
            <div className="absolute -top-2 -right-2 w-5 h-5 border-r-2 border-t-2 border-destructive/60" />
            <div className="absolute -bottom-2 -left-2 w-5 h-5 border-l-2 border-b-2 border-destructive/60" />
            <div className="absolute -bottom-2 -right-2 w-5 h-5 border-r-2 border-b-2 border-destructive/60" />

            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <h2 className="font-display text-xl text-foreground">Delete Client Permanently</h2>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This will permanently delete <strong className="text-foreground">{clientToDelete.company_name}</strong> and ALL their data:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-2">
                <li>Client account and login access</li>
                <li>All invoices and transaction history</li>
                <li>All vehicles and associated documents (photos, auction sheets)</li>
                <li>All files from storage</li>
              </ul>
              <p className="text-sm text-destructive font-medium">
                This action cannot be undone.
              </p>

              <form onSubmit={handleDelete} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">
                    Type <strong>{clientToDelete.company_name}</strong> to confirm
                  </label>
                  <input
                    autoFocus
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    className="w-full bg-background/60 border border-destructive/40 text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-destructive/60"
                  />
                </div>

                {deleteError && (
                  <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 px-4 py-3">
                    {deleteError}
                  </p>
                )}

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setClientToDelete(null)}
                    className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={deleteClient.isPending || deleteConfirmText !== clientToDelete.company_name}
                    className="border-shoji bg-destructive/10 hover:bg-destructive/20 text-destructive border-destructive/30 px-5 py-2.5 text-sm font-medium transition-all disabled:opacity-50"
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
                <h2 className="font-display text-xl text-foreground">Client Created Successfully</h2>
                <p className="text-sm text-muted-foreground">
                  The client record and portal login have been created. Share these credentials with the client:
                </p>

                <div className="border-shoji bg-primary/5 p-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Email</p>
                    <p className="text-foreground font-medium">{createdLogin.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Temporary Password</p>
                    <p className="text-foreground font-medium font-mono text-sm">{createdLogin.password}</p>
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
                <h2 className="font-display text-xl text-foreground mb-6">Create New Client</h2>

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
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by company, contact, or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-card/40 border border-border/60 text-foreground placeholder-muted-foreground pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60"
        />
      </div>

      {/* Clients list */}
      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="border-shoji bg-card/40 p-12 text-center text-muted-foreground">
          {search ? "No clients match your search." : "No clients yet. Create your first one."}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="relative group flex items-center gap-4 border-shoji bg-card/30 hover:bg-card/60 px-5 py-4 transition-all duration-200"
            >
              <Link
                to={`/admin/clients/${c.id}`}
                className="flex items-center gap-4 flex-1 min-w-0"
              >
                <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-r border-t border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l border-b border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">{c.company_name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {c.contact_name} &bull; {c.email}
                    {c.phone && ` • ${c.phone}`}
                  </p>
                </div>
              </Link>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-muted-foreground hidden sm:block">
                  Added {format(new Date(c.created_at), "d MMM yyyy")}
                </span>
                <Link
                  to={`/admin/clients/${c.id}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => openDeleteModal({ id: c.id, company_name: c.company_name })}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1"
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
