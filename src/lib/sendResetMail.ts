import { ResetEmailTemplate } from '@/component/resetEmailTemplate';
import { Resend } from 'resend';
import { createResetLink } from './resetPasswordLink';
import { User } from '@/generated/prisma-client';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendResetEmailResult {
    error: string | null;
    data: unknown;
    success: boolean;
}


export async function sendResetEmail(user: User | null): Promise<SendResetEmailResult> {
    if (!process.env.RESEND_API_KEY) {
        return {
            error: 'Email service not configured',
            data: null,
            success: false
        };
    }
    console.log(process.env.FROM_EMAIL);
    
    if (!process.env.FROM_EMAIL) {
        return {
            error: 'Sender email not configured',
            data: null,
            success: false
        };
    }
    if(user){
        const resetUrl: string = await createResetLink(user.email, user.id);
    
        const { data, error } = await resend.emails.send({
            from: `DMS Support <${process.env.FROM_EMAIL}>`,
            to: [user.email],
            subject: 'Password Reset Request',
            react: await ResetEmailTemplate({ firstName: user.fullname as string, resetUrl: resetUrl }),
        });
    
        return {
            error: error ? error.message : null,
            data: data,
            success: error ? false : true
        };
    }
    return {
            error: "User not Found",
            data: null,
            success: false
        };
}