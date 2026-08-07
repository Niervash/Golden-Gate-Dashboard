import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Calendar,
  Loader2,
} from "lucide-react";
import { calendarEventsApi } from "../../../utils/api";

interface Event {
  id: number | string;
  title: string;
  isoDate: string;
  time: string;
  location: string;
  route: string;
  category: "Akademik" | "Kegiatan" | "Prestasi" | "PPDB" | "Libur";
  description: string;
}

type UiCategory = Event["category"];

const DAYS_OF_WEEK = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

const mapTipeToCategory = (tipe?: string): UiCategory => {
  const t = (tipe || "").toLowerCase();
  if (t === "libur") return "Libur";
  if (t === "kegiatan") return "Kegiatan";
  if (t === "ujian" || t === "akademik") return "Akademik";
  return "Kegiatan";
};

const formatTime = (start?: string | null, end?: string | null, allDay?: boolean) => {
  if (allDay || (!start && !end)) return "Sepanjang hari";
  if (start && end) return `${start} – ${end} WITA`;
  if (start) return `${start} WITA`;
  return "—";
};

const extractList = (res: any): any[] => {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  if (Array.isArray(d?.data)) return d.data;
  return [];
};

const mapApiEvent = (row: any): Event => ({
  id: row.id,
  title: row.judul || "Event",
  isoDate: String(row.tanggal_mulai || "").slice(0, 10),
  time: formatTime(row.waktu_mulai, row.waktu_selesai, !!row.is_all_day),
  location: row.lokasi || "Sekolah",
  route: "kalender",
  category: mapTipeToCategory(row.tipe),
  description: row.deskripsi || "Tidak ada deskripsi.",
});

const CalendarEvent: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await calendarEventsApi.getAll();
      const list = extractList(res).map(mapApiEvent).filter((e) => e.isoDate);
      setEvents(list);
    } catch {
      setError("Gagal memuat kalender event");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthName = new Date(currentYear, currentMonth).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

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
  }, [events]);

  const monthlyEvents = useMemo(
    () => events
      .filter((event) => {
        const date = new Date(`${event.isoDate}T00:00:00`);
        return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
      })
      .sort((a, b) => a.isoDate.localeCompare(b.isoDate)),
    [events, currentMonth, currentYear],
  );

  const isToday = (day: number) =>
    today.getFullYear() === currentYear &&
    today.getMonth() === currentMonth &&
    today.getDate() === day;

  const categoryColor = (cat: UiCategory) => {
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
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4"
            style={{ color: "#23305d" }}
          >
            Kalender <span style={{ color: "#d9ab3f" }}>Event</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 font-normal">
            Agenda kegiatan sekolah akan otomatis ditampilkan sesuai bulan yang dipilih.
          </p>
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-start"
          >
            <div className="rounded-2xl overflow-hidden shadow-md w-full max-w-md bg-white border border-slate-200 relative">
              {loading && (
                <div className="absolute inset-0 z-10 bg-white/70 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-[#23305d]" />
                </div>
              )}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ background: "#23305d" }}
              >
                <button
                  onClick={goToPreviousMonth}
                  className="p-2 rounded-full transition-all hover:bg-white/10"
                  style={{ color: "#d9ab3f" }}
                  type="button"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-bold capitalize tracking-wide text-white">
                  {monthName}
                </h3>
                <button
                  onClick={goToNextMonth}
                  className="p-2 rounded-full transition-all hover:bg-white/10"
                  style={{ color: "#d9ab3f" }}
                  type="button"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-7 text-center py-3 px-2 border-b border-slate-100">
                {DAYS_OF_WEEK.map((day) => (
                  <div
                    key={day}
                    className="text-xs font-bold uppercase tracking-wider py-1 text-slate-500"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-0.5 p-2">
                {calendarDays.map((day, index) => {
                  if (day === null)
                    return <div key={`empty-${index}`} className="aspect-square" />;

                  const isoDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const hasEvent = eventDates.has(isoDate);
                  const isTodayDate = isToday(day);

                  return (
                    <div
                      key={day}
                      className={`relative flex items-center justify-center aspect-square text-sm rounded-full transition-all duration-200 ${
                        hasEvent
                          ? "font-bold text-[#23305d]"
                          : "text-slate-400 cursor-default"
                      } ${
                        isTodayDate ? "ring-2 ring-[#23305d] ring-offset-1" : ""
                      }`}
                      style={{
                        color: hasEvent ? "#23305d" : "#94a3b8",
                      }}
                    >
                      <span>{day}</span>
                      {hasEvent && (
                        <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-[#d9ab3f]" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 xl:col-span-8">
            <AnimatePresence mode="wait">
              {monthlyEvents.length > 0 ? (
                <motion.div
                  key={`${currentYear}-${currentMonth}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h4
                    className="text-lg font-bold flex items-center gap-2"
                    style={{ color: "#23305d" }}
                  >
                    <Calendar className="w-5 h-5" style={{ color: "#d9ab3f" }} />
                    <span>
                      Agenda {new Date(currentYear, currentMonth).toLocaleDateString("id-ID", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </h4>
                  {monthlyEvents.map((event) => {
                    const colors = categoryColor(event.category);
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3"
                      >
                        <div>
                          <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider"
                            style={{ background: colors.bg, color: colors.text }}
                          >
                            {event.category}
                          </span>
                        </div>
                        <h5 className="text-xl font-bold" style={{ color: "#23305d" }}>
                          {event.title}
                        </h5>
                        <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            {new Date(`${event.isoDate}T00:00:00`).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                            })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-amber-500" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-emerald-500" />
                            {event.location}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {event.description}
                        </p>
                        <Link
                          to={`/${event.route}`}
                          className="inline-flex items-center mt-2 text-sm font-bold transition-all text-[#23305d] hover:text-[#d9ab3f]"
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
                  className="p-8 rounded-2xl flex flex-col items-center justify-center text-center min-h-[320px] bg-white border border-slate-200 shadow-sm"
                >
                  <Calendar className="w-14 h-14 mb-4 text-[#d9ab3f]" />
                  <h4 className="text-xl font-bold mb-2" style={{ color: "#23305d" }}>
                    {loading
                      ? "Memuat event..."
                      : events.length === 0
                        ? "Belum ada event"
                        : "Tidak Ada Agenda Bulan Ini"}
                  </h4>
                  <p className="text-sm text-slate-500 max-w-xs font-normal">
                    {events.length === 0 && !loading
                      ? "Admin belum menambahkan kegiatan di kalender. Event dikelola lewat menu Calendar Events."
                      : `Belum ada agenda sekolah untuk ${monthName}. Pilih bulan lain untuk melihat agenda yang tersedia.`}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            to="/kalender"
            className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-bold border transition-all"
            style={{
              borderColor: "#23305d",
              color: "#23305d",
              background: "#ffffff",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#23305d";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.color = "#23305d";
            }}
          >
            Lihat Semua Event Kalender
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CalendarEvent;
