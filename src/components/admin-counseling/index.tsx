import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, User, Plus, Search, FileText, Calendar as CalendarIcon, CheckCircle, Clock, X, Save, Loader2 } from "lucide-react";
import { counselingApi } from "../../utils/api";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  grayMedium: "#e9ecef",
  grayLight: "#f8f9fa",
  blueTransparent10: "rgba(35, 48, 93, 0.1)"
};

interface CounselingItem {
  id: number;
  nis: string;
  nama_lengkap: string;
  kelas: string;
  kategori: string;
  kasus: string;
  tanggal: string;
  status: "Proses" | "Selesai";
  tindakan?: string;
  konselor: string;
}

export const CounselingManagementDashboard = () => {
  const [counselingList, setCounselingList] = useState<CounselingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    nis: "", kategori: "Bimbingan Sosial", kasus: "", tanggal: "", status: "Proses", tindakan: "", konselor: ""
  });

  const loadCounseling = async () => {
    setLoading(true);
    try {
      const res = await counselingApi.getAll();
      setCounselingList(res.data);
    } catch (err) {
      console.error("Gagal memuat data konseling:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCounseling();
  }, []);

  const filtered = counselingList.filter(item =>
    (item.nama_lengkap || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.kasus || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selesai = filtered.filter(i => i.status === "Selesai").length;
  const proses = filtered.filter(i => i.status === "Proses").length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nis || !form.kasus || !form.tanggal || !form.konselor) {
      alert("Harap isi semua field yang wajib diisi.");
      return;
    }
    setIsSubmitting(true);
    try {
      await counselingApi.create(form);
      alert("✅ Kasus konseling berhasil dicatat!");
      setIsAddModalOpen(false);
      setForm({ nis: "", kategori: "Bimbingan Sosial", kasus: "", tanggal: "", status: "Proses", tindakan: "", konselor: "" });
      await loadCounseling();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal mencatat kasus.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: "Proses" | "Selesai") => {
    try {
      const item = counselingList.find(c => c.id === id);
      if (!item) return;
      await counselingApi.update(id, { ...item, status: newStatus });
      await loadCounseling();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Hapus catatan konseling ini?")) return;
    try {
      await counselingApi.delete(id);
      await loadCounseling();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: COLORS.primary }}>
            <HeartHandshake className="text-[#d9ab3f]" size={28}/> BK & Konseling
          </h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>Catatan bimbingan, konseling, dan pelanggaran siswa.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium" style={{ borderColor: COLORS.grayMedium, color: COLORS.primary }}>
            <FileText size={16} /> Rekap Kasus
          </button>
          <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors shadow-sm text-sm font-medium" style={{ backgroundColor: COLORS.accent }}>
            <Plus size={16} /> Catat Kasus Baru
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center" style={{ borderColor: COLORS.grayMedium }}>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama siswa atau kasus..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/50 transition-shadow"
            style={{ borderColor: COLORS.grayMedium }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4 text-sm font-medium text-gray-600">
           <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Selesai ({selesai})</div>
           <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Proses ({proses})</div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">
          <Loader2 className="mx-auto animate-spin mb-2" size={32} />
          <p>Memuat data konseling...</p>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400 bg-white rounded-xl border" style={{ borderColor: COLORS.grayMedium }}>
              <HeartHandshake className="mx-auto mb-3 opacity-20" size={48} />
              <p className="font-medium">Belum ada catatan konseling</p>
            </div>
          ) : filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-5 border shadow-sm flex flex-col md:flex-row gap-6 md:items-center justify-between hover:shadow-md transition-shadow" style={{ borderColor: COLORS.grayMedium }}>
              <div className="flex gap-4 items-start md:items-center">
                 <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0" style={{ backgroundColor: COLORS.blueTransparent10, color: COLORS.primary }}>
                    {(item.nama_lengkap || "?").charAt(0)}
                 </div>
                 <div>
                   <h3 className="font-bold text-lg" style={{ color: COLORS.primary }}>
                     {item.nama_lengkap} <span className="text-sm font-normal text-gray-500">({item.kelas})</span>
                   </h3>
                   <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1"><CalendarIcon size={14}/> {item.tanggal}</span>
                      <span className="flex items-center gap-1 font-medium text-gray-900"><FileText size={14} className="text-amber-500"/> {item.kasus}</span>
                      <span className="flex items-center gap-1"><User size={14}/> Konselor: {item.konselor}</span>
                   </div>
                   {item.tindakan && (
                     <p className="text-xs text-gray-500 mt-1 italic">Tindakan: {item.tindakan}</p>
                   )}
                 </div>
              </div>
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-3 flex-shrink-0">
                 {item.status === 'Selesai' ? (
                   <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"><CheckCircle size={14}/> Selesai</span>
                 ) : (
                   <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700"><Clock size={14}/> Proses</span>
                 )}
                 <div className="flex gap-2">
                   {item.status === 'Proses' && (
                     <button onClick={() => handleUpdateStatus(item.id, "Selesai")} className="text-xs font-semibold px-2 py-1 rounded bg-green-50 text-green-700 hover:bg-green-100 transition-colors">Tandai Selesai</button>
                   )}
                   <button onClick={() => handleDelete(item.id)} className="text-xs font-semibold px-2 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors">Hapus</button>
                 </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Modal Tambah Kasus */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold" style={{ color: COLORS.primary }}>Catat Kasus Konseling Baru</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">NIS Siswa *</label>
                    <input required value={form.nis} onChange={e => setForm(p => ({...p, nis: e.target.value}))} placeholder="Masukkan NIS" className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/50" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Tanggal *</label>
                    <input required type="date" value={form.tanggal} onChange={e => setForm(p => ({...p, tanggal: e.target.value}))} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Kategori</label>
                  <select value={form.kategori} onChange={e => setForm(p => ({...p, kategori: e.target.value}))} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option>Bimbingan Sosial</option>
                    <option>Bimbingan Akademik</option>
                    <option>Bimbingan Karir</option>
                    <option>Pelanggaran Disiplin</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Kasus / Permasalahan *</label>
                  <textarea required value={form.kasus} onChange={e => setForm(p => ({...p, kasus: e.target.value}))} placeholder="Deskripsikan kasus..." rows={2} className="w-full px-3 py-2 border rounded-lg text-sm resize-none focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Konselor *</label>
                  <input required value={form.konselor} onChange={e => setForm(p => ({...p, konselor: e.target.value}))} placeholder="Nama konselor" className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Tindakan</label>
                  <textarea value={form.tindakan} onChange={e => setForm(p => ({...p, tindakan: e.target.value}))} placeholder="Tindakan yang diambil (opsional)" rows={2} className="w-full px-3 py-2 border rounded-lg text-sm resize-none focus:outline-none" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">Batal</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-2 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-2" style={{ backgroundColor: COLORS.accent }}>
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {isSubmitting ? "Menyimpan..." : "Simpan"}
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
