import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/cloudClient";
import type { Json } from "@/integrations/supabase/types";

/** Shape of the `inputs` / `result` jsonb columns as used by the app: a JSON object. */
export type JsonObject = { [key: string]: Json | undefined };

export interface SavedRun {
  id: string;
  agent_type: string;
  agent_name: string;
  title: string;
  inputs: JsonObject;
  result: JsonObject;
  created_at: string;
}

export function useSavedRuns() {
  const [runs, setRuns] = useState<SavedRun[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRuns = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("saved_agent_runs")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setRuns(data as unknown as SavedRun[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchRuns(); }, [fetchRuns]);

  const saveRun = async (run: {
    agent_type: string;
    agent_name: string;
    title: string;
    inputs: Record<string, any>;
    result: Record<string, any>;
  }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: new Error("Not authenticated") };

    const { error } = await supabase
      .from("saved_agent_runs")
      .insert({
        user_id: user.id,
        agent_type: run.agent_type,
        agent_name: run.agent_name,
        title: run.title,
        inputs: run.inputs as any,
        result: run.result as any,
      });
    if (!error) await fetchRuns();
    return { error };
  };

  const deleteRun = async (id: string) => {
    const { error } = await supabase
      .from("saved_agent_runs")
      .delete()
      .eq("id", id);
    if (!error) setRuns(prev => prev.filter(r => r.id !== id));
    return { error };
  };

  return { runs, loading, saveRun, deleteRun, refetch: fetchRuns };
}
