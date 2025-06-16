"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Users,
  Rocket,
  ChevronDown,
  Play,
  Pause,
  Code,
  Lightbulb,
  Globe,
  Zap,
  Globe2Icon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
type InteractiveStatsProps = {
  stats: Record<string, number | string>;
  color: string;
};

export default function AboutUs() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);
         ``
  const sections = [
    {
      id: "Meet the Builder",
      icon: Users,
      title: "Meet the Builder",
      subtitle:
        "   Behind Miti Tibeb is a late UR student, a junior software engineer passionate about open access, ethical tech, and scalable systems.",
      content:
        "  Certified from ALX’s 12-month software engineering program, I specialize in backend architecture, data pipelines, mobile development, DevOps, and cybersecurity. My mission: to build digital bridges between African talent and the global market.",
      stats: { years: "50+", pieces: "1000+", materials: "15+" },
      color: "from-amber-500 to-orange-600",
    },
    {
      id: "builder",
      icon: Globe2Icon,
      title: "Rooted in Tradition, Crafted for Tomorrow",
      subtitle: "Where African Heritage Meets Sustainable Craftsmanship",
      content:
        "We create timeless handcrafted wooden products that blend African heritage with sustainable design and empower local artisans.",
      stats: { projects: "25+", technologies: "12+", certifications: "5+" },
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "future",
      icon: Rocket,
      title: "Future Integration",
      subtitle: "Innovation is in our DNA — and our roadmap reflects that.",
      content:
        "   We are planning to integrate machine learning to personalize product recommendations, 3D previews for immersive shopping, and digital authenticity certificates. A dedicated vendor dashboard, live consultation chat, and support for African mobile banking are also on the way.",
      stats: { features: "8+", integrations: "6+", markets: "3+" },
      color: "from-purple-500 to-pink-600",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const progress = scrollTop / (documentHeight - windowHeight);
        setScrollProgress(progress);

        // Update active section based on scroll position
        const sectionIndex = Math.floor(
          (scrollTop / windowHeight) * sections.length
        );
        setActiveSection(Math.min(sectionIndex, sections.length - 1));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections.length]);

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );

  const InteractiveStats = ({ stats, color }: InteractiveStatsProps) => (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {Object.entries(stats).map(([key, value], index) => (
        <div
          key={key}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div
            className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
          >
            {value}
          </div>
          <div className="text-sm text-white/80 capitalize">
            {key.replace(/([A-Z])/g, " $1")}
          </div>
        </div>
      ))}
    </div>
  );

  const ProgressBar = () => (
    <div className="fixed top-0 left-0 w-full h-1 bg-black/20 z-50">
      <div
        className="h-full bg-gradient-to-r from-amber-500 via-blue-500 to-purple-500 transition-all duration-300"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  );

  const NavigationDots = () => (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-4 z-40">
    {sections.map((section, index) => (
  <button
    key={index}
    onClick={() => {
      const element = document.getElementById(section.id);
      element?.scrollIntoView({ behavior: "smooth" });
    }}
    className={`w-3 h-3 rounded-full transition-all duration-300 ${
      activeSection === index
        ? "bg-white scale-125 shadow-lg"
        : "bg-white/40 hover:bg-white/60"
    }`}
  />
))}

    </div>
  );

  const AudioController = () => (
    <div className="fixed bottom-8 left-8 z-40">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="bg-white/20 backdrop-blur-md rounded-full p-4 text-white hover:bg-white/30 transition-all duration-300 group"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {isPlaying ? "Pause ambient sound" : "Play ambient sound"}
        </div>
      </button>
    </div>
  );

  return (
    <>
      <Navbar></Navbar>
      <div
        ref={containerRef}
        className="relative min-h-screen bg-[#0A0A0A] text-white overflow-hidden"
      >
        <ProgressBar />
        <NavigationDots />
        <AudioController />

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F0F23]">
          <FloatingParticles />

          <div className="text-center z-10 max-w-4xl mx-auto px-6">
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse" />
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-amber-400 via-blue-400 to-purple-400 bg-clip-text text-transparent relative z-10">
                What we do
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
              Miti Tibeb blends the elegance of woodwork with African artistic
              heritage. Each piece we craft carries a story rooted in culture,
              sustainability, and care.
            </p>
            <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
              Where artistry meets craftsmanship and tradition lives in every
              grain.
            </p>
            <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
              Beyond creating furniture, we offer interior design samples that
              showcase not only the manufacturing talent of our partners but
              also their expert installation work — bringing peace and beauty
              into your spaces.
            </p>

            <div className="flex justify-center space-x-6 mb-12">
              {[Code, Lightbulb, Globe, Zap].map((Icon, index) => (
                <div
                  key={index}
                  className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-110"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Icon size={24} className="text-white" />
                </div>
              ))}
            </div>

            <ChevronDown
              size={32}
              className="mx-auto animate-bounce text-white/60 cursor-pointer hover:text-white transition-colors"
              onClick={() =>
                document
                  .getElementById("craft")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            />
          </div>
        </section>

        {/* Dynamic Sections */}
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <section
              key={section.id}
              id={section.id}
              className={`min-h-screen flex items-center relative bg-gradient-to-br ${section.color} to-black/50`}
              style={{
                background: `linear-gradient(135deg, ${
                  section.color.includes("amber")
                    ? "#F59E0B, #EA580C"
                    : section.color.includes("blue")
                    ? "#3B82F6, #4F46E5"
                    : "#8B5CF6, #EC4899"
                }, rgba(0,0,0,0.7))`,
              }}
            >
              <FloatingParticles />

              <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon size={32} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-bold text-white">
                        {section.title}
                      </h2>
                      <p className="text-white/80 text-lg">
                        {section.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                    {section.content}
                  </p>

                  <InteractiveStats
                    stats={Object.fromEntries(
                      Object.entries(section.stats).filter(
                        ([_, value]) => value !== undefined
                      )
                    )}
                    color={section.color}
                  />
                </div>

                <div className="relative">
                  <div className="aspect-square rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <Icon size={80} className="text-white/60 mx-auto mb-4" />
                      <div className="w-32 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
                        <div
                          className="h-full bg-white/60 rounded-full transition-all duration-1000"
                          style={{ width: `${(index + 1) * 33.33}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/30 rounded-full animate-pulse" />
                  <div
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/20 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  />
                </div>
              </div>
            </section>
          );
        })}

        {/* Call to Action */}
        <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-black via-[#1A1A2E] to-[#16213E]">
          <FloatingParticles />

          <div className="text-center max-w-4xl mx-auto px-6 z-10">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-amber-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ready to Craft Tomorrow?
            </h2>

            <p className="text-xl md:text-2xl text-white/80 mb-12">
              Join us in reshaping the future of African craftsmanship through
              technology
            </p>

            <button className="group relative px-12 py-6 bg-gradient-to-r from-amber-500 to-purple-600 rounded-full text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span className="relative z-10">Start Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </>
  );
}
