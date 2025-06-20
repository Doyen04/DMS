'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useUserAuth from "@/hooks/useUserAuth";
import SignOut from "@/action/signout";
import { useSession } from "next-auth/react";
import Logo from "@/ui/logo";

const Header: React.FC = () => {
    const {data: session} = useSession()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const {
        isAuthenticated,
        setSession,
        logout
    } = useUserAuth()

    useEffect(() => {
        console.log('User session:', session)
        return setSession(session ? {
            ...session,
            user: {
                id: session.user?.id || '',
                email: session.user?.email || '',
                fullname: session.user?.fullname || ''
            }
        } : null);
    }, [session, setSession])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleSignOut = async () => {
        logout()
        await SignOut()
    }

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled 
                ? 'bg-white/80 backdrop-blur-lg shadow-lg border-b border-slate-200/50' 
                : 'bg-white/60 backdrop-blur-sm'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Logo />

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {isAuthenticated ? (
                            <>
                                {/* User Info */}
                                <div className="flex items-center space-x-3 mr-4">
                                    <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-semibold">
                                                {session?.user?.fullname?.charAt(0) || 'U'}
                                            </span>
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-medium text-slate-900">
                                                {session?.user?.fullname || 'User'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Dashboard Button */}
                                <Link 
                                    href="/dashboard" 
                                    className="group relative px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <span className="relative z-10 flex items-center space-x-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h2a2 2 0 012 2v0H8v0z" />
                                        </svg>
                                        <span>Dashboard</span>
                                    </span>
                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </Link>
                                
                                {/* Sign Out Button */}
                                <button
                                    onClick={handleSignOut}
                                    className="group px-4 py-2 border-2 border-slate-200 text-slate-700 font-medium rounded-lg hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-300 backdrop-blur-sm"
                                >
                                    <span className="flex items-center space-x-2">
                                        <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Sign Out</span>
                                    </span>
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Get Started Button */}
                                <Link 
                                    href="/signup"
                                    className="group relative px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <span className="relative z-10 flex items-center space-x-2">
                                        <span>Get Started</span>
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </Link>
                                
                                {/* Sign In Button */}
                                <Link 
                                    href="/signin"
                                    className="px-4 py-2 border-2 border-slate-200 text-slate-700 font-medium rounded-lg hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 backdrop-blur-sm"
                                >
                                    Sign In
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                        <svg className={`w-5 h-5 transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ${
                isMobileMenuOpen 
                    ? 'max-h-screen opacity-100' 
                    : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
                <div className="px-4 py-4 bg-white/95 backdrop-blur-lg border-t border-slate-200/50">
                    {isAuthenticated ? (
                        <div className="space-y-3">
                            {/* User Info Mobile */}
                            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold">
                                        {session?.user?.fullname?.charAt(0) || 'U'}
                                    </span>
                                </div>
                                <div>
                                    <div className="font-medium text-slate-900">
                                        {session?.user?.fullname || 'User'}
                                    </div>
                                    <div className="text-sm text-slate-600">
                                        {session?.user?.email}
                                    </div>
                                </div>
                            </div>
                            
                            <Link 
                                href="/dashboard" 
                                className="block w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg text-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                            
                            <button
                                onClick={() => {
                                    handleSignOut()
                                    setIsMobileMenuOpen(false)
                                }}
                                className="block w-full px-4 py-3 border-2 border-slate-200 text-slate-700 font-medium rounded-lg hover:border-red-300 hover:text-red-600 transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <Link 
                                href="/signup"
                                className="block w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg text-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                            
                            <Link 
                                href="/signin"
                                className="block w-full px-4 py-3 border-2 border-slate-200 text-slate-700 font-medium rounded-lg text-center hover:border-blue-300 hover:text-blue-600 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header