"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "../../lib/utils";

type TooltipItem = {
  id: number;
  name: string;
  designation: string;
  image: string;
};

interface AnimatedTooltipProps {
  items: TooltipItem[];
  className?: string;
}

export const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({
  items,
  className,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Motion values
  const x = useMotionValue(0);

  // Professional spring configuration (smooth & controlled)
  const springConfig = { stiffness: 120, damping: 18 };

  // Subtle movement only (no exaggerated rotation)
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-16, 16]),
    springConfig
  );

  const handleMouseMove = (
    event: React.MouseEvent<HTMLImageElement>
  ) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="-mr-4 relative"
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 8,
                  scale: 0.96,
                  transition: { duration: 0.2 },
                }}
                style={{
                  translateX,
                  whiteSpace: "nowrap",
                }}
                className="
                  absolute -top-14 left-1/2 -translate-x-1/2
                  z-50 flex flex-col items-center justify-center
                  rounded-lg bg-zinc-950/90 backdrop-blur-md
                  px-4 py-2 shadow-2xl border border-white/10
                "
              >
                <span className="text-sm font-semibold text-white">
                  {item.name}
                </span>
                <span className="text-xs text-zinc-400">
                  {item.designation}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <img
            src={item.image}
            alt={item.name}
            width={56}
            height={56}
            onMouseMove={handleMouseMove}
            className="
              h-14 w-14 rounded-full object-cover object-top
              border-2 border-white
              transition-transform duration-300 ease-out
              hover:scale-105
              bg-zinc-200
            "
          />
        </div>
      ))}
    </div>
  );
};
