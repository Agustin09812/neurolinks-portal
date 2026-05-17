"use client";

import { useState } from "react";
import { asistentes } from "@/data/asistentes";

const COLORS = [
  "#0078D4", "#10B981", "#8B5CF6", "#F59E0B",
  "#EC4899", "#06B6D4", "#84CC16", "#F97316",
];

function ContactRow({ bot, index, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors border-b border-white/[0.04] " +
        (isActive ? "bg-white/[0.09]" : "hover:bg-white/[0.04] active:bg-white/[0.06]")
      }
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
        style={{ background: COLORS[index % COLORS.length] }}
      >
        {bot.name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white/90 text-xs font-semibold truncate leading-snug">{bot.name}</p>
        <p className="text-white/30 text-[10px]">Asistente IA · En línea</p>
      </div>
      <span
        className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
        style={{ boxShadow: "0 0 5px rgba(52,211,153,0.7)" }}
      />
    </button>
  );
}

function ContactsSidebar({ bots, selected, onSelect }) {
  return (
    <div className="flex flex-col h-full" style={{ background: "#080f1a" }}>
      <div className="px-4 py-3 border-b border-white/[0.07] shrink-0">
        <p className="font-heading font-bold text-white/90 text-sm">Asistentes</p>
        <p className="text-white/25 text-[10px] mt-0.5">Seleccioná uno para chatear</p>
      </div>

      <div className="px-3 py-2 border-b border-white/[0.05] shrink-0">
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-1.5"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <svg className="w-3 h-3 text-white/20 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <span className="text-white/20 text-[10px]">Buscar asistente...</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        {bots.map((bot, i) => (
          <ContactRow
            key={bot.id}
            bot={bot}
            index={i}
            isActive={selected?.bot.id === bot.id}
            onClick={() => onSelect({ bot, index: i })}
          />
        ))}
      </div>
    </div>
  );
}

function ChatPlaceholder() {
  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-4 px-6"
      style={{ background: "#060c17" }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: "rgba(0,153,255,0.07)", border: "1px solid rgba(0,153,255,0.12)" }}
      >
        <svg className="w-7 h-7 text-accent/40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-white/40 text-sm font-heading font-semibold">Probá un asistente</p>
        <p className="text-white/20 text-xs mt-1.5 leading-relaxed">
          Seleccioná un contacto de la lista para iniciar el chat en vivo
        </p>
      </div>
    </div>
  );
}

function ChatPane({ bot, color, onBack }) {
  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center gap-2.5 px-3 py-2.5 border-b border-white/[0.07] shrink-0"
        style={{ background: "#0a1422" }}
      >
        <button
          onClick={onBack}
          className="md:hidden text-white/40 hover:text-white transition-colors mr-0.5 p-0.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ background: color }}
        >
          {bot.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white/90 text-sm font-semibold truncate leading-none">{bot.name}</p>
          <p className="text-emerald-400 text-[10px] mt-0.5">En línea</p>
        </div>
        <span
          className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"
          style={{ boxShadow: "0 0 6px rgba(52,211,153,0.7)" }}
        />
      </div>

      <div className="flex-1 min-h-0 overflow-hidden relative bg-white">
        <iframe
          src={bot.url}
          className="w-full border-0 block absolute top-0 left-0 right-0"
          style={{ height: "calc(100% + 88px)" }}
          title={`Chat con ${bot.name}`}
          allow="microphone"
        />
      </div>
    </div>
  );
}

const FEATURES = [
  "Sin registro ni instalación",
  "Respuestas en tiempo real con IA",
  "Disponibles 24/7 los 365 días",
];

export default function AsistentesPreview() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="asistentes-preview" className="relative py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-glow-blue opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr,7fr] gap-10 lg:gap-16 items-center">

          {/* LEFT ── Text */}
          <div>
            <div className="inline-flex items-center gap-2 glass px-4 py-2 mb-6 text-xs font-heading font-semibold tracking-widest uppercase text-accent-subtle rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-light animate-pulse" />
              Asistentes IA
            </div>

            <h2 className="font-heading font-extrabold text-white text-4xl sm:text-5xl leading-[1.1] mb-5">
              Probá nuestros{" "}
              <span className="text-gradient-accent">bots en vivo</span>
            </h2>

            <p className="text-white/50 text-base leading-relaxed mb-8">
              Seleccioná cualquier asistente del panel y chateá ahora mismo, sin registrarte. La misma tecnología que ya usan tus clientes.
            </p>

            <ul className="space-y-3 mb-10">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-accent/[0.10] border border-accent/20 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-accent-light" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <span className="text-white/60 text-sm">{f}</span>
                </li>
              ))}
            </ul>

            <p className="text-white/25 text-xs flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
                style={{ boxShadow: "0 0 5px rgba(52,211,153,0.7)" }}
              />
              {asistentes.length} asistentes activos · Seleccioná uno en el panel
            </p>
          </div>

          {/* RIGHT ── Tablet mockup */}
          <div>
            {/* Browser-like top bar */}
            <div
              className="flex items-center gap-3 px-4 py-2.5 rounded-t-2xl"
              style={{
                background: "#050b15",
                border: "1.5px solid rgba(0,153,255,0.14)",
                borderBottom: "1px solid rgba(0,153,255,0.07)",
              }}
            >
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
              </div>
              <div
                className="flex-1 flex items-center gap-2 rounded-md px-3 py-1"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <svg className="w-3 h-3 text-white/20 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span className="text-white/20 text-[10px] font-heading tracking-wide">neurolinks.ia · asistentes</span>
              </div>
            </div>

            {/* Screen */}
            <div
              className="overflow-hidden"
              style={{
                height: 430,
                border: "1.5px solid rgba(0,153,255,0.14)",
                borderTop: "none",
                borderRadius: "0 0 18px 18px",
                boxShadow: "0 24px 70px rgba(0,0,0,0.6), 0 0 80px rgba(0,153,255,0.06)",
              }}
            >
              <div className="flex h-full">

                {/* Contacts sidebar */}
                <div
                  className={
                    "flex-col border-r border-white/[0.07] shrink-0 md:w-52 " +
                    (selected ? "hidden md:flex" : "flex w-full")
                  }
                >
                  <ContactsSidebar
                    bots={asistentes}
                    selected={selected}
                    onSelect={setSelected}
                  />
                </div>

                {/* Chat area */}
                <div
                  className={
                    "flex-col flex-1 min-w-0 " +
                    (!selected ? "hidden md:flex" : "flex")
                  }
                >
                  {selected ? (
                    <ChatPane
                      bot={selected.bot}
                      color={COLORS[selected.index % COLORS.length]}
                      onBack={() => setSelected(null)}
                    />
                  ) : (
                    <ChatPlaceholder />
                  )}
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
