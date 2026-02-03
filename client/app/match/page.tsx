"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { Navbar } from "../../components/Navbar";
import { Loader } from "../../components/Loader";

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
      className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100"
    >
      <Navbar />
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 pt-20 pb-16 sm:px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          <Loader />
          <div className="match-copy space-y-4">
            <h1 className="text-lg font-semibold tracking-tight text-zinc-50 sm:text-xl">
              Looking for a real person…
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-zinc-400">
              Good conversations take a moment. We&apos;re pairing you with
              someone whose pace and presence feel like yours.
            </p>
            <div className="flex flex-col items-center gap-1 text-xs text-zinc-500">
              <p>
                Estimated wait:{" "}
                <span className="text-amber-100">
                  {Math.min(3, 1 + Math.floor(seconds / 2))}–
                  {Math.min(6, 3 + Math.floor(seconds / 2))} seconds
                </span>
              </p>
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-zinc-600">
                Keeping the line quiet while we find your match
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

