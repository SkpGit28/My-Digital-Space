import type { Metadata } from "next";
import { satoshi, figtree } from "@/styles/fonts";
import "./globals.css";
import { defaultMetadata } from "./metadata";
import ThemeProviderWrapper from "@/Components/ThemeProviderWrapper";
import TopNav from "@/Components/TopNav";
import ScrollProgress from "@/Components/ScrollProgress";
import PageTransition from "@/Components/PageTransition";
import SmoothScrollProvider from "@/Components/SmoothScrollProvider";

// All root metadata lives in ./metadata.ts (single source of truth).
export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} ${satoshi.variable} antialiased font-sans min-h-screen bg-background transition-colors duration-300`}
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
            url: "https://skpux.in/",
            jobTitle: "UI/UX Designer",
            sameAs: [
              "https://www.linkedin.com/in/skplovesdesign/",
              "https://github.com/SkpGit28",
            ],
          })}
        </script>
      </body>
    </html>
  );
}