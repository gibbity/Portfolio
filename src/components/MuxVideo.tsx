"use client";

import MuxPlayer from "@mux/mux-player-react";
import React from "react";

interface MuxVideoProps {
  playbackId?: string;
  videoSrc?: string;
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
  videoSrc,
  className = "",
  metadata,
  autoPlay = false,
  muted = false,
  loop = false,
  aspectRatio = 16 / 9,
  poster,
}: MuxVideoProps) {
  const [isStarted, setIsStarted] = React.useState(false);

  return (
    <div 
      className={`relative w-full overflow-hidden rounded-xl shadow-xs border border-neutral-200/90 bg-black ${className}`}
      style={{ aspectRatio }}
    >
      {!isStarted ? (
        <div 
          className="absolute inset-0 cursor-pointer group bg-[#050505] z-20"
          onClick={() => setIsStarted(true)}
        >
          {/* Use custom poster if available, otherwise Mux thumbnail */}
          <img 
            src={poster || (playbackId ? `https://image.mux.com/${playbackId}/thumbnail.jpg?time=0` : "/projects/scribe/thumbnail.webp")} 
            alt="Video Thumbnail"
            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          
          {/* Prominent Play Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md group-hover:scale-110 group-hover:border-white/90 group-hover:bg-white/25 transition-all duration-300 ease-out shadow-2xl z-30">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1.5 drop-shadow-md" />
          </div>
        </div>
      ) : videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          controls
          muted={muted}
          loop={loop}
          playsInline
          className="w-full h-full object-contain bg-black"
        />
      ) : (
        <MuxPlayer
          playbackId={playbackId || ""}
          streamType="on-demand"
          preload="auto"
          autoPlay={true}
          muted={muted}
          loop={loop}
          metadata={metadata}
          primaryColor="#000000"
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

