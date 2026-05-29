"use client";

import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft, CircleCheck, CircleX, FileText, PencilLine, SendHorizontal } from 'lucide-react';

import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { supabase } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';

export default function Home() {
    const searchParams = useSearchParams();
    const nopProperti = searchParams.get('nop') || '31.71.040.003.012-0051.0';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ttdPenilai, setTtdPenilai] = useState<string | null>(null);
    const sigCanvas = useRef<SignatureCanvas>(null);

    const clearSignature = () => {
        sigCanvas.current?.clear();
    };

    const saveSignature = async () => {
        if (sigCanvas.current?.isEmpty()) {
            alert("Tanda tangan tidak boleh kosong.");
            return;
        }
        const base64String = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png');

        if (base64String) {
            setTtdPenilai(base64String);
            setIsModalOpen(false);

            try {
                const { data, error } = await supabase
                    .from('decisions')
                    .upsert({
                        nop: nopProperti,
                        ttd_url: base64String,
                        status_keputusan: 'Draf'
                    }, { onConflict: 'nop' });

                if (error) {
                    throw error;
                }

                console.log(`Tanda tangan untuk NOP ${nopProperti} berhasil disimpan di database.`);
                alert("Tanda tangan berhasil disimpan ke sistem.");

            } catch (error: any) {
                console.error("Gagal menyimpan tanda tangan:", JSON.stringify(error, null, 2) || error.message);
                alert("Gagal menyimpan ke database, cek koneksi internet Anda.");
            }
        }
    };
  
    return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-x-hidden bg-[#f8fafc]">

      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[73px] sticky top-0 z-50 flex justify-end items-center border-b border-[#C5C5D3] shadow-xs px-5">
        <h1 className="text-[#00236F] font-bold font-mono text-[24px] absolute left-1/2 -translate-x-1/2">ValidatorNJOP</h1>
      </header>

      {/* Content */}
      <div className="w-[93%] mx-auto mt-4">
        <div className="w-full flex justify-start items-center gap-2">
            <Link href="/detail-properti">
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
                <Link href="/validasi-setuju" className="flex-1 border border-[#C5C5D3] rounded-sm flex flex-col justify-center items-center py-3 px-2">
                    <CircleCheck className="flex size-5 text-[#1B6B51] shrink-0"/>
                    <span className="font-bold text-[16px] text-[#444651]">Setujui</span>
                </Link>
                {/* Revisi */}
                <Link href="/validasi-revisi" className="flex-1 border-2 border-[#D0C83C] bg-[#FFF8CB] rounded-sm flex flex-col justify-center items-center py-3 px-2">
                    <Image
                        src="/images/common/logo-revisi.svg"
                        alt="Logo Revisi"
                        width={18}
                        height={16}
                        className="shrink-0"
                    />
                    <span className="font-bold text-[16px] text-[#341100]">Revisi</span>
                </Link>
                {/* Tolak */}
                <Link href="/validasi-tolak" className="flex-1 border border-[#C5C5D3] rounded-sm flex flex-col justify-center items-center py-3 px-2">
                    <CircleX className="flex size-5 text-[#BA1A1A] shrink-0"/>
                    <span className="font-bold text-[16px] text-[#444651]">Tolak</span>
                </Link>
            </div>
        </div>
        {/* Nilai NJOP Baru */}
        <div className="w-full bg-[#F4F3FA] border-2 border-[#C5C5D3] rounded-md mt-5 py-4 px-4 shadow-xs flex flex-col gap-3 border-l-4 border-l-[#6e2c01]">
            <label htmlFor="nominal" className="flex justify-start items-center gap-1">
                <Image
                    src="/images/validasi-revisi/logo-uang.svg"
                    alt="Logo Uang"
                    width={14}
                    height={10}
                    className="shrink-0"
                />
                <h4 className="font-bold text-[14px] text-[#1A1B21]">Nilai NJOP Baru (Penyesuaian)</h4>
                <span className="font-mono font-bold text-[11px] text-[#BA1A1A]">*</span>
            </label>
            <div className="w-full bg-white border border-[#C5C5D3] rounded-sm flex justify-start gap-2 px-2 py-2">
                <span className="font-mono font-medium text-[14px] text-[#444651]">Rp</span>
                <input id="nominal" type="text" name="nominal" inputMode="numeric" 
                    placeholder="Masukkan nominal baru"
                className="w-full ml-1 outline-none focus:ring-0 text-[12px] text-black placeholder:text-[#6B7280]"
                />
            </div>
        </div>
        {/* Alasan/Catatan Penilai */}
        <div className="w-full border-2 border-[#C5C5D3] rounded-md mt-5 py-4 px-4 shadow-xs flex flex-col gap-3">
            <div className="w-full flex justify-between">
                <label htmlFor="alasan" className="flex justify-start items-center gap-1">
                    <span className="font-bold text-[14px] text-[#1A1B21]">Alasan / Catatan Penilai</span>
                    <span className="font-mono font-bold text-[11px] text-[#BA1A1A]">*</span>
                </label>
                <span className="text-[12px] text-[#444651]">Wajib Diisi</span>
            </div>
            <textarea rows={4} id="alasan" name="alasan"
                className="w-full border border-[#C5C5D3] rounded-sm p-3 text-[12px] text-[#1A1B21] placeholder:text-[#6B7280] outline-none focus:ring-0 resize-none"
                placeholder="Uraikan alasan revisi secara mendetail berdasarkan temuan lapangan..."
            ></textarea>
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
            <Link href="/berita-revisi" className="w-full border border-[#757682] rounded-lg flex justify-center items-center gap-2 text-[#1A1B21] py-3">
                <FileText className="flex size-5 shrink-0"/>
                <span className="font-mono font-semibold text-[16px]">Preview Draf Berita Acara</span>
            </Link>
            {/* Konfirmasi & Kirim */}
            <Link href="/validasi-berhasil-revisi" className="w-full bg-[#1E3A8A] rounded-lg flex justify-center items-center gap-2 text-[#90A8FF] py-3">
                <span className="font-mono font-semibold text-[16px]">Konfirmasi & Kirim</span>
                <SendHorizontal className="flex size-5 shrink-0"/>
            </Link>
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