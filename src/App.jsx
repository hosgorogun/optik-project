import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Mail, 
  Phone, 
  Globe, 
  CheckCircle,
  MapPin,
  Clock,
  ShieldCheck,
  Eye,
  Award,
  Download,
  UserCheck,
  Check,
  Sparkles,
  Maximize2,
  MessageCircle
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('TR');
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [catalogFormSubmitted, setCatalogFormSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // WhatsApp Link Handler
  const whatsappUrl = "https://wa.me/905395895502?text=Merhaba,%20OptiSafe%20numaralı%20iş%20güvenliği%20gözlükleri%20hakkında%20bilgi%20almak%20istiyorum.";

  // OptiSafe All Main Products & Sub-Models Collection (Direct & Complete from optisafe.com.tr)
  const products = [
    // ---------------------------------------------------------
    // UNIVET PRODUCTS & SUB-MODELS (8 Sub-models + 1 Main Series)
    // ---------------------------------------------------------
    {
      id: 'univet-main',
      brand: 'Univet',
      name: 'Univet Numaralı Koruyucu Gözlük Serisi',
      code: 'OPT-UNI-SERIES',
      category: 'univet',
      rxSupport: true,
      tag: 'İtalyan Tasarımı Ana Seri',
      badgeBg: 'bg-[#1e40af]',
      img: 'https://www.optisafe.com.tr/images/univet1.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/univet.jpg',
      desc: 'Kişiye özel diyoptri değerlerine göre üretilen, darbelere dayanıklı İtalyan tasarımı profesyonel koruyucu gözlükler.',
      specs: {
        standard: 'EN166 1F / ANSI Z87.1',
        prescription: 'Kişiye Özel OptiSafe Mercek Entegrasyonu',
        impact: 'F Sınıfı Mekanik Koruma (45 m/s)',
        coating: 'Buğu Önleyici & Antistatik (Vanguard Technology)',
        weight: '28g'
      },
      features: [
        'Kişiye özel numaralı camlar',
        'Darbe koruma (EN166 standardı)',
        'UV koruma',
        'Hafif ve ergonomik tasarım',
        '8 farklı model seçeneği'
      ],
      models: [
        { id: 101, title: '5X1', img: 'https://www.optisafe.com.tr/images/5x1.jpg' },
        { id: 102, title: '5X1 TECHNICAL', img: 'https://www.optisafe.com.tr/images/5x1_technical.jpg' },
        { id: 103, title: '5X9 HYBRID', img: 'https://www.optisafe.com.tr/images/5x9_hybrid.jpg' },
        { id: 104, title: '5X9', img: 'https://www.optisafe.com.tr/images/5x9.jpg' },
        { id: 105, title: '536 METAL', img: 'https://www.optisafe.com.tr/images/536_metal.jpg' },
        { id: 106, title: '539', img: 'https://www.optisafe.com.tr/images/539.jpg' },
        { id: 107, title: '555', img: 'https://www.optisafe.com.tr/images/555.jpg' },
        { id: 108, title: '572', img: 'https://www.optisafe.com.tr/images/572.jpg' }
      ]
    },
    {
      id: 'univet-5x1',
      brand: 'Univet',
      name: 'Univet 5X1 Numaralı İş Gözlüğü',
      code: 'UNI-5X1',
      category: 'univet',
      rxSupport: true,
      tag: 'Univet Model',
      badgeBg: 'bg-[#1e40af]',
      img: 'https://www.optisafe.com.tr/images/5x1.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/5x1.jpg',
      desc: 'Ergonomik sap yapısı ve geniş görüş açısı sunan kişiye özel numaralı cam montajına uygun Univet 5X1 modeli.',
      specs: {
        standard: 'EN166 1FT K N',
        prescription: 'Rx Numaralı Lens Entegre',
        impact: 'Mekanik Darbe Direnci',
        coating: 'Vanguard Plus Buğu Önleyici',
        weight: '29g'
      },
      features: ['Patentli sap eğimi ayarı', 'Yumuşak burun yastığı', 'Çizilmez & buğulanmaz lens']
    },
    {
      id: 'univet-5x1-tech',
      brand: 'Univet',
      name: 'Univet 5X1 TECHNICAL Koruyucu Gözlük',
      code: 'UNI-5X1-TECH',
      category: 'univet',
      rxSupport: true,
      tag: 'Univet Model',
      badgeBg: 'bg-[#1e40af]',
      img: 'https://www.optisafe.com.tr/images/5x1_technical.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/5x1_technical.jpg',
      desc: 'Zorlu teknik ortamlarda ekstra sızdırmazlık ve konfor sağlayan elastik kafa bantlı 5X1 Technical model.',
      specs: {
        standard: 'EN166 1FT K N / EN170',
        prescription: 'Rx Optik Eklenti Uyumlu',
        impact: 'Yüksek Hızlı Parçacık Koruması',
        coating: 'Çift Taraflı Vanguard Ultra',
        weight: '32g'
      },
      features: ['Çıkarılabilir kafa bandı', 'Yumuşak conta çevresi', 'Terleme önleyici havalandırma kanalları']
    },
    {
      id: 'univet-5x9-hybrid',
      brand: 'Univet',
      name: 'Univet 5X9 HYBRID Gözlük',
      code: 'UNI-5X9-HYB',
      category: 'univet',
      rxSupport: true,
      tag: 'Univet Model',
      badgeBg: 'bg-[#1e40af]',
      img: 'https://www.optisafe.com.tr/images/5x9_hybrid.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/5x9_hybrid.jpg',
      desc: 'Gözlük sapları ve elastik kafa bandı değişimli hibrit koruyucu gözlük konsepti.',
      specs: {
        standard: 'EN166 1F / ANSI Z87.1',
        prescription: 'Numaralı Cam Takılabilir',
        impact: 'Kimyasal & Sıvı Sıçrama Direnci',
        coating: 'Vanguard Buğu & Çizilmez',
        weight: '31g'
      },
      features: ['Hibrit sap / bant dönüşümü', 'Contalı conta koruma', 'Çok yönlü endüstriyel kullanım']
    },
    {
      id: 'univet-5x9',
      brand: 'Univet',
      name: 'Univet 5X9 Numaralı İş Güvenliği Gözlüğü',
      code: 'UNI-5X9',
      category: 'univet',
      rxSupport: true,
      tag: 'Univet Model',
      badgeBg: 'bg-[#1e40af]',
      img: 'https://www.optisafe.com.tr/images/5x9.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/5x9.jpg',
      desc: 'Şık ve modern tasarımıyla öne çıkan, numaralı cam yuvalı klasik 5X9 güvenlik gözlüğü.',
      specs: {
        standard: 'EN166 1F K N',
        prescription: 'Rx +6.00 / -6.00 Uyumlu',
        impact: 'Mekanik Darbe Direnci',
        coating: 'Sertleştirilmiş Çizilmez Kaplama',
        weight: '28g'
      },
      features: ['Yan siperli gövde', 'Farklı renk seçenekleri', 'Ayarlanabilir kulak sapları']
    },
    {
      id: 'univet-536-metal',
      brand: 'Univet',
      name: 'Univet 536 METAL Çerçeveli Gözlük',
      code: 'UNI-536-MTL',
      category: 'univet',
      rxSupport: true,
      tag: 'Metal Çerçeve',
      badgeBg: 'bg-slate-700',
      img: 'https://www.optisafe.com.tr/images/536_metal.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/536_metal.jpg',
      desc: 'Metal alaşımlı klasik çerçeve yapısı ile şeffaf yan siperlikli numaralı iş gözlüğü.',
      specs: {
        standard: 'EN166 1F',
        prescription: 'Tam Numaralı Optik Uyumlu',
        impact: 'Düşük Enerjili Darbe Direnci',
        coating: 'Standart Çizilmezlik',
        weight: '34g'
      },
      features: ['Metal alaşımlı sağlam gövde', 'Şeffaf yan korumalar', 'Klasik gözlük estetiği']
    },
    {
      id: 'univet-539',
      brand: 'Univet',
      name: 'Univet 539 Koruyucu Gözlük',
      code: 'UNI-539',
      category: 'univet',
      rxSupport: true,
      tag: 'Univet Model',
      badgeBg: 'bg-[#1e40af]',
      img: 'https://www.optisafe.com.tr/images/539.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/539.jpg',
      desc: 'Klasik polikarbonat çerçeveli, hafif ve dayanıklı numaralı iş güvenlik gözlüğü.',
      specs: {
        standard: 'EN166 1F',
        prescription: 'Rx Numaralı Entegre',
        impact: 'Mekanik Darbe Direnci',
        coating: 'Anti-Scratch Sert Kaplama',
        weight: '27g'
      },
      features: ['Hafif tasarım', 'Geniş görüş açısı', 'Ekonomik koruma']
    },
    {
      id: 'univet-555',
      brand: 'Univet',
      name: 'Univet 555 Ergonomik İş Gözlüğü',
      code: 'UNI-555',
      category: 'univet',
      rxSupport: true,
      tag: 'Univet Model',
      badgeBg: 'bg-[#1e40af]',
      img: 'https://www.optisafe.com.tr/images/555.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/555.jpg',
      desc: 'Maksimum yüz uyumu ve hafiflik sunan numaralı cam montajlı 555 modeli.',
      specs: {
        standard: 'EN166 1F K',
        prescription: 'Numaralı Cam Yuvası',
        impact: 'FT Mekanik Sınıf',
        coating: 'Çizilmez Sert Kaplama',
        weight: '26g'
      },
      features: ['Kaymaz sap pedleri', 'Ergonomik yüz kavrama', 'Yüksek görüş netliği']
    },
    {
      id: 'univet-572',
      brand: 'Univet',
      name: 'Univet 572 Numaralı Güvenlik Gözlüğü',
      code: 'UNI-572',
      category: 'univet',
      rxSupport: true,
      tag: 'Univet Model',
      badgeBg: 'bg-[#1e40af]',
      img: 'https://www.optisafe.com.tr/images/572.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/572.jpg',
      desc: 'Şık siyah-kırmızı çerçeve hatları ile yüksek dayanıklılık sunan 572 numaralı koruyucu gözlük.',
      specs: {
        standard: 'EN166 1F K N',
        prescription: 'Rx Numaralı Entegre',
        impact: 'Mekanik Darbe Koruması',
        coating: 'Vanguard Anti-Fog & Anti-Scratch',
        weight: '30g'
      },
      features: ['Şık dinamik tasarım', 'Entegre yan korumalar', 'Ergonomik kulak pedleri']
    },

    // ---------------------------------------------------------
    // BOLLÉ SAFETY PRODUCTS & SUB-MODELS (4 Sub-models + 1 Main Series)
    // ---------------------------------------------------------
    {
      id: 'bolle-main',
      brand: 'Bollé Safety',
      name: 'Bollé Numaralı İş Güvenlik Gözlüğü Serisi',
      code: 'OPT-BOL-SERIES',
      category: 'bolle',
      rxSupport: true,
      tag: 'Platinum Buğu Önleyici Ana Seri',
      badgeBg: 'bg-[#1e40af]',
      img: 'https://www.optisafe.com.tr/images/bolle1.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/bolle.jpg',
      desc: 'Yüksek performanslı lens teknolojisi ve Platinum kaplama konforunu bir arada sunan profesyonel koruyucu gözlük serisi.',
      specs: {
        standard: 'EN166 1FT K N',
        prescription: 'Optik Mağaza Reçetelerine Uyumlu',
        impact: 'Ağır Sanayi Darbe Sınıfı',
        coating: 'Platinum (Çizilmez ve Buğulanmaz K&N)',
        weight: '27g'
      },
      features: [
        'Platinum kaplama teknolojisi',
        'Buğu önleyici ve çizilmez',
        'Panoramik görüş açısı',
        'Spor ve şık tasarım',
        '4 farklı model seçeneği'
      ],
      models: [
        { id: 401, title: 'Kurt', img: 'https://www.optisafe.com.tr/images/bolle_1.png' },
        { id: 402, title: 'Klassee', img: 'https://www.optisafe.com.tr/images/bolle_2.jpg' },
        { id: 403, title: 'STKS 420', img: 'https://www.optisafe.com.tr/images/bolle_3.jpg' },
        { id: 404, title: 'Kover RX', img: 'https://www.optisafe.com.tr/images/bolle_4.jpg' }
      ]
    },
    {
      id: 'bolle-kurt',
      brand: 'Bollé Safety',
      name: 'Bollé Kurt Numaralı İş Gözlüğü',
      code: 'BOL-KURT',
      category: 'bolle',
      rxSupport: true,
      tag: 'Bollé Model',
      badgeBg: 'bg-[#1e40af]',
      img: 'https://www.optisafe.com.tr/images/bolle_1.png',
      detailImg: 'https://www.optisafe.com.tr/images/bolle_1.png',
      desc: 'Modern spor tasarımı ve tam yüz koruması sunan Bollé Kurt numaralı güvenlik gözlüğü.',
      specs: {
        standard: 'EN166 1FT K N',
        prescription: 'Reçeteli Numaralı Lens Entegre',
        impact: 'FT Yüksek Hızlı Parçacık Direnci',
        coating: 'Platinum Anti-Fog Technology',
        weight: '28g'
      },
      features: ['Platinum buğulanmazlık', 'Ayarlanabilir kaymaz burun pedi', 'Geniş görüş açısı']
    },
    {
      id: 'bolle-klassee',
      brand: 'Bollé Safety',
      name: 'Bollé Klassee Numaralı İş Gözlüğü',
      code: 'BOL-KLASSEE',
      category: 'bolle',
      rxSupport: true,
      tag: 'Bollé Model',
      badgeBg: 'bg-[#1e40af]',
      img: 'https://www.optisafe.com.tr/images/bolle_2.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/bolle_2.jpg',
      desc: 'Zarif ve dayanıklı çerçeve yapısına sahip Bollé Klassee numaralı iş gözlüğü.',
      specs: {
        standard: 'EN166 1F / ANSI Z87.1',
        prescription: 'Kişiye Özel Optik Cam',
        impact: 'Mekanik Koruma Sınıfı',
        coating: 'Çizilmezlik & Antistatik',
        weight: '26g'
      },
      features: ['Zarif hafif gövde', 'Yüksek optik netlik', 'Ergonomik sap yapısı']
    },
    {
      id: 'bolle-stks420',
      brand: 'Bollé Safety',
      name: 'Bollé STKS 420 Koruyucu Gözlük',
      code: 'BOL-STKS420',
      category: 'bolle',
      rxSupport: true,
      tag: 'Bollé Model',
      badgeBg: 'bg-[#1e40af]',
      img: 'https://www.optisafe.com.tr/images/bolle_3.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/bolle_3.jpg',
      desc: 'Ağır sanayi şartlarında maksimum yan koruma sağlayan STKS 420 modeli.',
      specs: {
        standard: 'EN166 1FT K N',
        prescription: 'Rx Numaralı Entegre',
        impact: 'Ağır Darbe Direnci',
        coating: 'Platinum Çift Taraflı Kaplama',
        weight: '30g'
      },
      features: ['Geniş yan siperlikler', 'Darbelere dayanıklı polikarbonat', 'Yüksek buğu direnci']
    },
    {
      id: 'bolle-koverrx',
      brand: 'Bollé Safety',
      name: 'Bollé Kover RX Numaralı İş Gözlüğü',
      code: 'BOL-KOVERRX',
      category: 'bolle',
      rxSupport: true,
      tag: 'Bollé Model',
      badgeBg: 'bg-[#1e40af]',
      img: 'https://www.optisafe.com.tr/images/bolle_4.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/bolle_4.jpg',
      desc: 'Kişisel numaralı gözlüklerin üzerine de takılabilen veya doğrudan reçeteli lens monte edilen Kover RX.',
      specs: {
        standard: 'EN166 1F K N',
        prescription: 'Rx Klips / Doğrudan Lens Uyumlu',
        impact: 'Mekanik Koruma',
        coating: 'Platinum K&N Sertifikalı',
        weight: '33g'
      },
      features: ['Over-spec (Gözlük üstü) konsepti', 'Geniş koruma alanı', 'Platinum kaplama']
    },

    // ---------------------------------------------------------
    // UVEX PRODUCTS (1 Main Series)
    // ---------------------------------------------------------
    {
      id: 'uvex-main',
      brand: 'uvex',
      name: 'uvex Ağır Sanayi Koruyucu Gözlük Serisi',
      code: 'OPT-UVX-300',
      category: 'uvex',
      rxSupport: true,
      tag: 'Alman Mühendisliği',
      badgeBg: 'bg-[#f97316]',
      img: 'https://www.optisafe.com.tr/images/uvex1.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/uvex.jpg',
      desc: 'Yenilikçi kaplama teknolojileri ve üstün koruma sağlayan, Alman mühendisliği ürünü ergonomik güvenlik gözlükleri.',
      specs: {
        standard: 'EN166 1F / EN170 UV',
        prescription: 'Yüksek Diyoptri Uyumlu Kişisel Mercek',
        impact: 'Yüksek Hızlı Parçacık Direnci',
        coating: 'Supravision Excellence Çizilmez & Buğulanmaz',
        weight: '30g'
      },
      features: [
        'Kişiye özel numaralı camlar',
        'Darbe koruma (EN166 standardı)',
        'UV400 %100 morötesi filtre',
        'Hafif ve ergonomik tasarım'
      ],
      models: []
    },

    // ---------------------------------------------------------
    // TEDEX PRODUCTS & SUB-MODELS (2 Sub-models + 1 Main Series)
    // ---------------------------------------------------------
    {
      id: 'tedex-main',
      brand: 'Tedex',
      name: 'Tedex Ekstra Hafif İş Güvenlik Gözlüğü Serisi',
      code: 'OPT-TDX-SERIES',
      category: 'tedex',
      rxSupport: false,
      tag: 'Ultra Hafif 23g Ana Seri',
      badgeBg: 'bg-emerald-600',
      img: 'https://www.optisafe.com.tr/images/tedex1.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/tedex.jpg',
      desc: 'Ekonomik ve güvenilir çözümler sunan, endüstriyel standartlara uygun ultra hafif iş güvenliği gözlükleri.',
      specs: {
        standard: 'EN166 1F Sertifikalı',
        prescription: 'Standart Koruyucu (Plano & Numaralı Uyumlu)',
        impact: 'Mekanik Darbe Direnci',
        coating: 'Çizilmezlik Sertifikalı',
        weight: '23g'
      },
      features: [
        'Dayanıklı polikarbonat lens',
        'Yan koruma kalkanları',
        'Hafif gövde yapısı',
        'EN166 standardına uygunluk',
        '2 farklı model seçeneği'
      ],
      models: [
        { id: 501, title: 'Forte AF', img: 'https://www.optisafe.com.tr/images/tedex_1.jpg' },
        { id: 502, title: 'Conte', img: 'https://www.optisafe.com.tr/images/tedex_2.jpeg' }
      ]
    },
    {
      id: 'tedex-forte-af',
      brand: 'Tedex',
      name: 'Tedex Forte AF Koruyucu Gözlük',
      code: 'TDX-FORTE-AF',
      category: 'tedex',
      rxSupport: false,
      tag: 'Tedex Model',
      badgeBg: 'bg-emerald-600',
      img: 'https://www.optisafe.com.tr/images/tedex_1.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/tedex_1.jpg',
      desc: 'Buğulanmaz (Anti-Fog) kaplamalı ultra hafif Tedex Forte AF koruyucu iş gözlüğü.',
      specs: {
        standard: 'EN166 1F K N',
        prescription: 'Plano Koruyucu Lens',
        impact: '45m/s Mekanik Parçacık Direnci',
        coating: 'Anti-Fog & Çizilmez',
        weight: '24g'
      },
      features: ['Anti-fog buğulanmaz lens', 'Esnek şakık sapları', 'Ekonomik toplu kullanım']
    },
    {
      id: 'tedex-conte',
      brand: 'Tedex',
      name: 'Tedex Conte İş Güvenliği Gözlüğü',
      code: 'TDX-CONTE',
      category: 'tedex',
      rxSupport: false,
      tag: 'Tedex Model',
      badgeBg: 'bg-emerald-600',
      img: 'https://www.optisafe.com.tr/images/tedex_2.jpeg',
      detailImg: 'https://www.optisafe.com.tr/images/tedex_2.jpeg',
      desc: 'Geniş siperli tasarımı ile şantiye ve imalat hatları için Tedex Conte modeli.',
      specs: {
        standard: 'EN166 1F',
        prescription: 'Plano Koruyucu Lens',
        impact: 'Mekanik Sıçrama Direnci',
        coating: 'Sertleştirilmiş Çizilmez',
        weight: '25g'
      },
      features: ['Polikarbonat monoblok gövde', 'Şeffaf yan siperler', 'Kırılmaz esnek yapı']
    },

    // ---------------------------------------------------------
    // KAYNAK GÖZLÜKLERİ & SUB-MODELS (2 Sub-models + 1 Main Series)
    // ---------------------------------------------------------
    {
      id: 'kaynak-main',
      brand: 'OptiSafe Special',
      name: 'EN175 Kaynak & Dökümhane Gözlüğü Serisi',
      code: 'OPT-KAY-SERIES',
      category: 'kaynak',
      rxSupport: true,
      tag: 'IR & UV Filtreli Ana Seri',
      badgeBg: 'bg-[#971b2f]',
      img: 'https://www.optisafe.com.tr/images/kaynak1.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/kaynak.jpg',
      desc: 'Kaynak işlemlerinde kullanıma uygun, yüksek ışık, morötesi ve kızılötesi ışın koruması sağlayan özel gözlük serisi.',
      specs: {
        standard: 'EN166 / EN169 / EN175',
        prescription: 'İç Filtreli / Numaralı Takılabilir',
        impact: 'Ağır Sıcaklık & Sıçrama Koruması',
        coating: 'IR Filtreli Isı Dayanımlı Cam',
        weight: '55g'
      },
      features: [
        'IR/UV radyasyon koruması',
        'Farklı karartma seviyeleri (Shade 3 / Shade 5)',
        'Isıya dayanıklı çerçeve',
        'Numaralı lens opsiyonu',
        '2 farklı model seçeneği'
      ],
      models: [
        { id: 301, title: '5X7 WELDING', img: 'https://www.optisafe.com.tr/images/5x7_welding.jpg' },
        { id: 302, title: '5X9 FLIP', img: 'https://www.optisafe.com.tr/images/5x9_flip_welding.jpg' }
      ]
    },
    {
      id: 'kaynak-5x7-welding',
      brand: 'OptiSafe Special',
      name: '5X7 WELDING Kaynak Gözlüğü',
      code: 'KAY-5X7-WELD',
      category: 'kaynak',
      rxSupport: true,
      tag: 'Kaynak Modeli',
      badgeBg: 'bg-[#971b2f]',
      img: 'https://www.optisafe.com.tr/images/5x7_welding.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/5x7_welding.jpg',
      desc: 'Oksijen kaynak işleri için IR 3 ve IR 5 filtre seçenekli özel 5X7 Welding gözlük modeli.',
      specs: {
        standard: 'EN166 / EN169 IR 5',
        prescription: 'Reçeteli Gözlük Üstü / Klips Takılabilir',
        impact: 'Sıcak Çapak & Işın Direnci',
        coating: 'Isıya Dayanımlı Çizilmez Filtre',
        weight: '37g'
      },
      features: ['IR 3 / IR 5 filtreli lensler', 'Kıvılcım sıçrama koruması', 'Ergonomik saplar']
    },
    {
      id: 'kaynak-5x9-flip',
      brand: 'OptiSafe Special',
      name: '5X9 FLIP Açılır Mekanizmalı Kaynak Gözlüğü',
      code: 'KAY-5X9-FLIP',
      category: 'kaynak',
      rxSupport: true,
      tag: 'Flip-Up Kaynak Modeli',
      badgeBg: 'bg-[#971b2f]',
      img: 'https://www.optisafe.com.tr/images/5x9_flip_welding.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/5x9_flip_welding.jpg',
      desc: 'Açılır kapanır (Flip-Up) IR vizör mekanizması ile çapak alma ve kaynak işlemini tek gözlükte birleştiren model.',
      specs: {
        standard: 'EN166 1F / EN169 / EN175',
        prescription: 'Numaralı İç Lens Takılabilir',
        impact: 'Ağır Çapak & Radyasyon Koruması',
        coating: 'IR Filtre & Şeffaf Darbe Lensi',
        weight: '48g'
      },
      features: ['Flip-up açılır vizör kapak', 'Çapak alma + kaynak ikisi bir arada', 'Isıya dirençli polimer gövde']
    },

    // ---------------------------------------------------------
    // OPTISAFE FLAGSHIP PRO RX
    // ---------------------------------------------------------
    {
      id: 'optisafe-pro-rx',
      brand: 'OptiSafe',
      name: 'OptiSafe Pro RX Numaralı İş Gözlüğü',
      code: 'OPT-PRO-100',
      category: 'prescription',
      rxSupport: true,
      tag: 'Çok Satan Numaralı',
      badgeBg: 'bg-blue-600',
      img: 'https://www.optisafe.com.tr/images/univet1.jpg',
      detailImg: 'https://www.optisafe.com.tr/images/univet.jpg',
      desc: 'Numaralı lens takılabilen yüksek mekanik dirençli polikarbonat iş güvenliği gözlüğü. Ergonomik yumuşak şakık pedleri ile 8 saatlik konfor.',
      specs: {
        standard: 'EN166 1FT K N / ANSI Z87.1',
        prescription: 'Rx +6.00 / -6.00 Dpt Tam Uyumlu',
        impact: 'FT (Yüksek Hızlı Parçacıklar 45m/s)',
        coating: 'Platinum Anti-Fog & Çizilmezlik',
        weight: '26g'
      },
      features: [
        'Kişiye özel reçeteli lens yuvası',
        'Polikarbonat yüksek darbe direnci',
        'Ayarlanabilir sap boyu ve eğimi',
        'Yumuşak anti-alerjik burun pedi',
        'UV400 morötesi koruma filtresi'
      ],
      models: []
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : selectedCategory === 'prescription'
      ? products.filter(p => p.rxSupport)
      : products.filter(p => p.category === selectedCategory);

  const handleCatalogSubmit = (e) => {
    e.preventDefault();
    setCatalogFormSubmitted(true);
    setTimeout(() => {
      setCatalogFormSubmitted(false);
      setCatalogModalOpen(false);
    }, 2000);
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
              OptiSafe • EN166 Sertifikalı Kişiye Özel Numaralı İş Güvenliği Gözlükleri
            </span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 font-semibold flex items-center gap-1 text-emerald-400">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.486 1.334 5.006l-1.418 5.176 5.305-1.391c1.464.798 3.116 1.218 4.767 1.219h.004c5.505 0 9.988-4.478 9.99-9.984 0-2.667-1.037-5.174-2.925-7.062-1.887-1.887-4.394-2.924-7.067-2.924zm5.836 14.165c-.247.697-1.442 1.328-1.986 1.398-.501.064-1.157.097-3.708-.958-3.08-1.272-5.074-4.409-5.228-4.614-.153-.205-1.254-1.666-1.254-3.176 0-1.511.792-2.253 1.074-2.56.247-.269.658-.396.932-.396.115 0 .219.006.311.01.27.012.441.026.634.489.247.592.85 2.073.924 2.224.075.152.124.329.025.527-.099.198-.152.329-.304.504-.152.175-.32.392-.457.527-.152.152-.311.318-.135.62.176.302.784 1.293 1.684 2.096 1.157 1.03 2.133 1.349 2.435 1.499.302.15.48.125.658-.078.178-.204.764-.89 1.013-1.246.247-.356.494-.297.823-.175.329.122 2.094 1.029 2.451 1.207.356.178.594.269.681.42.087.151.087.876-.16 1.573z"/>
              </svg>
              WhatsApp Destek
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
              src="https://www.optisafe.com.tr/images/logo.png" 
              alt="OptiSafe - Profesyonel Güvenlik Gözlükleri" 
              className="h-11 sm:h-12 w-auto object-contain"
            />
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-wider uppercase">
            <a href="#hero" className="text-slate-700 hover:text-[#1e40af] transition">Ana Sayfa</a>
            <a href="#products" className="text-slate-700 hover:text-[#1e40af] transition">Ürünlerimiz</a>
            <a href="#benefits" className="text-slate-700 hover:text-[#1e40af] transition">Avantajlarımız</a>
            <a href="#about" className="text-slate-700 hover:text-[#1e40af] transition">Hakkımızda</a>
            <a href="#contact" className="text-slate-700 hover:text-[#1e40af] transition">İletişim</a>
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
              <span>WhatsApp İletişim</span>
            </a>

            <button 
              onClick={() => setCatalogModalOpen(true)}
              className="hidden sm:flex bg-[#1e40af] hover:bg-[#1e3a8a] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg transition items-center space-x-1.5 shadow-md shadow-blue-600/20"
            >
              <Download className="w-4 h-4" />
              <span>Katalog Talebi</span>
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
                      onClick={() => { setCurrentLang(lang); setLangDropdownOpen(false); }}
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
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e40af]">Ana Sayfa</a>
            <a href="#products" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e40af]">Ürünlerimiz</a>
            <a href="#benefits" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e40af]">Avantajlarımız</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e40af]">Hakkımızda</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e40af]">İletişim</a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block py-2 text-emerald-600 font-bold flex items-center gap-2">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.486 1.334 5.006l-1.418 5.176 5.305-1.391c1.464.798 3.116 1.218 4.767 1.219h.004c5.505 0 9.988-4.478 9.99-9.984 0-2.667-1.037-5.174-2.925-7.062-1.887-1.887-4.394-2.924-7.067-2.924zm5.836 14.165c-.247.697-1.442 1.328-1.986 1.398-.501.064-1.157.097-3.708-.958-3.08-1.272-5.074-4.409-5.228-4.614-.153-.205-1.254-1.666-1.254-3.176 0-1.511.792-2.253 1.074-2.56.247-.269.658-.396.932-.396.115 0 .219.006.311.01.27.012.441.026.634.489.247.592.85 2.073.924 2.224.075.152.124.329.025.527-.099.198-.152.329-.304.504-.152.175-.32.392-.457.527-.152.152-.311.318-.135.62.176.302.784 1.293 1.684 2.096 1.157 1.03 2.133 1.349 2.435 1.499.302.15.48.125.658-.078.178-.204.764-.89 1.013-1.246.247-.356.494-.297.823-.175.329.122 2.094 1.029 2.451 1.207.356.178.594.269.681.42.087.151.087.876-.16 1.573z"/></svg>
              WhatsApp Hızlı Destek
            </a>
          </div>
        )}
      </header>

      {/* ---------------------------------------------------- */}
      {/* 2. HERO SECTION WITH NEW CUSTOM EYE-CATCHING SHOWCASE */}
      {/* ---------------------------------------------------- */}
      <section id="hero" className="relative pt-12 pb-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden border-b border-slate-800">
        
        {/* Glow ambient effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                OptiSafe • Geleceğin İş Güvenliği Optiği
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight font-heading">
                Gözleriniz İçin <br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  En Yüksek Koruma
                </span> & Net Görüş
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                EN166 sertifikalı kişiye özel numaralı koruyucu iş gözlüklerimiz ile endüstriyel sahalarda <strong className="text-white font-bold">sıfır risk ve kristal netlikte konfor</strong> elde edin.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                <a 
                  href="#products"
                  className="bg-[#1e40af] hover:bg-blue-600 text-white font-bold text-sm uppercase px-8 py-3.5 rounded-xl transition flex items-center space-x-2 shadow-lg shadow-blue-600/30"
                >
                  <span>Koleksiyonu İnceleyin</span>
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
                  <span>WhatsApp İle Sorun</span>
                </a>
              </div>

              {/* Badges Bar */}
              <div className="pt-6 border-t border-slate-800 grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="block text-2xl font-extrabold text-blue-400">15+ Yıl</span>
                  <span className="text-xs text-slate-400 font-medium">Sektörel Tecrübe</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold text-white">EN166</span>
                  <span className="text-xs text-slate-400 font-medium">Avrupa Standardı</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold text-orange-400">%100</span>
                  <span className="text-xs text-slate-400 font-medium">Kişiye Özel Optik</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Showcase (UPDATED HIGH END UNIQUE HERO IMAGE) */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-lg bg-slate-900/90 p-3.5 rounded-3xl border border-slate-700/80 shadow-2xl shadow-blue-900/30 group">
                
                <div className="absolute top-6 left-6 bg-[#1e40af]/90 backdrop-blur-md text-white text-[10px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest z-10 border border-blue-400/30 shadow-lg">
                  OptiSafe High-Protection RX
                </div>
                
                <div className="absolute top-6 right-6 bg-emerald-500/90 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider z-10 shadow-lg flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> EN166 Approved
                </div>

                <div className="overflow-hidden rounded-2xl relative">
                  <img 
                    src="/hero_custom.jpg" 
                    onError={(e) => { e.target.src = "https://www.optisafe.com.tr/images/hero.jpg"; }}
                    alt="OptiSafe Özel Tasarım Profesyonel Numaralı Güvenlik Gözlükleri" 
                    className="w-full h-auto rounded-2xl object-cover transform group-hover:scale-105 transition duration-700 shadow-inner"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 text-left p-3 bg-slate-900/85 backdrop-blur-md rounded-xl border border-slate-700/70">
                    <p className="text-xs font-bold text-white flex items-center justify-between">
                      <span>OptiSafe Özel Numaralı Polikarbonat Seri</span>
                      <span className="text-blue-400 font-mono text-[11px]">OPT-RX-2026</span>
                    </p>
                    <p className="text-[10px] text-slate-300 mt-0.5">Çizilmez & Buğulanmaz Çift Taraflı Kaplama • Özel Diyoptri Montajı</p>
                  </div>
                </div>

              </div>
            </div>

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
              OPTİSAFE TÜM ÜRÜNLER & ALT MODELLER ({filteredProducts.length} Çeşit)
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-3 font-heading">Ürünlerimiz & Modellerimiz</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Univet, Bollé, uvex, Tedex ve Kaynak Gözlüklerinin tüm alt modelleri eksiksiz olarak listelenmiştir. İlgilendiğiniz modelin detaylarını ve teknik sertifikalarını inceleyebilirsiniz.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[
              { id: 'all', label: `Tüm Ürünler (${products.length})` },
              { id: 'univet', label: 'Univet (8 Model)' },
              { id: 'bolle', label: 'Bollé (4 Model)' },
              { id: 'uvex', label: 'uvex' },
              { id: 'tedex', label: 'Tedex (2 Model)' },
              { id: 'kaynak', label: 'Kaynak Gözlükleri (2 Model)' },
              { id: 'prescription', label: 'Numaralı (Rx) Uyumlu' }
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
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 bg-slate-100 overflow-hidden flex items-center justify-center p-4 border-b border-slate-100">
                    <span className={`absolute top-3 left-3 text-[9px] font-bold text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider ${p.badgeBg}`}>
                      {p.tag}
                    </span>
                    <img 
                      src={p.img} 
                      alt={p.name} 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500 cursor-pointer"
                      onClick={() => setSelectedProduct(p)}
                    />
                  </div>
                  
                  <div className="p-5 space-y-2">
                    <span className="text-[11px] font-bold text-[#1e40af] uppercase tracking-wider block">{p.brand}</span>
                    <h3 
                      onClick={() => setSelectedProduct(p)}
                      className="text-base font-extrabold text-slate-900 group-hover:text-[#1e40af] transition font-heading cursor-pointer leading-snug"
                    >
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{p.desc}</p>
                    
                    {p.models && p.models.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[10px] font-bold text-slate-500 block mb-1">Alt Modeller:</span>
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
                  <button 
                    onClick={() => setSelectedProduct(p)}
                    className="bg-slate-100 hover:bg-[#1e40af] hover:text-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg transition inline-flex items-center space-x-1"
                  >
                    <span>İncele</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. BENEFITS SECTION (Core OptiSafe Advantages) */}
      {/* ---------------------------------------------------- */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#f97316] font-bold text-xs uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              NEDEN OPTİSAFE?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-3 font-heading">Avantajlarımız</h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Uzman ekibimiz, çalışanlarınıza en uygun gözlük ve lens seçiminde destek sunarak, güvenliğinizi ve konforunuzu ön planda tutar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Benefit 1 */}
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 transition text-center flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-[#1e40af] flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-3 font-heading">Maksimum Koruma</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                EN166 standardına uygun üretilen gözlüklerimiz, mekanik darbeler, kimyasal sıçramalar ve zararlı ışınlara karşı tam koruma sağlar.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 transition text-center flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-[#1e40af] flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-3 font-heading">Net Görüş</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kişiye özel hazırlanan numaralı mercekler sayesinde görüş netliğinden ödün vermeden güvenliğinizi sağlayın.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 transition text-center flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-[#1e40af] flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-3 font-heading">Ergonomik Tasarım</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Uzun saatler boyunca rahatça kullanılabilen, hafif ve ergonomik tasarımlarla çalışanlarınızın konforunu artırın.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 transition text-center flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-[#1e40af] flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                <UserCheck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-3 font-heading">Kişiselleştirme</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Her çalışanın göz numarasına özel üretim yaparak kişiselleştirilmiş güvenlik koruma çözümleri sağlıyoruz.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. ABOUT OPTISAFE SECTION */}
      {/* ---------------------------------------------------- */}
      <section id="about" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-[#f97316] font-bold text-xs uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30">
                KURUMSAL KİMLİK
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-heading leading-tight">
                OptiSafe Hakkında
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                OptiSafe olarak, 15 yılı aşkın süredir endüstriyel ve laboratuvar ortamlarında göz güvenliği çözümleri sunuyoruz. Amacımız, iş güvenliğinden ödün vermeden ihtiyacınız olan görüş netliğini sağlamaktır.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <h3 className="text-base font-bold text-white mb-1 font-heading">Vizyonumuz</h3>
                  <p className="text-xs text-slate-300">Göz sağlığı ve güvenliğinde dünya standartlarını belirleyen, yenilikçi ürünlerle sektöre yön veren marka olmak.</p>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <h3 className="text-base font-bold text-white mb-2 font-heading">Değerlerimiz</h3>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#1e40af]" /> Kaliteden ve standartlardan ödün vermemek</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#1e40af]" /> Müşteri ve çalışan memnuniyetini ön planda tutmak</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#1e40af]" /> Sürekli yenilik ve teknik gelişimi desteklemek</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/90 p-8 rounded-2xl border border-slate-700 space-y-6 shadow-2xl">
              <h3 className="text-2xl font-black text-white font-heading">Neden OptiSafe?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Numaralı iş güvenliği gözlüklerinde uzmanlaşmış ekibimiz ve yenilikçi ürünlerimizle, çalışanlarınızın göz sağlığını korumak için en uygun çözümleri sunuyoruz.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Numaralı iş güvenliği gözlüklerimiz hem darbelere karşı tam koruma sağlar hem de kristal netlikte görüş sunar. Bu sayede çalışanlarınız hem güvende kalır hem de performanslarını en üst seviyede tutarlar.
              </p>

              <div className="pt-2">
                <button 
                  onClick={() => setCatalogModalOpen(true)}
                  className="w-full bg-[#1e40af] hover:bg-blue-700 text-white font-bold text-xs uppercase py-3.5 rounded-xl transition text-center shadow-lg"
                >
                  Kurumsal Kataloğu İndir
                </button>
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
              İLETİŞİME GEÇİN
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-3 font-heading">İletişim</h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Ürünlerimiz ve kurumsal teklif talepleriniz için bizimle iletişime geçin.
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
                  <h4 className="text-sm font-bold text-slate-900 font-heading">Adres</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Yenikent Mah. Gazi Mustafa Kemal Cad. No:46H, 41900 Derince / Kocaeli
                  </p>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-start space-x-4">
                <div className="p-3.5 bg-emerald-100 text-emerald-600 rounded-xl shrink-0">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.486 1.334 5.006l-1.418 5.176 5.305-1.391c1.464.798 3.116 1.218 4.767 1.219h.004c5.505 0 9.988-4.478 9.99-9.984 0-2.667-1.037-5.174-2.925-7.062-1.887-1.887-4.394-2.924-7.067-2.924zm5.836 14.165c-.247.697-1.442 1.328-1.986 1.398-.501.064-1.157.097-3.708-.958-3.08-1.272-5.074-4.409-5.228-4.614-.153-.205-1.254-1.666-1.254-3.176 0-1.511.792-2.253 1.074-2.56.247-.269.658-.396.932-.396.115 0 .219.006.311.01.27.012.441.026.634.489.247.592.85 2.073.924 2.224.075.152.124.329.025.527-.099.198-.152.329-.304.504-.152.175-.32.392-.457.527-.152.152-.311.318-.135.62.176.302.784 1.293 1.684 2.096 1.157 1.03 2.133 1.349 2.435 1.499.302.15.48.125.658-.078.178-.204.764-.89 1.013-1.246.247-.356.494-.297.823-.175.329.122 2.094 1.029 2.451 1.207.356.178.594.269.681.42.087.151.087.876-.16 1.573z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-heading">WhatsApp Hatı</h4>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 hover:text-emerald-700 font-bold mt-1 block">
                    +90 (539) 589 55 02 (Anında Yanıt)
                  </a>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-start space-x-4">
                <div className="p-3.5 bg-blue-100 text-[#1e40af] rounded-xl shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-heading">Telefon</h4>
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
                  <h4 className="text-sm font-bold text-slate-900 font-heading">E-posta</h4>
                  <a href="mailto:info@optisafe.com.tr" className="text-xs text-slate-800 hover:text-[#1e40af] font-semibold mt-1 block">
                    info@optisafe.com.tr
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6 font-heading">Bize Mesaj Gönderin</h3>
              <form onSubmit={handleCatalogSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Adınız Soyadınız *</label>
                    <input type="text" required placeholder="Ad Soyad" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#1e40af]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Firma Adı *</label>
                    <input type="text" required placeholder="Firma Adı" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#1e40af]" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">E-Posta Adresi *</label>
                    <input type="email" required placeholder="ornek@firma.com" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#1e40af]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Telefon *</label>
                    <input type="tel" required placeholder="053X XXX XX XX" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#1e40af]" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mesajınız / Numune Talebiniz</label>
                  <textarea rows={4} placeholder="İhtiyacınız olan gözlük adedi ve detaylar..." className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#1e40af]"></textarea>
                </div>
                <button type="submit" className="bg-[#1e40af] hover:bg-blue-700 text-white font-bold text-xs uppercase px-8 py-3.5 rounded-xl transition shadow-md shadow-blue-600/20">
                  Mesajı Gönder
                </button>
              </form>
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
                  src="https://www.optisafe.com.tr/images/logo.png" 
                  alt="OptiSafe Logo" 
                  className="h-10 w-auto object-contain"
                />
              </a>
              <p className="text-xs text-slate-400 leading-relaxed">
                OptiSafe • EN166 sertifikalı kişiye özel numaralı iş güvenliği gözlükleri ve endüstriyel göz koruma çözümleri.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-4 font-heading uppercase">Markalarımız</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>Univet Safety (8 Model)</li>
                <li>Bollé Safety (4 Model)</li>
                <li>uvex Safety</li>
                <li>Tedex (2 Model)</li>
                <li>Kaynak Gözlükleri (2 Model)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-4 font-heading uppercase">İletişim</h4>
              <p className="text-xs text-slate-400">Yenikent Mah. GMK Cad. No:46H Derince / Kocaeli</p>
              <p className="text-xs text-slate-400 mt-1">Tel: +90 (539) 589 55 02</p>
              <p className="text-xs text-slate-400">E-posta: info@optisafe.com.tr</p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-4 font-heading uppercase">Sosyal Medya</h4>
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
            <p>© 2026 OptiSafe - Tüm Hakları Saklıdır. Profesyonel Güvenlik Gözlükleri.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-slate-300">Gizlilik Politikası</a>
              <a href="#" className="hover:text-slate-300">KVKK Aydınlatma Metni</a>
            </div>
          </div>

        </div>
      </footer>

      {/* CATALOG REQUEST MODAL */}
      {catalogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-slate-900 relative shadow-2xl">
            <button onClick={() => setCatalogModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-slate-900 mb-1 font-heading">Katalog & Teknik Föy Talebi</h3>
            <p className="text-xs text-slate-600 mb-4">EN166 sertifika föyleri ve ürün kataloğu için bilgilerinizi doldurun.</p>

            {catalogFormSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold">Talebiniz Alındı!</h4>
                <p className="text-xs text-slate-500">Katalog e-posta adresinize iletilecektir.</p>
              </div>
            ) : (
              <form onSubmit={handleCatalogSubmit} className="space-y-3 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ad Soyad *</label>
                  <input type="text" required className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1e40af]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Firma Adı *</label>
                  <input type="text" required className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1e40af]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Telefon *</label>
                  <input type="tel" required className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1e40af]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">E-Posta *</label>
                  <input type="email" required className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1e40af]" />
                </div>
                <button type="submit" className="w-full bg-[#1e40af] hover:bg-blue-700 text-white font-bold text-xs uppercase py-3 rounded-lg transition mt-2 shadow">
                  Kataloğu E-Posta İle Gönder
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* PRODUCT DETAIL & SUB-MODELS MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 text-slate-900 relative shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1">
              <X className="w-6 h-6" />
            </button>

            {/* Product Overview Header */}
            <div className="grid sm:grid-cols-2 gap-6 mb-6 items-center">
              <div className="h-56 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-4 border border-slate-200 relative group">
                <img 
                  src={selectedProduct.detailImg || selectedProduct.img} 
                  alt={selectedProduct.name} 
                  className="max-h-full max-w-full object-contain cursor-pointer group-hover:scale-105 transition"
                  onClick={() => setEnlargedImage({ title: selectedProduct.name, img: selectedProduct.detailImg || selectedProduct.img })}
                />
                <button 
                  onClick={() => setEnlargedImage({ title: selectedProduct.name, img: selectedProduct.detailImg || selectedProduct.img })}
                  className="absolute bottom-2 right-2 bg-white/90 p-1.5 rounded-lg shadow text-slate-700 hover:text-[#1e40af] flex items-center gap-1 text-[10px] font-bold"
                >
                  <Maximize2 className="w-3.5 h-3.5" /> Büyüt
                </button>
              </div>

              <div>
                <span className="text-xs font-bold text-[#1e40af] uppercase tracking-wider block mb-1">
                  {selectedProduct.brand} • Kod: {selectedProduct.code}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mb-2 font-heading leading-tight">{selectedProduct.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{selectedProduct.desc}</p>
                <span className={`inline-block text-[10px] font-bold text-white px-3 py-1 rounded-full uppercase tracking-wider ${selectedProduct.badgeBg}`}>
                  {selectedProduct.tag}
                </span>
              </div>
            </div>

            {/* Features List */}
            {selectedProduct.features && selectedProduct.features.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2 font-heading">Öne Çıkan Özellikler</h4>
                <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {selectedProduct.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <Check className="w-4 h-4 text-[#1e40af] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Specifications */}
            {selectedProduct.specs && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 space-y-2 text-xs">
                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider font-heading border-b border-slate-200 pb-1 mb-2">Teknik Özellikler & Sertifikalar</h4>
                <p><strong>Standart:</strong> {selectedProduct.specs.standard}</p>
                <p><strong>Numaralı Lens Entegrasyonu:</strong> {selectedProduct.specs.prescription}</p>
                <p><strong>Darbe Direnci:</strong> {selectedProduct.specs.impact}</p>
                <p><strong>Kaplama Teknolojisi:</strong> {selectedProduct.specs.coating}</p>
                <p><strong>Ağırlık:</strong> {selectedProduct.specs.weight}</p>
              </div>
            )}

            {/* Models / Sub-Products Grid */}
            {selectedProduct.models && selectedProduct.models.length > 0 && (
              <div className="mb-6 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-heading">
                    {selectedProduct.brand} Model Seçenekleri ({selectedProduct.models.length} Model)
                  </h4>
                  <span className="text-[11px] text-slate-500">Büyütmek için tıklayın</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedProduct.models.map((m) => (
                    <div 
                      key={m.id}
                      onClick={() => setEnlargedImage({ title: `${selectedProduct.brand} ${m.title}`, img: m.img })}
                      className="bg-slate-50 hover:bg-white border border-slate-200 rounded-xl p-2.5 text-center cursor-pointer hover:shadow-md hover:border-[#1e40af] transition group"
                    >
                      <div className="h-24 bg-white rounded-lg overflow-hidden flex items-center justify-center p-2 mb-2 border border-slate-100 relative">
                        <img 
                          src={m.img} 
                          alt={m.title} 
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition"
                        />
                        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <Maximize2 className="w-4 h-4 text-slate-800 bg-white/80 p-0.5 rounded" />
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-slate-800 group-hover:text-[#1e40af] transition font-heading block truncate">
                        {m.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase py-3 rounded-xl transition text-center shadow flex items-center justify-center gap-1.5"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.486 1.334 5.006l-1.418 5.176 5.305-1.391c1.464.798 3.116 1.218 4.767 1.219h.004c5.505 0 9.988-4.478 9.99-9.984 0-2.667-1.037-5.174-2.925-7.062-1.887-1.887-4.394-2.924-7.067-2.924zm5.836 14.165c-.247.697-1.442 1.328-1.986 1.398-.501.064-1.157.097-3.708-.958-3.08-1.272-5.074-4.409-5.228-4.614-.153-.205-1.254-1.666-1.254-3.176 0-1.511.792-2.253 1.074-2.56.247-.269.658-.396.932-.396.115 0 .219.006.311.01.27.012.441.026.634.489.247.592.85 2.073.924 2.224.075.152.124.329.025.527-.099.198-.152.329-.304.504-.152.175-.32.392-.457.527-.152.152-.311.318-.135.62.176.302.784 1.293 1.684 2.096 1.157 1.03 2.133 1.349 2.435 1.499.302.15.48.125.658-.078.178-.204.764-.89 1.013-1.246.247-.356.494-.297.823-.175.329.122 2.094 1.029 2.451 1.207.356.178.594.269.681.42.087.151.087.876-.16 1.573z"/>
                </svg>
                <span>WhatsApp'tan Teklif Al</span>
              </a>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs uppercase px-6 py-3 rounded-xl transition"
              >
                Kapat
              </button>
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

            <div className="max-h-[70vh] flex items-center justify-center overflow-hidden p-2">
              <img 
                src={enlargedImage.img} 
                alt={enlargedImage.title} 
                className="max-h-[65vh] max-w-full object-contain rounded-lg"
              />
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
        aria-label="WhatsApp İletişim"
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
          WhatsApp Destek
        </span>
      </a>

    </div>
  );
}
