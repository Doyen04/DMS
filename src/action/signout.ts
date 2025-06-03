'use server'
import { signOut } from "@/lib/auth"



const SignOut = async () => {
    await signOut({ redirectTo: '/' })
}

export default SignOut