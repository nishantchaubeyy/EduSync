import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // Protect instructor routes
        if (path.startsWith("/instructor") && token?.role !== "INSTRUCTOR") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        // Protect admin routes
        if (path.startsWith("/admin") && token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        // Optional: Protect student routes, though they might just be logged-in users
        if (path.startsWith("/student") && token?.role !== "STUDENT" && token?.role !== "INSTRUCTOR") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    // NOTE: All dashboard routes temporarily unprotected for UI preview.
    // Re-add them once your PostgreSQL database is connected and you can log in.
    matcher: ["/student/:path*", "/courses/manage/:path*"],
};
