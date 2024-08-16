"use server";

import { auth } from '@/auth';

export async function onGetUserAction() {
    const session = await auth();
    return !!session?.user;
}
