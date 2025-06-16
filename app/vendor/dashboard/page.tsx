"use client";

import { useEffect, useState } from "react";
import { Package, ShoppingCart, BarChart3, Settings, Home } from "lucide-react";

// Import types
import { VendorStats, SidebarItem } from "./types/dashboard";

// Import components
import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import StatsCards from "./components/StatsCards";
import RecentOrders from "./components/RecentOrders";
import ActionButtons from "./components/ActionButtons";
import Top from "./components/TopProducts";
import { fetchProducts, Product } from "./products/api";

export default function VendorDashboard() {
  // Sample data - replace with actual API calls
  const [stats] = useState<VendorStats>({
    totalProducts: 25,
    totalSales: 15420,
    averageRating: 4.7,
    pendingOrders: 8,
  });

  const [products, setProducts] = useState<Product[]>([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  const sidebarItems: SidebarItem[] = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: Home,
      href: "/vendor/dashboard",
    },
    {
      id: "products",
      name: "Products",
      icon: Package,
      href: "/vendor/dashboard/products",
    },
    {
      id: "orders",
      name: "Orders",
      icon: ShoppingCart,
      href: "/vendor/orders",
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: BarChart3,
      href: "/vendor/analytics",
    },
    {
      id: "settings",
      name: "Settings",
      icon: Settings,
      href: "/vendor/settings",
    },
  ];

  const recentOrders = [
    {
      id: "order1",
      customer: "John Doe",
      date: "2024-06-01",
      amount: 120.5,
      status: "Pending",
    },
    {
      id: "order2",
      customer: "Jane Smith",
      date: "2024-06-02",
      amount: 89.99,
      status: "Completed",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#111529] via-[#1a1f3a] to-[#111529] text-white min-h-screen flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarItems={sidebarItems}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <DashboardHeader setSidebarOpen={setSidebarOpen} />

        {/* Dashboard Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <StatsCards stats={stats} />
            <RecentOrders orders={recentOrders} />
            <ActionButtons />
            <Top
              products={products.map((p) => ({
                ...p,
                
ImageURL
: p.
ImageURL
 ?? "",
              }))}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
