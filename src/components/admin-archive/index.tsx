import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, FolderOpen, FileText, Download, Edit, Trash2 } from "lucide-react";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
};

const MOCK_DATA = [
  { id: "1", name: "Surat Keputusan Kepala Sekolah 2023", category: "Surat Keluar", date: "12 Okt 2023", size: "2.4 MB", type: "PDF" },
  { id: "2", name: "Ijazah Kelulusan Angkatan 2022", category: "Ijazah", date: "15 Jul 2023", size: "15 MB", type: "ZIP" },
  { id: "3", name: "Undangan Rapat Dinas Pendidikan", category: "Surat Masuk", date: "02 Nov 2023", size: "1.1 MB", type: "PDF" },
];

export const AdminArchive = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = MOCK_DATA.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Arsip Dokumen</h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>Manajemen file surat, ijazah, dan dokumen legal.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors shadow-sm text-sm font-medium hover:opacity-90" style={{ backgroundColor: COLORS.primary }}>
          <Plus size={16} /> Unggah Dokumen
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['Surat Masuk', 'Surat Keluar', 'Ijazah', 'Dokumen Legal'].map((cat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4 cursor-pointer hover:border-[#d9ab3f] transition-colors" style={{ borderColor: COLORS.grayMedium }}>
            <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
              <FolderOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold" style={{ color: COLORS.primary }}>{cat}</p>
              <p className="text-xs text-gray-500">12 Files</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-4 border shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center" style={{ borderColor: COLORS.grayMedium }}>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari nama dokumen..." 
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
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Nama Dokumen</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Kategori</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Tanggal Unggah</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Ukuran</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: COLORS.secondary }}>Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="text-gray-400 w-5 h-5" />
                      <div>
                        <p className="font-medium" style={{ color: COLORS.primary }}>{item.name}</p>
                        <p className="text-xs text-gray-500">{item.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">{item.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.size}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" title="Unduh"><Download size={16} /></button>
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
