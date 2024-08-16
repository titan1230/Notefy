import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import client from "@/lib/db"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: MongoDBAdapter(client),
  // pages: {
  //   signIn: "/api/auth/sign-in",
  //   signOut: "/api/auth/sign-out",
  //   error: "/api/auth/error",
  // },
callbacks: {
  authorized({ request, auth }) {
    const { pathname } = request.nextUrl
    if (pathname === "/middleware-example") return !!auth
    return true
  },
  async session({ session, token }) {
    if (token?.accessToken) {
      session.accessToken = token.accessToken as string;
    }
    return session
  },
},
})

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}


export const { GET, POST } = handlers
