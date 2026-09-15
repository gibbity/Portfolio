"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type TabType = "bio" | "books" | "chess" | "football";

interface BookItem {
  id: string;
  title: string;
  author: string;
  image: string;
}

const BOOKS: BookItem[] = [
  { id: "1", title: "War and Peace", author: "Leo Tolstoy", image: "/assets/about/book_war_and_peace.webp" },
  { id: "2", title: "Homo Deus", author: "Yuval Noah Harari", image: "/assets/about/book_homo_deus.webp" },
  { id: "3", title: "Castaways of the Flying Dutchman", author: "Brian Jacques", image: "/assets/about/book_flying_dutchman.webp" },
  { id: "4", title: "Alexander of Macedon", author: "Peter Green", image: "/assets/about/book_alexander.webp" },
  { id: "5", title: "Dune", author: "Frank Herbert", image: "/assets/about/book_dune.webp" },
  { id: "6", title: "Beyond Good and Evil", author: "Friedrich Nietzsche", image: "/assets/about/book_beyond_good_evil.webp" },
  { id: "7", title: "Eleceed", author: "Son Jae-Ho & ZHENA", image: "/assets/about/book_eleceed.webp" },
  { id: "8", title: "Blue Period", author: "Tsubasa Yamaguchi", image: "/assets/about/book_blue_period.webp" },
  { id: "9", title: "The Greatest Estate Developer", author: "Kim Hyun-soo", image: "/assets/about/book_greatest_estate.webp" },
];

interface PlayerItem {
  name: string;
  role: string;
  image: string;
  left: string;
  top: string;
}

