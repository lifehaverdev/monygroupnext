import PortraitScene from "../../components/about/PortraitScene";
import GlassCard from "../../components/ui/GlassCard";

export const metadata = { title: "About" };

export default function About() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen py-32 px-6">
      {/* Three.js background */}
      <PortraitScene />

      {/* Minimal copy inside glass card */}
      <GlassCard className="relative z-10 max-w-xl mx-auto px-8 py-10 text-center backdrop-blur-md/60 bg-white/10 dark:bg-black/10 space-y-6 leading-relaxed">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="">Solidity developer focused on smart contract architecture, security, and deployment.</p>
        <p>
          Started building on Ethereum in 2022.<br />Previous background in mechanical engineering and patent law.<br />All work is original and public.<br />Projects span from derivative experiments to productized systems.
        </p>
        <p>
          Contracts are written for permanence.<br />Toolchain: Solidity, Foundry, React, Tailwind, IPFS.
        </p>
        <p>
          Available for freelance development, audits, or integration work.<br />See Projects for details.
        </p>
        <p>Email | ENS | Telegram</p>
      </GlassCard>
    </main>
  );
}
