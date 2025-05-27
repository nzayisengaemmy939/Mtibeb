'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Sparkles, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
;

// Define product type
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  material: string;
  imageUrl: string;
  vendor: string;
}

const categories = ['Kitchen', 'Living Room', 'Bedroom', 'Office', 'Outdoor'];
const materials = ['Eucalyptus', 'Mahogany', 'Pine', 'Podocarpus', 'Cedrela'];

// Sample products data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Handcrafted Mahogany Dining Table',
    price: 1299,
    category: 'Kitchen',
    material: 'Mahogany',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    vendor: 'Kwame Woodworks'
  },
  {
    id: '2',
    name: 'Elegant Eucalyptus Bookshelf',
    price: 899,
    category: 'Living Room',
    material: 'Eucalyptus',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    vendor: 'Asha Crafts'
  },
  {
    id: '3',
    name: 'Rustic Pine Coffee Table',
    price: 649,
    category: 'Living Room',
    material: 'Pine',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    vendor: 'Jabari Artisans'
  },
  {
    id: '4',
    name: 'Cedrela Office Desk',
    price: 1099,
    category: 'Office',
    material: 'Cedrela',
    imageUrl: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop',
    vendor: 'Amara Designs'
  },
  {
    id: '5',
    name: 'Podocarpus Garden Bench',
    price: 749,
    category: 'Outdoor',
    material: 'Podocarpus',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    vendor: 'Jengo Outdoor'
  },
  {
    id: '6',
    name: 'Mahogany Bedroom Dresser',
    price: 1199,
    category: 'Bedroom',
    material: 'Mahogany',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    vendor: 'Kesi Furniture'
  }
];

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-orange-400 rounded-full opacity-20 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};

// Loading shimmer component
const LoadingCard = () => (
  <div className="bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 animate-pulse rounded-3xl p-6 backdrop-blur-xl border border-white/10">
    <div className="bg-slate-700/50 rounded-2xl h-64 mb-4"></div>
    <div className="bg-slate-700/50 rounded-lg h-6 mb-2"></div>
    <div className="bg-slate-700/50 rounded-lg h-4 w-2/3 mb-4"></div>
    <div className="flex justify-between items-center">
      <div className="bg-slate-700/50 rounded-lg h-8 w-20"></div>
      <div className="bg-slate-700/50 rounded-lg h-6 w-24"></div>
    </div>
  </div>
);

// Product card component
const ProductCard= ({ product, index }: { product: Product; index: number }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-[350px]">
      {/* Image at Top, Full Width */}
      <img
        src="/EucalyptusIII.png"
        alt="Premium Eucalyptus Furniture"
        className="w-full h-56 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        {/* Badge */}
       

        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Premium Eucalyptus Collection
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          Handcrafted with sustainable Eucalyptus wood, featuring natural grain
          patterns and exceptional durability.
        </p>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-yellow-600">$299</span>
          <span className="text-sm text-gray-400 line-through">$399</span>
        </div>
      </div>
    </div>
  );
};
export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setCategory] = useState('');
  const [selectedMaterial, setMaterial] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate API loading
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProducts(sampleProducts);
      setLoading(false);
    };
    loadProducts();
  }, []);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesMaterial = selectedMaterial ? product.material === selectedMaterial : true;
    return matchesSearch && matchesCategory && matchesMaterial;
  });

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/20 text-white overflow-hidden">
      <FloatingParticles />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-3xl"></div>
          <div className="relative bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 mx-4">
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent animate-pulse">
              Explore Unique Wooden Art
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-light tracking-wide">
              Handcrafted pieces from skilled African vendors
            </p>
            <div className="absolute top-4 right-4">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 justify-center items-center">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-orange-400 transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search magical pieces..."
              className="pl-12 pr-6 py-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 w-full lg:w-80 hover:bg-slate-800/80"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="px-6 py-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 hover:bg-slate-800/80 cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
            ))}
          </select>

          <select
            className="px-6 py-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 hover:bg-slate-800/80 cursor-pointer"
            value={selectedMaterial}
            onChange={(e) => setMaterial(e.target.value)}
          >
            <option value="">All Materials</option>
            {materials.map((mat) => (
              <option key={mat} value={mat} className="bg-slate-800">{mat}</option>
            ))}
          </select>

          <div className="flex items-center gap-2 text-orange-400">
            <Filter className="w-5 h-5" />
            <span className="text-sm font-semibold">
              {filteredProducts.length} piece{filteredProducts.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {loading ? (
            [...Array(6)].map((_, i) => <LoadingCard key={i} />)
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 inline-block">
                <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-400 mb-2">No products found</h3>
                <p className="text-slate-500">Try adjusting your search or filters</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
}