import Link from "next/link";
import PageScene from "../../components/PageScene";
import GlassCard from "../../components/ui/GlassCard";
import ScrollReveal from "../../components/ScrollReveal";
import CenterFocusReveal from "../../components/CenterFocusReveal";
import ScrollIndicator from "../../components/ScrollIndicator";
import { scrollRevealConfig, centerFocusConfig } from "../../config/parallaxConfig";
import { promises as fs } from "fs";
import path from "path";

const CARD_MAX_WIDTH = "max-w-2xl";

export const metadata = { title: "Audits" };

async function getAudits() {
  const auditsDir = path.join(process.cwd(), "audits-src");
  try {
    const files = await fs.readdir(auditsDir);
    const auditFiles = files.filter(
      (file) => file.endsWith(".md") && !file.startsWith(".")
    );
    
    const audits = await Promise.all(
      auditFiles.map(async (file) => {
        const slug = file.replace(".md", "");
        const filePath = path.join(auditsDir, file);
        try {
          const content = await fs.readFile(filePath, "utf8");
          // Extract title from first H1 heading
          const titleMatch = content.match(/^#\s+(.+)$/m);
          const title = titleMatch ? titleMatch[1] : slug;
          return { slug, title };
        } catch {
          return { slug, title: slug };
        }
      })
    );
    
    return audits;
  } catch {
    return [];
  }
}

export default async function Audits() {
  const audits = await getAudits();

  return (
    <>
      {/* Three.js background - fixed, no parallax */}
      <PageScene />

      {/* Hero section - scroll snap point */}
      <section className="scroll-snap-section relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
        {/* Hero content - visible immediately, no scroll reveal */}
        <GlassCard className="relative z-10 text-center flex flex-col items-center gap-6 max-w-2xl mx-auto px-8 py-12 rounded-2xl" id="hero">
          <h1 className="text-4xl/tight sm:text-5xl font-semibold tracking-tight">
            MONY VAULT
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            These audits are performed by the Mony Vault Security Team and you can get one too
          </p>
        </GlassCard>
        
        {/* Scroll indicator */}
        <ScrollIndicator />
      </section>

      {/* Audit items - one per viewport, perfectly centered, each is a scroll snap point */}
      {audits.length === 0 ? (
        <section className="scroll-snap-section flex items-center justify-center min-h-screen w-full">
          <CenterFocusReveal 
            speed={centerFocusConfig.services.speed} 
            delay={centerFocusConfig.services.delay}
            visibilityThreshold={centerFocusConfig.services.visibilityThreshold}
            className="w-full flex justify-center"
          >
            <GlassCard className={`p-8 rounded-lg ${CARD_MAX_WIDTH} w-full`}>
              <p className="text-neutral-600 dark:text-neutral-300">No audits available at this time.</p>
            </GlassCard>
          </CenterFocusReveal>
        </section>
      ) : (
        audits.map((audit) => (
        <section key={audit.slug} className="scroll-snap-section flex items-center justify-center min-h-screen w-full">
          <CenterFocusReveal 
            speed={centerFocusConfig.services.speed} 
            delay={centerFocusConfig.services.delay}
            visibilityThreshold={centerFocusConfig.services.visibilityThreshold}
            className="w-full flex justify-center"
          >
            <GlassCard className={`p-8 rounded-lg ${CARD_MAX_WIDTH} w-full`}>
              <h3 className="font-medium text-lg leading-tight mb-2">{audit.title}</h3>
              <Link
                href={`/audits/${audit.slug}`}
                className="underline text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
              >
                View audit report →
              </Link>
            </GlassCard>
          </CenterFocusReveal>
        </section>
        ))
      )}
    </>
  );
}
