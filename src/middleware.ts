import { NextResponse } from "next/server";
import authConfig, { BASE_PATH } from "@/auth.config";
import NextAuth from "next-auth";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const reqUrl = new URL(req.url);
  if (!req.auth && reqUrl?.pathname !== "/") {

    if (reqUrl.pathname === "/onboarding") return;

    console.log("Redirecting to onboarding");
    return NextResponse.redirect(
      new URL(
        `/onboarding`,
        req.url
      )
    );
  }

  if (req.auth && reqUrl?.pathname === "/onboarding") {
    console.log("Redirecting to dashboard");
    return NextResponse.redirect(
      new URL(
        `/dashboard`,
        req.url
      )
    );
  }
});