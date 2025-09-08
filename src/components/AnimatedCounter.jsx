"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function AnimatedCounter({ count, className }) {
  const [displayedCount, setDisplayedCount] = useState(0);
  useEffect(() => {
    const animateCount = (setter, target, duration = 1000) => {
      const start = 0;
      const increment = target / (duration / 10);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 16);

      return timer;
    };

    const timers = animateCount(setDisplayedCount, count);

    return () => clearInterval(timers);
  }, [count]);

  return (
    <span
      className={cn(
        "transition-all duration-100 ease-out transform",
        className
      )}
    >
      {displayedCount}
    </span>
  );
}
