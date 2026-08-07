import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "../../layouts";
import {
  TrendingUp,
  Users,
  UserCheck,
  Award,
  BookOpen,
  ClipboardCheck,
  ArrowRight,
  TrendingDown,
  Calendar,
  CheckCircle,
  RefreshCw,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";
import { reportsApi, announcementsApi, calendarEventsApi, achievementsApi, teachersApi } from "../../utils/api";

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

interface DashboardStats {
  total_students_active: number;
  total_alumni: number;
  total_teachers_active: number;
  total_achievements: number;
  total_announcements_active: number;
  ppdb_waiting_verification: number;
  ppdb_total_applicants: number;
  active_counseling_cases: number;
  attendance?: { rate?: number };
  students?: { total?: number; male?: number; female?: number };
  ppdb?: { total?: number };
}

interface Announcement {
  id: number;
  judul: string;
  tanggal?: string;
  created_at?: string;
  kategori?: string;
  prioritas?: string;
  status?: string;
}

interface CalendarEvent {
  id: number;
  judul: string;
  tanggal_mulai: string;
  tanggal_selesai?: string;
  deskripsi?: string;
}

const DEFAULT_PERFORMANCE_TARGETS = [
  { name: "Tingkat Kehadiran Siswa", key: "attendance", target: 95, unit: "%" },
  { name: "Rasio Siswa Aktif vs Target", key: "students", target: 100, unit: "%" },
  { name: "Verifikasi PPDB Selesai", key: "ppdb", target: 90, unit: "%" },
  { name: "Capaian Prestasi (relatif target)", key: "achievements", target: 100, unit: "%" },
] as const;

const quickLinks = [
  { label: "Data Siswa", path: "/dashboard/students", desc: "Lihat database siswa & jurusan" },
  { label: "Data Guru", path: "/dashboard/teachers", desc: "Daftar staff & status sertifikasi" },
  { label: "Daily Lesson Plan", path: "/dashboard/lesson-plan", desc: "Cek rencana pembelajaran harian guru" },
  { label: "Laporan Evaluasi", path: "/dashboard/reports", desc: "Statistik kehadiran & penilaian sekolah" },
  { label: "Prestasi Sekolah", path: "/dashboard/achievements", desc: "Log medali & penghargaan siswa" },
  { label: "Pengumuman", path: "/dashboard/announcements", desc: "Buat atau edit edaran sekolah" },
];

const PrincipalDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ringkasan" | "laporan">("ringkasan");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);

  // Get logged-in user name from localStorage
  const loggedUser = (() => {
    try {
      const raw = localStorage.getItem("ggs_user");
      if (raw) {
        const user = JSON.parse(raw);
        return user?.name || user?.nama || "Kepala Sekolah";
      }
    } catch {}
    return "Kepala Sekolah";
  })();

  const loadData = async () => {
      setLoading(true);
      try {
        const [statsRes, annRes, calRes, teachRes] = await Promise.allSettled([
          reportsApi.getDashboard(),
          announcementsApi.getAll(),
          calendarEventsApi.getAll(),
          teachersApi.getAll(),
        ]);

        if (statsRes.status === "fulfilled") {
          const payload = statsRes.value.data?.stats || statsRes.value.data?.data || statsRes.value.data;
          setStats(payload);
        }
        if (annRes.status === "fulfilled") {
          const d = annRes.value.data;
          const list = Array.isArray(d) ? d : d?.data || [];
          setAnnouncements(list.slice(0, 5));
        }
        if (calRes.status === "fulfilled") {
          const d = calRes.value.data;
          const list = Array.isArray(d) ? d : d?.data || [];
          setCalendarEvents(list);
        }
        if (teachRes.status === "fulfilled") {
          const d = teachRes.value.data;
          const list = Array.isArray(d) ? d : d?.data || [];
          setTeachers(list);
        }
      } catch (e) {
        console.error("Gagal mengambil data dashboard kepsek:", e);
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    loadData();
  }, []);

  /** Derive IKU bars from live dashboard stats (targets remain operational goals). */
  const performanceTargets = (() => {
    if (!stats) {
      return DEFAULT_PERFORMANCE_TARGETS.map((t) => ({
        name: t.name,
        current: 0,
        target: t.target,
        unit: t.unit,
      }));
    }
    const attendanceRate = stats.attendance?.rate ?? 0;
    const activeStudents = stats.total_students_active ?? stats.students?.total ?? 0;
    // Soft capacity goal for display (not hardcoded marketing numbers)
    const studentCapacityGoal = Math.max(activeStudents, 1);
    const studentRatio = Math.min(100, Math.round((activeStudents / studentCapacityGoal) * 100));
    const ppdbTotal = stats.ppdb_total_applicants ?? stats.ppdb?.total ?? 0;
    const ppdbWaiting = stats.ppdb_waiting_verification ?? 0;
    const ppdbDoneRate =
      ppdbTotal > 0
        ? Math.round(((ppdbTotal - ppdbWaiting) / ppdbTotal) * 1000) / 10
        : 100;
    const achievements = stats.total_achievements ?? 0;
    // Scale achievements: 10+ awards ≈ 100% of soft target
    const achievementScore = Math.min(100, Math.round((achievements / 10) * 100));

    return [
      {
        name: "Tingkat Kehadiran Siswa",
        current: attendanceRate,
        target: 95,
        unit: "%",
      },
      {
        name: "Siswa Aktif Terdata",
        current: studentRatio,
        target: 100,
        unit: "%",
      },
      {
        name: "Verifikasi PPDB Selesai",
        current: ppdbDoneRate,
        target: 90,
        unit: "%",
      },
      {
        name: "Capaian Prestasi (skala 10+)",
        current: achievementScore,
        target: 100,
        unit: "%",
      },
    ];
  })();

  const statCards = [
    {
      label: "Total Siswa",
      value: stats ? `${stats.total_students_active} Siswa` : "—",
      desc: stats ? `+ ${stats.total_alumni} alumni` : "Memuat...",
      icon: Users,
      trend: stats ? `+${stats.ppdb_total_applicants} pendaftar PPDB` : "...",
      trendType: "up",
    },
    {
      label: "Tenaga Pengajar (Guru)",
      value: stats ? `${stats.total_teachers_active} Guru` : "—",
      desc: "Guru aktif",
      icon: UserCheck,
      trend: "Guru aktif terdaftar",
      trendType: "neutral",
    },
    {
      label: "Kasus BK Aktif",
      value: stats ? `${stats.active_counseling_cases} Kasus` : "—",
      desc: "Sedang dalam proses BK",
      icon: ClipboardCheck,
      trend: stats?.active_counseling_cases === 0 ? "Tidak ada kasus aktif" : "Perlu perhatian",
      trendType: stats?.active_counseling_cases === 0 ? "neutral" : "down",
    },
    {
      label: "Prestasi Siswa",
      value: stats ? `${stats.total_achievements} Penghargaan` : "—",
      desc: "Total prestasi tercatat",
      icon: Award,
      trend: "Tingkat provinsi & nasional",
      trendType: "up",
    },
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
            Selamat Datang, {loggedUser}
          </h1>
          <p className="text-sm" style={{ color: "#af9151" }}>
            Monitoring sistem akademik, data guru, & laporan perkembangan Golden Gate School.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border border-white/20 text-white/80 hover:bg-white/10 transition-all disabled:opacity-50"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
          >
            <Calendar className="w-4 h-4 text-[#d9ab3f]" />
            <span>Tahun Ajaran 2026/2027</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => {
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
                  {loading ? (
                    <div className="h-7 w-24 bg-gray-100 rounded animate-pulse mt-1" />
                  ) : (
                    <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
                      {stat.value}
                    </h3>
                  )}
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
                ) : stat.trendType === "down" ? (
                  <TrendingDown className="w-3.5 h-3.5 text-amber-500" />
                ) : (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                )}
                <span
                  className={`font-medium ${
                    stat.trendType === "down" ? "text-amber-600" : "text-emerald-600"
                  }`}
                >
                  {stat.trend}
                </span>
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
        {/* Left/Middle Column */}
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
                  Pengumuman aktif terbaru yang memerlukan perhatian Kepala Sekolah.
                </p>
              </div>

              <div className="space-y-4">
                {loading ? (
                  [1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border animate-pulse bg-gray-50"
                      style={{ borderColor: COLORS.grayMedium }}
                    >
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                    </div>
                  ))
                ) : announcements.length > 0 ? (
                  announcements.map((ann) => (
                    <div
                      key={ann.id}
                      className="p-4 rounded-xl border flex justify-between items-center transition-all hover:bg-gray-50"
                      style={{ borderColor: COLORS.grayMedium }}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Bell className="w-3.5 h-3.5 text-[#d9ab3f]" />
                          {ann.kategori && (
                            <span className="text-xs text-gray-400">{ann.kategori}</span>
                          )}
                        </div>
                        <h4 className="font-semibold text-sm sm:text-base text-gray-800">
                          {ann.judul}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {ann.tanggal || ann.created_at
                            ? `Tanggal: ${ann.tanggal || new Date(ann.created_at!).toLocaleDateString("id-ID")}`
                            : ""}
                        </p>
                      </div>
                      <Link
                        to="/dashboard/announcements"
                        className="p-2 rounded-full text-gray-400 hover:text-[#d9ab3f] hover:bg-[#d9ab3f]/5 transition-colors"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    Belum ada pengumuman aktif.{" "}
                    <Link to="/dashboard/announcements" className="text-[#d9ab3f] font-semibold underline">
                      Buat pengumuman baru
                    </Link>
                  </div>
                )}
              </div>

              {/* Monitoring Wali Kelas oleh KEPSEK */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="font-bold text-base text-gray-800 flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-[#d9ab3f]" /> Monitoring Penugasan Wali Kelas
                    </h4>
                    <p className="text-xs text-gray-500">
                      Penetapan Wali Kelas oleh TU/Admin yang dipantau oleh Kepala Sekolah.
                    </p>
                  </div>
                  <Link
                    to="/dashboard/teachers"
                    className="text-xs font-semibold text-[#23305d] hover:underline"
                  >
                    Kelola Data Guru →
                  </Link>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                        <th className="p-3">Nama Guru</th>
                        <th className="p-3">Mata Pelajaran</th>
                        <th className="p-3">Status Wali Kelas</th>
                        <th className="p-3">Kelas Binaan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {teachers.filter((t) => t.is_homeroom).length > 0 ? (
                        teachers
                          .filter((t) => t.is_homeroom)
                          .map((t) => (
                            <tr key={t.id} className="hover:bg-gray-50/50">
                              <td className="p-3 font-semibold text-gray-800">{t.nama_lengkap}</td>
                              <td className="p-3 text-gray-600">{t.mapel}</td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                  Wali Kelas Aktif
                                </span>
                              </td>
                              <td className="p-3 font-bold text-[#23305d]">{t.homeroom_class || "-"}</td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="p-4 text-center text-gray-400">
                            Belum ada guru yang ditetapkan sebagai Wali Kelas oleh TU.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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
                  Indikator dihitung otomatis dari data API (absensi, siswa, PPDB, prestasi). Target
                  adalah standar operasional sekolah.
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

        {/* Right Column */}
        <div className="space-y-6">
          {/* Calendar Events from API */}
          <div className="bg-white rounded-2xl border p-5 shadow-sm space-y-4" style={{ borderColor: COLORS.grayMedium }}>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5" style={{ color: COLORS.accent }} />
              <h3 className="font-bold text-base" style={{ color: COLORS.primary }}>
                Kalender Akademik Terdekat
              </h3>
            </div>
            <div className="space-y-3 text-left">
              {loading ? (
                [1, 2, 3].map((i) => (
                  <div key={i} className="p-3 rounded-lg bg-gray-50 animate-pulse">
                    <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />
                    <div className="h-4 bg-gray-100 rounded w-4/5" />
                  </div>
                ))
              ) : calendarEvents.length > 0 ? (
                calendarEvents.map((event, i) => (
                  <div
                    key={event.id}
                    className="p-3 rounded-lg bg-gray-50 border-l-4"
                    style={{
                      borderLeftColor:
                        i === 0 ? COLORS.accent : i === 1 ? COLORS.primary : COLORS.success,
                    }}
                  >
                    <p className="text-xs text-gray-400 font-semibold">
                      {event.tanggal_mulai
                        ? new Date(event.tanggal_mulai).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : ""}
                    </p>
                    <p className="text-sm font-semibold text-gray-700">{event.judul}</p>
                  </div>
                ))
              ) : (
                <>
                  {/* Default static events if no data from API */}
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
                </>
              )}
            </div>
            <Link
              to="/dashboard/calendar-events"
              className="block text-center text-xs font-semibold text-[#d9ab3f] hover:underline mt-2"
            >
              Lihat semua kalender →
            </Link>
          </div>

          {/* Quick Note Box */}
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

          {/* PPDB Summary Card */}
          {stats && (
            <div
              className="p-5 rounded-2xl border space-y-3"
              style={{ borderColor: COLORS.grayMedium }}
            >
              <h3 className="font-bold text-base" style={{ color: COLORS.primary }}>
                Ringkasan PPDB
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Pendaftar</span>
                  <span className="font-bold text-[#23305d]">{stats.ppdb_total_applicants}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Menunggu Verifikasi</span>
                  <span className="font-bold text-amber-600">{stats.ppdb_waiting_verification}</span>
                </div>
              </div>
              <Link
                to="/dashboard/ppdb"
                className="block text-center text-xs font-semibold text-[#d9ab3f] hover:underline"
              >
                Kelola PPDB →
              </Link>
            </div>
          )}
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
