import Image from "next/image";
import Link from 'next/link';
import { CircleUser, ArrowLeft, MapPin, Images, ArrowRight, TrendingUp, Map } from 'lucide-react';

export default function Home() {
  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden bg-[#f8fafc] pb-32">

      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[73px] sticky top-0 flex justify-between items-center border-b border-[#C5C5D3] shadow-xs px-5">
        <Link href="/antrean-properti">
            <ArrowLeft className="flex size-5 text-[#1A1B21]"/>
        </Link>
        <h1 className="text-[#00236F] font-bold font-mono text-[24px] absolute left-1/2 -translate-x-1/2">ValidatorNJOP</h1>
        <Link href="/profile">
            <CircleUser className="flex size-5 text-[#1A1B21]"/>
        </Link>
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
            <hr className="border-[#E3E1E9] mt-1 mb-3 border-t-2"/>
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
            <hr className="border-[#E3E1E9] mt-5 mb-1 border-t-2"/>
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
            <div className="flex justify-center items-center">
                <span className="font-bold text-[32px] text-[#00236F]">Rp 15.500.000</span>
                <span className="font-bold text-[16px] text-[#444651]">/m²</span>
            </div>
            <div className="bg-[#D1FAE5] rounded-xl w-max mx-auto font-bold text-[12px] text-[#065F46] flex justify-center items-center px-2 py-1 gap-1 mt-2">
                <TrendingUp className="size-3"/>
                +5.2% dari tahun lalu
            </div>
        </div>
        {/* Data Pembanding */}
        <div className="w-full bg-[#f4f3fa] border-2 border-[#C5C5D3] rounded-md mt-6 shadow-xs overflow-hidden">
            <div className="w-full border-b-2 border-b-[#C5C5D3] py-4 px-5 flex justify-between items-center">
                <h4 className="font-mono font-semibold text-[16px] text-[#1A1B21]">Data Pembanding (Radius 500m)</h4>
                <Map className="size-5 shrink-0 text-[#444651]"/>
            </div>
            <div className="bg-white w-full border-b-2 border-b-[#C5C5D3] py-3 px-3 flex justify-between items-center gap-3">
                <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex justify-center items-center gap-1 font-mono font-semibold text-[14px] text-[#1A1B21]">
                        <span className="shrink-0">NOP:</span>
                        <span className="truncate text-left [direction:rtl] break-all">32.73.010.005.045-0</span>
                    </div>
                    <span className="text-[#444651] text-[12px]">Jarak: 120m</span>
                </div>
                <span className="font-bold text-[14px] text-[#1A1B21] shrink-0">Rp 15.200.000 / m²</span>
            </div>
            <div className="w-full border-b-2 border-b-[#C5C5D3] py-3 px-3 flex justify-between items-center gap-3">
                <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex justify-center items-center gap-1 font-mono font-semibold text-[14px] text-[#1A1B21]">
                        <span className="shrink-0">NOP:</span>
                        <span className="truncate text-left [direction:rtl] break-all">32.73.010.005.58-0</span>
                    </div>
                    <span className="text-[#444651] text-[12px]">Jarak: 250m</span>
                </div>
                <span className="font-bold text-[14px] text-[#1A1B21] shrink-0">Rp 14.800.000 / m²</span>
            </div>
            <div className="bg-white w-full py-3 px-3 flex justify-between items-center gap-3">
                <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex justify-center items-center gap-1 font-mono font-semibold text-[14px] text-[#1A1B21]">
                        <span className="shrink-0">NOP:</span>
                        <span className="truncate text-left [direction:rtl] break-all">32.73.010.005.62-0</span>
                    </div>
                    <span className="text-[#444651] text-[12px]">Jarak: 400m</span>
                </div>
                <span className="font-bold text-[14px] text-[#1A1B21] shrink-0">Rp 16.100.000 / m²</span>
            </div>
        </div>
        {/* Komparasi Wilayah */}
        <div className="w-full bg-white border-2 border-[#C5C5D3] rounded-md mt-6 py-5 px-4 shadow-xs">
            <h3 className="font-bold text-[16px] text-[#1A1B21]">Komparasi Wilayah</h3>
            <hr className="border-[#C5C5D3] my-1 border-t-2"/>
            <div className="w-full relative h-48">
                {/* Background */}
                <div className="w-full flex flex-col pt-10 pb-3 gap-14 text-[#f3f3f6] pointer-events-none">
                    <hr/>
                    <hr/>
                    <hr/>
                    <hr/>
                </div>
                {/* Foreground */}
                <div className="w-full grid grid-cols-3 inset-0 z-10 justify-between absolute pt-20">
                    {/* Rata-rata Kelurahan */}
                    <div className="flex flex-col items-center justify-center text-center translate-y-2 gap-1">
                        <span className="font-public-sans text-[12px] text-[#444651]">14.5M</span>
                        <hr className="text-[#C5C5D3] border-t w-[60%]"/>
                        <span className="font-bold text-[12px] text-[#444651]">Rata-rata <br/> Kelurahan </span>
                    </div>
                    {/* Objek Ini */}
                    <div className="flex flex-col items-center justify-center text-center text-[#00236F] gap-1">
                        <span className="font-public-sans text-[12px]">15.5M</span>
                        <div className="relative flex justify-center items-center w-full">
                            <hr className="border-t-2 w-[60%]"/>
                            <div className="size-2 absolute rounded-full bg-[#00236F]"></div>
                        </div>
                        <span className="font-bold text-[12px]">Objek <br/> Ini</span>
                    </div>
                    {/* Max Radius */}
                    <div className="flex flex-col items-center justify-center text-center -translate-y-2 gap-1">
                        <span className="font-public-sans text-[12px] text-[#444651]">16.2M</span>
                        <hr className="text-[#C5C5D3] border-t w-[60%]"/>
                        <span className="font-bold text-[12px] text-[#444651]">Max <br/> Radius</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
      

      {/* Footer */}
      <footer className="w-full max-w-md bg-[#EEEDF4] border-t border-[#C5C5D3] flex justify-around items-center py-4 fixed bottom-0 z-50 left-1/2 -translate-x-1/2">
        <Link href="/validasi-setuju"
            className="bg-[#00236F] rounded-sm flex justify-center items-center gap-1 font-bold text-[16px] text-white py-3 w-[92%] shrink-0 ">
            Lanjutkan ke Keputusan
            <ArrowRight className="size-5 shrink-0"/>
        </Link>
      </footer>
    </main>
  );
}