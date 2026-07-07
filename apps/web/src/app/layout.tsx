import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfitSans = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const outfitHeading = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  metadataBase: new URL('https://dopaminevsethics.com'),
  title: {
    default: "Dopamine vs Ethics | Premium Event Management & Digital Marketing",
    template: "%s | Dopamine vs Ethics"
  },
  description: "Satisfying consumers with minimum time and maximum efficiency. Luxury event management, branding, and business growth consulting since 2026.",
  keywords: ["Event Management", "Digital Marketing", "Branding", "Luxury Events", "Concerts", "Corporate Events"],
  authors: [{ name: "Dopamine vs Ethics" }],
  creator: "Dopamine vs Ethics",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dopaminevsethics.com",
    title: "Dopamine vs Ethics | Premium Event Management",
    description: "Experience Perfection. We are the premier agency for luxury events and digital dominance.",
    siteName: "Dopamine vs Ethics",
    images: [{
      url: "https://dopaminevsethics.com/og-image.jpg", // Placeholder
      width: 1200,
      height: 630,
      alt: "Dopamine vs Ethics Preview"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Dopamine vs Ethics",
    description: "Experience Perfection with our premium event management services.",
    images: ["https://dopaminevsethics.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { SmoothScrollLayout } from "@/components/layout/SmoothScrollLayout";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen w-full overflow-x-hidden bg-beige-soft font-sans antialiased",
          outfitSans.variable,
          outfitHeading.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <SmoothScrollLayout>
            <LayoutWrapper>{children}</LayoutWrapper>
          </SmoothScrollLayout>
        </div>
      </body>
    </html>
  );
}
