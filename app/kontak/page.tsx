"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import { useTheme } from '@/app/context/ThemeContext';
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2, Map } from 'lucide-react';
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

    setTimeout(() => {
      setIsLoading(false);
      Swal.fire({
        title: 'Pesan Terkirim!',
        text: 'Terima kasih sudah menghubungi VisitBDL. Kami akan segera membalasnya.',
        icon: 'success',
        background: '#111',
        color: '#fff',
        confirmButtonColor: '#ffcc00',
        confirmButtonText: 'Oke Sip!'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050709] text-white font-sans selection:bg-[#ffcc00] selection:text-black">
      
      {/* --- BACKGROUND IMAGE WITH OVERLAY --- */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-1000 scale-105 opacity-40 mix-blend-lighten"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop')` 
        }}
      />
      {/* Vignette & Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050709]/80 via-[#050709]/60 to-[#050709] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050709_80%)] z-0" />

      <Navbar />

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-36 pb-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ================= LEFT SIDE: INFO CARDS ================= */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Top Info Card (Image Hybrid) */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#11161a]/60 backdrop-blur-xl p-8 flex-1 flex flex-col justify-between shadow-2xl group transition-all duration-500 hover:border-white/20">
              {/* Mini Card Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1171&auto=format&fit=crop')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11161a] via-transparent to-transparent" />
              
              <div className="relative z-10 space-y-4">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-[#ffcc00] tracking-wider uppercase">
                  <MessageSquare size={10} className="text-[#ffcc00]" /> Get In Touch
                </div>
                
                {/* Title dengan Seni Tipografi */}
                <div className="space-y-1">
                  <h1 className="text-5xl md:text-6xl font-serif italic font-normal tracking-wide text-white leading-tight">
                    Hubungi
                  </h1>
                  <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-[#ffcc00] drop-shadow-[0_0_20px_rgba(255,204,0,0.2)]">
                    Kami
                  </h2>
                </div>
              </div>

              <p className="relative z-10 text-xs text-gray-400 font-medium leading-relaxed max-w-sm pt-8">
                Punya pertanyaan seputar wisata di Bandar Lampung? Atau mau kerja sama bareng VisitBDL? Langsung aja drop pesan di samping ya!
              </p>
            </div>

            {/* Bottom Info Card (Directory) */}
            <div className="rounded-[2rem] border border-white/5 bg-[#0b0f12]/80 backdrop-blur-md p-8 shadow-xl space-y-5">
              {[
                { icon: Mail, label: 'EMAIL RESMI', value: 'hello@visitbdl.com', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
                { icon: Phone, label: 'WHATSAPP BISNIS', value: '+62 812 3456 7890', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
                { icon: MapPin, label: 'KANTOR PUSAT', value: 'Bandar Lampung, Indonesia', color: 'bg-red-500/10 text-red-400 border-red-500/20', actionIcon: Map },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl border border-white/[0.02] hover:bg-white/[0.02] transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.color} shadow-inner`}>
                      <item.icon size={18} />
                    </div>
                    <div>
                      <div className="text-[9px] text-gray-500 font-bold tracking-widest uppercase mb-0.5">{item.label}</div>
                      <div className="text-sm font-semibold tracking-tight text-gray-200 group-hover:text-white transition-colors">{item.value}</div>
                    </div>
                  </div>
                  {item.actionIcon && (
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#ffcc00] hover:bg-white/10 transition-all cursor-pointer">
                      <item.actionIcon size={14} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT SIDE: FORM BLOCK ================= */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-[2.5rem] border border-white/10 bg-[#11161a]/60 backdrop-blur-xl p-8 md:p-10 shadow-2xl flex flex-col justify-center transition-all duration-500 hover:border-white/15">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Row 1: Nama & Email */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">Nama Lengkap</label>
                    <input 
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#090d10]/60 border border-white/10 focus:border-[#ffcc00]/40 rounded-xl py-3.5 px-5 text-xs font-medium text-white placeholder-gray-600 outline-none transition-all duration-300 focus:bg-[#090d10]/90 focus:shadow-[0_0_15px_rgba(255,204,0,0.03)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">Email Address</label>
                    <input 
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-[#090d10]/60 border border-white/10 focus:border-[#ffcc00]/40 rounded-xl py-3.5 px-5 text-xs font-medium text-white placeholder-gray-600 outline-none transition-all duration-300 focus:bg-[#090d10]/90 focus:shadow-[0_0_15px_rgba(255,204,0,0.03)]"
                    />
                  </div>
                </div>

                {/* Row 2: Subjek */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">Subjek Pesan</label>
                  <input 
                    type="text"
                    required
                    placeholder="Apa yang ingin Anda tanyakan?"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-[#090d10]/60 border border-white/10 focus:border-[#ffcc00]/40 rounded-xl py-3.5 px-5 text-xs font-medium text-white placeholder-gray-600 outline-none transition-all duration-300 focus:bg-[#090d10]/90 focus:shadow-[0_0_15px_rgba(255,204,0,0.03)]"
                  />
                </div>

                {/* Row 3: Isi Pesan */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">Isi Pesan</label>
                  <textarea 
                    rows={5}
                    required
                    placeholder="Tulis detail pesan Anda di sini..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-[#090d10]/60 border border-white/10 focus:border-[#ffcc00]/40 rounded-xl py-3.5 px-5 text-xs font-medium text-white placeholder-gray-600 outline-none transition-all duration-300 resize-none focus:bg-[#090d10]/90 focus:shadow-[0_0_15px_rgba(255,204,0,0.03)]"
                  />
                </div>

                {/* Submit Button Neon Glow */}
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#ffcc00] hover:bg-[#e6b800] text-black py-4 rounded-xl font-bold uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(255,204,0,0.15)] hover:shadow-[0_4px_25px_rgba(255,204,0,0.35)] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>Kirim Pesan Sekarang <Send size={12} className="fill-current" /></>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}