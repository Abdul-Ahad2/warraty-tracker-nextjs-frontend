import { NextRequest, NextResponse } from 'next/server';
import { fetchAuthSession } from 'aws-amplify/auth/server';
import { runWithAmplifyServerContext } from '@/utils/amplifyServerUtils';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // The middleware only runs for routes that match the config.matcher
    // We check authentication status using Amplify's server-side context
    const authenticated = await runWithAmplifyServerContext({
        nextServerContext: { request, response },
        operation: async (contextSpec) => {
            try {
                const session = await fetchAuthSession(contextSpec);
                // A user is considered authenticated if they have a valid access token
                return session.tokens?.accessToken !== undefined;
            } catch (error) {
                // If there's an error fetching the session, assume not authenticated
                return false;
            }
        }
    });

    const { pathname } = request.nextUrl;

    // Define protected routes (routes that require a token)
    const isProtectedRoute = 
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/documents') ||
        pathname.startsWith('/settings') ||
        pathname.startsWith('/notifications') ||
        pathname.startsWith('/help-and-support');

    // Define auth-only routes (routes that shouldn't be accessible if already logged in)
    const isAuthRoute = 
        pathname.startsWith('/login') ||
        pathname.startsWith('/signup');

    // Redirection logic
    if (isProtectedRoute && !authenticated) {
        // Not logged in -> Redirect to login
        const loginUrl = new URL('/login', request.url);
        // Optional: save the current path to redirect back after login
        // loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (isAuthRoute && authenticated) {
        // Already logged in -> Redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return response;
}

// Matcher config to specify which routes this middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
