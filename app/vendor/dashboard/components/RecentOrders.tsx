'use client';

import { motion } from 'framer-motion';
import { RecentOrder } from '../types/dashboard';

interface RecentOrdersProps {
  orders: RecentOrder[];
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'text-yellow-400';
      case 'Shipped':
        return 'text-blue-400';
      case 'Delivered':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <motion.section
      className="bg-gradient-to-br from-[#1a1f3a] to-[#111529] p-6 rounded-xl shadow-lg border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-xl font-bold mb-4 text-yellow-400">Recent Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="flex items-center justify-between p-4 bg-gradient-to-r from-[#111529] to-[#1a1f3a] rounded-lg border border-gray-700"
          >
            <div>
              <p className="font-medium">Order #{order.id}</p>
              <p className="text-sm text-gray-400">{order.customer}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-green-400">${order.amount}</p>
              <p className={`text-sm ${getStatusColor(order.status)}`}>
                {order.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}