"use client";

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Plus, LogOut, LayoutDashboard, MessageSquare } from 'lucide-react'; // <-- Ganti Map jadi MessageSquare
import AdminTable from './components/AdminTable';
import AdminForm from './components/AdminForm';
import AdminCommentsTable from './components/AdminCommentsTable'; // <-- 1. IMPORT TABEL KOMENTAR BARU
import { useTheme } from '@/app/context/ThemeContext';

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

/**
 * AdminDashboard manages administrative views, including lists of comments and destinations.
 */
export default function AdminDashboard() {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const theme = isDarkMode ? 'dark' : 'light';

  // <-- 2. TAMBAH STATE UNTUK NAVIGASI TAB HALAMAN ADMIN
  const [activeTab, setActiveTab] = useState<'destinasi' | 'komentar'>('destinasi'); // Tracks active visible panel tab content selection

  const [isFormOpen, setIsFormOpen] = useState(false); // Controls insert/update modal dialog visibility
  const [editData, setEditData] = useState<Destinasi | null>(null); // Holds details model for update edit actions
  const [refreshTrigger, setRefreshTrigger] = useState(false); // State toggle switch to reload data rows
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const handleRefresh = () => setRefreshTrigger(!refreshTrigger);

  const handleOpenCreateForm = () => {
    setEditData(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (item: Destinasi) => {
    setEditData(item);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditData(null);
    handleRefresh();
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen transition-colors duration-700 relative overflow-hidden ${
      theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#f8f9fa] text-black'
    }`}>
      
      {/* --- BACKGROUND VECTOR DECORATION --- */}
      <div className="absolute inset-0 pointer-events-none opacity-40 select-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>
      
      {/* --- SIDEBAR / NAVBAR --- */}
      <nav className={`fixed top-0 left-0 h-full w-20 md:w-64 flex flex-col border-r transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#0d0d0d] border-white/5' : 'bg-white border-black/[0.04]'
      } z-50`}>
        <div className="p-8">
          <h1 className="text-xl font-black uppercase italic tracking-tighter hidden md:block text-[#ffcc00]">
            Admin<span className={theme === 'dark' ? 'text-white' : 'text-black'}>Panel</span>
          </h1>
          <div className="w-10 h-10 bg-[#ffcc00] rounded-xl flex items-center justify-center text-black font-black md:hidden shadow-lg">L</div>
        </div>

        <div className="flex-1 px-4 space-y-2 relative z-10">
          {/* BUTTON TAB 1: KELOLA DESTINASI WISATA */}
          <button 
            onClick={() => setActiveTab('destinasi')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer ${
              activeTab === 'destinasi'
                ? (theme === 'dark' ? 'bg-white/5 text-[#ffcc00]' : 'bg-gray-100 text-blue-600')
                : 'text-gray-500 hover:text-[#ffcc00]'
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Destinations</span>
          </button>

          {/* BUTTON TAB 2: REVISI MANAGE KOMENTAR PUBLIK */}
          <button 
            onClick={() => setActiveTab('komentar')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer ${
              activeTab === 'komentar'
                ? (theme === 'dark' ? 'bg-white/5 text-[#ffcc00]' : 'bg-gray-100 text-blue-600')
                : 'text-gray-500 hover:text-[#ffcc00]'
            }`}
          >
            <MessageSquare size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Comments Center</span>
          </button>
        </div>

        <div className="p-8 space-y-4 relative z-10">
          <button 
            onClick={toggleTheme}
            className={`w-full p-4 rounded-2xl flex items-center justify-center gap-3 border transition-all duration-300 cursor-pointer ${
              theme === 'dark' ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10' : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full p-4 rounded-2xl flex items-center justify-center gap-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
          >
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="pl-20 md:pl-64 p-8 md:p-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* CONDITION RENDERING BERDASARKAN TAB YANG AKTIF */}
          {activeTab === 'destinasi' ? (
            <>
              {/* TAMPILAN HALAMAN UTAMA KELOLA WISATA */}
              <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                <div className="text-left">
                  <h4 className={`text-[9px] font-black uppercase tracking-[0.4em] mb-3 ${theme === 'dark' ? 'text-[#ffcc00]' : 'text-blue-600'}`}>
                    Control Center // Region: BDL
                  </h4>
                  <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                    Kelola <br /> <span className="opacity-25">Wisata Lampung</span>
                  </h2>
                </div>
                
                <button 
                  onClick={handleOpenCreateForm}
                  className="bg-[#ffcc00] text-black px-8 py-4.5 rounded-xl font-black uppercase text-[10px] tracking-[0.3em] flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg cursor-pointer"
                >
                  <Plus size={18} /> Tambah Destinasi
                </button>
              </header>

              <AdminTable 
                theme={theme} 
                onEdit={handleOpenEditForm} 
                refreshTrigger={refreshTrigger} 
                onRefresh={handleRefresh} 
              />
            </>
          ) : (
            <>
              {/* TAMPILAN REVISI KELOLA KOMENTAR TOXIC */}
              <header className="text-left mb-16">
                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] mb-3 text-red-500">
                  Security Gate // Anti-Spam & Hate Speech
                </h4>
                <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                  Moderasi <br /> <span className="opacity-25">Komentar Publik</span>
                </h2>
              </header>

              {/* RENDER KOMPONEN TABEL MANAGE KOMENTAR */}
              <AdminCommentsTable 
                theme={theme}
                refreshTrigger={refreshTrigger}
                onRefresh={handleRefresh}
              />
            </>
          )}

          {/* MODAL FORM INPUT WISATA */}
          {isFormOpen && (
            <AdminForm 
              theme={theme} 
              onClose={() => { setIsFormOpen(false); setEditData(null); }} 
              onSuccess={handleFormSuccess} 
              editData={editData} 
            />
          )}

        </div>
      </main>
    </div>
  );
}