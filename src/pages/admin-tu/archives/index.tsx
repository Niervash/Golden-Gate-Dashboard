import React, { useState } from "react";
import { AdminLayout } from "../../../layouts";
import {
  FolderOpen,
  Search,
  Upload,
  FileText,
  Trash2,
  Download,
  Plus,
  Sparkles,
  Info,
  Calendar,
  Lock,
  Eye,
  X,
  ShieldAlert,
  ArrowUpRight,
  Database,
  ExternalLink
} from "lucide-react";

interface ArchiveItem {
  id: string;
  name: string;
  category: string;
  date: string;
  size: string;
  uploader: string;
  access: "Public" | "Confidential" | "Restricted";
  description: string;
  driveLink?: string;
}

const ArchivesPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [driveBaseUrl, setDriveBaseUrl] = useState<string>(() => {
    return localStorage.getItem("ggs_archive_drive_url") || "https://drive.google.com/drive/folders/1_ggs_default_school_archive";
  });
  const [isEditDriveOpen, setIsEditDriveOpen] = useState(false);
  const [tempDriveUrl, setTempDriveUrl] = useState(driveBaseUrl);
  const [docDriveLink, setDocDriveLink] = useState("");

  const [docName, setDocName] = useState("");
  const [docCat, setDocCat] = useState("Kurikulum");
  const [docAccess, setDocAccess] = useState<"Public" | "Confidential" | "Restricted">(
    "Public"
  );
  const [docDesc, setDocDesc] = useState("");
  const [docSize, setDocSize] = useState("1.2 MB");

  const [archives, setArchives] = useState<ArchiveItem[]>(() => {
    const saved = localStorage.getItem("ggs_archives_db");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [
      {
        id: "ARC-001",
        name: "Kurikulum Operasional Satuan Pendidikan (KOSP) 2026.pdf",
        category: "Kurikulum",
        date: "14 Juli 2026",
        size: "4.8 MB",
        uploader: "Admin TU (Siti)",
        access: "Public",
        description: "Dokumen acuan kurikulum KOSP Golden Gate School TA 2026/2027.",
        driveLink: "https://drive.google.com/file/d/1example_kosp_2026/view",
      },
      {
        id: "ARC-002",
        name: "SK Pembagian Tugas Mengajar Semester Ganjil.pdf",
        category: "Kepegawaian",
        date: "12 Juli 2026",
        size: "2.1 MB",
        uploader: "Admin TU (Siti)",
        access: "Restricted",
        description: "Surat Keputusan kepala sekolah mengenai tugas mengajar guru.",
        driveLink: "https://drive.google.com/file/d/1example_sk_tugas/view",
      },
      {
        id: "ARC-003",
        name: "Laporan Pertanggungjawaban PPDB 2026.xlsx",
        category: "Keuangan",
        date: "10 Juli 2026",
        size: "12.4 MB",
        uploader: "Bendahara",
        access: "Confidential",
        description: "Laporan keuangan lengkap pengeluaran dan pemasukan dana PPDB.",
        driveLink: "https://drive.google.com/file/d/1example_lpj_ppdb/view",
      },
      {
        id: "ARC-004",
        name: "Undangan Dinas Pendidikan - Rapat KTSP.pdf",
        category: "Surat Menyurat",
        date: "08 Juli 2026",
        size: "820 KB",
        uploader: "Admin TU (Budi)",
        access: "Public",
        description: "Undangan rapat dinas untuk koordinasi kurikulum KTSP.",
        driveLink: "https://drive.google.com/file/d/1example_undangan/view",
      },
    ];
  });

  const handleSaveDriveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setDriveBaseUrl(tempDriveUrl);
    localStorage.setItem("ggs_archive_drive_url", tempDriveUrl);
    setIsEditDriveOpen(false);
  };

  const categories = [
    "All",
    "Kurikulum",
    "Kepegawaian",
    "Keuangan",
    "Surat Menyurat",
    "Akademik",
    "Lainnya",
  ];

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    const sizes = ["840 KB", "1.5 MB", "3.2 MB", "12.0 MB", "480 KB"];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

    const newDoc: ArchiveItem = {
      id: `ARC-${String(archives.length + 1).padStart(3, "0")}`,
      name:
        docName.endsWith(".pdf") || docName.endsWith(".xlsx") || docName.endsWith(".docx")
          ? docName
          : `${docName}.pdf`,
      category: docCat,
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      size: randomSize,
      uploader: "Admin TU (Siti)",
      access: docAccess,
      description: docDesc || "Tidak ada deskripsi.",
      driveLink: docDriveLink || driveBaseUrl,
    };

    const updated = [newDoc, ...archives];
    setArchives(updated);
    localStorage.setItem("ggs_archives_db", JSON.stringify(updated));
    setIsUploadOpen(false);
    // Reset fields
    setDocName("");
    setDocDesc("");
    setDocDriveLink("");
    setDocAccess("Public");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus arsip dokumen ini?")) {
      const updated = archives.filter((item) => item.id !== id);
      setArchives(updated);
      localStorage.setItem("ggs_archives_db", JSON.stringify(updated));
    }
  };

  const filteredArchives = archives.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getAccessBadgeClass = (access: string) => {
    if (access === "Public") return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
    if (access === "Restricted") return "bg-amber-500/20 text-amber-300 border border-amber-500/30";
    return "bg-red-500/20 text-red-300 border border-red-500/30";
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12">
        {/* Welcome Header */}
        <div
          className="p-6 rounded-2xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          style={{
            background: "linear-gradient(135deg, #23305d 0%, #151e3d 100%)",
            borderColor: "rgba(217, 171, 63, 0.3)",
            color: "#ffffff",
          }}
        >
          <div className="space-y-1">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
              style={{ backgroundColor: "#d9ab3f", color: "#23305d" }}
            >
              Lainnya • Pengarsipan Berkas
            </span>
            <h1 className="text-xl sm:text-2xl font-bold mt-2 text-white">
              Arsip Dokumen Sekolah
            </h1>
            <p className="text-sm" style={{ color: "#af9151" }}>
              Pusat penyimpanan digital dokumen kurikulum, keuangan, surat dinas, dan berkas kepegawaian.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setTempDriveUrl(driveBaseUrl);
                setIsEditDriveOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-[#1a2347] border border-[#d9ab3f]/40 text-[#d9ab3f] hover:bg-[#d9ab3f]/10 transition-all"
            >
              <ExternalLink size={18} />
              Atur Drive Penyimpanan
            </button>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all transform hover:-translate-y-0.5"
              style={{ backgroundColor: "#d9ab3f", color: "#23305d" }}
            >
              <Plus size={18} />
              Arsipkan Berkas Baru
            </button>
          </div>
        </div>

        {/* Current Drive Link Alert Banner */}
        <div className="bg-[#1a2347]/80 border border-[#43424e] rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#d9ab3f]/15 text-[#d9ab3f]">
              <Database size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Lokasi Google Drive Utama DB</p>
              <a
                href={driveBaseUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-[#d9ab3f] hover:underline flex items-center gap-1.5 break-all"
              >
                {driveBaseUrl} <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-bold uppercase whitespace-nowrap">
            Tersimpan di DB
          </span>
        </div>

        {/* Categories Carousel / Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? "bg-[#d9ab3f] text-[#23305d] border-[#d9ab3f]"
                  : "bg-[#1a2347]/60 text-slate-300 border-[#43424e] hover:bg-[#d9ab3f]/10"
              }`}
            >
              {cat === "All" ? "📦 Semua Berkas" : cat}
            </button>
          ))}
        </div>

        {/* Search Bar & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Search Box */}
          <div className="lg:col-span-3 bg-[#1a2347]/60 backdrop-blur-xl rounded-2xl border border-[#43424e] p-4 flex items-center gap-3">
            <Search className="text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Cari nama berkas, nomor arsip, atau deskripsi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none text-white placeholder-slate-400 focus:outline-none w-full text-sm sm:text-base"
            />
          </div>

          {/* Stats Box */}
          <div className="bg-[#1a2347]/60 backdrop-blur-xl rounded-2xl border border-[#43424e] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#d9ab3f]/10 text-[#d9ab3f]">
                <Database size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Total Arsip</p>
                <p className="text-lg font-bold text-white">{filteredArchives.length} Berkas</p>
              </div>
            </div>
            <div className="text-right text-[10px] text-[#af9151] font-mono">
              SECURE DRIVE
            </div>
          </div>
        </div>

        {/* Files Grid/Table */}
        <div className="bg-[#1a2347]/60 backdrop-blur-xl rounded-3xl border border-[#43424e] overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-[#43424e] flex justify-between items-center">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <FolderOpen size={18} className="text-[#d9ab3f]" />
              Daftar Dokumen Digital
            </h3>
            <span className="text-xs text-slate-400">Golden Gate School Cloud Drive</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#23305d]/80 text-white uppercase tracking-wider text-xs border-b border-[#43424e]">
                <tr>
                  <th className="py-4 px-6">ID Arsip</th>
                  <th className="py-4 px-6">Nama Dokumen</th>
                  <th className="py-4 px-6">Kategori</th>
                  <th className="py-4 px-6">Akses</th>
                  <th className="py-4 px-6">Tanggal Upload</th>
                  <th className="py-4 px-6">Ukuran</th>
                  <th className="py-4 px-6">Uploader</th>
                  <th className="py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#43424e]/50 bg-[#121833]/20">
                {filteredArchives.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      Tidak ditemukan arsip berkas yang sesuai pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredArchives.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-all">
                      <td className="py-4 px-6 font-mono font-bold text-[#d9ab3f]">
                        {item.id}
                      </td>
                      <td className="py-4 px-6 max-w-xs">
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-slate-300 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="font-medium text-white truncate" title={item.name}>
                              {item.name}
                            </p>
                            <p className="text-xs text-slate-400 truncate max-w-[240px]">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-[#d9ab3f]/10 text-[#d9ab3f] border border-[#d9ab3f]/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${getAccessBadgeClass(item.access)}`}>
                          {item.access}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-300 text-xs">
                        {item.date}
                      </td>
                      <td className="py-4 px-6 text-slate-300 text-xs font-mono">
                        {item.size}
                      </td>
                      <td className="py-4 px-6 text-slate-300 text-xs">
                        {item.uploader}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={item.driveLink || driveBaseUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-[#1d2950] hover:bg-[#d9ab3f]/20 border border-[#43424e] rounded-xl text-[#d9ab3f] transition-all inline-flex items-center"
                            title="Buka Berkas di Google Drive"
                          >
                            <Eye size={15} />
                          </a>
                          <a
                            href={item.driveLink || driveBaseUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-[#1d2950] hover:bg-[#d9ab3f]/20 border border-[#43424e] rounded-xl text-[#d9ab3f] transition-all inline-flex items-center"
                            title="Unduh / Buka Google Drive"
                          >
                            <Download size={15} />
                          </a>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 bg-[#1d2950] hover:bg-red-500/10 border border-[#43424e] rounded-xl text-red-400 transition-all"
                            title="Hapus Dokumen"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Upload Modal Drawer */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a2347] border border-[#43424e] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl transform transition-all animate-fade-in">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-[#23305d] to-[#151e3d] border-b border-[#43424e] flex justify-between items-center text-white">
              <div className="flex items-center gap-2.5">
                <Upload className="text-[#d9ab3f]" size={20} />
                <h3 className="font-bold text-lg">Arsip Dokumen Baru</h3>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Nama Dokumen / File
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama dokumen (contoh: Rencana KOSP 2026)"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1d2950] text-white border border-[#43424e] rounded-xl focus:border-[#d9ab3f] focus:outline-none text-sm placeholder:text-slate-400/50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Kategori
                  </label>
                  <select
                    value={docCat}
                    onChange={(e) => setDocCat(e.target.value)}
                    className="w-full px-4 py-3 bg-[#1d2950] text-white border border-[#43424e] rounded-xl focus:border-[#d9ab3f] focus:outline-none text-sm"
                  >
                    <option value="Kurikulum">Kurikulum</option>
                    <option value="Kepegawaian">Kepegawaian</option>
                    <option value="Keuangan">Keuangan</option>
                    <option value="Surat Menyurat">Surat Menyurat</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Hak Akses
                  </label>
                  <select
                    value={docAccess}
                    onChange={(e) => setDocAccess(e.target.value as any)}
                    className="w-full px-4 py-3 bg-[#1d2950] text-white border border-[#43424e] rounded-xl focus:border-[#d9ab3f] focus:outline-none text-sm"
                  >
                    <option value="Public">🌍 Public (Semua Guru/Staff)</option>
                    <option value="Restricted">🔒 Restricted (Hanya TU/Kepsek)</option>
                    <option value="Confidential">⛔ Confidential (Kepsek/Ketu)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Link Google Drive Berkas
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/file/d/..."
                  value={docDriveLink}
                  onChange={(e) => setDocDriveLink(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1d2950] text-white border border-[#43424e] rounded-xl focus:border-[#d9ab3f] focus:outline-none text-sm placeholder:text-slate-400/50"
                />
                <p className="text-[10px] text-slate-400">
                  *Link ini akan tersimpan ke DB & terhubung ke Google Drive sekolah Anda.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Deskripsi / Keterangan Berkas
                </label>
                <textarea
                  rows={3}
                  placeholder="Keterangan singkat isi dokumen..."
                  value={docDesc}
                  onChange={(e) => setDocDesc(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1d2950] text-white border border-[#43424e] rounded-xl focus:border-[#d9ab3f] focus:outline-none text-sm placeholder:text-slate-400/50 resize-none"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="flex-1 py-3 bg-[#1d2950] hover:bg-white/5 border border-[#43424e] text-white rounded-xl text-sm font-semibold transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-[#23305d] font-bold rounded-xl text-sm transition-all transform hover:-translate-y-0.5"
                  style={{ backgroundColor: "#d9ab3f" }}
                >
                  Unggah & Arsipkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Drive URL Modal */}
      {isEditDriveOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a2347] border border-[#43424e] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 bg-gradient-to-r from-[#23305d] to-[#151e3d] border-b border-[#43424e] flex justify-between items-center text-white">
              <div className="flex items-center gap-2.5">
                <Database className="text-[#d9ab3f]" size={20} />
                <h3 className="font-bold text-lg">Konfigurasi Link Google Drive DB</h3>
              </div>
              <button onClick={() => setIsEditDriveOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveDriveUrl} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  URL Master Google Drive (Tersimpan di Database)
                </label>
                <input
                  type="url"
                  value={tempDriveUrl}
                  onChange={(e) => setTempDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/drive/folders/..."
                  className="w-full px-4 py-3 bg-[#1d2950] text-white border border-[#43424e] rounded-xl focus:border-[#d9ab3f] focus:outline-none text-sm font-mono"
                  required
                />
                <p className="text-xs text-slate-400">
                  Anda dapat menyesuaikan link Google Drive ini sesuai dengan penyimpanan Drive pilihan Anda. Perubahan akan tersimpan permanen di database sistem.
                </p>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditDriveOpen(false)}
                  className="flex-1 py-3 bg-[#1d2950] border border-[#43424e] text-white rounded-xl text-sm font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-[#23305d] font-bold rounded-xl text-sm"
                  style={{ backgroundColor: "#d9ab3f" }}
                >
                  Simpan ke DB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ArchivesPage;
