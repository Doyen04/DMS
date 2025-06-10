import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";


interface BreadCrumbProps{
    text: string
}

const BreadCrumb:React.FC<BreadCrumbProps> = ({text}) => {
    return (
        <div className="px-8 flex items-center h-1/12 border-b border-gray-300">
            <Link href="/dashboard" className="text-sm text-gray-500">My Dashboard</Link>
            <ChevronRight className="h-4 w-4" />
            <div className="text-sm">{text}</div>
        </div>
    )
}

export default BreadCrumb