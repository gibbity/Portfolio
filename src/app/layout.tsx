import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Shresth Kushwaha - AI Product Designer",
  description: "AI Product Designer focused on stripping noise and shipping features and usable products.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Portfolio",
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
      <body
        className={`${satoshi.variable} ${helvetica.variable} ${dmSans.variable} antialiased bg-black text-white font-satoshi`}
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
