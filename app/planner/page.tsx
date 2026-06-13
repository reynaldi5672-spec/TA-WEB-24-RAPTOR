"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar'; 
import Footer from '@/app/components/Footer';
import { useTheme } from '@/app/context/ThemeContext';
import { Calculator, HelpCircle, Sparkles, MessageSquare, Compass } from 'lucide-react';
import CostEstimator from '@/app/components/CostEstimator';
import PackingList from '@/app/components/PackingList';
import DestinasiQuiz from '@/app/components/DestinasiQuiz';
import VirtualGuide from '@/app/components/VirtualGuide';

type TabType = "estimator" | "packing" | "quiz" | "guide";

export default function TravelPlannerPage() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>("estimator");
  const [mounted, setMounted] = useState(false);

  // Weather Widget Mock Data/State
  const [weatherData, setWeatherData] = useState({
    temp: 29,
    condition: "Cerah Berawan",
    humidity: "75%",
    wind: "12 km/h",
    recommendation: "Sangat cocok untuk berwisata pantai atau mendaki bukit hari ini!"
  });

  const fetchWeather = async () => {
    try {
      const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-5.3971&longitude=105.2663&current=temperature_2m,relative_humidity_2m,weather_code");
      if (res.ok) {
        const data = await res.json();
        if (data && data.current) {
          const temp = Math.round(data.current.temperature_2m);
          const code = data.current.weather_code;
          const humidity = data.current.relative_humidity_2m;
          
          let condition = "Cerah Berawan";
          let rec = "Sangat cocok untuk berwisata pantai atau mendaki bukit hari ini!";
          if (code === 0) {
            condition = "Cerah";
            rec = "Cuaca sangat cerah! Waktu terbaik untuk berkunjung ke Pulau Pahawang atau Pantai Mutun.";
          } else if (code >= 1 && code <= 3) {
            condition = "Cerah Berawan";
            rec = "Cuaca sejuk dan sedikit berawan, pas untuk jalan-jalan ke Puncak Mas atau Lengkung Langit.";
          } else if (code === 45 || code === 48) {
            condition = "Berkabut";
            rec = "Cuaca berkabut. Harap berhati-hati dalam perjalanan berkendara ke daerah perbukitan.";
          } else if (code >= 51 && code <= 55) {
            condition = "Gerimis";
            rec = "Ada potensi gerimis ringan. Persiapkan payung/jas hujan jika ingin menjelajahi tempat wisata terbuka.";
          } else if (code >= 61 && code <= 67) {
            condition = "Hujan";
            rec = "Ada potensi hujan hari ini. Persiapkan payung/jas hujan, atau kunjungi Museum Lampung saja.";
          } else if (code >= 80 && code <= 82) {
            condition = "Hujan Deras";
            rec = "Hujan deras diprakirakan turun. Sebaiknya pilih destinasi dalam ruangan (indoor) untuk keamanan.";
          } else if (code >= 95) {
            condition = "Badai Petir";
            rec = "Waspada potensi badai petir. Hindari aktivitas di luar ruangan atau wilayah pantai.";
          }
          
          setWeatherData({
            temp,
            condition,
            humidity: `${humidity}%`,
            wind: "Live API",
            recommendation: rec
          });
        }
      }
    } catch (err) {
      console.error("Gagal memuat cuaca live, menggunakan fallback.", err);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchWeather();
  }, []);

  if (!mounted) return null;

  return (
    <main className={`min-h-screen transition-colors duration-700 relative overflow-hidden ${
      isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#f8f9fa] text-[#1a1a1a]'
    }`}>
      
      {/* Background Vector Decoration */}
      <div className="absolute top-0 inset-x-0 h-125 pointer-events-none opacity-40 select-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div className={`absolute bottom-0 h-40 w-full bg-gradient-to-t ${isDarkMode ? 'from-[#050505]' : 'from-[#f8f9fa]'} to-transparent`}></div>
      </div>
      
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-40 pb-24 relative z-10">
        
        {/* Welcome Header */}
<<<<<<< HEAD
        <header className={`flex flex-col md:items-start text-left gap-4 mb-14 border-b pb-12 ${
=======
        <div className="text-[10px] font-black uppercase text-[#ffcc00] tracking-widest mb-1 opacity-80 animate-pulse">
          🌅 Ayo rencanakan agenda liburan terbaikmu!
        </div>
        <div className={`flex flex-col md:items-start text-left gap-4 mb-14 border-b pb-12 ${
>>>>>>> origin/main
          isDarkMode ? 'border-white/5' : 'border-black/5'
        }`}>
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.25em] backdrop-blur-md shadow-sm transition-all duration-500 ${
            isDarkMode ? 'bg-[#ffcc00]/5 border-[#ffcc00]/20 text-[#ffcc00]' : 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#e6b800]'
          }`}>
            <Compass size={11} className="animate-spin [animation-duration:15s]" /> Asisten Wisata Pintar
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
            Travel <span className="text-[#ffcc00] drop-shadow-[0_0_30px_rgba(255,204,0,0.15)]">Planner & Alat</span> Bantu
          </h1>
          <p className={`text-xs md:text-sm font-medium max-w-2xl leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Rencanakan petualangan terbaik Anda di Bandar Lampung dengan kalkulator anggaran interaktif, checklist barang bawaan otomatis, kuis destinasi ideal, dan konsultasi asisten pemandu wisata virtual.
          </p>
        </header>

        {/* Weather Widget Component */}
        <div className={`p-6 mb-12 rounded-3xl border flex flex-col lg:flex-row items-center justify-between gap-6 text-left transition-all duration-500 ${
          isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-white border-black/[0.04] shadow-sm'
        }`}>
          <div className="flex items-center gap-4 flex-1">
            <div className="text-4xl shrink-0">
              {weatherData.condition === "Cerah" ? "☀️" : 
               weatherData.condition === "Berawan" ? "☁️" : 
               weatherData.condition === "Cerah Berawan" ? "⛅" : 
               weatherData.condition === "Gerimis" ? "🌦️" : 
               weatherData.condition === "Hujan" ? "🌧️" : 
               weatherData.condition === "Hujan Deras" ? "🌧️" : 
               weatherData.condition === "Badai Petir" ? "⛈️" : 
               weatherData.condition === "Berkabut" ? "🌫️" : 
               "⛅"}
            </div>
            <div>
              <div className="text-[9px] text-[#ffcc00] font-black uppercase tracking-wider">Informasi Cuaca Hari Ini</div>
              <h3 className="text-base font-black uppercase tracking-tight">Bandar Lampung, Indonesia</h3>
              <p className={`text-xs mt-0.5 leading-relaxed font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {weatherData.recommendation}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 divide-x divide-gray-500/10 text-xs font-bold font-mono">
            <div className="pl-4">
              <span className="text-gray-500 block text-[8px] uppercase font-sans font-black">Temperatur</span>
              <span className="text-lg font-black text-[#ffcc00]">{weatherData.temp}°C</span>
            </div>
            <div className="pl-4">
              <span className="text-gray-500 block text-[8px] uppercase font-sans font-black">Kondisi</span>
              <span className="text-lg font-black">{weatherData.condition}</span>
            </div>
            <div className="pl-4">
              <span className="text-gray-500 block text-[8px] uppercase font-sans font-black">Kelembapan</span>
              <span className="text-lg font-black">{weatherData.humidity}</span>
            </div>
            <div className="pl-4 flex items-center justify-center">
              <button 
                onClick={fetchWeather}
                className={`px-3 py-2 rounded-xl border text-[9px] font-sans font-black uppercase tracking-widest transition-all cursor-pointer ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                    : 'bg-gray-100 border-black/5 hover:bg-gray-200 text-gray-700'
                }`}
              >
                🔄 Segarkan
              </button>
            </div>
          </div>
        </div>

        {/* Tab Switcher Navigation */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b pb-8 border-gray-500/10">
          {[
            { id: "estimator", label: "🧮 Estimator Biaya", desc: "Kalkulator Anggaran" },
            { id: "packing", label: "📋 Daftar Bawaan", desc: "Packing Checklist" },
            { id: "quiz", label: "🧩 Cari Destinasi", desc: "Kuis Rekomendasi" },
            { id: "guide", label: "💬 Pemandu Virtual", desc: "Chat Simulation" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-5 py-3.5 rounded-2xl flex flex-col items-start text-left transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#ffcc00] text-black shadow-xl scale-[1.02] font-black'
                  : (isDarkMode ? 'bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:border-white/20' : 'bg-white border border-black/5 text-gray-600 hover:bg-gray-50 hover:text-black')
              }`}
            >
              <span className="text-[11px] font-black uppercase tracking-wider">{tab.label}</span>
              <span className={`text-[8px] uppercase tracking-widest font-bold mt-0.5 ${
                activeTab === tab.id ? 'text-black/60' : 'text-gray-500'
              }`}>{tab.desc}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Rendering */}
        <div className="transition-all duration-500">
          {activeTab === "estimator" && (
            <div className="animate-fadeIn">
              <CostEstimator />
            </div>
          )}

          {activeTab === "packing" && (
            <div className="animate-fadeIn">
              <PackingList />
            </div>
          )}

          {activeTab === "quiz" && (
            <div className="animate-fadeIn">
              <DestinasiQuiz />
            </div>
          )}

          {activeTab === "guide" && (
            <div className="animate-fadeIn">
              <VirtualGuide />
            </div>
          )}
        </div>

      </div>

      <Footer />
    </main>
  );
}
