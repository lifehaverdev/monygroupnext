import PageScene from "../../components/PageScene";
import GlassCard from "../../components/ui/GlassCard";
import ScrollReveal from "../../components/ScrollReveal";
import ScrollIndicator from "../../components/ScrollIndicator";
import EmailCTAButton from "../../components/EmailCTAButton";
import CenterFocusReveal from "../../components/CenterFocusReveal";
import { scrollRevealConfig, centerFocusConfig, layoutConfig } from "../../config/parallaxConfig";

export const metadata = { title: "AI Services" };

const CARD_MAX_WIDTH = "max-w-2xl";

export default function AIServices() {
  return (
    <>
      {/* Hero section - scroll snap point */}
      <section className="scroll-snap-section relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
        <PageScene />
        
        <GlassCard className="relative z-10 text-center flex flex-col items-center gap-6 max-w-2xl mx-auto px-8 py-12 rounded-2xl" id="hero">
          <h1 className="text-4xl/tight sm:text-5xl font-semibold tracking-tight">
            AI-Powered Creative Production
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            Curated models, custom workflows, and expert consultation. From NFT collections to art direction—AI that delivers.
          </p>
          <div className="flex gap-4 flex-col sm:flex-row mt-4">
            <EmailCTAButton />
          </div>
        </GlassCard>
        
        <ScrollIndicator />
      </section>

      {/* About/Value Prop section */}
      <section className="scroll-snap-section flex flex-col items-center justify-center min-h-screen w-full py-16">
        <ScrollReveal {...scrollRevealConfig.about}>
          <GlassCard className="max-w-3xl mx-auto px-8 py-8 rounded-xl text-center" id="about">
            <h2 className="text-xl font-semibold mb-4">AI Services</h2>
            <p className="mb-2">
              Professional AI image generation and creative consultation via noema.art. Curated model access, custom workflow design, and strategic art direction for NFT collections and media projects.
            </p>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Services section */}
      <div id="services" style={{ position: 'relative', minHeight: '400vh' }}>
        <div 
          style={{ 
            position: 'sticky', 
            top: layoutConfig.stickyHeaderTop, 
            left: layoutConfig.stickyHeaderLeft,
            width: 'fit-content',
            zIndex: 10,
            alignSelf: 'flex-start',
          }}
        >
          <h2 className="text-xl font-semibold">Services</h2>
        </div>
        
        {[
          {
            title: "Model Access & Workflows",
            desc: "Pay-to-play curated AI models with optimized workflows for consistent, high-quality outputs",
          },
          {
            title: "NFT Collection Creation",
            desc: "End-to-end AI-generated collection development, from concept to deployment",
          },
          {
            title: "Art Direction & Consultation",
            desc: "Strategic guidance on AI-generated media, style consistency, and creative direction",
          },
          {
            title: "Custom Workflow Design",
            desc: "Tailored AI pipelines for specific creative needs and brand requirements",
          },
        ].map((service, idx) => (
          <section key={idx} className="scroll-snap-section flex items-center justify-center min-h-screen w-full">
            <CenterFocusReveal 
              speed={centerFocusConfig.services.speed} 
              delay={centerFocusConfig.services.delay}
              visibilityThreshold={centerFocusConfig.services.visibilityThreshold}
              className="w-full flex justify-center"
            >
              <GlassCard className={`p-8 rounded-lg ${CARD_MAX_WIDTH} w-full`}>
                <h3 className="font-medium mb-3 text-lg">{service.title}</h3>
                <p className="text-sm">{service.desc}</p>
              </GlassCard>
            </CenterFocusReveal>
          </section>
        ))}
      </div>

      {/* CTA section */}
      <section className="scroll-snap-section flex flex-col items-center justify-center min-h-screen w-full py-16">
        <ScrollReveal {...scrollRevealConfig.contact}>
          <GlassCard className="max-w-3xl mx-auto px-8 py-8 text-center rounded-xl" id="contact">
            <h2 className="text-xl font-semibold mb-4">Get Started</h2>
            <p className="mb-4">Ready to explore AI-powered creative production? Let's discuss your project.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EmailCTAButton />
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>
    </>
  );
}

