import { ResetEmailTemplate } from '@/component/resetEmailTemplate';
import { Resend } from 'resend';
import { createResetLink } from './createResetLink';
import { User } from '@/generated/prisma-client';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendResetEmailResult {
    error: string | null;
    data: unknown;
    success: boolean;
}

interface ResendErrorResponse {
    statusCode: number;
    error: string;
}

export async function sendResetEmail(user: User | null): Promise<SendResetEmailResult> {
    if (!process.env.RESEND_API_KEY) {
        return {
            error: 'Email service not configured',
            data: null,
            success: false
        };
    }
    if (!process.env.EMAIL_FROM) {
        return {
            error: 'Sender email not configured',
            data: null,
            success: false
        };
    }
    if (user) {
        const resetUrl: string = await createResetLink(user.email, user.id);
        console.log(resetUrl, 'rest url in sendresetmail');

        const { data, error } = await resend.emails.send({
            from: `DMS Support <${process.env.EMAIL_FROM}>`,
            to: [user.email],
            subject: 'Password Reset Request',
            react: await ResetEmailTemplate({ firstName: user.fullname as string, resetUrl: resetUrl }),
        });
        console.log(data, 'data->error', error, 'result of send', error?.message);
        return {
            error: error ? ((error as unknown as ResendErrorResponse).error || error.message || 'Unknown email error') : null,
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