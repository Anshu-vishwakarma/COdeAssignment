'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';  // Import axios

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData); // Log form data
  
    try {
      const response = await axios.post('/api/signup', formData, {
        headers: {
          'Content-Type': 'application/json', // Ensure the header is set correctly
        },
      });
      console.log('API Response:', response.data);
  
      router.push('/auth/login'); // Redirect to login page after successful signup
    } catch (error) {
      console.error('Error during signup:', error);
      alert(`Error: ${error.response?.data?.message || 'Something went wrong!'}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            type="text"
            placeholder="Full Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          {/* Email Input */}
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            type="email"
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          {/* Password Input */}
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            type="password"
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        {/* Login Redirect */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="w-full py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
