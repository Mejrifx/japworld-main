import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Car,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  User,
} from "lucide-react";
import japworldLogo from "@/assets/japworld-logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Clients", path: "/admin/clients", icon: Users },
  { label: "Vehicles", path: "/admin/vehicles", icon: Car },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
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
                to="/admin" 
                className="flex items-center gap-3 group"
              >
                <img 
                  src={japworldLogo} 
                  alt="JapWorld" 
                  className="h-8 w-auto transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-border/50">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground tracking-wider">ADMIN</span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map(({ label, path, icon: Icon }) => {
                  const isActive =
                    path === "/admin"
                      ? location.pathname === "/admin"
                      : location.pathname.startsWith(path);
                  return (
                    <Link
                      key={path}
                      to={path}
                      className={`
                        relative flex items-center gap-2 px-4 py-2 text-sm font-medium
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

              {/* Right side - User menu */}
              <div className="flex items-center gap-2">
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
                      {user?.email?.split("@")[0] || "Admin"}
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
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-border/50 py-2 z-50">
                        <div className="px-4 py-3 border-b border-border/50">
                          <p className="text-sm font-medium text-foreground">{user?.email}</p>
                          <p className="text-xs text-muted-foreground mt-1">Administrator</p>
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
                  className="md:hidden p-2 rounded-xl hover:bg-muted/50 transition-colors"
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
              <div className="md:hidden mt-4 pt-4 border-t border-border/50">
                <div className="space-y-1">
                  {navItems.map(({ label, path, icon: Icon }) => {
                    const isActive =
                      path === "/admin"
                        ? location.pathname === "/admin"
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
                    <p className="text-sm font-medium text-foreground">{user?.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">Administrator</p>
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

export default AdminLayout;
