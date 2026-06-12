"use client";

import React, { useState } from 'react';
import { Mail, Send, Sparkles } from 'lucide-react';
import Swal from 'sweetalert2';
import { useTheme } from '@/app/context/ThemeContext';

const Newsletter = () => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    Swal.fire({
      title: 'Terima Kasih!',
      text: 'Anda telah berhasil berlangganan newsletter kami.',
      icon: 'success',
      background: isDarkMode ? '#111' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
      confirmButtonColor: '#ffcc00',
    });
    setEmail('');
  };

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-16 py-24 text-left">
      <div className={`relative rounded-[3rem] p-8 md:p-16 overflow-hidden border ${
        isDarkMode 
          ? 'bg-[#0d0d0d] border-white/5 shadow-2xl' 
          : 'bg-white border-black/5 shadow-xl'
      }`}>
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-500 ${
              isDarkMode 
                ? 'bg-[#ffcc00]/5 border-[#ffcc00]/20 text-[#ffcc00]' 
                : 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#b38f00]'
            }`}>
              <Sparkles size={11} /> Stay Updated
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-tight">
              Dapatkan Info <span className="text-[#ffcc00]">Wisata Terbaru</span> Langsung di Email Anda
            </h2>
            <p className={`text-xs md:text-sm leading-relaxed font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Berlangganan newsletter kami untuk mendapatkan penawaran eksklusif, panduan perjalanan, dan berita terbaru seputar destinasi pariwisata di Bandar Lampung.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="email"
                  placeholder="Alamat Email Anda"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full py-5 pl-14 pr-6 rounded-2xl border transition-all duration-300 outline-none text-xs font-bold tracking-wider uppercase ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10 focus:border-[#ffcc00] text-white placeholder-gray-600' 
                      : 'bg-gray-50 border-black/10 focus:border-[#ffcc00] text-black placeholder-gray-400'
                  }`}
                />
              </div>
              <button 
                type="submit"
                className="bg-[#ffcc00] hover:bg-[#ffb300] text-black px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#ffcc00]/20 hover:-translate-y-1 active:scale-95 cursor-pointer"
              >
                Langganan <Send size={14} />
              </button>
            </div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mt-4 px-2">
              * Kami menghargai privasi Anda. Tidak ada spam, hanya info berkualitas.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
