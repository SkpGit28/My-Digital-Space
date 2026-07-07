"use client";

/**
 * HERO TEST — exact build of Figma node 263:445 (ClaudeAuto / "1").
 * Tokens from the Figma variables:
 *   color/text/heading      #001536  (emphasis words, name)
 *   color/text/body         #70768c  (muted words)
 *   color/blue/FigBg        #e5f4ff  (Designer badge bg)
 *   color/blue/FigMain      #0d99ff  (Designer badge text)
 *   color/status/success-bg #e6f9f1  (Builder badge bg)
 *   color/green/500         #1f9d5e  (Builder badge text)
 * Type: Satoshi 48px bold headline (lh ≈ 1.35), 24px name, 14px badges.
 * Layout: 1000px block centered, 64px gap headline → identity row,
 *         24px photo→text gap, 64×64 photo with 1px #e5e7eb border.
 */

import localFont from "next/font/local";
import Image from "next/image";

const satoshi = localFont({
  src: [
    {
      path: "../../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--hero-satoshi",
});

const T = {
  heading: "#001536",
  body: "#70768c",
  blueBg: "#e5f4ff",
  blueMain: "#0d99ff",
  successBg: "#e6f9f1",
  green500: "#1f9d5e",
  purpleBg: "#f3ecfd",
  purple500: "#a78bfa",
  border: "#e5e7eb",
};

export default function HeroTestPage() {
  return (
    <div className={`${satoshi.className} min-h-screen bg-white`}>
      <section className="mx-auto flex w-full max-w-[1000px] flex-col items-center px-6 pt-[164px] pb-24 lg:px-0">
        {/* Headline — 48px, alternating body/heading tokens */}
        <h1
          className="text-center text-[48px] font-bold leading-[1.35] tracking-[-0.02em]"
          style={{ color: T.body }}
        >
          I help{" "}
          <span style={{ color: T.heading }}>high-stake businesses</span> to{" "}
          <span style={{ color: T.heading }}>solve the right problem</span>{" "}
          through <span style={{ color: T.heading }}>design</span>.
        </h1>

        {/* Identity row — 64px below headline */}
        <div className="mt-16 flex items-center gap-6">
          {/* Photo: 64×64 frame, 1px border; image 64×60 with 4px top gap, flush bottom */}
          <div
            className="flex h-16 w-16 items-end justify-center overflow-hidden bg-white"
            style={{ border: `1px solid ${T.border}` }}
          >
            <Image
              src="/HeroMe.svg"
              alt="Sushant Kumar"
              width={64}
              height={60}
              className="h-[59px] w-full object-cover"
            />
          </div>

          {/* Name + badges */}
          <div className="flex flex-col items-start gap-2">
            <span
              className="text-[24px] leading-8 tracking-[-0.02em]"
              style={{ color: T.heading, fontWeight: 500 }}
            >
              Hi, I am Sushant Kumar
            </span>
            <div className="flex items-center gap-2">
              <span
                className="inline-flex min-w-[76px] items-center justify-center rounded-lg px-2 py-[2.5px] text-[14px] font-bold tracking-[-0.02em]"
                style={{ background: T.blueBg, color: T.blueMain }}
              >
                Designer
              </span>
              <span
                className="inline-flex min-w-[76px] items-center justify-center rounded-lg px-2 py-[2.5px] text-[14px] font-bold tracking-[-0.02em]"
                style={{ background: T.successBg, color: T.green500 }}
              >
                Builder
              </span>
              <span
                className="inline-flex min-w-[76px] items-center justify-center rounded-lg px-2 py-[2.5px] text-[14px] font-bold tracking-[-0.02em]"
                style={{ background: T.purpleBg, color: T.purple500 }}
              >
                Tinkerer
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
