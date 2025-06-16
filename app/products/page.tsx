"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { allProducts, Product } from "./api";


// Remove local Product type definition, use the imported one

const categories = ["Kitchen",
	"Living Room",
	"Bedroom",
	"Office",
	"Outdoor",];
const materials = ["Eucalyptus",
	"Grevillea",
	"Pine",
	"Podocarpus",
	"Cedrela",
	"Entandrophragma",
	"Libuyu",];

const FloatingParticles = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-orange-400 rounded-full opacity-20 animate-pulse"
          style={{
            // left: `${Math.random() * 100}%`,
            // top: `${Math.random() * 100}%`,
            // animationDelay: `${Math.random() * 3}s`,
            // animationDuration: `${3 + Math.random() * 4}s`,
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

const ProductCard = ({
  product,
  index,
  onClick,
}: {
  product: Product;
  index: number;
  onClick: (product: Product) => void;
}) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="bg-white rounded-lg shadow-md overflow-hidden w-[350px] cursor-pointer hover:scale-105 transition-transform duration-200"
    >
      <img
        src={product.ImageURL}
        alt={product.Name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{product.Name}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-yellow-600">
            {product.Price} Frw
          </span>
          {product.Price && (
            <span className="text-sm text-gray-400 line-through">
              ${product.Price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};


export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setCategory] = useState("");
  const [selectedMaterial, setMaterial] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await allProducts();
        setProducts(data);
         setLoading(false); 
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

 const filteredProducts = products.filter((product) => {
  const matchesSearch = product.Name?.toLowerCase().includes(search.toLowerCase());

  const matchesCategory = selectedCategory
    ? product.category?.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
    : true;

  const matchesMaterial = selectedMaterial
    ? product.Material?.trim().toLowerCase() === selectedMaterial.trim().toLowerCase()
    : true;

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
                <option key={cat} value={cat} className="bg-slate-800">
                  {cat}
                </option>
              ))}
            </select>

            <select
              className="px-6 py-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 hover:bg-slate-800/80 cursor-pointer"
              value={selectedMaterial}
              onChange={(e) => setMaterial(e.target.value)}
            >
              <option value="">All Materials</option>
              {materials.map((mat) => (
                <option key={mat} value={mat} className="bg-slate-800">
                  {mat}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2 text-orange-400">
              <Filter className="w-5 h-5" />
              <span className="text-sm font-semibold">
                {filteredProducts.length} piece
                {filteredProducts.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {loading ? (
              [...Array(6)].map((_, i) => <LoadingCard key={i} />)
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} onClick={function (product: Product): void {
                  throw new Error("Function not implemented.");
                } } />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 inline-block">
                  <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-400 mb-2">
                    No products found
                  </h3>
                  <p className="text-slate-500">
                    Try adjusting your search or filters
                  </p>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </>
  );
}
