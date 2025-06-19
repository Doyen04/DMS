'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { del } from '@vercel/blob'

export async function deleteUserFile(fileId: string) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            throw new Error('Unauthorized')
        }

        // First, get the file to check ownership and get the blob URL
        const file = await prisma.file.findUnique({
            where: {
                id: fileId
            }
        })

        if (!file) {
            throw new Error('File not found')
        }

        // Check if user owns the file
        if (file.userId !== session.user.id) {
            throw new Error('Unauthorized - You can only delete your own files')
        }

        // Delete from Vercel Blob storage
        await del(file.url)

        // Delete from database
        await prisma.file.delete({
            where: {
                id: fileId
            }
        })

        return {
            success: true,
            message: 'File deleted successfully'
        }
    } catch (error) {
        console.error('Error deleting file:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete file'
        }
    }
}
// This function deletes a user file from both the Vercel Blob storage and the database.
// It first checks if the user is authenticated and owns the file, then deletes the file from