'use client'
import Image from "next/image";

import submitNewPassword from "@/action/submitNewPassword";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import Input from "@/ui/input";
import Button from "@/ui/button";
import Footer from "@/component/footer";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


interface State {
    errors: {
        password?: string[] | undefined;
        confirmPassword?: string[] | undefined;
    },
    values: {
        password: string | undefined;
        confirmPassword: string | undefined;
    },
    submitted: boolean,
    success: boolean;
}

const initialState: State = {
    errors: {
        password: undefined,
        confirmPassword: undefined,
    },
    values: {
        password: undefined,
        confirmPassword: undefined,
    },
    submitted: false,
    success: false
}


interface ResetPasswordProps {
    data: {
        userId: string;
    } | undefined;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ data }) => {
    const router = useRouter()
    const actionHandler = async (prevState: State, formData: FormData) => {
        return submitNewPassword(prevState, formData, data?.userId as string);
    };
    const [state, formAction] = useActionState(actionHandler, initialState);

    useEffect(() => {

        if (state.submitted && !state.success) {
            toast.error('Request Failed.');
        }
        if (state.submitted && state.success) {
            router.push('/signin')
            toast.success('password Reset Sucessful')
        }
    }, [state,router]);

    return (
        <div className="w-screen h-screen flex flex-col items-center gap-16.5">
            <nav className="w-full h-14 px-19 flex bg-[#e6f0ff] shadow-xs shadow-gray-400">
                <Link className="flex items-center gap-1.5" href='/'>
                    <Image src={'./arrow_back.svg'} width={20} height={20} alt='icon' />
                    <p className="text-center text-[#0c7ff2]">Back to Homepage</p>
                </Link>
            </nav>

            <div className="w-[350px] min-h-[450px] bg-white border-2 border-[#e6f0ff] shadow-lg shadow-gray-500 flex flex-col gap-2 items-center p-2 pt-9 rounded-lg">
                <Image src={'/lock.png'} width={50} height={50} alt="lock" />
                <div className="text-xl font-extrabold font-inter">Set New Password</div>
                <div className="text-center w-[280px] text-xs leading-normal">
                    Enter your new password below. Make sure it&apos;s strong and secure.
                </div>

                <form action={formAction} className="flex flex-col gap-4 p-4 w-full">
                    <Input
                        type="password"
                        name="password"
                        labelText='New Password'
                        placeholder="Enter new password"
                        iconUrl="/lock.svg"
                        error={state.errors.password}
                        defaultValue={state.values.password}
                    />

                    <Input
                        type="password"
                        name="confirmPassword"
                        labelText='Confirm Password'
                        placeholder="Confirm new password"
                        iconUrl="/lock.svg"
                        error={state.errors.confirmPassword}
                        defaultValue={state.values.confirmPassword}
                    />

                    <Button type="submit" value={"Reset Password"} />

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
    );
};

export default ResetPassword;