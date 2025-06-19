'use client'

import { deleteUserFile } from "@/action/deleteUserFile";
import { getUserFiles } from "@/action/getAllUserFiles";
import BreadCrumb from "@/ui/breadcrumb";
import { ArrowUpDown, Edit, Eye, Filter, FolderPlus, MoreHorizontal, Plus, Search, Star, Trash2, FileText, ImageIcon, Download, ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { filterFiles, searchFiles, getActiveFilterCount, clearAllFilters, updateFilter } from "@/utils/filterFunction";
import { sortFiles, getSortLabel, handleSortToggle, SortOption, SortOrder } from "@/utils/sortFunction";

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
    const [sortBy, setSortBy] = useState<SortOption>('date');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        fileType: 'all' as 'all' | 'images' | 'pdfs' | 'documents' | 'others',
        dateRange: 'all' as 'all' | 'today' | 'week' | 'month' | 'year',
        sizeRange: 'all' as 'all' | 'small' | 'medium' | 'large'
    });

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const result = await getUserFiles()
            if (result.success) {
                setFiles(result.files || [])
            } else {
                toast.error('Failed to fetch files: ' + result.error)
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
            const result = await deleteUserFile(fileId)
            if (result.success) {
                setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId))
                toast.success('File deleted successfully')
            } else {
                console.error('Failed to delete file:', result.error)
                toast.error('Failed to delete file: ' + result.error)
            }
        } catch (error) {
            console.error('Error deleting file:', error)
            toast.error('Error deleting file')
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
            return <ImageIcon className="h-4 w-4 text-green-500" />;
        } else if (contentType === 'application/pdf') {
            return <FileText className="h-4 w-4 text-red-500" />;
        } else {
            return <FileText className="h-4 w-4 text-blue-500" />;
        }
    };

    const handleSort = (option: SortOption) => {
        const { sortBy: newSortBy, sortOrder: newSortOrder } = handleSortToggle(sortBy, sortOrder, option);
        setSortBy(newSortBy);
        setSortOrder(newSortOrder);
        setShowSortMenu(false);
    };

    const handleFilterChange = (filterType: string, value: string) => {
        setActiveFilters(prev => updateFilter(prev, filterType, value));
        setShowFilterMenu(false);
    };

    const handleClearAllFilters = () => {
        setActiveFilters(clearAllFilters());
        setShowFilterMenu(false);
    };

    // Process files through search, filter, and sort
    const processedFiles = sortFiles(
        filterFiles(
            searchFiles(files, searchTerm),
            activeFilters
        ),
        sortBy,
        sortOrder
    );

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
                <div className="flex gap-3 relative">
                    <div className="relative">
                        <button 
                            onClick={() => setShowSortMenu(!showSortMenu)}
                            className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                        >
                            <ArrowUpDown className="h-4 w-4 text-slate-500" />
                            <span>{getSortLabel(sortBy, sortOrder)}</span>
                            <ChevronDown className="h-4 w-4 text-slate-500" />
                        </button>
                        {showSortMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-slate-200 z-50">
                                <div className="py-1">
                                    <button onClick={() => handleSort('name')} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                                        Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </button>
                                    <button onClick={() => handleSort('date')} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                                        Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </button>
                                    <button onClick={() => handleSort('size')} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                                        Size {sortBy === 'size' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </button>
                                    <button onClick={() => handleSort('type')} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                                        Type {sortBy === 'type' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setShowFilterMenu(!showFilterMenu)}
                            className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                        >
                            <Filter className="h-4 w-4 text-slate-500" />
                            <span>Filter</span>
                            {getActiveFilterCount(activeFilters) > 0 && (
                                <span className="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                                    {getActiveFilterCount(activeFilters)}
                                </span>
                            )}
                        </button>
                        {showFilterMenu && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-slate-200 z-50">
                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
                                        <button
                                            onClick={handleClearAllFilters}
                                            className="text-xs text-blue-600 hover:text-blue-800"
                                        >
                                            Clear All
                                        </button>
                                    </div>

                                    {/* File Type Filter */}
                                    <div className="mb-4">
                                        <label className="block text-xs font-medium text-slate-700 mb-2">File Type</label>
                                        <select
                                            value={activeFilters.fileType}
                                            onChange={(e) => handleFilterChange('fileType', e.target.value)}
                                            className="w-full text-sm border border-slate-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="all">All Types</option>
                                            <option value="images">Images</option>
                                            <option value="pdfs">PDFs</option>
                                            <option value="documents">Documents</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>

                                    {/* Date Range Filter */}
                                    <div className="mb-4">
                                        <label className="block text-xs font-medium text-slate-700 mb-2">Upload Date</label>
                                        <select
                                            value={activeFilters.dateRange}
                                            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                                            className="w-full text-sm border border-slate-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="all">All Time</option>
                                            <option value="today">Today</option>
                                            <option value="week">This Week</option>
                                            <option value="month">This Month</option>
                                            <option value="year">This Year</option>
                                        </select>
                                    </div>

                                    {/* File Size Filter */}
                                    <div className="mb-2">
                                        <label className="block text-xs font-medium text-slate-700 mb-2">File Size</label>
                                        <select
                                            value={activeFilters.sizeRange}
                                            onChange={(e) => handleFilterChange('sizeRange', e.target.value)}
                                            className="w-full text-sm border border-slate-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="all">All Sizes</option>
                                            <option value="small">Small (&lt; 1MB)</option>
                                            <option value="medium">Medium (1-10MB)</option>
                                            <option value="large">Large (&gt; 10MB)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {(showSortMenu || showFilterMenu) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setShowSortMenu(false);
                        setShowFilterMenu(false);
                    }}
                />
            )}

            {/* Active Filters Display */}
            {getActiveFilterCount(activeFilters) > 0 && (
                <div className="px-8">
                    <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-sm text-slate-600">Active filters:</span>
                        {activeFilters.fileType !== 'all' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Type: {activeFilters.fileType}
                                <button
                                    onClick={() => handleFilterChange('fileType', 'all')}
                                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {activeFilters.dateRange !== 'all' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Date: {activeFilters.dateRange}
                                <button
                                    onClick={() => handleFilterChange('dateRange', 'all')}
                                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-green-200"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {activeFilters.sizeRange !== 'all' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                Size: {activeFilters.sizeRange}
                                <button
                                    onClick={() => handleFilterChange('sizeRange', 'all')}
                                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-purple-200"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        <button
                            onClick={handleClearAllFilters}
                            className="text-xs text-slate-500 hover:text-slate-700 underline"
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            )}

            <div className="px-8 @container">
                {loading ? (
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
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                        <p className="mt-2 text-slate-600">Loading files...</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : processedFiles.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="mx-auto h-12 w-12 text-slate-300" />
                        <h3 className="mt-2 text-sm font-semibold text-slate-900">No documents</h3>
                        <p className="mt-1 text-sm text-slate-500">
                            {searchTerm || getActiveFilterCount(activeFilters) > 0 ? 'No files match your search criteria.' : 'Get started by uploading your first document.'}
                        </p>
                        {!searchTerm && getActiveFilterCount(activeFilters) === 0 && (
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
                            {processedFiles.map((file) => (
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