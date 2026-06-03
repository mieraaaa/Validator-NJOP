"use client";

import Image from "next/image";
import Link from 'next/link';
import { 
  Search, 
  CircleCheck, 
  CircleX, 
  History, 
  User, 
  Calendar, 
  ChevronDown,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// Interfaces untuk model data dari Supabase
interface UserRelation {
  nama: string | null;
  nip: string | null;
}

interface DecisionItem {
  id: string;
  nop: string;
  user_id: string | null;
  status_keputusan: string;
  nilai_njop_lama: number;
  nilai_njop_final: number;
  ttd_url: string | null;
  detail_keputusan: {
    alasan?: string;
    catatan_penilai?: string;
    alasan_penolakan?: string;
    catatan?: string;
    alamat?: string;
    tindakan_lanjutan?: string;
  } | null;
  created_at: string;
  users: UserRelation | UserRelation[] | null;
}

// ----------------------------------------------------
// HELPER FORMATTING
// ----------------------------------------------------

// Memformat string NOP mentah menjadi format Indonesia standar (XX.XX.XXX.XXX.XXX-XXXX.X)
const formatNop = (rawNop: string) => {
  if (!rawNop) return "-";
  const cleanNop = rawNop.replace(/\D/g, '');
  if (cleanNop.length === 18) {
    return `${cleanNop.substring(0, 2)}.${cleanNop.substring(2, 4)}.${cleanNop.substring(4, 7)}.${cleanNop.substring(7, 10)}.${cleanNop.substring(10, 13)}-${cleanNop.substring(13, 17)}.${cleanNop.substring(17, 18)}`;
  }
  return rawNop;
};

// Memformat angka besar menjadi format Rupiah ringkas (ex: Rp 15,5M)
const formatRupiahConcise = (value: number) => {
  if (value === null || value === undefined) return "-";
  if (value >= 1_000_000_000) {
    const num = value / 1_000_000_000;
    const formatted = num.toFixed(1).replace('.', ',');
    return `Rp ${formatted}M`;
  }
  if (value >= 1_000_000) {
    const num = value / 1_000_000;
    const formatted = num.toFixed(1).replace('.', ',');
    return `Rp ${formatted} Jt`;
  }
  return `Rp ${value.toLocaleString('id-ID')}`;
};

// Memformat tanggal ISO menjadi "12 Okt 2023"
const formatTanggal = (dateStr: string) => {
  if (!dateStr) return "-";
  try {
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  } catch (e) {
    return "-";
  }
};

// Mendapatkan visual props (label, warna, ikon, link) berdasarkan status keputusan
const getStatusProps = (status: string) => {
  const norm = (status || '').toLowerCase();
  if (norm.includes('setuju') || norm === 'disetujui') {
    return {
      label: 'Setuju',
      bgClass: 'bg-[#A6F2D1] text-[#237157]',
      icon: <CircleCheck className="flex size-3 shrink-0" />,
      hrefPath: '/berita-setuju-ttd'
    };
  } else if (norm.includes('revisi') || norm === 'draf') {
    return {
      label: 'Revisi',
      bgClass: 'bg-[#FFF8CB] text-[#341100]',
      icon: (
        <Image
          src="/images/common/logo-revisi.svg"
          alt="Logo Revisi"
          width={10}
          height={9}
          className="shrink-0"        
        />
      ),
      hrefPath: '/berita-revisi-ttd'
    };
  } else if (norm.includes('tolak')) {
    return {
      label: 'Tolak',
      bgClass: 'bg-[#FFDAD6] text-[#93000A]',
      icon: <CircleX className="flex size-3 shrink-0" />,
      hrefPath: '/berita-tolak-ttd'
    };
  }
  return {
    label: status || 'Pending',
    bgClass: 'bg-gray-200 text-gray-700',
    icon: null,
    hrefPath: '/berita-setuju-ttd'
  };
};

// ----------------------------------------------------
// SUB-COMPONENTS (LOADING, EMPTY, ERROR STATE)
// ----------------------------------------------------

const SkeletonCard = () => (
  <div className="w-full bg-white shadow-xs border-2 border-[#C5C5D3] rounded-sm flex items-center flex-col gap-3 py-4 px-4 animate-pulse">
    <div className="w-full flex flex-row justify-between items-start">
      <div className="flex flex-col gap-2 w-2/3">
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        <div className="h-5 bg-gray-200 rounded w-full"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded-xl w-20"></div>
    </div>
    <div className="w-full h-10 bg-gray-100 rounded-sm"></div>
    <hr className="border-[#C5C5D3] w-full border-t"/>
    <div className="w-full flex flex-row justify-between items-center">
      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="w-full bg-white border-2 border-[#C5C5D3] rounded-sm flex flex-col justify-center items-center py-12 px-6 text-center gap-3 shadow-xs">
    <History className="size-12 text-[#9da3ae] animate-pulse" />
    <div className="flex flex-col gap-1">
      <h3 className="font-mono font-bold text-[16px] text-[#1A1B21]">Belum Ada Keputusan</h3>
      <p className="font-public-sans text-[12px] text-[#757682] max-w-xs leading-relaxed">
        Riwayat keputusan validasi kosong atau tidak ada data yang cocok dengan pencarian dan filter Anda.
      </p>
    </div>
  </div>
);

const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="w-full bg-[#FFF5F5] border-2 border-[#FEB2B2] rounded-sm flex flex-col justify-center items-center py-8 px-6 text-center gap-4 shadow-xs">
    <AlertCircle className="size-10 text-[#E53E3E]" />
    <div className="flex flex-col gap-1">
      <h3 className="font-mono font-bold text-[15px] text-[#C53030]">Gagal Memuat Riwayat</h3>
      <p className="font-public-sans text-[12px] text-[#742A2A] max-w-xs break-words leading-relaxed">
        {message}
      </p>
    </div>
    <button
      onClick={onRetry}
      className="bg-[#E53E3E] text-white font-mono font-bold text-[12px] py-2 px-4 rounded-md hover:bg-[#C53030] flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
    >
      <RefreshCw className="size-3.5" />
      Coba Lagi
    </button>
  </div>
);

