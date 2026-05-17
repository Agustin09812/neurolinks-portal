import SectionTitle from "@/components/ui/SectionTitle";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { services } from "@/data/services";

export default function ServicesSection() {
  return (
    <section id="servicios" className="relative py-24 overflow-hidden">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-glow-accent opacity-35 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="¿Qué hacemos?"
          title="Nuestros servicios"
          subtitle="Soluciones de automatización e IA diseñadas para aumentar tus ventas y optimizar tus procesos."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <div
              key={service.id}
              className="glass-card p-6 group cursor-default rounded-2xl"
            >
              <span className="text-[11px] font-heading font-semibold text-accent-muted/60 tracking-widest">
                0{i + 1}
              </span>

              <div className="mt-3 mb-4 w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 text-accent-bright flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                <ServiceIcon name={service.icon} className="w-5 h-5" />
              </div>

              <h3 className="font-heading font-bold text-white text-sm leading-snug mb-2">
                {service.title}
              </h3>
              <p className="text-white/45 text-xs leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
