"use client";
import Hero from "@/Components/hero";
import Footer from "@/Components/Footer";
import { useState } from "react";
import Projects from "@/Components/projects";
import TechStack from "@/Components/TechStack";
import Testimonials from "@/Components/testimonials";

export default function Page() {
  const [tab, setTab] = useState<"bites" | "deep">("bites");

  return (
    <>
      <main id="main">
        <Hero />
        <Projects />
        <TechStack />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
