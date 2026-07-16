import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, ChevronDown, Download, Award, Target, Book, Edit, UploadCloud } from "lucide-react";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  grayMedium: "#e9ecef",
  grayLight: "#f8f9fa",
  blueTransparent10: "rgba(35, 48, 93, 0.1)"
};

const MOCK_GRADES = [
  { id: 1, nis: "2023001", nama: "Ahmad Rizki Pratama", tugas: 85, uts: 88, uas: 90 },
  { id: 2, nis: "2023002", nama: "Siti Nurhaliza", tugas: 90, uts: 92, uas: 95 },
  { id: 3, nis: "2022015", nama: "Budi Setiawan", tugas: 78, uts: 80, uas: 82 },
  { id: 4, nis: "2021042", nama: "Dewi Anggraeni", tugas: 95, uts: 89, uas: 92 },
  { id: 5, nis: "2020089", nama: "Rizki Fadilah", tugas: 70, uts: 75, uas: 72 },
];

export const GradesManagementDashboard = () => {
  const [selectedKelas, setSelectedKelas] = useState("X-1");
  const [selectedMapel, setSelectedMapel] = useState("Matematika");

  const calculateAkhir = (tugas: number, uts: number, uas: number) => {
    return Math.round((tugas * 0.3) + (uts * 0.3) + (uas * 0.4));
  };

  const getPredikat = (nilai: number) => {
    if (nilai >= 90) return "A";
    if (nilai >= 80) return "B";
    if (nilai >= 70) return "C";
    return "D";
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Penilaian & Raport</h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>Kelola nilai siswa untuk setiap mata pelajaran.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium" style={{ borderColor: COLORS.grayMedium, color: COLORS.primary }}>
            <UploadCloud size={16} /> Import Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors shadow-sm text-sm font-medium" style={{ backgroundColor: COLORS.accent }}>
            <Download size={16} /> Cetak Raport
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center" style={{ borderColor: COLORS.grayMedium }}>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium whitespace-nowrap" style={{ color: COLORS.secondary }}>Pilih Kelas:</span>
            <div className="relative w-full md:w-40">
              <select className="w-full appearance-none pl-4 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/50 bg-white" style={{ borderColor: COLORS.grayMedium, color: COLORS.primary, fontWeight: 600 }} value={selectedKelas} onChange={(e) => setSelectedKelas(e.target.value)}>
                <option value="X-1">X-1</option>
                <option value="X-2">X-2</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium whitespace-nowrap" style={{ color: COLORS.secondary }}>Mata Pelajaran:</span>
            <div className="relative w-full md:w-48">
              <select className="w-full appearance-none pl-4 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/50 bg-white" style={{ borderColor: COLORS.grayMedium, color: COLORS.primary, fontWeight: 600 }} value={selectedMapel} onChange={(e) => setSelectedMapel(e.target.value)}>
                <option value="Matematika">Matematika</option>
                <option value="Bahasa Indonesia">B. Indonesia</option>
                <option value="Fisika">Fisika</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4" style={{ borderColor: COLORS.grayMedium }}>
           <div className="p-3 bg-blue-50 rounded-lg"><Book className="text-blue-600" size={24}/></div>
           <div>
             <p className="text-sm font-medium" style={{ color: COLORS.secondary }}>Rata-rata Kelas</p>
             <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>83.4</h3>
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
             <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>90%</h3>
           </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: COLORS.grayMedium }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ backgroundColor: COLORS.grayLight, borderBottom: `1px solid ${COLORS.grayMedium}` }}>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>NIS</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Nama Siswa</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-center" style={{ color: COLORS.secondary }}>Tugas (30%)</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-center" style={{ color: COLORS.secondary }}>UTS (30%)</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-center" style={{ color: COLORS.secondary }}>UAS (40%)</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-center" style={{ color: COLORS.secondary }}>Nilai Akhir</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-center" style={{ color: COLORS.secondary }}>Predikat</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: COLORS.secondary }}>Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_GRADES.map((item) => {
                const akhir = calculateAkhir(item.tugas, item.uts, item.uas);
                const predikat = getPredikat(akhir);
                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{item.nis}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium" style={{ color: COLORS.primary }}>{item.nama}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">{item.tugas}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">{item.uts}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">{item.uas}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`font-bold ${akhir >= 75 ? 'text-green-600' : 'text-red-600'}`}>{akhir}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${predikat === 'A' ? 'bg-green-100 text-green-700' : predikat === 'B' ? 'bg-blue-100 text-blue-700' : predikat === 'C' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{predikat}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                       <button className="p-1.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" title="Input Nilai"><Edit size={16} /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
