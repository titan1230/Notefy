"use server";
import { signIn as naSignIn, signOut as naSignOut } from "@/auth";

export async function signIn() {
  await naSignIn("google");
}

export async function signOut() {
  await naSignOut({ redirectTo: "/" });
}