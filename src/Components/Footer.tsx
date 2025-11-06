import Link from "next/link";
import { track } from "@/lib/analytics";

type Props = {
  about?: string;
  social?: {
    label: string;
    href: string;
    icon?: string;
  }[];
  location?: string;
  year?: number;
};

export default function Footer({ 
  about = "I design user interfaces that blend clarity with usability, focusing on outcomes that matter.",
  social = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/..." },
    { label: "GitHub", href: "https://github.com/..." },
    { label: "Twitter", href: "https://twitter.com/..." },
    { label: "Email", href: "mailto:hello@example.com" }
  ],
  location = "Remote (India)",
  year = new Date().getFullYear()
}: Props) {
  return (
    <footer className="border-t border-border bg-card/30 py-16">
      <div className="container-p">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <p className="text-muted">{about}</p>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              {social.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted hover:text-fg transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("nav_click", { label: link.label, href: link.href })}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-semibold mb-4">Location</h4>
            <p className="text-muted">{location}</p>
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted">
            <p>© {year} Sushant Kumar</p>
            <p className="mt-2">Built with Next.js & Tailwind</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
