"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AgencyButtonProps = {
  children: ReactNode;
  href: string;
  className?: string;
};

export function AgencyButton({
  children,
  href,
  className,
}: AgencyButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="inline-flex"
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <Button
        asChild
        className={cn(
          "group h-12 gap-4 overflow-hidden px-5 text-[0.92rem]",
          className,
        )}
      >
        <a href={href}>
          <span>{children}</span>
          <span
            aria-hidden="true"
            className="relative h-2 w-7 overflow-hidden"
          >
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current transition-transform duration-300 group-hover:translate-x-1" />
            <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t border-current transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </a>
      </Button>
    </motion.div>
  );
}
