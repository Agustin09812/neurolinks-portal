"use client";

import Image from "next/image";
import Link from "next/link";
import AuthCard from "./AuthCard";

export default function PortalPageClient() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050A14]/90 via-[#07111F]/70 to-[#050A14]/90" />

      {/* Accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-glow-accent opacity-40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl py-12">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image
              src="/images/neuro-logo.png"
              alt="Neurolinks"
              width={140}
              height={56}
              className="object-contain drop-shadow-2xl w-28 h-auto"
              priority
            />
          </Link>
        </div>

        <AuthCard />

        <p className="text-center text-white/20 text-xs mt-6">
          Al continuar aceptás los{" "}
          <Link href="/politicas" className="hover:text-white/50 transition-colors underline underline-offset-2">
            términos y políticas de privacidad
          </Link>
        </p>
      </div>
    </section>
  );
}
