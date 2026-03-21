"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appNavLinks } from "./app-nav-links";

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-md safe-area-bottom lg:hidden">
      <nav className="app-shell app-shell--wide flex items-center justify-around gap-1 px-2 py-2">
        {appNavLinks.map((link) => {
          const isActive = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex flex-1 min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-semibold tracking-wide transition-colors ${
                isActive ? "text-primary" : "text-slate-500"
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {link.icon}
              </span>
              <span className="truncate">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
