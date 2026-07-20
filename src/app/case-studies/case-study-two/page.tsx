"use client";

/**
 * CASE STUDY 1 — Trust Over Revenue.
 *
 * One argument, courtroom framing: I don't defend the design, I defend the
 * solution. Two conflicts carry the whole study (CASE 01: the revenue banner,
 * CASE 02: the profile form), backed by the paper trail, the exhibits, and
 * the verdict. Built on Case Study 2's template: same tokens, same CSS
 * module, same hero shell and section grammar. Only copy and evidence differ.
 */

import React from "react";
import { Figtree } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
import Reveal from "@/Components/Reveal";
import { usePageReady } from "@/lib/usePageReady";
import { FooterReveal } from "@/Components/SiteFooter";

// Case Study 2's design system — single source of truth for both studies
import "../case-study-one/tokens.css";
import "../case-study-one/typography.css";
import styles from "../case-study-one/page.module.css";

// The two conflicts + supporting evidence
import EvidenceLocker from "@/Components/EvidenceLocker";
import ProfilePivot from "@/Components/ProfilePivot";
import Ecosystem from "@/Components/Ecosystem";

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

export default function TrustRevenueCaseStudy() {
  usePageReady();
  return (
    <FooterReveal
      id="case-study-two"
      className="bg-white"
      heroHeight="760px"
    >
      <div
        className={`${styles.cs2Root} cs2Root ${figtree.variable} ${satoshi.variable}`}
      >
      {/* HERO — 100vh with overflow hidden so the mockup's bottom edge clips
          behind the next section, matching case-study-one's treatment. */}
      <header className={styles.heroSection}>
        <div className={styles.heroBgImage}>
          <Image
            src="/mockups/cs2-hero-bg.png"
            alt="Navigating Product Conflicts background"
            fill
            priority
            unoptimized
          />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.badgesRow}>
            <span className={styles.badgeText}>UX RESEARCH</span>
            <span className={`${styles.badgeDotCircle} ${styles.badgeDotGreen}`}></span>
            <span className={styles.badgeText}>FINTECH</span>
            <span className={`${styles.badgeDotCircle} ${styles.badgeDotPurple}`}></span>
            <span className={styles.badgeText}>0 → 1</span>
            <span className={`${styles.badgeDotCircle} ${styles.badgeDotBlue}`}></span>
            <span className={styles.badgeText}>12 WEEKS</span>
          </div>
          <h1 className={`${styles.heroTitle} cs2-t-display`}>
            Trust Over Revenue
          </h1>
          <p className={styles.heroDescription}>
            I don&apos;t defend the design. I defend the solution. Two conflicts
            from a fintech build that processed ₹1.5Cr in its first month.
          </p>

          {/* Mockup — scaled up so its bottom edge clips behind the next
              section, matching case-study-one's hero treatment. */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "52rem",
              maxWidth: "100%",
              marginTop: "var(--cs2-space-64)",
            }}
          >
            <Image
              src="/Card2mockup.svg"
              alt="Navigating Product Conflicts hero mockup"
              width={678}
              height={353}
              priority
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      </header>

      <main className={styles.innerContainer}>
        {/* THE GIST (same 6-card grid as CS2) */}
        <Reveal>
          <section className={styles.platformContainer}>
            <div className={styles.platformColumns}>
              {/* COLUMN 1 */}
              <div className={styles.platformCol}>
                <div className={styles.platformCard}>
                  <h2 className={styles.platformCardTitle}>Platform</h2>
                  <p className={styles.platformCardBody}>
                    Merchant Payments. An intercity network where stall owners
                    and their proxy staff settle daily payments. High volume,
                    tight cash cycles, zero patience for friction. One designer
                    (me), 1 PM, 2 devs, 12 weeks.
                  </p>
                </div>

                <div className={styles.platformCard}>
                  <h2 className={styles.platformCardTitle}>Constraint</h2>
                  <p className={styles.platformCardBodyRegular}>
                    A decade of burned trust. Merchants had tried and abandoned
                    platform after platform. Every screen had to earn{" "}
                    <strong>instant reliability</strong> without touching their
                    daily cash routine.
                  </p>
                </div>

                <div
                  className={`${styles.platformCard} ${styles.platformCardStretch} ${styles.platformCardPadding}`}
                >
                  <h2 className={styles.platformCardTitle}>Features</h2>
                  <p className={styles.platformCardBodyRegular}>
                    <strong>Cash Flow Tracker:</strong> settlement timelines and
                    earnings in real time.{"\n\n"}
                    <strong>Proxy Controls:</strong> hard operational bounds for
                    delegated staff.{"\n\n"}
                    <strong>Compliance Locker:</strong> verification and
                    approval logs in plain sight.{"\n\n"}
                    <strong>Identity Hub:</strong> a status report that unblocks
                    payments, not a settings page.
                  </p>
                </div>
              </div>

              {/* COLUMN 2 */}
              <div className={styles.platformCol}>
                <div className={styles.platformCard}>
                  <h2 className={styles.platformCardTitle}>Crack</h2>
                  <p className={styles.platformCardBodyRegular}>
                    Adoption was never blocked by missing features. It was
                    blocked by uncertainty: cash settlements, approval delays,
                    cryptic errors. <strong>Trust</strong> was the growth lever.
                  </p>
                </div>

                <div className={styles.platformCard}>
                  <h2 className={styles.platformCardTitle}>Approach</h2>
                  <p className={styles.platformCardBodyRegular}>
                    Twice in this build, someone challenged the design. Both
                    times I refused to defend it. I{" "}
                    <strong>prototyped the alternatives</strong> and defended
                    the solution instead. Both fights are below.
                  </p>
                </div>

                <div
                  className={`${styles.platformCard} ${styles.platformCardStretch}`}
                >
                  <h2 className={styles.platformCardTitle}>Signal</h2>
                  <p className={styles.platformCardBodyRegular}>
                    <strong>₹1.5Cr</strong> processed in month one.{"\n\n"}
                    Operational stability, speed, and clarity beat the feature
                    checklist.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* CASE 01 — the revenue banner */}
        <section className={styles.sectionContainer}>
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionTag}>CASE 01</span>
          </div>
          <Reveal>
            <div className={styles.twoColumnRow}>
              <div className={styles.leftCol}>
                <h2 className={styles.heading2}>
                  <span className={styles.unhighlighted}>The </span>
                  <span className={styles.highlighted}>banner</span>
                  <span className={styles.unhighlighted}> everyone </span>
                  <span className={styles.highlighted}>wanted</span>
                  <span className={styles.unhighlighted}>.</span>
                </h2>
              </div>
              <div className={styles.rightCol}>
                <p className={styles.paragraph}>
                  Early wireframes. The PM wanted a big transactional banner
                  pushing payments at the exact moment users were most unsure.
                  I didn&apos;t argue taste. I prototyped both directions with
                  AI tools and let the evidence testify: guidance close to the
                  action reduced hesitation, the banner added pressure. The
                  banner lost.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <EvidenceLocker />
          </Reveal>
        </section>

        {/* CASE 02 — the profile form */}
        <section className={styles.sectionContainer}>
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionTag}>CASE 02</span>
          </div>
          <Reveal>
            <div className={styles.twoColumnRow}>
              <div className={styles.leftCol}>
                <h2 className={styles.heading2}>
                  <span className={styles.unhighlighted}>The </span>
                  <span className={styles.highlighted}>form</span>
                  <span className={styles.unhighlighted}> nobody asked to </span>
                  <span className={styles.highlighted}>remove</span>
                  <span className={styles.unhighlighted}>.</span>
                </h2>
              </div>
              <div className={styles.rightCol}>
                <p className={styles.paragraph}>
                  The safe move was a standard Edit Profile form. Correct
                  pattern, wrong solution. The owner never logs in; their staff
                  does, mid-rush, trying to unblock a payment, not browse
                  settings. So the profile became a status report: spot the
                  expired document, fix it, keep the money moving. Nobody asked
                  me to remove the form. The solution did.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <ProfilePivot />
          </Reveal>
        </section>

        {/* PAPER TRAIL — the full working file */}
        <section className={styles.sectionContainer}>
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionTag}>PAPER TRAIL</span>
          </div>
          <Reveal>
            <p className={styles.paragraph}>
              Every flow, every dead end, every revision. The full working
              file, unedited.
            </p>
            <div className="flex justify-center mt-8">
              <iframe
                style={{ border: "1px solid rgba(0, 0, 0, 0.08)" }}
                width="1156"
                height="450"
                src="https://embed.figma.com/board/ORiTOi4B8WngVloxuRNs1K/FlowsOnly?node-id=0-1&embed-host=share"
                allowFullScreen
                className="rounded-[12px] w-full"
              />
            </div>
          </Reveal>
        </section>

        {/* EXHIBITS — shipped screens */}
        <section className={styles.sectionContainer}>
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionTag}>EXHIBITS</span>
          </div>
          <Reveal>
            <Ecosystem />
          </Reveal>
        </section>

        {/* OUTCOME */}
        <section className={styles.sectionContainer}>
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionTag}>OUTCOME</span>
          </div>
          <Reveal>
            <div className={styles.twoColumnRow}>
              <div className={styles.leftCol}>
                <h2 className={styles.heading2}>
                  <span className={styles.highlighted}>₹1.5Cr</span>
                  <span className={styles.unhighlighted}> processed in </span>
                  <span className={styles.highlighted}>month one</span>
                  <span className={styles.unhighlighted}>.</span>
                </h2>
              </div>
              <div className={styles.rightCol}>
                <p className={styles.paragraph}>
                  The web app grew into a native mobile app, meeting merchants
                  where they work. One widget settled ₹1.2Cr in five weeks with
                  zero &quot;where is my money?&quot; tickets.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* LEARNINGS */}
        <section className={styles.sectionContainer}>
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionTag}>LEARNINGS</span>
          </div>
          <Reveal>
            <div className={`${styles.tradeoffGrid} ${styles.tradeoffGridThree}`}>
              <div className={`${styles.tradeoffCard} ${styles.tradeoffCardGreenFill}`}>
                <span className={styles.tradeoffTitle}>
                  The design lost twice.
                </span>
                <span className={styles.tradeoffDesc}>
                  Both times the shipped thing was better than the defended
                  thing. That&apos;s the job.
                </span>
              </div>
              <div className={`${styles.tradeoffCard} ${styles.tradeoffCardGreenFill}`}>
                <span className={styles.tradeoffTitle}>
                  Clarity beats reassurance.
                </span>
                <span className={styles.tradeoffDesc}>
                  Merchants didn&apos;t want promises. They wanted to see where
                  the money was, every hour of the day.
                </span>
              </div>
              <div className={`${styles.tradeoffCard} ${styles.tradeoffCardGreenFill}`}>
                <span className={styles.tradeoffTitle}>
                  Evidence ends arguments.
                </span>
                <span className={styles.tradeoffDesc}>
                  A quick prototype of both directions closed debates that
                  opinions kept open.
                </span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* TRADEOFFS */}
        <section className={styles.sectionContainer}>
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionTag}>TRADEOFFS</span>
          </div>
          <Reveal>
            <div className={`${styles.tradeoffGrid} ${styles.tradeoffGridThree}`}>
              <div className={`${styles.tradeoffCard} ${styles.tradeoffCardAmberFill}`}>
                <span className={styles.tradeoffTitle}>
                  Simplified on purpose.
                </span>
                <span className={styles.tradeoffDesc}>
                  Advanced capabilities were cut from phase one to protect
                  clarity and speed.
                </span>
              </div>
              <div className={`${styles.tradeoffCard} ${styles.tradeoffCardAmberFill}`}>
                <span className={styles.tradeoffTitle}>
                  Web shipped first.
                </span>
                <span className={styles.tradeoffDesc}>
                  The native app waited until the platform had earned trust on
                  the counter, not before.
                </span>
              </div>
              <div className={`${styles.tradeoffCard} ${styles.tradeoffCardAmberFill}`}>
                <span className={styles.tradeoffTitle}>
                  Opinionated defaults.
                </span>
                <span className={styles.tradeoffDesc}>
                  Proxy staff got hard bounds, not settings. Fewer choices,
                  fewer errors.
                </span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* WHAT'S NEXT */}
        <section className={styles.sectionContainer}>
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionTag}>WHAT&apos;s NEXT</span>
          </div>
          <Reveal>
            <div className={`${styles.tradeoffGrid} ${styles.tradeoffGridThree}`}>
              <div className={`${styles.tradeoffCard} ${styles.tradeoffCardBlueFill}`}>
                <span className={styles.tradeoffTitle}>
                  Reopen the docket.
                </span>
                <span className={styles.tradeoffDesc}>
                  The capabilities simplified in phase one return as the
                  platform scales.
                </span>
              </div>
              <div className={`${styles.tradeoffCard} ${styles.tradeoffCardBlueFill}`}>
                <span className={styles.tradeoffTitle}>
                  Follow the behavior.
                </span>
                <span className={styles.tradeoffDesc}>
                  Merchant habits will outgrow phase one. The design has to
                  follow them, not the roadmap.
                </span>
              </div>
              <div className={`${styles.tradeoffCard} ${styles.tradeoffCardBlueFill}`}>
                <span className={styles.tradeoffTitle}>
                  Predict, don&apos;t react.
                </span>
                <span className={styles.tradeoffDesc}>
                  Settlement clarity earned adoption. The next win is flagging
                  issues before merchants ever see them.
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
