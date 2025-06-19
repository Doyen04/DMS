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
        <div className="max-w-screen min-h-screen grid grid-cols-[12%_87%] bg-white">
            <Sidebar />
            {children}
        </div>
    );
}