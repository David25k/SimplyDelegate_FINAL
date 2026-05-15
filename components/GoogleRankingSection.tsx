"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import { AgencyButton } from "@/components/ui/agency-button";
import { registerScrollTrigger, shouldReduceMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";

const ctaHref = "/kontakt";

const searchResults = [
  {
    id: "nordblick",
    startLabel: "Platz 1",
    finalLabel: "Platz 2",
    domain: "www.nordblick-immobilien.de",
    title: "Immobilienmakler Bremen | Nordblick Immobilien",
    description:
      "Moderne Immobilienvermittlung für Bremen und Umgebung mit Fokus auf Wohnimmobilien, Verkauf und fundierte Bewertung.",
    rating: "4,8 · 138 Bewertungen",
    startSlot: 0,
    endSlot: 1,
  },
  {
    id: "hansewert",
    startLabel: "Platz 2",
    finalLabel: "Platz 3",
    domain: "www.hansewert-bremen.de",
    title: "Hansewert Maklerbüro | Ihr Immobilienpartner in Bremen",
    description:
      "Persönliche Beratung für Kauf, Verkauf und Vermietung von Häusern, Wohnungen und Kapitalanlagen.",
    rating: "4,6 · 96 Bewertungen",
    startSlot: 1,
    endSlot: 2,
  },
  {
    id: "weser",
    startLabel: "Platz 3",
    finalLabel: "Platz 4",
    domain: "www.weser-realestate.de",
    title: "Weser Real Estate | Immobilienberatung in Bremen",
    description:
      "Immobilienangebote, Vermarktung und Beratung für Eigentümer in Bremen, Schwachhausen und der Überseestadt.",
    rating: "4,7 · 121 Bewertungen",
    startSlot: 2,
    endSlot: 3,
  },
  {
    id: "zuhause",
    startLabel: "Platz 4",
    finalLabel: "Platz 5",
    domain: "www.bremen-zuhause.de",
    title: "Bremen Zuhause Immobilien | Verkauf und Bewertung",
    description:
      "Regionale Immobilienvermittlung mit persönlicher Betreuung und marktgerechter Bewertung.",
    rating: "4,5 · 82 Bewertungen",
    startSlot: 3,
    endSlot: 4,
  },
  {
    id: "kontor",
    startLabel: "Platz 5",
    finalLabel: "Platz 6",
    domain: "www.immobilienkontor-mitte.de",
    title: "Immobilienkontor Mitte | Maklerbüro Bremen",
    description:
      "Immobilienvermittlung für Eigentümer, Käufer und Investoren im Bremer Stadtgebiet.",
    rating: "4,4 · 74 Bewertungen",
    startSlot: 4,
    endSlot: 5,
  },
  {
    id: "ihre-webseite",
    startLabel: "Platz 6",
    finalLabel: "Platz 1",
    domain: "ihre-webseite.de",
    title:
      "IHRE WEBSEITE | Exklusive Vermarktung, starke Präsentation und persönliche Beratung",
    description:
      "Exklusive Immobilienvermarktung für Bremen und Umgebung: hochwertige Objektpräsentation, geprüfte Interessenten, fundierte Marktkenntnis und persönliche Beratung.",
    rating: "5,0 · 247 Bewertungen",
    pills: ["Immobilie verkaufen", "Referenzen", "Kostenlose Wertermittlung"],
    startSlot: 5,
    endSlot: 0,
    isOwn: true,
  },
];

export function GoogleRankingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const queryRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const resultRefs = useRef(new Map<string, HTMLLIElement>());

  useLayoutEffect(() => {
    const ScrollTrigger = registerScrollTrigger();
    const section = sectionRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    const copy = copyRef.current;
    const cta = ctaRef.current;
    const query = queryRef.current;
    const meta = metaRef.current;
    const track = trackRef.current;
    const list = listRef.current;

    if (
      !ScrollTrigger ||
      !section ||
      !pin ||
      !stage ||
      !copy ||
      !cta ||
      !query ||
      !meta ||
      !track ||
      !list
    ) {
      return;
    }

    const rows = searchResults
      .map((item) => ({ ...item, element: resultRefs.current.get(item.id) }))
      .filter(
        (item): item is (typeof searchResults)[number] & { element: HTMLLIElement } =>
          Boolean(item.element),
      );

    const ownRow = resultRefs.current.get("ihre-webseite");
    const ownArticle = ownRow?.querySelector("[data-own-result]");
    const rankStartLabels = rows
      .map((row) => row.element.querySelector("[data-rank-start]"))
      .filter((target): target is Element => Boolean(target));
    const rankFinalLabels = rows
      .map((row) => row.element.querySelector("[data-rank-final]"))
      .filter((target): target is Element => Boolean(target));

    const getStep = () => {
      const value = Number.parseFloat(
        window.getComputedStyle(list).getPropertyValue("--serp-step"),
      );

      return Number.isFinite(value) ? value : 214;
    };

    const rowElements = rows.map((row) => row.element);

    const setRows = (slotKey: "startSlot" | "endSlot") => {
      gsap.set(rowElements, {
        y: (index) => rows[index][slotKey] * getStep(),
        opacity: (index) => (rows[index].isOwn ? 1 : 0.78),
        scale: (index) => (rows[index].isOwn ? 1 : 0.988),
      });
    };

    const ctx = gsap.context(() => {
      if (shouldReduceMotion()) {
        gsap.set([stage, copy, query, meta, track, cta], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        gsap.set(track, { y: -28 });
        setRows("endSlot");
        gsap.set(rankStartLabels, { opacity: 0 });
        gsap.set(rankFinalLabels, { opacity: 1, y: 0 });
        if (ownArticle) {
          ownArticle.classList.add("serp-result-card--final");
        }
        return;
      }

      gsap.set(stage, { opacity: 0.62, y: 50, scale: 0.985 });
      gsap.set(copy, { opacity: 0.94 });
      gsap.set(query, { opacity: 0.18, y: 22, scale: 0.985 });
      gsap.set(meta, { opacity: 0, y: 14 });
      gsap.set(cta, { opacity: 1, y: 0 });
      gsap.set(track, { y: 0 });
      gsap.set(rankFinalLabels, { opacity: 0, y: 5 });
      gsap.set(rowElements, {
        y: (index) => rows[index].startSlot * getStep() + 28,
        opacity: 0,
        scale: 0.97,
      });
      if (ownArticle) {
        gsap.set(ownArticle, {
          boxShadow: "0 18px 50px rgba(80, 86, 104, 0.13)",
        });
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 3.7}`,
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
          duration: 0.65,
          ease: "power3.out",
        })
        .to(
          query,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.48,
            ease: "power3.out",
          },
          "<0.08",
        )
        .to(
          meta,
          {
            opacity: 1,
            y: 0,
            duration: 0.34,
          },
          ">-0.04",
        )
        .to(rowElements, {
          y: (index) => rows[index].startSlot * getStep(),
          opacity: (index) => (rows[index].isOwn ? 0.98 : 0.78),
          scale: (index) => (rows[index].isOwn ? 1 : 0.988),
          duration: 0.86,
          stagger: 0.055,
          ease: "power3.out",
        })
        .to(
          rowElements,
          {
            y: (index) => rows[index].endSlot * getStep(),
            opacity: (index) => (rows[index].isOwn ? 1 : 0.48),
            scale: (index) => (rows[index].isOwn ? 1.018 : 0.97),
            duration: 2.05,
            ease: "power3.inOut",
          },
          ">0.18",
        )
        .to(
          rankStartLabels,
          {
            opacity: 0,
            y: -5,
            duration: 0.28,
            ease: "power2.out",
          },
          "<1.25",
        )
        .to(
          rankFinalLabels,
          {
            opacity: 1,
            y: 0,
            duration: 0.34,
            ease: "power2.out",
          },
          "<0.05",
        )
        .to(
          ownArticle ? [ownArticle] : [],
          {
            boxShadow:
              "0 34px 100px rgba(80, 86, 104, 0.22), 0 0 0 1px rgba(52, 91, 133, 0.18)",
            duration: 0.42,
            ease: "power2.out",
          },
          "<0.1",
        )
        .to(track, {
          y: -38,
          duration: 0.75,
          ease: "power1.inOut",
        });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="google-sichtbarkeit"
      className="service-section service-section--search relative overflow-hidden"
      aria-labelledby="google-sichtbarkeit-heading"
    >
      <div ref={pinRef} className="relative z-10 min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute left-4 top-8 z-20 max-w-[30rem] sm:left-8 sm:top-10 lg:inset-y-0 lg:left-[7vw] lg:top-0 lg:flex lg:w-[30rem] lg:max-w-none lg:items-center">
          <div ref={copyRef} className="serp-copy">
          <h2
            id="google-sichtbarkeit-heading"
            className="max-w-[12ch] text-[2.85rem] font-medium leading-[0.92] text-[#07080f] sm:text-[4rem] lg:text-[4.25rem] 2xl:text-[5.15rem]"
          >
            Wenn Kunden suchen, zählt Sichtbarkeit.
          </h2>
            <div ref={ctaRef} className="pointer-events-auto mt-8">
            <AgencyButton
              href={ctaHref}
              className="border-black/10 bg-[#11131d] text-white shadow-[0_16px_34px_rgba(17,19,29,0.16)] hover:bg-[#222431]"
            >
              Ranking-Potenzial prüfen
            </AgencyButton>
            </div>
          </div>
        </div>

        <div
          ref={stageRef}
          className="serp-stage absolute left-4 right-4 top-[55vh] z-10 mx-auto w-auto max-w-[1120px] sm:left-8 sm:right-8 lg:left-auto lg:right-[7vw] lg:top-[13vh] lg:mx-0 lg:w-[58vw] lg:max-w-[920px]"
        >
          <div ref={trackRef} className="serp-track">
            <div ref={queryRef} className="serp-searchbar">
              <span className="serp-searchmark" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate">
                immobilienmakler bremen
              </span>
              <span className="hidden text-sm text-[#6b6e78] sm:inline">
                lokale Suche
              </span>
            </div>

            <div
              ref={metaRef}
              className="mt-6 flex items-center justify-between px-1 text-xs text-[#6b6e78] sm:text-sm"
            >
              <span>Ungefähr 18.400 Ergebnisse</span>
              <span className="hidden sm:block">Organische Ergebnisse</span>
            </div>

            <ol
              ref={listRef}
              className="serp-results relative mt-5"
              aria-label="Abstrakte Suchergebnisse"
            >
              {searchResults.map((result) => (
                <li
                  key={result.id}
                  ref={(node) => {
                    if (node) {
                      resultRefs.current.set(result.id, node);
                    } else {
                      resultRefs.current.delete(result.id);
                    }
                  }}
                  className="serp-result"
                >
                  <article
                    data-own-result={result.isOwn ? true : undefined}
                    className={cn(
                      "serp-result-card",
                      result.isOwn && "serp-result-card--own",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={cn(
                          "serp-rank",
                          result.isOwn && "serp-rank--own",
                        )}
                      >
                        <span data-rank-start>{result.startLabel}</span>
                        <span data-rank-final className="absolute inset-0">
                          {result.finalLabel}
                        </span>
                      </span>
                      <span className="text-xs font-medium text-[#6f727d] sm:text-sm">
                        {result.domain}
                      </span>
                    </div>
                    <h3
                      className={cn(
                        "mt-3 text-[1.12rem] font-medium leading-tight text-[#345b85] sm:text-[1.22rem]",
                        result.isOwn && "text-[#123f6e]",
                      )}
                    >
                      {result.title}
                    </h3>
                    <p className="mt-2.5 max-w-[58rem] text-sm leading-6 text-[#575b66] sm:text-[0.9rem] sm:leading-6">
                      {result.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2.5 text-xs text-[#6a6e79] sm:text-[0.82rem]">
                      <span className="serp-rating">{result.rating}</span>
                      {result.pills?.map((pill) => (
                        <span key={pill} className="serp-pill">
                          {pill}
                        </span>
                      ))}
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
