import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, MapPin, User, ChevronDown, Plus, Printer, Filter } from "lucide-react";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  grayMedium: "#e9ecef",
  grayLight: "#f8f9fa",
  blueTransparent10: "rgba(35, 48, 93, 0.1)"
};

const MOCK_SCHEDULE = [
  { id: 1, hari: "Senin", jam: "07:00 - 07:45", mapel: "Upacara Bendera", guru: "Semua Guru", ruang: "Lapangan" },
  { id: 2, hari: "Senin", jam: "07:45 - 09:15", mapel: "Matematika", guru: "Budi Santoso, S.Pd", ruang: "Ruang X-1" },
  { id: 3, hari: "Senin", jam: "09:15 - 09:45", mapel: "Istirahat", guru: "-", ruang: "-" },
  { id: 4, hari: "Senin", jam: "09:45 - 11:15", mapel: "Bahasa Inggris", guru: "Nur Aini, S.Pd", ruang: "Ruang X-1" },
  { id: 5, hari: "Senin", jam: "11:15 - 12:45", mapel: "Fisika", guru: "Budi Santoso, S.Pd", ruang: "Lab Fisika" },
];

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

export const ScheduleManagementDashboard = () => {
  const [selectedKelas, setSelectedKelas] = useState("X-1");
  const [selectedDay, setSelectedDay] = useState("Senin");

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Jadwal Pelajaran</h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>Kelola dan pantau jadwal pelajaran untuk setiap kelas.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium" style={{ borderColor: COLORS.grayMedium, color: COLORS.primary }}>
            <Printer size={16} /> Cetak Jadwal
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors shadow-sm text-sm font-medium" style={{ backgroundColor: COLORS.accent }}>
            <Plus size={16} /> Buat Jadwal Baru
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center" style={{ borderColor: COLORS.grayMedium }}>
        <div className="flex gap-3 w-full md:w-auto items-center">
          <span className="text-sm font-medium" style={{ color: COLORS.secondary }}>Pilih Kelas:</span>
          <div className="relative w-full md:w-48">
            <select 
              className="w-full appearance-none pl-4 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/50 bg-white"
              style={{ borderColor: COLORS.grayMedium, color: COLORS.primary, fontWeight: 600 }}
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
            >
              <option value="X-1">X-1 (IPA)</option>
              <option value="X-2">X-2 (IPS)</option>
              <option value="XI-1">XI-1 (IPA)</option>
              <option value="XII-3">XII-3 (IPS)</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {DAYS.map(day => (
            <button 
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap border ${selectedDay === day ? 'text-white' : 'bg-white hover:bg-gray-50'}`}
              style={{ 
                backgroundColor: selectedDay === day ? COLORS.primary : COLORS.white,
                borderColor: selectedDay === day ? COLORS.primary : COLORS.grayMedium,
                color: selectedDay === day ? COLORS.white : COLORS.secondary
              }}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: COLORS.grayMedium }}>
        <div className="p-4 border-b flex justify-between items-center" style={{ borderColor: COLORS.grayMedium, backgroundColor: COLORS.blueTransparent10 }}>
          <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: COLORS.primary }}>
            <CalendarIcon size={18} /> Jadwal Kelas {selectedKelas} - Hari {selectedDay}
          </h2>
          <button className="text-sm font-medium flex items-center gap-2" style={{ color: COLORS.accent }}>
            <Filter size={16} /> Filter Lanjutan
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ backgroundColor: COLORS.grayLight, borderBottom: `1px solid ${COLORS.grayMedium}` }}>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Waktu</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Mata Pelajaran</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Guru Pengajar</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Ruangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_SCHEDULE.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 font-medium" style={{ color: COLORS.primary }}>
                      <Clock size={16} className="text-gray-400" />
                      {item.jam}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-semibold ${item.mapel === 'Istirahat' ? 'text-orange-500' : 'text-gray-900'}`}>
                      {item.mapel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.guru !== "-" ? (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <User size={14} className="text-gray-400" /> {item.guru}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.ruang !== "-" ? (
                       <div className="flex items-center gap-2 text-sm">
                         <MapPin size={14} className="text-gray-400" /> 
                         <span className="px-2 py-1 bg-gray-100 rounded text-gray-700 font-medium">{item.ruang}</span>
                       </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
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
