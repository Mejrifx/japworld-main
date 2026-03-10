import { FileText } from "lucide-react";
import PortalLayout from "@/components/portal/PortalLayout";
import { useAuth } from "@/contexts/AuthContext";
import {
  useMyInvoices,
  computeOutstanding,
  formatCurrency,
  INVOICE_STATUS_LABELS,
  INVOICE_STATUS_COLORS,
} from "@/hooks/usePortalData";
import type { InvoiceStatus } from "@/lib/database.types";
import { format } from "date-fns";

const PortalInvoices = () => {
  const { clientId } = useAuth();
  const { data: invoices = [], isLoading } = useMyInvoices(clientId);

  const outstanding = computeOutstanding(invoices);
  const paid = invoices.filter((i) => i.status === "paid").length;
  const unpaid = invoices.filter((i) => i.status !== "paid").length;

  return (
    <PortalLayout>
      <div className="mb-8">
        <p className="text-primary/50 text-xs font-display tracking-widest mb-1">請求書</p>
        <h1 className="font-display text-3xl text-foreground">Invoices</h1>
        <p className="text-muted-foreground mt-2">
          All invoices issued to your account, with payment status.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="border-shoji bg-card/40 p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Outstanding</p>
          <p className="font-display text-2xl text-amber-400">{formatCurrency(outstanding)}</p>
          <p className="text-xs text-muted-foreground mt-1">{unpaid} unpaid invoices</p>
        </div>
        <div className="border-shoji bg-card/40 p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
            Total Invoiced
          </p>
          <p className="font-display text-2xl text-foreground">
            {formatCurrency(invoices.reduce((s, i) => s + i.amount_cents, 0))}
          </p>
        </div>
        <div className="border-shoji bg-card/40 p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
            Paid Invoices
          </p>
          <p className="font-display text-2xl text-emerald-400">{paid}</p>
          <p className="text-xs text-muted-foreground mt-1">of {invoices.length} total</p>
        </div>
      </div>

      {/* Invoice list */}
      <div className="border-shoji bg-card/40 relative">
        <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
        <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-primary/40" />

        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : invoices.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">No invoices on record yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-widest font-normal">
                    Invoice
                  </th>
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-widest font-normal hidden sm:table-cell">
                    Date Issued
                  </th>
                  <th className="text-left px-6 py-4 text-xs text-muted-foreground uppercase tracking-widest font-normal hidden md:table-cell">
                    Due Date
                  </th>
                  <th className="text-right px-6 py-4 text-xs text-muted-foreground uppercase tracking-widest font-normal">
                    Amount
                  </th>
                  <th className="text-center px-6 py-4 text-xs text-muted-foreground uppercase tracking-widest font-normal">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b border-border/30 last:border-0 hover:bg-card/40 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <div>
                          <p className="text-foreground">
                            {inv.invoice_number ? `#${inv.invoice_number}` : "Invoice"}
                          </p>
                          <p className="text-xs text-muted-foreground">{inv.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell whitespace-nowrap">
                      {format(new Date(inv.created_at), "d MMM yyyy")}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground hidden md:table-cell whitespace-nowrap">
                      {inv.due_date ? format(new Date(inv.due_date), "d MMM yyyy") : "—"}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-foreground whitespace-nowrap">
                      {formatCurrency(inv.amount_cents)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium border ${
                          INVOICE_STATUS_COLORS[inv.status as InvoiceStatus]
                        }`}
                      >
                        {INVOICE_STATUS_LABELS[inv.status as InvoiceStatus]}
                      </span>
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

export default PortalInvoices;
