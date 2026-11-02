/**
 * script.js - Logika JavaScript, Manipulasi DOM & Interaksi UI
 * Tugas UTS Pemrograman Web 1
 */

// ==========================================
// 1. HELPER & NOTIFIKASI POP-UP / ALERT BOX
// ==========================================

/**
 * Menampilkan Alert Box / Pop-up Notifikasi kustom
 * @param {string} pesan - Pesan yang akan ditampilkan
 * @param {'error'|'success'|'info'} tipe - Tipe notifikasi
 */
function tampilkanAlert(pesan, tipe = 'info') {
  // Cek apakah elemen alert box sudah ada di DOM
  let alertBox = document.getElementById('globalAlertBox');
  if (!alertBox) {
    alertBox = document.createElement('div');
    alertBox.id = 'globalAlertBox';
    alertBox.className = 'alert-popup-box';
    document.body.appendChild(alertBox);
  }

  // Tentukan icon berdasarkan tipe
  let iconSvg = '';
  if (tipe === 'error') {
    iconSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  } else if (tipe === 'success') {
    iconSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2e7d47" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
  } else {
    iconSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6f472d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  alertBox.className = `alert-popup-box show ${tipe}`;
  alertBox.innerHTML = `
    <div>${iconSvg}</div>
    <div style="flex-grow: 1;">
      <p style="font-weight: 700; font-size: 0.9rem; margin-bottom: 2px; color: #2a1810;">
        ${tipe === 'error' ? 'Peringatan!' : tipe === 'success' ? 'Berhasil!' : 'Informasi'}
      </p>
      <p style="font-size: 0.85rem; color: #5c4d44;">${pesan}</p>
    </div>
  `;

  // Auto close setelah 4 detik
  setTimeout(() => {
    alertBox.classList.remove('show');
  }, 4000);
}

/**
 * Format angka ke format mata uang Rupiah
 */
function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(angka);
}

// ==========================================
// 2. LOGIKA MODAL BOX (DAFTAR & LUPA PASSWORD)
// ==========================================

function bukaModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function tutupModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// Tutup modal ketika klik area overlay di luar modal-content
window.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// ==========================================
// 3. LOGIKA HALAMAN LOGIN (index.html / login.html)
// ==========================================

function inisialisasiHalamanLogin() {
  const loginForm = document.getElementById('formLogin');
  if (!loginForm) return;

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('inputEmail').value.trim();
    const password = document.getElementById('inputPassword').value.trim();

    // Validasi form login kosong
    if (!email || !password) {
      tampilkanAlert("Harap isi email dan password Anda!", "error");
      return;
    }

    // Cek kecocokan dengan data dummy pengguna di data.js
    const userValid = dataPengguna.find(u => u.email === email && u.password === password);

    if (userValid) {
      // Simpan session pengguna aktif di localStorage
      localStorage.setItem('userAktif', JSON.stringify(userValid));
      tampilkanAlert(`Selamat datang, ${userValid.nama}! Mengalihkan ke dashboard...`, "success");
      
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    } else {
      // Sesuai soal: "Jika salah atau tidak sesuai, munculkan pop-up/alert yang berisi bahwa 'email/password yang anda masukkan salah'"
      tampilkanAlert("email/password yang anda masukkan salah", "error");
    }
  });

  // Handler Form Registrasi (Daftar Modal)
  const formDaftar = document.getElementById('formDaftar');
  if (formDaftar) {
    formDaftar.addEventListener('submit', function(e) {
      e.preventDefault();
      const nama = document.getElementById('daftarNama').value.trim();
      const email = document.getElementById('daftarEmail').value.trim();
      const pass = document.getElementById('daftarPassword').value.trim();

      if (!nama || !email || !pass) {
        tampilkanAlert("Semua kolom pendaftaran wajib diisi!", "error");
        return;
      }

      // Tambahkan ke array data dummy
      dataPengguna.push({ email: email, password: pass, nama: nama, role: "Pelanggan" });
      tutupModal('modalDaftar');
      formDaftar.reset();
      tampilkanAlert(`Pendaftaran berhasil untuk ${nama}! Silakan login menggunakan akun baru Anda.`, "success");
    });
  }

  // Handler Form Lupa Password (Modal)
  const formLupaPassword = document.getElementById('formLupaPassword');
  if (formLupaPassword) {
    formLupaPassword.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailLupa = document.getElementById('lupaEmail').value.trim();
      if (!emailLupa) {
        tampilkanAlert("Masukkan alamat email terdaftar!", "error");
        return;
      }

      tutupModal('modalLupaPassword');
      formLupaPassword.reset();
      tampilkanAlert(`Link instruksi pemulihan kata sandi telah dikirim ke ${emailLupa}. Silakan periksa inbox Anda!`, "success");
    });
  }
}

