"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
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
  // Ref NÃO reseta em re-render
  const hasAnimated = useRef(false);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className="relative -mr-4 overflow-visible"
        >
          {/* Tooltip */}
          <motion.div
            initial={
              !hasAnimated.current
                ? { opacity: 0, y: 6 }
                : false
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
              delay: index * 0.08,
            }}
            onAnimationComplete={() => {
              hasAnimated.current = true;
            }}
            className="
              absolute -top-14 left-1/2 -translate-x-1/2
              z-50 flex flex-col items-center
              rounded-lg bg-zinc-950/90 backdrop-blur-md
              px-5 py-2.5
              shadow-2xl border border-white/10
              min-w-max overflow-visible
            "
          >
            <span className="text-sm font-semibold text-white">
              {item.name}
            </span>
            <span className="text-xs text-zinc-400">
              {item.designation}
            </span>
          </motion.div>

          {/* Avatar */}
          <motion.img
            src={item.image}
            alt={item.name}
            width={56}
            height={56}
            initial={
              !hasAnimated.current
                ? { opacity: 0, scale: 0.97 }
                : false
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
              delay: index * 0.08,
            }}
            className="
              h-14 w-14 rounded-full object-cover
              border-2 border-white bg-zinc-200
            "
          />
        </div>
      ))}
    </div>
  );
};
