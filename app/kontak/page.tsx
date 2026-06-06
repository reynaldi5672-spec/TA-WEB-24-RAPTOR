"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';

import { useTheme } from '@/app/context/ThemeContext';
import { Mail, Phone, MapPin, Send, Loader2, Compass } from 'lucide-react';
import Swal from 'sweetalert2';

export default function KontakPage() {
  
  const { isDarkMode } = useTheme();
  
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  
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

      {/* --- LAYOUT GRID  --- */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-16 pt-36 pb-16 relative z-10 my-auto">
        <link href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap" rel="stylesheet" />
        
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          
          <section className="lg:col-span-5 space-y-4">
            
            {/* KARTU ATAS: HUBUNGI KAMI */}
            <div 
              className={`p-8 rounded-[2rem] border backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-500 ${
                isDarkMode ? 'bg-black/30 border-white/10 shadow-black/40' : 'bg-white/40 border-black/5 shadow-slate-200/40'
              }`}
              style={{
                backgroundImage: `linear-gradient(${
                  isDarkMode ? 'rgba(0,0,0,0.65), rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.6), rgba(255,255,255,0.7)'
                }), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md shadow-sm mb-6 ${
                isDarkMode ? 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#ffcc00]' : 'bg-[#ffcc00]/20 border-[#ffcc00]/40 text-[#bf9600]'
              }`}>
                <Compass size={13} className="animate-[spin_8s_linear_infinite]" /> Get In Touch
              </div>
              
              <div className="space-y-1 mb-6">
                <h1 className="text-5xl md:text-6xl font-normal leading-none tracking-wide text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" style={{ fontFamily: "'Kaushan Script', cursive" }}>
                  Hubungi
                </h1>
                <h1 className="text-6xl md:text-7xl font-normal leading-none tracking-wide text-[#ffcc00] drop-shadow-[0_4px_12px_rgba(255,204,0,0.3)]" style={{ fontFamily: "'Kaushan Script', cursive" }}>
                  Kami
                </h1>
              </div>

              <p className={`text-sm font-medium leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-slate-800'}`}>
                Punya pertanyaan seputar wisata di Bandar Lampung? Atau mau kerja sama bareng VisitBDL? Langsung aja drop pesan di samping ya!
              </p>
            </div>

            {/* INFO ALAMAT & SOSMED  */}
            <div className={`p-4 rounded-[2rem] border backdrop-blur-xl transition-all duration-500 space-y-2.5 ${
              isDarkMode ? 'bg-black/20 border-blue-500/30 shadow-[0_0_25px_rgba(59,130,246,0.15)]' : 'bg-white/30 border-blue-400/20 shadow-sm'
            }`}>
              {[
                { icon: Mail, label: 'Email Resmi', value: 'hello@visitbdl.com', iconColor: 'text-blue-400' },
                { icon: Phone, label: 'WhatsApp Bisnis', value: '+62 812 3456 7890', iconColor: 'text-emerald-400' },
                { icon: MapPin, label: 'Kantor Pusat', value: 'Bandar Lampung, Indonesia', iconColor: 'text-rose-400', hasMapIcon: true },
              ].map((item, idx) => (
                <div key={idx} className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${isDarkMode ? 'border-white/[0.02] hover:bg-white/5' : 'border-black/[0.02] hover:bg-black/5'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isDarkMode ? 'bg-black/30 border-white/5' : 'bg-white border-black/5 shadow-sm'}`}>
                      <item.icon size={18} className={item.iconColor} />
                    </div>
                    <div>
                      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">{item.label}</div>
                      <div className="text-sm font-bold tracking-tight">{item.value}</div>
                    </div>
                  </div>
                  {item.hasMapIcon && (
                    <div className="text-amber-400 p-2 bg-amber-400/10 rounded-lg border border-amber-400/20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          
          <section className="lg:col-span-7 w-full">
            <div className={`relative p-6 md:p-10 rounded-[2rem] border backdrop-blur-2xl transition-all duration-500 shadow-2xl ${
              isDarkMode ? 'bg-black/40 border-white/10 shadow-black/50' : 'bg-white/60 border-black/5 shadow-slate-200/50'
            }`}>
              
              <form onSubmit={handleSubmit} className="space-y-5 text-left w-full">
                
                {/* 1. NAMA & EMAIL  */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Nama Lengkap</label>
                    <input 
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full border rounded-2xl py-4 px-6 text-xs font-bold outline-none transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-black/30 border-white/10 focus:border-[#ffcc00] text-white placeholder:text-gray-600' 
                          : 'bg-white/80 border-black/10 focus:border-[#ffcc00] text-black shadow-inner placeholder:text-gray-400'
                      }`}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                    <input 
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full border rounded-2xl py-4 px-6 text-xs font-bold outline-none transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-black/30 border-white/10 focus:border-[#ffcc00] text-white placeholder:text-gray-600' 
                          : 'bg-white/80 border-black/10 focus:border-[#ffcc00] text-black shadow-inner placeholder:text-gray-400'
                      }`}
                    />
                  </div>
                </div>

                {/* 2. SUBJEK PESAN */}
                <div className="space-y-2 w-full">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Subjek Pesan</label>
                  <input 
                    type="text"
                    required
                    placeholder="Apa yang ingin Anda tanyakan?"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className={`w-full border rounded-2xl py-4 px-6 text-xs font-bold outline-none transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-black/30 border-white/10 focus:border-[#ffcc00] text-white placeholder:text-gray-600' 
                        : 'bg-white/80 border-black/10 focus:border-[#ffcc00] text-black shadow-inner placeholder:text-gray-400'
                    }`}
                  />
                </div>

                {/* 3. ISI PESAN */}
                <div className="space-y-2 w-full">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Isi Pesan</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Tulis detail pesan Anda di sini..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full border rounded-2xl py-4 px-6 text-xs font-bold outline-none transition-all duration-300 resize-none ${
                      isDarkMode 
                        ? 'bg-black/30 border-white/10 focus:border-[#ffcc00] text-white placeholder:text-gray-600' 
                        : 'bg-white/80 border-black/10 focus:border-[#ffcc00] text-black shadow-inner placeholder:text-gray-400'
                    }`}
                  />
                </div>

                
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#ffcc00] to-amber-400 text-black py-4 rounded-xl font-bold uppercase text-[11px] tracking-[0.25em] flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-[#ffcc00]/20 disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>Kirim Pesan Sekarang <Send size={13} /></>
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