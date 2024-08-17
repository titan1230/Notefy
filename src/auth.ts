import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import client from "@/lib/db"
import authConfig from "./auth.config";

export const BASE_PATH = "/api/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  callbacks: {
    authorized({ request, auth }) {
      try {
        const { pathname } = request.nextUrl;

        const unprotectedRoutes = ["/", "/onboarding", "/api/auth/signin"];

        if (unprotectedRoutes.includes(pathname)) {
          return true;
        }

        return !!auth;
      } catch (error) {
        console.error("Authorization check failed:", error);
        return false;
      }
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  basePath: BASE_PATH,
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
})

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

export const { GET, POST } = handlers
