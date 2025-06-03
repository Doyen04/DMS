'use server'

import prisma from "@/lib/prisma";
import { sendResetEmail } from "@/lib/sendResetMail";
import emailSchema from "@/zodSchema/emailSchema";


interface State {
    error: {
        email?: string[] | undefined;
    },
    values: {
        email: string | undefined;
    },
    submitted: boolean,
    success: boolean;
};
const initialState: State = {
    error: {
        email: undefined,
    },
    values: {
        email: undefined,
    },
    submitted: false,
    success: false
}

const handleResetPassword = async (prevState: State, formData: FormData) => {

    const email = formData.get("email") as string

    const validation = emailSchema.safeParse({ email });

    // const user = await prisma.user.findUnique(
    //     {
    //         where: {
    //             email: email
    //         }
    //     })

    if (!validation.success) {
        const result = validation.error.flatten().fieldErrors;
        return {
            error: result,
            values: {
                email: email,
            },
            submitted: false,
            success: false
        };
    }

    try {
        const result = await sendResetEmail(email, 'solaopeyemi')
        console.log(result);
        
        if (result.error) {
            return {
                error: {  },
                values: { email: email },
                submitted: true,
                success: false, // Set this to true
            };
        } else {
            return {
                error: {},
                values: { email: email },
                submitted: true,
                success: true, // Set this to true
            };
        }


    } catch (error: any) {
        return {
            error: {},
            values: {
                email: email,
            },
            submitted: true,
            success: false
        };
    }
}

export default handleResetPassword