import Button from "@/components/ui/Button";

export default function CtaSection() {
  return (
    <section className="relative py-24 overflow-hidden">

      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,153,255,0.25), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,153,255,0.25), transparent)" }} />
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(0,153,255,0.3) 0%, transparent 70%)" }} />
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(0,100,200,0.3) 0%, transparent 70%)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Headline */}
          <div>
            <p className="text-[11px] font-heading font-semibold tracking-[0.22em] uppercase text-accent-subtle mb-5">
              · Próximo paso ·
            </p>
            <h2 className="font-heading font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              ¿Listo para escalar tu negocio{" "}
              <span className="text-gradient-accent">con IA?</span>
            </h2>
            <div className="mt-6 w-14 h-1 rounded-full bg-accent opacity-60" />
          </div>

          {/* RIGHT: Description + buttons + trust */}
          <div className="flex flex-col gap-7">
            <p className="text-white/50 text-lg leading-relaxed">
              Hablemos sobre tu empresa y armamos una estrategia personalizada sin compromiso.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                href="https://wa.me/5491170644247?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20los%20servicios%20de%20Neurolinks"
                variant="whatsapp" size="lg" external
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Escribinos por WhatsApp
              </Button>
              <Button href="/#contacto" variant="outline" size="lg">
                Enviar un mensaje
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-1">
              <div>
                <p className="font-heading font-extrabold text-xl text-white leading-none">500+</p>
                <p className="text-white/30 text-[11px] mt-0.5">Clientes</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="font-heading font-extrabold text-xl text-white leading-none">98%</p>
                <p className="text-white/30 text-[11px] mt-0.5">Satisfacción</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="font-heading font-extrabold text-xl text-white leading-none">24/7</p>
                <p className="text-white/30 text-[11px] mt-0.5">Disponible</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
