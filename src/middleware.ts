import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    // Public routes that don't require authentication
    const publicRoutes = [
        "/",
        "/signin",
        "/signup",
        "/error"
    ]
    if (nextUrl.pathname.startsWith('/api/')) {
        console.log('📡 API route detected, allowing access')
        return NextResponse.next()
    }
    // Check if current path is public
    const isPublicRoute = publicRoutes.some(route =>
        nextUrl.pathname === route || nextUrl.pathname.startsWith(route)
    )
    console.log('🌍 Is public route:', isPublicRoute)
    // Allow access to public routes
    if (isPublicRoute) {
        console.log('✅ Public route access granted')
        return NextResponse.next()
    }

    // Redirect to signin if not authenticated and trying to access protected route
    if (!isLoggedIn) {
         console.log('🚫 Unauthorized access, redirecting to signin')
        return NextResponse.redirect(new URL("api/auth/signin", nextUrl))
    }
    
    console.log('✅ Authenticated user access granted')
    return NextResponse.next()
})

// export const runtime = 'edge';

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
