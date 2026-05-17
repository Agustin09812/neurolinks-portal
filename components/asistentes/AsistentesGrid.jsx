"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import SectionTitle from "@/components/ui/SectionTitle";
import { asistentes } from "@/data/asistentes";

const AsistenteModal = dynamic(() => import("./AsistenteModal"), { ssr: false });

function RobotIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
      />
    </svg>
  );
}

export default function AsistentesGrid() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="asistentes" className="py-24 bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="En vivo"
          title="Nuestros asistentes IA"
          subtitle="Hacé clic en cualquiera y chateá ahora mismo con el asistente en vivo."
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {asistentes.map((bot) => (
            <button
              key={bot.id}
              onClick={() => setSelected(bot)}
              className="group relative bg-primary rounded-2xl overflow-hidden border border-white/10 hover:border-blue-robot/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-robot/10 text-left cursor-pointer"
            >
              {/* Imagen */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={bot.image}
                  alt={bot.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-full bg-blue-robot/20 text-blue-robot flex items-center justify-center">
                    <RobotIcon />
                  </span>
                  <span className="text-xs text-blue-robot font-heading font-semibold tracking-wide">
                    Asistente IA
                  </span>
                </div>

                <h3 className="font-heading font-bold text-white text-lg leading-tight">
                  {bot.name}
                </h3>

                <p className="mt-3 text-xs text-white/50 font-medium flex items-center gap-1.5 group-hover:text-blue-robot transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                  Hacé clic y probá ahora
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-robot/10 backdrop-blur-[1px]">
                <span className="bg-blue-robot text-white text-sm font-heading font-semibold px-5 py-2.5 rounded-full shadow-lg">
                  Abrir chat →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <AsistenteModal
          asistente={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
