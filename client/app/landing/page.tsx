"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Navbar } from "../../components/Navbar";
import { PrimaryButton } from "../../components/PrimaryButton";
import { StakeModal } from "../../components/StakeModal";
import { Zap, Video, Users, TrendingUp } from "lucide-react";
import TargetCursor from "@/components/TargetCursor";

const FEATURES = [
  {
    icon: Video,
    title: "Anonymous Video",
    description:
      "No profiles. No memory. Just two people showing up in the same moment.",
  },
  {
    icon: Zap,
    title: "Time With Weight",
    description:
      "Sessions feel intentional. You see the value of time before it starts.",
  },
  {
    icon: Users,
    title: "Matched Gently",
    description:
      "Not by followers or history — just presence, now.",
  },
  {
    icon: TrendingUp,
    title: "Trust Emerges",
    description:
      "Consistency leaves traces. Quiet signals others can feel.",
  },
];

export default function LandingPage() {
  const [stakeOpen, setStakeOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power2.out",
        stagger: 0.15,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100"
    >
       {/* GLOBAL CURSOR — MUST BE HERE */}
    <TargetCursor
      spinDuration={3}
      hoverDuration={0.15}
      parallaxOn
      hideDefaultCursor
    />
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* SECTION 1 — HERO */}
        
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">

  {/* Particles layer */}
 

  {/* Content layer */}
  <div className="relative z-10">
    <h1 className="reveal text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
      Talk. Earn{" "}
      <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-100 bg-clip-text text-transparent">
        trust
      </span>
      . Pay less.
    </h1>

    <p className="reveal mt-6 max-w-xl mx-auto text-lg text-zinc-400 text-center">
      Conversations that feel calm, intentional, and human.
    </p>

    <div className="reveal mt-10">
      <PrimaryButton
        onClick={() => setStakeOpen(true)}
        className="cursor-target uppercase tracking-[0.25em]"
      >
        Start a session
      </PrimaryButton>
    </div>

   
  </div>

</section>


        

        {/* SECTION — BADGES */}
<section className="py-32">
  <div className="text-center max-w-3xl mx-auto">
    <p className="reveal text-xs uppercase tracking-[0.3em] text-amber-300/80">
      Trust, over time
    </p>

    <h2 className="reveal mt-4 text-3xl font-bold text-zinc-50">
      Badges appear as you keep showing up
    </h2>

    <p className="reveal mt-6 text-zinc-400 leading-relaxed">
      Yello doesn’t score you.
      <br />
      It quietly observes how sessions unfold — duration, consistency,
      completion — and lets trust emerge naturally.
    </p>
  </div>

  {/* Badge Cards */}
  <div className="reveal mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {[
      {
        title: "New",
        desc: "Every session begins here. No assumptions.",
      },
      {
        title: "Regular",
        desc: "You show up consistently and complete sessions.",
      },
      {
        title: "Considerate",
        desc: "Conversations tend to run longer, with fewer abrupt exits.",
      },
      {
        title: "Trusted",
        desc: "A steady history of meaningful, respectful sessions.",
      },
    ].map((badge) => (
      <div
        key={badge.title}
        className="group relative rounded-2xl border border-amber-300/20 bg-gradient-to-br from-amber-300/5 to-amber-300/2 p-6 transition-all hover:border-amber-300/40"
      >
        <div className="mb-3 text-sm uppercase tracking-[0.25em] text-amber-300/80">
          {badge.title}
        </div>
        <p className="text-sm leading-relaxed text-zinc-400">
          {badge.desc}
        </p>

        {/* Soft glow */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-amber-300/10 to-transparent transition-opacity" />
      </div>
    ))}
  </div>

  {/* Footer note */}
  <p className="reveal mt-12 text-center text-xs tracking-wide text-zinc-500">
    Badges evolve automatically based on real session behavior.
  </p>
</section>


        {/* SECTION 6 — GLOBAL */}
        <section className="py-32 text-center">
          <h2 className="reveal text-3xl font-semibold">
            From everywhere.
          </h2>
          <p className="reveal mt-6 text-zinc-400">
            Different places. Different times.
            <br />
            The same quiet moment.
          </p>
        </section>

        {/* SECTION 7 — TRANSPARENCY */}
        <section className="py-32 text-center">
          <h2 className="reveal text-3xl font-semibold">
            Nothing hidden.
          </h2>
          <p className="reveal mt-6 max-w-xl mx-auto text-zinc-400">
            You see the cost.
            <br />
            You end when you want.
            <br />
            You keep what’s unused.
          </p>
        </section>

        {/* SECTION 8 — FINAL CTA */}
        <section className="py-40 text-center">
          <p className="reveal text-2xl text-zinc-300">
            Start a session.
            <br />
            See how it feels.
          </p>

          <div className="reveal mt-10">
            <PrimaryButton
              onClick={() => setStakeOpen(true)}
              className="cursor-target uppercase tracking-[0.25em]"
            >
              Begin now
            </PrimaryButton>
          </div>
        </section>
      </main>

      <StakeModal open={stakeOpen} onClose={() => setStakeOpen(false)} />
    </div>
  );
}
