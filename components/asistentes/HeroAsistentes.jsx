import Image from "next/image";
import Button from "@/components/ui/Button";

export default function HeroAsistentes() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <Image
        src="/robots/robot-5.jpg"
        alt="Asistentes IA"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/75 to-primary/95" />


      {/* Contenido */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-20">
        <span className="inline-block text-xs font-heading font-semibold tracking-widest uppercase text-blue-robot bg-blue-robot/10 border border-blue-robot/30 px-4 py-1.5 rounded-full mb-6">
          Asistentes IA en vivo
        </span>

        <h1 className="font-heading font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
          Probá nuestros{" "}
          <span className="text-blue-robot">asistentes de IA</span>
          <br className="hidden sm:block" /> en vivo
        </h1>

        <p className="text-white/75 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Atención instantánea en WhatsApp con inteligencia artificial 24/7.
          Hacé clic en cualquier asistente y chateá ahora mismo.
        </p>

        <Button href="#asistentes" variant="primary" size="lg">
          Ver asistentes disponibles
        </Button>
      </div>

      {/* Indicador scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-widest uppercase">Explorá</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
