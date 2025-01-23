"use client";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";

export default function Header({ isSidebarOpen, setIsSidebarOpen }) {
  const { data: session, status } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define menu items dynamically
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Students", href: "/students" },
    { name: "Code Assignment", href: "/code-assignment" },
    { name: "Leaderboard", href: "/leaderboard" },
  ];

  return (
    <nav className={`bg-gray-800 text-white fixed w-full top-0 left-0 z-50 shadow-md transition-all ${isSidebarOpen ? 'md:left-[256px]' : 'left-0'}`}>
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold hover:text-gray-300">
          Cybrom Technology
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} className="hover:text-gray-300">
              {item.name}
            </Link>
          ))}
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-3 relative">
          {status === "loading" ? (
            <p>Loading...</p>
          ) : session ? (
            <div className="relative">
              <button
                className="flex text-sm bg-gray-700 rounded-full focus:ring-4 focus:ring-gray-500"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <img 
                  src={session.user.image || null} 
                  alt="User Avatar" 
                  className="w-10 h-10 rounded-full" 
                />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-40">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-semibold">{session.user.name}</p>
                    <p className="text-sm text-gray-600 truncate">{session.user.email}</p>
                  </div>
                  <ul>
                    <li className="p-2 hover:bg-gray-100"><Link href="/profile">Profile</Link></li>
                    <li className="p-2 hover:bg-gray-100"><Link href="/settings">Settings</Link></li>
                    <li className="p-2 hover:bg-gray-100">
                      <button onClick={() => signOut({ callbackUrl: '/auth/login' })} className="w-full text-left">Sign Out</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/login" className="hover:text-gray-300">Sign In</Link>
          )}
        </div>

        {/* Burger Menu for Small Screens */}
        <button 
          className="md:hidden p-2 rounded-md focus:ring-2 focus:ring-gray-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} className="block py-2 px-4 hover:bg-gray-600">
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
