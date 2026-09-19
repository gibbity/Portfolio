"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="absolute top-0 left-0 w-full z-[100] bg-transparent py-7 px-6 md:px-12 lg:px-16 flex justify-between items-center select-none">
      <Link href="/" className="hidden md:block font-sans font-medium text-[14px] md:text-[17px] text-black tracking-tight hover:opacity-75 transition-opacity">
        Shresth Kushwaha
      </Link>
      
      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-6">
        <Link 
          href="/#work" 
          onClick={(e) => handleScroll(e, "work")}
          className="font-sans font-medium text-[13px] md:text-[14px] text-black/60 hover:text-black transition-colors"
        >
          Work
        </Link>
        <Link 
          href="/archives" 
          prefetch={false}
          className="font-sans font-medium text-[13px] md:text-[14px] text-black/60 hover:text-black transition-colors"
        >
          Archives
        </Link>
        <Link 
          href="/#about" 
          onClick={(e) => handleScroll(e, "about")}
          className="font-sans font-medium text-[13px] md:text-[14px] text-black/60 hover:text-black transition-colors"
        >
          About
        </Link>
        <a 
          href="https://drive.google.com/file/d/1vUPBpcYmhJ28-XG2RYTkuuyX84X2aCIc/view?usp=drive_link" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-sans font-medium text-[13px] md:text-[14px] text-black/60 hover:text-black transition-colors"
        >
          Resume
        </a>
      </nav>

      {/* Mobile Navigation Links (Figma Layout) */}
      <nav className="md:hidden flex items-center gap-4 ml-auto">
        <Link 
          href="/#work" 
          onClick={(e) => handleScroll(e, "work")}
          className="font-sans font-medium text-[12px] text-black/70 hover:text-black transition-colors"
        >
          Work
        </Link>
        <Link 
          href="/archives" 
          prefetch={false}
          className="font-sans font-medium text-[12px] text-black/70 hover:text-black transition-colors"
        >
          Archives
        </Link>
        <a 
          href="https://drive.google.com/file/d/1vUPBpcYmhJ28-XG2RYTkuuyX84X2aCIc/view?usp=drive_link" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-sans font-medium text-[12px] text-black/70 hover:text-black transition-colors"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
