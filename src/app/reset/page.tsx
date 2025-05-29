import React from "react";
import Link from "next/link";
import Image from "next/image";
import FormItem from "@/ui/formItem";
import Input from "@/ui/input";
import Footer from "@/component/footer";

const Reset = () => {
    return (
        <div className="w-screen h-screen flex flex-col items-center gap-16.5">
            <nav className="w-full h-14 px-19 flex bg-[#e6f0ff] shadow-xs shadow-gray-400" >
                <Link className=" flex items-center gap-1.5 " href='/'>
                    <Image src={'./arrow_back.svg'} width={20} height={20} alt='icon' />
                    <p className="text-center text-[#0c7ff2]">Back to Homepage</p>
                </Link>
            </nav>
            <div className="w-[350px] h-[400px] bg-white border-2 border-[#e6f0ff] shadow-lg shadow-gray-500 flex flex-col gap-2 items-center p-2 pt-9 rounded-lg">
                <Image src={'/lock.png'} width={50} height={50} alt="lock"/>
                <div className="text-xl font-extrabold font-inter">Reset Your Password</div>
                <div className="text-center w-[280px] text-xs leading-normal">
                    No worries! Enter the email address associated with your account, and we'll send you a link to reset your password.
                </div>
                <form action="" className="flex flex-col gap-4 p-4 w-full">
                    <FormItem>
                        <Input type="email" name="" id="email" labelText='Email' placeholder="Enter your email" iconUrl="/mail.svg" />
                    </FormItem>
                    <input className="bg-[#0c7ff2] rounded-sm p-2 text-white text-sm" type="button" value="Send Reset Link" />

                    <p className="w-full text-center text-xs">
                        Remember your password?
                        <span className="text-[#0c7ff2] font-medium text-sm">
                            <Link href={'/signin'}> Sign in instead</Link>
                        </span>
                    </p>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Reset