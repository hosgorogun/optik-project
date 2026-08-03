import { jsPDF } from 'jspdf';

const PRIMARY = [30, 64, 175];
const SLATE = [15, 23, 42];
const MUTED = [100, 116, 139];
const LIGHT = [241, 245, 249];

const asset = (path) => `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`;

async function loadImageData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

async function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const chunk = 0x8000;
  let binary = '';
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

async function registerTurkishFonts(doc) {
  const [regular, bold] = await Promise.all([
    fetch(asset('fonts/DejaVuSans.ttf')).then((r) => r.arrayBuffer()),
    fetch(asset('fonts/DejaVuSans-Bold.ttf')).then((r) => r.arrayBuffer()),
  ]);
  doc.addFileToVFS('DejaVuSans.ttf', await arrayBufferToBase64(regular));
  doc.addFileToVFS('DejaVuSans-Bold.ttf', await arrayBufferToBase64(bold));
  doc.addFont('DejaVuSans.ttf', 'DejaVu', 'normal');
  doc.addFont('DejaVuSans-Bold.ttf', 'DejaVu', 'bold');
  doc.setFont('DejaVu', 'normal');
}

function setFont(doc, style = 'normal') {
  doc.setFont('DejaVu', style);
}

function wrapText(doc, text, maxWidth) {
  if (!text) return [];
  return doc.splitTextToSize(String(text), maxWidth);
}

function drawFooter(doc, page, total) {
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  doc.setDrawColor(...PRIMARY);
  doc.setLineWidth(0.4);
  doc.line(16, h - 14, w - 16, h - 14);
  setFont(doc, 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...MUTED);
  doc.text('OptiSafe · EN166 Sertifikalı Numaralı İş Güvenliği Gözlükleri', 16, h - 8);
  doc.text(`www.optisafe.com.tr  ·  Sayfa ${page} / ${total}`, w - 16, h - 8, { align: 'right' });
}

