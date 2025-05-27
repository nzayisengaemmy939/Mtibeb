"use client";

import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Zap, Clock, Star, Sparkles, MessageCircle, User, AtSign, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
type Particle = {
  size: any;
  opacity:  undefined;
  id:  null | undefined;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeField, setActiveField] = useState(null);
  
const [particles, setParticles] = useState<Particle[]>([]);;
  const canvasRef = useRef(null);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle animation
  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1
      }));
    };

    setParticles(generateParticles());

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.vy + window.innerHeight) % window.innerHeight
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    
    // Reset form with animation
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'support@miti.tibeb.com',
      description: 'Drop us a line anytime',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+251 911 123 456',
      description: 'Call us during business hours',
      color: 'from-yellow-400 to-yellow-500'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Addis Ababa, Ethiopia',
      description: 'Visit our office',
      color: 'from-yellow-600 to-yellow-700'
    }
  ];

  const formFields = [
    { id: 'name', label: 'Your Name', type: 'text', icon: User, placeholder: 'John Doe' },
    { id: 'email', label: 'Email Address', type: 'email', icon: AtSign, placeholder: 'john@example.com' },
    { id: 'subject', label: 'Subject', type: 'text', icon: FileText, placeholder: 'How can we help?' },
    { id: 'message', label: 'Message', type: 'textarea', icon: MessageCircle, placeholder: 'Tell us more...' }
  ];

  return (
    <>
    <Navbar></Navbar>
  
    <div className="min-h-screen bg-gradient-to-br from-[#04050a] via-yellow-900 to-[#04050a] relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: particle.x,
              top: particle.y,
              opacity: particle.opacity,
              transform: `scale(${particle.size})`
            }}
          />
        ))}
      </div>

      {/* Interactive Cursor Effect */}
      <div
        className="fixed w-96 h-96 pointer-events-none z-10 opacity-20"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          background: 'radial-gradient(circle, rgba(255, 193, 7, 0.3) 0%, transparent 70%)',
          transition: 'all 0.1s ease-out'
        }}
      />

      <div className="relative z-20 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header with Floating Animation */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-1 rounded-full animate-spin-slow">
                <div className="bg-[#04050a] p-3 rounded-full">
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-300 bg-clip-text text-transparent animate-pulse">
              Let's Connect
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Ready to turn your ideas into reality? We're here to make magic happen. 
              Reach out and let's create something extraordinary together.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Interactive Contact Cards */}
            {contactMethods.map((method, index) => (
              <div
                key={method.title}
                className="group relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl blur-xl"
                     style={{ background: `linear-gradient(135deg, ${method.color.split(' ')[1]}, ${method.color.split(' ')[3]})` }} />
                
                <div className="relative bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-8 rounded-2xl group-hover:border-yellow-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${method.color} p-0.5 mb-6 group-hover:animate-bounce`}>
                    <div className="w-full h-full bg-[#04050a] rounded-xl flex items-center justify-center">
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{method.title}</h3>
                  <p className="text-yellow-300 font-semibold mb-2">{method.value}</p>
                  <p className="text-gray-400">{method.description}</p>
                  
                  <div className="absolute top-4 right-4">
                    <Star className="w-5 h-5 text-yellow-400 animate-twinkle" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Business Hours with Glassmorphism */}
            <div className="space-y-8">
              <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 p-8 rounded-2xl hover:border-yellow-500/50 transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Business Hours</h2>
                </div>
                
                <div className="space-y-4">
                  {[
                    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM', active: true },
                    { day: 'Saturday', hours: '10:00 AM - 4:00 PM', active: false },
                    { day: 'Sunday', hours: 'Closed', active: false }
                  ].map((schedule, i) => (
                    <div key={i} className={`flex justify-between items-center p-4 rounded-lg transition-all duration-300 ${
                      schedule.active ? 'bg-yellow-500/20 border-l-4 border-yellow-500' : 'bg-gray-700/30'
                    }`}>
                      <span className="text-white font-medium">{schedule.day}</span>
                      <span className={schedule.active ? 'text-yellow-400' : 'text-gray-400'}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Response Promise */}
              <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-700/20 backdrop-blur-xl border border-yellow-500/30 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                  <h3 className="text-xl font-bold text-white">Quick Response Guarantee</h3>
                </div>
                <p className="text-yellow-200">
                  We typically respond within 2 hours during business hours. 
                  For urgent matters, don't hesitate to call us directly!
                </p>
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 p-8 rounded-2xl hover:border-yellow-500/50 transition-all duration-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
              </div>

              <div className="space-y-6">
                {formFields.map((field) => (
                  <div key={field.id} className="relative group">
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <field.icon className="w-4 h-4" />
                      {field.label}
                    </label>
                    
                    <div className="relative">
                      {field.type === 'textarea' ? (
                        <textarea
                          id={field.id}
                          value={formData[field.id]}
                          onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                          onFocus={() => setActiveField(field.id)}
                          onBlur={() => setActiveField(null)}
                          rows={4}
                          placeholder={field.placeholder}
                          className={`w-full px-4 py-3 rounded-xl bg-gray-700/50 text-white border-2 transition-all duration-300 backdrop-blur-sm placeholder-gray-400 resize-none ${
                            activeField === field.id 
                              ? 'border-yellow-500 shadow-lg shadow-yellow-500/25 bg-gray-700/70' 
                              : 'border-gray-600 hover:border-gray-500'
                          }`}
                          required
                        />
                      ) : (
                        <input
                          type={field.type}
                          id={field.id}
                          value={formData[field.id]}
                          onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                          onFocus={() => setActiveField(field.id)}
                          onBlur={() => setActiveField(null)}
                          placeholder={field.placeholder}
                          className={`w-full px-4 py-3 rounded-xl bg-gray-700/50 text-white border-2 transition-all duration-300 backdrop-blur-sm placeholder-gray-400 ${
                            activeField === field.id 
                              ? 'border-yellow-500 shadow-lg shadow-yellow-500/25 bg-gray-700/70' 
                              : 'border-gray-600 hover:border-gray-500'
                          }`}
                          required
                        />
                      )}
                      
                      {activeField === field.id && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 pointer-events-none animate-pulse" />
                      )}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Magic...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.8);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
    <Footer></Footer>
    </>
  );
}