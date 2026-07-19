import React, { useState } from "react";
import { AdminLayout } from "../../../layouts";
import {
  QrCode,
  Download,
  Printer,
  Users,
  Search,
  Plus,
  Sparkles,
  CreditCard,
  UserCheck,
  ChevronDown
} from "lucide-react";
import confetti from "canvas-confetti";

interface Student {
  nis: string;
  name: string;
  class: string;
  photoUrl: string;
}

const MOCK_STUDENTS: Student[] = [
  { nis: "2023001", name: "Ahmad Rizki Pratama", class: "X-1", photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop" },
  { nis: "2023002", name: "Siti Nurhaliza", class: "X-1", photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { nis: "2022015", name: "Budi Setiawan", class: "X-1", photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { nis: "2021042", name: "Dewi Anggraeni", class: "X-2", photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
  { nis: "2020089", name: "Rizki Fadilah", class: "X-2", photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
];

const StudentCardsGeneratorPage: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student>(MOCK_STUDENTS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [customNis, setCustomNis] = useState("");
  const [customName, setCustomName] = useState("");
  const [customClass, setCustomClass] = useState("X-1");
  const [activeTab, setActiveTab] = useState<"database" | "manual">("database");

  const filteredStudents = MOCK_STUDENTS.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nis.includes(searchQuery)
  );

  const handlePrint = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#d9ab3f", "#ffffff", "#23305d"]
    });
    window.print();
  };

  const handleAddCustomStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNis || !customName) return;

    const newStudent: Student = {
      nis: customNis,
      name: customName,
      class: customClass,
      photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
    };

    setSelectedStudent(newStudent);
    confetti({
      particleCount: 50,
      spread: 40,
      colors: ["#d9ab3f", "#10b981"]
    });
  };

  // Generate QR url using public qrserver API
  const getQrUrl = (data: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(data)}&color=23305d`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12 text-white">
        {/* Header */}
        <div
          className="p-6 rounded-2xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          style={{
            background: "linear-gradient(135deg, #23305d 0%, #151e3d 100%)",
            borderColor: "rgba(217, 171, 63, 0.3)",
            color: "#ffffff",
          }}
        >
          <div className="space-y-1">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
              style={{ backgroundColor: "#d9ab3f", color: "#23305d" }}
            >
              Lainnya • Pembuat Kartu & QR
            </span>
            <h1 className="text-xl sm:text-2xl font-bold mt-2 text-white">
              Cetak QR Code Absensi Siswa
            </h1>
            <p className="text-sm" style={{ color: "#af9151" }}>
              Generate QR Code absensi secara instan untuk di-scan oleh kamera absensi.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Student Selection or input */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tabs */}
            <div className="bg-[#1a2347]/60 border border-[#43424e] p-1.5 rounded-2xl flex gap-1">
              <button
                onClick={() => setActiveTab("database")}
                className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all ${
                  activeTab === "database"
                    ? "bg-[#d9ab3f] text-[#23305d]"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                Dari Database Siswa
              </button>
              <button
                onClick={() => setActiveTab("manual")}
                className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all ${
                  activeTab === "manual"
                    ? "bg-[#d9ab3f] text-[#23305d]"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                Input Manual / Kustom
              </button>
            </div>

            {activeTab === "database" ? (
              <div className="bg-[#1a2347]/60 backdrop-blur-xl rounded-3xl border border-[#43424e] p-5 space-y-4">
                <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Users size={16} className="text-[#d9ab3f]" />
                  Pilih Siswa
                </h3>

                {/* Search */}
                <div className="bg-[#1d2950] border border-[#43424e] rounded-xl px-3 py-2 flex items-center gap-2">
                  <Search size={16} className="text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari nama atau NIS..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none text-xs text-white placeholder-slate-400/50 focus:outline-none w-full"
                  />
                </div>

                {/* Student list */}
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {filteredStudents.map((st) => (
                    <button
                      key={st.nis}
                      type="button"
                      onClick={() => setSelectedStudent(st)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        selectedStudent.nis === st.nis
                          ? "bg-[#d9ab3f]/20 border-[#d9ab3f] text-[#d9ab3f]"
                          : "bg-[#1d2950]/50 border-[#43424e] text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-xs sm:text-sm truncate">{st.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">NIS: {st.nis} • Kelas: {st.class}</p>
                      </div>
                      <ChevronDown size={14} className="rotate-270 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-[#1a2347]/60 backdrop-blur-xl rounded-3xl border border-[#43424e] p-6">
                <form onSubmit={handleAddCustomStudent} className="space-y-4">
                  <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider flex items-center gap-2 mb-2">
                    <UserCheck size={16} className="text-[#d9ab3f]" />
                    Data Siswa Kustom
                  </h3>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300">
                      Nama Lengkap Siswa
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1d2950] text-white border border-[#43424e] rounded-xl focus:border-[#d9ab3f] focus:outline-none text-xs placeholder:text-slate-400/40"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300">
                        NIS (Nomor Induk)
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: 2023010"
                        value={customNis}
                        onChange={(e) => setCustomNis(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1d2950] text-white border border-[#43424e] rounded-xl focus:border-[#d9ab3f] focus:outline-none text-xs placeholder:text-slate-400/40"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300">
                        Kelas
                      </label>
                      <select
                        value={customClass}
                        onChange={(e) => setCustomClass(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1d2950] text-white border border-[#43424e] rounded-xl focus:border-[#d9ab3f] focus:outline-none text-xs text-white"
                      >
                        <option value="X-1" className="bg-[#1a2347]">X-1 (IPA)</option>
                        <option value="X-2" className="bg-[#1a2347]">X-2 (IPS)</option>
                        <option value="XI-1" className="bg-[#1a2347]">XI-1 (IPA)</option>
                        <option value="XII-1" className="bg-[#1a2347]">XII-1 (IPA)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#d9ab3f] text-[#23305d] font-bold rounded-xl text-xs transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    Buat Preview Kartu
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Physical Student Card Preview & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Card Preview Container */}
            <div className="bg-[#1a2347]/60 backdrop-blur-xl rounded-3xl border border-[#43424e] p-6 sm:p-8 flex flex-col items-center justify-center">
              
              <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider self-start mb-6 flex items-center gap-2">
                <QrCode size={16} className="text-[#d9ab3f]" />
                Pratinjau QR Code Siswa
              </h3>

              {/* QR Code Layout */}
              <div 
                id="printable-student-card"
                className="w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-2xl relative border-2 border-[#d9ab3f]/40 flex flex-col justify-between items-center p-6 text-white"
                style={{
                  background: "linear-gradient(135deg, #23305d 0%, #151e3d 100%)",
                }}
              >
                {/* Gold corner ornaments */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#d9ab3f]/5 rounded-bl-full pointer-events-none" />

                {/* Header */}
                <div className="text-center w-full pb-3 border-b border-[#d9ab3f]/20">
                  <h2 className="text-xs font-bold tracking-wider leading-none text-white">GOLDEN GATE SCHOOL</h2>
                  <p className="text-[8px] text-[#af9151] mt-1 font-semibold tracking-widest uppercase">Absensi QR Code Siswa</p>
                </div>

                {/* Generated QR Code */}
                <div className="my-6 w-44 h-44 bg-white p-3 rounded-2xl border-2 border-[#d9ab3f]/30 flex items-center justify-center shadow-lg">
                  <img 
                    src={getQrUrl(selectedStudent.nis)} 
                    alt="Student QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Student Details */}
                <div className="text-center space-y-1 w-full bg-black/10 p-3 rounded-xl border border-white/5">
                  <p className="text-[9px] text-[#af9151] uppercase font-bold tracking-wider leading-none">Nama Siswa</p>
                  <p className="text-sm font-bold text-white leading-tight">{selectedStudent.name}</p>
                  <p className="text-xs font-mono font-medium text-slate-300 mt-1">NIS: {selectedStudent.nis} • Kelas: {selectedStudent.class}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full max-w-sm grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={handlePrint}
                  className="py-3 bg-[#d9ab3f] text-[#23305d] font-bold rounded-xl text-xs transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  <Printer size={16} />
                  Cetak QR Code
                </button>
                <button
                  onClick={() => alert(`Mengunduh berkas gambar QR_${selectedStudent.name}.png...`)}
                  className="py-3 bg-[#1d2950] border border-[#43424e] text-white font-semibold rounded-xl text-xs transition-all hover:bg-white/5 flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Simpan QR (PNG)
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Print Page CSS overrides */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-student-card, #printable-student-card * {
            visibility: visible;
          }
          #printable-student-card {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(1.5);
            border: 2px solid #d9ab3f !important;
            box-shadow: none !important;
            background: linear-gradient(135deg, #23305d 0%, #151e3d 100%) !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </AdminLayout>
  );
};

export default StudentCardsGeneratorPage;
