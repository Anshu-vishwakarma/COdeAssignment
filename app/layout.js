"use client";
import { SessionProvider } from 'next-auth/react'; 
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import './globals.css';
import { useState } from 'react';

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Manage sidebar open/close state

  return (
    <SessionProvider>
      <html lang="en">
        <head />
        <body className="flex">
          {/* Sidebar */}
          <Sidebar setSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
          
          {/* Main Content Area */}
          <div className={`flex-1 flex flex-col pt-16 transition-all ${isSidebarOpen ? 'md:pl-64' : 'pl-0'}`}> {/* Dynamic padding */}
            {/* Header */}
            <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} /> {/* Pass the state to Header */}
            {/* Main content area */}
            <div className="mt-2">{children}</div>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
