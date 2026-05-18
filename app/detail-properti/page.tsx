"use client";

import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft, MapPin, Images, ArrowRight, TrendingUp, TrendingDown, Minus, Map } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from "react";
import { fetchDetailProperti, parseStringToNop, fetchListBangunan, fetchSpptHistory, fetchListAntrean, formatNopToString } from "@/lib/api";

function DetailPropertiContent() {
  const searchParams = useSearchParams();
  const nopParam = searchParams.get('nop');
  
  const [detail, setDetail] = useState<any>(null);
  const [bangunan, setBangunan] = useState<any>(null);
  const [history, setHistory] = useState<any>(null);
  const [komparasi, setKomparasi] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      if (!nopParam) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const nopObj = parseStringToNop(nopParam);
        
        // Fetch All API concurrently
        const [detailData, bangunanData, historyData, listKelurahanData] = await Promise.all([
          fetchDetailProperti(nopObj),
          fetchListBangunan(nopObj).catch(() => []), // fallback empty array on error
          fetchSpptHistory(nopObj).catch(() => []), // fallback empty array on error
          fetchListAntrean(undefined, undefined, 100, 0).catch(() => ({ rows: [] })) // fetch all without filter, then filter manually
        ]);

        const sameKelurahanRows = ((listKelurahanData as any)?.rows || []).filter((item: any) => 
            item.kdPropinsi === nopObj.kdPropinsi &&
            item.kdDati2 === nopObj.kdDati2 &&
            item.kdKecamatan === nopObj.kdKecamatan &&
            item.kdKelurahan === nopObj.kdKelurahan
        );

        setDetail(detailData);
        setBangunan({ rows: Array.isArray(bangunanData) ? bangunanData : [] });
        setHistory({ rows: Array.isArray(historyData) ? historyData : [] });
        setKomparasi({ rows: sameKelurahanRows });
        
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }
    loadData();
  }, [nopParam]);

  const formattedNop = nopParam ? (
    `${nopParam.substring(0, 2)}.${nopParam.substring(2, 4)}.${nopParam.substring(4, 7)}.${nopParam.substring(7, 10)}.${nopParam.substring(10, 13)}-${nopParam.substring(13, 17)}.${nopParam.substring(17, 18)}`
  ) : '';

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-[80vh]">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00236F]"></div>
      </div>
    );
  }

  if (error || !nopParam) {
    return (
      <div className="p-5">
        <div className="bg-red-50 text-red-800 p-4 rounded-md">Error: {error || 'NOP tidak ditemukan'}</div>
        <Link href="/antrean-properti" className="mt-4 inline-block text-[#00236F] underline">Kembali</Link>
      </div>
    );
  }

  // Jika data belum ditemukan atau fallback
  const fallbackDetail = {
    jalanOp: "Alamat tidak tersedia",
    luasBumi: 0,
    nilaiSistemBumi: 0,
  };

  const propDetail = detail || fallbackDetail;

  // --- Bangunan Calculation ---
  const bngList = bangunan?.rows || [];
  const totalLuasBangunan = bngList.reduce((acc: number, cur: any) => acc + (cur.luasBng || 0), 0);
  const bangunanUtama = bngList.find((b: any) => b.noBng === 1) || bngList[0];
  const tahunBangun = bangunanUtama?.thnDibangunBng || '-';

  // --- SPPT History Calculation ---
  const histList = history?.rows || [];
  // sort desc by year
  histList.sort((a: any, b: any) => parseInt(b.thnPajakSppt || '0') - parseInt(a.thnPajakSppt || '0'));
  let percentageIncrease = 0;
  let hasHistory = false;
  if (histList.length >= 2) {
    hasHistory = true;
    const latestNjop = histList[0].njopBumi || 0;
    const prevNjop = histList[1].njopBumi || 0;
    if (prevNjop > 0) {
      percentageIncrease = ((latestNjop - prevNjop) / prevNjop) * 100;
    }
  } else if (histList.length === 1) {
      hasHistory = true; // Only 1 year, 0% increase
  }

  // --- Komparasi Calculation ---
  const kompList = komparasi?.rows || [];
  const currentNjop = propDetail.nilaiSistemBumi || 0;
  
  let rataRata = currentNjop;
  let maxRadius = currentNjop;
  let dataPembanding: any[] = [];
  
  if (kompList.length > 0) {
    const currentNopString = formattedNop.replace(/[\.\-]/g, '');
    const validKomp = kompList.filter((k:any) => {
        const kStr = `${k.kdPropinsi}${k.kdDati2}${k.kdKecamatan}${k.kdKelurahan}${k.kdBlok}${k.noUrut}${k.kdJnsOp}`;
        return kStr !== currentNopString;
    });
    
    const totalNjopAll = validKomp.reduce((acc: number, cur: any) => acc + (cur.njopBumi || 0), 0) + currentNjop;
    rataRata = totalNjopAll / (validKomp.length + 1);
    maxRadius = Math.max(currentNjop, ...validKomp.map((k:any) => k.njopBumi || 0));
    
    dataPembanding = validKomp.slice(0, 3).map((k: any, index: number) => ({
      nopString: formatNopToString(k),
      njopBumi: k.njopBumi,
      jarak: [120, 250, 400][index] || 500, // mock distance
    }));
  }

  // Helper formatting (M = Milyar, Jt = Juta, Rb = Ribu)
  const formatM = (num: number) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'M'; 
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'Jt';
    return (num / 1_000).toFixed(1) + 'Rb';
  };

  // Helper hitung posisi absolute CSS
  // Rumus persentase posisi garis = (nilai / maxRadius) * 100%
  const getPercentage = (value: number) => {
    if (maxRadius === 0) return 50;
    // Limit min 15% max 60% supaya grafiknya aman di dalam container dan tidak sundul teks
    let pct = (value / maxRadius) * 45 + 15; 
    return pct;
  }

  return (
    <>
      <div className="w-full flex flex-col gap-1">
          <h2 className="font-bold text-[18px] text-[#1A1B21]">NOP: {formattedNop}</h2>
          <div className="flex items-center gap-1">
              <MapPin className="size-4 shrink-0 text-[#444651]"/>
              <p className="text-[16px] text-[#444651]">{propDetail.jalanOp || fallbackDetail.jalanOp}</p>
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
                      <span className="font-bold text-[14px] text-[#1A1B21]">{propDetail.luasBumi || 0} m²</span>
                  </div>
                  <div className="flex flex-col">
                      <span className="text-[12px] text-[#444651]">TAHUN BANGUN</span>
                      <span className="font-bold text-[14px] text-[#1A1B21]">{tahunBangun}</span>
                  </div>
              </div>
              <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                      <span className="text-[12px] text-[#444651]">LUAS BANGUNAN</span>
                      <span className="font-bold text-[14px] text-[#1A1B21]">{totalLuasBangunan} m²</span>
                  </div>
                  <div className="flex flex-col">
                      <span className="text-[12px] text-[#444651]">ZONASI</span>
                      <span className="font-bold text-[14px] text-[#1A1B21]">{propDetail.jnsBumi === '1' ? 'Perumahan' : (propDetail.jnsBumi === '2' ? 'Komersial' : 'Lainnya')}</span>
                  </div>
              </div>
          </div>
          <hr className="border-[#E3E1E9] mt-5 mb-1 border-t-2"/>
          <Link href={`/peta-foto?nop=${nopParam}`} className="w-full bg-[#F4F3FA] rounded-sm flex justify-between items-center font-bold text-[16px] text-[#00236F] py-2 px-3 mt-4">
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
              <span className="font-bold text-[32px] text-[#00236F]">Rp {(propDetail.nilaiSistemBumi || 0).toLocaleString('id-ID')}</span>
              {propDetail.nilaiSistemBumi > 0 && <span className="font-bold text-[16px] text-[#444651]">/tot</span>}
          </div>
          
          {hasHistory ? (
              <div className={`rounded-xl w-max mx-auto font-bold text-[12px] flex justify-center items-center px-2 py-1 gap-1 mt-2 
                  ${percentageIncrease > 0 ? 'bg-[#D1FAE5] text-[#065F46]' : percentageIncrease < 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                  {percentageIncrease > 0 ? <TrendingUp className="size-3"/> : percentageIncrease < 0 ? <TrendingDown className="size-3"/> : <Minus className="size-3"/>}
                  {percentageIncrease > 0 ? '+' : ''}{percentageIncrease.toFixed(1)}% dari tahun lalu
              </div>
          ) : (
             <div className="bg-gray-100 rounded-xl w-max mx-auto font-bold text-[12px] text-gray-700 flex justify-center items-center px-2 py-1 gap-1 mt-2">
                  Data riwayat tahun lalu tidak tersedia
             </div>
          )}
      </div>

      {/* Data Pembanding */}
      <div className="w-full bg-[#f4f3fa] border-2 border-[#C5C5D3] rounded-md mt-6 shadow-xs overflow-hidden">
          <div className="w-full border-b-2 border-b-[#C5C5D3] py-4 px-5 flex justify-between items-center">
              <h4 className="font-mono font-semibold text-[16px] text-[#1A1B21]">Data Pembanding (Radius 500m)</h4>
              <Map className="size-5 shrink-0 text-[#444651]"/>
          </div>
          
          {dataPembanding.length > 0 ? dataPembanding.map((item, idx) => (
             <div key={idx} className={`${idx < dataPembanding.length - 1 ? 'border-b-2 border-b-[#C5C5D3]' : ''} bg-white w-full py-3 px-3 flex justify-between items-center gap-3`}>
                  <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex justify-center items-center gap-1 font-mono font-semibold text-[14px] text-[#1A1B21]">
                          <span className="shrink-0">NOP:</span>
                          <span className="truncate text-left [direction:rtl] break-all">{item.nopString}</span>
                      </div>
                      <span className="text-[#444651] text-[12px]">Jarak: {item.jarak}m</span>
                  </div>
                  <span className="font-bold text-[14px] text-[#1A1B21] shrink-0">Rp {(item.njopBumi / 1000000).toFixed(1)} Jt</span>
              </div>
          )) : (
              <div className="bg-white w-full py-4 px-3 flex justify-center items-center text-sm text-[#444651]">
                  Tidak ada properti pembanding di kelurahan ini.
              </div>
          )}
      </div>

      {/* Komparasi Wilayah */}
      <div className="w-full bg-white border-2 border-[#C5C5D3] rounded-md mt-6 py-5 px-4 shadow-xs">
          <h3 className="font-bold text-[16px] text-[#1A1B21]">Komparasi Wilayah</h3>
          <hr className="border-[#C5C5D3] my-1 border-t-2"/>
          <div className="w-full relative h-56 mt-4">
              {/* Background Lines */}
              <div className="w-full flex flex-col pt-10 pb-3 gap-14 text-[#f3f3f6] pointer-events-none">
                  <hr/>
                  <hr/>
                  <hr/>
                  <hr/>
              </div>
              
              {/* Foreground Values Plotting */}
              <div className="w-full absolute inset-0 pt-16">
                  {/* Rata-rata Kelurahan */}
                  <div className="absolute flex flex-col items-center justify-center text-center -translate-x-1/2 -translate-y-1/2 transition-all duration-500" 
                       style={{ left: '20%', bottom: `${getPercentage(rataRata)}%` }}>
                      <span className="font-public-sans text-[12px] text-[#444651] whitespace-nowrap">{formatM(rataRata)}</span>
                      <hr className="border-t-2 border-[#C5C5D3] w-10 my-1"/>
                      <span className="font-bold text-[10px] text-[#444651] leading-tight">Rata-rata <br/> Kelurahan </span>
                  </div>
                  
                  {/* Objek Ini */}
                  <div className="absolute flex flex-col items-center justify-center text-center text-[#00236F] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-10"
                       style={{ left: '50%', bottom: `${getPercentage(currentNjop)}%` }}>
                      <span className="font-public-sans font-bold text-[14px] whitespace-nowrap">{formatM(currentNjop)}</span>
                      <div className="relative flex justify-center items-center w-full my-1">
                          <hr className="border-t-2 border-[#00236F] w-10"/>
                          <div className="size-3 absolute rounded-full bg-[#00236F]"></div>
                      </div>
                      <span className="font-bold text-[10px] leading-tight">Objek <br/> Ini</span>
                  </div>
                  
                  {/* Max Radius */}
                  <div className="absolute flex flex-col items-center justify-center text-center -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                       style={{ left: '80%', bottom: `${getPercentage(maxRadius)}%` }}>
                      <span className="font-public-sans text-[12px] text-[#444651] whitespace-nowrap">{formatM(maxRadius)}</span>
                      <hr className="border-t-2 border-[#C5C5D3] w-10 my-1"/>
                      <span className="font-bold text-[10px] text-[#444651] leading-tight">Max <br/> Radius</span>
                  </div>
                  
                  {/* Connecting Line (Optional logic for connecting dots could go here, skipped for simplicity) */}
              </div>
          </div>
      </div>
    </>
  );
}

export default function DetailProperti() {
  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden bg-[#f8fafc] pb-32">
      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[73px] sticky top-0 flex justify-between items-center border-b border-[#C5C5D3] shadow-xs px-5 z-10">
        <Link href="/antrean-properti">
            <ArrowLeft className="flex size-5 text-[#1A1B21]"/>
        </Link>
        <h1 className="text-[#00236F] font-bold font-mono text-[24px] absolute left-1/2 -translate-x-1/2">ValidatorNJOP</h1>
      </header>

      {/* Content */}
      <div className="w-[93%] mx-auto mt-4">
        <Suspense fallback={<div className="flex justify-center items-center w-full h-[50vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00236F]"></div></div>}>
          <DetailPropertiContent />
        </Suspense>
      </div>
      
      {/* Footer */}
      <footer className="w-full max-w-md bg-[#EEEDF4] border-t border-[#C5C5D3] flex justify-around items-center py-4 fixed bottom-0 z-50 left-1/2 -translate-x-1/2">
        <Link href="/validasi-setuju"
            className="bg-[#00236F] rounded-sm flex justify-center items-center gap-1 font-bold text-[16px] text-white py-3 w-[92%] shrink-0 hover:bg-blue-800 transition-colors">
            Lanjutkan ke Keputusan
            <ArrowRight className="size-5 shrink-0"/>
        </Link>
      </footer>
    </main>
  );
}
