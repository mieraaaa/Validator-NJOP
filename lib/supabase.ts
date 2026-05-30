import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validasi keberadaan environment variable
if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "⚠️ PERINGATAN KREDENSIAL: Berkas '.env.local' belum terkonfigurasi atau environment variable " +
    "NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY tidak ditemukan.\n" +
    "Silakan buat berkas '.env.local' di root folder dengan kredensial Supabase Anda."
  );
}

// Gunakan fallback untuk mencegah error 'supabaseUrl is required' yang memicu crash pada startup/bundling Next.js.
// Error query database akan ditangani secara anggun di dalam blok try/catch halaman form.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
);

