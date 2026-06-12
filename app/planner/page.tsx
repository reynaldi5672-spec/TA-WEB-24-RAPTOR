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

  useEffect(() => {
    setMounted(true);
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
        <div className="text-[10px] font-black uppercase text-[#ffcc00] tracking-widest mb-1 opacity-80 animate-pulse">
          🌅 Ayo rencanakan agenda liburan terbaikmu!
        </div>
        <div className={`flex flex-col md:items-start text-left gap-4 mb-14 border-b pb-12 ${
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
