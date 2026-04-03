
export const SERVICES_DATA = [
  {
    id: 'web',
    label: 'Web & Geliştirme',
    emoji: '🌐',
    gradientFrom: '#3b82f6',
    gradientTo: '#06b6d4',
    services: [
      {
        id: 'kurumsal-web',
        name: 'Kurumsal Web Sitesi',
        subtitle: '5 Sayfa · CMS · Mobil Uyumlu',
        price: 15000,
        unit: 'proje',
        popular: true,
        deliveryDays: 21,
        conversionTip:
          'Müşterilerin %94\'ü ilk saniyede güven kararını tasarıma göre veriyor. Bu paket dönüşüm oranınızı %35 artırabilir.',
        includes: [
          '5 özel tasarım sayfa',
          'CMS yönetim paneli',
          'Mobil tam uyumluluk',
          'Temel SEO kurulumu',
          '1 yıl hosting & SSL',
        ],
      },
      {
        id: 'eticaret',
        name: 'E-Ticaret Sitesi',
        subtitle: 'WooCommerce · Ödeme Ent. · Stok',
        price: 35000,
        unit: 'proje',
        popular: false,
        deliveryDays: 35,
        conversionTip:
          'E-ticaret sitesi olan işletmeler ortalama %127 daha fazla gelir elde ediyor. Yatırım ilk yılda kendini amorti ediyor.',
        includes: [
          'Sınırsız ürün kataloğu',
          'İyzico & PayTR entegrasyonu',
          'Stok & sipariş yönetimi',
          'SSL & PCI uyumu',
          'Kargo entegrasyonu',
        ],
      },
      {
        id: 'landing-page',
        name: 'Landing Page',
        subtitle: 'Yüksek Dönüşüm · A/B Test Ready',
        price: 8000,
        unit: 'proje',
        popular: false,
        deliveryDays: 10,
        conversionTip:
          'İyi optimize edilmiş landing page, dönüşüm oranını %300\'e kadar artırabilir. Hızlı teslimat.',
        includes: [
          '1 sayfa tam özel tasarım',
          'Form & CRM entegrasyonu',
          'Google Analytics kurulumu',
          'Core Web Vitals optimizasyonu',
        ],
      },
      {
        id: 'web-app',
        name: 'Özel Web Uygulaması',
        subtitle: 'React · Node.js · Veritabanı',
        price: 55000,
        unit: 'proje',
        popular: false,
        deliveryDays: 60,
        conversionTip:
          'Özel yazılım yatırımı şirketlerin %60\'ında ilk 12 ayda kendini amorti ediyor. Rakiplerinizden ayrışın.',
        includes: [
          'Özel React frontend',
          'Node.js / REST API backend',
          'PostgreSQL veritabanı',
          'Admin yönetim paneli',
          'Teknik dokümantasyon',
        ],
      },
    ],
  },

  {
    id: 'brand',
    label: 'Marka Kimliği',
    emoji: '🎨',
    gradientFrom: '#8b5cf6',
    gradientTo: '#ec4899',
    services: [
      {
        id: 'logo',
        name: 'Logo Tasarımı',
        subtitle: '3 Konsept · Sınırsız Revizyon',
        price: 5000,
        unit: 'proje',
        popular: true,
        deliveryDays: 7,
        conversionTip:
          'Profesyonel logo marka güvenilirliğini %80 artırıyor. İlk izlenim 50 ms\'de oluşuyor — ilk adım logodan başlıyor.',
        includes: [
          '3 farklı konsept önerisi',
          'Sınırsız revizyon hakkı',
          'SVG / PNG / PDF / AI formatları',
          'Kullanım kılavuzu',
        ],
      },
      {
        id: 'marka-kimligi',
        name: 'Tam Marka Kimliği',
        subtitle: 'Logo + Rehber + Tüm Materyaller',
        price: 12000,
        unit: 'proje',
        popular: false,
        deliveryDays: 14,
        conversionTip:
          'Tutarlı marka kimliğine sahip şirketler %33 daha yüksek gelir elde ediyor. Bütünsel kimlik = güven.',
        includes: [
          'Logo tasarımı (dahil)',
          'Renk paleti & tipografi sistemi',
          '30+ sayfa marka rehberi',
          'Sosyal medya şablonları',
          'Sunum & teklif şablonları',
        ],
      },
      {
        id: 'kirtasiye',
        name: 'Kartvizit & Kırtasiye',
        subtitle: 'Baskıya Hazır · Premium Tasarım',
        price: 3000,
        unit: 'proje',
        popular: false,
        deliveryDays: 5,
        conversionTip:
          'Profesyonel kartvizit iş toplantılarında güven algısını %45 artırıyor. Küçük dokunuş, büyük etki.',
        includes: [
          'Çift yüzlü kartvizit',
          'Antetli kağıt & zarf',
          'E-posta imza şablonu',
          'Baskıya hazır (CMYK)',
        ],
      },
    ],
  },

  {
    id: 'marketing',
    label: 'Dijital Pazarlama',
    emoji: '📈',
    gradientFrom: '#10b981',
    gradientTo: '#3b82f6',
    services: [
      {
        id: 'seo',
        name: 'SEO Optimizasyonu',
        subtitle: 'Aylık · Google Sıralaması',
        price: 8000,
        unit: 'ay',
        popular: true,
        deliveryDays: 0,
        conversionTip:
          'SEO yatırımı ücretli reklamdan 10× daha yüksek ROI sağlıyor (%3.8 vs %0.4). Uzun vadeli büyüme.',
        includes: [
          'Anahtar kelime araştırması',
          'Teknik SEO denetimi',
          'Sayfa içi optimizasyon',
          'Aylık performans raporu',
        ],
      },
      {
        id: 'sosyal-medya',
        name: 'Sosyal Medya Yönetimi',
        subtitle: 'Aylık · Instagram + LinkedIn',
        price: 6000,
        unit: 'ay',
        popular: false,
        deliveryDays: 0,
        conversionTip:
          'Aktif sosyal medya yönetimi marka bilinirliğini 6 ayda %200 artırabilir. Topluluk = sadakat.',
        includes: [
          '20 profesyonel post/ay',
          'Story & Reels tasarımları',
          'Topluluk yönetimi & yanıtlar',
          'Aylık analitik rapor',
        ],
      },
      {
        id: 'google-ads',
        name: 'Google Ads Yönetimi',
        subtitle: 'Aylık · Reklam Bütçesi Hariç',
        price: 5000,
        unit: 'ay',
        popular: false,
        deliveryDays: 0,
        conversionTip:
          'Profesyonel Ads yönetimi reklam maliyetini %40 düşürürken dönüşümleri %65 artırıyor.',
        includes: [
          'Kampanya kurulumu & optimizasyonu',
          'A/B reklam testi',
          'Dönüşüm takip kurulumu',
          'Haftalık performans raporu',
        ],
      },
      {
        id: 'icerik',
        name: 'İçerik Pazarlama',
        subtitle: 'Aylık · Blog + Copywriting',
        price: 4000,
        unit: 'ay',
        popular: false,
        deliveryDays: 0,
        conversionTip:
          'İçerik pazarlaması kullanan şirketler rakiplerine göre 6× daha fazla lead üretiyor.',
        includes: [
          '4 SEO odaklı blog yazısı/ay',
          'Sosyal medya metinleri',
          'E-posta kampanya şablonları',
          'Performans takibi',
        ],
      },
    ],
  },

  {
    id: 'extra',
    label: 'Ek Hizmetler',
    emoji: '⚡',
    gradientFrom: '#f59e0b',
    gradientTo: '#ef4444',
    services: [
      {
        id: 'mobil-app',
        name: 'Mobil Uygulama',
        subtitle: 'iOS & Android · React Native',
        price: 45000,
        unit: 'proje',
        popular: false,
        deliveryDays: 60,
        conversionTip:
          'Mobil uygulama müşteri bağlılığını %88 artırıyor. Kullanıcılar uygulamalarda web\'e göre 3× daha fazla zaman harcıyor.',
        includes: [
          'iOS & Android tek kod tabanı',
          'Push bildirim sistemi',
          'Offline çalışma modu',
          'App Store & Play Store yayını',
        ],
      },
      {
        id: 'bakim',
        name: 'Bakım & Destek Paketi',
        subtitle: 'Aylık · 7/24 Teknik Destek',
        price: 2500,
        unit: 'ay',
        popular: false,
        deliveryDays: 0,
        conversionTip:
          'Düzenli bakım site güvenlik açıklarını %95 azaltıyor. Güvenlik = müşteri güveni = gelir.',
        includes: [
          'Güvenlik güncellemeleri',
          'Günlük otomatik yedekleme',
          'Uptime & performans izleme',
          'Öncelikli e-posta & WhatsApp destek',
        ],
      },
      {
        id: 'hiz-opt',
        name: 'Hız & Teknik Optimizasyon',
        subtitle: 'Core Web Vitals · PageSpeed 90+',
        price: 3500,
        unit: 'proje',
        popular: false,
        deliveryDays: 7,
        conversionTip:
          '1 saniyelik yavaşlama dönüşüm oranını %7 düşürüyor. Hız = SEO = gelir. PageSpeed 90+ skoru garantisi.',
        includes: [
          'Kapsamlı PageSpeed analizi',
          'Görüntü & kaynak optimizasyonu',
          'Lazy loading & code splitting',
          'CDN kurulumu',
        ],
      },
    ],
  },
]


