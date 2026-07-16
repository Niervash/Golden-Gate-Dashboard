import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, User, Plus, Search, FileText, Calendar as CalendarIcon, CheckCircle, Clock } from "lucide-react";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  grayMedium: "#e9ecef",
  grayLight: "#f8f9fa",
  blueTransparent10: "rgba(35, 48, 93, 0.1)"
};

const MOCK_COUNSELING = [
  { id: 1, tanggal: "12 Juli 2026", nama: "Rizki Fadilah", kelas: "XII-3", kasus: "Sering Terlambat", konselor: "Nur Aini, S.Pd", status: "Selesai" },
  { id: 2, tanggal: "14 Juli 2026", nama: "Budi Setiawan", kelas: "XI-1", kasus: "Penurunan Nilai Akademik", konselor: "Nur Aini, S.Pd", status: "Proses" },
  { id: 3, tanggal: "15 Juli 2026", nama: "Dewi Anggraeni", kelas: "XII-3", kasus: "Konsultasi Karir / Kuliah", konselor: "Nur Aini, S.Pd", status: "Selesai" },
];

export const CounselingManagementDashboard = () => {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: COLORS.primary }}>
            <HeartHandshake className="text-[#d9ab3f]" size={28}/> BK & Konseling
          </h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>Catatan bimbingan, konseling, dan pelanggaran siswa.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium" style={{ borderColor: COLORS.grayMedium, color: COLORS.primary }}>
            <FileText size={16} /> Rekap Kasus
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors shadow-sm text-sm font-medium" style={{ backgroundColor: COLORS.accent }}>
            <Plus size={16} /> Catat Kasus Baru
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center" style={{ borderColor: COLORS.grayMedium }}>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Cari nama siswa atau kasus..." className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/50 transition-shadow" style={{ borderColor: COLORS.grayMedium }} />
        </div>
        <div className="flex gap-4 text-sm font-medium text-gray-600">
           <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Selesai (2)</div>
           <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Proses (1)</div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4">
        {MOCK_COUNSELING.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-5 border shadow-sm flex flex-col md:flex-row gap-6 md:items-center justify-between hover:shadow-md transition-shadow" style={{ borderColor: COLORS.grayMedium }}>
            <div className="flex gap-4 items-start md:items-center">
               <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg" style={{ backgroundColor: COLORS.blueTransparent10, color: COLORS.primary }}>
                  {item.nama.charAt(0)}
               </div>
               <div>
                 <h3 className="font-bold text-lg" style={{ color: COLORS.primary }}>{item.nama} <span className="text-sm font-normal text-gray-500">({item.kelas})</span></h3>
                 <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-600">
                    <span className="flex items-center gap-1"><CalendarIcon size={14}/> {item.tanggal}</span>
                    <span className="flex items-center gap-1 font-medium text-gray-900"><FileText size={14} className="text-amber-500"/> {item.kasus}</span>
                    <span className="flex items-center gap-1"><User size={14}/> Konselor: {item.konselor}</span>
                 </div>
               </div>
            </div>
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-3">
               {item.status === 'Selesai' ? (
                 <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"><CheckCircle size={14}/> Selesai</span>
               ) : (
                 <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700"><Clock size={14}/> Proses</span>
               )}
               <button className="text-sm font-semibold hover:underline" style={{ color: COLORS.accent }}>Lihat Detail</button>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
