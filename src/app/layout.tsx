import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import { Toaster } from "sonner";
import { getSiteUrl } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = getSiteUrl();
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "YOUR_NAME | Portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description:
    "YOUR_NAME — Software Engineer building premium, high-performance web experiences. Explore projects, experience, and skills.",
  keywords: [
    "YOUR_NAME",
    "Software Engineer",
    "Full Stack Developer",
    "Portfolio",
    "Next.js Developer",
  ],
  authors: [{ name: "YOUR_NAME", url: siteUrl }],
  creator: "YOUR_NAME",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteName,
    description: "YOUR_NAME — Software Engineer building premium, high-performance web experiences.",
    siteName,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: "YOUR_NAME — Software Engineer building premium, high-performance web experiences.",
    images: ["/images/og-image.jpg"],
    creator: "@YOUR_TWITTER_HANDLE",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-body bg-background text-white antialiased overflow-x-hidden`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "YOUR_NAME",
              url: siteUrl,
              jobTitle: "Software Engineer",
              sameAs: [
                "https://github.com/YOUR_USERNAME",
                "https://linkedin.com/in/YOUR_USERNAME",
              ],
            }),
          }}
        />
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
        <Toaster theme="dark" position="bottom-right" richColors />
      </body>
    </html>
  );
}