import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  ChevronDown,
  Plus,
  Printer,
  Edit,
  Trash2,
  X,
  Save,
  Loader2,
  Info,
} from "lucide-react";
import { schedulesApi, extracurricularApi, classesApi, subjectsApi } from "../../utils/api";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  grayMedium: "#e9ecef",
  grayLight: "#f8f9fa",
  blueTransparent10: "rgba(35, 48, 93, 0.1)",
};

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

interface ScheduleItem {
  id: number | string;
  kelas: string;
  hari: string;
  jam_mulai: string;
  jam_selesai: string;
  mapel: string;
  guru: string;
  ruangan: string;
}

const EMPTY_FORM = {
  kelas: "",
  hari: "Senin",
  jam_mulai: "07:30",
  jam_selesai: "09:00",
  mapel: "",
  guru: "",
  ruangan: "",
};

const extractList = (res: any): any[] => {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  if (Array.isArray(d?.data)) return d.data;
  return [];
};

export const ScheduleManagementDashboard = () => {
  const [selectedKelas, setSelectedKelas] = useState("");
  const [selectedDay, setSelectedDay] = useState("Senin");
  const [scheduleType, setScheduleType] = useState("regular");
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [ekskul, setEkskul] = useState<any[]>([]);
  const [kelasOptions, setKelasOptions] = useState<string[]>([]);
  const [mapelOptions, setMapelOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<ScheduleItem | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [schedRes, ekskulRes, classesRes, subjectsRes] = await Promise.all([
        schedulesApi.getAll(),
        extracurricularApi.getAll(),
        classesApi.getAll(),
        subjectsApi.getAll(),
      ]);
      const schedList = extractList(schedRes) as ScheduleItem[];
      const ekskulList = extractList(ekskulRes);
      const classes = extractList(classesRes);
      const subjects = extractList(subjectsRes);

      setSchedules(schedList);
      setEkskul(ekskulList);

      const fromSched = schedList.map((s) => s.kelas).filter(Boolean);
      const fromMasterClasses = classes.map((item: any) => item.nama_kelas).filter(Boolean);
      const unique = Array.from(new Set([...fromMasterClasses, ...fromSched])).sort() as string[];
      setKelasOptions(unique);
      setMapelOptions(subjects.map((item: any) => item.nama_mapel).filter(Boolean));

      setSelectedKelas((prev) => {
        if (prev && unique.includes(prev)) return prev;
        return unique[0] || "";
      });
    } catch (err) {
      console.error("Gagal memuat data jadwal:", err);
      setError("Gagal memuat data jadwal");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredRegular = useMemo(
    () =>
      schedules.filter(
        (s) =>
          s.hari === selectedDay && (!selectedKelas || s.kelas === selectedKelas),
      ),
    [schedules, selectedDay, selectedKelas],
  );

  const filteredEkskul = useMemo(
    () =>
      ekskul.filter((e) => {
        const hari = String(e.hari_latihan || e.hari || "");
        return hari.toLowerCase().includes(selectedDay.toLowerCase());
      }),
    [ekskul, selectedDay],
  );

  const openAdd = () => {
    setEditing(null);
    setForm({
      ...EMPTY_FORM,
      kelas: selectedKelas || "",
      hari: selectedDay,
    });
    setIsModalOpen(true);
  };

  const openEdit = (item: ScheduleItem) => {
    setEditing(item);
    setForm({
      kelas: item.kelas || "",
      hari: item.hari || "Senin",
      jam_mulai: item.jam_mulai || "",
      jam_selesai: item.jam_selesai || "",
      mapel: item.mapel || "",
      guru: item.guru || "",
      ruangan: item.ruangan || "",
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const { kelas, hari, jam_mulai, jam_selesai, mapel, guru, ruangan } = form;
    if (!kelas || !hari || !jam_mulai || !jam_selesai || !mapel || !guru || !ruangan) {
      setError("Semua kolom jadwal wajib diisi");
      return;
    }
    try {
      setSaving(true);
      setError(null);
      const payload = { kelas, hari, jam_mulai, jam_selesai, mapel, guru, ruangan };
      if (editing) {
        await schedulesApi.update(editing.id, payload);
      } else {
        await schedulesApi.create(payload);
      }
      setIsModalOpen(false);
      await loadData();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Gagal menyimpan jadwal");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: ScheduleItem) => {
    if (!window.confirm(`Hapus jadwal ${item.mapel} (${item.kelas} / ${item.hari})?`)) return;
    try {
      await schedulesApi.delete(item.id);
      await loadData();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Gagal menghapus jadwal");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            Jadwal Pelajaran & Fasilitas Lab
          </h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>
            Kelola jadwal KBM (API), lab (placeholder), dan ekskul dari database.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium"
            style={{ borderColor: COLORS.grayMedium, color: COLORS.primary }}
          >
            <Printer size={16} /> Cetak Jadwal
          </button>
          <button
            type="button"
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors shadow-sm text-sm font-medium"
            style={{ backgroundColor: COLORS.accent }}
          >
            <Plus size={16} /> Buat Jadwal Baru
          </button>
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-100">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-2 border-b pb-2 border-slate-200">
        {[
          { id: "regular", label: "📚 Jadwal Kelas Reguler" },
          { id: "lab-science", label: "🔬 Jadwal Lab Science (IPA)" },
          { id: "lab-kom", label: "💻 Jadwal Lab Komputer" },
          { id: "ekskul", label: "🏆 Jadwal Ekskul Pembina Guru" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setScheduleType(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              scheduleType === tab.id
                ? "bg-[#23305d] text-white shadow-sm"
                : "bg-white text-slate-600 border hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className="bg-white rounded-xl p-4 border shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center"
        style={{ borderColor: COLORS.grayMedium }}
      >
        {scheduleType === "regular" && (
          <div className="flex gap-3 w-full md:w-auto items-center">
            <span className="text-sm font-medium" style={{ color: COLORS.secondary }}>
              Pilih Kelas:
            </span>
            <div className="relative w-full md:w-48">
              <select
                className="w-full appearance-none pl-4 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/50 bg-white"
                style={{
                  borderColor: COLORS.grayMedium,
                  color: COLORS.primary,
                  fontWeight: 600,
                }}
                value={selectedKelas}
                onChange={(e) => setSelectedKelas(e.target.value)}
              >
                {kelasOptions.length === 0 && <option value="">—</option>}
                {kelasOptions.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        )}
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {DAYS.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap border ${
                selectedDay === day ? "text-white" : "bg-white hover:bg-gray-50"
              }`}
              style={{
                backgroundColor: selectedDay === day ? COLORS.primary : "#ffffff",
                borderColor: selectedDay === day ? COLORS.primary : COLORS.grayMedium,
                color: selectedDay === day ? "#ffffff" : COLORS.secondary,
              }}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border shadow-sm overflow-hidden"
        style={{ borderColor: COLORS.grayMedium }}
      >
        <div
          className="p-4 border-b flex justify-between items-center"
          style={{ borderColor: COLORS.grayMedium, backgroundColor: COLORS.blueTransparent10 }}
        >
          <h2
            className="text-lg font-bold flex items-center gap-2"
            style={{ color: COLORS.primary }}
          >
            <CalendarIcon size={18} />
            {scheduleType === "regular"
              ? `Jadwal Kelas ${selectedKelas || "—"} - Hari ${selectedDay}`
              : scheduleType === "lab-science"
                ? `Pemakaian Lab Science - Hari ${selectedDay}`
                : scheduleType === "lab-kom"
                  ? `Pemakaian Lab Komputer - Hari ${selectedDay}`
                  : `Jadwal Pembina Ekstrakurikuler - Hari ${selectedDay}`}
          </h2>
        </div>

        <div className="overflow-x-auto">
          {loading && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="animate-spin" style={{ color: COLORS.primary }} />
              <span className="ml-3 text-sm" style={{ color: COLORS.secondary }}>
                Memuat data...
              </span>
            </div>
          )}

          {!loading && scheduleType === "regular" && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  style={{
                    backgroundColor: COLORS.grayLight,
                    borderBottom: `1px solid ${COLORS.grayMedium}`,
                  }}
                >
                  <th
                    className="px-6 py-4 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: COLORS.secondary }}
                  >
                    Waktu
                  </th>
                  <th
                    className="px-6 py-4 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: COLORS.secondary }}
                  >
                    Mata Pelajaran
                  </th>
                  <th
                    className="px-6 py-4 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: COLORS.secondary }}
                  >
                    Guru Pengajar
                  </th>
                  <th
                    className="px-6 py-4 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: COLORS.secondary }}
                  >
                    Ruangan
                  </th>
                  <th
                    className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-right"
                    style={{ color: COLORS.secondary }}
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRegular.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">
                      Belum ada jadwal untuk kelas dan hari ini
                    </td>
                  </tr>
                ) : (
                  filteredRegular.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className="flex items-center gap-2 font-medium"
                          style={{ color: COLORS.primary }}
                        >
                          <Clock size={16} className="text-gray-400" />
                          {item.jam_mulai} - {item.jam_selesai}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`font-semibold ${
                            item.mapel === "Istirahat" ? "text-orange-500" : "text-gray-900"
                          }`}
                        >
                          {item.mapel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.guru && item.guru !== "-" ? (
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <User size={14} className="text-gray-400" /> {item.guru}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.ruangan && item.ruangan !== "-" ? (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin size={14} className="text-gray-400" />
                            <span className="px-2 py-1 bg-gray-100 rounded text-gray-700 font-medium">
                              {item.ruangan}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEdit(item)}
                            className="p-1.5 rounded bg-amber-50 text-amber-600 hover:bg-amber-100"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100"
                            title="Hapus"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {!loading && (scheduleType === "lab-science" || scheduleType === "lab-kom") && (
            <div className="p-8 text-center space-y-2">
              <Info className="mx-auto text-gray-300" size={40} />
              <p className="text-gray-500 font-medium">Fitur lab terpisah belum ada di BE</p>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                Gunakan jadwal reguler dengan field <code>ruangan</code> berisi Lab Science / Lab
                Komputer, atau tunggu model lab terpisah di backend.
              </p>
            </div>
          )}

          {!loading && scheduleType === "ekskul" && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  style={{
                    backgroundColor: COLORS.grayLight,
                    borderBottom: `1px solid ${COLORS.grayMedium}`,
                  }}
                >
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Waktu Kegiatan
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Nama Ekstrakurikuler
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Guru Pembina
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Lokasi
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Peserta
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEkskul.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">
                      Belum ada jadwal ekskul untuk hari ini
                    </td>
                  </tr>
                ) : (
                  filteredEkskul.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-[#23305d]">
                        {item.jam_latihan || item.jam || "—"}
                      </td>
                      <td className="px-6 py-4 font-bold text-amber-600">
                        {item.nama || item.nama_ekskul}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {item.pembina || "—"}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{item.lokasi || "—"}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-purple-50 text-purple-800 border border-purple-200 rounded-full text-xs font-bold">
                          {item.jumlah_siswa ?? item.jumlah_anggota ?? 0}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>
                  {editing ? "Edit Jadwal" : "Buat Jadwal Baru"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>
              <form onSubmit={handleSave} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">
                      Kelas
                    </label>
                    <select
                      className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                      style={{ borderColor: COLORS.grayMedium }}
                      value={form.kelas}
                      onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                      required
                    >
                      <option value="">Pilih kelas dari Master Kelas</option>
                      {kelasOptions.map((k) => (
                        <option key={k} value={k}>{k}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">
                      Hari
                    </label>
                    <select
                      className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                      style={{ borderColor: COLORS.grayMedium }}
                      value={form.hari}
                      onChange={(e) => setForm({ ...form, hari: e.target.value })}
                    >
                      {DAYS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">
                      Jam Mulai
                    </label>
                    <input
                      type="time"
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      style={{ borderColor: COLORS.grayMedium }}
                      value={form.jam_mulai}
                      onChange={(e) => setForm({ ...form, jam_mulai: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">
                      Jam Selesai
                    </label>
                    <input
                      type="time"
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      style={{ borderColor: COLORS.grayMedium }}
                      value={form.jam_selesai}
                      onChange={(e) => setForm({ ...form, jam_selesai: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Mata Pelajaran
                  </label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                    style={{ borderColor: COLORS.grayMedium }}
                    value={form.mapel}
                    onChange={(e) => setForm({ ...form, mapel: e.target.value })}
                    required
                  >
                    <option value="">Pilih mata pelajaran dari Master Mapel</option>
                    {mapelOptions.map((mapel) => <option key={mapel} value={mapel}>{mapel}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Guru</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    style={{ borderColor: COLORS.grayMedium }}
                    value={form.guru}
                    onChange={(e) => setForm({ ...form, guru: e.target.value })}
                    placeholder="Nama guru"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Ruangan
                  </label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    style={{ borderColor: COLORS.grayMedium }}
                    value={form.ruangan}
                    onChange={(e) => setForm({ ...form, ruangan: e.target.value })}
                    placeholder="Ruang 101 / Lab Fisika"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm rounded-lg border"
                    style={{ borderColor: COLORS.grayMedium }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg text-white font-medium disabled:opacity-60"
                    style={{ backgroundColor: COLORS.accent }}
                  >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Simpan
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
