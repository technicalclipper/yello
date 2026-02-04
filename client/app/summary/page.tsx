"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { Navbar } from "../../components/Navbar";
import { Card } from "../../components/Card";
import { PrimaryButton } from "../../components/PrimaryButton";
import CountUp from "@/components/CountUp";
import SplitText from "@/components/SplitText";
import TargetCursor from "@/components/TargetCursor";

const PROMPTS = [
  "What surprised you about this conversation?",
  "Where did you notice yourself soften or slow down?",
  "What would feel respectful to remember from this session?",
];

export default function SummaryPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [bookmark, setBookmark] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [showCounters, setShowCounters] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState(true); // Set to true if badge was earned

  // demo values
  const durationSeconds = 312;
  const usedETH = 0.0012;
  const returnedETH = 0.0005;

  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;

  const prompt = useMemo(() => PROMPTS[promptIndex], [promptIndex]);

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".summary-card",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
      );
    }, containerRef);

    const t = setTimeout(() => setShowCounters(true), 400);

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100"
    >
      <TargetCursor
      spinDuration={3}
      hoverDuration={0.15}
      parallaxOn
      hideDefaultCursor
    />
      <Navbar />

      <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 pt-20 pb-16">
        <div className="summary-card w-full">
          <Card className="space-y-8">

            {/* HEADER */}
            <div className="space-y-4">
              <div className="space-y-2 text-center w-full">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                  Session Complete
                </p>
                <h1 className="text-2xl font-light text-zinc-300">
                  Thank you for showing up.
                </h1>
              </div>

              {earnedBadge && (
                <SplitText
                  text={"🎉 Yay! You have earned a badge!"}
                  className="text-4xl font-black text-amber-300 mx-auto w-full text-center tracking-wide drop-shadow-[0_0_20px_rgba(251,191,36,0.4)] leading-relaxed"
                  delay={30}
                  duration={0.45}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 28 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                  onLetterAnimationComplete={handleAnimationComplete}
                  showCallback
                />
              )}
            </div>

            {/* COUNTERS */}
            <div className="grid gap-6 sm:grid-cols-3 text-center">

              {/* Duration */}
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                  Duration
                </p>
                <div className="text-4xl font-black text-white tabular-nums">
                  {showCounters ? (
                    <>
                      <CountUp from={0} to={minutes} duration={1} />:
                      {String(seconds).padStart(2, "0")}
                    </>
                  ) : (
                    "00:00"
                  )}
                </div>
              </div>

              {/* Amount Used */}
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                  Used
                </p>
                <div className="flex justify-center items-baseline gap-1">
                  <span className="text-4xl font-black text-white tabular-nums">
                    {showCounters ? (
                      <CountUp from={0} to={usedETH} duration={1} />
                    ) : (
                      "0.0000"
                    )}
                  </span>
                  <span className="text-[10px] font-black tracking-[0.4em] text-zinc-600">
                    ETH
                  </span>
                </div>
              </div>

              {/* Amount Returned */}
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                  Returned
                </p>
                <div className="flex justify-center items-baseline gap-1">
                  <span className="text-4xl font-black text-white tabular-nums">
                    {showCounters ? (
                      <CountUp from={0} to={returnedETH} duration={1} />
                    ) : (
                      "0.0000"
                    )}
                  </span>
                  <span className="text-[10px] font-black tracking-[0.4em] text-zinc-600">
                    ETH
                  </span>
                </div>
              </div>

            </div>

            <div className="flex justify-center pt-2">
              <PrimaryButton onClick={() => router.push("/landing")} className="cursor-target">
                Return Home
              </PrimaryButton>
            </div>

          </Card>
        </div>
      </main>
    </div>
  );
}
