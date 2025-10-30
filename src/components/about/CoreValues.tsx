import { SparklesIcon, LightningBoltIcon, EyeIcon, EmojiHappyIcon } from "@heroicons/react/outline";

const values = [
  { title: "Craftsmanship", icon: SparklesIcon, copy: "Pixel-perfect detail in every build." },
  { title: "Performance", icon: LightningBoltIcon, copy: "Speed is a feature, not a luxury." },
  { title: "Transparency", icon: EyeIcon, copy: "Open processes, honest communication." },
  { title: "Playfulness", icon: EmojiHappyIcon, copy: "We code with a wink." },
] as const;

export default function CoreValues() {
  return (
    <section className="py-20 container mx-auto px-6">
      <h2 className="text-3xl font-semibold mb-12 text-center">Our Core Values</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map(({ title, icon: Icon, copy }) => (
          <div key={title} className="bg-glass border border-white/10 p-6 rounded-xl backdrop-blur">
            <Icon className="h-8 w-8 text-cyan-400 mb-4" />
            <h3 className="font-medium text-xl mb-2">{title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
