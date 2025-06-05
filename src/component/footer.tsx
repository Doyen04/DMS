import React from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({className}) => {
    return(
        <footer className={twMerge(`
            relative mt-auto
            bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
            border-t border-slate-700/50
            ${className}
        `)}>
            {/* Futuristic Grid Background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2280%22 height=%2280%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern id=%22grid%22 width=%2240%22 height=%2240%22 patternUnits=%22userSpaceOnUse%22%3E%3Cpath d=%22M 40 0 L 0 0 0 40%22 fill=%22none%22 stroke=%22%23334155%22 stroke-width=%220.5%22 stroke-opacity=%220.1%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23grid)%22/%3E%3C/svg%3E')] opacity-30"></div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                FileHub
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                            Revolutionizing document management with cutting-edge technology. 
                            Secure, fast, and intelligent file storage for the modern world.
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex items-center space-x-4 mt-6">
                            <a href="#" className="group p-2 bg-slate-800 rounded-lg hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 transition-all duration-300">
                                <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                </svg>
                            </a>
                            <a href="#" className="group p-2 bg-slate-800 rounded-lg hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 transition-all duration-300">
                                <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                </svg>
                            </a>
                            <a href="#" className="group p-2 bg-slate-800 rounded-lg hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 transition-all duration-300">
                                <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                            <a href="#" className="group p-2 bg-slate-800 rounded-lg hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 transition-all duration-300">
                                <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.441.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.74.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.162-1.499-.69-2.436-2.878-2.436-4.640 0-3.78 2.735-7.229 7.881-7.229 4.130 0 7.340 2.944 7.340 6.877 0 4.097-2.588 7.4-6.177 7.4-1.204 0-2.357-.629-2.746-1.378 0 0-.597 2.284-.744 2.845-.282 1.079-1.009 2.436-1.518 3.269C9.753 23.641 10.856 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 flex items-center">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li><Link href="/dashboard" className="text-slate-400 hover:text-white hover:pl-2 transition-all duration-200 text-sm">Dashboard</Link></li>
                            <li><Link href="/upload" className="text-slate-400 hover:text-white hover:pl-2 transition-all duration-200 text-sm">Upload Files</Link></li>
                            <li><Link href="/files" className="text-slate-400 hover:text-white hover:pl-2 transition-all duration-200 text-sm">My Files</Link></li>
                            <li><Link href="/settings" className="text-slate-400 hover:text-white hover:pl-2 transition-all duration-200 text-sm">Settings</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 flex items-center">
                            <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse"></span>
                            Support
                        </h3>
                        <ul className="space-y-2">
                            <li><Link href="/help" className="text-slate-400 hover:text-white hover:pl-2 transition-all duration-200 text-sm">Help Center</Link></li>
                            <li><Link href="/contact" className="text-slate-400 hover:text-white hover:pl-2 transition-all duration-200 text-sm">Contact Us</Link></li>
                            <li><Link href="/docs" className="text-slate-400 hover:text-white hover:pl-2 transition-all duration-200 text-sm">API Docs</Link></li>
                            <li><Link href="/status" className="text-slate-400 hover:text-white hover:pl-2 transition-all duration-200 text-sm">System Status</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-700/50 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Copyright */}
                        <div className="flex items-center space-x-4">
                            <p className="text-slate-400 text-sm">
                                &copy; 2025 FileHub. All rights reserved.
                            </p>
                            <div className="hidden md:flex items-center space-x-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs text-slate-500">All systems operational</span>
                            </div>
                        </div>

                        {/* Legal Links */}
                        <div className="flex items-center space-x-6">
                            <Link href="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors duration-200 hover:underline underline-offset-4">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-slate-400 hover:text-white text-sm transition-colors duration-200 hover:underline underline-offset-4">
                                Terms of Service
                            </Link>
                            <Link href="/cookies" className="text-slate-400 hover:text-white text-sm transition-colors duration-200 hover:underline underline-offset-4">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Futuristic Glow Effect */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        </footer>
    )
}

export default Footer