import React, { Suspense } from 'react';
import UserInformation from './UserInformation';
import SocialLinks from './SocialLinks';
import { auth } from '@/auth';

interface User {
  _id: string;
  name: string;
  image: string;
  username: string;
  error?: string;
}

async function fetchUserData(userId: string): Promise<User> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/info/${userId}`, {
    cache: 'no-store',
  });

  return res.json();
}

export default async function SettingsPage() {

  const session = await auth();
  const userId = session?.user?.id!;

  const userPromise = fetchUserData(userId);

  return (
    <div className="h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl p-4 lg:p-0">
        <Suspense fallback={
          <div className="absolute inset-0 flex justify-center items-center">
            <span className="loading loading-spinner text-secondary"></span>
          </div>
        }>
          <div className="flex flex-col h-full">
            <UserInformation userPromise={userPromise} />
          </div>
        </Suspense>
        <Suspense fallback={
          <div className="absolute inset-0 flex justify-center items-center">
            <span className="loading loading-spinner text-secondary"></span>
          </div>
        }>
          <div className="flex flex-col h-full">
            <SocialLinks userPromise={userPromise} />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
