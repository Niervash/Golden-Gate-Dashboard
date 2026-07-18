import React, { useState } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "../../layouts";
import {
  TrendingUp,
  Users,
  UserCheck,
  Award,
  Bell,
  BookOpen,
  ClipboardCheck,
  ArrowRight,
  TrendingDown,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  accentLight: "#af9151",
  white: "#ffffff",
  goldTransparent: "rgba(217, 171, 63, 0.1)",
  blueTransparent10: "rgba(35, 48, 93, 0.1)",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
  success: "#10b981",
};

const PrincipalDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ringkasan" | "laporan">("ringkasan");

  const stats = [
    {
      label: "Total Siswa",
      value: "842 Siswa",
      desc: "L: 410, P: 432",
      icon: Users,
      trend: "+12 pendaftar baru",
      trendType: "up",
    },
    {
      label: "Tenaga Pengajar (Guru)",
      value: "48 Guru",
      desc: "42 Tetap, 6 Honorer",
      icon: UserCheck,
      trend: "100% Sertifikasi",
      trendType: "neutral",
    },
    {
      label: "Rata-rata Kehadiran",
      value: "96.4%",
      desc: "Bulan ini (Juli)",
      icon: ClipboardCheck,
      trend: "+1.2% dari bulan lalu",
      trendType: "up",
    },
    {
      label: "Prestasi Siswa",
      value: "14 Penghargaan",
      desc: "Tingkat Provinsi & Nasional",
      icon: Award,
      trend: "3 Medali Emas Baru",
      trendType: "up",
    },
  ];

  const quickLinks = [
    { label: "Data Siswa", path: "/dashboard/students", desc: "Lihat database siswa & jurusan" },
    { label: "Data Guru", path: "/dashboard/teachers", desc: "Daftar staff & status sertifikasi" },
    { label: "Daily Lesson Plan", path: "/dashboard/lesson-plan", desc: "Cek rencana pembelajaran harian guru" },
    { label: "Laporan Evaluasi", path: "/dashboard/reports", desc: "Statistik kehadiran & penilaian sekolah" },
    { label: "Prestasi Sekolah", path: "/dashboard/achievements", desc: "Log medali & penghargaan siswa" },
    { label: "Pengumuman", path: "/dashboard/announcements", desc: "Buat atau edit edaran sekolah" },
  ];

  const recentAnnouncements = [
    {
      id: 1,
      title: "Rapat Koordinasi Evaluasi Semester Ganjil",
      date: "18 Juli 2026",
      category: "Akademik",
      status: "Penting",
    },
    {
      id: 2,
      title: "Persiapan Akreditasi Sekolah Nasional Tahun 2026/2027",
      date: "16 Juli 2026",
      category: "Manajemen",
      status: "Penting",
    },
    {
      id: 3,
      title: "Selamat kepada Tim Olimpiade Matematika (Juara 1 Provinsi)",
      date: "12 Juli 2026",
      category: "Prestasi",
      status: "Umum",
    },
  ];

  const performanceTargets = [
    { name: "Kualitas Pembelajaran (IKU)", current: 88, target: 90, unit: "%" },
    { name: "Kehadiran Guru Mengajar", current: 98.2, target: 95, unit: "%" },
    { name: "Kelulusan Siswa Berprestasi", current: 94.5, target: 95, unit: "%" },
    { name: "Kerapihan & Kebersihan Lingkungan", current: 92, target: 90, unit: "%" },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Welcome Banner */}
      <div
        className="p-6 rounded-2xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, #151e3d 100%)`,
          borderColor: "rgba(217, 171, 63, 0.3)",
          color: "#ffffff",
        }}
      >
        <div className="space-y-1">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
            style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
          >
            Kepala Sekolah Dashboard
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-2 text-white">
            Selamat Datang Kembali, Dr. Ahmad Suryadi, M.Pd.
          </h1>
          <p className="text-sm" style={{ color: "#af9151" }}>
            Monitoring sistem akademik, data guru, & laporan perkembangan Golden Gate School.
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
        >
          <Calendar className="w-4 h-4 text-[#d9ab3f]" />
          <span>Tahun Ajaran 2026/2027 (Genap)</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-xl bg-white border shadow-sm flex flex-col justify-between"
              style={{ borderColor: COLORS.grayMedium }}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {stat.label}
                  </p>
                  <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
                    {stat.value}
                  </h3>
                  <p className="text-xs text-gray-500">{stat.desc}</p>
                </div>
                <div
                  className="p-2.5 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: COLORS.goldTransparent }}
                >
                  <Icon className="w-5 h-5" style={{ color: COLORS.accent }} />
                </div>
              </div>
              <div
                className="mt-4 pt-3 flex items-center gap-1.5 text-xs border-t"
                style={{ borderColor: COLORS.grayLight }}
              >
                {stat.trendType === "up" ? (
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                )}
                <span className="text-emerald-600 font-medium">{stat.trend}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: COLORS.grayMedium }}>
        <button
          onClick={() => setActiveTab("ringkasan")}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === "ringkasan" ? "bg-white" : "hover:bg-gray-50"
          }`}
          style={{
            color: activeTab === "ringkasan" ? COLORS.primary : COLORS.secondary,
            borderBottomColor: activeTab === "ringkasan" ? COLORS.primary : "transparent",
          }}
        >
          <BookOpen className="w-4 h-4" /> Ringkasan Evaluasi
        </button>
        <button
          onClick={() => setActiveTab("laporan")}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === "laporan" ? "bg-white" : "hover:bg-gray-50"
          }`}
          style={{
            color: activeTab === "laporan" ? COLORS.primary : COLORS.secondary,
            borderBottomColor: activeTab === "laporan" ? COLORS.primary : "transparent",
          }}
        >
          <TrendingUp className="w-4 h-4" /> Target Capaian Sekolah
        </button>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Middle Column: Evaluasi / Target */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "ringkasan" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border p-6 shadow-sm space-y-6"
              style={{ borderColor: COLORS.grayMedium }}
            >
              <div>
                <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>
                  Rencana Kegiatan & Pengumuman Sekolah
                </h3>
                <p className="text-sm text-gray-500">
                  Berikut draf pengumuman dan edaran dinas yang memerlukan persetujuan Kepala Sekolah.
                </p>
              </div>

              <div className="space-y-4">
                {recentAnnouncements.map((ann) => (
                  <div
                    key={ann.id}
                    className="p-4 rounded-xl border flex justify-between items-center transition-all hover:bg-gray-50"
                    style={{ borderColor: COLORS.grayMedium }}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                          style={{
                            backgroundColor:
                              ann.status === "Penting"
                                ? "rgba(239, 68, 68, 0.1)"
                                : "rgba(35, 48, 93, 0.1)",
                            color: ann.status === "Penting" ? "#ef4444" : COLORS.primary,
                          }}
                        >
                          {ann.status}
                        </span>
                        <span className="text-xs text-gray-400">{ann.category}</span>
                      </div>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-800">
                        {ann.title}
                      </h4>
                      <p className="text-xs text-gray-500">Dibuat tanggal: {ann.date}</p>
                    </div>
                    <Link
                      to="/dashboard/announcements"
                      className="p-2 rounded-full text-gray-400 hover:text-[#d9ab3f] hover:bg-[#d9ab3f]/5 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                ))}
              </div>

              <div
                className="p-4 rounded-xl flex items-center justify-between"
                style={{ backgroundColor: COLORS.goldTransparent }}
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-gray-800">Butuh Evaluasi & Laporan Tahunan?</p>
                  <p className="text-xs text-gray-500">Gunakan halaman laporan untuk mengunduh rekapitulasi lengkap.</p>
                </div>
                <Link
                  to="/dashboard/reports"
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition-colors"
                  style={{ backgroundColor: COLORS.accent }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.accentLight)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.accent)}
                >
                  Buka Laporan
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border p-6 shadow-sm space-y-6"
              style={{ borderColor: COLORS.grayMedium }}
            >
              <div>
                <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>
                  Indikator Kinerja Utama (IKU) GGS
                </h3>
                <p className="text-sm text-gray-500">
                  Perkembangan capaian target standar mutu operasional sekolah semester genap.
                </p>
              </div>

              <div className="space-y-5">
                {performanceTargets.map((target, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-gray-700">{target.name}</span>
                      <span className="text-gray-500 font-medium">
                        {target.current}
                        {target.unit} / Target: {target.target}
                        {target.unit}
                      </span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden relative border border-gray-200">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(target.current / target.target) * 100}%`,
                          backgroundColor:
                            target.current >= target.target ? COLORS.success : COLORS.accent,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Quick Pintasan */}
          <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4" style={{ borderColor: COLORS.grayMedium }}>
            <h3 className="text-lg font-bold text-gray-800">Pintasan Halaman Kepala Sekolah</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {quickLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  className="p-3 rounded-xl border text-left hover:border-[#d9ab3f] hover:bg-[#d9ab3f]/5 transition-all no-underline"
                  style={{ borderColor: COLORS.grayMedium }}
                >
                  <p className="font-semibold text-sm text-[#23305d]">{link.label}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{link.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Academic Calendar & Quick Message */}
        <div className="space-y-6">
          {/* Calendar Card */}
          <div className="bg-white rounded-2xl border p-5 shadow-sm space-y-4 text-center" style={{ borderColor: COLORS.grayMedium }}>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5" style={{ color: COLORS.accent }} />
              <h3 className="font-bold text-base" style={{ color: COLORS.primary }}>Kalender Akademik Terdekat</h3>
            </div>
            <div className="space-y-3 text-left">
              <div className="p-3 rounded-lg bg-gray-50 border-l-4" style={{ borderLeftColor: COLORS.accent }}>
                <p className="text-xs text-gray-400 font-semibold">22 - 25 Juli 2026</p>
                <p className="text-sm font-semibold text-gray-700">Masa Pengenalan Lingkungan Sekolah (MPLS)</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 border-l-4" style={{ borderLeftColor: COLORS.primary }}>
                <p className="text-xs text-gray-400 font-semibold">03 Agustus 2026</p>
                <p className="text-sm font-semibold text-gray-700">Pembagian Rapor Laporan UTS Bulan Juli</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 border-l-4" style={{ borderLeftColor: COLORS.success }}>
                <p className="text-xs text-gray-400 font-semibold">17 Agustus 2026</p>
                <p className="text-sm font-semibold text-gray-700">Upacara Peringatan Hari Kemerdekaan RI</p>
              </div>
            </div>
          </div>

          {/* Quick Info Box */}
          <div
            className="p-5 rounded-2xl border text-[#ffffff] space-y-4"
            style={{
              background: `linear-gradient(135deg, ${COLORS.secondary} 0%, #2e2d36 100%)`,
              borderColor: "#43424e",
            }}
          >
            <div className="space-y-1">
              <h3 className="font-bold text-base text-white">Catatan Kepala Sekolah</h3>
              <p className="text-xs text-gray-400">
                Pesan ini hanya dapat dibaca oleh Anda. Berguna untuk catatan evaluasi cepat.
              </p>
            </div>
            <textarea
              className="w-full h-24 p-3 rounded-lg text-xs border bg-white/5 border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#d9ab3f]"
              placeholder="Tulis catatan penting di sini..."
              defaultValue="Fokus peningkatan target akreditasi sekolah semester ini pada sertifikasi guru penggerak."
            />
            <button
              className="w-full py-2 rounded-lg text-xs font-semibold bg-white text-gray-800 hover:bg-gray-100 transition-colors"
              onClick={() => alert("Catatan disimpan secara lokal!")}
            >
              Simpan Catatan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrincipalPage: React.FC = () => {
  return (
    <AdminLayout>
      <PrincipalDashboard />
    </AdminLayout>
  );
};

export default PrincipalPage;
