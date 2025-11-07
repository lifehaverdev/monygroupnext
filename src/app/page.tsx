import Link from "next/link";
import ThreeHeroWrapper from "../components/ThreeHeroWrapper";
import GlassCard from "../components/ui/GlassCard";
import EmailCTAButton from "../components/EmailCTAButton";
import ScrollReveal from "../components/ScrollReveal";
import ScrollIndicator from "../components/ScrollIndicator";
import CenterFocusReveal from "../components/CenterFocusReveal";
import { scrollRevealConfig, centerFocusConfig, layoutConfig } from "../config/parallaxConfig";

const CARD_MAX_WIDTH = "max-w-2xl";

export default function Home() {
  return (
    <>
      {/* Full-screen hero section - scroll snap point */}
      <section className="scroll-snap-section relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
        {/* Three.js hero - fixed background, no parallax */}
        <ThreeHeroWrapper />
        
        {/* Hero content - visible immediately, no scroll reveal */}
        <GlassCard className="relative z-10 text-center flex flex-col items-center gap-6 max-w-2xl mx-auto px-8 py-12 rounded-2xl" id="hero">
          <h1 className="text-4xl/tight sm:text-5xl font-semibold tracking-tight">
            Build on the New Internet
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            Solidity engineer and auditor. Creative Designer. Full-stack capable. Focused on original architecture, security, and clarity.
          </p>
          <div className="flex gap-4 flex-col sm:flex-row mt-4">
            <EmailCTAButton />
            <Link
              href="#projects"
              className="border border-neutral-300 dark:border-neutral-700 px-6 py-3 rounded-md text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              View Work
            </Link>
          </div>
        </GlassCard>
        
        {/* Scroll indicator */}
        <ScrollIndicator />
      </section>

      {/* About section - scroll snap point */}
      <section className="scroll-snap-section flex flex-col items-center justify-center min-h-screen w-full py-16">
      <ScrollReveal {...scrollRevealConfig.about}>
          <GlassCard className="max-w-3xl mx-auto px-8 py-8 rounded-xl text-center" id="about">
        <h2 className="text-xl font-semibold mb-4">About</h2>
        <p className="mb-2">
          Solidity-first developer working on Ethereum since 2022.<br />
          Focused on contract architecture, security, and frontend integration.<br />
          Philosophy: Code as artifact. Immutable logic for decentralized systems.
        </p>
        <p className="text-sm text-neutral-500">Stack: Solidity, Foundry, React, Tailwind, IPFS</p>
      </GlassCard>
      </ScrollReveal>
      </section>

      {/* Services section - scroll snap points for each item */}
      <div id="services" style={{ position: 'relative', minHeight: '300vh' }}>
        {/* Sticky header - top left, sticks while section is in view */}
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
          
        {/* Services items - one per viewport, perfectly centered, each is a scroll snap point */}
        {/* Service 1 */}
        <section className="scroll-snap-section flex items-center justify-center min-h-screen w-full">
          <CenterFocusReveal 
            speed={centerFocusConfig.services.speed} 
            delay={centerFocusConfig.services.delay}
            visibilityThreshold={centerFocusConfig.services.visibilityThreshold}
            className="w-full flex justify-center"
          >
            <GlassCard className={`p-8 rounded-lg ${CARD_MAX_WIDTH} w-full`}>
              <h3 className="font-medium mb-3 text-lg">Smart Contract Auditing</h3>
              <ul className="text-sm list-disc pl-4 space-y-1">
                <li>Manual review and formal verification analysis</li>
                <li>Reports with annotations and recommendations</li>
                <li>Gas Optimization</li>
                <li>Foundry, Slither, fuzzing, symbolic execution</li>
              </ul>
            </GlassCard>
            </CenterFocusReveal>
        </section>

        {/* Service 2 */}
        <section className="scroll-snap-section flex items-center justify-center min-h-screen w-full">
          <CenterFocusReveal 
            speed={centerFocusConfig.services.speed} 
            delay={centerFocusConfig.services.delay}
            visibilityThreshold={centerFocusConfig.services.visibilityThreshold}
            className="w-full flex justify-center"
          >
            <GlassCard className={`p-8 rounded-lg ${CARD_MAX_WIDTH} w-full`}>
                <h3 className="font-medium mb-3 text-lg">Contract Engineering</h3>
              <ul className="text-sm list-disc pl-4 space-y-1">
                <li>Custom ERC20/721 logic</li>
                <li>On-chain systems design</li>
                <li>Royalty, liquidity, credit, or hybrid primitives</li>
              </ul>
            </GlassCard>
            </CenterFocusReveal>
        </section>

        {/* Service 3 */}
        <section className="scroll-snap-section flex items-center justify-center min-h-screen w-full">
          <CenterFocusReveal 
            speed={centerFocusConfig.services.speed} 
            delay={centerFocusConfig.services.delay}
            visibilityThreshold={centerFocusConfig.services.visibilityThreshold}
            className="w-full flex justify-center"
          >
            <GlassCard className={`p-8 rounded-lg ${CARD_MAX_WIDTH} w-full`}>
                <h3 className="font-medium mb-3 text-lg">Frontend Integration</h3>
              <ul className="text-sm list-disc pl-4 space-y-1">
                <li>React + Tailwind dApps</li>
                <li>On-chain interaction</li>
                <li>IPFS or hosted deployment</li>
              </ul>
            </GlassCard>
            </CenterFocusReveal>
        </section>
      </div>

      {/* Projects section - scroll snap points for each item */}
      <div id="projects" style={{ position: 'relative', minHeight: '300vh' }}>
        {/* Sticky header - top left, sticks while section is in view */}
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
          <h2 className="text-xl font-semibold">Projects</h2>
          </div>
          
        {/* Projects items - one per viewport, perfectly centered, each is a scroll snap point */}
          {[
            {
              slug: "cult-executives",
              title: "Cult Executives",
              desc: "ERC721/ERC20 hybrid with automated liquidity royalty. Original architecture.",
              tech: "Solidity, Viem, Foundry",
              config: centerFocusConfig.projects.cultExecutives,
            },
            {
              slug: "station-this-bot",
              title: "StationThisBot",
              desc: "AI access via on-chain credit + Telegram integration. Smart contract manages authorization and message routing.",
              tech: "Solidity, Foundry, OpenAI",
              config: centerFocusConfig.projects.stationThisBot,
            },
            {
              slug: "station-series",
              title: "Station Series",
              desc: "MiladyStation (flagship), CigStation, TubbyStation — three-project NFT and minting series. Each audited and expandable.",
              tech: "Solidity, React",
              config: centerFocusConfig.projects.stationSeries,
            },
          ].map((p) => (
          <section key={p.slug} className="scroll-snap-section flex items-center justify-center min-h-screen w-full">
            <CenterFocusReveal 
              speed={p.config.speed} 
              delay={p.config.delay}
              visibilityThreshold={p.config.visibilityThreshold}
              className="w-full flex justify-center"
            >
              <GlassCard className={`p-8 rounded-lg ${CARD_MAX_WIDTH} w-full`}>
                <h3 className="font-medium text-lg leading-tight mb-2">{p.title}</h3>
                <p className="text-sm mb-3">{p.desc}</p>
                <p className="text-xs text-neutral-500 mb-4">{p.tech}</p>
                <Link href={`/audits/${p.slug}`} className="underline text-sm">
                  View details →
                </Link>
              </GlassCard>
              </CenterFocusReveal>
          </section>
          ))}
      </div>

      {/* Contact section - scroll snap point */}
      <section className="scroll-snap-section flex flex-col items-center justify-center min-h-screen w-full py-16">
      <ScrollReveal {...scrollRevealConfig.contact}>
          <GlassCard className="max-w-3xl mx-auto px-8 py-8 text-center rounded-xl" id="contact">
        <h2 className="text-xl font-semibold mb-4">Contact</h2>
        <p className="mb-4">Freelance smart contract work available.<br />Development, auditing, integration.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <EmailCTAButton />
          <Link href="mailto:hello@mony.group" className="underline text-sm">
            Email
          </Link>
          <Link href="https://app.ens.domains/name/mony.eth" className="underline text-sm">
            ENS
          </Link>
          <Link href="https://t.me/monygroup" className="underline text-sm">
            Telegram
          </Link>
        </div>
      </GlassCard>
      </ScrollReveal>
      </section>
    </>
  );
}