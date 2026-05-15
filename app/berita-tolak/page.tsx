import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft, Download, CircleX } from 'lucide-react';

export default function Home() {
  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-x-hidden bg-[#f8fafc] pb-5">

      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[57px] sticky top-0 z-50 flex justify-between items-center border-b border-[#C5C5D3] shadow-xs pl-6 pr-3">
        <Link href="/validasi-tolak" className="w-full flex justify-start items-center text-[#00236F] gap-1">
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
            <ul className="pl-4 list-disc text-[#1A1B21]">
                <li>Luas bangunan aktual di lapangan (150 m2) melebihi luas bangunan yang dilaporkan dalam dokumen pengajuan (100 m2). Terdapat penambahan struktur permanen di bagian belakang properti.</li>
                <li>Kelas konstruksi bangunan tercatat sebagai Kelas 3 (Sederhana), namun observasi lapangan menunjukkan material konstruksi mengindikasikan Kelas 2 (Menengah) dengan penggunaan lantai granit dan struktur beton bertulang penuh.</li>
                <li>Peruntukan bangunan tercatat sebagai rumah tinggal murni, namun lantai dasar saat ini difungsikan sebagai ruang usaha komersial (toko kelontong).</li>
            </ul>
            <span className="italic text-[#444651] pl-4">Tindakan Lanjutan: Diperlukan pendataan ulang dan penyesuaian kelas ZNT serta komponen bangunan sebelum diajukan kembali.</span>
        </div>
        <hr className="border-[#C5C5D3] w-full mx-auto border-t mt-8"/>
        {/* Bagian Tanda Tangan */}
        <div className="w-full flex justify-between items-end gap-3 text-center text-[#1A1B21]">
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
                <span className="font-mono font-medium text-[14px] text-[#444651] break-all">NIP. 198012012005011002</span>
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
                <span className="font-mono font-medium text-[14px] text-[#444651] break-all">NIP. 199203152019021001</span>
            </div>
        </div>
      </div>
    </main>
  );
}