import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Submission = Tables<"submissions">;

export function useSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setSubmissions(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("submissions")
      .update({ status })
      .eq("id", id);
    if (!error) {
      setSubmissions(prev =>
        prev.map(s => (s.id === id ? { ...s, status, updated_at: new Date().toISOString() } : s))
      );
    }
    return { error };
  };

  return { submissions, loading, refetch: fetch, updateStatus };
}
