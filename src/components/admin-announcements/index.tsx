import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { announcementsApi } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";
import {
  Search,
  Plus,
  Megaphone,
  Bell,
  Calendar,
  Edit,
  Trash2,
  X,
  Eye,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Pin,
} from "lucide-react";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  accentLight: "#af9151",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
};

type AnnouncementStatus = "Aktif" | "Terjadwal" | "Selesai" | "Draft";
type AnnouncementPriority = "Tinggi" | "Normal" | "Rendah";
type AnnouncementTarget = "Semua Siswa" | "Orang Tua" | "Semua Guru" | "Kelas 1 SMP" | "Kelas 2 SMP" | "Kelas 3 SMP";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  status: AnnouncementStatus;
  target: AnnouncementTarget;
  priority: AnnouncementPriority;
  pinned: boolean;
}



const statusConfig: Record<AnnouncementStatus, { color: string; bg: string; icon: React.ReactNode }> = {
  Aktif:     { color: "#16a34a", bg: "#f0fdf4", icon: <CheckCircle size={12} /> },
  Terjadwal: { color: "#2563eb", bg: "#eff6ff", icon: <Clock size={12} /> },
  Selesai:   { color: "#64748b", bg: "#f1f5f9", icon: <CheckCircle size={12} /> },
  Draft:     { color: "#d97706", bg: "#fffbeb", icon: <AlertCircle size={12} /> },
};

const priorityConfig: Record<AnnouncementPriority, { color: string; bg: string }> = {
  Tinggi: { color: "#dc2626", bg: "#fef2f2" },
  Normal: { color: "#2563eb", bg: "#eff6ff" },
  Rendah: { color: "#64748b", bg: "#f1f5f9" },
};

const EMPTY_FORM: Omit<Announcement, "id"> = {
  title: "", content: "", date: "", author: "", status: "Draft",
  target: "Semua Siswa", priority: "Normal", pinned: false,
};

