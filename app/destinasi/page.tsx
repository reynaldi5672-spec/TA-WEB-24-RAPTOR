"use client";

import React from 'react';
import Link from 'next/link';
import { 
    LayoutGrid, 
  Award, 
  Search, 
  MapPin,  
  Palmtree,
  UtensilsCrossed,
  Flame,
  Plane, 
  ChevronRight,
  Globe,
  Compass
} from 'lucide-react';

export default function DestinasiLampung() {
  // Fungsi Smooth Scroll untuk ID internal
  const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
    const element = document.getElementById(id);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] text-white selection:bg-[#ff4d4d]/30">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-[#080808]/80 backdrop-blur-md flex justify-between items-center p-8 md:px-20 py-6 border-b border-white/5">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 bg-[#ffcc00] rounded-xl flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(255,204,0,0.3)] group-hover:scale-110 transition-transform">
            L
          </div>
          <span className="font-black tracking-tighter text-2xl uppercase italic text-white">
            Visit<span className="text-[#ffcc00]">BDL</span>
          </span>
        </Link>

        {/* Menu Navigasi */}
        <div className="hidden md:flex gap-10 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>

          <a 
            href="#destinasi" 
            onClick={(e) => handleScroll(e, 'destinasi')} 
            className="text-white border-b-2 border-[#ff4d4d] pb-1 cursor-pointer"
          >
            Destinasi
          </a>

          <Link 
            href="/kontak" 
            className="hover:text-[#ffcc00] transition-colors cursor-pointer"
          >
            kontak
          </Link>
        </div>
      </nav>

      {/* --- SEKSI 1: HERO (Ringkasan) --- */}
      <section id="home" className="grid lg:grid-cols-2 gap-16 items-center px-8 md:px-20 pt-40 pb-20 relative overflow-hidden">
        {/* Glow Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ffcc00]/5 blur-[120px] rounded-full -z-10"></div>
        
        <div className="z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffcc00]/10 border border-[#ffcc00]/20 text-[#ffcc00] text-[10px] font-bold uppercase tracking-widest mb-6">
            <Globe size={14} /> The Gateway of Sumatra
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-4 leading-[0.85] uppercase italic">
            Bandar <br /> 
            <span className="text-[#ffcc00] drop-shadow-[0_0_25px_rgba(255,204,0,0.4)]">Lampung</span>
          </h1>
          <p className="text-gray-400 max-w-lg leading-relaxed mb-10 text-lg">
            Jelajahi perpaduan sempurna antara petualangan bahari yang eksotis dan gaya hidup urban yang hits di jantung Lampung.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={(e) => handleScroll(e, 'destinasi')}
              className="bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl flex items-center gap-3 border border-white/10 transition-all group"
            >
              Mulai Jelajah <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Visual Card Kanan */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-[#ffcc00]/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-[#111111] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
              <div className="flex justify-between items-center mb-10 text-[10px] text-gray-500 font-black tracking-widest">
                  <span className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> SYSTEM LIVE</span>
                  <span>DATA REGION // 05.4292° S</span>
              </div>
              <div className="bg-black/60 rounded-[2rem] p-8 border border-white/5 min-h-[300px] relative overflow-hidden">
                  <div className="space-y-4">
                      <div className="h-2 w-3/4 bg-[#ffcc00]/20 rounded-full"></div>
                      <div className="h-2 w-1/2 bg-white/5 rounded-full"></div>
                      <div className="h-2 w-2/3 bg-white/5 rounded-full"></div>
                  </div>
                  {/* Floating Element */}
                  <div className="absolute top-10 right-4 bg-[#1a1a1a] border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce-slow">
                     <Plane className="text-blue-400" size={20} />
                     <span className="text-[10px] font-bold uppercase">Airport Active</span>
                  </div>
              </div>
          </div>
        </div>
      </section>

      {/* --- SEKSI 2: ABOUT / DESTINASI (Style "About Me") --- */}
      <section id="destinasi" className="px-8 md:px-20 py-32 relative overflow-hidden">
        {/* Glow Merah di belakang foto */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#ff4d4d]/10 blur-[150px] rounded-full -z-10"></div>

        {/* Judul Tengah */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase italic">
            About <span className="text-[#ff4d4d]">Us</span>
          </h2>
          <div className="flex items-center justify-center gap-4 text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold">
            <div className="h-[1px] w-12 bg-[#ff4d4d]"></div>
            <div className="flex items-center gap-2">
                <Compass size={14} className="text-[#ff4d4d]" />
                <span>Transforming travel into experiences</span>
            </div>
            <div className="h-[1px] w-12 bg-[#ff4d4d]"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Teks Informasi Kiri */}
          <div className="order-2 lg:order-1">
            <h3 className="text-[#ff4d4d] text-2xl font-bold mb-4 italic tracking-tight">Halo, Selamat Datang di</h3>
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-[1] uppercase italic">
              Puncak Mas <br /> 
              <span className="text-white">& Pesisir BDL</span>
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg mb-10 max-w-xl border-l-2 border-white/10 pl-6">
              Destinasi pilihan yang menawarkan pemandangan kota Bandar Lampung dari ketinggian, 
              lengkap dengan wahana foto yang ikonik dan udara yang sejuk. Kami berkomitmen memberikan 
              pengalaman wisata yang ramah, aman, dan tentunya sangat instagramable untuk keluarga maupun anak muda.
            </p>
            
            {/* Box Quote (Style Persis Foto) */}
            <div className="bg-gradient-to-r from-[#ff4d4d]/10 to-transparent border-l-4 border-[#ff4d4d] p-8 rounded-r-2xl shadow-xl backdrop-blur-sm">
              <p className="italic text-gray-300 text-sm">
               &quot;Menghadirkan pesona alam Lampung sebagai alat profesional untuk kebahagiaan Anda, bukan sekadar tempat singgah yang biasa.&quot;
               </p>
            </div>
          </div>

          {/* Foto Profil Melingkar (Kanan) */}
          <div className="order-1 lg:order-2 flex justify-center items-center relative">
            {/* Outer Glow Effect */}
            <div className="absolute w-[380px] h-[380px] md:w-[500px] md:h-[500px] bg-[#ff4d4d]/20 blur-[100px] rounded-full animate-pulse"></div>
            
            {/* Circle Frame */}
            <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] rounded-full border-[12px] border-[#161616] overflow-hidden shadow-[0_0_60px_rgba(255,77,77,0.2)]">
               <img 
                src="https://images.unsplash.com/photo-1596438611193-8025268393fd?q=80&w=1000" 
                alt="Pariwisata Lampung" 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
               />
               {/* Overlay Halus */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 text-center">
        <div className="opacity-20 text-[10px] tracking-[1.5em] uppercase font-bold text-white mb-4">
            Visit Bandar Lampung — 2026
        </div>
        <div className="h-[1px] w-20 bg-[#ff4d4d]/30 mx-auto"></div>
      </footer>

      {/* Custom Global Style untuk Animasi Pelan */}
      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
          
      `}</style>
      {/* --- SEKSI 3: SHOWCASE (Lanjutan di bawah About) --- */}
      <section id="portfolio" className="py-24 px-8 md:px-20 bg-[#080808] relative">
        
        {/* Header Seksi */}
        <div className="text-center mb-16">
          <h2 className="text-[#ff4d4d] text-5xl md:text-6xl font-black mb-4 uppercase italic tracking-tighter">
            Portfolio <span className="text-white">Showcase</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            Jelajahi berbagai kategori wisata unggulan di Bandar Lampung. Setiap bagian mewakili keindahan dan keunikan pengalaman yang kami tawarkan.
          </p>
        </div>

        {/* --- TABS FILTER UTAMA (Gaya Portfolio) --- */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-3 gap-1 bg-white/5 border border-white/10 p-2 rounded-[2rem] backdrop-blur-xl">
            <button className="flex flex-col md:flex-row items-center justify-center gap-3 py-6 rounded-2xl bg-[#ff4d4d]/20 text-[#ff4d4d] border border-[#ff4d4d]/30 shadow-[0_0_30px_rgba(255,77,77,0.1)]">
              <LayoutGrid size={24} />
              <span className="font-bold uppercase tracking-widest text-[10px] md:text-xs">Destinasi</span>
            </button>
            
            <button className="flex flex-col md:flex-row items-center justify-center gap-3 py-6 rounded-2xl text-gray-500 hover:text-gray-300 transition-all">
              <Award size={24} />
              <span className="font-bold uppercase tracking-widest text-[10px] md:text-xs">Kuliner</span>
            </button>

            <button className="flex flex-col md:flex-row items-center justify-center gap-3 py-6 rounded-2xl text-gray-500 hover:text-gray-300 transition-all">
              <Search size={24} />
              <span className="font-bold uppercase tracking-widest text-[10px] md:text-xs">Event</span>
            </button>
          </div>
        </div>

        {/* --- SUB-FILTER BUTTONS (Gaya Project, Design, Editing) --- */}
        <div className="flex justify-center gap-3 mb-16">
          <button className="px-8 py-2 rounded-full bg-[#ff4d4d] text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">
            Terpopuler
          </button>
          <button className="px-8 py-2 rounded-full border border-white/10 bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:border-[#ff4d4d]/50 transition-all">
            Terbaru
          </button>
          <button className="px-8 py-2 rounded-full border border-white/10 bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:border-[#ff4d4d]/50 transition-all">
            Hitz
          </button>
        </div>

 {/* --- GRID KONTEN --- */}
        <div className="max-w-[1400px] mx-auto mt-12 px-4 md:px-10"> 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* --- KARTU 1: PUNCAK MAS --- */}
            <div className="group relative bg-[#111111] border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-[#ff4d4d]/50 transition-all duration-500 shadow-2xl">
              <div className="h-64 md:h-80 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1596438611193-8025268393fd?q=80&w=1000" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" 
                  alt="Puncak Mas" 
                />
                <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold text-[#ff4d4d] uppercase tracking-widest">
                  Top Rated
                </div>
              </div>
              <div className="p-8 text-left">
                <h4 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mb-3 italic">Visit BDL Showcase</h4>
                <h3 className="text-2xl font-black mb-4 group-hover:text-[#ff4d4d] transition-colors uppercase italic tracking-tighter">Puncak Mas Lampung</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-2">Destinasi wisata dengan pemandangan kota Bandar Lampung terbaik dari ketinggian bukit.</p>
                <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 font-bold text-[10px] uppercase tracking-widest group-hover:bg-[#ff4d4d] group-hover:text-white transition-all">
                  Explore More <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* --- KARTU 2: TAHURA --- */}
            <div className="group relative bg-[#111111] border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-[#ff4d4d]/50 transition-all duration-500 shadow-2xl">
              <div className="h-64 md:h-80 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" 
                  alt="Tahura" 
                />
                <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold text-[#ff4d4d] uppercase tracking-widest">
                  Nature
                </div>
              </div>
              <div className="p-8 text-left">
                <h4 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mb-3 italic">Visit BDL Showcase</h4>
                <h3 className="text-2xl font-black mb-4 group-hover:text-[#ff4d4d] transition-colors uppercase italic tracking-tighter">Tahura Wan Abdul</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-2">Kawasan konservasi hutan raya yang asri dengan udara sejuk dan trekking yang menantang.</p>
                <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 font-bold text-[10px] uppercase tracking-widest group-hover:bg-[#ff4d4d] group-hover:text-white transition-all">
                  Explore More <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* --- KARTU 3: BUKIT ASLAN --- */}
            <div className="group relative bg-[#111111] border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-[#ff4d4d]/50 transition-all duration-500 shadow-2xl">
              <div className="h-64 md:h-80 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" 
                  alt="Bukit Aslan" 
                />
                <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold text-[#ff4d4d] uppercase tracking-widest">
                  Must Visit
                </div>
              </div>
              <div className="p-8 text-left">
                <h4 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mb-3 italic">Visit BDL Showcase</h4>
                <h3 className="text-2xl font-black mb-4 group-hover:text-[#ff4d4d] transition-colors uppercase italic tracking-tighter">Bukit Aslan</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-2">Perpaduan seni, alam, dan teknologi dengan pemandangan Teluk Lampung yang ikonik.</p>
                <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 font-bold text-[10px] uppercase tracking-widest group-hover:bg-[#ff4d4d] group-hover:text-white transition-all">
                  Explore More <ChevronRight size={14} />
                </button>
              </div>
            </div>
            {/* --- 1. PENUTUP GRID KARTU --- */}
        </div> 
      </div> 
    </section>

    {/* --- 2. FOOTER (DI LUAR SECTION AGAR BISA FULL LEBAR) --- */}
    <footer className="w-full bg-[#080808] pt-20 pb-10 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Grid Utama Footer: 4 Kolom di Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Kolom 1: Brand */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase">
              FAZRI<span className="text-[#ff4d4d]">LUKMAN</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Membangun pengalaman digital yang luar biasa dengan fokus pada performa dan estetika.
            </p>
          </div>

          {/* Kolom 2: Navigation */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-6">Navigation</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#ff4d4d] transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-[#ff4d4d] transition-colors">About</a></li>
              <li><a href="#" className="hover:text-[#ff4d4d] transition-colors">Portfolio</a></li>
            </ul>
          </div>

          {/* Kolom 3: Connect */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-6">Connect</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#ff4d4d] transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-[#ff4d4d] transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-[#ff4d4d] transition-colors">GitHub</a></li>
            </ul>
          </div>

          {/* Kolom 4: Newsletter */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-6">Stay Updated</h4>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#ff4d4d]/50"
              />
              <button className="w-full py-3 bg-[#ff4d4d] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#e63e3e] transition-all">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        {/* Baris Bawah: Copyright */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          <p>© 2026 FAZRI LUKMAN. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>

    </main>
  );
}
          