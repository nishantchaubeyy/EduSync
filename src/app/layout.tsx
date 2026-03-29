import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduSync | The Digital Curator of Higher Learning",
  description: "Navigate the future of academia with EduSync. We curate the intellectual journey of tomorrow's leaders.",
};

import { Providers } from "@/components/Providers";
import { AppFrame } from "@/components/AppFrame";
import { SidebarProvider } from "@/components/SidebarContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background min-h-screen text-on-surface font-body selection:bg-tertiary-fixed selection:text-on-tertiary-fixed`}
      >
        <Providers>
          <SidebarProvider>
            <AppFrame>{children}</AppFrame>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
