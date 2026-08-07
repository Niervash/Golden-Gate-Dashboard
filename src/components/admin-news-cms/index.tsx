import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { newsApi } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";
import {
  Newspaper,
  Plus,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  X,
  FileText,
  User,
  Calendar,
  CheckCircle,
  Clock,
  Sparkles,
  Globe
} from "lucide-react";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
};

interface Berita {
  id: string;
  judul: string;
  slug: string;
  ringkasan: string;
  konten: string;
  kategori: string;
  penulis: string;
  is_featured: boolean;
  is_published: boolean;
  tanggal_publish: string;
  foto_url?: string;
}



export const AdminNewsCMS: React.FC = () => {
  const [newsList, setNewsList] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKategori, setFilterKategori] = useState<string>("all");
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<Berita | null>(null);

  const [formData, setFormData] = useState<Omit<Berita, "id" | "slug">>({
    judul: "",
    ringkasan: "",
    konten: "",
    kategori: "Akademik",
    penulis: "Admin",
    is_featured: false,
    is_published: true,
    tanggal_publish: new Date().toISOString().split("T")[0],
    foto_url: "",
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await newsApi.getAll();
      setNewsList(res.data?.data || res.data || []);
    } catch {
      toast({ title: "Error", description: "Gagal memuat data berita", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingNews(null);
    setFormData({
      judul: "",
      ringkasan: "",
      konten: "",
      kategori: "Akademik",
      penulis: "Humas Sekolah",
      is_featured: false,
      is_published: true,
      tanggal_publish: new Date().toISOString().split("T")[0],
      foto_url: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: Berita) => {
    setEditingNews(item);
    setFormData({
      judul: item.judul,
      ringkasan: item.ringkasan,
      konten: item.konten,
      kategori: item.kategori,
      penulis: item.penulis,
      is_featured: item.is_featured,
      is_published: item.is_published,
      tanggal_publish: item.tanggal_publish,
      foto_url: item.foto_url || "",
    });
    setIsModalOpen(true);
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSlug = formData.judul.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    try {
      if (editingNews) {
        await newsApi.update(editingNews.id, { ...formData, slug: generatedSlug });
        toast({ title: "Berhasil", description: "Artikel berita diperbarui" });
      } else {
        await newsApi.create({ ...formData, slug: generatedSlug });
        toast({ title: "Berhasil", description: "Artikel baru dipublikasikan" });
      }
      setIsModalOpen(false);
      fetchData();
    } catch {
      toast({ title: "Error", description: "Gagal menyimpan artikel", variant: "destructive" });
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel berita ini?")) return;
    try {
      await newsApi.delete(id);
      toast({ title: "Berhasil", description: "Artikel dihapus" });
      fetchData();
    } catch {
      toast({ title: "Error", description: "Gagal menghapus artikel", variant: "destructive" });
    }
  };

  const filteredNews = newsList.filter((item) => {
    const matchSearch =
      item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ringkasan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKategori = filterKategori === "all" || item.kategori === filterKategori;
    return matchSearch && matchKategori;
  });

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            CMS Berita & Artikel Sekolah
          </h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>
            Kelola publikasi berita, pengumuman publik, artikel prestasi, & liputan kegiatan.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium text-sm transition-all hover:opacity-90 shadow-sm"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Plus size={16} /> Buat Artikel Berita Baru
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center" style={{ borderColor: COLORS.grayMedium }}>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari judul artikel/berita..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
            style={{ borderColor: COLORS.grayMedium }}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filterKategori}
            onChange={(e) => setFilterKategori(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border bg-white focus:outline-none"
            style={{ borderColor: COLORS.grayMedium }}
          >
            <option value="all">Semua Kategori</option>
            <option value="Akademik">Akademik</option>
            <option value="Prestasi">Prestasi</option>
            <option value="Kegiatan">Kegiatan</option>
            <option value="Olahraga">Olahraga</option>
          </select>
        </div>
      </div>

      {/* Article List Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: COLORS.grayMedium }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ backgroundColor: COLORS.grayLight, borderBottom: `1px solid ${COLORS.grayMedium}` }}>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Artikel Berita</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Kategori</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Penulis</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Status</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Tanggal</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredNews.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 max-w-md">
                    <div className="flex items-center gap-3">
                      {item.foto_url ? (
                        <img src={item.foto_url} alt="" className="w-12 h-12 rounded-lg object-cover border" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                          <Newspaper size={20} />
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-sm line-clamp-1" style={{ color: COLORS.primary }}>
                          {item.judul}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.ringkasan}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                      {item.kategori}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.penulis}</td>
                  <td className="px-6 py-4 text-sm">
                    {item.is_published ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Published
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.tanggal_publish}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteNews(item.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Editor Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden my-8"
            >
              <div className="p-5 border-b flex justify-between items-center" style={{ backgroundColor: COLORS.primary, color: "#fff" }}>
                <h3 className="font-bold text-lg">
                  {editingNews ? "Edit Artikel Berita" : "Tulis Artikel Berita Baru"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveNews} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Judul Artikel</label>
                  <input
                    type="text"
                    required
                    value={formData.judul}
                    onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
                    placeholder="Judul Berita Menarik..."
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
                      <option value="Akademik">Akademik</option>
                      <option value="Prestasi">Prestasi</option>
                      <option value="Kegiatan">Kegiatan</option>
                      <option value="Olahraga">Olahraga</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Penulis</label>
                    <input
                      type="text"
                      required
                      value={formData.penulis}
                      onChange={(e) => setFormData({ ...formData, penulis: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">URL Foto Sampul (Gambar)</label>
                  <input
                    type="text"
                    value={formData.foto_url}
                    onChange={(e) => setFormData({ ...formData, foto_url: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Ringkasan (Sub-Judul)</label>
                  <input
                    type="text"
                    required
                    value={formData.ringkasan}
                    onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
                    placeholder="Ringkasan singkat untuk tampilan kartu depan..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Isi Konten Artikel</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.konten}
                    onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 font-mono"
                    placeholder="Tulis lengkap isi artikel di sini..."
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_published}
                      onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                      className="rounded text-indigo-600"
                    />
                    Publikasikan Langsung
                  </label>

                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="rounded text-indigo-600"
                    />
                    Tampilkan di Highlight (Featured)
                  </label>
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
                    Simpan & Publish
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
