import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Users,
  GraduationCap,
  UserCheck,
  X,
  User,
  MapPin,
  Phone,
  Briefcase,
  ChevronDown,
  Upload,
  Link2,
  Sheet,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  FileSpreadsheet,
  Database,
  Info,
  QrCode,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { useStudents, type Student } from "../../context/student-context";
import { useNavigate } from "react-router-dom";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  accentLight: "#af9151",
  white: "#ffffff",
  goldTransparent: "rgba(217, 171, 63, 0.1)",
  goldTransparent20: "rgba(217, 171, 63, 0.2)",
  blueTransparent10: "rgba(35, 48, 93, 0.1)",
  blueTransparent20: "rgba(35, 48, 93, 0.2)",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
};

type SpreadsheetMode = "gsheets" | "upload";

export const StudentManagementDashboard = () => {
  const {
    students,
    source,
    importStatus,
    importMessage,
    lastSyncAt,
    gsheetsUrl,
    setGsheetsUrl,
    fileInputRef,
    importFromFile,
    importFromGSheets,
    clearStudents,
    removeStudent,
    downloadTemplate,
  } = useStudents();

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterKelas, setFilterKelas] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showImportPanel, setShowImportPanel] = useState(students.length === 0);
  const [spreadsheetMode, setSpreadsheetMode] = useState<SpreadsheetMode>("gsheets");

  const localFileRef = useRef<HTMLInputElement>(null);

  // Statistics
  const stats = useMemo(() => ({
    total: students.length,
    aktif: students.filter((s) => s.status === "Aktif" || !s.status).length,
    alumni: students.filter((s) => s.status === "Alumni").length,
    laki: students.filter((s) => s.jenisKelamin === "L").length,
    perempuan: students.filter((s) => s.jenisKelamin === "P").length,
  }), [students]);

  const kelasOptions = useMemo(() => {
    const all = Array.from(new Set(students.map((s) => s.kelas))).filter(Boolean).sort();
    return all;
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.nis.includes(searchTerm) ||
        (s.nisn || "").includes(searchTerm);
      const matchKelas = filterKelas === "Semua" || s.kelas === filterKelas;
      const matchStatus = filterStatus === "Semua" || (s.status || "Aktif") === filterStatus;
      return matchSearch && matchKelas && matchStatus;
    });
  }, [students, searchTerm, filterKelas, filterStatus]);

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "Aktif":
      case undefined:
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">Aktif</span>;
      case "Alumni":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">Alumni</span>;
      case "Pindah":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">Pindah</span>;
      case "Cuti":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">Cuti</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    try { return format(parseISO(dateString), "dd MMMM yyyy", { locale: id }); }
    catch { return dateString; }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) importFromFile(file);
  };

  const handleExport = async () => {
    if (students.length === 0) return;
    const { utils, writeFile } = await import("xlsx");
    const ws = utils.json_to_sheet(students.map((s) => ({
      NIS: s.nis,
      NISN: s.nisn || "",
      "Nama Lengkap": s.namaLengkap,
      Kelas: s.kelas,
      Jurusan: s.jurusan || "",
      "Jenis Kelamin": s.jenisKelamin || "",
      Status: s.status || "Aktif",
    })));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data Siswa");
    writeFile(wb, `DataSiswa_${new Date().toLocaleDateString("id")}.xlsx`);
  };

  const handleRefreshGSheets = () => {
    if (source?.type === "gsheets") importFromGSheets(source.label);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Manajemen Siswa</h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>Kelola data, status, dan informasi profil siswa.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {students.length > 0 && source?.type === "gsheets" && (
            <>
              <button
                onClick={() => window.open(source.label, "_blank")}
                className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-xs font-medium"
                style={{ borderColor: COLORS.grayMedium, color: COLORS.primary }}
                title="Buka Google Sheets sumber data"
              >
                <Link2 size={14} /> Buka Sheets
              </button>
              <button
                onClick={handleRefreshGSheets}
                disabled={importStatus === "loading"}
                className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-xs font-medium disabled:opacity-50"
                style={{ borderColor: COLORS.grayMedium, color: COLORS.primary }}
                title="Sinkronkan ulang dari Google Sheets"
              >
                <RefreshCw size={14} className={importStatus === "loading" ? "animate-spin" : ""} />
                Sinkronkan
              </button>
            </>
          )}
          <button
            onClick={downloadTemplate}
            className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-xs font-medium"
            style={{ borderColor: COLORS.grayMedium, color: COLORS.primary }}
            title="Download template Excel untuk diisi dan diupload ke Google Sheets"
          >
            <Download size={14} /> Template Excel
          </button>
          <button
            onClick={() => navigate("/dashboard/student-cards")}
            className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-xs font-medium"
            style={{ borderColor: COLORS.grayMedium, color: COLORS.primary }}
          >
            <QrCode size={14} /> Generate QR
          </button>
          <button
            onClick={() => { setSelectedStudent(null); setIsModalOpen(true); setIsEditMode(true); }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: COLORS.accent, borderColor: COLORS.accent }}
            title="Tambah data siswa baru secara langsung"
          >
            <Plus size={15} />
            Tambah Siswa
          </button>
          <button
            onClick={() => setShowImportPanel((v) => !v)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors"
            style={showImportPanel
              ? { backgroundColor: COLORS.primary, color: "#fff", borderColor: COLORS.primary }
              : { backgroundColor: "#fff", color: COLORS.primary, borderColor: COLORS.grayMedium }}
          >
            <Sheet size={15} />
            {students.length === 0 ? "Import Spreadsheet" : "Ganti Sumber Data"}
          </button>
        </div>
      </div>

      {/* Setup Guide Banner — shown when no data yet */}
      {students.length === 0 && !showImportPanel && (
        <div className="rounded-2xl border-2 p-5 space-y-3" style={{ borderColor: COLORS.accent + "55", background: "linear-gradient(135deg, #fdf8ed 0%, #fff 100%)" }}>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg" style={{ backgroundColor: COLORS.goldTransparent }}>
              <FileSpreadsheet size={18} style={{ color: COLORS.accent }} />
            </div>
            <div>
              <h3 className="font-bold text-sm" style={{ color: COLORS.primary }}>Panduan: Hubungkan Google Sheets ke Dashboard</h3>
              <p className="text-xs text-gray-500">Ikuti 3 langkah ini untuk sinkronkan data siswa dengan kartu QR secara otomatis.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { step: "1", title: "Download Template", desc: "Klik tombol 'Template Excel' di atas, isi data siswa di file yang didownload.", action: { label: "Download Template", fn: downloadTemplate } },
              { step: "2", title: "Upload ke Google Sheets", desc: "Buka sheets.google.com, buat spreadsheet baru, lalu upload/import file Excel tadi.", action: { label: "Buka Google Sheets", fn: () => window.open("https://sheets.new", "_blank") } },
              { step: "3", title: "Bagikan & Import URL", desc: "Klik Share → 'Anyone with the link – Viewer' → copy URL → paste di kolom Import di bawah.", action: { label: "Import Sekarang", fn: () => setShowImportPanel(true) } },
            ].map(({ step, title, desc, action }) => (
              <div key={step} className="bg-white rounded-xl border p-4 space-y-2" style={{ borderColor: COLORS.grayMedium }}>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: COLORS.primary }}>{step}</span>
                  <p className="font-bold text-xs" style={{ color: COLORS.primary }}>{title}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                <button onClick={action.fn} className="text-xs font-semibold underline" style={{ color: COLORS.accent }}>{action.label} →</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Import Spreadsheet Panel ─────────────────────────────────────── */}
      <AnimatePresence>
        {showImportPanel && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="rounded-2xl border-2 shadow-sm overflow-hidden"
            style={{ borderColor: COLORS.accent + "55", background: "linear-gradient(135deg, #f9f5e9 0%, #fff 100%)" }}
          >
            <div className="p-5 space-y-4">
              {/* Panel Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: COLORS.goldTransparent }}>
                    <Sheet size={16} style={{ color: COLORS.accent }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: COLORS.primary }}>Import Data dari Spreadsheet</h3>
                    <p className="text-xs text-gray-500">Data yang diimpor akan dipakai di seluruh dashboard, termasuk Generate QR Code.</p>
                  </div>
                </div>
                <button onClick={() => setShowImportPanel(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X size={16} className="text-gray-400" />
                </button>
              </div>

              {/* Source indicator if already imported */}
              {source && (
                <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border"
                  style={{ backgroundColor: COLORS.goldTransparent, borderColor: COLORS.accent + "44", color: COLORS.primary }}>
                  <Database size={13} />
                  <span>
                    Sumber aktif: <strong>{source.type === "gsheets" ? "Google Sheets" : source.label}</strong>
                    {" · "}{source.count} siswa · diimpor {format(parseISO(source.importedAt), "dd MMM yyyy HH:mm", { locale: id })}
                  </span>
                  <button onClick={clearStudents} className="ml-auto text-red-400 hover:text-red-600 font-medium">Hapus</button>
                </div>
              )}

              {/* Mode tabs */}
              <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-full sm:w-fit">
                <button
                  onClick={() => setSpreadsheetMode("gsheets")}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${spreadsheetMode === "gsheets" ? "bg-white shadow text-[#23305d]" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <Link2 size={12} /> Google Sheets
                </button>
                <button
                  onClick={() => setSpreadsheetMode("upload")}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${spreadsheetMode === "upload" ? "bg-white shadow text-[#23305d]" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <Upload size={12} /> Upload File
                </button>
              </div>

              {/* ── Google Sheets mode ── */}
              {spreadsheetMode === "gsheets" && (
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2.5 rounded-lg">
                    <Info size={13} className="mt-0.5 shrink-0" />
                    <span>
                      Buka Google Sheets → <strong>Share</strong> → pilih <strong>"Anyone with the link — Viewer"</strong>, lalu copy linknya.
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://docs.google.com/spreadsheets/d/..."
                      value={gsheetsUrl}
                      onChange={(e) => setGsheetsUrl(e.target.value)}
                      className="flex-1 px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/40"
                      style={{ borderColor: COLORS.grayMedium }}
                      onKeyDown={(e) => e.key === "Enter" && importFromGSheets()}
                    />
                    <button
                      onClick={() => importFromGSheets()}
                      disabled={importStatus === "loading"}
                      className="px-4 py-2.5 rounded-lg text-sm font-bold text-white flex items-center gap-2 disabled:opacity-60 whitespace-nowrap"
                      style={{ backgroundColor: COLORS.primary }}
                    >
                      {importStatus === "loading"
                        ? <><Loader2 size={14} className="animate-spin" /> Mengimpor...</>
                        : <><RefreshCw size={14} /> Sinkronkan</>
                      }
                    </button>
                  </div>
                </div>
              )}

              {/* ── Upload mode ── */}
              {spreadsheetMode === "upload" && (
                <div className="space-y-3">
                  <div className="text-xs text-gray-500">
                    Header kolom yang dikenali: <code className="bg-gray-100 px-1 rounded">NIS</code> / <code className="bg-gray-100 px-1 rounded">No Induk</code>, <code className="bg-gray-100 px-1 rounded">Nama</code> / <code className="bg-gray-100 px-1 rounded">Nama Siswa</code>, <code className="bg-gray-100 px-1 rounded">Kelas</code>, <code className="bg-gray-100 px-1 rounded">Jurusan</code>, <code className="bg-gray-100 px-1 rounded">Status</code>, dll.
                  </div>
                  <label className="cursor-pointer block">
                    <input
                      ref={localFileRef}
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <div className="border-2 border-dashed rounded-xl p-6 text-center hover:border-[#d9ab3f] transition-colors group"
                      style={{ borderColor: COLORS.grayMedium }}>
                      <FileSpreadsheet size={28} className="mx-auto mb-2 text-gray-300 group-hover:text-[#d9ab3f] transition-colors" />
                      <p className="text-sm font-semibold text-gray-600">Klik untuk pilih file</p>
                      <p className="text-xs text-gray-400 mt-1">.xlsx, .xls, .csv</p>
                    </div>
                  </label>
                </div>
              )}

              {/* Status messages */}
              {importStatus === "success" && (
                <div className="flex items-center gap-2 text-sm bg-green-50 border border-green-200 text-green-700 px-3 py-2.5 rounded-lg">
                  <CheckCircle2 size={15} /><span>{importMessage}</span>
                  <button className="ml-auto" onClick={() => setShowImportPanel(false)}>
                    <X size={14} />
                  </button>
                </div>
              )}
              {importStatus === "error" && (
                <div className="flex items-start gap-2 text-sm bg-red-50 border border-red-200 text-red-700 px-3 py-2.5 rounded-lg">
                  <AlertCircle size={15} className="mt-0.5 shrink-0" /><span>{importMessage}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Source badge (collapsed) */}
      {!showImportPanel && source && (
        <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border w-fit"
          style={{ backgroundColor: COLORS.goldTransparent, borderColor: COLORS.accent + "44", color: COLORS.primary }}>
          <CheckCircle2 size={13} className="text-green-600" />
          <span>
            {source.type === "gsheets" ? "Google Sheets" : source.label} · <strong>{source.count} siswa</strong>
            {lastSyncAt && ` · sync ${format(parseISO(lastSyncAt), "dd MMM HH:mm", { locale: id })}`}
          </span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4" style={{ borderColor: COLORS.grayMedium }}>
          <div className="p-3 rounded-lg" style={{ backgroundColor: COLORS.blueTransparent10 }}>
            <Users className="w-6 h-6" style={{ color: COLORS.primary }} />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: COLORS.secondary }}>Total Siswa</p>
            <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>{stats.total}</h3>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4" style={{ borderColor: COLORS.grayMedium }}>
          <div className="p-3 rounded-lg bg-green-50">
            <UserCheck className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: COLORS.secondary }}>Siswa Aktif</p>
            <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>{stats.aktif}</h3>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4" style={{ borderColor: COLORS.grayMedium }}>
          <div className="p-3 rounded-lg bg-blue-50">
            <GraduationCap className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: COLORS.secondary }}>Alumni</p>
            <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>{stats.alumni}</h3>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4" style={{ borderColor: COLORS.grayMedium }}>
          <div className="p-3 rounded-lg" style={{ backgroundColor: COLORS.goldTransparent }}>
            <User className="w-6 h-6" style={{ color: COLORS.accent }} />
          </div>
          <div className="flex-1 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium" style={{ color: COLORS.secondary }}>Gender</p>
              <h3 className="text-xl font-bold" style={{ color: COLORS.primary }}>
                {stats.laki} <span className="text-sm font-normal text-gray-500">L</span> / {stats.perempuan} <span className="text-sm font-normal text-gray-500">P</span>
              </h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl p-4 border shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center"
        style={{ borderColor: COLORS.grayMedium }}>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama, NIS, atau NISN..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/50 transition-shadow"
            style={{ borderColor: COLORS.grayMedium }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-40">
            <select
              className="w-full appearance-none pl-4 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/50 bg-white text-sm"
              style={{ borderColor: COLORS.grayMedium, color: COLORS.secondary }}
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
            >
              <option value="Semua">Semua Kelas</option>
              {kelasOptions.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative w-full md:w-40">
            <select
              className="w-full appearance-none pl-4 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/50 bg-white text-sm"
              style={{ borderColor: COLORS.grayMedium, color: COLORS.secondary }}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Semua">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Alumni">Alumni</option>
              <option value="Pindah">Pindah</option>
              <option value="Cuti">Cuti</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: COLORS.grayMedium }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ backgroundColor: COLORS.grayLight, borderBottom: `1px solid ${COLORS.grayMedium}` }}>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Siswa</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>NIS / NISN</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Kelas/Jurusan</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>L/P</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Status</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: COLORS.secondary }}>Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                          style={{ backgroundColor: COLORS.blueTransparent10, color: COLORS.primary }}>
                          {student.namaLengkap.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{student.namaLengkap}</p>
                          <p className="text-xs text-gray-500">{student.email || "-"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900 font-medium">{student.nis}</p>
                      <p className="text-xs text-gray-500">{student.nisn || "-"}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900 font-medium">{student.kelas}</p>
                      <p className="text-xs text-gray-500">{student.jurusan || "-"}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{student.jenisKelamin || "-"}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(student.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setSelectedStudent(student); setIsModalOpen(true); setIsEditMode(false); }}
                          className="p-1.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                          title="Lihat Detail"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => { setSelectedStudent(student); setIsModalOpen(true); setIsEditMode(true); }}
                          className="p-1.5 rounded bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                          title="Edit Siswa"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => navigate("/dashboard/student-cards")}
                          className="p-1.5 rounded bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                          title="Generate QR"
                        >
                          <QrCode size={16} />
                        </button>
                        <button
                          onClick={() => removeStudent(student.id)}
                          className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Database size={48} className="mb-4 opacity-20" />
                      <p className="text-base font-medium text-gray-600">
                        {students.length === 0 ? "Belum ada data siswa" : "Tidak ada hasil pencarian"}
                      </p>
                      {students.length === 0 && (
                        <button
                          onClick={() => setShowImportPanel(true)}
                          className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
                          style={{ backgroundColor: COLORS.primary }}
                        >
                          <Sheet size={15} /> Import dari Spreadsheet
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t flex items-center justify-between"
          style={{ borderColor: COLORS.grayMedium, backgroundColor: COLORS.grayLight }}>
          <span className="text-sm text-gray-500">Menampilkan {filteredStudents.length} dari {students.length} siswa</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded border bg-white text-gray-500 disabled:opacity-50 text-sm" disabled>Sebelumnya</button>
            <button className="px-3 py-1 rounded border text-white text-sm" style={{ backgroundColor: COLORS.primary, borderColor: COLORS.primary }}>1</button>
            <button className="px-3 py-1 rounded border bg-white text-gray-500 disabled:opacity-50 text-sm" disabled>Selanjutnya</button>
          </div>
        </div>
      </div>

      {/* Detail & Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">

                <div className="relative p-6 text-white" style={{ backgroundColor: COLORS.primary }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold bg-white/20 border-2 border-white/30">
                        {selectedStudent ? selectedStudent.namaLengkap.charAt(0) : "S"}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{selectedStudent ? selectedStudent.namaLengkap : "Tambah Siswa Baru"}</h2>
                        <p className="text-sm opacity-90">
                          {selectedStudent ? `${selectedStudent.nis} • ${selectedStudent.kelas}` : "Input data siswa secara manual"}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {isEditMode ? (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const newStudent: Student = {
                      id: selectedStudent?.id || `manual-${Date.now()}`,
                      nis: formData.get("nis") as string,
                      nisn: formData.get("nisn") as string || undefined,
                      namaLengkap: formData.get("namaLengkap") as string,
                      kelas: formData.get("kelas") as string,
                      jurusan: formData.get("jurusan") as string || undefined,
                      jenisKelamin: formData.get("jenisKelamin") as string || undefined,
                      status: formData.get("status") as string || "Aktif",
                      tanggalLahir: formData.get("tanggalLahir") as string || undefined,
                      tempatLahir: formData.get("tempatLahir") as string || undefined,
                      alamat: formData.get("alamat") as string || undefined,
                      noTelp: formData.get("noTelp") as string || undefined,
                      email: formData.get("email") as string || undefined,
                      namaWali: formData.get("namaWali") as string || undefined,
                      pekerjaanWali: formData.get("pekerjaanWali") as string || undefined,
                      noTelpWali: formData.get("noTelpWali") as string || undefined,
                    };
                    const { addOrUpdateStudent } = useStudents();
                    // trigger direct update
                    addOrUpdateStudent(newStudent);
                    setIsModalOpen(false);
                    // show success alert or refresh
                  }} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <h3 className="text-lg font-bold pb-2 border-b border-gray-100" style={{ color: COLORS.primary }}>Form Data Siswa</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-700">Nama Lengkap *</label>
                        <input type="text" name="namaLengkap" defaultValue={selectedStudent?.namaLengkap || ""} required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#d9ab3f]/40 focus:outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-700">NIS (Nomor Induk Siswa) *</label>
                        <input type="text" name="nis" defaultValue={selectedStudent?.nis || ""} required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#d9ab3f]/40 focus:outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-700">NISN</label>
                        <input type="text" name="nisn" defaultValue={selectedStudent?.nisn || ""} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#d9ab3f]/40 focus:outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-700">Kelas *</label>
                        <input type="text" name="kelas" placeholder="Contoh: X-1" defaultValue={selectedStudent?.kelas || ""} required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#d9ab3f]/40 focus:outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-700">Jurusan</label>
                        <input type="text" name="jurusan" placeholder="Contoh: MIPA / IPS" defaultValue={selectedStudent?.jurusan || ""} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#d9ab3f]/40 focus:outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-700">Jenis Kelamin</label>
                        <select name="jenisKelamin" defaultValue={selectedStudent?.jenisKelamin || "L"} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#d9ab3f]/40 focus:outline-none">
                          <option value="L">Laki-laki (L)</option>
                          <option value="P">Perempuan (P)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-700">Status</label>
                        <select name="status" defaultValue={selectedStudent?.status || "Aktif"} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#d9ab3f]/40 focus:outline-none">
                          <option value="Aktif">Aktif</option>
                          <option value="Alumni">Alumni</option>
                          <option value="Pindah">Pindah</option>
                          <option value="Cuti">Cuti</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-700">Tanggal Lahir</label>
                        <input type="date" name="tanggalLahir" defaultValue={selectedStudent?.tanggalLahir || ""} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#d9ab3f]/40 focus:outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-700">Tempat Lahir</label>
                        <input type="text" name="tempatLahir" defaultValue={selectedStudent?.tempatLahir || ""} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#d9ab3f]/40 focus:outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-700">No. Telepon</label>
                        <input type="text" name="noTelp" defaultValue={selectedStudent?.noTelp || ""} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#d9ab3f]/40 focus:outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-700">Email</label>
                        <input type="email" name="email" defaultValue={selectedStudent?.email || ""} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#d9ab3f]/40 focus:outline-none" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-gray-700">Alamat</label>
                      <textarea name="alamat" defaultValue={selectedStudent?.alamat || ""} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#d9ab3f]/40 focus:outline-none h-20 resize-none"></textarea>
                    </div>

                    <h4 className="text-xs uppercase tracking-wider font-semibold pt-4 border-t border-gray-100 flex items-center gap-2" style={{ color: COLORS.accentLight }}>
                      <Users size={14} /> Data Orang Tua / Wali
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-700">Nama Wali</label>
                        <input type="text" name="namaWali" defaultValue={selectedStudent?.namaWali || ""} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#d9ab3f]/40 focus:outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-700">Pekerjaan Wali</label>
                        <input type="text" name="pekerjaanWali" defaultValue={selectedStudent?.pekerjaanWali || ""} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#d9ab3f]/40 focus:outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-700">No. Telepon Wali</label>
                        <input type="text" name="noTelpWali" defaultValue={selectedStudent?.noTelpWali || ""} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#d9ab3f]/40 focus:outline-none" />
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border-t flex justify-end items-center gap-3">
                      <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 transition-colors text-sm font-medium">
                        Batal
                      </button>
                      <button type="submit" className="px-4 py-2 rounded-lg text-white transition-colors text-sm font-medium flex items-center gap-2 shadow-sm hover:opacity-90" style={{ backgroundColor: COLORS.accent }}>
                        Simpan Data
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                      <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>Detail Informasi Siswa</h3>
                      {getStatusBadge(selectedStudent?.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-5">
                        <div>
                          <h4 className="text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-2" style={{ color: COLORS.accentLight }}>
                            <User size={14} /> Data Pribadi
                          </h4>
                          <div className="space-y-3">
                            {selectedStudent?.nisn && <div><p className="text-xs text-gray-500">NISN</p><p className="text-sm font-medium text-gray-900">{selectedStudent.nisn}</p></div>}
                            {selectedStudent?.jenisKelamin && <div><p className="text-xs text-gray-500">Jenis Kelamin</p><p className="text-sm font-medium text-gray-900">{selectedStudent.jenisKelamin === "L" ? "Laki-laki" : selectedStudent.jenisKelamin === "P" ? "Perempuan" : selectedStudent.jenisKelamin}</p></div>}
                            {(selectedStudent?.tempatLahir || selectedStudent?.tanggalLahir) && (
                              <div><p className="text-xs text-gray-500">Tempat, Tanggal Lahir</p>
                                <p className="text-sm font-medium text-gray-900 flex items-center gap-1"><MapPin size={12} className="text-gray-400" /> {selectedStudent.tempatLahir || ""}{selectedStudent.tempatLahir && selectedStudent.tanggalLahir ? ", " : ""}{formatDate(selectedStudent.tanggalLahir)}</p>
                              </div>
                            )}
                            {selectedStudent?.alamat && <div><p className="text-xs text-gray-500">Alamat</p><p className="text-sm font-medium text-gray-900 leading-snug">{selectedStudent.alamat}</p></div>}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-5">
                        <div>
                          <h4 className="text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-2" style={{ color: COLORS.accentLight }}>
                            <Phone size={14} /> Kontak
                          </h4>
                          <div className="space-y-3">
                            {selectedStudent?.noTelp && <div><p className="text-xs text-gray-500">No. Telepon</p><p className="text-sm font-medium text-gray-900">{selectedStudent.noTelp}</p></div>}
                            {selectedStudent?.email && <div><p className="text-xs text-gray-500">Email</p><p className="text-sm font-medium text-gray-900">{selectedStudent.email}</p></div>}
                          </div>
                        </div>
                        {(selectedStudent?.namaWali || selectedStudent?.pekerjaanWali || selectedStudent?.noTelpWali) && (
                          <div>
                            <h4 className="text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-2" style={{ color: COLORS.accentLight }}>
                              <Users size={14} /> Data Orang Tua/Wali
                            </h4>
                            <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                              {selectedStudent?.namaWali && <div><p className="text-xs text-gray-500">Nama Wali</p><p className="text-sm font-medium text-gray-900">{selectedStudent.namaWali}</p></div>}
                              {selectedStudent?.pekerjaanWali && <div><p className="text-xs text-gray-500">Pekerjaan</p><p className="text-sm font-medium text-gray-900 flex items-center gap-1"><Briefcase size={12} className="text-gray-400" /> {selectedStudent.pekerjaanWali}</p></div>}
                              {selectedStudent?.noTelpWali && <div><p className="text-xs text-gray-500">No. Telepon Wali</p><p className="text-sm font-medium text-gray-900">{selectedStudent.noTelpWali}</p></div>}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 border-t flex justify-between items-center gap-3 mt-6">
                      <button
                        onClick={() => { setIsModalOpen(false); navigate("/dashboard/student-cards"); }}
                        className="px-4 py-2 rounded-lg text-white transition-colors text-sm font-medium flex items-center gap-2 shadow-sm hover:opacity-90"
                        style={{ backgroundColor: COLORS.primary }}
                      >
                        <QrCode size={15} /> Generate QR Code
                      </button>
                      <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 transition-colors text-sm font-medium">
                        Tutup
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

