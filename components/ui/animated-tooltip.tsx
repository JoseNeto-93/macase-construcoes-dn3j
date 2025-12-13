"use client";

import React, { useState } from "react";
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
  // Controla animação única
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className="relative -mr-4 overflow-visible"
        >
          {/* Tooltip */}
          <motion.div
            initial={!hasAnimated ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
              delay: index * 0.08,
            }}
            onAnimationComplete={() => setHasAnimated(true)}
            className="
              absolute -top-14 left-1/2 -translate-x-1/2
              z-50 flex flex-col items-center justify-center
              rounded-lg bg-zinc-950/90 backdrop-blur-md
              px-5 py-2.5
              shadow-2xl border border-white/10
              overflow-visible
              min-w-max
            "
          >
            <span className="text-sm font-semibold text-white leading-tight">
              {item.name}
            </span>
            <span className="text-xs text-zinc-400 leading-tight">
              {item.designation}
            </span>
          </motion.div>

          {/* Avatar */}
          <motion.img
            src={item.image}
            alt={item.name}
            width={56}
            height={56}
            initial={!hasAnimated ? { opacity: 0, scale: 0.96 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
              delay: index * 0.08,
            }}
            className="
              h-14 w-14 rounded-full object-cover object-top
              border-2 border-white
              bg-zinc-200
            "
          />
        </div>
      ))}
    </div>
  );
};
