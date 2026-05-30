"use client";

import Image from "next/image";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from 'lucide-react';
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();
  
  // State Form & UI
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ nip?: string; password?: string; global?: string }>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // 1. Validasi Input
    const trimmedNip = nip.trim();
    const trimmedPassword = password.trim();

    if (!trimmedNip && !trimmedPassword) {
      setErrors({
        nip: "NIP / ID Penilai dan Password wajib diisi",
        password: "NIP / ID Penilai dan Password wajib diisi"
      });
      return;
    }

    if (!trimmedNip) {
      setErrors({ nip: "NIP / ID Penilai wajib diisi" });
      return;
    }

    if (!trimmedPassword) {
      setErrors({ password: "Password wajib diisi" });
      return;
    }

    // 2. Kirim Request
    setLoading(true);
    try {
      // Pengecekan apakah Env sudah terbaca oleh Next.js di frontend
      const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      console.log("[DEBUG LOGIN] --- Memulai Percobaan Login ---");
      console.log("[DEBUG LOGIN] NEXT_PUBLIC_SUPABASE_URL:", envUrl ? "Terbaca" : "TIDAK Terbaca (Harap restart dev server!)");
      console.log("[DEBUG LOGIN] NIP yang dicari:", trimmedNip);

      if (!envUrl) {
        console.warn("[DEBUG LOGIN] PERINGATAN: Environment variables belum dimuat. Harap jalankan ulang 'npm run dev' di terminal Anda agar .env.local dapat dibaca.");
      }

      // Cari user berdasarkan NIP di tabel custom users
      // Memastikan kolom yang diambil lengkap: id, nip, nama, password, role
      const { data: user, error: supabaseError } = await supabase
        .from("users")
        .select("id, nip, nama, password, role")
        .eq("nip", trimmedNip)
        .maybeSingle();

      if (supabaseError) {
        throw new Error(
          `Koneksi database gagal atau tabel 'users' tidak ditemukan. Harap pastikan tabel users sudah di-seed di Supabase. (Detail: ${supabaseError.message})`
        );
      }

      console.log("[DEBUG LOGIN] User ditemukan di Supabase:", user ? "Ya" : "Tidak");
      if (user) {
        console.log("[DEBUG LOGIN] Detail User (kecuali password hash):", {
          id: user.id,
          nip: user.nip,
          nama: user.nama,
          role: user.role
        });
      }

      if (!user) {
        setErrors({ global: "NIP atau password salah" });
        setLoading(false);
        return;
      }

      // TODO: WARNING: Verifikasi password di client-side mengekspos hash password ke frontend.
      // Di production, proses verifikasi ini idealnya dipindahkan sepenuhnya ke server-side/API Route.
      const match = await bcrypt.compare(trimmedPassword, user.password);
      console.log("[DEBUG LOGIN] Hasil pembandingan password (bcrypt.compare):", match);

      if (!match) {
        setErrors({ global: "NIP atau password salah" });
        setLoading(false);
        return;
      }

      // Simpan session ke localStorage
      const sessionData = {
        id: user.id,
        nip: user.nip,
        nama: user.nama,
        role: user.role
      };
      localStorage.setItem("user_session", JSON.stringify(sessionData));

      // Redirect ke dashboard utama
      router.push("/antrean-properti");
    } catch (err: any) {
      console.error("Login error:", err);
      setErrors({
        global: err.message || "Terjadi kesalahan sistem saat mencoba masuk. Silakan hubungi admin."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden bg-[#FAF8FF]">

      {/* Header */}
      <header className="bg-[#FAF8FF] w-full h-[73px] sticky top-0 flex justify-end items-center border-b border-[#C5C5D3] shadow-xs px-5">
        <h1 className="text-[#00236F] font-bold font-mono text-[24px] absolute left-1/2 -translate-x-1/2">ValidatorNJOP</h1>
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

        {/* Global Error Display */}
        {errors.global && (
          <div className="w-[90%] mx-auto mb-5 p-3 bg-[#FFDAD6] border border-[#FFB4AB] rounded-md text-[#93000A] text-[13px] font-semibold leading-normal font-sans">
            {errors.global}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Input NIP / ID PENILAI */}
          <div className="w-[90%] mx-auto text-left">
            <label htmlFor="nip-id" className="block text-[14px] font-bold text-black mb-1">NIP / ID PENILAI</label>
            <div className={`grow w-full bg-white border ${errors.nip ? 'border-[#BA1A1A]' : 'border-[#C5C5D3]'} rounded-md py-2 pr-3 pl-1 text-[14px] text-black placeholder:text-[#6B7280] flex items-center gap-2`}>
              <Image
                src="/images/login-page/NIP.svg"
                alt="Logo Placeholder NIP"
                width={20}
                height={20}
                className="flex items-center ml-1"
              />
              <input 
                id="nip-id" 
                type="text" 
                name="nip-id" 
                placeholder="Masukkan NIP Anda"
                className="w-full ml-1 outline-none focus:ring-0 font-public-sans font-medium"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                disabled={loading}
              />
            </div>
            {errors.nip && (
              <p className="text-[#BA1A1A] text-[12px] mt-1 font-semibold pl-1 font-sans">{errors.nip}</p>
            )}
          </div>

          {/* Input PASSWORD / PIN */}
          <div className="w-[90%] mx-auto text-left">
            <label htmlFor="password-pin" className="block text-[14px] font-bold text-black mb-1">PASSWORD / PIN</label>
            <div className={`grow w-full bg-white border ${errors.password ? 'border-[#BA1A1A]' : 'border-[#C5C5D3]'} rounded-md py-2 pr-3 pl-1 text-[14px] text-black placeholder:text-[#6B7280] flex items-center gap-2`}>
              <Image
                src="/images/login-page/PIN.svg"
                alt="Logo Placeholder PIN"
                width={20}
                height={20}
                className="flex items-center ml-1"
              />
              <input 
                id="password-pin" 
                type="password" 
                name="password-pin" 
                placeholder="••••••••"
                className="w-full ml-1 outline-none focus:ring-0 font-public-sans text-[12px] font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            {errors.password && (
              <p className="text-[#BA1A1A] text-[12px] mt-1 font-semibold pl-1 font-sans">{errors.password}</p>
            )}
          </div>

          {/* Button 'Masuk Sekarang' */}
          <div className="w-[90%] mx-auto pt-2 flex">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#00236F] text-white text-[14px] font-bold py-3 rounded-md flex justify-center items-center gap-2 hover:bg-[#001D5C] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  Masuk Sekarang
                  <ArrowRight className="size-5 text-white"/>
                </>
              )}
            </button>
          </div>
        </form>

        <hr className="w-[90%] mx-auto mt-10 text-[#C5C5D3]"></hr>

        {/* Lupa Password */}
        <div className="w-[90%] mx-auto text-center mt-4">
          <Link href="/forgot-password" className="text-[#00236F] text-[12px] font-bold hover:underline">
            Lupa Password?
          </Link>
          <h3 className="text-[#444651] font-public-sans text-[12px] font-medium flex justify-center items-center gap-1 mt-3">
            <Image
              src="/images/login-page/admin.svg"
              alt="Logo Placeholder Admin IT"
              width={12}
              height={12}
              className="flex items-center ml-1"
            />
            Hubungi Admin IT
          </h3>
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
