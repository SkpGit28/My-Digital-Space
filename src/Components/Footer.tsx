"use client";
import Link from "next/link";
import Container from "./container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const testimonials = [
    {
      name: "Shashank Tripathi",
      role: "React Developer, Cash Friend Fintech",
      image: "/avatars/testimonial-1.jpg", // Add your image path
      quote: "I’ve been working with Sushant since 2023, and he’s easily one of the most reliable and clear-thinking designers I’ve worked with. He understands both design and dev constraints, which makes collaboration super smooth. If you need someone who can quickly turn ideas into clean, user-friendly designs, Sushant is your go-to.",
    },
    {
      name: "Ankit Parasher",
      role: "Co-Founder, Salt Pe (YC W'22)",
      image: "/avatars/testimonial-2.jpg", // Add your image path
      quote: "His growth mindset fuels his meticulous approach to design, and he really takes ownership of his projects. With his curiosity and adaptability, any organization would be lucky to have him.",
    },
  ];

  return (
    <footer className="border-t border-white/10 py-12 md:py-16 bg-gray-950 dark:bg-black">
      <Container>
        {/* Testimonials Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-12">
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <h3 className="text-2xl md:text-3xl font-semibold text-white">What it's like working with me</h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col relative">
                  {/* Quote Icon - Top Left */}
                  <svg className="w-10 h-10 text-blue-400/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  {/* Quote Text */}
                  <p className="text-white/80 text-base leading-relaxed mb-6 flex-grow">
                    {testimonial.quote}
                  </p>

                  {/* Inverted Quote Icon - Bottom Right */}
                  <svg className="absolute bottom-24 right-8 w-10 h-10 text-blue-400/30 transform rotate-180" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-semibold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-white font-medium">{testimonial.name}</p>
                      <p className="text-white/60 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          {/* Left: Availability Status */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-sm font-medium text-white/90">Available for new opportunities</p>
            </div>
            <p className="text-sm text-white/60">Open to full-time roles & freelance projects</p>
          </div>

          {/* Right: CTA */}
          <a
            href="mailto:skponpurpose@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#70B7FF] to-[#4D9EFF] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:opacity-90"
          >
            Let's work together
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left: Social Links */}
            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/skplovesdesign"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/SkpGit28"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com/skplovesdesign"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="/resume.pdf"
                download
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Resume
              </a>
            </div>

            {/* Right: Copyright */}
            <div className="text-sm text-white/50">
              © {currentYear} Sushant Kumar. Crafted with Github Copilot 😁
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
