const WA = "https://wa.me/5491170644247?text=";

const COMMON = [
  "CRM integrado",
  "API Oficial de Meta",
  "Envíos ilimitados",
  "Soporte técnico",
  "4 usuarios incluidos",
  "Capacitación en envío de plantillas por API",
  "Usuario adicional: u$d 15/mes",
];

export const pricingPlans = [
  {
    id: "base",
    name: "Base",
    price: "45",
    currency: "U$D",
    period: "mes",
    highlight: false,
    features: [...COMMON],
    ctaLabel: "Consultar por WhatsApp",
    ctaHref:
      WA +
      encodeURIComponent(
        "Hola! Me interesa el Plan Base de Neurolinks (u$d 45/mes). ¿Me pueden dar más información?"
      ),
  },
  {
    id: "plus",
    name: "Plus",
    price: "145",
    currency: "U$D",
    period: "mes",
    highlight: true,
    badge: "Más popular",
    features: [
      ...COMMON,
      "Bot sencillo incluido",
    ],
    ctaLabel: "Consultar por WhatsApp",
    ctaHref:
      WA +
      encodeURIComponent(
        "Hola! Me interesa el Plan Plus de Neurolinks (u$d 145/mes). ¿Me pueden dar más información?"
      ),
  },
  {
    id: "amedida",
    name: "A Medida",
    price: "A consultar",
    currency: null,
    period: "",
    highlight: false,
    features: [
      ...COMMON,
      "Bot a medida",
      "Integraciones externas",
    ],
    ctaLabel: "Consultar por WhatsApp",
    ctaHref:
      WA +
      encodeURIComponent(
        "Hola! Me interesa el Plan A Medida de Neurolinks. ¿Me pueden dar más información?"
      ),
  },
];
