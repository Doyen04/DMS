import Sidebar from "@/component/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - File Hub",
    description: "File management dashboard",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // Update your dashboard layout
        <div className="max-w-screen min-h-screen bg-white">
            <Sidebar />
            <div className="md:ml-16 xl:ml-[12%] overflow-y-auto min-h-screen pt-16 md:pt-0">
                {children}
            </div>
        </div>
    );
}