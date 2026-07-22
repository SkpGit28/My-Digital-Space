"use client";

import React, { useState, useEffect } from "react";
import { Figtree } from "next/font/google";
import localFont from "next/font/local";
import styles from "./page.module.css";
import Image from "next/image";
import "./tokens.css";
import "./typography.css";
import Reveal from "@/Components/Reveal";
import { usePageReady } from "@/lib/usePageReady";
import { FooterReveal } from "@/Components/SiteFooter";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--cs2-font-figtree",
  display: "block",
});


const satoshi = localFont({
  src: "../../../../public/fonts/Satoshi-Bold.woff2",
  variable: "--cs2-font-satoshi",
  display: "block",
});

/* ─── Annotation data ─── */
/* 
 ─── ANNOTATIONS CONFIGURATION GUIDE ───
 To customize annotations, modify the array below:
 
 1. Switching sides (Left vs. Right):
    Simply move the annotation object from the "left" array to the "right" array (or vice-versa).
    The text alignment and default arrow direction will adjust automatically.
 
 2. Custom Properties (per annotation):
    - top: number (Vertical position in pixels relative to the mockup screen).
    - heading: string (Note title).
    - body: string (Note body copy).
    - arrow: "left" | "right" | "none" (Explicitly force arrow direction, or hide it).
    - arrowPos: "top" | "bottom" (Place arrow above the heading, or below the body copy).
    - arrowFlipY: boolean (Set true to point the arrow downwards instead of upwards).
*/
const ANNOTATIONS: {
  screen: string;
  alt: string;
  left?: {
    top?: number;
    heading: string;
    body: string;
    arrow?: "left" | "right" | "none";
    arrowPos?: "top" | "bottom";
    arrowFlipY?: boolean;
  }[];
  right?: {
    top?: number;
    heading: string;
    body: string;
    arrow?: "left" | "right" | "none";
    arrowPos?: "top" | "bottom";
    arrowFlipY?: boolean;
  }[];
}[] = [
  {
    screen: "/mockups/A1.webp",
    alt: "Hosts List screen",
    left: [
      {
        top: 190,
        heading: "Car icon, again?",
        body: "Frames hosts as drivers, initiating a taxi mindset early.",
        arrow: "right",
        arrowPos: "top",
        arrowFlipY: false,
      },
    ],
    right: [
      {
        top: 230,
        heading: "Identical cards :(",
        body: "Every ride looks equally reliable despite different cancel risks.",
        arrow: "left",
        arrowPos: "top",
        arrowFlipY: false,
      },
    ],
  },
  {
    screen: "/mockups/A2.webp",
    alt: "Host Details screen",
    left: [
      {
        top: 130,
        heading: "Who is Sahil?",
        body: "Fails to show he is a commuter, not a professional driver.",
        arrow: "right",
        arrowPos: "bottom",
        arrowFlipY: true,
      },
      {
        top: 320,
        heading: "“Confirmed instantly”",
        body: "A confirmed booking is not a guarantee of a completed ride.",
        arrow: "right",
        arrowPos: "top",
        arrowFlipY: false,
      },
    ],
    right: [
      {
        top: 380,
        heading: "Just… call him?",
        body: "A single call button is the entire coordination system.",
        arrow: "left",
        arrowPos: "top",
        arrowFlipY: false,
      },
      {
        top: 180,
        heading: "₹550… but viable?",
        body: "Hides whether enough seats are filled to run the trip.",
        arrow: "left",
        arrowPos: "top",
        arrowFlipY: false,
      },
    ],
  },
  {
    screen: "/mockups/A3.webp",
    alt: "Booking Confirmation (Instant) screen",
    left: [
      {
        top: 90,
        heading: "“Secure your seat”?",
        body: "Implies a guarantee for a seat that is not actually secured.",
        arrow: "right",
        arrowPos: "top",
        arrowFlipY: false,
      },
      {
        top: 456,
        heading: "“I’ve booked your ride!”",
        body: "Pre-filled text frames a shared commute as a service.",
        arrow: "right",
        arrowPos: "top",
        arrowFlipY: false,
      },
    ],
  },
  {
    screen: "/mockups/A4.webp",
    alt: "Approval — Instant screen",
    left: [
      {
        top: 200,
        heading: "Celebrating too early",
        body: "A giant checkmark celebrates a guarantee the system cannot make.",
        arrow: "right",
        arrowPos: "top",
        arrowFlipY: false,
      },
    ],
    right: [
      {
        top: 450,
        heading: "Just OK?",
        body: "App let's rider to think about What's next",
        arrow: "left",
        arrowPos: "bottom",
        arrowFlipY: true,
      },
    ],
  },
  {
    screen: "/mockups/A5.webp",
    alt: "Approval — Manual screen",
    left: [
      {
        top: 261,
        heading: "“Driver”, says the app",
        body: "Calling the host a driver reinforces the taxi framing.",
        arrow: "right",
        arrowPos: "top",
        arrowFlipY: false,
      },
    ],
  },
  {
    screen: "/mockups/A6.webp",
    alt: "Ride Plan — Confirmed screen",
    right: [
      {
        top: 261,
        heading: "A dead-end plan",
        body: "Offers no live status, pickup pin, or real coordination tools.",
        arrow: "left",
        arrowPos: "top",
        arrowFlipY: false,
      },
    ],
  },
];

