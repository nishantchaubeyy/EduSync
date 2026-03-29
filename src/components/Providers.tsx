"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import React from "react";

// Initialize Convex client with environment variable
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
    throw new Error(
        "NEXT_PUBLIC_CONVEX_URL environment variable is not set. " +
        "Please create a .env.local file with your Convex deployment URL: " +
        "NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud"
    );
}

const convex = new ConvexReactClient(convexUrl);

// Separate client component to handle auth hook
function ConvexClientWrapper({ children }: { children: React.ReactNode }) {
    const { getToken } = useAuth();
    const [isReady, setIsReady] = useState(true);

    // Configure Convex to fetch token from Clerk
    useEffect(() => {
        convex.setAuth(async () => {
            try {
                const token = await getToken({ template: "convex" });
                return token || null;
            } catch (error) {
                console.error("Failed to get Convex token from Clerk:", error);
                return null;
            }
        });
        setIsReady(true);
    }, [getToken]);

    if (!isReady) {
        return null;
    }

    return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <ConvexClientWrapper>
                {children}
            </ConvexClientWrapper>
        </ClerkProvider>
    );
}
