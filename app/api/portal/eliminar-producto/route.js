import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await request.json().catch(() => ({}));

    if (!id) {
      return NextResponse.json({ error: "Falta el ID del producto a eliminar" }, { status: 400 });
    }

    // 1. Fetch client to verify ownership and that it is unpaid
    const { data: cliente, error: fetchError } = await supabase
      .from("clientes")
      .select("id, auth_user_id, backoffice_activado")
      .eq("id", id)
      .eq("auth_user_id", user.id)
      .single();

    if (fetchError || !cliente) {
      return NextResponse.json({ error: "Instancia no encontrada o no pertenece a tu usuario" }, { status: 404 });
    }

    if (cliente.backoffice_activado) {
      return NextResponse.json({ error: "No se puede eliminar una instancia que ya ha sido pagada/activada" }, { status: 400 });
    }

    // 2. Delete the record from clientes table
    const { error: deleteError } = await supabase
      .from("clientes")
      .delete()
      .eq("id", id)
      .eq("auth_user_id", user.id);

    if (deleteError) {
      console.error("[Eliminar Producto] Database delete error:", deleteError);
      throw new Error(deleteError.message || "Error al eliminar la instancia de la base de datos.");
    }

    console.log(`[Eliminar Producto] Successfully deleted unpaid product ${id} for user ${user.id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Eliminar Producto] Critical error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
