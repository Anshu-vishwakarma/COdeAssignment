'use client';
import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react'; // Import useSession
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import '../../../app/globals.css';
export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();
  const { data: session, status } = useSession(); // Get session data

  useEffect(() => {
    if (typeof window !== 'undefined' && status === 'authenticated') {
      if (session?.user?.role) {
        if (session.user.role === 'student') {
          router.push('/dashboard/student');
        } else if (session.user.role === 'admin') {
          router.push('/dashboard/admin');
        }
      } else {
        router.push('/dashboard/student');
      }
    }
  }, [status, session, router]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false, // Prevent automatic redirection
    });

    if (response?.error) {
      alert('Login failed');
    } else {
      // After successful login, the session will be updated, triggering the useEffect hook
    }
  };

  const handleGoogleLogin = async () => {
    console.log('Before Google login, session data:', session); // Log session before Google login

    await signIn('google');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full text-slate-700 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            className="w-full text-slate-700 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Sign in with Google
          </button>
        </div>

        <div className="mt-6 text-center"> 
        <p className="text-gray-600">Create a new account??</p>

        <button
            onClick={() => router.push('/auth/signup')}
            className="w-full py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Sign Up
          </button>
        </div>
       
        
      </div>
    </div>
  );
}
