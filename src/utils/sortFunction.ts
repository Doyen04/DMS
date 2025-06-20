interface FileData {
    id: string;
    filename: string;
    url: string;
    size: number;
    uploadedAt: string;
    contentType: string;
    userId: string;
}

export type SortOption = 'name' | 'date' | 'size' | 'type';
export type SortOrder = 'asc' | 'desc';

export const sortFiles = (files: FileData[], sortBy: SortOption, sortOrder: SortOrder) => {
    return [...files].sort((a, b) => {
        let comparison = 0;
        
        switch (sortBy) {
            case 'name':
                comparison = a.filename.localeCompare(b.filename);
                break;
            case 'date':
                comparison = new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
                break;
            case 'size':
                comparison = a.size - b.size;
                break;
            case 'type':
                comparison = a.contentType.localeCompare(b.contentType);
                break;
        }
        
        return sortOrder === 'asc' ? comparison : -comparison;
    });
};

export const getSortLabel = (sortBy: SortOption, sortOrder: SortOrder) => {
    const orderText = sortOrder === 'asc' ? '<span>↑</span>' : '<span>↓</span>';
    switch (sortBy) {
        case 'name': return `Name ${orderText}`;
        case 'date': return `Date ${orderText}`;
        case 'size': return `Size ${orderText}`;
        case 'type': return `Type ${orderText}`;
        default: return 'Sort';
    }
};

export const handleSortToggle = (
    currentSortBy: SortOption, 
    currentSortOrder: SortOrder, 
    newSortOption: SortOption
): { sortBy: SortOption; sortOrder: SortOrder } => {
    if (currentSortBy === newSortOption) {
        return {
            sortBy: currentSortBy,
            sortOrder: currentSortOrder === 'asc' ? 'desc' : 'asc'
        };
    } else {
        return {
            sortBy: newSortOption,
            sortOrder: 'asc'
        };
    }
};

export const handleSort = (
    currentSortBy: SortOption,
    currentSortOrder: SortOrder,
    option: SortOption
) => {
    return handleSortToggle(currentSortBy, currentSortOrder, option);
};

