"use client";
import Hero from "@/Components/hero";
import SegmentedSwitch from "@/Components/SegmentedSwitch";
import HorizontalRail from "@/Components/HorizontalRail";
import CardBite from "@/Components/CardBite";
import CardDeepDive from "@/Components/CardDeepDive";
import NewsletterForm from "@/Components/NewsletterForm";
import Footer from "@/Components/Footer";
import { useState } from "react";
import bites from "@/content/bites.json";
import deep from "@/content/deep.json";
import Projects from "@/Components/projects";
import ParallaxProjects from "@/Components/ParallaxProjects";
import TechStack from "@/Components/TechStack";

export default function Page() {
  const [tab, setTab] = useState<"bites" | "deep">("bites");

  return (
    <>
      <main id="main">
        <Hero />
        <Projects />
        <TechStack />
      </main>
      <Footer />
    </>
  );
}
