"use client";
import { ReactNode, useEffect, useState } from "react";
import {
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
  Home,
  Package,
  Info,
  Mail,
  Zap,
  Bell,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


interface UserInfo {
  email: string;
  role: string;
}

interface GlowingButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
  icon: LucideIcon;
  isActive: boolean;
}

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [notifications] = useState(3);

  useEffect(() => {
    const fetchUser = async () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("User fetch failed:", error);
        setUser(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setUser(null);
    router.push("/login");
  };

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  const FloatingOrbs = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 bg-gradient-to-r from-amber-400/20 to-purple-400/20 rounded-full animate-pulse"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 2) * 60}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );

 const GlowingButton = ({ children, onClick, className = "" }: GlowingButtonProps) => (
  <button
    onClick={onClick}
    className={`relative group overflow-hidden rounded-full transition-all duration-300 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10">{children}</div>
  </button>
);
 const AnimatedLink = ({ href, children, icon: Icon, isActive }: AnimatedLinkProps) => (
  <Link
    href={href}
    onClick={() => setActiveLink(href)}
    className={`relative group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
      isActive
        ? "text-amber-400 bg-white/10 backdrop-blur-sm"
        : "text-white/80 hover:text-white hover:bg-white/5"
    }`}
  >
    <Icon size={18} className="transition-transform group-hover:scale-110" />
    <span className="font-medium">{children}</span>
    {isActive && (
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-full animate-pulse" />
    )}
  </Link>
);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-gradient-to-r from-[#1A1A2E]/95 via-[#16213E]/95 to-[#0F0F23]/95 backdrop-blur-md"
        }`}
      >
        <FloatingOrbs />

        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="relative group"
              onClick={() => setActiveLink("/")}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
                  <Zap size={20} className="text-white relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-white to-purple-400 bg-clip-text text-transparent">
                    Miti Tibeb
                  </h1>
                  <div className="h-0.5 bg-gradient-to-r from-amber-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <AnimatedLink
                  key={link.href}
                  href={link.href}
                  icon={link.icon}
                  isActive={activeLink === link.href}
                >
                  {link.label}
                </AnimatedLink>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {!loading && user && (
                <>
                  {/* Notifications */}
                  <GlowingButton className="relative p-2"  onClick={() => {
                   
                        console.log("Login clicked");
                        
                      }}>
                    <Bell
                      size={20}
                      className="text-white/80 hover:text-white transition-colors"
                    />
                    {notifications > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">
                        {notifications}
                      </div>
                    )}
                  </GlowingButton>

                  {/* Cart */}
                  <Link href="/cart">
                    <GlowingButton className="p-2"  onClick={() => {
                   
                        console.log("Login clicked");
                        
                      }}>
                      <ShoppingCart
                        size={20}
                        className="text-white/80 hover:text-white transition-colors"
                      />
                    </GlowingButton>
                  </Link>

                  {/* User Profile */}
                  <Link
                    href="/profile"
                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="text-white/90 font-medium max-w-32 truncate">
                      {user.email.split("@")[0]}
                    </span>
                  </Link>

                  {/* Logout */}
                  <GlowingButton
                    onClick={handleLogout}
                    className="p-2 hover:bg-red-500/20"
                  >
                    <LogOut
                      size={20}
                      className="text-white/80 hover:text-red-400 transition-colors"
                    />
                  </GlowingButton>
                </>
              )}

              {!loading && !user && (
                <div className="flex items-center gap-3">
                  <Link href="/login">
                    <GlowingButton
                      className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white"
                      onClick={() => {
                   
                        console.log("Login clicked");
                        
                      }}
                    >
                      <User size={18} />
                      <span className="hidden sm:inline font-medium">
                        Login
                      </span>
                    </GlowingButton>
                  </Link>
                  <Link
                    href="/signup"
                    className="relative group px-6 py-2 bg-gradient-to-r from-amber-500 to-purple-600 rounded-full text-white font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X size={20} className="text-white" />
                ) : (
                  <Menu size={20} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-black/90 backdrop-blur-xl border-t border-white/10 px-6 py-4">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeLink === link.href
                      ? "bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-400"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <link.icon size={20} />
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </div>

            {user && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="font-medium">{user.email}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-20" />
    </>
  );
}
