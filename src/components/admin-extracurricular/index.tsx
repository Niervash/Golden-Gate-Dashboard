import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { extracurricularApi } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";
import {
  Activity,
  Plus,
  Search,
  Users,
  Calendar,
  Clock,
  MapPin,
  UserCheck,
  Edit3,
  Trash2,
  X,
  CheckCircle2,
  Award,
  Filter,
  UserPlus
} from "lucide-react";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  accentLight: "#af9151",
  white: "#ffffff",
  goldTransparent: "rgba(217, 171, 63, 0.1)",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
};

interface Ekstrakurikuler {
  id: string;
  nama: string;
  deskripsi: string;
  pembina: string;
  hari_latihan: string;
  jam_latihan: string;
  lokasi: string;
  kuota: number;
  jumlah_siswa: number;
  kategori: string;
  is_active: boolean;
}

interface SiswaEkskul {
  id: string;
  ekskul_id: string;
  nama_siswa: string;
  nisn: string;
  kelas: string;
  tahun_ajaran: string;
  tanggal_daftar: string;
}



export const AdminExtracurricular: React.FC = () => {
  const [ekskulList, setEkskulList] = useState<Ekstrakurikuler[]>([]);
  const [siswaEkskulList, setSiswaEkskulList] = useState<SiswaEkskul[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"daftar" | "anggota">("daftar");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEkskulFilter, setSelectedEkskulFilter] = useState<string>("all");
  const { toast } = useToast();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEkskul, setEditingEkskul] = useState<Ekstrakurikuler | null>(null);
  
  // Modal Siswa State
  const [isSiswaModalOpen, setIsSiswaModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    pembina: "",
    hari_latihan: "",
    jam_latihan: "",
    lokasi: "",
    kuota: 30,
    kategori: "Olahraga",
  });

  const [siswaFormData, setSiswaFormData] = useState({
    ekskul_id: "1",
    nama_siswa: "",
    nisn: "",
    kelas: "X-A",
    tahun_ajaran: "2024/2025",
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ekskulRes, siswaRes] = await Promise.all([
        extracurricularApi.getAll(),
        extracurricularApi.getStudents(),
      ]);
      setEkskulList(ekskulRes.data?.data || ekskulRes.data || []);
      setSiswaEkskulList(siswaRes.data?.data || siswaRes.data || []);
    } catch {
      toast({ title: "Error", description: "Gagal memuat data ekstrakurikuler", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingEkskul(null);
    setFormData({ nama: "", deskripsi: "", pembina: "", hari_latihan: "", jam_latihan: "", lokasi: "", kuota: 30, kategori: "Olahraga" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: Ekstrakurikuler) => {
    setEditingEkskul(item);
    setFormData({
      nama: item.nama,
      deskripsi: item.deskripsi,
      pembina: item.pembina,
      hari_latihan: item.hari_latihan,
      jam_latihan: item.jam_latihan,
      lokasi: item.lokasi,
      kuota: item.kuota,
      kategori: item.kategori,
    });
    setIsModalOpen(true);
  };

  const handleSaveEkskul = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEkskul) {
        await extracurricularApi.update(editingEkskul.id, formData);
        toast({ title: "Berhasil", description: "Ekstrakurikuler diperbarui" });
      } else {
        await extracurricularApi.create(formData);
        toast({ title: "Berhasil", description: "Ekstrakurikuler baru ditambahkan" });
      }
      setIsModalOpen(false);
      fetchData();
    } catch {
      toast({ title: "Error", description: "Gagal menyimpan data", variant: "destructive" });
    }
  };

  const handleDeleteEkskul = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus ekstrakurikuler ini?")) return;
    try {
      await extracurricularApi.delete(id);
      toast({ title: "Berhasil", description: "Ekstrakurikuler dihapus" });
      fetchData();
    } catch {
      toast({ title: "Error", description: "Gagal menghapus data", variant: "destructive" });
    }
  };

  const handleSaveSiswa = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await extracurricularApi.registerStudent({
        ...siswaFormData,
        tanggal_daftar: new Date().toISOString().split("T")[0],
      });
      toast({ title: "Berhasil", description: "Siswa berhasil didaftarkan" });
      setIsSiswaModalOpen(false);
      fetchData();
    } catch {
      toast({ title: "Error", description: "Gagal mendaftarkan siswa", variant: "destructive" });
    }
  };

  const filteredEkskul = ekskulList.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pembina.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSiswaEkskul = siswaEkskulList.filter((item) => {
    const matchSearch =
      item.nama_siswa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nisn.includes(searchTerm) ||
      item.kelas.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEkskul = selectedEkskulFilter === "all" || item.ekskul_id === selectedEkskulFilter;
    return matchSearch && matchEkskul;
  });

  return (
    <div className="space-y-6 pb-10">
      {/* Header Page */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            Manajemen Ekstrakurikuler
          </h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>
            Kelola daftar kegiatan ekstrakurikuler, pembina, serta anggota siswa terdaftar.
          </p>
        </div>
        <div className="flex gap-2">
          {activeTab === "daftar" ? (
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium text-sm transition-all hover:opacity-90 shadow-sm"
              style={{ backgroundColor: COLORS.primary }}
            >
              <Plus size={16} /> Tambah Ekskul
            </button>
          ) : (
            <button
              onClick={() => setIsSiswaModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium text-sm transition-all hover:opacity-90 shadow-sm"
              style={{ backgroundColor: COLORS.accent }}
            >
              <UserPlus size={16} /> Daftar Siswa Ekskul
            </button>
          )}
        </div>
      </div>

      {/* Tabs Nav */}
      <div className="flex border-b" style={{ borderColor: COLORS.grayMedium }}>
        <button
          onClick={() => setActiveTab("daftar")}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === "daftar" ? "bg-white" : "hover:bg-gray-50"
          }`}
          style={{
            color: activeTab === "daftar" ? COLORS.primary : COLORS.secondary,
            borderBottomColor: activeTab === "daftar" ? COLORS.primary : "transparent",
          }}
        >
          <Activity className="w-4 h-4" /> Daftar Kegiatan Ekskul
        </button>
        <button
          onClick={() => setActiveTab("anggota")}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === "anggota" ? "bg-white" : "hover:bg-gray-50"
          }`}
          style={{
            color: activeTab === "anggota" ? COLORS.primary : COLORS.secondary,
            borderBottomColor: activeTab === "anggota" ? COLORS.primary : "transparent",
          }}
        >
          <Users className="w-4 h-4" /> Data Siswa Ekskul ({siswaEkskulList.length})
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center" style={{ borderColor: COLORS.grayMedium }}>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={activeTab === "daftar" ? "Cari nama ekskul/pembina..." : "Cari nama siswa/NISN..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
            style={{ borderColor: COLORS.grayMedium }}
          />
        </div>

        {activeTab === "anggota" && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedEkskulFilter}
              onChange={(e) => setSelectedEkskulFilter(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border bg-white focus:outline-none"
              style={{ borderColor: COLORS.grayMedium }}
            >
              <option value="all">Semua Ekstrakurikuler</option>
              {ekskulList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Tab 1: Daftar Ekskul */}
      {activeTab === "daftar" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEkskul.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border p-5 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              style={{ borderColor: COLORS.grayMedium }}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                    {item.kategori}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteEkskul(item.id)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>
                    {item.nama}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.deskripsi}</p>
                </div>

                <div className="space-y-2 pt-2 text-xs text-gray-600 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-amber-500" />
                    <span>Pembina: <strong>{item.pembina}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span>Jadwal: {item.hari_latihan} ({item.jam_latihan})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span>Lokasi: {item.lokasi}</span>
                  </div>
                </div>
              </div>

              {/* Progress bar kuota */}
              <div className="space-y-1.5 pt-3 border-t border-gray-100">
                <div className="flex justify-between text-xs font-medium text-gray-600">
                  <span>Anggota Terdaftar</span>
                  <span>
                    {item.jumlah_siswa} / {item.kuota} Siswa
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min((item.jumlah_siswa / item.kuota) * 100, 100)}%`,
                      backgroundColor: COLORS.accent,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Tab 2: Data Siswa Ekskul */}
      {activeTab === "anggota" && (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: COLORS.grayMedium }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr style={{ backgroundColor: COLORS.grayLight, borderBottom: `1px solid ${COLORS.grayMedium}` }}>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Siswa</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">NISN</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Kelas</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Ekstrakurikuler</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Tahun Ajaran</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSiswaEkskul.map((siswa) => {
                  const ekskulObj = ekskulList.find((e) => e.id === siswa.ekskul_id);
                  return (
                    <tr key={siswa.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-sm" style={{ color: COLORS.primary }}>
                        {siswa.nama_siswa}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{siswa.nisn}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{siswa.kelas}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          {ekskulObj ? ekskulObj.nama : "Umum"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{siswa.tahun_ajaran}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm("Hapus pendaftaran siswa ini dari ekskul?")) {
                              setSiswaEkskulList((prev) => prev.filter((s) => s.id !== siswa.id));
                            }
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Tambah/Edit Ekskul */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-5 border-b flex justify-between items-center" style={{ backgroundColor: COLORS.primary, color: "#fff" }}>
                <h3 className="font-bold text-lg">
                  {editingEkskul ? "Edit Ekstrakurikuler" : "Tambah Ekstrakurikuler Baru"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveEkskul} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Nama Ekskul</label>
                  <input
                    type="text"
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
                    placeholder="Contoh: Basket Ball"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Kategori</label>
                    <select
                      value={formData.kategori}
                      onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none"
                    >
                      <option value="Olahraga">Olahraga</option>
                      <option value="Seni & Budaya">Seni & Budaya</option>
                      <option value="Sains & Teknologi">Sains & Teknologi</option>
                      <option value="Kepemimpinan">Kepemimpinan</option>
                      <option value="Keagamaan">Keagamaan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Pembina</label>
                    <input
                      type="text"
                      required
                      value={formData.pembina}
                      onChange={(e) => setFormData({ ...formData, pembina: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
                      placeholder="Nama Guru / Coach"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Hari Latihan</label>
                    <input
                      type="text"
                      required
                      value={formData.hari_latihan}
                      onChange={(e) => setFormData({ ...formData, hari_latihan: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
                      placeholder="Senin, Rabu"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Jam Latihan</label>
                    <input
                      type="text"
                      required
                      value={formData.jam_latihan}
                      onChange={(e) => setFormData({ ...formData, jam_latihan: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
                      placeholder="15:00 - 17:00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Lokasi</label>
                    <input
                      type="text"
                      required
                      value={formData.lokasi}
                      onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
                      placeholder="Lapangan / Lab"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Kuota Maksimal</label>
                    <input
                      type="number"
                      required
                      value={formData.kuota}
                      onChange={(e) => setFormData({ ...formData, kuota: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Deskripsi Singkat</label>
                  <textarea
                    rows={3}
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
                    placeholder="Tulis deskripsi kegiatan..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-semibold text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-semibold text-white rounded-lg hover:opacity-90"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    Simpan Data
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Pendaftaran Siswa */}
      <AnimatePresence>
        {isSiswaModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-5 border-b flex justify-between items-center" style={{ backgroundColor: COLORS.accent, color: "#fff" }}>
                <h3 className="font-bold text-lg">Pendaftaran Siswa Ekskul</h3>
                <button onClick={() => setIsSiswaModalOpen(false)} className="text-white hover:opacity-80">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveSiswa} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Pilih Ekskul</label>
                  <select
                    value={siswaFormData.ekskul_id}
                    onChange={(e) => setSiswaFormData({ ...siswaFormData, ekskul_id: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none"
                  >
                    {ekskulList.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.nama}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Nama Lengkap Siswa</label>
                  <input
                    type="text"
                    required
                    value={siswaFormData.nama_siswa}
                    onChange={(e) => setSiswaFormData({ ...siswaFormData, nama_siswa: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
                    placeholder="Nama Siswa"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">NISN</label>
                    <input
                      type="text"
                      required
                      value={siswaFormData.nisn}
                      onChange={(e) => setSiswaFormData({ ...siswaFormData, nisn: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
                      placeholder="00123..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Kelas</label>
                    <input
                      type="text"
                      required
                      value={siswaFormData.kelas}
                      onChange={(e) => setSiswaFormData({ ...siswaFormData, kelas: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
                      placeholder="Contoh: 1-A"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setIsSiswaModalOpen(false)}
                    className="px-4 py-2 text-sm font-semibold text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-semibold text-white rounded-lg hover:opacity-90"
                    style={{ backgroundColor: COLORS.accent }}
                  >
                    Daftarkan Siswa
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
