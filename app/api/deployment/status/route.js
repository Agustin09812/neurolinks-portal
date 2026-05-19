import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ready: false });

  const { data: cliente } = await supabase
    .from("clientes")
    .select("backoffice_activado, deployment_url")
    .eq("auth_user_id", user.id)
    .single();

  const ready = !!(cliente?.backoffice_activado && cliente?.deployment_url);
  return NextResponse.json({ ready, url: cliente?.deployment_url ?? null });
}
