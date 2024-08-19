import { auth } from '@/auth';
import Dashboard from './DashComponent';  // Ensure this import matches the file path
import { getUser } from '@/actions/GetUser';

export const generateMetadata = async () => {
  const session = await auth();
  return {
    title: `${session?.user.username} | Dashboard`,
    description: 'Welcome to your dashboard, where you can manage your notes, settings, and more.',
  };
}

interface User {
  name: string;
  image: string;
  id: string;
  username: string;
}

const DashPage = async () => {
  const user = await getUser() as User;
  return <Dashboard user={user!} />;
};

export default DashPage;