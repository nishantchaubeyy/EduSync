"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { BrandLogo } from "./BrandLogo";
import { StaticBrandLogo } from "./StaticBrandLogo";

const navItems = [
    { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
    { href: "/courses", icon: "auto_stories", label: "My Courses" },
    { href: "#", icon: "assignment", label: "Assignments" },
    { href: "#", icon: "calendar_today", label: "Schedule" },
    { href: "/resources", icon: "folder_open", label: "Resources" },
    { href: "#", icon: "settings", label: "Settings" },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const { signOut } = useClerk();
    const { user, isLoaded } = useUser();

    // Dynamic role display based on route
    const getRoleLabel = () => {
        if (pathname.startsWith("/instructor")) return "Curriculum Instructor";
        if (pathname.startsWith("/admin")) return "Systems Admin";
        return "Academic Learner";
    };

    return (
        <aside className="hidden lg:flex h-screen w-72 fixed left-0 top-0 bg-white flex-col p-8 gap-3 text-sm font-medium z-[999] border-r border-slate-100 shadow-2xl shadow-slate-200/20 transition-all duration-300">
            <div className="mb-12 px-2 flex items-center justify-between">
                <div className="flex items-center gap-4 group">
                    <BrandLogo size="md" className="shadow-lg shadow-indigo-500/10 group-hover:rotate-[-8deg]" />
                    <div>
                        <StaticBrandLogo size="md" className="block leading-none" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 block opacity-60">Curator Node</span>
                    </div>
                </div>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "#" && pathname.startsWith(item.href) && item.href !== "/courses");
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 select-none ${isActive
                                ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20 translate-x-1"
                                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                }`}
                        >
                            <span className={`material-symbols-outlined text-[24px] ${isActive ? 'filled' : ''}`}>{item.icon}</span>
                            <span className="font-black tracking-tight text-base">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-8 border-t border-slate-50 space-y-6">
                {/* User Section */}
                <div className="flex items-center gap-4 px-4 py-4 bg-slate-50/50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                    {isLoaded && user && <UserButton appearance={{ elements: { userButtonAvatarBox: "h-12 w-12 border-4 border-white shadow-md" } }} />}
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-black text-slate-900 truncate tracking-tight">
                            {user?.firstName || user?.username || "Learner"}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate font-black uppercase tracking-[0.1em] mt-0.5">
                            {getRoleLabel()}
                        </span>
                    </div>
                </div>

                <div className="px-2">
                    {isLoaded && user && (
                        <button
                            onClick={() => signOut({ redirectUrl: "/" })}
                            className="w-full text-left flex items-center gap-4 px-5 py-4 text-slate-400 hover:text-error hover:bg-error/5 transition-all duration-300 rounded-2xl group"
                        >
                            <span className="material-symbols-outlined text-[24px] group-hover:rotate-12 transition-transform">logout</span>
                            <span className="font-black tracking-tight text-base">Terminate Session</span>
                        </button>
                    )}
                </div>
            </div>
        </aside>
    );
}
