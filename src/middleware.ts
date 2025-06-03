import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    // Public routes that don't require authentication
    const publicRoutes = [
        "/",
        "/reset",
        "/signin",
        "/signup",
        "/error"
    ]
    if (nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.next()
    }
    // Check if current path is public
    const isPublicRoute = publicRoutes.some(route => {
        if (route === "/") {
            return nextUrl.pathname === "/" // Exact match for root
        }
        return nextUrl.pathname === route || nextUrl.pathname.startsWith(route)
    })

    // Allow access to public routes
    if (isPublicRoute) {
        return NextResponse.next()
    }

    // Redirect to signin if not authenticated and trying to access protected route
    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/signin", nextUrl))
    }

    return NextResponse.next()
})

// export const runtime = 'edge';

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
