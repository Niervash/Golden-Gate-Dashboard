import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Download,
  Users,
  UserCheck,
  QrCode,
  Search,
  Scan,
  Maximize2,
  Minimize2,
  Sparkles,
  Volume2,
  VolumeX,
  CreditCard,
  UserPlus
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Html5Qrcode } from "html5-qrcode";

interface AttendanceRecord {
  id: string;
  nama: string;
  nis: string;
  kelas: string;
  status: "Hadir" | "Sakit" | "Izin" | "Alpa";
  jamMasuk: string;
  keterangan: string;
  scanMethod?: "QR Card" | "Manual";
}

const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: "1", nama: "Ahmad Rizki Pratama", nis: "2023001", kelas: "X-1", status: "Hadir", jamMasuk: "06:45", keterangan: "-", scanMethod: "QR Card" },
  { id: "2", nama: "Siti Nurhaliza", nis: "2023002", kelas: "X-1", status: "Sakit", jamMasuk: "-", keterangan: "Surat Dokter" },
  { id: "3", nama: "Budi Setiawan", nis: "2022015", kelas: "X-1", status: "Hadir", jamMasuk: "06:50", keterangan: "-", scanMethod: "QR Card" },
  { id: "4", nama: "Dewi Anggraeni", nis: "2021042", kelas: "X-2", status: "Izin", jamMasuk: "-", keterangan: "Acara Keluarga" },
  { id: "5", nama: "Rizki Fadilah", nis: "2020089", kelas: "X-2", status: "Alpa", jamMasuk: "-", keterangan: "Tanpa Keterangan" },
];

