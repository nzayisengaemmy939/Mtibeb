"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Package,
  TrendingUp,
  BarChart3,
  MessageSquare,
  Plus,
  RefreshCw,
  Upload,
  Tag,
  Palette,
  X,
} from "lucide-react";
const material = [
  { value: "Eucalyptus", label: "Eucalyptus" },
  { value: "Grevillea", label: "Grevillea" },
  { value: "Pine", label: "Pine" },
  { value: "Podocarpus", label: "Podocarpus" },
  { value: "Cedrela", label: "Cedrela" },
  { value: "Entandrophragma", label: "Entandrophragma" },

  { value: "Libuyu", label: "Libuyu" },
];

// Product Form Component
function ProductForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<{
    image: File | null;
    name: string;
    category: string;
    material: string;
    price: string;
  }>({
    image: null,
    name: "",
    category: "",
    material: "",
    price: "",
  });

  type ProductFormErrors = {
    image?: string;
    name?: string;
    category?: string;
    material?: string;
    price?: string;
  };
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: "Kitchen", label: "Kitchen" },
    { value: "Living Room", label: "Living Room" },
    { value: "Bedroom", label: "Bedroom" },
    { value: "Office", label: "Office" },
    { value: "Outdoor", label: "Outdoor" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget & { files: FileList };
  }

  const handleFileChange = (e: FileChangeEvent) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    if (errors.image) {
      setErrors((prev) => ({
        ...prev,
        image: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: ProductFormErrors = {};

    if (!formData.image) newErrors.image = "Product image is required";
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.material.trim()) newErrors.material = "Material is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    else if (isNaN(Number(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a valid positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const form = new FormData();
    form.append("image", formData.image as File);
    form.append("name", formData.name);
    form.append("category", formData.category);
    form.append("material", formData.material);
    form.append("price", formData.price);

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/vendor/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );
      console.log(response, "response body");
      if (!response.ok) {
        toast.error("Failed to upload product");
        return;
      }

      let result = null;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
        console.log("Product uploaded successfully:", result);
      } else {
        console.log("Product uploaded successfully with no JSON response.");
      }

      toast.success("Product added successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("There was an error uploading the product.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#1a1f3a] via-[#1e2447] to-[#111529] p-8 rounded-2xl shadow-2xl border border-gray-600/30"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-xl mr-4">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Add New Product</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-white mb-2">
              <span className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Product Image</span>
                <span className="text-red-400 text-sm">* required</span>
              </span>
              <span className="text-gray-400 text-sm">(jpg, png, etc.)</span>
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-600 file:text-white hover:file:bg-yellow-700 transition-colors"
              />
              {formData.image && (
                <p className="text-green-400 text-sm mt-1">
                  Selected: {formData.image.name}
                </p>
              )}
            </div>
            {errors.image && (
              <p className="text-red-400 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-white mb-2">
              <span className="flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                <span>Name of the product</span>
                <span className="text-red-400 text-sm">* required</span>
              </span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-white mb-2">
              <span className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Category of the product</span>
                <span className="text-red-400 text-sm">* required</span>
              </span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:border-yellow-500 focus:outline-none transition-colors"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option
                  key={cat.value}
                  value={cat.value}
                  className="bg-gray-800"
                >
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-400 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Material */}
          <div>
            <label className="block text-white mb-2">
              <span className="flex items-center space-x-2">
                <Palette className="w-4 h-4" />
                <span>Material used</span>
                <span className="text-red-400 text-sm">* required</span>
              </span>
            </label>
            <select
              name="material"
              value={formData.material}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:border-yellow-500 focus:outline-none transition-colors"
            >
              <option value="">Select a category</option>
              {material.map((mat) => (
                <option
                  key={mat.value}
                  value={mat.value}
                  className="bg-gray-800"
                >
                  {mat.label}
                </option>
              ))}
            </select>

            {errors.material && (
              <p className="text-red-400 text-sm mt-1">{errors.material}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-white mb-2">
              <span className="flex items-center space-x-2">
                <span>Price of the product</span>
                <span className="text-red-400 text-sm">* required</span>
              </span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              step="0.01"
              min="0"
              className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
            />
            {errors.price && (
              <p className="text-red-400 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4 pt-4">
           <motion.button
  onClick={handleSubmit}
  disabled={loading}
  whileTap={{ scale: loading ? 1 : 0.95 }}
  className={`flex-1 py-3 rounded-xl font-semibold transition-colors shadow-md
    ${loading
      ? 'bg-gray-400 text-white cursor-not-allowed'
      : 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-400'}
  `}
>
  {loading ? 'Adding...' : 'Add Product'}
</motion.button>

            <motion.button
              onClick={onClose}
              className="px-6 py-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ActionButtons() {
  const [showProductForm, setShowProductForm] = useState(false);
  const buttonVariants = {
    hover: {
      scale: 1.02,
      y: -2,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  return (
    <>
      <motion.section
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {/* Product Management Section */}
        <motion.div
          className="bg-gradient-to-br from-[#1a1f3a] via-[#1e2447] to-[#111529] p-8 rounded-2xl shadow-2xl border border-gray-600/30 backdrop-blur-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-xl mr-4">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Product Management
            </h2>
          </div>

          <div className="space-y-4">
            <motion.button
              className="group w-full bg-gradient-to-r from-[#1a1f3a] to-[#111529] text-white py-4 px-6 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-xl border border-yellow-500/20 hover:border-yellow-400/50 relative overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setShowProductForm(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center space-x-3 relative z-10">
                <Plus className="w-5 h-5" />
                <span className="font-semibold">Add New Product</span>
              </div>
            </motion.button>

            <motion.button
              className="group w-full bg-gradient-to-r from-[#1a1f3a] to-[#111529] text-white py-4 px-6 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-xl border border-yellow-500/20 hover:border-yellow-400/50 relative overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center space-x-3 relative z-10">
                <RefreshCw className="w-5 h-5" />
                <span className="font-semibold">Update Stock</span>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Analytics Section */}
        <motion.div
          className="bg-gradient-to-br from-[#1a1f3a] via-[#1e2447] to-[#111529] p-8 rounded-2xl shadow-2xl border border-gray-600/30 backdrop-blur-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl mr-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Analytics</h2>
          </div>

          <div className="space-y-4">
            <motion.button
              className="group w-full bg-gradient-to-r from-[#1a1f3a] to-[#111529] text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-xl border border-green-500/20 hover:border-green-400/50 relative overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-green-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center space-x-3 relative z-10">
                <BarChart3 className="w-5 h-5" />
                <span className="font-semibold">View Sales Report</span>
              </div>
            </motion.button>

            <motion.button
              className="group w-full bg-gradient-to-r from-[#1a1f3a] to-[#111529] text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-xl border border-green-500/20 hover:border-green-400/50 relative overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-green-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center space-x-3 relative z-10">
                <MessageSquare className="w-5 h-5" />
                <span className="font-semibold">Customer Reviews</span>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </motion.section>

      {/* Product Form Modal */}
      <AnimatePresence>
        {showProductForm && (
          <ProductForm onClose={() => setShowProductForm(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
