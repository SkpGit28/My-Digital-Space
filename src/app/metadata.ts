import type { Metadata } from "next";

/**
 * SUSHANT KUMAR — PORTFOLIO METADATA MANAGEMENT SYSTEM
 * Single source of truth for site-wide SEO, OpenGraph, Twitter Cards,
 * structured JSON-LD data, and page-specific metadata generators.
 *
 * Domain: https://skpux.in
 * Owner: Sushant Kumar (UI/UX & Product Designer)
 */

export const SITE_CONFIG = {
  name: "Sushant Kumar",
  title: "Sushant Kumar — UI/UX Designer & Product Specialist",
  shortTitle: "Sushant Kumar — UI/UX Portfolio",
  description:
    "UI/UX Designer with 2.4 years designing fintech products end-to-end — settlement dashboards, merchant onboarding, and design systems. View case studies, ATS resume, and live products.",
  url: "https://skpux.in",
  ogImage: "https://skpux.in/og.png",
  author: "Sushant Kumar",
  email: "skponpurpose@gmail.com",
  phone: "+91 99973 20490",
  location: "Noida, India",
  social: {
    linkedin: "https://www.linkedin.com/in/skplovesdesign",
    github: "https://github.com/SkpGit28",
    portfolio: "https://skpux.in",
  },
  keywords: [
    "Sushant Kumar",
    "Sushant Kumar UI/UX",
    "Sushant Kumar Portfolio",
    "SKP UX",
    "UI/UX Designer Noida",
    "Fintech Product Designer",
    "Design System Specialist",
    "Design Tokens Engineer",
    "Merchant Settlement Dashboard",
    "Cash Friend Fintech",
    "BBPS Platform Design",
    "Framer Supabase RBAC",
    "BlaBlaCar Case Study",
    "StackAlign AI Tool",
    "Rotato Godot Game",
    "OOUID Design",
    "Google UX Certified",
  ],
};

/**
 * Root Default Metadata Configuration for Next.js App Router
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s — ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.shortTitle,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  keywords: SITE_CONFIG.keywords,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    creator: "@skplovesdesign",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/icon.svg",
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

/**
 * Helper function to generate custom Metadata for individual pages.
 */
export function constructMetadata({
  title,
  description,
  image = SITE_CONFIG.ogImage,
  path = "",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const pageTitle = title ? `${title} — ${SITE_CONFIG.name}` : SITE_CONFIG.title;
  const pageDesc = description || SITE_CONFIG.description;
  const pageUrl = `${SITE_CONFIG.url}${path}`;

  return {
    title: pageTitle,
    description: pageDesc,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: pageUrl,
      images: [{ url: image }],
    },
    twitter: {
      title: pageTitle,
      description: pageDesc,
      images: [image],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

/**
 * JSON-LD Structured Data Schema Generators for Google Rich Search Results
 */
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  image: `${SITE_CONFIG.url}/HeroMe.svg`,
  jobTitle: "UI/UX Designer",
  worksFor: {
    "@type": "Organization",
    name: "Cash Friend Fintech Pvt. Ltd.",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "HNB Garhwal University",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Noida",
    addressCountry: "India",
  },
  sameAs: [SITE_CONFIG.social.linkedin, SITE_CONFIG.social.github],
  knowsAbout: [
    "User Interface Design",
    "User Experience Design",
    "Fintech Systems",
    "Design Systems & Tokens",
    "Merchant Onboarding",
    "Framer & Supabase RBAC",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_CONFIG.shortTitle,
  url: SITE_CONFIG.url,
  author: {
    "@type": "Person",
    name: SITE_CONFIG.name,
  },
  description: SITE_CONFIG.description,
};
