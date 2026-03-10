import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  ArrowLeftRight,
  FileText,
  Car,
  Ship,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import japworldLogo from "@/assets/japworld-logo.png";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "Dashboard", path: "/portal", icon: LayoutDashboard },
  { label: "Account", path: "/portal/account", icon: User },
  { label: "Transactions", path: "/portal/transactions", icon: ArrowLeftRight },
  { label: "Invoices", path: "/portal/invoices", icon: FileText },
  { label: "My Vehicles", path: "/portal/vehicles", icon: Car },
  { label: "Current Stock", path: "/portal/stock", icon: Ship },
];

interface PortalLayoutProps {
  children: React.ReactNode;
}

const PortalLayout = ({ children }: PortalLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, profile } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className={`${
        mobile ? "w-72" : "w-64"
      } flex flex-col h-full bg-card/60 backdrop-blur-md border-r border-border/50`}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border/50">
        <Link to="/portal" onClick={() => setMobileSidebarOpen(false)}>
          <img src={japworldLogo} alt="JapWorld" className="h-8 w-auto" />
        </Link>
        <p className="text-primary/40 text-xs font-display tracking-widest mt-1">クライアントポータル</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, path, icon: Icon }) => {
          const isActive =
            path === "/portal"
              ? location.pathname === "/portal"
              : location.pathname.startsWith(path);
          return (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileSidebarOpen(false)}
              className={`
                relative flex items-center gap-3 px-4 py-3 text-sm font-medium
                border border-transparent transition-all duration-200 group
                ${
                  isActive
                    ? "bg-primary/10 border-primary/20 text-primary"
                    : "text-muted-foreground hover:bg-card/80 hover:text-foreground"
                }
              `}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border/50 space-y-1">
        <button
          onClick={handleSignOut}
          className="relative flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-card/80 hover:text-foreground transition-all duration-200 group"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile sidebar backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-50 flex flex-col
          transition-transform duration-300 ease-out lg:hidden
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar mobile />
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-border/50 bg-card/40 backdrop-blur-sm flex-shrink-0">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <img src={japworldLogo} alt="JapWorld" className="h-7 w-auto" />
          <button
            onClick={handleSignOut}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Sign out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </header>

        {/* Desktop topbar with current page breadcrumb */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-border/50 bg-card/20 flex-shrink-0">
          <div>
            {navItems.find((n) =>
              n.path === "/portal"
                ? location.pathname === "/portal"
                : location.pathname.startsWith(n.path)
            ) && (
              <span className="text-sm text-muted-foreground">
                {navItems.find((n) =>
                  n.path === "/portal"
                    ? location.pathname === "/portal"
                    : location.pathname.startsWith(n.path)
                )?.label}
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            Client Portal
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8 animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
