// types/next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        fullname: string;
    }

    interface Session extends DefaultSession {
        user: {
            id: string;
            email: string;
            fullname: string;
        };
    }

    interface JWT {
        id: string;
        email: string;
        fullname: string;
    }
}
