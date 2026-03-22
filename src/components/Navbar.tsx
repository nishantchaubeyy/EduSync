"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedLogo } from "./AnimatedLogo";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { appNavLinks } from "./app-nav-links";

export function Navbar() {
    const pathname = usePathname();
    const { userId, isLoaded } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] h-[72px] bg-white border-b border-slate-100 shadow-sm flex items-center">
            <div className="w-full max-w-screen-2xl mx-auto px-4 flex items-center justify-between gap-4">

                {/* ─── Left Section: Logo + Text ─── */}
                <div className="flex items-center gap-2 shrink-0">
                    <Link href="/" className="flex items-center gap-3 group">
                        <img
                            alt="DY Patil International University Logo"
                            style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
                            className="shrink-0 transition-transform duration-300 group-hover:scale-105"
                            src="/image.png"
                        />
                        <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block" />
                        <div className="flex items-center scale-90 origin-left">
                            <AnimatedLogo />
                        </div>
                    </Link>
                </div>

                {/* ─── Center Section: Navigation Pill ─── */}
                <div className="hidden lg:flex items-center shrink-0">
                    <div className="flex items-center bg-slate-50/50 border border-slate-200/50 rounded-full px-1.5 py-1 gap-0.5 shadow-inner backdrop-blur-sm">
                        {appNavLinks.map((link) => {
                            const isActive = link.exact
                                ? pathname === link.href
                                : pathname.startsWith(link.href);
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`
                                        px-4 py-2 rounded-full font-bold text-[11px] xl:text-xs tracking-wide transition-all duration-200
                                        ${isActive
                                            ? "text-primary bg-white shadow-sm ring-1 ring-slate-200/50"
                                            : "text-slate-500 hover:text-primary hover:bg-white/60"
                                        }
                                    `}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* ─── Right Section: Icons + Auth ─── */}
                <div className="flex items-center gap-4 shrink-0">
                    {/* Icons */}
                    <div className="flex items-center gap-3 pr-2 border-r border-slate-100">
                        <button className="text-slate-400 hover:text-primary transition-all duration-200">
                            <span className="material-symbols-outlined text-[22px]">notifications</span>
                        </button>
                        <button className="text-slate-400 hover:text-primary transition-all duration-200">
                            <span className="material-symbols-outlined text-[20px]">settings</span>
                        </button>
                    </div>

                    {/* Sign In / Profile */}
                    <div className="flex items-center min-w-[120px] justify-end">
                        {isLoaded && userId ? (
                            <UserButton appearance={{ elements: { userButtonAvatarBox: "h-9 w-9 shadow-sm" } }} />
                        ) : isLoaded && !userId ? (
                            <SignInButton mode="modal">
                                <button className="bg-black text-white px-6 py-2.5 rounded-[4px] border border-black transition-all duration-200 hover:text-black hover:-translate-x-1 hover:-translate-y-1 hover:bg-[#90d1ff] hover:shadow-[4px_4px_0px_#000] active:translate-x-0 active:translate-y-0 active:shadow-none font-bold uppercase tracking-widest text-[11px] sm:text-xs">
                                    SIGN IN :)
                                </button>
                            </SignInButton>
                        ) : (
                            <div className="w-24 h-9 bg-slate-50 rounded-[4px] animate-pulse" />
                        )}
                    </div>

                    {/* Mobile Menu Icon */}
                    <button className="lg:hidden p-1 text-slate-800">
                        <span className="material-symbols-outlined text-[26px]">menu</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
