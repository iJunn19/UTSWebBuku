# ☕ PustakaKopi - Sistem Manajemen Toko Buku & Kopi

> **Proyek Ujian Tengah Semester (UTS) Pemrograman Web 1**  
> **Universitas Pelita Bangsa** | Tahun Ajaran 2026/2027

**PustakaKopi** adalah aplikasi web interaktif berbasis _Client-Side JavaScript_ yang dirancang untuk mengelola katalog stok buku, memproses pemesanan online, serta melacak status pengiriman berdasarkan nomor _Delivery Order_ (DO).

---

## 📌 Fitur Utama

- **Authentication & Modal System:**
  - Halaman Login interaktif dengan pengujian akun demo.
  - Pop-up modal box untuk **Daftar Akun Baru** dan **Lupa Password**.
- **Dashboard Terpadu:**
  - Dynamic _greeting banner_ berdasarkan waktu lokal pengguna (_Local Time_).
  - Akses cepat ke Pusat Kendali Aplikasi (Katalog Stok, Tracking DO, Laporan Pemesanan, dan History Transaksi).
  - Preview koleksi buku terpopuler.
- **Manajemen Inventaris & Stok Buku:**
  - Tampilan katalog dinamis dari _state_ JavaScript.
  - Pencarian (_real-time search_) berdasarkan judul, pengarang, atau ID buku.
  - Modal form untuk **Tambah Stok Buku Baru** secara instan melalui manipulasi DOM.
- **Form Pemesanan & Checkout:**
  - Rincian item pesanan interaktif (ubah jumlah & hapus item).
  - Kalkulasi otomatis untuk Subtotal, Ongkos Pengiriman, dan Total Pembayaran.
  - Input data pemesan, pilihan ekspedisi, dan metode pembayaran.
  - Penjanaan otomatis nomor _Delivery Order_ (DO) baru setelah konfirmasi pesanan.
- **Tracking Delivery Order (DO):**
  - Pelacakan status pengiriman ekspedisi real-time berbasis nomor DO.
  - _Timeline status_ visual (Dalam Perjalanan, Dikirim Kurir, Selesai).
  - _Chip shortcut_ sampel nomor DO untuk pengujian cepat.

---

## 🛠️ Tech Stack & Arsitektur

- **Frontend Core:** HTML5, CSS3 (Custom Properties & Responsive Grid/Flexbox), JavaScript (Vanilla JS / ES6+)
- **Data Persistence:** Local State & Dynamic DOM Rendering (`js/data.js` & `js/script.js`)
- **UI Components:** Preline E-commerce Style & Custom Modal Boxes

---

## 📂 Struktur File Projek

```text
.
├── index.html          # Halaman Utama / Login Portal
├── login.html          # Alternatif Entry Point Login
├── dashboard.html      # Dashboard Utama & Pusat Kendali
├── stok.html           # Informasi Stok & Katalog Buku (Manajemen Inventaris)
├── checkout.html       # Form Pemesanan & Ringkasan Checkout
├── tracking.html       # Fitur Lacak Pengiriman Delivery Order (DO)
├── css/
│   └── style.css       # Style Utama & Variabel CSS
└── js/
    ├── data.js         # Dummy Data Katalog & Database State Lokal
    └── script.js       # Logika Interaktif, DOM Manipulation, & Event Handling
```
