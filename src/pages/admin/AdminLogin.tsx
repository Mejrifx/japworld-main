import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import japworldLogo from "@/assets/japworld-logo.png";

const AdminLogin = () => {
  const { user, role, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user && role === "admin") return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: signInError } = await signIn(email, password);
    setSubmitting(false);
    if (signInError) {
      setError("Invalid credentials. Admin access only.");
      return;
    }
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-10">
          <img src={japworldLogo} alt="JapWorld" className="h-12 w-auto" />
        </div>

        <div className="border-shoji bg-card/60 backdrop-blur-sm p-8 relative">
          <div className="absolute -top-2 -left-2 w-5 h-5 border-l-2 border-t-2 border-primary/60" />
          <div className="absolute -top-2 -right-2 w-5 h-5 border-r-2 border-t-2 border-primary/60" />
          <div className="absolute -bottom-2 -left-2 w-5 h-5 border-l-2 border-b-2 border-primary/60" />
          <div className="absolute -bottom-2 -right-2 w-5 h-5 border-r-2 border-b-2 border-primary/60" />

          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/20 mb-4">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <p className="text-primary/50 font-display text-xs tracking-widest mb-1">
              管理者ポータル
            </p>
            <h1 className="font-display text-2xl text-foreground">Admin Portal</h1>
            <p className="text-muted-foreground text-sm mt-2">
              Restricted access. Authorised personnel only.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-background/60 border border-border/60 text-foreground placeholder-muted-foreground px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60 transition-all duration-200"
                placeholder="admin@japworld.com"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-background/60 border border-border/60 text-foreground placeholder-muted-foreground px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/60 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="relative w-full group border-shoji bg-primary/10 hover:bg-primary/20 text-primary font-medium py-3 px-6 text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Signing in…
                </span>
              ) : (
                "Admin Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <a href="/" className="hover:text-primary transition-colors">
            ← Back to JapWorld
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
