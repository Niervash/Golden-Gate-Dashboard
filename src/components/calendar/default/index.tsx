import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Calendar,
} from "lucide-react";

interface Event {
  id: number;
  title: string;
  isoDate: string; // format "YYYY-MM-DD"
  time: string;
  location: string;
  category: "Akademik" | "Kegiatan" | "Prestasi" | "PPDB" | "Libur";
  description: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Pendaftaran PPDB Gelombang 1 Dibuka",
    isoDate: "2026-06-02",
    time: "08:00 - 15:00 WIB",
    location: "Online & Kampus GGS",
    category: "PPDB",
    description:
      "Penerimaan Peserta Didik Baru tahun ajaran 2026/2027 resmi dibuka. Daftarkan putra-putri Anda segera.",
  },
  {
    id: 2,
    title: "Pekan Olahraga dan Seni (PORSENI) 2026",
    isoDate: "2026-06-15",
    time: "07:30 - 16:00 WIB",
    location: "Lapangan Utama GGS",
    category: "Kegiatan",
    description:
      "Seluruh siswa akan berpartisipasi dalam berbagai lomba olahraga dan seni untuk mengakhiri semester.",
  },
  {
    id: 3,
    title: "Webinar Kurikulum Merdeka untuk Orang Tua",
    isoDate: "2026-06-20",
    time: "09:00 - 11:30 WIB",
    location: "Ruang Multimedia Lt. 3",
    category: "Akademik",
    description:
      "Sosialisasi implementasi Kurikulum Merdeka di GGS beserta sesi tanya jawab dengan wali kelas.",
  },
  {
    id: 4,
    title: "Pengumuman Kelulusan & Kenaikan Kelas",
    isoDate: "2026-06-25",
    time: "10:00 WIB",
    location: "Website Resmi GGS",
    category: "Akademik",
    description:
      "Hasil kelulusan dan kenaikan kelas dapat diakses melalui portal akademik masing-masing siswa.",
  },
  {
    id: 5,
    title: "Libur Semester Genap",
    isoDate: "2026-06-29",
    time: "Sepanjang Hari",
    location: "-",
    category: "Libur",
    description:
      "Masa liburan semester genap dimulai hingga 12 Juli 2026. Kegiatan belajar mengajar kembali 13 Juli 2026.",
  },
  {
    id: 6,
    title: "Pameran Karya Seni Siswa",
    isoDate: "2026-06-08",
    time: "09:00 - 14:00 WIB",
    location: "Aula Utama",
    category: "Kegiatan",
    description:
      "Pameran seni lukis, musik, dan drama hasil pembelajaran siswa selama semester genap.",
  },
];

const DAYS_OF_WEEK = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

