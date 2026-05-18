"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NAV_LINKS = [
  { label: "Inicio",        href: "/#inicio" },
  { label: "Servicios",     href: "/#servicios" },
  { label: "Precios",       href: "/#precios" },
  { label: "Asistentes IA", href: "/#asistentes-preview" },
  { label: "Nosotros",      href: "/#nosotros" },
  { label: "Contacto",      href: "/#contacto" },
];

export default function Navbar() {
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [activeBubble,   setActiveBubble]   = useState(null);
  const [hoverBubble,    setHoverBubble]    = useState(null);
  const [activeSection,  setActiveSection]  = useState("inicio");
  const [scrolled,       setScrolled]       = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const navPillRef = useRef(null);
  const pathname   = usePathname();

  /* ── Scroll-spy: track which section is in view ── */
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = NAV_LINKS
      .filter((l) => l.href.startsWith("/#"))
      .map((l) => l.href.slice(2));

    const update = () => {
      const offset = 120; // navbar height + some breathing room
      let current  = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  /* ── Determine whether a nav link is active ── */
  const isActive = (href) => {
    if (href.startsWith("/#")) {
      if (pathname !== "/") return false;
      return activeSection === href.slice(2);
    }
    return pathname.startsWith(href);
  };

  /* ── Compute bubble rect relative to pill container ── */
  const getBubble = (el) => {
    if (!navPillRef.current || !el) return null;
    const navRect = navPillRef.current.getBoundingClientRect();
    const elRect  = el.getBoundingClientRect();
    return {
      left:   elRect.left   - navRect.left,
      top:    elRect.top    - navRect.top,
      width:  elRect.width,
      height: elRect.height,
    };
  };

  /* ── Re-position active bubble whenever active link changes ── */
  useEffect(() => {
    if (!navPillRef.current) return;
    const active = navPillRef.current.querySelector("[data-active='true']");
    setActiveBubble(active ? getBubble(active) : null);
  }, [pathname, activeSection]);

  /* ── Close mobile menu on navigation ── */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  /* ── Lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop / top bar ── */}
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 transition-all duration-300",
          scrolled ? "pt-2 pb-2" : "pt-4"
        )}
        style={{
          background:           scrolled ? "rgba(5, 10, 20, 0.82)" : "transparent",
          backdropFilter:       scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom:         scrolled ? "1px solid rgba(0, 153, 255, 0.1)" : "1px solid transparent",
          transition:           "background 0.3s, backdrop-filter 0.3s, border-color 0.3s, padding 0.3s",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/neuro-logo.png"
              alt="Neurolinks"
              width={32}
              height={32}
              className="h-6 w-auto object-contain"
            />
            <span className="font-heading font-extrabold text-xl tracking-wider text-gradient-gold">
              NEUROLINKS
            </span>
          </Link>

          {/* ── Pill nav ── */}
          <nav
            ref={navPillRef}
            aria-label="Navegación principal"
            className="hidden lg:flex items-center relative rounded-full px-2 py-1.5"
            style={{
              background:           "rgba(7, 17, 31, 0.72)",
              backdropFilter:       "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border:    "1px solid rgba(0, 153, 255, 0.14)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
            onMouseLeave={() => setHoverBubble(null)}
          >
            {/* Active bubble */}
            {activeBubble && (
              <span
                aria-hidden="true"
                className="absolute rounded-full pointer-events-none transition-all duration-300"
                style={{
                  left:   activeBubble.left,
                  top:    activeBubble.top,
                  width:  activeBubble.width,
                  height: activeBubble.height,
                  background: "linear-gradient(160deg, rgba(0,120,212,0.38), rgba(0,153,255,0.22))",
                  border:     "1px solid rgba(0,153,255,0.32)",
                  boxShadow:  "inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 12px rgba(0,120,212,0.28)",
                  zIndex: 2,
                }}
              />
            )}

            {/* Hover bubble */}
            {hoverBubble && (
              <span
                aria-hidden="true"
                className="absolute rounded-full pointer-events-none transition-all duration-150"
                style={{
                  left:   hoverBubble.left,
                  top:    hoverBubble.top,
                  width:  hoverBubble.width,
                  height: hoverBubble.height,
                  background: "rgba(255,255,255,0.045)",
                  border:     "1px solid rgba(255,255,255,0.07)",
                  zIndex: 1,
                }}
              />
            )}

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-active={isActive(link.href) ? "true" : "false"}
                className={clsx(
                  "relative z-10 px-3.5 py-2 rounded-full text-sm font-heading font-semibold transition-colors duration-200 whitespace-nowrap select-none",
                  isActive(link.href) ? "text-white" : "text-white/50 hover:text-white"
                )}
                onMouseEnter={(e) => setHoverBubble(getBubble(e.currentTarget))}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Portal CTA + hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/portal"
              className="hidden lg:inline-flex items-center px-5 py-2 rounded-full text-sm font-heading font-semibold text-accent-subtle hover:text-white transition-all border border-accent/30 hover:border-accent/60 hover:bg-accent/10"
            >
              Portal Cliente
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 text-white"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span className={clsx("block w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center", mobileOpen && "rotate-45 translate-y-2")} />
              <span className={clsx("block w-5 h-0.5 bg-current rounded-full transition-all duration-300", mobileOpen && "opacity-0 scale-x-0")} />
              <span className={clsx("block w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center", mobileOpen && "-rotate-45 -translate-y-2")} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ── */}
      <div
        className={clsx(
          "lg:hidden fixed inset-0 z-[60] flex flex-col transition-all duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{
          background:           "rgba(5, 10, 20, 0.93)",
          backdropFilter:       "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
        }}
      >
        {/* Top bar: logo + close button */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 shrink-0">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2"
          >
            <Image
              src="/images/neuro-logo.png"
              alt="Neurolinks"
              width={32}
              height={32}
              className="h-6 w-auto object-contain"
            />
            <span className="font-heading font-extrabold text-xl tracking-wider text-gradient-gold">
              NEUROLINKS
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-white border border-white/20 rounded-lg"
            aria-label="Cerrar menú"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links centered in remaining space */}
        <nav className="flex flex-col items-center gap-3 w-full px-8 flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                "w-full max-w-xs text-center py-3.5 px-6 rounded-full font-heading font-semibold text-base transition-all",
                isActive(link.href)
                  ? "text-white bg-accent/20 border border-accent/35"
                  : "text-white/60 hover:text-white border border-white/[0.08] hover:border-accent/25 hover:bg-accent/[0.08]"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="w-full max-w-xs h-px bg-white/[0.07] my-1" />
          <Link
            href="/portal"
            onClick={() => setMobileOpen(false)}
            className="w-full max-w-xs text-center py-3.5 px-6 rounded-full font-heading font-semibold text-base text-accent-subtle hover:text-white border border-accent/35 hover:bg-accent/10 transition-all"
          >
            Portal Cliente
          </Link>
        </nav>
      </div>
    </>
  );
}
