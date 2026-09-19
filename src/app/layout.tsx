import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Newsreader, Averia_Serif_Libre, Rock_Salt } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import PageWrapper from "@/components/PageWrapper";
import { SpeedInsights } from "@vercel/speed-insights/next";

const satoshi = localFont({
  src: [
    {
      path: "../../Fonts/Satoshi-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../Fonts/Satoshi-VariableItalic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const helvetica = localFont({
  src: [
    {
      path: "../../Fonts/Helvetica.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../Fonts/Helvetica-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../Fonts/Helvetica-Oblique.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../Fonts/Helvetica-BoldOblique.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../Fonts/helvetica-light-587ebe5a59211.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const averia = Averia_Serif_Libre({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-averia",
  display: "swap",
});

const rockSalt = Rock_Salt({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rock-salt",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shresth Kushwaha - Product Designer & Builder",
  description: "Product Designer & Builder. I think in product first. AI just helps me ship it faster.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/icons/32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/logo-portfolio.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icons/180x180.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Shresth Kushwaha",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CZBV5135J8"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-CZBV5135J8');
          `}
        </Script>
      </head>
      <body
        className={`${satoshi.variable} ${helvetica.variable} ${dmSans.variable} ${newsreader.variable} ${averia.variable} ${rockSalt.variable} antialiased bg-black text-white font-satoshi`}
        suppressHydrationWarning={true}
      >
        <Preloader />
        <Analytics />
        <CustomCursor />
        <SmoothScroll>
          <PageWrapper>{children}</PageWrapper>
        </SmoothScroll>
        <SpeedInsights />
      </body>
    </html>
  );
}
