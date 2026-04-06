import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

type Status = "loading" | "valid" | "already_unsubscribed" | "invalid" | "success" | "error";

export default function UnsubscribePage() {
  const [status, setStatus] = useState<Status>("loading");
  const [processing, setProcessing] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const validate = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${token}`,
          { headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } }
        );
        const data = await res.json();
        if (res.ok && data.valid) {
          setStatus("valid");
        } else if (data.reason === "already_unsubscribed") {
          setStatus("already_unsubscribed");
        } else {
          setStatus("invalid");
        }
      } catch {
        setStatus("invalid");
      }
    };
    validate();
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!token) return;
    setProcessing(true);
    try {
      const { data } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (data?.success) {
        setStatus("success");
      } else if (data?.reason === "already_unsubscribed") {
        setStatus("already_unsubscribed");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-6">
      <div className="bg-card border border-border rounded-2xl p-8 md:p-10 w-full max-w-md text-center">
        {status === "loading" && (
          <>
            <div className="text-3xl mb-4">⏳</div>
            <p className="text-muted-foreground text-sm">Verifying your request…</p>
          </>
        )}

        {status === "valid" && (
          <>
            <h1 className="font-display text-2xl text-foreground mb-2">Unsubscribe</h1>
            <p className="text-muted-foreground text-sm mb-6">
              Are you sure you want to unsubscribe from Unfold HR AI emails?
            </p>
            <button
              onClick={handleUnsubscribe}
              disabled={processing}
              className="w-full py-3.5 rounded-lg bg-foreground text-background font-bold text-sm border-none cursor-pointer hover:bg-primary transition-colors disabled:opacity-60"
            >
              {processing ? "Processing…" : "Confirm Unsubscribe"}
            </button>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-4xl mb-4">✓</div>
            <h1 className="font-display text-2xl text-foreground mb-2">Unsubscribed</h1>
            <p className="text-muted-foreground text-sm">
              You've been successfully unsubscribed. You won't receive any more emails from us.
            </p>
          </>
        )}

        {status === "already_unsubscribed" && (
          <>
            <div className="text-4xl mb-4">✓</div>
            <h1 className="font-display text-2xl text-foreground mb-2">Already unsubscribed</h1>
            <p className="text-muted-foreground text-sm">
              You've already unsubscribed from our emails.
            </p>
          </>
        )}

        {status === "invalid" && (
          <>
            <div className="text-3xl mb-4">⚠</div>
            <h1 className="font-display text-2xl text-foreground mb-2">Invalid link</h1>
            <p className="text-muted-foreground text-sm">
              This unsubscribe link is invalid or has expired.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-3xl mb-4">⚠</div>
            <h1 className="font-display text-2xl text-foreground mb-2">Something went wrong</h1>
            <p className="text-muted-foreground text-sm">
              We couldn't process your request. Please try again later.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
