"use client";

import { motion } from "framer-motion";
import { Package, DollarSign, Star, TrendingUp } from "lucide-react";
import { VendorStats } from "../types/dashboard";

interface StatsCardsProps {
  stats: VendorStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      iconBg: "bg-green-500/20",
      iconColor: "text-green-500",
    },
    {
      title: "Total Sales",
      value: `$${stats.totalSales}`,
      icon: DollarSign,
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-500",
    },
    {
      title: "Average Rating",
      value: `${stats.averageRating.toFixed(1)} ⭐`,
      icon: Star,
      iconBg: "bg-green-500/20",
      iconColor: "text-green-500",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: TrendingUp,
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          className="bg-gradient-to-br from-[#1a1f3a] to-[#111529] p-6 rounded-xl shadow-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className={`${stat.iconBg} p-3 rounded-full shadow-lg`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
