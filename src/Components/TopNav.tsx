"use client";
import { motion, useReducedMotion } from "framer-motion"; 
import Link from "next/link";
import Image from "next/image";
import { track } from "@/lib/analytics";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import Container from "./container";

/** 1) Remove Contact from navLinks so it won't render as a plain link */
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

interface TopNavProps {
  logoLabel?: string;
  links?: { label: string; href: string }[];
  onLinkClick?: (href: string) => void;
}

/** Small inline component for the desktop hover dropdown */
function ContactDropdown() {
  const email = "skponpourpose@gmail.com"; // <-- put your real email
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      // keep it simple; replace with your toast if you have one
      alert("Email copied!");
    } catch {
      alert("Could not copy email");
    }
  };

  return (
    <div className="relative group">
      <button
  className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full 
             bg-gradient-to-r from-[#70B7FF] to-[#4D9EFF] text-white font-medium
             shadow-lg hover:shadow-xl border border-[#70B7FF] backdrop-blur-sm
             hover:opacity-90 transition-all duration-200
             focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
  aria-haspopup="menu"
  aria-expanded="false"
>
  Contact
  <span className="material-symbols-rounded text-[20px] leading-none relative top-[1px]">
    keyboard_arrow_down
  </span>
</button>

      {/* Popover */}
      <div
        className="opacity-0 group-hover:visible group-hover:opacity-100
                   group-focus-within:visible group-focus-within:opacity-100
                   absolute left-1/2 transform -translate-x-1/2 mt-4 w-56 rounded-xl p-2
                   bg-white/95 dark:bg-neutral-900 backdrop-blur-sm
                   border-gray-200 dark:border-gray-700 shadow-lg
                   transition-all"
        role="menu"
      >
        <a
          href="public/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          role="menuitem"
          onClick={() => track("contact_menu_click", { item: "resume" })}
        >
        Download Resume
        </a>
        <button
          onClick={async () => {
                  await navigator.clipboard.writeText("skponpurpose@gmail.com");
                  alert("Email copied!");
                  track("contact_menu_click", { item: "copy_email_mobile" });
                }}
          className="w-full text-left block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          role="menuitem"
        >
        Copy Email
        </button>
        <a
          href="https://www.linkedin.com/in/skplovesdesign"
          target="_blank"
          rel="noopener noreferrer"
          className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          role="menuitem"
          onClick={() => track("contact_menu_click", { item: "linkedin" })}
        >
        LinkedIn
        </a>
      </div>
    </div>
  );
}

export default function TopNav({
  logoLabel = "SKP",
  links = navLinks,
  onLinkClick,
}: TopNavProps): ReactNode {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll state
  const prefersReducedMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const dur = prefersReducedMotion ? 0 : 0.6;

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    track("mobile_menu_toggle", { state: !isMenuOpen ? "open" : "closed" });
  };

  return (
    <header className="sticky top-0 z-50">
      <motion.div
        initial={{ opacity: 0, y: 16 }}   // ✅ no filter here
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16,1,0.3,1], delay: 0.05 }}
      >
        <Container>
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded"
            rel="stylesheet"
          />

          {/* Floating theme toggle – top right */}
          <div className="fixed top-5 mt-2 right-6 z-60">
            <button
              onClick={toggleTheme}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shadow-lg",
                "bg-white/90 dark:bg-gray-900/90 backdrop-blur-3xl",
                "text-gray-700 dark:text-gray-300",
                "hover:bg-white dark:hover:bg-gray-800",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900",
                "transition-colors duration-200"
              )}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              )}
            </button>
          </div>

          {/* Sticky, centered pill */}
          <nav
            aria-label="Main navigation"
            className={cn(
              "sticky top-0 z-50 -mt-10",                        // pull it over content
              "rounded-full mx-auto mt-4 max-w-4xl w-full px-3 md:px-2",
              isScrolled
                ? "backdrop-blur-sm backdrop-saturate-200 backdrop-filter bg-white/40 dark:bg-neutral-900/45 border border-white/20 dark:border-white/10"
                : "bg-transparent border-none"
            )}
          >

            {/* Actual nav content */}
            <div className="relative z-10 flex items-center justify-between py-2">
              {/* Logo + brand */}
              <Link href="/" className="flex items-center gap-3 shrink-0">
                <Image
                  src="avatars/logo.svg"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full"
                  priority
                />
                <span className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                  {logoLabel}
                </span>
              </Link>

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-1 rounded-md text-md font-medium",
                      "text-gray-800/90 dark:text-gray-100/90",
                      "hover:text-gray-950 dark:hover:text-white",
                      "hover:bg-white/20 dark:hover:bg-white/10",
                      "transition-colors duration-200"
                    )}
                    onClick={() => {
                      track("nav_click", { label: link.label, href: link.href });
                      onLinkClick?.(link.href);
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Contact CTA */}
              <div className="hidden md:block shrink-0">
                <ContactDropdown />
              </div>

              {/* Mobile toggle stays the same... */}
            </div>
          </nav>


      {/* Mobile menu: centered dropdown under the pill */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
        )}
      >
        <div
          className={cn(
            "mx-auto mt-2 w-[min(92vw,720px)] rounded-2xl border border-white/10",
            "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-xl p-4"
          )}
        >
          <div className="flex flex-col space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-2 py-2 rounded-md transition-colors"
                onClick={() => {
                  track("nav_click", { label: link.label, href: link.href });
                  setIsMenuOpen(false);
                  onLinkClick?.(link.href);
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile "Contact" block */}
            <div className="pt-2 mt-1 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 px-1 mb-1">
                Contact
              </div>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => track("contact_menu_click", { item: "resume_mobile" })}
              >
                📄 Download Resume
              </a>
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText("skponpurpose@gmail.com");
                  alert("Email copied!");
                  track("contact_menu_click", { item: "copy_email_mobile" });
                }}
                className="w-full text-left block px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                ✉️ Copy Email
              </button>
              <a
                href="https://www.linkedin.com/in/skplovesdesign"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => track("contact_menu_click", { item: "linkedin_mobile" })}
              >
                🔗 LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
      </Container>
    </motion.div>
    </header>
  );
}
