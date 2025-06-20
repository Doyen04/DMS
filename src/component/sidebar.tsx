'use client'

import Logo from "@/ui/logo";
import { Bell, FileText, FolderUp, Home, LogOut, Moon, ShieldCheck, Star, Sun, UserCircle, Users } from "lucide-react";
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

    useEffect(() => {
        console.log(params);
    })
    const bottonNav = [
        {
            label: isDarkMode ? 'Light Mode' : 'Dark Mode',
            icon: isDarkMode ? Sun : Moon,
            onClick: () => setIsDarkMode(!isDarkMode)
        },
        { label: 'Logout', icon: LogOut, onClick: () => { } },
    ]
    return (
        <div className="fixed left-0 top-0 w-[12%] h-screen bg-slate-900 text-white flex flex-col gap-1.5 p-2">
            <div className="bg-white rounded-sm mt-2.5 mb-4 p-2.5">
                <Logo />
            </div>
            {mainNavItems.map(items => (
                <Link href={items.href} key={items.href}>
                    <div className={`flex items-center gap-1.5 p-1.5 rounded-sm hover:bg-slate-800 active:bg-blue-600 transition-colors cursor-pointer ${params === items.href ? 'bg-blue-600' : ''} `}>
                        <items.icon size={15} />
                        <p className="text-sm">{items.label}</p>
                    </div>
                </Link>
            ))}
            <div className="border-t border-slate-700 my-4"></div>
            {userSettingsNavItems.map(items => (
                <Link href={items.href} key={items.href}>
                    <div className={`flex items-center gap-1.5 p-1.5 rounded-sm hover:bg-slate-800 active:bg-blue-600 transition-colors cursor-pointer ${params === items.href ? 'bg-blue-600' : ''} `}>
                        <items.icon size={15} />
                        <p className="text-sm">{items.label}</p>
                    </div>
                </Link>
            ))}
            <div className="mt-auto p-1 bottom-0">
                {bottonNav.map(items => (
                    <div onClick={items.onClick} key={items.label} className={`flex items-center gap-1.5 p-1.5 rounded-sm hover:bg-slate-800 active:bg-blue-600 transition-colors cursor-pointer `}>
                        <items.icon size={15} />
                        <p className="text-sm">{items.label}</p>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default Sidebar