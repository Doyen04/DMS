import React from "react";
import Link from "next/link";
import Image from "next/image";
import FormItem from "@/ui/formItem";
import Input from "@/ui/input";
import Footer from "@/component/footer";

const SignIn =()=>{
    return (
        <div>
            <div className="w-screen h-screen flex flex-col items-center gap-7.5">
            <nav className="w-full h-14 px-19 flex bg-[#e6f0ff] shadow-xs shadow-gray-400" >
                <Link className=" flex items-center gap-1.5 " href='/'>
                    <Image src={'./arrow_back.svg'} width={20} height={20} alt='icon' />
                    <p className="text-center text-[#0c7ff2]">Back to Homepage</p>
                </Link>
            </nav>
            <div className="w-[350px] h-[410px] bg-white border-2 border-[#e6f0ff] shadow-lg shadow-gray-500 flex flex-col gap-2 items-center p-2 pt-9 rounded-lg">
                <div className="text-xl font-extrabold font-inter">Get started for free</div>
                <div className="text-center w-[290px] text-xs">Create your account to manage your documents seamlessly.</div>
                <form action="" className="flex flex-col gap-4 p-4 w-full">
                    <FormItem>
                        <Input type="email" name="" id="email" labelText='Email' placeholder="Enter your email" iconUrl="/mail.svg" />
                    </FormItem>
                    <FormItem>
                        <Input type="password" name="" id="password" labelText='Password' placeholder="Enter your password" iconUrl="/lock.svg" />
                    </FormItem>
                    <p className="text-[#0c7ff2] font-medium text-sm">Forgot password?</p>
                    <input className="bg-[#0c7ff2] rounded-sm p-2 text-white" type="button" value="Sign In" />
                    
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
        </div>
    )
}

export default SignIn