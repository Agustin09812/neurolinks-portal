"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import NeuralBackground from "@/components/ui/NeuralBackground";

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const isPortal = pathname.startsWith("/portal");

  return (
    <>
      <NeuralBackground fixed opacity={0.28} />
      {!isPortal && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isPortal && <Footer />}
      {!isPortal && <WhatsAppButton />}
    </>
  );
}
