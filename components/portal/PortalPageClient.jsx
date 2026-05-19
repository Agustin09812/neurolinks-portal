"use client";

import Image from "next/image";
import Link from "next/link";
import AuthCard from "./AuthCard";

const FEATURES = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    ),
    text: "Chatbots con IA integrada",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    text: "Panel de métricas en tiempo real",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
    text: "Integración con CRM y WhatsApp",
  },
];

const STATS = [
  { value: "500+", label: "Clientes" },
  { value: "98%",  label: "Satisfacción" },
  { value: "24/7", label: "Soporte" },
];

export default function PortalPageClient() {
  return (
    <div className="min-h-screen flex overflow-x-hidden">

      {/* ── LEFT PANEL ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[400px] xl:w-[460px] shrink-0 relative overflow-hidden px-12 py-14"
        style={{ background: "linear-gradient(160deg, rgba(5,12,26,0.88) 0%, rgba(7,21,36,0.85) 60%, rgba(4,14,28,0.88) 100%)" }}
      >
        {/* Grid bg */}
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

        {/* Top glow */}
        <div
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,120,212,0.18) 0%, transparent 70%)" }}
        />

        {/* Right border */}
        <div
          className="absolute right-0 top-0 h-full w-px pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(0,153,255,0.2) 25%, rgba(0,153,255,0.2) 75%, transparent 100%)" }}
        />

        {/* Logo */}
        <Link href="/" className="group relative inline-block self-start">
          <Image
            src="/images/neuro-logo.png"
            alt="Neurolinks"
            width={140}
            height={56}
            className="object-contain w-32 h-auto drop-shadow-2xl transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(0,153,255,0.6)]"
            priority
          />
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#0a1a2e] border border-accent/20 px-3 py-1 text-[11px] font-heading font-semibold text-white/70 opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100">
            Volver al inicio
          </span>
        </Link>

        {/* Center content */}
        <div className="relative z-10">
          <p className="text-white/20 text-[10px] font-heading font-semibold tracking-[0.22em] uppercase mb-5">
            Portal de clientes
          </p>
          <h2 className="font-heading font-extrabold text-white text-3xl xl:text-[2.15rem] leading-[1.15] mb-5">
            Automatización<br />
            que genera<br />
            <span className="text-gradient-accent">resultados reales</span>
          </h2>
          <p className="text-white/35 text-sm leading-relaxed mb-8 max-w-xs">
            Accedé a tu espacio de trabajo y monitoreá tus campañas, chatbots y métricas en un solo lugar.
          </p>

          <ul className="space-y-3 mb-10">
            {FEATURES.map((f, i) => (
              <li key={i} className="flex items-center gap-3">
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-accent-light"
                  style={{ background: "rgba(0,153,255,0.08)", border: "1px solid rgba(0,153,255,0.16)" }}
                >
                  {f.icon}
                </span>
                <span className="text-white/50 text-sm">{f.text}</span>
              </li>
            ))}
          </ul>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2.5">
            {STATS.map((s) => (
              <div key={s.label} className="glass rounded-xl px-2 py-3 text-center">
                <p className="font-heading font-extrabold text-gradient-accent text-xl leading-none mb-0.5">{s.value}</p>
                <p className="text-white/25 text-[10px] font-heading">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="relative z-10 flex items-center gap-2.5">
          <span
            className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse"
            style={{ boxShadow: "0 0 6px rgba(52,211,153,0.8)" }}
          />
          <span className="text-white/25 text-xs font-heading">Sistema activo · En línea</span>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        className="flex-1 flex flex-col items-center justify-center relative overflow-y-auto px-4 py-12"
        style={{ background: "rgba(7,17,31,0.78)" }}
      >
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-glow-accent opacity-20 pointer-events-none" />

        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link href="/" className="group relative inline-block">
            <Image
              src="/images/neuro-logo.png"
              alt="Neurolinks"
              width={120}
              height={48}
              className="object-contain w-24 h-auto drop-shadow-2xl transition-all duration-300 group-hover:drop-shadow-[0_0_18px_rgba(0,153,255,0.55)]"
              priority
            />
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#0a1a2e] border border-accent/20 px-3 py-1 text-[11px] font-heading font-semibold text-white/70 opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100">
              Volver al inicio
            </span>
          </Link>
        </div>

        <div className="relative z-10 w-full max-w-sm">
          <AuthCard />

          <p className="text-center text-white/20 text-xs mt-6">
            Al continuar aceptás los{" "}
            <Link href="/politicas" className="hover:text-white/50 transition-colors underline underline-offset-2">
              términos y políticas de privacidad
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}
