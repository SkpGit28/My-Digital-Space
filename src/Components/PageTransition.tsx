"use client";

/**
 * PAGE TRANSITION — Row Cascade everywhere.
 *
 * Horizontal bars grow in from the left, top → bottom, then drain out
 * to the right. The gradient wall stays visible until the new page
 * signals readiness via the "page-ready" custom event (usePageReady hook).
 */

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { EASE } from "@/lib/constants";
const SAFETY_MS = 2000;

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

  if (phase === "idle" || rows === 0) return null;

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
  const navigatedRef = useRef(false);

  const [rowPhase, setRowPhase] = useState<"idle" | "cover" | "held" | "reveal">("idle");

  useEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
