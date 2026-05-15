import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft, Download, CircleCheck } from 'lucide-react';

export default function Home() {
  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-x-hidden bg-[#f8fafc] pb-5">

      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[57px] sticky top-0 z-50 flex justify-between items-center border-b border-[#C5C5D3] shadow-xs pl-6 pr-3">
        <Link href="/validasi-revisi" className="w-full flex justify-start items-center text-[#00236F] gap-1">
            <ArrowLeft className="flex size-5 shrink-0"/>
            <h1 className="font-mono font-semibold text-[16px]">Kembali</h1>
        </Link>
        <button type="button">
            <Download className="flex size-5 shrink-0 text-[#757682]"/>
        </button>
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
                <span className="font-medium text-[14px] text-[#1A1B21] break-all">32.73.040.001.012-0043.0</span>
            </div>
            <div className="w-full flex flex-col gap-1">
                <h4 className="font-mono font-bold text-[11px] text-[#444651]">Alamat Objek Pajak</h4>
                <span className="font-public-sans text-[14px] text-[#1A1B21] leading-tight line-clamp-2">Jl. Merdeka Barat No. 14, RT 02 / RW 05, Kel. Sukamaju, Kec. Jatinegara</span>
            </div>
            <div className="w-full flex flex-col gap-1 font-mono">
                <h4 className="font-bold text-[11px] text-[#444651]">Luas Bumi (M²)</h4>
                <span className="font-medium text-[14px] text-[#1A1B21]">450</span>
            </div>
            <div className="w-full flex flex-col gap-1 font-mono">
                <h4 className="font-bold text-[11px] text-[#444651]">Luas Bangunan (M²)</h4>
                <span className="font-medium text-[14px] text-[#1A1B21]">210</span>
            </div>
        </div>
        {/* Hasil Validasi NJOP */}
        <div className="w-full border-l-4 border-l-[#00236F] text-[#00236F] px-1">
            <h3 className="font-mono font-bold text-[11px]">HASIL VALIDASI NJOP</h3>
        </div>
        <div className="w-full bg-[#FDFFE8] border border-[#C5C800] rounded-md flex flex-col justify-center items-center gap-4 px-5 py-5 text-center">
            <div className="rounded-xl bg-[#F9FE94] text-[#565F06] flex justify-center items-center gap-1 px-2 py-1">
                <Image
                    src="/images/common/logo-revisi.svg"
                    alt="Logo Revisi"
                    width={10}
                    height={9}
                    className="shrink-0"        
                />
                <span className="font-mono font-bold text-[11px]">DIREVISI</span>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <h4 className="font-public-sans text-[14px] text-[#918526]">Nilai Jual Objek Pajak (NJOP) 
                    <span className="block">Ditetapkan</span>
                </h4>
                <span className="font-mono font-bold text-[24px] text-[#4E4A00] flex flex-col items-center gap-1">
                    <span className="text-[13px] line-through">Rp 1.450.000.000</span>
                    Rp 1.500.000.000
                </span>
                <p className="font-public-sans text-[12px] text-[#918526]">
                    tanggal 24 Oktober 2023, dilakukan penyesuaian/perubahan nilai bangunan agar sesuai dengan kondisi faktual terkini.
                </p>
            </div>
        </div>
        {/* Catatan Revisi */}
        <div className="w-full border-l-4 border-l-[#00236F] text-[#00236F] px-1">
            <h3 className="font-mono font-bold text-[11px]">CATATAN REVISI</h3>
        </div>
        <div className="w-full bg-[#FAF8FF] border border-[#C5C5D3] px-4 py-4 font-mono flex flex-col justify-start gap-1">
            <h4 className="font-bold text-[11px] text-[#444651]">Catatan Penilai</h4>
            <p className="font-medium text-[14px] text-[#1A1B21] flex-1 min-w-0">Terdapat penambahan luas bangunan di bagian belakang (dapur) 
                sebesar 20m² yang belum tercatat di sistem awal, sehingga NJOP disesuaikan.
            </p>
        </div>
        <hr className="border-[#C5C5D3] w-full mx-auto border-t mt-8"/>
        {/* Bagian Tanda Tangan */}
        <div className="w-full flex justify-between items-start gap-3 text-center text-[#1A1B21]">
            <div className="flex flex-col items-center px-2 flex-1 min-w-0">
                <h5 className="font-public-sans text-[12px] min-h-[36px] leading-tight">Mengetahui, Supervisor Pemeriksa</h5>
                <Image
                    src="/images/common/ttd-supervisor.svg"
                    alt="Logo Tanda Tangan Supervisor"
                    width={58}
                    height={56}
                    className="shrink-0 py-5"        
                />
                <hr className="border-[#444651] w-[70%] mx-auto border-t pb-1"/>
                <span className="font-mono font-semibold text-[16px]">Budi Santoso, S.IP</span>
                <span className="font-mono font-medium text-[14px] text-[#444651] break all">NIP. 198012012005011002</span>
            </div>
            <div className="flex flex-col items-center px-2 flex-1 min-w-0">
                <h5 className="font-public-sans text-[12px] min-h-[36px] leading-tight">Petugas, Penilai Pajak Lapangan</h5>
                <Image
                    src="/images/common/ttd-petugas.svg"
                    alt="Logo Tanda Tangan Petugas"
                    width={51}
                    height={48}
                    className="shrink-0 pb-5 pt-7"        
                />
                <hr className="border-[#444651] w-[70%] mx-auto border-t pb-1"/>
                <span className="font-mono font-semibold text-[16px]">Ahmad Hidayat</span>
                <span className="font-mono font-medium text-[14px] text-[#444651] break all">NIP. 199203152019021001</span>
            </div>
        </div>
      </div>
    </main>
  );
}