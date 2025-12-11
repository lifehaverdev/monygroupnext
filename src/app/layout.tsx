import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import localFont from "next/font/local";
import RouteProgress from "../components/RouteProgress";
import InitialSplash from "../components/InitialSplash";
import NavigationSplash from "../components/NavigationSplash";
import { ReadinessProvider } from "../contexts/ReadinessContext";
// Critical above-the-fold CSS (≈2 kB) is inlined to eliminate the render-blocking request for globals.css.
// It contains root color variables, font faces, and body font-family so that the first paint has correct styles.
const criticalCss = `
:root {
  --background: #ffffff;
  --foreground: #171717;
}
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
/* Subset (Latin, wght 400–700) ~20 kB */
@font-face {
  font-family: "RedHatTextVar";
  src: url("/fonts/subset/RedHatTextVarLatinSubsetBasic.woff2") format("woff2-variations");
  font-weight: 400 700;
  font-display: swap;
}
/* Full variable font deferred; will be injected after window load */
@font-face {
  font-family: "RemiliaMincho";
  src: url("/fonts/RemiliaMincho-Regular.otf") format("opentype");
  font-weight: 400;
  font-display: swap;
}
body {
  font-family: "RedHatTextVar", var(--font-geist-sans), sans-serif;
}
`;

// This tiny script ( <1 kB after minification ) converts Next.js' render-blocking
// <link rel="stylesheet"> into a preload that swaps back to stylesheet onload,
// following Lighthouse’s recommended pattern.
const nonBlockingCssScript = `document.querySelectorAll('link[data-precedence="next"][rel="stylesheet"]').forEach(l=>{l.rel='preload';l.as='style';l.addEventListener('load',()=>l.rel='stylesheet');});`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Local fonts
const redHat = localFont({
  preload: true,
  src: "../../public/fonts/subset/RedHatTextVarLatinSubsetBasic.woff2",
  variable: "--font-redhat",
  display: "swap",
});

const remilia = localFont({
  src: "../../public/fonts/RemiliaMincho-Regular.otf",
  variable: "--font-remilia",
  display: "swap",
  preload: true, // Preload the font for faster loading
});

export const metadata: Metadata = {
  metadataBase: new URL("https://monygroup.net/"),
  title: {
    default: "Mony Group",
    template: "%s | Mony Group",
  },
  description: "Full-service creative technology partner.",
  generator: "Next.js 14",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Mony Group",
    description: "Full-service creative technology partner.",
    url: "https://mony.group/",
    siteName: "Mony Group",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Mony Group social preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mony Group",
    description: "Full-service creative technology partner.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        {/* Preload RemiliaMincho font for faster text appearance */}
        <link
          rel="preload"
          href="/fonts/RemiliaMincho-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        {/* Inline critical CSS for first paint */}
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
        {/* Convert render-blocking stylesheet to non-blocking */}
        <script dangerouslySetInnerHTML={{ __html: nonBlockingCssScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${redHat.variable} ${remilia.variable} antialiased flex flex-col min-h-screen`}
        >
        <ReadinessProvider>
          <InitialSplash />
          <NavigationSplash />
          <RouteProgress />
        <header className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-700">
          <nav className="container mx-auto flex gap-6 p-4 text-sm font-medium text-gray-700 dark:text-gray-200">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/audits" className="hover:text-primary transition-colors">Audits</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
        </header>
        <main className="container mx-auto py-8 flex-1">
          {children}
        </main>
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-center p-4 text-xs text-gray-600 dark:text-gray-300">
          <span className="copyleft">&copy;</span> {new Date().getFullYear()} Mony Group
        </footer>
        
        {/* SVG Filters for Liquid Glass Effect */}
        <svg style={{ display: 'none' }} aria-hidden="true">
          <defs>
            <filter id="liquid-glass" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
              <feGaussianBlur in="noise" stdDeviation="0.02" result="blur" />
              <feDisplacementMap in="SourceGraphic" in2="blur" scale="69" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        </ReadinessProvider>
      </body>
    </html>
  );
}
