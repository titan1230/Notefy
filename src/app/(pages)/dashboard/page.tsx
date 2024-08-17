import { auth } from '@/auth';
import DashboardNavbar from '@/components/DashboardNavbar';

export default async function Dashboard() {
  const session = await auth();

  const user = {
    name: session!.user!.name || 'User',
    profilePicture: session!.user!.image || '/default-profile.png',
  };

  return (
    <div className="min-h-screen bg-base-200">
      <DashboardNavbar user={user} />

      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg">
          Welcome to your dashboard, {user.name}. Here you can manage your notes, settings, and more.
        </p>

        {/* Add dashboard content here */}
      </main>
    </div>
  );
}
