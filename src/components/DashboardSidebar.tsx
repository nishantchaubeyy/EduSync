"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { BrandLogo } from "./BrandLogo";
import { StaticBrandLogo } from "./StaticBrandLogo";

import { useSidebar } from "./SidebarContext";

export function DashboardSidebar() {
    const pathname = usePathname();
    const { signOut } = useClerk();
    const { user, isLoaded } = useUser();
    const { isOpen, toggle } = useSidebar();

    // Determine dashboard root based on current path
    const dashboardHref = pathname.startsWith("/instructor") ? "/instructor" : "/dashboard";
    const dashboardLabel = pathname.startsWith("/instructor") ? "Instructor Hub" : "Student Dashboard";

    const navItems = [
        { href: "/", icon: "home", label: "Back to Home" },
        { href: dashboardHref, icon: "dashboard", label: dashboardLabel },
        { href: "/courses", icon: "menu_book", label: "Browse Catalog" },
        { href: "#", icon: "assignment", label: "Assignments" },
        { href: "#", icon: "calendar_today", label: "Schedule" },
        { href: "/resources", icon: "folder_open", label: "Resources" },
        { href: "#", icon: "settings", label: "Settings" },
    ];

    // Dynamic role display based on route
    const getRoleLabel = () => {
        if (pathname.startsWith("/instructor")) return "Curriculum Instructor";
        if (pathname.startsWith("/admin")) return "Systems Admin";
        return "Academic Learner";
    };

    return (
        <aside className={`hidden lg:flex h-[calc(100vh-80px)] fixed left-0 top-[80px] bg-white flex-col p-4 gap-3 text-sm font-medium z-[999] border-r border-slate-100 shadow-2xl shadow-slate-200/20 transition-all duration-500 ease-in-out ${isOpen ? 'w-72' : 'w-24'}`}>

            {/* ─── Integrated Sidebar Toggle ─── */}
            <div className={`mb-6 flex ${isOpen ? 'justify-end pr-2' : 'justify-center'}`}>
                <button
                    onClick={toggle}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:bg-white hover:border-indigo-100 transition-all active:scale-95 shadow-sm"
                    title={isOpen ? "Collapse Menu" : "Expand Menu"}
                >
                    <span className={`material-symbols-outlined text-[24px] transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
                        dock_to_left
                    </span>
                </button>
            </div>

            <nav className="flex-1 space-y-3">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "#" && item.href !== "/" && pathname.startsWith(item.href) && item.href !== "/courses");
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center rounded-[1.5rem] transition-all duration-500 select-none overflow-hidden ${isOpen ? 'px-6 py-4 gap-5' : 'aspect-square justify-center'} ${isActive
                                ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20"
                                : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                                }`}
                            title={!isOpen ? item.label : undefined}
                        >
                            <span className={`material-symbols-outlined text-[26px] shrink-0 ${isActive ? 'filled' : ''}`}>{item.icon}</span>
                            {isOpen && (
                                <span className="font-extrabold tracking-tight text-base whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-500">
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-8 border-t border-slate-50 space-y-6">
                {/* User Section */}
                <div className={`flex items-center bg-slate-50/50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 group overflow-hidden ${isOpen ? 'px-4 py-4 gap-4' : 'aspect-square justify-center'}`}>
                    {isLoaded && user && <UserButton appearance={{ elements: { userButtonAvatarBox: `${isOpen ? 'h-12 w-12' : 'h-10 w-10'} border-4 border-white shadow-md` } }} />}
                    {isOpen && (
                        <div className="flex flex-col min-w-0 animate-in fade-in slide-in-from-left-2 duration-500">
                            <span className="text-sm font-black text-slate-900 truncate tracking-tight">
                                {user?.firstName || user?.username || "Learner"}
                            </span>
                            <span className="text-[10px] text-slate-400 truncate font-black uppercase tracking-[0.1em] mt-0.5">
                                {getRoleLabel()}
                            </span>
                        </div>
                    )}
                </div>

                <div className={`flex ${isOpen ? 'px-2' : 'justify-center'}`}>
                    {isLoaded && user && (
                        <button
                            onClick={() => signOut({ redirectUrl: "/" })}
                            className={`flex items-center text-slate-400 hover:text-error hover:bg-error/5 transition-all duration-300 rounded-2xl group ${isOpen ? 'w-full px-5 py-4 gap-4' : 'aspect-square justify-center'}`}
                            title={!isOpen ? "Terminate Session" : undefined}
                        >
                            <span className="material-symbols-outlined text-[24px] group-hover:rotate-12 transition-transform">logout</span>
                            {isOpen && <span className="font-black tracking-tight text-base animate-in fade-in slide-in-from-left-2 duration-500">Terminate</span>}
                        </button>
                    )}
                </div>
            </div>
        </aside>
    );
}
