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
import { useEffect, useState } from "react";
import { fetchRecentFiles, FileData } from "@/utils/fileOperation";

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

function RecentFileItem({ file }: { file: FileData }) {
    const getFileIcon = (contentType: string) => {
        if (contentType.includes('image')) return '🖼️'
        if (contentType.includes('pdf')) return '📄'
        if (contentType.includes('video')) return '🎥'
        if (contentType.includes('audio')) return '🎵'
        if (contentType.includes('text')) return '📝'
        return '📁'
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const formatTimeAgo = (dateString: string) => {
        const now = new Date()
        const uploaded = new Date(dateString)
        const diffInHours = Math.floor((now.getTime() - uploaded.getTime()) / (1000 * 60 * 60))
        const diffInMinutes = Math.floor((now.getTime() - uploaded.getTime()) / (1000 * 60))

        if (diffInMinutes < 60) {
            return `${diffInMinutes}m ago`
        } else if (diffInHours < 24) {
            return `${diffInHours}h ago`
        } else {
            return uploaded.toLocaleDateString()
        }
    }

    return (
        <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="text-2xl">{getFileIcon(file.contentType)}</div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{file.filename}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Uploaded {formatTimeAgo(file.uploadedAt)}</span>
                    <span>•</span>
                    <span>{formatFileSize(file.size)}</span>
                </div>
            </div>
            <UploadCloud size={16} className="text-green-500 flex-shrink-0" />
        </div>
    )
}


export default function DashboardPage() {
    const [files, setFiles] = useState<FileData[]>([]);
    const [isLoading, setLoading] = useState(true);

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

    useEffect(() => {
        loadFiles();
    }, []);

    const loadFiles = async () => {
        setLoading(true);
        const filesData = await fetchRecentFiles();
        if (filesData) {
            setFiles(filesData);
        }
        setLoading(false);
    };


    const quickActions = [
        { label: "Upload New File", icon: UploadCloud, variant: "default" as const, href: "/dashboard/upload", bg: 'bg-blue-700 text-white border-blue-200' },
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
            <div className="px-8 py-8 w-full flex flex-col lg:flex-row gap-6 lg:gap-7.5">
                <div className="rounded-lg border border-gray-300 w-full lg:w-[70%]">
                    <h1 className="p-4 lg:p-6 pt-4 text-xl lg:text-2xl font-semibold leading-none tracking-tight">
                        Recent Activity
                    </h1>
                    <div className="p-4 lg:p-6 pt-0 flex flex-col gap-2">
                       {isLoading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                                <p className="text-gray-500">Loading recent files...</p>
                            </div>
                        ) : files.length > 0 ? (
                            <div className="flex flex-col gap-1">
                                {files.slice(0, 5).map((file) => (
                                    <RecentFileItem key={file.id} file={file} />
                                ))}
                                {files.length > 5 && (
                                    <div className="text-center pt-3">
                                        <Link 
                                            href="/dashboard/my-files" 
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            View all {files.length} recent files →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Clock className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                                <p className="text-gray-500">No recent activity in the last 24 hours</p>
                                <p className="text-sm text-gray-400 mt-1">
                                    Upload a file to see activity here
                                </p>
                            </div>
                        )}
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
