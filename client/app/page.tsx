"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import BlobCursor from "@/components/BlobCursor";

export default function SplashPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    gsap.fromTo(
      videoRef.current,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
    );

    const timeout = setTimeout(() => {
      router.push("/landing");
    }, 4000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <>
      {/* VIDEO LAYER */}
      <div className="fixed inset-0 bg-black z-0">
        <video
          ref={videoRef}
          src="/yello_logo_video.mp4"
          autoPlay
          muted
          playsInline
          className="h-full w-full object-contain"
        />
      </div>

      {/* CURSOR LAYER (TOP MOST) */}
      <div className="fixed inset-0 z-[9999] pointer-events-none">
        <BlobCursor
          blobType="circle"
          fillColor="#f3db42"
          trailCount={3}
          sizes={[40,80,55]}
          innerSizes={[12,20,15]}
          innerColor="#f0dd5f"
          opacities={[0.6, 0.6, 0.6]}
          shadowColor="rgba(0,0,0,0.6)"
          shadowBlur={20}
          shadowOffsetX={0}
          shadowOffsetY={10}
          filterStdDeviation={30}
          useFilter={true}
          fastDuration={0.1}
          slowDuration={0.5}
        />
      </div>
    </>
  );
}
