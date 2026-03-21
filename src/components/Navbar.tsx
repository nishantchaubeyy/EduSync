"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedLogo } from "./AnimatedLogo";

const navLinks = [
    { href: "/", label: "Dashboard", exact: true },
    { href: "/courses", label: "Courses" },
    { href: "/dashboard", label: "Resources" },
    { href: "/instructor", label: "Faculty" },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 z-50 w-full bg-[#fcf8ff] shadow-sm">
            <div className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
                {/* Logo + Animated University Name */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-4">
                        <img alt="EduSync logo" className="h-12 w-auto" src="/image.png" />
                        <AnimatedLogo />
                    </Link>
                </div>

                {/* Center Nav Links */}
                <div className="hidden md:flex items-center gap-12">
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
                <div className="flex items-center gap-6">
                    <button className="text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-all">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <button className="text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-all">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-surface-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-500">person</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
