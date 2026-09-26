import { useState } from "react";
import { RevealDiv } from "@/components/RevealDiv";
import { useAuth } from "@/hooks/useAuth";

interface AuthPageProps {
  onLogin: (user: { email: string; role: string }) => void;
  setPage: (p: string) => void;
}

export default function AuthPage({ onLogin, setPage }: AuthPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, isAdmin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: err } = await signIn(email, password);
      if (err) {
        setError(err.message);
        return;
      }
      // After successful auth, check role via a short delay for state to settle
      setTimeout(() => {
        onLogin({ email, role: isAdmin ? "admin" : "user" });
        setPage("dashboard");
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-6 pt-20">
      <RevealDiv>
        <div className="bg-card border border-border rounded-2xl p-8 md:p-10 w-full max-w-md">
          <h1 className="font-display text-2xl text-foreground mb-1">Client Workspace</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Sign in to your workspace. Access is for approved clients and evaluators.
          </p>

          {error && <div className="text-sm text-destructive bg-destructive/10 px-4 py-2 rounded-lg mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-foreground text-background font-bold text-sm border-none cursor-pointer hover:bg-primary transition-colors disabled:opacity-60"
            >
              {loading ? "Please wait..." : "Sign In →"}
            </button>
          </form>
        </div>
      </RevealDiv>
    </div>
  );
}