// ----------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------

export default function Home() {
  // State manajemen data
  const [decisions, setDecisions] = useState<DecisionItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // State penyaringan & pencarian
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('semua');
  const [timeFilter, setTimeFilter] = useState<'semua' | 'bulan'>('semua');

  // State untuk dropdown penopang
  const [showStatusDropdown, setShowStatusDropdown] = useState<boolean>(false);

  // Ambil data decisions & join ke users dari Supabase
  const fetchDecisionsFromSupabase = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from('decisions')
        .select(`
          id,
          nop,
          user_id,
          status_keputusan,
          nilai_njop_lama,
          nilai_njop_final,
          ttd_url,
          detail_keputusan,
          created_at,
          users (
            nama,
            nip
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setDecisions(data || []);
    } catch (err: any) {
      console.error("Gagal menarik data keputusan:", err);
      setErrorMsg(err.message || "Gagal tersambung ke database Supabase. Periksa jaringan Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDecisionsFromSupabase();
  }, []);

  // Filter data berdasarkan input search & filter dropdowns
  const filteredDecisions = decisions.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    
    // 1. Filter Search (NOP, Alamat, Nama Penilai)
    const nopMatch = (item.nop || '').toLowerCase().includes(searchLower);
    
    const detail = item.detail_keputusan || {};
    const alamatMatch = (detail.alamat || '').toLowerCase().includes(searchLower);
    
    let namaPenilai = '';
    if (item.users) {
      const u = Array.isArray(item.users) ? item.users[0] : item.users;
      namaPenilai = u?.nama || '';
    }
    const penilaiMatch = namaPenilai.toLowerCase().includes(searchLower);
    
    const matchesSearch = nopMatch || alamatMatch || penilaiMatch;

    // 2. Filter Status (semua, setuju, revisi, tolak)
    const normStatus = (item.status_keputusan || '').toLowerCase();
    let matchesStatus = true;
    if (statusFilter !== 'semua') {
      if (statusFilter === 'setuju') {
        matchesStatus = normStatus.includes('setuju') || normStatus === 'disetujui';
      } else if (statusFilter === 'revisi') {
        matchesStatus = normStatus.includes('revisi') || normStatus === 'draf';
      } else if (statusFilter === 'tolak') {
        matchesStatus = normStatus.includes('tolak');
      }
    }

    // 3. Filter Waktu (Bulan Ini)
    let matchesTime = true;
    if (timeFilter === 'bulan' && item.created_at) {
      const now = new Date();
      const itemDate = new Date(item.created_at);
      matchesTime = itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
    }

    return matchesSearch && matchesStatus && matchesTime;
  });

  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-x-hidden bg-[#f8fafc] pb-28">

      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[73px] sticky top-0 z-40 flex justify-end items-center border-b border-[#C5C5D3] shadow-xs">
        <h1 className="text-[#00236F] font-bold font-mono text-[24px] absolute left-1/2 -translate-x-1/2">ValidatorNJOP</h1>
      </header>

      {/* Content */}
      <div className="w-[93%] mx-auto mt-4">
        {/* Bagian Atas */}
        <div className="w-full flex flex-col gap-2">
            <h2 className="font-mono font-semibold text-[20px] text-[#1A1B21]">Riwayat Validasi</h2>
            
            {/* Search Bar */}
            <div className="w-full bg-white border-2 border-[#C5C5D3] rounded-md py-2 px-2 shadow-xs placeholder:text-[#6B7280] text-black flex items-center gap-2 focus-within:border-[#1E3A8A] transition-colors">
                <Search className="flex size-5 text-[#757682]"/>
                <input 
                    id="search" 
                    type="search" 
                    name="search" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari NOP, Alamat, atau Penilai..."
                    className="w-full ml-1 outline-none focus:ring-0 font-public-sans text-[14px]"
                />
            </div>
            
            {/* Filter Buttons */}
            <div className="w-full mx-auto mt-3 flex justify-start items-center gap-3 mb-5 z-30">
                {/* Waktu Filter */}
                <button 
                    type="button"
                    onClick={() => setTimeFilter(prev => prev === 'semua' ? 'bulan' : 'semua')}
                    className={`border py-2 px-4 rounded-xl flex justify-around items-center gap-2 transition-all shrink-0 cursor-pointer ${
                        timeFilter === 'bulan'
                            ? 'bg-[#1E3A8A] border-[#00236F] text-white shadow-xs'
                            : 'bg-[#FAF8FF] border-[#C5C5D3] text-[#444651] hover:bg-gray-50'
                    }`}
                >
                    <Calendar className="w-[15px] h-[15px]"/>
                    <span className="font-mono font-bold text-[11px]">
                        Waktu: {timeFilter === 'bulan' ? 'Bulan Ini' : 'Semua'}
                    </span>
                    <ChevronDown className="w-[12px] h-[13px]"/>
                </button>
                
                {/* Status Filter Dropdown */}
                <div className="relative">
                    <button 
                        type="button"
                        onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                        className={`border py-2 px-4 rounded-xl flex justify-center items-center gap-2 transition-all cursor-pointer ${
                            statusFilter !== 'semua'
                                ? 'bg-[#1E3A8A] border-[#00236F] text-white shadow-xs'
                                : 'bg-[#FAF8FF] border-[#C5C5D3] text-[#444651] hover:bg-gray-50'
                        }`}
                    >
                        <span className="font-mono font-bold text-[11px] capitalize">
                            Status: {statusFilter}
                        </span>
                        <ChevronDown className="w-[12px] h-[13px]"/>
                    </button>
                    
                    {showStatusDropdown && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setShowStatusDropdown(false)}
                        />
                        <div className="absolute left-0 mt-2 w-36 bg-white border border-[#C5C5D3] rounded-md shadow-lg z-20 py-1 font-mono text-[11px]">
                          {['semua', 'setuju', 'revisi', 'tolak'].map((status) => (
                            <button
                              key={status}
                              onClick={() => {
                                setStatusFilter(status);
                                setShowStatusDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2 hover:bg-[#FAF8FF] transition-colors capitalize ${
                                statusFilter === status ? 'text-[#1E3A8A] font-bold bg-[#FAF8FF]' : 'text-[#444651]'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                </div>
            </div>
        </div>

        {/* List Properti */}
        <div className="w-full flex flex-col gap-3">
            {isLoading ? (
              // Tampilkan Skeleton Card saat loading
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : errorMsg ? (
              // Tampilkan Error State jika query gagal
              <ErrorState message={errorMsg} onRetry={fetchDecisionsFromSupabase} />
            ) : filteredDecisions.length === 0 ? (
              // Tampilkan Empty State jika tidak ada data
              <EmptyState />
            ) : (
              // Render riwayat keputusan secara dinamis
              filteredDecisions.map((item) => {
                const { label, bgClass, icon, hrefPath } = getStatusProps(item.status_keputusan);
                
                const detail = item.detail_keputusan || {};
                const alamat = detail.alamat || "Jl. Jend. Sudirman Kav. 21";
                const catatan = detail.alasan || detail.catatan_penilai || detail.alasan_penolakan || detail.catatan || null;
                
                let namaPenilai = "-";
                let nipPenilai = "-";
                if (item.users) {
                  const u = Array.isArray(item.users) ? item.users[0] : item.users;
                  if (u) {
                    namaPenilai = u.nama || "-";
                    nipPenilai = u.nip || "-";
                  }
                }

                return (
                  <Link 
                    key={item.id}
                    href={`${hrefPath}?nop=${item.nop}`} 
                    className="w-full bg-white shadow-xs border-2 border-[#C5C5D3] rounded-sm flex items-center flex-col gap-3 py-4 px-4 hover:border-[#1E3A8A] transition-all duration-200"
                  >
                      <div className="w-full flex flex-row justify-between items-start gap-2">
                          <div className="flex flex-col gap-2 min-w-0 flex-1">
                              <div className="font-mono flex flex-col gap-1">
                                  <h3 className="font-bold text-[11px] text-[#444651] tracking-wider">NOMOR OBJEK PAJAK</h3>
                                  <span className="font-semibold text-[14px] text-[#1A1B21] break-all leading-tight">
                                      {formatNop(item.nop)}
                                  </span>
                              </div>
                              <span className="font-public-sans text-[12px] text-[#444651] leading-tight line-clamp-1">
                                  {alamat}
                              </span>
                          </div>
                          <div className={`rounded-xl flex justify-center items-center gap-1.5 px-2.5 py-1.5 shrink-0 select-none shadow-xs ${bgClass}`}>
                              {icon}
                              <span className="font-bold text-[10px] leading-none">{label}</span>
                          </div>
                      </div>
                      
                      {/* Detail Panel Info (Penilai, Catatan) */}
                      <div className="w-full bg-[#FAF8FF] border border-[#E5E5EB] rounded-sm p-2.5 flex flex-col gap-1.5 text-[11px] font-public-sans">
                          <div className="flex justify-between items-start gap-2">
                              <span className="text-[#757682] font-semibold">Penilai:</span>
                              <span className="text-[#1A1B21] text-right font-medium truncate max-w-[190px]" title={namaPenilai}>
                                  {namaPenilai} {nipPenilai !== "-" ? `(NIP. ${nipPenilai})` : ""}
                              </span>
                          </div>
                          {catatan && (
                              <div className="border-t border-[#E5E5EB] mt-1 pt-1.5 flex flex-col gap-1">
                                  <span className="text-[#757682] font-semibold text-[9px] uppercase tracking-wider">Catatan / Alasan:</span>
                                  <p className="text-[#444651] italic leading-relaxed text-[11px] line-clamp-2">
                                      "{catatan}"
                                  </p>
                              </div>
                          )}
                      </div>

                      <hr className="border-[#C5C5D3] w-full mx-auto border-t"/>
                      <div className="w-full flex flex-row justify-between items-center text-[#444651]">
                          <div className="flex flex-col">
                              <h3 className="font-public-sans text-[12px]">Nilai Ketetapan</h3>
                              <span className="font-mono font-semibold text-[16px] text-[#1A1B21]">
                                  {formatRupiahConcise(item.nilai_njop_final)}
                              </span>
                          </div>
                          <span className="font-mono font-medium text-[14px] flex">
                              {formatTanggal(item.created_at)}
                          </span>
                      </div>
                  </Link>
                );
              })
            )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-md bg-[#EEEDF4] border-t border-[#C5C5D3] flex justify-around items-center py-2 fixed bottom-0 z-40 left-1/2 -translate-x-1/2">
        <Link href="/antrean-properti" className="flex flex-col justify-center items-center font-bold text-[12px] text-[#444651] py-1 px-4 shrink-0 hover:bg-[#E5E4EB] rounded-lg transition-colors">
            <Image
                src="/images/riwayat-keputusan/navbar-queue.svg"
                alt="Logo Navbar Antrian"
                width={18}
                height={20}
                className="shrink-0 mb-1"
            />
            Queue
        </Link>
        <Link href="/riwayat-keputusan" className="bg-[#1E3A8A] rounded-lg flex flex-col justify-center items-center font-bold text-[12px] text-[#90A8FF] py-1 px-4 shrink-0 shadow-xs">
            <History className="size-5 mb-1"/>
            History
        </Link>
        <Link href="/profile" className="flex flex-col justify-center items-center font-bold text-[12px] text-[#444651] py-1 px-4 shrink-0 hover:bg-[#E5E4EB] rounded-lg transition-colors">
            <User className="size-5 text-[#444651] mb-1"/>
            Profile
        </Link>
      </footer>
    </main>
  );
}