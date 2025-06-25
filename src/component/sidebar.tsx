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

    const SidebarContent = ({ isMobile = false }) => (
        <>
            <div className="group flex bg-white rounded-sm mt-2.5 mb-4 p-2.5">
                <Logo mobile={isMobile} />
               
                {!isMobile && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 xl:hidden">
                        DMS
                    </div>
                )}
            </div>
            {mainNavItems.map(items => (
                <Link href={items.href} key={items.href}>
                    <div className={`group flex items-center gap-1.5 p-1.5 rounded-sm hover:bg-slate-800 active:bg-blue-600 transition-colors cursor-pointer relative ${params === items.href ? 'bg-blue-600' : ''} ${!isMobile ? 'xl:justify-start justify-center' : ''}`}>
                        <items.icon size={15} />
                        <p className={`text-sm ${isMobile ? 'block' : 'hidden xl:block'}`}>{items.label}</p>
                        {/* Tooltip for tablet view */}
                        {!isMobile && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 xl:hidden">
                                {items.label}
                            </div>
                        )}
                    </div>
                </Link>
            ))}
            <div className="border-t border-slate-700 my-4"></div>
            {userSettingsNavItems.map(items => (
                <Link href={items.href} key={items.href}>
                    <div className={`group flex items-center gap-1.5 p-1.5 rounded-sm hover:bg-slate-800 active:bg-blue-600 transition-colors cursor-pointer relative ${params === items.href ? 'bg-blue-600' : ''} ${!isMobile ? 'xl:justify-start justify-center' : ''}`}>
                        <items.icon size={15} />
                        <p className={`text-sm ${isMobile ? 'block' : 'hidden xl:block'}`}>{items.label}</p>
                        {items.badge && (
                            <span className={`ml-auto bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 ${isMobile ? 'block' : 'hidden xl:block'}`}>
                                {items.badge}
                            </span>
                        )}
                        {/* Tooltip for tablet view */}
                        {!isMobile && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 xl:hidden">
                                {items.label}
                                {items.badge && ` (${items.badge})`}
                            </div>
                        )}
                    </div>
                </Link>
            ))}
            <div className="mt-auto p-1 bottom-0">
                {bottonNav.map(items => (
                    <div onClick={items.onClick} key={items.label} className={`group flex items-center gap-1.5 p-1.5 rounded-sm hover:bg-slate-800 active:bg-blue-600 transition-colors cursor-pointer relative ${!isMobile ? 'xl:justify-start justify-center' : ''}`}>
                        <items.icon size={15} />
                        <p className={`text-sm ${isMobile ? 'block' : 'hidden xl:block'}`}>{items.label}</p>
                        {/* Tooltip for tablet view */}
                        {!isMobile && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 xl:hidden">
                                {items.label}
                            </div>
                        )}
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
            {/* Mobile Overlay - Made transparent */}
            {isMobileMenuOpen && (<div
                className="fixed inset-0 bg-transparent z-40 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
            />
            )}

            {/* Desktop/Tablet Sidebar */}
            <div className="hidden md:block fixed left-0 top-0 w-16 xl:w-[12%] h-screen bg-slate-900 text-white flex-col gap-1.5 p-2 z-30">
                <div className="flex flex-col gap-1.5 h-full">
                    <SidebarContent isMobile={false} />
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white flex flex-col gap-1.5 p-2 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-4 right-4 p-1 hover:bg-slate-800 rounded"
                >
                    <X size={20} />
                </button>
                <SidebarContent isMobile={true} />
            </div>
        </>
    )
}

export default Sidebar