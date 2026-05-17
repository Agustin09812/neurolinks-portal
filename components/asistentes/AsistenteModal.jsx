"use client";

import { useEffect } from "react";

export default function AsistenteModal({ asistente, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!asistente) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-md" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md glass-strong rounded-2xl overflow-hidden flex flex-col glow-accent" style={{ maxHeight: "90vh" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-accent/[0.1]">
          <div>
            <p className="text-[10px] text-accent-muted font-heading font-semibold tracking-widest uppercase">Asistente IA</p>
            <h2 className="font-heading font-bold text-white text-base leading-tight">{asistente.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-accent/20 flex items-center justify-center text-white/60 hover:text-white transition-all border border-accent/[0.1]"
            aria-label="Cerrar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Iframe */}
        <div className="flex-1 overflow-hidden" style={{ minHeight: "420px" }}>
          <iframe
            src={asistente.url}
            title={`Chatbot ${asistente.name}`}
            className="w-full h-full border-0"
            style={{ height: "min(560px, 70vh)" }}
            allow="microphone; camera"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
