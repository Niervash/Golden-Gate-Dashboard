import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Search, ShieldCheck, UserCog, UserPlus, Users, X } from "lucide-react";
import { teachersApi, usersApi } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";

type AccountRole = "admin" | "kepsek" | "guru" | "siswa";
type UserAccount = { id: string; name: string; email: string; role: AccountRole };
type Teacher = { id: string; email?: string; nama_lengkap?: string; is_homeroom?: boolean; homeroom_class?: string };

const listFrom = (response: any) => {
  const data = response?.data;
  return Array.isArray(data) ? data : data?.users || data?.data || [];
};

const ROLE_LABELS: Record<AccountRole, string> = {
  admin: "Admin TU",
  kepsek: "Kepala Sekolah",
  guru: "Guru",
  siswa: "Siswa",
};

const emptyForm = { name: "", email: "", password: "", role: "siswa" as AccountRole };

const Modal = ({ children }: { children: React.ReactNode }) => (
  <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
    <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">{children}</div>
  </div>
);

export const AdminUserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<UserAccount | null>(null);
  const [editingRole, setEditingRole] = useState<AccountRole>("guru");
  const [editingName, setEditingName] = useState("");
  const [editingEmail, setEditingEmail] = useState("");
  const [editingPassword, setEditingPassword] = useState("");
  const [teacherType, setTeacherType] = useState<"mapel" | "wali">("mapel");
  const [homeroomClass, setHomeroomClass] = useState("");
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersRes, teachersRes] = await Promise.all([usersApi.getAll(), teachersApi.getAll()]);
      setUsers(listFrom(usersRes).map((item: any) => ({
        id: String(item.id), name: item.name, email: item.email, role: item.role === "murid" ? "siswa" : item.role,
      })));
      setTeachers(listFrom(teachersRes));
    } catch {
      toast({ title: "Gagal memuat data", description: "Daftar pengguna atau guru tidak dapat dimuat dari server.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const teacherFor = (user: UserAccount | null) => teachers.find((teacher) =>
    teacher.email && user?.email && teacher.email.toLowerCase() === user.email.toLowerCase(),
  );

  const filteredUsers = useMemo(() => users.filter((user) =>
    `${user.name} ${user.email} ${ROLE_LABELS[user.role]}`.toLowerCase().includes(query.toLowerCase()),
  ), [query, users]);

  const createAccount = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      await usersApi.create(form);
      toast({ title: "Akun dibuat", description: "Akun pengguna berhasil ditambahkan." });
      setCreateOpen(false);
      setForm(emptyForm);
      await loadData();
    } catch (error: any) {
      toast({ title: "Gagal membuat akun", description: error?.response?.data?.message || "Periksa email dan data akun.", variant: "destructive" });
    } finally { setSaving(false); }
  };

  const openEditor = (user: UserAccount) => {
    const teacher = teacherFor(user);
    setEditing(user);
    setEditingRole(user.role);
    setEditingName(user.name);
    setEditingEmail(user.email);
    setEditingPassword("");
    setTeacherType(teacher?.is_homeroom ? "wali" : "mapel");
    setHomeroomClass(teacher?.homeroom_class || "");
  };

  const saveRole = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      const teacher = teacherFor(editing);
      if (editingRole === "guru" && !teacher) {
        throw new Error("Akun guru hanya dapat diaktifkan dari Data Guru setelah profil guru dibuat.");
      }
      await usersApi.update(editing.id, {
        name: editingName,
        email: editingEmail,
        role: editingRole,
        ...(editingPassword ? { password: editingPassword } : {}),
      });
      if (teacher && teacher.email !== editingEmail) {
        await teachersApi.update(teacher.id, { ...teacher, email: editingEmail });
      }
      if (editingRole === "guru") {
        if (teacher) {
          await teachersApi.assignHomeroom(teacher.id, {
            is_homeroom: teacherType === "wali",
            homeroom_class: teacherType === "wali" ? homeroomClass : undefined,
          });
        } else if (teacherType === "wali") {
          throw new Error("Data guru dengan email ini belum tersedia. Tambahkan data guru terlebih dahulu.");
        }
      }
      toast({ title: "Role diperbarui", description: "Hak akses pengguna dan penugasan guru berhasil disimpan." });
      setEditing(null);
      await loadData();
    } catch (error: any) {
      toast({ title: "Gagal memperbarui role", description: error?.message || error?.response?.data?.message || "Terjadi kesalahan saat menyimpan.", variant: "destructive" });
    } finally { setSaving(false); }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#d9ab3f]">Administrasi TU</p>
          <h1 className="mt-1 text-2xl font-bold text-[#23305d]">Manajemen Pengguna & Role</h1>
          <p className="mt-1 text-sm text-slate-500">Buat akun, ubah role, dan tetapkan guru sebagai wali kelas.</p>
        </div>
        <button onClick={() => setCreateOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#23305d] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#182244]">
          <Plus size={17} /> Tambah Akun
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {(["admin", "kepsek", "guru", "siswa"] as AccountRole[]).map((role) => (
          <div key={role} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-xs font-semibold uppercase text-slate-400">{ROLE_LABELS[role]}</p>
            <p className="mt-1 text-2xl font-bold text-[#23305d]">{users.filter((user) => user.role === role).length}</p>
          </div>
        ))}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase text-amber-700">Wali Kelas</p>
          <p className="mt-1 text-2xl font-bold text-amber-900">{teachers.filter((teacher) => teacher.is_homeroom).length}</p>
        </div>
      </div>

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="flex items-center gap-2 font-bold text-[#23305d]"><Users size={19} className="text-[#d9ab3f]" /> Semua Pengguna</h2>
          <label className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm text-slate-500">
            <Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama atau email" className="w-full outline-none sm:w-56" />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-3">Pengguna</th><th className="px-5 py-3">Role akun</th><th className="px-5 py-3">Penugasan guru</th><th className="px-5 py-3 text-right">Aksi</th></tr></thead>
            <tbody className="divide-y">
              {filteredUsers.map((user) => {
                const teacher = teacherFor(user);
                return <tr key={user.id}>
                  <td className="px-5 py-4"><p className="font-semibold text-slate-800">{user.name}</p><p className="text-xs text-slate-500">{user.email}</p></td>
                  <td className="px-5 py-4"><span className="rounded-full bg-[#23305d]/10 px-2.5 py-1 text-xs font-bold text-[#23305d]">{ROLE_LABELS[user.role]}</span></td>
                  <td className="px-5 py-4 text-xs text-slate-600">{user.role !== "guru" ? "-" : teacher?.is_homeroom ? `Wali Kelas ${teacher.homeroom_class || "(belum dipilih)"}` : "Guru Mapel"}</td>
                  <td className="px-5 py-4 text-right"><button onClick={() => openEditor(user)} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-[#23305d] hover:bg-[#23305d]/10"><Pencil size={14} /> Ubah Role</button></td>
                </tr>;
              })}
              {!loading && !filteredUsers.length && <tr><td colSpan={4} className="px-5 py-10 text-center text-slate-500">Tidak ada pengguna yang ditemukan.</td></tr>}
              {loading && <tr><td colSpan={4} className="px-5 py-10 text-center text-slate-500">Memuat data pengguna…</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {createOpen && <Modal>
        <form onSubmit={createAccount}>
          <div className="flex items-start justify-between bg-gradient-to-br from-[#23305d] to-[#111938] p-6 text-white">
            <div className="flex gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#d9ab3f]"><UserPlus size={21} /></span><div><h2 className="font-bold">Tambah Akun Baru</h2><p className="mt-1 text-xs text-white/70">Akun guru diaktifkan dari halaman Data Guru.</p></div></div>
            <button type="button" onClick={() => setCreateOpen(false)} className="rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white"><X size={20} /></button>
          </div>
          <div className="space-y-4 p-6">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">Nama lengkap<input required autoFocus value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Contoh: Siti Aisyah, S.Pd." className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-800 outline-none focus:border-[#d9ab3f] focus:ring-2 focus:ring-[#d9ab3f]/20" /></label>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">Email akun<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="nama@goldengate.sch.id" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-800 outline-none focus:border-[#d9ab3f] focus:ring-2 focus:ring-[#d9ab3f]/20" /></label>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">Password awal<input required type="password" minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Minimal 6 karakter" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-800 outline-none focus:border-[#d9ab3f] focus:ring-2 focus:ring-[#d9ab3f]/20" /></label>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">Role akun<select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as AccountRole })} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none focus:border-[#d9ab3f] focus:ring-2 focus:ring-[#d9ab3f]/20">{Object.entries(ROLE_LABELS).filter(([value]) => value !== "guru").map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          </div>
          <div className="flex gap-3 border-t border-slate-100 bg-slate-50 p-5"><button type="button" onClick={() => setCreateOpen(false)} className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 hover:bg-slate-100">Batal</button><button disabled={saving} className="flex-1 rounded-xl bg-[#23305d] py-3 text-sm font-bold text-white hover:bg-[#182244] disabled:opacity-60">{saving ? "Menyimpan…" : "Buat Akun"}</button></div>
        </form>
      </Modal>}

      {editing && <Modal><form onSubmit={saveRole} className="p-6"><div className="mb-5 flex items-start justify-between"><div><h2 className="flex items-center gap-2 font-bold text-[#23305d]"><UserCog size={19} className="text-[#d9ab3f]" /> Edit Pengguna & Role</h2><p className="mt-1 text-sm text-slate-500">Perbarui identitas, kredensial, dan hak akses akun.</p></div><button type="button" onClick={() => setEditing(null)}><X size={20} /></button></div><div className="space-y-3"><input required value={editingName} onChange={(e) => setEditingName(e.target.value)} placeholder="Nama lengkap" className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-[#d9ab3f] focus:ring-2 focus:ring-[#d9ab3f]/20" /><input required type="email" value={editingEmail} onChange={(e) => setEditingEmail(e.target.value)} placeholder="Email akun" className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-[#d9ab3f] focus:ring-2 focus:ring-[#d9ab3f]/20" /><input type="password" minLength={6} value={editingPassword} onChange={(e) => setEditingPassword(e.target.value)} placeholder="Password baru (kosongkan bila tidak diubah)" className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-[#d9ab3f] focus:ring-2 focus:ring-[#d9ab3f]/20" /></div><label className="mb-3 mt-5 block text-xs font-bold uppercase text-slate-500">Role akun</label><select value={editingRole} onChange={(e) => setEditingRole(e.target.value as AccountRole)} className="w-full rounded-xl border px-3 py-2.5 text-sm">{Object.entries(ROLE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>{editingRole === "guru" && <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4"><p className="flex items-center gap-2 text-sm font-bold text-amber-900"><ShieldCheck size={17} /> Penugasan Guru</p><div className="mt-3 grid grid-cols-2 gap-2"><button type="button" onClick={() => setTeacherType("mapel")} className={`rounded-lg border p-2 text-xs font-bold ${teacherType === "mapel" ? "border-[#23305d] bg-white text-[#23305d]" : "border-transparent text-slate-500"}`}>Guru Mapel</button><button type="button" onClick={() => setTeacherType("wali")} className={`rounded-lg border p-2 text-xs font-bold ${teacherType === "wali" ? "border-[#23305d] bg-white text-[#23305d]" : "border-transparent text-slate-500"}`}>Wali Kelas</button></div>{teacherType === "wali" && <input required value={homeroomClass} onChange={(e) => setHomeroomClass(e.target.value)} placeholder="Contoh: X-A" className="mt-3 w-full rounded-xl border bg-white px-3 py-2.5 text-sm" />} {!teacherFor(editing) && <p className="mt-3 text-xs text-amber-800">Data guru dengan email ini belum ada. Tambahkan terlebih dahulu pada Data Guru sebelum menetapkan wali kelas.</p>}</div>}<button disabled={saving} className="mt-5 w-full rounded-xl bg-[#23305d] py-2.5 text-sm font-bold text-white disabled:opacity-60">{saving ? "Menyimpan…" : "Simpan Perubahan"}</button></form></Modal>}
    </div>
  );
};
