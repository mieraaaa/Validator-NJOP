export interface UserSession {
  id: string;
  nip: string;
  nama: string;
  role: string;
}

/**
  * Mendapatkan data user yang saat ini sedang login dari localStorage.
  * Mengembalikan `null` jika tidak ada session yang aktif.
  */
export function getCurrentUser(): UserSession | null {
  if (typeof window === 'undefined') return null;
  const session = localStorage.getItem('user_session');
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch (error) {
    console.error('Gagal melakukan parsing user_session:', error);
    return null;
  }
}

/**
  * Memeriksa apakah user saat ini sudah login.
  */
export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}

/**
  * Menghapus data session user dari localStorage saat melakukan logout.
  */
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user_session');
  }
}
