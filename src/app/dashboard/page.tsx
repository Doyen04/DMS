import type React from "react"
import {
    FileText,
    Users,
    Database,
    Clock,
    UploadCloud,
    Share2,
    FolderPlus,
    Star,
} from "lucide-react"
import Link from "next/link"
import OverviewCard from "@/component/overviewCard";
import BreadCrumb from "@/ui/breadcrumb";
import { twMerge } from "tailwind-merge";

// interface ActivityItemProps {
//     actor?: { name: string; avatar?: string } // Actor might be the system or another user
//     action: string
//     documentName: string
//     time: string
//     icon: React.ElementType
//     status?: "viewed" | "edited" | "shared" | "commented"
// }

interface OverviewCardProps {
    title: string
    value: string
    icon: React.ElementType
    description: string
    link?: string
    linkText?: string
    style?: string
}

export default function DashboardPage() {

    const overviewData: OverviewCardProps[] = [
        {
            title: "My Documents",
            value: "278",
            icon: FileText,
            description: "Total files you own or created.",
            link: "/dashboard/my-files",
            linkText: "View My Files",
            style: "bg-blue-50 border-blue-200"
        },
        {
            title: "Shared Files",
            value: "32",
            icon: Users,
            description: "Files and folders shared by others.",
            link: "/dashboard/shared-files",
            linkText: "View Shared",
            style: "bg-orange-50 border-orange-200"
        },
        {
            title: "My Storage",
            value: "45%",
            icon: Database,
            description: "1.3 GB / 3 GB used",
            style: "bg-green-50 border-green-200"
        },
        {
            title: "Recent Activity",
            value: "5 new",
            icon: Clock,
            description: "Updates in the last 24 hours.",
            link: "#recent-activity", // Link to the section on the page
            linkText: "See Activity",
            style: "bg-purple-50 border-purple-200"
        },
    ]

    // const recentActivities: ActivityItemProps[] = [
    //     {
    //         action: "uploaded",
    //         documentName: "Quarterly_Report_Q2.pdf",
    //         time: "30m ago",
    //         icon: UploadCloud,
    //         status: "edited",
    //     },
    //     {
    //         actor: { name: "Jane Doe", avatar: "/placeholder.svg?width=40&height=40&seed=jane" },
    //         action: "shared",
    //         documentName: "Project_Phoenix_Proposal.docx",
    //         time: "2h ago",
    //         icon: Share2,
    //         status: "shared",
    //     },
    //     {
    //         action: "commented on",
    //         documentName: "Team_Meeting_Notes.md",
    //         time: "5h ago",
    //         icon: MessageSquare,
    //         status: "commented",
    //     },
    //     {
    //         actor: { name: "System Bot", avatar: "/placeholder.svg?width=40&height=40&seed=bot" },
    //         action: "added you to folder",
    //         documentName: "Marketing Assets Q3",
    //         time: "1d ago",
    //         icon: FolderPlus,
    //         status: "viewed",
    //     },
    // ]

    const quickActions = [
        { label: "Upload New File", icon: UploadCloud, variant: "default" as const, href: "/dashboard/upload", bg:'bg-blue-700 text-white border-blue-200' },
        { label: "Create New Folder", icon: FolderPlus, variant: "outline" as const, href: "/dashboard/create-folder" },
        { label: "Share a File", icon: Share2, variant: "outline" as const, href: "/dashboard/shared-files" },
        { label: "View Favorites", icon: Star, variant: "outline" as const, href: "/dashboard/favorites" },
    ]

    return (
        <section className="flex flex-col gap-7.5">
    
            <BreadCrumb text="Overview" />
    
            <div className="px-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {overviewData.map((data) => (
                    <OverviewCard key={data.title} {...data} />
                ))}
            </div>
            
            {/* Responsive Recent Activity and Quick Action */}
            <div className="px-8 w-full flex flex-col lg:flex-row gap-6 lg:gap-7.5">
                <div className="rounded-lg border border-gray-300 w-full lg:w-[70%]">
                    <h1 className="p-4 lg:p-6 pt-4 text-xl lg:text-2xl font-semibold leading-none tracking-tight">
                        Recent Activity
                    </h1>
                    <div className="p-4 lg:p-6 pt-0 flex flex-col gap-2">
                        No Activity...
                    </div>
                </div>
                <div className="rounded-lg border border-gray-300 w-full lg:w-[30%]">
                    <h1 className="p-4 lg:p-6 pt-4 text-xl lg:text-2xl font-semibold leading-none tracking-tight">
                        Quick Action
                    </h1>
                    <div className="p-4 lg:p-6 pt-0 flex flex-col gap-2">
                        {quickActions.map(items => (
                            <Link 
                                className={twMerge(`flex items-center p-3 rounded-lg border border-gray-300 
                                hover:bg-gray-50 transition-colors duration-200
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${items.bg}`)} 
                                key={items.label} 
                                href={items.href}
                            >
                                <div className="flex items-center gap-2 w-full">
                                    <items.icon size={18} />
                                    <p className="text-sm lg:text-base">{items.label}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
