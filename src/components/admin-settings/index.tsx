import React, { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Shield, Database, Upload, Save, Building, Users } from "lucide-react";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
};

export const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("profil");

  const tabs = [
    { id: "profil", label: "Profil Sekolah", icon: <Building size={18} /> },
    { id: "akses", label: "Hak Akses", icon: <Shield size={18} /> },
    { id: "pengguna", label: "Manajemen Pengguna", icon: <Users size={18} /> },
    { id: "backup", label: "Database", icon: <Database size={18} /> },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Pengaturan Sistem</h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>Konfigurasi umum, profil sekolah, dan manajemen database.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors shadow-sm text-sm font-medium hover:opacity-90" style={{ backgroundColor: COLORS.primary }}>
          <Save size={16} /> Simpan Perubahan
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 bg-white rounded-xl border shadow-sm p-2 h-fit" style={{ borderColor: COLORS.grayMedium }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors mb-1 ${
                activeTab === tab.id 
                  ? "bg-gray-50 text-[#23305d] shadow-sm border border-gray-100" 
                  : "text-gray-600 hover:bg-gray-50"
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
          {activeTab === "profil" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl border shadow-sm p-6" style={{ borderColor: COLORS.grayMedium }}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: COLORS.primary }}>
                <Settings className="text-[#d9ab3f]" size={20} /> Informasi Dasar Sekolah
              </h2>
              
              <div className="space-y-5">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <Upload className="text-gray-400 w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Logo Sekolah</h3>
                    <p className="text-xs text-gray-500 mb-3">Format JPG, PNG atau SVG. Maksimal 2MB.</p>
                    <button className="px-3 py-1.5 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50">Upload Logo</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
                    <input type="text" className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-[#23305d] focus:border-[#23305d]" defaultValue="Golden Gate School" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">NPSN</label>
                    <input type="text" className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-[#23305d] focus:border-[#23305d]" defaultValue="20212345" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                    <textarea className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-[#23305d] focus:border-[#23305d]" rows={3} defaultValue="Jl. Pendidikan No. 123, Kota Cerdas, Provinsi Maju"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Sekolah</label>
                    <input type="email" className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-[#23305d] focus:border-[#23305d]" defaultValue="info@goldengateschool.sch.id" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                    <input type="text" className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-[#23305d] focus:border-[#23305d]" defaultValue="(021) 88899977" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab !== "profil" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl border shadow-sm p-10 text-center" style={{ borderColor: COLORS.grayMedium }}>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="text-gray-400 w-8 h-8" />
              </div>
              <h2 className="text-lg font-bold mb-2" style={{ color: COLORS.primary }}>Modul Sedang Dikembangkan</h2>
              <p className="text-gray-500 max-w-md mx-auto">Fitur pengaturan untuk tab ini sedang dalam tahap pengembangan dan akan segera tersedia pada pembaruan berikutnya.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
