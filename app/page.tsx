"use client";

import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Camera, 
  Plane, 
  Ship, 
  ExternalLink, 
  Mail, 
  Globe,
  Anchor,
  User,
  MessageSquare,
  Share2
} from 'lucide-react';

export default function PariwisataLampung() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, id: string) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

  return (
    <main id="home" className="min-h-screen bg-[#080808] text-white selection:bg-[#ffcc00]/30">
      
      {/* --- SEKSI 1: NAVBAR --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-[#080808]/80 backdrop-blur-md flex justify-between items-center p-8 md:px-20 py-6 border-b border-white/5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#ffcc00] rounded-xl flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(255,204,0,0.3)]">
            L
          </div>
          <span className="font-black tracking-tighter text-2xl uppercase italic text-white">
            Visit<span className="text-[#ffcc00]">BDL</span>
          </span>
        </Link>

        {/* Menu Navigasi */}
        <div className="hidden md:flex gap-10 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">
          <a 
            href="#home" 
            onClick={(e) => handleScroll(e, 'home')} 
            className="text-white border-b-2 border-[#ffcc00] pb-1 cursor-pointer"
          >
            Home
          </a>

          {/* PINDAH HALAMAN: Pakai Link */}
          <Link 
            href="/destinasi" 
            className="hover:text-[#ffcc00] transition-colors cursor-pointer"
          >
            Destinasi
          </Link>
          <Link 
            href="/kontak" 
            className="hover:text-[#ffcc00] transition-colors cursor-pointer"
          >
            kontak
          </Link>


        </div>
      </nav>

      {/* --- SEKSI 2: HERO SECTION --- */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-20 pt-40 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <section className="z-10 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffcc00]/10 border border-[#ffcc00]/20 text-[#ffcc00] text-[10px] font-bold uppercase tracking-widest mb-6">
              <Globe size={14} /> The Gateway of Sumatra
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-4 leading-[0.85] uppercase italic">
              Bandar <br /> 
              <span className="text-[#ffcc00] drop-shadow-[0_0_25px_rgba(255,204,0,0.4)]">Lampung</span>
            </h1>
            
            <div className="flex items-center gap-2 mb-8">
              <h2 className="text-xl md:text-2xl font-light text-gray-300">
                Explore Urban Tourism
              </h2>
              <span className="h-8 w-[2px] bg-[#ffcc00] animate-pulse"></span>
            </div>
            
            <p className="text-gray-400 max-w-lg leading-relaxed mb-10 text-sm md:text-base">
              Rasakan perpaduan sempurna antara petualangan bahari yang eksotis dan gaya hidup urban yang hits. 
              Dari sunrise di Pantai Mutun hingga aroma kopi terbaik dunia.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-12">
              {['Pantai Hitz', 'Siger Tower', 'Ekowisata'].map((tag) => (
                <span key={tag} className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-300 hover:border-[#ffcc00]/50 transition-all">
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons Group */}
            <div className="flex flex-wrap gap-4 mb-16">
              <Link href="/destinasi">
                <button className="bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl flex items-center gap-3 border border-white/10 transition-all shadow-[0_0_30px_rgba(255,204,0,0.1)] group">
                  Lihat Destinasi <ExternalLink size={18} />
                </button>
              </Link>
              <button className="bg-[#0055ff]/10 hover:bg-[#0055ff]/20 px-8 py-4 rounded-2xl flex items-center gap-3 border border-[#0055ff]/30 transition-all text-[#4488ff]">
                Booking <Mail size={18} />
              </button>
            </div>

            {/* Sosmed Icons */}
            <div className="flex gap-8 text-gray-600">
              <User className="hover:text-[#ffcc00] cursor-pointer transition-colors" size={22} />
              <MessageSquare className="hover:text-[#ffcc00] cursor-pointer transition-colors" size={22} />
              <Share2 className="hover:text-[#ffcc00] cursor-pointer transition-colors" size={22} />
            </div>
          </section>

          {/* RIGHT VISUAL INTERFACE */}
          <section className="relative">
            <div className="absolute -inset-10 bg-[#ffcc00]/10 blur-[120px] rounded-full"></div>
            
            <div className="relative bg-[#111111] border border-white/10 rounded-[2.5rem] p-6 md:p-10 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-black">System Online</span>
                  </div>
                  <div className="text-[9px] text-gray-700 font-mono tracking-widest">REGION: BDL // 5.42S 105.26E</div>
              </div>

              <div className="bg-black/60 rounded-[2rem] p-8 border border-white/5 min-h-[350px] relative group overflow-hidden">
                  <div className="flex gap-2 mb-8">
                      <div className="w-12 h-1.5 bg-[#ffcc00]/60 rounded-full"></div>
                      <div className="w-6 h-1.5 bg-white/10 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-5">
                      <div className="h-2 w-full bg-white/5 rounded-full"></div>
                      <div className="h-2 w-5/6 bg-white/5 rounded-full"></div>
                      <div className="h-2 w-3/6 bg-[#ffcc00]/20 rounded-full"></div>
                  </div>

                  {/* Floating Card: Airport */}
                  <div className="absolute top-10 right-6 bg-[#1a1a1a] border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-xl"><Plane size={20} className="text-blue-400" /></div>
                      <div className="text-left">
                        <div className="text-[10px] text-gray-500 font-bold uppercase">Airport</div>
                        <div className="text-xs font-black">Radin Inten II</div>
                      </div>
                  </div>

                  {/* Floating Card: Harbor */}
                  <div className="absolute bottom-12 left-6 bg-[#1a1a1a] border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4">
                      <div className="p-3 bg-green-500/10 rounded-xl"><Ship size={20} className="text-green-400" /></div>
                      <div className="text-left">
                        <div className="text-[10px] text-gray-500 font-bold uppercase">Harbor</div>
                        <div className="text-xs font-black">Bakauheni</div>
                      </div>
                  </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-2xl bg-[#ffcc00]/10 border border-[#ffcc00]/20 flex items-center justify-center text-[#ffcc00]">
                      <Anchor size={24} />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em]">Tourism Hub</div>
                      <div className="text-sm font-bold tracking-tight">Bandar Lampung</div>
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