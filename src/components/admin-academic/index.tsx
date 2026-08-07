import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Layers,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  X,
  Save,
  Loader2,
  Info,
} from "lucide-react";
import { subjectsApi, studentsApi, classesApi } from "../../utils/api";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  accentLight: "#af9151",
  white: "#ffffff",
  goldTransparent: "rgba(217, 171, 63, 0.1)",
  blueTransparent10: "rgba(35, 48, 93, 0.1)",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
};

/** Tahun ajaran masih UI-only — belum ada tabel/endpoint BE. */
const MOCK_TAHUN_AJARAN = [
  { id: "1", tahun: "2023/2024", semester: "Ganjil", status: "Tidak Aktif" },
  { id: "2", tahun: "2023/2024", semester: "Genap", status: "Tidak Aktif" },
  { id: "3", tahun: "2024/2025", semester: "Ganjil", status: "Tidak Aktif" },
  { id: "4", tahun: "2024/2025", semester: "Genap", status: "Aktif" },
  { id: "5", tahun: "2025/2026", semester: "Ganjil", status: "Draf" },
];

interface Subject {
  id: number | string;
  kode_mapel: string;
  nama_mapel: string;
  tingkat: string;
}

interface MasterClass {
  id: number | string;
  nama_kelas: string;
  tingkat: string;
  jurusan?: string;
}

const extractList = (res: any): any[] => {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  if (Array.isArray(d?.data)) return d.data;
  return [];
};

const EMPTY_FORM = { kode_mapel: "", nama_mapel: "", tingkat: "X" };
const EMPTY_CLASS_FORM = { nama_kelas: "", tingkat: "7", jurusan: "" };

