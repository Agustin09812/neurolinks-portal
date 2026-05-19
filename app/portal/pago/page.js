import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PagoClient from "@/components/portal/PagoClient";

export const metadata = { title: "Activar portal | Neurolinks" };

export default async function PagoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/portal");

  const { data: cliente } = await supabase
    .from("clientes")
    .select("id, nombre, plan, abono, backoffice_activado, deployment_url")
    .eq("auth_user_id", user.id)
    .single();

  // Already paid — send directly to their backoffice
  if (cliente?.backoffice_activado && cliente?.deployment_url) {
    redirect(`https://${cliente.deployment_url}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <PagoClient cliente={cliente} />
    </div>
  );
}
