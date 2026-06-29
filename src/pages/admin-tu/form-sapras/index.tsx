import React, { useState, useEffect, useRef } from "react";
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
  Printer,
  Download,
  Clock,
  ChevronRight,
} from "lucide-react";
import { AdminLayout } from "../../../layouts";

// --- Tipe data ---
interface HistoryItem {
  code: string;
  name: string;
  category: string;
  location: string;
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
  const [generatedCode, setGeneratedCode] = useState<string>("—");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    icon: "check-circle",
    type: "success",
  });
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const toastTimer = useRef<number | null>(null);

  // --- Load history dari localStorage ---
  useEffect(() => {
    try {
      const raw = localStorage.getItem("inventoryHistory");
      if (raw) {
        const parsed: HistoryItem[] = JSON.parse(raw);
        if (Array.isArray(parsed)) setHistory(parsed);
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("inventoryHistory", JSON.stringify(history));
    } catch (_) {}
  }, [history]);

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
  const addToHistory = (
    code: string,
    name: string,
    category: string,
    location: string,
  ) => {
    const newEntry: HistoryItem = {
      code,
      name: name.trim() || "Tanpa nama",
      category,
      location: location.trim() || "-",
      timestamp: new Date().toISOString(),
    };
    setHistory((prev) => [...prev, newEntry]);
  };

  const deleteHistoryItem = (code: string) => {
    setHistory((prev) => prev.filter((item) => item.code !== code));
    showToast("Item dihapus dari riwayat", "trash-2", "warning");
  };

  const clearHistory = () => {
    if (history.length === 0) {
      showToast("Riwayat sudah kosong", "info", "info");
      return;
    }
    if (window.confirm("Yakin ingin menghapus semua riwayat kode?")) {
      setHistory([]);
      showToast("Semua riwayat dihapus", "trash-2", "warning");
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
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    addToHistory(code, itemName, itemCategory, itemLocation);
    showToast(`Kode ${code} berhasil disimpan!`, "check-circle", "success");
    setItemName("");
    setTimeout(() => {
      document.getElementById("itemNameInput")?.focus();
    }, 100);
  };

  // --- Reset ---
  const handleReset = () => {
    setItemName("");
    setItemLocation("");
    setItemPrefix("SCIENC");
    setItemCategory("LNY");
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
    if (history.length === 0) {
      return (
        <tr key="empty">
          <td colSpan={4} className="text-center text-gray-400 italic py-10">
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
      ELC: "bg-blue-100 text-blue-700",
      FUR: "bg-amber-100 text-amber-700",
      ATK: "bg-green-100 text-green-700",
      MES: "bg-red-100 text-red-700",
      KMP: "bg-purple-100 text-purple-700",
      JLN: "bg-cyan-100 text-cyan-700",
      LBN: "bg-indigo-100 text-indigo-700",
      KTR: "bg-yellow-100 text-yellow-700",
      GDG: "bg-orange-100 text-orange-700",
      LNY: "bg-gray-100 text-gray-700",
    };

    const sorted = [...history].reverse();
    return sorted.map((item) => {
      const catLabel = categoryLabels[item.category] || item.category;
      const catColor =
        categoryColors[item.category] || "bg-gray-100 text-gray-700";
      return (
        <tr
          key={item.code}
          className="hover:bg-blue-50/50 transition-all duration-200 group"
        >
          <td className="py-3 px-4 font-mono font-semibold text-blue-700 text-sm">
            {item.code}
          </td>
          <td className="py-3 px-4 text-gray-800">{item.name}</td>
          <td className="py-3 px-4">
            <span
              className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${catColor}`}
            >
              {catLabel}
            </span>
          </td>
          <td className="py-3 px-4">
            <button
              onClick={() => deleteHistoryItem(item.code)}
              className="text-gray-300 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-start justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl">
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
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden">
            {/* Header dengan gradien */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-8 sm:px-8 sm:py-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="bg-white/20 backdrop-blur-sm p-3.5 rounded-2xl shadow-lg flex-shrink-0">
                  <Barcode size={32} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    Generator <span className="text-yellow-200">Kode</span>{" "}
                    Inventaris
                  </h1>
                  <p className="text-blue-100/90 text-sm sm:text-base mt-1 flex flex-wrap items-center gap-2">
                    <span>Format:</span>
                    <span className="bg-white/10 px-3 py-0.5 rounded-full font-mono text-xs sm:text-sm">
                      AWALAN-KATEGORI-TANGGAL-URUTAN
                    </span>
                    <span className="hidden sm:inline text-blue-200/60">•</span>
                    <span className="text-blue-100/80 text-xs sm:text-sm">
                      Contoh:{" "}
                      <span className="font-mono font-semibold">
                        SCIENC-LNY-260629-002
                      </span>
                    </span>
                  </p>
                </div>
                <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm">
                    <Sparkles size={16} className="text-yellow-300" />
                    <span className="font-medium">Auto-Generate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 lg:p-10">
              {/* Form */}
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="itemName"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      <Tag size={16} className="inline text-blue-600 mr-2" />
                      Nama Item
                    </label>
                    <input
                      id="itemNameInput"
                      type="text"
                      placeholder="Contoh: Laptop Dell XPS 13"
                      value={itemName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setItemName(e.target.value)
                      }
                      className="w-full px-4 py-3.5 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 text-base placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="itemCategory"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      <FolderOpen
                        size={16}
                        className="inline text-blue-600 mr-2"
                      />
                      Kategori
                    </label>
                    <select
                      id="itemCategory"
                      value={itemCategory}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        setItemCategory(e.target.value)
                      }
                      className="w-full px-4 py-3.5 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 text-base appearance-none cursor-pointer"
                    >
                      <option value="ELC">📱 Elektronik</option>
                      <option value="FUR">🪑 Furnitur</option>
                      <option value="ATK">✏️ Alat Tulis</option>
                      <option value="MES">⚙️ Mesin</option>
                      <option value="KMP">💻 Komputer</option>
                      <option value="JLN">🌐 Jaringan</option>
                      <option value="LBN">🔬 Laboratorium</option>
                      <option value="KTR">🏢 Kantor</option>
                      <option value="GDG">📦 Gudang</option>
                      <option value="LNY" selected>
                        📌 Lainnya (LNY)
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="itemLocation"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      <MapPin size={16} className="inline text-blue-600 mr-2" />
                      Lokasi
                    </label>
                    <input
                      type="text"
                      id="itemLocation"
                      placeholder="Contoh: Ruang 3, Lantai 2"
                      value={itemLocation}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setItemLocation(e.target.value)
                      }
                      className="w-full px-4 py-3.5 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 text-base placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="itemPrefix"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      <Pen size={16} className="inline text-blue-600 mr-2" />
                      Awalan Kode
                    </label>
                    <input
                      type="text"
                      id="itemPrefix"
                      placeholder="SCIENC"
                      value={itemPrefix}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setItemPrefix(
                          e.target.value
                            .toUpperCase()
                            .replace(/[^A-Z0-9]/g, ""),
                        )
                      }
                      maxLength={10}
                      className="w-full px-4 py-3.5 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 text-base uppercase font-mono placeholder:font-sans placeholder:uppercase placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Code Display */}
                <div className="mt-6 p-4 sm:p-5 bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/80 rounded-2xl border-2 border-blue-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600/10 p-2 rounded-xl">
                      <QrCode size={20} className="text-blue-600" />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Kode Generated
                    </span>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold bg-white/60 backdrop-blur-sm px-5 py-2 rounded-xl text-gray-800 tracking-wider inline-block shadow-sm border border-white/80">
                      {generatedCode}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(generatedCode)}
                      className={`p-3 rounded-xl transition-all duration-200 ${
                        isCopied
                          ? "bg-emerald-500 text-white"
                          : "bg-white/70 hover:bg-blue-100/70 text-gray-700 hover:text-blue-700"
                      } shadow-sm hover:shadow-md`}
                      title="Salin kode"
                    >
                      {isCopied ? (
                        <CheckCircle size={20} />
                      ) : (
                        <Copy size={20} />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={updateGeneratedCode}
                      className="p-3 bg-white/70 hover:bg-blue-100/70 rounded-xl transition-all duration-200 text-gray-700 hover:text-blue-700 shadow-sm hover:shadow-md"
                      title="Refresh kode"
                    >
                      <RotateCw size={20} />
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 text-base"
                  >
                    <PlusCircle size={20} />
                    Generate & Simpan
                  </button>
                  <button
                    type="button"
                    onClick={updateGeneratedCode}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-base"
                  >
                    <RotateCw size={20} />
                    Generate Ulang
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-base"
                  >
                    <Undo size={20} />
                    Reset
                  </button>
                </div>
              </form>

              {/* History */}
              <div className="mt-10 pt-6 border-t-2 border-gray-200/70">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2.5">
                    <div className="bg-blue-600/10 p-2 rounded-xl">
                      <List size={18} className="text-blue-600" />
                    </div>
                    Riwayat Kode
                  </h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5 bg-gray-100/80 px-3.5 py-1.5 rounded-full">
                      <Clock size={14} className="text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        {history.length} item
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={exportToExcel}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <FileSpreadsheet size={18} />
                      <span className="hidden sm:inline">Export Excel</span>
                      <span className="sm:hidden">Excel</span>
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50/80 sticky top-0 z-10 backdrop-blur-sm">
                        <tr>
                          <th className="py-3.5 px-4 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                            Kode
                          </th>
                          <th className="py-3.5 px-4 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                            Item
                          </th>
                          <th className="py-3.5 px-4 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                            Kategori
                          </th>
                          <th className="py-3.5 px-4 border-b border-gray-200 w-12"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100/50">
                        {renderHistoryRows()}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={clearHistory}
                    className="text-sm text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Hapus semua
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-xs text-gray-400/80">
            <p>Data tersimpan secara lokal di browser Anda</p>
          </div>
        </div>
      </div>

      {/* Animasi & Scrollbar Styles */}
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

        /* Custom scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </AdminLayout>
  );
};

export default InventarisCode;
