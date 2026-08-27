import { Inter, Orbitron, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteConfig } from "../lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Killer Nugget",
    "house music",
    "electronic music",
    "Costa Rica",
    "DJ",
    "music producer",
    "press kit",
    "minimal house",
    "underground house",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "music",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "2SRXz6sUYr3s5DzLlW8oNiFTO_hk29sTq7VX8ljlSm4",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_CR"],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        alt: "Killer Nugget — house music producer from Costa Rica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: ["en", "es"],
      publisher: { "@id": `${siteConfig.url}/#artist` },
    },
    {
      "@type": "MusicGroup",
      "@id": `${siteConfig.url}/#artist`,
      name: siteConfig.name,
      url: siteConfig.url,
      image: `${siteConfig.url}${siteConfig.ogImage}`,
      description: siteConfig.description,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      genre: ["House", "Electronic", "Minimal House"],
      foundingLocation: {
        "@type": "Place",
        name: "Costa Rica",
        address: {
          "@type": "PostalAddress",
          addressCountry: "CR",
        },
      },
      sameAs: siteConfig.sameAs,
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${orbitron.variable} ${playfairDisplay.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
