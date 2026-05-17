import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Neurolinks | Automatización Inteligente para Empresas",
  description:
    "Chatbots IA, automatización de ventas y asistentes inteligentes para potenciar tu empresa. Neurolinks — grandes estrategias para grandes empresas.",
  keywords: "chatbots IA, automatización, WhatsApp marketing, CRM, ventas B2B",
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon.ico", sizes: "any" },
    ],
    apple: { url: "/icons/apple-touch-icon.png" },
    other: [
      { rel: "icon", url: "/icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        {/* Fondo fijo al viewport — no depende de background-attachment */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            background: "linear-gradient(160deg, #050A14 0%, #07111F 35%, #0A192F 65%, #0B2447 100%)",
            pointerEvents: "none",
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