/* ─── SVG arrow pointing from annotation toward mockup ─── */
function ArrowToRight() {
  return (
    <svg
      width="46"
      height="32"
      viewBox="0 0 46 32"
      fill="none"
      className={styles.arAnnotationArrow}
      aria-hidden="true"
    >
      <path
        d="M4 28C12 18 22 10 40 6"
        stroke="var(--cs2-text-heading)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M35 2L42 6L36 11"
        stroke="var(--cs2-text-heading)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function ArrowToLeft() {
  return (
    <svg
      width="46"
      height="32"
      viewBox="0 0 46 32"
      fill="none"
      className={`${styles.arAnnotationArrow} ${styles.arAnnotationArrowLeft}`}
      aria-hidden="true"
    >
      <path
        d="M4 28C12 18 22 10 40 6"
        stroke="var(--cs2-text-heading)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M35 2L42 6L36 11"
        stroke="var(--cs2-text-heading)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ─── AnnotatedRail component ─── */
function AnnotatedRail() {
  const [idx, setIdx] = useState(0);
  const maxIdx = ANNOTATIONS.length - 1;

  const slideStyle: React.CSSProperties = {
    transform: `translateX(calc(112px - ${idx * 616}px))`,
    transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  return (
    <section className={styles.arSection}>
      <div className={styles.arViewport}>
        <div className={styles.arTrack} style={slideStyle}>
          {ANNOTATIONS.map((panel, pi) => {
            const isActive = pi === idx;
            return (
              <div
                className={`${styles.arPanel} ${isActive ? styles.arPanelActive : ""}`}
                key={pi}
              >
                {/* Left annotations column */}
                <div className={styles.arColLeft}>
                  {(panel.left ?? []).map((a, ai) => {
                    const arrowType = a.arrow ?? "right";
                    const arrowPos = a.arrowPos ?? "top";
                    const arrowFlipY = a.arrowFlipY ?? false;
                    const ArrowComponent =
                      arrowType === "right" ? (
                        <ArrowToRight />
                      ) : (
                        <ArrowToLeft />
                      );
                    const ArrowElement = arrowType !== "none" && (
                      <div
                        className={styles.arArrowWrap}
                        style={{
                          marginTop:
                            arrowPos === "bottom" ? "var(--cs2-space-8)" : 0,
                          marginBottom:
                            arrowPos === "top" ? "var(--cs2-space-8)" : 0,
                          transform: arrowFlipY ? "scaleY(-1)" : "none",
                        }}
                      >
                        {ArrowComponent}
                      </div>
                    );

                    return (
                      <div
                        key={ai}
                        className={styles.arNote}
                        style={{ top: a.top }}
                      >
                        {arrowPos === "top" && ArrowElement}
                        <span className={styles.arNoteHeading}>
                          {a.heading}
                        </span>
                        <p className={styles.arNoteBody}>{a.body}</p>
                        {arrowPos === "bottom" && ArrowElement}
                      </div>
                    );
                  })}
                </div>

                {/* Mockup */}
                <div className={styles.arMockup}>
                  <Image
                    src={panel.screen}
                    alt={panel.alt}
                    width={280}
                    height={608}
                    className={styles.arMockupImg}
                    loading="lazy"
                  />
                </div>

                {/* Right annotations column */}
                <div className={styles.arColRight}>
                  {(panel.right ?? []).map((a, ai) => {
                    const arrowType = a.arrow ?? "left";
                    const arrowPos = a.arrowPos ?? "top";
                    const arrowFlipY = a.arrowFlipY ?? false;
                    const ArrowComponent =
                      arrowType === "left" ? <ArrowToLeft /> : <ArrowToRight />;
                    const ArrowElement = arrowType !== "none" && (
                      <div
                        className={styles.arArrowWrap}
                        style={{
                          marginTop:
                            arrowPos === "bottom" ? "var(--cs2-space-8)" : 0,
                          marginBottom:
                            arrowPos === "top" ? "var(--cs2-space-8)" : 0,
                          transform: arrowFlipY ? "scaleY(-1)" : "none",
                        }}
                      >
                        {ArrowComponent}
                      </div>
                    );

                    return (
                      <div
                        key={ai}
                        className={styles.arNote}
                        style={{ top: a.top }}
                      >
                        {arrowPos === "top" && ArrowElement}
                        <span className={styles.arNoteHeading}>
                          {a.heading}
                        </span>
                        <p className={styles.arNoteBody}>{a.body}</p>
                        {arrowPos === "bottom" && ArrowElement}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation buttons */}
      {idx > 0 && (
        <button
          className={`${styles.arBtn} ${styles.arBtnLeft}`}
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          aria-label="Previous screen"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M11 4L6 9L11 14"
              stroke="var(--cs2-color-neutral-0)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      <button
        className={`${styles.arBtn} ${styles.arBtnRight}`}
        onClick={() => setIdx((i) => Math.min(maxIdx, i + 1))}
        aria-label="Next screen"
        style={{ opacity: idx >= maxIdx ? 0.3 : 1 }}
        disabled={idx >= maxIdx}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M7 4L12 9L7 14"
            stroke="var(--cs2-color-neutral-0)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
}

export default function CaseStudyTwoPage() {
  usePageReady();
  // Each video gets its own IntersectionObserver so every ref call
  // correctly registers an observer (the old single-shared approach
  // silently dropped videos 2-4 because observerRef.current was already set).
  const videoRefCallback = React.useCallback((el: HTMLVideoElement | null) => {
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            // Wait until the browser has buffered enough to play
            if (video.readyState >= 2) {
              video.play().catch(() => {});
            } else {
              const onCanPlay = () => {
                video.play().catch(() => {});
                video.removeEventListener("canplay", onCanPlay);
              };
              video.addEventListener("canplay", onCanPlay);
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    // Cleanup: disconnect when the element is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  // Dummy useEffect to satisfy React hook rules (no state needed here)
  useEffect(() => {
    // nothing — cleanup is per-observer inside videoRefCallback
  }, []);


  return (
    <FooterReveal
      id="case-study-one"
      className="bg-white"
      heroHeight="47.5rem"
    >
      <div
        className={`${styles.cs2Root} cs2Root ${figtree.variable} ${satoshi.variable}`}
      >
      <header className={styles.heroSection}>
        <div className={styles.heroBgImage}>
          <Image
            src="/mockups/BGHeroImg.png"
            alt="Making Shared Travel More Predictable Background"
            fill
            priority
            unoptimized
          />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.badgesRow}>
            <span className={styles.badgeText}>BEHAVIORAL DESIGN</span>
            <span
              className={`${styles.badgeDotCircle} ${styles.badgeDotGreen}`}
            ></span>
            <span className={styles.badgeText}>AI-ASSISTED</span>
            <span
              className={`${styles.badgeDotCircle} ${styles.badgeDotPurple}`}
            ></span>
            <span className={styles.badgeText}>CONCEPT</span>
            <span
              className={`${styles.badgeDotCircle} ${styles.badgeDotBlue}`}
            ></span>
            <span className={styles.badgeText}>2 WEEKS</span>
          </div>
          <h1 className={`${styles.heroTitle} cs2-t-display`}>
            Making Shared Travel More Predictable
          </h1>
          <p className={styles.heroDescription}>
            Exploring how BlaBlaCar could make shared travel feel more
            predictable without removing host flexibility.
          </p>

          <div className={styles.heroMockupContainer}>
            <Image
              src="/mockups/Hero-Mockup.webp"
              alt="Hero Mockup"
              fill
              priority
            />
          </div>
        </div>
      </header>

      <main className={styles.innerContainer}>
        {/* THE PLATFORM SECTION (Figma node 7:19) */}
        <Reveal>
          <section className={styles.platformContainer}>
            <div className={styles.platformColumns}>
              {/* COLUMN 1 */}
              <div className={styles.platformCol}>
                {/* Card 1: The Platform */}
                <div className={styles.platformCard}>
                  <h2 className={styles.platformCardTitle}>Platform</h2>
                  <p className={styles.platformCardBody}>
                    BlaBlaCar India is a peer-to-peer intercity carpool app.
                    Unlike Ola or Uber, it holds zero money, riders pay hosts
                    directly in cash or UPI. The platform earns nothing per
                    transaction.
                  </p>
                </div>

                {/* Card 2: The Constraint */}
                <div className={styles.platformCard}>
                  <h2 className={styles.platformCardTitle}>Constraint</h2>
                  <p className={styles.platformCardBodyRegular}>
                    The standard fix, charge a <strong>cancellation fee</strong>{" "}
                    but it was <strong>structurally impossible</strong>.{" "}
                    <strong>
                      No escrow. No wallet. No financial lever. The design had
                      to work without money.
                    </strong>{" "}
                    This constraint helped me thinking in interesting solutions.
                  </p>
                </div>

                {/* Card 3: The Features */}
                <div
                  className={`${styles.platformCard} ${styles.platformCardStretch} ${styles.platformCardPadding}`}
                >
                  <h2 className={styles.platformCardTitle}>Features</h2>
                  <p className={styles.platformCardBodyRegular}>
                    <strong>Trip viability meter:</strong> shows economic health
                    of the trip in real time{"\n\n"}
                    <strong>On-Route Chips:</strong> Decreases the coordination
                    regarding the pickups &amp; drop offs{"\n\n"}
                    <strong>Badge &amp; Intent Chips:</strong> Introduces new
                    trust signals for the riders.{"\n\n"}
                    <strong>Peer language :</strong> reframes the host identity
                    from driver to Route Host
                  </p>
                </div>
              </div>

              {/* COLUMN 2 */}
              <div className={styles.platformCol}>
                {/* Card 1: The Crack */}
                <div className={styles.platformCard}>
                  <h2 className={styles.platformCardTitle}>Crack</h2>
                  <p className={styles.platformCardBodyRegular}>
                    The platform confirmed a booking without confirming the
                    conditions that make a trip actually happen. Toll math
                    invisible. Expectations mismatched. Coordination outsourced
                    to strangers.
                  </p>
                </div>

                {/* Card 2: The Approach */}
                <div className={styles.platformCard}>
                  <h2 className={styles.platformCardTitle}>Approach</h2>
                  <p className={styles.platformCardBodyRegular}>
                    Three levers: information, logistics, time. Six problem
                    clusters. 20+ variants. <strong>4 prototyped</strong>{" "}
                    features. An AI-assisted workflow made it possible to go{" "}
                    <strong>wide</strong> and <strong>deep</strong>{" "}
                    simultaneously as a solo designer.
                  </p>
                </div>

                {/* Card 3: The Signal */}
                <div
                  className={`${styles.platformCard} ${styles.platformCardStretch}`}
                >
                  <h2 className={styles.platformCardTitle}>
                    The Signal{" "}
                    <span className={styles.platformCardTitleSub}>
                      9 Mixed Participants
                    </span>
                  </h2>
                  <p className={styles.platformCardBodyRegular}>
                    All 9 participants preferred seeing trip viability meter
                    upfront.{"\n\n"}7 of 9 found the On Route map clearer than
                    phone coordination. (2 still preferred phone calls 🥺)
                    {"\n\n"}
                    Participants appreciated knowing they had a fallback plan if
                    their original ride became unreliable.{"\n\n"}2 Stills needs
                    human touch to fell more confident on rides.{"\n"}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom disclaimer note */}
            <p className={styles.platformNote}>
              <span className={styles.platformNoteBold}>Note :</span> This is a
              concept project. Based on my personal experience, 500+ 1 Star
              Reviews on Google Play, and 9 Participants including both users of
              the app. No code was shipped. All validation was qualitative.
            </p>
          </section>
        </Reveal>

        {/* CONTEXT SECTION */}
        <section className={styles.sectionContainer}>
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionTag}>CONTEXT</span>
          </div>
          <Reveal>
            <div className={styles.twoColumnRow}>
              <div className={styles.leftCol}>
                <h2 className={styles.heading2}>
                  <span className={styles.unhighlighted}>BlaBlaCar lets </span>
                  <span className={styles.highlighted}>strangers</span>
                  <span className={styles.unhighlighted}>
                    {" "}
                    share long trips by filling{" "}
                  </span>
                  <span className={styles.highlighted}>empty seats</span>
                  <span className={styles.highlighted}> affordably</span>
                  <span className={styles.unhighlighted}>.</span>
                </h2>
              </div>
              <div className={styles.rightCol}>
                <p className={styles.paragraph}>
                  I&apos;ve been using BlaBlaCar for years as both a rider and a
                  host. The more I used it, the more I noticed a gap between
                  what the app communicated and what was actually happening
                  behind the scenes.
                </p>
                <p className={styles.paragraph}>
                  A booking could be approved, yet the trip could still be
                  uncertain. Seeing that gap repeatedly and experiencing it
                  myself made me want to understand where trust was breaking
                  down. That&apos;s where this project began.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className={styles.contextImageContainer}>
              <Image
                src="/mockups/Context.webp"
                alt="Context: how a BlaBlaCar trip is listed and discovered today"
                fill
                className={styles.coverImage}
                loading="lazy"
              />
            </div>
          </Reveal>
        </section>

        {/* PROBLEM */}
        <section className={styles.sectionContainer}>
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionTag}>PROBLEM</span>
          </div>
          <Reveal>
            <div className={styles.twoColumnRow}>
              <div className={styles.leftCol}>
                <h2 className={styles.heading2}>
                  <span className={styles.unhighlighted}>The </span>
                  <span className={styles.highlighted}>reviews</span>
                  <span className={styles.unhighlighted}> blamed </span>
                  <span className={styles.highlighted}>hosts.</span>
                  <span className={styles.unhighlighted}>The </span>
                  <span className={styles.highlighted}>research</span>
                  <span className={styles.unhighlighted}> didn&apos;t.</span>
                </h2>
              </div>
              <div className={styles.rightCol}>
                <p className={styles.paragraph}>
                  As a host, I believed cancellations weren&apos;t always due to bad
                  behavior. After reviewing 500+ reviews and speaking with
                  riders and hosts, I found most cancellations happened because
                  of incomplete information. Trips were approved despite factors
                  like occupancy, coordination and changing plans, making all
                  rides seem equally reliable, which broke trust.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className={styles.quoteCard}>
              <blockquote className={styles.quoteText}>
                “The cancellation wasn&apos;t always the worst part. Not knowing it
                was coming was.”
              </blockquote>
              <span className={styles.quoteSubtext}>
                — Recurring finding across 7 of 9 interviews
              </span>
            </div>
          </Reveal>

          <Reveal>
            <div className={styles.problemImageContainer}>
              <Image
                src="/mockups/problem.webp"
                alt="Problem: where the booking flow breaks rider expectations"
                fill
                className={styles.coverImage}
                loading="lazy"
              />
            </div>
          </Reveal>
        </section>

        {/* KEY INSIGHTS SECTION */}
        <section className={styles.sectionContainer}>
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionTag}>KEY INSIGHTS</span>
          </div>
          <Reveal>
            <div className={styles.insightsGrid}>
              <div
                className={styles.insightCard}
                style={
                  {
                    "--insight-stroke-color": "var(--cs2-color-purple-500)",
                  } as React.CSSProperties
                }
              >
                <h3 className={styles.insightTitle}>Economic Viability</h3>
                <p className={styles.insightDesc}>
                  One booked seat rarely covered fuel, making cancellation the
                  easiest option.
                </p>
              </div>
              <div
                className={styles.insightCard}
                style={
                  {
                    "--insight-stroke-color": "var(--cs2-color-green-300)",
                  } as React.CSSProperties
                }
              >
                <h3 className={styles.insightTitle}>Expectation Gap</h3>
                <p className={styles.insightDesc}>
                  Riders expected taxi flexibility, while hosts were just daily
                  commuters.
                </p>
              </div>
              <div
                className={styles.insightCard}
                style={
                  {
                    "--insight-stroke-color": "var(--cs2-color-blue-300)",
                  } as React.CSSProperties
                }
              >
                <h3 className={styles.insightTitle}>Coordination Burden</h3>
                <p className={styles.insightDesc}>
                  Approving bookings was simple, but pickup coordination
                  required endless calls.
                </p>
              </div>
              <div
                className={styles.insightCard}
                style={
                  {
                    "--insight-stroke-color": "var(--cs2-color-red-200)",
                  } as React.CSSProperties
                }
              >
                <h3 className={styles.insightTitle}>Hidden Uncertainty</h3>
                <p className={styles.insightDesc}>
                  Not every approved ride was reliable, yet they all looked
                  identical.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* AUDIT SECTION */}
        <section className={styles.sectionContainer}>
          <AnnotatedRail />
        </section>

        {/* OPPORTUNITY SECTION */}
        <section className={styles.sectionContainer}>
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionTag}>OPPORTUNITY</span>
          </div>
          <Reveal>
            <div className={styles.twoColumnRow}>
              <div className={styles.leftCol}>
                <h2 className={styles.heading2}>
                  <span className={styles.headingLight}>Replacing </span>
                  uncertainty
                  <span className={styles.headingLight}> with </span>
                  honest, upfront expectations
                  <span className={styles.blueDot}>.</span>
                </h2>
              </div>
              <div className={styles.rightCol}>
                <h3 className={styles.opportunityText}>
                  Three things the platform could do differently
                </h3>
                <ul className={styles.opportunityList}>
                  <li className={styles.opportunityText}>
                    <strong>Reveal trip viability:</strong> Showing whether trip
                    is economically viable before riders book, not just the
                    number of seats filled.
                  </li>
                  <li className={styles.opportunityText}>
                    <strong>Reframe the relationship:</strong> Hosts and riders
                    aren&apos;t service provider and customer. They&apos;re co-travelers
                    who happen to be sharing a car.
                  </li>
                  <li className={styles.opportunityText}>
                    <strong>Handle the coordination layer:</strong> Meet-up
                    point, route deviation, check-in window. So two strangers
                    don&apos;t have to figure it out on WhatsApp/ Call
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* CONSTRAINTS SECTION */}
        <section
          className={`${styles.sectionContainer} ${styles.invertedSection}`}
        >
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionTag}>CONSTRAINTS</span>
          </div>
          <Reveal>
            <div className={styles.twoColumnRow}>
              <div className={styles.leftCol}>
                <h2 className={styles.heading2}>
                  Where the road ended
                  <span className={styles.blueDot}>.</span>
                </h2>
                <p className={styles.constraintBodyText}>
                  Many ideas looked promising until they met the realities of
                  the platform.
                </p>
              </div>
              <div className={styles.rightCol}>
                <ul className={styles.constraintList}>
                  <li className={styles.constraintItem}>
                    <span className={styles.constraintNum}>01</span>
                    <p className={styles.constraintText}>
                      <strong>A profit is illegal on private plate.</strong>{" "}
                      Carpooling is cost-share only.
                    </p>
                  </li>
                  <li className={styles.constraintItem}>
                    <span className={styles.constraintNum}>02</span>
                    <p className={styles.constraintText}>
                      <strong>The platform hold ₹0.</strong> Cash in the car,
                      nothing to leverage.
                    </p>
                  </li>
                  <li className={styles.constraintItem}>
                    <span className={styles.constraintNum}>03</span>
                    <p className={styles.constraintText}>
                      <strong>Anyone can walk free.</strong> No penalty, no
                      lock-in.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* HOW I WORKED SECTION */}
        <section className={styles.sectionContainer}>
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionTag}>HOW I WORKED</span>
          </div>

          <Reveal>
            <div className={styles.howIWorkedRow}>
              <div className={styles.howIWorkedLeft}>
                <h2 className={`${styles.heading2} ${styles.letterSpacingTight}`}>
                  <span className={styles.unhighlighted}>Going </span>
                  <span className={styles.highlighted}>wide</span>
                  <span className={styles.unhighlighted}> and </span>
                  <span className={styles.highlighted}>deep</span>
                  <span className={styles.unhighlighted}> at the </span>
                  <span className={styles.highlighted}>same time</span>
                  <span className={styles.unhighlighted}>.</span>
                </h2>

                <p className={styles.howIWorkedQuote}>
                  &#x201C;The hard part wasn&apos;t finding ideas. It was
                  deciding which ones the product could honestly carry.&#x201D;
                </p>
              </div>

              <div className={styles.howIWorkedRight}>
                <p className={styles.howIWorkedPara}>
                  I had four clear problems from research but no obvious fix, so
                  instead of running with my first idea I tried a lot of
                  directions, money, trust, coordination, recovery. Most
                  didn&apos;t survive BlaBlaCar&apos;s constraints. AI made
                  exploring fast; deciding what was worth building was the hard
                  part. The table shows what I kept, dropped, or parked, and
                  why.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className={styles.triageStripContainer}>
              <section className={`${styles.tsRoot} ts-root`}>
                <div className="ts-card">
                  <div className="ts-eyebrow">
                    Ideas Explored, Prototyped on Mobile
                  </div>
                  <h2 className="ts-title">
                    20+ directions, narrowed to what the product could carry
                  </h2>

                  <div className="ts-legend">
                    <span>
                      <i className={styles.triageIndicatorSuccess}></i>2
                      Finalized
                    </span>
                    <span>
                      <i className={styles.triageIndicatorWarning}></i>2
                      Partial
                    </span>
                    <span>
                      <i className={styles.triageIndicatorInfo}></i>2 Parked
                    </span>
                    <span>
                      <i className={styles.triageIndicatorNeutral}></i>14
                      Discarded
                    </span>
                  </div>

                  <div className="ts-strip-wrap">
                    <div className="ts-strip">
                      {/* 1 · Trip Lock (Finalized) */}
                      <div>
                        <div
                          className="ts-phone ts-phone--final"
                          aria-hidden="true"
                        >
                          <div className="ts-zoom">
                            <div className="m-head">
                              ‹{"\u00a0"}Ride details
                            </div>
                            <div className="m-row">
                              <div className="m-avatar">SV</div>
                              <div>
                                <div className="m-name">Sohil V.</div>
                                <div className="m-sub">★ 4.9 · 14 rides</div>
                              </div>
                            </div>
                            <div className="m-note">
                              🏠{"\u00a0"}Heading home for the weekend
                            </div>
                            <div className="m-via">
                              <div className="m-via-top">
                                <span className="m-via-label">
                                  Co-Commute Viability
                                </span>
                                <span className="m-via-badge">Locked 66%</span>
                              </div>
                              <div className="m-bar">
                                <i />
                                <b></b>
                              </div>
                              <div className="m-split">
                                <span>2 of 3 seats filled</span>
                                <span>₹800 / ₹1,200</span>
                              </div>
                              <div className="m-via-note">
                                <strong>Trip Guaranteed:</strong> fuel &amp;
                                tolls covered. Sohil is 100% committed.
                              </div>
                            </div>
                            <div className="m-foot">
                              <div className="m-price">
                                <small>Total Price</small>
                                <b>₹400</b>
                              </div>
                              <span className="m-cta--blue">
                                Request to Join
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="ts-caption">
                          <b>Trip Lock</b>
                          <span className="ts-pill ts-pill--final">
                            <i />
                            Finalized
                          </span>
                        </div>
                      </div>

                      {/* 2 · Locked-in status (Finalized) */}
                      <div>
                        <div
                          className="ts-phone ts-phone--final"
                          aria-hidden="true"
                        >
                          <div className="ts-zoom">
                            <div className="m-head m-head--big">
                              ←{"\u00a0"}Sunday, 31 May
                            </div>
                            <div className="m-route">
                              <div className="m-route-line">
                                <span className="r1"></span>
                                <span className="r2"></span>
                                <span className="r3"></span>
                              </div>
                              <div className="m-route-stops">
                                <span>12:30 · Saharanpur</span>
                                <span>14:50 · Delhi</span>
                              </div>
                            </div>
                            <div className="m-statusbox">
                              <div className="m-statusbox-top">
                                <span className="m-via-label">
                                  Systemic Route Status
                                </span>
                                <span className="m-auto">Auto</span>
                              </div>
                              <div className="m-status">
                                <span className="m-dot"></span>
                                <div>
                                  <b>Going as planned</b>
                                  <span>
                                    Stable departure guaranteed via commuter
                                    patterns.
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="m-row">
                              <div className="m-avatar m-avatar-accent">
                                S
                              </div>
                              <div className="m-name">
                                Sameer{"\u00a0"}
                                <span className="m-chip-tag">Home Visit</span>
                              </div>
                            </div>
                            <div className="m-verify">
                              ✓ Verified Profile · 14 trips/mo on route
                            </div>
                            <div className="m-btn-stack">
                              <span className="m-btn-ghost">
                                💬 Contact Sameer
                              </span>
                              <span className="m-btn-book">Book</span>
                            </div>
                          </div>
                        </div>
                        <div className="ts-caption">
                          <b>Locked-in status</b>
                          <span className="ts-pill ts-pill--final">
                            <i />
                            Finalized
                          </span>
                        </div>
                      </div>

                      {/* 3 · On-route distance chips (Partial) */}
                      <div>
                        <div
                          className="ts-phone ts-phone--partial ts-phone--mapbg"
                          aria-hidden="true"
                        >
                          <div className="ts-zoom ts-zoom--flush">
                            <div className="m-map">
                              <div className="hwy"></div>
                              <div className="car">🚗</div>
                              <div className="pin"></div>
                              <svg className="walkline">
                                <line
                                  x1="0"
                                  y1="50"
                                  x2="100%"
                                  y2="0"
                                  stroke="#1e293b"
                                  strokeWidth="4"
                                  strokeDasharray="6,6"
                                />
                              </svg>
                              <div className="walker">🚶</div>
                            </div>
                            <div className="m-sheet">
                              <div className="m-grab"></div>
                              <span className="m-proto-badge">
                                Highway Protocol Active
                              </span>
                              <h5>Walk to Main Highway</h5>
                              <p>
                                To avoid 25 mins of service-lane traffic, your
                                host stays on NH-48. Walk to the pickup point.
                              </p>
                              <div className="m-walkrow">
                                <div>
                                  <b>400m Walk</b>
                                  <small>Approx. 5 mins</small>
                                </div>
                                <span className="m-nav-btn">Navigate</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ts-caption">
                          <b>On-route distance chips</b>
                          <span className="ts-pill ts-pill--partial">
                            <i />
                            Partial
                          </span>
                        </div>
                      </div>

                      {/* 4 · Route Host framing (Partial) */}
                      <div>
                        <div
                          className="ts-phone ts-phone--partial"
                          aria-hidden="true"
                        >
                          <div className="ts-zoom">
                            <div className="m-pledge-head">
                              <span>Booking Confirmation</span>
                              <span>✕</span>
                            </div>
                            <div className="m-hand">🤝</div>
                            <div className="m-pledge-title">
                              The Mezbaan-Mehmaan Pact
                            </div>
                            <div className="m-pledge-sub">
                              Not a driver and a fare, a Route Host welcoming a
                              Co-Traveler.
                            </div>
                            <div className="m-pledge-box">
                              <div className="m-pledge-row">
                                <span className="m-pledge-ico">⚖</span>
                                <span>
                                  <strong>We are equals sharing space</strong>,
                                  Rahul splits fuel; Priya chips in.
                                </span>
                              </div>
                              <div className="m-pledge-row">
                                <span className="m-pledge-ico">🚗</span>
                                <span>
                                  <strong>Rahul&apos;s Car Sanctuary</strong>
                                  <span className="m-tags">
                                    <span>Non-Smoking</span>
                                    <span>Indie Music</span>
                                    <span>AC On</span>
                                  </span>
                                </span>
                              </div>
                              <div className="m-pledge-row">
                                <span className="m-pledge-ico">📣</span>
                                <span>
                                  <strong>Communication is gold</strong>, both
                                  update each other instantly.
                                </span>
                              </div>
                            </div>
                            <span className="m-cta--purple">
                              Enter Journey with Respect ✓
                            </span>
                          </div>
                        </div>
                        <div className="ts-caption">
                          <b>Route Host framing</b>
                          <span className="ts-pill ts-pill--partial">
                            <i />
                            Partial
                          </span>
                        </div>
                      </div>

                      {/* 5 · Auto-transfer (Parked) */}
                      <div>
                        <div
                          className="ts-phone ts-phone--parked ts-phone--dark"
                          aria-hidden="true"
                        >
                          <div className="ts-zoom">
                            <div className="m-scan">
                              <div className="m-scan-ring">
                                <div className="m-scan-core">⇄</div>
                              </div>
                              <b>Host Cancelled</b>
                              <span className="blue">
                                Don&apos;t panic. Activating Route Standby.
                              </span>
                              <span className="faint">
                                Scanning 14 cars on the GGN → Noida corridor...
                              </span>
                            </div>
                            <div className="m-saved">
                              <div className="m-saved-check">✓</div>
                              <h6>Journey Saved!</h6>
                              <p>
                                Seat transferred to another host leaving 15 mins
                                later.
                              </p>
                              <div className="m-saved-row">
                                <div className="who">
                                  <div className="m-avatar m-avatar--xs">R</div>
                                  <div>
                                    <b>Rahul&apos;s Tata Nexon</b>
                                    <small>Departs 21:15 (+15m)</small>
                                  </div>
                                </div>
                                <span className="m-badge-price">
                                  Same Price
                                </span>
                              </div>
                              <span className="m-cta--darkfull">
                                View New Trip Details
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="ts-caption">
                          <b>Auto-transfer</b>
                          <span className="ts-pill ts-pill--parked">
                            <i />
                            Parked
                          </span>
                        </div>
                      </div>

                      {/* 6 · Standby rides (Parked) */}
                      <div>
                        <div
                          className="ts-phone ts-phone--parked ts-phone--dark"
                          aria-hidden="true"
                        >
                          <div className="ts-zoom">
                            <div className="m-standby-label">
                              <i />
                              Route Standby Active
                            </div>
                            <div className="m-dark-title">Gurgaon → Noida</div>
                            <div className="m-dark-sub">
                              Host: Neha S. · Departs in 1.5 hrs
                            </div>
                            <div className="m-glass">
                              <b>🛡 Urgent Travel Protected</b>
                              <p>
                                If Neha&apos;s car doesn&apos;t fill up and she
                                cancels, the community fleet auto-transfers you
                                to another car on this route.
                              </p>
                            </div>
                            <div className="m-glass m-oncall">
                              <div>
                                <small>Standby match ready</small>
                                <b>Rahul&apos;s Nexon · 21:15</b>
                              </div>
                              <span className="m-oncall-tag">ON CALL</span>
                            </div>
                            <span className="m-cta--redline">
                              Simulate Host Cancellation ▸
                            </span>
                          </div>
                        </div>
                        <div className="ts-caption">
                          <b>Standby rides</b>
                          <span className="ts-pill ts-pill--parked">
                            <i />
                            Parked
                          </span>
                        </div>
                      </div>

                      {/* 7 · Discarded */}
                      <div>
                        <div className="ts-phone ts-phone--ghost">
                          <b>+14</b>
                          <span>
                            explored &amp;
                            <br />
                            discarded
                          </span>
                        </div>
                        <div className="ts-caption ts-caption--ghost">
                          <b>
                            Didn&apos;t survive
                            <br />
                            triage
                          </b>
                        </div>
                      </div>
                    </div>
                    <div className="ts-fade"></div>
                  </div>
                </div>
              </section>
            </div>
          </Reveal>

          <Reveal>
            <div className={styles.tableContainer}>
              <div className={styles.overflowWrapper}>
                <table className={styles.exploredTable}>
                  <thead>
                    <tr>
                      <th>SOLUTION AREA</th>
                      <th>WHAT I EXPLORED</th>
                      <th>OUTCOME</th>
                      <th>VERDICT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.tableAreaCell}>
                        Financial & Regulatory
                      </td>
                      <td>
                        Fines, escrow, reliability bonds, commitment premium
                      </td>
                      <td>
                        All required holding money or behaving like a taxi
                        platform — structurally impossible with zero escrow.
                      </td>
                      <td>
                        <span
                          className={`${styles.verdictBadge} ${styles.verdictDiscarded}`}
                        >
                          <span className={styles.verdictDot} /> Discarded
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.tableAreaCell}>Accountability</td>
                      <td>Shadowbans, KYC, host status taps</td>
                      <td>
                        Added friction or depended on manual upkeep that quickly
                        goes stale.
                      </td>
                      <td>
                        <span
                          className={`${styles.verdictBadge} ${styles.verdictDiscarded}`}
                        >
                          <span className={styles.verdictDot} /> Discarded
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.tableAreaCell}>Recovery</td>
                      <td>
                        Auto-release, standby rides, auto-transfer, host status
                        update
                      </td>
                      <td>
                        Needed a route density most corridors don&apos;t have,
                        and relied on a single manual update from the host.
                      </td>
                      <td>
                        <span
                          className={`${styles.verdictBadge} ${styles.verdictParked}`}
                        >
                          <span className={styles.verdictDot} /> Parked
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.tableAreaCell}>
                        Expectation & Certainty
                      </td>
                      <td>
                        Viability signals, progress indicators, booking states
                      </td>
                      <td>
                        Trip Lock and a cohesive Locked-in status let riders
                        read uncertainty earlier — derived passively, no host
                        activity required.
                      </td>
                      <td>
                        <span
                          className={`${styles.verdictBadge} ${styles.verdictFinalized}`}
                        >
                          <span className={styles.verdictDot} /> Finalized
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.tableAreaCell}>Coordination</td>
                      <td>Route checks, pickup rules, detour controls</td>
                      <td>
                        On-route distance chips were designed and tested;
                        rule-based pickup controls were dropped.
                      </td>
                      <td>
                        <span
                          className={`${styles.verdictBadge} ${styles.verdictPartial}`}
                        >
                          <span className={styles.verdictDot} /> Partial
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.tableAreaCell}>
                        Language & Identity
                      </td>
                      <td>
                        Host framing, intent tags, commuter badges, reputation
                        signals
                      </td>
                      <td>
                        Route Host framing and intent tags were prototyped;
                        badges and scoring were dropped.
                      </td>
                      <td>
                        <span
                          className={`${styles.verdictBadge} ${styles.verdictPartial}`}
                        >
                          <span className={styles.verdictDot} /> Partial
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.tableFooter}>
              <span className={styles.footerNote}>
                Prototyped using Google Gemini and Google Stitch.
              </span>
              <a href="#solutions" className={styles.footerLink}>
                View all 20 prototypes{" "}
                <span className={styles.footerArrow}>→</span>
              </a>
            </div>
          </Reveal>
        </section>

        <div className={styles.solutionsContainer}>
          <Reveal>
            <section className={styles.solutionRow}>
              <div className={styles.solutionTextCol}>
                <span className={styles.sectionTag}>
                  <span>SOLUTION 1/4</span>
                  <span className={styles.sectionTagAccent}>
                    {" "}
                    • TRIP VIABILITY METER
                  </span>
                </span>
                <h2 className={styles.heading2}>
                  Seeing when a ride is worth the drive.
                </h2>
                <p className={styles.paragraph}>
                  A live viability meter, seat fill, lock point, and all, so
                  riders read a trip&apos;s odds at a glance and choose with
                  confidence.
                </p>
                <div className={styles.tripStateCards}>
                  <div className={`${styles.tripCard} ${styles.tripCardBlue}`}>
                    <span className={`${styles.tripDot} ${styles.tripDotBlue}`} />
                    <div className={styles.tripCardContent}>
                      <span className={`${styles.tripCardTitle} ${styles.tripTextBlue}`}>
                        Just listed
                      </span>
                      <span className={`${styles.tripCardBody} ${styles.tripTextBlue}`}>
                        New trip, no seats yet.
                      </span>
                    </div>
                  </div>
                  <div className={`${styles.tripCard} ${styles.tripCardAmber}`}>
                    <span className={`${styles.tripDot} ${styles.tripDotAmber}`} />
                    <div className={styles.tripCardContent}>
                      <span className={`${styles.tripCardTitle} ${styles.tripTextAmber}`}>
                        Filling up
                      </span>
                      <span className={`${styles.tripCardBody} ${styles.tripTextAmber}`}>
                        One more seat and it locks.
                      </span>
                    </div>
                  </div>
                  <div className={`${styles.tripCard} ${styles.tripCardGreen}`}>
                    <span className={`${styles.tripDot} ${styles.tripDotGreen}`} />
                    <div className={styles.tripCardContent}>
                      <span className={`${styles.tripCardTitle} ${styles.tripTextGreen}`}>
                        Locked in
                      </span>
                      <span className={`${styles.tripCardBody} ${styles.tripTextGreen}`}>
                        Set to go, a seat still open.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.solutionImageCol}>
                <div className={styles.solutionImageInner}>
                  <video
                    ref={videoRefCallback}
                    src="/mockups/1st%20Solution.mp4"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="/mockups/poster-1.webp"
                    className={styles.solutionVideo}
                  />
                </div>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className={`${styles.solutionRow} ${styles.reversed}`}>
              <div className={styles.solutionTextCol}>
                <span className={styles.sectionTag}>
                  <span>SOLUTION 2/4</span>
                  <span className={styles.sectionTagAccent}>
                    {" "}
                    • ON-ROUTE MAP CHIPS
                  </span>
                </span>
                <h2 className={styles.heading2}>One less reason to call.</h2>
                <p className={styles.paragraph}>
                  Most pre &amp; post trip calls are just &quot;Is my stop on
                  your way?&quot; The map answers it, so the question never has
                  to leave the screen.
                </p>

                <div className={styles.timeline}>
                  <div className={styles.timelineLine} />

                  <div className={styles.timelineItem}>
                    <div className={styles.timelineCircleWrap}>
                      <div className={`${styles.timelineCircle} ${styles.timelineCircleReused}`}>
                        <span className={`${styles.timelineNum} ${styles.timelineNumReused}`}>
                          1
                        </span>
                      </div>
                    </div>
                    <div className={styles.timelineContent}>
                      <span className={`${styles.timelineLabel} ${styles.timelineLabelReused}`}>
                        REUSED
                      </span>
                      <span className={styles.timelineTitle}>
                        Map and route
                      </span>
                    </div>
                  </div>

                  <div className={styles.timelineItem}>
                    <div className={styles.timelineCircleWrap}>
                      <div className={`${styles.timelineCircle} ${styles.timelineCircleReused}`}>
                        <span className={`${styles.timelineNum} ${styles.timelineNumReused}`}>
                          2
                        </span>
                      </div>
                    </div>
                    <div className={styles.timelineContent}>
                      <span className={`${styles.timelineLabel} ${styles.timelineLabelReused}`}>
                        REUSED
                      </span>
                      <span className={styles.timelineTitle}>
                        The rider&apos;s pin
                      </span>
                    </div>
                  </div>

                  <div className={styles.timelineItem}>
                    <div className={styles.timelineCircleWrap}>
                      <div className={`${styles.timelineCircle} ${styles.timelineCircleNew}`}>
                        <span className={`${styles.timelineNum} ${styles.timelineNumNew}`}>
                          3
                        </span>
                      </div>
                    </div>
                    <div className={styles.timelineContent}>
                      <span className={`${styles.timelineLabel} ${styles.timelineLabelNew}`}>
                        NEW
                      </span>
                      <div className={styles.timelineTitleRow}>
                        <span className={styles.timelineTitle}>
                          Closest Point
                        </span>
                        <code className={styles.timelineChip}>
                          Using Turf.js
                        </code>
                      </div>
                    </div>
                  </div>

                  <div className={styles.timelineItem}>
                    <div className={styles.timelineCircleWrap}>
                      <div className={`${styles.timelineCircle} ${styles.timelineCircleNew}`}>
                        <span className={`${styles.timelineNum} ${styles.timelineNumNew}`}>
                          4
                        </span>
                      </div>
                    </div>
                    <div className={styles.timelineContent}>
                      <span className={`${styles.timelineLabel} ${styles.timelineLabelNew}`}>
                        NEW
                      </span>
                      <span className={styles.timelineTitle}>
                        The dashed line
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.solutionImageCol}>
                <div
                  className={`${styles.solutionImageInner} ${styles.solutionImageInnerTall}`}
                >
                  <video
                    ref={videoRefCallback}
                    src="/mockups/2nd%20Solution.mp4"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="/mockups/poster-2.webp"
                    className={`${styles.solutionVideo} ${styles.solutionVideoContain}`}
                  />
                </div>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className={styles.solutionRow}>
              <div className={styles.solutionTextCol}>
                <span className={styles.sectionTag}>
                  <span>SOLUTION 3/4</span>
                  <span className={styles.sectionTagAccent}>
                    {" "}
                    • BADGE & INTENT CHIPS
                  </span>
                </span>
                <h2 className={styles.heading2}>
                  Know who you&apos;re riding with.
                </h2>
                <p className={styles.paragraph}>
                  Hosts used to look identical. A Frequent host badge shows
                  who&apos;s a regular on the route, an intent icon shows why
                  they&apos;re driving. Enough to trust a host at a glance, and
                  to see a commuter, not a cab.
                </p>

                <div className={styles.timeline}>
                  <div className={styles.timelineLineIcon} />

                  <div className={styles.timelineItem}>
                    <div className={styles.timelineCircleWrap}>
                      <div className={styles.iconStepperDotWrap}>
                        <div className={styles.iconStepperDot} />
                      </div>
                    </div>
                    <div
                      className={`${styles.timelineContent} ${styles.timelineContentAlign}`}
                    >
                      <span className={styles.iconStepperPill}>
                        Frequent host
                      </span>
                    </div>
                  </div>

                  <div className={styles.timelineItem}>
                    <div className={styles.timelineCircleWrap}>
                      <div className={styles.iconStepperNode}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip_briefcase)">
                            <path
                              d="M16.6583 5.83032H3.33167C2.41165 5.83032 1.66583 6.57614 1.66583 7.49616V15.8253C1.66583 16.7453 2.41165 17.4912 3.33167 17.4912H16.6583C17.5783 17.4912 18.3242 16.7453 18.3242 15.8253V7.49616C18.3242 6.57614 17.5783 5.83032 16.6583 5.83032Z"
                              stroke="black"
                              strokeWidth="1.66572"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.3267 17.4913V4.16461C13.3267 3.72281 13.1512 3.29909 12.8388 2.98669C12.5263 2.67429 12.1026 2.49878 11.6608 2.49878H8.32916C7.88736 2.49878 7.46365 2.67429 7.15124 2.98669C6.83884 3.29909 6.66333 3.72281 6.66333 4.16461V17.4913"
                              stroke="black"
                              strokeWidth="1.66572"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip_briefcase">
                              <rect width="19.99" height="19.99" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div
                      className={`${styles.timelineContent} ${styles.timelineContentAlign10}`}
                    >
                      <span className={styles.iconStepperLabel}>
                        Work commute
                      </span>
                    </div>
                  </div>

                  <div className={styles.timelineItem}>
                    <div className={styles.timelineCircleWrap}>
                      <div className={styles.iconStepperNode}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.4986 7.49619L9.99485 1.66577L17.4911 7.49619V16.6583C17.4911 17.1001 17.3156 17.5238 17.0032 17.8362C16.6908 18.1486 16.2671 18.3241 15.8253 18.3241H4.16443C3.72262 18.3241 3.29891 18.1486 2.98651 17.8362C2.6741 17.5238 2.4986 17.1001 2.4986 16.6583V7.49619Z"
                            stroke="black"
                            strokeWidth="1.66572"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.49628 18.3237V9.99512H12.4934V18.3237"
                            stroke="black"
                            strokeWidth="1.66572"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div
                      className={`${styles.timelineContent} ${styles.timelineContentAlign10}`}
                    >
                      <span className={styles.iconStepperLabel}>
                        Heading home
                      </span>
                    </div>
                  </div>

                  <div className={styles.timelineItem}>
                    <div className={styles.timelineCircleWrap}>
                      <div className={styles.iconStepperNode}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip_compass)">
                            <path
                              d="M9.99488 18.3241C14.5949 18.3241 18.324 14.595 18.324 9.99494C18.324 5.39487 14.5949 1.66577 9.99488 1.66577C5.3948 1.66577 1.66571 5.39487 1.66571 9.99494C1.66571 14.595 5.3948 18.3241 9.99488 18.3241Z"
                              stroke="black"
                              strokeWidth="1.66572"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.5261 6.46338L11.7604 11.7604L6.46344 13.526L8.2291 8.22904L13.5261 6.46338Z"
                              stroke="black"
                              strokeWidth="1.66572"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip_compass">
                              <rect width="19.99" height="19.99" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div
                      className={`${styles.timelineContent} ${styles.timelineContentAlign10}`}
                    >
                      <span className={styles.iconStepperLabel}>
                        Weekend trip
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.solutionImageCol}>
                <div className={styles.solutionImageInner}>
                  <video
                    ref={videoRefCallback}
                    src="/mockups/3rd%20Solution.mp4"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="/mockups/poster-3.webp"
                    className={styles.solutionVideo}
                  />
                </div>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className={`${styles.solutionRow} ${styles.reversed}`}>
              <div className={styles.solutionTextCol}>
                <span className={styles.sectionTag}>
                  <span>SOLUTION 4/4</span>
                  <span className={styles.sectionTagAccent}>
                    {" "}
                    • COPY
                  </span>
                </span>
                <h2 className={styles.heading2}>Carpool, not Cab.</h2>
                <p className={styles.paragraph}>
                  Every word that sounded like a taxi got retired. Driver became
                  host, passenger became co-traveller, the fare became a cost to
                  share.
                </p>

                <div className={styles.wordTable}>
                  <div className={styles.wordRow}>
                    <span className={styles.wordOld}>Driver</span>
                    <span className={styles.wordArrow}>→</span>
                    <span className={styles.wordNew}>Host</span>
                  </div>
                  <div className={styles.wordRow}>
                    <span className={styles.wordOld}>Book now</span>
                    <span className={styles.wordArrow}>→</span>
                    <span className={styles.wordNew}>Join journey</span>
                  </div>
                  <div className={styles.wordRow}>
                    <span className={styles.wordOld}>Passenger</span>
                    <span className={styles.wordArrow}>→</span>
                    <span className={styles.wordNew}>Co-traveller</span>
                  </div>
                  <div className={styles.wordRow}>
                    <span className={styles.wordOld}>Price</span>
                    <span className={styles.wordArrow}>→</span>
                    <span className={styles.wordNew}>Cost share</span>
                  </div>
                  <div className={`${styles.wordRow} ${styles.wordRowTall}`}>
                    <span className={styles.wordOld}>
                      Booked! Enjoy your ride
                    </span>
                    <span className={styles.wordArrow}>→</span>
                    <span className={styles.wordNew}>You&apos;re in!</span>
                  </div>
                  <div className={`${styles.wordRow} ${styles.wordRowLast}`}>
                    <span className={styles.wordOld}>Ratings</span>
                    <span className={styles.wordArrow}>→</span>
                    <span className={styles.wordNew}>Reviews</span>
                  </div>
                </div>
              </div>
              <div className={styles.solutionImageCol}>
                <div className={styles.solutionImageInner}>
                  <video
                    ref={videoRefCallback}
                    src="/mockups/4th%20Solution.mp4"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="/mockups/poster-4.webp"
                    className={styles.solutionVideo}
                  />
                </div>
              </div>
            </section>
          </Reveal>
        </div>

        <section className={styles.sectionContainer}>
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionTag}>
              <span className={styles.darkEyebrowText}>VALIDATION</span>
            </span>
          </div>

          <Reveal>
            <div className={styles.validationTopRow}>
              <div className={styles.validationTopLeft}>
                <span className={styles.unhighlighted}>
                  I tested this with{" "}
                </span>
                <span className={styles.highlighted}>9 real users</span>
                <span className={styles.unhighlighted}>. Mix of both </span>
                <span className={styles.highlighted}>riders</span>
                <span className={styles.unhighlighted}> &amp; </span>
                <span className={styles.highlighted}>hosts</span>
                <span className={styles.unhighlighted}>.</span>
              </div>
              <div className={styles.validationTopRight}>
                I sat down with 9 active BlaBlaCar users across Delhi, Dehradun
                & Chandigarh to see if these designs actually made them feel
                safer booking or publishing
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className={styles.validationStatsRow}>
              <div className={`${styles.validationStatCard} ${styles.valCardGreen}`}>
                <div className={`${styles.statNumber} ${styles.valTextGreen}`}>
                  9/9
                </div>
                <div className={styles.statDesc}>
                  Prefer seeing number of locked seats booked upfront.
                </div>
              </div>

              <div className={`${styles.validationStatCard} ${styles.valCardBlue}`}>
                <div className={`${styles.statNumber} ${styles.valTextBlue}`}>
                  7/9
                </div>
                <div className={styles.statDesc}>
                  Prefer distance chip over calling host to ask if they&apos;re
                  on their route.
                </div>
              </div>

              <div className={`${styles.validationStatCard} ${styles.valCardAmber}`}>
                <div className={`${styles.statNumber} ${styles.valTextAmber}`}>
                  2/9
                </div>
                <div className={styles.statDesc}>
                  Still want to call; some need human contact for confidence.
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className={styles.sectionContainer}>
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionTag}>
              <span className={styles.darkEyebrowText}>TRADE-OFF&apos;s</span>
            </span>
          </div>

          <Reveal>
            <div className={styles.tradeoffGrid}>
              <div
                className={`${styles.tradeoffCard} ${styles.tradeoffCardAmberFill}`}
              >
                <span className={styles.tradeoffTitle}>Trip Lock</span>
                <span className={styles.tradeoffDesc}>
                  Empty trips seem inactive, which can discourage early bookings
                  and slow new rides.
                </span>
              </div>
              <div
                className={`${styles.tradeoffCard} ${styles.tradeoffCardAmberFill}`}
              >
                <span className={styles.tradeoffTitle}>On Route Chips</span>
                <span className={styles.tradeoffDesc}>
                  Seeing how close they are, a rider might expect a small
                  detour, which adds to the host&apos;s load instead of easing
                  it.
                </span>
              </div>
              <div
                className={`${styles.tradeoffCard} ${styles.tradeoffCardAmberFill}`}
              >
                <span className={styles.tradeoffTitle}>
                  Frequent Host Badge
                </span>
                <span className={styles.tradeoffDesc}>
                  Unfair to new hosts. Starting with 0 rides makes you look
                  untrustworthy from day one.
                </span>
              </div>
              <div
                className={`${styles.tradeoffCard} ${styles.tradeoffCardAmberFill}`}
              >
                <span className={styles.tradeoffTitle}>Intent Chips</span>
                <span className={styles.tradeoffDesc}>
                  Showing why a host drives also reveals a bit of their routine,
                  which not every host wants to share.
                </span>
              </div>
            </div>
          </Reveal>
        </section>

        <section className={styles.sectionContainer}>
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionTag}>REFLECTION</span>
          </div>

          <Reveal>
            <div
              className={`${styles.tradeoffGrid} ${styles.tradeoffGridThree}`}
            >
              <div
                className={`${styles.tradeoffCard} ${styles.tradeoffCardGreenFill}`}
              >
                <span className={styles.tradeoffTitle}>
                  Simple beats clever.
                </span>
                <span className={styles.tradeoffDesc}>
                  Most of the time the simple line worked better than the clever
                  one. I kept writing fancy copy and then deleting it.
                </span>
              </div>
              <div
                className={`${styles.tradeoffCard} ${styles.tradeoffCardGreenFill}`}
              >
                <span className={styles.tradeoffTitle}>
                  The cut is the work.
                </span>
                <span className={styles.tradeoffDesc}>
                  Some of my best calls were dropping stuff I&apos;d already
                  built, the guilt-trip cancel screen, the pulsing card, the
                  four-state status.
                </span>
              </div>
              <div
                className={`${styles.tradeoffCard} ${styles.tradeoffCardGreenFill}`}
              >
                <span className={styles.tradeoffTitle}>
                  Words are design too.
                </span>
                <span className={styles.tradeoffDesc}>
                  Honestly, most of this was just better words and a few real
                  changes, and I&apos;m okay with that.
                </span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* WHAT'S NEXT SECTION */}
        <section className={styles.sectionContainer}>
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionTag}>WHAT&apos;s NEXT</span>
          </div>

          <Reveal>
            <div
              className={`${styles.tradeoffGrid} ${styles.tradeoffGridThree}`}
            >
              <div
                className={`${styles.tradeoffCard} ${styles.tradeoffCardBlueFill}`}
              >
                <span className={styles.tradeoffTitle}>
                  Measure what matters.
                </span>
                <span className={styles.tradeoffDesc}>
                  Measure the two things it&apos;s meant to cut, last-minute
                  cancellations and pre-trip calls, against the app as it is
                  now.
                </span>
              </div>
              <div
                className={`${styles.tradeoffCard} ${styles.tradeoffCardBlueFill}`}
              >
                <span className={styles.tradeoffTitle}>
                  Give hosts an early out.
                </span>
                <span className={styles.tradeoffDesc}>
                  A simple way for hosts to flag a problem early, instead of
                  going quiet on the rider.
                </span>
              </div>
              <div
                className={`${styles.tradeoffCard} ${styles.tradeoffCardBlueFill}`}
              >
                <span className={styles.tradeoffTitle}>
                  No dead ends for riders.
                </span>
                <span className={styles.tradeoffDesc}>
                  If a trip still falls through, give the rider a next step, not
                  silence.
                </span>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      </div>
    </FooterReveal>
  );
}
