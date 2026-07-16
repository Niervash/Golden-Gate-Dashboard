import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Users,
  GraduationCap,
  UserCheck,
  X,
  User,
  MapPin,
  Phone,
  Briefcase,
  ChevronDown
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  accentLight: "#af9151",
  white: "#ffffff",
  goldTransparent: "rgba(217, 171, 63, 0.1)",
  goldTransparent20: "rgba(217, 171, 63, 0.2)",
  blueTransparent10: "rgba(35, 48, 93, 0.1)",
  blueTransparent20: "rgba(35, 48, 93, 0.2)",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
};

interface Student {
  id: string;
  nis: string;
  nisn: string;
  namaLengkap: string;
  kelas: string;
  jurusan: string;
  jenisKelamin: "L" | "P";
  status: "Aktif" | "Alumni" | "Pindah" | "Cuti";
  tanggalLahir: string;
  tempatLahir: string;
  alamat: string;
  noTelp: string;
  email: string;
  namaWali: string;
  pekerjaanWali: string;
  noTelpWali: string;
}

const MOCK_STUDENTS: Student[] = [
  {
    id: "1",
    nis: "2023001",
    nisn: "0051234567",
    namaLengkap: "Ahmad Rizki Pratama",
    kelas: "X-1",
    jurusan: "IPA",
    jenisKelamin: "L",
    status: "Aktif",
    tanggalLahir: "2008-05-15",
    tempatLahir: "Jakarta",
    alamat: "Jl. Merdeka No. 123, Jakarta Pusat",
    noTelp: "081234567890",
    email: "ahmad@example.com",
    namaWali: "Budi Santoso",
    pekerjaanWali: "PNS",
    noTelpWali: "081234567899"
  },
  {
    id: "2",
    nis: "2023002",
    nisn: "0051234568",
    namaLengkap: "Siti Nurhaliza",
    kelas: "X-2",
    jurusan: "IPS",
    jenisKelamin: "P",
    status: "Aktif",
    tanggalLahir: "2008-08-20",
    tempatLahir: "Bandung",
    alamat: "Jl. Asia Afrika No. 45, Bandung",
    noTelp: "081234567891",
    email: "siti@example.com",
    namaWali: "Joko Widodo",
    pekerjaanWali: "Pengusaha",
    noTelpWali: "081234567898"
  },
  {
    id: "3",
    nis: "2022015",
    nisn: "0049876543",
    namaLengkap: "Budi Setiawan",
    kelas: "XI-1",
    jurusan: "IPA",
    jenisKelamin: "L",
    status: "Aktif",
    tanggalLahir: "2007-03-10",
    tempatLahir: "Surabaya",
    alamat: "Jl. Diponegoro No. 78, Surabaya",
    noTelp: "081234567892",
    email: "budi@example.com",
    namaWali: "Agus Suparman",
    pekerjaanWali: "Insinyur",
    noTelpWali: "081234567897"
  },
  {
    id: "4",
    nis: "2021042",
    nisn: "0031122334",
    namaLengkap: "Dewi Anggraeni",
    kelas: "XII-3",
    jurusan: "IPS",
    jenisKelamin: "P",
    status: "Aktif",
    tanggalLahir: "2006-11-25",
    tempatLahir: "Yogyakarta",
    alamat: "Jl. Malioboro No. 12, Yogyakarta",
    noTelp: "081234567893",
    email: "dewi@example.com",
    namaWali: "Rudi Hartono",
    pekerjaanWali: "Wiraswasta",
    noTelpWali: "081234567896"
  },
  {
    id: "5",
    nis: "2020089",
    nisn: "0029988776",
    namaLengkap: "Rizki Fadilah",
    kelas: "Alumni",
    jurusan: "IPA",
    jenisKelamin: "L",
    status: "Alumni",
    tanggalLahir: "2005-07-30",
    tempatLahir: "Semarang",
    alamat: "Jl. Pemuda No. 56, Semarang",
    noTelp: "081234567894",
    email: "rizki.f@example.com",
    namaWali: "Hendra Gunawan",
    pekerjaanWali: "Dosen",
    noTelpWali: "081234567895"
  }
];

