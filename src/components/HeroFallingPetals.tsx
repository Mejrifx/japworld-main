import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

const PETAL_SRC = "/Japanese%20Petal.png";

const PETAL_COUNT_DESKTOP = 36;
const PETAL_COUNT_MOBILE = 20;

interface PetalConfig {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  spin: number;
  opacity: number;
  variant: "a" | "b";
}

/** Seeded pseudo-random for stable petal layout between renders */
function seeded(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function buildPetals(count: number): PetalConfig[] {
  return Array.from({ length: count }, (_, i) => {
    const r = (n: number) => seeded(i * 17 + n);
    return {
      id: i,
      left: r(1) * 100,
      size: 12 + Math.floor(r(2) * 18),
      duration: 9 + r(3) * 10,
      delay: r(4) * 14,
      sway: 35 + r(5) * 85,
      spin: 180 + r(6) * 540,
      opacity: 0.55 + r(7) * 0.4,
      variant: r(8) > 0.5 ? "b" : "a",
    };
  });
}

/**
 * Cherry-blossom-style petal fall — hero section only (parent must clip with overflow-hidden).
 */
export function HeroFallingPetals() {
  const [enabled, setEnabled] = useState(true);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setEnabled(!motionMq.matches);
    updateMotion();
    motionMq.addEventListener("change", updateMotion);

    const widthMq = window.matchMedia("(max-width: 768px)");
    const updateWidth = () => setMobile(widthMq.matches);
    updateWidth();
    widthMq.addEventListener("change", updateWidth);

    return () => {
      motionMq.removeEventListener("change", updateMotion);
      widthMq.removeEventListener("change", updateWidth);
    };
  }, []);

  const petals = useMemo(
    () => buildPetals(mobile ? PETAL_COUNT_MOBILE : PETAL_COUNT_DESKTOP),
    [mobile],
  );

  if (!enabled) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
      aria-hidden
    >
      {/* Soft canopy — petals appear to drift from above the hero */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#ffb7c5]/10 via-transparent to-transparent" />

      {petals.map((petal) => (
        <img
          key={petal.id}
          src={PETAL_SRC}
          alt=""
          draggable={false}
          className={cn(
            "absolute top-0 will-change-transform object-contain select-none",
            petal.variant === "a" ? "animate-petal-fall-a" : "animate-petal-fall-b",
          )}
          style={
            {
              left: `${petal.left}%`,
              width: petal.size,
              height: "auto",
              opacity: petal.opacity,
              "--petal-duration": `${petal.duration}s`,
              "--petal-delay": `${petal.delay}s`,
              "--petal-sway": `${petal.sway}px`,
              "--petal-spin": `${petal.spin}deg`,
              "--petal-opacity": petal.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
