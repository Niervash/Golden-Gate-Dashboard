import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  Calendar,
  Award,
  User,
  Bell,
  Clock,
  CheckCircle,
  QrCode,
  Sparkles,
  LogOut,
  MapPin,
  FileText,
  BookmarkCheck,
  TrendingUp,
  LayoutDashboard,
  Menu,
  X,
  Loader2,
} from "lucide-react";
import { useAuth } from "../../context";
import { useNavigate } from "react-router-dom";
import { ILoveGGS } from "../../assets/images";
import {
  booksApi,
  readingLogsApi,
  schedulesApi,
  gradesApi,
  studentsApi,
  announcementsApi,
  attendanceApi,
} from "../../utils/api";

// Helper function to extract embeddable Google Drive viewer link
const getDriveEmbedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("/preview")) return url;
  if (url.includes("/view")) return url.replace(/\/view.*/, "/preview");
  const fileIdMatch = url.match(/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
  }
  return url;
};

const DAY_NAMES = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const extractList = (res: any): any[] => {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  if (Array.isArray(d?.data)) return d.data;
  return [];
};

const scoreToLetter = (score: number) => {
  if (score >= 90) return "A+";
  if (score >= 85) return "A";
  if (score >= 80) return "A-";
  if (score >= 75) return "B+";
  if (score >= 70) return "B";
  if (score >= 65) return "C";
  return "D";
};

const getScheduleStatus = (jamMulai: string, jamSelesai: string) => {
  const now = new Date();
  const [sh, sm] = (jamMulai || "00:00").split(":").map(Number);
  const [eh, em] = (jamSelesai || "00:00").split(":").map(Number);
  const start = new Date(now);
  start.setHours(sh || 0, sm || 0, 0, 0);
  const end = new Date(now);
  end.setHours(eh || 0, em || 0, 0, 0);
  if (now >= start && now <= end) return "Sedang Berlangsung";
  if (now < start) return "Akan Datang";
  return "Selesai";
};

export const StudentMobileDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"home" | "jadwal" | "nilai" | "bacaan" | "profil">("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any | null>(null);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [grades, setGrades] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [myReadingLogs, setMyReadingLogs] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [summaryBook, setSummaryBook] = useState<any | null>(null);
  const [readingSummary, setReadingSummary] = useState("");
  const [readingRating, setReadingRating] = useState(5);
  const [submittingSummary, setSubmittingSummary] = useState(false);
  const [attendanceRate, setAttendanceRate] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const todayName = DAY_NAMES[new Date().getDay()];

  const loadData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const [studentRes, schedulesRes, gradesRes, annRes, attRes, booksRes, logsRes] = await Promise.all([
        studentsApi.getMe().catch(() => ({ data: null })),
        schedulesApi.getMe().catch(() => ({ data: [] })),
        gradesApi.getMe().catch(() => ({ data: [] })),
        announcementsApi.getAll().catch(() => ({ data: [] })),
        attendanceApi.getMe().catch(() => ({ data: [] })),
        booksApi.getAll().catch(() => ({ data: [] })),
        readingLogsApi.getMe().catch(() => ({ data: [] })),
      ]);

      const allSchedules = extractList(schedulesRes);
      const allGrades = extractList(gradesRes);
      const allAnn = extractList(annRes);
      const allAtt = extractList(attRes);
      const allBooks = extractList(booksRes);
      const allLogs = extractList(logsRes);

      const matched = studentRes.data?.data || studentRes.data || null;

      setStudent(matched);
      setBooks(allBooks);

      const nis = matched?.nis || user.nis || "";
      if (nis) {
        const myLogs = allLogs.filter((l: any) => String(l.student_nis) === String(nis));
        setMyReadingLogs(myLogs);
      }

      const kelas = matched?.kelas || user.class || "";

      setSchedules(allSchedules);

      setGrades(allGrades);

      setAnnouncements(allAnn.slice(0, 5));

      if (nis) {
        const myAtt = allAtt;
        if (myAtt.length > 0) {
          const hadir = myAtt.filter((a: any) => a.status === "Hadir").length;
          setAttendanceRate(Math.round((hadir / myAtt.length) * 1000) / 10);
        } else {
          setAttendanceRate(null);
        }
      }
    } catch {
      setError("Gagal memuat data portal siswa");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const handleStartReading = async (book: any) => {
    const nis = student?.nis || user?.nis || "12345";
    const name = student?.nama_lengkap || user?.name || "Siswa";
    const kelas = student?.kelas || user?.class || "X-IPA-1";

    let log = myReadingLogs.find((l) => Number(l.book_id) === Number(book.id));
    if (!log) {
      try {
        const res = await readingLogsApi.createMine({
          book_id: book.id,
          book_title: book.title,
          summary: "",
          rating: 5,
        });
        log = {
          id: res.data?.data?.id || res.data?.id,
          student_nis: nis,
          student_name: name,
          student_class: kelas,
          book_id: book.id,
          book_title: book.title,
          status: "sedang_dibaca",
          summary: "",
          rating: 5,
        };
        setMyReadingLogs((prev) => [log, ...prev]);
      } catch (err) {
        console.error(err);
      }
    }
    setSelectedBook(book);
  };

  const handleOpenSummary = (book: any) => {
    const log = myReadingLogs.find((l) => Number(l.book_id) === Number(book.id));
    setSummaryBook(book);
    setReadingSummary(log?.summary || "");
    setReadingRating(log?.rating || 5);
  };

  const handleSaveSummary = async () => {
    if (!summaryBook) return;
    const log = myReadingLogs.find((l) => Number(l.book_id) === Number(summaryBook.id));
    if (!log) return;

    setSubmittingSummary(true);
    try {
      await readingLogsApi.updateMine(log.id, {
        status: "selesai",
        summary: readingSummary,
        rating: readingRating,
      });
      alert("Summary dan hasil bacaan berhasil disimpan!");
      setMyReadingLogs((prev) =>
        prev.map((l) =>
          l.id === log.id
            ? { ...l, status: "selesai", summary: readingSummary, rating: readingRating }
            : l,
        ),
      );
      setSummaryBook(null);
    } catch (err) {
      alert("Gagal menyimpan summary");
    } finally {
      setSubmittingSummary(false);
    }
  };

  const navTabs = [
    { id: "home", label: "Beranda", icon: LayoutDashboard },
    { id: "jadwal", label: "Jadwal Pelajaran", icon: Calendar },
    { id: "nilai", label: "Raport & Nilai", icon: BookmarkCheck },
    { id: "bacaan", label: "Perpustakaan Drive", icon: BookOpen },
    { id: "profil", label: "Profil Siswa", icon: User },
  ] as const;

  useEffect(() => {
    loadData();
  }, [loadData]);

  const todaySchedule = useMemo(() => {
    return schedules
      .filter((s) => s.hari === todayName)
      .sort((a, b) => String(a.jam_mulai).localeCompare(String(b.jam_mulai)))
      .map((s) => ({
        id: s.id,
        time: `${s.jam_mulai} - ${s.jam_selesai}`,
        subject: s.mapel,
        room: s.ruangan || "—",
        teacher: s.guru || "—",
        status: getScheduleStatus(s.jam_mulai, s.jam_selesai),
        hari: s.hari,
      }));
  }, [schedules, todayName]);

  const weeklySchedule = useMemo(() => {
    return [...schedules].sort((a, b) => {
      const dayOrder = DAYS_ORDER_INDEX(a.hari) - DAYS_ORDER_INDEX(b.hari);
      if (dayOrder !== 0) return dayOrder;
      return String(a.jam_mulai).localeCompare(String(b.jam_mulai));
    });
  }, [schedules]);

  const recentGrades = useMemo(() => {
    return grades.map((g) => ({
      id: g.id,
      subject: g.mapel,
      score: Number(g.nilai_akhir ?? g.uas ?? 0),
      date: `${g.semester || ""} ${g.tahun_ajaran || ""}`.trim() || "—",
      status: g.predikat || scoreToLetter(Number(g.nilai_akhir ?? 0)),
      tugas: g.tugas,
      uts: g.uts,
      uas: g.uas,
    }));
  }, [grades]);

  const avgScore = useMemo(() => {
    if (recentGrades.length === 0) return null;
    const sum = recentGrades.reduce((acc, g) => acc + g.score, 0);
    return Math.round((sum / recentGrades.length) * 100) / 100;
  }, [recentGrades]);

  const displayClass = student?.kelas || user?.class || "—";
  const displayNis = student?.nis || student?.nisn || "—";
  const displayName = student?.nama_lengkap || user?.name || "Siswa";

  const todayLabel = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col justify-between">
      <header className="bg-[#23305d] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-1 flex items-center justify-center shrink-0">
              <img src={ILoveGGS} alt="Logo GGS" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
                GOLDEN <span className="text-[#d9ab3f]">GATE</span> SCHOOL
              </h1>
              <p className="text-[11px] text-amber-300 font-semibold truncate max-w-[180px] sm:max-w-none">
                Portal Akademik Siswa ({displayClass})
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-white/10 p-1.5 rounded-2xl border border-white/10">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-colors duration-200 flex items-center gap-2 ${
                    isActive ? "text-[#23305d]" : "text-slate-200 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-[#d9ab3f] rounded-xl shadow-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={16} /> {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Notifikasi"
              type="button"
              className="p-2 rounded-xl bg-white/10 text-white relative hover:bg-white/20 transition-all"
            >
              <Bell size={18} />
              {announcements.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-xl text-xs font-bold transition-all border border-red-400/30"
            >
              <LogOut size={14} /> Keluar
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.28 }}
              className="lg:hidden bg-[#1c284c] border-t border-white/10 px-4 pt-3 pb-4 space-y-2 shadow-xl overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {navTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                        isActive
                          ? "bg-[#d9ab3f] text-[#23305d] border-[#d9ab3f] shadow-md"
                          : "bg-white/5 text-slate-200 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <Icon size={16} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="pt-2 border-t border-white/10 flex sm:hidden justify-end">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-xl text-xs font-bold transition-all border border-red-400/30"
                >
                  <LogOut size={14} /> Keluar dari Akun Siswa
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 pb-24 md:pb-8">
        {loading && (
          <div className="flex items-center justify-center py-20 gap-2 text-slate-500">
            <Loader2 className="animate-spin" /> Memuat data akademik...
          </div>
        )}

        {error && !loading && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 text-red-700 text-sm border border-red-100">
            {error}
          </div>
        )}

        {!loading && (
          <>
            <div className="bg-gradient-to-r from-[#23305d] via-[#1c284c] to-[#151e3d] text-white p-5 sm:p-6 rounded-3xl shadow-lg border border-amber-500/20 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#d9ab3f]/20 border border-[#d9ab3f]/40 flex items-center justify-center text-[#d9ab3f] font-black text-xl flex-shrink-0">
                  {displayName?.charAt(0) || "S"}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-[#d9ab3f]/20 text-[#d9ab3f] px-2.5 py-0.5 rounded-md text-[11px] font-bold border border-[#d9ab3f]/30">
                      Siswa Aktif
                    </span>
                    <span className="text-xs text-slate-300">NIS: {displayNis}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                    Selamat Datang, {displayName}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    Kelas {displayClass}
                    {grades[0]?.tahun_ajaran ? ` • Tahun Ajaran ${grades[0].tahun_ajaran}` : ""}
                  </p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center gap-3 self-stretch md:self-auto justify-between md:justify-start">
                <div>
                  <p className="text-[10px] text-amber-300 font-bold uppercase">Hari Ini</p>
                  <p className="text-xs font-bold text-white flex items-center gap-1">
                    <CheckCircle size={14} className="text-emerald-400" /> {todayLabel}
                  </p>
                </div>
                <div className="bg-white p-1 rounded-lg">
                  <QrCode size={30} className="text-[#23305d]" />
                </div>
              </div>
            </div>

            {activeTab === "home" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">
                        Tingkat Kehadiran
                      </p>
                      <h3 className="text-xl font-black text-[#23305d]">
                        {attendanceRate != null ? `${attendanceRate}%` : "—"}
                      </h3>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100">
                      <Award size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">Jumlah Mapel</p>
                      <h3 className="text-xl font-black text-[#23305d]">
                        {recentGrades.length}{" "}
                        <span className="text-xs font-normal text-slate-500">dinilai</span>
                      </h3>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">Rata-Rata Nilai</p>
                      <h3 className="text-xl font-black text-[#23305d]">
                        {avgScore != null ? avgScore : "—"}{" "}
                        {avgScore != null && (
                          <span className="text-xs font-normal text-amber-600">
                            ({scoreToLetter(avgScore)})
                          </span>
                        )}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                      <h3 className="text-sm font-black text-[#23305d] uppercase tracking-wider flex items-center gap-2">
                        <Clock size={16} className="text-[#d9ab3f]" /> Jadwal Pelajaran Hari Ini
                      </h3>
                      <span className="text-xs font-bold text-amber-600">{todayName}</span>
                    </div>
                    <div className="space-y-3">
                      {todaySchedule.length === 0 ? (
                        <p className="text-sm text-slate-400 text-center py-6">
                          Tidak ada jadwal untuk hari ini
                          {displayClass !== "—" ? ` (kelas ${displayClass})` : ""}.
                        </p>
                      ) : (
                        todaySchedule.map((item) => (
                          <div
                            key={item.id}
                            className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-2 hover:border-amber-400/50 transition-all"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-mono text-slate-600 font-bold flex items-center gap-1">
                                <Clock size={13} className="text-amber-500" /> {item.time}
                              </span>
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                  item.status === "Sedang Berlangsung"
                                    ? "bg-amber-100 text-amber-800 border border-amber-300"
                                    : item.status === "Selesai"
                                      ? "bg-slate-100 text-slate-500"
                                      : "bg-slate-200 text-slate-700"
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>
                            <h4 className="font-bold text-base text-[#23305d]">{item.subject}</h4>
                            <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-200/60">
                              <span className="flex items-center gap-1 font-medium text-slate-700">
                                <MapPin size={13} className="text-amber-500" /> {item.room}
                              </span>
                              <span className="font-medium">{item.teacher}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                      <h3 className="text-sm font-black text-[#23305d] uppercase tracking-wider flex items-center gap-2">
                        <FileText size={16} className="text-[#d9ab3f]" /> Nilai Tugas & UH
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveTab("nilai")}
                        className="text-xs font-bold text-amber-600 hover:underline"
                      >
                        Lihat Semua
                      </button>
                    </div>
                    <div className="space-y-2.5">
                      {recentGrades.length === 0 ? (
                        <p className="text-sm text-slate-400 text-center py-4">
                          Belum ada nilai untuk akun ini.
                        </p>
                      ) : (
                        recentGrades.slice(0, 4).map((grade) => (
                          <div
                            key={grade.id}
                            className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between"
                          >
                            <div>
                              <h4 className="font-bold text-xs text-slate-800">{grade.subject}</h4>
                              <p className="text-[10px] text-slate-400">{grade.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-base font-black text-[#23305d]">
                                {grade.score}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-xs">
                                {grade.status}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 p-4 rounded-2xl border border-amber-400/30 text-slate-800">
                    <div className="flex items-center gap-2 text-amber-700 font-bold text-xs mb-1">
                      <Sparkles size={16} /> Pengumuman
                    </div>
                    {announcements.length === 0 ? (
                      <p className="text-xs text-slate-700">Belum ada pengumuman terbaru.</p>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-800">
                          {announcements[0].title || "Pengumuman sekolah"}
                        </p>
                        <p className="text-xs text-slate-700 line-clamp-3">
                          {announcements[0].content || ""}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "jadwal" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-base font-black text-[#23305d] uppercase tracking-wider">
                    Jadwal Pelajaran Lengkap (Kelas {displayClass})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {weeklySchedule.length === 0 ? (
                      <p className="text-sm text-slate-400 col-span-2 text-center py-8">
                        Belum ada jadwal untuk kelas ini.
                      </p>
                    ) : (
                      weeklySchedule.map((item) => (
                        <div
                          key={item.id}
                          className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2"
                        >
                          <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                            <span className="text-amber-700">{item.hari}</span>
                            <span className="font-mono text-amber-600">
                              {item.jam_mulai} - {item.jam_selesai}
                            </span>
                          </div>
                          <h4 className="font-bold text-base text-[#23305d]">{item.mapel}</h4>
                          <p className="text-xs text-slate-600">
                            Pengampu: {item.guru} • {item.ruangan}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "nilai" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-r from-[#23305d] to-[#1c284c] text-white p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
                  <div>
                    <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                      Rata-rata Nilai Akhir
                    </p>
                    <h2 className="text-3xl font-black text-white mt-1">
                      {avgScore != null ? avgScore : "—"}{" "}
                      {avgScore != null && (
                        <span className="text-sm font-semibold text-emerald-400">
                          ({scoreToLetter(avgScore)})
                        </span>
                      )}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-2xl border border-white/10">
                    <Sparkles className="w-8 h-8 text-[#d9ab3f]" />
                    <div className="text-left">
                      <p className="text-[10px] text-slate-300">Mapel dinilai</p>
                      <p className="text-xs font-extrabold text-amber-300">
                        {recentGrades.length} mapel
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-base font-black text-[#23305d] uppercase tracking-wider">
                    Transkrip Nilai Mata Pelajaran
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {recentGrades.length === 0 ? (
                      <p className="text-sm text-slate-400 col-span-2 text-center py-8">
                        Belum ada data nilai. Pastikan akun terhubung ke data siswa (email/NIS).
                      </p>
                    ) : (
                      recentGrades.map((g) => (
                        <div
                          key={g.id}
                          className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center"
                        >
                          <div>
                            <h4 className="font-bold text-sm text-[#23305d]">{g.subject}</h4>
                            <p className="text-xs text-slate-500">
                              Tugas {g.tugas} · UTS {g.uts} · UAS {g.uas}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{g.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-black text-[#23305d]">{g.score}</p>
                            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-xs">
                              Predikat {g.status}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "bacaan" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-[#23305d] text-white p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
                  <div>
                    <span className="px-3 py-1 bg-amber-400/20 text-amber-300 font-bold text-xs rounded-full">
                      Literasi Digital GGS
                    </span>
                    <h2 className="text-2xl font-black text-white mt-2">Perpustakaan & Summary Buku Drive</h2>
                    <p className="text-xs text-slate-300 mt-1 max-w-xl">
                      Pilih buku bacaan yang tersedia, baca secara langsung melalui Google Drive viewer, lalu tuliskan rangkuman (summary) hasil bacaanmu!
                    </p>
                  </div>
                  <BookOpen className="w-16 h-16 text-[#d9ab3f] opacity-80" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-black text-[#23305d]">Daftar Buku Tersedia</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {books.length === 0 ? (
                      <div className="col-span-3 text-center py-10 bg-white rounded-3xl border border-slate-200 text-slate-400">
                        Belum ada koleksi buku di drive perpustakaan.
                      </div>
                    ) : (
                      books.map((b) => {
                        const isLogged = myReadingLogs.find((l) => Number(l.book_id) === Number(b.id));
                        const isFinished = isLogged?.status === "selesai";
                        return (
                          <div
                            key={b.id}
                            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                          >
                            <div className="space-y-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#d9ab3f] bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                                {b.category || "Umum"}
                              </span>
                              <h4 className="font-bold text-base text-[#23305d] leading-snug">{b.title}</h4>
                              <p className="text-xs text-slate-500 font-medium">Penulis: {b.author || "Anonim"}</p>
                              <p className="text-xs text-slate-600 line-clamp-3 mt-2">{b.description}</p>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                              {isFinished && (
                                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl font-bold">
                                  <span>✅ Sudah Selesai Dibaca</span>
                                  <span>Rating: {isLogged.rating}/5</span>
                                </div>
                              )}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleStartReading(b)}
                                  className="py-2.5 bg-[#23305d] hover:bg-[#1c284c] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                                >
                                  <BookOpen size={16} /> Baca Buku Fullscreen
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleOpenSummary(b)}
                                  className="py-2.5 bg-[#d9ab3f] hover:bg-amber-500 text-[#23305d] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                                >
                                  <FileText size={16} /> {isFinished ? "Edit Summary" : "Tulis Summary"}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* History Peminjaman & Summary Siswa */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-lg font-black text-[#23305d]">Riwayat Reading & Summary Saya</h3>
                  {myReadingLogs.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-6">Belum ada riwayat buku yang kamu pinjam atau baca.</p>
                  ) : (
                    <div className="space-y-3">
                      {myReadingLogs.map((log) => (
                        <div key={log.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-bold text-sm text-[#23305d]">{log.book_title}</h4>
                            <span
                              className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                                log.status === "selesai"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {log.status === "selesai" ? "Selesai Dibaca" : "Sedang Dibaca"}
                            </span>
                          </div>
                          {log.summary && (
                            <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200 italic">
                              "{log.summary}"
                            </p>
                          )}
                          {log.feedback && (
                            <div className="text-[11px] text-[#23305d] font-bold bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                              Catatan Guru/Kepsek: {log.feedback}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Modal Drive Reader 100% Fullscreen */}
            <AnimatePresence>
              {selectedBook && (
                <div className="fixed inset-0 z-50 bg-black flex flex-col w-screen h-screen overflow-hidden">
                  {/* Reader Header Navbar */}
                  <div className="bg-[#23305d] text-white px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between shadow-lg shrink-0 border-b border-amber-500/20">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
                      <div className="p-1.5 sm:p-2 rounded-xl bg-amber-400/20 text-[#d9ab3f] shrink-0">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-black text-xs sm:text-base text-white leading-tight truncate">
                          {selectedBook.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-amber-300 truncate">
                          {selectedBook.author || "Penulis Anonim"} • Layar Baca Buku
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          const bk = selectedBook;
                          setSelectedBook(null);
                          handleOpenSummary(bk);
                        }}
                        className="px-2.5 sm:px-4 py-1.5 bg-[#d9ab3f] hover:bg-amber-500 text-[#23305d] rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-1 sm:gap-1.5 active:scale-95"
                      >
                        <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
                        <span className="hidden xs:inline">Tulis</span> Summary
                      </button>
                      <a
                        href={selectedBook.drive_url}
                        target="_blank"
                        rel="noreferrer"
                        className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all border border-white/20"
                      >
                        Tab Baru ↗
                      </a>
                      <button
                        type="button"
                        onClick={() => setSelectedBook(null)}
                        className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all ml-1"
                        aria-label="Tutup Mode Baca"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* 100% Responsive Fullscreen Reader Container */}
                  <div className="flex-1 w-full h-full bg-slate-900 overflow-hidden relative">
                    <iframe
                      src={getDriveEmbedUrl(selectedBook.drive_url)}
                      className="w-full h-full border-0"
                      title={selectedBook.title}
                      allow="autoplay"
                    />
                  </div>
                </div>
              )}
            </AnimatePresence>

            {/* Separate Modal Form Rangkuman (Summary) - Terpisah dari Frame Baca */}
            <AnimatePresence>
              {summaryBook && (
                <div className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl p-5 sm:p-7 space-y-4 my-auto border border-slate-100"
                  >
                    <div className="flex justify-between items-start border-b border-slate-100 pb-3 gap-3">
                      <div>
                        <h3 className="font-black text-base sm:text-lg text-[#23305d] flex items-center gap-2">
                          <FileText size={20} className="text-[#d9ab3f]" /> Form Rangkuman Buku
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5 line-clamp-1">{summaryBook.title}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSummaryBook(null)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Tuliskan intisari, poin penting, atau pelajaran yang kamu dapatkan dari membaca buku ini.
                      </p>

                      <div>
                        <label className="text-xs font-extrabold text-[#23305d] block mb-1.5">
                          Rangkuman / Summary *
                        </label>
                        <textarea
                          value={readingSummary}
                          onChange={(e) => setReadingSummary(e.target.value)}
                          rows={6}
                          placeholder="Tuliskan poin-poin penting atau kesimpulan hasil membaca..."
                          className="w-full p-3.5 text-xs bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-[#d9ab3f] focus:border-amber-500 focus:bg-white focus:outline-none leading-relaxed transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-extrabold text-[#23305d] block mb-1.5">
                          Beri Rating Buku (1 - 5 Bintang)
                        </label>
                        <select
                          value={readingRating}
                          onChange={(e) => setReadingRating(Number(e.target.value))}
                          className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold text-[#23305d] focus:ring-2 focus:ring-[#d9ab3f] focus:outline-none transition-all"
                        >
                          <option value={5}>⭐⭐⭐⭐⭐ (5 - Sangat Bagus)</option>
                          <option value={4}>⭐⭐⭐⭐ (4 - Bagus)</option>
                          <option value={3}>⭐⭐⭐ (3 - Cukup)</option>
                          <option value={2}>⭐⭐ (2 - Kurang)</option>
                          <option value={1}>⭐ (1 - Buruk)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setSummaryBook(null)}
                        className="w-1/3 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        disabled={submittingSummary || !readingSummary.trim()}
                        onClick={handleSaveSummary}
                        className="w-2/3 py-3 bg-[#23305d] hover:bg-[#1c284c] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        {submittingSummary ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...
                          </>
                        ) : (
                          "Simpan Summary Saya"
                        )}
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {activeTab === "profil" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto space-y-6"
              >
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-full bg-amber-100 border-4 border-[#d9ab3f] flex items-center justify-center text-[#23305d]">
                    <User size={48} />
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-[#23305d]">{displayName}</h3>
                    <p className="text-xs text-slate-500">
                      Siswa Kelas {displayClass} • NIS: {displayNis}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-3 text-sm">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Email Akun</span>
                      <span className="font-bold text-slate-800">{user?.email}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Kelas</span>
                      <span className="font-bold text-slate-800">{displayClass}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Jurusan</span>
                      <span className="font-bold text-slate-800">
                        {student?.jurusan || "—"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Status</span>
                      <span className="font-bold text-emerald-600">
                        {student?.status || "Aktif"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="w-full py-3.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 border border-red-200 transition-colors"
                  >
                    <LogOut size={18} /> Keluar dari Akun Siswa
                  </button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-2.5 flex items-center justify-between shadow-2xl z-50">
        <button
          type="button"
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-1 text-xs font-bold transition-colors ${
            activeTab === "home" ? "text-[#23305d]" : "text-slate-400"
          }`}
        >
          <Home size={20} className={activeTab === "home" ? "text-[#d9ab3f]" : ""} />
          <span>Beranda</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("jadwal")}
          className={`flex flex-col items-center gap-1 text-xs font-bold transition-colors ${
            activeTab === "jadwal" ? "text-[#23305d]" : "text-slate-400"
          }`}
        >
          <Calendar size={20} className={activeTab === "jadwal" ? "text-[#d9ab3f]" : ""} />
          <span>Jadwal</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("nilai")}
          className={`flex flex-col items-center gap-1 text-xs font-bold transition-colors ${
            activeTab === "nilai" ? "text-[#23305d]" : "text-slate-400"
          }`}
        >
          <BookmarkCheck size={20} className={activeTab === "nilai" ? "text-[#d9ab3f]" : ""} />
          <span>Nilai</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("bacaan")}
          className={`flex flex-col items-center gap-1 text-xs font-bold transition-colors ${
            activeTab === "bacaan" ? "text-[#23305d]" : "text-slate-400"
          }`}
        >
          <BookOpen size={20} className={activeTab === "bacaan" ? "text-[#d9ab3f]" : ""} />
          <span>Drive</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("profil")}
          className={`flex flex-col items-center gap-1 text-xs font-bold transition-colors ${
            activeTab === "profil" ? "text-[#23305d]" : "text-slate-400"
          }`}
        >
          <User size={20} className={activeTab === "profil" ? "text-[#d9ab3f]" : ""} />
          <span>Profil</span>
        </button>
      </div>
    </div>
  );
};

function DAYS_ORDER_INDEX(hari: string) {
  const order = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const i = order.indexOf(hari);
  return i === -1 ? 99 : i;
}
