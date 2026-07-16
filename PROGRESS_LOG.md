# Progress Log: Golden Gate Dashboard (Admin TU)

## Ringkasan Proyek
Pengembangan modul **Admin Tata Usaha (TU)** untuk sistem informasi sekolah yang mengelola 12 fitur utama. Semua fitur dibangun menggunakan kombinasi React, Tailwind CSS, Framer Motion, dan Ant Design (jika diperlukan), dan mengikuti skema warna *brand* yang telah ditetapkan (`#23305d` untuk primer, `#d9ab3f` untuk aksen).

---

## 🟢 TAHAP 1: SELESAI (Infrastruktur & Routing)
- [x] Pemetaan struktur folder proyek (Layouts, Routers, Pages, Components).
- [x] Konfigurasi rute di `src/routers/admin-tu/admin-routers.tsx` untuk ke-12 fitur.
- [x] Pembaruan menu Dropdown `Admin` dan `Lainnya` di komponen `AdminHeader` dengan penambahan icon dari `lucide-react`.
- [x] Pembuatan 12 folder *placeholder* di dalam direktori `src/pages/admin-tu/`.

---

## 🟢 TAHAP 2: SELESAI (Implementasi Fitur Utama)
Komponen telah dibuat secara lengkap di direktori `src/components/` dan dihubungkan ke masing-masing halaman.

1. **Data Siswa (`/dashboard/students`)** ✅
   - *Lokasi:* `src/components/admin-students`
   - *Fitur:* Statistik siswa aktif/alumni, filter pencarian & kelas, tabel data dengan modal detail siswa.
2. **Data Guru (`/dashboard/teachers`)** ✅
   - *Lokasi:* `src/components/admin-data-guru`
   - *Fitur:* Menggunakan komponen *Ant Design* bawaan yang dihubungkan kembali secara rapi.
3. **Akademik (`/dashboard/academic`)** ✅
   - *Lokasi:* `src/components/admin-academic`
   - *Fitur:* Sistem navigasi Tab (Mata Pelajaran, Tahun Ajaran, Kelas).
4. **Jadwal (`/dashboard/schedule`)** ✅
   - *Lokasi:* `src/components/admin-schedule`
   - *Fitur:* Tabel jadwal pelajaran harian per-kelas lengkap dengan informasi ruangan & guru.
5. **Absensi (`/dashboard/attendance`)** ✅
   - *Lokasi:* `src/components/admin-attendance`
   - *Fitur:* Dasbor absensi harian, kartu statistik tingkat kehadiran, daftar kehadiran individual siswa.
6. **Penilaian & Raport (`/dashboard/grades`)** ✅
   - *Lokasi:* `src/components/admin-grades`
   - *Fitur:* Kalkulasi otomatis Nilai Akhir (Tugas, UTS, UAS) beserta fungsi konversi predikat (A, B, C, D).
7. **BK & Konseling (`/dashboard/counseling`)** ✅
   - *Lokasi:* `src/components/admin-counseling`
   - *Fitur:* Log pencatatan kasus konseling dan pelanggaran siswa dengan indikator status (Proses / Selesai).

---

## 🔴 TAHAP 3: BELUM SELESAI (Sisa Fitur untuk Next Session)
Fitur-fitur berikut sudah memiliki rute dan file *placeholder* kosong di `src/pages/admin-tu/`, namun komponen aslinya (UI dan fungsinya) masih harus dibangun:

1. **Prestasi (`/dashboard/achievements`)**
   - *Rencana:* Menampilkan daftar medali, piala, atau kejuaraan siswa.
2. **Pengumuman (`/dashboard/announcements`)**
   - *Rencana:* Sistem manajemen mading digital atau portal informasi internal.
3. **Arsip Dokumen (`/dashboard/archive`)**
   - *Rencana:* File manager sederhana untuk surat masuk, surat keluar, ijazah, dan dokumen legal sekolah.
4. **Laporan (`/dashboard/reports`)**
   - *Rencana:* Generator laporan (PDF/Excel) untuk statistik keuangan, akademik, atau umum.
5. **Pengaturan (`/dashboard/settings`)**
   - *Rencana:* Konfigurasi sistem (Profil Sekolah, Logo, Hak Akses, Backup Database).

---

## Instruksi untuk Agen AI Berikutnya:
Jika Anda membaca log ini, **lanjutkan pekerjaan ke Tahap 3**. Mulailah dengan membuat folder komponen untuk masing-masing modul tersebut di `src/components/` (misalnya `admin-achievements`, `admin-announcements`, dsb), buat file *index.tsx*-nya, modifikasi `src/components/index.tsx` untuk mengekspor (export) komponen tersebut, lalu panggil komponen itu dari `src/pages/admin-tu/[nama-fitur]/index.tsx`. Selalu gunakan warna `COLORS.primary` (`#23305d`) dan `COLORS.accent` (`#d9ab3f`) untuk menjaga konsistensi.
