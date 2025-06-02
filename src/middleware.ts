import { auth } from "@/lib/auth"

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    // Public routes that don't require authentication
    const publicRoutes = [
        "/",
        "/auth/signin",
        "/auth/signup",
        "/auth/error"
    ]

    // Check if current path is public
    const isPublicRoute = publicRoutes.some(route =>
        nextUrl.pathname === route || nextUrl.pathname.startsWith(route)
    )

    // Allow access to public routes
    if (isPublicRoute) {
        return
    }

    // Redirect to signin if not authenticated and trying to access protected route
    if (!isLoggedIn) {
        return Response.redirect(new URL("/auth/signin", nextUrl))
    }
})

// export const runtime = 'edge';

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
