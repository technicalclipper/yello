"use client";

import * as React from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { Card } from "./Card";
import { PrimaryButton } from "./PrimaryButton";
import Counter from './Counter'; 

type StakeModalProps = {
  open: boolean;
  onClose: () => void;
};

export function StakeModal({ open, onClose }: StakeModalProps) {
  const router = useRouter();
  const backdropRef = React.useRef<HTMLDivElement | null>(null);
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  
  /**
   * 10000 = 1.0000 ETH
   * 5     = 0.0005 ETH
   * 10    = 0.0010 ETH
   */
  const [rawAmount, setRawAmount] = React.useState(5);

  const displayWhole = Math.floor(rawAmount / 10000);
  const displayDecimal = rawAmount % 10000;

  React.useEffect(() => {
    if (!open) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    });

    return () => ctx.revert();
  }, [open]);

  if (!open) return null;

  const enterSession = () => {
    const finalAmount = rawAmount / 10000;
    console.log("Staking:", finalAmount.toFixed(4), "ETH");
    onClose();
    router.push("/match");
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <div 
        ref={cardRef} 
        className="w-full max-w-sm px-4" 
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-zinc-800/50 bg-zinc-950/50 p-8 shadow-2xl">
          <div className="text-center space-y-2 mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500/80">
              Commitment
            </p>
            <h2 className="text-lg font-light text-zinc-300">Set your stake</h2>
          </div>

          <div className="relative flex flex-col items-center justify-center">
            <div className="flex items-baseline justify-center select-none cursor-default">
              {/* Whole Number */}
              <Counter
                value={displayWhole}
                places={[1]}
                fontSize={64}
                textColor="#ffffff"
                fontWeight={900}
                gap={0}
                padding={0}
              />
              
              <span className="text-4xl font-black text-white px-0.5 translate-y-[-2px]">.</span>

              {/* Decimal Numbers (4 places: 0000) */}
              <Counter
                value={displayDecimal}
                places={[1000, 100, 10, 1]} 
                fontSize={64}
                textColor="#ffffff"
                fontWeight={900}
                gap={0}
                padding={0}
                digitPlaceholder="0"
              />
            </div>
            
            <span className="mt-3 text-[10px] font-black tracking-[0.5em] text-zinc-600 uppercase">
              ETH
            </span>

            <div className="mt-12 flex items-center gap-10">
              <button
                onClick={() => setRawAmount(prev => Math.max(0, prev - 5))}
                className="cursor-target group flex flex-col items-center gap-2 transition-transform active:scale-90"
              >
                <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:border-zinc-500 group-hover:text-white transition-all">
                  <span className="text-xl font-light">−</span>
                </div>
                <span className="text-[9px] text-zinc-600 font-medium tabular-nums">0.0005</span>
              </button>

              <button
                onClick={() => setRawAmount(prev => prev + 5)}
                className="cursor-target group flex flex-col items-center gap-2 transition-transform active:scale-90"
              >
                <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:border-zinc-500 group-hover:text-white transition-all">
                  <span className="text-xl font-light">+</span>
                </div>
                <span className="text-[9px] text-zinc-600 font-medium tabular-nums">0.0005</span>
              </button>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4">
            <PrimaryButton onClick={enterSession} className="cursor-target w-full py-6 text-sm uppercase tracking-widest">
              Confirm Stake
            </PrimaryButton>
            <button
              onClick={onClose}
              className="cursor-target text-[10px] uppercase tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}