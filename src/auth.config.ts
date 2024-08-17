import GoogleProvider from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"

export const BASE_PATH = "/api/auth";

export default {
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        })
    ],
} satisfies NextAuthConfig