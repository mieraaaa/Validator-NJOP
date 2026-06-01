"use client";

import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft, CircleX } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchDetailProperti, fetchListBangunan, parseStringToNop, formatNopToString } from "@/lib/api";

export default function Home() {
    const [detailProperti, setDetailProperti] = useState<any>(null);
    const [bangunan, setBangunan] = useState<any>(null);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const searchParams = useSearchParams();
    const nopParam = searchParams.get('nop') || '';

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

    const rawNop = nopParam ? nopParam.replace(/\D/g, '') : '';
    const storageKey = (field: string) => `validasi-tolak-${field}-${rawNop}`;
    const [alasan, setAlasan] = useState<string>('');
    const [tindakan, setTindakan] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setAlasan(window.localStorage.getItem(storageKey('alasan')) || '');
            // Perhatikan ini: panggil 'tindakan', bukan 'alasan' lagi
            setTindakan(window.localStorage.getItem(storageKey('tindakan')) || ''); 
        }
    }, [rawNop]);

    return (
        <main className="w-full max-w-md mx-auto min-h-screen relative overflow-x-hidden bg-[#f8fafc] pb-5">
            {/* Header */}
            <header className="bg-[#FAF8FF] w-full h-[57px] sticky top-0 z-50 flex justify-between items-center border-b border-[#C5C5D3] shadow-xs pl-6 pr-3">
                <Link href={`/validasi-tolak?nop=${nopParam}`} className="w-full flex justify-start items-center text-[#00236F] gap-1">
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
                <div className="w-full bg-[#FBF2F7] border border-[#BA1A1A] text-[#93000A] rounded-md flex flex-col justify-center items-center gap-4 px-5 pt-6 pb-10 text-center">
                    <div className="rounded-xl bg-[#FFDAD6] flex justify-center items-center gap-1 px-2 py-1">
                        <CircleX className="flex size-3 shrink-0"/>
                        <span className="font-mono font-bold text-[11px]">DITOLAK</span>
                    </div>
                    <h4 className="font-public-sans text-[12px] flex-1 min-w-0">Usulan NJOP tidak dapat disetujui karena ketidaksesuaian data lapangan yang signifikan.</h4>
                </div>
                {/* Alasan Penolakan */}
                <div className="w-full border-l-4 border-l-[#00236F] text-[#00236F] px-1">
                    <h3 className="font-mono font-bold text-[11px]">ALASAN PENOLAKAN</h3>
                </div>
                <div className="w-full bg-[#F4F3FA] border border-[#C5C5D3] rounded-sm flex flex-col gap-2 px-2 pt-2 pb-5 font-public-sans text-[14px]">
                    <h3 className="font-semibold text-[#1A1B21]">Temuan Lapangan (Discrepancy):</h3>
                    <div className="pl-4 text-[#1A1B21] whitespace-pre-wrap">
                        {alasan ? alasan : 'Belum ada catatan temuan lapangan.'}
                    </div>
                    <span className="italic text-[#444651] pl-4">Tindakan Lanjutan: {tindakan ? tindakan : 'Belum ada tindakan lanjutan yang ditentukan.'}</span>
                </div>
            </div>
        </main>
    );
}