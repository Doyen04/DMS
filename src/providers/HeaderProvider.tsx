import { auth } from "@/lib/auth"
import Header from "@/component/header"
import { SessionProvider } from "next-auth/react"

export default async function ServerProvider() {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <Header />
        </SessionProvider>
    )
}