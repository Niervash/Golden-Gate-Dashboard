import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { archivesApi } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";
import {
  Search,
  Plus,
  FolderOpen,
  FileText,
  Download,
  Edit,
  Trash2,
  X,
  Eye,
  Filter,
  Shield,
  Lock,
  Globe,
  AlertTriangle,
  CheckCircle,
  Upload,
} from "lucide-react";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  accentLight: "#af9151",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
};

type ArchiveCategory = "Surat Masuk" | "Surat Keluar" | "Ijazah" | "Dokumen Legal" | "Kepegawaian" | "Keuangan" | "Akademik";
type ArchiveAccess = "Public" | "Restricted" | "Confidential";
type ArchiveType = "PDF" | "DOCX" | "XLSX" | "ZIP" | "IMG";

interface ArchiveItem {
  id: string;
  name: string;
  category: ArchiveCategory;
  date: string;
  size: string;
  type: ArchiveType;
  access: ArchiveAccess;
  description: string;
  uploader: string;
}



const categoryColors: Record<ArchiveCategory, { color: string; bg: string; icon: string }> = {
  "Surat Masuk":  { color: "#2563eb", bg: "#eff6ff", icon: "📨" },
  "Surat Keluar": { color: "#7c3aed", bg: "#f5f3ff", icon: "📤" },
  "Ijazah":       { color: "#d97706", bg: "#fffbeb", icon: "🎓" },
  "Dokumen Legal":{ color: "#dc2626", bg: "#fef2f2", icon: "⚖️" },
  "Kepegawaian":  { color: "#059669", bg: "#f0fdf4", icon: "👤" },
  "Keuangan":     { color: "#0891b2", bg: "#ecfeff", icon: "💰" },
  "Akademik":     { color: "#4f46e5", bg: "#eef2ff", icon: "📚" },
};

const accessConfig: Record<ArchiveAccess, { color: string; bg: string; icon: React.ReactNode; label: string }> = {
  Public:       { color: "#16a34a", bg: "#f0fdf4", icon: <Globe size={11} />,    label: "Public" },
  Restricted:   { color: "#d97706", bg: "#fffbeb", icon: <Lock size={11} />,     label: "Restricted" },
  Confidential: { color: "#dc2626", bg: "#fef2f2", icon: <Shield size={11} />,   label: "Confidential" },
};

const typeColors: Record<ArchiveType, string> = {
  PDF: "#dc2626", DOCX: "#2563eb", XLSX: "#16a34a", ZIP: "#7c3aed", IMG: "#d97706",
};

const EMPTY_FORM: Omit<ArchiveItem, "id"> = {
  name: "", category: "Surat Masuk", date: "", size: "", type: "PDF",
  access: "Public", description: "", uploader: "Admin TU",
};

const categories: ArchiveCategory[] = ["Surat Masuk", "Surat Keluar", "Ijazah", "Dokumen Legal", "Kepegawaian", "Keuangan", "Akademik"];
const accesses: ArchiveAccess[] = ["Public", "Restricted", "Confidential"];
const types: ArchiveType[] = ["PDF", "DOCX", "XLSX", "ZIP", "IMG"];

