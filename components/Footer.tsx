"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Heart, Leaf, TreePine, Instagram, Facebook, Twitter, ArrowUp, Sparkles } from 'lucide-react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
 const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const treeIcons = [TreePine, Leaf];
  const TreeIcon = treeIcons[Math.floor(Math.random() * treeIcons.length)];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-800 text-white mt-16">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <TreePine className="w-4 h-4 text-green-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Glowing Top Border */}
      <div className="h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>

      <div className={`relative z-10 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Brand Section - Enhanced */}
            <div 
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setActiveSection('brand')}
              onMouseLeave={() => setActiveSection(null)}
            >
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-white/10 hover:border-orange-400/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <TreeIcon className={`w-8 h-8 text-green-400 transition-all duration-300 ${activeSection === 'brand' ? 'rotate-12 scale-110' : ''}`} />
                    <Sparkles className={`absolute -top-2 -right-2 w-4 h-4 text-yellow-400 ${activeSection === 'brand' ? 'opacity-100 animate-pulse' : 'opacity-0'} transition-opacity duration-300`} />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    Miti Tibeb
                  </h2>
                </div>
                <p className="text-lg text-gray-300 mb-2">Art of Trees</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="px-2 py-1 bg-green-500/20 rounded-full">"Miti" = Trees</span>
                  <Heart className="w-3 h-3 text-red-400" />
                  <span className="px-2 py-1 bg-purple-500/20 rounded-full">"Tibeb" = Art</span>
                </div>
              </div>
            </div>

            {/* Navigation - Interactive */}
            <div 
              className="group"
              onMouseEnter={() => setActiveSection('nav')}
              onMouseLeave={() => setActiveSection(null)}
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 backdrop-blur-sm border border-white/10 hover:border-blue-400/30 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-4 text-blue-300">Navigate</h3>
                <nav className="space-y-3">
                  {['Home', 'Products', 'About', 'Contact'].map((item, index) => (
                    <div 
                      key={item}
                      className="relative group/item cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-200">
                        <div className={`w-2 h-2 rounded-full bg-orange-400 transition-all duration-300 ${activeSection === 'nav' ? 'scale-100' : 'scale-0'}`}></div>
                        <span className="group-hover/item:text-orange-400 group-hover/item:translate-x-1 transition-all duration-200">
                          {item}
                        </span>
                      </div>
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Contact - Interactive Icons */}
            <div 
              className="group"
              onMouseEnter={() => setActiveSection('contact')}
              onMouseLeave={() => setActiveSection(null)}
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-white/10 hover:border-green-400/30 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-4 text-green-300">Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 group/contact cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-all duration-200">
                    <Mail className="w-5 h-5 text-orange-400 group-hover/contact:scale-110 transition-transform duration-200" />
                    <span className="text-sm text-gray-300 group-hover/contact:text-white transition-colors duration-200">
                      support@miti.tibeb.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3 group/contact cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-all duration-200">
                    <Phone className="w-5 h-5 text-orange-400 group-hover/contact:scale-110 transition-transform duration-200" />
                    <span className="text-sm text-gray-300 group-hover/contact:text-white transition-colors duration-200">
                      +251 911 123 456
                    </span>
                  </div>
                  <div className="flex items-center gap-3 group/contact cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-all duration-200">
                    <MapPin className="w-5 h-5 text-orange-400 group-hover/contact:scale-110 transition-transform duration-200" />
                    <span className="text-sm text-gray-300 group-hover/contact:text-white transition-colors duration-200">
                      Addis Ababa, Ethiopia
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media - Floating Icons */}
            <div 
              className="group"
              onMouseEnter={() => setActiveSection('social')}
              onMouseLeave={() => setActiveSection(null)}
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-white/10 hover:border-orange-400/30 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-4 text-orange-300">Follow Us</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { Icon: Facebook, name: 'Facebook', color: 'hover:text-blue-400' },
                    { Icon: Instagram, name: 'Instagram', color: 'hover:text-pink-400' },
                    { Icon: Twitter, name: 'Twitter', color: 'hover:text-sky-400' }
                  ].map(({ Icon, name, color }, index) => (
                    <div 
                      key={name}
                      className={`flex items-center gap-3 cursor-pointer group/social p-2 rounded-lg hover:bg-white/5 transition-all duration-300`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative">
                        <Icon className={`w-5 h-5 text-gray-400 group-hover/social:scale-125 transition-all duration-300 ${color}`} />
                        <div className={`absolute inset-0 bg-current rounded-full opacity-0 group-hover/social:opacity-20 group-hover/social:scale-150 transition-all duration-300`}></div>
                      </div>
                      <span className={`text-sm text-gray-400 group-hover/social:text-white transition-colors duration-200 ${color.replace('hover:', '')}`}>
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Bottom Section */}
          <div className="relative">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <TreePine className="w-4 h-4 text-green-400" />
                <span>&copy; {new Date().getFullYear()} Miti Tibeb. Crafted with</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>for nature.</span>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="hover:text-orange-400 cursor-pointer transition-colors duration-200">Privacy Policy</span>
                <span className="text-gray-700">•</span>
                <span className="hover:text-orange-400 cursor-pointer transition-colors duration-200">Terms of Service</span>
                <span className="text-gray-700">•</span>
                <span className="hover:text-orange-400 cursor-pointer transition-colors duration-200">Cookie Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl z-50 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </button>
    </footer>
  );
}