import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { activateClientPortal } from "@/lib/railway";

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { preapprovalId } = await request.json().catch(() => ({}));

    if (!preapprovalId) {
      return NextResponse.json({ error: "preapprovalId es requerido" }, { status: 400 });
    }

    console.log(`[Vincular Suscripción] Associating preapproval_id '${preapprovalId}' to user '${user.id}'`);

    // Update client row with the preapproval subscription ID
    const { data, error } = await supabase
      .from("clientes")
      .update({ mp_preapproval_id: String(preapprovalId) })
      .eq("auth_user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("[Vincular Suscripción] Database update error:", error);
      return NextResponse.json({ error: "Error al actualizar la base de datos" }, { status: 500 });
    }

    console.log(`[Vincular Suscripción] Successfully linked client ${data.id} to subscription ${preapprovalId}`);

    // Fallback: If not activated, trigger activation/deployment directly in background to avoid HTTP timeout
    if (!data.backoffice_activado) {
      console.log(`[Vincular Suscripción] Client ${data.id} is not yet activated. Triggering activation fallback in background...`);
      const adminDb = createAdminClient();
      activateClientPortal(data.id, adminDb)
        .then((res) => {
          console.log(`[Vincular Suscripción] Background activation fallback completed for client ${data.id}:`, res);
        })
        .catch((actErr) => {
          console.error(`[Vincular Suscripción] Background activation fallback failed for client ${data.id}:`, actErr);
        });
    } else {
      console.log(`[Vincular Suscripción] Client ${data.id} is already activated.`);
    }

    return NextResponse.json({ ok: true, clienteId: data.id });
  } catch (err) {
    console.error("[Vincular Suscripción] Critical error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
