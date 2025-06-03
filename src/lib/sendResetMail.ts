import { ResetEmailTemplate } from '@/component/resetEmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetEmail(email: string, fullname: string) {
    if (!process.env.RESEND_API_KEY) {
        return {
            error: 'Email service not configured',
            data: null,
            success: false
        };
    }

    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: 'Password Reset Request',
        react: await ResetEmailTemplate({ firstName: fullname }),
    });

    return {
        error: error ? error.message : null,
        data: data,
        success: error ? false : true
    };
}