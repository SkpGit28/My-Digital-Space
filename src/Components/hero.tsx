import Image from "next/image";
import { useState } from "react";
import Container from "./container";

export default function Hero() {
  const [slide, setSlide] = useState(0); // 0=base, 1=design, 2=build, 3=act

  return (
    <section id="top" className="min-h-[72vh] flex flex-col items-center justify-center text-center">
      <Container>
        {/* AVATAR — stacked images */}
        <div className="relative w-[152px] h-[152px] mx-auto rounded-full overflow-hidden shadow-lg bg-[#70B7FF]">
          <Image
            src="/avatars/hey-me.svg"
            alt="Base pose"
            width={152}
            height={152}
            className={`absolute inset-0 transition-opacity duration-500 ${slide === 0 ? "opacity-100" : "opacity-0"}`}
            priority
          />
          <Image
            src="/avatars/design.svg"
            alt="Design pose"
            width={152}
            height={152}
            className={`absolute inset-0 transition-opacity duration-500 ${slide === 1 ? "opacity-100" : "opacity-0"}`}
          />
          <Image
            src="/avatars/build.svg"
            alt="Build pose"
            width={152}
            height={152}
            className={`absolute inset-0 transition-opacity duration-500 ${slide === 2 ? "opacity-100" : "opacity-0"}`}
          />
          <Image
            src="/avatars/act.svg"
            alt="Act pose"
            width={152}
            height={152}
            className={`absolute inset-0 transition-opacity duration-500 ${slide === 3 ? "opacity-100" : "opacity-0"}`}
          />
        </div>

        {/* HEADINGS */}
        <h1 className="mt-5 text-gray-400 text-2xl md:text-[56px] font-light leading-tight tracking-tight">
          Hi, I’m <span className="text-white/90 font-semibold">Sushant</span>
        </h1>

        <h2 className="mt-2 text-white text-xl md:text-[56px] font-semibold leading-tight tracking-tight">
          <span className="text-gray-400 font-light">I like{" "}</span>
          <span
            className="u-underline [--uclr:#10B981]"
            onMouseEnter={() => setSlide(1)}
            onMouseLeave={() => setSlide(0)}
          >
            designing
          </span>
          ,{" "}
          <span
            className="u-underline [--uclr:#FACC15]"
            onMouseEnter={() => setSlide(2)}
            onMouseLeave={() => setSlide(0)}
          >
            building
          </span>
          <span className="text-gray-400 font-light">, &{" "}</span>
          <span
            className="u-underline [--uclr:#3B82F6]"
            onMouseEnter={() => setSlide(3)}
            onMouseLeave={() => setSlide(0)}
          >
            acting 
          </span>
        </h2>
        <p className="mt-4 text-lg md:text-[20px] font-semibold text-gray-400">
          Product Designer with 2+ years of experience in designing clarity and trust in fintech. Based in Noida. Currently @
          <a href="https://payfi.co.in" target="_blank" rel="noopener noreferrer" className="text-white underline">Payfi</a>
        </p>
      </Container>
    </section>
  );
}
