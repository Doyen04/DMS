'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function getUserFiles() {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            throw new Error('Unauthorized')
        }

        const files = await prisma.file.findMany({
            where: {
                userId: session.user.id
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
                userId: file.userId
            }))
        }
    } catch (error) {
        console.error('Error fetching user files:', error)
        return {
            success: false,
            error: 'Failed to fetch files'
        }
    }
}