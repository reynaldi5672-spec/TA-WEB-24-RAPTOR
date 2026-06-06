"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
// IMPORT THEME GLOBAL
import { useTheme } from '@/app/context/ThemeContext';
import { Mail, Phone, MapPin, Send, Loader2, Compass } from 'lucide-react';
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
          
          {/* --- SISI KIRI: KARTU GLASSMORPHISM UTAMA "HUBUNGI KAMI" --- */}
<section className="lg:col-span-5 space-y-6">
  
  {/* Link Google Font untuk Gaya Huruf Petualangan/Brush */}
  <link href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap" rel="stylesheet" />

  {/* KARTU UTAMA DENGAN BACKGROUND GUNUNG */}
  <div 
    className={`p-8 rounded-[2rem] border backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-500 ${
      isDarkMode 
        ? 'bg-black/30 border-white/10 shadow-black/40' 
        : 'bg-white/40 border-black/5 shadow-slate-200/40'
    }`}
    style={{
      backgroundImage: `linear-gradient(${
        isDarkMode ? 'rgba(0,0,0,0.65), rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.6), rgba(255,255,255,0.7)'
      }), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    {/* Badge Get In Touch */}
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md shadow-sm mb-6 transition-all duration-500 ${
      isDarkMode ? 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#ffcc00]' : 'bg-[#ffcc00]/20 border-[#ffcc00]/40 text-[#bf9600]'
    }`}>
      <Compass size={13} className="animate-[spin_8s_linear_infinite]" /> Get In Touch
    </div>
    
    {/* Judul Utama dengan Font Kaushan Script (Gaya Tulis Tangan Wisata) */}
    <div className="space-y-1 mb-6">
      <h1 
        className="text-5xl md:text-6xl font-normal leading-none tracking-wide text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
        style={{ fontFamily: "'Kaushan Script', cursive" }}
      >
        Hubungi
      </h1>
      <h1 
        className="text-6xl md:text-7xl font-normal leading-none tracking-wide text-[#ffcc00] drop-shadow-[0_4px_12px_rgba(255,204,0,0.3)]"
        style={{ fontFamily: "'Kaushan Script', cursive" }}
      >
        Kami
      </h1>
    </div>

    {/* Deskripsi Teks */}
    <p className={`text-sm font-medium leading-relaxed ${
      isDarkMode ? 'text-gray-200' : 'text-slate-800'
    }`}>
      Punya pertanyaan seputar destinasi wisata alam eksotis di Bandar Lampung? Atau tertarik berkolaborasi bersama VisitBDL? Drop pesan Anda di samping ya!
    </p>
  </div>

  {/* --- KARTU KONTAK BAWAH (EMAIL, WA, MAPS) DENGAN EFEK GLOW BLUE DI TEPI --- */}
  <div className={`p-4 rounded-[2rem] border backdrop-blur-xl transition-all duration-500 space-y-3 ${
    isDarkMode 
      ? 'bg-black/20 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
      : 'bg-white/30 border-blue-400/20 shadow-sm'
  }`}>
    {[
      { icon: Mail, label: 'Email Resmi', value: 'hello@visitbdl.com', iconColor: 'text-blue-400' },
      { icon: Phone, label: 'WhatsApp Bisnis', value: '+62 812 3456 7890', iconColor: 'text-emerald-400' },
      { icon: MapPin, label: 'Kantor Pusat', value: 'Bandar Lampung, Indonesia', iconColor: 'text-rose-400', hasMapIcon: true },
    ].map((item, idx) => (
      <div 
        key={idx} 
        className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 group ${
          isDarkMode ? 'border-white/[0.02] hover:bg-white/5' : 'border-black/[0.02] hover:bg-black/5'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
            isDarkMode ? 'bg-black/30 border-white/5' : 'bg-white border-black/5 shadow-sm'
          } group-hover:scale-105 transition-transform`}>
            <item.icon size={18} className={item.iconColor} />
          </div>
          <div>
            <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">{item.label}</div>
            <div className="text-sm font-bold tracking-tight">{item.value}</div>
          </div>
        </div>
        
        {/* Penambahan Icon Peta Mini di Sebelah Kanan Sesuai Gambar Rujukan */}
        {item.hasMapIcon && (
          <div className="text-amber-400 p-2 bg-amber-400/10 rounded-lg border border-amber-400/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
          </div>
        )}
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