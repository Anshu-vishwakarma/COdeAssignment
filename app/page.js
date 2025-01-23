"use client"

import Link from 'next/link';

import Logout from '@/components/Logout';
import './globals.css';
import { useSession } from 'next-auth/react';


export default function Home() {
    const { data: session, status } = useSession(); // Get session data
  
  return (
  //   <div className="flex flex-col justify-center items-center h-screen space-y-6 bg-gray-100">
  //  {session && <Logout/>}
   
  //     <h1 className="text-4xl font-bold text-gray-800">Welcome to the App</h1>
  //     <div className="space-x-4">
  //       <Link href="/auth/login">
  //         <button className="bg-blue-500 text-white  py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
  //           Login
  //         </button>
  //       </Link>
  //       <Link href="/auth/signup">
  //         <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300">
  //           Sign Up
  //         </button>
  //       </Link>
  //     </div>
  //   </div>
  <>
  
  </>
  );
}
