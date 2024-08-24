import { Suspense, use } from 'react';

import UserProfile from '@/components/ProfileComponent';

interface User {
  _id: string;
  name: string;
  image: string;
  error?: string;
}

async function fetchUserData(userId: string): Promise<User> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/info/${userId}`, {
    cache: 'no-store',
  });

  return res.json();
}

interface ProfilePageProps {
  params: {
    userID: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const userId = params.userID;

  const userPromise = fetchUserData(userId);

  return (
    <Suspense fallback={<div className="text-center text-gray-500">Loading user profile...</div>}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}