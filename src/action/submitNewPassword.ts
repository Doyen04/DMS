'use server'

import prisma from '@/lib/prisma'
import { ResetPasswordState } from '@/types/auth';
import resetPasswordSchema from '@/zodSchema/resetPasswordSchema';
import * as bcrypt from 'bcryptjs'


export default async function submitNewPassword(prevState: ResetPasswordState, formData: FormData, userId: string): Promise<ResetPasswordState> {

    const data = {
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string
    }

    if (!userId) {
        return {
            errors: { password: ['Invalid user session'] },
            values: data,
            submitted: true,
            success: false
        };
    }

    const result = resetPasswordSchema.safeParse(data);
    console.log(result, result.error?.flatten().fieldErrors);

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
            values: data,
            submitted: false,
            success: false
        };
    }

    if (data.password && data.confirmPassword) {

        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);

            const result = await prisma.user.update({
                where: { id: userId },
                data: { password: hashedPassword }
            });
            if (!result) {
                console.log('Password Reset failed')
                return {
                    errors: {},
                    values: data,
                    submitted: true,
                    success: false
                };
            }
            return {
                errors: {},
                values: data,
                submitted: true,
                success: true
            }
        } catch (err) {
            console.log(err);
            return {
                errors: {},
                values: data,
                submitted: true,
                success: false
            }
        }
    }
    return {
        errors: {},
        values: data,
        submitted: true,
        success: false
    }
}
