import Link from "next/link";
import ThreeHero from "../components/ThreeHero";
import GlassCard from "../components/ui/GlassCard";

export default function Home() {
  return (
    <section className="flex flex-col gap-24 py-16 sm:py-24">
      {/* Three.js hero */}
      <ThreeHero />
      {/* Hero */}
      <GlassCard className="text-center flex flex-col items-center gap-6 max-w-2xl mx-auto px-8 py-12 rounded-2xl" id="hero">
        <h1 className="text-4xl/tight sm:text-5xl font-semibold tracking-tight">
          Build on the New Internet
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
          Solidity engineer and auditor. Creative Designer. Full-stack capable. Focused on original architecture, security, and clarity.
        </p>
        <div className="flex gap-4 flex-col sm:flex-row mt-4">
          <Link
            href="https://calendly.com/monygroup/call"
            className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-md text-sm font-medium hover:opacity-80 transition"
          >
            Book a Call
          </Link>
          <Link
            href="#projects"
            className="border border-neutral-300 dark:border-neutral-700 px-6 py-3 rounded-md text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            View Work
          </Link>
        </div>
      </GlassCard>
      
      {/* About */}
      <GlassCard className="max-w-3xl mx-auto px-8 py-8 rounded-xl" id="about">
        <h2 className="text-xl font-semibold mb-4">About</h2>
        <p className="mb-2">
          Solidity-first developer working on Ethereum since 2022.<br />
          Focused on contract architecture, security, and frontend integration.<br />
          Philosophy: Code as artifact. Immutable logic for decentralized systems.
        </p>
        <p className="text-sm text-neutral-500">Stack: Solidity, Foundry, React, Tailwind, IPFS</p>
      </GlassCard>

      {/* Services */}
      <div className="max-w-5xl mx-auto px-4" id="services">
        <h2 className="text-xl font-semibold mb-6">Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlassCard className="p-6 rounded-lg hover">
            <h3 className="font-medium mb-2">Smart Contract Auditing</h3>
            <ul className="text-sm list-disc pl-4 space-y-1">
              <li>Manual review and static analysis</li>
              <li>Reports with annotations and recommendations</li>
              <li>Foundry, Slither, fuzzing</li>
            </ul>
          </GlassCard>
          <GlassCard className="p-6 rounded-lg hover">
            <h3 className="font-medium mb-2">Contract Engineering</h3>
            <ul className="text-sm list-disc pl-4 space-y-1">
              <li>Custom ERC20/721 logic</li>
              <li>On-chain systems design</li>
              <li>Royalty, liquidity, credit, or hybrid primitives</li>
            </ul>
          </GlassCard>
          <GlassCard className="p-6 rounded-lg hover">
            <h3 className="font-medium mb-2">Frontend Integration</h3>
            <ul className="text-sm list-disc pl-4 space-y-1">
              <li>React + Tailwind dApps</li>
              <li>On-chain interaction</li>
              <li>IPFS or hosted deployment</li>
            </ul>
          </GlassCard>
        </div>
      </div>

      {/* Projects */}
      <div className="max-w-5xl mx-auto px-4" id="projects">
        <h2 className="text-xl font-semibold mb-6">Projects</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              slug: "cult-executives",
              title: "Cult Executives",
              desc: "ERC721/ERC20 hybrid with automated liquidity royalty. Original architecture.",
              tech: "Solidity, Viem, Foundry",
            },
            {
              slug: "station-this-bot",
              title: "StationThisBot",
              desc: "AI access via on-chain credit + Telegram integration. Smart contract manages authorization and message routing.",
              tech: "Solidity, Foundry, OpenAI",
            },
            {
              slug: "station-series",
              title: "Station Series",
              desc: "MiladyStation (flagship), CigStation, TubbyStation — three-project NFT and minting series. Each audited and expandable.",
              tech: "Solidity, React",
            },
          ].map((p) => (
            <li key={p.slug}>
              <GlassCard className="p-6 rounded-lg hover">
                <h3 className="font-medium text-lg leading-tight mb-1">{p.title}</h3>
                <p className="text-sm mb-2">{p.desc}</p>
                <p className="text-xs text-neutral-500 mb-3">{p.tech}</p>
                <Link href={`/audits/${p.slug}`} className="underline text-sm">
                  View details →
                </Link>
              </GlassCard>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <GlassCard className="max-w-3xl mx-auto px-8 py-8 text-center rounded-xl" id="contact">
        <h2 className="text-xl font-semibold mb-4">Contact</h2>
        <p className="mb-4">Freelance smart contract work available.<br />Development, auditing, integration.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://calendly.com/monygroup/call"
            className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-md text-sm font-medium hover:opacity-80 transition"
          >
            Book a Call
          </Link>
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
    </section>
  );
}