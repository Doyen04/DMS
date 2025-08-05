'use server'

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function getRecentUserFiles() {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            throw new Error('Unauthorized')
        }

        // Calculate 24 hours ago
        const twentyFourHoursAgo = new Date()
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)

        const files = await prisma.file.findMany({
            where: {
                userId: session.user.id,
                createdAt: {
                    gte: twentyFourHoursAgo  // Greater than or equal to 24 hours ago
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return {
            success: true,
            files: files.map(file => ({
                id: file.id,
                filename: file.name,
                url: file.url,
                size: file.size,
                uploadedAt: file.createdAt.toISOString(),
                contentType: file.type,
                userId: file.userId,
                isRecent: true  // Flag to indicate this is a recent file
            }))
        }
    } catch (error) {
        console.error('Error fetching recent user files:', error)
        return {
            success: false,
            error: 'Failed to fetch recent files'
        }
    }
}