const PLAYERS: PlayerItem[] = [
  // Forward line (Top)
  { name: "Khvicha Kvaratskhelia", role: "LW", image: "/assets/about/card_left_wing.webp", left: "18.5%", top: "27.5%" },
  { name: "Erling Haaland", role: "ST", image: "/assets/about/card_striker.webp", left: "50.0%", top: "22.5%" },
  { name: "Michael Olise", role: "RW", image: "/assets/about/card_right_wing.webp", left: "81.5%", top: "27.5%" },
  
  // Midfield
  { name: "Pedri", role: "LCM", image: "/assets/about/card_cm_left.webp", left: "34.5%", top: "42.0%" },
  { name: "Jude Bellingham", role: "RCM", image: "/assets/about/card_cm_right.webp", left: "65.5%", top: "42.0%" },
  { name: "Rodri", role: "CDM", image: "/assets/about/card_cdm.webp", left: "50.0%", top: "54.0%" },
  
  // Defense
  { name: "Joško Gvardiol", role: "LB", image: "/assets/about/card_lb.webp", left: "18.0%", top: "60.0%" },
  { name: "Jurriën Timber", role: "RB", image: "/assets/about/card_rb.webp", left: "82.0%", top: "60.0%" },
  { name: "Pau Cubarsí", role: "LCB", image: "/assets/about/card_cb_left.webp", left: "34.5%", top: "76.0%" },
  { name: "Marc Guéhi", role: "RCB", image: "/assets/about/card_cb_right.webp", left: "65.5%", top: "76.0%" },
  
  // Goalkeeper (Bottom)
  { name: "Thibaut Courtois", role: "GK", image: "/assets/about/card_gk.webp", left: "50.0%", top: "91.0%" },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<TabType>("bio");
  const [hoveredBookIndex, setHoveredBookIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  // GSAP: Continuous natural floating animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".nav-icon-smili", {
        y: "+=5",
        rotation: "+=1.5",
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".nav-icon-book", {
        y: "-=6",
        rotation: "-=2",
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.3,
      });

      gsap.to(".nav-icon-chess", {
        y: "+=6",
        rotation: "+=2",
        duration: 3.0,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.6,
      });

      gsap.to(".nav-icon-football", {
        y: "-=5",
        rotation: "-=2",
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.2,
      });

      // Float social icons around portrait
      gsap.to(".social-float-1", { y: "-=5", duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".social-float-2", { y: "+=5", duration: 2.9, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 });
      gsap.to(".social-float-3", { y: "-=6", duration: 2.7, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 });
      gsap.to(".social-float-4", { y: "+=5", duration: 3.1, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });

      // Scroll entrance
      gsap.from(".about-scroll-in", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 25,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // GSAP: Animate content on tab switch
  useEffect(() => {
    if (!contentContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentContainerRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );

      if (activeTab === "bio") {
        gsap.from(".bio-line", {
          opacity: 0,
          y: 10,
          duration: 0.45,
          stagger: 0.06,
          ease: "power2.out",
        });
      } else if (activeTab === "books") {
        gsap.from(".book-card", {
          opacity: 0,
          y: 18,
          scale: 0.94,
          duration: 0.45,
          stagger: 0.03,
          ease: "power2.out",
        });
      } else if (activeTab === "football") {
        gsap.from(".pitch-card", {
          opacity: 0,
          scale: 0.96,
          duration: 0.45,
          ease: "power2.out",
        });
      } else if (activeTab === "chess") {
        gsap.from(".chess-badge", {
          opacity: 0,
          y: 12,
          duration: 0.45,
          ease: "power2.out",
        });
        gsap.from(".chess-favorite", {
          opacity: 0,
          scale: 0.94,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.08,
        });
      }
    }, contentContainerRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen pt-10 md:pt-14 pb-0 px-4 sm:px-6 md:px-12 bg-white text-black overflow-hidden select-none flex flex-col justify-between items-center"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center flex-1 justify-between">
        {/* Top 4 Interactive Liquid Metal Nav Icons */}
        <div className="about-scroll-in w-full max-w-2xl flex items-center justify-between px-4 sm:px-8 md:px-12 mb-6 md:mb-8 shrink-0">
          {/* 1. Smiley (Bio) */}
          <button
            type="button"
            onClick={() => setActiveTab("bio")}
            className={`group relative p-2 transition-all duration-300 transform hover:scale-120 active:scale-95 cursor-pointer ${
              activeTab === "bio" ? "opacity-100 scale-105" : "opacity-35 hover:opacity-75"
            }`}
            title="About / Bio"
          >
            <div className="nav-icon-smili w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 relative rotate-[15deg]">
              <img
                src="/assets/about/smili_icon_3d.webp"
                alt="Bio"
                className="w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
              />
            </div>
          </button>

          {/* 2. Book (Reading Stash) */}
          <button
            type="button"
            onClick={() => setActiveTab("books")}
            className={`group relative p-2 -mt-4 transition-all duration-300 transform hover:scale-120 active:scale-95 cursor-pointer ${
              activeTab === "books" ? "opacity-100 scale-105" : "opacity-35 hover:opacity-75"
            }`}
            title="Books / Reading Stash"
          >
            <div className="nav-icon-book w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 relative rotate-[-23deg]">
              <img
                src="/assets/about/book_icon_3d.webp"
                alt="Books"
                className="w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
              />
            </div>
          </button>

          {/* 3. Chess Knight (Chess) */}
          <button
            type="button"
            onClick={() => setActiveTab("chess")}
            className={`group relative p-2 -mt-3 transition-all duration-300 transform hover:scale-120 active:scale-95 cursor-pointer ${
              activeTab === "chess" ? "opacity-100 scale-105" : "opacity-35 hover:opacity-75"
            }`}
            title="Chess"
          >
            <div className="nav-icon-chess w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 relative rotate-[24deg]">
              <img
                src="/assets/about/chess_icon_3d.webp"
                alt="Chess"
                className="w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
              />
            </div>
          </button>

          {/* 4. Soccer Ball (Football) */}
          <button
            type="button"
            onClick={() => setActiveTab("football")}
            className={`group relative p-2 transition-all duration-300 transform hover:scale-120 active:scale-95 cursor-pointer ${
              activeTab === "football" ? "opacity-100 scale-105" : "opacity-35 hover:opacity-75"
            }`}
            title="Football"
          >
            <div className="nav-icon-football w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 relative rotate-[-33deg]">
              <img
                src="/assets/about/football_icon_3d.webp"
                alt="Football"
                className="w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
              />
            </div>
          </button>
        </div>

        {/* Dynamic Content Container */}
        <div ref={contentContainerRef} className="w-full flex-1 flex flex-col justify-center items-center">
          {/* VIEW 1: BIO */}
          {activeTab === "bio" && (
            <div className="relative max-w-3xl mx-auto px-2 sm:px-6">
              {/* Floating Contextual Icons */}
              <div
                onClick={() => setActiveTab("chess")}
                className="hidden lg:block absolute -right-24 top-[28%] w-18 h-18 cursor-pointer transform hover:scale-125 transition-transform duration-300 filter drop-shadow-lg rotate-[30deg]"
                title="Click to view Chess"
              >
                <img src="/assets/about/chess_icon_3d.webp" alt="Chess" className="w-full h-full object-contain" />
              </div>

              <div
                onClick={() => setActiveTab("football")}
                className="hidden lg:block absolute -left-24 top-[58%] w-16 h-16 cursor-pointer transform hover:scale-125 transition-transform duration-300 filter drop-shadow-lg rotate-[-33deg]"
                title="Click to view Football"
              >
                <img src="/assets/about/football_icon_3d.webp" alt="Football" className="w-full h-full object-contain" />
              </div>

              <div
                onClick={() => setActiveTab("books")}
                className="hidden lg:block absolute -right-24 top-[72%] w-18 h-18 cursor-pointer transform hover:scale-125 transition-transform duration-300 filter drop-shadow-lg rotate-[-23deg]"
                title="Click to view Reading Stash"
              >
                <img src="/assets/about/book_icon_3d.webp" alt="Books" className="w-full h-full object-contain" />
              </div>

              {/* Editorial Bio Text in #0663FF */}
              <div className="font-[family-name:var(--font-averia)] text-[#0663FF] text-[18px] sm:text-[22px] md:text-[26px] leading-[1.42] tracking-normal space-y-6 text-left">
                <p className="bio-line font-normal text-[22px] sm:text-[26px] md:text-[32px]">
                  Hi ⁕ I&apos;m Shresth
                </p>

                <p className="bio-line">
                  I am a product designer navigating the space between design, AI assisted workflows, and product management.
                </p>

                <p className="bio-line">
                  I started out studying physical industrial design but eventually gravitated toward digital products. Along the way, I fell in love with the strategic side of building things. I really enjoy figuring out how systems and strategy come together to create tools that feel quiet, structural, and genuinely useful.
                </p>

                <p className="bio-line">
                  Building products from the ground up has taught me how to juggle different roles. I like using AI to prototype quickly and turning messy complex problems into clear product roadmaps.
                </p>

                <p className="bio-line">
                  When I am not working, I am usually watching chess streams or cheering for Manchester City in the Premier League and UCL. I am also a huge foodie always hunting down the next great meal.
                </p>

                <p className="bio-line">
                  I love to read and my taste is completely all over the place. My reading list is a chaotic mix of everything from War and Peace, Homo Deus, and Thus Spoke Zarathustra to Harry Potter, Famous Five, and manhwas like Eleceed.
                </p>

                <p className="bio-line">
                  Currently based in Vellore and looking for a forward thinking team to build great products with.
                </p>
              </div>
            </div>
          )}

          {/* VIEW 2: BOOKS / READING STASH (Interactive Fanned Stack with Lift Hover Effect) */}
          {activeTab === "books" && (
            <div className="w-full max-w-5xl flex flex-col items-center my-auto px-2">
              <h3 className="font-[family-name:var(--font-averia)] text-[#0663FF] text-[24px] sm:text-[30px] md:text-[34px] text-center mb-2 md:mb-4 font-normal">
                My Current Favorite Stash
              </h3>
              <p className="font-sans text-[12px] md:text-[13px] text-black/40 text-center mb-8 md:mb-12">
                Hover over the stack to lift &amp; explore books
              </p>

              {/* Interactive Fanned Book Deck */}
              <div
                className="relative w-full max-w-4xl h-[240px] sm:h-[280px] md:h-[300px] flex items-center justify-center pt-8 pb-4"
                onMouseLeave={() => setHoveredBookIndex(null)}
              >
                {BOOKS.map((book, i) => {
                  const centerIdx = 4;
                  const diff = i - centerIdx;
                  const isHovered = hoveredBookIndex === i;
                  const isAnyHovered = hoveredBookIndex !== null;

                  // Base position calculations
                  let offsetX = diff * 58; // px
                  let offsetY = Math.abs(diff) * 4; // subtle arch
                  let rotateDeg = diff * 3.8;
                  let scale = 1.0;
                  let zIndex = 20 + i;
                  let opacity = 1.0;

                  if (isHovered) {
                    offsetY -= 54;
                    rotateDeg = 0;
                    scale = 1.18;
                    zIndex = 60;
                  } else if (isAnyHovered && hoveredBookIndex !== null) {
                    if (i < hoveredBookIndex) {
                      offsetX -= 28;
                      rotateDeg -= 2;
                      scale = 0.94;
                      opacity = 0.85;
                    } else if (i > hoveredBookIndex) {
                      offsetX += 28;
                      rotateDeg += 2;
                      scale = 0.94;
                      opacity = 0.85;
                    }
                  }

                  return (
                    <div
                      key={book.id}
                      onMouseEnter={() => setHoveredBookIndex(i)}
                      onClick={() => setHoveredBookIndex(i)}
                      style={{
                        transform: `translateX(${offsetX}px) translateY(${offsetY}px) rotate(${rotateDeg}deg) scale(${scale})`,
                        zIndex,
                        opacity,
                      }}
                      className="absolute transition-all duration-300 ease-out cursor-pointer group origin-bottom"
                    >
                      <div
                        className={`w-[110px] sm:w-[135px] md:w-[155px] aspect-[2/3] rounded-xl overflow-hidden bg-neutral-900 border border-black/10 transition-shadow duration-300 ${
                          isHovered
                            ? "shadow-[0_28px_50px_rgba(0,0,0,0.38)] ring-2 ring-blue-500/50"
                            : "shadow-[0_10px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_20px_36px_rgba(0,0,0,0.28)]"
                        }`}
                      >
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-cover pointer-events-none select-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/10 pointer-events-none" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Active Book Spotlight Metadata Card */}
              <div className="mt-6 md:mt-8 flex flex-col items-center text-center transition-all duration-300 min-h-[56px]">
                {(() => {
                  const activeBook =
                    hoveredBookIndex !== null
                      ? BOOKS[hoveredBookIndex]
                      : BOOKS[4]; // Default to center book
                  const activeIdx = hoveredBookIndex !== null ? hoveredBookIndex : 4;

                  return (
                    <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#0663FF]/10 text-[#0663FF]">
                          {String(activeIdx + 1).padStart(2, "0")} / 09
                        </span>
                        <h4 className="font-[family-name:var(--font-averia)] text-[#0663FF] text-[20px] sm:text-[24px] font-normal leading-none">
                          {activeBook.title}
                        </h4>
                      </div>
                      <p className="font-sans text-[13px] text-black/55 font-medium">
                        by {activeBook.author}
                      </p>
                    </div>
                  );
                })()}

                {/* Micro selector dots */}
                <div className="flex items-center gap-1.5 mt-3">
                  {BOOKS.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setHoveredBookIndex(dotIdx)}
                      className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                        (hoveredBookIndex !== null ? hoveredBookIndex : 4) === dotIdx
                          ? "w-5 bg-[#0663FF]"
                          : "w-1.5 bg-black/15 hover:bg-black/35"
                      }`}
                      title={`View Book ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: FOOTBALL / BEST 11 (Fits in Single Desktop Screen) */}
          {activeTab === "football" && (
            <div className="w-full flex flex-col items-center my-auto">
              <h3 className="font-[family-name:var(--font-averia)] text-[#0663FF] text-[22px] sm:text-[28px] md:text-[32px] text-center mb-3 md:mb-5 font-normal">
                My Current best playing 11 (opinion)
              </h3>

              {/* Pitch Container scaled to fit viewport perfectly on desktop */}
              <div className="pitch-card relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] aspect-[4845/7272] max-h-[62vh] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-3 border-[#22c55e]/40 bg-[#22a348]">
                {/* Pitch Image Background */}
                <img
                  src="/assets/about/football_pitch.webp"
                  alt="Football Pitch"
                  className="w-full h-full object-cover pointer-events-none absolute inset-0"
                />

                {/* Player Cards Positioned in Exact Tactical Coordinates */}
                {PLAYERS.map((player) => (
                  <div
                    key={player.name}
                    style={{
                      left: player.left,
                      top: player.top,
                      width: "18.5%",
                      height: "11.5%",
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 hover:z-50 cursor-pointer group"
                  >
                    <div className="w-full h-full relative transition-transform duration-200 group-hover:scale-130">
                      <img
                        src={player.image}
                        alt={player.name}
                        className="w-full h-full object-contain filter drop-shadow-[0_5px_12px_rgba(0,0,0,0.3)] pointer-events-none"
                      />
                      {/* Tooltip on Hover */}
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[9px] font-sans font-semibold py-0.5 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-50 shadow-md">
                        {player.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 4: CHESS (Fits in Single Desktop Screen - Side by Side Grid on Desktop) */}
          {activeTab === "chess" && (
            <div className="w-full max-w-5xl flex flex-col items-center my-auto">
              <div className="text-center mb-4 md:mb-6">
                <h3 className="font-[family-name:var(--font-averia)] text-[#0663FF] text-[22px] sm:text-[28px] md:text-[32px] font-normal">
                  An extremely average chess player
                </h3>
                <p className="font-[family-name:var(--font-averia)] text-[#0663FF] text-[15px] sm:text-[18px] italic mt-0.5">
                  (We don&apos;t talk about it)
                </p>
              </div>

              {/* Side-by-side on Desktop: Ratings Card (Left) & Framed Favorites (Right) */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 items-center max-w-4xl px-2 sm:px-4">
                {/* Left: Ratings Card */}
                <div className="chess-badge w-full rounded-2xl overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.08)] border border-neutral-200 bg-white">
                  <img
                    src="/assets/about/chess_ratings_card.webp"
                    alt="Chess Ratings"
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Right: Framed Favorites Section */}
                <div className="chess-favorite relative w-full rounded-3xl border-2 border-black p-4 sm:p-6 pt-7 sm:pt-8 bg-white shadow-sm">
                  {/* Header Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-4">
                    <span className="font-serif text-[18px] sm:text-[22px] font-bold text-black tracking-tight">
                      Favorites
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    {/* Mikhail Tal */}
                    <div className="flex flex-col items-center">
                      <div className="w-full aspect-[4/5] max-h-[170px] relative rounded-xl overflow-hidden bg-neutral-100 shadow-md">
                        <img
                          src="/assets/about/chess_tal.webp"
                          alt="Mikhail Tal"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-[family-name:var(--font-rock-salt)] text-black text-[13px] sm:text-[16px] mt-2 tracking-wider text-center">
                        Mikhail Tal
                      </span>
                    </div>

                    {/* Hikaru Nakamura */}
                    <div className="flex flex-col items-center">
                      <div className="w-full aspect-[4/5] max-h-[170px] relative rounded-xl overflow-hidden bg-neutral-100 shadow-md">
                        <img
                          src="/assets/about/chess_hikaru.webp"
                          alt="Hikaru Nakamura"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-[family-name:var(--font-rock-salt)] text-black text-[12px] sm:text-[15px] mt-2 tracking-wider text-center">
                        Hikaru Nakamura
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
