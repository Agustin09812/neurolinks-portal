import SectionTitle from "@/components/ui/SectionTitle";

const beneficios = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: "Incrementar ventas",
    items: [
      "Filtrado inteligente de prospectos calificados",
      "Respuestas inmediatas sin tiempos de espera",
      "Disponibilidad 24/7 para cerrar ventas en cualquier horario",
      "Reducción del tiempo de ciclo de venta",
    ],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: "Gestión de consultas",
    items: [
      "Respuesta automática a preguntas frecuentes",
      "Verificación de stock y disponibilidad en tiempo real",
      "Generación de cotizaciones y presupuestos",
      "Envío de catálogos, PDFs y documentos",
    ],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "Módulos personalizados",
    items: [
      "Procesamiento de mensajes de audio en texto",
      "Lectura e interpretación de PDFs y Word",
      "Respuestas ultra-rápidas con IA entrenada",
      "Integración con tus sistemas y herramientas",
    ],
  },
];

export default function BeneficiosSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="¿Por qué elegirnos?"
          title="Todo lo que puede hacer un asistente IA"
          subtitle="Cada asistente se entrena con la información de tu empresa para brindar una atención perfecta."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {beneficios.map((b) => (
            <div
              key={b.title}
              className="group bg-surface rounded-2xl p-8 border border-gray-100 hover:border-blue-robot/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Ícono */}
              <div className="w-14 h-14 rounded-2xl bg-blue-robot/10 text-blue-robot flex items-center justify-center mb-6 group-hover:bg-blue-robot group-hover:text-white transition-all duration-300">
                {b.icon}
              </div>

              <h3 className="font-heading font-bold text-primary text-xl mb-5">
                {b.title}
              </h3>

              <ul className="space-y-3">
                {b.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-robot shrink-0" />
                    <span className="text-muted text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