export const AdminArchive: React.FC = () => {
  const [data, setData] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("Semua");
  const [filterAccess, setFilterAccess] = useState<string>("Semua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewItem, setViewItem] = useState<ArchiveItem | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const { toast } = useToast();

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await archivesApi.getAll();
      setData(res.data?.data || res.data || []);
    } catch {
      toast({ title: "Error", description: "Gagal memuat data arsip", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const filtered = data.filter(item => {
    const matchSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = filterCategory === "Semua" || item.category === filterCategory;
    const matchAccess = filterAccess === "Semua" || item.access === filterAccess;
    return matchSearch && matchCat && matchAccess;
  });

  const stats = {
    total: data.length,
    public: data.filter(d => d.access === "Public").length,
    restricted: data.filter(d => d.access === "Restricted").length,
    confidential: data.filter(d => d.access === "Confidential").length,
  };

  const openAdd = () => { setForm(EMPTY_FORM); setEditingId(null); setIsModalOpen(true); };
  const openEdit = (item: ArchiveItem) => {
    const { id, ...rest } = item;
    setForm(rest); setEditingId(id); setIsModalOpen(true);
  };
  const openView = (item: ArchiveItem) => { setViewItem(item); setIsViewOpen(true); };
  const handleDelete = async (id: string) => {
    if (!window.confirm("Hapus arsip dokumen ini?")) return;
    try {
      await archivesApi.delete(id);
      toast({ title: "Berhasil", description: "Arsip dihapus" });
      fetchData();
    } catch {
      toast({ title: "Error", description: "Gagal menghapus arsip", variant: "destructive" });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await archivesApi.update(editingId, form);
        toast({ title: "Berhasil", description: "Data arsip diperbarui" });
      } else {
        await archivesApi.create(form);
        toast({ title: "Berhasil", description: "Arsip baru ditambahkan" });
      }
      setIsModalOpen(false);
      fetchData();
    } catch {
      toast({ title: "Error", description: "Gagal menyimpan arsip", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Arsip Dokumen</h1>
          <p className="text-sm mt-0.5" style={{ color: COLORS.secondary }}>Manajemen file surat, ijazah, keuangan, dan dokumen legal sekolah.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-md hover:opacity-90 transition-all hover:-translate-y-0.5"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Upload size={16} /> Unggah Dokumen
        </button>
      </div>

      {/* Category Quick Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {categories.map((cat) => {
          const cfg = categoryColors[cat];
          const count = data.filter(d => d.category === cat).length;
          return (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.02 }}
              onClick={() => setFilterCategory(filterCategory === cat ? "Semua" : cat)}
              className="rounded-xl p-3 border text-left transition-all"
              style={{
                borderColor: filterCategory === cat ? cfg.color : COLORS.grayMedium,
                background: filterCategory === cat ? cfg.bg : "#fff",
                boxShadow: filterCategory === cat ? `0 0 0 2px ${cfg.color}40` : undefined,
              }}
            >
              <div className="text-xl mb-1">{cfg.icon}</div>
              <p className="text-xs font-semibold leading-tight" style={{ color: filterCategory === cat ? cfg.color : COLORS.secondary }}>{cat}</p>
              <p className="text-lg font-bold mt-0.5" style={{ color: COLORS.primary }}>{count}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Dokumen", value: stats.total, color: COLORS.primary, bg: "#eef0f8", icon: <FolderOpen size={18} /> },
          { label: "Public", value: stats.public, color: "#16a34a", bg: "#f0fdf4", icon: <Globe size={18} /> },
          { label: "Restricted", value: stats.restricted, color: "#d97706", bg: "#fffbeb", icon: <Lock size={18} /> },
          { label: "Confidential", value: stats.confidential, color: "#dc2626", bg: "#fef2f2", icon: <Shield size={18} /> },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl p-4 border shadow-sm flex items-center gap-3" style={{ borderColor: COLORS.grayMedium }}>
            <div className="p-2.5 rounded-xl" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div>
              <p className="text-xs text-gray-500">{s.label}</p>
              <h3 className="text-xl font-bold" style={{ color: COLORS.primary }}>{s.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search & Access Filter */}
      <div className="bg-white rounded-2xl p-4 border shadow-sm flex flex-wrap gap-3 items-center" style={{ borderColor: COLORS.grayMedium }}>
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Cari nama dokumen atau ID arsip..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/30"
            style={{ borderColor: COLORS.grayMedium }} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-gray-400" />
          <select value={filterAccess} onChange={e => setFilterAccess(e.target.value)}
            className="border rounded-xl px-3 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}>
            <option>Semua</option>
            {accesses.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
        <p className="text-xs text-gray-400 ml-auto"><strong>{filtered.length}</strong> dari {data.length} dokumen</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden" style={{ borderColor: COLORS.grayMedium }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ background: COLORS.grayLight, borderBottom: `2px solid ${COLORS.grayMedium}` }}>
                {["ID", "Nama Dokumen", "Kategori", "Akses", "Ukuran", "Tanggal", "Uploader", "Aksi"].map(h => (
                  <th key={h} className="px-4 py-3.5 text-xs font-bold uppercase tracking-wider" style={{ color: COLORS.secondary }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="py-12 text-center text-gray-400"><FolderOpen size={40} className="mx-auto mb-3 opacity-30" /><p>Tidak ada dokumen ditemukan</p></td></tr>
              ) : filtered.map((item, idx) => {
                const cat = categoryColors[item.category];
                const acc = accessConfig[item.access];
                return (
                  <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.04 }}
                    className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5 font-mono text-xs font-bold" style={{ color: COLORS.accentLight }}>{item.id}</td>
                    <td className="px-4 py-3.5 max-w-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{ background: `${typeColors[item.type]}15`, color: typeColors[item.type] }}>{item.type}</div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm truncate" style={{ color: COLORS.primary }}>{item.name}</p>
                          <p className="text-xs text-gray-400 truncate">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-lg" style={{ background: cat.bg, color: cat.color }}>
                        {cat.icon} {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: acc.bg, color: acc.color }}>
                        {acc.icon} {acc.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-500 font-mono">{item.size}</td>
                    <td className="px-4 py-3.5 text-xs text-gray-600">{item.date}</td>
                    <td className="px-4 py-3.5 text-xs text-gray-600">{item.uploader}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1.5">
                        <button onClick={() => openView(item)} className="p-1.5 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors" title="Lihat"><Eye size={14} /></button>
                        <button className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors" title="Unduh"><Download size={14} /></button>
                        <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors" title="Edit"><Edit size={14} /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors" title="Hapus"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {isViewOpen && viewItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={e => { if (e.target === e.currentTarget) setIsViewOpen(false); }}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
              <div className="p-5 flex justify-between items-center" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, #151e3d)` }}>
                <div className="flex items-center gap-2"><FolderOpen size={20} className="text-[#d9ab3f]" /><h3 className="font-bold text-white">Detail Dokumen</h3></div>
                <button onClick={() => setIsViewOpen(false)} className="text-white/60 hover:text-white p-1"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg" style={{ background: "rgba(217,171,63,0.15)", color: COLORS.accentLight }}>{viewItem.id}</span>
                  <h2 className="text-lg font-bold mt-2" style={{ color: COLORS.primary }}>{viewItem.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{viewItem.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ["Kategori", viewItem.category],
                    ["Tipe", viewItem.type],
                    ["Ukuran", viewItem.size],
                    ["Tanggal", viewItem.date],
                    ["Uploader", viewItem.uploader],
                    ["Akses", viewItem.access],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 font-semibold uppercase">{k}</p>
                      <p className="font-medium text-gray-800 mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-white transition-all hover:opacity-90" style={{ backgroundColor: COLORS.primary }}>
                  <Download size={16} /> Unduh Dokumen
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={e => { if (e.target === e.currentTarget) setIsModalOpen(false); }}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className="p-5 flex justify-between items-center sticky top-0" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, #151e3d)` }}>
                <div className="flex items-center gap-2"><Upload size={20} className="text-[#d9ab3f]" /><h3 className="font-bold text-white">{editingId ? "Edit Dokumen" : "Unggah Dokumen Baru"}</h3></div>
                <button onClick={() => setIsModalOpen(false)} className="text-white/60 hover:text-white p-1"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Nama Dokumen *</label>
                  <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}
                    placeholder="Nama dokumen..." />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Deskripsi</label>
                  <textarea rows={2} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none resize-none" style={{ borderColor: COLORS.grayMedium }}
                    placeholder="Keterangan singkat..." />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Kategori</label>
                    <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value as any }))}
                      className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}>
                      {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Tipe File</label>
                    <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value as any }))}
                      className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}>
                      {types.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Hak Akses</label>
                    <select value={form.access} onChange={e => setForm(p => ({ ...p, access: e.target.value as any }))}
                      className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}>
                      {accesses.map(a => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Tanggal</label>
                    <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                      className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Uploader</label>
                    <input value={form.uploader} onChange={e => setForm(p => ({ ...p, uploader: e.target.value }))}
                      className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}
                      placeholder="Admin TU" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Ukuran</label>
                    <input value={form.size} onChange={e => setForm(p => ({ ...p, size: e.target.value }))}
                      className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}
                      placeholder="1.5 MB" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 border rounded-xl text-sm font-semibold hover:bg-gray-50" style={{ borderColor: COLORS.grayMedium }}>Batal</button>
                  <button type="submit"
                    className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90" style={{ backgroundColor: COLORS.primary }}>
                    {editingId ? "Simpan" : "Unggah Dokumen"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
