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
    <header className="absolute top-0 left-0 w-full z-[100] bg-transparent py-6 px-6 md:px-12 lg:px-16 flex justify-between items-center select-none">
      <Link href="/" className="font-sans font-medium text-[15px] md:text-[17px] text-black tracking-tight hover:opacity-75 transition-opacity">
        Shresth Kushwaha
      </Link>
      
      <nav className="flex items-center gap-6 md:gap-10">
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
    </header>
  );
}
