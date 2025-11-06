import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { defaultMetadata } from "./metadata";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  ...defaultMetadata,
  metadataBase: new URL("https://your-domain.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sushant Kumar — UI/UX Designer",
    url: "/",
    type: "website",
    description: "UI/UX case studies, product thinking, and interface design.",
    siteName: "Sushant Kumar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sushant Kumar — UI/UX Designer",
    description: "UI/UX case studies, product thinking, and interface design.",
  },
};

import { ThemeProvider } from "@/lib/theme";
import { track } from "@/lib/analytics";

if (typeof window !== 'undefined') {
  track('page_view', { path: window.location.pathname });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        {children}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Sushant Kumar",
            "url": "https://your-domain.com/",
            "jobTitle": "UI/UX Designer",
            "sameAs": [
              "https://www.linkedin.com/in/...",
              "https://github.com/..."
            ]
          })}
        </script>
      </body>
    </html>
  );
}
