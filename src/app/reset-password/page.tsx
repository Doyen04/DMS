
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { verifyResetToken } from "@/lib/verifyResetToken";
import ResetPassword from "./_page";
import { SearchProps } from "@/types/auth";


// Create a separate component for the form to use useSearchParams

const ResetPasswordForm: React.FC<SearchProps> = async ({ searchParams }) => {
    const { token } = await searchParams

    try {
        const { valid, data } = await verifyResetToken(token as string)
        if (!valid) return <ErrorLinkPage />
        return <ResetPassword data={data} />
    } catch (error) {
        console.log(error);
        return <ErrorLinkPage />
    }
};

const ErrorLinkPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center justify-center">
            <div className="w-[350px] h-[400px] bg-white border-2 border-[#e6f0ff] shadow-lg shadow-gray-500 flex flex-col gap-4 items-center justify-center p-4 rounded-lg">
                <Image src={'/error.svg'} width={50} height={50} alt="error" />
                <div className="text-xl font-extrabold font-inter text-red-600">Invalid Reset Link</div>
                <div className="text-center text-sm text-gray-600">
                    This reset link is invalid or has expired.
                </div>
                <Link href="/reset" className="text-blue-600 underline">
                    Request a new reset link
                </Link>
            </div>
        </div>
    )
}





export default ResetPasswordForm;