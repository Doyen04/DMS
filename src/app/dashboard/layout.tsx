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
        <div className="max-w-screen min-h-screen bg-white">
            <Sidebar />
            <div className="ml-[12%] overflow-y-auto">
                {children}
            </div>
        </div>
    );
}