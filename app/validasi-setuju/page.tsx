import Image from "next/image";
import Link from 'next/link';
import { CircleUser, ArrowLeft, CircleCheck, CircleX, FileText, PencilLine, SendHorizontal } from 'lucide-react';

export default function Home() {
  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden bg-[#f8fafc]">

      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[73px] sticky top-0 z-50 flex justify-end items-center border-b border-[#C5C5D3] shadow-xs px-5">
        <h1 className="text-[#00236F] font-bold font-mono text-[24px] absolute left-1/2 -translate-x-1/2">ValidatorNJOP</h1>
        <Link href="/profile">
            <CircleUser className="flex size-5 text-[#1A1B21]"/>
        </Link>
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
                <Link href="/validasi-setuju" className="flex-1 border-2 border-[#006E11] rounded-sm bg-[#D9FFDA] flex flex-col justify-center items-center py-3 px-2">
                    <CircleCheck className="flex size-5 text-[#1B6B51] shrink-0"/>
                    <span className="font-bold text-[16px] text-[#341100]">Setujui</span>
                </Link>
                {/* Revisi */}
                <Link href="/validasi-revisi" className="flex-1 border border-[#C5C5D3] rounded-sm flex flex-col justify-center items-center py-3 px-2">
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
                <Link href="/validasi-tolak" className="flex-1 border border-[#C5C5D3] rounded-sm flex flex-col justify-center items-center py-3 px-2">
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
                    <span className="font-bold text-[22px] text-[#00236F] break-words leading-tight">31.71.040.003.012-0051.0</span>
                </div>
                <FileText className="flex size-5 text-[#747780] shrink-0"/>
            </div>
            <hr className="border-[#C5C5D3] w-full mx-auto"/>
            <div className="flex flex-col gap-1 justify-start">
                <h3 className="font-bold text-[14px] text-[#44474F]">ALAMAT OBJEK PAJAK</h3>
                <span className="text-[14px] text-[#1A1B21] leading-tight line-clamp-2">Jl. Kebon Kacang Raya No. 24, Jakarta Pusat</span>
            </div>
            <div className="bg-[#F4F3F8] rounded-sm flex justify-between items-start px-3 py-3">
                <div className="flex flex-col gap-1 justify-start font-bold flex-1 min-w-0">
                    <h4 className="text-[14px] text-[#44474F] leading-tight">NJOP yang Disetujui</h4>
                    <span className="text-[22px] text-[#00236F] leading-tight tracking-tight">Rp 15.500.000 / 
                        <span className="block"> m² </span>
                    </span>
                </div>
                <div className="flex flex-col gap-1 text-right items-end font-bold flex-1 min-w-0">
                    <h4 className="text-[14px] text-[#44474F] leading-tight">Total Nilai</h4>
                    <span className="text-[22px] text-[#00236F] leading-tight tracking-tight">Rp 3,10 
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
                <button type="button" className="font-mono font-bold text-[12px] text-[#00236F]">Bersihkan</button>
            </div>
            <div className="w-full bg-[#FAF8FF] border border-dashed border-[#757682] h-48 rounded-sm flex flex-col gap-1 justify-center items-center">
                <Image
                    src="/images/common/logo-ttd.svg"
                    alt="Logo Tanda Tangan"
                    width={24}
                    height={24}
                    className="shrink-0"
                />
                <span className="font-bold text-[14px] text-[#9f9fa8]">Area Tanda Tangan</span>
            </div>
        </div>
        <hr className="border-[#C5C5D3] w-full mx-auto mt-8 mb-4"/>
        {/* Tombol Bawah */}
        <div className="w-full flex flex-col gap-4">
            {/* Preview Draf Berita Acara */}
            <Link href="/berita-setuju" className="w-full border border-[#757682] rounded-lg flex justify-center items-center gap-2 text-[#1A1B21] py-3">
                <FileText className="flex size-5 shrink-0"/>
                <span className="font-mono font-semibold text-[16px]">Preview Draf Berita Acara</span>
            </Link>
            {/* Konfirmasi & Kirim */}
            <Link href="/validasi-berhasil-setuju" className="w-full bg-[#1E3A8A] rounded-lg flex justify-center items-center gap-2 text-[#90A8FF] py-3">
                <span className="font-mono font-semibold text-[16px]">Konfirmasi & Kirim</span>
                <SendHorizontal className="flex size-6 shrink-0"/>
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