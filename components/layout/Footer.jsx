import Image from "next/image";
import Link from "next/link";

const QUICK_LINKS = [
  { label: "Inicio",                href: "/" },
  { label: "Servicios",             href: "/#servicios" },
  { label: "Precios",               href: "/#precios" },
  { label: "Asistentes IA",         href: "/#asistentes-preview" },
  { label: "Nosotros",              href: "/#nosotros" },
  { label: "Contacto",              href: "/#contacto" },
  { label: "Políticas de privacidad", href: "/politicas" },
];

const SOCIAL = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61564993252678&mibextid=ZbWKwL",
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/neurolinks.ia?igsh=MTI0eWV5b3ByZzJ4Ng==",
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>,
  },
  {
    label: "Email",
    href: "mailto:info@clientesneurolinks.com",
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>,
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-accent/[0.08]">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Image src="/images/neuro-logo.png" alt="Neurolinks" width={24} height={24} className="h-6 w-auto object-contain" />
              <span className="font-heading font-extrabold text-xl text-gradient-gold tracking-wider">NEUROLINKS</span>
            </div>
            <p className="mt-3 text-white/35 text-xs leading-relaxed max-w-xs">
              Grandes estrategias para grandes empresas. Automatización con IA para potenciar tus ventas.
            </p>
            <div className="flex gap-2 mt-5">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/40 hover:text-accent-light hover:border-accent/30 transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="mt-5">
              <p className="text-white/20 text-[9px] font-heading font-semibold tracking-[0.18em] uppercase mb-2">Partner Oficial</p>
              <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-xl">
                <Image src="/images/meta_logo.svg" alt="Meta" width={38} height={8} className="brightness-0 invert opacity-45" />
                <Image src="/images/meta_verified.svg" alt="Meta Business Partner" width={13} height={13} />
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-[10px] tracking-widest uppercase text-accent-muted/60 mb-4">Navegación</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/40 hover:text-white text-xs transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-heading font-semibold text-[10px] tracking-widest uppercase text-accent-muted/60 mb-4">Contacto</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="https://wa.me/5491170644247" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">+54 911 70644247</a></li>
              <li><a href="mailto:info@clientesneurolinks.com" className="text-white/40 hover:text-white transition-colors">info@clientesneurolinks.com</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-accent/[0.07] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/20">
          <p>© {new Date().getFullYear()} Neurolinks. Todos los derechos reservados.</p>
          <p>Diseñado por <a href="https://agustin09812.github.io/portfolio/" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">Agustin Lago</a></p>
        </div>
      </div>
    </footer>
  );
}
