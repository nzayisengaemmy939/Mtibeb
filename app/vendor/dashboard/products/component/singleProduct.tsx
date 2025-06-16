// components/ProductModal.tsx
"use client";

import React from "react";
import { X } from "lucide-react";
export interface Product {
  id: string;
  Name: string;
  Price: number;
  stock: number;
  Material: number;
  sales: number;
  Description:string,
  category: string;
  
ImageURL
?: string;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 max-w-xl w-full relative text-black shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <X className="w-6 h-6" />
        </button>

        <img
          src={product.ImageURL}
          alt={product.Name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{product.Name}</h2>
        <p className="text-gray-700 mb-4">{product.Description}</p>

        <div className="flex justify-between items-center text-lg">
          <span className="font-bold text-yellow-600">
            {product.Price} Frw
          </span>
          <span className="text-sm text-gray-500">
            Material: {product.Material}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
