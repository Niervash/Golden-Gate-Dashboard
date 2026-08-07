import React, { useState, useEffect, useRef, useCallback } from "react";
import type { ChangeEvent, FormEvent } from "react";
import * as XLSX from "xlsx";
import {
  Barcode,
  Tag,
  FolderOpen,
  MapPin,
  Pen,
  QrCode,
  Copy,
  RotateCw,
  PlusCircle,
  Undo,
  FileSpreadsheet,
  Trash2,
  X,
  CheckCircle,
  Info,
  AlertTriangle,
  List,
  Sparkles,
  Clock,
  Package,
  AlertCircle,
  FileText,
} from "lucide-react";
import { AdminLayout } from "../../../layouts";
import { inventoryApi } from "../../../utils/api";

// --- Tipe data ---
interface HistoryItem {
  id: string | number;
  code: string;
  name: string;
  category: string;
  location: string;
  quantity: number;
  status: string;
  notes: string;
  timestamp: string;
}

interface ToastState {
  show: boolean;
  message: string;
  icon: string;
  type?: "success" | "error" | "info" | "warning";
}

// --- Komponen Utama ---
const InventarisCode: React.FC = () => {
  // --- State ---
  const [itemName, setItemName] = useState<string>("");
  const [itemCategory, setItemCategory] = useState<string>("LNY");
  const [itemLocation, setItemLocation] = useState<string>("");
  const [itemPrefix, setItemPrefix] = useState<string>("SCIENC");
  const [quantity, setQuantity] = useState<number>(1);
  const [status, setStatus] = useState<string>("Tersedia");
  const [notes, setNotes] = useState<string>("");
  const [generatedCode, setGeneratedCode] = useState<string>("—");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    icon: "check-circle",
    type: "success",
  });
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const toastTimer = useRef<number | null>(null);

  // --- Toast ---
  const showToast = (
    message: string,
    icon: string = "check-circle",
    type: "success" | "error" | "info" | "warning" = "success",
  ) => {
    setToast({ show: true, message, icon, type });
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }
    toastTimer.current = window.setTimeout(() => {
      setToast({
        show: false,
        message: "",
        icon: "check-circle",
        type: "success",
      });
    }, 2500);
  };

  // --- Load history dari API ---
  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const res = await inventoryApi.getAll();
      const data = res.data?.data || res.data || [];
      setHistory(Array.isArray(data) ? data : []);
    } catch {
      showToast("Gagal memuat data inventaris", "alert-triangle", "error");
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => {
    updateGeneratedCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemPrefix, itemCategory, history]);

  // --- Helpers ---
  const formatDate = (): string => {
    const d = new Date();
    const y = d.getFullYear().toString().slice(2);
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}${m}${day}`;
  };

  const generateSequence = (): string => {
    const dateStr = formatDate();
    const prefix = (itemPrefix.trim() || "SCIENC").toUpperCase();
    const category = itemCategory;
    const pattern = new RegExp(`^${prefix}-${category}-${dateStr}-(\\d{3})$`);
    let maxSeq = 0;
    for (const item of history) {
      const match = item.code.match(pattern);
      if (match) {
        const seq = parseInt(match[1], 10);
        if (seq > maxSeq) maxSeq = seq;
      }
    }
    return String(maxSeq + 1).padStart(3, "0");
  };

  const generateCode = (): string => {
    const prefix = (itemPrefix.trim() || "SCIENC").toUpperCase();
    const category = itemCategory;
    const dateStr = formatDate();
    const seq = generateSequence();
    return `${prefix}-${category}-${dateStr}-${seq}`;
  };

  const updateGeneratedCode = (): string => {
    const code = generateCode();
    setGeneratedCode(code);
    return code;
  };

  // --- Copy ---
  const copyToClipboard = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showToast("Kode tersalin ke clipboard!", "copy", "success");
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      showToast("Kode tersalin ke clipboard!", "copy", "success");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (_) {
      showToast("Gagal menyalin kode", "alert-triangle", "error");
    }
    document.body.removeChild(textarea);
  };

  // --- History actions ---
  const deleteHistoryItem = async (id: string | number) => {
    if (!window.confirm("Yakin ingin menghapus item inventaris ini?")) return;
    try {
      await inventoryApi.delete(id);
      await fetchHistory();
      showToast("Item dihapus dari riwayat", "trash-2", "warning");
    } catch {
      showToast("Gagal menghapus item", "alert-triangle", "error");
    }
  };

  const clearHistory = async () => {
    if (history.length === 0) {
      showToast("Riwayat sudah kosong", "info", "info");
      return;
    }
    if (!window.confirm("Yakin ingin menghapus semua riwayat kode?")) return;
    try {
      await Promise.all(history.map((item) => inventoryApi.delete(item.id)));
      await fetchHistory();
      showToast("Semua riwayat dihapus", "trash-2", "warning");
    } catch {
      showToast("Gagal menghapus semua riwayat", "alert-triangle", "error");
      await fetchHistory();
    }
  };

  // --- Export Excel ---
  const exportToExcel = () => {
    if (history.length === 0) {
      showToast("Tidak ada data untuk diekspor", "alert-triangle", "warning");
      return;
    }
    const data = history.map((item) => ({
      Kode: item.code,
      "Nama Item": item.name,
      Kategori: item.category,
      Lokasi: item.location,
      Jumlah: item.quantity,
      Status: item.status,
      Keterangan: item.notes,
      Waktu: new Date(item.timestamp).toLocaleString("id-ID"),
    }));
    try {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Inventaris");
      const fileName = `Inventaris_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(wb, fileName);
      showToast(
        "Data berhasil diekspor ke Excel",
        "file-spreadsheet",
        "success",
      );
    } catch (_) {
      showToast("Gagal mengekspor data", "alert-triangle", "error");
    }
  };

  // --- Submit ---
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!itemName.trim()) {
      showToast(
        "Masukkan nama item terlebih dahulu!",
        "alert-triangle",
        "warning",
      );
      document.getElementById("itemNameInput")?.focus();
      return;
    }
    const code = updateGeneratedCode();
    const payload = {
      code,
      name: itemName.trim() || "Tanpa nama",
      category: itemCategory,
      location: itemLocation.trim() || "-",
      quantity: quantity || 1,
      status: status || "Tersedia",
      notes: notes.trim() || "-",
      timestamp: new Date().toISOString(),
    };
    try {
      setSubmitting(true);
      await inventoryApi.create(payload);
      await fetchHistory();
      showToast(`Kode ${code} berhasil disimpan!`, "check-circle", "success");
      // Reset form (kecuali prefix dan kategori)
      setItemName("");
      setItemLocation("");
      setQuantity(1);
      setStatus("Tersedia");
      setNotes("");
      setTimeout(() => {
        document.getElementById("itemNameInput")?.focus();
      }, 100);
    } catch {
      showToast("Gagal menyimpan inventaris", "alert-triangle", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // --- Reset ---
  const handleReset = () => {
    setItemName("");
    setItemLocation("");
    setItemPrefix("SCIENC");
    setItemCategory("LNY");
    setQuantity(1);
    setStatus("Tersedia");
    setNotes("");
    showToast("Form berhasil direset", "undo", "info");
  };

  // --- Helper render ikon toast ---
  const renderToastIcon = (): React.ReactNode => {
    const iconMap: Record<string, React.ReactNode> = {
      "check-circle": <CheckCircle size={20} className="flex-shrink-0" />,
      copy: <Copy size={20} className="flex-shrink-0" />,
      "trash-2": <Trash2 size={20} className="flex-shrink-0" />,
      info: <Info size={20} className="flex-shrink-0" />,
      "alert-triangle": <AlertTriangle size={20} className="flex-shrink-0" />,
      undo: <Undo size={20} className="flex-shrink-0" />,
      "file-spreadsheet": (
        <FileSpreadsheet size={20} className="flex-shrink-0" />
      ),
    };
    return (
      iconMap[toast.icon] || <CheckCircle size={20} className="flex-shrink-0" />
    );
  };

  // --- Render riwayat ---
  const renderHistoryRows = (): React.ReactNode => {
    if (loading) {
      return (
        <tr key="loading">
          <td colSpan={8} className="text-center text-gray-400 italic py-10">
            <div className="flex flex-col items-center gap-2">
              <RotateCw size={32} className="text-gray-300 animate-spin" />
              <span>Memuat data inventaris...</span>
            </div>
          </td>
        </tr>
      );
    }

    if (history.length === 0) {
      return (
        <tr key="empty">
          <td colSpan={8} className="text-center text-gray-400 italic py-10">
            <div className="flex flex-col items-center gap-2">
              <QrCode size={32} className="text-gray-300" />
              <span>Belum ada kode yang dibuat</span>
            </div>
          </td>
        </tr>
      );
    }

    const categoryLabels: Record<string, string> = {
      ELC: "Elektronik",
      FUR: "Furnitur",
      ATK: "Alat Tulis",
      MES: "Mesin",
      KMP: "Komputer",
      JLN: "Jaringan",
      LBN: "Laboratorium",
      KTR: "Kantor",
      GDG: "Gudang",
      LNY: "Lainnya",
    };

    const categoryColors: Record<string, string> = {
      ELC: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
      FUR: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
      ATK: "bg-green-500/20 text-green-300 border border-green-500/30",
      MES: "bg-red-500/20 text-red-300 border border-red-500/30",
      KMP: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
      JLN: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
      LBN: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
      KTR: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
      GDG: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
      LNY: "bg-gray-500/20 text-gray-300 border border-gray-500/30",
    };

    const statusColors: Record<string, string> = {
      Tersedia: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
      Dipinjam: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
      Rusak: "bg-red-500/20 text-red-300 border border-red-500/30",
      Dihapus: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
    };

    const sorted = [...history].reverse();
    return sorted.map((item) => {
      const catLabel = categoryLabels[item.category] || item.category;
      const catColor =
        categoryColors[item.category] || "bg-gray-100 text-gray-700";
      const statusColor =
        statusColors[item.status] || "bg-gray-100 text-gray-700";
      return (
        <tr
          key={item.id ?? item.code}
          className="hover:bg-white/5 border-b border-[#43424e]/50 transition-all duration-200 group"
        >
          <td className="py-3 px-4 font-mono font-semibold text-[#d9ab3f] text-sm">
            {item.code}
          </td>
          <td className="py-3 px-4 text-white font-medium">{item.name}</td>
          <td className="py-3 px-4">
            <span
              className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${catColor}`}
            >
              {catLabel}
            </span>
          </td>
          <td className="py-3 px-4 text-slate-300 text-sm">{item.location}</td>
          <td className="py-3 px-4 text-center font-semibold text-white">
            {item.quantity}
          </td>
          <td className="py-3 px-4">
            <span
              className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${statusColor}`}
            >
              {item.status}
            </span>
          </td>
          <td className="py-3 px-4 text-slate-400 text-sm max-w-xs truncate">
            {item.notes}
          </td>
          <td className="py-3 px-4">
            <button
              onClick={() => deleteHistoryItem(item.id)}
              className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
              title="Hapus item ini"
            >
              <X size={16} />
            </button>
          </td>
        </tr>
      );
    });
  };

  // Toast background color based on type
  const toastBgColor = {
    success: "bg-emerald-900",
    error: "bg-red-900",
    warning: "bg-amber-800",
    info: "bg-blue-900",
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex items-start justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl">
          {/* Toast Notification */}
          {toast.show && (
            <div
              className={`fixed bottom-6 left-1/2 -translate-x-1/2 ${
                toastBgColor[toast.type || "success"]
              } text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 z-50 max-w-[90%] text-sm sm:text-base animate-fade-in-up backdrop-blur-sm border border-white/10`}
            >
              {renderToastIcon()}
              <span className="font-medium">{toast.message}</span>
            </div>
          )}

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
            {/* Header dengan tema warna sekolah #23305d & #d9ab3f */}
            <div className="bg-[#23305d] px-6 py-8 sm:px-8 sm:py-10 border-b border-amber-500/20 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#d9ab3f]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="bg-[#d9ab3f]/20 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-[#d9ab3f]/30 flex-shrink-0">
                    <Barcode size={34} className="text-[#d9ab3f]" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                      Generator <span className="text-[#d9ab3f]">Kode Inventaris</span> Sarpras
                    </h1>
                    <p className="text-slate-300 text-xs sm:text-sm mt-1 flex flex-wrap items-center gap-2">
                      <span>Format Penamaan:</span>
                      <span className="bg-white/10 text-[#d9ab3f] px-3 py-0.5 rounded-full font-mono text-xs border border-[#d9ab3f]/30 font-semibold">
                        AWALAN - KATEGORI - TANGGAL - URUTAN
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <div className="flex items-center gap-2 text-white text-xs font-semibold">
                    <Sparkles size={16} className="text-[#d9ab3f]" />
                    <span>Auto-Generated Code</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Body Form & Controls */}
            <div className="p-6 sm:p-8 lg:p-10 bg-white">
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  {/* Nama Item */}
                  <div className="space-y-2">
                    <label
                      htmlFor="itemNameInput"
                      className="block text-xs font-bold uppercase tracking-wider text-[#23305d]"
                    >
                      <Tag size={14} className="inline text-[#d9ab3f] mr-1.5" />
                      Nama Item / Aset
                    </label>
                    <input
                      id="itemNameInput"
                      type="text"
                      placeholder="Contoh: Laptop Asus ROG Strix / Proyektor Epson"
                      value={itemName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setItemName(e.target.value)
                      }
                      className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:border-[#d9ab3f] focus:bg-white focus:ring-2 focus:ring-[#d9ab3f]/30 transition-all text-sm font-medium placeholder:text-slate-400"
                      required
                    />
                  </div>

                  {/* Kategori */}
                  <div className="space-y-2">
                    <label
                      htmlFor="itemCategory"
                      className="block text-xs font-bold uppercase tracking-wider text-[#23305d]"
                    >
                      <FolderOpen
                        size={14}
                        className="inline text-[#d9ab3f] mr-1.5"
                      />
                      Kategori Aset
                    </label>
                    <select
                      id="itemCategory"
                      value={itemCategory}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        setItemCategory(e.target.value)
                      }
                      className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:border-[#d9ab3f] focus:bg-white focus:ring-2 focus:ring-[#d9ab3f]/30 transition-all text-sm font-semibold text-[#23305d] cursor-pointer"
                    >
                      <option value="ELC">📱 Elektronik (ELC)</option>
                      <option value="FUR">🪑 Furnitur (FUR)</option>
                      <option value="ATK">✏️ Alat Tulis & Kantor (ATK)</option>
                      <option value="MES">⚙️ Mesin & Peratan (MES)</option>
                      <option value="KMP">💻 Komputer & IT (KMP)</option>
                      <option value="JLN">🌐 Perangkat Jaringan (JLN)</option>
                      <option value="LBN">🔬 Peralatan Lab Science (LBN)</option>
                      <option value="KTR">🏢 Inventaris Kantor (KTR)</option>
                      <option value="GDG">📦 Stok Gudang (GDG)</option>
                      <option value="LNY">📌 Lainnya (LNY)</option>
                    </select>
                  </div>

                  {/* Lokasi */}
                  <div className="space-y-2">
                    <label
                      htmlFor="itemLocation"
                      className="block text-xs font-bold uppercase tracking-wider text-[#23305d]"
                    >
                      <MapPin size={14} className="inline text-[#d9ab3f] mr-1.5" />
                      Lokasi Penyimpanan
                    </label>
                    <input
                      type="text"
                      id="itemLocation"
                      placeholder="Contoh: Lab Komputer 1 / Ruang Guru TU"
                      value={itemLocation}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setItemLocation(e.target.value)
                      }
                      className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:border-[#d9ab3f] focus:bg-white focus:ring-2 focus:ring-[#d9ab3f]/30 transition-all text-sm font-medium placeholder:text-slate-400"
                    />
                  </div>

                  {/* Awalan Kode */}
                  <div className="space-y-2">
                    <label
                      htmlFor="itemPrefix"
                      className="block text-xs font-bold uppercase tracking-wider text-[#23305d]"
                    >
                      <Pen size={14} className="inline text-[#d9ab3f] mr-1.5" />
                      Awalan Kode Unit (Prefix)
                    </label>
                    <input
                      type="text"
                      id="itemPrefix"
                      placeholder="SCIENC / GGS"
                      value={itemPrefix}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setItemPrefix(
                          e.target.value
                            .toUpperCase()
                            .replace(/[^A-Z0-9]/g, ""),
                        )
                      }
                      maxLength={10}
                      className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:border-[#d9ab3f] focus:bg-white focus:ring-2 focus:ring-[#d9ab3f]/30 transition-all text-sm font-mono uppercase font-bold text-[#23305d] placeholder:text-slate-400"
                    />
                  </div>

                  {/* Jumlah */}
                  <div className="space-y-2">
                    <label
                      htmlFor="quantity"
                      className="block text-xs font-bold uppercase tracking-wider text-[#23305d]"
                    >
                      <Package
                        size={14}
                        className="inline text-[#d9ab3f] mr-1.5"
                      />
                      Jumlah Unit
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      value={quantity}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:border-[#d9ab3f] focus:bg-white focus:ring-2 focus:ring-[#d9ab3f]/30 transition-all text-sm font-semibold"
                    />
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <label
                      htmlFor="status"
                      className="block text-xs font-bold uppercase tracking-wider text-[#23305d]"
                    >
                      <AlertCircle
                        size={14}
                        className="inline text-[#d9ab3f] mr-1.5"
                      />
                      Status Keberadaan
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        setStatus(e.target.value)
                      }
                      className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:border-[#d9ab3f] focus:bg-white focus:ring-2 focus:ring-[#d9ab3f]/30 transition-all text-sm font-semibold text-[#23305d] cursor-pointer"
                    >
                      <option value="Tersedia">✅ Tersedia di Tempat</option>
                      <option value="Dipinjam">📤 Sedang Dipinjam</option>
                      <option value="Rusak">⚠️ Perlu Perbaikan / Rusak</option>
                      <option value="Dihapus">🗑️ Dihapuskan</option>
                    </select>
                  </div>

                  {/* Keterangan */}
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <label
                      htmlFor="notes"
                      className="block text-xs font-bold uppercase tracking-wider text-[#23305d]"
                    >
                      <FileText
                        size={14}
                        className="inline text-[#d9ab3f] mr-1.5"
                      />
                      Keterangan Tambahan
                    </label>
                    <textarea
                      id="notes"
                      rows={2}
                      placeholder="Catatan spesifikasi atau kondisi barang (opsional)..."
                      value={notes}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setNotes(e.target.value)
                      }
                      className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:border-[#d9ab3f] focus:bg-white focus:ring-2 focus:ring-[#d9ab3f]/30 transition-all text-sm placeholder:text-slate-400 resize-y min-h-[60px]"
                    />
                  </div>
                </div>

                {/* Kode Hasil Generator Box */}
                <div className="mt-8 p-6 bg-gradient-to-r from-slate-900 via-[#23305d] to-slate-900 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg text-white">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#d9ab3f]/20 p-3 rounded-xl border border-[#d9ab3f]/40">
                      <QrCode size={26} className="text-[#d9ab3f]" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">
                        Hasil Kode Barcode / Inventaris:
                      </span>
                      <p className="text-xs text-slate-300">Siap dicetak atau dicatat dalam sistem sarpras</p>
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-mono font-black bg-white/10 px-6 py-2.5 rounded-xl text-[#d9ab3f] tracking-widest inline-block border border-amber-400/30 shadow-inner">
                      {generatedCode}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(generatedCode)}
                      className={`p-3 rounded-xl transition-all font-bold ${
                        isCopied
                          ? "bg-emerald-600 text-white"
                          : "bg-[#d9ab3f] hover:bg-amber-400 text-[#23305d]"
                      }`}
                      title="Salin kode"
                    >
                      {isCopied ? <CheckCircle size={20} /> : <Copy size={20} />}
                    </button>
                    <button
                      type="button"
                      onClick={updateGeneratedCode}
                      className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all text-white"
                      title="Refresh kode"
                    >
                      <RotateCw size={20} />
                    </button>
                  </div>
                </div>

                {/* Tombol Aksi */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-[#23305d] hover:bg-[#1c284c] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm border border-amber-500/20"
                  >
                    <PlusCircle size={18} className="text-[#d9ab3f]" />
                    {submitting ? "Menyimpan..." : "Generate & Simpan Ke Riwayat"}
                  </button>
                  <button
                    type="button"
                    onClick={updateGeneratedCode}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <RotateCw size={18} />
                    Generate Ulang Kode
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Undo size={18} />
                    Reset Form
                  </button>
                </div>
              </form>

              {/* Riwayat Kode Inventaris */}
              <div className="mt-10 pt-6 border-t border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h3 className="text-lg font-extrabold text-[#23305d] flex items-center gap-2">
                    <List size={20} className="text-[#d9ab3f]" />
                    Riwayat Kode Inventaris Dibuat
                  </h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700">
                      <Clock size={14} className="text-amber-600" />
                      <span>{history.length} Item Tersimpan</span>
                    </div>
                    <button
                      type="button"
                      onClick={exportToExcel}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2 shadow-xs"
                    >
                      <FileSpreadsheet size={16} />
                      Export Rekap Excel
                    </button>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="max-h-80 overflow-y-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-[#23305d] text-white sticky top-0 z-10 text-xs font-bold uppercase tracking-wider">
                        <tr>
                          <th className="py-3.5 px-4 text-[#d9ab3f]">Kode</th>
                          <th className="py-3.5 px-4">Nama Item</th>
                          <th className="py-3.5 px-4">Kategori</th>
                          <th className="py-3.5 px-4">Lokasi</th>
                          <th className="py-3.5 px-4 text-center">Jml</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4">Keterangan</th>
                          <th className="py-3.5 px-4 w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {renderHistoryRows()}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={clearHistory}
                    className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl border border-red-200 transition-all flex items-center gap-1.5"
                  >
                    <Trash2 size={14} />
                    Hapus Semua Riwayat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </AdminLayout>
  );
};

export default InventarisCode;
