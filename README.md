# 🔗 Link Sharing App

Modern, kullanıcı dostu bir link paylaşım uygulaması. Kullanıcıların sosyal medya profillerini, web sitelerini ve diğer önemli linklerini tek bir sayfada toplayarak paylaşmalarını sağlar.

## ✨ Özellikler

- **🔐 Güvenli Kimlik Doğrulama**: Supabase ile güvenli giriş/kayıt sistemi
- **🎨 Modern UI/UX**: Responsive ve şık tasarım
- **📱 Mobil Uyumlu**: Tüm cihazlarda mükemmel görünüm
- **🔀 Sürükle-Bırak**: Linkleri kolayca yeniden sırala
- **👤 Profil Yönetimi**: Kişisel bilgileri ve profil fotoğrafını güncelle
- **🌐 Çoklu Platform Desteği**: GitHub, LinkedIn, YouTube, Instagram ve daha fazlası
- **👀 Canlı Önizleme**: Değişiklikleri anında gör
- **📋 Kolay Paylaşım**: Benzersiz profil linkini paylaş

## 🛠️ Teknolojiler

- **Frontend**: Next.js 15, React 19
- **Veritabanı**: Supabase
- **Styling**: CSS Modules
- **Sürükle-Bırak**: @dnd-kit
- **İkonlar**: Lucide React, React Icons
- **Bildirimler**: Sonner

## 📦 Kurulum

### Gereksinimler

- Node.js 18+
- npm veya yarn

### Adımlar

1. **Depoyu klonlayın**

   ```bash
   git clone https://github.com/kullanici-adi/link-sharing-app.git
   cd link-sharing-app
   ```

2. **Bağımlılıkları yükleyin**

   ```bash
   npm install
   # veya
   yarn install
   ```

3. **Supabase projesini oluşturun**

   - [Supabase](https://supabase.com) hesabı oluşturun
   - Yeni bir proje oluşturun
   - API anahtarlarınızı kopyalayın

4. **Çevre değişkenlerini ayarlayın**

   ```bash
   # .env.local dosyası oluşturun
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

5. **Geliştirme sunucusunu başlatın**

   ```bash
   npm run dev
   ```

6. **Tarayıcınızda açın**
   [http://localhost:3000](http://localhost:3000) adresine gidin

## 🚀 Kullanım

### 1. Hesap Oluşturma

- Uygulamayı açın ve "Kayıt Ol" butonuna tıklayın
- E-posta ve şifrenizi girin
- Hesabınızı doğrulayın

### 2. Profil Düzenleme

- "Profile" sekmesine gidin
- Profil fotoğrafınızı yükleyin
- Ad, soyad ve e-posta bilgilerinizi güncelleyin

### 3. Link Ekleme

- "Links" sekmesine gidin
- "Add new link" butonuna tıklayın
- Platform seçin ve URL'nizi girin
- "Save" butonuna tıklayın

### 4. Link Sıralama

- Linkleri sürükleyip bırakarak yeniden sıralayın
- Değişiklikler otomatik olarak kaydedilir

### 5. Profil Paylaşma

- "Preview" butonuna tıklayın
- Profil linkinizi kopyalayın ve paylaşın

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Kimlik doğrulama sayfaları
│   ├── (main)/            # Ana uygulama sayfaları
│   │   ├── links/         # Link yönetimi
│   │   └── profile/       # Profil yönetimi
│   ├── (live)/            # Canlı profil görünümü
│   └── preview/           # Önizleme sayfası
├── components/            # React bileşenleri
│   ├── DeleteLinkModal.jsx
│   ├── DragAndDropWrapper.jsx
│   ├── Header.jsx
│   ├── LinksList.jsx
│   ├── LoginForm.jsx
│   ├── ProfileForm.jsx
│   └── ...
├── lib/                   # Yardımcı fonksiyonlar
│   ├── action-links.js    # Link işlemleri
│   ├── action-profile.js  # Profil işlemleri
│   └── UserProvider.jsx   # Kullanıcı context'i
├── styles/               # CSS stilleri
└── utils/                # Yardımcı araçlar
```

## 🔧 Geliştirme

### Script'ler

```bash
npm run dev          # Geliştirme sunucusu
npm run build        # Üretim build'i
npm run start        # Üretim sunucusu
npm run lint         # ESLint kontrolü
```
