'use client'

import React, { useActionState, useEffect } from "react";
import Input from "@/ui/input";
import Image from "next/image";
import Footer from "@/component/footer";
import Link from "next/link";
import createUser from "@/action/signup";
import Button from "@/ui/button";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'


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
const initialState: State = {
    errors: {
        fullname: undefined,
        email: undefined,
        password: undefined,
    },
    values: {
        fullname: undefined,
        email: undefined,
        password: undefined,
    },
    submitted: false,
    success: false
}

const SignUp = () => {
    const [state, formAction,] = useActionState(createUser, initialState);
    const router = useRouter()

    useEffect(() => {
        if (state.submitted && !state.success) {
            toast.error('Signup failed');
        }
        if (state.submitted && state?.success) {
            router.push('/signin')
            toast.success('Signup successful');
        }
    }, [state, router]);
    return (
        <div className="w-screen h-screen flex flex-col items-center gap-16.5">
            <nav className="w-full h-14 px-19 flex bg-[#e6f0ff] shadow-xs shadow-gray-400" >
                <Link className=" flex items-center gap-1.5 " href='/'>
                    <Image src={'./arrow_back.svg'} width={20} height={20} alt='icon' />
                    <p className="text-center text-[#0c7ff2]">Back to Homepage</p>
                </Link>
            </nav>
            <div className="w-[350px] h-[550px] bg-white border-2 border-[#e6f0ff] shadow-lg shadow-gray-500 flex flex-col gap-2 items-center p-2 pt-9 rounded-lg">
                <div className="text-xl font-extrabold font-inter">Get started for free</div>
                <div className="text-center w-[290px] text-xs">Create your account to manage your documents seamlessly.</div>
                <form action={formAction} className="flex flex-col gap-4 p-4 w-full">
                    <Input type="text" name="fullname"
                        defaultValue={state.values?.fullname}
                        labelText='Full name' error={state.errors?.fullname}
                        placeholder="Enter your full name"
                        iconUrl="/person.svg" />
                    <Input type="email" name="email"
                        defaultValue={state.values?.email}
                        labelText='Email'
                        error={state.errors?.email}
                        placeholder="Enter your email"
                        iconUrl="/mail.svg" />
                    <Input type="password" name="password"
                        defaultValue={state.values?.password}
                        labelText='Password'
                        error={state.errors?.password}
                        placeholder="Enter your password"
                        iconUrl="/lock.svg" />
                    <Button type="submit" value={'Sign Up'} />
                    <p className="text-xs text-center w-full">
                        By signing up, you agree to our
                        <span className="text-[#0c7ff2] font-medium"> Terms of Service </span>
                        and
                        <span className="text-[#0c7ff2] font-medium"> Privacy Policy </span>
                    </p>
                    <p className="w-full text-center text-sm">
                        Already have an account?
                        <span className="text-[#0c7ff2] font-medium"> <Link href='/signin'>Sign In</Link>
                        </span>
                    </p>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default SignUp