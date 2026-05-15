"use client";

import type { Ref } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { AgencyButton } from "@/components/ui/agency-button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionCopyProps = {
  eyebrow: string;
  headingId: string;
  title: string;
  body: string;
  cta: string;
  ctaHref: string;
  className?: string;
  ctaWrapperClassName?: string;
  ctaWrapperRef?: Ref<HTMLDivElement>;
};

export function SectionCopy({
  eyebrow,
  headingId,
  title,
  body,
  cta,
  ctaHref,
  className,
  ctaWrapperClassName,
  ctaWrapperRef,
}: SectionCopyProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("w-full min-w-0 max-w-[33rem]", className)}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <Badge>{eyebrow}</Badge>
      <h2
        id={headingId}
        className="mt-6 text-[3rem] font-medium leading-[0.94] text-[#07080f] sm:text-[3.7rem] lg:text-[4.4rem] 2xl:text-[5.15rem]"
      >
        {title}
      </h2>
      <p className="mt-6 max-w-full text-base leading-7 text-[#4e515b] sm:max-w-[30rem] sm:text-lg">
        {body}
      </p>
      <div ref={ctaWrapperRef} className={cn("mt-9", ctaWrapperClassName)}>
        <AgencyButton href={ctaHref}>{cta}</AgencyButton>
      </div>
    </motion.div>
  );
}
