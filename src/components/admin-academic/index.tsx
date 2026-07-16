import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Book, Layers, Plus, Edit, Trash2, CheckCircle } from "lucide-react";

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

const MOCK_MAPEL = [
  { id: "1", kode: "MP001", nama: "Matematika Wajib", kelompok: "Kelompok A (Wajib)", kkm: 75, status: "Aktif" },
  { id: "2", kode: "MP002", nama: "Bahasa Indonesia", kelompok: "Kelompok A (Wajib)", kkm: 75, status: "Aktif" },
  { id: "3", kode: "MP003", nama: "Fisika", kelompok: "Kelompok C (Peminatan IPA)", kkm: 78, status: "Aktif" },
  { id: "4", kode: "MP004", nama: "Ekonomi", kelompok: "Kelompok C (Peminatan IPS)", kkm: 76, status: "Aktif" },
  { id: "5", kode: "MP005", nama: "Pendidikan Jasmani", kelompok: "Kelompok B (Wajib)", kkm: 75, status: "Aktif" },
];

const MOCK_TAHUN_AJARAN = [
  { id: "1", tahun: "2023/2024", semester: "Ganjil", status: "Tidak Aktif" },
  { id: "2", tahun: "2023/2024", semester: "Genap", status: "Tidak Aktif" },
  { id: "3", tahun: "2024/2025", semester: "Ganjil", status: "Tidak Aktif" },
  { id: "4", tahun: "2024/2025", semester: "Genap", status: "Aktif" },
  { id: "5", tahun: "2025/2026", semester: "Ganjil", status: "Draf" },
];

export const AcademicManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState<"mapel" | "tahun" | "kelas">("mapel");

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Akademik</h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>Kelola Mata Pelajaran, Tahun Ajaran, dan Kelas.</p>
        </div>
      </div>

      {/* Custom Tabs */}
      <div className="flex border-b" style={{ borderColor: COLORS.grayMedium }}>
        <button 
          onClick={() => setActiveTab("mapel")}
          className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === "mapel" ? "bg-white" : "hover:bg-gray-50"}`}
          style={{ color: activeTab === "mapel" ? COLORS.primary : COLORS.secondary, borderBottomColor: activeTab === "mapel" ? COLORS.primary : "transparent" }}
        >
          <BookOpen size={16} /> Mata Pelajaran
        </button>
        <button 
          onClick={() => setActiveTab("tahun")}
          className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === "tahun" ? "bg-white" : "hover:bg-gray-50"}`}
          style={{ color: activeTab === "tahun" ? COLORS.primary : COLORS.secondary, borderBottomColor: activeTab === "tahun" ? COLORS.primary : "transparent" }}
        >
          <Calendar size={16} /> Tahun Ajaran
        </button>
        <button 
          onClick={() => setActiveTab("kelas")}
          className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === "kelas" ? "bg-white" : "hover:bg-gray-50"}`}
          style={{ color: activeTab === "kelas" ? COLORS.primary : COLORS.secondary, borderBottomColor: activeTab === "kelas" ? COLORS.primary : "transparent" }}
        >
          <Layers size={16} /> Kelas & Jurusan
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-b-xl rounded-tr-xl border p-6 shadow-sm" style={{ borderColor: COLORS.grayMedium, marginTop: 0 }}>
        
        {/* TAB: MATA PELAJARAN */}
        {activeTab === "mapel" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold" style={{ color: COLORS.primary }}>Daftar Mata Pelajaran</h2>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors text-sm font-medium" style={{ backgroundColor: COLORS.accent }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.accentLight} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.accent}>
                <Plus size={16} /> Tambah Mapel
              </button>
            </div>
            <div className="overflow-x-auto border rounded-lg" style={{ borderColor: COLORS.grayMedium }}>
              <table className="w-full text-left border-collapse">
                <thead style={{ backgroundColor: COLORS.grayLight, borderBottom: `1px solid ${COLORS.grayMedium}` }}>
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Kode</th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Nama Mata Pelajaran</th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Kelompok</th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-center" style={{ color: COLORS.secondary }}>KKM</th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-center" style={{ color: COLORS.secondary }}>Status</th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: COLORS.secondary }}>Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {MOCK_MAPEL.map((mapel) => (
                    <tr key={mapel.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">{mapel.kode}</td>
                      <td className="px-6 py-3 font-semibold" style={{ color: COLORS.primary }}>{mapel.nama}</td>
                      <td className="px-6 py-3 text-gray-600">{mapel.kelompok}</td>
                      <td className="px-6 py-3 text-center font-bold text-gray-700">{mapel.kkm}</td>
                      <td className="px-6 py-3 text-center">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">{mapel.status}</span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 rounded bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors" title="Edit"><Edit size={16} /></button>
                          <button className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors" title="Hapus"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* TAB: TAHUN AJARAN */}
        {activeTab === "tahun" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold" style={{ color: COLORS.primary }}>Tahun Ajaran & Semester</h2>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors text-sm font-medium" style={{ backgroundColor: COLORS.accent }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.accentLight} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.accent}>
                <Plus size={16} /> Tambah Tahun
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_TAHUN_AJARAN.map((ta) => (
                <div key={ta.id} className="border rounded-xl p-5 hover:shadow-md transition-shadow relative overflow-hidden" style={{ borderColor: ta.status === "Aktif" ? COLORS.accent : COLORS.grayMedium, backgroundColor: ta.status === "Aktif" ? COLORS.goldTransparent : COLORS.white }}>
                  {ta.status === "Aktif" && (
                    <div className="absolute top-0 right-0 p-2 text-white bg-green-500 rounded-bl-xl shadow-sm">
                      <CheckCircle size={16} />
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-white rounded-lg border shadow-sm" style={{ borderColor: COLORS.grayMedium }}>
                      <Calendar className="w-5 h-5" style={{ color: ta.status === "Aktif" ? COLORS.accent : COLORS.primary }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: COLORS.primary }}>TA {ta.tahun}</h3>
                      <p className="text-sm font-medium" style={{ color: COLORS.secondary }}>Semester {ta.semester}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t" style={{ borderColor: COLORS.grayMedium }}>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${ta.status === "Aktif" ? "bg-green-100 text-green-700 border-green-200" : ta.status === "Draf" ? "bg-gray-100 text-gray-700 border-gray-200" : "bg-red-100 text-red-700 border-red-200"}`}>{ta.status}</span>
                    {ta.status !== "Aktif" && (
                      <button className="text-xs font-semibold text-blue-600 hover:underline px-2 py-1 hover:bg-blue-50 rounded transition-colors">Set Aktif</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB: KELAS */}
        {activeTab === "kelas" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
             <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold" style={{ color: COLORS.primary }}>Daftar Kelas & Jurusan</h2>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors text-sm font-medium" style={{ backgroundColor: COLORS.accent }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.accentLight} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.accent}>
                <Plus size={16} /> Tambah Kelas
              </button>
            </div>
            <div className="text-center py-16 text-gray-500 border rounded-xl" style={{ borderColor: COLORS.grayMedium, borderStyle: 'dashed' }}>
               <Layers size={48} className="mx-auto mb-4 opacity-20 text-gray-400" />
               <p className="font-medium text-gray-700 text-lg">Modul Kelas</p>
               <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">Fitur untuk manajemen kelas dan jurusan sedang dalam tahap penyempurnaan dan akan segera hadir.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
