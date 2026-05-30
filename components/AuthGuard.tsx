'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isLoggedIn } from '@/lib/auth';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Jalankan pemeriksaan autentikasi saat pathname berubah
    authCheck(pathname);

    // Sinkronisasi sesi antar tab/state jika terjadi perubahan localStorage secara eksternal
    const handleStorageChange = () => authCheck(pathname);
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [pathname]);

  function authCheck(url: string) {
    const loggedIn = isLoggedIn();
    const publicPaths = ['/', '/forgot-password'];
    
    // Periksa apakah URL saat ini ada di daftar halaman publik
    const isPublicPath = publicPaths.includes(url);

    if (!loggedIn && !isPublicPath) {
      // Jika belum login dan mengakses rute privat, redirect ke halaman login (/)
      setAuthorized(false);
      router.push('/');
    } else if (loggedIn && isPublicPath) {
      // Jika sudah login dan mengakses halaman publik (login / forgot password), redirect ke dashboard (/antrean-properti)
      setAuthorized(false);
      router.push('/antrean-properti');
    } else {
      // Akses diizinkan
      setAuthorized(true);
    }
  }

  // Tampilkan loading screen premium selama proses pemeriksaan/redireksi
  if (!authorized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#FAF8FF]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent border-[#00236F]"></div>
          <p className="text-sm font-semibold text-[#444651] font-mono tracking-wide">VALIDATOR NJOP</p>
          <p className="text-xs text-[#757682]">Memeriksa sesi...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
