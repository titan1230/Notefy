"use server";

import { auth } from '@/auth';

export async function onGetUserAction() {
    const session = await auth();

    return !!session?.user;
}

export async function getUserID() {
    const session = await auth();

    return session?.user.id;
}