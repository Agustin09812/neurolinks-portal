import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Política de Privacidad | Neurolinks",
  description:
    "Política de privacidad de Neurolinks conforme a la Ley 25.326 de Protección de Datos Personales (Argentina).",
};

const sections = [
  {
    title: "1. Responsable del tratamiento de los datos",
    content: [
      { type: "p", text: "<strong>Responsable:</strong> Neurolinks" },
      { type: "p", text: "Neurolinks es responsable del uso y protección de los datos personales proporcionados por los usuarios." },
    ],
  },
  {
    title: "2. Datos personales que recopilamos",
    content: [
      { type: "p", text: "Dependiendo de la interacción del usuario con el sitio, podemos recopilar:" },
      {
        type: "ul",
        items: [
          "<strong>Datos identificatorios:</strong> nombre, correo electrónico, teléfono, dirección u otros datos que el usuario complete voluntariamente.",
          "<strong>Datos de navegación:</strong> dirección IP, navegador, sistema operativo, páginas visitadas, fecha y hora, tiempo de permanencia, entre otros.",
          "<strong>Cookies y tecnologías similares:</strong> información necesaria para analizar uso del sitio, recordar preferencias y mejorar la experiencia.",
          "<strong>Datos asociados a servicios de terceros:</strong> si usás integraciones como Google Analytics, Meta Pixel u otros.",
        ],
      },
    ],
  },
  {
    title: "3. Finalidades del tratamiento",
    content: [
      { type: "p", text: "Los datos personales podrán ser utilizados para:" },
      {
        type: "ul",
        items: [
          "Responder consultas, brindar soporte y comunicarnos con los usuarios.",
          "Gestionar el acceso a contenidos, paneles y funciones del sitio.",
          "Procesar operaciones, solicitudes o funcionalidades propias del servicio.",
          "Mejorar la experiencia general del sitio, su seguridad y rendimiento.",
          "Realizar análisis estadístico, métricas internas e informes de uso.",
          "Cumplir con obligaciones legales y regulatorias.",
        ],
      },
    ],
  },
  {
    title: "4. Base legal para el tratamiento de datos",
    content: [
      { type: "p", text: "El tratamiento de datos se fundamenta en:" },
      {
        type: "ul",
        items: [
          "<strong>Consentimiento del usuario:</strong> al completar formularios o utilizar el sitio.",
          "<strong>Relación contractual o precontractual:</strong> cuando se brinden servicios o funciones internas.",
          "<strong>Interés legítimo:</strong> optimización del sitio, prevención de fraudes y seguridad.",
          "<strong>Obligaciones legales:</strong> cuando la normativa exija conservación o entrega de datos.",
        ],
      },
    ],
  },
  {
    title: "5. Cookies y tecnologías similares",
    content: [
      { type: "p", text: "El sitio puede utilizar cookies propias y de terceros para:" },
      {
        type: "ul",
        items: [
          "Recordar preferencias y configuraciones del usuario.",
          "Mejorar la experiencia de navegación.",
          "Realizar análisis y métricas del sitio.",
          "Optimizar el rendimiento de la plataforma.",
        ],
      },
      { type: "p", text: "El usuario puede configurar su navegador para rechazar cookies o eliminarlas. Sin embargo, algunas funciones del sitio podrían no operar correctamente." },
    ],
  },
  {
    title: "6. Conservación y protección de los datos",
    content: [
      { type: "p", text: "Los datos personales serán conservados únicamente durante el tiempo necesario para cumplir las finalidades informadas o según lo exija la normativa vigente." },
      { type: "p", text: "Neurolinks adopta medidas de seguridad razonables para proteger los datos contra acceso no autorizado, pérdida, alteración o destrucción." },
    ],
  },
  {
    title: "7. Compartición de datos con terceros",
    content: [
      { type: "p", text: "Podemos compartir datos únicamente cuando sea necesario y bajo estricta confidencialidad con:" },
      {
        type: "ul",
        items: [
          "Proveedores tecnológicos (hosting, email, analítica, seguridad, etc.).",
          "Plataformas de pago o verificación de identidad (si corresponde).",
          "Autoridades administrativas o judiciales cuando la ley lo requiera.",
        ],
      },
      { type: "p", text: "Neurolinks no vende, alquila ni intercambia datos personales con fines comerciales." },
    ],
  },
  {
    title: "8. Derechos de los usuarios (Ley 25.326)",
    content: [
      { type: "p", text: "El usuario titular de los datos puede ejercer los siguientes derechos:" },
      {
        type: "ul",
        items: [
          "<strong>Acceso:</strong> conocer qué datos tratamos y su origen.",
          "<strong>Rectificación:</strong> corregir datos incorrectos o incompletos.",
          "<strong>Supresión:</strong> solicitar la eliminación cuando ya no sean necesarios.",
          "<strong>Actualización:</strong> mantener los datos al día.",
          "<strong>Oposición:</strong> rechazar ciertos tratamientos cuando corresponda.",
        ],
      },
      { type: "p", text: "La Agencia de Acceso a la Información Pública (AAIP) es el organismo de control de la Ley 25.326 en Argentina." },
    ],
  },
  {
    title: "9. Enlaces a sitios de terceros",
    content: [
      { type: "p", text: "Este sitio puede incluir enlaces a plataformas externas. Neurolinks no se hace responsable por las políticas de privacidad ni contenidos de dichos sitios." },
    ],
  },
  {
    title: "10. Transferencias internacionales de datos",
    content: [
      { type: "p", text: "Algunos proveedores podrían encontrarse fuera de Argentina. Al utilizar nuestros servicios, el usuario comprende y acepta que los datos pueden ser transferidos y tratados en otros países, siempre asegurando estándares adecuados de protección." },
    ],
  },
  {
    title: "11. Modificaciones a esta Política",
    content: [
      { type: "p", text: "Neurolinks puede actualizar esta Política en cualquier momento. En caso de cambios, se ajustará la fecha de vigencia indicada al inicio. El uso del sitio después de la actualización implica la aceptación de los cambios." },
    ],
  },
];

