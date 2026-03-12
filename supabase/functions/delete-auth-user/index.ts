import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface DeleteRequest {
  userId: string;
  clientId: string;
}

// Get the user from request headers that Supabase Edge Runtime injects
function getUserFromRequest(req: Request): { id: string } | null {
  // Supabase Edge Runtime injects user info via x-supabase-user-id header
  const userId = req.headers.get("x-supabase-user-id");
  if (userId) {
    return { id: userId };
  }
  return null;
}

Deno.serve(async (req) => {
  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get user from request context (injected by Supabase Edge Runtime)
    const user = getUserFromRequest(req);

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - no user context found" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role key (from env)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SERVICE_ROLE_KEY")!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Check if user is admin
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || profile?.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get request body
    const { userId, clientId }: DeleteRequest = await req.json();

    if (!userId || !clientId) {
      return new Response(
        JSON.stringify({ error: "Missing userId or clientId" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Delete the auth user
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteError) {
      // If user doesn't exist, that's okay - continue to delete client data
      if (!deleteError.message?.includes("not found") && !deleteError.message?.includes("User not found")) {
        return new Response(
          JSON.stringify({ error: `Failed to delete auth user: ${deleteError.message}` }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Delete client record (cascades to all related data)
    const { error: clientError } = await supabaseAdmin
      .from("clients")
      .delete()
      .eq("id", clientId);

    if (clientError) {
      return new Response(
        JSON.stringify({ error: `Failed to delete client: ${clientError.message}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Client and auth user deleted successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
