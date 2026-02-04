"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import gsap from "gsap";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
      className
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!panelRef.current) return;

    gsap.fromTo(
      panelRef.current,
      { x: 420, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <SheetPrimitive.Portal>
      <SheetOverlay />
      <SheetPrimitive.Content
  ref={panelRef}
  className={cn(
    "fixed right-0 top-0 z-50 h-full w-[380px] bg-gradient-to-b from-zinc-900 to-black border-l border-amber-300/20 shadow-2xl",
    className
  )}
  {...props}
>
  {/* Accessibility-only title (Radix compliant, HMR safe) */}
  <SheetPrimitive.Title className="sr-only">
    Profile Panel
  </SheetPrimitive.Title>

  {children}

  <SheetPrimitive.Close className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-100">
    <X className="h-4 w-4" />
  </SheetPrimitive.Close>
</SheetPrimitive.Content>

    </SheetPrimitive.Portal>
  );
});
SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetContent };
