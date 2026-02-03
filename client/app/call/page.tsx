"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { Navbar } from "../../components/Navbar";
import { PrimaryButton } from "../../components/PrimaryButton";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function CallPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [seconds, setSeconds] = useState(0);
  const [balance, setBalance] = useState(0.05);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".call-shell",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
      setBalance((b) => Math.max(0, +(b - 0.0001).toFixed(4)));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const endSession = () => {
    router.push("/summary");
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100"
    >
      <Navbar />
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pt-24 pb-10 sm:px-6 lg:px-8">
        <section className="call-shell flex flex-1 flex-col gap-6 rounded-3xl border border-zinc-900/80 bg-black/40 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="uppercase tracking-[0.22em] text-emerald-200/80">
                Live
              </span>
              <span className="ml-2 text-zinc-500">{formatTime(seconds)}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-black/50 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-zinc-300">
                Session Balance
              </p>
              <p className="text-xs font-medium text-amber-100">
                {balance.toFixed(4)} ETH
              </p>
            </div>
          </div>

          <div className="relative mt-2 flex-1 rounded-3xl border border-zinc-900/90 bg-gradient-to-b from-zinc-900 via-black to-black p-3 sm:p-4">
            <div className="flex h-full items-center justify-center rounded-2xl border border-zinc-800/80 bg-zinc-900/80">
              <div className="flex flex-col items-center gap-3 text-center text-sm text-zinc-500">
                <span className="text-[0.7rem] uppercase tracking-[0.24em] text-zinc-600">
                  Remote Video
                </span>
                <p className="max-w-xs text-xs text-zinc-500">
                  When the match begins, this space becomes their presence — not
                  their profile.
                </p>
                <div className="mt-2 flex gap-2 text-[0.65rem] text-zinc-500">
                  <span className="rounded-full border border-zinc-700 px-2 py-0.5">
                    Low-noise channel
                  </span>
                  <span className="rounded-full border border-zinc-700 px-2 py-0.5">
                    No feeds, no likes
                  </span>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-4 right-4 h-28 w-40 rounded-2xl border border-zinc-800/80 bg-zinc-950/90 shadow-[0_16px_45px_rgba(0,0,0,0.85)] sm:h-32 sm:w-48">
              <div className="flex h-full items-center justify-center">
                <p className="text-[0.65rem] uppercase tracking-[0.24em] text-zinc-600">
                  You
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-between gap-4 border-t border-zinc-900/80 pt-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMicOn((v) => !v)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                  micOn
                    ? "border-zinc-800 bg-zinc-900/70 text-zinc-200 hover:bg-zinc-800"
                    : "border-rose-500/60 bg-rose-500/20 text-rose-100 hover:bg-rose-500/30"
                }`}
              >
                <span className="sr-only">Toggle microphone</span>
                <span className="h-4 w-4 border-b-2 border-zinc-200" />
              </button>
              <button
                type="button"
                onClick={() => setCameraOn((v) => !v)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                  cameraOn
                    ? "border-zinc-800 bg-zinc-900/70 text-zinc-200 hover:bg-zinc-800"
                    : "border-amber-500/60 bg-amber-500/15 text-amber-100 hover:bg-amber-500/25"
                }`}
              >
                <span className="sr-only">Toggle camera</span>
                <span className="h-4 w-4 border-2 border-zinc-200" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-[0.7rem] text-zinc-500">
                {micOn ? "Mic on" : "Mic muted"} ·{" "}
                {cameraOn ? "Camera on" : "Camera off"}
              </p>
              <PrimaryButton
                onClick={endSession}
                className="bg-rose-500/20 text-rose-100 hover:bg-rose-500/30 hover:shadow-[0_0_30px_rgba(244,63,94,0.45)]"
              >
                End Session
              </PrimaryButton>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

