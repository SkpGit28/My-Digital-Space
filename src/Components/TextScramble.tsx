"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface TextScrambleProps {
    children: string;
    className?: string;
    duration?: number;
    speed?: number;
    characterSet?: string;
    as?: React.ElementType;
}

const DEFAULT_CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~|}{[]:;?><,./-=";

const TextScramble: React.FC<TextScrambleProps> = ({
    children,
    className = "",
    duration = 1.5,
    speed = 0.04,
    characterSet = DEFAULT_CHARACTER_SET,
    as: Component = "span"
}) => {
    const [displayText, setDisplayText] = useState(children);
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isInView && !isAnimating) {
            scramble();
        }
    }, [isInView]);

    const scramble = () => {
        setIsAnimating(true);
        let iteration = 0;
        const maxIterations = children.length;

        // Calculate total frames based on duration
        // We want to control the pacing. 
        // Let's try a different approach:
        // We update the text every `speed` seconds (e.g. 30ms).
        // We want to resolve the whole string over `duration` seconds.

        const interval = setInterval(() => {
            setDisplayText(prev => {
                return children
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return children[index];
                        }
                        return characterSet[Math.floor(Math.random() * characterSet.length)];
                    })
                    .join("");
            });

            if (iteration >= children.length) {
                clearInterval(interval);
                setIsAnimating(false);
            }

            // Nonlinear pacing: start slow, speed up, or just linear
            // Simple linear reveal:
            iteration += 1 / (duration * 10); // Adjust this factor to control speed relative to duration

            // Or just increment by a fixed amount to ensure it finishes?
            // Let's just increment by 1/3 of a character per frame to make it look "computery"
            // iteration += 1/3; 

            // Actually, let's use the user's duration preference.
            // Total frames = duration / 0.03 (assuming 30ms interval)
            // Steps per frame = length / Total frames

            iteration += children.length / (duration / speed);

        }, speed * 1000);

        return () => clearInterval(interval);
    };

    return (
        <Component ref={ref} className={className}>
            {displayText}
        </Component>
    );
};

export default TextScramble;
