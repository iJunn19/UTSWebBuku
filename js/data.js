/**
 * data.js - Sumber Data Dummy untuk UTS Pemrograman Web 1
 * Format: Array JSON
 */

// Konstanta Utama sesuai spesifikasi soal
const dataKatalogBuku = [
  {
    id: "BK-001",
    judul: "Filosofi Kopi & Aroma Kehidupan",
    pengarang: "Dee Lestari",
    kategori: "Sastra & Fiksi",
    penerbit: "Bentang Pustaka",
    tahun: 2021,
    harga: 85000,
    stok: 24,
    rating: 4.8,
    deskripsi: "Kumpulan cerita pendek dan refleksi mendalam seputar kopi, rasa, dan makna hidup.",
    gambar: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "BK-002",
    judul: "The World Atlas of Coffee",
    pengarang: "James Hoffmann",
    kategori: "Kuliner & Pengetahuan",
    penerbit: "Mitchell Beazley",
    tahun: 2022,
    harga: 210000,
    stok: 12,
    rating: 4.9,
    deskripsi: "Panduan definitif eksplorasi biji kopi dunia dari budidaya hingga metode seduh terbaik.",
    gambar: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "BK-003",
    judul: "Clean Code: A Handbook of Agile Software",
    pengarang: "Robert C. Martin",
    kategori: "Teknologi & IT",
    penerbit: "Prentice Hall",
    tahun: 2020,
    harga: 175000,
    stok: 18,
    rating: 4.9,
    deskripsi: "Standar industri penulisan kode program yang bersih, modular, dan mudah diuji.",
    gambar: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "BK-004",
    judul: "Atomic Habits: Perubahan Kecil yang Nyata",
    pengarang: "James Clear",
    kategori: "Pengembangan Diri",
    penerbit: "Gramedia Pustaka",
    tahun: 2023,
    harga: 108000,
    stok: 35,
    rating: 4.9,
    deskripsi: "Cara mudah dan terbukti untuk membangun kebiasaan baik serta membuang kebiasaan buruk.",
    gambar: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "BK-005",
    judul: "JavaScript Modern untuk Web Developer",
    pengarang: "Ahmad Farhan",
    kategori: "Teknologi & IT",
    penerbit: "Informatika",
    tahun: 2024,
    harga: 95000,
    stok: 20,
    rating: 4.7,
    deskripsi: "Belajar manipulasi DOM, ES6+, API Fetch, dan arsitektur web modern tanpa pusing.",
    gambar: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "BK-006",
    judul: "Seni Menikmati Hidup Lambat (Slow Living)",
    pengarang: "Brooke McAlary",
    kategori: "Gaya Hidup",
    penerbit: "Noura Books",
    tahun: 2022,
    harga: 89000,
    stok: 15,
    rating: 4.6,
    deskripsi: "Menemukan ketenangan, kesederhanaan, dan kehangatan di tengah ritme dunia yang terburu-buru.",
    gambar: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=60"
  }
];

// Data Dummy Pengiriman untuk Tracking (Delivery Order)
const dataTrackingPengiriman = [
  {
    nomorDO: "DO-2026-001",
    namaPemesan: "Budi Santoso",
    telepon: "0812-3456-7890",
    alamat: "Jl. Melati No. 12, Jakarta Selatan",
    ekspedisi: "JNE Express (Reguler)",
    jenisPaket: "Paket Buku Premium",
    tanggalKirim: "01 November 2026",
    estimasiSampai: "03 November 2026",
    totalPembayaran: 195000,
    statusKode: 3, // 1: Dikemas, 2: Dikirim, 3: Dalam Perjalanan, 4: Terkirim
    statusTeks: "Dalam Perjalanan",
    riwayat: [
      { waktu: "01 Nov 2026 09:30", lokasi: "Toko Buku Pusat", keterangan: "Pesanan telah diproses dan dikemas rapi." },
      { waktu: "01 Nov 2026 14:15", lokasi: "Drop Point Logistik", keterangan: "Paket diterima oleh agen kurir JNE." },
      { waktu: "02 Nov 2026 08:45", lokasi: "Sorting Hub Jakarta", keterangan: "Paket dalam perjalanan menuju kota tujuan." }
    ]
  },
  {
    nomorDO: "DO-2026-002",
    namaPemesan: "Siti Rahmawati",
    telepon: "0857-9876-5432",
    alamat: "Komplek Dosen Pelita Bangsa Blok C-4, Cikarang",
    ekspedisi: "SiCepat Cargo",
    jenisPaket: "Paket Koleksi Sastra",
    tanggalKirim: "02 November 2026",
    estimasiSampai: "04 November 2026",
    totalPembayaran: 295000,
    statusKode: 2,
    statusTeks: "Dikirim ke Kurir",
    riwayat: [
      { waktu: "02 Nov 2026 10:00", lokasi: "Warehouse Cikarang", keterangan: "Pesanan dikemas dengan bubble wrap tebal." },
      { waktu: "02 Nov 2026 13:20", lokasi: "Hub Logistik Cikarang", keterangan: "Paket telah diserahkan kepada kurir pengantar." }
    ]
  },
  {
    nomorDO: "DO-2026-003",
    namaPemesan: "Ahmad Rizky Pratama",
    telepon: "0813-1122-3344",
    alamat: "Gg. Kopi No. 7, Bandung Barat",
    ekspedisi: "GoSend Instant",
    jenisPaket: "Paket Kilat Kopi & Buku",
    tanggalKirim: "02 November 2026",
    estimasiSampai: "02 November 2026",
    totalPembayaran: 125000,
    statusKode: 4,
    statusTeks: "Terkirim / Selesai",
    riwayat: [
      { waktu: "02 Nov 2026 11:00", lokasi: "Kedai Buku Litera", keterangan: "Pesanan siap diambil kurir." },
      { waktu: "02 Nov 2026 12:15", lokasi: "Kurir On The Way", keterangan: "Kurir mengantar paket ke alamat penerima." },
      { waktu: "02 Nov 2026 13:00", lokasi: "Tiba di Tujuan", keterangan: "Paket berhasil diterima oleh penerima yang bersangkutan." }
    ]
  }
];

// Data Default untuk Keranjang Pemesanan (Checkout)
const dataKeranjangAwal = [
  {
    idBuku: "BK-001",
    judul: "Filosofi Kopi & Aroma Kehidupan",
    harga: 85000,
    jumlah: 1,
    gambar: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60"
  },
  {
    idBuku: "BK-003",
    judul: "Clean Code: A Handbook of Agile Software",
    harga: 175000,
    jumlah: 1,
    gambar: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60"
  }
];

// Data Dummy Akun Pengguna Terdaftar (untuk login)
const dataPengguna = [
  { email: "admin@tokobuku.com", password: "admin123", nama: "Admin Bookstore", role: "Administrator" },
  { email: "mahasiswa@pelitabangsa.ac.id", password: "mhs123", nama: "Mahasiswa Pelita Bangsa", role: "Pelanggan" },
  { email: "user@gmail.com", password: "user123", nama: "Kopi & Buku Reader", role: "Pelanggan" }
];