export const AcademicManagementDashboard: React.FC<{ initialTab?: "mapel" | "tahun" | "kelas" }> = ({ initialTab = "mapel" }) => {
  const [activeTab, setActiveTab] = useState<"mapel" | "tahun" | "kelas">(initialTab);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [masterClasses, setMasterClasses] = useState<MasterClass[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Subject | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  // State Modal Master Kelas
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<MasterClass | null>(null);
  const [classForm, setClassForm] = useState(EMPTY_CLASS_FORM);

  const loadSubjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await subjectsApi.getAll();
      setSubjects(extractList(res));
    } catch (e) {
      console.error(e);
      setError("Gagal memuat mata pelajaran");
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadClasses = useCallback(async () => {
    try {
      const res = await classesApi.getAll();
      const list = extractList(res);
      if (list.length > 0) {
        setMasterClasses(list);
      } else {
        // Fallback: derive from students if database table is empty
        const studRes = await studentsApi.getAll();
        const students = extractList(studRes);
        const unique = Array.from(
          new Set(students.map((s: any) => s.kelas).filter(Boolean)),
        ).sort() as string[];
        setMasterClasses(unique.map((k, idx) => ({ id: idx + 1, nama_kelas: k, tingkat: "7" })));
      }
    } catch {
      setMasterClasses([]);
    }
  }, []);

  useEffect(() => {
    loadSubjects();
    loadClasses();
  }, [loadSubjects, loadClasses]);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setIsModalOpen(true);
  };

  const openEdit = (item: Subject) => {
    setEditing(item);
    setForm({
      kode_mapel: item.kode_mapel || "",
      nama_mapel: item.nama_mapel || "",
      tingkat: item.tingkat || "X",
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.kode_mapel.trim() || !form.nama_mapel.trim() || !form.tingkat.trim()) {
      setError("Kode, nama mapel, dan tingkat wajib diisi");
      return;
    }
    try {
      setSaving(true);
      setError(null);
      const payload = {
        kode_mapel: form.kode_mapel.trim().toUpperCase(),
        nama_mapel: form.nama_mapel.trim(),
        tingkat: form.tingkat.trim(),
      };
      if (editing) {
        await subjectsApi.update(editing.id, payload);
      } else {
        await subjectsApi.create(payload);
      }
      setIsModalOpen(false);
      await loadSubjects();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Gagal menyimpan mata pelajaran");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: Subject) => {
    if (!window.confirm(`Hapus mata pelajaran "${item.nama_mapel}"?`)) return;
    try {
      await subjectsApi.delete(item.id);
      await loadSubjects();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Gagal menghapus mata pelajaran");
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
            Akademik
          </h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>
            Kelola Mata Pelajaran (API), Tahun Ajaran, dan Kelas.
          </p>
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-100">
          {error}
        </div>
      )}

      <div className="flex border-b" style={{ borderColor: COLORS.grayMedium }}>
        {(
          [
            { id: "mapel" as const, label: "Mata Pelajaran", icon: BookOpen },
            { id: "tahun" as const, label: "Tahun Ajaran", icon: Calendar },
            { id: "kelas" as const, label: "Kelas & Jurusan", icon: Layers },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
                active ? "bg-white" : "hover:bg-gray-50"
              }`}
              style={{
                color: active ? COLORS.primary : COLORS.secondary,
                borderBottomColor: active ? COLORS.primary : "transparent",
              }}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      <div
        className="bg-white rounded-b-xl rounded-tr-xl border p-6 shadow-sm"
        style={{ borderColor: COLORS.grayMedium, marginTop: 0 }}
      >
        {activeTab === "mapel" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold" style={{ color: COLORS.primary }}>
                Daftar Mata Pelajaran
              </h2>
              <button
                type="button"
                onClick={openAdd}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors text-sm font-medium"
                style={{ backgroundColor: COLORS.accent }}
              >
                <Plus size={16} /> Tambah Mapel
              </button>
            </div>

            <div
              className="overflow-x-auto border rounded-lg"
              style={{ borderColor: COLORS.grayMedium }}
            >
              {loading ? (
                <div className="flex items-center justify-center py-12 gap-2 text-sm text-gray-500">
                  <Loader2 className="animate-spin" size={18} /> Memuat...
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead
                    style={{
                      backgroundColor: COLORS.grayLight,
                      borderBottom: `1px solid ${COLORS.grayMedium}`,
                    }}
                  >
                    <tr>
                      <th
                        className="px-6 py-3 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: COLORS.secondary }}
                      >
                        Kode
                      </th>
                      <th
                        className="px-6 py-3 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: COLORS.secondary }}
                      >
                        Nama Mata Pelajaran
                      </th>
                      <th
                        className="px-6 py-3 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: COLORS.secondary }}
                      >
                        Tingkat
                      </th>
                      <th
                        className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-right"
                        style={{ color: COLORS.secondary }}
                      >
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {subjects.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-10 text-center text-gray-400">
                          Belum ada mata pelajaran. Klik Tambah Mapel.
                        </td>
                      </tr>
                    ) : (
                      subjects.map((mapel) => (
                        <tr key={mapel.id} className="hover:bg-gray-50">
                          <td className="px-6 py-3 font-medium text-gray-900">
                            {mapel.kode_mapel}
                          </td>
                          <td
                            className="px-6 py-3 font-semibold"
                            style={{ color: COLORS.primary }}
                          >
                            {mapel.nama_mapel}
                          </td>
                          <td className="px-6 py-3 text-gray-600">Tingkat {mapel.tingkat}</td>
                          <td className="px-6 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => openEdit(mapel)}
                                className="p-1.5 rounded bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(mapel)}
                                className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
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
            </div>
          </motion.div>
        )}

        {activeTab === "tahun" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-100 text-amber-800 text-xs">
              <Info size={14} className="mt-0.5 shrink-0" />
              <span>
                Modul Tahun Ajaran belum punya endpoint/tabel di backend. Tampilan di bawah
                bersifat referensi UI sampai BE menambahkan resource tersebut.
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold" style={{ color: COLORS.primary }}>
                Tahun Ajaran & Semester
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_TAHUN_AJARAN.map((ta) => (
                <div
                  key={ta.id}
                  className="border rounded-xl p-5 hover:shadow-md transition-shadow relative overflow-hidden"
                  style={{
                    borderColor: ta.status === "Aktif" ? COLORS.accent : COLORS.grayMedium,
                    backgroundColor:
                      ta.status === "Aktif" ? COLORS.goldTransparent : COLORS.white,
                  }}
                >
                  {ta.status === "Aktif" && (
                    <div className="absolute top-0 right-0 p-2 text-white bg-green-500 rounded-bl-xl shadow-sm">
                      <CheckCircle size={16} />
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="p-3 bg-white rounded-lg border shadow-sm"
                      style={{ borderColor: COLORS.grayMedium }}
                    >
                      <Calendar
                        className="w-5 h-5"
                        style={{
                          color: ta.status === "Aktif" ? COLORS.accent : COLORS.primary,
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: COLORS.primary }}>
                        TA {ta.tahun}
                      </h3>
                      <p className="text-sm font-medium" style={{ color: COLORS.secondary }}>
                        Semester {ta.semester}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex justify-between items-center mt-4 pt-4 border-t"
                    style={{ borderColor: COLORS.grayMedium }}
                  >
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                        ta.status === "Aktif"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : ta.status === "Draf"
                            ? "bg-gray-100 text-gray-700 border-gray-200"
                            : "bg-red-100 text-red-700 border-red-200"
                      }`}
                    >
                      {ta.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "kelas" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-bold" style={{ color: COLORS.primary }}>
                  Master Kelas Sekolah
                </h2>
                <p className="text-xs text-gray-500">
                  Daftar kelas terpusat yang digunakan pada Pendaftaran Siswa & Penetapan Wali Kelas.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingClass(null);
                  setClassForm(EMPTY_CLASS_FORM);
                  setIsClassModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors text-sm font-medium"
                style={{ backgroundColor: COLORS.accent }}
              >
                <Plus size={16} /> Tambah Kelas
              </button>
            </div>

            {masterClasses.length === 0 ? (
              <div
                className="text-center py-16 text-gray-500 border rounded-xl"
                style={{ borderColor: COLORS.grayMedium, borderStyle: "dashed" }}
              >
                <Layers size={48} className="mx-auto mb-4 opacity-20 text-gray-400" />
                <p className="font-medium text-gray-700 text-lg">Belum ada kelas terdaftar</p>
                <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                  Klik tombol <strong>Tambah Kelas</strong> di atas untuk menambahkan kelas baru.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {masterClasses.map((c) => (
                  <div
                    key={c.id}
                    className="border rounded-xl p-4 flex justify-between items-center bg-white shadow-sm hover:shadow-md transition-shadow"
                    style={{ borderColor: COLORS.grayMedium }}
                  >
                    <div>
                      <h3 className="font-bold text-base" style={{ color: COLORS.primary }}>
                        {c.nama_kelas}
                      </h3>
                      <p className="text-xs text-gray-500">Tingkat {c.tingkat} {c.jurusan ? `• ${c.jurusan}` : ""}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingClass(c);
                          setClassForm({
                            nama_kelas: c.nama_kelas,
                            tingkat: c.tingkat,
                            jurusan: c.jurusan || "",
                          });
                          setIsClassModalOpen(true);
                        }}
                        className="p-1.5 rounded hover:bg-gray-100 text-amber-600"
                        title="Edit Kelas"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (window.confirm(`Hapus kelas ${c.nama_kelas}?`)) {
                            try {
                              await classesApi.delete(c.id);
                              await loadClasses();
                            } catch (e: any) {
                              setError(e?.response?.data?.message || "Gagal menghapus kelas");
                            }
                          }
                        }}
                        className="p-1.5 rounded hover:bg-gray-100 text-red-600"
                        title="Hapus Kelas"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

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
              className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>
                  {editing ? "Edit Mata Pelajaran" : "Tambah Mata Pelajaran"}
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
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Kode Mapel
                  </label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    style={{ borderColor: COLORS.grayMedium }}
                    value={form.kode_mapel}
                    onChange={(e) => setForm({ ...form, kode_mapel: e.target.value })}
                    placeholder="MTK"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Nama Mata Pelajaran
                  </label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    style={{ borderColor: COLORS.grayMedium }}
                    value={form.nama_mapel}
                    onChange={(e) => setForm({ ...form, nama_mapel: e.target.value })}
                    placeholder="Matematika"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Tingkat
                  </label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                    style={{ borderColor: COLORS.grayMedium }}
                    value={form.tingkat}
                    onChange={(e) => setForm({ ...form, tingkat: e.target.value })}
                  >
                    <option value="1">Kelas 1 SMP</option>
                    <option value="2">Kelas 2 SMP</option>
                    <option value="3">Kelas 3 SMP</option>
                    <option value="Semua">Semua</option>
                  </select>
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
        {/* Modal Tambah/Edit Master Kelas */}
        {isClassModalOpen && (
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
              className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>
                  {editingClass ? "Edit Kelas" : "Tambah Kelas Baru"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsClassModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!classForm.nama_kelas.trim()) return;
                  try {
                    setSaving(true);
                    if (editingClass) {
                      await classesApi.update(editingClass.id, classForm);
                    } else {
                      await classesApi.create(classForm);
                    }
                    setIsClassModalOpen(false);
                    await loadClasses();
                  } catch (err: any) {
                    setError(err?.response?.data?.message || "Gagal menyimpan kelas");
                  } finally {
                    setSaving(false);
                  }
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Nama Kelas *
                  </label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    style={{ borderColor: COLORS.grayMedium }}
                    value={classForm.nama_kelas}
                    onChange={(e) => setClassForm({ ...classForm, nama_kelas: e.target.value })}
                    placeholder="Contoh: X-IPA-1, 7-A, 8-B"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Tingkat
                  </label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                    style={{ borderColor: COLORS.grayMedium }}
                    value={classForm.tingkat}
                    onChange={(e) => setClassForm({ ...classForm, tingkat: e.target.value })}
                  >
                    <option value="7">Tingkat 7 (Kelas 1 SMP)</option>
                    <option value="8">Tingkat 8 (Kelas 2 SMP)</option>
                    <option value="9">Tingkat 9 (Kelas 3 SMP)</option>
                    <option value="10">Tingkat 10 (Kelas 1 SMA)</option>
                    <option value="11">Tingkat 11 (Kelas 2 SMA)</option>
                    <option value="12">Tingkat 12 (Kelas 3 SMA)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Jurusan / Rumpun (Opsional)
                  </label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    style={{ borderColor: COLORS.grayMedium }}
                    value={classForm.jurusan}
                    onChange={(e) => setClassForm({ ...classForm, jurusan: e.target.value })}
                    placeholder="IPA, IPS, Umum"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsClassModalOpen(false)}
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
