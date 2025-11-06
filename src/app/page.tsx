"use client";
import Hero from "@/Components/hero";
import BottomNav from "@/Components/bottomnav";
import SegmentedSwitch from "@/Components/SegmentedSwitch";
import HorizontalRail from "@/Components/HorizontalRail";
import CardBite from "@/Components/CardBite";
import CardDeepDive from "@/Components/CardDeepDive";
import NewsletterForm from "@/Components/NewsletterForm";
import Footer from "@/Components/Footer";
import { useState } from "react";
import bites from "@/content/bites.json";
import deep from "@/content/deep.json";

export default function Page() {
  const [tab, setTab] = useState<"bites" | "deep">("bites");

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <main id="main">
        <Hero />

        <section id="work" className="container-p py-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold">Work</h2>
            <SegmentedSwitch value={tab} onChange={setTab} />
          </div>
          {tab === "bites" ? (
            <HorizontalRail ariaLabel="UX Bites">
              {bites.length ? bites.map((bite: any) => (
                <CardBite key={bite.id} image={bite.image} title={bite.title} blurb={bite.summary} tags={bite.tags} ctaLabel={bite.ctaLabel} href={bite.href} />
              )) : <div className="text-muted">Bites coming soon</div>}
            </HorizontalRail>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {deep.length ? deep.map((d: any) => (
                <CardDeepDive key={d.id} image={d.heroImage} title={d.title} role={d.role} timeframe={d.timeframe} outcomes={d.outcomes} href={d.href} />
              )) : <div className="text-muted">Deep dives coming soon</div>}
            </div>
          )}
        </section>

        <section id="about" className="container-p py-24">
          <h2 className="text-2xl md:text-3xl font-semibold">About</h2>
          <p className="mt-3 text-muted">
            I specialize in crafting clear, outcome-driven interfaces that solve real user problems. 
            My approach combines careful user research with iterative design, always focusing on 
            measurable improvements in usability and business metrics.
          </p>
        </section>

        <section id="contact" className="container-p py-24 bg-card/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-12">Stay Updated</h2>
            <NewsletterForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
