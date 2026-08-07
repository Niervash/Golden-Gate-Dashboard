import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { settingsApi, backupApi, usersApi, authApi } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";
import { useAuth } from "../../context";
import {
  Settings,
  Shield,
  Database,
  Upload,
  Save,
  Building,
  Users,
  Key,
  UserPlus,
  RefreshCw,
  HardDrive,
  Trash2,
  CheckCircle,
  AlertTriangle,
  UserCheck,
  ToggleLeft,
  ToggleRight,
  ShieldAlert,
  Server,
  Download,
  X,
  ListChecks,
  XCircle,
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

interface UserConfig {
  id: string;
  name: string;
  email: string;
  role: "admin" | "kepsek" | "guru" | "murid" | "siswa";
  status: "Aktif" | "Nonaktif";
}

const DEFAULT_PERMISSIONS = [
  { feature: "Data Siswa", admin: true, kepsek: false, guru: false, murid: false },
  { feature: "Data Guru", admin: true, kepsek: true, guru: false, murid: false },
  { feature: "Akademik & Kurikulum", admin: true, kepsek: true, guru: true, murid: false },
  { feature: "Jadwal Pelajaran", admin: true, kepsek: true, guru: true, murid: true },
  { feature: "Absensi & Presensi", admin: true, kepsek: true, guru: true, murid: true },
  { feature: "Penilaian & Raport", admin: true, kepsek: false, guru: true, murid: true },
  { feature: "BK & Konseling", admin: true, kepsek: false, guru: false, murid: false },
  { feature: "Arsip Dokumen Sekolah", admin: true, kepsek: false, guru: false, murid: false },
];

type IntegrationStatus = {
  module: string;
  detail: string;
  endpoint?: string;
};

// Status below is derived from API calls currently used by the frontend.
const CONNECTED_MODULES: IntegrationStatus[] = [
  { module: "Autentikasi & akun pengguna", detail: "Login, daftar, sesi, daftar akun, tambah, ubah peran, dan hapus akun.", endpoint: "/api/auth/*" },
  { module: "Data siswa", detail: "Muat, tambah, ubah, dan hapus data siswa.", endpoint: "/api/students" },
  { module: "Data guru & wali kelas", detail: "Kelola guru dan penetapan wali kelas.", endpoint: "/api/teachers" },
  { module: "Akademik", detail: "Mata pelajaran dan master kelas terhubung ke database.", endpoint: "/api/subjects, /api/classes" },
  { module: "Jadwal & absensi", detail: "Jadwal CRUD; absensi dibaca/disimpan ke API dengan cache offline sebagai cadangan.", endpoint: "/api/schedules, /api/attendance" },
  { module: "Nilai & BK", detail: "Nilai/raport dan catatan konseling memakai API.", endpoint: "/api/grades, /api/counseling" },
  { module: "Prestasi, pengumuman & berita", detail: "Kelola prestasi, pengumuman, dan CMS berita.", endpoint: "/api/achievements, /api/announcements, /api/news" },
  { module: "PPDB", detail: "Form pendaftaran publik dan pengelolaan pendaftar admin terhubung.", endpoint: "/api/ppdb" },
  { module: "Ekstrakurikuler & kalender", detail: "Data ekskul, anggota ekskul, dan agenda kalender terhubung.", endpoint: "/api/extracurricular*, /api/calendar-events" },
  { module: "Arsip, inventaris & perangkat ajar", detail: "Arsip, sarana-prasarana, dan lesson plan memakai API.", endpoint: "/api/archives, /api/inventory, /api/lesson-plans" },
  { module: "Perpustakaan digital", detail: "Buku dan log membaca terhubung ke API.", endpoint: "/api/library/*" },
  { module: "Laporan, pengaturan & backup", detail: "Statistik dashboard, pengaturan sekolah, dan pembuatan backup memakai API.", endpoint: "/api/reports/dashboard, /api/settings, /api/backup" },
];

const PENDING_MODULES: IntegrationStatus[] = [
  { module: "Unggah logo sekolah", detail: "Tombol ganti logo masih berupa tampilan; belum mengirim file ke backend atau penyimpanan cloud." },
  { module: "Status aktif/nonaktif akun", detail: "Tombol status hanya memberi informasi karena kolom/endpoint status pengguna belum tersedia." },
  { module: "Unduh & riwayat backup", detail: "API membuat backup, tetapi daftar riwayat dan tombol unduh masih disimpan di state browser." },
  { module: "Kartu siswa / QR", detail: "QR dibuat di browser dan belum memiliki endpoint untuk menyimpan atau memverifikasi kartu." },
  { module: "Halaman profil publik", detail: "Visi-misi, fasilitas, program, testimoni, FAQ, kontak, dan konten landing masih data statis di frontend." },
  { module: "Reset kata sandi", detail: "Halaman lupa kata sandi belum memiliki alur atau endpoint backend." },
  { module: "Integrasi Google Drive/Sheets", detail: "Tautan Drive/Sheets digunakan sebagai link atau impor sisi browser; belum tersinkronisasi melalui API server." },
];

const mapDbRoleToUi = (role: string): UserConfig["role"] => {
  if (role === "siswa") return "murid";
  if (role === "admin" || role === "kepsek" || role === "guru" || role === "murid") return role;
  return "guru";
};

const mapUiRoleToDb = (role: string) => (role === "murid" ? "siswa" : role);

export const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profil");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const { toast } = useToast();
  const { refreshPermissions } = useAuth();

  // States for Profil Sekolah
  const [schoolName, setSchoolName] = useState("");
  const [npsn, setNpsn] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [headmaster, setHeadmaster] = useState("");
  const [accreditation, setAccreditation] = useState("A");

  // States for Hak Akses (Permissions Matrix) — persisted in settings.permissions_matrix
  const [permissions, setPermissions] = useState(DEFAULT_PERMISSIONS);

  // States for Manajemen Pengguna
  const [users, setUsers] = useState<UserConfig[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "guru" as any });
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // States for Database Backup
  const [backups, setBackups] = useState<{name: string; size: string; date: string}[]>([]);
  const [autoBackup, setAutoBackup] = useState(true);

  useEffect(() => {
    fetchSettings();
    fetchUsers();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await settingsApi.getAll();
      const s = res.data?.data || res.data || {};
      if (s.school_name) setSchoolName(s.school_name);
      if (s.npsn) setNpsn(s.npsn);
      if (s.address) setAddress(s.address);
      if (s.email) setEmail(s.email);
      if (s.phone) setPhone(s.phone);
      if (s.headmaster) setHeadmaster(s.headmaster);
      if (s.accreditation) setAccreditation(s.accreditation);
      if (s.permissions_matrix) {
        try {
          const parsed =
            typeof s.permissions_matrix === "string"
              ? JSON.parse(s.permissions_matrix)
              : s.permissions_matrix;
          if (Array.isArray(parsed) && parsed.length) setPermissions(parsed);
        } catch {
          /* keep defaults */
        }
      }
      if (s.auto_backup != null) {
        setAutoBackup(s.auto_backup === "true" || s.auto_backup === true);
      }
    } catch {
      // Settings may not exist yet, use defaults
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      const res = await usersApi.getAll();
      const list =
        res.data?.users ||
        (Array.isArray(res.data) ? res.data : res.data?.data) ||
        [];
      setUsers(
        (list as any[]).map((u) => ({
          id: String(u.id),
          name: u.name,
          email: u.email,
          role: mapDbRoleToUi(u.role),
          status: "Aktif" as const,
        }))
      );
    } catch {
      toast({
        title: "Peringatan",
        description: "Gagal memuat daftar pengguna dari server",
        variant: "destructive",
      });
    } finally {
      setUsersLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await settingsApi.update({
        school_name: schoolName,
        npsn,
        address,
        email,
        phone,
        headmaster,
        accreditation,
        permissions_matrix: JSON.stringify(permissions),
        auto_backup: String(autoBackup),
      });
      await refreshPermissions();
      setSaveSuccess(true);
      toast({ title: "Berhasil", description: "Pengaturan sekolah & hak akses disimpan" });
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      toast({ title: "Error", description: "Gagal menyimpan pengaturan", variant: "destructive" });
    }
  };

  const handlePermissionToggle = (idx: number, role: "admin" | "kepsek" | "guru" | "murid") => {
    const updated = [...permissions];
    updated[idx][role] = !updated[idx][role];
    setPermissions(updated);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    try {
      await usersApi.create({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password || "ggs12345",
        role: mapUiRoleToDb(newUser.role),
      });
      toast({ title: "Berhasil", description: "Akun pengguna ditambahkan" });
      setNewUser({ name: "", email: "", password: "", role: "guru" });
      setIsAddUserOpen(false);
      await fetchUsers();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Gagal menambah pengguna (email mungkin sudah terpakai)";
      toast({ title: "Error", description: msg, variant: "destructive" });
    }
  };

  const handleToggleUserStatus = (_id: string) => {
    toast({
      title: "Info",
      description:
        "Status aktif/nonaktif belum ada kolom di tabel users. Hapus akun atau ubah role sebagai alternatif.",
    });
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm("Hapus pengguna ini dari sistem?")) return;
    try {
      await usersApi.delete(id);
      toast({ title: "Berhasil", description: "Pengguna dihapus" });
      await fetchUsers();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.response?.data?.message || "Gagal menghapus pengguna",
        variant: "destructive",
      });
    }
  };

  const handleCreateBackup = async () => {
    try {
      const res = await backupApi.create();
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
      const newBackup = {
        name: res.data?.filename || `db_ggs_backup_${dateStr}.sql`,
        size: res.data?.size || "N/A",
        date: now.toLocaleString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      };
      setBackups([newBackup, ...backups]);
      toast({ title: "Berhasil", description: "Backup database berhasil dibuat" });
    } catch {
      toast({ title: "Error", description: "Gagal membuat backup", variant: "destructive" });
    }
  };

  const tabs = [
    { id: "profil", label: "Profil Sekolah", icon: <Building size={18} /> },
    { id: "akses", label: "Hak Akses & Peran", icon: <Shield size={18} /> },
    { id: "pengguna", label: "Manajemen Pengguna", icon: <Users size={18} /> },
    { id: "backup", label: "Database & Backup", icon: <Database size={18} /> },
    { id: "integrasi", label: "Status Integrasi BE", icon: <ListChecks size={18} /> },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Pengaturan Sistem</h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>Konfigurasi umum, profil sekolah, manajemen peran, dan sistem database.</p>
        </div>
        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm shadow-md transition-all hover:opacity-95"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Save size={16} /> Simpan Perubahan
        </button>
      </div>

      {saveSuccess && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm flex items-center gap-2">
          <CheckCircle className="text-emerald-600" size={18} />
          <span>Pengaturan sistem berhasil disimpan secara permanen di database.</span>
        </motion.div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 bg-white rounded-2xl border shadow-sm p-3 h-fit flex-shrink-0" style={{ borderColor: COLORS.grayMedium }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-sm font-semibold transition-all mb-1.5 ${
                activeTab === tab.id
                  ? "bg-[#23305d]/5 text-[#23305d] border border-[#23305d]/10"
                  : "text-gray-600 hover:bg-gray-50 border border-transparent"
              }`}
            >
              <div className={activeTab === tab.id ? "text-[#d9ab3f]" : "text-gray-400"}>
                {tab.icon}
              </div>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {/* PROFIL TAB */}
            {activeTab === "profil" && (
              <motion.div key="profil" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-2xl border shadow-sm p-6" style={{ borderColor: COLORS.grayMedium }}>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: COLORS.primary }}>
                  <Building className="text-[#d9ab3f]" size={20} /> Identitas Resmi Sekolah
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center gap-6 pb-6 border-b" style={{ borderColor: COLORS.grayMedium }}>
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-[#d9ab3f] transition-all">
                      <Upload className="text-gray-400 w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm" style={{ color: COLORS.primary }}>Logo Sekolah</h3>
                      <p className="text-xs text-gray-500 mb-2">Format file yang diperbolehkan: PNG, JPG, JPEG (Max. 2 MB)</p>
                      <button className="px-3.5 py-1.5 border rounded-lg text-xs font-semibold hover:bg-gray-50">Ganti Foto Logo</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Nama Resmi Sekolah</label>
                      <input type="text" value={schoolName} onChange={e => setSchoolName(e.target.value)}
                        className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-500 mb-1">NPSN Nasional</label>
                      <input type="text" value={npsn} onChange={e => setNpsn(e.target.value)}
                        className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Alamat Lengkap</label>
                      <textarea rows={3} value={address} onChange={e => setAddress(e.target.value)}
                        className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none resize-none" style={{ borderColor: COLORS.grayMedium }}></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email Resmi Sekolah</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                        className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Nomor Telepon Hubungan</label>
                      <input type="text" value={phone} onChange={e => setPhone(e.target.value)}
                        className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Nama Kepala Sekolah</label>
                      <input type="text" value={headmaster} onChange={e => setHeadmaster(e.target.value)}
                        className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Akreditasi Sekolah</label>
                      <select value={accreditation} onChange={e => setAccreditation(e.target.value)}
                        className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}>
                        <option value="A">A (Unggul)</option>
                        <option value="B">B (Baik)</option>
                        <option value="C">C (Cukup)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* HAK AKSES TAB */}
            {activeTab === "akses" && (
              <motion.div key="akses" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-2xl border shadow-sm p-6" style={{ borderColor: COLORS.grayMedium }}>
                <h2 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: COLORS.primary }}>
                  <Shield className="text-[#d9ab3f]" size={20} /> Matriks Hak Akses Peran
                </h2>
                <p className="text-xs text-gray-500 mb-4">Sesuaikan fitur apa saja yang dapat diakses oleh masing-masing tipe pengguna sistem sekolah.</p>

                <div className="overflow-x-auto border rounded-xl" style={{ borderColor: COLORS.grayMedium }}>
                  <table className="w-full text-left">
                    <thead>
                      <tr style={{ background: COLORS.grayLight, borderBottom: `2px solid ${COLORS.grayMedium}` }}>
                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-600">Nama Fitur Modul</th>
                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 text-center">Admin TU</th>
                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 text-center">Kepsek</th>
                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 text-center">Guru</th>
                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 text-center">Siswa / Wali</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {permissions.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-3.5 font-semibold text-gray-800">{item.feature}</td>
                          {["admin", "kepsek", "guru", "murid"].map((role) => (
                            <td key={role} className="px-4 py-3.5 text-center">
                              <button
                                type="button"
                                onClick={() => handlePermissionToggle(idx, role as any)}
                                className="transition-all hover:scale-110"
                                style={{ color: (item as any)[role] ? "#23305d" : "#94a3b8" }}
                              >
                                {(item as any)[role] ? <ToggleRight size={28} className="text-[#d9ab3f]" /> : <ToggleLeft size={28} />}
                              </button>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* MANAJEMEN PENGGUNA TAB */}
            {activeTab === "pengguna" && (
              <motion.div key="pengguna" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-2xl border shadow-sm p-6" style={{ borderColor: COLORS.grayMedium }}>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: COLORS.primary }}>
                      <Users className="text-[#d9ab3f]" size={20} /> Manajemen Akun Pengguna
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">Kelola kredensial login, peran, dan status akun staf, guru, kepsek, dan siswa.</p>
                  </div>
                  <button
                    onClick={() => setIsAddUserOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#23305d] text-white rounded-xl text-xs font-bold hover:opacity-90 shadow-sm"
                  >
                    <UserPlus size={14} /> Tambah Akun
                  </button>
                </div>

                <div className="overflow-x-auto border rounded-xl" style={{ borderColor: COLORS.grayMedium }}>
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr style={{ background: COLORS.grayLight, borderBottom: `2px solid ${COLORS.grayMedium}` }}>
                        <th className="px-4 py-3 text-xs font-bold uppercase text-gray-600">ID Pengguna</th>
                        <th className="px-4 py-3 text-xs font-bold uppercase text-gray-600">Nama Lengkap</th>
                        <th className="px-4 py-3 text-xs font-bold uppercase text-gray-600">Email</th>
                        <th className="px-4 py-3 text-xs font-bold uppercase text-gray-600">Peran</th>
                        <th className="px-4 py-3 text-xs font-bold uppercase text-gray-600 text-center">Status</th>
                        <th className="px-4 py-3 text-xs font-bold uppercase text-gray-600 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-mono text-xs font-bold text-gray-500">{u.id}</td>
                          <td className="px-4 py-3 font-semibold text-gray-800">{u.name}</td>
                          <td className="px-4 py-3 text-gray-600">{u.email}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                              u.role === "admin" ? "bg-red-50 text-red-600 border border-red-100" :
                              u.role === "kepsek" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                              u.role === "guru" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                              "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            }`}>
                              {u.role === "admin" ? "Admin TU" : u.role === "kepsek" ? "Kepsek" : u.role === "guru" ? "Guru" : "Siswa"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => handleToggleUserStatus(u.id)}
                              className={`px-2 py-0.5 rounded text-xs font-bold ${
                                u.status === "Aktif" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {u.status}
                            </button>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Hapus Akun"
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* DATABASE & BACKUP TAB */}
            {activeTab === "backup" && (
              <motion.div key="backup" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-2xl border shadow-sm p-6" style={{ borderColor: COLORS.grayMedium }}>
                <h2 className="text-lg font-bold mb-1 flex items-center gap-2" style={{ color: COLORS.primary }}>
                  <Database className="text-[#d9ab3f]" size={20} /> Pemeliharaan & Backup Database
                </h2>
                <p className="text-xs text-gray-500 mb-6">Backup seluruh tabel sistem ke file eksternal .SQL secara aman untuk mencegah kehilangan data.</p>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 border rounded-xl flex items-center gap-3">
                    <Server className="text-blue-500" size={24} />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Mesin DB Utama</p>
                      <p className="text-sm font-bold text-gray-700">MySQL v8.0.33</p>
                    </div>
                  </div>
                  <div className="p-4 border rounded-xl flex items-center gap-3">
                    <HardDrive className="text-green-500" size={24} />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Ukuran Database</p>
                      <p className="text-sm font-bold text-gray-700">142 KB</p>
                    </div>
                  </div>
                  <div className="p-4 border rounded-xl flex items-center gap-3">
                    <Database className="text-amber-500" size={24} />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Total Backup Tersimpan</p>
                      <p className="text-sm font-bold text-gray-700">{backups.length} File SQL</p>
                    </div>
                  </div>
                </div>

                {/* Control Actions */}
                <div className="flex flex-col sm:flex-row gap-4 p-4 bg-[#fdfaf2] rounded-xl border mb-6" style={{ borderColor: "rgba(217, 171, 63, 0.3)" }}>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-sm text-gray-800 flex items-center gap-1.5">
                      <AlertTriangle className="text-[#d9ab3f]" size={16} /> Backup Manual Sekarang
                    </h4>
                    <p className="text-xs text-gray-500">Mengekspor data konfigurasi sekolah, daftar siswa, guru, raport, absensi, dan data BK.</p>
                  </div>
                  <button
                    onClick={handleCreateBackup}
                    className="px-4 py-2.5 rounded-xl text-white font-bold text-xs hover:opacity-90 self-center whitespace-nowrap shadow-sm"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    Buat Backup (.SQL)
                  </button>
                </div>

                {/* Automatic Backup Switch */}
                <div className="flex justify-between items-center p-4 border rounded-xl mb-6">
                  <div>
                    <h4 className="font-bold text-sm text-gray-800">Backup Otomatis Mingguan</h4>
                    <p className="text-xs text-gray-500">Sistem akan melakukan ekspor database otomatis setiap hari Senin pukul 02:00 WIB.</p>
                  </div>
                  <button onClick={() => setAutoBackup(!autoBackup)} className="transition-all hover:scale-105">
                    {autoBackup ? <ToggleRight size={32} className="text-[#d9ab3f]" /> : <ToggleLeft size={32} className="text-gray-400" />}
                  </button>
                </div>

                {/* Backup Files List */}
                <h3 className="font-bold text-sm text-gray-800 mb-3">Daftar Backup File Database</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {backups.map((b, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3.5 border rounded-xl hover:bg-slate-50 transition-all">
                      <div className="min-w-0">
                        <p className="font-mono text-xs font-bold text-[#23305d] truncate">{b.name}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{b.date} · Ukuran: {b.size}</p>
                      </div>
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); alert(`Unduhan ${b.name} dimulai.`); }}
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 flex items-center gap-1 transition-all"
                      >
                        <Download size={12} /> Unduh
                      </a>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STATUS INTEGRASI BACKEND TAB */}
            {activeTab === "integrasi" && (
              <motion.div key="integrasi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">
                <div className="bg-white rounded-2xl border shadow-sm p-6" style={{ borderColor: COLORS.grayMedium }}>
                  <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: COLORS.primary }}>
                    <ListChecks className="text-[#d9ab3f]" size={20} /> Checklist Integrasi Backend
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Status ditentukan dari pemanggilan API yang sudah digunakan oleh frontend. Ini bukan indikator kesehatan server secara langsung.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3">
                      <p className="text-xl font-bold text-emerald-700">{CONNECTED_MODULES.length}</p>
                      <p className="text-xs font-medium text-emerald-700">modul sudah terintegrasi</p>
                    </div>
                    <div className="rounded-xl bg-rose-50 border border-rose-100 p-3">
                      <p className="text-xl font-bold text-rose-700">{PENDING_MODULES.length}</p>
                      <p className="text-xs font-medium text-rose-700">modul belum terintegrasi</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border shadow-sm overflow-hidden" style={{ borderColor: COLORS.grayMedium }}>
                  <div className="px-6 py-4 bg-emerald-50 border-b border-emerald-100 flex items-center gap-2">
                    <CheckCircle className="text-emerald-600" size={20} />
                    <div>
                      <h3 className="text-sm font-bold text-emerald-800">Sudah terintegrasi ke backend</h3>
                      <p className="text-xs text-emerald-700">Memanggil API untuk membaca dan/atau menyimpan data.</p>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {CONNECTED_MODULES.map((item) => (
                      <div key={item.module} className="p-4 flex gap-3">
                        <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800">{item.module}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                          {item.endpoint && <code className="inline-block mt-2 px-2 py-1 rounded bg-slate-100 text-[11px] text-slate-600 break-all">{item.endpoint}</code>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border shadow-sm overflow-hidden" style={{ borderColor: COLORS.grayMedium }}>
                  <div className="px-6 py-4 bg-rose-50 border-b border-rose-100 flex items-center gap-2">
                    <XCircle className="text-rose-600" size={20} />
                    <div>
                      <h3 className="text-sm font-bold text-rose-800">Belum terintegrasi ke backend</h3>
                      <p className="text-xs text-rose-700">Masih menggunakan tampilan, data lokal, atau tautan eksternal.</p>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {PENDING_MODULES.map((item) => (
                      <div key={item.module} className="p-4 flex gap-3">
                        <XCircle className="text-rose-500 shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{item.module}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {isAddUserOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={e => { if (e.target === e.currentTarget) setIsAddUserOpen(false); }}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
              <div className="p-5 flex justify-between items-center" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, #151e3d)` }}>
                <div className="flex items-center gap-2"><UserPlus size={20} className="text-[#d9ab3f]" /><h3 className="font-bold text-white">Tambah Pengguna Baru</h3></div>
                <button onClick={() => setIsAddUserOpen(false)} className="text-white/60 hover:text-white p-1"><X size={20} /></button>
              </div>
              <form onSubmit={handleAddUser} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Nama Lengkap *</label>
                  <input required value={newUser.name} onChange={e => setNewUser(p => ({ ...p, name: e.target.value }))}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}
                    placeholder="Contoh: Siti Aisyah, S.Pd" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Alamat Email *</label>
                  <input required type="email" value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))}
                    className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}
                    placeholder="Contoh: sitiaisyah.guru@goldengate.sch.id" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Peran Akses</label>
                  <select value={newUser.role} onChange={e => setNewUser(p => ({ ...p, role: e.target.value as any }))}
                    className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none" style={{ borderColor: COLORS.grayMedium }}>
                    <option value="guru">Guru Bidang Studi</option>
                    <option value="admin">Staf Admin Tata Usaha (TU)</option>
                    <option value="kepsek">Kepala Sekolah (Kepsek)</option>
                    <option value="murid">Siswa Sekolah</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setIsAddUserOpen(false)}
                    className="flex-1 py-2.5 border rounded-xl text-sm font-semibold hover:bg-gray-50" style={{ borderColor: COLORS.grayMedium }}>Batal</button>
                  <button type="submit"
                    className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90" style={{ backgroundColor: COLORS.primary }}>
                    Daftarkan Pengguna
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
