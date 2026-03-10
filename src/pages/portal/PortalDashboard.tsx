import { Link } from "react-router-dom";
import {
  ArrowLeftRight,
  FileText,
  Car,
  Ship,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import PortalLayout from "@/components/portal/PortalLayout";
import { useAuth } from "@/contexts/AuthContext";
import {
  useMyClient,
  useMyTransactions,
  useMyInvoices,
  useMyVehicles,
  computeBalance,
  computeOutstanding,
  formatCurrency,
  VEHICLE_STATUS_LABELS,
} from "@/hooks/usePortalData";
import type { VehicleStatus } from "@/lib/database.types";

const STATUS_ORDER: VehicleStatus[] = ["in_yard", "waiting_booking", "loaded", "on_ship"];

const PortalDashboard = () => {
  const { clientId } = useAuth();
  const { data: client } = useMyClient(clientId);
  const { data: transactions = [] } = useMyTransactions(clientId);
  const { data: invoices = [] } = useMyInvoices(clientId);
  const { data: vehicles = [] } = useMyVehicles(clientId);

  const balance = computeBalance(transactions);
  const outstanding = computeOutstanding(invoices);
  const unpaidInvoices = invoices.filter((i) => i.status !== "paid").length;

  const statusCounts = vehicles.reduce<Record<string, number>>((acc, v) => {
    acc[v.status] = (acc[v.status] ?? 0) + 1;
    return acc;
  }, {});

  const quickLinks = [
    {
      label: "Transactions",
      path: "/portal/transactions",
      icon: ArrowLeftRight,
      desc: "Full transaction history",
    },
    {
      label: "Invoices",
      path: "/portal/invoices",
      icon: FileText,
      desc: `${unpaidInvoices} outstanding`,
    },
    {
      label: "My Vehicles",
      path: "/portal/vehicles",
      icon: Car,
      desc: `${vehicles.length} total`,
    },
    {
      label: "Current Stock",
      path: "/portal/stock",
      icon: Ship,
      desc: "Live status tracking",
    },
  ];

  return (
    <PortalLayout>
      {/* Header */}
      <div className="mb-8">
        <p className="text-primary/50 text-xs font-display tracking-widest mb-1">ダッシュボード</p>
        <h1 className="font-display text-3xl text-foreground">
          Welcome back{client?.contact_name ? `, ${client.contact_name}` : ""}
        </h1>
        {client?.company_name && (
          <p className="text-muted-foreground mt-1">{client.company_name}</p>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Balance */}
        <div className="border-shoji bg-card/40 p-6 relative">
          <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-primary/40" />
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Account Balance</p>
            <TrendingUp className="h-4 w-4 text-primary/60" />
          </div>
          <p
            className={`font-display text-3xl font-medium ${
              balance >= 0 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {formatCurrency(balance)}
          </p>
        </div>

        {/* Outstanding */}
        <div className="border-shoji bg-card/40 p-6 relative">
          <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-primary/40" />
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Outstanding</p>
            <AlertCircle className="h-4 w-4 text-amber-400/60" />
          </div>
          <p className="font-display text-3xl font-medium text-amber-400">
            {formatCurrency(outstanding)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {unpaidInvoices} unpaid invoice{unpaidInvoices !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Vehicles in stock */}
        <div className="border-shoji bg-card/40 p-6 relative sm:col-span-2 lg:col-span-1">
          <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-primary/40" />
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
            Stock Status
          </p>
          <div className="grid grid-cols-2 gap-2">
            {STATUS_ORDER.map((s) => (
              <div key={s} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{VEHICLE_STATUS_LABELS[s]}</span>
                <span className="font-medium text-foreground">{statusCounts[s] ?? 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />

      {/* Quick links */}
      <div>
        <h2 className="font-display text-lg text-foreground mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map(({ label, path, icon: Icon, desc }) => (
            <Link
              key={path}
              to={path}
              className="relative group border-shoji bg-card/30 hover:bg-card/60 p-5 transition-all duration-200"
            >
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-r border-t border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l border-b border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Icon className="h-6 w-6 text-primary mb-3" />
              <p className="font-medium text-foreground text-sm">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
};

export default PortalDashboard;
