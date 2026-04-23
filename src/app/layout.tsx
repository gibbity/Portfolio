import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
// Build trigger: 2026-04-23T16:22:00

const helvetica = localFont({
  src: [
    {
      path: "../../Fonts/Helvetica.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../Fonts/Helvetica-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../Fonts/Helvetica-Oblique.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../Fonts/Helvetica-BoldOblique.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../Fonts/helvetica-light-587ebe5a59211.ttf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shresth Kushwaha - Product Designer",
  description: "Research. Ux. Ui. Prototyping.",
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

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import PageWrapper from "@/components/PageWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${helvetica.variable} ${dmSans.variable} antialiased bg-white text-gray-900 font-helvetica`}
        suppressHydrationWarning={true}
      >
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          <PageWrapper>{children}</PageWrapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
