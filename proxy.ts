import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // Make sure we include all the routes that are handled by Clerk
  publicRoutes: ["/", "/sign-in", "/sign-up", "/api/webhooks/clerk"],
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next|_vercel|__clerk).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};