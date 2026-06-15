import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { activateClientPortal } from "@/lib/railway";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.replace("Bearer ", "").trim();
    const expectedToken = (process.env.DEPLOY_SECRET_KEY || "").trim();

    if (!expectedToken || token !== expectedToken) {
      console.warn("[Deploy Portal Route] Unauthorized deploy trigger attempt.");
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { clienteId } = await request.json().catch(() => ({}));
    if (!clienteId) {
      return NextResponse.json({ error: "clienteId es requerido" }, { status: 400 });
    }

    console.log(`[Deploy Portal Route] Triggering deployment for client ID '${clienteId}'`);
    const adminDb = createAdminClient();

    // Trigger activation in background to prevent connection timeout
    activateClientPortal(clienteId, adminDb)
      .then((res) => {
        console.log(`[Deploy Portal Route] Background activation completed for client ID '${clienteId}':`, res);
      })
      .catch((actErr) => {
        console.error(`[Deploy Portal Route] Background activation failed for client ID '${clienteId}':`, actErr);
      });

    return NextResponse.json({ ok: true, message: "Deploy triggered successfully" });
  } catch (err) {
    console.error("[Deploy Portal Route] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
