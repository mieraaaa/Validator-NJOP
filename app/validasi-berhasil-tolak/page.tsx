import Image from "next/image";
import Link from 'next/link';
import { History, User, CircleCheck, ReceiptText, CircleX } from 'lucide-react';

export default function Home() {
  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-x-hidden bg-[#faf8ff] pb-28 flex justify-center items-center">

    {/* Content */}
    <div className="w-[93%] mx-auto flex flex-col gap-8 justify-center items-center py-10">
        <div className="bg-[#D1FAE5] border border-[#E2E8F0] rounded-xl flex items-center justify-center py-5 px-5 shadow-xs">
            <CircleCheck className="size-10 text-[#065F46]"/>
        </div>
        {/* Judul */}
        <div className="w-full flex flex-col gap-2 text-center">
            <h1 className="font-bold text-[26px] text-[#1A1B21]">Validasi Berhasil Dikirim</h1>
            <p className="text-[14px] text-[#444651]">Keputusan Anda telah dicatat dalam jejak audit (audit trail). Dokumen resmi 
                (Berita Acara) telah berhasil dibuat dan disimpan ke dalam sistem untuk referensi di masa mendatang.
            </p>
        </div>
        <div className="w-full bg-white border border-[#C5C5D3] rounded-xs flex flex-col gap-3 px-3 py-4">
            <div className="flex flex-row justify-start font-mono items-center gap-5">
                <h2 className="font-bold text-[11px] text-[#444651]">NOMOR OBJEK PAJAK (NOP)</h2>
                <span className="font-medium text-[14px] text-[#1A1B21] break-all">32.73.040.001.012-0043.0</span>
            </div>
            <hr className="border-[#C5C5D3] w-full mx-auto border-t"/>
            <div className="flex flex-row justify-between items-center gap-5">
                <h2 className="font-mono font-bold text-[11px] text-[#444651]">STATUS VALIDASI</h2>
                <div className="rounded-xl bg-[#FFDAD6] border border-[#E2E8F0] text-[#93000A] flex justify-center items-center gap-1 px-2 py-1">
                    <CircleX className="flex size-3 shrink-0"/>
                    <span className="font-public-sans font-medium text-[12px]">Tolak</span>
                </div>
            </div>
        </div>
        {/* Tombol */}
        <div className="flex flex-col w-full gap-3">
            <Link href="/antrean-properti" className="bg-[#1E3A8A] rounded-sm flex justify-center items-center w-full py-3">
                <span className="font-bold text-white text-[16px]">Kembali ke Antrean</span>
            </Link>
            <Link href="/berita-tolak-ttd" className="border border-[#00236F] text-[#00236F] rounded-sm flex flex-row gap-1 justify-center items-center w-full py-3">
                <ReceiptText className="w-[18px] h-[20px]"/>
                <span className="font-bold text-[16px]">Lihat Dokumen Ditandatangani</span>
            </Link>
        </div>
    </div>

    
    {/* Footer */}
    <footer className="w-full max-w-md bg-[#EEEDF4] border-t border-[#C5C5D3] flex justify-around items-center py-2 fixed bottom-0 z-50 left-1/2 -translate-x-1/2">
        <Link href="/antrean-properti" className="bg-[#1E3A8A] rounded-lg flex flex-col justify-center items-center font-bold text-[12px] text-[#90A8FF] py-1 px-4 shrink-0 ">
            <Image
                src="/images/common/navbar-queue.svg"
                alt="Logo Navbar Antrian"
                width={18}
                height={20}
                className="shrink-0 mb-1"
            />
            Queue
        </Link>
        <Link href="/riwayat-keputusan" className="flex flex-col justify-center items-center font-bold text-[12px] text-[#444651] py-1 px-4 shrink-0">
            <History className="size-5 text-[#444651] mb-1"/>
            History
        </Link>
        <Link href="/profile" className="flex flex-col justify-center items-center font-bold text-[12px] text-[#444651] py-1 px-4 shrink-0">
            <User className="size-5 text-[#444651] mb-1"/>
            Profile
        </Link>
    </footer>
    </main>
  );
}