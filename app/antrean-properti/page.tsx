"use client";

import Image from "next/image";
import Link from 'next/link';
import { CircleUser, Search, CircleAlert, Clock, MapPin, ArrowRight, History, User } from 'lucide-react';
import { useEffect, useState } from "react";
import { usePropertyStore } from "@/store/usePropertyStore";

export default function AntreanProperti() {
  const { antrean, isLoading, error, searchQuery, setSearchQuery, fetchAntrean } = usePropertyStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'Terbaru' | 'Prioritas'>('Terbaru');

  useEffect(() => {
    fetchAntrean();
  }, [fetchAntrean]);

  // Reset pagination on search or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  // Derived States
  const searchLower = searchQuery.toLowerCase();
  const searchedAntrean = antrean.filter(item => 
    item.nopString.toLowerCase().includes(searchLower) ||
    item.jalanOp.toLowerCase().includes(searchLower)
  );

  const sortedAntrean = [...searchedAntrean].sort((a, b) => {
    if (sortBy === 'Prioritas') {
      const pMap: any = { High: 3, Medium: 2, Low: 1 };
      if (pMap[a.priority] !== pMap[b.priority]) {
        return pMap[b.priority] - pMap[a.priority]; // Descending priority
      }
      return a.deadlineDays - b.deadlineDays; // Ascending deadline days if tie
    } else {
      // Terbaru
      return new Date(b.dateReceived).getTime() - new Date(a.dateReceived).getTime();
    }
  });

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(sortedAntrean.length / ITEMS_PER_PAGE) || 1;
  const displayAntrean = sortedAntrean.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const urgentCount = antrean.filter(p => p.priority === 'High').length;

  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-x-hidden bg-[#f8fafc] pb-28">
      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[73px] sticky top-0 flex justify-end items-center border border-[#C5C5D3] shadow-xs z-10">
        <h1 className="text-[#00236F] font-bold font-mono text-[24px] absolute left-1/2 -translate-x-1/2">ValidatorNJOP</h1>
        <Link href="/profile">
            <CircleUser className="flex size-5 text-[#1A1B21] mr-5"/>
        </Link>
      </header>

      {/* Content */}
      <div className="w-[93%] mx-auto mt-4">
        <h2 className="font-bold text-[22px] text-[#1A1B21]">Antrean Properti</h2>
        
        {/* Card Total Antrian Properti */}
        <div className="w-full p-2 mt-2 px-3 bg-white border-2 border-[#C5C5D3] rounded-md shadow-xs justify-items-start items-center grid grid-cols-2">
            <div className="text-left">
                <p className="font-bold text-[12px] text-[#444651]">TOTAL ANTRIAN</p>
                <div className="flex items-center gap-1">
                    <span className="font-mono font-semibold text-[20px] text-[#00236F]">
                        {isLoading ? "..." : antrean.length}
                    </span>
                    <p className="text-[14px] text-[#444651]">Properti</p>
                </div>
            </div>
            <div className="text-left">
                <p className="font-bold text-[12px] text-[#444651]">PERLU PERHATIAN</p>
                <div className="flex items-center gap-1">
                    <span className="font-mono font-semibold text-[20px] text-[#BA1A1A]">
                        {isLoading ? "..." : urgentCount}
                    </span>
                    <p className="text-[14px] text-[#444651]">Urgent</p>
                </div>
            </div>
        </div>

        {/* Search Bar */}
        <div className="w-full bg-white border-2 border-[#C5C5D3] rounded-md mt-5 py-2 px-2 shadow-xs placeholder:text-[#6B7280] text-black flex items-center gap-2">
            <Search className="flex size-5 text-[#757682]"/>
            <input id="search" type="search" name="search" 
                placeholder="Cari NOP atau Alamat..."
                className="w-full ml-1 outline-none focus:ring-0 font-public-sans text-[14px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

        {/* Filter */}
        <div className="w-full mx-auto mt-3 flex justify-start items-center gap-3 mb-5">
            <button type="button"
                onClick={() => setSortBy('Prioritas')}
                className={`text-[16px] py-3 px-3 rounded-xl flex justify-center items-center gap-2 transition-colors ${
                  sortBy === 'Prioritas' ? 'bg-[#002452] text-white' : 'bg-[#E9E7EC] text-[#44474F]'
                }`}>
                    <CircleAlert className={`size-4 ${sortBy === 'Prioritas' ? 'text-white' : 'text-[#44474F]'}`}/>
                    Prioritas
            </button>
            <button type="button"
                onClick={() => setSortBy('Terbaru')}
                className={`text-[16px] py-3 px-3 rounded-xl flex justify-center items-center gap-2 transition-colors ${
                  sortBy === 'Terbaru' ? 'bg-[#002452] text-white' : 'bg-[#E9E7EC] text-[#44474F]'
                }`}>
                    <Clock className={`size-4 ${sortBy === 'Terbaru' ? 'text-white' : 'text-[#44474F]'}`}/>
                    Terbaru
            </button>
        </div>

        {/* Error Handling */}
        {error && (
            <div className="w-full p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">Error!</span> {error}
            </div>
        )}

        {/* Loading State */}
        {isLoading && (
            <div className="flex justify-center my-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00236F]"></div>
            </div>
        )}

        {/* List Properti */}
        {!isLoading && !error && (
            <div className="w-full flex flex-col gap-3">
                {displayAntrean.length === 0 ? (
                    <div className="text-center py-10 text-[#757682]">Tidak ada antrean properti.</div>
                ) : (
                    displayAntrean.map((item, idx) => (
                        <div key={item.nopString} className="w-full bg-white border-2 border-[#C5C5D3] rounded-md py-4 px-4 shadow-xs">
                            <div className="flex gap-4">
                                <Image
                                    src={`/images/antrean-properti/rumah-${(idx % 3) + 1}.svg`}
                                    alt={`Foto Rumah ${idx + 1}`}
                                    width={78}
                                    height={78}
                                    className="shrink-0 object-cover rounded-md"
                                />
                                <div className="flex-1 flex justify-between items-start gap-2 min-w-0">
                                    <div className="pt-3 flex flex-col flex-1 min-w-0">
                                        <h3 className="font-bold text-[12px] text-[#444651]">NOP</h3>
                                        <p className="font-bold text-[14px] text-[#00236F] truncate">{item.nopString}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <MapPin className="size-4 shrink-0 text-[#444651]"/>
                                            <p className="text-[14px] text-[#1A1B21] leading-tight line-clamp-1">{item.jalanOp}</p>
                                        </div>
                                    </div>
                                    <div className={`font-bold text-[10px] rounded-2xl py-1 px-2 whitespace-nowrap shrink-0 ${
                                        item.priority === 'High' ? 'bg-[#FEE2E2] border border-[#FCA5A5] text-[#991B1B]' : 
                                        item.priority === 'Medium' ? 'bg-[#FEF3C7] border border-[#FCD34D] text-[#92400E]' :
                                        'bg-[#E3E1E9] border border-[#C5C5D3] text-[#1A1B21]'
                                    }`}>
                                        Prioritas {item.priority === 'High' ? 'Tinggi' : item.priority === 'Medium' ? 'Sedang' : 'Rendah'}
                                    </div>
                                </div>
                            </div>
                            <hr className="border-[#E3E1E9] mt-4 mb-2 border-t-2"></hr>
                            <div className="w-full flex justify-between items-center gap-2">
                                <div className="text-[12px] flex flex-wrap items-center gap-x-3 gap-y-1">
                                    <div className="flex gap-1 text-[#1A1B21]">
                                        <span className="font-bold">Status:</span>
                                        {item.status}
                                    </div>
                                    <span className="text-[#757682] text-[15px] hidden sm:block">•</span>
                                    <div className={`flex gap-1 ${item.priority === 'High' ? 'text-[#BA1A1A]' : 'text-[#1A1B21]'}`}>
                                        <span className="font-bold">Deadline:</span>
                                        {item.deadlineDays} Hari Lagi
                                    </div>
                                </div>
                                <Link href={`/detail-properti?nop=${item.nopString.replace(/[\.\-]/g, '')}`} className="shrink-0">
                                    <ArrowRight className="size-5 text-[#444651]"/>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        )}

        {/* Pagination UI */}
        {!isLoading && !error && displayAntrean.length > 0 && (
            <div className="flex justify-between items-center mt-5 mb-6">
                <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white border-2 border-[#C5C5D3] rounded-md text-[#444651] disabled:opacity-40 disabled:bg-gray-100 font-bold text-sm transition-all active:scale-95">
                    Prev
                </button>
                <span className="text-[14px] text-[#444651] font-medium">Halaman {currentPage} dari {totalPages}</span>
                <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white border-2 border-[#C5C5D3] rounded-md text-[#444651] disabled:opacity-40 disabled:bg-gray-100 font-bold text-sm transition-all active:scale-95">
                    Next
                </button>
            </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full max-w-md bg-[#EEEDF4] border-t border-[#C5C5D3] flex justify-around items-center py-2 fixed bottom-0 z-50 left-1/2 -translate-x-1/2">
        <Link href="/antrean-properti" className="bg-[#1E3A8A] rounded-lg flex flex-col justify-center items-center font-bold text-[12px] text-[#90A8FF] py-1 px-4 shrink-0 ">
            <Image
                src="/images/common/navbar-queue.svg"
                alt="Logo Navbar Antrian"
                width={18}
                height={20}
                className="shrink-0 mb-1"
            />
            Queue
        </Link>
        <Link href="/riwayat-keputusan" className="flex flex-col justify-center items-center font-bold text-[12px] text-[#444651] py-1 px-4 shrink-0">
            <History className="size-5 text-[#444651] mb-1"/>
            History
        </Link>
        <Link href="/profile" className="flex flex-col justify-center items-center font-bold text-[12px] text-[#444651] py-1 px-4 shrink-0">
            <User className="size-5 text-[#444651] mb-1"/>
            Profile
        </Link>
      </footer>
    </main>
  );
}