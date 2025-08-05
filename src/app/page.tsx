'use client'

import Footer from "@/component/footer";
import Link from "next/link";
import Image from "next/image";
import Header from "@/component/header";
import SignOut from "@/action/signout";
import { useUser } from "@/hooks/useUser";

export default function Home() {
    const { isAuthenticated, logout } = useUser()

    const handleSignOut = async () => {
        logout()
        await SignOut()
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Header />

            {/* Hero Section */}
            <main className="relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
                <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
                    <div className="text-center">
                        {/* Main Heading */}
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight">
                            <span className="block">Secure Document</span>
                            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Management Hub
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed">
                            Upload, organize, and manage your documents with military-grade security.
                            Experience the future of file management with AI-powered organization.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/signup"
                                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Get Started Free
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Link>

                            {isAuthenticated ?
                                <button
                                    onClick={handleSignOut}
                                    className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all duration-300 backdrop-blur-sm bg-white/70"
                                >
                                    Sign Out
                                </button>
                                : <Link
                                    href="/signin"
                                    className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all duration-300 backdrop-blur-sm bg-white/70"
                                >
                                    Sign In
                                </Link>}
                        </div>
                    </div>

                    {/* Hero Image/Demo */}
                    <div className="mt-16 relative">
                        <div className="relative mx-auto max-w-5xl">
                            {/* Floating UI Elements */}
                            <div className="absolute -top-8 -left-8 w-16 h-16 bg-blue-500 rounded-2xl shadow-lg transform rotate-12 animate-float"></div>
                            <div className="absolute -top-4 -right-12 w-12 h-12 bg-indigo-500 rounded-xl shadow-lg transform -rotate-12 animate-float animation-delay-1000"></div>
                            <div className="absolute -bottom-8 -left-12 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl shadow-lg transform rotate-45 animate-float animation-delay-2000"></div>

                            {/* Main Dashboard Preview */}
                            <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                                <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                        </div>
                                        <div className="flex-1 text-center">
                                            <span className="text-sm font-medium text-slate-600">DMS Dashboard</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Upload Card */}
                                        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                                            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                                                <Image src="/file.svg" width={24} height={24} alt="Upload" />
                                            </div>
                                            <h3 className="font-semibold text-slate-900 mb-2">Smart Upload</h3>
                                            <p className="text-sm text-slate-600">Drag & drop with AI categorization</p>
                                        </div>

                                        {/* Security Card */}
                                        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                                            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                                                <Image src="/lock.svg" width={24} height={24} alt="Security" />
                                            </div>
                                            <h3 className="font-semibold text-slate-900 mb-2">Bank-Level Security</h3>
                                            <p className="text-sm text-slate-600">End-to-end encryption</p>
                                        </div>

                                        {/* Collaboration Card */}
                                        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                                            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                                                <Image src="/globe.svg" width={24} height={24} alt="Share" />
                                            </div>
                                            <h3 className="font-semibold text-slate-900 mb-2">Team Collaboration</h3>
                                            <p className="text-sm text-slate-600">Share & collaborate securely</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Powerful Features for Modern Teams
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Everything you need to manage documents efficiently and securely
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group p-8 bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Instant Upload</h3>
                            <p className="text-slate-600 leading-relaxed">Upload any file type with lightning speed. Our advanced compression ensures optimal storage.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group p-8 bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl hover:border-green-200 transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Advanced Security</h3>
                            <p className="text-slate-600 leading-relaxed">Military-grade encryption keeps your documents safe. Zero-knowledge architecture ensures privacy.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group p-8 bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Smart Search</h3>
                            <p className="text-slate-600 leading-relaxed">AI-powered search finds documents instantly. Full-text search across all file types.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl sm:text-4xl font-bold mb-2">99.9%</div>
                            <div className="text-blue-100">Uptime</div>
                        </div>
                        <div>
                            <div className="text-3xl sm:text-4xl font-bold mb-2">256-bit</div>
                            <div className="text-blue-100">Encryption</div>
                        </div>
                        <div>
                            <div className="text-3xl sm:text-4xl font-bold mb-2">10TB+</div>
                            <div className="text-blue-100">Storage</div>
                        </div>
                        <div>
                            <div className="text-3xl sm:text-4xl font-bold mb-2">24/7</div>
                            <div className="text-blue-100">Support</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                        Ready to Transform Your Document Management?
                    </h2>
                    <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                        Join thousands of teams who trust DMS for their document management needs.
                    </p>
                    <Link
                        href="/signup"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                        Start Free Trial
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}