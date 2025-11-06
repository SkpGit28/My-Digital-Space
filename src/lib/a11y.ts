'use client';

import { useEffect, useCallback } from 'react';

export function useKeyboardNavigation(elementRef: React.RefObject<HTMLElement>) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const element = elementRef.current;
    if (!element) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        const prevFocusable = element.querySelector('[tabindex]:not([tabindex="-1"])') as HTMLElement;
        prevFocusable?.focus();
        break;
      case 'ArrowRight':
        event.preventDefault();
        const nextFocusable = element.querySelector('[tabindex]:not([tabindex="-1"])') as HTMLElement;
        nextFocusable?.focus();
        break;
    }
  }, [elementRef]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('keydown', handleKeyDown);
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [elementRef, handleKeyDown]);
}

export function useTrapFocus(elementRef: React.RefObject<HTMLElement>) {
  const handleFocus = useCallback((event: KeyboardEvent) => {
    const element = elementRef.current;
    if (!element || event.key !== 'Tab') return;

    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable?.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable?.focus();
    }
  }, [elementRef]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('keydown', handleFocus);
    return () => {
      element.removeEventListener('keydown', handleFocus);
    };
  }, [elementRef, handleFocus]);
}
