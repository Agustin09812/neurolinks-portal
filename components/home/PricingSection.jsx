import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import { pricingPlans } from "@/data/pricing";
import clsx from "clsx";

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function PricingSection() {
  return (
    <section id="precios" className="relative py-24 overflow-hidden">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] bg-glow-accent opacity-30 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Planes"
          title="Elegí tu plan"
          subtitle="Sin contratos de permanencia. Todos los planes incluyen soporte y actualizaciones."
        />

        <div className="flex justify-center mb-8 -mt-2">
          <div className="inline-flex items-center gap-2.5 glass px-4 py-2 rounded-full">
            <Image src="/images/meta_logo.svg" alt="Meta" width={40} height={9} className="brightness-0 invert opacity-50" />
            <div className="w-px h-3 bg-white/[0.12]" />
            <Image src="/images/meta_verified.svg" alt="" aria-hidden="true" width={14} height={14} />
            <span className="text-white/35 text-[10px] font-heading tracking-wide">API Oficial en todos los planes</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={clsx(
                "relative rounded-2xl p-7 flex flex-col transition-all duration-300",
                plan.highlight
                  ? "glass-strong glow-accent"
                  : "glass-card"
              )}
              style={plan.highlight ? { borderColor: "rgba(0,153,255,0.3)" } : {}}
            >
              {plan.badge && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[11px] font-heading font-bold px-4 py-1 rounded-full whitespace-nowrap tracking-wide pointer-events-none"
                  style={{ background: "linear-gradient(135deg, #0078D4, #0099FF)", boxShadow: "0 4px 16px rgba(0,120,212,0.3)" }}
                >
                  {plan.badge}
                </span>
              )}

              <div className="mb-6">
                <h3 className={clsx("font-heading font-bold text-base mb-3", plan.highlight ? "text-accent-bright" : "text-white/80")}>
                  {plan.name}
                </h3>
                {plan.currency ? (
                  <div>
                    <span className="text-white/40 text-[11px] font-heading font-semibold tracking-widest uppercase">
                      {plan.currency}
                    </span>
                    <div className="flex items-end gap-1">
                      <span className={clsx("font-heading font-extrabold text-4xl sm:text-5xl leading-none", plan.highlight ? "text-gradient-accent" : "text-white")}>
                        {plan.price}
                      </span>
                      <span className="text-white/35 text-sm pb-1">/{plan.period}</span>
                    </div>
                  </div>
                ) : (
                  <span className={clsx("font-heading font-extrabold text-2xl sm:text-3xl leading-snug", plan.highlight ? "text-gradient-accent" : "text-white")}>
                    {plan.price}
                  </span>
                )}
              </div>

              <ul className="space-y-2.5 flex-1 mb-7">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className={clsx("mt-0.5", plan.highlight ? "text-accent-light" : "text-white/40")}>
                      <CheckIcon />
                    </span>
                    <span className="text-white/60 text-xs leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "block text-center py-3 px-6 rounded-full font-heading font-semibold text-sm transition-all duration-200",
                  plan.highlight
                    ? "btn-gradient"
                    : "bg-white/[0.07] text-white border border-white/[0.12] hover:bg-accent/[0.10] hover:border-accent/25 hover:scale-[1.02]"
                )}
              >
                {plan.ctaLabel}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-white/30 text-xs mt-10">
          ¿Necesitás algo personalizado?{" "}
          <a href="https://wa.me/5491170644247?text=Hola%2C%20necesito%20un%20plan%20personalizado" target="_blank" rel="noopener noreferrer" className="text-accent-subtle hover:text-accent-light transition-colors">
            Hablemos
          </a>
        </p>
      </div>
    </section>
  );
}
