"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { InteractiveButton } from "@/app/page";

const VendorRegister = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ShopName: "",
    vendorFirstname: "",
    vendorOthername: "",
    vendorEmail: "",
    vendorPassword: "",
    vendorTin: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/vendor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      toast.success("Vendor registered successfully!");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const renderInput = (
    label: string,
    name: string,
    type: string,
    placeholder: string,
    icon: string
  ) => (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative">
        <div className="flex items-center border-2 border-transparent rounded-lg backdrop-blur-sm transition-all duration-300 group-hover:border-yellow-400 focus-within:border-yellow-400 focus-within:shadow-lg focus-within:shadow-yellow-400/20" style={{ backgroundColor: "#111529" }}>
          <div className="pl-4 pr-3 text-yellow-400 text-xl">{icon}</div>
          <div className="flex-1">
            <label className="block text-xs text-yellow-300/80 pt-2 px-1 font-medium">
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={(formData as any)[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full bg-transparent text-white placeholder-gray-400 py-2 px-1 pb-3 focus:outline-none text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: "#111529" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-6xl">
        {/* Main Container with Diagonal Split Layout */}
        <div className="relative">
          {/* Left Side - Branding/Info Section */}
          <div 
            className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-br from-yellow-400/10 to-yellow-600/5 backdrop-blur-sm rounded-l-3xl hidden lg:block"
            style={{ clipPath: "polygon(0 0, 80% 0, 60% 100%, 0 100%)" }}
          >
            <div className="p-12 h-full flex flex-col justify-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-2xl rotate-12 transform hover:rotate-0 transition-transform duration-500">
                  🏪
                </div>
                <h2 className="text-4xl font-bold text-yellow-400 leading-tight">
                  Join Our<br />
                  <span className="text-yellow-300">Vendor Network</span>
                </h2>
                <p className="text-yellow-200/70 text-lg leading-relaxed">
                  Start your journey with us and reach thousands of customers
                </p>
                <div className="space-y-3 text-yellow-300/60">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Easy setup process</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>24/7 support available</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Secure and reliable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="lg:ml-auto lg:w-3/5 w-full">
            <div className="bg-black/30 backdrop-blur-xl border border-yellow-400/20 rounded-3xl p-8 lg:p-12 shadow-2xl">
              <div className="text-center mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">
                  Vendor Registration
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
              </div>

              {/* Form Grid */}
              <div className="space-y-6">
                {/* Row 1 */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {renderInput("Shop Name", "ShopName", "text", "Enter your shop name", "🏪")}
                  {renderInput("Email Address", "vendorEmail", "email", "Enter your email", "📧")}
                </div>

                {/* Row 2 */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {renderInput("First Name", "vendorFirstname", "text", "Enter your first name", "👤")}
                  {renderInput("Other Name", "vendorOthername", "text", "Enter your other name", "👥")}
                </div>

                {/* Row 3 */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {renderInput("Password", "vendorPassword", "password", "Create secure password", "🔒")}
                  {renderInput("TIN Number", "vendorTin", "number", "Enter your TIN number", "🏢")}
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <InteractiveButton
                    variant="primary"
                    onClick={handleSubmit}
                    className="w-full py-4 px-8"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Register
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;