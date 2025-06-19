import { useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface UploadingFile {
    file: File;
    progress: number;
    status: 'uploading' | 'completed' | 'error';
    id: string;
}

export const useFileUpload = () => {
    const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    //   const [isDragOver, setIsDragOver] = useState(false);

    const uploadFile = async (file: File) => {
        const fileId = Math.random().toString(36).substring(7);
        console.log(file);

        const newUploadingFile: UploadingFile = {
            file,
            progress: 0,
            status: 'uploading',
            id: fileId
        };

        setUploadingFiles(prev => [...prev, newUploadingFile]);
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            console.log(formData.get('file'));
            
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        setUploadingFiles(prev =>
                            prev.map(f => f.id === fileId ? { ...f, progress } : f)
                        );
                    }
                },
            });

            if (response.data.success) {
                setUploadingFiles(prev =>
                    prev.map(f => f.id === fileId ? { ...f, status: 'completed', progress: 100 } : f)
                );
                toast.success(`${file.name} uploaded successfully!`);
            }

        } catch (error) {
            console.log(error);
            
            setUploadingFiles(prev =>
                prev.map(f => f.id === fileId ? { ...f, status: 'error' } : f)
            );
            toast.error(`Failed to upload ${file.name}`);
        } finally {
            // Check if any files are still uploading
            setUploadingFiles(prev => {
                const stillUploading = prev.some(f => f.status === 'uploading');
                setIsUploading(stillUploading);
                return prev;
            });
        }
    };

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;

        Array.from(files).forEach(file => {
            if (file.size > 10 * 1024 * 1024) {
                toast.error(`${file.name} is too large. Maximum file size is 10MB.`);
                return;
            }
            uploadFile(file);
        });
    };

    //   const handleDrop = useCallback((e: React.DragEvent) => {
    //     e.preventDefault();
    //     setIsDragOver(false);
    //     handleFileSelect(e.dataTransfer.files);
    //   }, []);

    //   const handleDragOver = useCallback((e: React.DragEvent) => {
    //     e.preventDefault();
    //     setIsDragOver(true);
    //   }, []);

    //   const handleDragLeave = useCallback((e: React.DragEvent) => {
    //     e.preventDefault();
    //     setIsDragOver(false);
    //   }, []);

    //   const removeFile = (fileId: string) => {
    //     setUploadingFiles(prev => prev.filter(f => f.id !== fileId));
    //   };

    return {
        uploadingFiles,
        handleFileSelect,
        isUploading,
        // handleDrop,
        // handleDragOver,
        // handleDragLeave,
        // removeFile,
    };
};