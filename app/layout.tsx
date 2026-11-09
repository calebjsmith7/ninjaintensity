import type { Metadata, Viewport } from "next";
import { Anton, Outfit } from "next/font/google";
import { business } from "./data";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ninjaintensity.com"),
  title: "Ninja Intensity | Ninja Warrior Gym & After School Activity in Castle Rock, CO",
  description:
    "Kids ninja classes, parkour, OCR, birthday parties, camps and team building in Castle Rock, CO. Serving Castle Rock, Castle Pines, Parker, Monument and South Denver.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Ninja Intensity | Castle Rock, CO",
    description:
      "The best after school program in Castle Rock. Ninja warrior classes, birthday parties, camps and more.",
    images: ["/images/home-3.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: business.name,
  telephone: business.phone,
  email: business.email,
  url: "https://www.ninjaintensity.com",
  image: "https://www.ninjaintensity.com/images/home-3.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: business.street,
    addressLocality: "Castle Rock",
    addressRegion: "CO",
    postalCode: "80104",
    addressCountry: "US",
  },
  areaServed: ["Castle Rock", "Castle Pines", "Parker", "Monument", "South Denver"],
  sameAs: Object.values(business.social),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${anton.variable} ${outfit.variable} antialiased`}>
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
