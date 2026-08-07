import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calendarEventsApi } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";
import {
  Calendar as CalendarIcon,
  Plus,
  Search,
  Filter,
  MapPin,
  Clock,
  CheckCircle,
  X,
  Edit3,
  Trash2,
  AlertCircle,
  Tag
} from "lucide-react";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
};

interface EventCalendar {
  id: string;
  judul: string;
  deskripsi: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  waktu_mulai?: string;
  waktu_selesai?: string;
  lokasi?: string;
  tipe: "akademik" | "libur" | "kegiatan" | "ujian";
  is_all_day: boolean;
}



export const AdminCalendarEvent: React.FC = () => {
  const [events, setEvents] = useState<EventCalendar[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipe, setFilterTipe] = useState<string>("all");
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventCalendar | null>(null);

  const [formData, setFormData] = useState<Omit<EventCalendar, "id">>({
    judul: "",
    deskripsi: "",
    tanggal_mulai: "",
    tanggal_selesai: "",
    waktu_mulai: "",
    waktu_selesai: "",
    lokasi: "",
    tipe: "kegiatan",
    is_all_day: false,
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await calendarEventsApi.getAll();
      setEvents(res.data?.data || res.data || []);
    } catch {
      toast({ title: "Error", description: "Gagal memuat data kalender", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setFormData({
      judul: "",
      deskripsi: "",
      tanggal_mulai: new Date().toISOString().split("T")[0],
      tanggal_selesai: new Date().toISOString().split("T")[0],
      waktu_mulai: "08:00",
      waktu_selesai: "12:00",
      lokasi: "",
      tipe: "kegiatan",
      is_all_day: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: EventCalendar) => {
    setEditingEvent(item);
    setFormData({
      judul: item.judul,
      deskripsi: item.deskripsi,
      tanggal_mulai: item.tanggal_mulai,
      tanggal_selesai: item.tanggal_selesai,
      waktu_mulai: item.waktu_mulai || "",
      waktu_selesai: item.waktu_selesai || "",
      lokasi: item.lokasi || "",
      tipe: item.tipe,
      is_all_day: item.is_all_day,
    });
    setIsModalOpen(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await calendarEventsApi.update(editingEvent.id, formData);
        toast({ title: "Berhasil", description: "Agenda diperbarui" });
      } else {
        await calendarEventsApi.create(formData);
        toast({ title: "Berhasil", description: "Agenda baru ditambahkan" });
      }
      setIsModalOpen(false);
      fetchData();
    } catch {
      toast({ title: "Error", description: "Gagal menyimpan agenda", variant: "destructive" });
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus agenda kegiatan ini?")) return;
    try {
      await calendarEventsApi.delete(id);
      toast({ title: "Berhasil", description: "Agenda dihapus" });
      fetchData();
    } catch {
      toast({ title: "Error", description: "Gagal menghapus agenda", variant: "destructive" });
    }
  };

  const filteredEvents = events.filter((item) => {
    const matchSearch =
      item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.lokasi && item.lokasi.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchTipe = filterTipe === "all" || item.tipe === filterTipe;
    return matchSearch && matchTipe;
  });

  const getTipeBadge = (tipe: string) => {
    switch (tipe) {
      case "ujian":
        return "bg-red-50 text-red-700 border-red-200";
      case "libur":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "akademik":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "kegiatan":
      default:
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            CRUD Kalender & Agenda Kegiatan
          </h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>
            Kelola jadwal ujian, libur sekolah, serta kegiatan akademik & ekstrakurikuler.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium text-sm transition-all hover:opacity-90 shadow-sm"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Plus size={16} /> Tambah Agenda Kegiatan
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center" style={{ borderColor: COLORS.grayMedium }}>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari judul kegiatan/lokasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
            style={{ borderColor: COLORS.grayMedium }}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filterTipe}
            onChange={(e) => setFilterTipe(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border bg-white focus:outline-none"
            style={{ borderColor: COLORS.grayMedium }}
          >
            <option value="all">Semua Kategori Event</option>
            <option value="kegiatan">Kegiatan</option>
            <option value="akademik">Akademik</option>
            <option value="ujian">Ujian</option>
            <option value="libur">Libur Sekolah</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border p-5 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            style={{ borderColor: COLORS.grayMedium }}
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase border ${getTipeBadge(item.tipe)}`}>
                  {item.tipe}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(item.id)}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>
                  {item.judul}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.deskripsi}</p>
              </div>

              <div className="space-y-2 pt-2 text-xs text-gray-600 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-indigo-500" />
                  <span>
                    Tanggal: <strong>{item.tanggal_mulai}</strong> {item.tanggal_selesai !== item.tanggal_mulai ? ` s/d ${item.tanggal_selesai}` : ""}
                  </span>
                </div>
                {!item.is_all_day && item.waktu_mulai && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Waktu: {item.waktu_mulai} - {item.waktu_selesai || "Selesai"}</span>
                  </div>
                )}
                {item.lokasi && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span>Lokasi: {item.lokasi}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Form */}
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
                  {editingEvent ? "Edit Agenda Kegiatan" : "Tambah Agenda Baru"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveEvent} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Judul Kegiatan</label>
                  <input
                    type="text"
                    required
                    value={formData.judul}
                    onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
                    placeholder="Contoh: Rapat Wali Murid / UAS"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Tipe Event</label>
                    <select
                      value={formData.tipe}
                      onChange={(e) => setFormData({ ...formData, tipe: e.target.value as any })}
                      className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none"
                    >
                      <option value="kegiatan">Kegiatan</option>
                      <option value="akademik">Akademik</option>
                      <option value="ujian">Ujian</option>
                      <option value="libur">Libur Sekolah</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Lokasi</label>
                    <input
                      type="text"
                      value={formData.lokasi}
                      onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
                      placeholder="Aula / Ruang Kelas"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Tanggal Mulai</label>
                    <input
                      type="date"
                      required
                      value={formData.tanggal_mulai}
                      onChange={(e) => setFormData({ ...formData, tanggal_mulai: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Tanggal Selesai</label>
                    <input
                      type="date"
                      required
                      value={formData.tanggal_selesai}
                      onChange={(e) => setFormData({ ...formData, tanggal_selesai: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Waktu Mulai</label>
                    <input
                      type="time"
                      value={formData.waktu_mulai}
                      onChange={(e) => setFormData({ ...formData, waktu_mulai: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Waktu Selesai</label>
                    <input
                      type="time"
                      value={formData.waktu_selesai}
                      onChange={(e) => setFormData({ ...formData, waktu_selesai: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Deskripsi Event</label>
                  <textarea
                    rows={3}
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
                    placeholder="Rincian acara atau instruksi..."
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
                    Simpan Agenda
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
