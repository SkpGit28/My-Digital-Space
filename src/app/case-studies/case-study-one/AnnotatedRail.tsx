"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

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
export default function AnnotatedRail() {
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
