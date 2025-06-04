'use server'

import { signIn } from "@/lib/auth";
import loginSchema from "@/zodSchema/loginSchema";


interface State {
    errors: {
        email?: string[] | undefined;
        password?: string[] | undefined;
    },
    values: {
        email: string | undefined;
        password: string | undefined;
    },
    submitted: boolean,
    success: boolean;
};

const handleSignIn = async (prevState: State, formData: FormData) => {

    const email = formData.get("email") as string
    const password = formData.get("password") as string


    const validation = loginSchema.safeParse({ email, password });

    if (!validation.success) {
        const result = validation.error.flatten().fieldErrors;
        return {
            errors: result,
            values: {
                email: email,
                password: password
            },
            submitted: false,
            success: false
        };
    }

    try {
        await signIn('credentials',
            {
                email,
                password,
                redirectTo: '/'
            }
        )

        return {
            errors: {},
            values: { email, password },
            submitted: true,
            success: true, // Set this to true
        };

    } catch (error: unknown) {

        if (error && typeof error === 'object' && 'digest' in error &&
            typeof error.digest === 'string' && error.digest.includes('NEXT_REDIRECT')) {
            // Redirect is happening, let it continue
            throw error; // Re-throw to let Next.js handle the redirect
        }
        return {
            errors: {},
            values: {
                email: email,
                password: password
            },
            submitted: true,
            success: false
        };
    }
}

export default handleSignIn