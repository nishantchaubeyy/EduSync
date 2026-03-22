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
        <nav className="app-nav fixed top-0 z-50 w-full bg-[#fcf8ff] shadow-sm">
            <div className="app-nav-inner app-shell app-shell--wide flex items-center justify-between w-full lg:hidden">
                <Link href="/" className="app-nav-mobile-brand flex items-center min-w-0">
                    <span className="app-nav-mobile-logo-wrap flex min-w-0 items-center">
                        <img alt="EduSync logo" className="app-nav-logo w-auto shrink-0 object-contain block" src="/image.png" />
                    </span>
                    <span className="app-nav-mobile-wordmark inline-flex min-w-0 items-center justify-end"><AnimatedLogo /></span>
                </Link>
            </div>

            <div className="app-nav-inner app-shell app-shell--wide hidden lg:flex justify-between items-center w-full">
                {/* Logo + Animated University Name */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <Link href="/" className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <img alt="EduSync logo" className="app-nav-logo w-auto shrink-0 object-contain block" src="/image.png" />
                        <span className="hidden xs:inline-flex"><AnimatedLogo /></span>
                    </Link>
                </div>

                {/* Center Nav Links (desktop only) */}
                <div className="flex items-center gap-12">
                    {appNavLinks.map((link) => {
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
                <div className="app-nav-actions flex items-center gap-2 sm:gap-6">
                    <button className="app-nav-icon-button text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-all">
                        <span className="material-symbols-outlined text-[20px] sm:text-[24px]">notifications</span>
                    </button>
                    <button className="app-nav-icon-button text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-all">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                    {isLoaded && userId ? (
                        <div className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10">
                            <UserButton />
                        </div>
                    ) : isLoaded && !userId ? (
                        <SignInButton mode="modal">
                            <button className="bg-primary text-white text-xs sm:text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all">
                                Sign In
                            </button>
                        </SignInButton>
                    ) : null}
                </div >
            </div >
        </nav >
    );
}
