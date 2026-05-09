"use client";
import React from 'react';
import { Save, X } from 'lucide-react';

export default function AdminForm({ theme, onClose }: { theme: string, onClose: () => void }) {
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`w-full max-w-2xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border ${isDark ? 'bg-[#111] border-white/10' : 'bg-white border-gray-200'}`}>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Tambah <span className="text-[#ffcc00]">Destinasi</span></h2>
          <button onClick={onClose} className="p-2 hover:rotate-90 transition-transform"><X /></button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Nama Destinasi</label>
            <input type="text" className={`w-full p-4 rounded-xl border focus:outline-none focus:border-[#ffcc00] ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`} placeholder="Contoh: Puncak Mas" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Kategori</label>
            <select className={`w-full p-4 rounded-xl border focus:outline-none ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200 text-black'}`}>
              <option value="terpopuler">Terpopuler</option>
              <option value="pantai">Pantai</option>
              <option value="pemandangan">Pemandangan</option>
            </select>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Deskripsi Singkat</label>
            <textarea rows={3} className={`w-full p-4 rounded-xl border focus:outline-none ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`} placeholder="Ceritakan sedikit tentang tempat ini..."></textarea>
          </div>
          
          <button type="submit" className="md:col-span-2 mt-4 bg-[#ffcc00] text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 hover:scale-[1.02] transition-all">
            <Save size={18} /> Simpan ke Database
          </button>
        </form>
      </div>
    </div>
  );
}