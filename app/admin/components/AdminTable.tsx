"use client";

import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Loader2, Star, MapPin, Flame } from 'lucide-react';
import Swal from 'sweetalert2';

interface Destinasi {
  id: number;
  nama: string;
  lokasi: string;
  deskripsi: string;
  gambar_url: string;
  rating: number;
  is_viral: boolean; // Tambahkan agar sinkron dengan database
  kategori: string;   // Tambahkan agar sinkron dengan database
}

interface AdminTableProps {
  theme: string;
  onEdit: (item: Destinasi) => void;
  refreshTrigger: boolean;
  onRefresh: () => void;
}

/**
 * AdminTable displays destination records in a customizable table.
 */
export default function AdminTable({ theme, onEdit, refreshTrigger, onRefresh }: AdminTableProps) {
  const [destinasi, setDestinasi] = useState<Destinasi[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/destinasi');
      const data = await res.json();
      if (Array.isArray(data)) {
        setDestinasi(data);
      } else {
        setDestinasi([]);
      }
    } catch (err) {
      console.error(err);
      setDestinasi([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: 'Yakin mau hapus?',
      text: "Data destinasi ini bakal hilang selamanya!",
      icon: 'warning',
      showCancelButton: true,
      background: theme === 'dark' ? '#111' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
      confirmButtonColor: '#d33',
      cancelButtonColor: theme === 'dark' ? '#222' : '#aaa',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`/api/destinasi?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          Swal.fire({
            title: 'Terhapus!',
            text: 'Destinasi sukses dibuang.',
            icon: 'success',
            background: theme === 'dark' ? '#111' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
            confirmButtonColor: '#ffcc00'
          });
          onRefresh(); // Ambil data ulang otomatis di dashboard
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="p-20 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#ffcc00] mb-2" size={32} />
        <span className="text-xs text-gray-500 font-mono">LOADING DATA...</span>
      </div>
    );
  }

  if (destinasi.length === 0) {
    return (
      <div className={`p-20 text-center italic text-sm border rounded-2xl border-dashed ${
        theme === 'dark' ? 'text-gray-500 border-white/5 bg-white/[0.01]' : 'text-gray-400 border-black/5 bg-gray-50/50'
      }`}>
        Belum ada data destinasi di database pgAdmin kamu.
      </div>
    );
  }

  return (
    <div className={`border rounded-2xl overflow-hidden transition-colors ${
      theme === 'dark' ? 'bg-[#0d0d0d] border-white/5 shadow-2xl' : 'bg-white border-black/[0.04] shadow-md'
    }`}>
      <div className={`p-6 border-b text-left ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
        <h2 className="text-sm font-black uppercase italic tracking-wide">📂 Database Records ({destinasi.length})</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className={`border-b font-black uppercase text-[9px] tracking-widest ${
              theme === 'dark' ? 'bg-black/40 border-white/5 text-gray-500' : 'bg-gray-50 border-black/5 text-gray-400'
            }`}>
              <th className="p-4 pl-8 w-16">ID</th>
              <th className="p-4">Wisata & Kategori</th>
              <th className="p-4">Lokasi</th>
              <th className="p-4">Rating</th>
              <th className="p-4 text-center pr-8 w-32">Aksi</th>
            </tr>
          </thead>
          <tbody className={`divide-y font-medium ${theme === 'dark' ? 'divide-white/5' : 'divide-black/5'}`}>
            {destinasi.map((item) => (
              <tr key={item.id} className={theme === 'dark' ? 'hover:bg-white/[0.01]' : 'hover:bg-gray-50/50'}>
                <td className="p-4 pl-8 font-mono text-gray-500">{item.id}</td>
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <img 
                      // Dipotong berdasarkan koma, ambil indeks ke-0 (foto pertama)
                      src={item.gambar_url ? item.gambar_url.split(',')[0].trim() : 'https://via.placeholder.com/150?text=No+Image'} 
                      alt="" 
                      className="w-12 h-12 object-cover rounded-xl border border-white/5 bg-gray-900" 
                    />
                    <div className="text-left space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-black uppercase tracking-tight text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {item.nama}
                        </span>
                        {/* MINI VIRAL BADGE */}
                        {item.is_viral && (
                          <span className="bg-red-600/10 text-red-500 border border-red-500/20 px-1.5 py-0.5 rounded text-[8px] font-black flex items-center gap-0.5 scale-90">
                            <Flame size={8} /> VIRAL
                          </span>
                        )}
                      </div>
                      {/* LABEL KATEGORI DETIL DI DALAM ROW */}
                      <span className="text-[9px] font-mono uppercase tracking-wider text-gray-500 block">
                        // {item.kategori}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 font-bold text-gray-400">
                    <MapPin size={12} className="text-[#ffcc00]" /> {item.lokasi}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 font-black text-[#ffcc00]">
                    <Star size={12} fill="#ffcc00" /> {Number(item.rating).toFixed(1)}
                  </div>
                </td>
                <td className="p-4 text-center pr-8">
                  <div className="flex gap-2 justify-center">
                    <button 
                      onClick={() => onEdit(item)} 
                      className={`p-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                        theme === 'dark' ? 'bg-white/5 border-white/5 text-blue-400 hover:bg-blue-500/20' : 'bg-gray-50 border-black/5 text-blue-600 hover:bg-blue-50 shadow-sm'
                      }`} 
                      title="Edit Data"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className={`p-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                        theme === 'dark' ? 'bg-white/5 border-white/5 text-red-400 hover:bg-red-500/20' : 'bg-gray-50 border-black/5 text-red-600 hover:bg-red-50 shadow-sm'
                      }`} 
                      title="Hapus Data"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}