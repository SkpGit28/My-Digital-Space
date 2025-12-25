"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

type Player = 'X' | 'O';
type SquareValue = Player | null;

const TicTacToe: React.FC = () => {
    const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
    const [isUserTurn, setIsUserTurn] = useState(true); // User is always X and goes first
    const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

    const calculateWinner = useCallback((squares: SquareValue[]) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }, []);

    const resetGame = useCallback(() => {
        setSquares(Array(9).fill(null));
        setIsUserTurn(true);
        setWinner(null);
    }, []);

    // Computer Move Logic
    useEffect(() => {
        if (!isUserTurn && !winner) {
            const timer = setTimeout(() => {
                const emptyIndices = squares
                    .map((val, idx) => (val === null ? idx : null))
                    .filter((val) => val !== null) as number[];

                if (emptyIndices.length > 0) {
                    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
                    const nextSquares = [...squares];
                    nextSquares[randomIndex] = 'O';
                    setSquares(nextSquares);
                    setIsUserTurn(true);
                }
            }, 500); // Delay for computer move
            return () => clearTimeout(timer);
        }
    }, [isUserTurn, winner, squares]);

    // Check for Winner or Draw
    useEffect(() => {
        const win = calculateWinner(squares);
        if (win) {
            setWinner(win);
        } else if (!squares.includes(null)) {
            setWinner('Draw');
        }
    }, [squares, calculateWinner]);

    // Auto Reset
    useEffect(() => {
        if (winner) {
            const timer = setTimeout(() => {
                resetGame();
            }, 2000); // Reset after 2 seconds
            return () => clearTimeout(timer);
        }
    }, [winner, resetGame]);

    const handleClick = (i: number) => {
        if (squares[i] || winner || !isUserTurn) return;

        const nextSquares = [...squares];
        nextSquares[i] = 'X';
        setSquares(nextSquares);
        setIsUserTurn(false);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-between w-full mb-2">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Let's Play</span>
                <button
                    onClick={resetGame}
                    className="text-slate-500 hover:text-white transition-colors"
                    aria-label="Reset Game"
                >
                    <RefreshCw size={14} />
                </button>
            </div>

            {/* Grid Container */}
            <div className="relative grid grid-cols-3 w-[120px] h-[120px]">
                {/* Vertical Lines */}
                <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-white/20" />
                <div className="absolute top-0 bottom-0 right-1/3 w-[1px] bg-white/20" />

                {/* Horizontal Lines */}
                <div className="absolute left-0 right-0 top-1/3 h-[1px] bg-white/20" />
                <div className="absolute left-0 right-0 bottom-1/3 h-[1px] bg-white/20" />

                {squares.map((square, i) => (
                    <button
                        key={i}
                        className="w-full h-full flex items-center justify-center text-xl font-bold focus:outline-none hover:bg-white/5 transition-colors duration-200 rounded-sm"
                        onClick={() => handleClick(i)}
                        disabled={!!square || !!winner || !isUserTurn}
                    >
                        {square && (
                            <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`flex items-center justify-center w-full h-full leading-none ${square === 'X' ? 'text-text-accent' : 'text-emerald-400'}`}
                            >
                                {square}
                            </motion.span>
                        )}
                    </button>
                ))}
            </div>

            <div className="h-4">
                {winner && (
                    <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-mono text-white"
                    >
                        {winner === 'Draw' ? "It's a Draw!" : winner === 'X' ? "You Win!" : "I Won!"}
                    </motion.p>
                )}
            </div>
        </div>
    );
};

export default TicTacToe;
