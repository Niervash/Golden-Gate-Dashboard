import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminLayout } from "../../../layouts";
import {
  BookOpen,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Search,
  CheckCircle,
  Clock,
  Star,
  FileText,
  X,
  MessageSquare,
  Shield,
} from "lucide-react";
import { booksApi, readingLogsApi } from "../../../utils/api";

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

const AdminLibraryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"books" | "logs">("books");
  const [books, setBooks] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<any | null>(null);
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    category: "Umum",
    drive_url: "",
    cover_url: "",
    description: "",
  });

  const [previewBook, setPreviewBook] = useState<any | null>(null);

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [logStatus, setLogStatus] = useState("selesai");

  const loadData = async () => {
    setLoading(true);
    try {
      const [booksRes, logsRes] = await Promise.all([
        booksApi.getAll().catch(() => ({ data: [] })),
        readingLogsApi.getAll().catch(() => ({ data: [] })),
      ]);
      const bList = Array.isArray(booksRes.data) ? booksRes.data : booksRes.data?.data || [];
      const lList = Array.isArray(logsRes.data) ? logsRes.data : logsRes.data?.data || [];
      setBooks(bList);
      setLogs(lList);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await booksApi.update(editingBook.id, bookForm);
      } else {
        await booksApi.create(bookForm);
      }
      setIsBookModalOpen(false);
      setEditingBook(null);
      setBookForm({ title: "", author: "", category: "Umum", drive_url: "", cover_url: "", description: "" });
      loadData();
    } catch (err) {
      alert("Gagal menyimpan data buku");
    }
  };

  const handleDeleteBook = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus buku ini dari drive perpustakaan?")) {
      try {
        await booksApi.delete(id);
        loadData();
      } catch (err) {
        alert("Gagal menghapus buku");
      }
    }
  };

  const handleOpenFeedback = (log: any) => {
    setSelectedLog(log);
    setFeedbackText(log.feedback || "");
    setLogStatus(log.status || "selesai");
    setIsFeedbackModalOpen(true);
  };

  const handleSaveFeedback = async () => {
    if (!selectedLog) return;
    try {
      await readingLogsApi.update(selectedLog.id, {
        feedback: feedbackText,
        status: logStatus,
      });
      setIsFeedbackModalOpen(false);
      setSelectedLog(null);
      loadData();
    } catch (err) {
      alert("Gagal menyimpan feedback");
    }
  };

  const filteredBooks = books.filter(
    (b) =>
      b.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLogs = logs.filter(
    (l) =>
      l.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.student_nis?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.book_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12">
        {/* Header Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#23305d] via-[#1c284c] to-[#151e3d] text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl border border-amber-500/20">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-[#d9ab3f]/20 text-[#d9ab3f] border border-[#d9ab3f]/30 text-xs font-bold uppercase">
                Perpustakaan & Summary Siswa
              </span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1">E-Library Google Drive Maintenance</h1>
            <p className="text-xs text-amber-200/80 mt-0.5">
              Kelola koleksi buku drive, tinjau ringkasan (summary) yang ditulis siswa, & berikan feedback resmi (Kepala Sekolah & TU).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditingBook(null);
                setBookForm({ title: "", author: "", category: "Umum", drive_url: "", cover_url: "", description: "" });
                setIsBookModalOpen(true);
              }}
              className="px-4 py-2.5 bg-[#d9ab3f] hover:bg-amber-500 text-[#23305d] font-bold text-xs rounded-2xl flex items-center gap-2 transition-all shadow-md"
            >
              <Plus size={16} /> Tambah Buku Drive
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab("books")}
            className={`px-6 py-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === "books"
                ? "border-[#23305d] text-[#23305d]"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <BookOpen size={18} /> Koleksi Buku Drive ({books.length})
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`px-6 py-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === "logs"
                ? "border-[#23305d] text-[#23305d]"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <FileText size={18} /> Summary & Reading Logs Siswa ({logs.length})
          </button>
        </div>

        {/* Search Filter */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={activeTab === "books" ? "Cari judul, penulis, kategori..." : "Cari nama siswa, NIS, judul buku..."}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#d9ab3f] focus:outline-none shadow-xs"
          />
        </div>

        {/* TAB 1: BOOKS COLLECTION */}
        {activeTab === "books" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredBooks.length === 0 ? (
              <div className="col-span-3 text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-400 text-sm">
                Belum ada data buku drive yang tersimpan.
              </div>
            ) : (
              filteredBooks.map((b) => (
                <div key={b.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#d9ab3f] bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                      {b.category || "Umum"}
                    </span>
                    <h3 className="font-black text-base text-[#23305d] leading-snug">{b.title}</h3>
                    <p className="text-xs text-slate-500 font-medium">Penulis: {b.author || "—"}</p>
                    <p className="text-xs text-slate-600 line-clamp-3 mt-2">{b.description || "Tidak ada deskripsi."}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewBook(b)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
                    >
                      <ExternalLink size={14} /> Preview PDF
                    </button>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingBook(b);
                          setBookForm({
                            title: b.title || "",
                            author: b.author || "",
                            category: b.category || "Umum",
                            drive_url: b.drive_url || "",
                            cover_url: b.cover_url || "",
                            description: b.description || "",
                          });
                          setIsBookModalOpen(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBook(b.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: READING LOGS & SUMMARIES */}
        {activeTab === "logs" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200 text-[#23305d] uppercase font-black tracking-wider text-[11px]">
                  <tr>
                    <th className="p-4">Siswa</th>
                    <th className="p-4">Buku</th>
                    <th className="p-4">Tanggal Pinjam</th>
                    <th className="p-4">Summary Hasil Bacaan</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4">Status & Feedback</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-slate-400">
                        Belum ada aktivitas membaca & summary dari siswa.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-[#23305d]">{log.student_name}</p>
                          <p className="text-[11px] text-slate-400">NIS: {log.student_nis} • Kelas {log.student_class}</p>
                        </td>
                        <td className="p-4 font-bold text-slate-800">{log.book_title}</td>
                        <td className="p-4 text-slate-500">{log.borrow_date}</td>
                        <td className="p-4 max-w-xs">
                          {log.summary ? (
                            <p className="line-clamp-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200 italic">
                              "{log.summary}"
                            </p>
                          ) : (
                            <span className="text-slate-400 italic">Belum mengisi summary</span>
                          )}
                        </td>
                        <td className="p-4 font-bold text-amber-600">{log.rating || 5} ⭐</td>
                        <td className="p-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              log.status === "selesai" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {log.status === "selesai" ? "Selesai Dibaca" : "Sedang Dibaca"}
                          </span>
                          {log.feedback && (
                            <p className="text-[11px] text-slate-500 mt-1 font-normal line-clamp-2">
                              Feedback: {log.feedback}
                            </p>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleOpenFeedback(log)}
                            className="px-3 py-1.5 bg-[#23305d] hover:bg-[#1c284c] text-white font-bold text-[11px] rounded-xl flex items-center gap-1.5 mx-auto"
                          >
                            <MessageSquare size={14} /> Beri Catatan
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal Form Tambah/Edit Buku Drive */}
        <AnimatePresence>
          {isBookModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl p-6 space-y-4"
              >
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-black text-lg text-[#23305d]">
                    {editingBook ? "Edit Buku Google Drive" : "Tambah Buku Google Drive Baru"}
                  </h3>
                  <button type="button" onClick={() => setIsBookModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSaveBook} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Judul Buku *</label>
                    <input
                      type="text"
                      required
                      value={bookForm.title}
                      onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#d9ab3f] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Penulis</label>
                      <input
                        type="text"
                        value={bookForm.author}
                        onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
                        className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#d9ab3f] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Kategori</label>
                      <input
                        type="text"
                        value={bookForm.category}
                        onChange={(e) => setBookForm({ ...bookForm, category: e.target.value })}
                        className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#d9ab3f] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Google Drive Share / Preview Link *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://drive.google.com/file/d/FILE_ID/preview"
                      value={bookForm.drive_url}
                      onChange={(e) => setBookForm({ ...bookForm, drive_url: e.target.value })}
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#d9ab3f] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Deskripsi Singkat</label>
                    <textarea
                      rows={3}
                      value={bookForm.description}
                      onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#d9ab3f] focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsBookModalOpen(false)}
                      className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-[#23305d] hover:bg-[#1c284c] text-white font-bold text-xs rounded-xl shadow-md"
                    >
                      Simpan Buku
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal Feedback & Maintenance Summary */}
        <AnimatePresence>
          {isFeedbackModalOpen && selectedLog && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl p-6 space-y-4"
              >
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-black text-base text-[#23305d]">Feedback & Status Summary</h3>
                  <button type="button" onClick={() => setIsFeedbackModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <p className="font-bold text-[#23305d]">{selectedLog.student_name} ({selectedLog.student_nis})</p>
                    <p className="text-slate-500">Buku: {selectedLog.book_title}</p>
                    {selectedLog.summary && (
                      <p className="mt-2 text-slate-700 italic bg-white p-2 rounded-xl border border-slate-200">
                        "{selectedLog.summary}"
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Status Verifikasi Peminjaman</label>
                    <select
                      value={logStatus}
                      onChange={(e) => setLogStatus(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                    >
                      <option value="sedang_dibaca">Sedang Dibaca</option>
                      <option value="selesai">Selesai / Terverifikasi</option>
                      <option value="dikembalikan">Buku Dikembalikan</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Catatan / Feedback Guru & Kepsek</label>
                    <textarea
                      rows={4}
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Tuliskan apresiasi, koreksi, atau masukkan untuk siswa..."
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#d9ab3f] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFeedbackModalOpen(false)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveFeedback}
                    className="flex-1 py-2.5 bg-[#23305d] hover:bg-[#1c284c] text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Simpan Feedback
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal Preview Google Drive PDF */}
        <AnimatePresence>
          {previewBook && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden shadow-2xl"
              >
                <div className="bg-[#23305d] text-white p-4 flex justify-between items-center">
                  <h3 className="font-black text-sm text-white">Preview PDF: {previewBook.title}</h3>
                  <button type="button" onClick={() => setPreviewBook(null)} className="text-white hover:text-amber-300">
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 bg-slate-900">
                  <iframe
                    src={getDriveEmbedUrl(previewBook.drive_url)}
                    className="w-full h-full border-0"
                    title={previewBook.title}
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AdminLibraryPage;
