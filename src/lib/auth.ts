import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./prisma"
import Credentials from "next-auth/providers/credentials"
import loginSchema from "@/zodSchema/loginSchema"
import * as bcrypt from 'bcryptjs'

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const parsedCredentials = loginSchema.safeParse(credentials)
                if (!parsedCredentials.success) return null

                const { email, password } = parsedCredentials.data;
                const user = await prisma.user.findUnique(
                    {
                        where: {
                            email: email
                        }
                    }
                )
                if (!user) return null

                const isPasswordValid = await bcrypt.compare(password, user.password)
                if (!isPasswordValid) return null


                // return user object with their profile data
                return { id: user.id, fullname: user.fullname , email: user.email }
            },

        }),

    ],
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/signin",
        error: "/error"
    },
    callbacks: {
        async signIn({ user}) {
            // Block sign-in based on some condition
            return !!user?.email
        },
        // async redirect({ url, baseUrl }) {
        //     return url.startsWith(baseUrl) ? url : baseUrl
        // },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.fullname = user.fullname // Add this line
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id as string
            session.user.email = token.email as string
            session.user.fullname = token.fullname as string // Add this line
            return session
        },

    },
    events: {
        async signIn({ user }) {
            console.log("User signed in:", user.email)
        },
        async signOut(params) {
            const token = 'token' in params ? params.token : null;
            console.log("User signed out:", token?.email || "Session ended")
        },
        async createUser({ user }) {
            console.log("New user created:", user.email)
        }
    },
    secret: process.env.AUTH_SECRET
})