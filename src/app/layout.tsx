import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { defaultMetadata } from "./metadata";
import ThemeProviderWrapper from "@/Components/ThemeProviderWrapper";
import TopNav from "@/Components/TopNav";
import ScrollProgress from "@/Components/ScrollProgress";
import PageTransition from "@/Components/PageTransition";
import SmoothScrollProvider from "@/Components/SmoothScrollProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${manrope.variable} antialiased font-sans min-h-screen bg-background transition-colors duration-300`}
      >
        <ThemeProviderWrapper>
          <SmoothScrollProvider>
            <ScrollProgress />

            <div className="flex min-h-screen flex-col">
              <TopNav />

              <main className="flex-1">
                <PageTransition>
                  {children}
                </PageTransition>
              </main>
            </div>
          </SmoothScrollProvider>
        </ThemeProviderWrapper>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Sushant Kumar",
            url: "https://your-domain.com/",
            jobTitle: "UI/UX Designer",
            sameAs: [
              "https://www.linkedin.com/in/...",
              "https://github.com/...",
            ],
          })}
        </script>
      </body>
    </html>
  );
}