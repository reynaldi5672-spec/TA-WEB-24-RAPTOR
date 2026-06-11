"use client";

import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Loader2, Star, MapPin, Flame, Search } from 'lucide-react';
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

interface AdminTableProps {
  theme: string;
  onEdit: (item: Destinasi) => void;
  refreshTrigger: boolean;
  onRefresh: () => void;
}

export default function AdminTable({ theme, onEdit, refreshTrigger, onRefresh }: AdminTableProps) {
  const [destinasi, setDestinasi] = useState<Destinasi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
          onRefresh();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getCategoryBadge = (kategori: string) => {
    const cleanKategori = kategori.toLowerCase();
    
    const badges: Record<string, { label: string, color: string }> = {
      pantai: { label: "🌊 Pantai", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
      pemandangan: { label: "⛰️ Pemandangan", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
      wisata_alam: { label: "🌿 Wisata Alam", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
      wisata_kota: { label: "🏙️ Wisata Kota", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
      heritage: { label: "🏛️ Cagar Budaya", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
      kuliner: { label: "🍽️ Kuliner", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
      adventure: { label: "🧗 Petualangan", color: "bg-red-500/10 text-red-500 border-red-500/20" },
      terpopuler: { label: "⭐ Terpopuler", color: "bg-[#ffcc00]/10 text-[#ffcc00] border-[#ffcc00]/20" }
    };
    
    const badge = badges[cleanKategori] || { label: kategori, color: "bg-gray-500/10 text-gray-500 border-gray-500/20" };
    
    return (
      <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider border ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const filteredDestinasi = destinasi.filter(d => 
    d.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.lokasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.kategori.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className={`border rounded-[2rem] overflow-hidden transition-all duration-300 ${
      theme === 'dark' ? 'bg-[#0b0b0b] border-white/5 shadow-2xl' : 'bg-white border-black/[0.05] shadow-md'
    }`}>
      
      {/* Table Header with Search Bar */}
      <div className={`p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left ${
        theme === 'dark' ? 'border-white/5' : 'border-black/5'
      }`}>
        <h2 className="text-sm font-black uppercase italic tracking-wider flex items-center gap-2">
          📂 Database Records ({filteredDestinasi.length} of {destinasi.length})
        </h2>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          <input
            type="text"
            placeholder="Cari wisata, lokasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full py-2.5 pl-10 pr-4 rounded-xl border outline-none text-[11px] font-bold uppercase tracking-wider transition-all ${
              theme === 'dark'
                ? 'bg-white/[0.02] border-white/10 text-white placeholder-gray-600 focus:border-[#ffcc00]/50'
                : 'bg-gray-50 border-black/5 text-black placeholder-gray-400 focus:border-[#ffcc00]'
            }`}
          />
        </div>
      </div>
      
      {/* Table Content */}
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
            {filteredDestinasi.map((item) => (
              <tr key={item.id} className={`transition-colors ${theme === 'dark' ? 'hover:bg-white/[0.01]' : 'hover:bg-gray-50/50'}`}>
                <td className="p-4 pl-8 font-mono text-gray-500">{item.id}</td>
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.gambar_url ? item.gambar_url.split(',')[0].trim() : 'https://via.placeholder.com/150?text=No+Image'} 
                      alt="" 
                      className="w-12 h-12 object-cover rounded-xl border border-white/5 bg-gray-900" 
                    />
                    <div className="text-left space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-black uppercase tracking-tight text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {item.nama}
                        </span>
                        {item.is_viral && (
                          <span className="bg-red-600/10 text-red-500 border border-red-500/20 px-1.5 py-0.5 rounded text-[8px] font-black flex items-center gap-0.5 scale-90">
                            <Flame size={8} className="animate-bounce" /> VIRAL
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        {getCategoryBadge(item.kategori)}
                      </div>
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
                    <Star size={12} fill="#ffcc00" stroke="none" /> {Number(item.rating).toFixed(1)}
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

      {filteredDestinasi.length === 0 && (
        <div className={`p-16 text-center italic text-xs uppercase tracking-widest ${
          theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          Data destinasi tidak ditemukan
        </div>
      )}
    </div>
  );
}