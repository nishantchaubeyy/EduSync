"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedLogo } from "./AnimatedLogo";
import { UserButton, useAuth } from "@clerk/nextjs";
import { appNavLinks } from "./app-nav-links";
import { useSidebar } from "./SidebarContext";

export function Navbar() {
    const pathname = usePathname();
    const { userId, isLoaded } = useAuth();
    const { toggle, isOpen } = useSidebar();
    const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/instructor") || pathname.startsWith("/admin");

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] h-[80px] bg-white/70 backdrop-blur-2xl border-b border-slate-200/40 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-center transition-all duration-300">
            <div className="w-full max-w-screen-2xl mx-auto px-6 lg:px-10 flex items-center justify-between gap-6 sm:gap-8">

                {/* ─── Left Section: Logo only ─── */}
                <div className="flex items-center gap-4 shrink-0">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="relative p-1.5 bg-indigo-50/50 rounded-2xl group-hover:bg-indigo-600/5 transition-all group-hover:rotate-6">
                            <img
                                alt="DY Patil International University Logo"
                                style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
                                className="shrink-0 transition-all duration-500 group-hover:scale-110"
                                src="/image.png"
                            />
                        </div>
                        <div className="h-10 w-[1px] bg-slate-200/80 mx-1 hidden sm:block rotate-[15deg]" />
                        <div className="flex items-center scale-95 lg:scale-100 origin-left">
                            <AnimatedLogo />
                        </div>
                    </Link>
                </div>

                {/* ─── Center Section: Navigation Pill ─── */}
                <div className="hidden lg:flex items-center shrink-0">
                    <div className="flex items-center bg-slate-50/40 border border-slate-200/40 rounded-[1.5rem] p-1.5 gap-1.5 shadow-sm backdrop-blur-xl">
                        {appNavLinks.map((link) => {
                            const isActive = link.exact
                                ? pathname === link.href
                                : pathname.startsWith(link.href);
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`
                                        px-6 py-2.5 rounded-[1.2rem] font-black text-[11px] xl:text-xs tracking-[0.05em] uppercase transition-all duration-400
                                        ${isActive
                                            ? "text-indigo-600 bg-white shadow-[0_4px_12px_rgba(79,70,229,0.08)] ring-1 ring-indigo-50"
                                            : "text-slate-500 hover:text-indigo-600 hover:bg-white/80"
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
                <div className="flex items-center gap-6 shrink-0">
                    {/* Utility Icons */}
                    <div className="hidden sm:flex items-center gap-5 pr-4 border-r border-slate-200/50">
                        <button className="text-slate-400 hover:text-indigo-600 transition-all duration-300 transform hover:scale-110">
                            <span className="material-symbols-outlined text-[24px]">notifications</span>
                        </button>
                        <button className="text-slate-400 hover:text-indigo-600 transition-all duration-300 transform hover:rotate-90">
                            <span className="material-symbols-outlined text-[22px]">settings</span>
                        </button>
                    </div>

                    {/* Sign In / Profile */}
                    <div className="flex items-center min-w-[120px] justify-end">
                        {isLoaded && userId ? (
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex flex-col items-end mr-1">
                                    <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Active System</span>
                                    <span className="text-[9px] font-bold text-slate-400">Authenticated</span>
                                </div>
                                <UserButton appearance={{ elements: { userButtonAvatarBox: "h-10 w-10 shadow-lg border-2 border-white ring-2 ring-indigo-50/50" } }} />
                            </div>
                        ) : isLoaded && !userId ? (
                            <Link href="/sign-up" className="bg-black hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg font-bold transition-all text-[11px] sm:text-xs uppercase tracking-widest border border-black">
                                Sign Up
                            </Link>
                        ) : (
                            <div className="w-24 h-11 bg-slate-50 rounded-2xl animate-pulse ring-1 ring-slate-100" />
                        )}
                    </div>

                    {/* Mobile Menu Icon */}
                    <button className="lg:hidden p-2 text-slate-800 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all">
                        <span className="material-symbols-outlined text-[28px]">menu</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
