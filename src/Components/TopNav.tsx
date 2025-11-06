import Link from "next/link";
import { track } from "@/lib/analytics";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "/resume.pdf" },
];

export default function TopNav({
  logoLabel = "Sushant Kumar",
  links = navLinks,
  onLinkClick,
  enableThemeToggle = false,
}: {
  logoLabel?: string;
  links?: { label: string; href: string }[];
  onLinkClick?: (href: string) => void;
  enableThemeToggle?: boolean;
}) {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur bg-white/80 dark:bg-black/60 border-b border-border">
      <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-2" aria-label="Main navigation">
        <span className="font-bold text-lg tracking-tight text-brand">{logoLabel}</span>
        <ul className="flex gap-6 items-center">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-2 py-1 rounded focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline"
                onClick={() => {
                  track("nav_click", { label: link.label, href: link.href });
                  onLinkClick?.(link.href);
                }}
                prefetch={link.href.startsWith("/")}
                target={link.href.endsWith(".pdf") ? "_blank" : undefined}
                rel={link.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Theme toggle placeholder */}
        {enableThemeToggle && (
          <button aria-label="Toggle theme" className="ml-4">🌓</button>
        )}
      </nav>
    </header>
  );
}
