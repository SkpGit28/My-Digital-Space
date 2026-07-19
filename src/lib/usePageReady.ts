"use client";

import { useEffect } from "react";

/**
 * Call this hook at the top of every page component.
 * It dispatches a "page-ready" custom event after mount + paint,
 * telling PageTransition to reveal the new page.
 */
export function usePageReady() {
  useEffect(() => {
    window.dispatchEvent(new Event("page-ready"));
  }, []);
}
