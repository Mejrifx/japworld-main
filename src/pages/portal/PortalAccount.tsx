import { Building2, User, Mail, Phone, FileText } from "lucide-react";
import PortalLayout from "@/components/portal/PortalLayout";
import { useAuth } from "@/contexts/AuthContext";
import {
  useMyClient,
  useMyTransactions,
  useMyInvoices,
  computeBalance,
  computeOutstanding,
  formatCurrency,
} from "@/hooks/usePortalData";
import { format } from "date-fns";

const PortalAccount = () => {
  const { clientId } = useAuth();
  const { data: client, isLoading } = useMyClient(clientId);
  const { data: transactions = [] } = useMyTransactions(clientId);
  const { data: invoices = [] } = useMyInvoices(clientId);

  const balance = computeBalance(transactions);
  const outstanding = computeOutstanding(invoices);
  const recentTransactions = transactions.slice(0, 5);

  if (isLoading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center h-48">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="mb-8">
        <p className="text-primary/50 text-xs font-display tracking-widest mb-1">アカウント</p>
        <h1 className="font-display text-3xl text-foreground">Account Overview</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="border-shoji bg-card/40 p-6 relative">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-primary/40" />

            <h2 className="font-display text-lg text-foreground mb-5 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Company Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                  Company
                </p>
                <p className="text-foreground font-medium">
                  {client?.company_name ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                  Contact Name
                </p>
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="text-foreground">{client?.contact_name ?? "—"}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                  Email
                </p>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="text-foreground">{client?.email ?? "—"}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                  Phone
                </p>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="text-foreground">{client?.phone ?? "—"}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                  Client Since
                </p>
                <p className="text-foreground">
                  {client?.created_at
                    ? format(new Date(client.created_at), "d MMM yyyy")
                    : "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Recent transactions */}
          <div className="border-shoji bg-card/40 p-6 relative">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
            <h2 className="font-display text-lg text-foreground mb-5 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Recent Transactions
            </h2>
            {recentTransactions.length === 0 ? (
              <p className="text-muted-foreground text-sm">No transactions yet.</p>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between py-2 border-b border-border/40 last:border-0"
                  >
                    <div>
                      <p className="text-sm text-foreground">{t.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(t.created_at), "d MMM yyyy")}
                      </p>
                    </div>
                    <span
                      className={`font-medium text-sm ${
                        t.amount_cents >= 0 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {t.amount_cents >= 0 ? "+" : ""}
                      {formatCurrency(t.amount_cents)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Balance sidebar */}
        <div className="space-y-4">
          <div className="border-shoji bg-card/40 p-6 relative">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-primary/40" />
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
              Remaining Balance
            </p>
            <p
              className={`font-display text-4xl font-medium ${
                balance >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {formatCurrency(balance)}
            </p>
            <div className="mt-4 pt-4 border-t border-border/40">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Total paid</span>
                <span className="text-emerald-400">
                  {formatCurrency(
                    transactions
                      .filter((t) => t.amount_cents > 0)
                      .reduce((s, t) => s + t.amount_cents, 0)
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Outstanding</span>
                <span className="text-amber-400">{formatCurrency(outstanding)}</span>
              </div>
            </div>
          </div>

          <div className="border-shoji bg-card/40 p-4">
            <p className="text-xs text-muted-foreground mb-2">
              Need to update your details or have a question about your balance?
            </p>
            <a
              href="/contact"
              className="text-xs text-primary hover:underline"
            >
              Contact your account manager →
            </a>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default PortalAccount;
