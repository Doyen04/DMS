'use client'

import React, { useActionState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Input from "@/ui/input";
import Footer from "@/component/footer";
import Button from "@/ui/button";
import handleSignIn from "@/action/signin";
import { toast } from "react-toastify";
import { initialSignInState } from "@/types/auth";


const SignIn = () => {
    const [state, formAction] = useActionState(handleSignIn, initialSignInState);

    useEffect(() => {

        if (state.submitted && !state.success) {
            toast.error('Signin failed');
        }
    }, [state]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center gap-16.5">
            <nav className="w-full h-14 px-19 flex bg-[#e6f0ff] shadow-xs shadow-gray-400" >
                <Link className=" flex items-center gap-1.5 " href='/'>
                    <Image src={'./arrow_back.svg'} width={20} height={20} alt='icon' />
                    <p className="text-center text-[#0c7ff2]">Back to Homepage</p>
                </Link>
            </nav>
            <div className="w-[350px] h-[410px] bg-white border-2 border-[#e6f0ff] shadow-lg shadow-gray-500 flex flex-col gap-2 items-center p-2 pt-9 rounded-lg">
                <div className="text-xl font-extrabold font-inter text-black">Sign in to FileServer</div>
                <div className="text-center w-[290px] text-xs text-black">Enter your credential to access your account.</div>
                <form action={formAction} className="flex flex-col gap-4 p-4 w-full">
                    <Input type="email" name="email"
                        defaultValue={state.values?.email}
                        error={state.errors?.email}
                        labelText='Email'
                        placeholder="Enter your email"
                        iconUrl="/mail.svg" />

                    <Input type="password" name="password"
                        defaultValue={state.values?.password}
                        error={state.errors?.password}
                        labelText='Password'
                        placeholder="Enter your password"
                        iconUrl="/lock.svg" />

                    <p className="text-[#0c7ff2] font-medium text-xs"><Link href={'/reset'}>Forgot password?</Link></p>
                    <Button type="submit" value={'Sign In'} />

                    <p className="w-full text-center text-sm">
                        Don&apos;t have an account?
                        <span className="text-[#0c7ff2] font-medium">
                            <Link href={'/signup'}> Sign Up</Link>
                        </span>
                    </p>
                </form>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <span className="text-sm">✓</span>
                    </div>
                    <span className="text-xs text-gray-600">Secure Access</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-sm">⚡</span>
                    </div>
                    <span className="text-xs text-gray-600">Fast Performance</span>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SignIn