import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/(.*)",
    "/clerk(.*)",
]);

const isInstructorRoute = createRouteMatcher(["/instructor(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    // 1. Global redirect from /home to root
    const pathname = req.nextUrl.pathname;
    if (pathname === "/home") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // 2. Force authentication for non-public routes
    if (!isPublicRoute(req)) {
        await auth.protect();
    }

    // 3. Retrieve session data for role-based routing
    const { userId, sessionClaims } = await auth();
    // Fallback logic for role
    const metadata = (sessionClaims?.metadata as any) || {};
    const role = metadata.role || "STUDENT";

    // 4. Logged-in user role routing
    if (userId) {
        // [DEV NOTE] Disabling strict routing temporary to allow user to visit both pages while syncing roles
        // if ((isInstructorRoute(req) || isAdminRoute(req)) && role === "STUDENT") {
        //     return NextResponse.redirect(new URL("/dashboard", req.url));
        // }

        // Prevent Instructors from accessing Admin routes (unless they are admin)
        if (isAdminRoute(req) && role !== "ADMIN") {
            return NextResponse.redirect(new URL("/instructor", req.url));
        }

        // Optional: Redirect signed-in users away from auth pages to their dashboard
        if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
            const redirectTarget = role === "INSTRUCTOR" ? "/instructor" : role === "ADMIN" ? "/admin" : "/dashboard";
            return NextResponse.redirect(new URL(redirectTarget, req.url));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
