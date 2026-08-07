import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { achievementsApi } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";
import {
  Search,
  Plus,
  Trophy,
  Award,
  Medal,
  Edit,
  Trash2,
  X,
  Star,
  Filter,
  Globe,
  MapPin,
  Building2,
  Crown,
} from "lucide-react";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  accentLight: "#af9151",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
  white: "#ffffff",
};

type AchievementLevel = "Internasional" | "Nasional" | "Provinsi" | "Kota" | "Sekolah";
type AchievementType = "Akademik" | "Olahraga" | "Seni" | "Teknologi" | "Lainnya";

interface Achievement {
  id: string;
  title: string;
  student: string;
  kelas: string;
  date: string;
  type: AchievementType;
  level: AchievementLevel;
  rank: string;
  pembina: string;
}



const levelConfig: Record<AchievementLevel, { color: string; bg: string; icon: React.ReactNode }> = {
  Internasional: { color: "#7c3aed", bg: "rgba(124,58,237,0.1)", icon: <Globe size={12} /> },
  Nasional:      { color: "#059669", bg: "rgba(5,150,105,0.1)",  icon: <Crown size={12} /> },
  Provinsi:      { color: "#2563eb", bg: "rgba(37,99,235,0.1)",  icon: <MapPin size={12} /> },
  Kota:          { color: "#d97706", bg: "rgba(217,119,6,0.1)",  icon: <Building2 size={12} /> },
  Sekolah:       { color: "#64748b", bg: "rgba(100,116,139,0.1)",icon: <Star size={12} /> },
};

const typeConfig: Record<AchievementType, { emoji: string; color: string }> = {
  Akademik:   { emoji: "📚", color: "#2563eb" },
  Olahraga:   { emoji: "⚽", color: "#16a34a" },
  Seni:       { emoji: "🎨", color: "#db2777" },
  Teknologi:  { emoji: "💻", color: "#7c3aed" },
  Lainnya:    { emoji: "🌟", color: "#d97706" },
};

const EMPTY_FORM: Omit<Achievement, "id"> = {
  title: "", student: "", kelas: "", date: "", type: "Akademik",
  level: "Kota", rank: "Juara 1", pembina: "",
};

