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
}

export default function MuxVideo({
  playbackId,
  className = "",
  metadata,
  autoPlay = false,
  muted = false,
  loop = false,
  aspectRatio = 16 / 9,
}: MuxVideoProps) {
  return (
    <div 
      className={`relative w-full overflow-hidden rounded-sm shadow-xl border border-black/5 bg-black ${className}`}
      style={{ aspectRatio }}
    >
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        autoPlay={autoPlay}
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
    </div>
  );
}
