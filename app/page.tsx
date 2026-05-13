import Image from "next/image";
import { CircleUser, ArrowRight} from 'lucide-react';

export default function Home() {
  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden bg-[#FAF8FF]">

      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[73px] sticky top-0 flex justify-end items-center border-b border-[#C5C5D3] shadow-xs px-5">
        <h1 className="text-[#00236F] font-bold font-mono text-[24px] absolute left-1/2 -translate-x-1/2">ValidatorNJOP</h1>
        <CircleUser className="flex size-5 text-[#1A1B21]"/>
      </header>

      {/* Content */}
      <div className="bg-white border-2 border-[#C5C5D3] rounded-sm mt-20 w-[93%] mx-auto pb-10 shadow-md">
        <Image
          src="/images/login-page/logo.svg"
          alt="Logo ValidatorNJOP"
          width={48}
          height={48}
          className="block mx-auto mb-3 mt-8"
        />
        <div className="leading-8 text-center mb-8">
          <h2 className="text-[#1A1B21] font-bold text-[22px]">Selamat Datang, Penilai</h2>
          <p className="text-[#444651] text-[14px]">Silakan masuk untuk memulai validasi properti</p>
        </div>
        {/* Input NIP / ID PENILAI */}
        <div className="w-[90%] mx-auto text-left">
          <label htmlFor="nip-id" className="block text-[14px] font-bold text-black mb-1">NIP / ID PENILAI</label>
          <div className="grow w-full bg-white border border-[#C5C5D3] rounded-md py-2 pr-3 pl-1 text-[14px] text-black placeholder:text-[#6B7280] flex items-center gap-2">
            <Image
              src="/images/login-page/NIP.svg"
              alt="Logo Placeholder NIP"
              width={20}
              height={20}
              className="flex items-center ml-1"
            />
            <input id="nip-id" type="text" name="nip-id" 
              placeholder="Masukkan NIP Anda"
              className="w-full ml-1 outline-none focus:ring-0 font-public-sans font-medium"
            />
          </div>
        </div>
        {/* Input PASSWORD / PIN */}
        <div className="w-[90%] mx-auto text-left mt-5">
          <label htmlFor="password-pin" className="block text-[14px] font-bold text-black mb-1">PASSWORD / PIN</label>
          <div className="grow w-full bg-white border border-[#C5C5D3] rounded-md py-2 pr-3 pl-1 text-[14px] text-black placeholder:text-[#6B7280] flex items-center gap-2">
            <Image
              src="/images/login-page/PIN.svg"
              alt="Logo Placeholder PIN"
              width={20}
              height={20}
              className="flex items-center ml-1"
            />
            <input id="password-pin" type="password" name="password-pin" 
              placeholder="••••••••"
              className="w-full ml-1 outline-none focus:ring-0 font-public-sans text-[10px]"
            />
          </div>
        </div>
        {/* Button 'Masuk Sekarang' */}
        <div className="w-[90%] mx-auto mt-6 flex">
          <button type="submit"
            className="w-full bg-[#00236F] text-white text-[14px] font-bold py-3 rounded-md flex justify-center items-center gap-1">
            Masuk Sekarang
            <ArrowRight className="size-5 text-white"/>
          </button>
        </div>

        <hr className="w-[90%] mx-auto mt-10 text-[#C5C5D3]"></hr>

        {/* Lupa Password */}
        <div className="w-[90%] mx-auto text-center mt-1">
          <a href="#" className="text-[#00236F] text-[12px] font-bold">
            Lupa Password?
          </a>
          <h3 className="text-[#444651] font-public-sans text-[12px] font-medium flex justify-center items-center gap-1 mt-2">
            <Image
              src="/images/login-page/admin.svg"
              alt="Logo Placeholder Admin IT"
              width={12}
              height={12}
              className="flex items-center ml-1"
            />
            Hubungi Admin IT</h3>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 mt-28 mb-8">
        <p className="text-[#757682] text-[12px] font-public-sans font-medium">
          Sistem Manajemen Pajak Bumi & Bangunan
        </p>
      </footer>
    </main>
  );
}
