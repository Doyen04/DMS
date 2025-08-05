'use client'

import { useState, useEffect } from 'react'
import { 
    Camera, 
    Edit3, 
    Mail, 
    Save, 
    UserCircle, 
    X, 
    FileText, 
    HardDrive, 
    Share2, 
    Heart,
    Calendar,
    MapPin,
    Phone,
    Globe,
    Shield,
    Award,
    Download,
    Upload,
    Activity
} from 'lucide-react'
import { useUser } from '@/hooks/useUser'
import { fetchRecentFiles, FileData } from '@/utils/fileOperation'

const ProfilePage = () => {
    const { session, isAuthenticated } = useUser()
    const [isEditing, setIsEditing] = useState(false)
    const [activeTab, setActiveTab] = useState('overview')
    const [recentFiles, setRecentFiles] = useState<FileData[]>([])
    const [isLoadingFiles, setIsLoadingFiles] = useState(false)
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        bio: 'Passionate about efficient document management and digital organization.',
        phone: '',
        location: '',
        website: '',
        joinedDate: new Date().toISOString().split('T')[0]
    })

    // Load user data from session when component mounts
    useEffect(() => {
        if (session?.user) {
            setFormData(prev => ({
                ...prev,
                fullname: session.user.fullname || '',
                email: session.user.email || '',
            }))
        }
    }, [session])

    // Load recent files when component mounts
    useEffect(() => {
        const loadRecentFiles = async () => {
            setIsLoadingFiles(true)
            try {
                const files = await fetchRecentFiles()
                if (files) {
                    setRecentFiles(files)
                }
            } catch (error) {
                console.error('Error loading recent files:', error)
            } finally {
                setIsLoadingFiles(false)
            }
        }

        if (isAuthenticated) {
            loadRecentFiles()
        }
    }, [isAuthenticated])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = async () => {
        try {
            console.log('Saving user data:', formData)
            setIsEditing(false)
            // Add success toast here
        } catch (error) {
            console.error('Error saving profile:', error)
            // Add error toast here
        }
    }

    const handleCancel = () => {
        if (session?.user) {
            setFormData(prev => ({
                ...prev,
                fullname: session.user.fullname || '',
                email: session.user.email || '',
            }))
        }
        setIsEditing(false)
    }

    // Helper functions for file display
    const getFileIcon = (contentType: string) => {
        if (contentType.includes('image')) return '🖼️'
        if (contentType.includes('pdf')) return '📄'
        if (contentType.includes('video')) return '🎥'
        if (contentType.includes('audio')) return '🎵'
        if (contentType.includes('text')) return '📝'
        if (contentType.includes('document')) return '📋'
        if (contentType.includes('spreadsheet')) return '📊'
        return '📁'
    }

    const formatTimeAgo = (dateString: string) => {
        const now = new Date()
        const uploaded = new Date(dateString)
        const diffInHours = Math.floor((now.getTime() - uploaded.getTime()) / (1000 * 60 * 60))
        const diffInMinutes = Math.floor((now.getTime() - uploaded.getTime()) / (1000 * 60))
        
        if (diffInMinutes < 60) {
            return `${diffInMinutes}m ago`
        } else if (diffInHours < 24) {
            return `${diffInHours}h ago`
        } else {
            return uploaded.toLocaleDateString()
        }
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const stats = [
        { label: 'Total Files', value: '2,847', icon: FileText, color: 'text-blue-600 bg-blue-50', change: '+12%' },
        { label: 'Storage Used', value: '4.2 GB', icon: HardDrive, color: 'text-purple-600 bg-purple-50', change: '2.1 GB left' },
        { label: 'Shared Files', value: '156', icon: Share2, color: 'text-green-600 bg-green-50', change: '+8%' },
        { label: 'Recent Files', value: recentFiles.length.toString(), icon: Heart, color: 'text-pink-600 bg-pink-50', change: 'Last 24h' }
    ]

    const refreshRecentFiles = async () => {
        setIsLoadingFiles(true)
        try {
            const files = await fetchRecentFiles()
            if (files) {
                setRecentFiles(files)
            }
        } catch (error) {
            console.error('Error refreshing files:', error)
        } finally {
            setIsLoadingFiles(false)
        }
    }

    if (!isAuthenticated || !session) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserCircle size={32} className="text-slate-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">Authentication Required</h2>
                    <p className="text-slate-600">Please log in to view your profile.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
            <div className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Header Section */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Cover Photo */}
                    <div className="h-42 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute top-6 right-6">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/20"
                                >
                                    <Edit3 size={18} />
                                    <span className="font-medium">Edit Profile</span>
                                </button>
                            ) : (
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-all duration-300"
                                    >
                                        <Save size={18} />
                                        <span className="font-medium">Save</span>
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/20"
                                    >
                                        <X size={18} />
                                        <span className="font-medium">Cancel</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="px-8 pb-8">
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-16 relative z-10">
                            <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                                {/* Avatar */}
                                <div className="relative">
                                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl border-4 border-white shadow-xl flex items-center justify-center">
                                        <UserCircle size={80} className="text-white" />
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-all duration-300 shadow-lg group">
                                        <Camera size={20} className="text-white group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>

                                {/* Name and Email */}
                                <div className="space-y-3 lg:mb-4">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="fullname"
                                            value={formData.fullname}
                                            onChange={handleInputChange}
                                            className="text-3xl font-bold text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Your full name"
                                        />
                                    ) : (
                                        <h1 className="text-3xl font-bold text-slate-900">
                                            {formData.fullname || 'Set your name'}
                                        </h1>
                                    )}
                                    
                                    <div className="flex items-center gap-2">
                                        <Mail size={18} className="text-slate-500" />
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="text-slate-600 bg-slate-50 border-2 border-slate-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="your.email@domain.com"
                                            />
                                        ) : (
                                            <span className="text-slate-600 text-lg">{formData.email}</span>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <Calendar size={16} />
                                            <span>Joined March 2024</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <Shield size={16} />
                                            <span className="text-green-600 font-medium">Verified Account</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Premium Badge */}
                            <div className="mt-1 flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-2xl shadow-lg lg:mb-4">
                                <Award size={20} />
                                <span className="font-semibold">Premium Member</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                                    <stat.icon size={24} />
                                </div>
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                            <p className="text-slate-600 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-2xl shadow-lg p-2">
                    <div className="flex gap-2">
                        {[
                            { id: 'overview', label: 'Overview', icon: Activity },
                            { id: 'personal', label: 'Personal Info', icon: UserCircle },
                            { id: 'activity', label: 'Recent Activity', icon: FileText }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                    activeTab === tab.id 
                                        ? 'bg-blue-600 text-white shadow-lg' 
                                        : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <tab.icon size={18} />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {activeTab === 'personal' && (
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">Personal Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { name: 'fullname', label: 'Full Name', icon: UserCircle, type: 'text' },
                                        { name: 'email', label: 'Email Address', icon: Mail, type: 'email' },
                                        { name: 'phone', label: 'Phone Number', icon: Phone, type: 'tel' },
                                        { name: 'location', label: 'Location', icon: MapPin, type: 'text' },
                                    ].map((field) => (
                                        <div key={field.name} className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                                <field.icon size={16} />
                                                {field.label}
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    value={formData[field.name as keyof typeof formData]}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                                                />
                                            ) : (
                                                <p className="text-slate-900 px-4 py-3 bg-slate-50 rounded-xl">
                                                    {formData[field.name as keyof typeof formData] || `No ${field.label.toLowerCase()} provided`}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                        <Globe size={16} />
                                        Bio
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                            placeholder="Tell us about yourself..."
                                        />
                                    ) : (
                                        <p className="text-slate-900 px-4 py-3 bg-slate-50 rounded-xl">
                                            {formData.bio}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'activity' && (
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        Recent Activity
                                        <span className="text-sm font-normal text-slate-500 ml-2">
                                            (Last 24 hours)
                                        </span>
                                    </h2>
                                    <button 
                                        onClick={refreshRecentFiles}
                                        disabled={isLoadingFiles}
                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50"
                                    >
                                        <Activity size={16} className={isLoadingFiles ? 'animate-spin' : ''} />
                                        {isLoadingFiles ? 'Loading...' : 'Refresh'}
                                    </button>
                                </div>
                                
                                <div className="space-y-3">
                                    {isLoadingFiles ? (
                                        <div className="text-center py-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                                            <p className="text-slate-500">Loading recent activity...</p>
                                        </div>
                                    ) : recentFiles.length > 0 ? (
                                        recentFiles.slice(0, 10).map((file) => (
                                            <div key={file.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                                <div className="text-2xl">
                                                    {getFileIcon(file.contentType)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-slate-900 truncate">
                                                        Uploaded <span className="text-blue-600">{file.filename}</span>
                                                    </p>
                                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                                        <span>{formatTimeAgo(file.uploadedAt)}</span>
                                                        <span>•</span>
                                                        <span>{formatFileSize(file.size)}</span>
                                                    </div>
                                                </div>
                                                <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center">
                                                    <Upload size={20} />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-12">
                                            <FileText className="mx-auto h-16 w-16 text-slate-300 mb-4" />
                                            <p className="text-slate-500 text-lg mb-2">No recent activity</p>
                                            <p className="text-slate-400 text-sm">
                                                Upload some files to see your activity here
                                            </p>
                                        </div>
                                    )}
                                </div>
                                
                                {recentFiles.length > 10 && (
                                    <div className="text-center pt-6">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                            View all {recentFiles.length} recent files →
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'overview' && (
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">Profile Overview</h2>
                                <div className="prose max-w-none">
                                    <p className="text-slate-600 text-lg leading-relaxed">
                                        {formData.bio}
                                    </p>
                                </div>
                                <div className="mt-8 grid grid-cols-2 gap-6">
                                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                                        <div className="text-3xl font-bold text-blue-600">98%</div>
                                        <div className="text-sm text-slate-600 mt-1">Storage Efficiency</div>
                                    </div>
                                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                                        <div className="text-3xl font-bold text-green-600">A+</div>
                                        <div className="text-sm text-slate-600 mt-1">Organization Score</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Account Status */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Account Status</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Account Active', status: 'active', color: 'green' },
                                    { label: 'Premium Member', status: 'premium', color: 'blue' },
                                    { label: 'Email Verified', status: 'verified', color: 'green' },
                                    { label: '2FA Enabled', status: 'secure', color: 'purple' }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-slate-600">{item.label}</span>
                                        <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                {[
                                    { label: 'Download Data', icon: Download },
                                    { label: 'Security Settings', icon: Shield },
                                    { label: 'Privacy Controls', icon: UserCircle },
                                    { label: 'Help & Support', icon: Activity }
                                ].map((action, index) => (
                                    <button
                                        key={index}
                                        className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-50 rounded-xl transition-colors"
                                    >
                                        <action.icon size={18} className="text-slate-500" />
                                        <span className="text-slate-700">{action.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage