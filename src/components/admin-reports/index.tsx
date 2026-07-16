import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, BarChart2, PieChart, FileSpreadsheet } from "lucide-react";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
};

export const AdminReports = () => {
  const [reportType, setReportType] = useState("akademik");

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Laporan & Statistik</h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>Generator laporan akademik, absensi, dan keuangan.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Laporan Akademik */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`bg-white p-6 rounded-2xl border-2 cursor-pointer transition-all ${reportType === 'akademik' ? 'border-[#23305d] shadow-md' : 'border-gray-100 hover:border-[#d9ab3f]'}`} onClick={() => setReportType('akademik')}>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <BarChart2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold mb-2" style={{ color: COLORS.primary }}>Laporan Akademik</h3>
          <p className="text-sm text-gray-500">Rekapitulasi nilai, rata-rata kelas, dan statistik kelulusan siswa.</p>
        </motion.div>

        {/* Laporan Kehadiran */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className={`bg-white p-6 rounded-2xl border-2 cursor-pointer transition-all ${reportType === 'kehadiran' ? 'border-[#23305d] shadow-md' : 'border-gray-100 hover:border-[#d9ab3f]'}`} onClick={() => setReportType('kehadiran')}>
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
            <PieChart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold mb-2" style={{ color: COLORS.primary }}>Laporan Kehadiran</h3>
          <p className="text-sm text-gray-500">Persentase kehadiran siswa, guru, dan staf per bulan/semester.</p>
        </motion.div>

        {/* Laporan Keuangan */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className={`bg-white p-6 rounded-2xl border-2 cursor-pointer transition-all ${reportType === 'keuangan' ? 'border-[#23305d] shadow-md' : 'border-gray-100 hover:border-[#d9ab3f]'}`} onClick={() => setReportType('keuangan')}>
          <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center mb-4">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold mb-2" style={{ color: COLORS.primary }}>Laporan Keuangan</h3>
          <p className="text-sm text-gray-500">Pembayaran SPP, tunggakan, dan rekapitulasi dana operasional sekolah.</p>
        </motion.div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-8">
        <h3 className="text-lg font-bold mb-4" style={{ color: COLORS.primary }}>Pengaturan Generator Laporan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Tahun Ajaran</label>
            <select className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#23305d] focus:border-[#23305d] p-2 border">
              <option>2023/2024</option>
              <option>2022/2023</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Semester</label>
            <select className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#23305d] focus:border-[#23305d] p-2 border">
              <option>Ganjil</option>
              <option>Genap</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Format Laporan</label>
            <select className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#23305d] focus:border-[#23305d] p-2 border">
              <option>PDF Document (.pdf)</option>
              <option>Excel Spreadsheet (.xlsx)</option>
              <option>CSV File (.csv)</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-colors hover:opacity-90" style={{ backgroundColor: COLORS.primary }}>
            <FileText size={18} /> Generate Laporan
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-colors hover:opacity-90" style={{ backgroundColor: COLORS.accent }}>
            <Download size={18} /> Unduh
          </button>
        </div>
      </div>
    </div>
  );
};