export const AdminAnnouncements: React.FC = () => {
  const [data, setData] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("Semua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewItem, setViewItem] = useState<Announcement | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const { toast } = useToast();

  const statuses: AnnouncementStatus[] = ["Aktif", "Terjadwal", "Selesai", "Draft"];
  const priorities: AnnouncementPriority[] = ["Tinggi", "Normal", "Rendah"];
  const targets: AnnouncementTarget[] = ["Semua Siswa", "Orang Tua", "Semua Guru", "Kelas 1 SMP", "Kelas 2 SMP", "Kelas 3 SMP"];

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await announcementsApi.getAll();
      setData(res.data?.data || res.data || []);
    } catch {
      toast({ title: "Error", description: "Gagal memuat data pengumuman", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const filtered = data.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "Semua" || item.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const pinnedItems = filtered.filter(f => f.pinned);
  const regularItems = filtered.filter(f => !f.pinned);
  const displayList = [...pinnedItems, ...regularItems];

  const stats = {
    total: data.length,
    active: data.filter(d => d.status === "Aktif").length,
    scheduled: data.filter(d => d.status === "Terjadwal").length,
    draft: data.filter(d => d.status === "Draft").length,
  };

  const openAdd = () => { setForm(EMPTY_FORM); setEditingId(null); setIsModalOpen(true); };
  const openEdit = (item: Announcement) => {
    const { id, ...rest } = item;
    setForm(rest); setEditingId(id); setIsModalOpen(true);
  };
  const openView = (item: Announcement) => { setViewItem(item); setIsViewOpen(true); };
  const handleDelete = async (id: string) => {
    if (!window.confirm("Hapus pengumuman ini?")) return;
    try {
      await announcementsApi.delete(id);
      toast({ title: "Berhasil", description: "Pengumuman dihapus" });
      fetchData();
    } catch {
      toast({ title: "Error", description: "Gagal menghapus pengumuman", variant: "destructive" });
    }
  };
  const handleTogglePin = async (id: string) => {
    const item = data.find(d => d.id === id);
    if (!item) return;
    try {
      await announcementsApi.update(id, { ...item, pinned: !item.pinned });
      fetchData();
    } catch {
      toast({ title: "Error", description: "Gagal memperbarui pin", variant: "destructive" });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await announcementsApi.update(editingId, form);
        toast({ title: "Berhasil", description: "Pengumuman diperbarui" });
      } else {
        await announcementsApi.create(form);
        toast({ title: "Berhasil", description: "Pengumuman baru dibuat" });
      }
      setIsModalOpen(false);
      fetchData();
    } catch {
      toast({ title: "Error", description: "Gagal menyimpan pengumuman", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Pengumuman & Mading</h1>
          <p className="text-sm mt-0.5" style={{ color: COLORS.secondary }}>Kelola informasi dan pengumuman internal Golden Gate School.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-md hover:opacity-90 transition-all hover:-translate-y-0.5"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Plus size={16} /> Buat Pengumuman
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: stats.total, icon: <Megaphone size={18} />, color: "#23305d", bg: "#eef0f8" },
          { label: "Aktif", value: stats.active, icon: <Bell size={18} />, color: "#16a34a", bg: "#f0fdf4" },
          { label: "Terjadwal", value: stats.scheduled, icon: <Calendar size={18} />, color: "#2563eb", bg: "#eff6ff" },
          { label: "Draft", value: stats.draft, icon: <AlertCircle size={18} />, color: "#d97706", bg: "#fffbeb" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-4 border shadow-sm flex items-center gap-3" style={{ borderColor: COLORS.grayMedium }}>
            <div className="p-2.5 rounded-xl" style={{ background: stat.bg, color: stat.color }}>{stat.icon}</div>
            <div>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-2xl p-4 border shadow-sm flex flex-wrap gap-3 items-center" style={{ borderColor: COLORS.grayMedium }}>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Cari judul pengumuman..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/30"
            style={{ borderColor: COLORS.grayMedium }} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {["Semua", ...statuses].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className="px-3 py-2 rounded-xl text-xs font-semibold border transition-all"
              style={filterStatus === s
                ? { background: COLORS.primary, color: "#fff", borderColor: COLORS.primary }
                : { borderColor: COLORS.grayMedium, color: COLORS.secondary }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-3">
        {displayList.length === 0 ? (
          <div className="bg-white rounded-2xl border p-12 text-center" style={{ borderColor: COLORS.grayMedium }}>
            <Megaphone size={40} className="mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500 font-medium">Tidak ada pengumuman ditemukan</p>
          </div>
        ) : displayList.map((item, idx) => {
          const st = statusConfig[item.status];
          const pr = priorityConfig[item.priority];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition-all"
              style={{ borderColor: item.pinned ? COLORS.accent : COLORS.grayMedium, borderLeftWidth: item.pinned ? 4 : 1 }}
            >
              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    {item.pinned && <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(217,171,63,0.15)", color: COLORS.accentLight }}><Pin size={10} /> PIN</span>}
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold" style={{ background: st.bg, color: st.color }}>{st.icon} {item.status}</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: pr.bg, color: pr.color }}>{item.priority}</span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1"><Users size={10} /> {item.target}</span>
                  </div>
                  <h3 className="font-bold text-base mb-1" style={{ color: COLORS.primary }}>{item.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-1">{item.content}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {item.date}</span>
                    <span>Oleh: {item.author}</span>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center gap-2 flex-shrink-0">
                  <button onClick={() => openView(item)} className="p-1.5 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors" title="Lihat Detail"><Eye size={15} /></button>
                  <button onClick={() => handleTogglePin(item.id)} className="p-1.5 rounded-lg hover:bg-amber-100 transition-colors" style={{ background: item.pinned ? "rgba(217,171,63,0.15)" : "#f1f5f9", color: item.pinned ? COLORS.accent : "#94a3b8" }} title="Pin/Unpin"><Pin size={15} /></button>
                  <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors" title="Edit"><Edit size={15} /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors" title="Hapus"><Trash2 size={15} /></button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {isViewOpen && viewItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={e => { if (e.target === e.currentTarget) setIsViewOpen(false); }}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
              <div className="p-5 border-b flex justify-between items-center" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, #151e3d)`, borderColor: COLORS.grayMedium }}>
                <div className="flex items-center gap-2"><Megaphone size={20} className="text-[#d9ab3f]" /><h3 className="font-bold text-white">Detail Pengumuman</h3></div>
                <button onClick={() => setIsViewOpen(false)} className="text-white/60 hover:text-white p-1"><X size={20} /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold" style={{ background: statusConfig[viewItem.status].bg, color: statusConfig[viewItem.status].color }}>{viewItem.status}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: priorityConfig[viewItem.priority].bg, color: priorityConfig[viewItem.priority].color }}>{viewItem.priority}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{viewItem.target}</span>
                </div>
                <h2 className="text-xl font-bold" style={{ color: COLORS.primary }}>{viewItem.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{viewItem.content}</p>
                <div className="flex justify-between text-xs text-gray-400 pt-2 border-t" style={{ borderColor: COLORS.grayMedium }}>
                  <span>📅 {viewItem.date}</span>
                  <span>✍️ {viewItem.author}</span>
                </div>
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
              className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
              <div className="p-5 border-b flex justify-between items-center" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, #151e3d)` }}>
                <div className="flex items-center gap-2"><Megaphone size={20} className="text-[#d9ab3f]" /><h3 className="font-bold text-white">{editingId ? "Edit Pengumuman" : "Buat Pengumuman Baru"}</h3></div>
                <button onClick={() => setIsModalOpen(false)} className="text-white/60 hover:text-white p-1"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Judul *</label>
                  <input required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}
                    placeholder="Judul pengumuman" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Isi Pengumuman</label>
                  <textarea rows={3} value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none resize-none" style={{ borderColor: COLORS.grayMedium }}
                    placeholder="Isi pengumuman..." />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Target</label>
                    <select value={form.target} onChange={e => setForm(p => ({ ...p, target: e.target.value as any }))}
                      className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}>
                      {targets.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Prioritas</label>
                    <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value as any }))}
                      className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}>
                      {priorities.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Status</label>
                    <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as any }))}
                      className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}>
                      {statuses.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Tanggal</label>
                    <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                      className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Pembuat</label>
                  <input value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}
                    placeholder="Nama pembuat pengumuman" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="pinned" checked={form.pinned} onChange={e => setForm(p => ({ ...p, pinned: e.target.checked }))} className="w-4 h-4 accent-[#d9ab3f]" />
                  <label htmlFor="pinned" className="text-sm text-gray-600">Pin pengumuman ini di bagian atas</label>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 border rounded-xl text-sm font-semibold hover:bg-gray-50" style={{ borderColor: COLORS.grayMedium }}>Batal</button>
                  <button type="submit"
                    className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90" style={{ backgroundColor: COLORS.primary }}>
                    {editingId ? "Simpan" : "Buat Pengumuman"}
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
