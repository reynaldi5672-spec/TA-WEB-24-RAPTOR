"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { MessageSquare, Send, Bot, User, Sparkles } from 'lucide-react';

/**
 * Represents a single message in the chat conversation.
 */
interface ChatMessage {
  /** Unique identifier for the message. */
  id: string;
  /** Identity of the sender (the virtual guide or the user). */
  sender: 'guide' | 'user';
  /** The actual text content of the message. */
  text: string;
  /** Formatted time string (e.g., "14:30"). */
  timestamp: string;
}

interface PresetQuestion {
  q: string;
  a: string;
}

const PRESET_QUESTIONS: PresetQuestion[] = [
  {
    q: "🗺️ Bagaimana rute menuju ke pantai?",
    a: "Rute ke pantai pesisir Pesawaran/Lampung Selatan dari pusat kota Bandar Lampung dapat ditempuh melalui Jalan RE Martadinata ke arah Teluk Betung, lalu ikuti jalan lurus sepanjang pesisir. Waktu tempuh berkisar antara 40-90 menit tergantung pantai tujuan."
  },
  {
    q: "🍲 Apa saja kuliner khas wajib dicoba?",
    a: "Jangan lewatkan Bakso Sony yang legendaris, Kopi Lampung yang harum, Keripik Pisang Cokelat khas di Jl. Pagar Alam, serta Seruit (hidangan ikan bakar khas Lampung yang disajikan dengan sambal terasi, tempoyak, dan mangga)."
  },
  {
    q: "💰 Tips hemat liburan di Bandar Lampung?",
    a: "Sewa sepeda motor (sekitar Rp 70rb-80rb/hari) agar lebih fleksibel menjelajah. Untuk makanan, pilihlah warung lokal atau tenda pinggir jalan. Datanglah berkelompok jika ingin menyeberang ke Pulau Pahawang agar bisa patungan sewa kapal."
  },
  {
    q: "💎 Destinasi tersembunyi / hidden gems?",
    a: "Coba kunjungi Pantai Gigi Hiu di Tanggamus untuk lanskap karang yang megah, atau Pantai Minang Rua di Lampung Selatan yang memiliki air terjun mini di tepi pantai dan penangkaran penyu."
  }
];

/**
 * VirtualGuide Component
 * 
 * A simulated chatbot experience ("Kak Rajo") that provides automated responses to 
 * frequently asked questions about Bandar Lampung's tourism. It features a typing 
 * indicator, predefined question buttons, and a message history log.
 * 
 * @returns {JSX.Element | null} The rendered virtual guide component.
 */
