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
      <nav className="hidden md:flex items-center gap-10">
        <Link 
          href="/#work" 
          onClick={(e) => handleScroll(e, "work")}
          className="font-sans font-bold text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-black/60 hover:text-black transition-colors pl-[0.25em]"
        >
          Work
        </Link>
        <Link 
          href="/#about" 
          onClick={(e) => handleScroll(e, "about")}
          className="font-sans font-bold text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-black/60 hover:text-black transition-colors pl-[0.25em]"
        >
          About
        </Link>
        <Link 
          href="/#contact" 
          onClick={(e) => handleScroll(e, "contact")}
          className="font-sans font-bold text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-black/60 hover:text-black transition-colors pl-[0.25em]"
        >
          Contact
        </Link>
      </nav>

      {/* Mobile Navigation Links (Figma Layout) */}
      <nav className="md:hidden flex items-center gap-5 ml-auto">
        <Link 
          href="/#work" 
          onClick={(e) => handleScroll(e, "work")}
          className="font-sans font-normal text-[11px] text-black hover:opacity-75 transition-opacity"
        >
          Work
        </Link>
        <Link 
          href="/#contact" 
          onClick={(e) => handleScroll(e, "contact")}
          className="font-sans font-normal text-[11px] text-black hover:opacity-75 transition-opacity"
        >
          Contact me
        </Link>
      </nav>
    </header>
  );
}
