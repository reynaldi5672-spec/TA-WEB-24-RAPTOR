"use client";

import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Plus, LogOut, LayoutDashboard, 
  MessageSquare, Compass, Flame, Star, Sparkles, RefreshCw
} from 'lucide-react';
import AdminTable from './components/AdminTable';
import AdminForm from './components/AdminForm';
import AdminCommentsTable from './components/AdminCommentsTable';
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

export default function AdminDashboard() {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const theme = isDarkMode ? 'dark' : 'light';

  const [activeTab, setActiveTab] = useState<'destinasi' | 'komentar'>('destinasi');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState<Destinasi | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Dashboard Metrics State
  const [stats, setStats] = useState({
    totalDestinasi: 0,
    totalViral: 0,
    totalKomentar: 0,
    avgRating: 0
  });
  const [statsLoading, setStatsLoading] = useState(true);

  // Fetch Dashboard Stats
  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const [resDest, resKom] = await Promise.all([
        fetch('/api/destinasi'),
        fetch('/api/komentar')
      ]);
      const dataDest = await resDest.json();
      const dataKom = await resKom.json();

      if (Array.isArray(dataDest) && Array.isArray(dataKom)) {
        const totalDestinasi = dataDest.length;
        const totalViral = dataDest.filter((d: Destinasi) => d.is_viral).length;
        const totalKomentar = dataKom.length;
        const avgRating = dataDest.length > 0 
          ? (dataDest.reduce((acc: number, d: Destinasi) => acc + Number(d.rating), 0) / dataDest.length)
          : 0;

        setStats({
          totalDestinasi,
          totalViral,
          totalKomentar,
          avgRating
        });
      }
    } catch (err) {
      console.error("Gagal memuat statistik dashboard:", err);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
      setMounted(true);
    });
    fetchStats();
    return () => cancelAnimationFrame(animationFrameId);
  }, [refreshTrigger]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  
  const handleRefresh = () => {
    setRefreshTrigger(prev => !prev);
  };

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

  const handleLogout = () => {
    // Reload back to login page
    window.location.reload();
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen transition-colors duration-700 relative overflow-hidden ${
      theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#f8f9fa] text-[#1a1a1a]'
    }`}>
      
      {/* --- BACKGROUND VECTOR DECORATION --- */}
      <div className="absolute inset-0 pointer-events-none opacity-45 select-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      
      {/* --- SIDEBAR / NAVBAR --- */}
      <nav className={`fixed top-0 left-0 h-full w-20 md:w-64 flex flex-col border-r transition-all duration-500 backdrop-blur-md ${
        theme === 'dark' ? 'bg-[#0b0b0b]/90 border-white/5' : 'bg-white/90 border-black/[0.05] shadow-sm'
      } z-50`}>
        
        {/* Brand Header */}
        <div className="p-6 md:p-8 border-b border-gray-500/5">
          <h1 className="text-xl font-black uppercase italic tracking-tighter hidden md:block text-[#ffcc00] text-left">
            Admin<span className={theme === 'dark' ? 'text-white' : 'text-black'}>Panel</span>
          </h1>
          <div className="w-10 h-10 bg-[#ffcc00] rounded-xl flex items-center justify-center text-black font-black md:hidden shadow-[0_0_15px_rgba(255,204,0,0.3)] mx-auto">
            A
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex-1 px-3 py-6 space-y-2 relative z-10 text-left">
          <button 
            onClick={() => setActiveTab('destinasi')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer font-bold ${
              activeTab === 'destinasi'
                ? 'bg-[#ffcc00] text-black shadow-lg shadow-[#ffcc00]/15 scale-[1.02]'
                : `text-gray-500 hover:text-[#ffcc00] ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'}`
            }`}
          >
            <LayoutDashboard size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Kelola Destinasi</span>
          </button>

          <button 
            onClick={() => setActiveTab('komentar')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer font-bold ${
              activeTab === 'komentar'
                ? 'bg-[#ffcc00] text-black shadow-lg shadow-[#ffcc00]/15 scale-[1.02]'
                : `text-gray-500 hover:text-[#ffcc00] ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'}`
            }`}
          >
            <MessageSquare size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Moderasi Komentar</span>
          </button>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-6 md:p-8 space-y-3 relative z-10 border-t border-gray-500/5">
          <button 
            onClick={toggleTheme}
            className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-3 border transition-all duration-300 cursor-pointer ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10' 
                : 'bg-black/5 border-black/5 text-[#e6b800] hover:bg-black/10'
            }`}
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span className="text-[9px] font-black uppercase tracking-widest hidden md:block">Mode Layar</span>
          </button>
          
          <button 
            onClick={handleLogout} 
            className="w-full py-3.5 rounded-xl flex items-center justify-center gap-3 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
            title="Logout"
          >
            <LogOut size={18} />
            <span className="text-[9px] font-black uppercase tracking-widest hidden md:block">Keluar Sesi</span>
          </button>
        </div>
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="pl-20 md:pl-64 p-8 md:p-12 min-h-screen relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* --- DASHBOARD METRICS SUMMARY SECTION --- */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Metric 1 */}
            <div className={`p-6 rounded-3xl border text-left transition-all hover:scale-[1.02] ${
              theme === 'dark' ? 'bg-[#0c0c0c] border-white/5' : 'bg-white border-black/5 shadow-sm'
            }`}>
              <div className="flex justify-between items-start">
                <span className="text-gray-500 text-[9px] font-black uppercase tracking-wider">Total Destinasi</span>
                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-white/5 text-[#ffcc00]' : 'bg-gray-100 text-[#b38f00]'}`}>
                  <Compass size={16} />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter">
                  {statsLoading ? '...' : stats.totalDestinasi}
                </h3>
                <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mt-1">Titik Lokasi Aktif</p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className={`p-6 rounded-3xl border text-left transition-all hover:scale-[1.02] ${
              theme === 'dark' ? 'bg-[#0c0c0c] border-white/5' : 'bg-white border-black/5 shadow-sm'
            }`}>
              <div className="flex justify-between items-start">
                <span className="text-gray-500 text-[9px] font-black uppercase tracking-wider">Spot Viral</span>
                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-red-500/10 text-red-500' : 'bg-red-500/10 text-red-600'}`}>
                  <Flame size={16} />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-red-500">
                  {statsLoading ? '...' : stats.totalViral}
                </h3>
                <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mt-1">Sering Dikunjungi</p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className={`p-6 rounded-3xl border text-left transition-all hover:scale-[1.02] ${
              theme === 'dark' ? 'bg-[#0c0c0c] border-white/5' : 'bg-white border-black/5 shadow-sm'
            }`}>
              <div className="flex justify-between items-start">
                <span className="text-gray-500 text-[9px] font-black uppercase tracking-wider">Total Ulasan</span>
                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-500/10 text-blue-600'}`}>
                  <MessageSquare size={16} />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-blue-500">
                  {statsLoading ? '...' : stats.totalKomentar}
                </h3>
                <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mt-1">Review Pengunjung</p>
              </div>
            </div>

            {/* Metric 4 */}
            <div className={`p-6 rounded-3xl border text-left transition-all hover:scale-[1.02] ${
              theme === 'dark' ? 'bg-[#0c0c0c] border-white/5' : 'bg-white border-black/5 shadow-sm'
            }`}>
              <div className="flex justify-between items-start">
                <span className="text-gray-500 text-[9px] font-black uppercase tracking-wider">Rata-rata Rating</span>
                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-500/10 text-emerald-600'}`}>
                  <Star size={16} fill="currentColor" stroke="none" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-emerald-500">
                  {statsLoading ? '...' : stats.avgRating.toFixed(1)} <span className="text-xs font-bold text-gray-500">/ 5.0</span>
                </h3>
                <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mt-1">Skor Kepuasan Publik</p>
              </div>
            </div>

          </section>

          {/* --- CONTENT TABS SWITCHING BLOCK --- */}
          {activeTab === 'destinasi' ? (
            <div className="space-y-8 animate-fadeIn">
              <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="text-left">
                  <h4 className={`text-[9px] font-black uppercase tracking-[0.4em] mb-2 ${theme === 'dark' ? 'text-[#ffcc00]' : 'text-blue-600'}`}>
                    Control Center // Region: BDL
                  </h4>
                  <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
                    Kelola <span className="text-[#ffcc00]">Destinasi Wisata</span>
                  </h2>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={handleRefresh}
                    className={`p-4 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${
                      theme === 'dark' 
                        ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white' 
                        : 'bg-white border-black/10 text-gray-500 hover:bg-gray-100 text-black shadow-sm'
                    }`}
                    title="Segarkan Data"
                  >
                    <RefreshCw size={14} className={statsLoading ? "animate-spin text-[#ffcc00]" : ""} />
                  </button>
                  <button 
                    onClick={handleOpenCreateForm}
                    className="bg-[#ffcc00] hover:bg-[#ffb300] text-black px-6 py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.25em] flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg cursor-pointer"
                  >
                    <Plus size={16} /> Tambah Destinasi
                  </button>
                </div>
              </header>

              <AdminTable 
                theme={theme} 
                onEdit={handleOpenEditForm} 
                refreshTrigger={refreshTrigger} 
                onRefresh={handleRefresh} 
              />
            </div>
          ) : (
            <div className="space-y-8 animate-fadeIn">
              <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="text-left">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.4em] mb-2 text-red-500">
                    Security Gate // Anti-Spam & Hate Speech
                  </h4>
                  <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
                    Moderasi <span className="text-red-500">Komentar Publik</span>
                  </h2>
                </div>
                
                <button 
                  onClick={handleRefresh}
                  className={`p-4 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white' 
                      : 'bg-white border-black/10 text-gray-500 hover:bg-gray-100 text-black shadow-sm'
                  }`}
                  title="Segarkan Data"
                >
                  <RefreshCw size={14} className={statsLoading ? "animate-spin text-red-500" : ""} />
                </button>
              </header>

              <AdminCommentsTable 
                theme={theme}
                refreshTrigger={refreshTrigger}
                onRefresh={handleRefresh}
              />
            </div>
          )}

          {/* --- ADMIN FORM DIALOG MODAL --- */}
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