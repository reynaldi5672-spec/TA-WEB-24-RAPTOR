"use client";

import React, { useState, useEffect } from 'react';
import { Trash2, Loader2, Mail, ShieldCheck, Search, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import Swal from 'sweetalert2';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface AdminContactProps {
  theme: string;
  refreshTrigger: boolean;
  onRefresh: () => void;
}

export default function AdminContactMessagesTable({ theme, refreshTrigger, onRefresh }: AdminContactProps) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMessageId, setExpandedMessageId] = useState<number | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (err) {
      console.error("Gagal memuat kotak masuk pesan:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [refreshTrigger]);

  const handleDeleteMessage = async (id: number) => {
    const confirm = await Swal.fire({
      title: 'Hapus pesan ini?',
      text: "Pesan yang dihapus akan hilang permanen dari database!",
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
        const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          Swal.fire({
            title: 'Terhapus!',
            text: 'Pesan berhasil dihapus dari kotak masuk.',
            icon: 'success',
            background: theme === 'dark' ? '#0d0d0d' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
            timer: 1500,
            showConfirmButton: false
          });
          onRefresh();
        }
      } catch (err) {
        console.error("Gagal menghapus pesan:", err);
      }
    }
  };

  const toggleExpandMessage = (id: number) => {
    setExpandedMessageId(expandedMessageId === id ? null : id);
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="p-20 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#ffcc00] mb-2" size={32} />
        <span className="text-xs text-gray-500 font-mono tracking-widest">MEMINDAI KOTAK MASUK PESAN...</span>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className={`p-20 text-center italic text-sm border rounded-2xl border-dashed ${
        theme === 'dark' ? 'text-gray-500 border-white/5 bg-white/5' : 'text-gray-400 border-black/5 bg-gray-50'
      }`}>
        Kotak masuk kosong. Belum ada pesan atau pertanyaan dari halaman kontak.
      </div>
    );
  }

  return (
    <div className={`border rounded-[2rem] overflow-hidden transition-all duration-300 ${
      theme === 'dark' ? 'bg-[#0b0b0b] border-white/5 shadow-2xl' : 'bg-white border-black/5 shadow-md'
    }`}>
      
      {/* Header Panel Inbox with Search Bar */}
      <div className={`p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left ${
        theme === 'dark' ? 'border-white/5' : 'border-black/5'
      }`}>
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-[#ffcc00]" />
          <h2 className="text-sm font-black uppercase italic tracking-wide text-[#ffcc00]">
            Kotak Masuk Pesan Pengunjung ({filteredMessages.length} of {messages.length})
          </h2>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          <input
            type="text"
            placeholder="Cari pengirim, subjek, isi..."
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
      
      {/* Table Data Pesan Kontak */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className={`border-b font-black uppercase text-[9px] tracking-widest ${
              theme === 'dark' ? 'bg-black/40 border-white/5 text-gray-500' : 'bg-gray-50 border-black/5 text-gray-400'
            }`}>
              <th className="p-4 pl-8 w-28">Tanggal</th>
              <th className="p-4 w-36">Pengirim</th>
              <th className="p-4 w-44">Email</th>
              <th className="p-4 w-44">Subjek</th>
              <th className="p-4">Pesan</th>
              <th className="p-4 text-center pr-8 w-24">Opsi</th>
            </tr>
          </thead>
          <tbody className={`divide-y font-medium ${theme === 'dark' ? 'divide-white/5' : 'divide-black/5'}`}>
            {filteredMessages.map((item) => {
              const isExpanded = expandedMessageId === item.id;
              const hasLongMessage = item.message.length > 80;
              const displayMessage = isExpanded || !hasLongMessage
                ? item.message
                : `${item.message.slice(0, 80)}...`;

              return (
                <tr key={item.id} className={`transition-colors ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                  {/* Tanggal */}
                  <td className="p-4 pl-8 font-mono text-gray-500 text-[10px]">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />
                      {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </td>
                  {/* Nama Pengirim */}
                  <td className={`p-4 font-black uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                    {item.name}
                  </td>
                  {/* Email */}
                  <td className="p-4 font-mono text-blue-400 hover:underline">
                    <a href={`mailto:${item.email}`}>{item.email}</a>
                  </td>
                  {/* Subjek Badge */}
                  <td className="p-4">
                    <span className="inline-block text-[8px] font-black uppercase bg-[#ffcc00]/10 text-[#ffcc00] border border-[#ffcc00]/20 px-2.5 py-0.5 rounded-md truncate max-w-[160px]">
                      {item.subject}
                    </span>
                  </td>
                  {/* Isi Pesan */}
                  <td className={`p-4 leading-relaxed text-left max-w-md ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <div className="flex flex-col gap-1 items-start">
                      <p className="whitespace-pre-wrap">"{displayMessage}"</p>
                      {hasLongMessage && (
                        <button 
                          onClick={() => toggleExpandMessage(item.id)}
                          className="text-[#ffcc00] hover:text-[#e6b800] text-[9px] font-black uppercase tracking-wider flex items-center gap-0.5 mt-1 cursor-pointer"
                        >
                          {isExpanded ? (
                            <>Sembunyikan <ChevronUp size={10} /></>
                          ) : (
                            <>Selengkapnya <ChevronDown size={10} /></>
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                  {/* Aksi Delete Admin */}
                  <td className="p-4 text-center pr-8">
                    <button 
                      onClick={() => handleDeleteMessage(item.id)} 
                      className={`p-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/5 text-red-400 hover:bg-red-500/20' 
                          : 'bg-gray-50 border-black/5 text-red-600 hover:bg-red-50 shadow-sm'
                      }`}
                      title="Hapus Pesan"
                    >
                      <Trash2 size={12} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredMessages.length === 0 && (
        <div className={`p-16 text-center italic text-xs uppercase tracking-widest ${
          theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          Data pesan tidak ditemukan
        </div>
      )}
    </div>
  );
}
