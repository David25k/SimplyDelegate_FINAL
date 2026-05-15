"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let scrollTriggerRegistered = false;

export function registerScrollTrigger() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!scrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    scrollTriggerRegistered = true;
  }

  return ScrollTrigger;
}

export function shouldReduceMotion() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