// ==========================================
// 4. LOGIKA DASHBOARD & GREETING WAKTU
// ==========================================

function dapatkanGreetingWaktu() {
  const jam = new Date().getHours();
  if (jam >= 4 && jam < 11) {
    return "Selamat Pagi";
  } else if (jam >= 11 && jam < 15) {
    return "Selamat Siang";
  } else if (jam >= 15 && jam < 18) {
    return "Selamat Sore";
  } else {
    return "Selamat Malam";
  }
}

function inisialisasiDashboard() {
  const greetingEl = document.getElementById('userGreeting');
  const userNamaEl = document.getElementById('userNameDisplay');
  const userTimeEl = document.getElementById('currentTimeDisplay');

  // Ambil data user dari session storage atau default
  const storedUser = localStorage.getItem('userAktif');
  const user = storedUser ? JSON.parse(storedUser) : { nama: "Pembaca Setia", role: "Pelanggan" };

  if (greetingEl) {
    greetingEl.textContent = dapatkanGreetingWaktu();
  }
  if (userNamaEl) {
    userNamaEl.textContent = user.nama;
  }
  if (userTimeEl) {
    const opsi = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    userTimeEl.textContent = new Date().toLocaleDateString('id-ID', opsi);
  }
}

// ==========================================
// 5. LOGIKA STOK / KATALOG (DOM MANIPULATION)
// ==========================================

// Variabel data lokal yang bisa ditambah di runtime menggunakan DOM
let listKatalogBuku = [];

function inisialisasiHalamanStok() {
  const tabelBody = document.getElementById('tabelKatalogBody');
  if (!tabelBody) return;

  // Clone data dari konstanta dataKatalogBuku jika belum ada di localStorage
  const savedData = localStorage.getItem('katalogBukuState');
  if (savedData) {
    listKatalogBuku = JSON.parse(savedData);
    // Otomatis perbaiki URL jika masih menyimpan URL lama yang 404
    listKatalogBuku.forEach(buku => {
      if (buku.id === 'BK-003' && (buku.gambar.includes('1532012164546') || !buku.gambar)) {
        buku.gambar = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60";
      }
    });
    localStorage.setItem('katalogBukuState', JSON.stringify(listKatalogBuku));
  } else {
    listKatalogBuku = [...dataKatalogBuku];
    localStorage.setItem('katalogBukuState', JSON.stringify(listKatalogBuku));
  }

  // Render pertama kali
  renderTabelKatalog(listKatalogBuku);

  // Event listener form tambah stok baru
  const formTambahStok = document.getElementById('formTambahStok');
  if (formTambahStok) {
    formTambahStok.addEventListener('submit', function(e) {
      e.preventDefault();

      const judul = document.getElementById('inputJudul').value.trim();
      const pengarang = document.getElementById('inputPengarang').value.trim();
      const kategori = document.getElementById('inputKategori').value;
      const harga = parseInt(document.getElementById('inputHarga').value);
      const stok = parseInt(document.getElementById('inputStok').value);
      const penerbit = document.getElementById('inputPenerbit').value.trim() || 'Penerbit Pustaka';

      if (!judul || !pengarang || isNaN(harga) || isNaN(stok)) {
        tampilkanAlert("Harap lengkapi seluruh field dengan benar!", "error");
        return;
      }

      // Buat ID baru unik
      const idBaru = `BK-${String(listKatalogBuku.length + 1).padStart(3, '0')}`;

      // Buat objek data buku baru
      const bukuBaru = {
        id: idBaru,
        judul: judul,
        pengarang: pengarang,
        kategori: kategori,
        penerbit: penerbit,
        tahun: new Date().getFullYear(),
        harga: harga,
        stok: stok,
        rating: 5.0,
        deskripsi: "Buku baru ditambahkan ke dalam katalog toko.",
        gambar: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60"
      };

      // Tambahkan ke array dan simpan ke localStorage
      listKatalogBuku.unshift(bukuBaru);
      localStorage.setItem('katalogBukuState', JSON.stringify(listKatalogBuku));

      // Manipulasi DOM: render ulang tabel
      renderTabelKatalog(listKatalogBuku);

      // Reset form & tampilkan feedback
      formTambahStok.reset();
      tutupModal('modalTambahBuku');
      tampilkanAlert(`Buku "${judul}" berhasil ditambahkan ke stok!`, "success");
    });
  }

  // Event listener pencarian
  const inputSearch = document.getElementById('inputSearchBuku');
  if (inputSearch) {
    inputSearch.addEventListener('input', function(e) {
      const keyword = e.target.value.toLowerCase();
      const hasilFilter = listKatalogBuku.filter(buku => 
        buku.judul.toLowerCase().includes(keyword) ||
        buku.pengarang.toLowerCase().includes(keyword) ||
        buku.kategori.toLowerCase().includes(keyword) ||
        buku.id.toLowerCase().includes(keyword)
      );
      renderTabelKatalog(hasilFilter);
    });
  }
}

