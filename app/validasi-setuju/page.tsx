"use client";

import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft, CircleCheck, CircleX, FileText, PencilLine, SendHorizontal } from 'lucide-react';
import { fetchDetailProperti, fetchListBangunan } from "@/lib/api";
import { getCurrentUser } from '@/lib/auth';

import { useRef, useState, Suspense, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { supabase } from '@/lib/supabase';
import { useSearchParams, useRouter } from 'next/navigation';

function ValidasiSetujuContent() {
    const [user, setUser] = useState<any>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const searchParams = useSearchParams();
    const router = useRouter();
    const nopProperti = searchParams.get('nop') || '317104000301200510';

    const rawNop = nopProperti ? nopProperti.replace(/\D/g, '') : '';
    const formattedNop = rawNop.length === 18 
        ? `${rawNop.substring(0, 2)}.${rawNop.substring(2, 4)}.${rawNop.substring(4, 7)}.${rawNop.substring(7, 10)}.${rawNop.substring(10, 13)}-${rawNop.substring(13, 17)}.${rawNop.substring(17, 18)}`
        : nopProperti;

    // State untuk TTD (Supabase)
    const [ttdPenilai, setTtdPenilai] = useState<string | null>(null);
    const [namaPenilai, setNamaPenilai] = useState<string>("Memuat nama...");
    const [nipPenilai, setNipPenilai] = useState<string>("Memuat NIP...");
    
    // State untuk Data Properti (API Eksternal)
    const [detailProperti, setDetailProperti] = useState<any>(null);
    const [luasBangunanTotal, setLuasBangunanTotal] = useState<number>(0);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const isFormValid = ttdPenilai !== null && !isLoadingData;

    useEffect(() => {
        const fetchSemuaData = async () => {
            if (!rawNop || rawNop.length !== 18) return;
            setIsLoadingData(true);

            try {
                const nopObj = {
                    kdPropinsi: rawNop.substring(0, 2),
                    kdDati2: rawNop.substring(2, 4),
                    kdKecamatan: rawNop.substring(4, 7),
                    kdKelurahan: rawNop.substring(7, 10),
                    kdBlok: rawNop.substring(10, 13),
                    noUrut: rawNop.substring(13, 17),
                    kdJnsOp: rawNop.substring(17, 18),
                };
                
                const [detailData, bangunanData] = await Promise.all([
                    fetchDetailProperti(nopObj).catch((err) => {
                        console.error("Error API Detail:", err);
                        return null;
                    }),
                    fetchListBangunan(nopObj).catch(() => ([] as any))
                ]);

                console.log("HASIL TARIK API DETAIL:", detailData);

                setDetailProperti(detailData);

                const bngList = Array.isArray(bangunanData) ? bangunanData : ((bangunanData as any)?.rows || []);
                const totalLuas = bngList.reduce((acc: number, cur: any) => acc + (cur.luasBng || 0), 0);
                setLuasBangunanTotal(totalLuas);

                const { data: supabaseData, error: supabaseError } = await supabase
                    .from('decisions')
                    .select('ttd_url, users (nama, nip)')
                    .eq('nop', rawNop)
                    .single();

                if (!supabaseError && supabaseData) {
                    if (supabaseData.ttd_url) setTtdPenilai(supabaseData.ttd_url);
                    
                    if (supabaseData.users) {
                        const userData = Array.isArray(supabaseData.users) ? supabaseData.users[0] : supabaseData.users;
                        setNamaPenilai(userData.nama || "Nama Tidak Ditemukan");
                        setNipPenilai(userData.nip || "-");
                    }
                }

            } catch (error) {
                console.error("Gagal menarik data utama:", error);
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchSemuaData();
    }, [nopProperti]);

    const sigCanvas = useRef<SignatureCanvas>(null);

    const clearSignature = () => {
        sigCanvas.current?.clear();
        setTtdPenilai(null);
    };

    const saveSignature = async () => {
        if (sigCanvas.current?.isEmpty()) {
            alert("Tanda tangan tidak boleh kosong.");
            return;
        }
        const base64String = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png');

        if (base64String) {
            setTtdPenilai(base64String);

            try {
                const { data, error } = await supabase
                    .from('decisions')
                    .upsert({
                        nop: rawNop,
                        ttd_url: base64String,
                        status_keputusan: 'Disetujui'
                    }, { onConflict: 'nop' });

                if (error) {
                    throw error;
                }

                alert("Tanda tangan berhasil disimpan ke sistem.");

            } catch (err) {
                console.error("Gagal menyimpan tanda tangan:", err);
            }
        }
    };
   
    return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden bg-[#f8fafc]">

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
                <Link href={`/validasi-setuju?nop=${rawNop || nopProperti}`} className="flex-1 border-2 border-[#006E11] rounded-sm bg-[#D9FFDA] flex flex-col justify-center items-center py-3 px-2">
                    <CircleCheck className="flex size-5 text-[#1B6B51] shrink-0"/>
                    <span className="font-bold text-[16px] text-[#341100]">Setujui</span>
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
                <Link href={`/validasi-tolak?nop=${rawNop || nopProperti}`} className="flex-1 border border-[#C5C5D3] rounded-sm flex flex-col justify-center items-center py-3 px-2">
                    <CircleX className="flex size-5 text-[#BA1A1A] shrink-0"/>
                    <span className="font-bold text-[16px] text-[#444651]">Tolak</span>
                </Link>
            </div>
        </div>
        {/* Rangkuman NOP */}
        <div className="w-full border-2 border-[#C5C5D3] rounded-md mt-5 py-4 px-4 shadow-xs flex flex-col gap-3">
            <div className="flex justify-between">
                <div className="flex flex-col gap-1 justify-start min-w-0">
                    <h3 className="font-bold text-[14px] text-[#44474F]">NOMOR OBJEK PAJAK (NOP)</h3>
                    <span className="font-bold text-[22px] text-[#00236F] break-words leading-tight">{isLoadingData ? 'Memuat...' : formattedNop}</span>
                </div>
                <FileText className="flex size-5 text-[#747780] shrink-0"/>
            </div>
            <hr className="border-[#C5C5D3] w-full mx-auto"/>
            <div className="flex flex-col gap-1 justify-start">
                <h3 className="font-bold text-[14px] text-[#44474F]">ALAMAT OBJEK PAJAK</h3>
                <span className="text-[14px] text-[#1A1B21] leading-tight line-clamp-2">{isLoadingData ? 'Memuat...' : (detailProperti?.jalanOp || 'Alamat tidak tersedia')}</span>
            </div>
            <div className="bg-[#F4F3F8] rounded-sm flex justify-between items-start px-3 py-3">
                <div className="flex flex-col gap-1 justify-start font-bold flex-1 min-w-0">
                    <h4 className="text-[14px] text-[#44474F] leading-tight">NJOP yang Disetujui</h4>
                    <div className="text-[#00236F] leading-tight tracking-tight">
                        <span className="text-[20px] whitespace-nowrap">Rp {isLoadingData ? '...' : (detailProperti?.njopBumi?.toLocaleString('id-ID') || 0)}</span>
                        <span className="block text-[20px]"> / m² </span>
                    </div>
                </div>
                <div className="flex flex-col gap-1 text-right items-end font-bold flex-1 min-w-0">
                    <h4 className="text-[14px] text-[#44474F] leading-tight">Total Nilai</h4>
                    <span className="text-[20px] text-[#00236F] leading-tight tracking-tight">Rp 3,10 
                        <span className="block">Miliar</span>
                    </span>
                </div>
            </div>
        </div>
        {/* Tanda Tangan Digital */}
        <div className="w-full border-2 border-[#C5C5D3] rounded-md mt-5 py-4 px-4 shadow-xs flex flex-col gap-2">
            <div className="flex justify-between items-center gap-2">
                <div className="flex justify-start items-center gap-1 text-[#1A1B21]">
                    <PencilLine className="flex size-3"/>
                    <h5 className="font-bold text-[14px]">Tanda Tangan Digital</h5>
                </div>
                {/* Tombol Hapus */}
                <button type="button" onClick={clearSignature} className="font-mono font-bold text-[12px] text-[#00236F]">Bersihkan</button>
            </div>
            {/* Area Kanvas */}
            <div className="relative w-full bg-[#FAF8FF] border border-dashed border-[#757682] h-48 rounded-sm flex flex-col gap-1 justify-center items-center overflow-hidden">
                <div className="absolute inset-0 flex flex-col gap-2 justify-center items-center pointer-events-none">
                    <Image
                        src="/images/common/logo-ttd.svg"
                        alt="Logo Tanda Tangan"
                        width={24}
                        height={24}
                        className="shrink-0"
                    />
                    <span className="font-bold text-[14px] text-[#9f9fa8]">Area Tanda Tangan</span>
                </div>
                <SignatureCanvas
                        ref={sigCanvas}
                        penColor="#1A1B21"
                        canvasProps={{ 
                            className: 'absolute inset-0 w-full h-full',
                            style: { touchAction: 'none' } 
                        }}
                    />
                </div>
            {/* Tombol Simpan */}
            <button onClick={saveSignature} type="button" className="w-full bg-[#1E3A8A] rounded-lg flex justify-center items-center font-mono font-semibold text-[16px] text-white py-3">
                Simpan Tanda Tangan
            </button>
        </div>
        <hr className="border-[#C5C5D3] w-full mx-auto mt-8 mb-4"/>
        {/* Tombol Bawah */}
        <div className="w-full flex flex-col gap-4">
            {/* Preview Draf Berita Acara */}
            <Link href={`/berita-setuju?nop=${rawNop || nopProperti}`} className="w-full border border-[#757682] rounded-lg flex justify-center items-center gap-2 text-[#1A1B21] py-3">
                <FileText className="flex size-5 shrink-0"/>
                <span className="font-mono font-semibold text-[16px]">Preview Draf Berita Acara</span>
            </Link>
            {/* Konfirmasi & Kirim */}
            <button 
                onClick={async () => {
                    if (!isFormValid) return;
                    
                    try {
                        const { error } = await supabase
                            .from('decisions')
                            .update({
                                status_keputusan: 'Setuju',
                                user_id: user?.id,
                                nilai_njop_lama: detailProperti?.nilaiSistemBumi || 0,
                                nilai_njop_final: detailProperti?.nilaiSistemBumi || 0,
                                detail_keputusan: {
                                    catatan: "Sesuai dengan kondisi faktual di lapangan."
                                }
                            })
                            .eq('nop', rawNop);

                        if (error) throw error;

                        router.push(`/validasi-berhasil-setuju?nop=${rawNop || nopProperti}`);

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

export default function ValidasiSetujuPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center font-mono text-[14px] text-[#00236F]">
                Menyiapkan Halaman Validasi...
            </div>
        }>
            <ValidasiSetujuContent />
        </Suspense>
    );    
}