import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-glow-accent opacity-30 pointer-events-none" />

      <div className="relative text-center max-w-md">
        <p className="font-heading font-extrabold text-white/[0.04] text-[9rem] sm:text-[11rem] leading-none select-none">
          404
        </p>
        <div className="-mt-6">
          <h1 className="font-heading font-extrabold text-white text-2xl sm:text-3xl mb-3">Página no encontrada</h1>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            La página que buscás no existe o fue movida.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full btn-gradient font-heading font-semibold text-sm">
              Volver al inicio
            </Link>
            <Link href="/#asistentes-preview" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full glass text-white/70 font-heading font-semibold text-sm hover:text-white hover:border-accent/30 transition-all">
              Ver asistentes IA
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
