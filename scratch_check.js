const fs = require('fs');

async function check() {
  const listResp = await fetch('https://simpbb.technosmart.id/api/rpc/objekPajak/listDetails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ json: { limit: 100, offset: 0 } })
  });
  const listJson = await listResp.json();
  const rows = listJson.json?.data?.rows || listJson.json?.rows || [];
  
  console.log(`Checking ${rows.length} properties...`);
  
  let count = 0;
  for (const item of rows) {
    const nop = {
      kdPropinsi: item.kdPropinsi || '',
      kdDati2: item.kdDati2 || '',
      kdKecamatan: item.kdKecamatan || '',
      kdKelurahan: item.kdKelurahan || '',
      kdBlok: item.kdBlok || '',
      noUrut: item.noUrut || '',
      kdJnsOp: item.kdJnsOp || '',
    };
    
    const nopStr = `${nop.kdPropinsi}.${nop.kdDati2}.${nop.kdKecamatan}.${nop.kdKelurahan}.${nop.kdBlok}-${nop.noUrut}.${nop.kdJnsOp}`;
    
    const bgnResp = await fetch('https://simpbb.technosmart.id/api/rpc/lspop/listByNop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ json: nop })
    });
    
    const bgnJson = await bgnResp.json();
    const bgnList = bgnJson.json?.data || bgnJson.json || [];
    
    if (bgnList.length > 1) {
      console.log(`FOUND! NOP ${nopStr} has ${bgnList.length} buildings.`);
      count++;
      if (count >= 3) {
          break; // Stop after finding 3 examples
      }
    }
  }
  
  if (count === 0) {
      console.log("No property with >1 buildings found in the first 100.");
  }
}

check();
