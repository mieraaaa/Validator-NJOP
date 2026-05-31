"use client";

import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft, CircleCheck } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchDetailProperti, fetchListBangunan, parseStringToNop, formatNopToString } from "@/lib/api";

export default function Home() {
    const [user, setUser] = useState<any>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [detailProperti, setDetailProperti] = useState<any>(null);
    const [bangunan, setBangunan] = useState<any>(null);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const searchParams = useSearchParams();
    const nopParam = searchParams.get('nop') || '';

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getCurrentUser(); 
                setUser(userData);
            } catch (error) {
                console.error("Gagal menarik data user:", error);
            } finally {
                setIsLoadingUser(false);
            }
        };
        
        fetchUser();
    }, []);

    useEffect(() => {
        if (!nopParam) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsLoadingData(false);
            return;
        }
        async function loadData() {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setIsLoadingData(true);
                const nopObj = parseStringToNop(nopParam);

                // Fetch All API concurrently
                const [detailData, bangunanData] = await Promise.all([
                    fetchDetailProperti(nopObj),
                    fetchListBangunan(nopObj).catch(() => []),
                ]);

                setDetailProperti(detailData);
                setBangunan({ rows: Array.isArray(bangunanData) ? bangunanData : [] });
            } finally {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setIsLoadingData(false);
            }
        }
        loadData();
    }, [nopParam]);

    const [tanggalHariIni, setTanggalHariIni] = useState<string>('Memuat tanggal...');

    useEffect(() => {
        const sekarang = new Date();
        
        const formatTanggal = sekarang.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        setTanggalHariIni(formatTanggal);
    }, []);

  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-x-hidden bg-[#f8fafc] pb-5">

      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[57px] sticky top-0 z-50 flex justify-between items-center border-b border-[#C5C5D3] shadow-xs pl-6 pr-3">
        <Link href="/validasi-setuju" className="w-full flex justify-start items-center text-[#00236F] gap-1">
            <ArrowLeft className="flex size-5 shrink-0"/>
            <h1 className="font-mono font-semibold text-[16px]">Kembali</h1>
        </Link>
      </header>

      {/* Content */}
      <div className="w-[93%] mx-auto border border-[#C5C5D3] bg-white mt-4 flex flex-col justify-center items-center gap-5 py-5 px-5 shadow-xs">
        {/* Judul */}
        <div className="w-full flex flex-col justify-center items-center text-center gap-2">
            <Image
                src="/images/common/logo-berita.svg"
                alt="Logo Berita Acara"
                width={64}
                height={68}
                className="shrink-0"        
            />
            <h2 className="font-mono font-semibold text-[20px] text-[#1A1B21]">BERITA ACARA PENELITIAN 
                <span className="block">LAPANGAN</span>
            </h2>
            <span className="font-public-sans text-[14px] text-[#444651]">Nomor: BA/123/X/2023</span>
        </div>
        <hr className="border-[#1A1B21] w-full mx-auto border-t-2"/>
        {/* Data Objek Pajak */}
        <div className="w-full border-l-4 border-l-[#00236F] text-[#00236F] px-1">
            <h3 className="font-mono font-bold text-[11px]">DATA OBJEK PAJAK</h3>
        </div>
        <div className="w-full border border-[#C5C5D3] bg-[#FAF8FF] flex flex-col gap-5 items-center py-4 px-4">
            <div className="w-full flex flex-col gap-1 font-mono">
                <h4 className="font-bold text-[11px] text-[#444651]">Nomor Objek Pajak (NOP)</h4>
                <span className="font-medium text-[14px] text-[#1A1B21] break-all">
                    {isLoadingData ? 'Memuat...' : (detailProperti ? formatNopToString({
                        kdPropinsi: detailProperti.kdPropinsi,
                        kdDati2: detailProperti.kdDati2,
                        kdKecamatan: detailProperti.kdKecamatan,
                        kdKelurahan: detailProperti.kdKelurahan,
                        kdBlok: detailProperti.kdBlok,
                        noUrut: detailProperti.noUrut,
                        kdJnsOp: detailProperti.kdJnsOp,
                    }) : 'Data tidak tersedia')}
                </span>
            </div>
            <div className="w-full flex flex-col gap-1">
                <h4 className="font-mono font-bold text-[11px] text-[#444651]">Alamat Objek Pajak</h4>
                <span className="font-public-sans text-[14px] text-[#1A1B21] leading-tight line-clamp-2">
                    {isLoadingData ? 'Memuat...' : (detailProperti?.jalanOp || 'Alamat tidak tersedia')}
                </span>
            </div>
            <div className="w-full flex flex-col gap-1 font-mono">
                <h4 className="font-bold text-[11px] text-[#444651]">Luas Bumi (M²)</h4>
                <span className="font-medium text-[14px] text-[#1A1B21]">
                    {isLoadingData ? 'Memuat...' : (detailProperti?.luasBumi || 0)}
                </span>
            </div>
            <div className="w-full flex flex-col gap-1 font-mono">
                <h4 className="font-bold text-[11px] text-[#444651]">Luas Bangunan (M²)</h4>
                  <span className="font-medium text-[14px] text-[#1A1B21]">
                      {isLoadingData ? 'Memuat...' : (bangunan ? bangunan.rows.reduce((acc: number, curr: any) => acc + (curr.luasBng || 0), 0) : 0)}
                  </span>
            </div>
        </div>
        {/* Hasil Validasi NJOP */}
        <div className="w-full border-l-4 border-l-[#00236F] text-[#00236F] px-1">
            <h3 className="font-mono font-bold text-[11px]">HASIL VALIDASI NJOP</h3>
        </div>
        <div className="w-full bg-[#DCE1FF] border border-[#B6C4FF] rounded-md flex flex-col justify-center items-center gap-4 px-5 py-5 text-center">
            <div className="rounded-xl bg-[#D1FAE5] text-[#065F46] flex justify-center items-center gap-1 px-2 py-1">
                <CircleCheck className="flex size-3 shrink-0"/>
                <span className="font-mono font-bold text-[11px]">DISETUJUI</span>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <h4 className="font-public-sans text-[14px] text-[#264191]">Nilai Jual Objek Pajak (NJOP) 
                    <span className="block">Ditetapkan</span>
                </h4>
                <span className="font-mono font-bold text-[24px] text-[#00164E] flex flex-col items-center gap-1">
                    {isLoadingData ? (
                        <>
                            <span className="text-[13px] line-through">Rp ...</span>
                            <span>Rp ...</span>
                        </>
                    ) : (
                        <>
                            {/* For approved, we show the NJOP without line-through */}
                            <span className="text-[13px]">Rp {detailProperti?.nilaiSistemBumi?.toLocaleString('id-ID')}</span>
                        </>
                    )}
                </span>
                <p className="font-public-sans text-[12px] text-[#264191]">
                    Berdasarkan hasil peninjauan lapangan pada tanggal {tanggalHariIni}, data fisik dan nilai 
                    bangunan telah sesuai dengan kondisi faktual.
                </p>
            </div>
        </div>
        <hr className="border-[#C5C5D3] w-full mx-auto border-t mt-8"/>
        {/* Bagian Tanda Tangan */}
        <div className="w-full flex justify-between items-start gap-3 text-center text-[#1A1B21]">
            <div className="flex flex-col items-center px-2 flex-1 min-w-0">
                <h5 className="font-public-sans text-[12px] h-[54px] min-h-[36px] flex items-start justify-center leading-tight">Mengetahui, Supervisor Pemeriksa</h5>
                <div className="h-[80px] flex items-start justify-center">
                    <Image
                        src="/images/common/ttd-supervisor.svg"
                        alt="Logo Tanda Tangan Supervisor"
                        width={58}
                        height={56}
                        className="shrink-0"        
                    />
                </div>
                <hr className="border-[#444651] w-[70%] mx-auto border-t pb-1"/>
                <span className="font-mono font-semibold text-[16px]">Budi Santoso, S.IP</span>
                <span className="font-mono font-medium text-[14px] text-[#444651] break-all">NIP. 198012012005011002</span>
            </div>
            <div className="flex flex-col items-center px-2 flex-1 min-w-0">
                <h5 className="font-public-sans text-[12px] h-[54px] min-h-[36px] flex items-start justify-center leading-tight">Petugas, Penilai Pajak Lapangan</h5>
                <div className="h-[80px] flex items-start justify-center">
                    <Image
                        src="/images/common/ttd-petugas.svg"
                        alt="Logo Tanda Tangan Petugas"
                        width={51}
                        height={48}
                        className="shrink-0"        
                    />
                </div>
                <hr className="border-[#444651] w-[70%] mx-auto border-t pb-1"/>
                <span className="font-mono font-semibold text-[16px]">{isLoadingUser ? 'Memuat Nama...' : (user?.nama || 'Ahmad Hidayat')}</span>
                <span className="font-mono font-medium text-[14px] text-[#444651] break-all">{isLoadingUser ? 'Memuat NIP...' : (user?.nip ? `NIP. ${user.nip}` : 'NIP. 199203152019021001')}</span>
            </div>
        </div>
      </div>
    </main>
  );
}