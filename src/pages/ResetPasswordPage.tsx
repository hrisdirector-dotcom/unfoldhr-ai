import { useEffect, useState } from "react";
import { RevealDiv } from "@/components/RevealDiv";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/cloudClient";

interface ResetPasswordPageProps {
  setPage: (p: string) => void;
}

export default function ResetPasswordPage({ setPage }: ResetPasswordPageProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [recoveryReady, setRecoveryReady] = useState<boolean | null>(null);
  const { updatePassword } = useAuth();

  useEffect(() => {
    // Supabase delivers the recovery session in the URL hash (#type=recovery).
    // The client picks it up automatically; we just confirm a session exists.
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setRecoveryReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setRecoveryReady(!!session);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error: err } = await updatePassword(password);
      if (err) {
        setError(err.message);
        return;
      }
      setDone(true);
      setTimeout(() => setPage("dashboard"), 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-6 pt-20">
      <RevealDiv>
        <div className="bg-card border border-border rounded-2xl p-8 md:p-10 w-full max-w-md">
          <h1 className="font-display text-2xl text-foreground mb-1">Set a New Password</h1>

          {recoveryReady === null ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : recoveryReady === false ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This reset link is invalid or has expired. Please request a new one from the sign-in page.
              </p>
              <button
                type="button"
                onClick={() => setPage("login")}
                className="w-full py-3.5 rounded-lg bg-foreground text-background font-bold text-sm border-none cursor-pointer hover:bg-primary transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          ) : done ? (
            <p className="text-sm text-muted-foreground">
              Your password has been updated. Taking you to your workspace…
            </p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Choose a new password for your workspace.
              </p>

              {error && <div className="text-sm text-destructive bg-destructive/10 px-4 py-2 rounded-lg mb-4">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">New Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Confirm Password</label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-lg bg-foreground text-background font-bold text-sm border-none cursor-pointer hover:bg-primary transition-colors disabled:opacity-60"
                >
                  {loading ? "Please wait..." : "Update Password"}
                </button>
              </form>
            </>
          )}
        </div>
      </RevealDiv>
    </div>
  );
}
