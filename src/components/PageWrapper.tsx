"use client";

import { usePathname } from "next/navigation";

/**
 * PageWrapper forces a full React subtree remount on every route change.
 *
 * WHY THIS IS NEEDED:
 * During Next.js client-side navigation, the React component tree is NOT
 * fully unmounted and remounted — it's diffed and partially updated.
 * This means components like CaseStudyHero with framer-motion's
 * `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` only animate
 * on the very first hard-load. After that, framer-motion thinks the
 * component is already "in" its animated state and doesn't re-run the
 * enter animation.
 *
 * By placing `key={pathname}` here, we tell React to treat each route
 * as a completely new component tree, ensuring:
 * 1. All framer-motion enter animations fire correctly.
 * 2. GSAP ScrollTriggers are registered against the correct DOM.
 * 3. There is no "stale" state carried over from the previous page.
 *
 * The Preloader and CustomCursor are intentionally kept OUTSIDE this
 * wrapper so they persist across navigations without re-mounting.
 */
export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname}>
      {children}
    </div>
  );
}