/**
 * Render baris tabel buku menggunakan manipulasi DOM
 */
function renderTabelKatalog(data) {
  const tabelBody = document.getElementById('tabelKatalogBody');
  const countBadge = document.getElementById('totalStokCount');
  if (!tabelBody) return;

  // Bersihkan tabel terlebih dahulu (DOM manipulation)
  tabelBody.innerHTML = '';

  if (countBadge) {
    countBadge.textContent = `${data.length} Judul Buku`;
  }

  if (data.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td colspan="7" style="text-align: center; padding: 2.5rem; color: #8c7e75;">
        <p style="font-weight: 600; font-size: 1rem;">Tidak ada buku yang sesuai dengan pencarian.</p>
        <p style="font-size: 0.85rem;">Coba gunakan kata kunci lain atau tambahkan stok buku baru.</p>
      </td>
    `;
    tabelBody.appendChild(tr);
    return;
  }

  // Iterasi data dan buat baris tr secara dinamis
  data.forEach((buku, index) => {
    const tr = document.createElement('tr');

    // Tentukan badge stok
    let badgeStok = '';
    if (buku.stok > 20) {
      badgeStok = `<span class="badge badge-success">${buku.stok} unit</span>`;
    } else if (buku.stok > 0) {
      badgeStok = `<span class="badge badge-warning">${buku.stok} unit</span>`;
    } else {
      badgeStok = `<span class="badge" style="background:#fee2e2; color:#991b1b;">Habis</span>`;
    }

    tr.innerHTML = `
      <td style="font-weight: 700; color: #6f472d;">${buku.id}</td>
      <td>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="${buku.gambar}" alt="${buku.judul}" onerror="this.onerror=null; this.src='img/images.svg';" style="width: 42px; height: 56px; object-fit: cover; border-radius: 4px; border: 1px solid #eadfcb;">
          <div>
            <div style="font-weight: 700; color: #2a1810;">${buku.judul}</div>
            <div style="font-size: 0.775rem; color: #8c7e75;">${buku.penerbit} (${buku.tahun})</div>
          </div>
        </div>
      </td>
      <td>${buku.pengarang}</td>
      <td><span class="badge badge-coffee">${buku.kategori}</span></td>
      <td style="font-weight: 700; color: #2a1810;">${formatRupiah(buku.harga)}</td>
      <td>${badgeStok}</td>
      <td>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn btn-outline btn-sm" onclick="tambahItemKePesanan('${buku.id}')" title="Pesan Buku Ini">
            + Pesan
          </button>
          <button class="btn btn-danger btn-sm" onclick="hapusBarisStok('${buku.id}')" title="Hapus Buku">
            Hapus
          </button>
        </div>
      </td>
    `;

    tabelBody.appendChild(tr);
  });
}

/**
 * Hapus buku dari katalog via DOM & update state
 */
function hapusBarisStok(idBuku) {
  if (confirm(`Apakah Anda yakin ingin menghapus buku ${idBuku} dari katalog?`)) {
    listKatalogBuku = listKatalogBuku.filter(b => b.id !== idBuku);
    localStorage.setItem('katalogBukuState', JSON.stringify(listKatalogBuku));
    renderTabelKatalog(listKatalogBuku);
    tampilkanAlert(`Buku ${idBuku} berhasil dihapus dari stok.`, "info");
  }
}

/**
 * Tambahkan buku langsung dari katalog ke keranjang pemesanan
 */
function tambahItemKePesanan(idBuku) {
  const buku = listKatalogBuku.find(b => b.id === idBuku);
  if (!buku) return;

  let keranjang = JSON.parse(localStorage.getItem('keranjangPemesanan') || 'null');
  if (!keranjang) {
    keranjang = [...dataKeranjangAwal];
  }

  const existing = keranjang.find(item => item.idBuku === idBuku);
  if (existing) {
    existing.jumlah += 1;
  } else {
    keranjang.push({
      idBuku: buku.id,
      judul: buku.judul,
      harga: buku.harga,
      jumlah: 1,
      gambar: buku.gambar
    });
  }

  localStorage.setItem('keranjangPemesanan', JSON.stringify(keranjang));
  tampilkanAlert(`"${buku.judul}" ditambahkan ke keranjang pesanan!`, "success");
}

// ==========================================
// 6. LOGIKA HALAMAN PEMESANAN (checkout.html)
// ==========================================

let keranjangBelanja = [];

function inisialisasiHalamanCheckout() {
  const containerItem = document.getElementById('daftarItemCheckout');
  if (!containerItem) return;

  // Muat data keranjang dari localStorage atau data default
  const savedKeranjang = localStorage.getItem('keranjangPemesanan');
  if (savedKeranjang) {
    keranjangBelanja = JSON.parse(savedKeranjang);
    keranjangBelanja.forEach(item => {
      if (item.idBuku === 'BK-003' && (item.gambar.includes('1532012164546') || !item.gambar)) {
        item.gambar = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60";
      }
    });
    localStorage.setItem('keranjangPemesanan', JSON.stringify(keranjangBelanja));
  } else {
    keranjangBelanja = [...dataKeranjangAwal];
    localStorage.setItem('keranjangPemesanan', JSON.stringify(keranjangBelanja));
  }

  renderKeranjangCheckout();

  // Handler ongkos kirim saat ganti ekspedisi
  const selectEkspedisi = document.getElementById('checkoutEkspedisi');
  if (selectEkspedisi) {
    selectEkspedisi.addEventListener('change', kalkulasiTotalCheckout);
  }

  // Handler submit pemesanan
  const formCheckout = document.getElementById('formCheckoutPesanan');
  if (formCheckout) {
    formCheckout.addEventListener('submit', function(e) {
      e.preventDefault();

      if (keranjangBelanja.length === 0) {
        tampilkanAlert("Keranjang belanja masih kosong! Silakan tambah buku terlebih dahulu.", "error");
        return;
      }

      const nama = document.getElementById('checkoutNama').value.trim();
      const telepon = document.getElementById('checkoutTelepon').value.trim();
      const alamat = document.getElementById('checkoutAlamat').value.trim();
      const ekspedisi = document.getElementById('checkoutEkspedisi').value;
      const metodeBayar = document.getElementById('checkoutPembayaran').value;

      if (!nama || !telepon || !alamat) {
        tampilkanAlert("Harap lengkapi nama pemesan, telepon, dan alamat tujuan!", "error");
        return;
      }

      // Generate Delivery Order ID Baru
      const nomorDOBaru = `DO-2026-${String(Math.floor(100 + Math.random() * 900))}`;
      const totalBayar = hitungTotalAkhir();

      // Buat objek transaksi baru untuk tracking
      const transaksiBaru = {
        nomorDO: nomorDOBaru,
        namaPemesan: nama,
        telepon: telepon,
        alamat: alamat,
        ekspedisi: ekspedisi,
        jenisPaket: "Paket Buku & Kopi",
        tanggalKirim: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
        estimasiSampai: "2-3 Hari Kerja",
        totalPembayaran: totalBayar,
        statusKode: 1, // Baru dikemas
        statusTeks: "Sedang Dikemas di Toko",
        riwayat: [
          {
            waktu: new Date().toLocaleString('id-ID'),
            lokasi: "Pustaka Coffee Hub",
            keterangan: "Pesanan berhasil dibuat dan sedang disiapkan dengan aman."
          }
        ]
      };

      // Simpan ke data tracking di localStorage
      let listTracking = JSON.parse(localStorage.getItem('dataTrackingCustom') || '[]');
      listTracking.push(transaksiBaru);
      localStorage.setItem('dataTrackingCustom', JSON.stringify(listTracking));

      // Kosongkan keranjang
      keranjangBelanja = [];
      localStorage.setItem('keranjangPemesanan', JSON.stringify(keranjangBelanja));

      // Tampilkan Modal Sukses Pemesanan
      tampilkanModalSuksesPesanan(nomorDOBaru, nama, totalBayar, ekspedisi);
    });
  }
}

/**
 * Render item belanja di tabel checkout via manipulasi DOM
 */
function renderKeranjangCheckout() {
  const container = document.getElementById('daftarItemCheckout');
  if (!container) return;

  container.innerHTML = '';

  if (keranjangBelanja.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 2rem; color: #8c7e75;">
          Keranjang belanja Anda kosong. <a href="stok.html" style="color: #6f472d; font-weight: 700;">Pilih buku di katalog &rarr;</a>
        </td>
      </tr>
    `;
    kalkulasiTotalCheckout();
    return;
  }

  keranjangBelanja.forEach((item, index) => {
    const subtotal = item.harga * item.jumlah;
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="${item.gambar}" alt="${item.judul}" onerror="this.onerror=null; this.src='img/images.svg';" style="width: 40px; height: 50px; object-fit: cover; border-radius: 4px;">
          <div>
            <div style="font-weight: 700; color: #2a1810; font-size: 0.9rem;">${item.judul}</div>
            <div style="font-size: 0.775rem; color: #8c7e75;">ID: ${item.idBuku}</div>
          </div>
        </div>
      </td>
      <td style="font-weight: 600;">${formatRupiah(item.harga)}</td>
      <td>
        <div style="display: inline-flex; align-items: center; border: 1px solid #eadfcb; border-radius: 6px; overflow: hidden;">
          <button type="button" class="btn btn-sm" style="padding: 0.2rem 0.5rem; background: #f4ede4;" onclick="ubahJumlahItem(${index}, -1)">-</button>
          <span style="padding: 0.2rem 0.75rem; font-weight: 700; min-width: 32px; text-align: center;">${item.jumlah}</span>
          <button type="button" class="btn btn-sm" style="padding: 0.2rem 0.5rem; background: #f4ede4;" onclick="ubahJumlahItem(${index}, 1)">+</button>
        </div>
      </td>
      <td style="font-weight: 700; color: #2a1810;">${formatRupiah(subtotal)}</td>
      <td>
        <button type="button" class="btn btn-sm btn-outline" style="color: #b91c1c; border-color: #fee2e2;" onclick="hapusItemCheckout(${index})">
          &times;
        </button>
      </td>
    `;

    container.appendChild(tr);
  });

  kalkulasiTotalCheckout();
}

function ubahJumlahItem(index, delta) {
  if (keranjangBelanja[index]) {
    keranjangBelanja[index].jumlah += delta;
    if (keranjangBelanja[index].jumlah <= 0) {
      keranjangBelanja.splice(index, 1);
    }
    localStorage.setItem('keranjangPemesanan', JSON.stringify(keranjangBelanja));
    renderKeranjangCheckout();
  }
}

function hapusItemCheckout(index) {
  keranjangBelanja.splice(index, 1);
  localStorage.setItem('keranjangPemesanan', JSON.stringify(keranjangBelanja));
  renderKeranjangCheckout();
  tampilkanAlert("Item dihapus dari keranjang pesanan.", "info");
}

function kalkulasiTotalCheckout() {
  const subtotalEl = document.getElementById('checkoutSubtotal');
  const ongkirEl = document.getElementById('checkoutOngkir');
  const totalEl = document.getElementById('checkoutTotalAkhir');
  const selectEkspedisi = document.getElementById('checkoutEkspedisi');

  const subtotal = keranjangBelanja.reduce((acc, curr) => acc + (curr.harga * curr.jumlah), 0);
  
  let ongkir = 15000; // default Reguler
  if (selectEkspedisi) {
    if (selectEkspedisi.value.includes('Express') || selectEkspedisi.value.includes('Instant')) {
      ongkir = 25000;
    } else if (selectEkspedisi.value.includes('Kargo')) {
      ongkir = 12000;
    }
  }

  const grandTotal = subtotal > 0 ? (subtotal + ongkir) : 0;

  if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);
  if (ongkirEl) ongkirEl.textContent = formatRupiah(subtotal > 0 ? ongkir : 0);
  if (totalEl) totalEl.textContent = formatRupiah(grandTotal);

  return grandTotal;
}

function hitungTotalAkhir() {
  const subtotal = keranjangBelanja.reduce((acc, curr) => acc + (curr.harga * curr.jumlah), 0);
  const selectEkspedisi = document.getElementById('checkoutEkspedisi');
  let ongkir = 15000;
  if (selectEkspedisi && (selectEkspedisi.value.includes('Express') || selectEkspedisi.value.includes('Instant'))) {
    ongkir = 25000;
  }
  return subtotal + ongkir;
}

function tampilkanModalSuksesPesanan(nomorDO, nama, total, ekspedisi) {
  const modalEl = document.getElementById('modalSuksesPesanan');
  const modalDetailEl = document.getElementById('modalSuksesDetail');

  if (modalDetailEl) {
    modalDetailEl.innerHTML = `
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: #eaf6ee; color: #2e7d47; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 0.75rem;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h3 style="color: #2a1810; margin-bottom: 0.35rem;">Pemesanan Berhasil Dibuat!</h3>
        <p style="font-size: 0.875rem;">Terima kasih <strong>${nama}</strong>, pesanan Anda telah tercatat dalam sistem.</p>
      </div>

      <div style="background-color: #fbf8f5; border: 1px dashed #eadfcb; border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span style="font-size: 0.85rem; color: #8c7e75;">Nomor Delivery Order (DO):</span>
          <span style="font-weight: 800; color: #6f472d; font-size: 1.05rem;">${nomorDO}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span style="font-size: 0.85rem; color: #8c7e75;">Jasa Ekspedisi:</span>
          <span style="font-weight: 600;">${ekspedisi}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="font-size: 0.85rem; color: #8c7e75;">Total Pembayaran:</span>
          <span style="font-weight: 800; color: #2a1810;">${formatRupiah(total)}</span>
        </div>
      </div>

      <p style="font-size: 0.825rem; color: #8c7e75; text-align: center; margin-bottom: 1.25rem;">
        Simpan nomor DO di atas untuk melacak perjalanan paket buku Anda pada menu Tracking Pengiriman.
      </p>

      <div style="display: flex; gap: 0.75rem;">
        <a href="tracking.html?do=${nomorDO}" class="btn btn-primary btn-full">
          Lacak Pengiriman Sekarang &rarr;
        </a>
      </div>
    `;
  }

  if (modalEl) {
    modalEl.classList.add('active');
  }
}

// ==========================================
// 7. LOGIKA TRACKING PENGIRIMAN (tracking.html)
// ==========================================

function inisialisasiHalamanTracking() {
  const formTracking = document.getElementById('formTrackingDO');
  const hasilTracking = document.getElementById('hasilTracking');
  if (!formTracking) return;

  // Cek apakah ada query param ?do=DO-2026-xxx dari redirect checkout
  const urlParams = new URLSearchParams(window.location.search);
  const doFromUrl = urlParams.get('do');
  if (doFromUrl) {
    const inputDO = document.getElementById('inputNomorDO');
    if (inputDO) inputDO.value = doFromUrl;
    lakukanPencarianDO(doFromUrl);
  }

  formTracking.addEventListener('submit', function(e) {
    e.preventDefault();
    const nomorDO = document.getElementById('inputNomorDO').value.trim();
    if (!nomorDO) {
      tampilkanAlert("Harap masukkan nomor Delivery Order!", "error");
      return;
    }
    lakukanPencarianDO(nomorDO);
  });
}

function lakukanPencarianDO(nomorDO) {
  const hasilContainer = document.getElementById('hasilTracking');
  if (!hasilContainer) return;

  // Gabungkan data dummy default dengan transaksi baru dari localStorage
  const customList = JSON.parse(localStorage.getItem('dataTrackingCustom') || '[]');
  const gabunganData = [...customList, ...dataTrackingPengiriman];

  // Cari case-insensitive
  const dataOrder = gabunganData.find(item => item.nomorDO.toLowerCase() === nomorDO.toLowerCase());

  if (!dataOrder) {
    hasilContainer.style.display = 'block';
    hasilContainer.innerHTML = `
      <div class="card" style="text-align: center; padding: 3rem 1.5rem;">
        <div style="width: 50px; height: 50px; border-radius: 50%; background: #fee2e2; color: #b91c1c; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        </div>
        <h3 style="color: #2a1810; margin-bottom: 0.5rem;">Nomor Delivery Order Tidak Ditemukan</h3>
        <p style="font-size: 0.9rem; max-width: 450px; margin: 0 auto 1.5rem;">
          Nomor DO <strong>"${nomorDO}"</strong> tidak terdaftar di sistem kami. Pastikan format nomor benar (Contoh: DO-2026-001, DO-2026-002, DO-2026-003).
        </p>
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('inputNomorDO').focus()">
          Coba Cari Lagi
        </button>
      </div>
    `;
    tampilkanAlert("Nomor Delivery Order tidak ditemukan!", "error");
    return;
  }

  // Tentukan progress bar percentage
  let progressPct = '25%';
  if (dataOrder.statusKode === 2) progressPct = '50%';
  if (dataOrder.statusKode === 3) progressPct = '75%';
  if (dataOrder.statusKode === 4) progressPct = '100%';

  // Render hasil DOM tracking sesuai spesifikasi soal:
  // - Nama Pemesan
  // - Status Pengiriman (disimulasikan dengan progress bar, warna, tabel/list)
  // - Detail ekspedisi, tanggal kirim, jenis paket, total pembayaran
  hasilContainer.style.display = 'block';
  hasilContainer.innerHTML = `
    <div class="card" style="margin-top: 1.5rem;">
      <div class="card-header">
        <div>
          <span class="badge badge-coffee" style="margin-bottom: 0.35rem;">Nomor DO: ${dataOrder.nomorDO}</span>
          <h2 style="font-size: 1.35rem; color: #2a1810;">Tracking Pengiriman: ${dataOrder.namaPemesan}</h2>
        </div>
        <div>
          <span class="badge ${dataOrder.statusKode === 4 ? 'badge-success' : 'badge-warning'}" style="font-size: 0.85rem; padding: 0.4rem 0.85rem;">
            ${dataOrder.statusTeks}
          </span>
        </div>
      </div>

      <!-- Stepper Visual Progress Bar -->
      <div class="tracking-stepper">
        <div class="tracking-stepper-progress" style="width: ${progressPct};"></div>
        
        <div class="step-item ${dataOrder.statusKode >= 1 ? 'completed active' : ''}">
          <div class="step-circle">1</div>
          <div class="step-label">Dikemas</div>
        </div>
        <div class="step-item ${dataOrder.statusKode >= 2 ? 'completed active' : ''}">
          <div class="step-circle">2</div>
          <div class="step-label">Diserahkan ke Kurir</div>
        </div>
        <div class="step-item ${dataOrder.statusKode >= 3 ? 'completed active' : ''}">
          <div class="step-circle">3</div>
          <div class="step-label">Dalam Perjalanan</div>
        </div>
        <div class="step-item ${dataOrder.statusKode >= 4 ? 'completed active' : ''}">
          <div class="step-circle">4</div>
          <div class="step-label">Terkirim</div>
        </div>
      </div>

      <!-- Detail Info Grid -->
      <div class="grid-2" style="background-color: #fbf8f5; border: 1px solid #eadfcb; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <div>
          <p style="font-size: 0.8rem; color: #8c7e75; margin-bottom: 2px;">NAMA PEMESAN</p>
          <p style="font-weight: 700; color: #2a1810; font-size: 1.05rem; margin-bottom: 0.85rem;">${dataOrder.namaPemesan}</p>

          <p style="font-size: 0.8rem; color: #8c7e75; margin-bottom: 2px;">TELEPON & ALAMAT</p>
          <p style="font-size: 0.9rem; color: #5c4d44; margin-bottom: 0.85rem;">
            ${dataOrder.telepon || '-'}<br>
            ${dataOrder.alamat || 'Alamat Penerima'}
          </p>

          <p style="font-size: 0.8rem; color: #8c7e75; margin-bottom: 2px;">JENIS PAKET</p>
          <p style="font-weight: 600; color: #2a1810;">${dataOrder.jenisPaket}</p>
        </div>

        <div>
          <p style="font-size: 0.8rem; color: #8c7e75; margin-bottom: 2px;">EKSPEDISI & PENGIRIMAN</p>
          <p style="font-weight: 700; color: #6f472d; font-size: 1rem; margin-bottom: 0.85rem;">${dataOrder.ekspedisi}</p>

          <p style="font-size: 0.8rem; color: #8c7e75; margin-bottom: 2px;">TANGGAL KIRIM & ESTIMASI</p>
          <p style="font-size: 0.9rem; color: #5c4d44; margin-bottom: 0.85rem;">
            Kirim: <strong>${dataOrder.tanggalKirim}</strong><br>
            Estimasi Tiba: <strong>${dataOrder.estimasiSampai || 'Sesuai Layanan'}</strong>
          </p>

          <p style="font-size: 0.8rem; color: #8c7e75; margin-bottom: 2px;">TOTAL PEMBAYARAN</p>
          <p style="font-weight: 800; color: #2a1810; font-size: 1.2rem;">${formatRupiah(dataOrder.totalPembayaran)}</p>
        </div>
      </div>

      <!-- Riwayat Perjalanan Paket -->
      <h4 style="font-size: 1rem; color: #2a1810; margin-bottom: 0.75rem;">Log Riwayat Perjalanan</h4>
      <div class="table-responsive">
        <table class="table-custom">
          <thead>
            <tr>
              <th>Waktu</th>
              <th>Lokasi</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            ${(dataOrder.riwayat || []).map(r => `
              <tr>
                <td style="font-weight: 600; white-space: nowrap;">${r.waktu}</td>
                <td style="color: #6f472d; font-weight: 600;">${r.lokasi}</td>
                <td>${r.keterangan}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  tampilkanAlert(`Data pengiriman untuk ${dataOrder.nomorDO} berhasil dimuat.`, "success");
}

// ==========================================
// 8. LOGOUT & GLOBAL INITIALIZATION
// ==========================================

function logoutUser() {
  if (confirm("Apakah Anda yakin ingin keluar?")) {
    localStorage.removeItem('userAktif');
    window.location.href = 'index.html';
  }
}

// Inisialisasi DOM sesuai halaman yang sedang aktif
document.addEventListener('DOMContentLoaded', function() {
  inisialisasiHalamanLogin();
  inisialisasiDashboard();
  inisialisasiHalamanStok();
  inisialisasiHalamanCheckout();
  inisialisasiHalamanTracking();

  // Mobile navbar toggle
  const navToggle = document.getElementById('navToggleBtn');
  const navMenu = document.getElementById('mainNavMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('show');
    });
  }
});
