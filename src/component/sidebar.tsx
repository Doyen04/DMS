'use client'

import Logo from "@/ui/logo";
import { Bell, FileText, FolderUp, Home, LogOut, Menu, Moon, ShieldCheck, Star, Sun, UserCircle, Users, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const mainNavItems = [
    { href: "/dashboard", label: "My Dashboard", icon: Home },
    { href: "/dashboard/my-files", label: "My Files", icon: FileText },
    { href: "/dashboard/shared-with-me", label: "Shared With Me", icon: Users },
    { href: "/dashboard/my-uploads", label: "My Uploads", icon: FolderUp },
    { href: "/dashboard/favorites", label: "Favorites", icon: Star },
]

const userSettingsNavItems = [
    { href: "/dashboard/profile", label: "Profile", icon: UserCircle },
    { href: "/dashboard/security", label: "Security", icon: ShieldCheck },
    { href: "/dashboard/notifications", label: "Notifications", icon: Bell, badge: "3" },
]

const Sidebar = () => {
    const params = usePathname()
    const [isDarkMode, setIsDarkMode] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        // Close mobile menu when route changes
        setIsMobileMenuOpen(false)
    }, [params])

    const bottonNav = [
        {
            label: isDarkMode ? 'Light Mode' : 'Dark Mode',
            icon: isDarkMode ? Sun : Moon,
            onClick: () => setIsDarkMode(!isDarkMode)
        },
        { label: 'Logout', icon: LogOut, onClick: () => { } },
    ]

    const SidebarContent = () => (
        <>
            <div className="bg-white rounded-sm mt-2.5 mb-4 p-2.5">
                <Logo />
            </div>
            {mainNavItems.map(items => (
                <Link href={items.href} key={items.href}>
                    <div className={`flex items-center gap-1.5 p-1.5 rounded-sm hover:bg-slate-800 active:bg-blue-600 transition-colors cursor-pointer ${params === items.href ? 'bg-blue-600' : ''} `}>
                        <items.icon size={15} />
                        <p className="text-sm md:block hidden lg:block">{items.label}</p>
                    </div>
                </Link>
            ))}
            <div className="border-t border-slate-700 my-4"></div>
            {userSettingsNavItems.map(items => (
                <Link href={items.href} key={items.href}>
                    <div className={`flex items-center gap-1.5 p-1.5 rounded-sm hover:bg-slate-800 active:bg-blue-600 transition-colors cursor-pointer ${params === items.href ? 'bg-blue-600' : ''} `}>
                        <items.icon size={15} />
                        <p className="text-sm md:block hidden lg:block">{items.label}</p>
                        {items.badge && (
                            <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 md:block hidden lg:block">
                                {items.badge}
                            </span>
                        )}
                    </div>
                </Link>
            ))}
            <div className="mt-auto p-1 bottom-0">
                {bottonNav.map(items => (
                    <div onClick={items.onClick} key={items.label} className={`flex items-center gap-1.5 p-1.5 rounded-sm hover:bg-slate-800 active:bg-blue-600 transition-colors cursor-pointer `}>
                        <items.icon size={15} />
                        <p className="text-sm md:block hidden lg:block">{items.label}</p>
                    </div>
                ))}
            </div>
        </>
    )

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-md md:hidden"
            >
                <Menu size={20} />
            </button>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Desktop/Tablet Sidebar */}
            <div className="hidden md:block fixed left-0 top-0 w-16 lg:w-[12%] h-screen bg-slate-900 text-white flex-col gap-1.5 p-2 z-30">
                <div className="flex flex-col gap-1.5 h-full">
                    <SidebarContent />
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white flex flex-col gap-1.5 p-2 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-4 right-4 p-1 hover:bg-slate-800 rounded"
                >
                    <X size={20} />
                </button>
                <SidebarContent />
            </div>
        </>
    )
}

export default Sidebar