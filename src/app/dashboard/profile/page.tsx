'use client'

import { useState, useEffect } from 'react'
import { Camera, Edit3, Mail, Save, UserCircle, X } from 'lucide-react'
import { useUserAuth } from '@/hooks/useUserAuth'

const ProfilePage = () => {
    const { session, isAuthenticated } = useUserAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        bio: 'Software Developer passionate about building efficient document management systems.'
    })

    // Load user data from session when component mounts
    useEffect(() => {
        if (session?.user) {
            setFormData({
                fullname: session.user.fullname || '',
                email: session.user.email || '',
                bio: 'Software Developer passionate about building efficient document management systems.'
            })
        }
    }, [session])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = async () => {
        // Handle save logic here - you can add API call to update user data
        try {
            // Add your API call here to update user profile
            console.log('Saving user data:', formData)
            setIsEditing(false)
        } catch (error) {
            console.error('Error saving profile:', error)
        }
    }

    const handleCancel = () => {
        // Reset form data to original session data
        if (session?.user) {
            setFormData({
                fullname: session.user.fullname || '',
                email: session.user.email || '',
                bio: 'Software Developer passionate about building efficient document management systems.'
            })
        }
        setIsEditing(false)
    }

    if (!isAuthenticated || !session) {
        return (
            <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
                <div className="text-slate-600">Please log in to view your profile.</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-sm shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-900 h-32 relative">
                        <div className="absolute -bottom-16 left-8">
                            <div className="relative">
                                <div className="w-32 h-32 bg-slate-700 rounded-full border-4 border-white flex items-center justify-center">
                                    <UserCircle size={80} className="text-slate-400" />
                                </div>
                                <button className="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                                    <Camera size={16} className="text-white" />
                                </button>
                            </div>
                        </div>
                        <div className="absolute top-4 right-6">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition-colors"
                                >
                                    <Edit3 size={15} />
                                    <span className="text-sm">Edit Profile</span>
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition-colors"
                                    >
                                        <Save size={15} />
                                        <span className="text-sm">Save</span>
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-1.5 bg-slate-600 text-white px-4 py-2 rounded-sm hover:bg-slate-700 transition-colors"
                                    >
                                        <X size={15} />
                                        <span className="text-sm">Cancel</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-20 pb-6 px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleInputChange}
                                        className="text-2xl font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-sm px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                ) : (
                                    <h1 className="text-2xl font-bold text-slate-900">{formData.fullname || 'No name provided'}</h1>
                                )}
                                <div className="flex items-center gap-1.5 mt-1">
                                    <Mail size={15} className="text-slate-500" />
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="text-slate-600 bg-slate-50 border border-slate-300 rounded-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        />
                                    ) : (
                                        <span className="text-slate-600">{formData.email}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Information */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Personal Information */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-sm shadow-sm border border-slate-200 p-6">
                            <h2 className="text-lg font-semibold text-slate-900 mb-4">Personal Information</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="fullname"
                                            value={formData.fullname}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        />
                                    ) : (
                                        <p className="text-slate-900">{formData.fullname || 'No name provided'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        />
                                    ) : (
                                        <p className="text-slate-900">{formData.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                                    {isEditing ? (
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        />
                                    ) : (
                                        <p className="text-slate-900">{formData.bio}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Statistics */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-sm shadow-sm border border-slate-200 p-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Statistics</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600">Total Files</span>
                                    <span className="text-slate-900 font-medium">24</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600">Storage Used</span>
                                    <span className="text-slate-900 font-medium">2.1 GB</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600">Shared Files</span>
                                    <span className="text-slate-900 font-medium">8</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600">Favorites</span>
                                    <span className="text-slate-900 font-medium">12</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-sm shadow-sm border border-slate-200 p-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Status</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-slate-600 text-sm">Account Active</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <span className="text-slate-600 text-sm">Premium Plan</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-slate-600 text-sm">Email Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage