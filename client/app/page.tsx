"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function SplashPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        router.push("/landing");
      },
    });

    tl.fromTo(
      ".yello-logo",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.1 }
    );

    return () => {
      tl.kill();
    };
  }, [router]);

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100"
    >
      <div className="relative flex flex-col items-center gap-4">
        <div className="pointer-events-none absolute -inset-32 opacity-40 blur-3xl">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(250,224,167,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(24,24,27,0.9),_transparent_60%)]" />
        </div>
        <div className="relative yello-logo flex flex-col items-center">
          <span className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-amber-200/70">
            Web3 Video Conversations
          </span>
          <h1 className="text-5xl font-semibold tracking-tight text-amber-100 sm:text-6xl">
            Yello!
          </h1>
          <p className="mt-4 max-w-sm text-center text-sm text-zinc-400">
            A calmer way to meet real people. No feeds. No noise. Just presence.
          </p>
        </div>
      </div>
    </div>
  );
}
