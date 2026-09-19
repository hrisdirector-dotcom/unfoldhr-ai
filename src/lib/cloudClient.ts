import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { brokeredPreviewStorage } from "@/integrations/supabase/previewAuthStorage";

const FALLBACK_CLOUD_URL = "https://vjjevcxsgymuollruzlc.supabase.co";
const FALLBACK_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqamV2Y3hzZ3ltdW9sbHJ1emxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3ODExMTcsImV4cCI6MjA5MDM1NzExN30.xXMbjx25CrnTQVpKLIOdvSncX6w85ZYfrIyeAsF-Z7E";

export const cloudUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_CLOUD_URL;
export const cloudPublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || FALLBACK_PUBLISHABLE_KEY;

export const supabase = createClient<Database>(cloudUrl, cloudPublishableKey, {
  auth: {
    storage: brokeredPreviewStorage(),
    persistSession: true,
    autoRefreshToken: true,
  },
});