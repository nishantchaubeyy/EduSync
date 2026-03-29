"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { MobileBottomNav } from "./MobileBottomNav";

function usesSectionNavigation(pathname: string): boolean {
  return (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/instructor") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/resources") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up")
  );
}

import { useSidebar } from "./SidebarContext";

export function AppFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isOpen } = useSidebar();
  // Always show Global Navbar so users can go back Home easily,
  // but we can adjust CSS padding based on role-based sidebars.
  const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/instructor") || pathname.startsWith("/admin");

  return (
    <>
      <Navbar />
      <main
        className={`app-main min-h-screen transition-all duration-500 ease-in-out ${isDashboard ? (isOpen ? 'lg:pl-72' : 'lg:pl-24') : ''}`}
        style={{ paddingTop: '80px' }} // Navbar height
      >
        {children}
      </main>
      <MobileBottomNav />
    </>
  );
}
