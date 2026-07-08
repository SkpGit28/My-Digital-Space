"use client";

/**
 * FOOTER TEST 4 - challenge footer.
 * The footer turns contact into a small wager: play a perfect TicTacToe bot.
 * A win or draw earns the same-day reply promise, while the left side stays
 * professional with a clear product-design CTA.
 */

import { ArrowUpRight, Mail, RotateCcw, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Cell = "X" | "O" | null;
type RoundResult = "playing" | "draw" | "user" | "skp";

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const INITIAL_BOARD: Cell[] = Array(9).fill(null);
const INITIAL_SCORE = { you: 0, draws: 0, skp: 0 };

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/skplovesdesign" },
  { label: "GitHub", href: "https://github.com/SkpGit28" },
  { label: "Resume", href: "/resume.pdf" },
  { label: "Work", href: "/work" },
];

function getWinner(board: Cell[]) {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }

  return { winner: null, line: [] as number[] };
}

function getRoundResult(board: Cell[]): RoundResult {
  const { winner } = getWinner(board);
  if (winner === "X") return "user";
  if (winner === "O") return "skp";
  if (board.every(Boolean)) return "draw";
  return "playing";
}

function minimax(board: Cell[], aiTurn: boolean): { score: number; move: number } {
  const result = getRoundResult(board);

  if (result === "skp") return { score: 10, move: -1 };
  if (result === "user") return { score: -10, move: -1 };
  if (result === "draw") return { score: 0, move: -1 };

  let bestScore = aiTurn ? -Infinity : Infinity;
  let bestMove = -1;

  for (let index = 0; index < board.length; index += 1) {
    if (board[index]) continue;

    board[index] = aiTurn ? "O" : "X";
    const { score } = minimax(board, !aiTurn);
    board[index] = null;

    if (aiTurn ? score > bestScore : score < bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }

  return { score: bestScore, move: bestMove };
}

function readScore() {
  if (typeof window === "undefined") return INITIAL_SCORE;

  try {
    const saved = window.localStorage.getItem("skp-footer-challenge-score");
    return saved ? JSON.parse(saved) : INITIAL_SCORE;
  } catch {
    return INITIAL_SCORE;
  }
}

export default function FooterTest4Page() {
  const [board, setBoard] = useState<Cell[]>(INITIAL_BOARD);
  const [thinking, setThinking] = useState(false);
  const [score, setScore] = useState(INITIAL_SCORE);
  const [lockedResult, setLockedResult] = useState<RoundResult>("playing");

  useEffect(() => {
    const timer = window.setTimeout(() => setScore(readScore()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const { line } = useMemo(() => getWinner(board), [board]);
  const roundResult = lockedResult === "playing" ? getRoundResult(board) : lockedResult;
  const gameOver = roundResult !== "playing";

  const saveScore = (result: RoundResult) => {
    if (result === "playing") return;

    setScore((current) => {
      const next = {
        you: current.you + (result === "user" ? 1 : 0),
        draws: current.draws + (result === "draw" ? 1 : 0),
        skp: current.skp + (result === "skp" ? 1 : 0),
      };

      try {
        window.localStorage.setItem("skp-footer-challenge-score", JSON.stringify(next));
      } catch {}

      return next;
    });
    setLockedResult(result);
  };

  const play = (index: number) => {
    if (board[index] || thinking || gameOver) return;

    const afterUser = [...board];
    afterUser[index] = "X";
    setBoard(afterUser);

    const userResult = getRoundResult(afterUser);
    if (userResult !== "playing") {
      saveScore(userResult);
      return;
    }

    setThinking(true);
    window.setTimeout(() => {
      const afterBot = [...afterUser];
      const { move } = minimax(afterBot, true);

      if (move >= 0) afterBot[move] = "O";

      setBoard(afterBot);
      setThinking(false);
      saveScore(getRoundResult(afterBot));
    }, 460);
  };

  const resetRound = () => {
    setBoard(INITIAL_BOARD);
    setThinking(false);
    setLockedResult("playing");
  };

  const statusText =
    roundResult === "user"
      ? "You won. That earns the fast lane."
      : roundResult === "draw"
        ? "A draw against perfect play counts. Respect."
        : roundResult === "skp"
          ? "SKP takes this round. Run it back."
          : thinking
            ? "Reading the board..."
            : "Your move. You are X.";

  const ctaText =
    roundResult === "user" || roundResult === "draw"
      ? "Claim same-day reply"
      : "Start a conversation";

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#111318]">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-end px-5 pt-24 md:px-8">
        <section className="mb-20 max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#687083]">
            Footer test 04
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
            Challenge footer with a contact CTA baked into the game.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#687083] md:text-lg">
            The footer stays useful, but it leaves one memorable interaction:
            beat or draw the board to unlock the same-day reply promise.
          </p>
        </section>
      </main>

      <footer className="border-t border-black/[0.08] bg-[#fbfbfc]">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-10 md:grid-cols-[minmax(0,1fr)_420px] md:px-8 md:py-16">
          <section className="flex min-h-[520px] flex-col justify-between gap-10">
            <div>
              <div className="flex w-fit items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#687083] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Available for sharp product problems
              </div>

              <h2 className="mt-7 max-w-2xl text-[42px] font-semibold leading-[1.04] tracking-normal md:text-[70px]">
                Beat me for a same-day reply.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#687083]">
                I design trust-heavy fintech journeys, design systems, and
                product flows where clarity matters. If the board ends in your
                favor, the inbox gets priority.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:skponpurpose@gmail.com"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#111318] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(17,19,24,0.18)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Mail size={17} />
                  {ctaText}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="rounded-full border border-black/[0.1] bg-white px-5 py-3 text-sm font-semibold text-[#4f5868] transition-colors hover:text-[#111318]"
                >
                  Back to top
                </button>
              </div>
            </div>

            <div className="border-t border-black/[0.08] pt-6">
              <nav className="flex flex-wrap gap-x-7 gap-y-3" aria-label="Footer links">
                {LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#5d6677] transition-colors hover:text-[#111318]"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </a>
                ))}
              </nav>
              <p className="mt-4 text-sm text-[#7a8291]">
                Noida, India. Product Designer at Payfi. Built with an unfair
                amount of board-game seriousness.
              </p>
            </div>
          </section>

          <section
            className="h-fit rounded-[28px] border border-black/[0.08] bg-white p-5 shadow-[0_24px_70px_rgba(17,19,24,0.08)] md:p-6"
            aria-label="TicTacToe challenge"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-[#0284C7]">
                  <Trophy size={15} />
                  Footer challenge
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-normal text-[#111318]">
                  Perfect-play TicTacToe
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#687083]">
                  You are X. SKP is O. Win or force a draw to earn the reply
                  promise.
                </p>
              </div>

              <button
                type="button"
                onClick={resetRound}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/[0.08] text-[#687083] transition-colors hover:bg-[#f3f5f8] hover:text-[#111318]"
                aria-label="Reset round"
              >
                <RotateCcw size={16} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {[
                { label: "You", value: score.you },
                { label: "Draws", value: score.draws },
                { label: "SKP", value: score.skp },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-black/[0.06] bg-[#f7f8fa] px-3 py-3 text-center"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#778092]">
                    {item.label}
                  </p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums text-[#111318]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {board.map((cell, index) => {
                const isWinCell = line.includes(index);

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => play(index)}
                    disabled={Boolean(cell) || thinking || gameOver}
                    aria-label={`Cell ${index + 1}`}
                    className="flex aspect-square min-h-[86px] items-center justify-center rounded-2xl border text-[38px] font-semibold transition-all duration-200 disabled:cursor-default md:min-h-[104px]"
                    style={{
                      borderColor: isWinCell ? "#0284C7" : "rgba(0,0,0,0.08)",
                      background: isWinCell
                        ? "rgba(2,132,199,0.07)"
                        : cell
                          ? "#f7f8fa"
                          : "#ffffff",
                      color: cell === "O" ? "#0284C7" : "#111318",
                    }}
                  >
                    {cell}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-black/[0.06] bg-[#f7f8fa] px-4 py-4">
              <p
                className="min-h-[24px] text-sm font-semibold"
                style={{
                  color:
                    roundResult === "user" || roundResult === "draw"
                      ? "#047857"
                      : roundResult === "skp"
                        ? "#111318"
                        : "#687083",
                }}
              >
                {statusText}
              </p>
              <p className="mt-2 text-xs leading-5 text-[#7a8291]">
                Score is saved locally in this browser, so the footer remembers
                the rivalry.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
