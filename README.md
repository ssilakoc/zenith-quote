# 🚀 Zenith Quote: Smart Sales & Pricing Engine

**Zenith Quote**, freelance çalışanlar ve butik ajanslar için tasarlanmış, React tabanlı bir **"Akıllı Teklif Oluşturma"** sistemidir. Sadece bir fiyat hesaplayıcı değil, aynı zamanda içerisinde barındırdığı psikolojik ikna teknikleriyle satış dönüşümünü artırmayı hedefleyen bir iş asistanıdır.

---

## ✨ Temel Özellikler

* **Dinamik Fiyatlandırma:** Kullanıcı hizmet seçtikçe anlık güncellenen tutarlar ve sepet mantığı.
* **Akıllı İndirim Motoru:**
    * **Bundle İndirimi:** Stratejik hizmet birleşimlerinde (Örn: Web + Logo) otomatik **%15 indirim**. 
    * **Kurumsal Eşik:** 50.000 TL üzerindeki projelerde otomatik devreye giren **%8 sadakat indirimi**.
* **Profesyonel PDF Export:** `jsPDF` ve `html2canvas` entegrasyonu ile Türkçe karakter destekli, kurumsal şablon çıktısı.
* **Modern UI/UX:** Apple standartlarında minimalist **"Glassmorphism"** tasarımı ve **"Electric Purple"** renk paleti.
* **Satış Tetikleyicileri:** Kıtlık (Geri sayım sayacı) ve Sosyal Kanıt (Memnun müşteri sayaçları) bileşenleri.

---

## 🛠️ Kullanılan Teknolojiler

* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Document Generation:** jsPDF & html2canvas

---

## 🔐 Güvenlik ve Yapılandırma

Proje, hassas verileri korumak için `.env` mimarisini kullanır. Kendi bilgilerinizi eklemek için `.env.example` dosyasını `.env` olarak kopyalayıp ilgili alanları doldurmanız yeterlidir:

```env
VITE_OWNER_NAME="Sıla Koç"
VITE_CONTACT_EMAIL="ssilakoc@gmail.com"
VITE_COMPANY_NAME="ZENITH"
VITE_WEBSITE="[www.zenith.com](https://www.zenith.com).tr"
