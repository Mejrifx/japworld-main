import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import PortalLayout from "@/components/portal/PortalLayout";
import { useAuth } from "@/contexts/AuthContext";
import {
  useMyTransactions,
  computeBalance,
  formatCurrency,
} from "@/hooks/usePortalData";
import { format } from "date-fns";

const PortalTransactions = () => {
  const { clientId } = useAuth();
  const { data: transactions = [], isLoading } = useMyTransactions(clientId);

  const balance = computeBalance(transactions);

  // Compute running balance (newest first, so we need to reverse for running total)
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  const runningBalances: Record<string, number> = {};
  let running = 0;
  for (const t of sorted) {
    running += t.amount_cents;
    runningBalances[t.id] = running;
  }

  return (
    <PortalLayout>
      <div className="mb-8">
        <p className="text-primary/50 text-xs font-display tracking-widest mb-1">取引履歴</p>
        <h1 className="font-display text-3xl text-foreground">Transaction History</h1>
        <p className="text-muted-foreground mt-2">
          Full record of payments received and charges applied to your account.
        </p>
      </div>

      {/* Balance summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="border-shoji bg-card/40 p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
            Current Balance
          </p>
          <p
            className={`font-display text-2xl ${
              balance >= 0 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {formatCurrency(balance)}
          </p>
        </div>
        <div className="border-shoji bg-card/40 p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
            Total Received
          </p>
          <p className="font-display text-2xl text-emerald-400">
            {formatCurrency(
              transactions.filter((t) => t.amount_cents > 0).reduce((s, t) => s + t.amount_cents, 0)
            )}
          </p>
        </div>
        <div className="border-shoji bg-card/40 p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
            Total Charged
          </p>
          <p className="font-display text-2xl text-red-400">
            {formatCurrency(
              Math.abs(
                transactions
                  .filter((t) => t.amount_cents < 0)
                  .reduce((s, t) => s + t.amount_cents, 0)
              )
            )}
          </p>
        </div>
      </div>

      {/* Transactions table */}
      <div className="border-shoji bg-card/40 relative">
        <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
        <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-primary/40" />

        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            No transactions on record yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-widest font-normal">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-widest font-normal">
                    Description
                  </th>
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-widest font-normal hidden sm:table-cell">
                    Reference
                  </th>
                  <th className="text-right px-6 py-4 text-xs text-muted-foreground uppercase tracking-widest font-normal">
                    Amount
                  </th>
                  <th className="text-right px-6 py-4 text-xs text-muted-foreground uppercase tracking-widest font-normal hidden md:table-cell">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-border/30 last:border-0 hover:bg-card/40 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                      {format(new Date(t.created_at), "d MMM yyyy")}
                    </td>
                    <td className="px-6 py-4 text-foreground">
                      <div className="flex items-center gap-2">
                        {t.amount_cents >= 0 ? (
                          <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <ArrowUpRight className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
                        )}
                        {t.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell">
                      {t.reference ?? "—"}
                    </td>
                    <td
                      className={`px-6 py-4 text-right font-medium whitespace-nowrap ${
                        t.amount_cents >= 0 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {t.amount_cents >= 0 ? "+" : ""}
                      {formatCurrency(t.amount_cents)}
                    </td>
                    <td className="px-6 py-4 text-right text-muted-foreground whitespace-nowrap hidden md:table-cell">
                      {formatCurrency(runningBalances[t.id] ?? 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PortalLayout>
  );
};

export default PortalTransactions;
