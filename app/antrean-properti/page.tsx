import Image from "next/image";
import Link from 'next/link';
import { CircleUser, Search, CircleAlert, Clock, MapPin, ArrowRight, History, User } from 'lucide-react';

export default function Home() {
  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative flow-hiddenover bg-[#f8fafc] pb-20">

      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[73px] sticky top-0 flex justify-end items-center border border-[#C5C5D3] shadow-xs">
        <h1 className="text-[#00236F] font-bold font-mono text-[24px] absolute left-1/2 -translate-x-1/2">ValidatorNJOP</h1>
        <Link href="/profile">
            <CircleUser className="flex size-5 text-[#1A1B21] mr-5"/>
        </Link>
      </header>

      {/* Content */}
      <div className="w-[93%] mx-auto mt-4">
        <h2 className="font-bold text-[22px] text-[#1A1B21]">Antrean Properti</h2>
        {/* Card Total Antrian Properti */}
        <div className="w-full p-2 mt-2 px-3 bg-white border-2 border-[#C5C5D3] rounded-md shadow-xs justify-items-start items-center grid grid-cols-2">
            <div className="text-left">
                <p className="font-bold text-[12px] text-[#444651]">TOTAL ANTRIAN</p>
                <div className="flex items-center gap-1">
                    <span className="font-mono font-semibold text-[20px] text-[#00236F]">24</span>
                    <p className="text-[14px] text-[#444651]">Properti</p>
                </div>
            </div>
            <div className="text-left">
                <p className="font-bold text-[12px] text-[#444651]">PERLU PERHATIAN</p>
                <div className="flex items-center gap-1">
                    <span className="font-mono font-semibold text-[20px] text-[#BA1A1A]">5</span>
                    <p className="text-[14px] text-[#444651]">Urgent</p>
                </div>
            </div>
        </div>
        {/* Search Bar */}
        <div className="w-full bg-white border-2 border-[#C5C5D3] rounded-md mt-5 py-2 px-2 shadow-xs placeholder:text-[#6B7280] text-black flex items-center gap-2">
            <Search className="flex size-5 text-[#757682]"/>
            <input id="search" type="search" name="search" 
                placeholder="Cari NOP atau Alamat..."
                className="w-full ml-1 outline-none focus:ring-0 font-public-sans text-[14px]"
            />
        </div>
        {/* Filter */}
        <div className="w-full mx-auto mt-3 flex justify-start items-center gap-3 mb-5">
            <button type="button"
                className="bg-[#002452] text-white text-[16px] py-3 px-3 rounded-xl flex justify-center items-center gap-2">
                    <CircleAlert className="size-4 text-white"/>
                    Prioritas
            </button>
            <button type="button"
                className="bg-[#E9E7EC] text-[#44474F] text-[16px] py-3 px-3 rounded-xl flex justify-center items-center gap-2">
                    <Clock className="size-4 text-[#44474F]"/>
                    Terbaru
            </button>
        </div>

        {/* List Properti */}
        {/* Card 1 */}
        <div className="w-full bg-white border-2 border-[#C5C5D3] rounded-md mb-2 py-4 px-4 shadow-xs">
            <div className="flex gap-4">
                <Image
                    src="/images/antrean-properti/rumah-1.svg"
                    alt="Foto Rumah 1"
                    width={78}
                    height={78}
                    className="shrink-0 object-cover rounded-md"
                />
                <div className="w-full flex justify-between items-start gap-2">
                    <div className="pt-3 flex flex-col min-w-0">
                        <h3 className="font-bold text-[12px] text-[#444651]">NOP</h3>
                        <p className="font-bold text-[14px] text-[#00236F]">32.73.010.005.011-0</p>
                        <div className="flex items-center gap-1 mt-1">
                            <MapPin className="size-4 shrink-0 text-[#444651]"/>
                            <p className="text-[14px] text-[#1A1B21] leading-tight line-clamp-1">Jl. Sudirman No. 12</p>
                        </div>
                    </div>
                    <div className="bg-[#FEE2E2] border border-[#FCA5A5] text-[#991B1B] font-bold text-[10px] rounded-2xl py-1 px-2 whitespace-nowrap shrink-0">
                        Prioritas Tinggi
                    </div>
                </div>
            </div>
            <hr className="border-[#E3E1E9] mt-4 mb-2 border-t-2"></hr>
            <div className="w-full flex justify-between items-center gap-2">
                <div className="text-[12px] flex flex-wrap items-center gap-x-3 gap-y-1">
                    <div className="flex gap-1 text-[#1A1B21]">
                        <span className="font-bold">Status:</span>
                        Baru
                    </div>
                    <span className="text-[#757682] text-[15px] hidden sm:block">•</span>
                    <div className="flex gap-1 text-[#BA1A1A]">
                        <span className="font-bold">Deadline:</span>
                        2 Hari Lagi
                    </div>
                </div>
                <Link href="/detail-properti" className="shrink-0">
                    <ArrowRight className="size-5 text-[#444651]"/>
                </Link>
            </div>
        </div>

        {/* Card 2 */}
        <div className="w-full bg-white border-2 border-[#C5C5D3] rounded-md mb-2 py-4 px-4 shadow-xs">
            <div className="flex gap-4">
                <Image
                    src="/images/antrean-properti/rumah-2.svg"
                    alt="Foto Rumah 2"
                    width={78}
                    height={78}
                    className="shrink-0 object-cover rounded-md"
                />
                <div className="w-full flex justify-between items-start gap-2">
                    <div className="pt-3 flex flex-col min-w-0">
                        <h3 className="font-bold text-[12px] text-[#444651]">NOP</h3>
                        <p className="font-bold text-[14px] text-[#00236F]">32.73.010.005.011-0</p>
                        <div className="flex items-center gap-1 mt-1">
                            <MapPin className="size-4 shrink-0 text-[#444651]"/>
                            <p className="text-[14px] text-[#1A1B21] leading-tight line-clamp-1">Komplek Permata B3</p>
                        </div>
                    </div>
                    <div className="bg-[#FEF3C7] border border-[#FCD34D] text-[#92400E] font-bold text-[10px] rounded-2xl py-1 px-2 whitespace-nowrap shrink-0">
                        Prioritas Sedang
                    </div>
                </div>
            </div>
            <hr className="border-[#E3E1E9] mt-4 mb-2 border-t-2"></hr>
            <div className="w-full flex justify-between items-center gap-2">
                <div className="text-[12px] flex flex-wrap items-center gap-x-3 gap-y-1">
                    <div className="flex gap-1 text-[#1A1B21]">
                        <span className="font-bold">Status:</span>
                        Baru
                    </div>
                    <span className="text-[#757682] text-[15px] hidden sm:block">•</span>
                    <div className="flex gap-1 text-[#1A1B21]">
                        <span className="font-bold">Deadline:</span>
                        7 Hari Lagi
                    </div>
                </div>
                <Link href="/detail-properti" className="shrink-0">
                    <ArrowRight className="size-5 text-[#444651]"/>
                </Link>
            </div>
        </div>

        {/* Card 3 */}
        <div className="w-full bg-white border-2 border-[#C5C5D3] rounded-md mb-2 py-4 px-4 shadow-xs">
            <div className="flex gap-4">
                <Image
                    src="/images/antrean-properti/rumah-3.svg"
                    alt="Foto Rumah 3"
                    width={78}
                    height={78}
                    className="shrink-0 object-cover rounded-md"
                />
                <div className="w-full flex justify-between items-start gap-2">
                    <div className="pt-3 flex flex-col min-w-0">
                        <h3 className="font-bold text-[12px] text-[#444651]">NOP</h3>
                        <p className="font-bold text-[14px] text-[#00236F]">32.73.010.008.022-0</p>
                        <div className="flex items-center gap-1 mt-1">
                            <MapPin className="size-4 shrink-0 text-[#444651]"/>
                            <p className="text-[14px] text-[#1A1B21] leading-tight line-clamp-1">Jl. Gatot Subroto</p>
                        </div>
                    </div>
                    <div className="bg-[#E3E1E9] border border-[#C5C5D3] text-[#1A1B21] font-bold text-[10px] rounded-2xl py-1 px-2 whitespace-nowrap shrink-0">
                        Prioritas Rendah
                    </div>
                </div>
            </div>
            <hr className="border-[#E3E1E9] mt-4 mb-2 border-t-2"></hr>
            <div className="w-full flex justify-between items-center gap-2">
                <div className="text-[12px] flex flex-wrap items-center gap-x-3 gap-y-1">
                    <div className="flex gap-1 text-[#1A1B21]">
                        <span className="font-bold">Status:</span>
                        Baru
                    </div>
                    <span className="text-[#757682] text-[15px] hidden sm:block">•</span>
                    <div className="flex gap-1 text-[#1A1B21]">
                        <span className="font-bold">Deadline:</span>
                        7 Hari Lagi
                    </div>
                </div>
                <Link href="/detail-properti" className="shrink-0">
                    <ArrowRight className="size-5 text-[#444651]"/>
                </Link>
            </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full max-w-md bg-[#EEEDF4] border-t border-[#C5C5D3] flex justify-around items-center py-2 mt-10 fixed bottom-0 left-0 z-50 left-1/2 -translate-x-1/2">
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