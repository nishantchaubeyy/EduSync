"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";

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

    return (
        <aside className="hidden lg:flex h-screen w-64 fixed left-0 top-0 bg-slate-50 flex-col p-6 gap-3 text-sm font-medium z-[999] border-r border-slate-200 shadow-xl transition-all duration-300">
            <div className="mb-8 px-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md border border-slate-100 overflow-hidden p-1">
                        <img src="/image.png" alt="University Logo" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xl font-bold text-primary font-headline">Curator</span>
                </div>
            </div>

            <nav className="flex-1 space-y-1.5">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "#" && pathname.startsWith(item.href) && item.href !== "/courses");
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 select-none ${isActive
                                ? "bg-slate-50 text-primary shadow-inner border border-slate-200/50"
                                : "text-slate-500 hover:text-primary hover:bg-slate-50/80"
                                }`}
                        >
                            <span className={`material-symbols-outlined text-[22px] ${isActive ? 'filled' : ''}`}>{item.icon}</span>
                            <span className="font-bold tracking-tight">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
                {/* User Section */}
                <div className="flex items-center gap-3 px-2 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                    {isLoaded && user && <UserButton appearance={{ elements: { userButtonAvatarBox: "h-10 w-10 border-2 border-white shadow-sm" } }} />}
                    <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-primary truncate">
                            {user?.firstName || user?.username || "Learner"}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate opacity-80 uppercase tracking-tighter">
                            Active Student
                        </span>
                    </div>
                </div>

                <div className="space-y-1">
                    {isLoaded && user && (
                        <button
                            onClick={() => signOut({ redirectUrl: "/" })}
                            className="w-full text-left flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-primary hover:bg-slate-50 transition-all duration-300 rounded-xl group"
                        >
                            <span className="material-symbols-outlined text-[22px] group-hover:rotate-12 transition-transform">logout</span>
                            <span className="font-bold tracking-tight">Logout</span>
                        </button>
                    )}
                </div>
            </div>
        </aside>
    );
}
