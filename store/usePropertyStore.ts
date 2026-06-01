import { create } from 'zustand';
import { fetchListAntrean, NopObject, formatNopToString } from '@/lib/api';

  export interface PropertyItem {
    nop: NopObject;
    nopString: string;
    jalanOp: string;
    luasBumi: number;
    nilaiSistemBumi: number;
    priority: 'High' | 'Medium' | 'Low'; // Mocked
    status: 'Baru' | 'Revisi'; // Mocked (Ditolak/Setuju ada di History)
    deadlineDays: number; // Mocked
    dateReceived: string; // Mocked (ISO Date)
  }

interface PropertyStore {
  antrean: PropertyItem[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedProperty: any | null;
  
  // Actions
  fetchAntrean: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedProperty: (property: any | null) => void;
}

function generateMockMetadata(nopStr: string) {
  const sum = Array.from(nopStr).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  let status: 'Baru' | 'Revisi' = 'Baru';
  if (sum % 4 === 0 || sum % 4 === 1) status = 'Revisi';
  
  // Dummy timestamp: Antara hari ini mundur ke 30 hari yang lalu
  const daysOffset = sum % 30;
  const dateReceived = new Date(Date.now() - daysOffset * 24 * 60 * 60 * 1000).toISOString();

  // Menentukan deadline dari 1 sampai 7 hari
  const deadlineDays = (sum % 7) + 1;
  
  // Menentukan prioritas berbanding lurus dengan deadline
  let priority: 'High' | 'Medium' | 'Low' = 'Low';
  if (deadlineDays <= 2) {
    priority = 'High'; // Sangat mendesak (1-2 hari)
  } else if (deadlineDays <= 4) {
    priority = 'Medium'; // Mendesak (3-4 hari)
  }

  return {
    priority,
    status,
    deadlineDays,
    dateReceived,
  };
}

export const usePropertyStore = create<PropertyStore>((set, get) => ({
  antrean: [],
  isLoading: false,
  error: null,
  searchQuery: '',

  selectedProperty: null,
  setSelectedProperty: (property) => set({ selectedProperty: property }),

  fetchAntrean: async () => {
    set({ isLoading: true, error: null });
    try {
      // Mengambil 100 antrean di awal tanpa search query api, pure client-side filter nantinya
      const response: any = await fetchListAntrean(undefined, undefined, 100, 0);
      
      const properties: PropertyItem[] = (response?.rows || []).map((item: any) => {
        const nopObj: NopObject = {
          kdPropinsi: item.kdPropinsi || '',
          kdDati2: item.kdDati2 || '',
          kdKecamatan: item.kdKecamatan || '',
          kdKelurahan: item.kdKelurahan || '',
          kdBlok: item.kdBlok || '',
          noUrut: item.noUrut || '',
          kdJnsOp: item.kdJnsOp || '',
        };
        const nopStr = formatNopToString(nopObj);
        const mocks = generateMockMetadata(nopStr);

        return {
          nop: nopObj,
          nopString: nopStr,
          jalanOp: item.jalanOp || 'Alamat tidak tersedia',
          luasBumi: item.luasBumi || 0,
          nilaiSistemBumi: item.njopBumi || item.nilaiSistemBumi || 0,
          ...mocks,
        };
      });

      set({ antrean: properties, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },
}));
