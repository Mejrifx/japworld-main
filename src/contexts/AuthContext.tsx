import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import type { UserRole } from "@/lib/database.types";

// Mock user interface (not Supabase User)
interface MockUser {
  id: string;
  email: string;
}

interface Profile {
  id: string;
  role: UserRole;
  client_id: string | null;
}

interface AuthContextValue {
  session: { user: MockUser } | null;
  user: MockUser | null;
  profile: Profile | null;
  role: UserRole | null;
  clientId: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const STORAGE_KEY = "japworld_session";
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<{ user: MockUser } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { user: MockUser };
        setSession(parsed);
        // Load profile for the stored user
        loadProfile(parsed.user.id);
        return;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, role, client_id")
      .eq("id", userId)
      .single();

    if (error || !data) {
      console.error("Failed to load profile:", error);
      setProfile(null);
      localStorage.removeItem(STORAGE_KEY);
      setSession(null);
    } else {
      setProfile(data as Profile);
    }
    setLoading(false);
  };

  // Client-side only sign in - looks up profile by email, no password check
  const signIn = async (email: string, _password: string) => {
    // Look up the profile by email (via clients table join or direct lookup)
    // Since profiles don't have email, we need to find the client first
    const { data: clientData, error: clientError } = await supabase
      .from("clients")
      .select("id, email")
      .eq("email", email)
      .maybeSingle();

    if (clientError) {
      return { error: "Error looking up account" };
    }

    if (!clientData) {
      // Check if there's an admin profile that might match
      // For admin accounts, we check a different way
      const { data: adminProfiles } = await supabase
        .from("profiles")
        .select("id, role, client_id")
        .eq("role", "admin");

      // If there's an admin profile, allow login with any admin email pattern
      // In production, you'd have admin emails stored somewhere
      if (adminProfiles && adminProfiles.length > 0) {
        // For simplicity, any email with "admin" in it logs in as first admin
        // In real usage, admins would be pre-created in the database
        if (email.includes("admin")) {
          const adminProfile = adminProfiles[0];
          const mockUser: MockUser = {
            id: adminProfile.id,
            email: email,
          };
          const newSession = { user: mockUser };
          setSession(newSession);
          setProfile(adminProfile as Profile);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
          return { error: null };
        }
      }

      return { error: "No account found with this email" };
    }

    // Client found - look up their profile
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id, role, client_id")
      .eq("client_id", clientData.id)
      .maybeSingle();

    if (profileError || !profileData) {
      return { error: "Profile not found for this account" };
    }

    // Create mock session
    const mockUser: MockUser = {
      id: profileData.id,
      email: email,
    };
    const newSession = { user: mockUser };
    setSession(newSession);
    setProfile(profileData as Profile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));

    return { error: null };
  };

  const signOut = async () => {
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        profile,
        role: profile?.role ?? null,
        clientId: profile?.client_id ?? null,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
