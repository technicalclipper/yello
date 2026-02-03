"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { Navbar } from "../../components/Navbar";
import { Card } from "../../components/Card";
import { PrimaryButton } from "../../components/PrimaryButton";

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

  const prompt = useMemo(() => PROMPTS[promptIndex], [promptIndex]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".summary-card",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const cyclePrompt = () => {
    setPromptIndex((i) => (i + 1) % PROMPTS.length);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100"
    >
      <Navbar />
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 pt-20 pb-16 sm:px-6">
        <div className="summary-card w-full">
          <Card className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 text-left sm:w-full sm:text-center">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400">
                  Session Complete
                </p>
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                  Thank you for showing up.
                </h1>
                <p className="mt-2 max-w-md text-sm text-zinc-400 sm:mx-auto">
                  This summary is for your memory, not your metrics. No scores,
                  no streaks — just a record of time you chose to spend with
                  another person.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setBookmark((v) => !v)}
                className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs transition-colors ${
                  bookmark
                    ? "border-amber-300/60 bg-amber-300/15 text-amber-100"
                    : "border-zinc-700 bg-black/40 text-zinc-400 hover:text-zinc-100"
                }`}
                aria-label="Bookmark this session for yourself"
              >
                ★
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-800 bg-black/40 px-4 py-3">
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-zinc-500">
                  Duration
                </p>
                <p className="mt-2 text-lg font-semibold text-zinc-50">
                  00:00
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-black/40 px-4 py-3">
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-zinc-500">
                  Amount Used
                </p>
                <p className="mt-2 text-lg font-semibold text-zinc-50">
                  0.00 ETH
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-black/40 px-4 py-3">
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-zinc-500">
                  Amount Returned
                </p>
                <p className="mt-2 text-lg font-semibold text-zinc-50">
                  0.00 ETH
                </p>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-zinc-800 bg-black/50 px-4 py-3 text-xs text-zinc-400">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-zinc-500">
                  Gentle Reflection
                </p>
                <button
                  type="button"
                  onClick={cyclePrompt}
                  className="rounded-full border border-zinc-700 px-2 py-0.5 text-[0.65rem] text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                >
                  New prompt
                </button>
              </div>
              <p className="text-sm text-zinc-300">{prompt}</p>
            </div>

            <div className="pt-1 text-center text-xs text-zinc-500">
              <p>
                Refunds are automatic. Respect, however, is manual — thank you
                for practicing it.
              </p>
            </div>

            <div className="flex justify-center pt-2">
              <PrimaryButton onClick={() => router.push("/landing")}>
                Return Home
              </PrimaryButton>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

