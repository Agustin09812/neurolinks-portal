"use client";

import { useEffect, useRef, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

/* ─── Counter hook ─────────────────────────────────────────── */
function useCountUp(target, duration = 1600) {
  const [value, setValue] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return { value, ref };
}

/* ─── Mini bar chart ───────────────────────────────────────── */
function BarChart({ active }) {
  const bars = [35, 55, 45, 70, 60, 85, 75];
  return (
    <div className="flex items-end gap-1 h-9">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-1.5 rounded-sm transition-all duration-700"
          style={{
            background: "rgba(0,153,255,0.7)",
            height: active ? `${h}%` : "4px",
            transitionDelay: `${i * 80}ms`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── SVG progress ring ────────────────────────────────────── */
function ProgressRing({ value, active }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = active ? circ - (value / 100) * circ : circ;
  return (
    <svg width="72" height="72" className="-rotate-90">
      <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
      <circle
        cx="36" cy="36" r={r} fill="none"
        stroke="#10B981" strokeWidth="5" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)" }}
      />
    </svg>
  );
}

/* ─── Trend arrow SVG ──────────────────────────────────────── */
function TrendLine() {
  return (
    <svg viewBox="0 0 80 36" className="w-20 h-9" fill="none">
      <polyline
        points="4,32 20,22 36,26 52,12 68,4 76,8"
        stroke="rgba(251,146,60,0.5)" strokeWidth="1.5" strokeLinejoin="round"
      />
      <polyline
        points="4,32 20,22 36,26 52,12 68,4 76,8"
        stroke="#FB923C" strokeWidth="2" strokeLinejoin="round"
        strokeDasharray="150" strokeDashoffset="0"
        className="opacity-80"
      />
      <circle cx="76" cy="8" r="3" fill="#FB923C" />
    </svg>
  );
}

/* ─── Main component ───────────────────────────────────────── */
export default function AboutSection() {
  const { value: v500, ref: ref500 } = useCountUp(500);
  const { value: v98,  ref: ref98  } = useCountUp(98);
  const { value: v3,   ref: ref3   } = useCountUp(3, 1000);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="nosotros" ref={sectionRef} className="relative py-24 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Metric cards ── */}
          <div className="grid grid-cols-2 gap-3">

            {/* 500+ Clientes */}
            <div
              ref={ref500}
              className="glass-card rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden"
            >
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(0,153,255,0.15) 0%, transparent 70%)" }}
              />
              <BarChart active={visible} />
              <div>
                <p className="font-heading font-extrabold text-3xl text-gradient-accent leading-none">
                  {v500}+
                </p>
                <p className="text-white/40 text-xs mt-1">Clientes activos</p>
              </div>
            </div>

            {/* 98% Satisfacción */}
            <div
              ref={ref98}
              className="glass-card rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden"
            >
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)" }}
              />
              <div className="relative flex items-center justify-center w-[72px] h-[72px]">
                <ProgressRing value={v98} active={visible} />
                <span className="absolute text-[11px] font-heading font-bold text-white/70">
                  {v98}%
                </span>
              </div>
              <div>
                <p className="font-heading font-extrabold text-3xl leading-none" style={{ color: "#10B981" }}>
                  {v98}%
                </p>
                <p className="text-white/40 text-xs mt-1">Satisfacción</p>
              </div>
            </div>

            {/* 24/7 Disponibilidad */}
            <div className="glass-card rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden col-span-2">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(0,153,255,0.06) 0%, transparent 60%)" }}
              />
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
                    style={{
                      boxShadow: "0 0 6px rgba(52,211,153,0.8)",
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
                <span className="text-white/25 text-[10px] font-heading font-semibold tracking-widest uppercase ml-1">
                  Sistema activo
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-heading font-extrabold text-3xl text-gradient-accent leading-none">24/7</p>
                  <p className="text-white/40 text-xs mt-1">Disponibilidad garantizada</p>
                </div>
                <div className="text-right">
                  <p className="text-white/20 text-[10px] font-heading">365 días al año</p>
                  <p className="text-white/20 text-[10px] font-heading">sin interrupciones</p>
                </div>
              </div>
            </div>

            {/* 3x ROI */}
            <div
              ref={ref3}
              className="glass-card rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden"
            >
              <div
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(251,146,60,0.12) 0%, transparent 70%)" }}
              />
              <TrendLine />
              <div>
                <p className="font-heading font-extrabold text-3xl leading-none" style={{ color: "#FB923C" }}>
                  {v3}x
                </p>
                <p className="text-white/40 text-xs mt-1">Promedio de ROI</p>
              </div>
            </div>

            {/* Bonus: integraciones */}
            <div className="glass-card rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden">
              <div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }}
              />
              <div className="flex flex-wrap gap-1.5">
                {["CRM", "API", "WhatsApp", "IA"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-heading font-bold px-2 py-0.5 rounded-full border"
                    style={{
                      color: "rgba(139,92,246,0.8)",
                      borderColor: "rgba(139,92,246,0.2)",
                      background: "rgba(139,92,246,0.07)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div>
                <p className="font-heading font-extrabold text-3xl leading-none" style={{ color: "#A78BFA" }}>
                  360°
                </p>
                <p className="text-white/40 text-xs mt-1">Ecosistema integrado</p>
              </div>
            </div>

          </div>

          {/* ── RIGHT: Texto ── */}
          <div>
            <SectionTitle
              tag="Nosotros"
              title="Automatización que genera resultados reales"
              center={false}
            />

            <div className="space-y-4 text-white/50 text-sm leading-relaxed mb-6">
              <p>En Neurolinks combinamos inteligencia artificial, estrategia comercial y neuromarketing para transformar la manera en que las empresas crecen.</p>
              <p>Nuestro equipo diseña soluciones a medida integrando chatbots, CRM, WhatsApp Marketing y prospección B2B en un ecosistema que trabaja por vos las 24 horas.</p>
              <p>No vendemos tecnología, vendemos resultados. Cada cliente ve un impacto real en su facturación desde la primera semana.</p>
            </div>

            <ul className="space-y-2 mb-8">
              {[
                "Automatización de Ventas con IA.",
                "Mejora de la Atención al Cliente.",
                "Estrategias de Neuroventas y Neuromarketing.",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-white/60 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-light shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button href="/#contacto" variant="primary">Empezar ahora</Button>
              <Button href="https://wa.me/5491170644247" variant="secondary" external>Hablar con un asesor</Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
