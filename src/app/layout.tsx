import type { Metadata, Viewport } from "next";
import { Caveat, DM_Sans, IBM_Plex_Mono, Syne } from "next/font/google";
import { SITE } from "@/lib/constants/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url || "https://webcore.studio"),
  title: {
    default: "WebCore — AI & Software Studio",
    template: "%s · WebCore Studio",
  },
  description:
    "Handcrafted digital products, custom AI copilots, high-performance web platforms and brand systems for ambitious companies.",
  openGraph: {
    title: "WebCore — AI & Software Studio",
    description:
      "Craft over templates. Handcrafted web platforms, AI copilots and brand systems.",
    url: "https://webcore.studio",
    siteName: "WebCore Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebCore — AI & Software Studio",
    description:
      "Craft over templates. Handcrafted web platforms, AI copilots and brand systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "v7Azso-TyvQU2If8ZYY4BxWCZI-b_JYjhoAxY4XttNg",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F3EA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${syne.variable} ${caveat.variable} ${ibmPlexMono.variable} min-h-screen bg-ivory font-body text-charcoal antialiased paper-grain`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-charcoal focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
