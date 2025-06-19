'use client'

import { getUserFiles } from "@/action/getAllUserFiles";
import BreadCrumb from "@/ui/breadcrumb";
import { ArrowUpDown, Edit, Eye, Filter, FolderPlus, MoreHorizontal, Plus, Search, Star, Trash2, FileText, Image, Download } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface FileData {
    id: string;
    filename: string;
    url: string;
    size: number;
    uploadedAt: string;
    contentType: string;
    userId: string;
}

const MyFiles = () => {
    const [files, setFiles] = useState<FileData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const result = await getUserFiles()
            if (result.success) {
                setFiles(result.files || [])
            } else {
                console.error('Failed to fetch files:', result.error)
            }
        } catch (error) {
            console.error('Error fetching files:', error)
        } finally {
            setLoading(false)
        }
    };

    const deleteFile = async (fileId: string) => {
        if (!confirm('Are you sure you want to delete this file?')) return;

        try {
            const response = await fetch(`/api/files/${fileId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setFiles(files.filter(file => file.id !== fileId));
            } else {
                alert('Failed to delete file');
            }
        } catch (error) {
            console.error('Error deleting file:', error);
            alert('Error deleting file');
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getFileIcon = (contentType: string) => {
        if (contentType.startsWith('image/')) {
            return <Image className="h-4 w-4 text-green-500" />;
        } else if (contentType === 'application/pdf') {
            return <FileText className="h-4 w-4 text-red-500" />;
        } else {
            return <FileText className="h-4 w-4 text-blue-500" />;
        }
    };

    const filteredFiles = files.filter(file =>
        file.filename.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col gap-7.5">
                <BreadCrumb text="My Files" />
                <div className="px-8 flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-slate-600">Loading files...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-7.5">
            <BreadCrumb text="My Files" />
            <div className="px-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-slate-900 text-3xl font-semibold leading-tight tracking-tight">My Documents</h1>
                <div className="flex gap-2">
                    <Link href="/dashboard/upload" className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <Plus className="h-4 w-4" />
                        <span>Upload Document</span>
                    </Link>
                    <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
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
                    <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-full placeholder:text-slate-400 pl-10 pr-4 text-sm font-normal leading-normal"
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </label>
                <div className="flex gap-3">
                    <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                        <ArrowUpDown className="h-4 w-4 text-slate-500" />
                        <span>Sort</span>
                    </button>
                    <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                        <Filter className="h-4 w-4 text-slate-500" />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            <div className="px-8 @container">
                {filteredFiles.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="mx-auto h-12 w-12 text-slate-300" />
                        <h3 className="mt-2 text-sm font-semibold text-slate-900">No documents</h3>
                        <p className="mt-1 text-sm text-slate-500">
                            {searchTerm ? 'No files match your search.' : 'Get started by uploading your first document.'}
                        </p>
                        {!searchTerm && (
                            <div className="mt-6">
                                <Link href="/dashboard/upload" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                                    <Plus className="h-5 w-5 mr-1" />
                                    Upload Document
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
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
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200 bg-white">
                            {filteredFiles.map((file) => (
                                <tr key={file.id} className="hover:bg-slate-50">
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-800">
                                        <div className="flex items-center gap-2">
                                            {getFileIcon(file.contentType)}
                                            <span>{file.filename}</span>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                                        {formatDate(file.uploadedAt)}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                                        {formatFileSize(file.size)}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                        <div className="flex items-center gap-3">
                                            <button
                                                aria-label="View"
                                                className="text-blue-500 hover:text-blue-700"
                                                onClick={() => window.open(file.url, '_blank')}
                                            >
                                                <Eye className="h-5 w-5" />
                                            </button>
                                            <button
                                                aria-label="Edit"
                                                className="text-orange-500 hover:text-orange-700"
                                                onClick={() => {/* Add edit functionality */ }}
                                            >
                                                <Edit className="h-5 w-5" />
                                            </button>
                                            <button
                                                aria-label="Star"
                                                className="text-yellow-500 hover:text-yellow-700"
                                                onClick={() => {/* Add star functionality */ }}
                                            >
                                                <Star className="h-5 w-5" />
                                            </button>
                                            <a
                                                href={file.url}
                                                download={file.filename}
                                                aria-label="Download"
                                                className="text-green-500 hover:text-green-700"
                                            >
                                                <Download className="h-5 w-5" />
                                            </a>
                                            <button
                                                aria-label="Delete"
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => deleteFile(file.id)}
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                            <button aria-label="More options" className="text-slate-500 hover:text-slate-700">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default MyFiles;