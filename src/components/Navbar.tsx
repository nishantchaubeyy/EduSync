"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatedLogo } from "./AnimatedLogo";

const navLinks = [
    { href: "/", label: "Dashboard", exact: true },
    { href: "/courses", label: "Courses" },
    { href: "/dashboard", label: "Resources" },
    { href: "/instructor", label: "Faculty" },
];

export function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-[#fcf8ff] shadow-sm">
                <div className="flex justify-between items-center w-full px-4 sm:px-8 py-3 sm:py-4 max-w-screen-2xl mx-auto">
                    {/* Logo + Animated University Name */}
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <Link href="/" className="flex items-center gap-3 sm:gap-4 min-w-0">
                            <img alt="EduSync logo" className="h-9 sm:h-12 w-auto shrink-0" src="/image.png" />
                            <span className="hidden xs:inline-flex"><AnimatedLogo /></span>
                        </Link>
                    </div>

                    {/* Center Nav Links (desktop only) */}
                    <div className="hidden lg:flex items-center gap-12">
                        {navLinks.map((link) => {
                            const isActive = link.exact
                                ? pathname === link.href
                                : pathname.startsWith(link.href);
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`text-sm uppercase tracking-widest transition-colors duration-300 ${isActive
                                        ? "text-primary border-b-2 border-tertiary pb-1 font-bold"
                                        : "text-slate-600 hover:text-primary"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 sm:gap-6">
                        <button className="text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-all">
                            <span className="material-symbols-outlined text-[20px] sm:text-[24px]">notifications</span>
                        </button>
                        <button className="hidden sm:block text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-all">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden bg-surface-container flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-500 text-[20px] sm:text-[24px]">person</span>
                        </div>

                        {/* Hamburger (mobile/tablet) */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            <span className="material-symbols-outlined text-[24px]">
                                {mobileOpen ? "close" : "menu"}
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />
                    {/* Slide-down panel */}
                    <div className="absolute top-[60px] sm:top-[72px] left-0 right-0 bg-[#fcf8ff] shadow-xl border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                        <div className="flex flex-col p-4 gap-1">
                            {navLinks.map((link) => {
                                const isActive = link.exact
                                    ? pathname === link.href
                                    : pathname.startsWith(link.href);
                                return (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-widest transition-all ${isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-slate-600 hover:bg-slate-50"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                        <div className="px-4 pb-4 pt-2 border-t border-slate-100">
                            <div className="flex items-center gap-3 px-4 py-3 text-slate-500">
                                <span className="material-symbols-outlined text-[20px]">settings</span>
                                <span className="text-sm font-medium">Settings</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
