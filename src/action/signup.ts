'use server'

import prisma from '@/lib/prisma'
import { SignUpState } from '@/types/auth';
import userSchema from '@/zodSchema/userSchema';
import * as bcrypt from 'bcryptjs'


export default async function createUser(prevState: SignUpState, formData: FormData): Promise<SignUpState> {
    const data = {
        fullname: formData.get('fullname')?.toString(),
        email: formData.get('email')?.toString(),
        password: formData.get('password')?.toString(),
    };

    const result = userSchema.safeParse(data);
    console.log(result, result.error?.flatten().fieldErrors);

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
            values: data,
            submitted: false,
            success: false
        };
    }
    let hashedPassword = ''
    if (data.password) hashedPassword = await bcrypt.hash(data?.password, 10);

    if (data.email && hashedPassword && data.fullname) {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        });
        
        if (existingUser) {
            return {
                errors: {},
                values: data,
                submitted: true,
                success: false
            };
        }
        try {
            const result = await prisma.user.create({
                data: {
                    fullname: data.fullname,
                    email: data.email,
                    password: hashedPassword,
                },
            });
            if (!result) console.log('user creation failed')
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
            };
        }
    }
    return {
        errors: {},
        values: data,
        submitted: true,
        success: false
    }
}
