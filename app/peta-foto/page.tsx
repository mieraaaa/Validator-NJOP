"use client";

import Image from "next/image";
import Link from 'next/link';
import { CircleUser, ArrowLeft, Camera, Clock, LocateFixed } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PetaFotoContent() {
  const searchParams = useSearchParams();
  const nopParam = searchParams.get('nop') || '';

  const formattedNop = nopParam ? (
    `${nopParam.substring(0, 2)}.${nopParam.substring(2, 4)}.${nopParam.substring(4, 7)}.${nopParam.substring(7, 10)}.${nopParam.substring(10, 13)}-${nopParam.substring(13, 17)}.${nopParam.substring(17, 18)}`
  ) : 'NOP Tidak Tersedia';

  const generateMockData = (nopStr: string) => {
    if (!nopStr) return { lat: "-8.6500", lng: "115.2167", fasilitas: "500m", jalan: "Aspal / Kapasitas 2 Mobil" };
    const sum = Array.from(nopStr).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const latOffset = (sum % 100) * 0.0005; 
    const lngOffset = ((sum * 2) % 100) * 0.0005;
    
    const jarak = [150, 300, 500, 850, 1200][sum % 5];
    const jarakStr = jarak >= 1000 ? `${(jarak/1000).toFixed(1)}km` : `${jarak}m`;

    const jalanOptions = [
       "Aspal / Kapasitas 2 Mobil",
       "Aspal / Kapasitas 1 Mobil",
       "Paving / Kapasitas 1 Mobil",
       "Tanah / Hanya Akses Motor"
    ];
    const jalanStr = jalanOptions[sum % 4];

    return { 
      lat: (-8.6500 + latOffset).toFixed(4), 
      lng: (115.2167 + lngOffset).toFixed(4),
      fasilitas: jarakStr,
      jalan: jalanStr
    };
  }

  const { lat, lng, fasilitas, jalan } = generateMockData(nopParam);

  return (
    <>
      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[73px] sticky top-0 z-50 flex justify-between items-center border-b border-[#C5C5D3] shadow-xs px-5">
        <Link href={`/detail-properti?nop=${nopParam}`}>
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
            <p className="text-[14px] text-[#444651]"># NOP: {formattedNop}</p>
        </div>


        {/* Map */}
        <div className="w-full border-2 border-[#C5C5D3] rounded-md mt-5 shadow-xs overflow-hidden">
            <div className="w-full h-48 bg-[#E3E1E9] flex justify-center items-center overflow-hidden">
                <iframe 
                  src={`https://maps.google.com/maps?q=${lat},${lng}&hl=id&z=15&output=embed`} 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
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
                        <span className="text-[12px] text-[#444651]">{fasilitas} (Radius terdekat)</span>
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
                        <span className="text-[12px] text-[#444651]">{jalan}</span>
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
                    priority={true}
                />
                <div className="flex flex-col items-start px-2 py-2 border-t border-t-[#C5C5D3]">
                    <div className="flex justify-between items-center gap-1 px-0.5">
                        <Clock className="flex size-3 text-[#444651] shrink-0"/>
                        <p className="font-mono font-medium text-[14px] text-[#444651]">2023-10-24 10:15 WIB</p>
                    </div>
                    <div className="flex justify-between items-center gap-1">
                        <LocateFixed className="flex size-4 text-[#444651] shrink-0 font-light"/>
                        <p className="font-mono font-medium text-[14px] text-[#444651]">{lat}, {lng}</p>
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
                        <p className="font-mono font-medium text-[14px] text-[#444651]">{(parseFloat(lat)-0.0001).toFixed(4)}, {(parseFloat(lng)+0.0001).toFixed(4)}</p>
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
                        <p className="font-mono font-medium text-[14px] text-[#444651]">{(parseFloat(lat)+0.0002).toFixed(4)}, {(parseFloat(lng)-0.0001).toFixed(4)}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default function PetaFoto() {
  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden bg-[#f8fafc] pb-5">
        <Suspense fallback={<div className="flex justify-center items-center w-full h-[50vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00236F]"></div></div>}>
            <PetaFotoContent />
        </Suspense>
    </main>
  );
}