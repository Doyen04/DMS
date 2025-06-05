import jwt, { JwtPayload } from 'jsonwebtoken';

interface ResetTokenPayload {
    userId: string;
    email: string;
    exp: number; // Expiration timestamp
}

export async function createResetLink(email: string, userId: string): Promise<string> {
    // Set expiration to 24 hours from now
    const expirationTime = Math.floor(Date.now() / 1000) + (24 * 60 * 60); // 24 hours in seconds
    
    // Create payload with user info and expiration
    const payload: ResetTokenPayload = {
        userId,
        email,
        exp: expirationTime
    };
    
    // Use a secret key from environment variables
    const secret = process.env.JWT_SECRET;
    
    // Generate JWT token
    const resetToken = jwt.sign(payload, secret as string);
    
    // Create the reset URL
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;
    
    return resetUrl;
}


