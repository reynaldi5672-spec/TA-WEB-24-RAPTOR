"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar'; // Pastikan path ini benar sesuai folder kamu
import { 
  Plane, Ship, ExternalLink, Mail, 
  Globe, Anchor, User, MessageSquare, Share2 
} from 'lucide-react';

export default function PariwisataLampung() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main id="home" className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? 'bg-[#080808] text-white' : 'bg-[#fafafa] text-[#1a1a1a]'
    } selection:bg-[#ffcc00]/30`}>
      
      {/* Panggil Navbar Komponen */}
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* --- HERO SECTION --- */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-20 pt-44 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <section className="text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest mb-6 transition-colors duration-500 ${
              isDarkMode ? 'bg-[#ffcc00]/10 border-[#ffcc00]/20 text-[#ffcc00]' : 'bg-[#ffcc00]/15 border-[#ffcc00]/30 text-[#e6b800]'
            }`}>
              <Globe size={14} /> The Gateway of Sumatra
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-4 leading-[0.85] uppercase italic transition-colors duration-500">
              Bandar <br /> 
              <span className="text-[#ffcc00] drop-shadow-[0_0_25px_rgba(255,204,0,0.4)]">Lampung</span>
            </h1>
            
            <div className="flex items-center gap-2 mb-8">
              <h2 className={`text-xl md:text-2xl font-light transition-colors duration-500 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Explore Urban Tourism</h2>
              <span className="h-8 w-[2px] bg-[#ffcc00] animate-pulse"></span>
            </div>
            
            <p className={`max-w-lg leading-relaxed mb-10 text-sm md:text-base transition-colors duration-500 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Rasakan perpaduan sempurna antara petualangan bahari yang eksotis dan gaya hidup urban yang hits di jantung kota Lampung.
            </p>

            {/* Buttons Group */}
            <div className="flex flex-wrap gap-4 mb-16">
              <Link href="/destinasi">
                <button className={`px-8 py-4 rounded-2xl flex items-center gap-3 border transition-all font-bold ${
                  isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' 
                  : 'bg-white border-black/10 hover:bg-gray-50 shadow-lg shadow-black/5 text-[#1a1a1a]'
                }`}>
                  Lihat Destinasi <ExternalLink size={18} />
                </button>
              </Link>
              <button className="bg-[#0055ff] hover:bg-[#0044cc] px-8 py-4 rounded-2xl flex items-center gap-3 text-white font-bold shadow-lg shadow-[#0055ff]/20 transition-all">
                Booking <Mail size={18} />
              </button>
            </div>

            {/* Sosmed Icons */}
            <div className={`flex gap-8 transition-colors duration-500 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              <User className="hover:text-[#ffcc00] cursor-pointer transition-colors" size={22} />
              <MessageSquare className="hover:text-[#ffcc00] cursor-pointer transition-colors" size={22} />
              <Share2 className="hover:text-[#ffcc00] cursor-pointer transition-colors" size={22} />
            </div>
          </section>

          {/* RIGHT VISUAL INTERFACE */}
          <section className="relative">
            <div className={`absolute -inset-10 blur-[120px] rounded-full transition-all duration-700 ${
              isDarkMode ? 'bg-[#ffcc00]/10' : 'bg-[#ffcc00]/25'
            }`}></div>
            
            <div className={`relative border rounded-[2.5rem] p-6 md:p-10 shadow-2xl transition-all duration-500 ${
              isDarkMode ? 'bg-[#111] border-white/10' : 'bg-white border-black/5'
            }`}>
              <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-black">System Live</span>
                  </div>
                  <div className={`text-[9px] font-mono tracking-widest ${isDarkMode ? 'text-gray-700' : 'text-gray-400'}`}>REGION: BDL // 5.42S 105.26E</div>
              </div>

              <div className={`rounded-[2rem] p-8 border min-h-[350px] relative overflow-hidden transition-colors duration-500 ${
                isDarkMode ? 'bg-black/60 border-white/5' : 'bg-[#fcfcfc] border-black/5'
              }`}>
                  <div className="flex gap-2 mb-8">
                      <div className="w-12 h-1.5 bg-[#ffcc00] rounded-full"></div>
                      <div className={`w-6 h-1.5 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}></div>
                  </div>
                  
                  {/* Floating Cards */}
                  <div className={`absolute top-10 right-6 border p-4 rounded-2xl shadow-2xl flex items-center gap-4 transition-all duration-500 ${
                    isDarkMode ? 'bg-[#1a1a1a] border-white/10 text-white' : 'bg-white border-black/5 text-[#1a1a1a]'
                  }`}>
                      <div className="p-3 bg-blue-500/10 rounded-xl"><Plane size={20} className="text-blue-400" /></div>
                      <div className="text-left">
                        <div className="text-[10px] text-gray-500 font-bold uppercase">Airport</div>
                        <div className="text-xs font-black">Radin Inten II</div>
                      </div>
                  </div>

                  <div className={`absolute bottom-12 left-6 border p-4 rounded-2xl shadow-2xl flex items-center gap-4 transition-all duration-500 ${
                    isDarkMode ? 'bg-[#1a1a1a] border-white/10 text-white' : 'bg-white border-black/5 text-[#1a1a1a]'
                  }`}>
                      <div className="p-3 bg-green-500/10 rounded-xl"><Ship size={20} className="text-green-400" /></div>
                      <div className="text-left">
                        <div className="text-[10px] text-gray-500 font-bold uppercase">Harbor</div>
                        <div className="text-xs font-black">Bakauheni</div>
                      </div>
                  </div>

                  {/* Tourism Hub Info */}
                  <div className="absolute bottom-10 right-10 opacity-20">
                    <Anchor size={120} className={isDarkMode ? 'text-white' : 'text-black'} />
                  </div>
              </div>

              <div className="mt-8 flex items-center justify-between text-left">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#ffcc00]/10 border border-[#ffcc00]/20 flex items-center justify-center text-[#ffcc00]">
                      <Anchor size={24} />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em]">Tourism Hub</div>
                      <div className={`text-sm font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>Bandar Lampung</div>
                    </div>
                  </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}