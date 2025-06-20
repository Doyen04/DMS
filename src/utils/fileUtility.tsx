import { FileText, ImageIcon } from "lucide-react";





export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export const getFileIcon = (contentType: string) => {
    
    if (contentType.startsWith('image/')) {
        return <ImageIcon className="h-4 w-4 text-green-500" />;
    } else if (contentType === 'application/pdf') {
        return <FileText className="h-4 w-4 text-red-500" />;
    } else {
        return <FileText className="h-4 w-4 text-blue-500" />;
    }
};