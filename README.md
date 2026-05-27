# AI FAQ System

## Deskripsi Singkat

Aplikasi FAQ AI berbasis Next.js dengan integrasi Google Gemini dan Firebase. Pengguna dapat mengirim pertanyaan, lalu sistem membuat jawaban otomatis menggunakan model AI dan menyimpan data pertanyaan di Firestore.

## Setup & Jalankan Lokal

1. Clone repository ke mesin lokal:
   ```bash
   git clone <repo-url>
   cd ai-faq-system
   ```

````
2. Install dependensi:
   ```bash
npm install
````

3. Buat file `.env.local` di root proyek dengan variabel berikut:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin_password
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   ```

````
4. Jalankan development server:
   ```bash
npm run dev
````

5. Buka `http://localhost:3000`

> Catatan: login admin menggunakan `ADMIN_EMAIL` dan `ADMIN_PASSWORD` di API route `src/app/api/login/route.js`.

## Stack yang Dipakai

- `Next.js 16.2.6`
  - App Router modern, API route serverless, dan rendering campuran.
- `React 19.2.4`
  - UI interaktif dan state management ringan.
- `Tailwind CSS v4`
  - Styling utility-first cepat dan konsisten.
- `Firebase` (`firebase` SDK)
  - Firestore untuk simpan pertanyaan, update realtime, dan dashboard admin.
- `@google/genai`
  - Integrasi Google Gemini untuk generate jawaban AI.
- `next-themes`
  - Theme toggle / dark mode.
- `lucide-react`, `react-hot-toast`, `uuid`
  - Icon, notifikasi, dan ID unik.

## Komponen AI di Proyek

- `src/lib/gemini.js`
  - Menghubungkan ke Google Gemini menggunakan `process.env.GEMINI_API_KEY`.
  - Fungsi `generateAnswer(question)` membuat prompt dan memanggil `ai.models.generateContent()`.
- `src/app/api/questions/route.js`
  - Menerima pertanyaan dari UI, memanggil `generateAnswer()`, lalu menyimpan ke Firestore.
- `src/app/api/ai/route.js`
  - Digunakan ulang untuk generate jawaban AI saat admin ingin buat ulang draft jawaban.

## AI Tools yang Digunakan untuk Develop

- `GitHub Copilot` / asisten AI di VS Code
  - Membantu memahami struktur proyek, membuat perubahan, dan menulis dokumentasi.
- `Google Gemini` via library `@google/genai`
  - Digunakan sebagai mesin generasi teks untuk jawaban FAQ otomatis.
- `ChatGPT-style reasoning`
  - Digunakan untuk menganalisis alur data, menilai integrasi, dan menyarankan perbaikan.

## Hal yang Bisa Diimprove

- Tambahkan autentikasi admin yang lebih aman (JWT, Firebase Auth, atau NextAuth).
- Tambahkan proteksi route dan otorisasi untuk dashboard admin.
- Perbaiki prompt engineering Gemini agar jawaban lebih kontekstual dan relevan.
- Tambahkan caching atau history agar tidak memanggil AI terus-menerus untuk pertanyaan serupa.
- Tambahkan sistem feedback pengguna agar jawaban AI bisa divalidasi dan ditingkatkan.
- Lengkapi dokumentasi `.env.example`, testing, dan pipeline deployment.
- Perbaiki UI/UX dashboard, search, pagination, dan responsivitas mobile.

## Challenge yang Dihadapi & Cara Mengatasinya

- Variabel environment Firebase dan Gemini harus dipisah.
  - Solusi: gunakan `.env.local` dan `NEXT_PUBLIC_...` untuk variabel client-side Firebase.
- Integrasi AI harus tahan error.
  - Solusi: tangani exception di `src/lib/gemini.js` dan sediakan fallback jawaban jika API gagal.
- Login admin masih sederhana.
  - Solusi: gunakan env credential di `src/app/api/login/route.js`, tetapi rekomendasi perbaikan tetap diperlukan.
- Data realtime di dashboard.
  - Solusi: gunakan Firestore `onSnapshot` di halaman admin untuk update instan.

## Cara Build & Deploy

- Build produksi:
  ```bash
  npm run build
  ```

````
- Jalankan produksi lokal:
  ```bash
npm start
````

## Struktur Utama Folder

- `src/app/`
  - Halaman publik dan admin.
- `src/app/api/`
  - Endpoint serverless untuk login, pertanyaan, dan AI.
- `src/lib/`
  - `firebase.js` dan `gemini.js` untuk integrasi backend.
