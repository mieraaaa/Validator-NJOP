import Image from "next/image";
import Link from 'next/link';
import { CircleUser, History, User, ArrowLeft, MapPin, Images, ArrowRight, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden bg-[#f8fafc] pb-20">

      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[73px] sticky top-0 flex justify-between items-center border-b border-[#C5C5D3] shadow-xs px-5">
        <ArrowLeft className="flex size-5 text-[#1A1B21]"/>
        <h1 className="text-[#00236F] font-bold font-mono text-[24px] absolute left-1/2 -translate-x-1/2">ValidatorNJOP</h1>
        <CircleUser className="flex size-5 text-[#1A1B21]"/>
      </header>

      {/* Content */}
      <div className="w-[93%] mx-auto mt-4">
        <div className="w-full flex flex-col gap-1">
            <h2 className="font-bold text-[18px] text-[#1A1B21]">NOP: 31.71.040.003.012-0051.0</h2>
            <div className="flex items-center gap-1">
                <MapPin className="size-4 shrink-0 text-[#444651]"/>
                <p className="text-[16px] text-[#444651]">Jl. Kebon Kacang Raya No. 24, Jakarta Pusat</p>
            </div>
        </div>

        {/* Card Informasi Properti */}
        <div className="w-full bg-white border-2 border-[#C5C5D3] rounded-md mt-6 py-4 px-4 shadow-xs">
            <h3 className="font-bold text-[16px] text-[#1A1B21]">Informasi Properti</h3>
            <hr className="border-[#E3E1E9] mt-1 mb-3 border-t-2"></hr>
            <div className="w-full gap-x-4 gap-y-2 grid grid-cols-2">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                        <span className="text-[12px] text-[#444651]">LUAS TANAH</span>
                        <span className="font-bold text-[14px] text-[#1A1B21]">450 m²</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[12px] text-[#444651]">TAHUN BANGUN</span>
                        <span className="font-bold text-[14px] text-[#1A1B21]">2015</span>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                        <span className="text-[12px] text-[#444651]">LUAS BANGUNAN</span>
                        <span className="font-bold text-[14px] text-[#1A1B21]">320 m²</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[12px] text-[#444651]">ZONASI</span>
                        <span className="font-bold text-[14px] text-[#1A1B21]">Komersial</span>
                    </div>
                </div>
            </div>
            <hr className="border-[#E3E1E9] mt-5 mb-1 border-t-2"></hr>
            <Link href="/peta-foto" className="w-full bg-[#F4F3FA] rounded-sm flex justify-between items-center font-bold text-[16px] text-[#00236F] py-2 px-3 mt-4">
                <div className="flex justify-center items-center gap-2">
                    <Images className="size-5 shrink-0"/>
                    <span>Lokasi & Dokumentasi</span>
                </div>
                <ArrowRight className="size-5 shrink-0"/>
            </Link>
        </div>
        {/* Estimasi NJOP */}
        <div className="w-full bg-white border-2 border-[#C5C5D3] border-l-[5px] border-l-[#00236F] rounded-md mt-6 py-5 px-4 shadow-xs flex-col justify-center text-center">
            <h3 className="font-bold text-[12px] text-[#444651]">ESTIMASI NJOP BUMI</h3>
            <div className="flex justify-center items-baseline">
                <span className="font-bold text-[32px] text-[#00236F]">Rp 15.500.000</span>
                <span className="font-bold text-[16px] text-[#444651]">/m²</span>
            </div>
            <div className="bg-[#D1FAE5] rounded-xl w-max mx-auto font-bold text-[12px] text-[#065F46] flex justify-center items-center px-2 py-1 gap-1 mt-2">
                <TrendingUp className="size-3"/>
                +5.2% dari tahun lalu
            </div>
        </div>
      </div>
      

      {/* Footer */}
      <footer className="w-full max-w-md bg-[#EEEDF4] border-t border-[#C5C5D3] flex justify-around items-center py-2 mt-10 fixed bottom-0 left-0 z-50 left-1/2 -translate-x-1/2">
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