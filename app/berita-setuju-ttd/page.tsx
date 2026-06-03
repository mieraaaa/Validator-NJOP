"use client";

import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft, Download, CircleCheck } from 'lucide-react';
import { useRef, useEffect, useState, Suspense } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth';

function BeritaSetujuContent() {
    const searchParams = useSearchParams();
    const nopProperti = searchParams.get('nop') || '31.71.040.003.012-0051.0';
    const rawNop = nopProperti ? nopProperti.replace(/\D/g, '') : '';

    const [ttdPenilai, setTtdPenilai] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    useEffect(() => {
        const fetchTandaTangan = async () => {
            try {
                const { data, error } = await supabase
                    .from('decisions')
                    .select(`
                        ttd_url
                    `)
                    .eq('nop', rawNop)
                    .order('created_at', { ascending: false })
                    .limit(1);

                if (error) throw error;

                if (data && data.length > 0) {
                    if (data[0].ttd_url) {
                        setTtdPenilai(data[0].ttd_url);
                    }
                }
            } catch (error) {
                console.error("Gagal menarik data lengkap:", error);
            }
        };

        fetchTandaTangan();
    }, [rawNop]);

    const pdfRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        const element = pdfRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            scrollY: -window.scrollY,
            windowHeight: element.scrollHeight
        });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const pdfPageWidth = pdf.internal.pageSize.getWidth();
        const pdfPageHeight = pdf.internal.pageSize.getHeight();

        const ratio = Math.min(pdfPageWidth / canvas.width, pdfPageHeight / canvas.height);

        const finalWidth = canvas.width * ratio;
        const finalHeight = canvas.height * ratio;

        const marginX = (pdfPageWidth - finalWidth) / 2;

        pdf.addImage(imgData, 'PNG', marginX, 0, finalWidth, finalHeight);

        try {
            const pdfBase64 = pdf.output('datauristring');
            const base64Data = pdfBase64.split(',')[1];

            // Simpan ke memori sementara (Cache) yang kebal dari error Permission
            const result = await Filesystem.writeFile({
                path: 'Berita-Acara-Setuju-Validasi-NJOP.pdf',
                data: base64Data,
                directory: Directory.Cache,
            });

            // Panggil menu Share/Save bawaan HP Android
            await Share.share({
                title: 'Berita Acara Validasi NJOP',
                url: result.uri,
                dialogTitle: 'Simpan atau Bagikan PDF'
            });

        } catch (error: any) {
            console.error('Gagal menyimpan PDF:', error);
            alert('Gagal menyimpan PDF: ' + (error.message || 'Error tidak diketahui.'));
        }
    };

    const [tanggalKeputusan, setTanggalKeputusan] = useState<string>('Memuat tanggal...');
    const [alamat, setAlamat] = useState<string>('Memuat alamat...');
    const [luasBumi, setLuasBumi] = useState<number | string>('...');
    const [luasBangunan, setLuasBangunan] = useState<number | string>('...');
    const [nilaiFinal, setNilaiFinal] = useState<number | string>('...');

    const formatNop = (raw: string) => {
        if (!raw) return "-";
        const clean = raw.replace(/\D/g, '');
        if (clean.length === 18) {
            return `${clean.substring(0, 2)}.${clean.substring(2, 4)}.${clean.substring(4, 7)}.${clean.substring(7, 10)}.${clean.substring(10, 13)}-${clean.substring(13, 17)}.${clean.substring(17, 18)}`;
        }
        return raw;
    };

    useEffect(() => {
        const fetchDataKeputusan = async () => {
            if (!rawNop) return;

            try {
                const { data, error } = await supabase
                    .from('decisions')
                    .select(`
                        ttd_url,
                        detail_keputusan,
                        created_at, 
                        nilai_njop_final,
                        nilai_njop_lama,
                        users (nama, nip)
                    `)
                    .eq('nop', rawNop)
                    .order('created_at', { ascending: false })
                    .limit(1);

                if (error) throw error;

                if (data && data.length > 0) {
                    const latest = data[0];
                    if (latest.created_at) {
                        const tglDatabase = new Date(latest.created_at);
                        const formatTanggal = tglDatabase.toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        });
                        setTanggalKeputusan(formatTanggal);
                    }
                    const detail = latest.detail_keputusan || {};
                    setAlamat(detail.alamat || "Alamat tidak tersedia");
                    setLuasBumi(detail.luas_tanah !== undefined ? detail.luas_tanah : '...');
                    setLuasBangunan(detail.luas_bangunan !== undefined ? detail.luas_bangunan : '...');
                    
                    const finalVal = (latest.nilai_njop_final !== undefined && latest.nilai_njop_final !== null && latest.nilai_njop_final !== 0)
                        ? latest.nilai_njop_final
                        : (latest.nilai_njop_lama || detail.nilai_estimasi_njop || 0);
                    setNilaiFinal(finalVal);
                }
            } catch (error) {
                console.error("Gagal menarik data keputusan final:", error);
            }
        };

        fetchDataKeputusan();
    }, [rawNop]);

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

  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-x-hidden bg-[#f8fafc] pb-5">

      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[57px] sticky top-0 z-50 flex justify-between items-center border-b border-[#C5C5D3] shadow-xs pl-6 pr-3">
        <Link href="/riwayat-keputusan" className="w-full flex justify-start items-center text-[#00236F] gap-1">
            <ArrowLeft className="flex size-5 shrink-0"/>
            <h1 className="font-mono font-semibold text-[16px]">Kembali</h1>
        </Link>
        <button type="button" onClick={handleDownloadPDF}>
            <Download className="flex size-5 shrink-0 text-[#757682]"/>
        </button>
      </header>

      {/* Content */}
      <div ref={pdfRef} className="w-[93%] mx-auto border border-[#C5C5D3] bg-white mt-4 flex flex-col justify-center items-center gap-5 py-5 px-5 shadow-xs">
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
                <span className="font-medium text-[14px] text-[#1A1B21] break-all">{formatNop(rawNop || nopProperti)}</span>
            </div>
            <div className="w-full flex flex-col gap-1">
                <h4 className="font-mono font-bold text-[11px] text-[#444651]">Alamat Objek Pajak</h4>
                <span className="font-public-sans text-[14px] text-[#1A1B21] leading-tight">{alamat}</span>
            </div>
            <div className="w-full flex flex-col gap-1 font-mono">
                <h4 className="font-bold text-[11px] text-[#444651]">Luas Bumi (M²)</h4>
                <span className="font-medium text-[14px] text-[#1A1B21]">{luasBumi}</span>
            </div>
            <div className="w-full flex flex-col gap-1 font-mono">
                <h4 className="font-bold text-[11px] text-[#444651]">Luas Bangunan (M²)</h4>
                <span className="font-medium text-[14px] text-[#1A1B21]">{luasBangunan}</span>
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
                <span className="font-mono font-bold text-[24px] text-[#00164E]">Rp {typeof nilaiFinal === 'number' ? nilaiFinal.toLocaleString('id-ID') : nilaiFinal}</span>
                <p className="font-public-sans text-[12px] text-[#264191]">
                    Berdasarkan hasil peninjauan lapangan pada tanggal {tanggalKeputusan}, data fisik dan nilai 
                    bangunan telah sesuai dengan kondisi faktual.
                </p>
            </div>
        </div>
        <hr className="border-[#C5C5D3] w-full mx-auto border-t mt-8"/>
        {/* Bagian Tanda Tangan */}
        <div className="w-full flex justify-between items-start gap-3 text-center text-[#1A1B21]">
            {/* Bagian Supervisor */}
            <div className="flex flex-col items-center px-2 flex-1 min-w-0">
                <h5 className="font-public-sans text-[12px] h-[54px] min-h-[36px] flex items-start justify-center leading-tight">Mengetahui, Supervisor Pemeriksa</h5>
                <div className="h-[60px] flex items-start justify-center">
                    <Image
                        src="/images/common/ttd-supervisor.png"
                        alt="Logo Tanda Tangan Supervisor"
                        width={150}
                        height={150}
                        className="shrink-0"        
                    />
                </div>
                <hr className="border-[#444651] w-[70%] mx-auto border-t pb-1"/>
                <span className="font-mono font-semibold text-[16px]">Budi Santoso, S.IP</span>
                <span className="font-mono font-medium text-[14px] text-[#444651] break-all">NIP. 198012012005011002</span>
            </div>
            {/* Bagian Petugas */}
            <div className="flex flex-col items-center px-2 flex-1 min-w-0">
                <h5 className="font-public-sans text-[12px] h-[54px] min-h-[36px] flex items-start justify-center leading-tight">Petugas, Penilai Pajak Lapangan</h5>
                <div className="h-[60px] flex items-start justify-center">
                    {ttdPenilai ? (
                        <img
                            src={ttdPenilai}
                            alt="Tanda Tangan Penilai"
                            className="h-full object-contain mix-blend-multiply"
                        />
                    ) : (
                        <span className="text-[10px] text-gray-400 mt-4">Memuat TTD...</span>
                    )}
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

export default function BeritaAcaraSetujuPage() {
return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center font-mono text-[14px] text-[#00236F]">
                Menyiapkan Berita Acara...
            </div>
        }>
            <BeritaSetujuContent />
        </Suspense>
    );    
}