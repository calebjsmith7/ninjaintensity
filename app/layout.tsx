import type { Metadata, Viewport } from "next";
import { Anton, Outfit } from "next/font/google";
import { business, campFaq, party, programs } from "./data";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const title = "Ninja Intensity | Ninja Warrior Gym & After School Activity in Castle Rock, CO";
const description =
  "Kids ninja classes, parkour, OCR, birthday parties, camps and team building in Castle Rock, CO. Serving Castle Rock, Castle Pines, Parker, Monument and South Denver.";
const shareImage = { url: "/images/home-3.jpg", width: 1800, height: 1260, alt: "Athlete diving for a rope at Ninja Intensity" };

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title,
  description,
  applicationName: business.name,
  alternates: {
    canonical: "/",
    types: { "text/plain": "/llms.txt" },
  },
  icons: { icon: "/favicon.ico", apple: "/images/logo.png" },
  formatDetection: { telephone: true, address: true, email: true },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    title: "Ninja Intensity | Castle Rock, CO",
    description:
      "The best after school program in Castle Rock. Ninja warrior classes, birthday parties, camps and more.",
    url: "/",
    siteName: business.name,
    locale: "en_US",
    images: [shareImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ninjaintensity",
    title: "Ninja Intensity | Castle Rock, CO",
    description:
      "The best after school program in Castle Rock. Ninja warrior classes, birthday parties, camps and more.",
    images: [shareImage.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

const orgId = `${business.url}/#gym`;
const priceNumber = (price: string) => price.match(/[\d.]+/)?.[0];

// Structured data for Google rich results and AI search. Mirrors the copy in data.ts.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["SportsActivityLocation", "LocalBusiness"],
      "@id": orgId,
      name: business.name,
      legalName: business.legalName,
      description,
      telephone: "+17205154395",
      email: business.email,
      url: business.url,
      logo: `${business.url}/images/logo.png`,
      image: [`${business.url}/images/home-3.jpg`, `${business.url}/images/ninja-class.jpg`, `${business.url}/images/parkour-area.jpg`],
      priceRange: "$$",
      hasMap: business.mapsUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.street,
        addressLocality: "Castle Rock",
        addressRegion: "CO",
        postalCode: "80104",
        addressCountry: "US",
      },
      areaServed: ["Castle Rock", "Castle Pines", "Parker", "Monument", "South Denver"].map((name) => ({
        "@type": "City",
        name: `${name}, CO`,
      })),
      sameAs: Object.values(business.social),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Classes, parties and camps",
        itemListElement: [
          ...programs.map((p) => ({
            "@type": "OfferCatalog",
            name: `${p.tagline} (${p.ages})`,
            itemListElement: p.pricing.map((row) => ({
              "@type": "Offer",
              name: `${p.name}: ${row.classes.join(", ")}`,
              description: row.detail,
              url: `${business.url}/#classes`,
              priceCurrency: "USD",
              price: row.price === "FREE" ? "0" : priceNumber(row.price),
            })),
          })),
          ...party.pricing.map((row) => ({
            "@type": "Offer",
            name: `Birthday party, ${row.label}`,
            url: `${business.url}/#parties`,
            priceCurrency: "USD",
            price: priceNumber(row.price),
          })),
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${business.url}/#website`,
      url: business.url,
      name: business.name,
      publisher: { "@id": orgId },
      inLanguage: "en-US",
    },
    {
      "@type": "FAQPage",
      "@id": `${business.url}/#faq`,
      mainEntity: [...party.faq, ...campFaq].map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${anton.variable} ${outfit.variable} antialiased`}>
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
