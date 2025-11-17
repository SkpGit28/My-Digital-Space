"use client";
import Image from "next/image";
import Container from "./container";
import { motion } from "framer-motion"; // Import motion

type Testimonial = {
  // ... (type is unchanged)
  name: string;
  role: string;
  image: string;
  quote: string;
  highlights?: string[];
  linkedin?: string;
};
const fadeInFromDown = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const fadeTransition = {
  duration: 0.5,
  ease: "easeInOut" as const,
};


// ... (Highlighted component is unchanged)
function Highlighted({ text, terms = [] }: { text: string; terms?: string[] }) {
  if (!terms.length) return <>{text}</>;
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${terms.map(esc).join("|")})`, "gi");
  return (
    <>
      {text.split(re).map((part, i) =>
        re.test(part) ? (
          <span key={i} className="text-[#70B7FF] font-semibold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// ... (Avatar component is unchanged)
function Avatar({
  src,
  name,
  priority = false,
}: {
  src: string;
  name: string;
  priority?: boolean;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 text-white font-semibold grid place-items-center">
        {initials}
      </div>
      <Image
        src={src}
        alt={name}
        fill
        sizes="48px"
        priority={priority}
        className="rounded-full object-cover"
      />
    </div>
  );
}

const testimonials: Testimonial[] = [
  // ... (data is unchanged)
  {
    name: "Shashank Tripathi",
    role: "Frontend Dev, Cash Friend Fintech",
    image: "/testimonials/shashank.svg",
    linkedin: "https://www.linkedin.com/in/shashank-tripathi-702b041ba/",
    quote:
      "I’ve been working with Sushant since 2023, and he’s easily one of the most reliable and clear-thinking designers I’ve worked with. He understands both design and dev constraints, which makes collaboration super smooth. If you need someone who can quickly turn ideas into clean, user-friendly designs, Sushant is your go-to.",
    highlights: [
      "reliable",
      "clear-thinking",
      "dev constraints",
      "collaboration",
      "user-friendly",
    ],
  },
  {
    name: "Pushkar Kumar",
    role: "Backend Dev, Cash Friend Fintech",
    image: "/testimonials/pushkar.svg",
    linkedin: "https://www.linkedin.com/in/pushkar-kumar-17277616b/",
    quote:
      "I’ve worked with Sushant for the last 8 months, and it’s been a smooth and productive experience. We always start with a quick brainstorming session to align on the system flow, and he turns those discussions into clean, practical UI that’s easy to build on. He understands technical constraints well and communicates clearly, which makes collaboration simple.",
    highlights: [
      "smooth",
      "productive",
      "brainstorming",
      "system flow",
      "practical UI",
      "technical constraints",
      "communicates clearly",
      "collaboration",
    ],
  },
];

// --- MAIN CHANGES ARE HERE ---

export default function Testimonials() {
  // Define a simple animation variant for the "slide up from down" effect
  const fadeInFromDown = {
    initial: { opacity: 0, y: 30 }, // Start invisible and 30px down
    whileInView: { opacity: 1, y: 0 }, // Animate to visible and at original position
    viewport: { once: true }, // Only animate once
    transition: { duration: 0.5, ease: "easeInOut" },
  };

  return (
    <section className="py-16 md:py-20 bg-transparent">
      <Container>
        {/*
          1. Animate the Heading
          We change the 'div' to 'motion.div' and pass in the animation props.
        */}
        <motion.div
  className="flex items-center gap-3 mb-10"
  initial={fadeInFromDown.initial}
  whileInView={fadeInFromDown.whileInView}
  viewport={fadeInFromDown.viewport}
  transition={{ ...fadeTransition, delay: 0.1 }}
>
          {/* <svg
            className="w-8 h-8 text-[#70B7FF]"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg> */}
          <h3 className="text-2xl md:text-3xl font-semibold text-white">
            What it’s like working with me
          </h3>
        </motion.div>

       <div className="grid md:grid-cols-2 gap-8">
  {testimonials.map((t, i) => {
    const [titlePart, companyPart] = t.role.split(",");
    return (
      <motion.article
  key={i}
  initial={fadeInFromDown.initial}
  whileInView={fadeInFromDown.whileInView}
  viewport={fadeInFromDown.viewport}
  transition={{ ...fadeTransition, delay: 0.3 + i * 0.2 }}
>
  <div
    className={[
      "relative group",
      // Base background + rounded
      "bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-8",
      // Base border
      "border border-white/10",
      // Hover → brand outline + glow
      "group-hover:border-[#70B7FF] group-hover:shadow-[0_0_22px_rgba(112,183,255,0.25)]",
      // Smooth animation
      "transition-all duration-300",
      // Flex layout
      "h-full flex flex-col"
    ].join(" ")}
  >
    {/* Corner Quote Icon */}
    <svg
      className="
        absolute top-5 left-5 w-8 h-8
        text-white/30
        transition-all duration-300
        group-hover:text-[#70B7FF]
        group-hover:drop-shadow-[0_0_10px_rgba(112,183,255,0.45)]
      "
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>

    {/* Quote */}
    <p className="text-white/80 text-base leading-relaxed mb-6 flex-grow mt-10">
      <Highlighted text={t.quote} terms={t.highlights} />
    </p>

    {/* Author */}
    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
      <Avatar src={t.image} name={t.name} priority={i === 0} />
      <div>
        <p className="text-white font-medium flex items-center gap-2">
          {t.name}
          {t.linkedin && (
            <a
              href={t.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.name} LinkedIn`}
              className="text-[#70B7FF] hover:text-[#9ccfff] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.6v2.3h.1c.6-1.1 2-2.3 4.2-2.3 4.5 0 5.3 3 5.3 6.8V24h-5v-7.6c0-1.8 0-4.1-2.5-4.1-2.5 0-2.9 1.9-2.9 3.9V24h-5V8z" />
              </svg>
            </a>
          )}
        </p>

        <p className="text-white/60 text-sm">
          {titlePart?.trim()}
          {companyPart && (
            <>
              , <span className="text-white/80 font-medium">{companyPart.trim()}</span>
            </>
          )}
        </p>
      </div>
    </div>
  </div>
</motion.article>


    );
  })}
</div>

      </Container>
    </section>
  );
}