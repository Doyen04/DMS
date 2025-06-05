'use client'

import React, { useActionState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Input from "@/ui/input";
import Footer from "@/component/footer";
import Button from "@/ui/button";
import handleResetPassword from "@/action/resetPassword";
import { toast } from "react-toastify";
import { initialResetState } from "@/types/auth";


const Reset = () => {
    const [state, formAction] = useActionState(handleResetPassword, initialResetState);

    useEffect(() => {

        if (state.submitted && !state.success) {
            toast.error('Request Failed.');
        }
        if (state.submitted && state.success) {
            toast.success('Email Reset Link Sent')
        }
    }, [state]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center gap-10">
            <nav className="w-full h-14 px-19 flex bg-[#e6f0ff] shadow-xs shadow-gray-400" >
                <Link className=" flex items-center gap-1.5 " href='/'>
                    <Image src={'./arrow_back.svg'} width={20} height={20} alt='icon' />
                    <p className="text-center text-[#0c7ff2]">Back to Homepage</p>
                </Link>
            </nav>

            <div className="w-[350px] h-[400px] bg-white border-2 border-[#e6f0ff] shadow-lg shadow-gray-500 flex flex-col gap-2 items-center p-2 pt-9 rounded-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[100%] flex items-center justify-center mx-auto shadow-lg">
                    <Image src={'/lock.png'} width={32} height={32} alt="Security lock" className="filter brightness-0 invert" />
                </div>
                <div className="text-xl font-extrabold font-inter">Reset Your Password</div>
                <div className="text-center w-[280px] text-xs leading-normal">
                    No worries! Enter the email address associated with your account, and we&apos;ll send you a link to reset your password.
                </div>
                <form action={formAction} className="flex flex-col gap-4 p-4 w-full">

                    <Input type="email" name="email"
                        defaultValue={state.values?.email}
                        error={state.error?.email}
                        labelText='Email' placeholder="Enter your email"
                        iconUrl="/mail.svg" />

                    <Button type="submit" value={"Send Reset Link"} />
                    
                    <p className="w-full text-center text-xs">
                        Remember your password?
                        <span className="text-[#0c7ff2] font-medium text-sm">
                            <Link href={'/signin'}> Sign in instead</Link>
                        </span>
                    </p>
                </form>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">i</span>
                    </div>
                    <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">What happens next?</p>
                        <p className="text-blue-700">
                            We&apos;ll send a secure reset link to your email. Click the link and create a new password for your account.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white/60 rounded-lg border border-slate-200">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-700">Secure Link</p>
                        <p className="text-xs text-slate-500">Expires in 24 hours</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/60 rounded-lg border border-slate-200">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-700">Privacy Protected</p>
                        <p className="text-xs text-slate-500">Your data is safe</p>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <p className="text-xs text-slate-500">
                    Need help? Contact our{' '}
                    <Link href="/support" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                        support team
                    </Link>
                </p>
            </div>
            <Footer className="relative" />
        </div>
    )
}

export default Reset