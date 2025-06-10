import BreadCrumb from "@/ui/breadcrumb";
import { ArrowUpDown, Edit, Eye, Filter, FolderPlus, MoreHorizontal, Plus, Search, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";




const MyFiles = () => {
    return (
        <div className="flex flex-col gap-7.5">
            <BreadCrumb text="My Files" />
            <div className="px-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-slate-900 text-3xl font-semibold leading-tight tracking-tight">My Documents</h1>
                <div className="flex gap-2">
                    <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <Plus className="h-4 w-4" />
                        <Link href="/dashboard/upload">
                            <span>Upload Document</span>
                        </Link>
                    </button>
                    <button className="flex items-center justify-center gap-2 rounded-lg border
                     border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 
                     shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <FolderPlus className="h-4 w-4" />
                        <span>Create Folder</span>
                    </button>
                </div>
            </div>
            <div className="px-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <label className="relative flex-col min-w-40 !h-11 w-full max-w-md flex">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Search className="h-5 w-5" />
                    </div>
                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border
                     border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500
                      focus:border-blue-500 h-full placeholder:text-slate-400 pl-10 pr-4 text-sm font-normal leading-normal"
                        placeholder="Search documents..." />
                </label>
                <div className="flex gap-3">
                    <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-md border
                     border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                        <ArrowUpDown className="h-4 w-4 text-slate-500" />
                        <span>Sort</span>
                    </button>
                    <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-md border
                     border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                        <Filter className="h-4 w-4 text-slate-500" />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            <div className="px-8 @container">
                <table className="overflow-hidden bg-white rounded-lg border border-slate-200 shadow-sm min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500" scope="col">
                                Name
                            </th>
                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500" scope="col">
                                Upload Date
                            </th>
                            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500" scope="col">
                                Size
                            </th>
                            <th className="relative px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500" scope="col">
                                <span className="sr-only">Actions</span>
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 bg-white">
                        <tr className="hover:bg-slate-50">
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-800">
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-yellow-400" />
                                    <span>Project Proposal.pdf</span>
                                </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">2024-01-15</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">2.5 MB</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                <div className="flex items-center gap-3">
                                    <button aria-label="View" className="text-blue-500 hover:text-blue-700">
                                        <Eye className="h-5 w-5" />
                                    </button>
                                    <button aria-label="Edit" className="text-green-500 hover:text-green-700">
                                        <Edit className="h-5 w-5" />
                                    </button>
                                    <button aria-label="Delete" className="text-red-500 hover:text-red-700">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                    <button aria-label="More options" className="text-slate-500 hover:text-slate-700">
                                        <MoreHorizontal className="h-5 w-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-800">
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-yellow-400" />
                                    <span>Project Proposal.pdf</span>
                                </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">2024-01-15</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">2.5 MB</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                <div className="flex items-center gap-3">
                                    <button aria-label="View" className="text-blue-500 hover:text-blue-700">
                                        <Eye className="h-5 w-5" />
                                    </button>
                                    <button aria-label="Edit" className="text-green-500 hover:text-green-700">
                                        <Edit className="h-5 w-5" />
                                    </button>
                                    <button aria-label="Delete" className="text-red-500 hover:text-red-700">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                    <button aria-label="More options" className="text-slate-500 hover:text-slate-700">
                                        <MoreHorizontal className="h-5 w-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyFiles