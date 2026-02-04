"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Navbar } from "../../components/Navbar";
import { PrimaryButton } from "../../components/PrimaryButton";
import { StakeModal } from "../../components/StakeModal";
import { Zap, Video, Users, TrendingUp } from "lucide-react";

const FEATURES = [
  {
    icon: Video,
    title: "Anonymous Video Chats",
    description:
      "No profiles, no permanence. Just real conversations between real humans where your presence matters, not your history.",
  },
  {
    icon: Zap,
    title: "Time-Metered & Reversible",
    description:
      "Every session has clear boundaries. You see exactly how your time is valued before you start, with full refunds available.",
  },
  {
    icon: Users,
    title: "Matched by Presence",
    description:
      "Get paired based on what you bring to the conversation right now—not your profile, followers, or past behavior.",
  },
  {
    icon: TrendingUp,
    title: "Earn Real Trust",
    description:
      "Build genuine reputation through consistent, authentic interactions. Your presence is your signal.",
  },
];

export default function LandingPage() {
  const [stakeOpen, setStakeOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero headline animation
      gsap.fromTo(
        ".hero-headline",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
      );

      // Hero subline animation
      gsap.fromTo(
        ".hero-subline",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.1, ease: "power2.out" }
      );

      // Button animation
      gsap.fromTo(
        ".hero-button",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.2, ease: "power2.out" }
      );

      // Feature cards animation
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.3,
          ease: "power2.out",
          stagger: 0.15,
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

      {/* Hero Section */}
      <main className="mx-auto max-w-6xl px-4 pt-24 pb-24 sm:px-6 lg:px-8">
        <section className="flex flex-col items-center justify-center text-center">
          <div className="max-w-3xl space-y-8">
            {/* Main Headline */}
            <div className="hero-headline space-y-2">
              <h1 className="text-5xl font-bold tracking-tight text-zinc-50 sm:text-6xl lg:text-7xl">
                Talk. Earn{" "}
                <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-100 bg-clip-text text-transparent">
                  trust
                </span>
                . Pay less.
              </h1>
            </div>

            {/* Subline */}
            <div className="hero-subline">
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
                Yello creates space for conversations that feel like a deep
                breath, not a notification. Anonymous video designed for real
                humans to connect meaningfully.
              </p>
            </div>

            {/* CTA Button */}
            <div className="hero-button flex justify-center pt-4">
              <PrimaryButton
                onClick={() => setStakeOpen(true)}
                className="text-sm uppercase tracking-[0.22em] px-8 py-3"
              >
                Start Session Now
              </PrimaryButton>
            </div>

            {/* Trust Badge */}
            <div className="flex justify-center pt-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/5 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium uppercase tracking-[0.22em] text-amber-200/70">
                  Join thousands building real presence
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-32 space-y-16">
          <div className="space-y-4 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-300/80">
              Why Yello
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
              Built for Real Conversations
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="feature-card group relative rounded-2xl border border-amber-300/20 bg-gradient-to-br from-amber-300/5 to-amber-300/2 p-6 hover:border-amber-300/40 hover:bg-amber-300/10 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="mb-4 inline-block rounded-lg bg-amber-300/10 p-3 group-hover:bg-amber-300/20 transition-colors">
                    <Icon className="h-6 w-6 text-amber-300" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-lg font-semibold text-zinc-50">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {feature.description}
                  </p>

                  {/* Decorative glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-300/0 to-amber-300/0 opacity-0 group-hover:opacity-100 group-hover:from-amber-300/5 group-hover:to-amber-300/2 transition-opacity duration-300" />
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-32 rounded-2xl border border-amber-300/20 bg-gradient-to-br from-amber-300/5 to-amber-300/2 p-12 text-center">
          <h3 className="mb-4 text-2xl font-bold text-zinc-50">
            Ready to connect with real humans?
          </h3>
          <p className="mx-auto mb-8 max-w-xl text-zinc-400">
            Sessions are metered, reversible, and transparent. You always see
            how your time is being valued.
          </p>
          <PrimaryButton
            onClick={() => setStakeOpen(true)}
            className="text-sm uppercase tracking-[0.22em]"
          >
            Start Your First Session
          </PrimaryButton>
        </section>
      </main>

      <StakeModal open={stakeOpen} onClose={() => setStakeOpen(false)} />
    </div>
  );
}