export const BUNDLE_DISCOUNTS = [
  {
    id: 'dijital-donusum',
    name: 'Dijital Dönüşüm Paketi',
    requiredServices: ['kurumsal-web', 'logo', 'sosyal-medya'],
    discountRate: 0.20,
    badge: '%20 İndirim',
    description: 'Web Sitesi + Logo + Sosyal Medya üçlüsü',
  },
  {
    id: 'web-brand',
    name: 'Web & Marka Paketi',
    requiredServices: ['kurumsal-web', 'logo'],
    discountRate: 0.15,
    badge: '%15 İndirim',
    description: 'Kurumsal web sitesi ve logo birlikte',
  },
  {
    id: 'buyume',
    name: 'Büyüme Paketi',
    requiredServices: ['kurumsal-web', 'seo'],
    discountRate: 0.10,
    badge: '%10 İndirim',
    description: 'Web sitesi + SEO optimizasyonu',
  },
  {
    id: 'eticaret-ads',
    name: 'E-Ticaret Büyüme Paketi',
    requiredServices: ['eticaret', 'google-ads'],
    discountRate: 0.12,
    badge: '%12 İndirim',
    description: 'E-ticaret sitesi + Google Ads yönetimi',
  },
]

// ─────────────────────────────────────────────────────────────
//  CORPORATE THRESHOLD  —  değerler .env dosyasından okunur
// ─────────────────────────────────────────────────────────────

export const CORPORATE_THRESHOLD     = Number(import.meta.env.VITE_CORPORATE_THRESHOLD)    || 50000
export const CORPORATE_DISCOUNT_RATE = Number(import.meta.env.VITE_CORPORATE_DISCOUNT_RATE) || 0.08
export const CORPORATE_DISCOUNT_NAME = 'Kurumsal Paket İndirimi'
