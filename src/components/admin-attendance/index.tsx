import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronDown, CheckCircle, XCircle, AlertCircle, Clock, Download, Users, UserCheck } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  grayMedium: "#e9ecef",
  grayLight: "#f8f9fa",
};

const MOCK_ATTENDANCE = [
  { id: "1", nama: "Ahmad Rizki Pratama", nis: "2023001", status: "Hadir", jamMasuk: "06:45", keterangan: "-" },
  { id: "2", nama: "Siti Nurhaliza", nis: "2023002", status: "Sakit", jamMasuk: "-", keterangan: "Surat Dokter" },
  { id: "3", nama: "Budi Setiawan", nis: "2022015", status: "Hadir", jamMasuk: "06:50", keterangan: "-" },
  { id: "4", nama: "Dewi Anggraeni", nis: "2021042", status: "Izin", jamMasuk: "-", keterangan: "Acara Keluarga" },
  { id: "5", nama: "Rizki Fadilah", nis: "2020089", status: "Alpa", jamMasuk: "-", keterangan: "Tanpa Keterangan" },
];

export const AttendanceManagementDashboard = () => {
  const [selectedKelas, setSelectedKelas] = useState("X-1");
  const today = format(new Date(), "EEEE, dd MMMM yyyy", { locale: id });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Hadir": return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200"><CheckCircle size={12}/> Hadir</span>;
      case "Sakit": return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200"><AlertCircle size={12}/> Sakit</span>;
      case "Izin": return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200"><AlertCircle size={12}/> Izin</span>;
      case "Alpa": return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200"><XCircle size={12}/> Alpa</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Absensi Siswa</h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>Kelola dan pantau kehadiran siswa setiap hari.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium" style={{ borderColor: COLORS.grayMedium, color: COLORS.primary }}>
            <Download size={16} /> Export Rekap
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-5 border shadow-sm" style={{ borderColor: COLORS.grayMedium }}>
           <div className="flex justify-between items-center mb-2">
             <span className="text-sm font-medium" style={{ color: COLORS.secondary }}>Total Siswa</span>
             <Users className="text-gray-400" size={18} />
           </div>
           <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>36</h3>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 border shadow-sm" style={{ borderColor: COLORS.grayMedium }}>
           <div className="flex justify-between items-center mb-2">
             <span className="text-sm font-medium" style={{ color: COLORS.secondary }}>Hadir</span>
             <UserCheck className="text-green-500" size={18} />
           </div>
           <h3 className="text-2xl font-bold text-green-600">32</h3>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-5 border shadow-sm" style={{ borderColor: COLORS.grayMedium }}>
           <div className="flex justify-between items-center mb-2">
             <span className="text-sm font-medium" style={{ color: COLORS.secondary }}>Sakit / Izin</span>
             <AlertCircle className="text-orange-500" size={18} />
           </div>
           <h3 className="text-2xl font-bold text-orange-600">3</h3>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl p-5 border shadow-sm" style={{ borderColor: COLORS.grayMedium }}>
           <div className="flex justify-between items-center mb-2">
             <span className="text-sm font-medium" style={{ color: COLORS.secondary }}>Alpa</span>
             <XCircle className="text-red-500" size={18} />
           </div>
           <h3 className="text-2xl font-bold text-red-600">1</h3>
        </motion.div>
      </div>

      <div className="bg-white rounded-xl p-4 border shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center" style={{ borderColor: COLORS.grayMedium }}>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Calendar size={18} style={{ color: COLORS.accent }} />
          <span className="font-semibold" style={{ color: COLORS.primary }}>{today}</span>
        </div>
        <div className="flex gap-3 w-full md:w-auto items-center">
          <span className="text-sm font-medium" style={{ color: COLORS.secondary }}>Filter Kelas:</span>
          <div className="relative w-full md:w-48">
            <select 
              className="w-full appearance-none pl-4 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/50 bg-white"
              style={{ borderColor: COLORS.grayMedium, color: COLORS.primary, fontWeight: 600 }}
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
            >
              <option value="X-1">X-1 (IPA)</option>
              <option value="X-2">X-2 (IPS)</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: COLORS.grayMedium }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ backgroundColor: COLORS.grayLight, borderBottom: `1px solid ${COLORS.grayMedium}` }}>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Nama Siswa</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>NIS</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Status Kehadiran</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Jam Masuk</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Keterangan</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: COLORS.secondary }}>Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_ATTENDANCE.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium text-gray-900">{item.nama}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-600">{item.nis}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.jamMasuk !== "-" ? (
                       <div className="flex items-center gap-2 text-sm text-gray-700">
                         <Clock size={14} className="text-green-500" /> {item.jamMasuk}
                       </div>
                    ) : <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.keterangan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                     <button className="text-sm font-medium hover:underline" style={{ color: COLORS.accent }}>Ubah Status</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
