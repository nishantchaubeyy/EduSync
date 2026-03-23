"use client";

import React from "react";

/**
 * StaticBrandLogo - A static version of the edusync brand text
 * Matches the requested aesthetic: Italic Playfair Display with a teal gradient.
 */
export function StaticBrandLogo({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
    const sizeClasses = {
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-4xl"
    };

    return (
        <span
            className={`font-serif italic font-bold tracking-tight select-none ${sizeClasses[size]} ${className}`}
            style={{
                fontFamily: "'Playfair Display', serif",
                background: 'linear-gradient(to right, #004d40, #00796b, #26a69a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
            }}
        >
            edusync
        </span>
    );
}
