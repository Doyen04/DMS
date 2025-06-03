'use client'

import React, { useActionState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Input from "@/ui/input";
import Footer from "@/component/footer";
import Button from "@/ui/button";
import handleSignIn from "@/action/signin";
import { toast } from "react-toastify";



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

const SignIn = () => {
    const [state, formAction] = useActionState(handleSignIn, initialState);

    useEffect(() => {
        
        if (state.submitted && !state.success) {
            toast.error('Signin failed');
        }
    }, [state]);
    return (
        <div className="w-screen h-screen flex flex-col items-center gap-16.5">
            <nav className="w-full h-14 px-19 flex bg-[#e6f0ff] shadow-xs shadow-gray-400" >
                <Link className=" flex items-center gap-1.5 " href='/'>
                    <Image src={'./arrow_back.svg'} width={20} height={20} alt='icon' />
                    <p className="text-center text-[#0c7ff2]">Back to Homepage</p>
                </Link>
            </nav>
            <div className="w-[350px] h-[410px] bg-white border-2 border-[#e6f0ff] shadow-lg shadow-gray-500 flex flex-col gap-2 items-center p-2 pt-9 rounded-lg">
                <div className="text-xl font-extrabold font-inter">Sign in to FileServer</div>
                <div className="text-center w-[290px] text-xs">Enter your credential to access your account.</div>
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
                        Don't have an account?
                        <span className="text-[#0c7ff2] font-medium">
                            <Link href={'/signup'}> Sign Up</Link>
                        </span>
                    </p>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default SignIn