"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Search,
  Plus,
  Edit,
  Trash2,
  Star,
  Grid,
  List,
  SortAsc,
  SortDesc,
  Home,
  ShoppingCart,
  BarChart,
  Settings,
} from "lucide-react";

import { ProductForm } from "../components/ActionButtons";
import { editProduct, fetchProducts } from "./api";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("grid");
  const [showProductForm, setShowProductForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeSection, setActiveSection] = useState("stats");
  const [products, setProducts] = useState([]);

  const categories = [
    "All",
    "Kitchen",
    "Living Room",
    "Bedroom",
    "Office",
    "Outdoor",
  ];

  console.log(products, "data from backend");

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.Name.toLowerCase().includes(
        searchTerm.toLowerCase()
      );
      const matchesCategory =
        selectedCategory === "" ||
        selectedCategory === "All" ||
        product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  const handleAddProduct = (productData) => {
    setProducts([...products, { ...productData, id: Date.now().toString() }]);
  };

 const [isLoading, setIsLoading] = useState(false);

const handleEditProduct = async (productData) => {
 console.log(productData,'product id')
  
  setIsLoading(true);
  try {
    const updatedProduct = await editProduct(productData.ID, productData);
    setProducts(
      products.map((p) => (p.id === productData.id ? updatedProduct : p))
    );
    setShowProductForm(false);
    setEditingProduct(null);
  } catch (error) {
    console.error('Error updating product:', error);
    alert('Failed to update product. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product)
    setShowDeleteModal(true)
    
  };

  const ProductCard = ({ product }) => (
    <motion.div
      className="bg-gradient-to-br from-[#1a1f3a] via-[#1e2447] to-[#111529] rounded-2xl shadow-xl border border-gray-600/30 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img
          src={product.ImageURL}
          alt={product.Name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm">{product.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{product.Name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-yellow-400">
            Frw{product.Price}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              product.stock > 10
                ? "bg-green-900/50 text-green-400"
                : product.stock > 0
                ? "bg-yellow-900/50 text-yellow-400"
                : "bg-red-900/50 text-red-400"
            }`}
          >
            {product.stock} in stock
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-6">
          <div>
            Category: <span className="text-white">{product.Category}</span>
          </div>
          <div>
            Material: <span className="text-white">{product.Material}</span>
          </div>
          <div>
            Sales: <span className="text-white">{product.sales}</span>
          </div>
          <div>
            Rating: <span className="text-white">{product.rating}/5</span>
          </div>
        </div>
    

        <div className="flex space-x-2">
          <button
            onClick={() => {
              setEditingProduct(product);
              // setShowProductForm(true);
            }}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => handleDeleteProduct(product)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
 
  const ProductRow = ({ product }) => (
    <motion.tr
      className="border-b border-gray-700 hover:bg-gray-800/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <td className="py-4 px-6">
        <div className="flex items-center space-x-4">
          <img
            src={product.ImageURL}
            alt={product.Name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-white font-semibold">{product.Name}</h3>
            <p className="text-gray-400 text-sm">{product.Category}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6 text-yellow-400 font-semibold">
        {product.Price}Frw
      </td>
      <td className="py-4 px-6">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            product.stock > 10
              ? "bg-green-900/50 text-green-400"
              : product.stock > 0
              ? "bg-yellow-900/50 text-yellow-400"
              : "bg-red-900/50 text-red-400"
          }`}
        >
          {product.stock}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-white">{product.rating}</span>
        </div>
      </td>
      <td className="py-4 px-6 text-white">{product.sales}</td>
      <td className="py-4 px-6">
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setEditingProduct(product);
              setShowProductForm(true);
            }}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => handleDeleteProduct(product)}
            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </td>
    </motion.tr>
  );

  return (
    <div className="flex min-h-screen bg-[#0f111a]">
      {/* Sidebar */}
      <nav className="space-y-2 w-[15%] bg-[#1a1f3a] p-6">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
              activeSection === item.id
                ? "bg-gradient-to-r from-yellow-400 to-green-400 text-gray-900 font-semibold shadow-lg"
                : "text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400"
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
            {activeSection === item.id && (
              <div className="ml-auto w-2 h-2 bg-gray-900 rounded-full"></div>
            )}
          </button>
        ))}
      </nav>
           {editingProduct && (
  <EditProduct
    product={editingProduct}
    onClose={() => setEditingProduct(null)}
    onSave={handleEditProduct}
    isLoading={isLoading}
  />
)}

{showDeleteModal && (
  <DeleteProduct
    onClose={()=>setShowDeleteModal(false)}
    onConfirm={handleDeleteProduct}
    product={selectedProduct}
  />
)}

      {/* Main Content */}
      <div className="w-[85%] p-6 overflow-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-xl">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Products</h1>
              <p className="text-gray-400">Manage your product inventory</p>
            </div>
          </div>

          <button
            onClick={() => {
              setEditingProduct(null);
              setShowProductForm(true);
            }}
            className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          className="bg-gradient-to-br from-[#1a1f3a] via-[#1e2447] to-[#111529] p-6 rounded-2xl shadow-xl border border-gray-600/30 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category === "All" ? "" : category}
                >
                  {category}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="stock">Stock</option>
              <option value="rating">Rating</option>
              <option value="sales">Sales</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white hover:bg-gray-700/50 transition-colors"
            >
              {sortOrder === "asc" ? (
                <SortAsc className="w-5 h-5" />
              ) : (
                <SortDesc className="w-5 h-5" />
              )}
            </button>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-600 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-3 ${
                  viewMode === "grid"
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-800/50 text-gray-400"
                } transition-colors`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-3 ${
                  viewMode === "list"
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-800/50 text-gray-400"
                } transition-colors`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Products Display */}
        {viewMode === "grid" ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="bg-gradient-to-br from-[#1a1f3a] via-[#1e2447] to-[#111529] rounded-2xl shadow-xl border border-gray-600/30 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <table className="w-full">
              <thead className="bg-gray-800/50 border-b border-gray-700">
                <tr>
                  <th className="py-4 px-6 text-left text-white font-semibold">
                    Product
                  </th>
                  <th className="py-4 px-6 text-left text-white font-semibold">
                    Price
                  </th>
                  <th className="py-4 px-6 text-left text-white font-semibold">
                    Stock
                  </th>
                  <th className="py-4 px-6 text-left text-white font-semibold">
                    Rating
                  </th>
                  <th className="py-4 px-6 text-left text-white font-semibold">
                    Sales
                  </th>
                  <th className="py-4 px-6 text-left text-white font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-gray-400 mb-2">No products found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}

        {/* Product Form Modal */}
        <AnimatePresence>
          {showProductForm && (
            <ProductForm
              product={editingProduct}
              onClose={() => {
                setShowProductForm(false);
                setEditingProduct(null);
              }}
              onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const sidebarItems = [
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
    icon: BarChart,
    href: "/vendor/analytics",
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    href: "/vendor/settings",
  },
];
