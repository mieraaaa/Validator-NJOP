import Image from "next/image";
import { CircleUser } from 'lucide-react';

export default function Home() {
  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden bg-white">

      {/* Header */}
      <div className="bg-[#FAF8FF] w-full h-18.25 sticky top-0 flex items-center border border-[#C5C5D3] shadow-md">
        <h1 className="text-[#00236F] font-bold font-[inter] text-[24px] flex-1 text-center">ValidatorNJOP</h1>
        <CircleUser className="flex size-5 text-[#1A1B21]"/>
      </div>
    </main>
  );
}
