interface FileData {
    id: string;
    filename: string;
    url: string;
    size: number;
    uploadedAt: string;
    contentType: string;
    userId: string;
}

interface ActiveFilters {
    fileType: 'all' | 'images' | 'pdfs' | 'documents' | 'others';
    dateRange: 'all' | 'today' | 'week' | 'month' | 'year';
    sizeRange: 'all' | 'small' | 'medium' | 'large';
}

export const filterFiles = (files: FileData[], activeFilters: ActiveFilters) => {
    return files.filter(file => {
        // File type filter
        if (activeFilters.fileType !== 'all') {
            switch (activeFilters.fileType) {
                case 'images':
                    if (!file.contentType.startsWith('image/')) return false;
                    break;
                case 'pdfs':
                    if (file.contentType !== 'application/pdf') return false;
                    break;
                case 'documents':
                    const docTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
                    if (!docTypes.includes(file.contentType)) return false;
                    break;
                case 'others':
                    const commonTypes = ['image/', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
                    if (commonTypes.some(type => file.contentType.startsWith(type) || file.contentType === type)) return false;
                    break;
            }
        }

        // Date range filter
        if (activeFilters.dateRange !== 'all') {
            const fileDate = new Date(file.uploadedAt);
            const now = new Date();
            const timeDiff = now.getTime() - fileDate.getTime();
            const daysDiff = timeDiff / (1000 * 3600 * 24);

            switch (activeFilters.dateRange) {
                case 'today':
                    if (daysDiff > 1) return false;
                    break;
                case 'week':
                    if (daysDiff > 7) return false;
                    break;
                case 'month':
                    if (daysDiff > 30) return false;
                    break;
                case 'year':
                    if (daysDiff > 365) return false;
                    break;
            }
        }

        // Size range filter
        if (activeFilters.sizeRange !== 'all') {
            const fileSizeInMB = file.size / (1024 * 1024);
            switch (activeFilters.sizeRange) {
                case 'small':
                    if (fileSizeInMB > 1) return false;
                    break;
                case 'medium':
                    if (fileSizeInMB <= 1 || fileSizeInMB > 10) return false;
                    break;
                case 'large':
                    if (fileSizeInMB <= 10) return false;
                    break;
            }
        }

        return true;
    });
};

export const searchFiles = (files: FileData[], searchTerm: string) => {
    return files.filter(file =>
        file.filename.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

export const getActiveFilterCount = (activeFilters: ActiveFilters) => {
    return Object.values(activeFilters).filter(value => value !== 'all').length;
};

export const clearAllFilters = (): ActiveFilters => {
    return {
        fileType: 'all',
        dateRange: 'all',
        sizeRange: 'all'
    };
};

export const updateFilter = (activeFilters: ActiveFilters, filterType: string, value: string): ActiveFilters => {
    return {
        ...activeFilters,
        [filterType]: value
    };
};