"use client";

/**
 * PAGE TRANSITION — Row Cascade everywhere, including the very first load.
 *
 * Horizontal bars grow in from the left, top → bottom, then drain out
 * to the right. The gradient wall stays visible until the new page
 * signals readiness via the "page-ready" custom event (usePageReady hook).
 *
 * Entry transition: a fresh visit (typed URL, hard refresh, first hit on
 * the site) arrives already covered by the same wall — there's nothing to
 * hide yet, so it skips straight to the "held" state — then drains away
 * via the exact same revealWithRows() used between pages, once that first
 * page's own usePageReady() fires. See earlyPageReadyFired below for why
 * that listener has to be armed before React even starts rendering.
 */

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { EASE } from "@/lib/constants";
const SAFETY_MS = 2000;

/**
 * On the very first render of the whole app, the page component (a child
 * of PageTransition, via `children`) mounts its usePageReady() effect
 * BEFORE PageTransition's own effects — React commits child effects
 * before parent effects. That means the leading "page-ready" dispatch can
 * fire before PageTransition has attached its listener. This flag is set
 * at module-evaluation time — before React begins committing anything —
 * so it reliably catches that leading-edge event; PageTransition checks it
 * on mount and reveals immediately if it was already missed.
 */
let earlyPageReadyFired = false;
if (typeof window !== "undefined") {
  const catchEarly = () => {
    earlyPageReadyFired = true;
    window.removeEventListener("page-ready", catchEarly);
  };
  window.addEventListener("page-ready", catchEarly);
}

/* Brand ramp: #0d99ff → #1f9d5e → #a78bfa */
function rampRGB(t: number): [number, number, number] {
  const c0 = [13, 153, 255];
  const c1 = [31, 157, 94];
  const c2 = [167, 139, 250];
  const mix = (a: number[], b: number[], k: number): [number, number, number] => [
    Math.round(a[0] + (b[0] - a[0]) * k),
    Math.round(a[1] + (b[1] - a[1]) * k),
    Math.round(a[2] + (b[2] - a[2]) * k),
  ];
  const k = Math.min(1, Math.max(0, t));
  return k < 0.5 ? mix(c0, c1, k * 2) : mix(c1, c2, (k - 0.5) * 2);
}
function rampCSS(t: number): string {
  const [r, g, b] = rampRGB(t);
  return `rgb(${r},${g},${b})`;
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/* ═══════════════════  Row Cascade  ═══════════════════ */

const ROW_HEIGHT = 46;
const ROW_STAGGER_MS = 10;
const ROW_DURATION_MS = 380;
const ROW_CUBIC = `cubic-bezier(${EASE.join(",")})`;

function RowCascadeOverlay({ phase }: { phase: "cover" | "held" | "reveal" | "idle" }) {
  const [rows, setRows] = useState(0);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const measure = () => setRows(Math.ceil(window.innerHeight / ROW_HEIGHT));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (phase !== "cover") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting animation arm state on phase change is intentional
      setArmed(false);
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- double-rAF re-arm depends on the freshly covered DOM
    setArmed(false);
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setArmed(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [phase]);

  if (phase === "idle") return null;

  // Before the row count is measured (the very first paint of a fresh
  // load), render one gradient wall instead of returning null. This is
  // what makes the entry transition flash-free: the cover is present from
  // the first pixel painted — SSR included — with no dependency on the
  // measurement effect below ever having run. cover/reveal always have a
  // measured row count by the time they happen (they're only ever
  // triggered from effects/handlers, well after mount), so this fallback
  // is exclusively for the entry case.
  if (rows === 0) {
    if (phase !== "held") return null;
    return (
      <div
        className="pointer-events-none fixed inset-0 z-[9999]"
        style={{ background: `linear-gradient(180deg, ${rampCSS(0)}, ${rampCSS(0.5)}, ${rampCSS(1)})` }}
      />
    );
  }

  const filled = phase === "cover" || phase === "held";
  const entering = phase === "cover";

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {Array.from({ length: rows }).map((_, i) => {
        const rowState: React.CSSProperties = filled
          ? {
              transform: `scaleX(${entering && !armed ? 0 : 1})`,
              transformOrigin: "left",
              transition: entering ? `transform ${ROW_DURATION_MS}ms ${ROW_CUBIC} ${i * ROW_STAGGER_MS}ms` : "none",
            }
          : {
              transform: "scaleX(0)",
              transformOrigin: "right",
              transition: `transform ${ROW_DURATION_MS}ms ${ROW_CUBIC} ${i * ROW_STAGGER_MS}ms`,
            };
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: i * ROW_HEIGHT,
              left: 0,
              right: 0,
              height: ROW_HEIGHT + 1,
              backgroundColor: rampCSS(i / rows),
              ...rowState,
            }}
          />
        );
      })}
    </div>
  );
}

