"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

export default function KontakPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi pengiriman pesan (Bisa kamu hubungkan ke API route nanti)
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
    <main className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? 'bg-[#080808] text-white' : 'bg-[#fafafa] text-[#1a1a1a]'
    }`}>
      
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <div className="max-w-[1400px] mx-auto px-8 md:px-20 pt-44 pb-20">
        
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* --- LEFT SIDE: INFO & SOSMED --- */}
          <section>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest mb-6 ${
              isDarkMode ? 'bg-[#ffcc00]/10 border-[#ffcc00]/20 text-[#ffcc00]' : 'bg-[#ffcc00]/15 border-[#ffcc00]/30 text-[#e6b800]'
            }`}>
              <MessageSquare size={14} /> Get In Touch
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8 leading-[0.85] uppercase italic">
              Hubungi <br /> 
              <span className="text-[#ffcc00] drop-shadow-[0_0_25px_rgba(255,204,0,0.4)]">Kami</span>
            </h1>

            <p className={`text-sm md:text-base leading-relaxed mb-12 max-w-md ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Punya pertanyaan seputar wisata di Bandar Lampung? Atau mau kerja sama bareng VisitBDL? Langsung aja drop pesan di samping ya!
            </p>

            {/* Contact Details */}
            <div className="space-y-8">
              {[
                { icon: Mail, label: 'Email', value: 'hello@visitbdl.com', color: 'text-blue-400' },
                { icon: Phone, label: 'WhatsApp', value: '+62 812 3456 7890', color: 'text-green-400' },
                { icon: MapPin, label: 'Office', value: 'Bandar Lampung, Indonesia', color: 'text-red-400' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
                    isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-black/5 shadow-sm text-black'
                  }`}>
                    <item.icon size={24} className={item.color} />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.label}</div>
                    <div className="text-lg font-black">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- RIGHT SIDE: FORM --- */}
          <section>
            <div className={`relative p-8 md:p-12 rounded-[2.5rem] border transition-all duration-500 ${
              isDarkMode ? 'bg-[#111] border-white/10' : 'bg-white border-black/5 shadow-2xl shadow-black/[0.03]'
            }`}>
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Nama Lengkap</label>
                    <input 
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full bg-transparent border rounded-2xl py-4 px-6 outline-none transition-all ${
                        isDarkMode ? 'border-white/10 focus:border-[#ffcc00] text-white' : 'border-black/10 focus:border-[#ffcc00] text-black'
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Email Address</label>
                    <input 
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full bg-transparent border rounded-2xl py-4 px-6 outline-none transition-all ${
                        isDarkMode ? 'border-white/10 focus:border-[#ffcc00] text-white' : 'border-black/10 focus:border-[#ffcc00] text-black'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Subjek</label>
                  <input 
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className={`w-full bg-transparent border rounded-2xl py-4 px-6 outline-none transition-all ${
                      isDarkMode ? 'border-white/10 focus:border-[#ffcc00] text-white' : 'border-black/10 focus:border-[#ffcc00] text-black'
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Pesan</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full bg-transparent border rounded-2xl py-4 px-6 outline-none transition-all resize-none ${
                      isDarkMode ? 'border-white/10 focus:border-[#ffcc00] text-white' : 'border-black/10 focus:border-[#ffcc00] text-black'
                    }`}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#ffcc00] text-black py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#ffcc00]/20 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>{'Kirim Pesan Sekarang'} <Send size={18} /></>}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}