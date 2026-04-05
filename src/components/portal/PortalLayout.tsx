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
  ChevronDown,
  Building2,
} from "lucide-react";
import japworldLogo from "@/assets/japworld-logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { useMyClient } from "@/hooks/usePortalData";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { label: "Dashboard", path: "/portal", icon: LayoutDashboard },
  { label: "Account", path: "/portal/account", icon: User },
  { label: "Transactions", path: "/portal/transactions", icon: ArrowLeftRight },
  { label: "Invoices", path: "/portal/invoices", icon: FileText },
  { label: "My Vehicles", path: "/portal/vehicles", icon: Car },
  { label: "Stock Status", path: "/portal/stock", icon: Ship },
];

interface PortalLayoutProps {
  children: React.ReactNode;
}

const PortalLayout = ({ children }: PortalLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { data: client } = useMyClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <nav className="glass-nav rounded-2xl px-4 sm:px-6 py-3 transition-all duration-300">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link 
                to="/portal" 
                className="flex items-center gap-3 group"
              >
                <img 
                  src={japworldLogo} 
                  alt="JapWorld" 
                  className="h-8 w-auto transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-border/50">
                  <Building2 className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground tracking-wider">
                    {client?.company_name || "CLIENT PORTAL"}
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navItems.map(({ label, path, icon: Icon }) => {
                  const isActive =
                    path === "/portal"
                      ? location.pathname === "/portal"
                      : location.pathname.startsWith(path);
                  return (
                    <Link
                      key={path}
                      to={path}
                      className={`
                        relative flex items-center gap-2 px-3 py-2 text-sm font-medium
                        rounded-xl transition-all duration-200
                        ${
                          isActive
                            ? "bg-primary text-white shadow-sm"
                            : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                        }
                      `}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Right side - Theme toggle + User menu */}
              <div className="flex items-center gap-2">
                {/* Theme toggle */}
                <ThemeToggle />
                
                {/* Desktop user menu */}
                <div className="hidden md:block relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground/80 max-w-[120px] truncate">
                      {client?.contact_name || user?.email?.split("@")[0] || "Client"}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* User dropdown */}
                  {userMenuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-border/50 py-2 z-50">
                        <div className="px-4 py-3 border-b border-border/50">
                          <p className="text-sm font-medium text-foreground">{client?.contact_name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{client?.company_name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{user?.email}</p>
                        </div>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5 text-foreground" />
                  ) : (
                    <Menu className="h-5 w-5 text-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden mt-4 pt-4 border-t border-border/50">
                <div className="space-y-1">
                  {navItems.map(({ label, path, icon: Icon }) => {
                    const isActive =
                      path === "/portal"
                        ? location.pathname === "/portal"
                        : location.pathname.startsWith(path);
                    return (
                      <Link
                        key={path}
                        to={path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`
                          flex items-center gap-3 px-4 py-3 text-sm font-medium
                          rounded-xl transition-all duration-200
                          ${
                            isActive
                              ? "bg-primary text-white"
                              : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                          }
                        `}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="px-4 py-2 mb-2">
                    <p className="text-sm font-medium text-foreground">{client?.contact_name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{client?.company_name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-xl transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Main content - with top padding for fixed nav */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="animate-fade-in">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default PortalLayout;
