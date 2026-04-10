"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import 'lenis/dist/lenis.css'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.08,
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Notify ScrollTrigger on every scroll
        lenis.on('scroll', () => {
            ScrollTrigger.update();
        });

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Reset scroll on route change
    useEffect(() => {
        if (lenisRef.current) {
            // Immediate scroll reset to ensure the new page starts from the top
            lenisRef.current.scrollTo(0, { immediate: true });
        }
        // Fallback for native scroll behaviors
        window.scrollTo(0, 0);
    }, [pathname]);

    return <>{children}</>;
}
