import PageScene from "../../components/PageScene";
import GlassCard from "../../components/ui/GlassCard";
import ScrollReveal from "../../components/ScrollReveal";
import ScrollIndicator from "../../components/ScrollIndicator";
import EmailCTAButton from "../../components/EmailCTAButton";
import CenterFocusReveal from "../../components/CenterFocusReveal";
import { scrollRevealConfig, centerFocusConfig, layoutConfig } from "../../config/parallaxConfig";

export const metadata = { title: "NFT Project Exhibition" };

const CARD_MAX_WIDTH = "max-w-2xl";

export default function Exhibit() {
  return (
    <>
      {/* Hero section */}
      <section className="scroll-snap-section relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
        <PageScene />
        
        <GlassCard className="relative z-10 text-center flex flex-col items-center gap-6 max-w-2xl mx-auto px-8 py-12 rounded-2xl" id="hero">
          <h1 className="text-4xl/tight sm:text-5xl font-semibold tracking-tight">
            NFT Project Exhibition & Strategy
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            Ethical derivative launches, community building, and strategic positioning. Launch projects that resonate.
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
            <h2 className="text-xl font-semibold mb-4">Project Exhibition</h2>
            <p className="mb-2">
              Strategic NFT project consultation and social media management. Proven track record of ethical derivative launches that gain community acceptance and maintain long-term value. Access to ms2.fun launchpad for instant contract deployment and exhibition.
            </p>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Services section */}
      <div id="services" style={{ position: 'relative', minHeight: '600vh' }}>
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
            title: "Project Strategy",
            desc: "End-to-end consultation for NFT collection launches, from concept to post-mint",
          },
          {
            title: "Launchpad Access",
            desc: "Instant deployment and exhibition via ms2.fun—open-ended contract factory aggregator",
          },
          {
            title: "Social Media Management",
            desc: "Twitter growth, community engagement, and authentic brand voice development",
          },
          {
            title: "Derivative Launch Strategy",
            desc: "Ethical approaches to derivative projects that honor originals while building value",
          },
          {
            title: "Community Building",
            desc: "Discord, Telegram, and social platform strategy for sustainable engagement",
          },
          {
            title: "Brand Positioning",
            desc: "Messaging, narrative, and positioning that resonates with target audiences",
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
            <p className="mb-4">Planning an NFT launch? Let's build a strategy that works. Deploy via ms2.fun launchpad for instant exhibition.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EmailCTAButton />
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>
    </>
  );
}

