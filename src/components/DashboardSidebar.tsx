"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

const navItems = [
    { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
    { href: "/courses", icon: "auto_stories", label: "My Courses" },
    { href: "#", icon: "assignment", label: "Assignments" },
    { href: "#", icon: "calendar_today", label: "Schedule" },
    { href: "#", icon: "folder_open", label: "Resources" },
    { href: "#", icon: "settings", label: "Settings" },
];

// Bottom bar items for mobile — keep it to 4-5 max
const mobileNavItems = [
    { href: "/dashboard", icon: "dashboard", label: "Home" },
    { href: "/courses", icon: "auto_stories", label: "Courses" },
    { href: "#", icon: "assignment", label: "Tasks" },
    { href: "#", icon: "settings", label: "More" },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Close sidebar on route change
    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    // Prevent body scroll when sidebar open on mobile
    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [sidebarOpen]);

    return (
        <>
            {/* ======= Desktop Sidebar (lg+) ======= */}
            <aside className="hidden lg:flex h-[calc(100vh-4rem)] w-64 fixed left-0 top-16 bg-slate-50 flex-col p-4 gap-2 text-sm font-medium z-30 border-r border-slate-100">
                <div className="mb-6 px-2 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-sm">school</span>
                    </div>
                    <span className="text-xl font-bold text-blue-900 font-headline">The Curator</span>
                </div>

                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "#" && pathname.startsWith(item.href) && item.href !== "/courses");
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out ${isActive
                                    ? "bg-white text-blue-900 shadow-sm"
                                    : "text-slate-600 hover:text-blue-800 hover:bg-slate-200/50"
                                    }`}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-4 border-t border-slate-200 space-y-1">
                    <button className="w-full text-left flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-blue-800 hover:bg-slate-200/50 transition-all duration-200 ease-in-out rounded-lg">
                        <span className="material-symbols-outlined">help</span>
                        <span>Help</span>
                    </button>
                    <button
                        onClick={() => signOut()}
                        className="w-full text-left flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-blue-800 hover:bg-slate-200/50 transition-all duration-200 ease-in-out rounded-lg"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        <span>Logout</span>
                    </button>
                    <div className="mt-4 p-4 bg-primary rounded-xl text-on-primary">
                        <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">Academic Atelier</p>
                        <p className="text-sm mb-3">Elevate your learning experience.</p>
                        <button className="w-full py-2 bg-white text-primary text-xs font-bold rounded-lg hover:bg-opacity-90 transition-all">
                            Upgrade Plan
                        </button>
                    </div>
                </div>
            </aside>

            {/* ======= Mobile Bottom Navigation Bar ======= */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 safe-area-bottom">
                <nav className="flex items-center justify-around px-2 py-1">
                    {mobileNavItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "#" && pathname.startsWith(item.href) && item.href !== "/courses");
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl min-w-[60px] transition-all ${isActive
                                    ? "text-primary"
                                    : "text-slate-400"
                                    }`}
                            >
                                <span className={`material-symbols-outlined text-[22px] ${isActive ? "" : ""}`} style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                                    {item.icon}
                                </span>
                                <span className="text-[10px] font-bold tracking-wide">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}
