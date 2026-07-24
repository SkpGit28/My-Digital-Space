import type { Metadata } from "next";

/**
 * Single source of truth for the site's metadata.
 * `layout.tsx` re-exports this as the root `metadata`; individual pages can
 * override `title`/`description` and the `%s` template wraps them automatically.
 */

const SITE_URL = "https://skpux.in";
const NAME = "Sushant Kumar";
const TITLE = "Sushant Kumar — UI/UX Designer";
const DESCRIPTION =
  "UI/UX designer crafting fintech dashboards, design systems, and product interfaces end-to-end. Case studies, product thinking, and shipped work by Sushant Kumar (SKP).";
const OG_IMAGE = "/og.png"; // 1200×630 — add to /public (see note in chat)

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s — ${NAME}`,
  },
  description: DESCRIPTION,
  applicationName: `${NAME} — Portfolio`,
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  publisher: NAME,
  keywords: [
    "Sushant Kumar",
    "SKP",
    "UI/UX designer",
    "product designer",
    "fintech design",
    "design systems",
    "design tokens",
    "dashboard design",
    "Figma",
    "Framer",
    "case studies",
    "portfolio",
    "Noida",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};