function drawHeaderBar(doc, title) {
  const w = doc.internal.pageSize.getWidth();
  doc.setFillColor(...PRIMARY);
  doc.rect(0, 0, w, 18, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  setFont(doc, 'bold');
  doc.text(title, 16, 11.5);
  setFont(doc, 'normal');
  doc.setFontSize(8);
  doc.text('Ürün Kataloğu 2026', w - 16, 11.5, { align: 'right' });
}

/**
 * Generates and downloads a corporate OptiSafe product catalog PDF.
 * @param {Array} products
 * @param {{ onProgress?: (pct: number) => void }} [options]
 */
export async function generateCatalogPdf(products, options = {}) {
  const { onProgress } = options;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 16;

  await registerTurkishFonts(doc);
  onProgress?.(5);

  // ---- Cover ----
  doc.setFillColor(...SLATE);
  doc.rect(0, 0, pageW, pageH, 'F');
  doc.setFillColor(...PRIMARY);
  doc.rect(0, 0, 8, pageH, 'F');

  const logoData = await loadImageData(asset('logo.png'));
  if (logoData) {
    try {
      doc.addImage(logoData, 'PNG', margin + 4, 36, 42, 42);
    } catch {
      /* logo optional */
    }
  }

  doc.setTextColor(255, 255, 255);
  setFont(doc, 'bold');
  doc.setFontSize(28);
  doc.text('OPTISAFE', margin + 4, 100);
  doc.setFontSize(14);
  doc.setTextColor(147, 197, 253);
  doc.text('Numaralı İş Güvenliği Gözlükleri', margin + 4, 112);
  setFont(doc, 'normal');
  doc.setFontSize(11);
  doc.setTextColor(203, 213, 225);
  doc.text('Kurumsal Ürün Kataloğu', margin + 4, 124);
  doc.setFontSize(9);
  doc.text(`${products.length} model  ·  EN166 / EN ISO 16321 sertifikalı`, margin + 4, 134);

  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.3);
  doc.line(margin + 4, 148, pageW - margin, 148);

  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  const contactLines = [
    'Yenikent Mah. Gazi Mustafa Kemal Cad. No:46H',
    '41900 Derince / Kocaeli',
    'Tel: +90 (539) 589 55 02',
    'E-posta: info@optisafe.com.tr',
    'www.optisafe.com.tr',
  ];
  contactLines.forEach((line, i) => {
    doc.text(line, margin + 4, 160 + i * 6);
  });

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`© ${new Date().getFullYear()} OptiSafe — Tüm hakları saklıdır.`, margin + 4, pageH - 20);

  onProgress?.(10);

  const imageMap = {};
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const src = p.img || (p.images && p.images[0]);
    if (src) {
      imageMap[p.id] = await loadImageData(src);
    }
    onProgress?.(10 + Math.round(((i + 1) / products.length) * 50));
  }

  // ---- Index ----
  doc.addPage();
  drawHeaderBar(doc, 'İçindekiler');
  doc.setTextColor(...SLATE);
  setFont(doc, 'bold');
  doc.setFontSize(16);
  doc.text('Model Listesi', margin, 32);

  let y = 42;
  products.forEach((p, idx) => {
    if (y > pageH - 22) {
      doc.addPage();
      drawHeaderBar(doc, 'İçindekiler');
      y = 28;
    }
    doc.setFillColor(...(idx % 2 === 0 ? LIGHT : [255, 255, 255]));
    doc.roundedRect(margin, y - 4.5, pageW - margin * 2, 8, 1.5, 1.5, 'F');
    setFont(doc, 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...PRIMARY);
    doc.text(String(idx + 1).padStart(2, '0'), margin + 3, y);
    doc.setTextColor(...SLATE);
    doc.text(p.name, margin + 14, y);
    setFont(doc, 'normal');
    doc.setTextColor(...MUTED);
    doc.setFontSize(8);
    doc.text(p.code || '', pageW - margin - 3, y, { align: 'right' });
    y += 9;
  });

  // ---- Products (2 per page) ----
  const cardH = 112;
  const gap = 8;
  let slot = 0;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    if (slot === 0) {
      doc.addPage();
      drawHeaderBar(doc, 'Ürünler');
    }

    const top = slot === 0 ? 26 : 26 + cardH + gap;
    const cardW = pageW - margin * 2;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.35);
    doc.roundedRect(margin, top, cardW, cardH, 3, 3, 'FD');

    doc.setFillColor(...PRIMARY);
    doc.roundedRect(margin, top, 2.2, cardH, 1, 1, 'F');

    const imgBoxX = margin + 8;
    const imgBoxY = top + 8;
    const imgBoxW = 52;
    const imgBoxH = 52;
    doc.setFillColor(...LIGHT);
    doc.roundedRect(imgBoxX, imgBoxY, imgBoxW, imgBoxH, 2, 2, 'F');

    const imgData = imageMap[p.id];
    if (imgData) {
      try {
        const format = imgData.includes('image/png') ? 'PNG' : 'JPEG';
        doc.addImage(imgData, format, imgBoxX + 2, imgBoxY + 2, imgBoxW - 4, imgBoxH - 4, undefined, 'FAST');
      } catch {
        /* skip */
      }
    }

    const tx = imgBoxX + imgBoxW + 8;
    const tw = cardW - imgBoxW - 22;

    setFont(doc, 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...PRIMARY);
    doc.text((p.tag || 'Numaralı Koruyucu').toUpperCase(), tx, top + 12);

    doc.setFontSize(12);
    doc.setTextColor(...SLATE);
    const nameLines = wrapText(doc, p.name, tw);
    doc.text(nameLines.slice(0, 2), tx, top + 20);

    setFont(doc, 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    let textY = top + 20 + nameLines.slice(0, 2).length * 5 + 2;
    if (p.variant) {
      doc.text(p.variant, tx, textY);
      textY += 5;
    }
    setFont(doc, 'bold');
    doc.setTextColor(...PRIMARY);
    doc.text(p.code || '', tx, textY);
    textY += 6;

    setFont(doc, 'normal');
    doc.setTextColor(71, 85, 105);
    doc.setFontSize(7.5);
    const descLines = wrapText(doc, p.desc, tw).slice(0, 3);
    doc.text(descLines, tx, textY);
    textY += descLines.length * 3.6 + 4;

    const specsY = Math.max(top + 68, textY);
    const specs = [
      ['Standart', p.specs?.standard],
      ['Koruma', p.specs?.protection],
      ['Çerçeve', p.specs?.frame],
      ['Beden', p.specs?.size],
    ].filter(([, v]) => v);

    const chipW = (cardW - 16) / 2 - 2;
    specs.slice(0, 4).forEach((pair, si) => {
      const col = si % 2;
      const row = Math.floor(si / 2);
      const cx = margin + 8 + col * (chipW + 4);
      const cy = specsY + row * 16;
      doc.setFillColor(...LIGHT);
      doc.roundedRect(cx, cy, chipW, 14, 1.5, 1.5, 'F');
      setFont(doc, 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(...MUTED);
      doc.text(pair[0].toUpperCase(), cx + 2.5, cy + 4.5);
      setFont(doc, 'normal');
      doc.setFontSize(7);
      doc.setTextColor(...SLATE);
      const valLines = wrapText(doc, pair[1], chipW - 5).slice(0, 1);
      doc.text(valLines, cx + 2.5, cy + 9.5);
    });

    if (p.features?.length) {
      doc.setFontSize(7);
      doc.setTextColor(...MUTED);
      const feat = p.features.slice(0, 4).join('  ·  ');
      const featLines = wrapText(doc, feat, cardW - 16).slice(0, 1);
      doc.text(featLines, margin + 8, top + cardH - 5);
    }

    slot = (slot + 1) % 2;
    onProgress?.(65 + Math.round(((i + 1) / products.length) * 30));
  }

  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    if (p > 1) drawFooter(doc, p, total);
  }

  onProgress?.(100);
  const filename = 'OptiSafe-Urun-Katalogu-2026.pdf';
  doc.save(filename);
  return filename;
}
