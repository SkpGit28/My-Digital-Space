"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/Components/container";
import Footer from "@/Components/Footer";
import { motion, useReducedMotion } from "framer-motion";

export type WorkCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  slug?: string;
};

const CARDS: WorkCard[] = [
  {
    id: "mobile-banking",
    title: "Mobile Banking App",
    description:
      "End-to-end redesign for onboarding, UPI payments, and bill reminders with strong emphasis on clarity and trust.",
    imageSrc:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='%23A7F3D0'/><stop offset='1' stop-color='%2360A5FA'/></linearGradient></defs><rect fill='url(%23g)' width='100%25' height='100%25'/></svg>",
    imageAlt: "Abstract mint-to-blue gradient placeholder",
  },
  {
    id: "merchant-dashboard",
    title: "Merchant Risk Dashboard",
    description:
      "Data-dense views for disputes and settlements with drill-downs and anomaly alerts to reduce financial risk.",
    imageSrc:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'><defs><linearGradient id='g' x1='0' y1='1' x2='1' y2='0'><stop stop-color='%23FDE68A'/><stop offset='1' stop-color='%23F59E0B'/></linearGradient></defs><rect fill='url(%23g)' width='100%25' height='100%25'/></svg>",
    imageAlt: "Abstract yellow-to-amber gradient placeholder",
  },
  {
    id: "kyc-flows",
    title: "KYC Flows Redesign",
    description:
      "Streamlined verification with clear progress states and inline guidance, significantly reducing drop-offs.",
    imageSrc:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='%2399F6E4'/><stop offset='1' stop-color='%2338BDF8'/></linearGradient></defs><rect fill='url(%23g)' width='100%25' height='100%25'/></svg>",
    imageAlt: "Abstract teal-to-sky gradient placeholder",
  },
  {
    id: "credit-insights",
    title: "Credit Insights",
    description:
      "Explained complex credit signals in plain language with guardrails and actionable inputs for responsible lending.",
    imageSrc:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'><defs><linearGradient id='g' x1='1' y1='0' x2='0' y2='1'><stop stop-color='%23D8B4FE'/><stop offset='1' stop-color='%238B5CF6'/></linearGradient></defs><rect fill='url(%23g)' width='100%25' height='100%25'/></svg>",
    imageAlt: "Abstract purple gradient placeholder",
  },
];

export default function WorkPage(): ReactElement {
  const prefersReducedMotion = useReducedMotion();
  const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const SECTION_DUR = prefersReducedMotion ? 0 : 0.8;

  const headingVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: SECTION_DUR,
        ease: EASE,
      },
    },
  } as const;

  return (
    <>
      <main className="py-16 md:py-24">
        <Container>
          {/* Heading - CSS handles sticky → relative transition */}
          <header className="c-work-heading bg-white dark:bg-neutral-950 py-4 md:py-6 text-center transition-all duration-300">
            <motion.h1
              variants={headingVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-[64px] font-bold text-gray-900 dark:text-white text-center mb-0 leading-tight tracking-tight"
            >
              Most of my design
            </motion.h1>
          </header>

          {/* Stacked / sticky list */}
          <section
            aria-labelledby="work-heading"
            className="c-work mt-12 md:mt-16"
          >
            <div className="c-work__list">
              {CARDS.map((card) => (
                <article
                  key={card.id}
                  className="c-work__item"
                  aria-labelledby={`${card.id}-title`}
                >
                  {/* Image (right on desktop) */}
                  <figure className="c-work__item-figure">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="c-work__item-image"
                    />
                  </figure>

                  {/* Info (left on desktop) */}
                  <div className="c-work__item-info">
                    <h2 id={`${card.id}-title`} className="c-work__item-title">
                      {card.title}
                    </h2>
                    <p className="c-work__item-excerpt">{card.description}</p>
                    <Link
                      href={card.slug ? `/work/${card.slug}` : "#"}
                      aria-label={`Read case study: ${card.title}`}
                      className="c-work__item-link"
                    >
                      Read case study
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="h-20 md:h-24" />
        </Container>
      </main>

      <Footer />
    </>
  );
}
