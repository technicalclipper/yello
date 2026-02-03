"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { Navbar } from "../../components/Navbar";
import { Loader } from "../../components/Loader";
import TrueFocus from "@/components/TrueFocus";
import {GridScan} from "@/components/GridScan";

export default function MatchPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".match-copy",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
      );

      const timeout = setTimeout(() => {
        router.push("/call");
      }, 2800);

      return () => clearTimeout(timeout);
    }, containerRef);

    return () => ctx.revert();
  }, [router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
  <div
    ref={containerRef}
    className="relative min-h-screen overflow-hidden bg-black text-zinc-100"
  >
    {/* 🔮 Animated background */}
    <div className="pointer-events-none absolute inset-0 z-0">
      <GridScan
        sensitivity={0.55}
        lineThickness={1}
        linesColor="#fdda28"
        gridScale={0.1}
        scanColor="#f3db42"
        scanOpacity={0.4}
        enablePost
        bloomIntensity={0.6}
        chromaticAberration={0.002}
        noiseIntensity={0.01}
      />
    </div>

    {/* Foreground content */}
    <div className="relative z-10">
      <Navbar />

      <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 pt-20 pb-16 sm:px-6">
        <div className="flex flex-col items-center gap-8 text-center">
       {/*}  <Loader />*/}

          <div className="match-copy space-y-4">
            {/* ✨ TrueFocus text */}
            <TrueFocus
              sentence="Finding match"
              manualMode={false}
              blurAmount={2.5}
              borderColor="#fdda28"
              animationDuration={0.5}
              pauseBetweenAnimations={0.5}
            />

            <p className="max-w-md text-sm leading-relaxed text-zinc-400">
              Good conversations take a moment.
            </p>

            
          </div>
        </div>
      </main>
    </div>
  </div>
);

}

