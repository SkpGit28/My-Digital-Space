"use client";
import Container from "./container";
import { ArrowUpRight, Github } from 'lucide-react';
import TicTacToe from "./TicTacToe";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 py-8 bg-footer-bg">
      <Container>
        <div className="flex flex-col gap-6">
          {/* Main Content Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Left: Connect Button & Social Links */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Connect Button */}
              <a
                href="mailto:skponpurpose@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#70B7FF] to-[#4D9EFF] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:opacity-90"
              >
                Connect
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>

              {/* Social Links */}
              <div className="flex items-center gap-6">
                {[
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/skplovesdesign' },
                  { name: 'GitHub', url: 'https://github.com/SkpGit28' },
                  { name: 'Resume', url: '/resume.pdf', download: true }
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    download={link.download}
                    className="group flex items-center gap-1 text-text-secondary hover:text-foreground transition-colors"
                  >
                    <span className="text-sm font-medium">{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Tic Tac Toe */}
            <div>
              <TicTacToe />
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center justify-center gap-1 text-center border-t border-black/5 pt-6">
            <div className="flex items-center gap-2 text-text-secondary text-xs">
              <span>Made with</span>
              <Github size={12} />
              <span>Copilot and Redbull</span>
            </div>
            <p className="text-xs text-text-secondary">© {currentYear} SKP.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}