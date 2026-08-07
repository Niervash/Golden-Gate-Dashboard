import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, ChevronDown, Download, Award, Target, Book, Edit, UploadCloud, X, Save, Loader2 } from "lucide-react";
import { useAuth } from "../../context";
import { gradesApi, studentsApi } from "../../utils/api";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  grayMedium: "#e9ecef",
  grayLight: "#f8f9fa",
  blueTransparent10: "rgba(35, 48, 93, 0.1)"
};

interface GradeItem {
  id: number;
  nis: string;
  nama_lengkap?: string;
  kelas?: string;
  mapel: string;
  tugas: number;
  uts: number;
  uas: number;
  nilai_akhir: number;
  predikat: string;
  semester: string;
  tahun_ajaran: string;
}

export const GradesManagementDashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin" || user?.role === "kepsek";

  const [selectedKelas, setSelectedKelas] = useState("1-A");
  const [selectedMapel, setSelectedMapel] = useState("Matematika");
  const [selectedSemester, setSelectedSemester] = useState("Ganjil");
  const [selectedTahun, setSelectedTahun] = useState("2026/2027");
  const [gradesList, setGradesList] = useState<GradeItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState<GradeItem | null>(null);
  const [tempTugas, setTempTugas] = useState(0);
  const [tempUts, setTempUts] = useState(0);
  const [tempUas, setTempUas] = useState(0);
  const [saving, setSaving] = useState(false);

  // For add grade form (guru mode)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [addForm, setAddForm] = useState({ nis: "", mapel: selectedMapel, tugas: "", uts: "", uas: "", semester: selectedSemester, tahun_ajaran: selectedTahun });

  const loadGrades = async () => {
    setLoading(true);
    try {
      const res = await gradesApi.getAll();
      setGradesList(res.data);
    } catch (err) {
      console.error("Gagal memuat data nilai:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadStudents = async () => {
    try {
      const res = await studentsApi.getAll();
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadGrades();
    if (!isAdmin) loadStudents();
  }, []);

  const calculateAkhir = (tugas: number, uts: number, uas: number) => {
    return Math.round((tugas * 0.4) + (uts * 0.3) + (uas * 0.3));
  };

  const getPredikat = (nilai: number) => {
    if (nilai >= 85) return "A";
    if (nilai >= 75) return "B";
    if (nilai >= 65) return "C";
    return "D";
  };

  const filteredGrades = gradesList.filter(g => {
    const kelasMatch = !selectedKelas || (g.kelas || "").includes(selectedKelas);
    const mapelMatch = !selectedMapel || g.mapel === selectedMapel;
    return kelasMatch && mapelMatch;
  });

  const avgNilai = filteredGrades.length
    ? Math.round(filteredGrades.reduce((s, g) => s + g.nilai_akhir, 0) / filteredGrades.length)
    : 0;
  const aboveKKM = filteredGrades.filter(g => g.nilai_akhir >= 75).length;
  const pctAboveKKM = filteredGrades.length ? Math.round((aboveKKM / filteredGrades.length) * 100) : 0;

  const handleOpenEdit = (grade: GradeItem) => {
    if (isAdmin) return;
    setEditingGrade(grade);
    setTempTugas(grade.tugas);
    setTempUts(grade.uts);
    setTempUas(grade.uas);
    setIsEditModalOpen(true);
  };

  const handleSaveGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGrade) return;
    setSaving(true);
    try {
      await gradesApi.update(editingGrade.id, {
        nis: editingGrade.nis,
        mapel: editingGrade.mapel,
        tugas: Number(tempTugas),
        uts: Number(tempUts),
        uas: Number(tempUas),
        semester: editingGrade.semester,
        tahun_ajaran: editingGrade.tahun_ajaran,
      });
      alert("✅ Nilai berhasil diperbarui!");
      setIsEditModalOpen(false);
      setEditingGrade(null);
      await loadGrades();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal memperbarui nilai.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await gradesApi.createOrUpdate({
        ...addForm,
        tugas: Number(addForm.tugas),
        uts: Number(addForm.uts),
        uas: Number(addForm.uas),
      });
      alert("✅ Nilai berhasil ditambahkan!");
      setIsAddModalOpen(false);
      setAddForm({ nis: "", mapel: selectedMapel, tugas: "", uts: "", uas: "", semester: selectedSemester, tahun_ajaran: selectedTahun });
      await loadGrades();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal menambahkan nilai.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Penilaian & Raport</h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>
            {isAdmin ? "Monitoring nilai siswa untuk setiap mata pelajaran." : "Kelola nilai siswa untuk setiap mata pelajaran."}
          </p>
        </div>
        <div className="flex gap-3">
          {!isAdmin && (
            <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors shadow-sm text-sm font-medium" style={{ backgroundColor: COLORS.accent }}>
              <Edit size={16} /> Input Nilai
            </button>
          )}
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors shadow-sm text-sm font-medium" style={{ backgroundColor: COLORS.primary }}>
            <Download size={16} /> Cetak Raport
          </button>
        </div>
      </div>

      {isAdmin && (
        <div className="p-4 rounded-xl border bg-blue-50/50 border-blue-200/60 flex items-start gap-3">
          <div className="p-1 rounded-full bg-blue-500 text-white mt-0.5"><FileText size={16} /></div>
          <div>
            <p className="text-sm font-semibold text-blue-900">Mode Monitoring (Read-Only)</p>
            <p className="text-xs text-blue-700/80">
              Anda masuk sebagai {user?.role === "kepsek" ? "Kepala Sekolah" : "Admin TU"}. Pengisian & penambahan nilai sepenuhnya dilakukan oleh Guru Bidang Studi / Wali Kelas.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-4 border shadow-sm flex flex-wrap gap-4 items-center" style={{ borderColor: COLORS.grayMedium }}>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium whitespace-nowrap" style={{ color: COLORS.secondary }}>Mata Pelajaran:</span>
          <div className="relative">
            <select className="appearance-none pl-4 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/50 bg-white text-sm" style={{ borderColor: COLORS.grayMedium, color: COLORS.primary, fontWeight: 600 }} value={selectedMapel} onChange={(e) => setSelectedMapel(e.target.value)}>
              <option value="">Semua Mapel</option>
              <option value="Matematika Peminatan">Matematika Peminatan</option>
              <option value="Fisika">Fisika</option>
              <option value="Informatika">Informatika</option>
              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4" style={{ borderColor: COLORS.grayMedium }}>
           <div className="p-3 bg-blue-50 rounded-lg"><Book className="text-blue-600" size={24}/></div>
           <div>
             <p className="text-sm font-medium" style={{ color: COLORS.secondary }}>Rata-rata Kelas</p>
             <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>{avgNilai}</h3>
           </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4" style={{ borderColor: COLORS.grayMedium }}>
           <div className="p-3 bg-green-50 rounded-lg"><Target className="text-green-600" size={24}/></div>
           <div>
             <p className="text-sm font-medium" style={{ color: COLORS.secondary }}>KKM Mapel</p>
             <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>75</h3>
           </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4" style={{ borderColor: COLORS.grayMedium }}>
           <div className="p-3 bg-amber-50 rounded-lg"><Award className="text-amber-600" size={24}/></div>
           <div>
             <p className="text-sm font-medium" style={{ color: COLORS.secondary }}>Siswa di Atas KKM</p>
             <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>{pctAboveKKM}%</h3>
           </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: COLORS.grayMedium }}>
        {loading ? (
          <div className="text-center py-16 text-gray-400">
            <Loader2 className="mx-auto animate-spin mb-2" size={32} />
            <p>Memuat data nilai...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr style={{ backgroundColor: COLORS.grayLight, borderBottom: `1px solid ${COLORS.grayMedium}` }}>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>NIS</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Nama Siswa</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Mapel</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-center" style={{ color: COLORS.secondary }}>Tugas (40%)</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-center" style={{ color: COLORS.secondary }}>UTS (30%)</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-center" style={{ color: COLORS.secondary }}>UAS (30%)</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-center" style={{ color: COLORS.secondary }}>Nilai Akhir</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-center" style={{ color: COLORS.secondary }}>Predikat</th>
                  {!isAdmin && <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: COLORS.secondary }}>Aksi</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredGrades.length === 0 ? (
                  <tr><td colSpan={9} className="px-6 py-12 text-center text-gray-400">Belum ada data nilai</td></tr>
                ) : filteredGrades.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{item.nis}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium" style={{ color: COLORS.primary }}>{item.nama_lengkap || item.nis}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.mapel}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">{item.tugas}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">{item.uts}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">{item.uas}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`font-bold ${item.nilai_akhir >= 75 ? 'text-green-600' : 'text-red-600'}`}>{item.nilai_akhir?.toFixed(1)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${item.predikat === 'A' ? 'bg-green-100 text-green-700' : item.predikat === 'B' ? 'bg-blue-100 text-blue-700' : item.predikat === 'C' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{item.predikat}</span>
                    </td>
                    {!isAdmin && (
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                         <button onClick={() => handleOpenEdit(item)} className="p-1.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" title="Edit Nilai">
                           <Edit size={16} />
                         </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Edit Grade Modal */}
      {isEditModalOpen && editingGrade && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-5 bg-slate-900 border-b border-slate-800 flex justify-between items-center text-white">
              <div>
                <h3 className="font-bold text-base">Edit Nilai Siswa</h3>
                <p className="text-xs text-slate-400 mt-0.5">{editingGrade.nama_lengkap} ({editingGrade.nis}) — {editingGrade.mapel}</p>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-white p-1"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveGrade} className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {[{label:"Tugas (40%)", val:tempTugas, set:setTempTugas},{label:"UTS (30%)", val:tempUts, set:setTempUts},{label:"UAS (30%)", val:tempUas, set:setTempUas}].map(({label, val, set}) => (
                  <div key={label} className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-500 uppercase">{label}</label>
                    <input type="number" min="0" max="100" value={val} onChange={(e) => set(Number(e.target.value))} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#d9ab3f]" required />
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl p-3.5 border text-center">
                <span className="block text-xs font-medium text-gray-400">Prediksi Nilai Akhir</span>
                <span className="block text-3xl font-extrabold text-slate-800 mt-1">{calculateAkhir(tempTugas, tempUts, tempUas)}</span>
                <span className="inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">Predikat {getPredikat(calculateAkhir(tempTugas, tempUts, tempUas))}</span>
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 py-2.5 border rounded-lg text-sm font-semibold hover:bg-gray-50">Batal</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-[#23305d] text-white rounded-lg text-sm font-semibold hover:bg-[#1a2347] flex items-center justify-center gap-1.5">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} {saving ? "Menyimpan..." : "Simpan Nilai"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Grade Modal */}
      {isAddModalOpen && !isAdmin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-5 bg-slate-900 border-b border-slate-800 flex justify-between items-center text-white">
              <h3 className="font-bold text-base">Input Nilai Baru</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white p-1"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddGrade} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">NIS Siswa *</label>
                <input value={addForm.nis} onChange={e => setAddForm(p => ({...p, nis: e.target.value}))} required placeholder="Masukkan NIS" className="w-full px-3 py-2 border rounded-lg focus:outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Mata Pelajaran *</label>
                <input value={addForm.mapel} onChange={e => setAddForm(p => ({...p, mapel: e.target.value}))} required placeholder="Nama mata pelajaran" className="w-full px-3 py-2 border rounded-lg focus:outline-none text-sm" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[{label:"Tugas", key:"tugas"},{label:"UTS", key:"uts"},{label:"UAS", key:"uas"}].map(({label, key}) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">{label}</label>
                    <input type="number" min="0" max="100" value={(addForm as any)[key]} onChange={e => setAddForm(p => ({...p, [key]: e.target.value}))} required className="w-full px-3 py-2 border rounded-lg focus:outline-none text-sm" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Semester</label>
                  <select value={addForm.semester} onChange={e => setAddForm(p => ({...p, semester: e.target.value}))} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option>Ganjil</option><option>Genap</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Tahun Ajaran</label>
                  <input value={addForm.tahun_ajaran} onChange={e => setAddForm(p => ({...p, tahun_ajaran: e.target.value}))} placeholder="2026/2027" className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-2.5 border rounded-lg text-sm font-semibold hover:bg-gray-50">Batal</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5" style={{ backgroundColor: COLORS.accent }}>
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
