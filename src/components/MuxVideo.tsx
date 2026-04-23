"use client";

import MuxPlayer from "@mux/mux-player-react";
import React from "react";

interface MuxVideoProps {
  playbackId: string;
  className?: string;
  metadata?: {
    video_id?: string;
    video_title?: string;
    viewer_user_id?: string;
  };
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  aspectRatio?: number;
  poster?: string;
}

export default function MuxVideo({
  playbackId,
  className = "",
  metadata,
  autoPlay = false,
  muted = false,
  loop = false,
  aspectRatio = 16 / 9,
  poster,
}: MuxVideoProps) {
  const [isStarted, setIsStarted] = React.useState(false);

  // If autoPlay is true, we might want to start immediately, 
  // but for bandwidth optimization, we prioritize the click.
  // However, if the user explicitly passed autoPlay, they might want it.
  // We'll stick to Click-to-Play as requested.

  return (
    <div 
      className={`relative w-full overflow-hidden rounded-sm shadow-xl border border-black/5 bg-black ${className}`}
      style={{ aspectRatio }}
    >
      {!isStarted ? (
        <div 
          className="absolute inset-0 cursor-pointer group bg-[#050505] z-20"
          onClick={() => setIsStarted(true)}
        >
          {/* Use custom poster if available, otherwise Mux thumbnail */}
          <img 
            src={poster || `https://image.mux.com/${playbackId}/thumbnail.jpg?time=0`} 
            alt="Video Thumbnail"
            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
          
          {/* Prominent Play Button - Forced Middle Centering */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-2xl group-hover:scale-110 group-hover:border-white/100 group-hover:bg-white/20 transition-all duration-500 ease-out shadow-[0_0_50px_rgba(0,0,0,0.5)] z-30">
            <div className="w-0 h-0 border-t-[14px] border-t-transparent border-l-[24px] border-l-white border-b-[14px] border-b-transparent ml-2 drop-shadow-2xl" />
          </div>
        </div>
      ) : (
        <MuxPlayer
          playbackId={playbackId}
          streamType="on-demand"
          preload="auto" // Load immediately once started
          autoPlay={true}
          muted={muted}
          loop={loop}
          metadata={metadata}
          primaryColor="#64172d"
          secondaryColor="#ffffff"
          className="w-full h-full object-cover"
          style={{
              height: "100%",
              width: "100%",
          }}
        />
      )}
    </div>
  );
}
