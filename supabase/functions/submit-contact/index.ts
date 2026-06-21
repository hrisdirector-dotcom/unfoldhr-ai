import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

const MAX_NAME = 120
const MAX_EMAIL = 254
const MAX_COMPANY = 200
const MAX_JOURNEY = 200
const MAX_MESSAGE = 4000

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const name = clean(body.name, MAX_NAME)
  const email = clean(body.email, MAX_EMAIL).toLowerCase()
  const company = clean(body.company, MAX_COMPANY)
  const aiJourney = clean(body.aiJourney, MAX_JOURNEY)
  const message = clean(body.message, MAX_MESSAGE)
  // Honeypot: bots tend to fill every field. If present, silently accept.
  const honeypot = clean(body.website, 200)

  if (!name || !email || !aiJourney || !message) {
    return new Response(
      JSON.stringify({ error: 'Missing required fields' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
  if (!EMAIL_RE.test(email)) {
    return new Response(
      JSON.stringify({ error: 'Invalid email address' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, serviceKey)

  const submissionId = crypto.randomUUID()

  // Silently swallow honeypot hits so bots can't tell they were caught.
  if (honeypot) {
    return new Response(JSON.stringify({ success: true, id: submissionId }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const { error: dbError } = await supabase.from('submissions').insert({
    id: submissionId,
    request_type: 'contact',
    contact_name: name,
    email,
    company_name: company,
    message: `AI Journey: ${aiJourney}\n\n${message}`,
  })

  if (dbError) {
    console.error('submit-contact insert failed', dbError)
    return new Response(
      JSON.stringify({ error: 'Failed to record submission' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  // Trigger the confirmation email server-side using the service role.
  // The send-transactional-email function rejects non-service-role callers,
  // so this path is the only way the contact-confirmation template can fire.
  try {
    await supabase.functions.invoke('send-transactional-email', {
      body: {
        templateName: 'contact-confirmation',
        recipientEmail: email,
        idempotencyKey: `contact-confirm-${submissionId}`,
        templateData: { name },
      },
    })
  } catch (e) {
    console.error('submit-contact email invoke failed', e)
    // Do not fail the submission if email enqueue fails; the row is saved.
  }

  return new Response(JSON.stringify({ success: true, id: submissionId }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
