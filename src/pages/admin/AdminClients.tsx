import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, ChevronRight, Users, Building2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAllClients, useCreateClient } from "@/hooks/usePortalData";
import { format } from "date-fns";

const AdminClients = () => {
  const { data: clients = [], isLoading } = useAllClients();
  const createClient = useCreateClient();

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

  const filtered = clients.filter(
    (c) =>
      c.company_name.toLowerCase().includes(search.toLowerCase()) ||
      c.contact_name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    try {
      await createClient.mutateAsync(form);
      setShowCreate(false);
      setForm({ company_name: "", contact_name: "", email: "", phone: "", notes: "" });
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Failed to create client.");
    }
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

      {/* Create client modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg border-shoji bg-card p-8">
            <div className="absolute -top-2 -left-2 w-5 h-5 border-l-2 border-t-2 border-primary/60" />
            <div className="absolute -top-2 -right-2 w-5 h-5 border-r-2 border-t-2 border-primary/60" />
            <div className="absolute -bottom-2 -left-2 w-5 h-5 border-l-2 border-b-2 border-primary/60" />
            <div className="absolute -bottom-2 -right-2 w-5 h-5 border-r-2 border-b-2 border-primary/60" />

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
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createClient.isPending}
                  className="border-shoji bg-primary/10 hover:bg-primary/20 text-primary px-5 py-2.5 text-sm font-medium transition-all duration-200 disabled:opacity-50"
                >
                  {createClient.isPending ? "Creating…" : "Create Client"}
                </button>
              </div>
            </form>

            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                After creating the client record, go to their detail page to set up their login
                credentials via Supabase Auth.
              </p>
            </div>
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
            <Link
              key={c.id}
              to={`/admin/clients/${c.id}`}
              className="relative group flex items-center gap-4 border-shoji bg-card/30 hover:bg-card/60 px-5 py-4 transition-all duration-200"
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

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-muted-foreground hidden sm:block">
                  Added {format(new Date(c.created_at), "d MMM yyyy")}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminClients;
