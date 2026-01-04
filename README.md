# MedyaGem CMS

MedyaGem için özel olarak geliştirilmiş, çoklu site destekli, SEO odaklı içerik yönetim sistemi.

## Özellikler

- **Çoklu Site Yönetimi:** Tek panelden birden fazla web sitesini yönetme.
- **Dinamik İçerik:** Sayfalar, Hizmetler, Bloglar, SSS ve Hizmet Bölgeleri yönetimi.
- **Medya Kütüphanesi:** Vercel Blob entegrasyonu ile hızlı dosya yükleme.
- **SEO Araçları:** Otomatik sitemap, robots.txt, schema markup ve meta etiket yönetimi.
- **Modern UI:** Shadcn/UI ve Tailwind CSS ile hazırlanan premium dark/light mod destekli arayüz.
- **Güvenli:** NextAuth ile JWT tabanlı kimlik doğrulama ve rol yönetimi (ADMIN, EDITOR).

## Gereksinimler

- Node.js 18+
- PostgreSQL (Vercel Postgres önerilir)
- Vercel Blob (Medya yüklemeleri için)

## Kurulum

1. Depoyu klonlayın:
   ```bash
   git clone <repo-url>
   cd medyagem-cms
   ```

2. Bağımlılıkları kurun:
   ```bash
   npm install
   ```

3. `.env` dosyasını oluşturun:
   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Veritabanını hazırlayın:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

## Çalıştırma

Geliştirme modunda başlatmak için:
```bash
npm run dev
```

Prodüksiyon build'i almak için:
```bash
npm run build
```

## Dosya Yapısı

- `src/app/(admin)/admin`: Yönetim paneli sayfaları.
- `src/app/(auth)/login`: Giriş sayfası.
- `src/app/api/admin`: Dinamik CRUD API rotaları.
- `src/components/admin`: Paneli oluşturan bileşenler (Sidebar, Header, DataTable).
- `src/lib/prisma.ts`: Prisma istemci yapılandırması.
- `prisma/schema.prisma`: Veritabanı şeması.

## Sorun Giderme

1. **Prisma Client Hatası:** `npx prisma generate` komutunu çalıştırın.
2. **Giriş Yapılamıyor:** `npx prisma db seed` ile admin kullanıcısının oluşturulduğundan emin olun.
3. **API 401 Hatası:** Oturumunuzun açık olduğundan ve `NEXTAUTH_SECRET` değişkeninin doğruluğundan emin olun.
4. **Veritabanı Bağlantısı:** `DATABASE_URL` formatını ve erişilebilirliğini kontrol edin.
5. **Tailwind Stil Sorunları:** `src/app/globals.css` dosyasının import edildiğinden emin olun.
