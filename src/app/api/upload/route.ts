import { NextRequest, NextResponse } from 'next/server'
import handleFileUpload from '@/action/upload'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const result = await handleFileUpload(formData)
    
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('API Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

// export const maxDuration = 300 // 5 minutes for large uploads