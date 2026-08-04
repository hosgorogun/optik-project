import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, 
  X, 
  ChevronLeft,
  ChevronRight, 
  Mail, 
  Phone, 
  Globe, 
  CheckCircle,
  MapPin,
  ShieldCheck,
  Eye,
  Award,
  Download,
  UserCheck,
  Check,
  Sparkles,
  Maximize2,
  Loader2,
  FileText,
  Leaf
} from 'lucide-react';
import { generateCatalogPdf } from './generateCatalogPdf';
import { createT } from './i18n';

/** Public asset URL that works with Vite `base` (dev, preview, Live Server under /dist/). */
const asset = (path) => `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`;

const GLASS_VIEWS = ['FrontalView', 'AngledView', 'InteriorView'];

const glassImages = (base) =>
  GLASS_VIEWS.map(
    (view) => asset(`glasses/${base}_${view}-300dpi.jpg`)
  );

function ProductImageCarousel({ images, alt, onImageClick, className = '', imgClassName = '', initialIndex = 0 }) {
  const [index, setIndex] = useState(initialIndex);
  const imgs = images?.length ? images : [];
  if (!imgs.length) return null;

  const go = (e, delta) => {
    e.stopPropagation();
    e.preventDefault();
    setIndex((i) => (i + delta + imgs.length) % imgs.length);
  };

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <img
        src={imgs[index]}
        alt={alt}
        className={imgClassName}
        onClick={() => onImageClick?.(imgs[index], index, imgs)}
        draggable={false}
      />
      {imgs.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Önceki resim"
            onClick={(e) => go(e, -1)}
            className="absolute left-1.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-[#1e40af] transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Sonraki resim"
            onClick={(e) => go(e, 1)}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-[#1e40af] transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
            {imgs.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Resim ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-4 bg-[#1e40af]' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(() => {
    try {
      return localStorage.getItem('optisafe-lang') === 'EN' ? 'EN' : 'TR';
    } catch {
      return 'TR';
    }
  });
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [catalogGenerating, setCatalogGenerating] = useState(false);
  const [catalogProgress, setCatalogProgress] = useState(0);
  const [catalogError, setCatalogError] = useState(null);
  const [catalogFileName, setCatalogFileName] = useState(null);

  const t = useMemo(() => createT(currentLang), [currentLang]);

  useEffect(() => {
    try {
      localStorage.setItem('optisafe-lang', currentLang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = currentLang === 'EN' ? 'en' : 'tr';
  }, [currentLang]);

  const whatsappUrl = useMemo(() => {
    const text = encodeURIComponent(t('whatsappMsg'));
    return `https://wa.me/905395895502?text=${text}`;
  }, [t]);

  const setLang = (lang) => {
    setCurrentLang(lang);
    setLangDropdownOpen(false);
  };

  // OptiSafe All Main Products & Sub-Models Collection (Direct & Complete from optisafe.com.tr)
  const products = [
    {
      id: '158-03-organik-hermetic',
      brand: 'Pegaso',
      name: 'Organik Hermetic 158.03',
      code: 'REF-158.03',
      category: 'hermetic',
      rxSupport: true,
      tag: 'Sıvı & Toz Korumalı',
      badgeBg: 'bg-cyan-700',
      variant: 'Foam Temple/Band · Tek Beden',
      images: glassImages('Prescription_Ref.158.03_Organik-Hermetic_WithFoam'),
      img: glassImages('Prescription_Ref.158.03_Organik-Hermetic_WithFoam')[0],
      detailImg: glassImages('Prescription_Ref.158.03_Organik-Hermetic_WithFoam')[0],
      desc: 'Bio-based TR-90 poliamid gövdeli, hermetik foam contalı numaralı iş güvenliği gözlüğü. Toz ve sıvı sıçramalarına karşı tam koruma sunar; 8 saatlik kullanımda yüksek konfor sağlar.',
      specs: {
        standard: 'EN166 3 4 F T',
        prescription: 'Organik / Polikarbonat / Trivex numaralı lens',
        impact: 'Yüksek hızlı parçacık direnci (F T)',
        coating: 'PRIVILEGE (çizilmez & buğulanmaz), Bluestop, antirefle, hidrofobik',
        frame: 'Bio-based TR-90 poliamid',
        size: 'Tek beden · Kalibre 56',
        protection: 'Sıvı damlacık / sıçrama (3) · Büyük toz parçacıkları (4)',
      },
      features: ['İç hermetik foam conta', 'Dielektrik yapı', 'Kaymaz burun pedi', t('kitItem3'), 'Sap + bant çift bağlantı seçeneği', 'PRIVILEGE çizilmez & buğulanmaz kaplama', 'Mavi ışık filtresi (Bluestop)', 'Organik, polikarbonat veya Trivex numaralı lens']
    },
    {
      id: '158-08-organik-hermetic',
      brand: 'Pegaso',
      name: 'Organik Hermetic 158.08',
      code: 'REF-158.08',
      category: 'hermetic',
      rxSupport: true,
      tag: 'Sıvı & Toz Korumalı',
      badgeBg: 'bg-cyan-700',
      variant: 'Foam Band · Tek Beden',
      images: glassImages('Prescription_Ref.158.08_Organik-Hermetic'),
      img: glassImages('Prescription_Ref.158.08_Organik-Hermetic')[0],
      detailImg: glassImages('Prescription_Ref.158.08_Organik-Hermetic')[0],
      desc: 'Hermetik foam contalı ve bant bağlantılı Organik Hermetic modeli. Ultra dayanıklı gövde ile sıvı ve toz koruması; EN166 sertifikalı numaralı/plano kullanım.',
      specs: {
        standard: 'EN166 3 4 F T',
        prescription: 'Organik / Polikarbonat numaralı lens',
        impact: 'Yüksek hızlı parçacık direnci (F T)',
        coating: 'Antifog, antirefle, çizilmez, Bluestop, hidrofobik',
        frame: 'TR-90 poliamid',
        size: 'Tek beden · Kalibre 56',
        protection: 'Sıvı damlacık / sıçrama (3) · Büyük toz parçacıkları (4)',
      },
      features: ['İç hermetik foam conta', 'Dielektrik yapı', 'Kaymaz burun pedi', 'Ayarlanabilir elastik bant bağlantısı', 'Sıvı ve toz sızdırmazlık', 'Çizilmez & buğulanmaz lens seçenekleri']
    },
    {
      id: '158-01-organik',
      brand: 'Pegaso',
      name: 'Organik 158.01',
      code: 'REF-158.01',
      category: 'impact',
      rxSupport: true,
      tag: 'Darbe Korumalı',
      badgeBg: 'bg-[#1e40af]',
      variant: 'Without Foam · Tek Beden',
      images: glassImages('Prescription_Ref.158.01_Organik_WithoutFoam'),
      img: glassImages('Prescription_Ref.158.01_Organik_WithoutFoam')[0],
      detailImg: glassImages('Prescription_Ref.158.01_Organik_WithoutFoam')[0],
      desc: 'Foam contasız Organik modeli. Darbe koruması gereken atölye ve saha işleri için hafif, dielektrik TR-90 gövde. Sıvı/toz sızdırmazlık gerektirmeyen kullanımlar için idealdir.',
      specs: {
        standard: 'EN166 F T',
        prescription: 'Organik / Polikarbonat numaralı lens',
        impact: 'Mekanik darbe direnci (F T)',
        coating: 'Antifog, antirefle, çizilmez, Bluestop, hidrofobik',
        frame: 'TR-90 poliamid',
        size: 'Tek beden · Kalibre 56',
        protection: 'Darbe / mekanik parçacık koruması',
      },
      features: ['Foam contasız hafif tasarım', 'Dielektrik yapı', 'Kaymaz burun pedi', 'EN166 F T darbe işareti', 'Numaralı lens uyumlu']
    },
    {
      id: '211-02-organik-hermetic-pro',
      brand: 'Pegaso',
      name: 'Organik Hermetic PRO 211.02',
      code: 'REF-211.02',
      category: 'hermetic',
      rxSupport: true,
      tag: 'PRO · Sıvı & Toz',
      badgeBg: 'bg-emerald-700',
      variant: 'Foam Temple/Band · Tek Beden',
      images: glassImages('Prescription_Ref.211.02_Organik-Hermetic-PRO_WithFoam'),
      img: glassImages('Prescription_Ref.211.02_Organik-Hermetic-PRO_WithFoam')[0],
      detailImg: glassImages('Prescription_Ref.211.02_Organik-Hermetic-PRO_WithFoam')[0],
      desc: 'Organik Hermetic PRO: çevre dostu BIOBALANCE gövde, çevresel foam conta ve sap/bant çift bağlantı. 8 saatlik ergonomi; EN ISO 16321 sertifikalı.',
      specs: {
        standard: 'EN166 / EN ISO 16321 · U1.2 G3 C T 3 4',
        prescription: 'Organik / Polikarbonat / Trivex numaralı lens',
        impact: 'Yüksek darbe direnci (C T)',
        coating: 'PRIVILEGE buğulanmaz & çizilmez, Bluestop, antirefle, hidrofobik',
        frame: 'BIOBALANCE eko-sürdürülebilir malzeme',
        size: 'Tek beden',
        protection: 'Sıvı damlacık / sıçrama (3) · Büyük toz parçacıkları (4)',
      },
      features: ['BIOBALANCE eko çerçeve', 'Dielektrik yapı', 'Çevresel hermetik foam conta', 'Sap + elastik bant çift bağlantı', 'PRIVILEGE kaplama', 'EN ISO 16321 sertifikası', '8 saatlik üstün konfor']
    },
    {
      id: '211-01-organik-pro',
      brand: 'Pegaso',
      name: 'Organik PRO 211.01',
      code: 'REF-211.01',
      category: 'impact',
      rxSupport: true,
      tag: 'PRO · Şeffaf',
      badgeBg: 'bg-emerald-700',
      variant: 'Transparent · Tek Beden',
      images: glassImages('Prescription_Ref.211.01_Organik-PRO'),
      img: glassImages('Prescription_Ref.211.01_Organik-PRO')[0],
      detailImg: glassImages('Prescription_Ref.211.01_Organik-PRO')[0],
      desc: 'Foam ve bant olmadan günlük kullanıma uygun hafif Organik PRO. Modern tasarım, rahat saplar ve eko-sürdürülebilir BIOBALANCE gövde. EN ISO 16321 sertifikalı.',
      specs: {
        standard: 'EN166 / EN ISO 16321 · U1.2 G3 C T',
        prescription: 'Polikarbonat / Organik / Trivex numaralı lens',
        impact: 'Yüksek darbe direnci (C T)',
        coating: 'PRIVILEGE, Bluestop, antirefle, hidrofobik',
        frame: 'BIOBALANCE eko-sürdürülebilir malzeme',
        size: 'Tek beden',
        protection: 'Darbe / mekanik parçacık koruması',
      },
      features: ['BIOBALANCE eko çerçeve', 'Dielektrik yapı', 'Foam / bant yok — hafif günlük kullanım', 'Modern, konforlu sap tasarımı', 'PRIVILEGE kaplama', 'Mikrofiber kılıf (ACC.04) dahil', 'EN ISO 16321 sertifikası']
    },
    {
      id: '207-01-compact-pro',
      brand: 'Pegaso',
      name: 'Compact PRO 207.01',
      code: 'REF-207.01',
      category: 'impact',
      rxSupport: true,
      tag: 'Small · Mavi/Şeffaf',
      badgeBg: 'bg-indigo-600',
      variant: 'Blue/Transparent · Small',
      images: glassImages('Prescription_Ref.207.01_Compact-PRO'),
      img: glassImages('Prescription_Ref.207.01_Compact-PRO')[0],
      detailImg: glassImages('Prescription_Ref.207.01_Compact-PRO')[0],
      desc: 'Compact PRO Small beden, mavi/şeffaf. Bio-based gövde, 8 saatlik ergonomi ve PRIVILEGE kaplama. İki beden seçeneği olan PRO serisinin küçük boyutu.',
      specs: {
        standard: 'EN ISO 16321 C T',
        prescription: 'Organik / Polikarbonat / Trivex numaralı lens',
        impact: 'Yüksek darbe direnci (C T)',
        coating: 'PRIVILEGE (çizilmez & buğulanmaz), Bluestop, antirefle, hidrofobik',
        frame: 'Bio-based malzeme',
        size: 'Small · Kalibre 51',
        protection: 'Darbe / mekanik parçacık koruması',
      },
      features: ['Bio-based dielektrik gövde', 'Modern Compact PRO tasarımı', 'Small / Large iki beden seçeneği', 'PRIVILEGE çizilmez & buğulanmaz', 'EN ISO 16321 sertifikası']
    },
    {
      id: '207-02-compact-pro',
      brand: 'Pegaso',
      name: 'Compact PRO 207.02',
      code: 'REF-207.02',
      category: 'impact',
      rxSupport: true,
      tag: 'Small · Gri',
      badgeBg: 'bg-indigo-600',
      variant: 'Grey · Small',
      images: glassImages('Prescription_Ref.207.02_Compact-PRO'),
      img: glassImages('Prescription_Ref.207.02_Compact-PRO')[0],
      detailImg: glassImages('Prescription_Ref.207.02_Compact-PRO')[0],
      desc: 'Compact PRO Small beden, gri. Bio-based gövde ve PRIVILEGE kaplama; G3 güneş filtresi işaretli varyant. EN ISO 16321 sertifikalı.',
      specs: {
        standard: 'EN ISO 16321 G3 C T',
        prescription: 'Organik / Polikarbonat / Trivex numaralı lens',
        impact: 'Yüksek darbe direnci (C T)',
        coating: 'PRIVILEGE, Bluestop, antirefle, hidrofobik',
        frame: 'Bio-based malzeme',
        size: 'Small · Kalibre 51',
        protection: 'Darbe koruması · G3 solar filtre seçeneği',
      },
      features: ['Bio-based dielektrik gövde', 'Gri Compact PRO Small', 'PRIVILEGE kaplama', 'G3 solar / fotokromik / polarize filtre seçenekleri', 'EN ISO 16321 sertifikası']
    },
    {
      id: '207-03-compact-pro',
      brand: 'Pegaso',
      name: 'Compact PRO 207.03',
      code: 'REF-207.03',
      category: 'impact',
      rxSupport: true,
      tag: 'Large · Mavi/Şeffaf',
      badgeBg: 'bg-indigo-600',
      variant: 'Blue/Transparent · Large',
      images: glassImages('Prescription_Ref.207.03_Compact-PRO'),
      img: glassImages('Prescription_Ref.207.03_Compact-PRO')[0],
      detailImg: glassImages('Prescription_Ref.207.03_Compact-PRO')[0],
      desc: 'Compact PRO Large beden, mavi/şeffaf. Daha geniş yüz yapısı için Large kalibre; bio-based gövde ve PRIVILEGE kaplama.',
      specs: {
        standard: 'EN ISO 16321 C T',
        prescription: 'Organik / Polikarbonat / Trivex numaralı lens',
        impact: 'Yüksek darbe direnci (C T)',
        coating: 'PRIVILEGE (çizilmez & buğulanmaz), Bluestop, antirefle, hidrofobik',
        frame: 'Bio-based malzeme',
        size: 'Large · Kalibre 55',
        protection: 'Darbe / mekanik parçacık koruması',
      },
      features: ['Bio-based dielektrik gövde', 'Large beden — geniş yüz uyumu', 'PRIVILEGE çizilmez & buğulanmaz', 'Modern Compact PRO tasarımı', 'EN ISO 16321 sertifikası']
    },
    {
      id: '207-04-compact-pro',
      brand: 'Pegaso',
      name: 'Compact PRO 207.04',
      code: 'REF-207.04',
      category: 'impact',
      rxSupport: true,
      tag: 'Large · Gri',
      badgeBg: 'bg-indigo-600',
      variant: 'Grey · Large',
      images: glassImages('Prescription_Ref.207.04_Compact-PRO'),
      img: glassImages('Prescription_Ref.207.04_Compact-PRO')[0],
      detailImg: glassImages('Prescription_Ref.207.04_Compact-PRO')[0],
      desc: 'Compact PRO Large beden, gri. Endüstriyel numaralı güvenlik gözlüğü; bio-based gövde, PRIVILEGE kaplama ve G3 solar filtre seçenekleri.',
      specs: {
        standard: 'EN ISO 16321 G3 C T',
        prescription: 'Organik / Polikarbonat / Trivex numaralı lens',
        impact: 'Yüksek darbe direnci (C T)',
        coating: 'PRIVILEGE, Bluestop, antirefle, hidrofobik',
        frame: 'Bio-based malzeme',
        size: 'Large · Kalibre 55',
        protection: 'Darbe koruması · G3 solar filtre seçeneği',
      },
      features: ['Bio-based dielektrik gövde', 'Gri Compact PRO Large', 'PRIVILEGE kaplama', 'Fotokromik / polarize / solar filtre seçenekleri', 'EN ISO 16321 sertifikası']
    },
    {
      id: '139-01-brave',
      brand: 'Pegaso',
      name: 'Brave 139.01',
      code: 'REF-139.01',
      category: 'impact',
      rxSupport: true,
      tag: 'Siyah · Tek Beden',
      badgeBg: 'bg-slate-700',
      variant: 'Black · Tek Beden',
      images: glassImages('Prescription_Ref.139.01_Brave'),
      img: glassImages('Prescription_Ref.139.01_Brave')[0],
      detailImg: glassImages('Prescription_Ref.139.01_Brave')[0],
      desc: 'TR-90 poliamid Brave modeli: modern, hafif tasarım; yan siperlikler ve geniş görüş alanı. Atölye ve ofis kullanımı için ideal darbe korumalı numaralı gözlük.',
      specs: {
        standard: 'EN166 F',
        prescription: 'Organik / Polikarbonat numaralı lens',
        impact: 'Mekanik darbe direnci (F)',
        coating: 'Antifog, antirefle, çizilmez, Bluestop, hidrofobik',
        frame: 'TR-90 poliamid',
        size: 'Tek beden · Kalibre 56',
        protection: 'Darbe / mekanik parçacık koruması',
      },
      features: ['TR-90 hafif gövde', 'Yan siperlikler', 'Geniş görüş alanı', 'Modern ofis / atölye tasarımı', 'Numaralı lens uyumlu']
    },
    {
      id: '125-01-brave-small',
      brand: 'Pegaso',
      name: 'Brave Small 125.01',
      code: 'REF-125.01',
      category: 'impact',
      rxSupport: true,
      tag: 'Siyah · Small Fit',
      badgeBg: 'bg-slate-700',
      variant: 'Black · Small Fit',
      images: glassImages('Prescription_Ref.125.01_Brave-Small'),
      img: glassImages('Prescription_Ref.125.01_Brave-Small')[0],
      detailImg: glassImages('Prescription_Ref.125.01_Brave-Small')[0],
      desc: 'Brave Small: daha küçük yüz yapıları için biobased poliamid gövde. Yan siperlikler, kordon ve geniş görüş alanı; atölye ve ofis için hafif darbe koruması.',
      specs: {
        standard: 'EN166 F',
        prescription: 'Organik / Polikarbonat numaralı lens',
        impact: 'Mekanik darbe direnci (F)',
        coating: 'Antifog, antirefle, çizilmez, Bluestop, hidrofobik',
        frame: 'Biobased poliamid',
        size: 'Small fit · Kalibre 54',
        protection: 'Darbe / mekanik parçacık koruması',
      },
      features: ['Biobased hafif gövde', 'Yan siperlikler', 'Kordon dahil', 'Küçük yüz uyumu (Cal.54)', 'Geniş görüş alanı']
    },
    {
      id: '144-01-fever',
      brand: 'Pegaso',
      name: 'Fever 144.01',
      code: 'REF-144.01',
      category: 'impact',
      rxSupport: true,
      tag: 'Siyah · Kompakt',
      badgeBg: 'bg-slate-700',
      variant: 'Black · Tek Beden',
      images: glassImages('Prescription_Ref.144.01_Fever'),
      img: glassImages('Prescription_Ref.144.01_Fever')[0],
      detailImg: glassImages('Prescription_Ref.144.01_Fever')[0],
      desc: 'Fever: TR-90 poliamid, kompakt kalibre 49. Modern hafif tasarım, yan siperlikler ve geniş görüş; atölye ve ofis darbe koruması.',
      specs: {
        standard: 'EN166 F',
        prescription: 'Organik / Polikarbonat numaralı lens',
        impact: 'Mekanik darbe direnci (F)',
        coating: 'Antifog, antirefle, çizilmez, Bluestop, hidrofobik',
        frame: 'TR-90 poliamid',
        size: 'Tek beden · Kalibre 49',
        protection: 'Darbe / mekanik parçacık koruması',
      },
      features: ['TR-90 hafif gövde', 'Kompakt kalibre 49', 'Yan siperlikler', 'Modern tasarım', 'Geniş görüş alanı']
    },
    {
      id: '2009-01-europa',
      brand: 'Pegaso',
      name: 'Europa 2009.01',
      code: 'REF-2009.01',
      category: 'impact',
      rxSupport: true,
      tag: 'Gri/Kırmızı',
      badgeBg: 'bg-rose-700',
      variant: 'Grey/Red · Tek Beden',
      images: glassImages('Prescription_Ref.2009.01_Europa'),
      img: glassImages('Prescription_Ref.2009.01_Europa')[0],
      detailImg: glassImages('Prescription_Ref.2009.01_Europa')[0],
      desc: 'Europa: naylon gövdeli klasik tasarım, ergonomik saplar ve yan siperlikler. ISO 16321 darbe korumalı numaralı iş güvenliği gözlüğü.',
      specs: {
        standard: 'EN ISO 16321 C T',
        prescription: 'Organik / Polikarbonat / Trivex numaralı lens',
        impact: 'Yüksek darbe direnci (C T)',
        coating: 'Antifog, antirefle, çizilmez, Bluestop, hidrofobik',
        frame: 'Naylon',
        size: 'Tek beden · Kalibre 55',
        protection: 'Darbe / mekanik parçacık koruması',
      },
      features: ['Naylon klasik gövde', 'Yan siperlikler', 'Ergonomik saplar', 'Gri/kırmızı renk kombinasyonu', 'ISO 16321 sertifikası']
    },
    {
      id: '9r50-01-normal',
      brand: 'Pegaso',
      name: 'Normal 9R50.01',
      code: 'REF-9R50.01',
      category: 'impact',
      rxSupport: true,
      tag: 'Gri/Kırmızı · Yüksek Diyoptri',
      badgeBg: 'bg-rose-700',
      variant: 'Grey/Red · Tek Beden',
      images: glassImages('Prescription_Ref.9R50.01_Normal'),
      img: glassImages('Prescription_Ref.9R50.01_Normal')[0],
      detailImg: glassImages('Prescription_Ref.9R50.01_Normal')[0],
      desc: 'Normal 9R50: naylon klasik çerçeve, yan siperlikler ve yüksek diyoptri desteği. İki beden seçeneği ile geniş reçete aralığına uygun numaralı güvenlik gözlüğü.',
      specs: {
        standard: 'EN166 F',
        prescription: 'Organik / Polikarbonat — yüksek diyoptri uyumlu',
        impact: 'Mekanik darbe direnci (F)',
        coating: 'Antifog, antirefle, çizilmez, Bluestop, hidrofobik',
        frame: 'Naylon',
        size: 'Tek beden · Kalibre 51 (2 beden seçeneği)',
        protection: 'Darbe / mekanik parçacık koruması',
      },
      features: ['Naylon klasik gövde', 'Yan siperlikler', 'Yüksek diyoptri / reçete desteği', '2 beden seçeneği', 'Gri/kırmızı renk']
    },
    {
      id: '140-01-aguila',
      brand: 'Pegaso',
      name: 'Aguila 140.01',
      code: 'REF-140.01',
      category: 'impact',
      rxSupport: true,
      tag: 'Gri · Large',
      badgeBg: 'bg-amber-700',
      variant: 'Grey · Large',
      images: glassImages('Prescription_Ref.140.01_Aguila'),
      img: glassImages('Prescription_Ref.140.01_Aguila')[0],
      detailImg: glassImages('Prescription_Ref.140.01_Aguila')[0],
      desc: 'Aguila Large: TR-90 poliamid, ultra dayanıklı endüstriyel tasarım. Ayarlanabilir kaymaz saplar; Small (159.01) ile birlikte 2 beden seçeneği.',
      specs: {
        standard: 'EN166 F',
        prescription: 'Organik / Polikarbonat numaralı lens',
        impact: 'Mekanik darbe direnci (F)',
        coating: 'Antifog, antirefle, çizilmez, Bluestop, hidrofobik',
        frame: 'TR-90 poliamid',
        size: 'Large · Kalibre 55',
        protection: 'Darbe / mekanik parçacık koruması',
      },
      features: ['TR-90 endüstriyel gövde', 'Ayarlanabilir sap', 'Kaymaz sap pedleri', 'Large beden', '2 beden seçeneği (140.01 / 159.01)']
    },
    {
      id: '159-01-aguila-small',
      brand: 'Pegaso',
      name: 'Aguila 159.01',
      code: 'REF-159.01',
      category: 'impact',
      rxSupport: true,
      tag: 'Gri · Small',
      badgeBg: 'bg-amber-700',
      variant: 'Grey · Small',
      images: glassImages('Prescription_Ref.159.01_Aguila-Small'),
      img: glassImages('Prescription_Ref.159.01_Aguila-Small')[0],
      detailImg: glassImages('Prescription_Ref.159.01_Aguila-Small')[0],
      desc: 'Aguila Small: TR-90 poliamid endüstriyel tasarımın küçük bedeni. Ayarlanabilir kaymaz saplar; Large (140.01) ile birlikte 2 beden seçeneği.',
      specs: {
        standard: 'EN166 F',
        prescription: 'Organik / Polikarbonat numaralı lens',
        impact: 'Mekanik darbe direnci (F)',
        coating: 'Antifog, antirefle, çizilmez, Bluestop, hidrofobik',
        frame: 'TR-90 poliamid',
        size: 'Small · Kalibre 52',
        protection: 'Darbe / mekanik parçacık koruması',
      },
      features: ['TR-90 endüstriyel gövde', 'Ayarlanabilir sap', 'Kaymaz sap pedleri', 'Small beden', '2 beden seçeneği (140.01 / 159.01)']
    },
    {
      id: '119-01-moving',
      brand: 'Pegaso',
      name: 'Moving 119.01',
      code: 'REF-119.01',
      category: 'impact',
      rxSupport: true,
      tag: 'Şeffaf · Spor',
      badgeBg: 'bg-sky-600',
      variant: 'Transparent · Tek Beden',
      images: glassImages('Prescription_Ref.119.01_Moving'),
      img: glassImages('Prescription_Ref.119.01_Moving')[0],
      detailImg: glassImages('Prescription_Ref.119.01_Moving')[0],
      desc: 'Moving: spor tasarımlı TR-90 gövde, panoramik görüş alanı, iç foam ve kaymaz burun pedi. Geniş kalibre 60 ile yüksek görüş konforu.',
      specs: {
        standard: 'EN166 F',
        prescription: 'Polikarbonat numaralı lens',
        impact: 'Mekanik darbe direnci (F)',
        coating: 'Antifog, antirefle, çizilmez, Bluestop, hidrofobik',
        frame: 'TR-90 poliamid',
        size: 'Tek beden · Kalibre 60',
        protection: 'Darbe / mekanik parçacık koruması',
      },
      features: ['TR-90 spor tasarım', 'İç foam conta', 'Kaymaz burun pedi', 'Panoramik geniş görüş', 'Geniş kalibre 60']
    },
    {
      id: '1095-01-duplex',
      brand: 'Pegaso',
      name: 'Duplex 1095.01',
      code: 'REF-1095.01',
      category: 'welding',
      rxSupport: true,
      tag: 'Kaynak · DIN 5',
      badgeBg: 'bg-[#971b2f]',
      variant: 'Black/Green DIN 5 · Tek Beden',
      images: glassImages('Prescription_Ref.1095.01_Duplex'),
      img: glassImages('Prescription_Ref.1095.01_Duplex')[0],
      detailImg: glassImages('Prescription_Ref.1095.01_Duplex')[0],
      desc: 'Duplex gaz kaynak gözlüğü: açılır (flip-front) vizör, naylon gövde, yan siperlikler. DIN 5 / W5 kaynak filtresi ile daha koyu gölge koruması; numaralı lens uyumlu.',
      specs: {
        standard: 'EN ISO 16321 UL1.2 W5 C T 1-M',
        prescription: 'Organik / Polikarbonat / Trivex numaralı lens',
        impact: 'Yüksek darbe direnci (C T)',
        coating: 'Antifog, antirefle, çizilmez, Bluestop, hidrofobik',
        frame: 'Naylon',
        size: 'Tek beden · Kalibre 55',
        protection: 'Gaz kaynağı DIN 5 (W5) · Darbe koruması',
      },
      features: ['Açılır flip-front vizör', 'DIN 5 / W5 kaynak filtresi', 'Yan siperlikler', 'Ergonomik saplar', 'Numaralı lens uyumlu', 'ISO 16321 sertifikası']
    },
    {
      id: '1095-02-duplex',
      brand: 'Pegaso',
      name: 'Duplex 1095.02',
      code: 'REF-1095.02',
      category: 'welding',
      rxSupport: true,
      tag: 'Kaynak · DIN 3',
      badgeBg: 'bg-[#971b2f]',
      variant: 'Black/Green DIN 3 · Tek Beden',
      images: glassImages('Prescription_Ref.1095.02_Duplex'),
      img: glassImages('Prescription_Ref.1095.02_Duplex')[0],
      detailImg: glassImages('Prescription_Ref.1095.02_Duplex')[0],
      desc: 'Duplex gaz kaynak gözlüğü: açılır (flip-front) vizör, naylon gövde, yan siperlikler. DIN 3 / W3 daha açık gölge filtresi; numaralı lens uyumlu.',
      specs: {
        standard: 'EN ISO 16321 U1.2 W3 C T 1-M',
        prescription: 'Organik / Polikarbonat / Trivex numaralı lens',
        impact: 'Yüksek darbe direnci (C T)',
        coating: 'Antifog, antirefle, çizilmez, Bluestop, hidrofobik',
        frame: 'Naylon',
        size: 'Tek beden · Kalibre 55',
        protection: 'Gaz kaynağı DIN 3 (W3) · Darbe koruması',
      },
      features: ['Açılır flip-front vizör', 'DIN 3 / W3 kaynak filtresi', 'Yan siperlikler', 'Ergonomik saplar', 'Numaralı lens uyumlu', 'ISO 16321 sertifikası']
    },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : selectedCategory === 'prescription'
      ? products.filter(p => p.rxSupport)
      : products.filter(p => p.category === selectedCategory);

  const openCatalogModal = () => {
    setCatalogError(null);
    setCatalogFileName(null);
    setCatalogProgress(0);
    setCatalogGenerating(false);
    setCatalogModalOpen(true);
  };

  const handleDownloadCatalog = async () => {
    setCatalogGenerating(true);
    setCatalogError(null);
    setCatalogProgress(0);
    setCatalogFileName(null);
    try {
      const filename = await generateCatalogPdf(products, {
        onProgress: (pct) => setCatalogProgress(pct),
      });
      setCatalogFileName(filename);
    } catch (err) {
      console.error(err);
      setCatalogError(t('catalogError'));
    } finally {
      setCatalogGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#1e40af] selection:text-white relative">
      
      {/* ---------------------------------------------------- */}
      {/* 1. TOP ANNOUNCEMENT BAR & NAVIGATION */}
      {/* ---------------------------------------------------- */}
      <div className="bg-slate-950 border-b border-slate-800 text-slate-300 text-xs py-2 px-4">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <ShieldCheck className="w-4 h-4 text-[#1e40af]" />
              {t('topBar')}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 font-semibold flex items-center gap-1 text-emerald-400">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.486 1.334 5.006l-1.418 5.176 5.305-1.391c1.464.798 3.116 1.218 4.767 1.219h.004c5.505 0 9.988-4.478 9.99-9.984 0-2.667-1.037-5.174-2.925-7.062-1.887-1.887-4.394-2.924-7.067-2.924zm5.836 14.165c-.247.697-1.442 1.328-1.986 1.398-.501.064-1.157.097-3.708-.958-3.08-1.272-5.074-4.409-5.228-4.614-.153-.205-1.254-1.666-1.254-3.176 0-1.511.792-2.253 1.074-2.56.247-.269.658-.396.932-.396.115 0 .219.006.311.01.27.012.441.026.634.489.247.592.85 2.073.924 2.224.075.152.124.329.025.527-.099.198-.152.329-.304.504-.152.175-.32.392-.457.527-.152.152-.311.318-.135.62.176.302.784 1.293 1.684 2.096 1.157 1.03 2.133 1.349 2.435 1.499.302.15.48.125.658-.078.178-.204.764-.89 1.013-1.246.247-.356.494-.297.823-.175.329.122 2.094 1.029 2.451 1.207.356.178.594.269.681.42.087.151.087.876-.16 1.573z"/>
              </svg>
              {t('whatsappSupport')}
            </a>
            <a href="tel:+905395895502" className="hover:text-white flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#1e40af]" /> +90 (539) 589 55 02
            </a>
            <a href="mailto:info@optisafe.com.tr" className="hover:text-white hidden md:flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-[#1e40af]" /> info@optisafe.com.tr
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 h-[75px] flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center hover:opacity-90 transition py-1">
            <img 
              src={asset("logo.png")} 
              alt={t("logoAlt")} 
              className="h-11 sm:h-12 w-auto object-contain"
            />
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-wider uppercase">
            <a href="#hero" className="text-slate-700 hover:text-[#1e40af] transition">{t('navHome')}</a>
            <a href="#products" className="text-slate-700 hover:text-[#1e40af] transition">{t('navProducts')}</a>
            <a href="#benefits" className="text-slate-700 hover:text-[#1e40af] transition">{t('navBenefits')}</a>
            <a href="#about" className="text-slate-700 hover:text-[#1e40af] transition">{t('navAbout')}</a>
            <a href="#contact" className="text-slate-700 hover:text-[#1e40af] transition">{t('navContact')}</a>
          </nav>

          {/* Header Right Actions */}
          <div className="flex items-center space-x-3">
            
            {/* WhatsApp Header Button */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition items-center space-x-1.5 shadow-md shadow-emerald-600/20"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.486 1.334 5.006l-1.418 5.176 5.305-1.391c1.464.798 3.116 1.218 4.767 1.219h.004c5.505 0 9.988-4.478 9.99-9.984 0-2.667-1.037-5.174-2.925-7.062-1.887-1.887-4.394-2.924-7.067-2.924zm5.836 14.165c-.247.697-1.442 1.328-1.986 1.398-.501.064-1.157.097-3.708-.958-3.08-1.272-5.074-4.409-5.228-4.614-.153-.205-1.254-1.666-1.254-3.176 0-1.511.792-2.253 1.074-2.56.247-.269.658-.396.932-.396.115 0 .219.006.311.01.27.012.441.026.634.489.247.592.85 2.073.924 2.224.075.152.124.329.025.527-.099.198-.152.329-.304.504-.152.175-.32.392-.457.527-.152.152-.311.318-.135.62.176.302.784 1.293 1.684 2.096 1.157 1.03 2.133 1.349 2.435 1.499.302.15.48.125.658-.078.178-.204.764-.89 1.013-1.246.247-.356.494-.297.823-.175.329.122 2.094 1.029 2.451 1.207.356.178.594.269.681.42.087.151.087.876-.16 1.573z"/>
              </svg>
              <span>{t('whatsappContact')}</span>
            </a>

            <button 
              onClick={openCatalogModal}
              className="hidden sm:flex bg-[#1e40af] hover:bg-[#1e3a8a] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg transition items-center space-x-1.5 shadow-md shadow-blue-600/20"
            >
              <Download className="w-4 h-4" />
              <span>{t('downloadCatalog')}</span>
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1 text-xs font-bold bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-md transition text-slate-700"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{currentLang}</span>
              </button>
              
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-50 text-xs">
                  {['TR', 'EN'].map((lang) => (
                    <button 
                      key={lang}
                      onClick={() => setLang(lang)}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#1e40af] hover:text-white transition ${currentLang === lang ? 'font-bold text-[#1e40af]' : 'text-slate-700'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-700 hover:text-[#1e40af] p-1"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 uppercase font-semibold text-sm">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e40af]">{t('navHome')}</a>
            <a href="#products" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e40af]">{t('navProducts')}</a>
            <a href="#benefits" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e40af]">{t('navBenefits')}</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e40af]">{t('navAbout')}</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e40af]">{t('navContact')}</a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block py-2 text-emerald-600 font-bold flex items-center gap-2">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.486 1.334 5.006l-1.418 5.176 5.305-1.391c1.464.798 3.116 1.218 4.767 1.219h.004c5.505 0 9.988-4.478 9.99-9.984 0-2.667-1.037-5.174-2.925-7.062-1.887-1.887-4.394-2.924-7.067-2.924zm5.836 14.165c-.247.697-1.442 1.328-1.986 1.398-.501.064-1.157.097-3.708-.958-3.08-1.272-5.074-4.409-5.228-4.614-.153-.205-1.254-1.666-1.254-3.176 0-1.511.792-2.253 1.074-2.56.247-.269.658-.396.932-.396.115 0 .219.006.311.01.27.012.441.026.634.489.247.592.85 2.073.924 2.224.075.152.124.329.025.527-.099.198-.152.329-.304.504-.152.175-.32.392-.457.527-.152.152-.311.318-.135.62.176.302.784 1.293 1.684 2.096 1.157 1.03 2.133 1.349 2.435 1.499.302.15.48.125.658-.078.178-.204.764-.89 1.013-1.246.247-.356.494-.297.823-.175.329.122 2.094 1.029 2.451 1.207.356.178.594.269.681.42.087.151.087.876-.16 1.573z"/></svg>
              {t('whatsappQuick')}
            </a>
          </div>
        )}
      </header>

      {/* ---------------------------------------------------- */}
      {/* 2. HERO SECTION WITH FULL-BLEED BACKGROUND VIDEO */}
      {/* ---------------------------------------------------- */}
      <section id="hero" className="relative pt-12 pb-20 text-white overflow-hidden border-b border-slate-800 min-h-[560px] md:min-h-[640px] flex items-center">
        
        {/* Full-bleed background video */}
        <video
          src={asset("video/download.mp4")}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/35"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/30 to-transparent"></div>

        <div className="max-w-[1200px] mx-auto px-4 relative z-10 w-full">
          <div className="max-w-2xl space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              {t('heroBadge')}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight font-heading">
              {t('heroTitle1')} <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                {t('heroTitle2')}
              </span>{' '}{t('heroTitle3')}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
              {t('heroDescBefore')}<strong className="text-white font-bold">{t('heroDescStrong')}</strong>{t('heroDescAfter')}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <a 
                href="#products"
                className="bg-[#1e40af] hover:bg-blue-600 text-white font-bold text-sm uppercase px-8 py-3.5 rounded-xl transition flex items-center space-x-2 shadow-lg shadow-blue-600/30"
              >
                <span>{t('heroCtaCollection')}</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase px-7 py-3.5 rounded-xl transition flex items-center space-x-2 shadow-lg shadow-emerald-600/30"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.486 1.334 5.006l-1.418 5.176 5.305-1.391c1.464.798 3.116 1.218 4.767 1.219h.004c5.505 0 9.988-4.478 9.99-9.984 0-2.667-1.037-5.174-2.925-7.062-1.887-1.887-4.394-2.924-7.067-2.924zm5.836 14.165c-.247.697-1.442 1.328-1.986 1.398-.501.064-1.157.097-3.708-.958-3.08-1.272-5.074-4.409-5.228-4.614-.153-.205-1.254-1.666-1.254-3.176 0-1.511.792-2.253 1.074-2.56.247-.269.658-.396.932-.396.115 0 .219.006.311.01.27.012.441.026.634.489.247.592.85 2.073.924 2.224.075.152.124.329.025.527-.099.198-.152.329-.304.504-.152.175-.32.392-.457.527-.152.152-.311.318-.135.62.176.302.784 1.293 1.684 2.096 1.157 1.03 2.133 1.349 2.435 1.499.302.15.48.125.658-.078.178-.204.764-.89 1.013-1.246.247-.356.494-.297.823-.175.329.122 2.094 1.029 2.451 1.207.356.178.594.269.681.42.087.151.087.876-.16 1.573z"/>
                </svg>
                <span>{t('heroCtaWhatsapp')}</span>
              </a>
            </div>

            {/* Badges Bar */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="block text-2xl font-extrabold text-blue-400">{t('heroStatYears')}</span>
                <span className="text-xs text-slate-300 font-medium">{t('heroStatYearsLabel')}</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-white">EN166</span>
                <span className="text-xs text-slate-300 font-medium">{t('heroStatEnLabel')}</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-orange-400">{t('heroStatCustom')}</span>
                <span className="text-xs text-slate-300 font-medium">{t('heroStatCustomLabel')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SHOWCASE — Tema görselleri (sahada kullanım) */}
      {/* ---------------------------------------------------- */}
      <section className="relative bg-slate-100 py-14 md:py-20 border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-10">
            <div>
              <span className="text-[#1e40af] font-bold text-xs uppercase tracking-widest">
                {t('showcaseEyebrow')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-heading leading-tight">
                {t('showcaseTitle')}
              </h2>
            </div>
            <p className="text-sm text-slate-500 max-w-sm sm:text-right leading-relaxed">
              {t('showcaseDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {[
              { src: asset("tema/worker-storm-blue.jpg"), label: t('showcase1Label'), sub: t('showcase1Sub'), pos: 'object-[center_35%]' },
              { src: asset("tema/organik-hermetic-158-showcase.jpg"), label: t('showcase2Label'), sub: t('showcase2Sub'), pos: 'object-[center_20%]' },
              { src: asset("tema/compact-pro-207-showcase.jpg"), label: t('showcase3Label'), sub: t('showcase3Sub'), pos: 'object-[center_20%]' },
            ].map((item) => (
              <div
                key={item.src}
                className="relative group overflow-hidden rounded-2xl aspect-[4/3] md:aspect-[5/4] shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/5"
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className={`absolute inset-0 w-full h-full object-cover ${item.pos} transition duration-700 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="text-white font-black text-lg font-heading leading-snug">{item.label}</p>
                  <p className="text-slate-300 text-xs mt-1.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. PRODUCTS SECTION (ALL PRODUCTS & SUB-MODELS) */}
      {/* ---------------------------------------------------- */}
      <section id="products" className="py-20 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#1e40af] font-bold text-xs uppercase tracking-widest bg-blue-100/60 px-3 py-1 rounded-full border border-blue-200">
              {t('productsEyebrow', { count: filteredProducts.length })}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-3 font-heading">{t('productsTitle')}</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {t('productsDesc')}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[
              { id: 'all', label: t('filterAll', { count: products.length }) },
              { id: 'impact', label: t('filterImpact', { count: products.filter(p => p.category === 'impact').length }) },
              { id: 'hermetic', label: t('filterHermetic', { count: products.filter(p => p.category === 'hermetic').length }) },
              { id: 'welding', label: t('filterWelding', { count: products.filter(p => p.category === 'welding').length }) },
              { id: 'prescription', label: t('filterRx') }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition ${
                  selectedCategory === cat.id 
                    ? 'bg-[#1e40af] text-white shadow-md shadow-blue-600/20' 
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div 
                key={p.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedProduct(p)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProduct(p);
                  }
                }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative h-48 bg-slate-100 overflow-hidden flex items-center justify-center p-4 border-b border-slate-100">
                    <span className={`absolute top-3 left-3 z-20 text-[9px] font-bold text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider ${p.badgeBg}`}>
                      {p.tag}
                    </span>
                    <ProductImageCarousel
                      images={p.images || [p.img]}
                      alt={p.name}
                      imgClassName="max-h-40 max-w-full object-contain group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#1e40af] transition font-heading leading-snug">
                      {p.name}
                    </h3>
                    {p.variant && (
                      <span className="text-[10px] font-semibold text-slate-500 block">{p.variant}</span>
                    )}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{p.desc}</p>
                    
                    {p.models && p.models.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[10px] font-bold text-slate-500 block mb-1">{t('subModels')}</span>
                        <div className="flex flex-wrap gap-1">
                          {p.models.map(m => (
                            <span key={m.id} className="text-[9px] bg-blue-50 border border-blue-100 text-[#1e40af] px-1.5 py-0.5 rounded font-mono font-bold">
                              {m.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 font-mono">{p.code}</span>
                  <span className="bg-slate-100 group-hover:bg-[#1e40af] group-hover:text-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg transition inline-flex items-center space-x-1">
                    <span>{t('inspect')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* TEKNİK VİDEO — mar.mp4 */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 md:py-20 bg-slate-950 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="text-blue-400 font-bold text-xs uppercase tracking-widest">
                {t('techEyebrow')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 font-heading leading-tight">
                {t('techTitle')}
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md sm:text-right leading-relaxed">
              {t('techDesc')}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-700/80 shadow-2xl shadow-black/40 bg-slate-900">
            <video
              src={asset("video/mar.mp4")}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={t("techVideoAria")}
              className="w-full h-auto max-h-[520px] object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* KIT / AKSESUAR — Tema ürün seti */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="order-2 lg:order-1 space-y-5">
              <span className="text-[#1e40af] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                {t('kitEyebrow')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading leading-tight">
                {t('kitTitle')}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed max-w-lg">
                {t('kitDesc')}
              </p>
              <ul className="space-y-2.5 text-sm text-slate-700">
                {[
                  t('kitItem1'),
                  t('kitItem2'),
                  'Ayarlanabilir elastik kafa bandı',
                  t('kitItem4'),
                ].map((line) => (
                  <li key={line} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#1e40af] shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#products"
                className="inline-flex items-center gap-2 bg-[#1e40af] hover:bg-blue-700 text-white font-bold text-xs uppercase px-6 py-3 rounded-xl transition shadow-md shadow-blue-600/20"
              >
                {t('kitCta')}
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-100/80 to-slate-100 rounded-[2rem] -z-10" />
              <img
                src={asset("tema/kit-organik-158.jpg")}
                alt={t("kitImgAlt")}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* GREENLINE / SÜRDÜRÜLEBİLİRLİK + ISCC */}
      {/* ---------------------------------------------------- */}
      <section
        id="greenline"
        className="relative py-20 border-y border-emerald-100 bg-white"
      >
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <Leaf className="w-3.5 h-3.5" />
                {t('greenEyebrow')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 font-heading leading-tight max-w-xl">
                {t('greenTitle')}
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md lg:text-right leading-relaxed">
              {t('greenIntro')}
            </p>
          </div>

          <div className="w-full bg-white mb-8">
            <img
              src={asset('tema/greenline.png')}
              alt={t("greenImgAlt")}
              className="block w-full h-auto"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            <div className="rounded-3xl border border-emerald-100 bg-white p-6 sm:p-7 shadow-lg shadow-emerald-900/5 flex flex-col">
              <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 mb-3">
                {t('greenCarbonLabel')}
              </p>
              <p className="text-4xl sm:text-5xl font-black text-emerald-700 font-heading leading-none tabular-nums">
                {t('greenCarbonPct')}
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-2">
                {t('greenCarbonSub')}
              </p>
              <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                {t('greenCarbonDesc')}
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-slate-700">
                {[
                  t('greenItem1'),
                  t('greenItem2'),
                  t('greenItem3'),
                  t('greenItem4'),
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-md shadow-slate-900/5 flex flex-col justify-center gap-5">
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 flex items-center justify-center">
                <img
                  src={asset('tema/iscc-cert.jpg')}
                  alt="ISCC — International Sustainability & Carbon Certification"
                  className="w-full h-auto max-h-[120px] object-contain"
                />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                  {t('greenCertLabel')}
                </p>
                <h3 className="text-lg font-extrabold text-slate-900 font-heading leading-snug">
                  {t('greenCertTitle')}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {t('greenCertDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. BENEFITS SECTION */}
      {/* ---------------------------------------------------- */}
      <section id="benefits" className="py-20 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#f97316] font-bold text-xs uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              {t('benefitsEyebrow')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-3 font-heading">{t('benefitsTitle')}</h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {t('benefitsDesc')}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 mb-12 items-stretch">
            <div className="lg:col-span-5 relative overflow-hidden rounded-3xl min-h-[360px]">
              <img
                src={asset("tema/worker-radio.jpg")}
                alt={t("benefitsImgAlt")}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-black text-xl font-heading">{t('benefitsHeroTitle')}</p>
                <p className="text-slate-300 text-xs mt-1">{t('benefitsHeroSub')}</p>
              </div>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 transition flex flex-col group">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#1e40af] flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2 font-heading">{t('benefit1Title')}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t('benefit1Desc')}
                </p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 transition flex flex-col group">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#1e40af] flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2 font-heading">{t('benefit2Title')}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t('benefit2Desc')}
                </p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 transition flex flex-col group">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#1e40af] flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2 font-heading">{t('benefit3Title')}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t('benefit3Desc')}
                </p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 transition flex flex-col group">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#1e40af] flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2 font-heading">{t('benefit4Title')}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t('benefit4Desc')}
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl min-h-[220px] md:min-h-[280px]">
            <img
              src={asset("tema/worker-closeup.jpg")}
              alt={t("benefitsCloseupAlt")}
              className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
            />
            <div className="absolute inset-0 bg-slate-950/55" />
            <div className="relative z-10 h-full min-h-[220px] md:min-h-[280px] flex items-center px-6 md:px-12">
              <div className="max-w-xl">
                <p className="text-[#93c5fd] font-bold text-xs uppercase tracking-widest mb-2">{t('benefitsBannerEyebrow')}</p>
                <h3 className="text-2xl md:text-3xl font-black text-white font-heading leading-tight">
                  {t('benefitsBannerTitle')}
                </h3>
                <p className="text-slate-200 text-sm mt-3 leading-relaxed">
                  {t('benefitsBannerDesc')}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. ABOUT OPTISAFE SECTION */}
      {/* ---------------------------------------------------- */}
      <section id="about" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            
            <div className="space-y-6">
              <span className="text-[#f97316] font-bold text-xs uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30">
                {t('aboutEyebrow')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-heading leading-tight">
                {t('aboutTitle')}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                {t('aboutDesc')}
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <h3 className="text-base font-bold text-white mb-1 font-heading">{t('aboutVisionTitle')}</h3>
                  <p className="text-xs text-slate-300">{t('aboutVisionDesc')}</p>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <h3 className="text-base font-bold text-white mb-2 font-heading">{t('aboutValuesTitle')}</h3>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#1e40af]" /> {t('aboutValue1')}</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#1e40af]" /> {t('aboutValue2')}</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#1e40af]" /> {t('aboutValue3')}</li>
                  </ul>
                </div>
              </div>

              <button 
                onClick={openCatalogModal}
                className="bg-[#1e40af] hover:bg-blue-700 text-white font-bold text-xs uppercase px-7 py-3.5 rounded-xl transition shadow-lg"
              >
                {t('aboutCatalogCta')}
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-3xl aspect-[4/3]">
                <img
                  src={asset("tema/team.jpg")}
                  alt={t("aboutTeamAlt")}
                  className="absolute inset-0 w-full h-full object-cover object-left"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-sm">{t('aboutTeamCaption')}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden rounded-2xl aspect-square">
                  <img src={asset("tema/tech-qr.jpg")} alt={t("aboutTechAlt")} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="relative overflow-hidden rounded-2xl aspect-square">
                  <img src={asset("tema/logo-pegaso-red.jpg")} alt={t("aboutLogoAlt")} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. CONTACT SECTION (OptiSafe Derince/Kocaeli) */}
      {/* ---------------------------------------------------- */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#1e40af] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              {t('contactEyebrow')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-3 font-heading">{t('contactTitle')}</h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {t('contactDesc')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-4">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-start space-x-4">
                <div className="p-3.5 bg-blue-100 text-[#1e40af] rounded-xl shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-heading">{t('contactAddress')}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Yenikent Mah. Gazi Mustafa Kemal Cad. No:46H, 41900 Derince / Kocaeli
                  </p>
                  <a
                    href="https://maps.google.com/maps?ll=40.776974,29.81302&z=16&q=Gazi%20Mustafa%20Kemal%20Cd.%20No%3A46H%20Yenikent%2041900%20Derince%2FKocaeli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1e40af] hover:underline mt-2"
                  >
                    {t('contactDirections')}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-start space-x-4">
                <div className="p-3.5 bg-emerald-100 text-emerald-600 rounded-xl shrink-0">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.486 1.334 5.006l-1.418 5.176 5.305-1.391c1.464.798 3.116 1.218 4.767 1.219h.004c5.505 0 9.988-4.478 9.99-9.984 0-2.667-1.037-5.174-2.925-7.062-1.887-1.887-4.394-2.924-7.067-2.924zm5.836 14.165c-.247.697-1.442 1.328-1.986 1.398-.501.064-1.157.097-3.708-.958-3.08-1.272-5.074-4.409-5.228-4.614-.153-.205-1.254-1.666-1.254-3.176 0-1.511.792-2.253 1.074-2.56.247-.269.658-.396.932-.396.115 0 .219.006.311.01.27.012.441.026.634.489.247.592.85 2.073.924 2.224.075.152.124.329.025.527-.099.198-.152.329-.304.504-.152.175-.32.392-.457.527-.152.152-.311.318-.135.62.176.302.784 1.293 1.684 2.096 1.157 1.03 2.133 1.349 2.435 1.499.302.15.48.125.658-.078.178-.204.764-.89 1.013-1.246.247-.356.494-.297.823-.175.329.122 2.094 1.029 2.451 1.207.356.178.594.269.681.42.087.151.087.876-.16 1.573z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-heading">{t('contactWhatsapp')}</h4>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 hover:text-emerald-700 font-bold mt-1 block">
                    {t('contactWhatsappReply')}
                  </a>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-start space-x-4">
                <div className="p-3.5 bg-blue-100 text-[#1e40af] rounded-xl shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-heading">{t('contactPhone')}</h4>
                  <a href="tel:+905395895502" className="text-xs text-slate-800 hover:text-[#1e40af] font-semibold mt-1 block">
                    +90 (539) 589 55 02
                  </a>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-start space-x-4">
                <div className="p-3.5 bg-blue-100 text-[#1e40af] rounded-xl shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-heading">{t('contactEmail')}</h4>
                  <a href="mailto:info@optisafe.com.tr" className="text-xs text-slate-800 hover:text-[#1e40af] font-semibold mt-1 block">
                    info@optisafe.com.tr
                  </a>
                </div>
              </div>
            </div>

            {/* Map — OpenStreetMap embed (Google iframe often blocked on local/Windows hosts) */}
            <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-slate-100 min-h-[360px] md:min-h-[440px] relative">
              <iframe
                title={t("contactMapTitle")}
                src="https://www.openstreetmap.org/export/embed.html?bbox=29.80302%2C40.771974%2C29.82302%2C40.781974&amp;layer=mapnik&amp;marker=40.776974%2C29.81302"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 7. FOOTER */}
      {/* ---------------------------------------------------- */}
      <footer className="bg-slate-950 text-white pt-14 pb-8 border-t border-slate-800">
        <div className="max-w-[1200px] mx-auto px-4">
          
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="space-y-4">
              <a href="#" className="inline-block bg-white p-2.5 rounded-xl shadow-md border border-slate-700 hover:opacity-95 transition">
                <img 
                  src={asset("logo.png")} 
                  alt="OptiSafe Logo" 
                  className="h-10 w-auto object-contain"
                />
              </a>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('footerDesc')}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-4 font-heading uppercase">{t('footerBrands')}</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>Pegaso Organik / Hermetic</li>
                <li>Pegaso Compact PRO</li>
                <li>Pegaso Brave / Fever / Moving</li>
                <li>Pegaso Aguila / Europa / Normal</li>
                <li>Pegaso Duplex Kaynak</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-4 font-heading uppercase">{t('footerContact')}</h4>
              <p className="text-xs text-slate-400">Yenikent Mah. GMK Cad. No:46H Derince / Kocaeli</p>
              <p className="text-xs text-slate-400 mt-1">Tel: +90 (539) 589 55 02</p>
              <p className="text-xs text-slate-400">E-posta: info@optisafe.com.tr</p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-4 font-heading uppercase">{t('footerSocial')}</h4>
              <div className="flex space-x-3">
                <a href="https://www.instagram.com/optisafetr" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-800 rounded-full hover:bg-[#1e40af] transition text-white" aria-label="Instagram">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/optisafetr" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-800 rounded-full hover:bg-[#1e40af] transition text-white" aria-label="LinkedIn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
            <p>{t('footerRights')}</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-slate-300">{t('footerPrivacy')}</a>
              <a href="#" className="hover:text-slate-300">{t('footerKvkk')}</a>
            </div>
          </div>

        </div>
      </footer>

      {/* CATALOG PDF MODAL */}
      {catalogModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
          onClick={() => !catalogGenerating && setCatalogModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 text-slate-900 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => !catalogGenerating && setCatalogModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 disabled:opacity-40"
              disabled={catalogGenerating}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1e40af] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 font-heading leading-tight">{t('catalogTitle')}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{t('catalogModels', { count: products.length })}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-5">
              {t('catalogDesc')}
            </p>

            <ul className="space-y-2 mb-5 text-xs text-slate-600">
              {[
                t('catalogItem1'),
                t('catalogItem2'),
                t('catalogItem3'),
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#1e40af] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {catalogGenerating && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1.5">
                  <span className="inline-flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1e40af]" />
                    {t('catalogPreparing')}
                  </span>
                  <span>%{catalogProgress}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1e40af] rounded-full transition-all duration-300"
                    style={{ width: `${catalogProgress}%` }}
                  />
                </div>
              </div>
            )}

            {catalogFileName && !catalogGenerating && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-emerald-800">{t('catalogDownloaded')}</p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">{catalogFileName}</p>
                </div>
              </div>
            )}

            {catalogError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-700">
                {catalogError}
              </div>
            )}

            <button
              type="button"
              onClick={handleDownloadCatalog}
              disabled={catalogGenerating}
              className="w-full bg-[#1e40af] hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xs uppercase py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2"
            >
              {catalogGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t('catalogCreating')}
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  {catalogFileName ? t('catalogDownloadAgain') : t('catalogDownloadPdf')}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full relative shadow-2xl my-6 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 z-30 text-slate-500 hover:text-slate-900 bg-white/90 hover:bg-white p-2 rounded-full shadow border border-slate-200 transition"
              aria-label={t("close")}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gallery */}
            <div className="relative bg-gradient-to-b from-slate-100 to-slate-50 border-b border-slate-200">
              <div className="h-64 sm:h-80 flex items-center justify-center p-6 relative">
                <ProductImageCarousel
                  key={selectedProduct.id}
                  images={selectedProduct.images || [selectedProduct.detailImg || selectedProduct.img]}
                  alt={selectedProduct.name}
                  onImageClick={(img, idx, imgs) => {
                    setEnlargedImage({ title: selectedProduct.name, images: imgs, img, initialIndex: idx });
                  }}
                  imgClassName="max-h-56 sm:max-h-72 max-w-full object-contain cursor-zoom-in"
                />
                <button
                  onClick={() => {
                    const imgs = selectedProduct.images || [selectedProduct.detailImg || selectedProduct.img];
                    setEnlargedImage({ title: selectedProduct.name, images: imgs, img: imgs[0], initialIndex: 0 });
                  }}
                  className="absolute bottom-4 right-4 z-20 bg-white/95 px-3 py-1.5 rounded-full shadow text-slate-700 hover:text-[#1e40af] flex items-center gap-1.5 text-[11px] font-bold border border-slate-200"
                >
                  <Maximize2 className="w-3.5 h-3.5" /> {t('enlarge')}
                </button>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold text-white px-2.5 py-1 rounded-full uppercase tracking-wider ${selectedProduct.badgeBg}`}>
                      {selectedProduct.tag}
                    </span>
                    {selectedProduct.rxSupport && (
                      <span className="text-[10px] font-bold text-[#1e40af] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {t('rxBadge')}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-bold text-[#1e40af] uppercase tracking-wider mb-1">
                    {selectedProduct.brand} · {selectedProduct.code}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading leading-tight">
                    {selectedProduct.name}
                  </h3>
                  {selectedProduct.variant && (
                    <p className="text-sm text-slate-500 font-medium mt-1">{selectedProduct.variant}</p>
                  )}
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {selectedProduct.desc}
              </p>

              {/* Specs grid */}
              {selectedProduct.specs && (
                <div className="mb-6">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3 font-heading flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1e40af]" />
                    {t('specsTitle')}
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {[
                      { label: t('specStandard'), value: selectedProduct.specs.standard },
                      { label: t('specProtection'), value: selectedProduct.specs.protection },
                      { label: t('specPrescription'), value: selectedProduct.specs.prescription },
                      { label: t('specImpact'), value: selectedProduct.specs.impact },
                      { label: t('specCoating'), value: selectedProduct.specs.coating },
                      { label: t('specFrame'), value: selectedProduct.specs.frame },
                      { label: t('specSize'), value: selectedProduct.specs.size },
                    ].filter(row => row.value).map((row) => (
                      <div key={row.label} className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">{row.label}</p>
                        <p className="text-xs font-semibold text-slate-800 leading-snug">{row.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {selectedProduct.features && selectedProduct.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3 font-heading flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#f97316]" />
                    {t('featuresTitle')}
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {selectedProduct.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-50 text-[#1e40af] flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                        <span className="leading-snug font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1 border-t border-slate-100">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase py-3.5 rounded-xl transition text-center shadow flex items-center justify-center gap-1.5"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.486 1.334 5.006l-1.418 5.176 5.305-1.391c1.464.798 3.116 1.218 4.767 1.219h.004c5.505 0 9.988-4.478 9.99-9.984 0-2.667-1.037-5.174-2.925-7.062-1.887-1.887-4.394-2.924-7.067-2.924zm5.836 14.165c-.247.697-1.442 1.328-1.986 1.398-.501.064-1.157.097-3.708-.958-3.08-1.272-5.074-4.409-5.228-4.614-.153-.205-1.254-1.666-1.254-3.176 0-1.511.792-2.253 1.074-2.56.247-.269.658-.396.932-.396.115 0 .219.006.311.01.27.012.441.026.634.489.247.592.85 2.073.924 2.224.075.152.124.329.025.527-.099.198-.152.329-.304.504-.152.175-.32.392-.457.527-.152.152-.311.318-.135.62.176.302.784 1.293 1.684 2.096 1.157 1.03 2.133 1.349 2.435 1.499.302.15.48.125.658-.078.178-.204.764-.89 1.013-1.246.247-.356.494-.297.823-.175.329.122 2.094 1.029 2.451 1.207.356.178.594.269.681.42.087.151.087.876-.16 1.573z"/>
                  </svg>
                  <span>{t('quoteWhatsapp')}</span>
                </a>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs uppercase px-6 py-3.5 rounded-xl transition"
                >
                  {t('close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ENLARGED IMAGE LIGHTBOX MODAL */}
      {enlargedImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setEnlargedImage(null)}
        >
          <div className="relative max-w-4xl w-full bg-white rounded-2xl p-4 shadow-2xl flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setEnlargedImage(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-800 bg-slate-100 p-2 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-extrabold text-slate-900 mb-3 font-heading text-center">
              {enlargedImage.title}
            </h3>

            <div className="max-h-[70vh] w-full flex items-center justify-center overflow-hidden p-2 min-h-[280px]">
              {enlargedImage.images && enlargedImage.images.length > 1 ? (
                <ProductImageCarousel
                  key={`${enlargedImage.title}-${enlargedImage.initialIndex || 0}`}
                  images={enlargedImage.images}
                  alt={enlargedImage.title}
                  initialIndex={enlargedImage.initialIndex || 0}
                  imgClassName="max-h-[65vh] max-w-full object-contain rounded-lg"
                />
              ) : (
                <img 
                  src={enlargedImage.img} 
                  alt={enlargedImage.title} 
                  className="max-h-[65vh] max-w-full object-contain rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* FLOATING WHATSAPP BUTTON (ALWAYS VISIBLE BOTTOM RIGHT) */}
      {/* ---------------------------------------------------- */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('whatsappContact')}
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-emerald-500/50 transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20"
      >
        <span className="relative flex h-3 w-3 -mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-100"></span>
        </span>
        <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.486 1.334 5.006l-1.418 5.176 5.305-1.391c1.464.798 3.116 1.218 4.767 1.219h.004c5.505 0 9.988-4.478 9.99-9.984 0-2.667-1.037-5.174-2.925-7.062-1.887-1.887-4.394-2.924-7.067-2.924zm5.836 14.165c-.247.697-1.442 1.328-1.986 1.398-.501.064-1.157.097-3.708-.958-3.08-1.272-5.074-4.409-5.228-4.614-.153-.205-1.254-1.666-1.254-3.176 0-1.511.792-2.253 1.074-2.56.247-.269.658-.396.932-.396.115 0 .219.006.311.01.27.012.441.026.634.489.247.592.85 2.073.924 2.224.075.152.124.329.025.527-.099.198-.152.329-.304.504-.152.175-.32.392-.457.527-.152.152-.311.318-.135.62.176.302.784 1.293 1.684 2.096 1.157 1.03 2.133 1.349 2.435 1.499.302.15.48.125.658-.078.178-.204.764-.89 1.013-1.246.247-.356.494-.297.823-.175.329.122 2.094 1.029 2.451 1.207.356.178.594.269.681.42.087.151.087.876-.16 1.573z"/>
        </svg>
        <span className="hidden sm:inline-block font-extrabold text-xs tracking-wider uppercase">
          {t('whatsappSupport')}
        </span>
      </a>

    </div>
  );
}
