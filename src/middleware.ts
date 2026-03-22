import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
    '/instructor(.*)',
    '/admin(.*)',
    '/student(.*)',
    '/courses/manage(.*)',
    '/dashboard(.*)'
]);

const isAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

/**
 * Checks if the given email corresponds to the allowed college domain.
 */
function isAllowedDomain(email: string): boolean {
    const allowedDomain = process.env.NEXT_PUBLIC_ALLOWED_DOMAIN || "@dypiu.ac.in";
    return email.toLowerCase().endsWith(allowedDomain.toLowerCase());
}

export default clerkMiddleware(async (authFn, req) => {
    const auth = await authFn();
    const { userId } = auth;

    // 1. Basic route protection mapping
    if (isProtectedRoute(req)) {
        await authFn.protect(); // Halts execution if entirely unauthenticated
    }

    // 2. Domain Restriction Check using Clerk API
    // We only perform this check if the user is authenticated and not on an auth-related route
    /* 
    if (userId && !isAuthRoute(req)) {
        try {
            const client = await clerkClient();
            const user = await client.users.getUser(userId);
            const email = user.emailAddresses?.[0]?.emailAddress;

            if (email && !isAllowedDomain(email)) {
                console.log(`Blocking unauthorized domain: ${email}`);
                const signInUrl = new URL('/sign-in', req.url);
                signInUrl.searchParams.set('error', 'unauthorized_domain');
                signInUrl.searchParams.set('message', 'Please use your college email to access this platform.');

                return NextResponse.redirect(signInUrl);
            }
        } catch (error) {
            console.error("Middleware domain restriction failed to fetch user:", error);
        }
    }
    */
});

export const config = {
    matcher: [
        // Skip Next.js internals and static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
