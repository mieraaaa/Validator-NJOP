import Image from "next/image";
import { CircleUser, History, User, ArrowLeft } from 'lucide-react';

export default function Home() {
  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden bg-[#f8fafc] pb-20">

      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[73px] sticky top-0 flex justify-between items-center border border-[#C5C5D3] shadow-xs px-5">
        <ArrowLeft className="flex size-5 text-[#1A1B21]"/>
        <h1 className="text-[#00236F] font-bold font-mono text-[24px] absolute left-1/2 -translate-x-1/2">ValidatorNJOP</h1>
        <CircleUser className="flex size-5 text-[#1A1B21]"/>
      </header>

      {/* Content */}
      

      {/* Footer */}
      <footer className="w-full max-w-md bg-[#EEEDF4] border-t border-[#C5C5D3] flex justify-around items-center py-2 mt-10 fixed bottom-0 left-0 z-50 left-1/2 -translate-x-1/2">
        <div className="bg-[#1E3A8A] rounded-lg flex flex-col justify-center items-center font-bold text-[12px] text-[#90A8FF] py-1 px-4 shrink-0 ">
            <Image
                src="/images/common/navbar-queue.svg"
                alt="Logo Navbar Antrian"
                width={18}
                height={20}
                className="shrink-0 mb-1"
            />
            Queue
        </div>
        <div className="flex flex-col justify-center items-center font-bold text-[12px] text-[#444651] py-1 px-4 shrink-0">
            <History className="size-5 text-[#444651] mb-1"/>
            History
        </div>
        <div className="flex flex-col justify-center items-center font-bold text-[12px] text-[#444651] py-1 px-4">
            <User className="size-5 text-[#444651] mb-1"/>
            Profile
        </div>
      </footer>
    </main>
  );
}