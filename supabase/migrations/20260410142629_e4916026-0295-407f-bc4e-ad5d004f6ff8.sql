
CREATE TABLE public.saved_agent_runs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  agent_type TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  inputs JSONB NOT NULL DEFAULT '{}',
  result JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.saved_agent_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own runs"
ON public.saved_agent_runs FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can save their own runs"
ON public.saved_agent_runs FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own runs"
ON public.saved_agent_runs FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE INDEX idx_saved_agent_runs_user_id ON public.saved_agent_runs(user_id);