export default function VirtualGuide() {
  /** Theme context for adaptive styling. */
  const { isDarkMode } = useTheme();

  /** State for the complete conversation history. */
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  /** Local state for the text currently in the input field. */
  const [inputText, setInputText] = useState("");

  /** State indicating whether the bot is currently "typing" a response. */
  const [isTyping, setIsTyping] = useState(false);

  /** Reference to the end of the chat log for automatic scrolling. */
  const chatEndRef = useRef<HTMLDivElement>(null);

  /** Hydration safety flag for client-side rendering. */
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    /**
     * Generates a simple timestamp string for message metadata.
     */
    const getTimestamp = () => {
      const now = new Date();
      return now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    };
    
    // Initial greeting from the virtual guide.
    setMessages([
      {
        id: 'welcome',
        sender: 'guide',
        text: "Tabik Pun! 🙏 Halo, saya Kak Rajo, pemandu wisata virtual Bandar Lampung. Saya siap membantu memberikan panduan seputar rute, kuliner khas, tips berhemat, dan destinasi tersembunyi. Silakan klik pertanyaan populer di bawah atau ketik pertanyaan Anda sendiri!",
        timestamp: getTimestamp()
      }
    ]);
  }, []);

  // Effect to handle automatic scrolling to the latest message.
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  /**
   * Helper to get the current system time in a formatted string.
   * 
   * @returns {string} The formatted time (HH:mm).
   */
  const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  /**
   * Orchestrates sending a message and triggering the automated reply.
   * 
   * @param {string} textToSend - The text content to be sent by the user.
   */
  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // 1. Add User Message to the state.
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: getTimestamp()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // 2. Simulate bot processing time and append the reply.
    setTimeout(() => {
      // Find a matching answer from the preset questions list.
      const matched = PRESET_QUESTIONS.find(
        (pq) => pq.q.toLowerCase().includes(textToSend.toLowerCase()) || textToSend.toLowerCase().includes(pq.q.substring(3).toLowerCase())
      );

      let replyText = "";
      if (matched) {
        replyText = matched.a;
      } else {
        replyText = "Pertanyaan yang sangat menarik! Terkait detail tersebut, Anda juga bisa menanyakan langsung ke Pos Informasi Dinas Pariwisata Bandar Lampung di nomor resmi (0721) 251412 atau email ke info@pariwisatabandarlampung.go.id untuk mendapatkan bantuan pramuwisata lokal berlisensi di lapangan.";
      }

      const guideReply: ChatMessage = {
        id: `guide-${Date.now()}`,
        sender: 'guide',
        text: replyText,
        timestamp: getTimestamp()
      };
      
      setMessages((prev) => [...prev, guideReply]);
      setIsTyping(false);
    }, 1200);
  };

  if (!mounted) return null;

  return (
    <div className={`p-6 md:p-10 rounded-[2.5rem] border text-left transition-all duration-500 ${
      isDarkMode ? 'bg-[#0d0d0d] border-white/5 shadow-2xl' : 'bg-white border-black/[0.04] shadow-xl'
    }`}>
      
      {/* Title */}
      <div className="flex items-center gap-3.5 mb-8 border-b pb-6 border-gray-500/10">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
          isDarkMode ? 'bg-[#ffcc00]/5 border-[#ffcc00]/20 text-[#ffcc00]' : 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#b38f00]'
        }`}>
          <MessageSquare size={22} className="animate-pulse" />
        </div>
        <div>
          <span className="text-[#ffcc00] text-[9px] font-black uppercase tracking-[0.2em]">Pemandu Interaktif</span>
          <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight leading-none">
            Asisten <span className="text-[#ffcc00]">Pemandu</span> Virtual
          </h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Preset Questions (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Pertanyaan Populer
            </span>
            <div className="flex flex-col gap-2.5">
              {PRESET_QUESTIONS.map((pq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(pq.q)}
                  disabled={isTyping}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 text-xs font-bold tracking-wide cursor-pointer ${
                    isTyping ? 'opacity-50 cursor-not-allowed' : ''
                  } ${
                    isDarkMode 
                      ? 'border-white/5 bg-white/[0.01] text-gray-300 hover:border-[#ffcc00] hover:text-[#ffcc00]' 
                      : 'border-black/5 bg-gray-50 text-gray-700 hover:border-[#ffcc00] hover:text-[#b38f00] hover:bg-gray-100'
                  }`}
                >
                  {pq.q}
                </button>
              ))}
            </div>
          </div>

          <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
            isDarkMode ? 'bg-white/[0.01] border-white/5 text-gray-500' : 'bg-gray-50 border-black/5 text-gray-500'
          }`}>
            <span className="font-bold uppercase tracking-wider text-[8px] block mb-1">Status Pemandu</span>
            Kak Rajo siap memandu 24/7. Seluruh jawaban dikurasi dari panduan Dinas Pariwisata resmi Bandar Lampung.
          </div>
        </div>

        {/* Right Side: Chat Area (8 Columns) */}
        <div className={`lg:col-span-8 flex flex-col justify-between border rounded-[2rem] overflow-hidden min-h-[450px] ${
          isDarkMode ? 'border-white/5 bg-black/40' : 'border-black/5 bg-gray-50/30 shadow-inner'
        }`}>
          
          {/* Chat Messages Log */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[360px]">
            {messages.map((msg) => {
              const isGuide = msg.sender === 'guide';
              return (
                <div key={msg.id} className={`flex gap-3 max-w-[85%] ${isGuide ? 'mr-auto text-left' : 'ml-auto flex-row-reverse text-right'}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border text-xs font-black ${
                    isGuide 
                      ? (isDarkMode ? 'bg-[#ffcc00]/10 border-[#ffcc00]/20 text-[#ffcc00]' : 'bg-[#ffcc00] border-transparent text-black')
                      : (isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-[#1a1a1a] border-transparent text-white')
                  }`}>
                    {isGuide ? <Bot size={14} /> : <User size={14} />}
                  </div>

                  {/* Bubble */}
                  <div className="space-y-1">
                    <div className={`p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-line font-medium shadow-sm ${
                      isGuide
                        ? (isDarkMode ? 'bg-white/[0.03] border border-white/5 text-gray-200' : 'bg-white border border-black/[0.03] text-gray-800')
                        : 'bg-[#ffcc00] text-black font-semibold'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="block text-[8px] font-bold text-gray-500 uppercase tracking-widest font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 max-w-[80%] mr-auto text-left">
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border text-xs font-black ${
                  isDarkMode ? 'bg-[#ffcc00]/10 border-[#ffcc00]/20 text-[#ffcc00]' : 'bg-[#ffcc00] border-transparent text-black'
                }`}>
                  <Bot size={14} />
                </div>
                <div className={`p-4 rounded-2xl border flex items-center gap-1.5 ${
                  isDarkMode ? 'bg-white/[0.03] border-white/5' : 'bg-white border-black/[0.03]'
                }`}>
                  <span className="h-1.5 w-1.5 bg-[#ffcc00] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="h-1.5 w-1.5 bg-[#ffcc00] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="h-1.5 w-1.5 bg-[#ffcc00] rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Form Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className={`p-4 border-t flex gap-2 items-center ${
              isDarkMode ? 'border-white/5 bg-black/60' : 'border-black/5 bg-white'
            }`}
          >
            <input
              type="text"
              placeholder="Tanyakan sesuatu ke Kak Rajo (misal: 'kuliner', 'oleh-oleh')..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isTyping}
              className={`flex-1 py-3 px-5 rounded-xl border text-xs font-bold outline-none transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/[0.02] border-white/10 focus:border-[#ffcc00]/50 text-white placeholder-gray-600' 
                  : 'bg-white border-black/10 focus:border-[#ffcc00] text-black placeholder-gray-400'
              }`}
            />
            <button
              type="submit"
              disabled={isTyping || !inputText.trim()}
              className="bg-[#ffcc00] hover:bg-[#ffb300] disabled:opacity-40 disabled:cursor-not-allowed text-black p-3.5 rounded-xl flex items-center justify-center transition-all cursor-pointer font-bold"
            >
              <Send size={15} />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
