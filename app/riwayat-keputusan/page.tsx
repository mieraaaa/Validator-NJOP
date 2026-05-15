import Image from "next/image";
import Link from 'next/link';
import { CircleUser, Search, CircleCheck, CircleX, History, User, Calendar, ChevronDown } from 'lucide-react';

export default function Home() {
  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-x-hidden bg-[#f8fafc] pb-28">

      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[73px] sticky top-0 flex justify-end items-center border border-[#C5C5D3] shadow-xs">
        <h1 className="text-[#00236F] font-bold font-mono text-[24px] absolute left-1/2 -translate-x-1/2">ValidatorNJOP</h1>
        <Link href="/profile">
            <CircleUser className="flex size-5 text-[#1A1B21] mr-5"/>
        </Link>
      </header>

      {/* Content */}
      <div className="w-[93%] mx-auto mt-4">
        {/* Bagian Atas */}
        <div className="w-full flex flex-col gap-2">
            <h2 className="font-mono font-semibold text-[20px] text-[#1A1B21]">Riwayat Validasi</h2>
            {/* Search Bar */}
            <div className="w-full bg-white border-2 border-[#C5C5D3] rounded-md py-2 px-2 shadow-xs placeholder:text-[#6B7280] text-black flex items-center gap-2">
                <Search className="flex size-5 text-[#757682]"/>
                <input id="search" type="search" name="search" 
                    placeholder="Cari NOP atau Alamat..."
                    className="w-full ml-1 outline-none focus:ring-0 font-public-sans text-[14px]"
                />
            </div>
            {/* Filter */}
            <div className="w-full mx-auto mt-3 flex justify-start items-center gap-3 mb-5">
                <button type="button"
                    className="bg-[#1E3A8A] border border-[#00236F] text-white py-2 px-5 rounded-xl flex justify-around items-center gap-2">
                        <Calendar className="w-[15px] h-[15px]"/>
                        <span className="font-mono font-bold text-[11px]">Waktu (Bulan ini)</span>
                        <ChevronDown className="w-[12px] h-[13px]"/>
                </button>
                <button type="button"
                    className="bg-[#FAF8FF] border border-[#C5C5D3] text-[#444651] py-2 px-5 rounded-xl flex justify-center items-center gap-2">
                        <span className="font-mono font-bold text-[11px]">Status</span>
                        <ChevronDown className="w-[12px] h-[13px]"/>
                </button>
            </div>
        </div>

        {/* List Properti */}
        <div className="w-full flex flex-col gap-3">
            {/* Card 1 */}
            <Link href="/berita-setuju-ttd" className="w-full bg-white shadow-xs border-2 border-[#C5C5D3] rounded-sm flex items-center flex-col gap-3 py-4 px-4">
                <div className="w-full flex flex-row justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <div className="font-mono flex flex-col gap-1">
                            <h3 className="font-bold text-[11px] text-[#444651]">NOMOR OBJEK PAJAK</h3>
                            <span className="font-medium text-[14px] text-[#1A1B21] truncate">32.73.010.005.011-0</span>
                        </div>
                        <span className="font-public-sans text-[12px] text-[#444651] leading-tight line-clamp-1">
                            Jl. Jend. Sudirman Kav. 21
                        </span>
                    </div>
                    <div className="rounded-xl bg-[#A6F2D1] text-[#237157] flex justify-center items-center gap-1 px-2 py-1">
                        <CircleCheck className="flex size-3 shrink-0"/>
                        <span className="font-mono font-bold text-[12px]">Setujui</span>
                    </div>
                </div>
                <hr className="border-[#C5C5D3] w-full mx-auto border-t"/>
                <div className="w-full flex flex-row justify-between items-center text-[#444651]">
                    <div className="flex flex-col">
                        <h3 className="font-public-sans text-[12px]">Nilai Ketetapan</h3>
                        <span className="font-mono font-semibold text-[16px] text-[#1A1B21]">Rp 15,5M</span>
                    </div>
                    <span className="font-mono font-medium text-[14px] flex">12 Okt 2023</span>
                </div>
            </Link>
            {/* Card 2 */}
            <Link href="/berita-revisi-ttd" className="w-full bg-white shadow-xs border-2 border-[#C5C5D3] rounded-sm flex items-center flex-col gap-3 py-4 px-4">
                <div className="w-full flex flex-row justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <div className="font-mono flex flex-col gap-1">
                            <h3 className="font-bold text-[11px] text-[#444651]">NOMOR OBJEK PAJAK</h3>
                            <span className="font-medium text-[14px] text-[#1A1B21] truncate">32.73.010.005.012-0</span>
                        </div>
                        <span className="font-public-sans text-[12px] text-[#444651] leading-tight line-clamp-1">
                            Jl. Gatot Subroto No. 42
                        </span>
                    </div>
                    <div className="rounded-xl bg-[#FFF8CB] text-[#341100] flex justify-center items-center gap-1 px-2 py-1">
                        <Image
                            src="/images/common/logo-revisi.svg"
                            alt="Logo Revisi"
                            width={10}
                            height={9}
                            className="shrink-0"        
                        />
                        <span className="font-mono font-bold text-[12px]">Revisi</span>
                    </div>
                </div>
                <hr className="border-[#C5C5D3] w-full mx-auto border-t"/>
                <div className="w-full flex flex-row justify-between items-center text-[#444651]">
                    <div className="flex flex-col">
                        <h3 className="font-public-sans text-[12px]">Nilai Ketetapan</h3>
                        <span className="font-mono font-semibold text-[16px] text-[#1A1B21]">Rp 12,2M</span>
                    </div>
                    <span className="font-mono font-medium text-[14px] flex">10 Okt 2023</span>
                </div>
            </Link>
            {/* Card 3 */}
            <Link href="/berita-tolak-ttd" className="w-full bg-white shadow-xs border-2 border-[#C5C5D3] rounded-sm flex items-center flex-col gap-3 py-4 px-4">
                <div className="w-full flex flex-row justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <div className="font-mono flex flex-col gap-1">
                            <h3 className="font-bold text-[11px] text-[#444651]">NOMOR OBJEK PAJAK</h3>
                            <span className="font-medium text-[14px] text-[#1A1B21] truncate">32.73.010.005.013-0</span>
                        </div>
                        <span className="font-public-sans text-[12px] text-[#444651] leading-tight line-clamp-1">
                            Tebet, Jakarta Selatan
                        </span>
                    </div>
                    <div className="rounded-xl bg-[#FFDAD6] text-[#93000A] flex justify-center items-center gap-1 px-2 py-1">
                        <CircleX className="flex size-3 shrink-0"/>
                        <span className="font-mono font-bold text-[12px]">Tolak</span>
                    </div>
                </div>
                <hr className="border-[#C5C5D3] w-full mx-auto border-t"/>
                <div className="w-full flex flex-row justify-between items-center text-[#444651]">
                    <div className="flex flex-col">
                        <h3 className="font-public-sans text-[12px]">Nilai Ketetapan</h3>
                        <span className="font-mono font-semibold text-[16px] text-[#1A1B21]">Rp 14,1M</span>
                    </div>
                    <span className="font-mono font-medium text-[14px] flex">08 Okt 2023</span>
                </div>
            </Link>
        </div>
    </div>

      {/* Footer */}
      <footer className="w-full max-w-md bg-[#EEEDF4] border-t border-[#C5C5D3] flex justify-around items-center py-2 fixed bottom-0 z-50 left-1/2 -translate-x-1/2">
        <Link href="/antrean-properti" className="flex flex-col justify-center items-center font-bold text-[12px] text-[#444651] py-1 px-4 shrink-0 ">
            <Image
                src="/images/riwayat-keputusan/navbar-queue.svg"
                alt="Logo Navbar Antrian"
                width={18}
                height={20}
                className="shrink-0 mb-1"
            />
            Queue
        </Link>
        <Link href="/riwayat-keputusan" className="bg-[#1E3A8A] rounded-lg flex flex-col justify-center items-center font-bold text-[12px] text-[#90A8FF] py-1 px-4 shrink-0">
            <History className="size-5 mb-1"/>
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