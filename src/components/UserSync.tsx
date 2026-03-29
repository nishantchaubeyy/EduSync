"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect, useState } from "react";

export function UserSync() {
    const { user, isLoaded, isSignedIn } = useUser();
    const syncUser = useMutation(api.users.syncUser);
    const [synced, setSynced] = useState(false);

    useEffect(() => {
        if (isLoaded && isSignedIn && user && !synced) {
            const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.username || "User";
            const email = user.emailAddresses[0]?.emailAddress || "";

            syncUser({
                name,
                email,
            }).then(() => {
                setSynced(true);
                console.log("Handshake: Identity established in central registry.");
            }).catch((err) => {
                console.error("Handshake Failure:", err);
            });
        }
    }, [isLoaded, isSignedIn, user, syncUser, synced]);

    return null;
}
