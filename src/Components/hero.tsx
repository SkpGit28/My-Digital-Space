export default function Hero() {
  return (
    <section id="top" className="min-h-[78vh] flex items-center">
      <div className="container-p text-center">
        {/* Availability pill (edit text freely) */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
          Open to opportunities next month
        </div>

        <h1 className="mt-5 text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
          Hi, I’m <span className="text-white/90">Sushant Kumar</span> — a UI/UX designer
          with ~2 years’ experience turning product goals into clean, usable experiences.
        </h1>

        <p className="mt-5 text-lg md:text-xl text-white/70">
          I design flows, validate with users, and ship thoughtful interfaces.
          Explore quick <strong>UX Case Study Bites</strong> or a few <strong>Deep Dives</strong>.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="#work" className="btn-primary">See case studies</a>
          <a href="/resume.pdf" className="btn-ghost">Download résumé</a>
        </div>
      </div>
    </section>
  );
}
