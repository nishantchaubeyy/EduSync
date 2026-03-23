"use client";

import React from "react";

/**
 * BrandLogo - Premium indicator for the EduSync brand
 * Uses Material Symbols and a slate/indigo theme to match "The Digital Curator" aesthetic.
 */
export function BrandLogo({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
    const dimensions = size === "sm" ? "w-8 h-8 rounded-lg" : size === "md" ? "w-11 h-11 rounded-xl" : "w-20 h-20 rounded-[2rem]";
    const iconSize = size === "sm" ? "text-lg" : size === "md" ? "text-2xl" : "text-4xl";

    return (
        <div className={`${dimensions} bg-slate-900 flex items-center justify-center shadow-2xl border border-white/10 transition-all duration-500 overflow-hidden ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
            <span className={`material-symbols-outlined ${iconSize} text-indigo-400 relative z-10`} style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_stories
            </span>
        </div>
    );
}
