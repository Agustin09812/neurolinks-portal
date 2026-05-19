"use client";

import { useState } from "react";

const FEATURES = [
  "Chatbot con IA integrado",
  "Panel de control completo",
  "Métricas y reportes en tiempo real",
  "Soporte y actualizaciones incluidas",
];

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

export default function PagoClient({ cliente }) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const planName = cliente?.plan  ?? "Plan Neurolinks";
  const abono    = cliente?.abono ?? null;

  const handlePay = async () => {
    setLoading(true);
    setError("");
    try {
      const res  = await fetch("/api/pago/crear", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.init_point) throw new Error(data.error ?? "Error al crear el pago");
      window.location.href = data.init_point;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-white/25 text-xs font-heading font-semibold tracking-widest uppercase mb-3">
          Un paso más
        </p>
        <h1 className="font-heading font-extrabold text-white text-3xl mb-2">
          Activá tu portal
        </h1>
        <p className="text-white/40 text-sm">
          Tu backoffice se despliega automáticamente después del pago.
        </p>
      </div>

      {/* Plan card */}
      <div className="glass-strong rounded-2xl overflow-hidden mb-6">
        <div className="p-6">
          {/* Plan header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-white/30 text-[11px] font-heading font-semibold tracking-widest uppercase mb-1">
                Tu plan
              </p>
              <h2 className="font-heading font-bold text-white text-xl">{planName}</h2>
            </div>
            {abono && (
              <div className="text-right">
                <p className="text-white/30 text-[10px] font-heading uppercase tracking-wide mb-0.5">
                  Abono mensual
                </p>
                <p className="text-gradient-accent font-heading font-extrabold text-2xl">
                  ${Number(String(abono).replace(/[^0-9.]/g, "")).toLocaleString("es-AR")}
                </p>
                <p className="text-white/25 text-[10px]">ARS / mes</p>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.07] mb-5" />

          {/* Features */}
          <ul className="space-y-2.5 mb-6">
            {FEATURES.map(f => (
              <li key={f} className="flex items-start gap-2.5">
                <CheckIcon />
                <span className="text-white/60 text-sm">{f}</span>
              </li>
            ))}
          </ul>

          {/* Error */}
          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-xl px-4 py-3"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)" }}>
              <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <span className="text-red-400/90 text-sm">{error}</span>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handlePay}
            disabled={loading}
            className="btn-gradient w-full py-3.5 rounded-xl font-heading font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Redirigiendo a MercadoPago..." : "Activar mi portal →"}
          </button>

          <p className="text-center text-white/20 text-[10px] mt-3">
            Pago seguro procesado por MercadoPago
          </p>
        </div>
      </div>

      <p className="text-center text-white/20 text-xs">
        ¿Preguntas?{" "}
        <a href="mailto:hola@neurolinks.com.ar" className="text-accent-subtle hover:text-white transition-colors">
          Contactanos
        </a>
      </p>
    </div>
  );
}
