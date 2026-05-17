import HeroSection         from "@/components/home/HeroSection";
import MetaPartnerStrip   from "@/components/home/MetaPartnerStrip";
import ServicesSection     from "@/components/home/ServicesSection";
import PricingSection    from "@/components/home/PricingSection";
import AsistentesPreview from "@/components/home/AsistentesPreview";
import CtaSection        from "@/components/home/CtaSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AboutSection      from "@/components/home/AboutSection";
import ContactSection    from "@/components/home/ContactSection";

/* Thin gradient line that separates sections visually */
function Divider() {
  return (
    <div
      aria-hidden="true"
      className="w-full h-px"
      style={{ background: "linear-gradient(90deg, transparent 0%, rgba(0,153,255,0.12) 50%, transparent 100%)" }}
    />
  );
}

/* Wrapper that adds a very subtle dark tint to alternate sections */
function AltSection({ children }) {
  return (
    <div style={{ background: "rgba(4, 9, 18, 0.28)" }}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <MetaPartnerStrip />

      <Divider />
      <AltSection><ServicesSection /></AltSection>

      <Divider />
      <PricingSection />

      <Divider />
      <AltSection><AsistentesPreview /></AltSection>

      <Divider />
      <CtaSection />

      <Divider />
      <AltSection><TestimonialsSection /></AltSection>

      <Divider />
      <AboutSection />

      <Divider />
      <AltSection><ContactSection /></AltSection>
    </>
  );
}
