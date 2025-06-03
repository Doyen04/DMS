'use client'
import React, { useEffect } from "react";
import Link from "next/link";
import useUserAuth from "@/hooks/useUserAuth";
import SignOut from "@/action/signout";
import { useSession } from "next-auth/react";


const Header: React.FC = () => {
    const {data: session} = useSession()
    const {
        isAuthenticated,
        setSession,
        logout
    } = useUserAuth()

    useEffect(() => {
        setSession(session)
    }, [session, setSession])

    const handleSignOut = async () => {
        logout()
        await SignOut()
    }
    return (
        <div className="bg-[#e6f0ff] flex items-center justify-between h-14 w-full px-5 border-b-1 border-b-blue">
            <div>
                <Link href={'/'}>
                    FileHub
                </Link>
            </div>
            <nav className="flex items-center h-full w-max gap-1.5">
                <div></div>
                <div></div>
                {
                    (isAuthenticated) ?
                        (
                            <>
                                <Link href="/dashboard" className="bg-[#0c7ff2] text-sm font-semibold p-1.5 rounded-lg text-white">
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="bg-slate-100 text-slate-700 text-sm font-semibold p-1.5 rounded-lg cursor-pointer"
                                >
                                    Sign Out
                                </button>
                            </>
                        )
                        :
                        (
                            <>
                                <div className="bg-[#0c7ff2] text-sm font-semibold p-1.5 rounded-lg text-white cursor-pointer">Get Started</div>
                                <div className="bg-slate-100 text-slate-700 text-sm font-semibold p-1.5 rounded-lg cursor-pointer">
                                    <Link href={'/signup'}>
                                        Sign Up
                                    </Link>
                                </div>
                            </>
                        )
                }
            </nav>
        </div>
    )
}

export default Header