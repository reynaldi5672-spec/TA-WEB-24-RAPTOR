"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar'; 
import Footer from '@/app/components/Footer';
import WeatherWidget from '@/app/components/WeatherWidget';
import Newsletter from '@/app/components/Newsletter';
import { useTheme } from '@/app/context/ThemeContext';
import { 
  Compass, MapPin, Star, ArrowRight, ChevronLeft, ChevronRight,
  ShieldCheck, Heart, Camera, HelpCircle, Activity, Award,
  Users, CheckCircle2, Plus, Minus, ExternalLink, Sparkles
} from 'lucide-react';
import Swal from 'sweetalert2';

interface Destinasi {
  id: number;
  nama: string;
  lokasi: string;
  deskripsi: string;
  gambar_url: string;
  rating: number;
  is_viral: boolean;
  kategori: string;
}

const HERO_SLIDES = [
  {
    id: 1,
    title: "Pulau Pahawang",
    category: "Bahari",
    image: "https://awsimages.detik.net.id/community/media/visual/2023/05/11/pulau-pahawang-lampung_169.jpeg?w=1200",
    desc: "Surga snorkeling dengan keindahan terumbu karang dan pasir putih yang memukau."
  },
  {
    id: 2,
    title: "Pantai Gigi Hiu",
    category: "Eksotis",
    image: "https://awsimages.detik.net.id/community/media/visual/2023/09/14/pantai-gigi-hiu_169.jpeg?w=1200",
    desc: "Gugusan batu karang tajam yang berdiri kokoh menghadapi deburan ombak Samudra Hindia."
  },
  {
    id: 3,
    title: "Way Kambas",
    category: "Konservasi",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2LYAdUqyjuyydcRo_slrfg9Meoqe4d2V2xg&s",
    desc: "Pusat konservasi gajah sumatra yang ramah lingkungan dan kaya edukasi flora-fauna."
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rian Hidayat",
    role: "Travel Photographer",
    comment: "Keindahan Pulau Pahawang benar-benar menakjubkan. Snorkeling di sana dengan terumbu karang yang sehat adalah salah satu pengalaman terbaik hidup saya!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Aura Salsabila",
    role: "Travel Blogger",
    comment: "Gigi Hiu sangat epik untuk fotografi landscape. Website pariwisata Wisata Bandar Lampung ini sangat membantu saya dalam membandingkan destinasi dengan akurat!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Budi Santoso",
    role: "Family Traveler",
    comment: "Taman Nasional Way Kambas sangat edukatif untuk anak-anak. Fitur cuaca real-time di web ini memudahkan kami merencanakan waktu keberangkatan.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  }
];

const FAQS = [
  {
    question: "Bagaimana cara menuju kota Bandar Lampung?",
    answer: "Bandar Lampung dapat diakses dengan sangat mudah via darat, laut, maupun udara. Bandara Radin Inten II melayani penerbangan domestik utama, kapal feri di Pelabuhan Bakauheni menghubungkan pulau Jawa dengan Sumatra, dan Tol Trans Sumatra mempermudah perjalanan darat."
  },
  {
    question: "Kapan waktu terbaik untuk berkunjung ke pantai-pantai di Lampung?",
    answer: "Waktu terbaik berkunjung adalah di musim kemarau antara bulan Mei hingga September. Selama periode ini, gelombang laut cenderung tenang, air laut jernih untuk snorkeling, dan sinar matahari maksimal untuk berfoto."
  },
  {
    question: "Apakah objek wisata pariwisata di Lampung ramah anak-anak?",
    answer: "Tentu! Banyak destinasi pariwisata seperti Way Kambas, Pantai Sari Ringgung, dan berbagai wisata bukit di Bandar Lampung telah dilengkapi fasilitas bermain, restoran, toilet bersih, serta ramah untuk dikunjungi bersama keluarga."
  },
  {
    question: "Bagaimana cara memesan jasa pemandu lokal yang berlisensi?",
    answer: "Anda dapat menghubungi pusat informasi Dinas Pariwisata secara resmi melalui email atau nomor telepon yang tertera di bagian bawah (footer) website ini, atau bertanya di pos loket resmi di masing-masing lokasi destinasi utama."
  }
];

export default function PariwisataLampung() {
  const { isDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [destinasiUnggulan, setDestinasiUnggulan] = useState<Destinasi[]>([]);
  const [loadingDestinasi, setLoadingDestinasi] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Fetch dynamic destinations from database
  useEffect(() => {
    setMounted(true);
    const fetchDestinasi = async () => {
      try {
        const response = await fetch('/api/destinasi');
        const data = await response.json();
        if (Array.isArray(data)) {
          // Sort by rating desc or take dynamic selections
          const sorted = data.sort((a, b) => b.rating - a.rating).slice(0, 3);
          setDestinasiUnggulan(sorted);
        }
      } catch (err) {
        console.error("Gagal mengambil data destinasi unggulan:", err);
      } finally {
        setLoadingDestinasi(false);
      }
    };
    fetchDestinasi();
  }, []);

  // Slide navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(nextSlide, 7000); // Auto slide every 7 seconds
    return () => clearInterval(interval);
  }, [mounted]);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  if (!mounted) return null;

  return (
    <main 
      id="home" 
      className={`min-h-screen transition-colors duration-700 relative overflow-hidden font-sans ${
        isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#f8f9fa] text-[#1a1a1a]'
      } selection:bg-[#ffcc00]/30`}
    >
      
      {/* --- BACKGROUND PATTERNS & GRADIENTS --- */}
      <div className="absolute top-0 inset-x-0 h-[800px] pointer-events-none opacity-45 select-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#80808015_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        <div className={`absolute bottom-0 h-96 w-full bg-gradient-to-t ${isDarkMode ? 'from-[#050505]' : 'from-[#f8f9fa]'} to-transparent`}></div>
      </div>
      
      {/* Navbar component */}
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-40 pb-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* HERO LEFT (6 Columns) */}
          <section className="lg:col-span-6 text-left space-y-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.25em] backdrop-blur-md shadow-sm transition-all duration-500 ${
              isDarkMode 
                ? 'bg-[#ffcc00]/5 border-[#ffcc00]/20 text-[#ffcc00]' 
                : 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#b38f00]'
            }`}>
              <Sparkles size={11} className="animate-pulse" /> The Gateway of Sumatra
            </div>
            
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] uppercase tracking-tighter">
                Bandar <br /> 
                <span className="bg-gradient-to-r from-[#ffcc00] to-[#ffb300] bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(255,204,0,0.15)]">
                  Lampung
                </span>
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="h-6 w-1 bg-[#ffcc00] rounded-full"></span>
              <h2 className={`text-lg md:text-xl font-bold tracking-wide transition-colors duration-500 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Jelajahi Surga Pariwisata Urban & Bahari
              </h2>
            </div>
            
            <p className={`max-w-xl leading-relaxed text-sm md:text-base font-normal transition-colors duration-500 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Rasakan harmoni keindahan pantai eksotis, cagar alam flora-fauna berkelas dunia, hingga kehangatan budaya lokal di Bandar Lampung. Rencanakan liburan impian Anda bersama kami.
            </p>

            {/* Weather Widget Integrated in Hero */}
            <div className="max-w-md">
              <WeatherWidget />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/destinasi">
                <button className="bg-[#ffcc00] hover:bg-[#ffb300] text-black px-8 py-4 rounded-xl flex items-center gap-2.5 font-black text-xs uppercase tracking-widest shadow-lg shadow-[#ffcc00]/15 hover:shadow-[#ffcc00]/35 hover:-translate-y-0.5 transition-all cursor-pointer">
                  Mulai Jelajahi <ArrowRight size={14} />
                </button>
              </Link>
              
              <Link href="/kontak">
                <button className={`px-8 py-4 rounded-xl flex items-center gap-2.5 border transition-all duration-300 font-bold text-xs uppercase tracking-wider cursor-pointer hover:-translate-y-0.5 ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white hover:border-white/20' 
                    : 'bg-white border-black/10 hover:bg-gray-100 shadow-sm text-[#1a1a1a] hover:border-black/20'
                }`}>
                  Hubungi Dinas <Camera size={14} />
                </button>
              </Link>
            </div>
          </section>

          {/* HERO RIGHT (6 Columns - Large Slider) */}
          <section className="lg:col-span-6 relative mt-8 lg:mt-0">
            <div className={`absolute -inset-4 blur-[120px] rounded-full transition-all duration-700 pointer-events-none z-0 ${
              isDarkMode ? 'bg-[#ffcc00]/5' : 'bg-[#ffcc00]/10'
            }`}></div>
            
            <div className={`relative border rounded-[2.5rem] p-6 md:p-8 transition-all duration-500 z-10 ${
              isDarkMode ? 'bg-[#0d0d0d]/90 border-white/5 shadow-2xl' : 'bg-white border-black/[0.05] shadow-xl'
            }`}>
              
              <div className="flex justify-between items-center mb-5">
                <h3 className={`text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  Rekomendasi Utama
                </h3>
                <div className={`text-[9px] font-mono font-bold tracking-wider ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                  0{currentSlide + 1} // 0{HERO_SLIDES.length}
                </div>
              </div>

              {/* Slider Image Window */}
              <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden group shadow-inner">
                <img 
                  src={HERO_SLIDES[currentSlide].image} 
                  alt={HERO_SLIDES[currentSlide].title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                />

                {/* Info Overlay inside Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8 text-left">
                  <span className="text-[9px] font-black uppercase bg-[#ffcc00] text-black px-2.5 py-1 rounded-md w-max mb-2 tracking-widest">
                    {HERO_SLIDES[currentSlide].category}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight italic">
                    {HERO_SLIDES[currentSlide].title}
                  </h4>
                  <p className="text-white/70 text-xs font-medium max-w-sm mt-2 leading-relaxed">
                    {HERO_SLIDES[currentSlide].desc}
                  </p>
                </div>

                {/* Manual Arrows */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-black/45 hover:bg-black/80 border border-white/10 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>

                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-black/45 hover:bg-black/80 border border-white/10 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Progress Slider Dots */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                  {HERO_SLIDES.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentSlide === index ? 'w-8 bg-[#ffcc00]' : 'w-2 bg-gray-500/40'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3 text-left">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                    isDarkMode ? 'bg-[#ffcc00]/5 border-[#ffcc00]/20 text-[#ffcc00]' : 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#b38f00]'
                  }`}>
                    <Compass size={16} className="animate-spin [animation-duration:15s]" />
                  </div>
                  <div>
                    <div className="text-[8px] text-gray-500 uppercase font-bold tracking-[0.15em]">Eksplorasi</div>
                    <Link href="/destinasi" className={`text-xs font-black tracking-tight hover:underline flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
                      Semua Destinasi <ExternalLink size={10} />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>

      {/* --- STATISTICS GRID BANNER --- */}
      <section className={`py-12 border-y transition-colors duration-500 ${
        isDarkMode ? 'bg-white/[0.01] border-white/5' : 'bg-gray-50 border-black/5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-1">
              <h3 className="text-3xl md:text-4xl font-black uppercase italic text-[#ffcc00] tracking-tighter">50+</h3>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Destinasi Wisata</p>
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-3xl md:text-4xl font-black uppercase italic text-blue-500 tracking-tighter">15k+</h3>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Wisatawan Aktif</p>
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-3xl md:text-4xl font-black uppercase italic text-emerald-500 tracking-tighter">4.8</h3>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Rating Kepuasan</p>
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-3xl md:text-4xl font-black uppercase italic text-purple-500 tracking-tighter">100%</h3>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Keamanan Terjamin</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: DYNAMIC SHOWCASE (DESTINASI UNGGULAN) --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24 text-left space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8 border-gray-500/10">
          <div className="space-y-3">
            <div className="text-[#ffcc00] text-[10px] font-black uppercase tracking-[0.2em]">Destinasi Pilihan Terbaik</div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight italic">
              Destinasi <span className="text-[#ffcc00]">Unggulan</span> Lampung
            </h2>
            <p className={`text-xs md:text-sm font-medium max-w-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Daftar lokasi wisata terpopuler yang paling diminati pengunjung saat ini, diambil langsung secara dinamis berdasarkan rating tertinggi.
            </p>
          </div>
          <Link href="/destinasi">
            <button className={`px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] flex items-center gap-2 border transition-all duration-300 hover:scale-105 cursor-pointer ${
              isDarkMode 
                ? 'bg-white/5 border-white/5 hover:bg-[#ffcc00] hover:text-black' 
                : 'bg-white border-black/10 hover:bg-[#ffcc00] hover:text-black shadow-sm'
            }`}>
              Semua Wisata <ArrowRight size={12} />
            </button>
          </Link>
        </div>

        {/* Dynamic Cards Grid */}
        {loadingDestinasi ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="h-10 w-10 border-4 border-[#ffcc00] border-t-transparent rounded-full animate-spin"></span>
            <p className="text-[10px] font-black uppercase tracking-widest mt-4 text-gray-500">Memuat Destinasi Pilihan...</p>
          </div>
        ) : destinasiUnggulan.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {destinasiUnggulan.map((item) => {
              const mainImg = item.gambar_url ? item.gambar_url.split(',')[0].trim() : 'https://via.placeholder.com/800x600?text=No+Image';
              return (
                <div 
                  key={item.id}
                  className={`group rounded-[2.5rem] overflow-hidden border transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between ${
                    isDarkMode 
                      ? 'bg-[#0d0d0d] border-white/5 hover:border-white/10' 
                      : 'bg-white border-black/[0.04] shadow-sm hover:shadow-xl'
                  }`}
                >
                  <div className="h-64 w-full relative overflow-hidden bg-gray-900">
                    <img 
                      src={mainImg} 
                      alt={item.nama}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-5 right-5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl flex items-center gap-1 text-[#ffcc00] text-xs font-black border border-white/10">
                      <Star size={12} fill="#ffcc00" /> {Number(item.rating).toFixed(1)}
                    </div>

                    {/* Viral Badge */}
                    {item.is_viral && (
                      <span className="absolute bottom-5 left-5 bg-red-600 border border-red-500 text-white px-3 py-1 rounded-xl text-[8px] font-black uppercase tracking-wider animate-pulse">
                        🔥 POPULER
                      </span>
                    )}
                  </div>

                  <div className="p-8 text-left flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1 text-[#ffcc00] text-[9px] font-black uppercase tracking-wider">
                        <MapPin size={12} /> {item.lokasi}
                      </div>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight italic transition-colors group-hover:text-[#ffcc00]">
                        {item.nama}
                      </h3>
                      <p className={`text-xs leading-relaxed line-clamp-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.deskripsi}
                      </p>
                    </div>

                    <Link href={`/destinasi?id=${item.id}`}>
                      <button className={`w-full py-4 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                        isDarkMode 
                          ? 'bg-white/5 hover:bg-[#ffcc00] hover:text-black border border-white/5' 
                          : 'bg-[#1a1a1a] text-white hover:bg-[#ffcc00] hover:text-black'
                      }`}>
                        Lihat Detail <ArrowRight size={12} />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed rounded-[2rem] border-gray-500/20">
            <p className="text-gray-500 text-xs italic font-bold uppercase tracking-widest">Belum ada destinasi unggulan di database.</p>
          </div>
        )}
      </section>

      {/* --- SECTION: WHY CHOOSE US (EXPERIENCE SECTION) --- */}
      <section className={`py-24 border-y text-left transition-colors duration-500 ${
        isDarkMode ? 'bg-[#080808] border-white/5' : 'bg-gray-50 border-black/5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#ffcc00] text-[10px] font-black uppercase tracking-[0.25em]">Keunggulan Bandar Lampung</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight italic leading-none">
              Mengapa Berwisata di <span className="text-[#ffcc00]">Bandar Lampung</span>?
            </h2>
            <p className={`text-xs md:text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Bandar Lampung bukan hanya kota transit. Sebagai pusat dari provinsi Lampung, kota ini menawarkan perpaduan infrastruktur modern dan keasrian alam yang belum terjamah.
            </p>
            <div className="space-y-4 pt-2">
              {[
                { title: "Aksesibilitas Terbaik", desc: "Tol trans-Sumatra dan bandara internasional mempercepat perjalanan Anda." },
                { title: "Wisata Terpadu", desc: "Hanya butuh 30 menit dari pusat kota untuk mencapai pantai pasir putih tercantik." },
                { title: "Kuliner Legendaris", desc: "Dari Kopi Lampung beraroma khas hingga berbagai olahan pisang modifikasi." }
              ].map((item, index) => (
                <div key={index} className="flex gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <div>
                    <h4 className={`text-xs font-black uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.title}</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-[2rem] border transition-all hover:scale-[1.03] ${
              isDarkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-black/5 shadow-md'
            }`}>
              <Award className="text-[#ffcc00] mb-4" size={32} />
              <h3 className={`text-sm font-black uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-black'}`}>Pelayanan Terakreditasi</h3>
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">Seluruh titik destinasi utama dipantau dan dikelola langsung oleh Dinas Pariwisata guna kenyamanan dan keselamatan maksimal wisatawan.</p>
            </div>
            <div className={`p-8 rounded-[2rem] border transition-all hover:scale-[1.03] ${
              isDarkMode ? 'bg-white/[0.01] border-white/5' : 'bg-white border-black/5 shadow-md'
            }`}>
              <Users className="text-blue-500 mb-4" size={32} />
              <h3 className={`text-sm font-black uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-black'}`}>Pemandu Lokal Berlisensi</h3>
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">Berdayakan pemuda lokal Lampung yang telah bersertifikat pramuwisata untuk memandu petualangan seru Anda secara ramah.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: VIRTUAL PHOTO GALLERY --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24 text-left space-y-12">
        <div className="space-y-3">
          <span className="text-[#ffcc00] text-[10px] font-black uppercase tracking-[0.2em]">Virtual Tour Snapshot</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight italic">
            Galeri Keindahan <span className="text-[#ffcc00]">Lampung</span>
          </h2>
          <p className={`text-xs md:text-sm font-medium max-w-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Intip sekilas keindahan lanskap bahari, pegunungan hijau, dan pesona alam yang siap menyambut kehadiran Anda.
          </p>
        </div>

        {/* Gallery Collage Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 h-80 rounded-[2rem] overflow-hidden relative group">
            <img 
              src="https://awsimages.detik.net.id/community/media/visual/2023/05/11/pulau-pahawang-lampung_169.jpeg?w=1200" 
              alt="Pahawang"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="text-white text-xs font-black uppercase tracking-widest">Pulau Pahawang</span>
            </div>
          </div>
          <div className="md:col-span-4 h-80 rounded-[2rem] overflow-hidden relative group">
            <img 
              src="https://awsimages.detik.net.id/community/media/visual/2023/09/14/pantai-gigi-hiu_169.jpeg?w=1200" 
              alt="Gigi Hiu"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="text-white text-xs font-black uppercase tracking-widest">Pantai Gigi Hiu</span>
            </div>
          </div>
          <div className="md:col-span-4 h-80 rounded-[2rem] overflow-hidden relative group">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2LYAdUqyjuyydcRo_slrfg9Meoqe4d2V2xg&s" 
              alt="Way Kambas"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="text-white text-xs font-black uppercase tracking-widest">TN Way Kambas</span>
            </div>
          </div>
          <div className="md:col-span-8 h-80 rounded-[2rem] overflow-hidden relative group">
            <img 
              src="https://awsimages.detik.net.id/community/media/visual/2023/09/14/pantai-gigi-hiu_169.jpeg?w=1200" 
              alt="Batu Granit"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="text-white text-xs font-black uppercase tracking-widest">Eksotisme Karang Sumatra</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: TRAVELER TESTIMONIALS --- */}
      <section className={`py-24 border-y text-left transition-colors duration-500 ${
        isDarkMode ? 'bg-[#080808] border-white/5' : 'bg-gray-50 border-black/5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[#ffcc00] text-[10px] font-black uppercase tracking-[0.2em]">Tanggapan Wisatawan</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight italic">
              Apa Kata <span className="text-[#ffcc00]">Mereka</span>?
            </h2>
            <p className={`text-xs md:text-sm font-medium max-w-xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Ulasan jujur dari pengunjung yang telah mengeksplorasi pariwisata di Bandar Lampung secara langsung.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id}
                className={`p-8 rounded-[2rem] border flex flex-col justify-between space-y-6 transition-all duration-300 hover:scale-[1.02] ${
                  isDarkMode 
                    ? 'bg-white/[0.01] border-white/5' 
                    : 'bg-white border-black/5 shadow-md'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex text-[#ffcc00] gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={12} fill="#ffcc00" />
                    ))}
                  </div>
                  <p className={`text-xs leading-relaxed italic ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t pt-4 border-gray-500/10">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-[#ffcc00]/30" />
                  <div>
                    <h4 className={`text-xs font-black uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-black'}`}>{t.name}</h4>
                    <p className="text-[10px] text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION: FAQ ACCORDION --- */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-left space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[#ffcc00] text-[10px] font-black uppercase tracking-[0.2em]">Frequently Asked Questions</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight italic">
            Pertanyaan <span className="text-[#ffcc00]">Populer</span> Wisatawan
          </h2>
          <p className={`text-xs md:text-sm font-medium max-w-xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Temukan jawaban cepat atas pertanyaan umum seputar aksesibilitas, akomodasi, dan persiapan wisata ke Bandar Lampung.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx}
              className={`rounded-2xl border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/[0.01] border-white/5 hover:border-white/10' 
                  : 'bg-white border-black/5 shadow-sm hover:shadow-md'
              }`}
            >
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full py-5 px-6 flex items-center justify-between text-left font-black text-xs md:text-sm uppercase tracking-wider cursor-pointer"
              >
                <span className={isDarkMode ? 'text-white' : 'text-black'}>{faq.question}</span>
                <span className="text-[#ffcc00] shrink-0 ml-4">
                  {activeFaq === idx ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              <div className={`overflow-hidden transition-all duration-350 ease-in-out ${
                activeFaq === idx ? 'max-h-40 border-t border-gray-500/10' : 'max-h-0'
              }`}>
                <p className={`p-6 text-xs md:text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION: CALL TO ACTION (CTA) --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pb-24 text-left">
        <div className={`relative rounded-[3rem] p-8 md:p-16 overflow-hidden border ${
          isDarkMode 
            ? 'bg-gradient-to-r from-[#121212] to-[#080808] border-white/5 shadow-2xl' 
            : 'bg-gradient-to-r from-gray-100 to-gray-50 border-black/5 shadow-xl'
        }`}>
          {/* Subtle light leak for dark mode CTA */}
          {isDarkMode && (
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#ffcc00]/5 rounded-full blur-[100px] pointer-events-none"></div>
          )}

          <div className="max-w-2xl space-y-6 relative z-10">
            <span className="text-[#ffcc00] text-[10px] font-black uppercase tracking-[0.2em]">Mulai Petualangan Anda</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none italic">
              Siap Menjelajahi Keindahan <span className="text-[#ffcc00] drop-shadow-[0_0_30px_rgba(255,204,0,0.15)]">Bandar Lampung</span>?
            </h2>
            <p className={`text-xs md:text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Dapatkan petualangan bahari yang eksotis dan petualangan cagar alam gajah legendaris. Buka semua menu destinasi pariwisata untuk membandingkan spot-spot terbaik Anda sekarang.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/destinasi">
                <button className="bg-[#ffcc00] hover:bg-[#ffb300] text-black px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-[#ffcc00]/15 hover:-translate-y-0.5">
                  Mulai Bandingkan Destinasi
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Footer component */}
      <Footer />
    </main>
  );
}