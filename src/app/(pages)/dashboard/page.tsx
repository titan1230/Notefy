import { auth } from '@/auth';
import { Metadata } from 'next';

import DashboardNavbar from '@/components/DashboardNavbar';

export const generateMetadata = async () => {

  const session = await auth();
  
  return {
    title: `${session?.user.username} | Dashboard`,
    description: 'Welcome to your dashboard, where you can manage your notes, settings, and more.',
  };
}

export default async function Dashboard() {
  const session = await auth();


  const user = {
    name: session?.user?.name || 'User',
    profilePicture: session?.user?.image || '/default-profile.png',
    id: session?.user?.id || 'user',
    username: session?.user?.username || 'user',
  };

  return (
    <div className="min-h-screen bg-base-200">
      <DashboardNavbar user={user} />

      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg">
          Welcome to your dashboard, {user.username}. Here you can manage your notes, settings, and more.
        </p>

        {/* Add dashboard content here */}
      </main>
    </div>
  );
}
