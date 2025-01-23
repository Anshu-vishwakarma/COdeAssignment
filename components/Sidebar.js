"use client";
import { useState } from "react";
import Link from "next/link";
import { FaHome, FaUsers, FaCode, FaTrophy, FaBars } from "react-icons/fa";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSubmenuToggle = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div className="flex fixed">
      <div className={`bg-gray-800 text-white h-screen p-5 transition-all ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
        <button onClick={toggleSidebar} className="text-white text-2xl mb-5">
          <FaBars />
        </button>

        <ul className="space-y-4">
          <li>
            <button
              onClick={() => handleSubmenuToggle('home')}
              className="flex items-center space-x-3 hover:text-gray-300 w-full"
            >
              <FaHome />
              {isSidebarOpen && <span>Home</span>}
            </button>
            {openSubmenu === 'home' && (
              <ul className="ml-8 space-y-2 text-gray-400">
                <li><Link href="/home/add">Add</Link></li>
                <li><Link href="/home/delete">Delete</Link></li>
                <li><Link href="/home/update">Update</Link></li>
                <li><Link href="/home/show-all">Show All</Link></li>
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={() => handleSubmenuToggle('students')}
              className="flex items-center space-x-3 hover:text-gray-300 w-full"
            >
              <FaUsers />
              {isSidebarOpen && <span>Students</span>}
            </button>
            {openSubmenu === 'students' && (
              <ul className="ml-8 space-y-2 text-gray-400">
                <li><Link href="/students/add">Add</Link></li>
                <li><Link href="/students/delete">Delete</Link></li>
                <li><Link href="/students/update">Update</Link></li>
                <li><Link href="/students/show-all">Show All</Link></li>
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={() => handleSubmenuToggle('code-assignment')}
              className="flex items-center space-x-3 hover:text-gray-300 w-full"
            >
              <FaCode />
              {isSidebarOpen && <span>Code Assignment</span>}
            </button>
            {openSubmenu === 'code-assignment' && (
              <ul className="ml-8 space-y-2 text-gray-400">
                <li><Link href="/dashboard/code/CompilerAssignment">Add</Link></li>
                <li><Link href="/code-assignment/delete">Delete</Link></li>
                <li><Link href="/code-assignment/update">Update</Link></li>
                <li><Link href="/code-assignment/show-all">Show All</Link></li>
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={() => handleSubmenuToggle('leaderboard')}
              className="flex items-center space-x-3 hover:text-gray-300 w-full"
            >
              <FaTrophy />
              {isSidebarOpen && <span>Leaderboard</span>}
            </button>
            {openSubmenu === 'leaderboard' && (
              <ul className="ml-8 space-y-2 text-gray-400">
                <li><Link href="/leaderboard/add">Add</Link></li>
                <li><Link href="/leaderboard/delete">Delete</Link></li>
                <li><Link href="/leaderboard/update">Update</Link></li>
                <li><Link href="/leaderboard/show-all">Show All</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