export const StudentManagementDashboard = () => {
  const [students] = useState<Student[]>(MOCK_STUDENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKelas, setFilterKelas] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: students.length,
      aktif: students.filter(s => s.status === "Aktif").length,
      alumni: students.filter(s => s.status === "Alumni").length,
      laki: students.filter(s => s.jenisKelamin === "L").length,
      perempuan: students.filter(s => s.jenisKelamin === "P").length,
    };
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchSearch = s.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.nis.includes(searchTerm) || 
                          s.nisn.includes(searchTerm);
      const matchKelas = filterKelas === "Semua" || s.kelas === filterKelas;
      const matchStatus = filterStatus === "Semua" || s.status === filterStatus;
      
      return matchSearch && matchKelas && matchStatus;
    });
  }, [students, searchTerm, filterKelas, filterStatus]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Aktif":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">Aktif</span>;
      case "Alumni":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">Alumni</span>;
      case "Pindah":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">Pindah</span>;
      case "Cuti":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">Cuti</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd MMMM yyyy", { locale: id });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>Manajemen Siswa</h1>
          <p className="text-sm" style={{ color: COLORS.secondary }}>Kelola data, status, dan informasi profil siswa.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium" style={{ borderColor: COLORS.grayMedium, color: COLORS.primary }}>
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors shadow-sm text-sm font-medium" style={{ backgroundColor: COLORS.primary }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a2344'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.primary}>
            <Plus size={16} /> Tambah Siswa
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4" style={{ borderColor: COLORS.grayMedium }}>
          <div className="p-3 rounded-lg" style={{ backgroundColor: COLORS.blueTransparent10 }}>
            <Users className="w-6 h-6" style={{ color: COLORS.primary }} />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: COLORS.secondary }}>Total Siswa</p>
            <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>{stats.total}</h3>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4" style={{ borderColor: COLORS.grayMedium }}>
          <div className="p-3 rounded-lg bg-green-50">
            <UserCheck className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: COLORS.secondary }}>Siswa Aktif</p>
            <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>{stats.aktif}</h3>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4" style={{ borderColor: COLORS.grayMedium }}>
          <div className="p-3 rounded-lg bg-blue-50">
            <GraduationCap className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: COLORS.secondary }}>Alumni</p>
            <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>{stats.alumni}</h3>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4" style={{ borderColor: COLORS.grayMedium }}>
          <div className="p-3 rounded-lg" style={{ backgroundColor: COLORS.goldTransparent }}>
            <User className="w-6 h-6" style={{ color: COLORS.accent }} />
          </div>
          <div className="flex-1 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium" style={{ color: COLORS.secondary }}>Gender</p>
              <h3 className="text-xl font-bold" style={{ color: COLORS.primary }}>{stats.laki} <span className="text-sm font-normal text-gray-500">L</span> / {stats.perempuan} <span className="text-sm font-normal text-gray-500">P</span></h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl p-4 border shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center" style={{ borderColor: COLORS.grayMedium }}>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari nama, NIS, atau NISN..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/50 transition-shadow"
            style={{ borderColor: COLORS.grayMedium }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-40">
            <select 
              className="w-full appearance-none pl-4 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/50 bg-white"
              style={{ borderColor: COLORS.grayMedium, color: COLORS.secondary }}
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
            >
              <option value="Semua">Semua Kelas</option>
              <option value="X-1">X-1</option>
              <option value="X-2">X-2</option>
              <option value="XI-1">XI-1</option>
              <option value="XII-3">XII-3</option>
              <option value="Alumni">Alumni</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative w-full md:w-40">
            <select 
              className="w-full appearance-none pl-4 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/50 bg-white"
              style={{ borderColor: COLORS.grayMedium, color: COLORS.secondary }}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Semua">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Alumni">Alumni</option>
              <option value="Pindah">Pindah</option>
              <option value="Cuti">Cuti</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: COLORS.grayMedium }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ backgroundColor: COLORS.grayLight, borderBottom: `1px solid ${COLORS.grayMedium}` }}>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Siswa</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>NIS / NISN</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Kelas/Jurusan</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>L/P</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.secondary }}>Status</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: COLORS.secondary }}>Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <motion.tr 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                    key={student.id} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: COLORS.blueTransparent10, color: COLORS.primary }}>
                          {student.namaLengkap.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{student.namaLengkap}</p>
                          <p className="text-xs text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900 font-medium">{student.nis}</p>
                      <p className="text-xs text-gray-500">{student.nisn}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900 font-medium">{student.kelas}</p>
                      <p className="text-xs text-gray-500">{student.jurusan}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{student.jenisKelamin}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(student.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => { setSelectedStudent(student); setIsModalOpen(true); }}
                          className="p-1.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                          title="Lihat Detail"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="p-1.5 rounded bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Users size={48} className="mb-4 opacity-20" />
                      <p className="text-base font-medium text-gray-600">Tidak ada data siswa</p>
                      <p className="text-sm">Pencarian tidak menemukan hasil apapun.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: COLORS.grayMedium, backgroundColor: COLORS.grayLight }}>
          <span className="text-sm text-gray-500">Menampilkan {filteredStudents.length} dari {students.length} siswa</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded border bg-white text-gray-500 disabled:opacity-50" disabled>Sebelumnnya</button>
            <button className="px-3 py-1 rounded border text-white" style={{ backgroundColor: COLORS.primary, borderColor: COLORS.primary }}>1</button>
            <button className="px-3 py-1 rounded border bg-white text-gray-500 disabled:opacity-50" disabled>Selanjutnya</button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedStudent && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                
                {/* Modal Header */}
                <div className="relative p-6 text-white" style={{ backgroundColor: COLORS.primary }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold bg-white/20 border-2 border-white/30">
                        {selectedStudent.namaLengkap.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{selectedStudent.namaLengkap}</h2>
                        <p className="text-sm opacity-90">{selectedStudent.nis} • {selectedStudent.kelas} ({selectedStudent.jurusan})</p>
                      </div>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>Detail Informasi Siswa</h3>
                    {getStatusBadge(selectedStudent.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-2" style={{ color: COLORS.accentLight }}>
                          <User size={14} /> Data Pribadi
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-500">NISN</p>
                            <p className="text-sm font-medium text-gray-900">{selectedStudent.nisn}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Jenis Kelamin</p>
                            <p className="text-sm font-medium text-gray-900">{selectedStudent.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Tempat, Tanggal Lahir</p>
                            <p className="text-sm font-medium text-gray-900 flex items-center gap-1"><MapPin size={12} className="text-gray-400"/> {selectedStudent.tempatLahir}, {formatDate(selectedStudent.tanggalLahir)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Alamat Lengkap</p>
                            <p className="text-sm font-medium text-gray-900 leading-snug">{selectedStudent.alamat}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-2" style={{ color: COLORS.accentLight }}>
                          <Phone size={14} /> Kontak
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-500">Nomor Telepon</p>
                            <p className="text-sm font-medium text-gray-900">{selectedStudent.noTelp}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="text-sm font-medium text-gray-900">{selectedStudent.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <h4 className="text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-2" style={{ color: COLORS.accentLight }}>
                          <Users size={14} /> Data Orang Tua/Wali
                        </h4>
                        <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                          <div>
                            <p className="text-xs text-gray-500">Nama Wali</p>
                            <p className="text-sm font-medium text-gray-900">{selectedStudent.namaWali}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Pekerjaan</p>
                            <p className="text-sm font-medium text-gray-900 flex items-center gap-1"><Briefcase size={12} className="text-gray-400"/> {selectedStudent.pekerjaanWali}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">No. Telepon Wali</p>
                            <p className="text-sm font-medium text-gray-900">{selectedStudent.noTelpWali}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Modal Footer */}
                <div className="p-4 bg-gray-50 border-t flex justify-end gap-3">
                  <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 transition-colors text-sm font-medium">Tutup</button>
                  <button className="px-4 py-2 rounded-lg text-white transition-colors text-sm font-medium flex items-center gap-2 shadow-sm hover:opacity-90" style={{ backgroundColor: COLORS.accent }}>
                    <Edit size={16} /> Edit Data
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
