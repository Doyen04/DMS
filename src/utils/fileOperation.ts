import { deleteUserFile as deleteUserFileAction } from "@/action/deleteUserFile";
import { getRecentUserFiles } from "@/action/getAllRecentFiles";
import { getUserFiles as getUserFilesAction } from "@/action/getAllUserFiles";
import { toast } from "react-toastify";

export interface FileData {
    id: string;
    filename: string;
    url: string;
    size: number;
    uploadedAt: string;
    contentType: string;
    userId: string;
}

export const fetchRecentFiles = async (): Promise<FileData[] | null> => {
    try {
        const result = await getRecentUserFiles();
        if (result.success) {
            return result.files || [];
        } else {
            toast.error('Failed to fetch files: ' + result.error);
            return null;
        }
    } catch (error) {
        console.error('Error fetching files:', error);
        toast.error('Error fetching files');
        return null;
    }
};

export const fetchFiles = async (): Promise<FileData[] | null> => {
    try {
        const result = await getUserFilesAction();
        if (result.success) {
            return result.files || [];
        } else {
            toast.error('Failed to fetch files: ' + result.error);
            return null;
        }
    } catch (error) {
        console.error('Error fetching files:', error);
        toast.error('Error fetching files');
        return null;
    }
};

export const deleteFile = async (fileId: string): Promise<boolean> => {
    if (!confirm('Are you sure you want to delete this file?')) return false;

    try {
        const result = await deleteUserFileAction(fileId);
        if (result.success) {
            toast.success('File deleted successfully');
            return true;
        } else {
            console.error('Failed to delete file:', result.error);
            toast.error('Failed to delete file: ' + result.error);
            return false;
        }
    } catch (error) {
        console.error('Error deleting file:', error);
        toast.error('Error deleting file');
        return false;
    }
};