function Block({ item }) {
  if (item.type === "p") {
    return (
      <p className="text-white/50 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }} />
    );
  }
  return (
    <ul className="space-y-2">
      {item.items.map((li, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-light shrink-0" />
          <span className="text-white/50 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: li }} />
        </li>
      ))}
    </ul>
  );
}

export default function PoliticasPage() {
  const fecha = new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date());

  return (
    <div className="min-h-screen relative">

      {/* Hero */}
      <div className="relative pt-28 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="flex w-fit items-center gap-2 text-white/40 hover:text-accent-light text-sm transition-colors mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Volver al inicio
          </Link>
          <span className="inline-block text-[10px] font-heading font-semibold tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full bg-accent/[0.1] border border-accent/[0.18] text-accent-subtle">
            Legal
          </span>
          <h1 className="font-heading font-extrabold text-white text-4xl sm:text-5xl mb-3">
            Política de Privacidad
          </h1>
          <p className="text-white/35 text-sm">Fecha de vigencia: {fecha}</p>
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="glass rounded-2xl p-5 sm:p-6 mb-10 border-l-2 border-accent/40">
          <p className="text-white/55 text-sm leading-relaxed">
            En esta Política de Privacidad se describe cómo Neurolinks recopila, utiliza, almacena y protege
            los datos personales de los usuarios conforme a la normativa aplicable, incluyendo la{" "}
            <strong className="text-white/80 font-semibold">Ley 25.326 de Protección de Datos Personales (Argentina)</strong>.
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((s) => (
            <div key={s.title} className="glass-card rounded-2xl p-6 sm:p-7">
              <h2 className="font-heading font-bold text-accent-subtle text-base mb-4">{s.title}</h2>
              <div className="space-y-3">
                {s.content.map((item, i) => (
                  <Block key={i} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-white/30 text-xs mt-12">
          ¿Tenés preguntas sobre esta política?{" "}
          <a href="mailto:info@clientesneurolinks.com" className="text-accent-subtle hover:text-accent-light transition-colors font-semibold">
            Contactanos
          </a>
        </p>
      </div>
    </div>
  );
}
