"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Navbar } from "../../components/Navbar";
import { Card } from "../../components/Card";
import { PrimaryButton } from "../../components/PrimaryButton";
import { BadgeChip } from "../../components/BadgeChip";
import { StakeModal } from "../../components/StakeModal";

type Mode = "calm" | "mentor" | "listening";

const MODE_CONFIG: Record<
  Mode,
  { label: string; description: string; stats: { label: string; value: string }[] }
> = {
  calm: {
    label: "Calm",
    description:
      "Short, intentional check-ins where silence is allowed and nothing is being sold.",
    stats: [
      { label: "Avg. Session", value: "18 min" },
      { label: "Completion", value: "92%" },
      { label: "Refund Rate", value: "27%" },
    ],
  },
  mentor: {
    label: "Mentor",
    description:
      "You hold space for someone else. Clear time-boxing keeps both of you grounded.",
    stats: [
      { label: "Avg. Session", value: "24 min" },
      { label: "Completion", value: "96%" },
      { label: "Refund Rate", value: "14%" },
    ],
  },
  listening: {
    label: "Listening",
    description:
      "You arrive mostly to listen. Low-pressure, low-output, high-respect conversations.",
    stats: [
      { label: "Avg. Session", value: "12 min" },
      { label: "Completion", value: "88%" },
      { label: "Refund Rate", value: "33%" },
    ],
  },
};

export default function LandingPage() {
  const [stakeOpen, setStakeOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("calm");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const modeConfig = useMemo(() => MODE_CONFIG[mode], [mode]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-text",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
      );

      gsap.fromTo(
        ".hero-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.08,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".badge-chip",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
          delay: 0.18,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100"
    >
      <Navbar />
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pt-24 pb-16 sm:px-6 lg:px-8 lg:pt-28">
        <section className="grid flex-1 gap-10 lg:grid-cols-[1.4fr,1.1fr] lg:items-center">
          <div className="hero-text space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-200/70">
              Anonymous, but accountable
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
              Talk. Earn trust. Pay less.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Yello! creates space for conversations that feel more like a deep
              breath than a notification. No likes. No feeds. Just time-bound,
              anonymous video designed for real humans.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-800/80 bg-black/40 px-2 py-1.5 text-[0.7rem] text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="uppercase tracking-[0.22em]">
                Matching for presence, not profiles
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <PrimaryButton
                onClick={() => setStakeOpen(true)}
                className="text-xs uppercase tracking-[0.22em]"
              >
                Start Session
              </PrimaryButton>
              <p className="max-w-xs text-xs text-zinc-500">
                Sessions are metered and reversible. You always see how your
                time is being valued.
              </p>
            </div>
          </div>

          <div className="hero-card">
            <Card className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,224,167,0.14),_transparent_55%)] opacity-70" />
              <div className="relative space-y-6">
                <header className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-400">
                      Your Presence
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-zinc-50">
                      Reputation without a profile.
                    </h2>
                  </div>
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-right text-xs text-emerald-100">
                    <p className="text-[0.65rem] uppercase tracking-[0.22em]">
                      Signal
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {modeConfig.label}
                    </p>
                  </div>
                </header>

                <div className="flex gap-1 rounded-2xl border border-zinc-800/90 bg-black/40 p-1 text-xs">
                  {(["calm", "mentor", "listening"] as Mode[]).map((key) => {
                    const active = key === mode;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setMode(key)}
                        className={`flex-1 rounded-2xl px-3 py-1.5 transition-colors ${
                          active
                            ? "bg-amber-200/10 text-amber-100"
                            : "text-zinc-500 hover:text-zinc-200"
                        }`}
                      >
                        <span className="text-[0.65rem] uppercase tracking-[0.2em]">
                          {MODE_CONFIG[key].label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <BadgeChip className="badge-chip" label="Calm" />
                    <BadgeChip className="badge-chip" label="Trusted" />
                    <BadgeChip className="badge-chip" label="Consistent" />
                  </div>
                  <p className="text-xs text-zinc-400">{modeConfig.description}</p>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-zinc-300">
                  {modeConfig.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-zinc-800/90 bg-black/40 px-3 py-2"
                    >
                      <p className="text-[0.6rem] uppercase tracking-[0.2em] text-zinc-500">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-zinc-50">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <StakeModal open={stakeOpen} onClose={() => setStakeOpen(false)} />
    </div>
  );
}

