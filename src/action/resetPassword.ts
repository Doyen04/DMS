'use server'

import prisma from "@/lib/prisma";
import { sendResetEmail } from "@/lib/sendResetMail";
import { ResetState } from "@/types/auth";
import emailSchema from "@/zodSchema/emailSchema";



const handleResetPassword = async (prevState: ResetState, formData: FormData): Promise<ResetState> => {

    const email = formData.get("email") as string

    const validation = emailSchema.safeParse({ email });

    const user = await prisma.user.findUnique(
        {
            where: {
                email: email
            }
        })
    console.log(user);
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
        const result = await sendResetEmail(user)
        console.log(result);

        if (result.error) {
            return {
                error: {},
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


    } catch (error) {
        console.log(error);
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