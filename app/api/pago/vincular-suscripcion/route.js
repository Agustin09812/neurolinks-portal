import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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
    return NextResponse.json({ ok: true, clienteId: data.id });
  } catch (err) {
    console.error("[Vincular Suscripción] Critical error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
