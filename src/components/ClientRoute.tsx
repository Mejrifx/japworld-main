import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ClientRouteProps {
  children: React.ReactNode;
}

export function ClientRoute({ children }: ClientRouteProps) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (role === "admin") return <Navigate to="/admin" replace />;
  if (role !== "client") return <Navigate to="/login" replace />;

  return <>{children}</>;
}
