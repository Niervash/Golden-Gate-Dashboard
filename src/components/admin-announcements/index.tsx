import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Megaphone, Bell, Calendar, Edit, Trash2 } from "lucide-react";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
};

const MOCK_DATA = [
  { id: "1", title: "Pemberitahuan Ujian Akhir Semester", date: "20 Nov 2023", author: "Kepala Sekolah", status: "Aktif", target: "Semua Siswa" },
  { id: "2", title: "Rapat Orang Tua Murid Kelas X", date: "25 Nov 2023", author: "Humas", status: "Terjadwal", target: "Orang Tua" },
  { id: "3", title: "Kegiatan Ekstrakurikuler Diliburkan", date: "10 Nov 2023", author: "Kesiswaan", status: "Selesai", target: "Semua Siswa" },
];

export const AdminAnnouncements = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = MOCK_DATA.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Pengumuman & Mading</h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>Kelola informasi dan pengumuman internal sekolah.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors shadow-sm text-sm font-medium hover:opacity-90" style={{ backgroundColor: COLORS.primary }}>
          <Plus size={16} /> Buat Pengumuman
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4" style={{ borderColor: COLORS.grayMedium }}>
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
            <Megaphone className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: COLORS.secondary }}>Total Pengumuman</p>
            <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>42</h3>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4" style={{ borderColor: COLORS.grayMedium }}>
          <div className="p-3 rounded-lg bg-green-50 text-green-600">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: COLORS.secondary }}>Pengumuman Aktif</p>
            <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>5</h3>
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-xl p-4 border shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center" style={{ borderColor: COLORS.grayMedium }}>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari judul pengumuman..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-shadow"
            style={{ borderColor: COLORS.grayMedium }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: COLORS.grayMedium }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ backgroundColor: COLORS.grayLight, borderBottom: `1px solid ${COLORS.grayMedium}` }}>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Judul Pengumuman</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Tanggal</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Pembuat</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Target</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Status</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: COLORS.secondary }}>Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium" style={{ color: COLORS.primary }}>{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 flex items-center gap-1"><Calendar size={14} className="text-gray-400" /> {item.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.author}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.target}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'Aktif' ? 'bg-green-100 text-green-700' : item.status === 'Terjadwal' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 rounded bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"><Edit size={16} /></button>
                      <button className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
