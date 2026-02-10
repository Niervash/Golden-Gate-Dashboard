import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Download,
  Printer,
  Mail,
  Phone,
  User,
  Calendar,
  BookOpen,
  FileText,
  Clock,
  Users,
  GraduationCap,
  Home,
  MapPin,
  Shield,
  Award,
  Bell,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  FileCheck,
  UserCheck,
  FileWarning,
  AlertCircle,
  TrendingUp,
  BarChart3,
  FileSpreadsheet,
  Share2,
  Copy,
  ExternalLink,
  Menu,
  X,
  Info,
  Star,
  Percent,
  CheckSquare,
  XSquare,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

// Warna Palette Baru
const COLORS = {
  primary: "#23305d", // Biru tua
  secondary: "#43424e", // Abu-abu kebiruan
  accent: "#d9ab3f", // Emas
  accentLight: "#af9151", // Emas muda / kuning kecoklatan
  white: "#ffffff",
  goldTransparent: "rgba(217, 171, 63, 0.1)",
  goldTransparent20: "rgba(217, 171, 63, 0.2)",
  blueTransparent10: "rgba(35, 48, 93, 0.1)",
  blueTransparent20: "rgba(35, 48, 93, 0.2)",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
};

// Interface untuk data pendaftar
interface Pendaftar {
  id: string;
  nomorPendaftaran: string;
  namaLengkap: string;
  nisn: string;
  jenisKelamin: "L" | "P";
  tempatLahir: string;
  tanggalLahir: string;
  asalSekolah: string;
  jurusanDaftar: "IPA" | "IPS";
  nilaiRataRata: number;
  status: "menunggu" | "diverifikasi" | "ditolak" | "diterima";
  tanggalDaftar: string;
  nomorTelepon: string;
  email: string;
  alamat: string;
  namaAyah: string;
  namaIbu: string;
  pekerjaanAyah: string;
  pekerjaanIbu: string;
  dokumenLengkap: boolean;
  catatan: string;
  tahapSeleksi: {
    administrasi: boolean;
    tesTulis: number | null;
    wawancara: number | null;
    nilaiAkhir: number | null;
  };
}

// Mock data pendaftar (sama seperti sebelumnya)
const mockPendaftar: Pendaftar[] = [
  {
    id: "1",
    nomorPendaftaran: "PPDB-2025-001",
    namaLengkap: "Ahmad Rizki Pratama",
    nisn: "1234567890",
    jenisKelamin: "L",
    tempatLahir: "Jakarta",
    tanggalLahir: "2008-05-15",
    asalSekolah: "SMP Negeri 1 Jakarta",
    jurusanDaftar: "IPA",
    nilaiRataRata: 85.5,
    status: "diverifikasi",
    tanggalDaftar: "2025-01-10",
    nomorTelepon: "081234567890",
    email: "ahmad@example.com",
    alamat: "Jl. Merdeka No. 123, Jakarta Pusat",
    namaAyah: "Budi Santoso",
    namaIbu: "Siti Aminah",
    pekerjaanAyah: "PNS",
    pekerjaanIbu: "Guru",
    dokumenLengkap: true,
    catatan: "Dokumen lengkap dan valid",
    tahapSeleksi: {
      administrasi: true,
      tesTulis: 85,
      wawancara: 90,
      nilaiAkhir: 87.5,
    },
  },
  {
    id: "2",
    nomorPendaftaran: "PPDB-2025-002",
    namaLengkap: "Siti Nurhaliza",
    nisn: "1234567891",
    jenisKelamin: "P",
    tempatLahir: "Bandung",
    tanggalLahir: "2008-08-20",
    asalSekolah: "SMP Negeri 2 Bandung",
    jurusanDaftar: "IPS",
    nilaiRataRata: 82.3,
    status: "menunggu",
    tanggalDaftar: "2025-01-12",
    nomorTelepon: "081234567891",
    email: "siti@example.com",
    alamat: "Jl. Asia Afrika No. 45, Bandung",
    namaAyah: "Joko Widodo",
    namaIbu: "Sri Mulyani",
    pekerjaanAyah: "Pengusaha",
    pekerjaanIbu: "Dokter",
    dokumenLengkap: false,
    catatan: "Menunggu upload KK",
    tahapSeleksi: {
      administrasi: false,
      tesTulis: null,
      wawancara: null,
      nilaiAkhir: null,
    },
  },
  {
    id: "3",
    nomorPendaftaran: "PPDB-2025-003",
    namaLengkap: "Budi Setiawan",
    nisn: "1234567892",
    jenisKelamin: "L",
    tempatLahir: "Surabaya",
    tanggalLahir: "2008-03-10",
    asalSekolah: "SMP Negeri 3 Surabaya",
    jurusanDaftar: "IPA",
    nilaiRataRata: 88.7,
    status: "diterima",
    tanggalDaftar: "2025-01-08",
    nomorTelepon: "081234567892",
    email: "budi@example.com",
    alamat: "Jl. Diponegoro No. 78, Surabaya",
    namaAyah: "Agus Suparman",
    namaIbu: "Dewi Sartika",
    pekerjaanAyah: "Insinyur",
    pekerjaanIbu: "Akuntan",
    dokumenLengkap: true,
    catatan: "Peringkat 1 seleksi",
    tahapSeleksi: {
      administrasi: true,
      tesTulis: 92,
      wawancara: 95,
      nilaiAkhir: 93.5,
    },
  },
  {
    id: "4",
    nomorPendaftaran: "PPDB-2025-004",
    namaLengkap: "Dewi Anggraeni",
    nisn: "1234567893",
    jenisKelamin: "P",
    tempatLahir: "Yogyakarta",
    tanggalLahir: "2008-11-25",
    asalSekolah: "SMP Negeri 4 Yogyakarta",
    jurusanDaftar: "IPS",
    nilaiRataRata: 79.8,
    status: "ditolak",
    tanggalDaftar: "2025-01-15",
    nomorTelepon: "081234567893",
    email: "dewi@example.com",
    alamat: "Jl. Malioboro No. 12, Yogyakarta",
    namaAyah: "Rudi Hartono",
    namaIbu: "Maya Sari",
    pekerjaanAyah: "Wiraswasta",
    pekerjaanIbu: "Ibu Rumah Tangga",
    dokumenLengkap: true,
    catatan: "Nilai di bawah standar",
    tahapSeleksi: {
      administrasi: true,
      tesTulis: 65,
      wawancara: 70,
      nilaiAkhir: 67.5,
    },
  },
  {
    id: "5",
    nomorPendaftaran: "PPDB-2025-005",
    namaLengkap: "Rizki Fadilah",
    nisn: "1234567894",
    jenisKelamin: "L",
    tempatLahir: "Semarang",
    tanggalLahir: "2008-07-30",
    asalSekolah: "SMP Negeri 5 Semarang",
    jurusanDaftar: "IPA",
    nilaiRataRata: 86.2,
    status: "menunggu",
    tanggalDaftar: "2025-01-14",
    nomorTelepon: "081234567894",
    email: "rizki@example.com",
    alamat: "Jl. Pemuda No. 56, Semarang",
    namaAyah: "Hendra Gunawan",
    namaIbu: "Ratna Dewi",
    pekerjaanAyah: "Dosen",
    pekerjaanIbu: "Pengacara",
    dokumenLengkap: true,
    catatan: "Menunggu verifikasi berkas",
    tahapSeleksi: {
      administrasi: false,
      tesTulis: null,
      wawancara: null,
      nilaiAkhir: null,
    },
  },
];

