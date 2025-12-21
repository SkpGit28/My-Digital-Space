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
    <div className="relative group ">
      <button
        className="
    inline-flex items-center justify-center gap-2
    px-3 py-2 rounded-full
    bg-transparent
    text-white font-medium
    shadow-lg hover:shadow-xl
    border border-gray-300 dark:border-gray-700
    hover:border-[#70B7FF]
    backdrop-blur-sm
    hover:opacity-90
    transition-colors transition-shadow duration-200
    focus:outline-none
    focus:ring-2 focus:ring-primary focus:ring-offset-2
    dark:focus:ring-offset-gray-900
  "
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
             absolute left-1/2 -translate-x-1/2 mt-4 w-56 rounded-xl p-2
             bg-[#1B1D23]/95
             border border-[#24262E]
             shadow-lg
             transition-all
             z-50"
        role="menu"
      >


        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="block px-3 py-2 rounded-md text-md font-medium
           text-[#B6C2D9]
           hover:bg-white/10 hover:text-[#E5ECF5]
           transition-colors duration-200"
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
          className="w-full flex items-center px-3 py-2 rounded-md
           text-md font-medium
           text-[#B6C2D9]
           hover:bg-white/10 hover:text-[#E5ECF5]
           transition-colors duration-200"
          role="menuitem"
        >
          Copy Email
        </button>
        <a
          href="https://www.linkedin.com/in/skplovesdesign"
          target="_blank"
          rel="noopener noreferrer"
          className="block px-3 py-2 rounded-md text-md font-medium
           text-[#B6C2D9]
           hover:bg-white/10 hover:text-[#E5ECF5]
           transition-colors duration-200"
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
  logoLabel = "",
  links = navLinks,
  onLinkClick,
}: TopNavProps): ReactNode {

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
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      >
        <Container>
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded"
            rel="stylesheet"
          />



          {/* Sticky, centered pill */}
          <nav
            aria-label="Main navigation"
            className={cn(
              "sticky top-0 z-50 -mt-10",                        // pull it over content
              "rounded-full mx-auto mt-4 max-w-6xl w-full px-3 md:px-2",
              isScrolled
                ? "bg-background/80 backdrop-blur-sm backdrop-saturate-200 border border-[var(--nav-border)]"
                : "border-none"
            )}
          >
            {/* Actual nav content */}
            <div className="relative z-10 px-1 flex items-center justify-between py-2">
              {/* Logo + brand */}
              <Link href="/" className="flex items-center gap-4 shrink-0">
                <Image
                  src="/avatars/SKPFont.svg"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full"
                  priority
                />
                <span className="text-xl font-semibold" style={{ color: '#E5ECF5' }}>
                  {logoLabel}
                </span>
              </Link>

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-1 rounded-md text-md font-medium hover:bg-white/10 transition-colors duration-200"
                    style={{ color: '#E5ECF5' }}
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
                "bg-gray-900/90 backdrop-blur-md shadow-xl p-4"
              )}
            >
              <div className="flex flex-col space-y-3">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-300 hover:text-white px-2 py-2 rounded-md transition-colors"
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
                  <div className="text-xs uppercase tracking-wide text-gray-400 px-1 mb-1">
                    Contact
                  </div>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-2 py-2 rounded-md hover:bg-gray-800"
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
                    className="w-full text-left block px-2 py-2 rounded-md hover:bg-gray-800"
                  >
                    ✉️ Copy Email
                  </button>
                  <a
                    href="https://www.linkedin.com/in/skplovesdesign"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-2 py-2 rounded-md hover:bg-gray-800"
                    onClick={() => track("contact_menu_click", { item: "linkedin_mobile" })}
                  >
                    🔗 LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </motion.div >
    </header >
  );
}
