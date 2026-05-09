"use client";
import React, { useState } from 'react';
import { Sun, Moon, Plus, LogOut, LayoutDashboard, Map } from 'lucide-react';
import AdminTable from './components/AdminTable';
import AdminForm from './components/AdminForm';

export default function AdminDashboard() {
  const [theme, setTheme] = useState('dark');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-[#080808] text-white' : 'bg-gray-50 text-black'}`}>
      
      {/* --- SIDEBAR / NAVBAR --- */}
      <nav className={`fixed top-0 left-0 h-full w-20 md:w-64 flex flex-col border-r transition-colors ${theme === 'dark' ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-gray-200'} z-50`}>
        <div className="p-8">
          <h1 className="text-xl font-black uppercase italic tracking-tighter hidden md:block text-[#ffcc00]">
            Admin<span className={theme === 'dark' ? 'text-white' : 'text-black'}>Panel</span>
          </h1>
          <div className="w-10 h-10 bg-[#ffcc00] rounded-xl flex items-center justify-center text-black font-black md:hidden">L</div>
        </div>

        <div className="flex-1 px-4 space-y-2">
          <div className={`flex items-center gap-4 p-4 rounded-2xl ${theme === 'dark' ? 'bg-white/5 text-[#ffcc00]' : 'bg-gray-100 text-blue-600'}`}>
            <LayoutDashboard size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Dashboard</span>
          </div>
          <div className={`flex items-center gap-4 p-4 rounded-2xl text-gray-500 hover:text-[#ffcc00] cursor-not-allowed`}>
            <Map size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Settings</span>
          </div>
        </div>

        <div className="p-8 space-y-4">
          <button 
            onClick={toggleTheme}
            className={`w-full p-4 rounded-2xl flex items-center justify-center gap-3 border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 text-yellow-400' : 'bg-gray-100 border-gray-200 text-gray-600'}`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full p-4 rounded-2xl flex items-center justify-center gap-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
          >
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="pl-20 md:pl-64 p-8 md:p-16">
        <div className="max-w-[1200px] mx-auto">
          
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="text-left">
              <h4 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-3 ${theme === 'dark' ? 'text-[#ffcc00]' : 'text-blue-600'}`}>
                Control Center // Region: BDL
              </h4>
              <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                Kelola <br /> <span className="opacity-20 text-outline">Wisata Lampung</span>
              </h2>
            </div>
            
            <button 
              onClick={() => setIsFormOpen(true)}
              className="bg-[#ffcc00] text-black px-10 py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.3em] flex items-center gap-3 hover:scale-105 transition-transform shadow-xl shadow-[#ffcc00]/20"
            >
              <Plus size={20} /> Tambah Destinasi
            </button>
          </header>

          {/* TABLE COMPONENT */}
          <AdminTable theme={theme} />

          {/* MODAL FORM */}
          {isFormOpen && (
            <AdminForm theme={theme} onClose={() => setIsFormOpen(false)} />
          )}

        </div>
      </main>
    </div>
  );
}