const CalendarEvent: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-11
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  const monthName = new Date(currentYear, currentMonth).toLocaleDateString(
    "id-ID",
    {
      month: "long",
      year: "numeric",
    },
  );

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  const eventDates = useMemo(() => {
    const set = new Set<string>();
    events.forEach((ev) => set.add(ev.isoDate));
    return set;
  }, []);

  const selectedEvents = useMemo(() => {
    if (!selectedDate) return [];
    return events.filter((ev) => ev.isoDate === selectedDate);
  }, [selectedDate]);

  const handleDateClick = (day: number) => {
    const iso = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (eventDates.has(iso)) {
      setSelectedDate(iso);
    } else {
      setSelectedDate(null);
    }
  };

  const isToday = (day: number) =>
    today.getFullYear() === currentYear &&
    today.getMonth() === currentMonth &&
    today.getDate() === day;

  const categoryColor = (cat: Event["category"]) => {
    switch (cat) {
      case "PPDB":
        return { bg: "#d9ab3f", text: "#0f172a" };
      case "Akademik":
        return { bg: "#3b82f6", text: "#ffffff" };
      case "Kegiatan":
        return { bg: "#10b981", text: "#ffffff" };
      case "Prestasi":
        return { bg: "#f59e0b", text: "#ffffff" };
      case "Libur":
        return { bg: "#64748b", text: "#ffffff" };
      default:
        return { bg: "#334155", text: "#ffffff" };
    }
  };

  return (
    <section className="py-16 md:py-20" style={{ background: "#0f172a" }}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "#ffffff" }}
          >
            Kalender <span style={{ color: "#d9ab3f" }}>Event</span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-base md:text-lg"
            style={{ color: "#af9151" }}
          >
            Klik tanggal bertanda emas untuk melihat detail kegiatan.
          </p>
        </motion.div>

        {/* Layout dua kolom dengan proporsi kalender lebih kecil */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: Kalender (5/12) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-start"
          >
            <div
              className="rounded-2xl overflow-hidden shadow-xl w-full max-w-md"
              style={{
                background: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(51, 65, 85, 0.5)",
              }}
            >
              {/* Navigasi Bulan */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ background: "#23305d" }}
              >
                <button
                  onClick={goToPreviousMonth}
                  className="p-2 rounded-full transition-all hover:bg-white/10"
                  style={{ color: "#d9ab3f" }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3
                  className="text-lg font-bold capitalize tracking-wide"
                  style={{ color: "#ffffff" }}
                >
                  {monthName}
                </h3>
                <button
                  onClick={goToNextMonth}
                  className="p-2 rounded-full transition-all hover:bg-white/10"
                  style={{ color: "#d9ab3f" }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Hari */}
              <div
                className="grid grid-cols-7 text-center py-3 px-2"
                style={{ color: "#af9151" }}
              >
                {DAYS_OF_WEEK.map((day) => (
                  <div
                    key={day}
                    className="text-xs font-semibold uppercase tracking-wider py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Tanggal */}
              <div className="grid grid-cols-7 gap-0.5 p-2">
                {calendarDays.map((day, index) => {
                  if (day === null)
                    return (
                      <div key={`empty-${index}`} className="aspect-square" />
                    );

                  const isoDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const hasEvent = eventDates.has(isoDate);
                  const isSelected = selectedDate === isoDate;
                  const isTodayDate = isToday(day);

                  return (
                    <button
                      key={day}
                      onClick={() => handleDateClick(day)}
                      disabled={!hasEvent}
                      className={`relative flex items-center justify-center aspect-square text-sm rounded-full transition-all duration-200 ${
                        hasEvent
                          ? "hover:bg-[#d9ab3f]/20 cursor-pointer"
                          : "text-gray-500 cursor-default"
                      } ${isSelected ? "bg-[#d9ab3f] text-[#0f172a] font-bold shadow-md" : ""} ${
                        isTodayDate && !isSelected
                          ? "ring-2 ring-[#d9ab3f] ring-offset-1 ring-offset-[#1e293b]"
                          : ""
                      }`}
                      style={{
                        color: isSelected
                          ? "#0f172a"
                          : hasEvent
                            ? "#ffffff"
                            : "#64748b",
                        background: isSelected ? "#d9ab3f" : "transparent",
                      }}
                    >
                      <span
                        className={
                          hasEvent && !isSelected ? "font-semibold" : ""
                        }
                      >
                        {day}
                      </span>
                      {/* Indikator event */}
                      {hasEvent && !isSelected && (
                        <span
                          className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full"
                          style={{ background: "#d9ab3f" }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Kolom Kanan: Detail Event (7/12 atau 8/12) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <AnimatePresence mode="wait">
              {selectedDate && selectedEvents.length > 0 ? (
                <motion.div
                  key={selectedDate}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h4
                    className="text-lg font-semibold flex items-center gap-2"
                    style={{ color: "#ffffff" }}
                  >
                    <Calendar
                      className="w-5 h-5"
                      style={{ color: "#d9ab3f" }}
                    />
                    <span>
                      {new Date(selectedDate + "T00:00:00").toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </h4>
                  {selectedEvents.map((event) => {
                    const colors = categoryColor(event.category);
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 rounded-2xl transition-shadow hover:shadow-xl"
                        style={{
                          background: "rgba(30, 41, 59, 0.8)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(51, 65, 85, 0.5)",
                        }}
                      >
                        <div className="mb-3">
                          <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider"
                            style={{
                              background: colors.bg,
                              color: colors.text,
                            }}
                          >
                            {event.category}
                          </span>
                        </div>
                        <h5
                          className="text-xl font-bold mb-3"
                          style={{ color: "#ffffff" }}
                        >
                          {event.title}
                        </h5>
                        <div
                          className="flex flex-wrap gap-4 text-sm mb-4"
                          style={{ color: "#cbd5e1" }}
                        >
                          <span className="flex items-center gap-1.5">
                            <Clock
                              className="w-4 h-4"
                              style={{ color: "#d9ab3f" }}
                            />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin
                              className="w-4 h-4"
                              style={{ color: "#d9ab3f" }}
                            />
                            {event.location}
                          </span>
                        </div>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "#94a3b8" }}
                        >
                          {event.description}
                        </p>
                        <Link
                          to={`/event/${event.id}`}
                          className="inline-flex items-center mt-4 text-sm font-semibold transition-colors"
                          style={{ color: "#d9ab3f" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "#f0d78c")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "#d9ab3f")
                          }
                        >
                          Detail Event
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 rounded-2xl flex flex-col items-center justify-center text-center min-h-[320px]"
                  style={{
                    background: "rgba(30, 41, 59, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(51, 65, 85, 0.5)",
                  }}
                >
                  <Calendar
                    className="w-16 h-16 mb-5"
                    style={{ color: "#af9151" }}
                  />
                  <h4
                    className="text-xl font-semibold mb-2"
                    style={{ color: "#ffffff" }}
                  >
                    Pilih Tanggal Event
                  </h4>
                  <p className="text-sm max-w-xs" style={{ color: "#94a3b8" }}>
                    Klik tanggal bertanda emas pada kalender untuk menampilkan
                    informasi event.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA Lihat Semua Event */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            to="/kalender"
            className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              border: "2px solid #d9ab3f",
              color: "#d9ab3f",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#d9ab3f";
              e.currentTarget.style.color = "#0f172a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#d9ab3f";
            }}
          >
            Lihat Semua Event
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CalendarEvent;
