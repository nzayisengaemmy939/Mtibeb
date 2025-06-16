"use client";

import { motion } from "framer-motion";
import { Product } from "../types/dashboard";
import { JSX } from "react";

interface TopProductsProps {
  products: Product[];
}

interface TopProductsComponent {
  (props: TopProductsProps): JSX.Element;
}

const TopProducts: TopProductsComponent = ({ products }) => {
  return (
    <motion.section
      className="bg-gradient-to-br from-[#1a1f3a] to-[#111529] p-6 rounded-xl shadow-lg border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <h2 className="text-xl font-bold mb-4 text-yellow-400">Top Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.slice(0, 3).map((product) => (
          <div
            key={product.id}
            className="bg-gradient-to-br from-[#111529] to-[#1a1f3a] p-4 rounded-xl border border-gray-700 hover:border-yellow-500 transition-all duration-300"
          >
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src={product.ImageURL}
                alt={product.Name}
                className="object-cover rounded-lg w-full h-40"
              />
            </div>
            <h3 className="font-medium text-white">{product.Name}</h3>
            <div className="flex justify-between items-center mt-2">
              <p className="text-yellow-400 font-semibold">{product.Price} Frw</p>
              {/* <p className="text-sm text-gray-400">Stock: {product.stock}</p> */}
            </div>
            <div className="flex justify-between items-center mt-2">
              {/* <p className="text-sm text-gray-400">
                Rating: {product.rating} ⭐
              </p>
              <p className="text-sm text-green-400">Sales: {product.sales}</p> */}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default TopProducts;
