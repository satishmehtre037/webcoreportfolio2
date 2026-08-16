import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Caveat, DM_Sans, IBM_Plex_Mono, Syne } from "next/font/google";
import { SITE } from "@/lib/constants/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url || "https://webcorestudio.dev"),
  title: {
    default: "WebCore Studio — AI Software Development Company & Web Studio",
    template: "%s · WebCore Studio",
  },
  description:
    "WebCore is a premier AI software development company building custom Next.js web applications, AI copilots, business automation workflows, and high-performance brand systems.",
  keywords: [
    "AI Software Development Company",
    "Software Development Company India",
    "Web Development Company",
    "Custom Software Development",
    "Next.js Development",
    "AI Automation Agency",
    "WhatsApp Automation",
    "Business Automation",
    "SaaS Development",
    "UI UX Design",
    "WebCore Studio",
  ],
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": `${SITE.url || "https://webcorestudio.dev"}/rss.xml`,
    },
  },
  openGraph: {
    title: "WebCore Studio — AI & Software Development Company",
    description:
      "Craft over templates. Handcrafted Next.js platforms, custom AI copilots, and enterprise software systems.",
    url: SITE.url || "https://webcorestudio.dev",
    siteName: "WebCore Studio",
    type: "website",
    images: [
      {
        url: `${SITE.url || "https://webcorestudio.dev"}/og`,
        width: 1200,
        height: 630,
        alt: "WebCore Studio AI & Software Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebCore Studio — AI & Software Development Company",
    description:
      "Craft over templates. Handcrafted Next.js platforms, custom AI copilots, and enterprise software systems.",
    images: [`${SITE.url || "https://webcorestudio.dev"}/og`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: [
      "v7Azso-TyvQU2If8ZYY4BxWCZI-b_JYjhoAxY4XttNg",
      "h1k-_6OUtjm_1IVGI_w8puQCUG4fxZm59DIG2goFyps",
    ],
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
  const baseUrl = SITE.url || "https://webcorestudio.dev";

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "WebCore Studio",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/webcore-logo-mark.svg`,
        },
        sameAs: [
          "https://linkedin.com/company/webcore",
          "https://github.com/webcore",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "hello@webcorestudio.dev",
          contactType: "customer support",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#service`,
        name: "WebCore Studio — Software & AI Engineering",
        url: baseUrl,
        logo: `${baseUrl}/webcore-logo-mark.svg`,
        image: `${baseUrl}/og`,
        description:
          "Handcrafted digital products, custom AI copilots, high-performance Next.js web platforms and brand systems for ambitious companies.",
        priceRange: "$$",
        telephone: "+91-9000000000",
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
          addressRegion: "Maharashtra",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          ratingCount: "24",
          reviewCount: "24",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Software & AI Development Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Software & Copilot Development",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom Next.js & Web Platform Development",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "WhatsApp Automation & Workflow Engineering",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "UI/UX Design & Brand Systems",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "WebCore Studio",
        description: "AI & Software Development Company",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JR6CHNH379"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JR6CHNH379');
          `}
        </Script>
      </head>
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
