import React from "react";
import Link from "next/link";


const Header = () => {
    return (
        <div className="bg-amber-200 flex items-center justify-between h-14 w-full px-5 border-b-1 border-b-blue">
            <div>
                <Link href={'/'}>
                    FileHub
                </Link>
            </div>
            <nav className="flex items-center h-full w-max gap-1.5">
                <div></div>
                <div></div>
                <div className="bg-[#0c7ff2] text-sm font-semibold p-1.5 rounded-lg text-white cursor-pointer">Get Started</div>
                <div className="bg-slate-100 text-slate-700 text-sm font-semibold p-1.5 rounded-lg cursor-pointer">
                    <Link href={'/signup'}>
                        Sign Up
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Header