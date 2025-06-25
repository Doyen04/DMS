'use client'

import BreadCrumb from "@/ui/breadcrumb";
import { Button } from "@/ui/button2";
import { Badge } from "@/ui/badge";
import { Input } from "@/ui/input2";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import {
    FileText,
    Image,
    Video,
    Music,
    Archive,
    Search,
    Download,
    Eye,
    Share2,
    Users,
    Calendar,
    MoreHorizontal,
    UserX
} from "lucide-react";
import { useState } from "react";

interface SharedFile {
    id: string;
    filename: string;
    size: string;
    type: string;
    sharedBy?: {
        name: string;
        email: string;
        avatar?: string;
    };
    sharedWith?: {
        name: string;
        email: string;
        avatar?: string;
    }[];
    sharedAt: string;
    permissions: 'view' | 'edit' | 'download';
    url: string;
    isFolder?: boolean;
}

export default function SharedFilesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'documents' | 'images' | 'videos' | 'others'>('all');
    const [activeTab, setActiveTab] = useState('shared-with-me');

    // Files shared with me
    const sharedWithMe: SharedFile[] = [
        {
            id: '1',
            filename: 'Project Requirements.pdf',
            size: '2.4 MB',
            type: 'pdf',
            sharedBy: {
                name: 'John Doe',
                email: 'john@company.com',
                avatar: '/avatars/john.jpg'
            },
            sharedAt: '2024-06-20',
            permissions: 'view',
            url: '/files/requirements.pdf'
        },
        {
            id: '2',
            filename: 'Marketing Assets',
            size: '45.2 MB',
            type: 'folder',
            sharedBy: {
                name: 'Sarah Wilson',
                email: 'sarah@company.com'
            },
            sharedAt: '2024-06-19',
            permissions: 'edit',
            url: '/folders/marketing',
            isFolder: true
        },
        {
            id: '3',
            filename: 'Team Photo.jpg',
            size: '8.1 MB',
            type: 'image',
            sharedBy: {
                name: 'Mike Johnson',
                email: 'mike@company.com'
            },
            sharedAt: '2024-06-18',
            permissions: 'download',
            url: '/images/team-photo.jpg'
        }
    ];

    // Files I shared
    const sharedByMe: SharedFile[] = [
        {
            id: '4',
            filename: 'Quarterly Report.pdf',
            size: '3.1 MB',
            type: 'pdf',
            sharedWith: [
                { name: 'Alice Smith', email: 'alice@company.com' },
                { name: 'Bob Johnson', email: 'bob@company.com' }
            ],
            sharedAt: '2024-06-21',
            permissions: 'view',
            url: '/files/quarterly-report.pdf'
        },
        {
            id: '5',
            filename: 'Design Assets',
            size: '120.5 MB',
            type: 'folder',
            sharedWith: [
                { name: 'Design Team', email: 'design@company.com' }
            ],
            sharedAt: '2024-06-20',
            permissions: 'edit',
            url: '/folders/design-assets',
            isFolder: true
        },
        {
            id: '6',
            filename: 'Meeting Recording.mp4',
            size: '250.3 MB',
            type: 'video',
            sharedWith: [
                { name: 'Team Alpha', email: 'alpha@company.com' },
                { name: 'Team Beta', email: 'beta@company.com' },
                { name: 'Team Gamma', email: 'gamma@company.com' }
            ],
            sharedAt: '2024-06-19',
            permissions: 'download',
            url: '/videos/meeting.mp4'
        }
    ];

    const getFileIcon = (type: string, isFolder?: boolean) => {
        if (isFolder) return <Users className="w-5 h-5 text-blue-600" />;

        switch (type) {
            case 'pdf':
            case 'doc':
            case 'docx':
            case 'txt':
                return <FileText className="w-5 h-5 text-red-600" />;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'image':
                return <Image className="w-5 h-5 text-green-600" />;
            case 'mp4':
            case 'avi':
            case 'mov':
            case 'video':
                return <Video className="w-5 h-5 text-purple-600" />;
            case 'mp3':
            case 'wav':
            case 'audio':
                return <Music className="w-5 h-5 text-orange-600" />;
            default:
                return <Archive className="w-5 h-5 text-gray-600" />;
        }
    };

    const getPermissionBadge = (permission: string) => {
        const variants = {
            view: 'bg-blue-100 text-blue-800',
            edit: 'bg-green-100 text-green-800',
            download: 'bg-orange-100 text-orange-800'
        };

        return (
            <Badge className={variants[permission as keyof typeof variants]}>
                {permission}
            </Badge>
        );
    };

    const filterFiles = (files: SharedFile[]) => {
        return files.filter(file => {
            const matchesSearch = file.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (file.sharedBy?.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (file.sharedWith?.some(user => user.name.toLowerCase().includes(searchQuery.toLowerCase())));

            if (filterType === 'all') return matchesSearch;

            const typeMatches = {
                documents: ['pdf', 'doc', 'docx', 'txt', 'spreadsheet'],
                images: ['jpg', 'jpeg', 'png', 'gif', 'image'],
                videos: ['mp4', 'avi', 'mov', 'video'],
                others: !['pdf', 'doc', 'docx', 'txt', 'spreadsheet', 'jpg', 'jpeg', 'png', 'gif', 'image', 'mp4', 'avi', 'mov', 'video'].includes(file.type)
            };

            return matchesSearch && (file.isFolder || (Array.isArray(typeMatches[filterType]) && typeMatches[filterType].includes(file.type)));
        });
    };

    const renderFileList = (files: SharedFile[], isSharedByMe: boolean = false) => {
        const filteredFiles = filterFiles(files);

        if (filteredFiles.length === 0) {
            return (
                <div className="text-center py-12">
                    <Share2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {searchQuery ? 'No files found' : `No ${isSharedByMe ? 'shared' : 'received'} files`}
                    </h3>
                    <p className="text-gray-600">
                        {searchQuery
                            ? 'Try adjusting your search or filters.'
                            : `Files ${isSharedByMe ? 'you share' : 'shared with you'} will appear here.`
                        }
                    </p>
                </div>
            );
        }

        return (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-1 divide-y divide-gray-200">
                    {filteredFiles.map((file) => (
                        <div key={file.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    {getFileIcon(file.type, file.isFolder)}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {file.filename}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                            <span>{file.size}</span>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>Shared {file.sharedAt}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* Shared by/with info */}
                                    <div className="hidden sm:flex items-center gap-2">
                                        {isSharedByMe ? (
                                            // Show who it's shared with
                                            <div className="flex items-center gap-1">
                                                {file.sharedWith?.slice(0, 3).map((user, index) => (
                                                    <Avatar key={index} className="w-6 h-6">
                                                        <AvatarImage src={user.avatar} />
                                                        <AvatarFallback className="text-xs">
                                                            {user.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                ))}
                                                {file.sharedWith && file.sharedWith.length > 3 && (
                                                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                                                        <span className="text-xs text-gray-600">
                                                            +{file.sharedWith.length - 3}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            // Show who shared it
                                            <>
                                                <Avatar className="w-6 h-6">
                                                    <AvatarImage src={file.sharedBy?.avatar} />
                                                    <AvatarFallback className="text-xs">
                                                        {file.sharedBy?.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="text-xs text-gray-600">
                                                    <p className="font-medium">{file.sharedBy?.name}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Permission */}
                                    <div className="hidden md:block">
                                        {getPermissionBadge(file.permissions)}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="sm">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        {file.permissions === 'download' && (
                                            <Button variant="ghost" size="sm">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        )}
                                        {isSharedByMe ? (
                                            <Button variant="ghost" size="sm">
                                                <UserX className="w-4 h-4" />
                                            </Button>
                                        ) : (
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Mobile view additional info */}
                            <div className="sm:hidden mt-3 flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center gap-2">
                                    {isSharedByMe ? (
                                        <>
                                            <Users className="w-4 h-4" />
                                            <span>Shared with {file.sharedWith?.length} people</span>
                                        </>
                                    ) : (
                                        <>
                                            <Avatar className="w-5 h-5">
                                                <AvatarImage src={file.sharedBy?.avatar} />
                                                <AvatarFallback className="text-xs">
                                                    {file.sharedBy?.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span>{file.sharedBy?.name}</span>
                                        </>
                                    )}
                                </div>
                                {getPermissionBadge(file.permissions)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <section className="flex flex-col gap-6">
            <BreadCrumb text="Shared Files" />

            {/* Header */}
            <div className="px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Shared Files</h1>
                        <p className="text-gray-600 mt-1">Manage files you've shared and files shared with you</p>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="px-8">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search shared files..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={filterType === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterType('all')}
                        >
                            All
                        </Button>
                        <Button
                            variant={filterType === 'documents' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterType('documents')}
                        >
                            Documents
                        </Button>
                        <Button
                            variant={filterType === 'images' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterType('images')}
                        >
                            Images
                        </Button>
                        <Button
                            variant={filterType === 'videos' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterType('videos')}
                        >
                            Videos
                        </Button>
                        <Button
                            variant={filterType === 'others' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterType('others')}
                        >
                            Others
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="px-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="shared-with-me" className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Shared with Me
                            <Badge variant="secondary">{filterFiles(sharedWithMe).length}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="shared-by-me" className="flex items-center gap-2">
                            <Share2 className="w-4 h-4" />
                            Shared by Me
                            <Badge variant="secondary">{filterFiles(sharedByMe).length}</Badge>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="shared-with-me" className="mt-6">
                        {renderFileList(sharedWithMe, false)}
                    </TabsContent>

                    <TabsContent value="shared-by-me" className="mt-6">
                        {renderFileList(sharedByMe, true)}
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}