'use client';

import { useState } from 'react';
import GlassCard from '../../../components/ui/GlassCard';

export default function GlassTestPage() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      {/* Background with animated pattern */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: 'url(https://raw.githubusercontent.com/lucasromerodb/liquid-glass-effect-macos/refs/heads/main/assets/flowers.jpg)',
            backgroundSize: '400px',
            backgroundPosition: 'center center',
            animation: 'moveBackground 60s linear infinite',
          }}
        />
      </div>

      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="glass glass-hover px-4 py-2 rounded-md text-sm font-medium"
        >
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Liquid Glass Effect Test</h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Testing the liquid-glass effect across different variants and scenarios
            </p>
          </div>

          {/* Basic Glass Cards */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Basic Glass Cards</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <GlassCard className="p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Default Glass</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  This is a default glass card with standard styling.
                </p>
              </GlassCard>

              <GlassCard variant="sm" className="p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Small Glass</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  This is a small variant with reduced glow effects.
                </p>
              </GlassCard>

              <GlassCard variant="lg" className="p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Large Glass</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  This is a large variant with enhanced glow effects.
                </p>
              </GlassCard>
            </div>
          </section>

          {/* Hover Effects */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Hover Effects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <GlassCard hover className="p-6 rounded-lg cursor-pointer">
                <h3 className="text-lg font-semibold mb-2">Hover Enabled</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Hover over this card to see the enhanced glass effect.
                </p>
              </GlassCard>

              <GlassCard className="p-6 rounded-lg cursor-pointer">
                <h3 className="text-lg font-semibold mb-2">No Hover</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  This card has no hover effects for comparison.
                </p>
              </GlassCard>
            </div>
          </section>

          {/* Different Shapes */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Different Shapes</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <GlassCard className="p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Rounded</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Standard rounded corners
                </p>
              </GlassCard>

              <GlassCard className="p-6 rounded-full aspect-square flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Circle</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    Circular glass
                  </p>
                </div>
              </GlassCard>

              <GlassCard className="p-6 rounded-none">
                <h3 className="text-lg font-semibold mb-2">Square</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Sharp corners
                </p>
              </GlassCard>
            </div>
          </section>

          {/* Text Legibility Test */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Text Legibility Test</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <GlassCard className="p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Large Heading</h3>
                <p className="text-base mb-4 text-neutral-600 dark:text-neutral-300">
                  This is a paragraph with regular text to test readability over the glass effect.
                  The text should remain clearly legible while maintaining the liquid glass aesthetic.
                </p>
                <ul className="text-sm space-y-2 text-neutral-600 dark:text-neutral-300">
                  <li>• List item one</li>
                  <li>• List item two</li>
                  <li>• List item three</li>
                </ul>
              </GlassCard>

              <GlassCard className="p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Small Text</h3>
                <p className="text-xs mb-4 text-neutral-600 dark:text-neutral-300">
                  This is very small text to test if the glass effect interferes with readability.
                  Even at small sizes, the text should remain clear and easy to read.
                </p>
                <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                  console.log(&apos;code snippet&apos;)
                </code>
              </GlassCard>
            </div>
          </section>

          {/* Performance Test */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Performance Test</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 24 }, (_, i) => (
                <GlassCard key={i} className="p-4 rounded-lg aspect-square flex items-center justify-center">
                  <span className="text-xs font-medium">{i + 1}</span>
                </GlassCard>
              ))}
            </div>
            <p className="text-sm text-neutral-500 text-center">
              Multiple glass elements to test performance impact
            </p>
          </section>
        </div>
      </div>

      <style jsx>{`
        @keyframes moveBackground {
          from {
            background-position: 0% 0%;
          }
          to {
            background-position: 0% -1000%;
          }
        }
      `}</style>
    </div>
  );
}
