"use client";

import { useEffect, useState, useRef } from "react";

/**
 * AnimatedLogo – Smooth letter-by-letter morphing transition
 * "DYPIU" → "edusync" with a left-to-right morph effect.
 *
 * Matches the reference video:
 *   - Elegant italic serif font (Playfair Display)
 *   - Dark-teal → light-teal gradient across text (via per-letter colors)
 *   - Each letter position morphs from source to target (left-to-right stagger)
 *   - 3D rotateX flip effect during morph
 *
 * Timeline:
 *   0.0s – 2.0s : Hold "DYPIU"
 *   2.0s – 4.5s : Letter-by-letter morph (left-to-right wipe)
 *   4.5s+        : Hold "edusync" (final state)
 */

const SOURCE = "DYPIU";
const TARGET = "edusync";

const MAX_LEN = Math.max(SOURCE.length, TARGET.length);

interface SlotData {
    srcChar: string;
    tgtChar: string;
}

function buildSlots(): SlotData[] {
    const slots: SlotData[] = [];
    for (let i = 0; i < MAX_LEN; i++) {
        slots.push({
            srcChar: i < SOURCE.length ? SOURCE[i] : "",
            tgtChar: i < TARGET.length ? TARGET[i] : "",
        });
    }
    return slots;
}

const SLOTS = buildSlots();

const HOLD_MS = 2000;
const MORPH_DURATION_MS = 2500;
const STAGGER_MS = MORPH_DURATION_MS / MAX_LEN;

// Gradient colors: dark teal → medium teal → light teal (per-letter)
const GRADIENT_COLORS = [
    "#004d40", // darkest
    "#00695c",
    "#00796b",
    "#00897b",
    "#009688",
    "#1a9e8e",
    "#26a69a", // lightest
];

function getLetterColor(index: number, total: number): string {
    if (total <= 0) return GRADIENT_COLORS[0];
    const t = Math.min(Math.max(total <= 1 ? 0 : index / (total - 1), 0), 1);
    const ci = t * (GRADIENT_COLORS.length - 1);
    const lo = Math.floor(ci);
    const hi = Math.min(lo + 1, GRADIENT_COLORS.length - 1);
    const frac = ci - lo;

    // Interpolate hex colors
    const c1 = hexToRgb(GRADIENT_COLORS[lo]);
    const c2 = hexToRgb(GRADIENT_COLORS[hi]);
    const r = Math.round(c1.r + (c2.r - c1.r) * frac);
    const g = Math.round(c1.g + (c2.g - c1.g) * frac);
    const b = Math.round(c1.b + (c2.b - c1.b) * frac);
    return `rgb(${r},${g},${b})`;
}

function hexToRgb(hex: string) {
    const n = parseInt(hex.slice(1), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function AnimatedLogo() {
    const [phase, setPhase] = useState<"hold" | "morphing" | "done">("hold");
    const [progress, setProgress] = useState<number[]>(Array(MAX_LEN).fill(0));
    const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        const holdTimer = setTimeout(() => {
            setPhase("morphing");

            SLOTS.forEach((_, i) => {
                const delay = i * STAGGER_MS;
                const t = setTimeout(() => {
                    const slotDuration = 400;
                    const start = performance.now();

                    const animate = (now: number) => {
                        const elapsed = now - start;
                        const p = Math.min(elapsed / slotDuration, 1);
                        const eased = 1 - Math.pow(1 - p, 3);

                        setProgress((prev) => {
                            const next = [...prev];
                            next[i] = eased;
                            return next;
                        });

                        if (p < 1) {
                            requestAnimationFrame(animate);
                        } else if (i === MAX_LEN - 1) {
                            setTimeout(() => setPhase("done"), 100);
                        }
                    };
                    requestAnimationFrame(animate);
                }, delay);
                timersRef.current.push(t);
            });
        }, HOLD_MS);

        timersRef.current.push(holdTimer);

        return () => {
            timersRef.current.forEach(clearTimeout);
        };
    }, []);

    // Determine which word is showing right now for color gradient
    const currentWord = phase === "hold" ? SOURCE : TARGET;
    const currentLen = currentWord.length;

    return (
        <span className="animated-logo-wrapper" aria-label="EduSync">
            <span className="animated-logo-text">
                {SLOTS.map((slot, i) => {
                    const p = progress[i];
                    const showSrc = p < 0.5;
                    const char = showSrc ? slot.srcChar : slot.tgtChar;

                    // Morph opacity crossfade
                    const morphOpacity = showSrc
                        ? 1 - p * 2
                        : (p - 0.5) * 2;

                    // 3D flip effect
                    const scaleY = showSrc
                        ? 1 - p * 0.3
                        : 0.7 + (p - 0.5) * 0.6;

                    const rotateX = showSrc
                        ? p * 90
                        : (1 - p) * 90;

                    // For empty source slots, animate in from nothing
                    if (!slot.srcChar && phase === "hold") {
                        return (
                            <span
                                key={`slot-${i}`}
                                className="animated-logo-letter"
                                style={{
                                    opacity: 0,
                                    width: 0,
                                    overflow: "hidden",
                                }}
                            />
                        );
                    }

                    // Color: gradient from dark teal (left) to light teal (right)
                    const colorIndex = showSrc || phase === "hold"
                        ? i // position in source
                        : i; // position in target
                    const total = showSrc || phase === "hold"
                        ? SOURCE.length
                        : TARGET.length;
                    const color = getLetterColor(colorIndex, total);

                    return (
                        <span
                            key={`slot-${i}`}
                            className="animated-logo-letter"
                            style={{
                                color,
                                opacity: phase === "hold"
                                    ? 1
                                    : Math.max(0.05, morphOpacity),
                                transform: phase === "hold"
                                    ? "none"
                                    : `perspective(200px) rotateX(${rotateX}deg) scaleY(${scaleY})`,
                                transition: phase === "done" ? "all 0.3s ease" : "none",
                                width: !slot.srcChar && p < 0.3
                                    ? `${p * 3 * 0.6}em`
                                    : undefined,
                                overflow: !slot.srcChar && p < 0.3 ? "hidden" : undefined,
                            }}
                        >
                            {char || "\u00A0"}
                        </span>
                    );
                })}
            </span>
        </span>
    );
}
