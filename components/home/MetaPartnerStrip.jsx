import Image from "next/image";

export default function MetaPartnerStrip() {
  return (
    <div className="py-5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-2">
        <p className="text-white/25 text-[9px] font-heading font-semibold tracking-[0.2em] uppercase">
          Integración certificada con
        </p>
        <div className="inline-flex items-center gap-3 glass px-5 py-2.5 rounded-2xl">
          <Image
            src="/images/meta_logo.svg"
            alt="Meta"
            width={56}
            height={12}
            className="brightness-0 invert opacity-55"
          />
          <div className="w-px h-4 bg-white/[0.12]" />
          <Image
            src="/images/meta_verified.svg"
            alt="Meta Business Partner verificado"
            width={18}
            height={18}
          />
          <span className="text-white/45 text-[11px] font-heading font-semibold">
            Business Partner Oficial
          </span>
        </div>
      </div>
    </div>
  );
}
