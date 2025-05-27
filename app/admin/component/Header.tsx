import React, { useState } from 'react'
import {
  Users,
  Package,
  Settings,
  UserCheck,
  Activity,
  Bell,
} from "lucide-react";



const Header = () => {
     const sidebarItems = [
        { id: "stats", label: "Statistics", icon: Activity },
        { id: "vendors", label: "Vendors", icon: Users },
        { id: "products", label: "Products", icon: Package },
        { id: "clients", label: "Clients", icon: UserCheck },
        { id: "settings", label: "Settings", icon: Settings },
      ];

      const [activeSection] = useState("stats");
  return (
    <header className="bg-gradient-to-r from-[#111529] to-[#1a1f3a] shadow-lg border-b border-yellow-500/20">
            <div className="px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {sidebarItems.find((item) => item.id === activeSection)
                      ?.label || "Dashboard"}
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Welcome back! Here's what's happening today.
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="relative p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
                  </button>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-900">
                        AD
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Admin User
                      </p>
                      <p className="text-xs text-gray-400">Administrator</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
  )
}

export default Header
