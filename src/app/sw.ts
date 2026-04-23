import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist, CacheFirst, StaleWhileRevalidate } from "serwist";

declare global {
  interface ServiceWorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (string | PrecacheEntry)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    {
      // Cache-First for custom fonts
      matcher: ({ url }) => url.pathname.startsWith("/Fonts/"),
      handler: new CacheFirst({
        cacheName: "local-fonts",
      }),
    },
    {
      // Stale-While-Revalidate for project routes (HTML/JS)
      // This ensures we always check for updates while showing cached content
      matcher: ({ url }) => url.pathname.startsWith("/projects/") && !url.pathname.match(/\.(mp4|webm|jpg|jpeg|png|gif|svg|webp)$/),
      handler: new StaleWhileRevalidate({
        cacheName: "project-pages",
      }),
    },
    {
      // Cache-First purely for binary project media
      matcher: ({ url }) => url.pathname.startsWith("/projects/") && url.pathname.match(/\.(mp4|webm|jpg|jpeg|png|gif|svg|webp)$/),
      handler: new CacheFirst({
        cacheName: "project-media",
      }),
    },
    {
        // Stale-While-Revalidate for images generally
        matcher: ({ request }) => request.destination === "image",
        handler: new StaleWhileRevalidate({
          cacheName: "images",
        }),
    },
    {
        // Cache-First for video files to strictly save bandwidth
        matcher: ({ request }) => request.destination === "video",
        handler: new CacheFirst({
          cacheName: "videos",
        }),
    },
  ],
});

serwist.addEventListeners();
