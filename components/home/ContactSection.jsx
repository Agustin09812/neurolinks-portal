"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import SectionTitle from "@/components/ui/SectionTitle";
import clsx from "clsx";

const FORM_ENDPOINT = "https://formsubmit.co/info@clientesneurolinks.com";

const inputCls = "w-full rounded-xl bg-white/[0.05] border border-accent/[0.12] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 focus:bg-accent/[0.08] focus:border-accent/40 focus:ring-1 focus:ring-accent/20";

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setSending(true);
    try {
      const body = new FormData();
      Object.entries(data).forEach(([k, v]) => body.append(k, v));
      body.append("_subject", "Nuevo contacto desde Neurolinks");
      body.append("_template", "table");
      body.append("_captcha", "false");
      await fetch(FORM_ENDPOINT, { method: "POST", body });
      setSent(true);
      reset();
    } catch {
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacto" className="relative py-24 overflow-hidden">

      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-glow-accent opacity-20 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle tag="Contacto" title="Hablemos de tu negocio" subtitle="Completá el formulario y un asesor te contacta en menos de 24 horas." />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Info lateral */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { label: "WhatsApp", value: "+54 911 70644247", href: "https://wa.me/5491170644247" },
              { label: "Email", value: "info@clientesneurolinks.com", href: "mailto:info@clientesneurolinks.com" },
            ].map((item) => (
              <div key={item.label} className="glass rounded-xl p-4">
                <p className="text-[10px] font-heading font-semibold tracking-widest uppercase text-accent-muted mb-1">{item.label}</p>
                <a href={item.href} className="text-white font-semibold text-sm hover:text-accent-light transition-colors">{item.value}</a>
              </div>
            ))}
            <div className="glass rounded-xl p-4">
              <p className="text-[10px] font-heading font-semibold tracking-widest uppercase text-accent-muted mb-2">Agenda una reunión</p>
              <p className="text-white/45 text-xs leading-relaxed mb-3">Hablá directamente con uno de nuestros asesores.</p>
              <a href="https://calendar.google.com/" target="_blank" rel="noopener noreferrer" className="text-accent-light text-xs font-semibold hover:underline">
                Agendar llamada →
              </a>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-3 glass rounded-2xl p-6 sm:p-8">
            {sent ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-accent-light" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-white text-xl mb-2">¡Mensaje enviado!</h3>
                <p className="text-white/40 text-sm">Te respondemos en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input placeholder="Nombre *" className={clsx(inputCls, errors.nombre && "border-red-500/50")} {...register("nombre", { required: true })} />
                    {errors.nombre && <p className="text-red-400 text-xs mt-1">Requerido</p>}
                  </div>
                  <div>
                    <input placeholder="Apellido *" className={clsx(inputCls, errors.apellido && "border-red-500/50")} {...register("apellido", { required: true })} />
                    {errors.apellido && <p className="text-red-400 text-xs mt-1">Requerido</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input placeholder="WhatsApp *" className={clsx(inputCls, errors.whatsapp && "border-red-500/50")} {...register("whatsapp", { required: true })} />
                    {errors.whatsapp && <p className="text-red-400 text-xs mt-1">Requerido</p>}
                  </div>
                  <div>
                    <input placeholder="Email *" type="email" className={clsx(inputCls, errors.email && "border-red-500/50")} {...register("email", { required: true })} />
                    {errors.email && <p className="text-red-400 text-xs mt-1">Requerido</p>}
                  </div>
                </div>
                <input placeholder="Asunto" className={inputCls} {...register("asunto")} />
                <textarea placeholder="Contanos sobre tu empresa y qué necesitás *" rows={4} className={clsx(inputCls, "resize-none", errors.mensaje && "border-red-500/50")} {...register("mensaje", { required: true })} />
                {errors.mensaje && <p className="text-red-400 text-xs -mt-1">Requerido</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 px-6 rounded-full btn-gradient font-heading font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {sending ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
