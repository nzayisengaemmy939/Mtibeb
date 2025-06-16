'use client';

import { Menu } from 'lucide-react';

interface DashboardHeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function DashboardHeader({ setSidebarOpen }: DashboardHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-[#111529] to-[#1a1f3a] shadow-lg">
      <div className="px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
        <div className="w-8 lg:hidden"></div>
      </div>
    </header>
  );
}