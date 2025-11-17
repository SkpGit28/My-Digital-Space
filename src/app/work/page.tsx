"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/Components/container";
import Footer from "@/Components/Footer";
import { cn } from "@/lib/utils";

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
  return (
    <>
      <main className="pt-24 md:pt-28">
        <Container>
          {/* Heading */}
          <header className="text-center">
            <h1
              id="work-heading"
              className={cn(
                "font-semibold tracking-tight leading-tight text-white",
                "text-[38px] sm:text-[48px] md:text-[64px]"
              )}
            >
              Most of my design
            </h1>
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
                    <h2
                      id={`${card.id}-title`}
                      className="c-work__item-title"
                    >
                      {card.title}
                    </h2>
                    <p className="c-work__item-excerpt">
                      {card.description}
                    </p>
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
