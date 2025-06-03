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
const initialState: State = {
    errors: {
        email: undefined,
        password: undefined,
    },
    values: {
        email: undefined,
        password: undefined,
    },
    submitted: false,
    success: false
}

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
        const result = await signIn('credentials',
            {
                email,
                password,
                redirectTo : '/'
            }
        )
        
        return {
            errors: {},
            values: { email, password },
            submitted: true,
            success: true, // Set this to true
        };

    } catch (error:any) {
        
        if (error.digest?.includes('NEXT_REDIRECT')) {
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