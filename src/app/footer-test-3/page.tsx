"use client";

/**
 * FOOTER TEST 3 — idea #3: the challenge footer, isolated on /footer-test-3.
 * A premium two-column footer: brand statement + links on the left,
 * an unbeatable TicTacToe (minimax) on the right with a persistent
 * scoreboard and a contact CTA baked into the stakes.
 * Palette: hero tokens — heading #001536, body #70768c, brand #0284C7.
 */

import { useEffect, useMemo, useState } from "react";

type Cell = "X" | "O" | null;

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function winnerOf(b: Cell[]): { who: Cell; line: number[] } {
  for (const l of LINES) {
    if (b[l[0]] && b[l[0]] === b[l[1]] && b[l[1]] === b[l[2]])
      return { who: b[l[0]], line: l };
  }
  return { who: null, line: [] };
}

function minimax(b: Cell[], isAI: boolean): { score: number; move: number } {
  const { who } = winnerOf(b);
  if (who === "O") return { score: 10, move: -1 };
  if (who === "X") return { score: -10, move: -1 };
  if (b.every(Boolean)) return { score: 0, move: -1 };
  let best = isAI ? -Infinity : Infinity;
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (b[i]) continue;
    b[i] = isAI ? "O" : "X";
    const { score } = minimax(b, !isAI);
    b[i] = null;
    if (isAI ? score > best : score < best) { best = score; move = i; }
  }
  return { score: best, move };
}

const T = { heading: "#001536", body: "#70768c", brand: "#0284C7", border: "rgba(0,0,0,0.08)" };

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/skplovesdesign" },
  { label: "GitHub", href: "https://github.com/SkpGit28" },
  { label: "Resume", href: "/resume.pdf" },
  { label: "Email", href: "mailto:skponpurpose@gmail.com" },
];

export default function FooterTest3Page() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [thinking, setThinking] = useState(false);
  const [score, setScore] = useState({ you: 0, draws: 0, skp: 0 });

  useEffect(() => {
    try { const s = localStorage.getItem("skp-ttt-score"); if (s) setScore(JSON.parse(s)); } catch {}
  }, []);
  const saveScore = (s: typeof score) => {
    setScore(s);
    try { localStorage.setItem("skp-ttt-score", JSON.stringify(s)); } catch {}
  };

  const { who: winner, line } = useMemo(() => winnerOf(board), [board]);
  const isDraw = !winner && board.every(Boolean);
  const gameOver = !!winner || isDraw;

  useEffect(() => {
    if (gameOver) {
      if (winner === "X") saveScore({ ...score, you: score.you + 1 });
      else if (winner === "O") saveScore({ ...score, skp: score.skp + 1 });
      else saveScore({ ...score, draws: score.draws + 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  const play = (i: number) => {
    if (board[i] || gameOver || thinking) return;
    const next = [...board];
    next[i] = "X";
    setBoard(next);
    const { who } = winnerOf(next);
    if (who || next.every(Boolean)) return;
    setThinking(true);
    setTimeout(() => {
      const { move } = minimax([...next], true);
      if (move >= 0) next[move] = "O";
      setBoard([...next]);
      setThinking(false);
    }, 420);
  };

  const reset = () => { setBoard(Array(9).fill(null)); setThinking(false); };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex flex-1 items-center justify-center pt-40 pb-24">
        <p className="text-text-secondary">page content — scroll down to the footer ↓</p>
      </div>

      {/* ══════════════ THE FOOTER ══════════════ */}
      <footer className="border-t" style={{ borderColor: T.border }}>
        <div className="mx-auto grid w-full max-w-[1200px] gap-14 px-6 py-16 md:grid-cols-[1fr_auto]">

          {/* left: statement + links */}
          <div className="flex flex-col justify-between gap-10">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: T.body }}>
                Sushant Kumar — Product Designer
              </p>
              <p className="mt-4 max-w-[420px] text-[34px] font-medium leading-[1.25] tracking-[-0.02em]" style={{ color: T.heading }}>
                Let’s solve the right problem, together.
              </p>
              <a
                href="mailto:skponpurpose@gmail.com"
                className="mt-6 inline-flex items-center gap-2 text-[16px] font-semibold transition-opacity hover:opacity-75"
                style={{ color: T.brand }}
              >
                skponpurpose@gmail.com →
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-[14px] font-medium transition-colors hover:text-black"
                  style={{ color: T.body }}
                >
                  {l.label}
                </a>
              ))}
              <span className="text-[13px]" style={{ color: T.body }}>© 2026 SKP</span>
            </div>
          </div>

          {/* right: quiet corner piece — a small board, no fanfare */}
          <div className="flex flex-col items-start gap-3 self-end md:items-end">
            <div className="grid w-fit grid-cols-3 gap-1.5">
              {board.map((cell, i) => {
                const isWin = line.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() => play(i)}
                    aria-label={`cell ${i + 1}`}
                    className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-black/[0.06]"
                    style={{
                      border: `1px solid ${isWin ? "rgba(2,132,199,0.55)" : "rgba(0,0,0,0.14)"}`,
                      background: isWin ? "rgba(2,132,199,0.08)" : "#f4f6f8",
                      cursor: cell || gameOver ? "default" : "pointer",
                    }}
                  >
                    {cell === "X" && (
                      <svg width="16" height="16" viewBox="0 0 30 30" aria-hidden>
                        <path d="M6 6 L24 24 M24 6 L6 24" stroke={T.heading} strokeWidth="3.2" strokeLinecap="round"
                          style={{ strokeDasharray: 52, strokeDashoffset: 0, animation: "ttt-draw .28s ease-out" }} />
                      </svg>
                    )}
                    {cell === "O" && (
                      <svg width="16" height="16" viewBox="0 0 30 30" aria-hidden>
                        <circle cx="15" cy="15" r="9.5" fill="none" stroke={T.brand} strokeWidth="3.2" strokeLinecap="round"
                          style={{ strokeDasharray: 60, strokeDashoffset: 0, animation: "ttt-draw .32s ease-out" }} />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
            <style>{`@keyframes ttt-draw { from { stroke-dashoffset: 60; } to { stroke-dashoffset: 0; } }`}</style>

            <p className="max-w-[220px] text-[12px] leading-relaxed md:text-right" style={{ color: T.body, opacity: 0.85 }}>
              {gameOver ? (
                <>
                  {winner === "X" ? "Impossible — you actually won. Tell me how." : winner === "O" ? "Still unbeaten." : "A draw — the closest anyone gets."}{" "}
                  <button onClick={reset} className="underline decoration-black/20 underline-offset-2 transition-colors hover:text-black" style={{ color: T.body }}>
                    again?
                  </button>
                  <span className="mt-0.5 block tabular-nums" style={{ opacity: 0.7 }}>
                    you {score.you} · draws {score.draws} · skp {score.skp}
                  </span>
                </>
              ) : (
                "unbeaten at this so far — care to try?"
              )}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
