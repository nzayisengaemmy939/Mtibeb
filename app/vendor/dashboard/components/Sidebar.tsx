'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation'; // ✅ Import router
import { SidebarItem } from '../types/dashboard';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  sidebarItems: SidebarItem[];
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activeSection,
  setActiveSection,
  sidebarItems
}: SidebarProps) {
  const router = useRouter(); 

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#111529] via-[#1a1f3a] to-[#111529] transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-yellow-400">VendorHub</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="mt-8 px-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                router.push(item.href); // ✅ Navigate to the href (like '/products')
              }}
              className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-yellow-500 to-green-500 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}
