import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Logout from '../../../components/Logout';

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'student') {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-lg shadow-lg w-96">
       
          <p className="text-gray-700">Name: {session?.user?.name}</p>
          <p className="text-gray-700">Email: {session?.user?.email}</p>
     
          <Logout />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-green-600 mb-4">Welcome, Student!</h1>
        <div className="space-y-2">
          <p className="text-gray-700">Name: {session.user.name}</p>
          <p className="text-gray-700">Email: {session.user.email}</p>
          <p className="text-gray-700">Role: {session.user.role}</p>
        </div>
        <div className="mt-4">
          <Logout />
        </div>
      </div>
    </div>
  );
}
