'use server'

import prisma from '@/lib/prisma'
import userSchema from '@/zodSchema/userSchema';
import * as bcrypt from 'bcryptjs'


interface State {
    errors: {
        fullname?: string[] | undefined;
        email?: string[] | undefined;
        password?: string[] | undefined;
    },
    values: {
        fullname: string | undefined;
        email: string | undefined;
        password: string | undefined;
    },
    submitted: boolean,
    success: boolean;
};

export default async function createUser(prevState: State, formData: FormData): Promise<State> {
    const data = {
        fullname: formData.get('fullname')?.toString(),
        email: formData.get('email')?.toString(),
        password: formData.get('password')?.toString(),
    };

    const result = userSchema.safeParse(data);
    console.log(result, result.error?.flatten().fieldErrors);

    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors, values: data, submitted: false, success: false };
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
            let result = await prisma.user.create({
                data: {
                    fullname: data.fullname,
                    email: data.email,
                    password: hashedPassword,
                },
            });
            return {
                errors: {},
                values: data,
                submitted: true,
                success: true
            }
        } catch (err) {
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