export const AdminAchievements: React.FC = () => {
  const [data, setData] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("Semua");
  const [filterLevel, setFilterLevel] = useState<string>("Semua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const { toast } = useToast();

  const types: AchievementType[] = ["Akademik", "Olahraga", "Seni", "Teknologi", "Lainnya"];
  const levels: AchievementLevel[] = ["Internasional", "Nasional", "Provinsi", "Kota", "Sekolah"];

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await achievementsApi.getAll();
      setData(res.data?.data || res.data || []);
    } catch {
      toast({ title: "Error", description: "Gagal memuat data prestasi", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const filtered = data.filter(item => {
    const matchSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.student.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === "Semua" || item.type === filterType;
    const matchLevel = filterLevel === "Semua" || item.level === filterLevel;
    return matchSearch && matchType && matchLevel;
  });

  const stats = {
    total: data.length,
    akademik: data.filter(d => d.type === "Akademik").length,
    nonAkademik: data.filter(d => d.type !== "Akademik").length,
    nasional: data.filter(d => d.level === "Nasional" || d.level === "Internasional").length,
  };

  const openAdd = () => { setForm(EMPTY_FORM); setEditingId(null); setIsModalOpen(true); };
  const openEdit = (item: Achievement) => {
    const { id, ...rest } = item;
    setForm(rest); setEditingId(id); setIsModalOpen(true);
  };
  const handleDelete = async (id: string) => {
    if (!window.confirm("Hapus data prestasi ini?")) return;
    try {
      await achievementsApi.delete(id);
      toast({ title: "Berhasil", description: "Data prestasi dihapus" });
      fetchData();
    } catch {
      toast({ title: "Error", description: "Gagal menghapus data", variant: "destructive" });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await achievementsApi.update(editingId, form);
        toast({ title: "Berhasil", description: "Data prestasi diperbarui" });
      } else {
        await achievementsApi.create(form);
        toast({ title: "Berhasil", description: "Prestasi baru ditambahkan" });
      }
      setIsModalOpen(false);
      fetchData();
    } catch {
      toast({ title: "Error", description: "Gagal menyimpan data", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Manajemen Prestasi</h1>
          <p className="text-sm mt-0.5" style={{ color: COLORS.secondary }}>Kelola data medali, piala, dan kejuaraan siswa Golden Gate School.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-md hover:opacity-90 transition-all hover:-translate-y-0.5"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Plus size={16} /> Tambah Prestasi
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Prestasi", value: stats.total, icon: <Trophy className="w-5 h-5" />, color: "#d9ab3f", bg: "#fef9e7" },
          { label: "Akademik", value: stats.akademik, icon: <Award className="w-5 h-5" />, color: "#2563eb", bg: "#eff6ff" },
          { label: "Non-Akademik", value: stats.nonAkademik, icon: <Medal className="w-5 h-5" />, color: "#16a34a", bg: "#f0fdf4" },
          { label: "Tk. Nasional+", value: stats.nasional, icon: <Crown className="w-5 h-5" />, color: "#7c3aed", bg: "#f5f3ff" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-4 border shadow-sm flex items-center gap-3"
            style={{ borderColor: COLORS.grayMedium }}
          >
            <div className="p-2.5 rounded-xl shrink-0" style={{ background: stat.bg, color: stat.color }}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border shadow-sm space-y-3" style={{ borderColor: COLORS.grayMedium }}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari prestasi atau nama siswa..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/30"
              style={{ borderColor: COLORS.grayMedium }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="border rounded-xl px-3 py-2.5 text-sm focus:outline-none"
              style={{ borderColor: COLORS.grayMedium }}
            >
              <option>Semua</option>
              {types.map(t => <option key={t}>{t}</option>)}
            </select>
            <select
              value={filterLevel}
              onChange={e => setFilterLevel(e.target.value)}
              className="border rounded-xl px-3 py-2.5 text-sm focus:outline-none"
              style={{ borderColor: COLORS.grayMedium }}
            >
              <option>Semua</option>
              {levels.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>
        <p className="text-xs text-gray-500">Menampilkan <strong>{filtered.length}</strong> dari {data.length} data prestasi</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden" style={{ borderColor: COLORS.grayMedium }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ backgroundColor: COLORS.grayLight, borderBottom: `2px solid ${COLORS.grayMedium}` }}>
                {["Judul Prestasi", "Siswa / Tim", "Kategori", "Tingkat", "Peringkat", "Tanggal", "Aksi"].map(h => (
                  <th key={h} className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider" style={{ color: COLORS.secondary }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <Trophy size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="font-medium">Tidak ada data prestasi ditemukan</p>
                  </td>
                </tr>
              ) : filtered.map((item, idx) => {
                const lvl = levelConfig[item.level];
                const typ = typeConfig[item.type];
                return (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.04 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-sm" style={{ color: COLORS.primary }}>{item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Pembina: {item.pembina}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-medium text-gray-800">{item.student}</p>
                      <p className="text-xs text-gray-400">{item.kelas}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: `${typ.color}15`, color: typ.color }}>
                        {typ.emoji} {item.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: lvl.bg, color: lvl.color }}>
                        {lvl.icon} {item.level}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: "rgba(217,171,63,0.15)", color: COLORS.accentLight }}>
                        🏆 {item.rank}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-600">{item.date}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors" title="Edit"><Edit size={15} /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors" title="Hapus"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={e => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
            >
              <div className="p-5 border-b flex justify-between items-center" style={{ borderColor: COLORS.grayMedium, background: `linear-gradient(135deg, ${COLORS.primary}, #151e3d)` }}>
                <div className="flex items-center gap-2.5">
                  <Trophy size={20} className="text-[#d9ab3f]" />
                  <h3 className="font-bold text-white">{editingId ? "Edit Prestasi" : "Tambah Prestasi Baru"}</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-white/60 hover:text-white p-1"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Judul Prestasi *</label>
                  <input required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/30" style={{ borderColor: COLORS.grayMedium }}
                    placeholder="Contoh: Juara 1 OSN Matematika" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Siswa / Tim *</label>
                    <input required value={form.student} onChange={e => setForm(p => ({ ...p, student: e.target.value }))}
                      className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}
                      placeholder="Nama siswa" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Kelas</label>
                    <input value={form.kelas} onChange={e => setForm(p => ({ ...p, kelas: e.target.value }))}
                      className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}
                      placeholder="Contoh: 1-A" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Kategori *</label>
                    <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value as AchievementType }))}
                      className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}>
                      {types.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Tingkat *</label>
                    <select value={form.level} onChange={e => setForm(p => ({ ...p, level: e.target.value as AchievementLevel }))}
                      className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}>
                      {levels.map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Peringkat</label>
                    <input value={form.rank} onChange={e => setForm(p => ({ ...p, rank: e.target.value }))}
                      className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}
                      placeholder="Juara 1 / Medali Emas" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Tanggal</label>
                    <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                      className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Pembina</label>
                  <input value={form.pembina} onChange={e => setForm(p => ({ ...p, pembina: e.target.value }))}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}
                    placeholder="Nama guru pembina" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 border rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors" style={{ borderColor: COLORS.grayMedium }}>
                    Batal
                  </button>
                  <button type="submit"
                    className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90"
                    style={{ backgroundColor: COLORS.primary }}>
                    {editingId ? "Simpan Perubahan" : "Tambah Prestasi"}
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
