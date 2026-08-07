import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  FileSpreadsheet,
  Printer,
  CheckCircle,
  FileCheck,
  Users,
  GraduationCap,
  CalendarCheck,
  UserPlus,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { reportsApi, studentsApi, gradesApi, attendanceApi } from "../../utils/api";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface DashboardStats {
  students: { total: number; male: number; female: number };
  teachers: { total: number };
  attendance: { rate: number };
  ppdb: { total: number };
}

interface Student {
  id: number | string;
  nis?: string;
  nama_lengkap?: string;
  namaLengkap?: string;
  kelas?: string;
  class?: string;
  status?: string;
  jenis_kelamin?: string;
}

const extractList = (res: any): any[] => {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  if (Array.isArray(d?.data)) return d.data;
  if (Array.isArray(d?.users)) return d.users;
  return [];
};

/** Normalize BE flat stats + nested stats into one shape */
const normalizeDashboardStats = (raw: any): DashboardStats | null => {
  if (!raw) return null;
  if (raw.students && typeof raw.students === "object") {
    return {
      students: {
        total: raw.students.total ?? raw.total_students_active ?? 0,
        male: raw.students.male ?? 0,
        female: raw.students.female ?? 0,
      },
      teachers: { total: raw.teachers?.total ?? raw.total_teachers_active ?? 0 },
      attendance: { rate: raw.attendance?.rate ?? 0 },
      ppdb: { total: raw.ppdb?.total ?? raw.ppdb_total_applicants ?? 0 },
    };
  }
  return {
    students: {
      total: raw.total_students_active ?? 0,
      male: 0,
      female: 0,
    },
    teachers: { total: raw.total_teachers_active ?? 0 },
    attendance: { rate: 0 },
    ppdb: { total: raw.ppdb_total_applicants ?? 0 },
  };
};

const downloadTextFile = (filename: string, content: string, mime: string) => {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const toCsv = (rows: Record<string, unknown>[]) => {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => {
    const s = String(v ?? "");
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  return [headers.join(","), ...rows.map((r) => headers.map((h) => escape(r[h])).join(","))].join(
    "\n"
  );
};

// ─── Stat Card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  bg: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, sub, color, bg }) => (
  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: bg, color }}
    >
      {icon}
    </div>
    <div>
      <p className="text-xs font-semibold uppercase text-gray-500 tracking-wide">{label}</p>
      <p className="text-2xl font-bold" style={{ color: COLORS.primary }}>
        {value}
      </p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

// ─── Component ───────────────────────────────────────────────────────────────