const PPDBAdminDashboard = () => {
  const [pendaftar, setPendaftar] = useState<Pendaftar[]>(mockPendaftar);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("semua");
  const [filterJurusan, setFilterJurusan] = useState<string>("semua");
  const [sortBy, setSortBy] = useState<string>("tanggalDaftar");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedPendaftar, setSelectedPendaftar] = useState<Pendaftar | null>(
    null,
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"excel" | "csv">("excel");
  const [isExporting, setIsExporting] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    menunggu: 0,
    diverifikasi: 0,
    diterima: 0,
    ditolak: 0,
    dokumenLengkap: 0,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "seleksi" | "dokumen">(
    "info",
  );

  const modalRef = useRef<HTMLDivElement>(null);

  // Deteksi ukuran layar
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle klik di luar modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsDetailModalOpen(false);
      }
    };

    if (isDetailModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isDetailModalOpen]);

  // Hitung statistik
  useEffect(() => {
    const total = pendaftar.length;
    const menunggu = pendaftar.filter((p) => p.status === "menunggu").length;
    const diverifikasi = pendaftar.filter(
      (p) => p.status === "diverifikasi",
    ).length;
    const diterima = pendaftar.filter((p) => p.status === "diterima").length;
    const ditolak = pendaftar.filter((p) => p.status === "ditolak").length;
    const dokumenLengkap = pendaftar.filter((p) => p.dokumenLengkap).length;

    setStats({
      total,
      menunggu,
      diverifikasi,
      diterima,
      ditolak,
      dokumenLengkap,
    });
  }, [pendaftar]);

  // Filter dan sort data
  const filteredPendaftar = useMemo(() => {
    let filtered = [...pendaftar];

    // Filter berdasarkan pencarian
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.nomorPendaftaran.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.nisn.includes(searchTerm) ||
          p.asalSekolah.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter berdasarkan status
    if (filterStatus !== "semua") {
      filtered = filtered.filter((p) => p.status === filterStatus);
    }

    // Filter berdasarkan jurusan
    if (filterJurusan !== "semua") {
      filtered = filtered.filter((p) => p.jurusanDaftar === filterJurusan);
    }

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === "tanggalDaftar") {
        return sortOrder === "asc"
          ? new Date(a.tanggalDaftar).getTime() -
              new Date(b.tanggalDaftar).getTime()
          : new Date(b.tanggalDaftar).getTime() -
              new Date(a.tanggalDaftar).getTime();
      }
      if (sortBy === "namaLengkap") {
        return sortOrder === "asc"
          ? a.namaLengkap.localeCompare(b.namaLengkap)
          : b.namaLengkap.localeCompare(a.namaLengkap);
      }
      if (sortBy === "nilaiRataRata") {
        return sortOrder === "asc"
          ? a.nilaiRataRata - b.nilaiRataRata
          : b.nilaiRataRata - a.nilaiRataRata;
      }
      return 0;
    });

    return filtered;
  }, [pendaftar, searchTerm, filterStatus, filterJurusan, sortBy, sortOrder]);

  // Handler untuk perubahan status
  const handleStatusChange = (id: string, newStatus: Pendaftar["status"]) => {
    setPendaftar((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)),
    );
  };

  // Handler untuk menghapus pendaftar
  const handleDelete = (id: string) => {
    if (
      window.confirm("Apakah Anda yakin ingin menghapus data pendaftar ini?")
    ) {
      setPendaftar((prev) => prev.filter((p) => p.id !== id));
      setIsDetailModalOpen(false);
    }
  };

  // Handler untuk melihat detail
  const handleViewDetail = (pendaftar: Pendaftar) => {
    setSelectedPendaftar(pendaftar);
    setIsDetailModalOpen(true);
    setActiveTab("info");
  };

  // Fungsi untuk ekspor data
  const exportToExcel = () => {
    setIsExporting(true);
    // ... (kode export tetap sama)
    setIsExporting(false);
  };

  const exportToCSV = () => {
    setIsExporting(true);
    // ... (kode export tetap sama)
    setIsExporting(false);
  };

  const exportToJSON = () => {
    // ... (kode export tetap sama)
  };

  const handleExport = () => {
    if (exportFormat === "excel") {
      exportToExcel();
    } else {
      exportToCSV();
    }
  };

  // Format tanggal
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd/MM/yyyy", { locale: id });
    } catch {
      return dateString;
    }
  };

  // Status badge dengan palet warna baru
  const getStatusBadge = (status: Pendaftar["status"]) => {
    const config = {
      menunggu: {
        color: COLORS.accentLight,
        bg: COLORS.goldTransparent,
        icon: <Clock className="w-3 h-3 sm:w-4 sm:h-4" />,
        text: "Menunggu",
      },
      diverifikasi: {
        color: COLORS.primary,
        bg: COLORS.blueTransparent10,
        icon: <FileCheck className="w-3 h-3 sm:w-4 sm:h-4" />,
        text: "Diverifikasi",
      },
      diterima: {
        color: COLORS.accent,
        bg: COLORS.goldTransparent20,
        icon: <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />,
        text: "Diterima",
      },
      ditolak: {
        color: "#ef4444",
        bg: "#fee2e2",
        icon: <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />,
        text: "Ditolak",
      },
    };

    const { color, bg, icon, text } = config[status];
    return (
      <div className="flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: color }}
        />
        <span
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
          style={{ color, backgroundColor: bg }}
        >
          {icon}
          <span>{text}</span>
        </span>
      </div>
    );
  };

  // Detail Modal Component dengan palet warna baru
  const DetailModal = () => {
    if (!selectedPendaftar) return null;

    return (
      <AnimatePresence>
        {isDetailModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop dengan blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsDetailModalOpen(false)}
            />

            {/* Modal Container */}
            <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                style={{ border: `1px solid ${COLORS.secondary}20` }}
              >
                {/* Modal Header dengan warna primary */}
                <div
                  className="relative p-4 sm:p-6 text-white"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <User className="w-6 h-6 sm:w-8 sm:h-8" />
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold">
                          Detail Pendaftar
                        </h2>
                        <p className="text-sm opacity-90">
                          {selectedPendaftar.nomorPendaftaran}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsDetailModalOpen(false)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div
                  className="border-b"
                  style={{ backgroundColor: COLORS.grayLight }}
                >
                  <div className="flex overflow-x-auto">
                    <button
                      onClick={() => setActiveTab("info")}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === "info" ? "border-b-2 bg-white" : "text-gray-600 hover:text-gray-900"}`}
                      style={
                        activeTab === "info"
                          ? {
                              color: COLORS.primary,
                              borderBottomColor: COLORS.primary,
                            }
                          : {}
                      }
                    >
                      <div className="flex items-center justify-center gap-2">
                        <User className="w-4 h-4" />
                        <span>Informasi</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab("seleksi")}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === "seleksi" ? "border-b-2 bg-white" : "text-gray-600 hover:text-gray-900"}`}
                      style={
                        activeTab === "seleksi"
                          ? {
                              color: COLORS.primary,
                              borderBottomColor: COLORS.primary,
                            }
                          : {}
                      }
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Award className="w-4 h-4" />
                        <span>Seleksi</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab("dokumen")}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === "dokumen" ? "border-b-2 bg-white" : "text-gray-600 hover:text-gray-900"}`}
                      style={
                        activeTab === "dokumen"
                          ? {
                              color: COLORS.primary,
                              borderBottomColor: COLORS.primary,
                            }
                          : {}
                      }
                    >
                      <div className="flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>Dokumen</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Modal Content dengan scroll */}
                <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
                  {activeTab === "info" && (
                    <div className="space-y-6">
                      {/* Header Info */}
                      <div
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-xl"
                        style={{ backgroundColor: COLORS.blueTransparent10 }}
                      >
                        <div>
                          <h3
                            className="text-lg font-bold"
                            style={{ color: COLORS.primary }}
                          >
                            {selectedPendaftar.namaLengkap}
                          </h3>
                          <p
                            className="text-sm"
                            style={{ color: COLORS.secondary }}
                          >
                            {selectedPendaftar.asalSekolah}
                          </p>
                        </div>
                        {getStatusBadge(selectedPendaftar.status)}
                      </div>

                      {/* Grid Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Kolom Kiri */}
                        <div className="space-y-6">
                          {/* Data Pribadi */}
                          <div
                            className="bg-white rounded-xl border p-4 shadow-sm"
                            style={{ borderColor: COLORS.grayMedium }}
                          >
                            <h4
                              className="font-semibold mb-4 flex items-center gap-2"
                              style={{ color: COLORS.primary }}
                            >
                              <User
                                className="w-5 h-5"
                                style={{ color: COLORS.primary }}
                              />
                              Data Pribadi
                            </h4>
                            <div className="space-y-3">
                              {[
                                {
                                  label: "NISN",
                                  value: selectedPendaftar.nisn,
                                },
                                {
                                  label: "Jenis Kelamin",
                                  value:
                                    selectedPendaftar.jenisKelamin === "L"
                                      ? "Laki-laki"
                                      : "Perempuan",
                                },
                                {
                                  label: "TTL",
                                  value: `${selectedPendaftar.tempatLahir}, ${formatDate(selectedPendaftar.tanggalLahir)}`,
                                },
                                {
                                  label: "Alamat",
                                  value: selectedPendaftar.alamat,
                                },
                              ].map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                                >
                                  <span
                                    className="text-sm"
                                    style={{ color: COLORS.secondary }}
                                  >
                                    {item.label}
                                  </span>
                                  <span className="text-sm font-medium text-gray-900">
                                    {item.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Data Orang Tua */}
                          <div
                            className="bg-white rounded-xl border p-4 shadow-sm"
                            style={{ borderColor: COLORS.grayMedium }}
                          >
                            <h4
                              className="font-semibold mb-4 flex items-center gap-2"
                              style={{ color: COLORS.primary }}
                            >
                              <Users
                                className="w-5 h-5"
                                style={{ color: COLORS.primary }}
                              />
                              Data Orang Tua
                            </h4>
                            <div className="space-y-3">
                              {[
                                {
                                  label: "Nama Ayah",
                                  value: selectedPendaftar.namaAyah,
                                },
                                {
                                  label: "Pekerjaan Ayah",
                                  value: selectedPendaftar.pekerjaanAyah,
                                },
                                {
                                  label: "Nama Ibu",
                                  value: selectedPendaftar.namaIbu,
                                },
                                {
                                  label: "Pekerjaan Ibu",
                                  value: selectedPendaftar.pekerjaanIbu,
                                },
                              ].map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                                >
                                  <span
                                    className="text-sm"
                                    style={{ color: COLORS.secondary }}
                                  >
                                    {item.label}
                                  </span>
                                  <span className="text-sm font-medium text-gray-900">
                                    {item.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Kolom Kanan */}
                        <div className="space-y-6">
                          {/* Data Akademik */}
                          <div
                            className="bg-white rounded-xl border p-4 shadow-sm"
                            style={{ borderColor: COLORS.grayMedium }}
                          >
                            <h4
                              className="font-semibold mb-4 flex items-center gap-2"
                              style={{ color: COLORS.primary }}
                            >
                              <GraduationCap
                                className="w-5 h-5"
                                style={{ color: COLORS.primary }}
                              />
                              Data Akademik
                            </h4>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center py-2">
                                <span
                                  className="text-sm"
                                  style={{ color: COLORS.secondary }}
                                >
                                  Jurusan
                                </span>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${selectedPendaftar.jurusanDaftar === "IPA" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}
                                >
                                  {selectedPendaftar.jurusanDaftar}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2">
                                <span
                                  className="text-sm"
                                  style={{ color: COLORS.secondary }}
                                >
                                  Nilai Rata-rata
                                </span>
                                <div className="flex items-center gap-2">
                                  <div className="w-24 bg-gray-200 rounded-full h-2">
                                    <div
                                      className="h-2 rounded-full transition-all duration-500"
                                      style={{
                                        width: `${Math.min(selectedPendaftar.nilaiRataRata, 100)}%`,
                                        backgroundColor: COLORS.accent,
                                      }}
                                    />
                                  </div>
                                  <span className="text-sm font-bold text-gray-900">
                                    {selectedPendaftar.nilaiRataRata.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Kontak & Status */}
                          <div
                            className="bg-white rounded-xl border p-4 shadow-sm"
                            style={{ borderColor: COLORS.grayMedium }}
                          >
                            <h4
                              className="font-semibold mb-4 flex items-center gap-2"
                              style={{ color: COLORS.primary }}
                            >
                              <Bell
                                className="w-5 h-5"
                                style={{ color: COLORS.primary }}
                              />
                              Kontak & Status
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between py-2">
                                <span
                                  className="text-sm"
                                  style={{ color: COLORS.secondary }}
                                >
                                  Email
                                </span>
                                <a
                                  href={`mailto:${selectedPendaftar.email}`}
                                  className="text-sm font-medium hover:underline"
                                  style={{ color: COLORS.primary }}
                                >
                                  {selectedPendaftar.email}
                                </a>
                              </div>
                              <div className="flex items-center justify-between py-2">
                                <span
                                  className="text-sm"
                                  style={{ color: COLORS.secondary }}
                                >
                                  Telepon
                                </span>
                                <a
                                  href={`tel:${selectedPendaftar.nomorTelepon}`}
                                  className="text-sm font-medium text-gray-900"
                                >
                                  {selectedPendaftar.nomorTelepon}
                                </a>
                              </div>
                              <div className="flex items-center justify-between py-2">
                                <span
                                  className="text-sm"
                                  style={{ color: COLORS.secondary }}
                                >
                                  Tanggal Daftar
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                  {formatDate(selectedPendaftar.tanggalDaftar)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between py-2">
                                <span
                                  className="text-sm"
                                  style={{ color: COLORS.secondary }}
                                >
                                  Dokumen
                                </span>
                                <span
                                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${selectedPendaftar.dokumenLengkap ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                                >
                                  {selectedPendaftar.dokumenLengkap ? (
                                    <CheckSquare className="w-3 h-3" />
                                  ) : (
                                    <XSquare className="w-3 h-3" />
                                  )}
                                  {selectedPendaftar.dokumenLengkap
                                    ? "Lengkap"
                                    : "Belum Lengkap"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "seleksi" &&
                    selectedPendaftar.tahapSeleksi.administrasi && (
                      <div className="space-y-6">
                        <div
                          className="p-4 rounded-xl"
                          style={{ backgroundColor: COLORS.blueTransparent10 }}
                        >
                          <h3
                            className="text-lg font-bold mb-2"
                            style={{ color: COLORS.primary }}
                          >
                            Hasil Seleksi
                          </h3>
                          <p
                            className="text-sm"
                            style={{ color: COLORS.secondary }}
                          >
                            Nilai akhir dan peringkat pendaftar
                          </p>
                        </div>

                        {/* Score Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {[
                            {
                              label: "Tes Tulis",
                              value: selectedPendaftar.tahapSeleksi.tesTulis,
                              color: COLORS.primary,
                              icon: <FileText />,
                            },
                            {
                              label: "Wawancara",
                              value: selectedPendaftar.tahapSeleksi.wawancara,
                              color: COLORS.secondary,
                              icon: <UserCheck />,
                            },
                            {
                              label: "Nilai Akhir",
                              value: selectedPendaftar.tahapSeleksi.nilaiAkhir,
                              color: COLORS.accent,
                              icon: <Award />,
                            },
                            {
                              label: "Peringkat",
                              value: `#${Math.floor(Math.random() * 50) + 1}`,
                              color: COLORS.accentLight,
                              icon: <TrendingUp />,
                            },
                          ].map((item, idx) => (
                            <div
                              key={idx}
                              className="bg-white rounded-xl border p-5 text-center shadow-sm"
                              style={{ borderColor: COLORS.grayMedium }}
                            >
                              <div
                                className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
                                style={{ backgroundColor: `${item.color}20` }}
                              >
                                <div style={{ color: item.color }}>
                                  {item.icon}
                                </div>
                              </div>
                              <div
                                className="text-2xl font-bold mb-1"
                                style={{ color: item.color }}
                              >
                                {item.value || "-"}
                              </div>
                              <div
                                className="text-sm"
                                style={{ color: COLORS.secondary }}
                              >
                                {item.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Progress Bar */}
                        <div
                          className="bg-white rounded-xl border p-5 shadow-sm"
                          style={{ borderColor: COLORS.grayMedium }}
                        >
                          <h4
                            className="font-semibold mb-4"
                            style={{ color: COLORS.primary }}
                          >
                            Progress Seleksi
                          </h4>
                          <div className="space-y-4">
                            {[
                              {
                                label: "Administrasi",
                                value: selectedPendaftar.tahapSeleksi
                                  .administrasi
                                  ? 100
                                  : 0,
                                color: COLORS.primary,
                              },
                              {
                                label: "Tes Tulis",
                                value: selectedPendaftar.tahapSeleksi.tesTulis
                                  ? 100
                                  : 30,
                                color: COLORS.secondary,
                              },
                              {
                                label: "Wawancara",
                                value: selectedPendaftar.tahapSeleksi.wawancara
                                  ? 100
                                  : 20,
                                color: COLORS.accent,
                              },
                              {
                                label: "Nilai Akhir",
                                value: selectedPendaftar.tahapSeleksi.nilaiAkhir
                                  ? 100
                                  : 10,
                                color: COLORS.accentLight,
                              },
                            ].map((item, idx) => (
                              <div key={idx} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span style={{ color: COLORS.secondary }}>
                                    {item.label}
                                  </span>
                                  <span
                                    className="font-medium"
                                    style={{ color: item.color }}
                                  >
                                    {item.value}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="h-2 rounded-full transition-all duration-1000 ease-out"
                                    style={{
                                      width: `${item.value}%`,
                                      backgroundColor: item.color,
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                  {activeTab === "dokumen" && (
                    <div className="space-y-6">
                      <div
                        className="p-4 rounded-xl"
                        style={{ backgroundColor: COLORS.blueTransparent10 }}
                      >
                        <h3
                          className="text-lg font-bold mb-2"
                          style={{ color: COLORS.primary }}
                        >
                          Dokumen Pendaftaran
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: COLORS.secondary }}
                        >
                          Status kelengkapan berkas administrasi
                        </p>
                      </div>

                      {/* Dokumen List */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          {
                            name: "Formulir Pendaftaran",
                            status: "Lengkap",
                            date: "10/01/2025",
                          },
                          {
                            name: "Fotokopi Ijazah",
                            status: "Lengkap",
                            date: "10/01/2025",
                          },
                          {
                            name: "Fotokopi Kartu Keluarga",
                            status: selectedPendaftar.dokumenLengkap
                              ? "Lengkap"
                              : "Belum",
                            date: selectedPendaftar.dokumenLengkap
                              ? "10/01/2025"
                              : "-",
                          },
                          {
                            name: "Pas Foto 3x4",
                            status: "Lengkap",
                            date: "10/01/2025",
                          },
                          {
                            name: "Rapor SMP",
                            status: "Lengkap",
                            date: "10/01/2025",
                          },
                          {
                            name: "Surat Keterangan Sehat",
                            status: "Lengkap",
                            date: "10/01/2025",
                          },
                        ].map((doc, idx) => (
                          <div
                            key={idx}
                            className="bg-white rounded-xl border p-4 hover:shadow-md transition-shadow"
                            style={{ borderColor: COLORS.grayMedium }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900">
                                {doc.name}
                              </span>
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${doc.status === "Lengkap" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                              >
                                {doc.status}
                              </span>
                            </div>
                            <div
                              className="flex items-center text-sm"
                              style={{ color: COLORS.secondary }}
                            >
                              <Calendar className="w-3 h-3 mr-1" />
                              <span>Upload: {doc.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Catatan */}
                      {selectedPendaftar.catatan && (
                        <div
                          className="rounded-xl p-4"
                          style={{
                            backgroundColor: COLORS.goldTransparent,
                            border: `1px solid ${COLORS.accentLight}`,
                          }}
                        >
                          <h4
                            className="font-semibold mb-2 flex items-center gap-2"
                            style={{ color: COLORS.accentLight }}
                          >
                            <AlertCircle className="w-5 h-5" />
                            Catatan Penting
                          </h4>
                          <p style={{ color: COLORS.accentLight }}>
                            {selectedPendaftar.catatan}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div
                  className="border-t p-4"
                  style={{
                    backgroundColor: COLORS.grayLight,
                    borderColor: COLORS.grayMedium,
                  }}
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            JSON.stringify(selectedPendaftar, null, 2),
                          );
                          alert("Data berhasil disalin ke clipboard!");
                        }}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                        style={{
                          backgroundColor: COLORS.goldTransparent,
                          color: COLORS.accent,
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            COLORS.goldTransparent20)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            COLORS.goldTransparent)
                        }
                      >
                        <Copy className="w-4 h-4" />
                        <span className="text-sm">Salin Data</span>
                      </button>
                      <button
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                        style={{
                          backgroundColor: COLORS.blueTransparent10,
                          color: COLORS.primary,
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            COLORS.blueTransparent20)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            COLORS.blueTransparent10)
                        }
                      >
                        <Printer className="w-4 h-4" />
                        <span className="text-sm">Cetak</span>
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(selectedPendaftar.id)}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        <span className="text-sm">Hapus</span>
                      </button>
                      <button
                        onClick={() => {
                          handleStatusChange(
                            selectedPendaftar.id,
                            "diverifikasi",
                          );
                          setIsDetailModalOpen(false);
                        }}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-white transition-colors flex items-center justify-center gap-2"
                        style={{ backgroundColor: COLORS.accent }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            COLORS.accentLight)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            COLORS.accent)
                        }
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Verifikasi</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    );
  };

  // Responsive table component untuk mobile dengan palet warna baru
  const MobileCardView = () => (
    <div className="space-y-3">
      {filteredPendaftar.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-4 border hover:shadow-xl transition-shadow duration-300"
          style={{ borderColor: COLORS.grayMedium }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: COLORS.primary }}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: COLORS.secondary }}
                >
                  {p.nomorPendaftaran}
                </span>
              </div>
              <h3 className="font-bold text-lg text-gray-900">
                {p.namaLengkap}
              </h3>
              <p className="text-sm" style={{ color: COLORS.secondary }}>
                {p.nisn}
              </p>
            </div>
            {getStatusBadge(p.status)}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="space-y-1">
              <p className="text-xs" style={{ color: COLORS.secondary }}>
                Asal Sekolah
              </p>
              <p className="text-sm font-medium truncate">{p.asalSekolah}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs" style={{ color: COLORS.secondary }}>
                Jurusan
              </p>
              <span
                className={`px-2 py-1 rounded-full text-xs ${p.jurusanDaftar === "IPA" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}
              >
                {p.jurusanDaftar}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-xs" style={{ color: COLORS.secondary }}>
                Nilai
              </p>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${Math.min(p.nilaiRataRata, 100)}%`,
                      backgroundColor: COLORS.accent,
                    }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {p.nilaiRataRata.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs" style={{ color: COLORS.secondary }}>
                Dokumen
              </p>
              <div
                className={`text-xs font-medium ${p.dokumenLengkap ? "text-green-600" : "text-red-600"}`}
              >
                {p.dokumenLengkap ? "✓ Lengkap" : "✗ Belum"}
              </div>
            </div>
          </div>

          <div
            className="flex gap-2 pt-4 border-t"
            style={{ borderColor: COLORS.grayMedium }}
          >
            <button
              onClick={() => handleViewDetail(p)}
              className="flex-1 px-3 py-2 rounded-lg text-white transition-colors flex items-center justify-center gap-2"
              style={{ backgroundColor: COLORS.primary }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = COLORS.secondary)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = COLORS.primary)
              }
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm">Detail</span>
            </button>
            <button
              onClick={() => handleStatusChange(p.id, "diverifikasi")}
              className="p-2 rounded-lg transition-colors"
              style={{
                backgroundColor: COLORS.goldTransparent,
                color: COLORS.accent,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  COLORS.goldTransparent20)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = COLORS.goldTransparent)
              }
            >
              <CheckCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleStatusChange(p.id, "ditolak")}
              className="p-2 rounded-lg hover:bg-red-50 transition-colors"
              style={{ color: "#ef4444" }}
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div
      className="min-h-screen p-3 sm:p-4 lg:p-6"
      style={{ backgroundColor: COLORS.grayLight }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-bold mb-2"
              style={{ color: COLORS.primary }}
            >
              PPDB Admin Dashboard
            </h1>
            <p style={{ color: COLORS.secondary }}>
              Kelola dan pantau pendaftaran peserta didik baru
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div
              className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border"
              style={{ borderColor: COLORS.secondary }}
            >
              <FileSpreadsheet
                className="w-4 h-4"
                style={{ color: COLORS.secondary }}
              />
              <select
                className="text-sm bg-transparent outline-none"
                value={exportFormat}
                onChange={(e) =>
                  setExportFormat(e.target.value as "excel" | "csv")
                }
                style={{ color: COLORS.primary }}
              >
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>

            <button
              onClick={handleExport}
              disabled={isExporting || filteredPendaftar.length === 0}
              className="px-4 py-2 rounded-xl text-white flex items-center gap-2 disabled:opacity-50 transition-colors"
              style={{ backgroundColor: COLORS.accentLight }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = COLORS.accent)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = COLORS.accentLight)
              }
            >
              {isExporting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>Ekspor</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Statistik Cards dengan palet warna baru */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 sm:mb-8"
      >
        {[
          {
            label: "Total",
            value: stats.total,
            color: COLORS.primary,
            bgColor: COLORS.blueTransparent10,
            icon: <Users />,
          },
          {
            label: "Menunggu",
            value: stats.menunggu,
            color: COLORS.accentLight,
            bgColor: COLORS.goldTransparent,
            icon: <Clock />,
          },
          {
            label: "Diverifikasi",
            value: stats.diverifikasi,
            color: COLORS.primary,
            bgColor: COLORS.blueTransparent20,
            icon: <FileCheck />,
          },
          {
            label: "Diterima",
            value: stats.diterima,
            color: COLORS.accent,
            bgColor: COLORS.goldTransparent20,
            icon: <CheckCircle />,
          },
          {
            label: "Ditolak",
            value: stats.ditolak,
            color: "#ef4444",
            bgColor: "#fee2e2",
            icon: <XCircle />,
          },
          {
            label: "Lengkap",
            value: stats.dokumenLengkap,
            color: COLORS.accentLight,
            bgColor: COLORS.goldTransparent,
            icon: <FileText />,
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow"
            style={{ borderColor: COLORS.grayMedium }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-xs sm:text-sm"
                  style={{ color: COLORS.secondary }}
                >
                  {stat.label}
                </p>
                <p
                  className="text-xl sm:text-2xl font-bold mt-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
              </div>
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: stat.bgColor }}
              >
                <div style={{ color: stat.color }}>{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border p-4 mb-6"
        style={{ borderColor: COLORS.grayMedium }}
      >
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: COLORS.secondary }}
            />
            <input
              type="text"
              placeholder="Cari nama, NISN, atau nomor pendaftaran..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: COLORS.secondary,
                borderRadius: "0.5rem",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = COLORS.accent;
                e.target.style.boxShadow = `0 0 0 2px ${COLORS.goldTransparent20}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = COLORS.secondary;
                e.target.style.boxShadow = "none";
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: COLORS.secondary }}
              >
                Status
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: COLORS.secondary,
                  borderRadius: "0.5rem",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = COLORS.accent;
                  e.target.style.boxShadow = `0 0 0 2px ${COLORS.goldTransparent20}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = COLORS.secondary;
                  e.target.style.boxShadow = "none";
                }}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="semua">Semua Status</option>
                <option value="menunggu">Menunggu</option>
                <option value="diverifikasi">Diverifikasi</option>
                <option value="diterima">Diterima</option>
                <option value="ditolak">Ditolak</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: COLORS.secondary }}
              >
                Jurusan
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: COLORS.secondary,
                  borderRadius: "0.5rem",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = COLORS.accent;
                  e.target.style.boxShadow = `0 0 0 2px ${COLORS.goldTransparent20}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = COLORS.secondary;
                  e.target.style.boxShadow = "none";
                }}
                value={filterJurusan}
                onChange={(e) => setFilterJurusan(e.target.value)}
              >
                <option value="semua">Semua Jurusan</option>
                <option value="IPA">IPA</option>
                <option value="IPS">IPS</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: COLORS.secondary }}
              >
                Urutkan
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: COLORS.secondary,
                  borderRadius: "0.5rem",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = COLORS.accent;
                  e.target.style.boxShadow = `0 0 0 2px ${COLORS.goldTransparent20}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = COLORS.secondary;
                  e.target.style.boxShadow = "none";
                }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="tanggalDaftar">Tanggal Daftar</option>
                <option value="namaLengkap">Nama Lengkap</option>
                <option value="nilaiRataRata">Nilai Rata-rata</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: COLORS.secondary }}
              >
                Urutan
              </label>
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "desc" ? "asc" : "desc")
                }
                className="w-full px-3 py-2 border rounded-lg hover:bg-gray-50 flex items-center justify-between transition-colors"
                style={{ borderColor: COLORS.secondary }}
              >
                <span style={{ color: COLORS.primary }}>
                  {sortOrder === "desc" ? "Terbaru" : "Terlama"}
                </span>
                {sortOrder === "desc" ? (
                  <ChevronDown
                    className="w-4 h-4"
                    style={{ color: COLORS.primary }}
                  />
                ) : (
                  <ChevronUp
                    className="w-4 h-4"
                    style={{ color: COLORS.primary }}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results Count */}
      {filteredPendaftar.length > 0 && (
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm" style={{ color: COLORS.secondary }}>
            Menampilkan{" "}
            <span className="font-medium" style={{ color: COLORS.primary }}>
              {filteredPendaftar.length}
            </span>{" "}
            dari{" "}
            <span className="font-medium" style={{ color: COLORS.primary }}>
              {pendaftar.length}
            </span>{" "}
            pendaftar
          </p>
          <button
            onClick={() => setPendaftar(mockPendaftar)}
            className="text-sm flex items-center gap-1 transition-colors"
            style={{ color: COLORS.accent }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = COLORS.accentLight)
            }
            onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.accent)}
          >
            <RefreshCw className="w-4 h-4" />
            Reset Filter
          </button>
        </div>
      )}

      {/* Data Table / Cards */}
      {isMobileView ? (
        <MobileCardView />
      ) : (
        <div
          className="bg-white rounded-xl shadow-sm border overflow-hidden"
          style={{ borderColor: COLORS.grayMedium }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: COLORS.primary }}>
                  <th className="text-left p-4 text-sm font-semibold text-white">
                    No.
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-white">
                    Nama Lengkap
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-white">
                    Asal Sekolah
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-white">
                    Jurusan
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-white">
                    Nilai
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-white">
                    Status
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-white">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredPendaftar.map((p, index) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4" style={{ color: COLORS.secondary }}>
                      {index + 1}
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {p.namaLengkap}
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: COLORS.secondary }}
                        >
                          {p.nomorPendaftaran}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{p.asalSekolah}</div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${p.jurusanDaftar === "IPA" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}
                      >
                        {p.jurusanDaftar}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${Math.min(p.nilaiRataRata, 100)}%`,
                              backgroundColor: COLORS.accent,
                            }}
                          />
                        </div>
                        <span
                          className="font-medium"
                          style={{ color: COLORS.primary }}
                        >
                          {p.nilaiRataRata.toFixed(1)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">{getStatusBadge(p.status)}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetail(p)}
                          className="p-2 rounded-lg transition-colors"
                          style={{
                            backgroundColor: COLORS.blueTransparent10,
                            color: COLORS.primary,
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              COLORS.blueTransparent20)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              COLORS.blueTransparent10)
                          }
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(p.id, "diverifikasi")
                          }
                          className="p-2 rounded-lg transition-colors"
                          style={{
                            backgroundColor: COLORS.goldTransparent,
                            color: COLORS.accent,
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              COLORS.goldTransparent20)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              COLORS.goldTransparent)
                          }
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(p.id, "ditolak")}
                          className="p-2 rounded-lg transition-colors"
                          style={{
                            backgroundColor: "#fee2e2",
                            color: "#ef4444",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#fecaca")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "#fee2e2")
                          }
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredPendaftar.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: COLORS.blueTransparent10 }}
          >
            <User className="w-8 h-8" style={{ color: COLORS.primary }} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm
              ? "Tidak ada hasil pencarian"
              : "Belum ada data pendaftar"}
          </h3>
          <p style={{ color: COLORS.secondary }}>
            {searchTerm
              ? "Coba ubah kata kunci pencarian atau atur filter yang berbeda"
              : "Data pendaftar akan muncul di sini setelah ada pendaftaran"}
          </p>
        </motion.div>
      )}

      {/* Detail Modal */}
      {isDetailModalOpen && <DetailModal />}
    </div>
  );
};

export default PPDBAdminDashboard;
