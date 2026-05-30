"use client";

import Image from "next/image";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Save } from 'lucide-react';
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";

export default function ForgotPassword() {
  const router = useRouter();

  // State Form & UI
  const [nip, setNip] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<{
    nip?: string;
    passwordBaru?: string;
    konfirmasiPassword?: string;
    global?: string;
  }>({});

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    const trimmedNip = nip.trim();
    const trimmedPassword = passwordBaru.trim();
    const trimmedConfirm = konfirmasiPassword.trim();

    // 1. Validasi Input sesuai Spesifikasi
    const newErrors: typeof errors = {};
    let hasValidationError = false;

    if (!trimmedNip) {
      newErrors.nip = "NIP / ID Penilai wajib diisi";
      hasValidationError = true;
    }

    if (!trimmedPassword) {
      newErrors.passwordBaru = "Password baru wajib diisi";
      hasValidationError = true;
    } else if (trimmedPassword.length < 6) {
      newErrors.passwordBaru = "Password minimal 6 karakter";
      hasValidationError = true;
    }

    if (!trimmedConfirm) {
      newErrors.konfirmasiPassword = "Konfirmasi password wajib diisi";
      hasValidationError = true;
    } else if (trimmedPassword && trimmedConfirm && trimmedPassword !== trimmedConfirm) {
      newErrors.konfirmasiPassword = "Konfirmasi password tidak sesuai";
      hasValidationError = true;
    }

    if (hasValidationError) {
      setErrors(newErrors);
      return;
    }

    // 2. Kirim Request
    setLoading(true);
    try {
      // Cari user berdasarkan NIP di tabel custom users
      const { data: user, error: supabaseError } = await supabase
        .from("users")
        .select("id")
        .eq("nip", trimmedNip)
        .maybeSingle();

      if (supabaseError) {
        throw new Error(
          `Koneksi database gagal atau tabel 'users' tidak ditemukan. Harap pastikan tabel users sudah di-seed di Supabase. (Detail: ${supabaseError.message})`
        );
      }

      if (!user) {
        setErrors({ nip: "NIP tidak ditemukan" });
        setLoading(false);
        return;
      }

      // TODO: WARNING: Reset password berbasis NIP tanpa verifikasi OTP atau Admin
      // sangat TIDAK AMAN untuk lingkungan production dan hanya diperuntukkan untuk kebutuhan prototype/demonstrasi.
      const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

      // Update password baru di database
      const { error: updateError } = await supabase
        .from("users")
        .update({ password: hashedPassword })
        .eq("id", user.id);

      if (updateError) {
        throw new Error(`Gagal memperbarui password di database: ${updateError.message}`);
      }

      setSuccessMessage("Password berhasil diperbarui. Silakan login kembali.");
      
      // Bersihkan form
      setNip("");
      setPasswordBaru("");
      setKonfirmasiPassword("");

      // Redirect otomatis setelah 3 detik ke halaman login
      setTimeout(() => {
        router.push("/");
      }, 3000);

    } catch (err: any) {
      console.error("Forgot password error:", err);
      setErrors({
        global: err.message || "Terjadi kesalahan sistem saat memperbarui password. Silakan coba lagi."
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

      {/* Content Card (Desain 100% konsisten dengan Halaman Login) */}
      <div className="bg-white border-2 border-[#C5C5D3] rounded-sm mt-12 w-[93%] mx-auto pb-10 shadow-md">
        <Image
          src="/images/login-page/logo.svg"
          alt="Logo ValidatorNJOP"
          width={48}
          height={48}
          className="block mx-auto mb-3 mt-8"
        />
        <div className="leading-8 text-center mb-6">
          <h2 className="text-[#1A1B21] font-bold text-[22px]">Reset Password</h2>
          <p className="text-[#444651] text-[14px]">Perbarui password akun Penilai Anda</p>
        </div>

        {/* Global Error Display */}
        {errors.global && (
          <div className="w-[90%] mx-auto mb-5 p-3 bg-[#FFDAD6] border border-[#FFB4AB] rounded-md text-[#93000A] text-[13px] font-semibold leading-normal font-sans">
            {errors.global}
          </div>
        )}

        {/* Success Message Display */}
        {successMessage && (
          <div className="w-[90%] mx-auto mb-5 p-3 bg-[#E8F5E9] border border-[#A5D6A7] rounded-md text-[#2E7D32] text-[13px] font-semibold leading-normal font-sans">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-4">
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

          {/* Input PASSWORD BARU */}
          <div className="w-[90%] mx-auto text-left">
            <label htmlFor="password-baru" className="block text-[14px] font-bold text-black mb-1">PASSWORD BARU</label>
            <div className={`grow w-full bg-white border ${errors.passwordBaru ? 'border-[#BA1A1A]' : 'border-[#C5C5D3]'} rounded-md py-2 pr-3 pl-1 text-[14px] text-black placeholder:text-[#6B7280] flex items-center gap-2`}>
              <Image
                src="/images/login-page/PIN.svg"
                alt="Logo Placeholder PIN"
                width={20}
                height={20}
                className="flex items-center ml-1"
              />
              <input 
                id="password-baru" 
                type="password" 
                name="password-baru" 
                placeholder="Minimal 6 karakter"
                className="w-full ml-1 outline-none focus:ring-0 font-public-sans text-[12px] font-medium"
                value={passwordBaru}
                onChange={(e) => setPasswordBaru(e.target.value)}
                disabled={loading}
              />
            </div>
            {errors.passwordBaru && (
              <p className="text-[#BA1A1A] text-[12px] mt-1 font-semibold pl-1 font-sans">{errors.passwordBaru}</p>
            )}
          </div>

          {/* Input KONFIRMASI PASSWORD */}
          <div className="w-[90%] mx-auto text-left">
            <label htmlFor="konfirmasi-password" className="block text-[14px] font-bold text-black mb-1">KONFIRMASI PASSWORD BARU</label>
            <div className={`grow w-full bg-white border ${errors.konfirmasiPassword ? 'border-[#BA1A1A]' : 'border-[#C5C5D3]'} rounded-md py-2 pr-3 pl-1 text-[14px] text-black placeholder:text-[#6B7280] flex items-center gap-2`}>
              <Image
                src="/images/login-page/PIN.svg"
                alt="Logo Placeholder PIN"
                width={20}
                height={20}
                className="flex items-center ml-1"
              />
              <input 
                id="konfirmasi-password" 
                type="password" 
                name="konfirmasi-password" 
                placeholder="Masukkan ulang password baru"
                className="w-full ml-1 outline-none focus:ring-0 font-public-sans text-[12px] font-medium"
                value={konfirmasiPassword}
                onChange={(e) => setKonfirmasiPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            {errors.konfirmasiPassword && (
              <p className="text-[#BA1A1A] text-[12px] mt-1 font-semibold pl-1 font-sans">{errors.konfirmasiPassword}</p>
            )}
          </div>

          {/* Button 'Simpan Password Baru' */}
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
                  <Save className="size-4 text-white"/>
                  Simpan Password Baru
                </>
              )}
            </button>
          </div>
        </form>

        <hr className="w-[90%] mx-auto mt-8 text-[#C5C5D3]"></hr>

        {/* Kembali ke Login */}
        <div className="w-[90%] mx-auto text-center mt-4">
          <Link href="/" className="text-[#00236F] text-[13px] font-bold hover:underline flex justify-center items-center gap-1.5">
            <ArrowLeft className="size-4 text-[#00236F]"/>
            Kembali ke Halaman Login
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 mt-16 mb-8">
        <p className="text-[#757682] text-[12px] font-public-sans font-medium">
          Sistem Manajemen Pajak Bumi & Bangunan
        </p>
      </footer>
    </main>
  );
}
