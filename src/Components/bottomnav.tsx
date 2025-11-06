import { JSX } from "react";

type NavItem = {
  id: "home" | "work" | "about" | "contact";
  label: string;
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

/* Simple inline icons so you don't install extra libraries */
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M12 3 3 10h2v9a1 1 0 0 0 1 1h5v-6h2v6h5a1 1 0 0 0 1-1v-9h2L12 3z"/>
  </svg>
);

const WorkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M10 4h4a2 2 0 0 1 2 2v1h3a1 1 0 0 1 1 1v3H4V8a1 1 0 0 1 1-1h3V6a2 2 0 0 1 2-2zm0 3h4V6h-4v1zM4 12h16v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6z"/>
  </svg>
);

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.33 0-8 2.17-8 5v1h16v-1c0-2.83-3.67-5-8-5z"/>
  </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v1l10 6 10-6V6a2 2 0 0 0-2-2zm0 5.236-8 4.8-8-4.8V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z"/>
  </svg>
);

const NAV: NavItem[] = [
  { id: "home",    label: "Home",    href: "#top",     icon: HomeIcon },
  { id: "work",    label: "Work",    href: "#work",    icon: WorkIcon },
  { id: "about",   label: "About",   href: "#about",   icon: UserIcon },
  { id: "contact", label: "Contact", href: "#contact", icon: MailIcon },
];

export default function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-3 z-50 pb-[max(env(safe-area-inset-bottom),0px)]"
    >
      <div className="mx-auto max-w-2xl px-4">
        <div className="glass rounded-2xl shadow-elevated">
          <ul className="flex items-center justify-between px-2 py-1.5">
            {NAV.map(({ id, label, href, icon: Icon }) => (
              <li key={id}>
                <a
                  href={href}
                  className="group flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[11px]">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
