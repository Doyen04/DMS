import Link from 'next/link'
import { FileQuestion, Home, Search, ArrowLeft, FolderOpen } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
            <div className="max-w-lg w-full">
                <div className="bg-white rounded-lg border border-gray-300 p-8 text-center shadow-sm">
                    <div className="mb-8">
                        <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                            <FileQuestion className="h-10 w-10 text-blue-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            Page Not Found
                        </h1>
                        <p className="text-gray-600 text-lg mb-2">
                            The dashboard page you&apos;re looking for doesn&apos;t exist.
                        </p>
                        <p className="text-gray-500 text-sm">
                            It might have been moved, deleted, or the URL was mistyped.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Link
                            href="/dashboard"
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            <Home className="h-5 w-5" />
                            Go to Dashboard
                        </Link>

                        <div className="flex gap-3">
                            <Link
                                href="/dashboard/my-files"
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <FolderOpen className="h-4 w-4" />
                                My Files
                            </Link>

                            <Link
                                href="/dashboard/search"
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <Search className="h-4 w-4" />
                                Search
                            </Link>
                        </div>

                        <Link href={"/dashboard"}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Go Back
                        </Link>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Need help? <Link href="/support" className="text-blue-600 hover:underline">Contact Support</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}