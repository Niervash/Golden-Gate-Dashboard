-- =====================================================
-- SISTEM MANAJEMEN SEKOLAH - DATABASE SCHEMA
-- Complete SQL with Sample Data
-- =====================================================

-- =====================================================
-- 1. ENUM TYPES
-- =====================================================

-- User roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'kepsek', 'guru', 'siswa');

-- Gender enum
CREATE TYPE public.gender AS ENUM ('L', 'P');

-- Status enum
CREATE TYPE public.status_aktif AS ENUM ('aktif', 'cuti', 'mutasi', 'alumni', 'pensiun');

-- Event type enum
CREATE TYPE public.event_type AS ENUM ('akademik', 'libur', 'kegiatan', 'ujian');

-- =====================================================
-- 2. USER ROLES TABLE (Security)
-- =====================================================

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- =====================================================
-- 3. PROFILES TABLE
-- =====================================================

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nama_lengkap VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar_url TEXT,
    telepon VARCHAR(20),
    alamat TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 4. MATA PELAJARAN (Subjects)
-- =====================================================

CREATE TABLE public.mata_pelajaran (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kode_mapel VARCHAR(10) UNIQUE NOT NULL,
    nama_mapel VARCHAR(100) NOT NULL,
    kelompok VARCHAR(50), -- Wajib A, Wajib B, Peminatan, etc.
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 5. KELAS (Classes)
-- =====================================================

CREATE TABLE public.kelas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama_kelas VARCHAR(20) NOT NULL, -- X-A, XI-IPA-1, etc.
    tingkat INT NOT NULL CHECK (tingkat BETWEEN 10 AND 12), -- 10, 11, 12
    jurusan VARCHAR(20), -- IPA, IPS, null for grade 10
    tahun_ajaran VARCHAR(9) NOT NULL, -- 2024/2025
    kapasitas INT DEFAULT 36,
    wali_kelas_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 6. GURU (Teachers)
-- =====================================================

CREATE TABLE public.guru (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    nip VARCHAR(20) UNIQUE NOT NULL,
    nama_lengkap VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telepon VARCHAR(20),
    jenis_kelamin gender,
    tempat_lahir VARCHAR(100),
    tanggal_lahir DATE,
    alamat TEXT,
    foto_url TEXT,
    jabatan VARCHAR(100) DEFAULT 'Guru',
    status status_aktif DEFAULT 'aktif',
    tanggal_bergabung DATE,
    pendidikan_terakhir VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Junction table for guru-mapel (many-to-many)
CREATE TABLE public.guru_mapel (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guru_id UUID REFERENCES public.guru(id) ON DELETE CASCADE,
    mapel_id UUID REFERENCES public.mata_pelajaran(id) ON DELETE CASCADE,
    beban_mengajar INT DEFAULT 0, -- jam per minggu
    UNIQUE (guru_id, mapel_id)
);

-- Add foreign key for wali_kelas after guru table exists
ALTER TABLE public.kelas ADD CONSTRAINT fk_wali_kelas 
    FOREIGN KEY (wali_kelas_id) REFERENCES public.guru(id) ON DELETE SET NULL;

-- =====================================================
-- 7. SISWA (Students)
-- =====================================================

CREATE TABLE public.siswa (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    nisn VARCHAR(10) UNIQUE NOT NULL,
    nis VARCHAR(20) UNIQUE,
    nama_lengkap VARCHAR(255) NOT NULL,
    jenis_kelamin gender NOT NULL,
    tempat_lahir VARCHAR(100),
    tanggal_lahir DATE,
    agama VARCHAR(20),
    alamat TEXT,
    telepon VARCHAR(20),
    email VARCHAR(255),
    foto_url TEXT,
    nama_ayah VARCHAR(255),
    nama_ibu VARCHAR(255),
    nama_wali VARCHAR(255),
    telepon_wali VARCHAR(20),
    kelas_id UUID REFERENCES public.kelas(id) ON DELETE SET NULL,
    status status_aktif DEFAULT 'aktif',
    tahun_masuk INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 8. NILAI (Grades)
-- =====================================================

CREATE TABLE public.nilai (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id UUID REFERENCES public.siswa(id) ON DELETE CASCADE NOT NULL,
    mapel_id UUID REFERENCES public.mata_pelajaran(id) ON DELETE CASCADE NOT NULL,
    kelas_id UUID REFERENCES public.kelas(id) ON DELETE CASCADE NOT NULL,
    semester INT CHECK (semester IN (1, 2)) NOT NULL,
    tahun_ajaran VARCHAR(9) NOT NULL,
    nilai_tugas DECIMAL(5,2),
    nilai_uts DECIMAL(5,2),
    nilai_uas DECIMAL(5,2),
    nilai_praktik DECIMAL(5,2),
    nilai_akhir DECIMAL(5,2),
    predikat CHAR(1), -- A, B, C, D, E
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (siswa_id, mapel_id, kelas_id, semester, tahun_ajaran)
);

-- =====================================================
-- 9. ABSENSI (Attendance)
-- =====================================================

CREATE TABLE public.absensi (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id UUID REFERENCES public.siswa(id) ON DELETE CASCADE NOT NULL,
    tanggal DATE NOT NULL,
    status VARCHAR(10) CHECK (status IN ('hadir', 'izin', 'sakit', 'alpha')) NOT NULL,
    keterangan TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (siswa_id, tanggal)
);

-- =====================================================
-- 10. FASILITAS (Facilities Gallery)
-- =====================================================

CREATE TABLE public.fasilitas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    foto_url TEXT NOT NULL,
    kategori VARCHAR(50), -- Ruang Kelas, Laboratorium, Olahraga, etc.
    urutan INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 11. EKSTRAKURIKULER (Extracurricular)
-- =====================================================

CREATE TABLE public.ekstrakurikuler (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    foto_url TEXT,
    pembina VARCHAR(255),
    hari_latihan VARCHAR(50),
    jam_latihan VARCHAR(20),
    lokasi VARCHAR(100),
    kuota INT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Junction table for siswa-ekskul
CREATE TABLE public.siswa_ekskul (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id UUID REFERENCES public.siswa(id) ON DELETE CASCADE,
    ekskul_id UUID REFERENCES public.ekstrakurikuler(id) ON DELETE CASCADE,
    tahun_ajaran VARCHAR(9) NOT NULL,
    UNIQUE (siswa_id, ekskul_id, tahun_ajaran)
);

-- =====================================================
-- 12. PRESTASI (Achievements)
-- =====================================================

CREATE TABLE public.prestasi (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id UUID REFERENCES public.siswa(id) ON DELETE SET NULL,
    nama_siswa VARCHAR(255) NOT NULL, -- in case siswa deleted
    nama_prestasi VARCHAR(255) NOT NULL,
    jenis_lomba VARCHAR(100) NOT NULL,
    tingkat VARCHAR(50) NOT NULL, -- Sekolah, Kota, Provinsi, Nasional, Internasional
    peringkat VARCHAR(50), -- Juara 1, Juara 2, etc.
    penyelenggara VARCHAR(255),
    tanggal DATE,
    foto_url TEXT,
    deskripsi TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 13. KALENDER KEGIATAN (School Calendar Events)
-- =====================================================

CREATE TABLE public.kalender_kegiatan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    judul VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    tanggal_mulai DATE NOT NULL,
    tanggal_selesai DATE,
    waktu_mulai TIME,
    waktu_selesai TIME,
    lokasi VARCHAR(255),
    tipe event_type DEFAULT 'kegiatan',
    is_all_day BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 14. TESTIMONI (Testimonials)
-- =====================================================

CREATE TABLE public.testimoni (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama VARCHAR(255) NOT NULL,
    jabatan VARCHAR(100), -- Alumni, Orang Tua, Guru, etc.
    foto_url TEXT,
    isi_testimoni TEXT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5) DEFAULT 5,
    is_active BOOLEAN DEFAULT true,
    urutan INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 15. BERITA & KEGIATAN (News & Activities)
-- =====================================================

CREATE TABLE public.berita (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    judul VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    ringkasan TEXT,
    konten TEXT NOT NULL,
    foto_url TEXT,
    kategori VARCHAR(50), -- Akademik, Olahraga, Seni, Kegiatan, etc.
    penulis VARCHAR(255),
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    tanggal_publish TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 16. SUPERVISI GURU (Teacher Supervision)
-- =====================================================

CREATE TABLE public.supervisi_guru (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guru_id UUID REFERENCES public.guru(id) ON DELETE CASCADE NOT NULL,
    tanggal_supervisi DATE NOT NULL,
    supervisor VARCHAR(255), -- Nama kepala sekolah/pengawas
    aspek_pedagogik DECIMAL(5,2),
    aspek_profesional DECIMAL(5,2),
    aspek_kepribadian DECIMAL(5,2),
    aspek_sosial DECIMAL(5,2),
    nilai_total DECIMAL(5,2),
    catatan TEXT,
    rekomendasi TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 17. KINERJA GURU (Teacher Performance)
-- =====================================================

CREATE TABLE public.kinerja_guru (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guru_id UUID REFERENCES public.guru(id) ON DELETE CASCADE NOT NULL,
    periode VARCHAR(20) NOT NULL, -- Semester 1 2024/2025
    kehadiran DECIMAL(5,2), -- persentase
    ketepatan_waktu DECIMAL(5,2),
    kelengkapan_administrasi DECIMAL(5,2),
    kualitas_mengajar DECIMAL(5,2),
    partisipasi_kegiatan DECIMAL(5,2),
    nilai_rata_rata DECIMAL(5,2),
    predikat VARCHAR(20), -- Sangat Baik, Baik, Cukup, Kurang
    catatan TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (guru_id, periode)
);

-- =====================================================
-- 18. PENGUMUMAN (Announcements)
-- =====================================================

CREATE TABLE public.pengumuman (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    judul VARCHAR(255) NOT NULL,
    isi TEXT NOT NULL,
    prioritas VARCHAR(20) DEFAULT 'normal', -- urgent, normal, low
    target_audience VARCHAR(50)[], -- ['guru', 'siswa', 'wali']
    tanggal_mulai DATE DEFAULT CURRENT_DATE,
    tanggal_selesai DATE,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SAMPLE DATA
-- =====================================================

-- Mata Pelajaran
INSERT INTO public.mata_pelajaran (id, kode_mapel, nama_mapel, kelompok) VALUES
('11111111-1111-1111-1111-111111111101', 'MTK', 'Matematika', 'Wajib A'),
('11111111-1111-1111-1111-111111111102', 'BIN', 'Bahasa Indonesia', 'Wajib A'),
('11111111-1111-1111-1111-111111111103', 'BIG', 'Bahasa Inggris', 'Wajib A'),
('11111111-1111-1111-1111-111111111104', 'FIS', 'Fisika', 'Peminatan IPA'),
('11111111-1111-1111-1111-111111111105', 'KIM', 'Kimia', 'Peminatan IPA'),
('11111111-1111-1111-1111-111111111106', 'BIO', 'Biologi', 'Peminatan IPA'),
('11111111-1111-1111-1111-111111111107', 'EKO', 'Ekonomi', 'Peminatan IPS'),
('11111111-1111-1111-1111-111111111108', 'GEO', 'Geografi', 'Peminatan IPS'),
('11111111-1111-1111-1111-111111111109', 'SEJ', 'Sejarah', 'Peminatan IPS'),
('11111111-1111-1111-1111-111111111110', 'INF', 'Informatika', 'Wajib B'),
('11111111-1111-1111-1111-111111111111', 'PJK', 'Pendidikan Jasmani', 'Wajib B'),
('11111111-1111-1111-1111-111111111112', 'SBD', 'Seni Budaya', 'Wajib B');

-- Kelas
INSERT INTO public.kelas (id, nama_kelas, tingkat, jurusan, tahun_ajaran, kapasitas) VALUES
('22222222-2222-2222-2222-222222222201', 'X-A', 10, NULL, '2024/2025', 36),
('22222222-2222-2222-2222-222222222202', 'X-B', 10, NULL, '2024/2025', 36),
('22222222-2222-2222-2222-222222222203', 'XI-IPA-1', 11, 'IPA', '2024/2025', 36),
('22222222-2222-2222-2222-222222222204', 'XI-IPA-2', 11, 'IPA', '2024/2025', 36),
('22222222-2222-2222-2222-222222222205', 'XI-IPS-1', 11, 'IPS', '2024/2025', 36),
('22222222-2222-2222-2222-222222222206', 'XII-IPA-1', 12, 'IPA', '2024/2025', 36),
('22222222-2222-2222-2222-222222222207', 'XII-IPA-2', 12, 'IPA', '2024/2025', 36),
('22222222-2222-2222-2222-222222222208', 'XII-IPS-1', 12, 'IPS', '2024/2025', 36);

-- Guru
INSERT INTO public.guru (id, nip, nama_lengkap, email, telepon, jenis_kelamin, jabatan, status, pendidikan_terakhir) VALUES
('33333333-3333-3333-3333-333333333301', '198501152010011001', 'Dr. Ahmad Suryadi, M.Pd', 'ahmad.suryadi@smanusantara.sch.id', '081234567890', 'L', 'Kepala Sekolah', 'aktif', 'S3 Pendidikan'),
('33333333-3333-3333-3333-333333333302', '198702202011012002', 'Dra. Siti Nurhaliza, M.M', 'siti.nurhaliza@smanusantara.sch.id', '081234567891', 'P', 'Wakil Kepala Sekolah', 'aktif', 'S2 Manajemen'),
('33333333-3333-3333-3333-333333333303', '199003152012011003', 'Budi Santoso, S.Pd', 'budi.santoso@smanusantara.sch.id', '081234567892', 'L', 'Wali Kelas XII IPA 1', 'aktif', 'S1 Pendidikan Fisika'),
('33333333-3333-3333-3333-333333333304', '198805102013012004', 'Dewi Anggraini, S.Pd', 'dewi.anggraini@smanusantara.sch.id', '081234567893', 'P', 'Guru', 'aktif', 'S1 Pendidikan Kimia'),
('33333333-3333-3333-3333-333333333305', '199108252014011005', 'Rizky Pratama, S.Pd', 'rizky.pratama@smanusantara.sch.id', '081234567894', 'L', 'Wali Kelas XI IPA 2', 'aktif', 'S1 Pendidikan Biologi'),
('33333333-3333-3333-3333-333333333306', '198604152015012006', 'Nur Aini, S.Pd', 'nur.aini@smanusantara.sch.id', '081234567895', 'P', 'Koordinator BK', 'aktif', 'S1 Bimbingan Konseling'),
('33333333-3333-3333-3333-333333333307', '199205102016011007', 'Agus Setiawan, S.Kom', 'agus.setiawan@smanusantara.sch.id', '081234567896', 'L', 'Guru', 'cuti', 'S1 Teknik Informatika'),
('33333333-3333-3333-3333-333333333308', '198909152017012008', 'Rina Wulandari, S.Pd', 'rina.wulandari@smanusantara.sch.id', '081234567897', 'P', 'Wali Kelas X IPS 1', 'aktif', 'S1 Pendidikan Ekonomi');

-- Guru Mapel (junction)
INSERT INTO public.guru_mapel (guru_id, mapel_id, beban_mengajar) VALUES
('33333333-3333-3333-3333-333333333301', '11111111-1111-1111-1111-111111111101', 12),
('33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111102', 18),
('33333333-3333-3333-3333-333333333303', '11111111-1111-1111-1111-111111111104', 24),
('33333333-3333-3333-3333-333333333304', '11111111-1111-1111-1111-111111111105', 24),
('33333333-3333-3333-3333-333333333305', '11111111-1111-1111-1111-111111111106', 22),
('33333333-3333-3333-3333-333333333306', '11111111-1111-1111-1111-111111111103', 20),
('33333333-3333-3333-3333-333333333307', '11111111-1111-1111-1111-111111111110', 0),
('33333333-3333-3333-3333-333333333308', '11111111-1111-1111-1111-111111111107', 24);

-- Siswa
INSERT INTO public.siswa (id, nisn, nis, nama_lengkap, jenis_kelamin, tempat_lahir, tanggal_lahir, kelas_id, status, tahun_masuk, nama_wali, telepon_wali) VALUES
('44444444-4444-4444-4444-444444444401', '0012345678', '2024001', 'Andi Pratama', 'L', 'Jakarta', '2008-05-15', '22222222-2222-2222-2222-222222222203', 'aktif', 2022, 'Hendra Pratama', '081111111101'),
('44444444-4444-4444-4444-444444444402', '0012345679', '2024002', 'Bunga Citra Lestari', 'P', 'Bandung', '2008-03-22', '22222222-2222-2222-2222-222222222203', 'aktif', 2022, 'Agus Lestari', '081111111102'),
('44444444-4444-4444-4444-444444444403', '0012345680', '2024003', 'Cahyo Wibowo', 'L', 'Surabaya', '2008-07-10', '22222222-2222-2222-2222-222222222204', 'aktif', 2022, 'Wibowo', '081111111103'),
('44444444-4444-4444-4444-444444444404', '0012345681', '2024004', 'Diana Putri', 'P', 'Yogyakarta', '2008-11-28', '22222222-2222-2222-2222-222222222204', 'aktif', 2022, 'Putri Handayani', '081111111104'),
('44444444-4444-4444-4444-444444444405', '0012345682', '2024005', 'Eko Saputra', 'L', 'Semarang', '2007-02-14', '22222222-2222-2222-2222-222222222206', 'aktif', 2021, 'Saputra', '081111111105'),
('44444444-4444-4444-4444-444444444406', '0012345683', '2024006', 'Fitri Rahayu', 'P', 'Malang', '2007-09-05', '22222222-2222-2222-2222-222222222206', 'aktif', 2021, 'Rahayu', '081111111106'),
('44444444-4444-4444-4444-444444444407', '0012345684', '2024007', 'Gilang Ramadhan', 'L', 'Medan', '2009-01-20', '22222222-2222-2222-2222-222222222201', 'aktif', 2024, 'Ramadhan', '081111111107'),
('44444444-4444-4444-4444-444444444408', '0012345685', '2024008', 'Hana Safira', 'P', 'Palembang', '2009-04-18', '22222222-2222-2222-2222-222222222201', 'aktif', 2024, 'Safira', '081111111108');

-- Nilai
INSERT INTO public.nilai (siswa_id, mapel_id, kelas_id, semester, tahun_ajaran, nilai_tugas, nilai_uts, nilai_uas, nilai_akhir, predikat) VALUES
('44444444-4444-4444-4444-444444444401', '11111111-1111-1111-1111-111111111101', '22222222-2222-2222-2222-222222222203', 1, '2024/2025', 85.00, 82.00, 88.00, 85.00, 'A'),
('44444444-4444-4444-4444-444444444401', '11111111-1111-1111-1111-111111111104', '22222222-2222-2222-2222-222222222203', 1, '2024/2025', 78.00, 80.00, 82.00, 80.00, 'B'),
('44444444-4444-4444-4444-444444444402', '11111111-1111-1111-1111-111111111101', '22222222-2222-2222-2222-222222222203', 1, '2024/2025', 90.00, 88.00, 92.00, 90.00, 'A'),
('44444444-4444-4444-4444-444444444402', '11111111-1111-1111-1111-111111111104', '22222222-2222-2222-2222-222222222203', 1, '2024/2025', 85.00, 87.00, 89.00, 87.00, 'A'),
('44444444-4444-4444-4444-444444444403', '11111111-1111-1111-1111-111111111101', '22222222-2222-2222-2222-222222222204', 1, '2024/2025', 75.00, 72.00, 78.00, 75.00, 'B'),
('44444444-4444-4444-4444-444444444404', '11111111-1111-1111-1111-111111111101', '22222222-2222-2222-2222-222222222204', 1, '2024/2025', 82.00, 85.00, 80.00, 82.33, 'B'),
('44444444-4444-4444-4444-444444444405', '11111111-1111-1111-1111-111111111101', '22222222-2222-2222-2222-222222222206', 1, '2024/2025', 88.00, 90.00, 92.00, 90.00, 'A'),
('44444444-4444-4444-4444-444444444406', '11111111-1111-1111-1111-111111111101', '22222222-2222-2222-2222-222222222206', 1, '2024/2025', 95.00, 93.00, 97.00, 95.00, 'A');

-- Fasilitas
INSERT INTO public.fasilitas (nama, deskripsi, foto_url, kategori, urutan) VALUES
('Ruang Kelas Ber-AC', 'Ruang kelas dilengkapi AC dan proyektor interaktif', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800', 'Ruang Kelas', 1),
('Laboratorium Fisika', 'Lab fisika dengan peralatan eksperimen lengkap', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800', 'Laboratorium', 2),
('Laboratorium Kimia', 'Lab kimia standar internasional', 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800', 'Laboratorium', 3),
('Laboratorium Komputer', 'Lab komputer dengan 40 unit PC terbaru', 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800', 'Laboratorium', 4),
('Perpustakaan', 'Perpustakaan dengan koleksi 15.000 buku', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800', 'Perpustakaan', 5),
('Lapangan Basket', 'Lapangan basket outdoor standar', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800', 'Olahraga', 6),
('Aula Serbaguna', 'Aula kapasitas 500 orang', 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800', 'Fasilitas Umum', 7),
('Musholla', 'Musholla dengan kapasitas 200 jamaah', 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800', 'Ibadah', 8),
('Kantin Sehat', 'Kantin dengan menu sehat dan bergizi', 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800', 'Fasilitas Umum', 9),
('Ruang UKS', 'Unit Kesehatan Sekolah dengan dokter jaga', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800', 'Fasilitas Umum', 10);

-- Ekstrakurikuler
INSERT INTO public.ekstrakurikuler (nama, deskripsi, foto_url, pembina, hari_latihan, jam_latihan, lokasi) VALUES
('Paskibra', 'Pasukan Pengibar Bendera dengan prestasi tingkat nasional', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800', 'Budi Santoso, S.Pd', 'Senin, Rabu', '15:00-17:00', 'Lapangan Utama'),
('Basket', 'Tim basket putra dan putri berprestasi', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800', 'Rizky Pratama, S.Pd', 'Selasa, Kamis', '15:00-17:00', 'Lapangan Basket'),
('Paduan Suara', 'Grup paduan suara juara tingkat provinsi', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800', 'Siti Nurhaliza, M.M', 'Jumat', '14:00-16:00', 'Ruang Musik'),
('English Club', 'Komunitas bahasa Inggris untuk meningkatkan kemampuan speaking', 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800', 'Nur Aini, S.Pd', 'Rabu', '15:00-17:00', 'Ruang Bahasa'),
('Robotika', 'Klub robotika dengan berbagai prestasi kompetisi', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', 'Agus Setiawan, S.Kom', 'Sabtu', '08:00-12:00', 'Lab Komputer'),
('PMR', 'Palang Merah Remaja untuk kemanusiaan', 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800', 'Dewi Anggraini, S.Pd', 'Kamis', '15:00-17:00', 'Ruang PMR'),
('Teater', 'Grup teater aktif dalam festival seni', 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800', 'Rina Wulandari, S.Pd', 'Sabtu', '09:00-12:00', 'Aula');

-- Prestasi
INSERT INTO public.prestasi (siswa_id, nama_siswa, nama_prestasi, jenis_lomba, tingkat, peringkat, penyelenggara, tanggal, foto_url) VALUES
('44444444-4444-4444-4444-444444444401', 'Andi Pratama', 'Juara 1 Olimpiade Matematika', 'Olimpiade Matematika', 'Provinsi', 'Juara 1', 'Dinas Pendidikan Provinsi', '2024-08-15', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'),
('44444444-4444-4444-4444-444444444402', 'Bunga Citra Lestari', 'Juara 2 Lomba Debat Bahasa Inggris', 'English Debate Competition', 'Nasional', 'Juara 2', 'BNSP', '2024-09-20', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800'),
('44444444-4444-4444-4444-444444444405', 'Eko Saputra', 'Medali Emas Fisika', 'Olimpiade Sains Nasional', 'Nasional', 'Medali Emas', 'Kemendikbud', '2024-07-10', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800'),
('44444444-4444-4444-4444-444444444406', 'Fitri Rahayu', 'Juara 1 Lomba Karya Ilmiah', 'Lomba Karya Ilmiah Remaja', 'Kota', 'Juara 1', 'Dinas Pendidikan Kota', '2024-10-05', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800'),
('44444444-4444-4444-4444-444444444403', 'Cahyo Wibowo', 'Juara 3 Robotika', 'Kontes Robot Indonesia', 'Nasional', 'Juara 3', 'Kemendikbud', '2024-06-22', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800');

-- Kalender Kegiatan
INSERT INTO public.kalender_kegiatan (judul, deskripsi, tanggal_mulai, tanggal_selesai, tipe, lokasi) VALUES
('Ujian Akhir Semester', 'Pelaksanaan UAS Semester Ganjil 2024/2025', '2024-12-02', '2024-12-13', 'ujian', 'Seluruh Ruang Kelas'),
('Libur Semester', 'Libur Semester Ganjil', '2024-12-16', '2025-01-01', 'libur', NULL),
('Penerimaan Rapor', 'Pembagian rapor semester ganjil', '2024-12-14', '2024-12-14', 'akademik', 'Ruang Kelas Masing-masing'),
('Upacara Hari Pendidikan', 'Upacara peringatan Hari Pendidikan Nasional', '2025-05-02', '2025-05-02', 'kegiatan', 'Lapangan Utama'),
('Pentas Seni', 'Pentas Seni Akhir Tahun', '2025-06-15', '2025-06-16', 'kegiatan', 'Aula Serbaguna'),
('Ujian Nasional', 'Pelaksanaan Ujian Nasional Kelas XII', '2025-04-14', '2025-04-17', 'ujian', 'Ruang Ujian'),
('Masa Orientasi Siswa', 'MPLS untuk siswa baru', '2025-07-14', '2025-07-16', 'kegiatan', 'Lapangan dan Aula'),
('Libur Lebaran', 'Libur Hari Raya Idul Fitri', '2025-03-28', '2025-04-07', 'libur', NULL);

-- Testimoni
INSERT INTO public.testimoni (nama, jabatan, foto_url, isi_testimoni, rating, urutan) VALUES
('Dr. Hendra Wijaya', 'Orang Tua Siswa', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400', 'Saya sangat puas dengan perkembangan anak saya di SMA Nusantara. Guru-gurunya sangat profesional dan lingkungan sekolah sangat kondusif untuk belajar.', 5, 1),
('Risa Amanda', 'Alumni 2020', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', 'Berkat bimbingan guru-guru di SMA Nusantara, saya berhasil masuk ke PTN impian saya. Pengalaman belajar di sini sangat berkesan.', 5, 2),
('Prof. Bambang Sutrisno', 'Dosen UI', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', 'Lulusan SMA Nusantara yang saya temui di universitas memiliki dasar akademik yang kuat dan karakter yang baik.', 5, 3),
('Maya Sari', 'Alumni 2018', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', 'SMA Nusantara tidak hanya mengajarkan akademik, tapi juga membentuk karakter dan soft skill yang sangat berguna di dunia kerja.', 5, 4),
('Ir. Joko Widodo', 'Tokoh Masyarakat', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'SMA Nusantara adalah contoh sekolah yang berhasil menggabungkan pendidikan modern dengan nilai-nilai karakter bangsa.', 5, 5);

-- Berita
INSERT INTO public.berita (judul, slug, ringkasan, konten, foto_url, kategori, penulis, is_featured, tanggal_publish) VALUES
('Siswa SMA Nusantara Raih Emas di OSN', 'siswa-sma-nusantara-raih-emas-osn', 'Eko Saputra berhasil meraih medali emas dalam Olimpiade Sains Nasional bidang Fisika', 'Dengan bangga kami mengumumkan bahwa Eko Saputra, siswa kelas XII IPA 1, berhasil meraih medali emas dalam Olimpiade Sains Nasional (OSN) bidang Fisika yang diselenggarakan oleh Kemendikbud. Prestasi ini merupakan hasil kerja keras dan bimbingan intensif dari guru-guru SMA Nusantara.', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800', 'Prestasi', 'Tim Humas', true, '2024-07-15'),
('Pentas Seni Tahunan Sukses Digelar', 'pentas-seni-tahunan-sukses-digelar', 'Pentas seni tahunan SMA Nusantara menampilkan berbagai pertunjukan memukau dari siswa', 'Pentas seni tahunan SMA Nusantara berlangsung meriah dengan berbagai pertunjukan dari siswa-siswi berbakat. Acara yang dihadiri oleh ratusan tamu undangan ini menampilkan tarian tradisional, paduan suara, drama musikal, dan berbagai kreasi seni lainnya.', 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800', 'Kegiatan', 'Tim Humas', true, '2024-06-20'),
('Kunjungan Industri ke Pabrik Teknologi', 'kunjungan-industri-pabrik-teknologi', 'Siswa kelas XI melakukan kunjungan industri ke pabrik teknologi terkemuka', 'Dalam rangka memberikan wawasan dunia industri, siswa kelas XI melakukan kunjungan ke pabrik teknologi. Kegiatan ini bertujuan untuk memberikan gambaran nyata tentang penerapan ilmu yang dipelajari di sekolah dalam dunia kerja.', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800', 'Akademik', 'Tim Humas', false, '2024-05-10'),
('Workshop Kewirausahaan untuk Siswa', 'workshop-kewirausahaan-siswa', 'SMA Nusantara mengadakan workshop kewirausahaan untuk membekali siswa dengan jiwa enterpreneurship', 'Workshop kewirausahaan diadakan untuk siswa kelas X dan XI. Acara ini menghadirkan pengusaha sukses sebagai pembicara yang berbagi pengalaman dan tips memulai bisnis.', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', 'Kegiatan', 'Tim Humas', false, '2024-04-25'),
('Tim Basket Putra Juara Turnamen Antar SMA', 'tim-basket-juara-turnamen', 'Tim basket putra SMA Nusantara berhasil menjuarai turnamen basket antar SMA se-Kota', 'Dengan perjuangan yang luar biasa, tim basket putra SMA Nusantara berhasil mengalahkan berbagai tim tangguh dan menjadi juara turnamen basket antar SMA se-Kota. Prestasi ini membuktikan pembinaan olahraga yang baik di sekolah.', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800', 'Olahraga', 'Tim Humas', true, '2024-03-15');

-- Supervisi Guru
INSERT INTO public.supervisi_guru (guru_id, tanggal_supervisi, supervisor, aspek_pedagogik, aspek_profesional, aspek_kepribadian, aspek_sosial, nilai_total, catatan) VALUES
('33333333-3333-3333-3333-333333333303', '2024-09-15', 'Dr. Ahmad Suryadi, M.Pd', 88.5, 90.0, 92.0, 89.5, 90.0, 'Penggunaan metode pembelajaran yang inovatif. Perlu ditingkatkan penggunaan teknologi dalam pembelajaran.'),
('33333333-3333-3333-3333-333333333304', '2024-09-16', 'Dr. Ahmad Suryadi, M.Pd', 85.0, 87.5, 90.0, 88.0, 87.63, 'Manajemen kelas baik. Administrasi pembelajaran lengkap.'),
('33333333-3333-3333-3333-333333333305', '2024-09-17', 'Dr. Ahmad Suryadi, M.Pd', 82.0, 85.0, 88.0, 86.0, 85.25, 'Interaksi dengan siswa sangat baik. Perlu variasi dalam metode penilaian.'),
('33333333-3333-3333-3333-333333333308', '2024-09-18', 'Dr. Ahmad Suryadi, M.Pd', 86.0, 88.0, 91.0, 89.0, 88.5, 'Pembelajaran kontekstual sangat baik. Penggunaan media pembelajaran perlu ditingkatkan.');

-- Kinerja Guru
INSERT INTO public.kinerja_guru (guru_id, periode, kehadiran, ketepatan_waktu, kelengkapan_administrasi, kualitas_mengajar, partisipasi_kegiatan, nilai_rata_rata, predikat) VALUES
('33333333-3333-3333-3333-333333333301', 'Semester 1 2024/2025', 98.0, 95.0, 100.0, 95.0, 100.0, 97.6, 'Sangat Baik'),
('33333333-3333-3333-3333-333333333302', 'Semester 1 2024/2025', 96.0, 94.0, 98.0, 92.0, 95.0, 95.0, 'Sangat Baik'),
('33333333-3333-3333-3333-333333333303', 'Semester 1 2024/2025', 95.0, 92.0, 95.0, 90.0, 88.0, 92.0, 'Sangat Baik'),
('33333333-3333-3333-3333-333333333304', 'Semester 1 2024/2025', 94.0, 90.0, 92.0, 88.0, 85.0, 89.8, 'Baik'),
('33333333-3333-3333-3333-333333333305', 'Semester 1 2024/2025', 92.0, 88.0, 90.0, 86.0, 82.0, 87.6, 'Baik'),
('33333333-3333-3333-3333-333333333306', 'Semester 1 2024/2025', 97.0, 95.0, 96.0, 94.0, 90.0, 94.4, 'Sangat Baik'),
('33333333-3333-3333-3333-333333333307', 'Semester 1 2024/2025', 0.0, 0.0, 75.0, 0.0, 0.0, 15.0, 'Cuti'),
('33333333-3333-3333-3333-333333333308', 'Semester 1 2024/2025', 93.0, 91.0, 94.0, 89.0, 86.0, 90.6, 'Sangat Baik');

-- Pengumuman
INSERT INTO public.pengumuman (judul, isi, prioritas, target_audience, tanggal_mulai, tanggal_selesai) VALUES
('Jadwal Ujian Akhir Semester', 'Ujian Akhir Semester Ganjil akan dilaksanakan pada tanggal 2-13 Desember 2024. Siswa diharapkan mempersiapkan diri dengan baik.', 'urgent', ARRAY['siswa', 'guru', 'wali'], '2024-11-25', '2024-12-13'),
('Pendaftaran Ekstrakurikuler Semester 2', 'Pendaftaran ekstrakurikuler untuk semester 2 dibuka mulai tanggal 6-10 Januari 2025. Silakan mendaftar melalui wali kelas masing-masing.', 'normal', ARRAY['siswa'], '2024-12-15', '2025-01-10'),
('Rapat Wali Murid', 'Rapat wali murid akan dilaksanakan pada hari Sabtu, 14 Desember 2024 pukul 08.00 WIB di Aula Sekolah.', 'urgent', ARRAY['wali'], '2024-12-01', '2024-12-14'),
('Libur Akhir Tahun', 'Libur akhir tahun dimulai tanggal 16 Desember 2024 hingga 1 Januari 2025. Selamat berlibur!', 'normal', ARRAY['siswa', 'guru', 'wali'], '2024-12-14', '2025-01-01');

-- =====================================================
-- RLS POLICIES
-- =====================================================

-- User Roles Policies
CREATE POLICY "Users can view their own roles" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Profiles Policies
CREATE POLICY "Profiles are viewable by authenticated users" ON public.profiles
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Public read access for content tables
CREATE POLICY "Anyone can view fasilitas" ON public.fasilitas
    FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view ekstrakurikuler" ON public.ekstrakurikuler
    FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view prestasi" ON public.prestasi
    FOR SELECT USING (true);

CREATE POLICY "Anyone can view kalender" ON public.kalender_kegiatan
    FOR SELECT USING (true);

CREATE POLICY "Anyone can view testimoni" ON public.testimoni
    FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view berita" ON public.berita
    FOR SELECT USING (is_published = true);

-- Admin/Staff can manage content
CREATE POLICY "Admin can manage fasilitas" ON public.fasilitas
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can manage ekstrakurikuler" ON public.ekstrakurikuler
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can manage prestasi" ON public.prestasi
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can manage kalender" ON public.kalender_kegiatan
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can manage testimoni" ON public.testimoni
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can manage berita" ON public.berita
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Enable RLS on all content tables
ALTER TABLE public.fasilitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ekstrakurikuler ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prestasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kalender_kegiatan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimoni ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.berita ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- USEFUL FUNCTIONS
-- =====================================================

-- Function to get student academic summary
CREATE OR REPLACE FUNCTION public.get_student_academic_summary(p_siswa_id UUID)
RETURNS TABLE (
    mapel VARCHAR,
    nilai_akhir DECIMAL,
    predikat CHAR
)
LANGUAGE sql
STABLE
AS $$
    SELECT mp.nama_mapel, n.nilai_akhir, n.predikat
    FROM public.nilai n
    JOIN public.mata_pelajaran mp ON n.mapel_id = mp.id
    WHERE n.siswa_id = p_siswa_id
    ORDER BY mp.nama_mapel;
$$;

-- Function to get class average by subject
CREATE OR REPLACE FUNCTION public.get_class_average(p_kelas_id UUID, p_mapel_id UUID)
RETURNS DECIMAL
LANGUAGE sql
STABLE
AS $$
    SELECT AVG(nilai_akhir)
    FROM public.nilai
    WHERE kelas_id = p_kelas_id AND mapel_id = p_mapel_id;
$$;

-- =====================================================
-- END OF SCHEMA
-- =====================================================
