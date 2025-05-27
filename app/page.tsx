"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Imviatation from "@/components/ui/Imviatation";

type ParallaxProps = {
  children: React.ReactNode;
  offset?: number;
  delay?: number;
  className?: string;
};

export type Ripple = {
  x: number;
  y: number;
  id: number;
};

type ButtonVariant = "primary" | "secondary" | "glass";

export interface ButtonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
   disabled?: boolean; 
}

const FloatingOrb = ({ delay = 0, size = "w-4 h-4" }) => (
  <div
    className={`absolute ${size} bg-gradient-to-r from-orange-400/30 to-blue-400/30 rounded-full animate-pulse blur-sm`}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
    }}
  />
);

export const GlassmorphismCard = ({
  children,
  delay = 0,
  className,
}: ParallaxProps) => (
  <div
    className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-[1.02] hover:bg-white/20 ${className}`}
    style={{
      animationDelay: `${delay}s`,
    }}
  >
    {children}
  </div>
);

export const InteractiveButton = ({
  children,
  onClick,
  variant = "primary",
}: ButtonProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const newRipple = {
    x,
    y,
    id: Date.now(),
  };

  setRipples((prev) => [...prev, newRipple]);
  setTimeout(() => {
    setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
  }, 600);

 
  if (onClick) onClick();
};


  const baseClasses =
    "relative overflow-hidden px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95";
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#d15229] to-[#d95612] text-white shadow-lg hover:shadow-orange-500/50",
    secondary:
      "bg-gradient-to-r from-[#92aed3] to-[#A6CCFF] text-gray-600 shadow-lg hover:shadow-blue-500/50",
    glass:
      "backdrop-blur-xl bg-white/20 text-white border border-white/30 hover:bg-white/30",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={handleClick}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export const ParallaxSection = ({
  children,
 
  className,
}: ParallaxProps) => {
  const [, setScrollY] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

const ProductCard3D = () => {
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

const HomePage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const progress =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      setScrollProgress(progress);
    };

    const handleMouseMove = (e: { clientX: any; clientY: any }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <Navbar></Navbar>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/20 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#d15229] to-[#A6CCFF] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Custom Cursor */}
      <div
        className="fixed w-6 h-6 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${scrollProgress > 0 ? 1.5 : 1})`,
        }}
      />

      <main className="bg-[#eeeeee] overflow-hidden">
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(30)].map((_, i) => (
            <FloatingOrb
              key={i}
              delay={i * 0.2}
              size={i % 3 === 0 ? "w-8 h-8" : "w-4 h-4"}
            />
          ))}
        </div>

        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#d15229] via-[#c34922] to-[#d95612]" />

          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-transparent rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-transparent rounded-full blur-2xl animate-ping"
              style={{ animationDelay: "2s" }}
            />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
              {/* Left Content */}
              <div className="space-y-12 text-center lg:text-left">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full text-white/90 text-sm font-medium mb-8">
                    ✨ Handcrafted Excellence Since 2023
                  </div>

                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight">
                    <span className="block text-white mb-2">Embrace the</span>
                    <span className="block bg-gradient-to-r from-yellow-300 via-orange-200 to-white bg-clip-text text-transparent mb-2">
                      Art of Nature
                    </span>
                    <span className="block text-white/90 text-3xl md:text-4xl lg:text-5xl font-medium">
                      with{" "}
                      <span className="text-orange-300 font-black">
                        Miti Tibeb
                      </span>
                    </span>
                  </h1>
                </div>

                <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
                  Discover handcrafted wooden masterpieces rooted in African
                  wisdom and sustainable design. Each piece carries a story of
                  tradition, innovation, and environmental consciousness.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
                  <InteractiveButton
                    variant="glass"
                    onClick={() => {
                      console.log("Login clicked");
                    }}
                  >
                    <span className="flex items-center gap-2">
                      🛍️ Browse Products
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </InteractiveButton>

                  <button className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="font-medium">Watch Our Story</span>
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/20">
                  {[
                    { number: "500+", label: "Handcrafted Pieces" },
                    { number: "50+", label: "Skilled Artisans" },
                    { number: "98%", label: "Customer Satisfaction" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center lg:text-left">
                      <div className="text-2xl md:text-3xl font-black text-white mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-white/70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Content - Hero Image */}
              <div className="relative">
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Floating Elements */}
                  <div
                    className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-2xl blur-xl animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  />
                  <div
                    className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl animate-bounce"
                    style={{ animationDelay: "1.5s" }}
                  />

                  {/* Main Image Container */}
                  <div className="relative w-full h-full group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl backdrop-blur-sm border border-white/20" />
                    <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-transparent to-blue-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700" />

                    <img
                      src="/bg.jpg"
                      alt="Premium Wooden Craftsmanship"
                      className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl transform group-hover:scale-[1.02] transition-all duration-700"
                    />

                    {/* Overlay Elements */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl" />

                    {/* Floating Badge */}
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full text-sm font-bold text-gray-600 shadow-lg">
                      🌿 100% Sustainable
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 -left-12 w-8 h-32 bg-gradient-to-b from-orange-400/40 to-transparent rounded-full blur-sm" />
                <div className="absolute bottom-1/4 -right-12 w-6 h-24 bg-gradient-to-t from-blue-400/40 to-transparent rounded-full blur-sm" />
              </div>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg
              className="relative block w-full h-24"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                fill="#eeeeee"
              />
            </svg>
          </div>
        </section>

        {/* Featured Products with 3D Cards */}
        <section className="relative py-24">
          <ParallaxSection offset={0.2}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-black mb-6">
                  <span className="text-[#d15229]">Recent product</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Each piece is meticulously crafted by skilled artisans,
                  blending traditional techniques with modern design
                  sensibilities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[0, 1, 2].map(() => (
                  <ProductCard3D />
                ))}
              </div>
            </div>
          </ParallaxSection>
        </section>

        {/* Immersive About Section */}

        <About />
        {/* Revolutionary Vendor Invite Section */}
        <Imviatation />
      </main>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
        @keyframes slideGrid {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
