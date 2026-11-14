import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://delta2100.example"),
  title: {
    default: "DELTA 2100 — The Last Line of Defense",
    template: "%s — DELTA 2100",
  },
  description:
    "A climate-risk intelligence platform for understanding water-driven change in vulnerable deltas, coastlines and island nations — and exploring what protection could mean.",
  applicationName: "DELTA 2100",
  keywords: [
    "climate risk",
    "sea level rise",
    "delta",
    "Earth observation",
    "coastal resilience",
    "climate adaptation",
  ],
  authors: [{ name: "DELTA 2100" }],
  creator: "DELTA 2100",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DELTA 2100",
    title: "DELTA 2100 — The Last Line of Defense",
    description:
      "Understand the past. Inspect the risk. Decide what happens next.",
    images: [
      {
        url: "/images/nile-hero.jpg",
        width: 1920,
        height: 1278,
        alt: "Earth-observation view of the Nile Delta and eastern Mediterranean.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DELTA 2100 — The Last Line of Defense",
    description:
      "A climate-risk intelligence platform for a changing coast. The future is not lost. Yet.",
    images: ["/images/nile-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#081020",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-control bg-cyan px-4 py-2 font-semibold text-navy transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
