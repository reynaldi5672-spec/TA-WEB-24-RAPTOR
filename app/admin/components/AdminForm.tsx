"use client";

import React, { useState } from 'react';
import { Loader2, X } from 'lucide-react';
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

interface AdminFormProps {
  theme: string;
  onClose: () => void;
  onSuccess: () => void;
  editData: Destinasi | null;
}

export default function AdminForm({ theme, onClose, onSuccess, editData }: AdminFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [form, setForm] = useState({
    nama: editData ? editData.nama : '',
    lokasi: editData ? editData.lokasi : '',
    deskripsi: editData ? editData.deskripsi : '',
    gambar_url: editData ? editData.gambar_url : '',
    rating: editData ? editData.rating : 4.5,
    is_viral: editData ? editData.is_viral : false,
    kategori: editData ? editData.kategori : 'pantai'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isEdit = editData !== null;
    const url = '/api/destinasi';
    const method = isEdit ? 'PUT' : 'POST';
    const payload = isEdit ? { id: editData.id, ...form } : form;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          title: 'Sukses!',
          text: data.message,
          icon: 'success',
          background: theme === 'dark' ? '#111' : '#fff',
          color: theme === 'dark' ? '#fff' : '#000',
          confirmButtonColor: '#ffcc00'
        });
        onSuccess();
      } else {
        throw new Error(data.message);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memproses data';
      Swal.fire({ 
        title: 'Error!', 
        text: errorMessage, 
        icon: 'error', 
        background: theme === 'dark' ? '#111' : '#fff', 
        color: theme === 'dark' ? '#fff' : '#000' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className={`w-full max-w-2xl rounded-[2.5rem] border p-8 md:p-10 relative transition-colors max-h-[95vh] overflow-y-auto global-scrollbar ${
        theme === 'dark' ? 'bg-[#0d0d0d] border-white/5 text-white' : 'bg-white border-black/[0.04] text-black shadow-xl'
      }`}>
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-500 hover:text-[#ffcc00] transition-colors cursor-pointer">
          <X size={20} />
        </button>

        <h2 className="text-2xl font-black uppercase italic mb-8 text-[#ffcc00] text-left">
          {editData ? '⚡ Edit Destinasi Wisata' : '➕ Tambah Destinasi Baru'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Nama Tempat Wisata</label>
              <input 
                type="text" 
                required 
                value={form.nama} 
                onChange={(e) => setForm({...form, nama: e.target.value})} 
                className={`w-full border rounded-xl py-3 px-4 text-sm focus:border-[#ffcc00]/50 outline-none transition-all ${
                  theme === 'dark' ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-gray-50 border-black/5 text-black shadow-inner'
                }`} 
                placeholder="Contoh: Pantai Sari Ringkih" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Kabupaten / Lokasi</label>
              <input 
                type="text" 
                required 
                value={form.lokasi} 
                onChange={(e) => setForm({...form, lokasi: e.target.value})} 
                className={`w-full border rounded-xl py-3 px-4 text-sm focus:border-[#ffcc00]/50 outline-none transition-all ${
                  theme === 'dark' ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-gray-50 border-black/5 text-black shadow-inner'
                }`} 
                placeholder="Contoh: Pesawaran" 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* --- REVISI: INPUT URL GAMBAR MULTIPLE UNTUK CAROUSEL SLIDER --- */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">URL Gambar Wisata</label>
              <input 
                type="text" 
                required 
                value={form.gambar_url} 
                onChange={(e) => setForm({...form, gambar_url: e.target.value})} 
                className={`w-full border rounded-xl py-3 px-4 text-sm focus:border-[#ffcc00]/50 outline-none transition-all ${
                  theme === 'dark' ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-gray-50 border-black/5 text-black shadow-inner'
                }`} 
                placeholder="Contoh: https://link1.jpg, https://link2.jpg" 
              />
              {/* Petunjuk Operasional Pengisian Data Gambar */}
              <p className="text-[9px] font-medium text-gray-500 italic leading-relaxed mt-1">
                * Link pertama otomatis jadi **Foto Utama/Cover depan**. Pisahkan link berikutnya dengan <span className="text-[#ffcc00] font-black underline">tanda koma (,)</span> untuk mengaktifkan efek **Slider Carousel** di detail modal klien.
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Rating Wisata ({Number(form.rating).toFixed(1)})</label>
              <input type="range" min="1.0" max="5.0" step="0.1" value={form.rating} onChange={(e) => setForm({...form, rating: parseFloat(e.target.value)})} className="w-full accent-[#ffcc00] mt-4 cursor-pointer" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Deskripsi Singkat</label>
            <textarea 
              rows={4} 
              required 
              value={form.deskripsi} 
              onChange={(e) => setForm({...form, deskripsi: e.target.value})} 
              className={`w-full border rounded-xl py-3 px-4 text-sm focus:border-[#ffcc00]/50 outline-none resize-none transition-all ${
                theme === 'dark' ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-gray-50 border-black/5 text-black shadow-inner'
              }`} 
              placeholder="Ceritakan keindahan tempat wisata ini..." 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Kategori Wisata</label>
            <select 
              value={form.kategori} 
              onChange={(e) => setForm({...form, kategori: e.target.value})} 
              className={`w-full border rounded-xl py-3 px-4 text-sm focus:border-[#ffcc00]/50 outline-none cursor-pointer font-semibold transition-all ${
                theme === 'dark' ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-gray-50 border-black/5 text-black'
              }`}
            >
              <option value="pantai" className={theme === 'dark' ? 'bg-[#0d0d0d] text-white' : 'bg-white text-black'}>🌊 Pantai</option>
              <option value="pemandangan" className={theme === 'dark' ? 'bg-[#0d0d0d] text-white' : 'bg-white text-black'}>⛰️ Pemandangan</option>
              <option value="terpopuler" className={theme === 'dark' ? 'bg-[#0d0d0d] text-white' : 'bg-white text-black'}>⭐ Terpopuler</option>
            </select>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl border transition-colors ${
            theme === 'dark' ? 'bg-white/[0.01] border-white/5' : 'bg-gray-50 border-black/5'
          }">
            <input 
              type="checkbox" 
              id="is_viral"
              checked={form.is_viral} 
              onChange={(e) => setForm({...form, is_viral: e.target.checked})} 
              className="w-5 h-5 accent-[#ffcc00] cursor-pointer"
            />
            <label htmlFor="is_viral" className="text-xs font-bold uppercase tracking-wider text-gray-400 cursor-pointer select-none">
              🔥 Tandai sebagai Wisata VIRAL
            </label>
          </div>

          <div className="flex gap-4 justify-end pt-4">
            <button type="button" onClick={onClose} className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer ${
              theme === 'dark' ? 'bg-white/5 border border-white/10 hover:bg-white/10' : 'bg-gray-100 border border-black/5 hover:bg-gray-200'
            }`}>Batal</button>
            <button type="submit" disabled={isSubmitting} className="bg-[#ffcc00] text-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer">
              {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : (editData ? 'Simpan Perubahan' : 'Publish Wisata')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}