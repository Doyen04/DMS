'use server'

import { auth } from '@/lib/auth'
import { put } from '@vercel/blob'
import prisma from '@/lib/prisma'

export default async function handleFileUpload(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { error: 'Unauthorized' }
    }

    const file = formData.get('file') as File
    if (!file) {
      return { error: 'No file provided' }
    }

    // Check file size (100MB limit)
    const maxSize = 100 * 1024 * 1024
    if (file.size > maxSize) {
      return { error: 'File too large. Maximum size is 100MB.' }
    }

    // Upload to Vercel Blob
    const blob = await put(`uploads/${session.user.id}/${Date.now()}-${file.name}`, file, {
      access: 'public',
    })

    // Save to database
    const fileRecord = await prisma.file.create({
      data: {
        name: file.name,
        size: file.size,
        type: file.type,
        url: blob.url,
        userId: session.user.id,
      }
    })

    return { 
      success: true, 
      file: {
        id: fileRecord.id,
        name: fileRecord.name,
        size: fileRecord.size,
        type: fileRecord.type,
        url: fileRecord.url,
      }
    }
  } catch (error) {
    console.error('Upload error:', error)
    return { error: 'Upload failed' }
  }
}