"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import { AgencyButton } from "@/components/ui/agency-button";
import { registerScrollTrigger, shouldReduceMotion } from "@/lib/animations";

const ctaHref = "/kontakt";
const evidence = [
  "Lokaler Kontext",
  "Klare Entitäten",
  "Vertrauenssignale",
  "Strukturierte Inhalte",
];

export function AiVisibilitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const promptTextRef = useRef<HTMLSpanElement>(null);
  const sendRef = useRef<HTMLSpanElement>(null);
  const submittedRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const answerLineRefs = useRef<HTMLSpanElement[]>([]);
  const firmRef = useRef<HTMLSpanElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const supportRef = useRef<HTMLParagraphElement>(null);
  const chipRefs = useRef<HTMLSpanElement[]>([]);
  const disclaimerRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ScrollTrigger = registerScrollTrigger();
    const section = sectionRef.current;
    const pin = pinRef.current;
    const copy = copyRef.current;
    const stage = stageRef.current;
    const prompt = promptRef.current;
    const promptText = promptTextRef.current;
    const send = sendRef.current;
    const submitted = submittedRef.current;
    const answer = answerRef.current;
    const firm = firmRef.current;
    const paragraph = paragraphRef.current;
    const support = supportRef.current;
    const disclaimer = disclaimerRef.current;
    const cta = ctaRef.current;
    const lines = answerLineRefs.current.filter(Boolean);
    const chips = chipRefs.current.filter(Boolean);

    if (
      !ScrollTrigger ||
      !section ||
      !pin ||
      !copy ||
      !stage ||
      !prompt ||
      !promptText ||
      !send ||
      !submitted ||
      !answer ||
      !firm ||
      !paragraph ||
      !support ||
      !disclaimer ||
      !cta
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      if (shouldReduceMotion()) {
        gsap.set(
          [
            copy,
            stage,
            prompt,
            promptText,
            send,
            submitted,
            answer,
            firm,
            paragraph,
            support,
            disclaimer,
            cta,
          ],
          { opacity: 1, y: 0, scale: 1 },
        );
        gsap.set(lines, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 });
        gsap.set(chips, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(stage, { opacity: 0.62, y: 54, scale: 0.985 });
      gsap.set(prompt, { opacity: 0, y: 34, scale: 0.97 });
      gsap.set(promptText, { clipPath: "inset(0% 100% 0% 0%)" });
      gsap.set(send, { opacity: 0.45, scale: 0.72 });
      gsap.set(submitted, { opacity: 0, y: 20, scale: 0.985 });
      gsap.set(answer, { opacity: 0, y: 24 });
      gsap.set(lines, {
        clipPath: "inset(0% 100% 0% 0%)",
        opacity: 0.25,
      });
      gsap.set(firm, { backgroundPosition: "100% 100%" });
      gsap.set([paragraph, support], { opacity: 0, y: 16 });
      gsap.set(chips, { opacity: 0, y: 16 });
      gsap.set(disclaimer, { opacity: 0, y: 10 });
      gsap.set(cta, { opacity: 1, y: 0 });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 3.25}`,
          scrub: 0.9,
          pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(stage, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.58,
          ease: "power3.out",
        })
        .to(
          prompt,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.54,
            ease: "power3.out",
          },
          "<0.08",
        )
        .to(promptText, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.72,
          ease: "none",
        })
        .to(
          send,
          {
            opacity: 1,
            scale: 1,
            duration: 0.24,
            ease: "power2.out",
          },
          ">-0.04",
        )
        .to(prompt, {
          y: -22,
          scale: 0.985,
          duration: 0.42,
          ease: "power2.inOut",
        })
        .to(
          submitted,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.38,
            ease: "power2.out",
          },
          "<0.08",
        )
        .to(answer, {
          opacity: 1,
          y: 0,
          duration: 0.42,
          ease: "power2.out",
        })
        .to(lines, {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 0.72,
          stagger: 0.13,
          ease: "none",
        })
        .to(
          firm,
          {
            backgroundPosition: "0% 100%",
            duration: 0.42,
            ease: "power2.out",
          },
          ">-0.14",
        )
        .to(paragraph, {
          opacity: 1,
          y: 0,
          duration: 0.42,
          ease: "power2.out",
        })
        .to(
          support,
          {
            opacity: 1,
            y: 0,
            duration: 0.38,
            ease: "power2.out",
          },
          "<0.12",
        )
        .to(
          chips,
          {
            opacity: 1,
            y: 0,
            duration: 0.36,
            stagger: 0.055,
            ease: "power2.out",
          },
          "<0.14",
        )
        .to(
          [disclaimer, cta],
          {
            opacity: 1,
            y: 0,
            duration: 0.42,
            stagger: 0.08,
            ease: "power2.out",
          },
          ">-0.02",
        )
        .to(stage, {
          y: -12,
          duration: 0.5,
          ease: "power1.inOut",
        });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ki-sichtbarkeit"
      className="service-section service-section--ai relative overflow-hidden"
      aria-labelledby="ki-sichtbarkeit-heading"
    >
      <div ref={pinRef} className="relative z-10 min-h-screen overflow-hidden">
        <div
          ref={copyRef}
          className="ai-copy absolute left-4 top-8 z-20 max-w-[30rem] sm:left-8 sm:top-10 lg:left-[7vw] lg:top-1/2"
        >
          <h2
            id="ki-sichtbarkeit-heading"
            className="max-w-[12ch] text-[2.85rem] font-medium leading-[0.92] text-[#07080f] sm:text-[4rem] lg:text-[4.25rem] 2xl:text-[5.15rem]"
          >
            Sichtbarkeit endet nicht mehr bei Google.
          </h2>
          <div ref={ctaRef} className="mt-8">
            <AgencyButton
              href={ctaHref}
              className="border-black/10 bg-[#11131d] text-white shadow-[0_16px_34px_rgba(17,19,29,0.16)] hover:bg-[#222431]"
            >
              KI-Sichtbarkeit analysieren
            </AgencyButton>
          </div>
        </div>

        <div
          ref={stageRef}
          className="ai-stage absolute left-4 right-4 top-[48vh] z-10 mx-auto max-w-[920px] sm:left-8 sm:right-8 lg:left-auto lg:right-[7vw] lg:top-[13vh] lg:w-[58vw] lg:max-w-[920px]"
        >
          <div ref={promptRef} className="ai-prompt">
            <span className="ai-prompt-mark" aria-hidden="true" />
            <span
              ref={promptTextRef}
              className="min-w-0 flex-1 truncate text-[#171922]"
            >
              Gute Immobilienmakler in Bremen
            </span>
            <span ref={sendRef} className="ai-send" aria-hidden="true">
              <span />
            </span>
          </div>

          <div ref={submittedRef} className="ai-submitted">
            <span>Gute Immobilienmakler in Bremen</span>
          </div>

          <div ref={answerRef} className="ai-response" aria-label="KI-Antwort">
            <div className="mb-5 flex items-center gap-3 text-xs font-medium uppercase text-[#727680]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#547ba3]" />
              Generierte Antwort
            </div>

            <h3 className="text-[1.45rem] font-medium leading-tight text-[#07080f] sm:text-[1.85rem]">
              <span
                ref={(node) => {
                  if (node) answerLineRefs.current[0] = node;
                }}
                className="ai-answer-line"
              >
                Empfehlung:{" "}
                <span ref={firmRef} className="ai-firm-name">
                  Ihre Firma
                </span>
              </span>
            </h3>

            <p
              ref={paragraphRef}
              className="mt-5 max-w-[48rem] text-base leading-7 text-[#4f535e] sm:text-lg sm:leading-8"
            >
              Die Firma erscheint als relevante Option, weil der digitale
              Auftritt lokal ausgerichtet ist, klare Leistungsbereiche zeigt
              und Vertrauen über Inhalte, Struktur und Signale aufbaut.
            </p>

            <p
              ref={supportRef}
              className="mt-6 max-w-[46rem] text-sm leading-6 text-[#656974] sm:text-base"
            >
              Relevant durch lokale Inhalte, klare Entitäten,
              Vertrauenssignale und eine strukturierte Website.
            </p>

            <div className="mt-6 flex max-w-[48rem] flex-wrap gap-3">
              {evidence.map((item, index) => (
                <span
                  key={item}
                  ref={(node) => {
                    if (node) chipRefs.current[index] = node;
                  }}
                  className="ai-evidence-chip"
                >
                  {item}
                </span>
              ))}
            </div>

            <p
              ref={disclaimerRef}
              className="mt-7 max-w-[35rem] text-xs leading-5 text-[#7c808a]"
            >
              Illustrative Simulation – keine Garantie für Empfehlungen in
              KI-Systemen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
