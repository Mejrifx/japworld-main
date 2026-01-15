/**
 * Password Gate Component
 * 
 * A minimal, Japanese-styled password modal that gates access to the main site.
 * 
 * PASSWORD CONFIGURATION:
 * - To change the password, modify the SITE_PASSWORD constant below
 * - Currently set to: "japanimport"
 * 
 * STORAGE:
 * - Uses localStorage to persist unlock state (client-side only)
 * - Key: "japworld_unlocked"
 * 
 * FUTURE AUTH:
 * - Replace the handleSubmit logic with real authentication
 * - The isUnlocked state and onUnlock callback structure supports this
 */

import { useState, useEffect } from "react";
import { Lock, AlertCircle } from "lucide-react";

// ============================================
// PASSWORD CONFIGURATION - Change this value
// ============================================
const SITE_PASSWORD = "japanimport";
const STORAGE_KEY = "japworld_unlocked";

interface PasswordGateProps {
  children: React.ReactNode;
}

const PasswordGate = ({ children }: PasswordGateProps) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setIsUnlocked(stored === "true");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === SITE_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true");
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setIsShaking(true);
      setPassword("");
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  // Show nothing while checking localStorage
  if (isUnlocked === null) {
    return null;
  }

  // Show children if unlocked
  if (isUnlocked) {
    return <>{children}</>;
  }

  // Password gate UI
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-in">
      {/* Decorative corner accents - Shoji inspired */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/30" />

      <div 
        className={`
          relative w-full max-w-sm mx-4 p-8 
          bg-card/80 backdrop-blur-md
          border border-border
          shadow-2xl shadow-black/40
          ${isShaking ? 'animate-shake' : ''}
        `}
      >
        {/* Shoji-inspired frame corners */}
        <div className="absolute -top-px -left-px w-8 h-8">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-primary to-transparent" />
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-primary to-transparent" />
        </div>
        <div className="absolute -top-px -right-px w-8 h-8">
          <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-primary to-transparent" />
          <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-primary to-transparent" />
        </div>
        <div className="absolute -bottom-px -left-px w-8 h-8">
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-primary to-transparent" />
          <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-primary to-transparent" />
        </div>
        <div className="absolute -bottom-px -right-px w-8 h-8">
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-primary to-transparent" />
          <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-primary to-transparent" />
        </div>

        {/* Lock icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
            <Lock className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center font-display text-xl text-foreground mb-2">
          Private Access
        </h2>
        <p className="text-center text-sm text-muted-foreground mb-8">
          Enter password to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter password"
              className={`
                w-full px-4 py-3 
                bg-background/50 
                border ${error ? 'border-destructive' : 'border-border'}
                text-foreground placeholder:text-muted-foreground/50
                focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50
                transition-colors duration-200
                text-center tracking-widest
              `}
              autoFocus
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-center justify-center gap-2 mb-4 text-destructive text-sm animate-fade-in">
              <AlertCircle className="w-4 h-4" />
              <span>Incorrect password</span>
            </div>
          )}

          <button
            type="submit"
            className="
              w-full py-3 
              bg-primary/10 hover:bg-primary/20
              border border-primary/30 hover:border-primary/50
              text-primary font-medium
              transition-all duration-200
              uppercase tracking-[0.2em] text-sm
            "
          >
            Enter
          </button>
        </form>

        {/* Decorative bottom element */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30" />
          <span className="text-primary/40 text-xs">門</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </div>
    </div>
  );
};

export default PasswordGate;
