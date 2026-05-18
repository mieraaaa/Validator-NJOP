const BASE_URL = process.env.NODE_ENV === 'development' ? '/api/proxy' : 'https://simpbb.technosmart.id/api/rpc';

export interface NopObject {
  kdPropinsi: string;
  kdDati2: string;
  kdKecamatan: string;
  kdKelurahan: string;
  kdBlok: string;
  noUrut: string;
  kdJnsOp: string;
}

/**
 * Format dari oRPC Response wrapper
 */
export interface ApiResponse<T> {
  json: {
    data?: T;
    message?: string;
  };
}

/**
 * Helper untuk melakukan POST request ke oRPC
 */
async function fetchRpc<T>(endpoint: string, params: any = {}): Promise<T> {
  // Tidak ada header khusus JWT yang diperlukan karena rute bersifat PUBLIC.
  // Hanya membutuhkan Content-Type: application/json
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ json: params }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const result: ApiResponse<T> = await response.json();
  
  if (result.json?.message && result.json?.message !== 'Success') {
    // throw new Error(result.json.message);
    // Ignore as some API responses might have different message formats but valid data
  }

  // oRPC normally wraps the payload in json object, and maybe data field
  if (result.json && 'data' in result.json) {
    return result.json.data as T;
  }
  
  return result.json as T;
}

// ============================================================================
// API Calls
// ============================================================================

export async function fetchListAntrean(kdPropinsi?: string, kdDati2?: string, limit: number = 20, offset: number = 0, search?: string) {
  const params: any = { limit, offset };
  if (kdPropinsi) params.kdPropinsi = kdPropinsi;
  if (kdDati2) params.kdDati2 = kdDati2;
  if (search) params.search = search;

  return fetchRpc<any[]>('/objekPajak/listDetails', params);
}

export async function fetchDetailProperti(nop: NopObject) {
  return fetchRpc<any>('/objekPajak/getByNop', nop);
}

export async function fetchListBangunan(nop: NopObject) {
  return fetchRpc<any[]>('/lspop/listByNop', nop);
}

export async function fetchSpptHistory(nop: NopObject) {
  return fetchRpc<any[]>('/objekPajak/getSpptHistory', nop);
}

/**
 * Helper NOP formatter to string
 */
export function formatNopToString(nop: NopObject): string {
  return `${nop.kdPropinsi}.${nop.kdDati2}.${nop.kdKecamatan}.${nop.kdKelurahan}.${nop.kdBlok}-${nop.noUrut}.${nop.kdJnsOp}`;
}

/**
 * Helper string to NOP object
 */
export function parseStringToNop(nopString: string): NopObject {
  // 32.73.010.005.011-0001.0
  const cleanStr = nopString.replace(/[\.\-]/g, ''); // 327301000501100010
  if (cleanStr.length !== 18) {
    throw new Error('Invalid NOP string length');
  }
  return {
    kdPropinsi: cleanStr.substring(0, 2),
    kdDati2: cleanStr.substring(2, 4),
    kdKecamatan: cleanStr.substring(4, 7),
    kdKelurahan: cleanStr.substring(7, 10),
    kdBlok: cleanStr.substring(10, 13),
    noUrut: cleanStr.substring(13, 17),
    kdJnsOp: cleanStr.substring(17, 18),
  };
}
