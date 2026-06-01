"use client";

import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft, CircleCheck, CircleX, FileText, SendHorizontal } from 'lucide-react';
import { useState, Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { fetchDetailProperti, parseStringToNop, fetchListBangunan } from "@/lib/api";
import { getCurrentUser } from '@/lib/auth';

export default function ValidasiTolakPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center font-mono text-[14px] text-[#00236F]">
                Menyiapkan Halaman Validasi...
            </div>
        }>
            <ValidasiTolakContent />
        </Suspense>
    );
}

function ValidasiTolakContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const nopProperti = searchParams.get('nop') || '317104000301200510';
    const rawNop = nopProperti ? nopProperti.replace(/\D/g, '') : '';
    
    const storageKey = (field: string) => `validasi-tolak-${field}-${rawNop}`;

    const [alasan, setAlasan] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return window.localStorage.getItem(storageKey('alasan')) || '';
        }
        return '';
    });
    const [tindakan, setTindakan] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return window.localStorage.getItem(storageKey('tindakan')) || '';
        }
        return '';
    });

    const formattedNop = rawNop.length === 18 ? (
        `${rawNop.substring(0, 2)}.${rawNop.substring(2, 4)}.${rawNop.substring(4, 7)}.${rawNop.substring(7, 10)}.${rawNop.substring(10, 13)}-${rawNop.substring(13, 17)}.${rawNop.substring(17, 18)}`
    ) : nopProperti;

    const [user, setUser] = useState<any>(null);
    const [detailProperti, setDetailProperti] = useState<any>(null);
    const [luasBangunanTotal, setLuasBangunanTotal] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            if (!rawNop || rawNop.length !== 18) return;
            try {
                const userData = await getCurrentUser();
                setUser(userData);

                let localData: any = null;
                if (typeof window !== 'undefined') {
                    const stored = localStorage.getItem(`property-detail-${rawNop}`);
                    if (stored) {
                        try {
                            localData = JSON.parse(stored);
                        } catch (e) {
                            console.error("Failed to parse stored property data", e);
                        }
                    }
                }

                let detailData = null;
                let totalLuas = 0;

                if (localData && localData.nop === rawNop && localData.nilaiSistemBumi) {
                    detailData = {
                        jalanOp: localData.jalanOp,
                        luasBumi: localData.luasBumi,
                        nilaiSistemBumi: localData.nilaiSistemBumi,
                        jnsBumi: localData.jnsBumi
                    };
                    totalLuas = localData.totalLuasBangunan || 0;
                } else {
                    const nopObj = parseStringToNop(formattedNop);
                    const [apiDetail, apiBangunan] = await Promise.all([
                        fetchDetailProperti(nopObj).catch((err) => {
                            console.error("Error API Detail:", err);
                            return null;
                        }),
                        fetchListBangunan(nopObj).catch(() => ([] as any))
                    ]);
                    detailData = apiDetail;
                    const bngList = Array.isArray(apiBangunan) ? apiBangunan : ((apiBangunan as any)?.rows || []);
                    totalLuas = bngList.reduce((acc: number, cur: any) => acc + (cur.luasBng || 0), 0);
                }

                setDetailProperti(detailData);
                setLuasBangunanTotal(totalLuas);
            } catch (error) {
                console.error("Gagal menarik data pendukung:", error);
            }
        };
        fetchData();
    }, [rawNop, formattedNop]);

    const isFormValid = alasan.trim() !== '' && tindakan.trim() !== '';

    return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-x-hidden bg-[#f8fafc]">

      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[73px] sticky top-0 z-50 flex justify-end items-center border-b border-[#C5C5D3] shadow-xs px-5">
        <h1 className="text-[#00236F] font-bold font-mono text-[24px] absolute left-1/2 -translate-x-1/2">ValidatorNJOP</h1>
      </header>

      {/* Content */}
      <div className="w-[93%] mx-auto mt-4">
        <div className="w-full flex justify-start items-center gap-2">
            <Link href={`/detail-properti?nop=${rawNop || nopProperti}`}>
                <ArrowLeft className="flex size-6 text-[#444651] shrink-0"/>
            </Link>
            <h2 className="font-mono font-bold text-[24px] text-[#1A1B21]">Validasi Keputusan</h2>
        </div>
        {/* Ringkasan Keputusan */}
        <div className="w-full border-2 border-[#C5C5D3] rounded-md mt-5 py-4 px-4 shadow-xs">
            <div className="flex flex-col gap-1 justify-start">
                <h3 className="font-bold text-[16px] text-[#1A1B21]">Ringkasan Keputusan</h3>
                <p className="text-[12px] text-[#444651]">Pilih tindak lanjut untuk berkas penilaian ini.</p>
            </div>
            <div className="w-full flex justify-between items-stretch gap-2 pt-4">
                {/* Setujui */}
                <Link href={`/validasi-setuju?nop=${rawNop || nopProperti}`} className="flex-1 border border-[#C5C5D3] rounded-sm flex flex-col justify-center items-center py-3 px-2">
                    <CircleCheck className="flex size-5 text-[#1B6B51] shrink-0"/>
                    <span className="font-bold text-[16px] text-[#444651]">Setujui</span>
                </Link>
                {/* Revisi */}
                <Link href={`/validasi-revisi?nop=${rawNop || nopProperti}`} className="flex-1 border border-[#C5C5D3] rounded-sm flex flex-col justify-center items-center py-3 px-2">
                    <Image
                        src="/images/common/logo-revisi.svg"
                        alt="Logo Revisi"
                        width={18}
                        height={16}
                        className="shrink-0"
                    />
                    <span className="font-bold text-[16px] text-[#444651]">Revisi</span>
                </Link>
                {/* Tolak */}
                <Link href={`/validasi-tolak?nop=${rawNop || nopProperti}`} className="flex-1 border-2 border-[#A31708] bg-[#FFDAD6] rounded-sm flex flex-col justify-center items-center py-3 px-2">
                    <CircleX className="flex size-5 text-[#BA1A1A] shrink-0"/>
                    <span className="font-bold text-[16px] text-[#341100]">Tolak</span>
                </Link>
            </div>
        </div>
        {/* Alasan Penolakan */}
        <div className="w-full border-2 border-[#C5C5D3] rounded-md mt-5 py-4 px-4 shadow-xs flex flex-col gap-3">
            <div className="w-full flex justify-between">
                <label htmlFor="alasan" className="flex justify-start items-center gap-1">
                    <span className="font-bold text-[14px] text-[#1A1B21]">Alasan Penolakan</span>
                    <span className="font-mono font-bold text-[11px] text-[#BA1A1A]">*</span>
                </label>
                <span className="text-[12px] text-[#444651]">Wajib Diisi</span>
            </div>
            <textarea 
                rows={4} 
                id="alasan" 
                name="alasan"
                value={alasan}
                  onChange={(e) => {
                      const val = e.target.value;
                      setAlasan(val);
                      if (typeof window !== 'undefined') {
                          window.localStorage.setItem(storageKey('alasan'), val);
                      }
                  }}
                className="w-full border border-[#C5C5D3] rounded-sm p-3 text-[12px] text-[#1A1B21] placeholder:text-[#6B7280] outline-none focus:ring-0 resize-none"
                placeholder="Uraikan alasan penolakan secara mendetail berdasarkan peraturan atau temuan lapangan yang berlaku..."
            ></textarea>
        </div>
        {/* Tindakan Lanjutan */}
        <div className="w-full border-2 border-[#C5C5D3] rounded-md mt-5 py-4 px-4 shadow-xs flex flex-col gap-3">
            <div className="w-full flex justify-between">
                <label htmlFor="tindakan" className="flex justify-start items-center gap-1">
                    <span className="font-bold text-[14px] text-[#1A1B21]">Tindakan Lanjutan</span>
                    <span className="font-mono font-bold text-[11px] text-[#BA1A1A]">*</span>
                </label>
                <span className="text-[12px] text-[#444651]">Wajib Diisi</span>
            </div>
            <textarea 
                rows={3} 
                id="tindakan" 
                name="tindakan"
                value={tindakan}
                      onChange={(e) => {
                          const val = e.target.value;
                          setTindakan(val);
                          if (typeof window !== 'undefined') {
                              window.localStorage.setItem(storageKey('tindakan'), val);
                          }
                      }}
                className="w-full border border-[#C5C5D3] rounded-sm p-3 text-[12px] text-[#1A1B21] placeholder:text-[#6B7280] outline-none focus:ring-0 resize-none"
                placeholder="Uraikan langkah perbaikan atau instruksi selanjutnya untuk pemohon..."
            ></textarea>
        </div>
        <hr className="border-[#C5C5D3] w-full mx-auto mt-8 mb-4"/>
        {/* Tombol Bawah */}
        <div className="w-full flex flex-col gap-4">
            {/* Preview Draf Berita Acara */}
            <Link href={`/berita-tolak?nop=${rawNop || nopProperti}`} className="w-full border border-[#757682] rounded-lg flex justify-center items-center gap-2 text-[#1A1B21] py-3">
                <FileText className="flex size-5 shrink-0"/>
                <span className="font-mono font-semibold text-[16px]">Preview Draf Berita Acara</span>
            </Link>
            <button 
                onClick={async () => {
                    if (!isFormValid) return;
                    
                    try {
                        const { error } = await supabase
                            .from('decisions')
                            .insert({
                                nop: rawNop,
                                status_keputusan: 'Tolak',
                                user_id: user?.id,
                                nilai_njop_lama: detailProperti?.nilaiSistemBumi || 0,
                                nilai_njop_final: detailProperti?.nilaiSistemBumi || 0,
                                detail_keputusan: {
                                    alasan_penolakan: alasan,
                                    tindakan_lanjutan: tindakan,
                                    alamat: detailProperti?.jalanOp || "Alamat tidak tersedia",
                                    luas_tanah: detailProperti?.luasBumi || 0,
                                    luas_bangunan: luasBangunanTotal,
                                    nilai_estimasi_njop: detailProperti?.nilaiSistemBumi || 0,
                                    njop_per_m2: detailProperti?.luasBumi ? Math.round(detailProperti.nilaiSistemBumi / detailProperti.luasBumi) : 0,
                                    zonasi: detailProperti?.jnsBumi === '1' ? 'Perumahan' : (detailProperti?.jnsBumi === '2' ? 'Komersial' : 'Lainnya')
                                }
                            });

                        if (error) throw error;

                        if (typeof window !== 'undefined') {
                            window.localStorage.removeItem(storageKey('alasan'));
                            window.localStorage.removeItem(storageKey('tindakan'));
                            window.localStorage.removeItem(storageKey('ttd'));
                        }

                        router.push(`/validasi-berhasil-tolak?nop=${rawNop || nopProperti}`);

                    } catch (error: any) {
                        console.error("Gagal mengirim detail keputusan:", error.message);
                        alert("Gagal mengirim data final ke server. Silakan coba lagi.");
                    }
                }}
                disabled={!isFormValid}
                className={`w-full rounded-lg flex justify-center items-center gap-2 py-3 transition-opacity ${
                    isFormValid
                        ? 'bg-[#1E3A8A] text-[#90A8FF] cursor-pointer'
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
            >
                <span className="font-mono font-semibold text-[16px]">Konfirmasi & Kirim</span>
                <SendHorizontal className="flex size-6 shrink-0"/>
            </button>
        </div>
        <div className="w-full bg-[#EEEDF4] rounded-sm flex justify-between items-start text-start gap-2 my-5 px-3 py-3">
            <Image
                src="/images/common/logo-palu.svg"
                alt="Logo Palu"
                width={13}
                height={16}
                className="shrink-0"           
            />
            <p className="font-public-sans text-[12px] text-[#444651]">Keputusan ini bersifat final dan akan tercatat secara permanen dalam audit trail sistem pemerintahan. Pastikan semua data akurat sebelum mengirim.</p>
        </div>
      </div>
    </main>
  );
}