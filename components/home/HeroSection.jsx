"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { useEffect, useRef, useState } from "react";

/* ─── Robot SVG ──────────────────────────────────────────────── */
function RobotSVG({ tickled, waveKey, onClick }) {
  const svgRef    = useRef(null);
  const lGroupRef = useRef(null);
  const rGroupRef = useRef(null);
  const armRef    = useRef(null);

  /* ── Arm wave via SVG transform (avoids CSS transform-box issues) ── */
  useEffect(() => {
    if (waveKey === 0) return;
    const PX = 165, PY = 178; // shoulder pivot in viewBox coords
    const DUR = 2300;
    const KF = [
      { t: 0,    a: 0   },
      { t: 0.12, a: 110 },
      { t: 0.26, a: 130 },
      { t: 0.40, a: 105 },
      { t: 0.54, a: 130 },
      { t: 0.68, a: 105 },
      { t: 0.82, a: 20  },
      { t: 1.0,  a: 0   },
    ];
    const angle = (t) => {
      for (let i = 0; i < KF.length - 1; i++) {
        if (t >= KF[i].t && t <= KF[i + 1].t) {
          const p = (t - KF[i].t) / (KF[i + 1].t - KF[i].t);
          return KF[i].a + (KF[i + 1].a - KF[i].a) * p;
        }
      }
      return 0;
    };
    const t0 = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min((now - t0) / DUR, 1);
      armRef.current?.setAttribute("transform", `rotate(${angle(t).toFixed(2)},${PX},${PY})`);
      if (t < 1) raf = requestAnimationFrame(tick);
      else armRef.current?.setAttribute("transform", "");
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); armRef.current?.setAttribute("transform", ""); };
  }, [waveKey]);

  useEffect(() => {
    const MAX_EYE  = 5;
    const LERP_EYE = 0.08;
    const L = { x: 75, y: 84 };
    const R = { x: 125, y: 84 };
    const eye  = { lx: 0, ly: 0, rx: 0, ry: 0 };
    const goal = { lx: 0, ly: 0, rx: 0, ry: 0 };
    let rafId;

    const loop = () => {
      eye.lx += (goal.lx - eye.lx) * LERP_EYE;
      eye.ly += (goal.ly - eye.ly) * LERP_EYE;
      eye.rx += (goal.rx - eye.rx) * LERP_EYE;
      eye.ry += (goal.ry - eye.ry) * LERP_EYE;
      lGroupRef.current?.setAttribute("transform", `translate(${eye.lx.toFixed(2)},${eye.ly.toFixed(2)})`);
      rGroupRef.current?.setAttribute("transform", `translate(${eye.rx.toFixed(2)},${eye.ry.toFixed(2)})`);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const onMove = (e) => {
      const svg = svgRef.current;
      if (!svg) return;
      const sr = svg.getBoundingClientRect();
      const mx = (e.clientX - sr.left) * (200 / sr.width);
      const my = (e.clientY - sr.top)  * (290 / sr.height);
      const off = (c) => {
        const dx = mx - c.x, dy = my - c.y;
        const a = Math.atan2(dy, dx), d = Math.min(Math.hypot(dx, dy), MAX_EYE);
        return { x: Math.cos(a) * d, y: Math.sin(a) * d };
      };
      const lo = off(L), ro = off(R);
      goal.lx = lo.x; goal.ly = lo.y;
      goal.rx = ro.x; goal.ry = ro.y;
    };

    const onLeave = () => { goal.lx = 0; goal.ly = 0; goal.rx = 0; goal.ry = 0; };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      style={{ animation: "robotFloat 4s ease-in-out infinite" }}
      onClick={onClick}
      className="cursor-pointer select-none"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 200 290"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[260px] xl:max-w-[300px] mx-auto drop-shadow-2xl"
      >
        <defs>
          <filter id="f-sm" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="f-lg" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="7" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="f-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="10"/>
          </filter>

          {/* White/steel shell */}
          <radialGradient id="g-shell" cx="36%" cy="26%" r="70%">
            <stop offset="0%"   stopColor="#e4eef8"/>
            <stop offset="35%"  stopColor="#a8c0d4"/>
            <stop offset="68%"  stopColor="#6088a4"/>
            <stop offset="100%" stopColor="#24445e"/>
          </radialGradient>
          <radialGradient id="g-spec" cx="40%" cy="18%" r="40%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.78)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          </radialGradient>
          {/* Body / limb shell (slightly darker) */}
          <radialGradient id="g-limb" cx="38%" cy="24%" r="65%">
            <stop offset="0%"   stopColor="#d0e0ee"/>
            <stop offset="40%"  stopColor="#8cacc4"/>
            <stop offset="100%" stopColor="#2a4860"/>
          </radialGradient>
          {/* Dark face panel */}
          <radialGradient id="g-face" cx="50%" cy="42%" r="60%">
            <stop offset="0%"   stopColor="#0c1a2c"/>
            <stop offset="100%" stopColor="#030a14"/>
          </radialGradient>
          {/* Iris glow */}
          <radialGradient id="g-iris" cx="34%" cy="28%" r="68%">
            <stop offset="0%"   stopColor="#c0f6ff"/>
            <stop offset="22%"  stopColor="#48e4ff"/>
            <stop offset="52%"  stopColor="#00b0d8"/>
            <stop offset="82%"  stopColor="#0075bb"/>
            <stop offset="100%" stopColor="#003060"/>
          </radialGradient>
          {/* Ear/joint dark */}
          <radialGradient id="g-ear" cx="38%" cy="32%" r="65%">
            <stop offset="0%"   stopColor="#1c3048"/>
            <stop offset="100%" stopColor="#060e1c"/>
          </radialGradient>
          {/* Antenna shaft */}
          <linearGradient id="g-ant" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(0,210,255,0.95)"/>
            <stop offset="100%" stopColor="rgba(0,120,255,0.06)"/>
          </linearGradient>
          {/* Chest orb */}
          <radialGradient id="g-orb" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(0,200,255,0.24)"/>
            <stop offset="100%" stopColor="rgba(0,60,180,0)"/>
          </radialGradient>
        </defs>

        {/* ── LEGS ── */}
        <rect x="70"  y="238" width="26" height="42" rx="13" fill="url(#g-limb)" stroke="rgba(180,210,240,0.2)" strokeWidth="1.2"/>
        <rect x="104" y="238" width="26" height="42" rx="13" fill="url(#g-limb)" stroke="rgba(180,210,240,0.2)" strokeWidth="1.2"/>
        <ellipse cx="83"  cy="240" rx="9" ry="3.5" fill="rgba(255,255,255,0.08)"/>
        <ellipse cx="117" cy="240" rx="9" ry="3.5" fill="rgba(255,255,255,0.08)"/>

        {/* ── BODY ── */}
        <rect x="56" y="170" width="88" height="76" rx="32" fill="url(#g-shell)" stroke="rgba(180,210,240,0.22)" strokeWidth="1.5"/>
        <ellipse cx="100" cy="178" rx="30" ry="6"   fill="rgba(255,255,255,0.1)"/>
        <rect x="59" y="173" width="82" height="70" rx="29" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        {/* Chest orb */}
        <circle cx="100" cy="204" r="19" fill="#040c1a" stroke="rgba(0,150,220,0.3)"  strokeWidth="1.2"/>
        <circle cx="100" cy="204" r="15" fill="#030a14" stroke="rgba(0,130,200,0.22)" strokeWidth="0.8"/>
        <circle cx="100" cy="204" r="10" fill="url(#g-orb)" filter="url(#f-sm)"/>
        <circle cx="100" cy="204" r="5"  fill="rgba(0,170,255,0.18)" filter="url(#f-sm)"/>
        <circle cx="100" cy="204" r="3"  fill="#0099FF" opacity="0.92" filter="url(#f-sm)" className="animate-pulse"/>
        <circle cx="100" cy="204" r="1.5" fill="#40f0ff" opacity="0.9"/>

        {/* ── LEFT ARM (static) ── */}
        <rect x="22" y="178" width="26" height="56" rx="13" fill="url(#g-limb)" stroke="rgba(180,210,240,0.2)" strokeWidth="1.2"/>
        <ellipse cx="35" cy="180" rx="10" ry="4" fill="rgba(255,255,255,0.08)"/>
        <circle cx="35" cy="233" r="11" fill="#0a1e34" stroke="rgba(0,140,210,0.24)" strokeWidth="1.1"/>
        <circle cx="35" cy="233" r="7"  fill="url(#g-ear)" stroke="rgba(0,110,180,0.18)" strokeWidth="0.8"/>
        <circle cx="35" cy="233" r="3"  fill="#0077dd" opacity="0.75"/>

        {/* ── NECK ── */}
        <rect x="87" y="158" width="26" height="18" rx="9" fill="#0a1a2e" stroke="rgba(0,130,200,0.2)" strokeWidth="1"/>
        <rect x="89" y="161" width="22" height="3.5" rx="1.75" fill="rgba(0,153,255,0.22)"/>
        <rect x="89" y="168" width="22" height="3"   rx="1.5"  fill="rgba(0,153,255,0.14)"/>

        {/* ── HEAD (large dome) ── */}
        <circle cx="100" cy="88" r="70" fill="url(#g-shell)" stroke="rgba(190,215,240,0.28)" strokeWidth="1.5"/>
        <ellipse cx="78" cy="60" rx="26" ry="18" fill="url(#g-spec)" opacity="0.65"/>
        <ellipse cx="65" cy="52" rx="12" ry="8"  fill="white" opacity="0.25"/>
        <path d="M 160,70 Q 169,88 161,112" stroke="rgba(255,255,255,0.07)" strokeWidth="4" strokeLinecap="round" fill="none"/>

        {/* ── EARS ── */}
        <circle cx="32"  cy="90" r="14" fill="url(#g-ear)" stroke="rgba(0,160,220,0.28)" strokeWidth="1.2"/>
        <circle cx="32"  cy="90" r="10" fill="#040c1a" stroke="rgba(0,130,200,0.22)" strokeWidth="0.8"/>
        <circle cx="32"  cy="90" r="5.5" fill="#060f20" stroke="rgba(0,100,180,0.2)"  strokeWidth="0.8"/>
        <circle cx="32"  cy="90" r="2.5" fill="#0077cc" opacity="0.78"/>
        <circle cx="168" cy="90" r="14" fill="url(#g-ear)" stroke="rgba(0,160,220,0.28)" strokeWidth="1.2"/>
        <circle cx="168" cy="90" r="10" fill="#040c1a" stroke="rgba(0,130,200,0.22)" strokeWidth="0.8"/>
        <circle cx="168" cy="90" r="5.5" fill="#060f20" stroke="rgba(0,100,180,0.2)"  strokeWidth="0.8"/>
        <circle cx="168" cy="90" r="2.5" fill="#0077cc" opacity="0.78"/>

        {/* ── FACE PANEL ── */}
        <rect x="48" y="50" width="104" height="88" rx="30" fill="url(#g-face)" stroke="rgba(0,100,180,0.22)" strokeWidth="1.5"/>
        <rect x="51" y="53" width="98"  height="82" rx="27" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        <ellipse cx="100" cy="95" rx="46" ry="36" fill="rgba(0,160,255,0.04)"/>

        {/* ── LEFT EYE ── */}
        <circle cx="75" cy="84" r="22" fill="#030a16" stroke="rgba(0,180,255,0.2)"  strokeWidth="1.2"/>
        <circle cx="75" cy="84" r="18" fill="#020810" stroke="rgba(0,160,255,0.28)" strokeWidth="1"/>
        <circle cx="75" cy="84" r="18" fill="rgba(0,180,255,0.1)" filter="url(#f-sm)"/>
        <g ref={lGroupRef}>
          <g className={tickled ? "eye-squish" : ""}>
            <circle cx="75" cy="84" r="15" fill="url(#g-iris)" filter="url(#f-sm)"/>
            <circle cx="75" cy="84" r="15" fill="rgba(0,220,255,0.18)" filter="url(#f-sm)"/>
            <circle cx="75" cy="84" r="7.5" fill="#001428"/>
            <circle cx="75" cy="84" r="5"   fill="#00aad4" opacity="0.95" filter="url(#f-sm)"/>
            <circle cx="75" cy="84" r="3"   fill="#40f4ff" opacity="0.9"/>
            <ellipse cx="69" cy="77" rx="4.5" ry="3.5" fill="white" opacity="0.93"/>
            <circle cx="81" cy="91" r="1.8" fill="rgba(255,255,255,0.3)"/>
          </g>
        </g>

        {/* ── RIGHT EYE ── */}
        <circle cx="125" cy="84" r="22" fill="#030a16" stroke="rgba(0,180,255,0.2)"  strokeWidth="1.2"/>
        <circle cx="125" cy="84" r="18" fill="#020810" stroke="rgba(0,160,255,0.28)" strokeWidth="1"/>
        <circle cx="125" cy="84" r="18" fill="rgba(0,180,255,0.1)" filter="url(#f-sm)"/>
        <g ref={rGroupRef}>
          <g className={tickled ? "eye-squish" : ""}>
            <circle cx="125" cy="84" r="15" fill="url(#g-iris)" filter="url(#f-sm)"/>
            <circle cx="125" cy="84" r="15" fill="rgba(0,220,255,0.18)" filter="url(#f-sm)"/>
            <circle cx="125" cy="84" r="7.5" fill="#001428"/>
            <circle cx="125" cy="84" r="5"   fill="#00aad4" opacity="0.95" filter="url(#f-sm)"/>
            <circle cx="125" cy="84" r="3"   fill="#40f4ff" opacity="0.9"/>
            <ellipse cx="119" cy="77" rx="4.5" ry="3.5" fill="white" opacity="0.93"/>
            <circle cx="131" cy="91" r="1.8" fill="rgba(255,255,255,0.3)"/>
          </g>
        </g>

        {/* ── MOUTH (changes on tickle) ── */}
        {tickled ? (
          <>
            <path d="M 64,116 Q 100,146 136,116" fill="rgba(255,255,255,0.1)" stroke="none"/>
            <path d="M 64,116 Q 100,146 136,116" stroke="rgba(0,220,255,0.92)" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
          </>
        ) : (
          <path d="M 76,116 Q 100,130 124,116" stroke="rgba(0,210,255,0.72)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        )}

        {/* ── ANTENNA ── */}
        <line x1="100" y1="18" x2="100" y2="4" stroke="url(#g-ant)" strokeWidth="2"/>
        <circle cx="100" cy="18" r="3.5" fill="#08182e" stroke="rgba(0,180,255,0.5)" strokeWidth="1"/>
        <circle cx="100" cy="4"  r="8"   fill="#00aaff" opacity="0.12" filter="url(#f-glow)"/>
        <circle cx="100" cy="4"  r="4.5" fill="#00ccff" opacity="0.35" filter="url(#f-sm)"/>
        <circle cx="100" cy="4"  r="3"   fill="#00e8ff" className="animate-pulse"/>
        <circle cx="100" cy="4"  r="1.4" fill="white"   opacity="0.98"/>

        {/* ── RIGHT ARM (wave on greeting) ── */}
        <g ref={armRef}>
          <rect x="152" y="178" width="26" height="56" rx="13" fill="url(#g-limb)" stroke="rgba(180,210,240,0.2)" strokeWidth="1.2"/>
          <ellipse cx="165" cy="180" rx="10" ry="4" fill="rgba(255,255,255,0.08)"/>
          <circle cx="165" cy="233" r="11" fill="#0a1e34" stroke="rgba(0,140,210,0.24)" strokeWidth="1.1"/>
          <circle cx="165" cy="233" r="7"  fill="url(#g-ear)" stroke="rgba(0,110,180,0.18)" strokeWidth="0.8"/>
          <circle cx="165" cy="233" r="3"  fill="#0077dd" opacity="0.75"/>
        </g>

        {/* ── GROUND GLOW ── */}
        <ellipse cx="100" cy="286" rx="58" ry="7" fill="rgba(0,153,255,0.07)" filter="url(#f-lg)"/>
      </svg>
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */
export default function HeroSection() {
  const [tickled,  setTickled]  = useState(false);
  const [waveKey,  setWaveKey]  = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWaveKey(1), 500);
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    if (tickled) return;
    setTickled(true);
    setWaveKey(k => k + 1);
    setTimeout(() => setTickled(false), 800);
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#050A14]/80 via-[#07111F]/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-glow-accent opacity-60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Text ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="mb-5 sm:mb-7">
              <Image
                src="/images/neuro-logo.png"
                alt="Neurolinks"
                width={180}
                height={72}
                className="object-contain drop-shadow-2xl w-28 sm:w-36 md:w-40 h-auto mx-auto lg:mx-0"
                priority
              />
            </div>
            <div className="inline-flex items-center gap-2 glass px-4 py-2 mb-6 text-xs font-heading font-semibold tracking-widest uppercase text-accent-subtle rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-light animate-pulse" />
              Automatización con IA · Resultados reales
            </div>
            <h1 className="font-heading font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6">
              Grandes estrategias para{" "}
              <span className="text-gradient-accent">grandes empresas</span>
            </h1>
            <p className="text-white/50 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
              Chatbots inteligentes, WhatsApp Marketing y automatización de ventas
              para escalar tu negocio y superar a la competencia.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button href="/#contacto" variant="primary" size="lg">Quiero una estrategia</Button>
              <Button href="/#servicios" variant="outline" size="lg">Ver servicios</Button>
            </div>
          </div>

          {/* ── RIGHT: Robot ── */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-3">
            <RobotSVG tickled={tickled} waveKey={waveKey} onClick={handleClick} />
          </div>

        </div>
      </div>
    </section>
  );
}