export const AdminReports: React.FC = () => {
  // UI state
  const [reportType, setReportType] = useState<"raport" | "surat" | "absensi">("raport");
  const [tahunAjaran, setTahunAjaran] = useState("2026/2027");
  const [semester, setSemester] = useState("Ganjil");
  const [kelas, setKelas] = useState("");
  const [formatDoc, setFormatDoc] = useState<"pdf" | "excel">("pdf");
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // API data state
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [kelasOptions, setKelasOptions] = useState<string[]>([]);
  const [kelasLoading, setKelasLoading] = useState(true);

  const [gradeCount, setGradeCount] = useState<number | null>(null);

  // ─── Fetch dashboard stats ────────────────────────────────────────────────
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        const res = await reportsApi.getDashboard();
        const payload = res.data?.stats || res.data?.data || res.data;
        setStats(normalizeDashboardStats(payload));
      } catch {
        setStatsError("Gagal memuat statistik sekolah.");
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  // ─── Fetch students to derive unique kelas options ────────────────────────
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setKelasLoading(true);
        const res = await studentsApi.getAll();
        const students: Student[] = extractList(res);
        const classes = Array.from(
          new Set(
            students
              .map((s) => s.kelas || s.class || "")
              .filter(Boolean)
          )
        ).sort() as string[];
        setKelasOptions(classes);
        if (classes.length > 0) setKelas(classes[0]);
      } catch {
        // Silently fall back to empty list; user can still type a kelas
      } finally {
        setKelasLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // ─── Fetch grade count for informational display ──────────────────────────
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await gradesApi.getAll();
        const grades = extractList(res);
        setGradeCount(grades.length);
      } catch {
        setGradeCount(null);
      }
    };
    fetchGrades();
  }, []);

  // ─── Export from live API data (client-side CSV/XLSX/printable text) ─────
  const handleExport = async () => {
    setIsGenerating(true);
    setSuccessMessage("");
    try {
      const [studentsRes, gradesRes, attendanceRes] = await Promise.all([
        studentsApi.getAll(),
        gradesApi.getAll(),
        attendanceApi.getAll(),
      ]);
      const students: Student[] = extractList(studentsRes);
      const grades = extractList(gradesRes);
      const attendance = extractList(attendanceRes);

      const matchKelas = (s: any) => {
        if (!kelas) return true;
        return (s.kelas || s.class || "") === kelas;
      };

      const filteredStudents = students.filter(matchKelas);
      const studentNis = new Set(
        filteredStudents.map((s) => s.nis).filter(Boolean) as string[]
      );

      let rows: Record<string, unknown>[] = [];
      let baseName = "";

      if (reportType === "raport") {
        baseName = `Raport_Siswa_${kelas || "Semua"}_${semester}_${tahunAjaran.replace("/", "-")}`;
        rows = grades
          .filter((g: any) => {
            if (kelas) {
              const byKelas = g.kelas === kelas;
              const byNis = g.nis && studentNis.has(g.nis);
              if (!byKelas && !byNis) return false;
            }
            if (g.tahun_ajaran && g.tahun_ajaran !== tahunAjaran) return false;
            if (
              g.semester &&
              String(g.semester).toLowerCase() !== semester.toLowerCase() &&
              !String(g.semester).toLowerCase().includes(semester.toLowerCase().slice(0, 3))
            ) {
              return false;
            }
            return true;
          })
          .map((g: any) => ({
            NIS: g.nis,
            Nama: g.nama_lengkap || g.nama || "-",
            Kelas: g.kelas || kelas,
            Mapel: g.mapel,
            Tugas: g.tugas,
            UTS: g.uts,
            UAS: g.uas,
            Nilai_Akhir: g.nilai_akhir,
            Predikat: g.predikat,
            Semester: g.semester,
            Tahun_Ajaran: g.tahun_ajaran,
          }));
      } else if (reportType === "surat") {
        baseName = `Surat_Keterangan_Aktif_${kelas || "Semua"}`;
        rows = filteredStudents.map((s) => ({
          NIS: s.nis,
          Nama: s.nama_lengkap || s.namaLengkap || "-",
          Kelas: s.kelas || s.class || "-",
          Status: s.status || "aktif",
          Jenis_Kelamin: s.jenis_kelamin || "-",
          Keterangan: "Siswa aktif terdaftar di Golden Gate School",
          Tahun_Ajaran: tahunAjaran,
          Semester: semester,
        }));
      } else {
        baseName = `Rekap_Absensi_${kelas || "Semua"}`;
        rows = attendance
          .filter((a: any) => {
            if (!kelas) return true;
            return a.kelas === kelas || studentNis.has(a.nis);
          })
          .map((a: any) => ({
            NIS: a.nis,
            Nama: a.nama_lengkap || a.nama || "-",
            Kelas: a.kelas || kelas,
            Tanggal: a.tanggal,
            Status: a.status,
            Keterangan: a.keterangan || "-",
          }));
      }

      if (!rows.length) {
        setSuccessMessage(
          "Tidak ada data yang cocok dengan filter (kelas/tahun/semester). Periksa data di database."
        );
        return;
      }

      const ext = formatDoc === "excel" ? "xlsx" : formatDoc === "pdf" ? "txt" : "csv";
      const filename = `${baseName}.${ext === "txt" ? "txt" : ext === "xlsx" ? "xlsx" : "csv"}`;

      if (formatDoc === "excel") {
        const XLSX = await import("xlsx");
        const ws = XLSX.utils.json_to_sheet(rows);
        ws["!cols"] = Object.keys(rows[0]).map(() => ({ wch: 16 }));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Laporan");
        XLSX.writeFile(wb, filename.replace(/\.csv$/, ".xlsx").replace(/\.txt$/, ".xlsx"));
        setSuccessMessage(`Berhasil mengunduh ${filename.replace(/\.(csv|txt)$/, ".xlsx")} (${rows.length} baris dari API).`);
      } else if (formatDoc === "pdf") {
        // Lightweight printable text export (no dedicated PDF service on BE)
        const header = `Golden Gate School — ${baseName}\nTahun Ajaran: ${tahunAjaran} | Semester: ${semester} | Kelas: ${kelas || "Semua"}\nDiekspor: ${new Date().toLocaleString("id-ID")}\n\n`;
        const body = rows
          .map((r, i) => `${i + 1}. ${Object.entries(r).map(([k, v]) => `${k}: ${v}`).join(" | ")}`)
          .join("\n");
        downloadTextFile(
          filename.replace(/\.xlsx$/, ".txt").replace(/\.csv$/, ".txt"),
          header + body,
          "text/plain;charset=utf-8"
        );
        setSuccessMessage(
          `Berhasil mengunduh laporan teks (cetak/PDF via browser) — ${rows.length} baris dari API.`
        );
      } else {
        downloadTextFile(filename, toCsv(rows), "text/csv;charset=utf-8");
        setSuccessMessage(`Berhasil mengunduh ${filename} (${rows.length} baris dari API).`);
      }
    } catch {
      setSuccessMessage("Gagal mengekspor laporan. Pastikan backend berjalan dan data tersedia.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            Ekspor Laporan &amp; Cetak Dokumen (PDF / Excel)
          </h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>
            Cetak Raport Digital Siswa, Surat Keterangan Sekolah, serta Rekap Kehadiran/Absensi.
          </p>
        </div>
      </div>

      {/* ── Summary Stats ──────────────────────────────────────────────────── */}
      {statsLoading ? (
        <div className="flex items-center gap-2 text-sm text-gray-500 py-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Memuat statistik sekolah…
        </div>
      ) : statsError ? (
        <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {statsError}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<Users className="w-5 h-5" />}
            label="Total Siswa"
            value={stats.students.total}
            sub={`L: ${stats.students.male} · P: ${stats.students.female}`}
            color="#2563eb"
            bg="#eff6ff"
          />
          <StatCard
            icon={<GraduationCap className="w-5 h-5" />}
            label="Total Guru"
            value={stats.teachers.total}
            color="#7c3aed"
            bg="#f5f3ff"
          />
          <StatCard
            icon={<CalendarCheck className="w-5 h-5" />}
            label="Tingkat Kehadiran"
            value={`${stats.attendance.rate ?? 0}%`}
            color="#059669"
            bg="#ecfdf5"
          />
          <StatCard
            icon={<UserPlus className="w-5 h-5" />}
            label="Pendaftar PPDB"
            value={stats.ppdb.total}
            sub={gradeCount !== null ? `${gradeCount} entri nilai tercatat` : undefined}
            color="#d97706"
            bg="#fffbeb"
          />
        </div>
      ) : null}

      {/* ── Document Type Cards ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Raport Siswa */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`bg-white p-6 rounded-2xl border-2 cursor-pointer transition-all ${
            reportType === "raport" ? "border-[#23305d] shadow-md" : "border-gray-100 hover:border-[#d9ab3f]"
          }`}
          onClick={() => setReportType("raport")}
        >
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <FileCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold mb-1" style={{ color: COLORS.primary }}>
            Raport Digital Siswa
          </h3>
          <p className="text-xs text-gray-500">
            Export kolektif raport semester lengkap dengan nilai tugas, UTS, UAS, &amp; predikat kelulusan.
          </p>
        </motion.div>

        {/* Surat Keterangan Sekolah */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`bg-white p-6 rounded-2xl border-2 cursor-pointer transition-all ${
            reportType === "surat" ? "border-[#23305d] shadow-md" : "border-gray-100 hover:border-[#d9ab3f]"
          }`}
          onClick={() => setReportType("surat")}
        >
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold mb-1" style={{ color: COLORS.primary }}>
            Surat Keterangan Aktif / SKL
          </h3>
          <p className="text-xs text-gray-500">
            Cetak otomatis Surat Keterangan Siswa Aktif, Surat Bebas Pustaka, atau SKL dengan kop resmi sekolah.
          </p>
        </motion.div>

        {/* Rekap Absensi */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`bg-white p-6 rounded-2xl border-2 cursor-pointer transition-all ${
            reportType === "absensi" ? "border-[#23305d] shadow-md" : "border-gray-100 hover:border-[#d9ab3f]"
          }`}
          onClick={() => setReportType("absensi")}
        >
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold mb-1" style={{ color: COLORS.primary }}>
            Rekap Kehadiran / Absensi
          </h3>
          <p className="text-xs text-gray-500">
            Unduh rekapitulasi presensi bulanan/semester per kelas (Hadir, Izin, Sakit, Alpha).
          </p>
        </motion.div>
      </div>

      {/* ── Export Form ────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold mb-4" style={{ color: COLORS.primary }}>
          Konfigurasi Export{" "}
          {reportType === "raport"
            ? "Raport"
            : reportType === "surat"
            ? "Surat Keterangan"
            : "Rekap Absensi"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Tahun Ajaran */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Tahun Ajaran
            </label>
            <select
              value={tahunAjaran}
              onChange={(e) => setTahunAjaran(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-2 text-sm border focus:outline-none"
            >
              <option value="2026/2027">2026/2027</option>
              <option value="2025/2026">2025/2026</option>
            </select>
          </div>

          {/* Semester */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Semester
            </label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-2 text-sm border focus:outline-none"
            >
              <option value="Ganjil">Ganjil</option>
              <option value="Genap">Genap</option>
            </select>
          </div>

          {/* Pilih Kelas — dynamically populated from real student data */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Pilih Kelas
            </label>
            {kelasLoading ? (
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 text-sm text-gray-400">
                <Loader2 className="w-3 h-3 animate-spin" />
                Memuat kelas…
              </div>
            ) : kelasOptions.length > 0 ? (
              <select
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="w-full border-gray-300 rounded-lg p-2 text-sm border focus:outline-none"
              >
                {kelasOptions.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            ) : (
              /* Fallback: free-text input when no students exist in DB yet */
              <input
                type="text"
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                placeholder="Contoh: 1-A"
                className="w-full border-gray-300 rounded-lg p-2 text-sm border focus:outline-none"
              />
            )}
          </div>

          {/* Format Unduhan */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Format Unduhan
            </label>
            <select
              value={formatDoc}
              onChange={(e) => setFormatDoc(e.target.value as "pdf" | "excel")}
              className="w-full border-gray-300 rounded-lg p-2 text-sm border focus:outline-none font-semibold text-indigo-700"
            >
              <option value="pdf">PDF Document (.pdf)</option>
              <option value="excel">Excel Spreadsheet (.xlsx)</option>
            </select>
          </div>
        </div>

        {/* Success message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 mb-4 rounded-lg bg-emerald-50 text-emerald-800 text-sm flex items-center gap-2 border border-emerald-200"
          >
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}

        {/* Action buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={handleExport}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium text-sm transition-all hover:opacity-90 shadow-sm disabled:opacity-60"
            style={{ backgroundColor: COLORS.primary }}
          >
            {isGenerating ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Printer size={18} />
            )}
            {isGenerating ? "Memproses PDF/Excel..." : "Pratinjau & Cetak PDF"}
          </button>
          <button
            onClick={handleExport}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium text-sm transition-all hover:opacity-90 shadow-sm disabled:opacity-60"
            style={{ backgroundColor: COLORS.accent }}
          >
            <Download size={18} />
            Unduh File ({formatDoc.toUpperCase()})
          </button>
        </div>
      </div>
    </div>
  );
};
