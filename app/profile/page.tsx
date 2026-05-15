import Image from "next/image";
import Link from 'next/link';
import { CircleUser, History, User, ChevronRight, LogOut } from 'lucide-react';

export default function Home() {
  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-x-hidden bg-[#faf8ff] pb-28">

      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[73px] sticky top-0 flex justify-end items-center border border-[#C5C5D3] shadow-xs">
        <h1 className="text-[#00236F] font-bold font-mono text-[24px] absolute left-1/2 -translate-x-1/2">ValidatorNJOP</h1>
        <Link href="/profile">
            <CircleUser className="flex size-5 text-[#1A1B21] mr-5"/>
        </Link>
      </header>

      {/* Content */}
      <div className="w-[93%] mx-auto py-8 flex flex-col gap-6">
        {/* Bagian Atas */}
        <div className="w-full bg-white border-2 border-[#C5C5D3] shadow-xs rounded-lg flex flex-row justify-start items-center gap-6 py-6 px-6">
            {/* Foto Profile */}
            <div className="relative shrink-0">
                <div className="border-[3px] border-[#00236F] rounded-xl items-center overflow-hidden relative">
                    <Image
                        src="/images/profile/foto-profile.svg"
                        alt="Foto Profile User"
                        width={96}
                        height={96}
                        className="shrink-0 object-cover"
                    />
                </div>
                <button type="button" className="absolute z-20 -bottom-1 -right-1 rounded-full flex justify-center items-center">
                    <Image
                        src="/images/profile/edit-foto-profile.svg"
                        alt="Tombol Edit Foto Profile"
                        width={24}
                        height={24}
                        className="object-cover"
                    />              
                </button>
            </div>
            {/* Data Petugas */}
            <div className="flex flex-col justify-start gap-1 font-mono">
                <h1 className="font-semibold text-[20px] text-[#1A1B21]">Ahmad Hidayat</h1>
                <span className="text-[14px] text-[#444651] break-all">NIP: 199203152019021001</span>
                <div className="bg-[#A6F2D1] rounded-sm shrink-0 flex justify-center items-center w-fit px-2 py-1">
                    <span className="font-bold text-[11px] text-[#237157]">Verified Official</span>
                </div>
            </div>
        </div>
        {/* Personal Information */}
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-row justify-start items-center gap-2">
                <Image
                    src="/images/profile/logo-profile.svg"
                    alt="Logo Profile"
                    width={16}
                    height={16}
                    className="shrink-0 object-cover"
                />
                <h2 className="font-mono font-semibold text-[16px] text-[#444651]">PERSONAL INFORMATION</h2>
            </div>
            <div className="w-full flex flex-col gap-4">
                {/* Full Name */}
                <div className="w-full bg-white border border-[#C5C5D3] rounded-lg shadow-xs flex flex-col justify-start gap-1 py-4 px-4">
                    <h3 className="font-mono font-bold text-[11px] text-[#757682]">FULL NAME</h3>
                    <span className="font-public-sans font-semibold text-[16px] text-[#1A1B21]">Ahmad Hidayat, S.E., M.Ak.</span>
                </div>
                {/* Email Address */}
                <div className="w-full bg-white border border-[#C5C5D3] rounded-lg shadow-xs flex flex-col justify-start gap-1 py-4 px-4">
                    <h3 className="font-mono font-bold text-[11px] text-[#757682]">EMAIL ADDRESS</h3>
                    <span className="font-public-sans font-semibold text-[16px] text-[#1A1B21] truncate">ahmad.hidayat@pajak.go.id</span>
                </div>
                {/* Phone Number */}
                <div className="w-full bg-white border border-[#C5C5D3] rounded-lg shadow-xs flex flex-col justify-start gap-1 py-4 px-4">
                    <h3 className="font-mono font-bold text-[11px] text-[#757682]">PHONE NUMBER</h3>
                    <span className="font-public-sans font-semibold text-[16px] text-[#1A1B21]">+62 812-3456-7890</span>
                </div>
            </div>
        </div>
        {/* Professional Profile */}
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-row justify-start items-center gap-2">
                <Image
                    src="/images/profile/logo-professional-profile.svg"
                    alt="Logo Professional Profile"
                    width={20}
                    height={20}
                    className="shrink-0 object-cover"
                />
                <h2 className="font-mono font-semibold text-[16px] text-[#444651]">PROFESSIONAL PROFILE</h2>
            </div>
            <div className="w-full bg-white border border-[#C5C5D3] rounded-lg shadow-xs flex flex-col justify-start gap-3 py-4">
                {/* Job Title */}
                <div className="w-full flex flex-row justify-between items-center px-4">
                    <div className="flex flex-col justify-start gap-1">
                        <h3 className="font-mono font-bold text-[11px] text-[#757682]">JOB TITLE</h3>
                        <span className="font-public-sans font-semibold text-[16px] text-[#1A1B21]">Penilai Pajak Lapangan</span>
                    </div>
                    <button type="button"> {/* Ini button buat kemana yah */}
                        <ChevronRight className="flex size-5 text-[#C5C5D3]"/>
                    </button>
                </div>
                <hr className="border-[#C5C5D3] w-full mx-auto border-t"/>
                {/* Department */}
                <div className="w-full flex flex-row justify-between items-center px-4">
                    <div className="flex flex-col justify-start gap-1">
                        <h3 className="font-mono font-bold text-[11px] text-[#757682]">DEPARTMENT</h3>
                        <span className="font-public-sans font-semibold text-[16px] text-[#1A1B21]">Kantor Pelayanan Pajak Pratama</span>
                    </div>
                    <button type="button">
                        <ChevronRight className="flex size-5 text-[#C5C5D3]"/>
                    </button>
                </div>
                <hr className="border-[#C5C5D3] w-full mx-auto border-t"/>
                {/* Assigned Region */}
                <div className="w-full flex flex-row justify-between items-center px-4">
                    <div className="flex flex-col justify-start gap-1">
                        <h3 className="font-mono font-bold text-[11px] text-[#757682]">ASSIGNED REGION</h3>
                        <span className="font-public-sans font-semibold text-[16px] text-[#1A1B21]">Jakarta Selatan - Tebet & Setiabudi</span>
                    </div>
                    <button type="button">
                        <ChevronRight className="flex size-5 text-[#C5C5D3]"/>
                    </button>
                </div>
            </div>
        </div>
        {/* Account Settings */}
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-row justify-start items-center gap-2">
                <Image
                    src="/images/profile/logo-settings.svg"
                    alt="Logo Account Settings"
                    width={20}
                    height={20}
                    className="shrink-0 object-cover"
                />
                <h2 className="font-mono font-semibold text-[16px] text-[#444651]">ACCOUNT SETTINGS</h2>
            </div>
            <div className="w-full flex flex-col gap-2">
                {/* Edit Profile */}
                <div className="w-full bg-white border border-[#C5C5D3] rounded-lg shadow-xs flex flex-row justify-between items-center gap-1 py-4 px-4">
                    <div className="flex flex-row justify start items-center gap-5">
                        <Image
                            src="/images/profile/logo-edit-profile.svg"
                            alt="Logo Edit Profile"
                            width={20}
                            height={17}
                            className="shrink-0 object-cover"
                        />
                        <span className="font-public-sans font-medium text-[16px] text-[#1A1B21]">Edit Profile</span>
                    </div>
                    <button type="button">
                        <ChevronRight className="flex size-5 text-[#C5C5D3]"/>
                    </button>
                </div>
                {/* Change Password */}
                <div className="w-full bg-white border border-[#C5C5D3] rounded-lg shadow-xs flex flex-row justify-between items-center gap-1 py-4 px-4">
                    <div className="flex flex-row justify start items-center gap-5">
                        <Image
                            src="/images/profile/logo-change-password.svg"
                            alt="Logo Change Password"
                            width={16}
                            height={21}
                            className="shrink-0 object-cover"
                        />
                        <span className="font-public-sans font-medium text-[16px] text-[#1A1B21]">Change Password</span>
                    </div>
                    <button type="button">
                        <ChevronRight className="flex size-5 text-[#C5C5D3]"/>
                    </button>
                </div>
                {/* Help Center */}
                <div className="w-full bg-white border border-[#C5C5D3] rounded-lg shadow-xs flex flex-row justify-between items-center gap-1 py-4 px-4">
                    <div className="flex flex-row justify start items-center gap-5">
                        <Image
                            src="/images/profile/logo-help-center.svg"
                            alt="Logo Help Center"
                            width={20}
                            height={20}
                            className="shrink-0 object-cover"
                        />
                        <span className="font-public-sans font-medium text-[16px] text-[#1A1B21]">Help Center</span>
                    </div>
                    <button type="button">
                        <ChevronRight className="flex size-5 text-[#C5C5D3]"/>
                    </button>
                </div>
            </div>
        </div>
        {/* Tombol Logout */}
        <Link href="/" className="w-full bg-[#FFDAD6] rounded-lg flex flex-row justify-center items-center text-[#93000A] gap-4 py-4">
            <Image
                src="/images/profile/logo-logout.svg"
                alt="Logo Logout"
                width={18}
                height={18}
                className="shrink-0 object-cover"
            />
            <span className="font-mono text-[16px]">Logout</span>
        </Link>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-md bg-[#EEEDF4] border-t border-[#C5C5D3] flex justify-around items-center py-2 fixed bottom-0 z-50 left-1/2 -translate-x-1/2">
        <Link href="/antrean-properti" className="flex flex-col justify-center items-center font-bold text-[12px] text-[#444651] py-1 px-4 shrink-0 ">
            <Image
                src="/images/riwayat-keputusan/navbar-queue.svg"
                alt="Logo Navbar Antrian"
                width={18}
                height={20}
                className="shrink-0 mb-1"
            />
            Queue
        </Link>
        <Link href="/riwayat-keputusan" className="flex flex-col justify-center items-center font-bold text-[12px] text-[#444651] py-1 px-4 shrink-0">
            <History className="size-5 mb-1"/>
            History
        </Link>
        <Link href="/profile" className="bg-[#1E3A8A] rounded-lg flex flex-col justify-center items-center font-bold text-[12px] text-[#90A8FF] py-1 px-4 shrink-0">
            <User className="size-5 mb-1"/>
            Profile
        </Link>
      </footer>
    </main>
  );
}