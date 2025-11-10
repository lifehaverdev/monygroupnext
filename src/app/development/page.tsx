import PageScene from "../../components/PageScene";
import GlassCard from "../../components/ui/GlassCard";
import ScrollReveal from "../../components/ScrollReveal";
import ScrollIndicator from "../../components/ScrollIndicator";
import EmailCTAButton from "../../components/EmailCTAButton";
import CenterFocusReveal from "../../components/CenterFocusReveal";
import { scrollRevealConfig, centerFocusConfig, layoutConfig } from "../../config/parallaxConfig";

export const metadata = { title: "Software Development" };

const CARD_MAX_WIDTH = "max-w-2xl";

export default function Development() {
  return (
    <>
      {/* Hero section */}
      <section className="scroll-snap-section relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
        <PageScene />
        
        <GlassCard className="relative z-10 text-center flex flex-col items-center gap-6 max-w-2xl mx-auto px-8 py-12 rounded-2xl" id="hero">
          <h1 className="text-4xl/tight sm:text-5xl font-semibold tracking-tight">
            Full-Stack Software Development
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            Platform engineering, Telegram bots, and custom applications. From concept to deployment.
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
            <h2 className="text-xl font-semibold mb-4">Software Engineering</h2>
            <p className="mb-2">
              Full-stack development with varied expertise across web platforms, Telegram bots, and custom applications. noema.art represents a complete platform-as-bot architecture.
            </p>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Services section */}
      <div id="services" style={{ position: 'relative', minHeight: '500vh' }}>
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
            title: "Platform Development",
            desc: "Full-stack web applications with modern frameworks and scalable architecture",
          },
          {
            title: "Telegram Bot Development",
            desc: "Custom bot implementations with complex workflows and integrations",
          },
          {
            title: "API Design & Integration",
            desc: "RESTful and custom API development for third-party service integration",
          },
          {
            title: "Frontend Development",
            desc: "React, Tailwind, and modern UI/UX for responsive, performant interfaces",
          },
          {
            title: "Deployment & Infrastructure",
            desc: "IPFS, cloud hosting, and decentralized deployment strategies",
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
            <p className="mb-4">Need custom software? Let's build your platform.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EmailCTAButton />
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>
    </>
  );
}

