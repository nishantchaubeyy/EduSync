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

export function AppFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showGlobalNavbar = !usesSectionNavigation(pathname);

  return (
    <>
      {showGlobalNavbar ? <Navbar /> : null}
      <main className={showGlobalNavbar ? "app-main min-h-screen" : "min-h-screen"}>
        {children}
      </main>
      <MobileBottomNav />
    </>
  );
}