function rowCascadeTotalMs(): number {
  const rows = Math.ceil(window.innerHeight / ROW_HEIGHT);
  return (rows - 1) * ROW_STAGGER_MS + ROW_DURATION_MS + 60;
}

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const prevPathnameRef = useRef(pathname);
  const reduceRef = useRef(false);

  // Entry state: start already covered ("held", no grow-in needed — nothing
  // was visible yet) unless the visitor has prefers-reduced-motion set, in
  // which case skip the cover entirely. Checked synchronously here (not in
  // an effect) so it's part of the very first render, SSR included.
  const [rowPhase, setRowPhase] = useState<"idle" | "cover" | "held" | "reveal">(() => {
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return reduced ? "idle" : "held";
  });

  // Mirrors rowPhase's initial read: true only when the page actually
  // arrived covered, so the page-ready effect below knows to reveal it.
  // Click-nav and back/forward set this to true themselves, later.
  const navigatedRef = useRef(rowPhase === "held");

  useEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Safety net for the entry cover specifically: if the leading-edge catch
  // above and the live listener below somehow both miss it, don't leave
  // the visitor stuck behind the wall.
  useEffect(() => {
    if (!navigatedRef.current) return;
    const t = setTimeout(() => {
      if (navigatedRef.current) {
        navigatedRef.current = false;
        revealWithRows();
      }
    }, SAFETY_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- entry-only, deliberately runs once on mount
  }, []);

  const coverWithRows = () => {
    setRowPhase("cover");
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setRowPhase("held");
        resolve();
      }, rowCascadeTotalMs());
    });
  };

  const revealWithRows = () => {
    setRowPhase("reveal");
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setRowPhase("idle");
        resolve();
      }, rowCascadeTotalMs());
    });
  };

  // Listen for "page-ready" event from usePageReady hook in each page.
  // When the new page signals it's ready, reveal the transition.
  useEffect(() => {
    const onPageReady = () => {
      if (navigatedRef.current) {
        navigatedRef.current = false;
        revealWithRows();
      }
    };

    // The entry cover's own page-ready may have already fired and been
    // caught by the module-level listener before this effect attached —
    // act on it now instead of waiting for an event that already happened.
    if (earlyPageReadyFired) onPageReady();

    window.addEventListener("page-ready", onPageReady);
    return () => window.removeEventListener("page-ready", onPageReady);
  }, []);

  // Intercept internal link clicks.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (reduceRef.current) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement)?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (/^https?:\/\//i.test(href) && !href.startsWith(window.location.origin)) return;
      if (href === pathname) return;

      e.preventDefault();
      navigatedRef.current = true;

      coverWithRows().then(async () => {
        await sleep(70);
        router.push(href);

        // Safety: if page-ready never fires, reveal after SAFETY_MS anyway.
        setTimeout(() => {
          if (navigatedRef.current) {
            navigatedRef.current = false;
            revealWithRows();
          }
        }, SAFETY_MS);
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, router]);

  // Handle back/forward browser navigation (no click intercepted).
  useEffect(() => {
    if (prevPathnameRef.current === pathname) return;
    prevPathnameRef.current = pathname;
    if (reduceRef.current) return;

    navigatedRef.current = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- covering on route change is the transition's whole job
    coverWithRows();

    setTimeout(() => {
      if (navigatedRef.current) {
        navigatedRef.current = false;
        revealWithRows();
      }
    }, SAFETY_MS);
  }, [pathname]);

  // Scroll to top on route change.
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <RowCascadeOverlay phase={rowPhase} />
      {children}
    </>
  );
}
