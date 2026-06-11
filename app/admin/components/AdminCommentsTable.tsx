"use client";

import React, { useState, useEffect } from 'react';
import { Trash2, Loader2, Star, ShieldAlert, Search } from 'lucide-react';
import Swal from 'sweetalert2';

interface Komentar {
  id: number;
  nama_destinasi: string;
  nama_user: string;
  isi_komentar: string;
  rating: number;
  created_at: string;
}

interface AdminCommentsProps {
  theme: string;
  refreshTrigger: boolean;
  onRefresh: () => void;
}

export default function AdminCommentsTable({ theme, refreshTrigger, onRefresh }: AdminCommentsProps) {
  const [komentar, setKomentar] = useState<Komentar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchComments = async () => {
    try {
      const res = await fetch('/api/komentar');
      const data = await res.json();
      if (Array.isArray(data)) {
        setKomentar(data);
      }
    } catch (err) {
      console.error("Gagal memuat list komentar:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [refreshTrigger]);

  const handleDeleteComment = async (id: number) => {
    const confirm = await Swal.fire({
      title: 'Hapus komentar ini?',
      text: "Ulasan yang dihapus akan hilang permanen dari sistem!",
      icon: 'warning',
      showCancelButton: true,
      background: theme === 'dark' ? '#0d0d0d' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: theme === 'dark' ? '#1a1a1a' : '#e5e7eb',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`/api/komentar?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          Swal.fire({
            title: 'Berhasil!',
            text: 'Komentar toxic berhasil dimusnahkan.',
            icon: 'success',
            background: theme === 'dark' ? '#0d0d0d' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000'
          });
          onRefresh();
        }
      } catch (err) {
        console.error("Gagal menghapus komentar:", err);
      }
    }
  };

  const filteredKomentar = komentar.filter(k => 
    k.nama_user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.nama_destinasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.isi_komentar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="p-20 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#ffcc00] mb-2" size={32} />
        <span className="text-xs text-gray-500 font-mono tracking-widest">MEMINDAI DATABASE KOMENTAR...</span>
      </div>
    );
  }

  if (komentar.length === 0) {
    return (
      <div className={`p-20 text-center italic text-sm border rounded-2xl border-dashed ${
        theme === 'dark' ? 'text-gray-500 border-white/5 bg-white/5' : 'text-gray-400 border-black/5 bg-gray-50'
      }`}>
        Aman terkendali. Belum ada review atau komentar publik yang masuk.
      </div>
    );
  }

  return (
    <div className={`border rounded-[2rem] overflow-hidden transition-all duration-300 ${
      theme === 'dark' ? 'bg-[#0b0b0b] border-white/5 shadow-2xl' : 'bg-white border-black/5 shadow-md'
    }`}>
      
      {/* Header Panel Moderasi with Search Bar */}
      <div className={`p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left ${
        theme === 'dark' ? 'border-white/5' : 'border-black/5'
      }`}>
        <div className="flex items-center gap-2">
          <ShieldAlert size={16} className="text-red-500" />
          <h2 className="text-sm font-black uppercase italic tracking-wide text-red-500">
            Live Security Review Gate ({filteredKomentar.length} of {komentar.length})
          </h2>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          <input
            type="text"
            placeholder="Cari pengirim, ulasan, wisata..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full py-2.5 pl-10 pr-4 rounded-xl border outline-none text-[11px] font-bold uppercase tracking-wider transition-all ${
              theme === 'dark'
                ? 'bg-white/[0.02] border-white/10 text-white placeholder-gray-600 focus:border-red-500/50'
                : 'bg-gray-50 border-black/5 text-black placeholder-gray-400 focus:border-red-500'
            }`}
          />
        </div>
      </div>
      
      {/* Table Data Komentar */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className={`border-b font-black uppercase text-[9px] tracking-widest ${
              theme === 'dark' ? 'bg-black/40 border-white/5 text-gray-500' : 'bg-gray-50 border-black/5 text-gray-400'
            }`}>
              <th className="p-4 pl-8 w-24">Tanggal</th>
              <th className="p-4 w-44">Destinasi Target</th>
              <th className="p-4 w-36">Pengirim (Public)</th>
              <th className="p-4">Isi Komentar / Review</th>
              <th className="p-4 w-20">Rating</th>
              <th className="p-4 text-center pr-8 w-24">Opsi</th>
            </tr>
          </thead>
          <tbody className={`divide-y font-medium ${theme === 'dark' ? 'divide-white/5' : 'divide-black/5'}`}>
            {filteredKomentar.map((item) => (
              <tr key={item.id} className={`transition-colors ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                {/* Tanggal */}
                <td className="p-4 pl-8 font-mono text-gray-500 text-[10px]">
                  {new Date(item.created_at).toLocaleDateString('id-ID')}
                </td>
                {/* Nama Tempat Wisata */}
                <td className="p-4 font-black text-[#ffcc00] uppercase tracking-tight text-[11px]">
                  {item.nama_destinasi}
                </td>
                {/* Nama Pengunjung */}
                <td className="p-4 font-black uppercase text-gray-400">
                  👤 {item.nama_user}
                </td>
                {/* Isi Review */}
                <td className={`p-4 max-w-sm whitespace-normal leading-relaxed text-left ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  "{item.isi_komentar}"
                </td>
                {/* Rating Bintang */}
                <td className="p-4">
                  <div className="flex items-center gap-1 font-black text-[#ffcc00]">
                    <Star size={11} fill="#ffcc00" stroke="none" /> {item.rating}.0
                  </div>
                </td>
                {/* Aksi Delete Admin */}
                <td className="p-4 text-center pr-8">
                  <button 
                    onClick={() => handleDeleteComment(item.id)} 
                    className={`p-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                      theme === 'dark' 
                        ? 'bg-white/5 border-white/5 text-red-400 hover:bg-red-500/20' 
                        : 'bg-gray-50 border-black/5 text-red-600 hover:bg-red-50 shadow-sm'
                    }`}
                    title="Hapus Komentar Toxic"
                  >
                    <Trash2 size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredKomentar.length === 0 && (
        <div className={`p-16 text-center italic text-xs uppercase tracking-widest ${
          theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          Data komentar tidak ditemukan
        </div>
      )}
    </div>
  );
}
