import { ArrowLeft, CheckCircle, FileText, Paperclip,UploadCloud, ImageIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Upload = () => {
    return (
        <div className="flex flex-col gap-7.5 items-center">

            <div className="px-8 flex items-center h-1/6 w-full border-b border-gray-300 text-sm font-medium text-[#0c7ff2] hover:text-blue-700 transition-colors group mb-4">
                <Link href="/dashboard" className="flex items-center gap-1">
                    <ArrowLeft className="mr-1 transition-transform duration-200 ease-in-out group-hover:-translate-x-1" />
                    Back to Dashboard
                </Link>
            </div>
            <div className="px-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Upload Your Documents</h1>
                <p className="mt-2 text-slate-600 text-sm sm:text-base">Easily upload and manage your files in one secure place.</p>
            </div>

            <div className="w-[50%] rounded-xl border-2 border-dashed border-slate-300 bg-white p-6 sm:p-10 shadow-lg hover:border-slate-400 transition-colors">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-6 text-[#0c7ff2]">
                        <UploadCloud className="!text-6xl" />
                    </div>
                    <p className="text-lg font-semibold text-slate-800 mb-2">Drag and drop files here</p>
                    <p className="text-sm text-slate-500 mb-6">Or click to select files from your computer.</p>
                    <label className="group relative flex cursor-pointer items-center justify-center rounded-lg
                             bg-[#0c7ff2] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all
                              duration-150 ease-in-out hover:bg-blue-600 focus-within:ring-2 focus-within:ring-blue-500
                               focus-within:ring-offset-2" htmlFor="file-upload">
                        <Paperclip className="mr-2 text-lg" size={20}/>
                        Select Files
                        <input className="sr-only" id="file-upload" name="file-upload" type="file" />
                    </label>
                    <div className="mt-6 text-xs text-slate-500">
                        <p>Supported file types: PDF, DOCX, TXT, PNG, JPG</p>
                        <p>Maximum file size: 10MB</p>
                    </div>
                </div>
            </div>
            <div className="w-[50%] space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <FileText className="text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">document_final.pdf</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">4.5MB / 10MB</span>
                        <CheckCircle className="text-green-500" />
                    </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <ImageIcon className="text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">project_screenshot.png</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-[#0c7ff2] w-[60%]"></div>
                        </div>
                        <span className="text-xs text-slate-500">60%</span>
                    </div>
                </div>
            </div>
            <footer className="border-t border-solid border-slate-200 bg-white px-6 sm:px-10 py-6 text-center">
                <p className="text-sm text-slate-600">© 2024 FileHub. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Upload