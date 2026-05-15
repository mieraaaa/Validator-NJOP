import Image from "next/image";
import Link from 'next/link';
import { CircleUser, ArrowLeft, Camera, Clock, LocateFixed } from 'lucide-react';

export default function Home() {
  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden bg-[#f8fafc] pb-5">

      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[73px] sticky top-0 z-50 flex justify-between items-center border-b border-[#C5C5D3] shadow-xs px-5">
        <Link href="/detail-properti">
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
            <h2 className="font-bold text-[22px] text-[#1A1B21]">Lokasi & Dokumentasi</h2>
            <p className="text-[14px] text-[#444651]">#  NOP: 31.71.040.005.000-0123.0</p>
        </div>
        {/* Map */}
        <div className="w-full border-2 border-[#C5C5D3] rounded-md mt-5 shadow-xs overflow-hidden">
            <Image
                src="/images/peta-foto/peta.svg"
                alt="Map Placeholder"
                width={360}
                height={240}
                className="shrink-0 object-cover rounded-md w-full"
            />
            <div className="w-full border-t-2 border-t-[#C5C5D3] flex items-start flex-col gap-2">
                <div className="flex items-center justify-start w-full pt-2 pb-1 px-3 gap-2">
                    <Image
                        src="/images/peta-foto/fasilitas-publik.svg"
                        alt="Logo Fasilitas Publik"
                        width={18}
                        height={18}
                        className="shrink-0"
                    />
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold text-[14px] text-[#1A1B21]">Jarak Fasilitas Publik</h3>
                        <span className="text-[12px] text-[#444651]">500m (Radius terdekat)</span>
                    </div>
                </div>
                <hr className="border-[#C5C5D3] border-t mx-3 self-stretch"/>
                <div className="flex items-center justify-start w-full pt-1 px-3 pb-2 gap-2">
                    <Image
                        src="/images/peta-foto/akses-jalan.svg"
                        alt="Logo Akses Jalan"
                        width={19}
                        height={21}
                        className="shrink-0"
                    />
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold text-[14px] text-[#1A1B21]">Akses Jalan</h3>
                        <span className="text-[12px] text-[#444651]">Aspal / Kapasitas 2 Mobil</span>
                    </div>
                </div>
            </div>
        </div>
        {/* Foto Lapangan */}
        <div className="w-full border-2 border-[#C5C5D3] rounded-md mt-8 shadow-xs pt-2 pb-5 gap-2 flex flex-col">
            <div className="w-[95%] mx-auto flex justify-between gap-4 py-1">
                <div className="flex items-center justify-start gap-1">
                    <Camera className="flex size-5 text-[#00236F]"/>
                    <h3 className="font-bold text-[16px] text-[#1A1B21]">Foto Lapangan</h3>
                </div>
                <div className="bg-[#E9E7EF] rounded-xs text-[12px] text-[#444651] font-bold flex justify-center items-center px-2 py-1">
                    4 FOTO
                </div>
            </div>
            <hr className="border-[#C5C5D3] border-t w-[95%] mx-auto"/>
            {/* Foto Lapangan 1 */}
            <div className="w-[95%] border bg-[#F4F3FA] border-[#C5C5D3] rounded-sm flex flex-col justify-start mx-auto overflow-hidden">
                <Image
                    src="/images/peta-foto/lapangan-1.svg"
                    alt="Foto Lapangan 1"
                    width={360}
                    height={240}
                    className="shrink-0 object-cover w-full"
                />
                <div className="flex flex-col items-start px-2 py-2 border-t border-t-[#C5C5D3]">
                    <div className="flex justify-between items-center gap-1 px-0.5">
                        <Clock className="flex size-3 text-[#444651] shrink-0"/>
                        <p className="font-mono font-medium text-[14px] text-[#444651]">2023-10-24 10:15 WIB</p>
                    </div>
                    <div className="flex justify-between items-center gap-1">
                        <LocateFixed className="flex size-4 text-[#444651] shrink-0 font-light"/>
                        <p className="font-mono font-medium text-[14px] text-[#444651]">-6.2088, 106.8456</p>
                    </div>
                </div>
            </div>
            {/* Foto Lapangan 2 */}
            <div className="w-[95%] border bg-[#F4F3FA] border-[#C5C5D3] rounded-sm flex flex-col justify-start mx-auto overflow-hidden">
                <Image
                    src="/images/peta-foto/lapangan-2.svg"
                    alt="Foto Lapangan 2"
                    width={360}
                    height={240}
                    className="shrink-0 object-cover w-full"
                />
                <div className="flex flex-col items-start px-2 py-2 border-t border-t-[#C5C5D3]">
                    <div className="flex justify-between items-center gap-1 px-0.5">
                        <Clock className="flex size-3 text-[#444651] shrink-0"/>
                        <p className="font-mono font-medium text-[14px] text-[#444651]">2023-10-24 10:18 WIB</p>
                    </div>
                    <div className="flex justify-between items-center gap-1">
                        <LocateFixed className="flex size-4 text-[#444651] shrink-0 font-light"/>
                        <p className="font-mono font-medium text-[14px] text-[#444651]">-6.2089, 106.8457</p>
                    </div>
                </div>
            </div>
            {/* Foto Lapangan 3 */}
            <div className="w-[95%] border bg-[#F4F3FA] border-[#C5C5D3] rounded-sm flex flex-col justify-start mx-auto overflow-hidden">
                <Image
                    src="/images/peta-foto/lapangan-3.svg"
                    alt="Foto Lapangan 3"
                    width={360}
                    height={240}
                    className="shrink-0 object-cover w-full"
                />
                <div className="flex flex-col items-start px-2 py-2 border-t border-t-[#C5C5D3]">
                    <div className="flex justify-between items-center gap-1 px-0.5">
                        <Clock className="flex size-3 text-[#444651] shrink-0"/>
                        <p className="font-mono font-medium text-[14px] text-[#444651]">2023-10-24 10:22 WIB</p>
                    </div>
                    <div className="flex justify-between items-center gap-1">
                        <LocateFixed className="flex size-4 text-[#444651] shrink-0 font-light"/>
                        <p className="font-mono font-medium text-[14px] text-[#444651]">-6.2087, 106.8455</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}