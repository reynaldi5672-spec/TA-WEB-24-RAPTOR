"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
// IMPORT THEME GLOBAL
import { useTheme } from '@/app/context/ThemeContext';
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

export default function KontakPage() {
  // Ambil state tema global dari Context Provider
  const { isDarkMode } = useTheme();
  
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Gunakan requestAnimationFrame agar hydration aman dan anti warning linter
  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi pengiriman pesan
    setTimeout(() => {
      setIsLoading(false);
      Swal.fire({
        title: 'Pesan Terkirim!',
        text: 'Terima kasih sudah menghubungi VisitBDL. Kami akan segera membalasnya.',
        icon: 'success',
        background: isDarkMode ? '#111' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
        confirmButtonColor: '#ffcc00',
        confirmButtonText: 'Oke Sip!'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <main className={`min-h-screen transition-colors duration-700 relative overflow-hidden ${
      isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#f8f9fa] text-[#1a1a1a]'
    }`}>
      
     {/* ---  BACKGROUND & OVERLAY --- */}
<div 
  className="absolute inset-0 bg-cover bg-center transition-all duration-700 z-0"
  style={{
    backgroundImage: `linear-gradient(${
      isDarkMode 
        ? 'rgba(5, 7, 10, 0.85), rgba(5, 10, 15, 0.92)' 
        : 'rgba(248, 249, 250, 0.80), rgba(240, 244, 248, 0.90)'
    }), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
  }}
/>
      
      <Navbar />

      {/* SEBELUMNYA: max-w-[1400px] -> SEKARANG: max-w-7xl (Utility Class Standard Tailwind) */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-44 pb-24 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* --- LEFT SIDE: INFO & SOSMED --- */}
          <section className="text-left space-y-6">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.25em] backdrop-blur-md shadow-sm transition-all duration-500 ${
              isDarkMode ? 'bg-[#ffcc00]/5 border-[#ffcc00]/20 text-[#ffcc00]' : 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#e6b800]'
            }`}>
              <MessageSquare size={12} className="animate-pulse" /> Get In Touch
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black leading-[0.85] uppercase italic tracking-tighter">
              Hubungi <br /> 
              <span className="text-[#ffcc00] drop-shadow-[0_0_30px_rgba(255,204,0,0.25)]">Kami</span>
            </h1>

            <p className={`text-xs md:text-sm font-medium leading-relaxed max-w-md pb-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Punya pertanyaan seputar wisata di Bandar Lampung? Atau mau kerja sama bareng VisitBDL? Langsung aja drop pesan di samping ya!
            </p>

            {/* Contact Details Cards */}
            <div className="space-y-6 pt-4">
              {[
                { icon: Mail, label: 'Email Resmi', value: 'hello@visitbdl.com', color: 'text-blue-400' },
                { icon: Phone, label: 'WhatsApp Bisnis', value: '+62 812 3456 7890', color: 'text-green-400' },
                { icon: MapPin, label: 'Kantor Pusat', value: 'Bandar Lampung, Indonesia', color: 'text-red-400' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-5 group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                    isDarkMode ? 'bg-white/[0.02] border-white/5 text-white' : 'bg-white border-black/5 shadow-sm text-black'
                  }`}>
                    <item.icon size={22} className={item.color} />
                  </div>
                  <div>
                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">{item.label}</div>
                    <div className="text-lg font-black tracking-tight">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- RIGHT SIDE: FORM BLOCK --- */}
          <section>
            <div className={`relative p-8 md:p-12 rounded-[2.5rem] border transition-all duration-500 ${
              isDarkMode ? 'bg-[#0d0d0d] border-white/5 shadow-2xl' : 'bg-white border-black/[0.04] shadow-xl'
            }`}>
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-1">Nama Lengkap</label>
                    <input 
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full border rounded-2xl py-4 px-6 text-xs font-bold outline-none transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-white/[0.02] border-white/10 focus:border-[#ffcc00]/50 focus:bg-white/[0.04] text-white' 
                          : 'bg-gray-50 border-black/5 focus:border-[#ffcc00] focus:bg-white text-black shadow-inner'
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                    <input 
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full border rounded-2xl py-4 px-6 text-xs font-bold outline-none transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-white/[0.02] border-white/10 focus:border-[#ffcc00]/50 focus:bg-white/[0.04] text-white' 
                          : 'bg-gray-50 border-black/5 focus:border-[#ffcc00] focus:bg-white text-black shadow-inner'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-1">Subjek Pesan</label>
                  <input 
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className={`w-full border rounded-2xl py-4 px-6 text-xs font-bold outline-none transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-white/[0.02] border-white/10 focus:border-[#ffcc00]/50 focus:bg-white/[0.04] text-white' 
                        : 'bg-gray-50 border-black/5 focus:border-[#ffcc00] focus:bg-white text-black shadow-inner'
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-1">Isi Pesan</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full border rounded-2xl py-4 px-6 text-xs font-medium outline-none transition-all duration-300 resize-none ${
                      isDarkMode 
                        ? 'bg-white/[0.02] border-white/10 focus:border-[#ffcc00]/50 focus:bg-white/[0.04] text-white' 
                        : 'bg-gray-50 border-black/5 focus:border-[#ffcc00] focus:bg-white text-black shadow-inner'
                    }`}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#ffcc00] text-black py-4.5 rounded-xl font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-[#ffcc00]/10 disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>Kirim Pesan Sekarang <Send size={14} /></>
                  )}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}