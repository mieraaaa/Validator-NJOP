const fs = require('fs');

async function main() {
  const response = await fetch('https://simpbb.technosmart.id/api/rpc/objekPajak/listDetails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ json: { limit: 100, offset: 0 } })
  });
  
  const parsed = await response.json();
  const data = parsed.rows || (parsed.json && parsed.json.rows) || (parsed.json && parsed.json.data) || [];

  function generateMockMetadata(nopStr) {
    const sum = Array.from(nopStr).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Mock Prioritas & Deadline
    let priority = 'Low';
    if (sum % 3 === 0) priority = 'High';
    else if (sum % 3 === 1) priority = 'Medium';

    let status = 'Baru';
    if (sum % 4 === 0) status = 'Revisi';
    
    const daysOffset = sum % 30;
    const dateReceived = new Date(Date.now() - daysOffset * 24 * 60 * 60 * 1000).toISOString();

    // Mock Koordinat (Bali base: -8.6500, 115.2167)
    const latOffset = (sum % 100) * 0.0005; 
    const lngOffset = ((sum * 2) % 100) * 0.0005;
    const lat = (-8.6500 + latOffset).toFixed(4);
    const lng = (115.2167 + lngOffset).toFixed(4);
    
    // Mock Fasilitas & Jalan
    const jarak = [150, 300, 500, 850, 1200][sum % 5];
    const fasilitas = jarak >= 1000 ? `${(jarak/1000).toFixed(1)}km` : `${jarak}m`;

    const jalanOptions = [
        "Aspal / Kapasitas 2 Mobil",
        "Aspal / Kapasitas 1 Mobil",
        "Paving / Kapasitas 1 Mobil",
        "Tanah / Hanya Akses Motor"
    ];
    const jalan = jalanOptions[sum % 4];

    return { priority, status, deadlineDays: (sum % 7) + 1, dateReceived, lat, lng, fasilitas, jalan };
  }

  function formatNopToString(item) {
    return `${item.kdPropinsi || '00'}.${item.kdDati2 || '00'}.${item.kdKecamatan || '000'}.${item.kdKelurahan || '000'}.${item.kdBlok || '000'}-${item.noUrut || '0000'}.${item.kdJnsOp || '0'}`;
  }

  const properties = data.map(item => {
      const nopStr = formatNopToString(item);
      const mocks = generateMockMetadata(nopStr);
      return {
        nopString: nopStr,
        jalanOp: item.jalanOp || 'Alamat tidak tersedia',
        luasBumi: item.luasBumi || 0,
        nilaiSistemBumi: item.njopBumi || item.nilaiSistemBumi || 0,
        ...mocks
      };
  });

  fs.writeFileSync('data-store-peta.json', JSON.stringify(properties, null, 2));
  console.log(`Selesai! File data-store-peta.json berhasil dibuat dengan ${properties.length} properti.`);
}

main().catch(console.error);
