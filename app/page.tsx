"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar'; 
import { 
  ExternalLink, Mail, Globe, Anchor, 
  User, MessageSquare, Share2, ChevronLeft, ChevronRight 
} from 'lucide-react';

// Data Foto Slide Destinasi Lampung (Silakan ganti URL gambarnya sesuai kebutuhan Anda)
const DESTINASI_SLIDES = [
  {
    id: 1,
    title: "Pulau Pahawang",
    category: "Bahari",
    image: "https://awsimages.detik.net.id/community/media/visual/2023/05/11/pulau-pahawang-lampung_169.jpeg?w=1200"
  },
  {
    id: 2,
    title: "Gigi Hiu",
    category: "Pantai Eksotis",
    image: "https://awsimages.detik.net.id/community/media/visual/2023/09/14/pantai-gigi-hiu_169.jpeg?w=1200"
  },
  {
    id: 3,
    title: "Taman Nasional Way Kambas",
    category: "Konservasi",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2LYAdUqyjuyydcRo_slrfg9Meoqe4d2V2xg&s "
  },
];

export default function PariwisataLampung() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // State untuk melacak index foto yang sedang aktif
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Fungsi Navigasi Slider
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === DESTINASI_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? DESTINASI_SLIDES.length - 1 : prev - 1));
  };

  if (!mounted) return null;

  return (
    <main 
      id="home" 
      className={`min-h-screen transition-colors duration-700 relative overflow-hidden font-sans ${
        isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#f8f9fa] text-[#1a1a1a]'
      } selection:bg-[#ffcc00]/30`}
    >
      
      {/* --- BACKGROUND VECTOR DECORATION --- */}
      <div className="absolute top-0 inset-x-0 h-[500px] pointer-events-none opacity-40 select-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className={`absolute bottom-0 h-40 w-full bg-gradient-to-t ${isDarkMode ? 'from-[#050505]' : 'from-[#f8f9fa]'} to-transparent`}></div>
      </div>
      
      {/* Navbar Komponen */}
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* --- HERO SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-40 pb-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT CONTENT (6 Columns) */}
          <section className="lg:col-span-6 text-left space-y-8">
            {/* Tag Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md shadow-sm transition-all duration-500 ${
              isDarkMode 
                ? 'bg-[#ffcc00]/5 border-[#ffcc00]/20 text-[#ffcc00]' 
                : 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#b38f00]'
            }`}>
              <Globe size={12} className="animate-pulse" /> The Gateway of Sumatra
            </div>
            
            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] uppercase tracking-tighter">
                Bandar <br /> 
                <span className="bg-gradient-to-r from-[#ffcc00] to-[#ffb300] bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(255,204,0,0.15)]">
                  Lampung
                </span>
              </h1>
            </div>
            
            {/* Sub-heading */}
            <div className="flex items-center gap-3">
              <span className="h-6 w-1 bg-[#ffcc00] rounded-full"></span>
              <h2 className={`text-lg md:text-xl font-medium tracking-wide transition-colors duration-500 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Explore Urban Tourism
              </h2>
            </div>
            
            {/* Description */}
            <p className={`max-w-xl leading-relaxed text-sm md:text-base font-normal transition-colors duration-500 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Rasakan perpaduan sempurna antara petualangan bahari yang eksotis dan gaya hidup urban yang dinamis tepat di jantung gerbang pulau Sumatra.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/destinasi">
                <button className={`px-8 py-4 rounded-xl flex items-center gap-2.5 border transition-all duration-300 font-bold text-xs uppercase tracking-wider cursor-pointer hover:-translate-y-0.5 ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white hover:border-white/20' 
                    : 'bg-white border-black/10 hover:bg-gray-50 shadow-sm text-[#1a1a1a] hover:border-black/20'
                }`}>
                  Lihat Destinasi <ExternalLink size={14} />
                </button>
              </Link>
              
              <button className="bg-[#0055ff] hover:bg-[#0044cc] px-8 py-4 rounded-xl flex items-center gap-2.5 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#0055ff]/15 hover:shadow-[#0055ff]/25 hover:-translate-y-0.5 transition-all cursor-pointer">
                Booking <Mail size={14} />
              </button>
            </div>

            {/* Social Media Links */}
            <div className="pt-4 space-y-3">
              <span className={`text-[10px] font-bold uppercase tracking-widest block ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>Connect With Us</span>
              <div className={`flex gap-5 transition-colors duration-500 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <User className="hover:text-[#ffcc00] cursor-pointer transition-all hover:scale-110" size={18} />
                <MessageSquare className="hover:text-[#ffcc00] cursor-pointer transition-all hover:scale-110" size={18} />
                <Share2 className="hover:text-[#ffcc00] cursor-pointer transition-all hover:scale-110" size={18} />
              </div>
            </div>
          </section>

          {/* RIGHT VISUAL INTERFACE (6 Columns - Digandeng untuk Slider Luas) */}
          <section className="lg:col-span-6 relative mt-8 lg:mt-0">
            {/* Glow Aura Background Effect */}
            <div className={`absolute -inset-4 blur-[100px] rounded-full transition-all duration-700 pointer-events-none z-0 ${
              isDarkMode ? 'bg-[#ffcc00]/5' : 'bg-[#ffcc00]/10'
            }`}></div>
            
            {/* Main Card Terminal Container */}
            <div className={`relative border rounded-[2rem] p-6 md:p-8 transition-all duration-500 z-10 ${
              isDarkMode ? 'bg-[#0d0d0d]/90 border-white/5 shadow-2xl' : 'bg-white border-black/[0.05] shadow-xl'
            }`}>
              
              {/* Card Header Title */}
              <div className="flex justify-between items-center mb-5">
                <h3 className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  Pilih Tempat Anda
                </h3>
                <div className={`text-[9px] font-mono tracking-wider ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                  SLIDE // {currentSlide + 1} OF {DESTINASI_SLIDES.length}
                </div>
              </div>

              {/* --- IMAGE SLIDER CONTAINER --- */}
              <div className="relative h-80 rounded-2xl overflow-hidden group shadow-inner">
                {/* Image Rendering */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={DESTINASI_SLIDES[currentSlide].image} 
                  alt={DESTINASI_SLIDES[currentSlide].title}
                  className="w-full h-full object-cover transition-all duration-750 scale-100 group-hover:scale-105" 
                />

                {/* Gradient Overlay Teks di Atas Foto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-left">
                  <span className="text-[9px] font-black uppercase bg-[#ffcc00] text-black px-2 py-0.5 rounded w-max mb-1.5 tracking-wider">
                    {DESTINASI_SLIDES[currentSlide].category}
                  </span>
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">
                    {DESTINASI_SLIDES[currentSlide].title}
                  </h4>
                </div>

                {/* Tombol Geser Kiri (Prev) */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-black/40 hover:bg-black/70 border border-white/10 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Tombol Geser Kanan (Next) */}
                <button 
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-black/40 hover:bg-black/70 border border-white/10 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* --- SLIDER NAVIGATION & ACTIONS CONTROLS --- */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                
                {/* Dots Indicators */}
                <div className="flex gap-2">
                  {DESTINASI_SLIDES.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentSlide === index ? 'w-6 bg-[#ffcc00]' : 'w-2 bg-gray-500/40'
                      }`}
                    />
                  ))}
                </div>

                {/* Detail Information Footer */}
                <div className="flex items-center gap-3 text-left">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                    isDarkMode ? 'bg-[#ffcc00]/5 border-[#ffcc00]/20 text-[#ffcc00]' : 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#b38f00]'
                  }`}>
                    <Anchor size={16} className="animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[8px] text-gray-400 uppercase font-bold tracking-[0.15em]">Tourism Hub</div>
                    <Link href="/destinasi" className={`text-xs font-bold tracking-tight hover:underline flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
                      View Detail <ExternalLink size={10} />
                    </Link>
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