export const AttendanceManagementDashboard = () => {
  const [selectedKelas, setSelectedKelas] = useState("All");
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [qrCodeInput, setQrCodeInput] = useState("");
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  
  // Camera scanning states
  const [hasCameraError, setHasCameraError] = useState(false);
  const [cameraErrorMessage, setCameraErrorMessage] = useState("");
  const qrScannerRef = useRef<Html5Qrcode | null>(null);

  // Sync state with refs to avoid stale closures in camera callback
  const isSoundEnabledRef = useRef(isSoundEnabled);
  useEffect(() => {
    isSoundEnabledRef.current = isSoundEnabled;
  }, [isSoundEnabled]);

  const attendanceListRef = useRef(attendanceList);
  useEffect(() => {
    attendanceListRef.current = attendanceList;
  }, [attendanceList]);

  const today = format(new Date(), "EEEE, dd MMMM yyyy", { locale: id });

  // Main attendance processor
  const processAttendance = (qrInput: string) => {
    if (!qrInput.trim()) return;

    // Search in student database (mocking a check)
    const mockStudentDatabase = [
      { nis: "2023001", nama: "Ahmad Rizki Pratama", kelas: "X-1" },
      { nis: "2023002", nama: "Siti Nurhaliza", kelas: "X-1" },
      { nis: "2022015", nama: "Budi Setiawan", kelas: "X-1" },
      { nis: "2021042", nama: "Dewi Anggraeni", kelas: "X-2" },
      { nis: "2020089", nama: "Rizki Fadilah", kelas: "X-2" },
      { nis: "2023005", nama: "Clara Salsabila", kelas: "X-1" },
      { nis: "2023006", nama: "Farhan Ardiansyah", kelas: "X-2" },
      { nis: "2023007", nama: "Gaby Anastasia", kelas: "X-1" }
    ];

    const student = mockStudentDatabase.find(s => s.nis === qrInput.trim() || s.nama.toLowerCase().includes(qrInput.toLowerCase()));

    if (student) {
      // Play beep sound if enabled
      if (isSoundEnabledRef.current) {
        try {
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // Beep frequency
          gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
          oscillator.start();
          oscillator.stop(audioCtx.currentTime + 0.15);
        } catch (_) {}
      }

      // Check if already scanned today
      const alreadyScanned = attendanceListRef.current.find(a => a.nis === student.nis && a.status === "Hadir");

      if (alreadyScanned) {
        setScanResult({
          success: false,
          message: `${student.nama} (${student.nis}) sudah tercatat hadir jam ${alreadyScanned.jamMasuk}.`
        });
      } else {
        const jamSekarang = format(new Date(), "HH:mm");
        const newRecord: AttendanceRecord = {
          id: String(attendanceListRef.current.length + 1),
          nama: student.nama,
          nis: student.nis,
          kelas: student.kelas,
          status: "Hadir",
          jamMasuk: jamSekarang,
          keterangan: "-",
          scanMethod: "QR Card"
        };

        // If student exists but had a different status, update them, otherwise append
        const existsIndex = attendanceListRef.current.findIndex(a => a.nis === student.nis);
        if (existsIndex >= 0) {
          const updated = [...attendanceListRef.current];
          updated[existsIndex] = newRecord;
          setAttendanceList(updated);
        } else {
          setAttendanceList([newRecord, ...attendanceListRef.current]);
        }

        setScanResult({
          success: true,
          message: `Berhasil! Kartu ${student.nama} (${student.nis}) terverifikasi. Masuk jam ${jamSekarang}.`
        });
      }
    } else {
      setScanResult({
        success: false,
        message: "Gagal! Kode QR kartu siswa tidak terdaftar di database Golden Gate."
      });
    }

    setTimeout(() => setScanResult(null), 4000);
  };

  // Manual submission helper
  const handleScanCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qrCodeInput.trim()) return;
    processAttendance(qrCodeInput);
    setQrCodeInput("");
  };

  // Setup real camera scanning effect
  useEffect(() => {
    let isMounted = true;
    if (isScanning) {
      const timer = setTimeout(() => {
        if (!isMounted) return;
        
        try {
          const scanner = new Html5Qrcode("qr-reader");
          qrScannerRef.current = scanner;
          
          scanner.start(
            { facingMode: "environment" },
            {
              fps: 10,
              qrbox: (width, height) => {
                const size = Math.min(width, height) * 0.7;
                return { width: size, height: size };
              }
            },
            (decodedText) => {
              processAttendance(decodedText);
            },
            () => {
              // Ignore parser errors
            }
          ).catch((err) => {
            console.error("Camera start error:", err);
            setHasCameraError(true);
            setCameraErrorMessage(err?.message || "Kamera tidak dapat diakses atau tidak ditemukan.");
          });
        } catch (e: any) {
          console.error("Scanner init error:", e);
          setHasCameraError(true);
          setCameraErrorMessage(e?.message || "Inisialisasi kamera gagal.");
        }
      }, 300);

      return () => {
        clearTimeout(timer);
        isMounted = false;
        if (qrScannerRef.current) {
          const scanner = qrScannerRef.current;
          if (scanner.isScanning) {
            scanner.stop()
              .then(() => {
                qrScannerRef.current = null;
              })
              .catch(err => console.error("Failed to stop scanner", err));
          } else {
            qrScannerRef.current = null;
          }
        }
      };
    } else {
      setHasCameraError(false);
      setCameraErrorMessage("");
    }
  }, [isScanning]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Hadir":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle size={12} /> Hadir
          </span>
        );
      case "Sakit":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <AlertCircle size={12} /> Sakit
          </span>
        );
      case "Izin":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <AlertCircle size={12} /> Izin
          </span>
        );
      case "Alpa":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
            <XCircle size={12} /> Alpa
          </span>
        );
      default:
        return null;
    }
  };

  const changeStatus = (id: string, newStatus: "Hadir" | "Sakit" | "Izin" | "Alpa") => {
    setAttendanceList(
      attendanceList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: newStatus,
            jamMasuk: newStatus === "Hadir" ? format(new Date(), "HH:mm") : "-",
            scanMethod: newStatus === "Hadir" ? "Manual" : undefined
          };
        }
        return item;
      })
    );
  };

  const filteredAttendance = attendanceList.filter((item) => {
    const matchesKelas = selectedKelas === "All" || item.kelas === selectedKelas;
    const matchesSearch =
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nis.includes(searchQuery);
    return matchesKelas && matchesSearch;
  });

  const totalSiswa = filteredAttendance.length;
  const totalHadir = filteredAttendance.filter((a) => a.status === "Hadir").length;
  const totalSakitIzin = filteredAttendance.filter((a) => a.status === "Sakit" || a.status === "Izin").length;
  const totalAlpa = filteredAttendance.filter((a) => a.status === "Alpa").length;

  return (
    <div className="space-y-6 pb-12 text-white">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Absensi & QR Scan Kartu Siswa</h1>
          <p className="text-sm text-slate-400">
            Sistem absensi terintegrasi kartu siswa digital berbasis scan QR Code guru kelas.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsScanning(!isScanning)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
              isScanning
                ? "bg-red-500/20 border-red-500 text-red-300"
                : "bg-[#d9ab3f] text-[#23305d] border-[#d9ab3f] hover:scale-[1.02]"
            }`}
          >
            <QrCode size={18} />
            {isScanning ? "Tutup Mode Scan" : "Mulai Scan Kartu Siswa"}
          </button>
          <button
            onClick={() => alert("Mengunduh Rekapitulasi Absensi...")}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1d2950] border border-[#43424e] rounded-xl hover:bg-[#d9ab3f]/10 text-white transition-all text-sm font-semibold"
          >
            <Download size={18} /> Export Rekap
          </button>
        </div>
      </div>

      {/* QR Scanner Mode Widget */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-[#1a2347]/80 backdrop-blur-xl rounded-3xl border border-[#43424e] p-6">
              {/* Left Column: Viewfinder Simulation */}
              <div className="lg:col-span-2 space-y-4">
                <div className="relative bg-[#121833] aspect-video w-full rounded-2xl overflow-hidden border border-[#43424e]/80 flex flex-col items-center justify-center">
                  
                  {/* Camera view element */}
                  {!hasCameraError ? (
                    <div id="qr-reader" className="absolute inset-0 w-full h-full z-0 overflow-hidden rounded-2xl" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-red-950/20">
                      <AlertCircle size={40} className="text-red-400 mb-2" />
                      <p className="text-sm font-semibold text-white">Gagal Mengakses Kamera</p>
                      <p className="text-xs text-red-300 mt-1 max-w-md">{cameraErrorMessage}</p>
                    </div>
                  )}

                  {/* Scanner overlay */}
                  {!hasCameraError && (
                    <div className="absolute inset-0 border-2 border-dashed border-[#d9ab3f]/30 m-4 rounded-xl flex items-center justify-center pointer-events-none z-10">
                      {/* Laser Line */}
                      <div className="w-full h-0.5 bg-[#d9ab3f] absolute animate-pulse shadow-[0_0_8px_#d9ab3f]" style={{
                        animation: "scanLine 2.5s infinite ease-in-out"
                      }} />

                      {/* Corner Reticles */}
                      <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-[#d9ab3f] rounded-tl-md" />
                      <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-[#d9ab3f] rounded-tr-md" />
                      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-[#d9ab3f] rounded-bl-md" />
                      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-[#d9ab3f] rounded-br-md" />
                    </div>
                  )}

                  {/* Finder HUD */}
                  <div className="absolute top-6 right-6 flex gap-2 z-20">
                    <button 
                      type="button"
                      onClick={() => setIsSoundEnabled(!isSoundEnabled)} 
                      className="p-2 bg-black/40 rounded-lg text-white hover:bg-black/60 transition-all cursor-pointer"
                    >
                      {isSoundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                    </button>
                    <span className="px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-mono uppercase tracking-wider rounded-md animate-pulse">
                      CAM Viewfinder
                    </span>
                  </div>

                  {/* Instruction text overlay */}
                  {!hasCameraError && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/65 backdrop-blur-md px-4 py-2 rounded-xl text-center z-20 max-w-[90%] pointer-events-none border border-[#d9ab3f]/20">
                      <p className="text-xs font-semibold text-white flex items-center gap-1.5 justify-center">
                        <Scan size={14} className="text-[#d9ab3f] animate-pulse" /> Arahkan QR Code Kartu Siswa ke Kamera
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: QR input & Scan result */}
              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <CreditCard size={18} className="text-[#d9ab3f]" />
                    Pencatatan Kehadiran Siswa
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Gunakan scanner kamera atau masukkan NIS siswa secara manual jika kamera tidak mendeteksi kode QR.
                  </p>
                </div>

                {/* Scan Result Feedback */}
                <div className="flex-1 my-4 flex items-center">
                  <AnimatePresence mode="wait">
                    {scanResult ? (
                      <motion.div
                        key={scanResult.message}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`w-full p-4 rounded-xl border flex gap-3 items-start ${
                          scanResult.success
                            ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
                            : "bg-red-500/20 border-red-500/30 text-red-300"
                        }`}
                      >
                        {scanResult.success ? <CheckCircle size={20} className="flex-shrink-0" /> : <XCircle size={20} className="flex-shrink-0" />}
                        <div>
                          <p className="text-xs uppercase font-bold tracking-wider">
                            {scanResult.success ? "Scan Sukses" : "Scan Gagal / Peringatan"}
                          </p>
                          <p className="text-xs sm:text-sm font-medium mt-1">
                            {scanResult.message}
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="w-full p-4 rounded-xl border border-dashed border-[#43424e] text-center text-xs text-slate-400">
                        <Sparkles size={16} className="mx-auto mb-1.5 text-slate-500" />
                        Belum ada kartu siswa yang ter-scan.
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Manual NIS Form */}
                <form onSubmit={handleScanCard} className="space-y-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Input NIS atau Nama Siswa
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan NIS (contoh: 2023001)"
                      value={qrCodeInput}
                      onChange={(e) => setQrCodeInput(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1d2950] text-white border border-[#43424e] rounded-xl focus:border-[#d9ab3f] focus:outline-none text-sm placeholder:text-slate-400/40"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#d9ab3f] text-[#23305d] font-bold rounded-xl text-sm transition-all hover:scale-[1.01]"
                  >
                    Submit Absensi
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1a2347]/60 backdrop-blur-xl rounded-2xl border border-[#43424e] p-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Siswa</span>
            <Users className="text-slate-400" size={18} />
          </div>
          <h3 className="text-2xl font-bold text-white">{totalSiswa}</h3>
        </div>
        <div className="bg-[#1a2347]/60 backdrop-blur-xl rounded-2xl border border-[#43424e] p-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-medium">Hadir</span>
            <UserCheck className="text-emerald-400" size={18} />
          </div>
          <h3 className="text-2xl font-bold text-emerald-400">{totalHadir}</h3>
        </div>
        <div className="bg-[#1a2347]/60 backdrop-blur-xl rounded-2xl border border-[#43424e] p-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Sakit / Izin</span>
            <AlertCircle className="text-amber-400" size={18} />
          </div>
          <h3 className="text-2xl font-bold text-amber-400">{totalSakitIzin}</h3>
        </div>
        <div className="bg-[#1a2347]/60 backdrop-blur-xl rounded-2xl border border-[#43424e] p-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Alpa</span>
            <XCircle className="text-red-400" size={18} />
          </div>
          <h3 className="text-2xl font-bold text-red-400">{totalAlpa}</h3>
        </div>
      </div>

      {/* Date Header & Filter Container */}
      <div className="bg-[#1a2347]/60 backdrop-blur-xl rounded-2xl p-4 border border-[#43424e] flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Calendar size={18} className="text-[#d9ab3f]" />
          <span className="font-semibold text-white">{today}</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64 bg-[#1d2950] border border-[#43424e] rounded-lg px-3 py-1.5 flex items-center gap-2">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Cari siswa/NIS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs text-white placeholder-slate-400/50 focus:outline-none w-full"
            />
          </div>

          {/* Class Filter */}
          <div className="flex items-center gap-2 bg-[#1d2950] border border-[#43424e] px-3 py-1.5 rounded-lg">
            <span className="text-xs font-medium text-slate-300 whitespace-nowrap">Filter Kelas:</span>
            <select
              className="appearance-none bg-transparent border-none focus:outline-none text-xs font-bold text-[#d9ab3f] cursor-pointer pr-4"
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
            >
              <option value="All" className="bg-[#1a2347]">Semua Kelas</option>
              <option value="X-1" className="bg-[#1a2347]">X-1 (IPA)</option>
              <option value="X-2" className="bg-[#1a2347]">X-2 (IPS)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1a2347]/60 backdrop-blur-xl rounded-3xl border border-[#43424e] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#23305d] text-white uppercase tracking-wider text-xs border-b border-[#43424e]">
                <th className="px-6 py-4">Nama Siswa</th>
                <th className="px-6 py-4">NIS</th>
                <th className="px-6 py-4">Kelas</th>
                <th className="px-6 py-4">Status Kehadiran</th>
                <th className="px-6 py-4">Jam Masuk</th>
                <th className="px-6 py-4">Metode Absen</th>
                <th className="px-6 py-4">Keterangan</th>
                <th className="px-6 py-4 text-right">Ubah Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#43424e]/50 bg-[#121833]/20">
              {filteredAttendance.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    Tidak ada data absensi siswa yang cocok.
                  </td>
                </tr>
              ) : (
                filteredAttendance.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-semibold text-white">{item.nama}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-slate-300">
                      {item.nis}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-[#d9ab3f] text-xs">
                      {item.kelas}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.jamMasuk !== "-" ? (
                        <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
                          <Clock size={12} className="text-emerald-400" /> {item.jamMasuk}
                        </div>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400">
                      {item.scanMethod ? (
                        <span className="bg-slate-800 border border-slate-700/80 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                          {item.scanMethod}
                        </span>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-300">
                      {item.keterangan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                      <select
                        value={item.status}
                        onChange={(e) => changeStatus(item.id, e.target.value as any)}
                        className="bg-[#1d2950] text-[#d9ab3f] border border-[#43424e] rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#d9ab3f] cursor-pointer"
                      >
                        <option value="Hadir" className="bg-[#1a2347] text-emerald-400">Hadir</option>
                        <option value="Sakit" className="bg-[#1a2347] text-blue-400">Sakit</option>
                        <option value="Izin" className="bg-[#1a2347] text-amber-400">Izin</option>
                        <option value="Alpa" className="bg-[#1a2347] text-red-400">Alpa</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Animation Styles */}
      <style>{`
        @keyframes scanLine {
          0% { top: 5%; }
          50% { top: 95%; }
          100% { top: 5%; }
        }
        #qr-reader {
          border: none !important;
          background: transparent !important;
        }
        #qr-reader video {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          border-radius: 1rem;
        }
        #qr-reader__scan_region {
          background: transparent !important;
        }
        #qr-reader__dashboard {
          display: none !important;
        }
      `}</style>
    </div>
  );
};
