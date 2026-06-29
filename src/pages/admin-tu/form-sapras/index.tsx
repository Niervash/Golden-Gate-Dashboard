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
  });

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
  const showToast = (message: string, icon: string = "check-circle") => {
    setToast({ show: true, message, icon });
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }
    toastTimer.current = window.setTimeout(() => {
      setToast({ show: false, message: "", icon: "check-circle" });
    }, 2200);
  };

  // --- Copy ---
  const copyToClipboard = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => showToast("Kode tersalin!", "copy"))
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
      showToast("Kode tersalin!", "copy");
    } catch (_) {
      showToast("Gagal menyalin", "alert-triangle");
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
    showToast("Item dihapus dari riwayat", "trash-2");
  };

  const clearHistory = () => {
    if (history.length === 0) {
      showToast("Riwayat kosong", "info");
      return;
    }
    if (window.confirm("Hapus semua riwayat kode?")) {
      setHistory([]);
      showToast("Semua riwayat dihapus", "trash-2");
    }
  };

  // --- Export Excel ---
  const exportToExcel = () => {
    if (history.length === 0) {
      showToast("Tidak ada data untuk diekspor", "alert-triangle");
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
      showToast("Data berhasil diekspor", "file-spreadsheet");
    } catch (_) {
      showToast("Gagal ekspor data", "alert-triangle");
    }
  };

  // --- Submit ---
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!itemName.trim()) {
      showToast("Masukkan nama item!", "alert-triangle");
      return;
    }
    const code = updateGeneratedCode();
    addToHistory(code, itemName, itemCategory, itemLocation);
    showToast(`Kode ${code} disimpan!`, "check-circle");
    setItemName("");
    document.getElementById("itemNameInput")?.focus();
  };

  // --- Reset ---
  const handleReset = () => {
    setItemName("");
    setItemLocation("");
    setItemPrefix("SCIENC");
    setItemCategory("LNY");
    showToast("Form direset", "undo");
  };

  // --- Helper render ikon toast ---
  const renderToastIcon = (): React.ReactNode => {
    switch (toast.icon) {
      case "check-circle":
        return <CheckCircle size={20} className="flex-shrink-0" />;
      case "copy":
        return <Copy size={20} className="flex-shrink-0" />;
      case "trash-2":
        return <Trash2 size={20} className="flex-shrink-0" />;
      case "info":
        return <Info size={20} className="flex-shrink-0" />;
      case "alert-triangle":
        return <AlertTriangle size={20} className="flex-shrink-0" />;
      case "undo":
        return <Undo size={20} className="flex-shrink-0" />;
      case "file-spreadsheet":
        return <FileSpreadsheet size={20} className="flex-shrink-0" />;
      default:
        return <CheckCircle size={20} className="flex-shrink-0" />;
    }
  };

  // --- Render riwayat ---
  const renderHistoryRows = (): React.ReactNode => {
    if (history.length === 0) {
      return (
        <tr key="empty">
          <td colSpan={4} className="text-center text-gray-400 italic py-8">
            Belum ada kode yang dibuat
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

    const sorted = [...history].reverse();
    return sorted.map((item) => {
      const catLabel = categoryLabels[item.category] || item.category;
      return (
        <tr key={item.code} className="hover:bg-blue-50 transition">
          <td className="py-3 px-4 font-bold">{item.code}</td>
          <td className="py-3 px-4">{item.name}</td>
          <td className="py-3 px-4">
            <span className="inline-block bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
              {catLabel}
            </span>
          </td>
          <td className="py-3 px-4">
            <button
              onClick={() => deleteHistoryItem(item.code)}
              className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
              title="Hapus item ini"
            >
              <X size={18} />
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8 transition-all">
          {/* Toast Notification */}
          {toast.show && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-blue-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 z-50 max-w-[90%] text-sm sm:text-base animate-fade-in-up">
              {renderToastIcon()}
              <span>{toast.message}</span>
            </div>
          )}

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-800 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-md flex-shrink-0">
              <Barcode size={28} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Generator <span className="text-blue-700">Kode</span> Inventaris
              </h1>
              <p className="text-sm text-gray-600">
                Format:{" "}
                <strong>AWALAN-KATEGORI-TANGGAL(YYMMDD)-URUTAN(3 digit)</strong>
              </p>
              <span className="inline-block mt-1 text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                <CheckCircle size={14} className="inline text-blue-600 mr-1" />
                Contoh: SCIENC-LNY-260629-002
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4 sm:mb-0">
                <label
                  htmlFor="itemName"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  <Tag size={16} className="inline text-blue-600 mr-2" />
                  Nama Item
                </label>
                <input
                  id="itemNameInput"
                  type="text"
                  placeholder="Misal: Laptop Dell XPS"
                  value={itemName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setItemName(e.target.value)
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition text-base"
                  required
                />
              </div>
              <div className="mb-4 sm:mb-0">
                <label
                  htmlFor="itemCategory"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  <FolderOpen size={16} className="inline text-blue-600 mr-2" />
                  Kategori (Bagian ke-2)
                </label>
                <select
                  id="itemCategory"
                  value={itemCategory}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setItemCategory(e.target.value)
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition bg-white text-base appearance-none"
                >
                  <option value="ELC">Elektronik</option>
                  <option value="FUR">Furnitur</option>
                  <option value="ATK">Alat Tulis</option>
                  <option value="MES">Mesin</option>
                  <option value="KMP">Komputer</option>
                  <option value="JLN">Jaringan</option>
                  <option value="LBN">Laboratorium</option>
                  <option value="KTR">Kantor</option>
                  <option value="GDG">Gudang</option>
                  <option value="LNY" selected>
                    Lainnya (LNY)
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="mb-4 sm:mb-0">
                <label
                  htmlFor="itemLocation"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  <MapPin size={16} className="inline text-blue-600 mr-2" />
                  Lokasi
                </label>
                <input
                  type="text"
                  id="itemLocation"
                  placeholder="Misal: Ruang 3, Lantai 2"
                  value={itemLocation}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setItemLocation(e.target.value)
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition text-base"
                />
              </div>
              <div className="mb-4 sm:mb-0">
                <label
                  htmlFor="itemPrefix"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  <Pen size={16} className="inline text-blue-600 mr-2" />
                  Awalan Kode (Bagian ke-1)
                </label>
                <input
                  type="text"
                  id="itemPrefix"
                  placeholder="SCIENC"
                  value={itemPrefix}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setItemPrefix(
                      e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""),
                    )
                  }
                  maxLength={10}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition text-base uppercase"
                />
              </div>
            </div>

            {/* Code Display */}
            <div className="mt-4 p-4 bg-blue-50/70 rounded-2xl border-2 border-dashed border-blue-300 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                <QrCode size={18} />
                Kode Generated
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-bold bg-white/60 px-4 py-1 rounded-xl text-gray-800 tracking-wider text-center flex-1">
                {generatedCode}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(generatedCode)}
                  className="p-3 bg-blue-100/50 hover:bg-blue-200/70 rounded-xl transition text-gray-700"
                  title="Salin kode"
                >
                  <Copy size={20} />
                </button>
                <button
                  type="button"
                  onClick={updateGeneratedCode}
                  className="p-3 bg-blue-100/50 hover:bg-blue-200/70 rounded-xl transition text-gray-700"
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
                className="flex-1 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition transform active:scale-95 flex items-center justify-center gap-2"
              >
                <PlusCircle size={20} />
                Generate & Simpan
              </button>
              <button
                type="button"
                onClick={updateGeneratedCode}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition flex items-center justify-center gap-2"
              >
                <RotateCw size={20} />
                Generate Ulang
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition flex items-center justify-center gap-2"
              >
                <Undo size={20} />
                Reset
              </button>
            </div>
          </form>

          {/* History */}
          <div className="mt-10 pt-6 border-t-2 border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <List size={20} className="text-blue-600" />
                Riwayat Kode
              </h3>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm bg-gray-200 text-gray-700 px-4 py-1 rounded-full font-medium">
                  {history.length} item
                </span>
                <button
                  type="button"
                  onClick={exportToExcel}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition flex items-center gap-2"
                >
                  <FileSpreadsheet size={18} />
                  Export Excel
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-2xl overflow-hidden max-h-64 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b border-gray-200">
                      Kode
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b border-gray-200">
                      Item
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b border-gray-200">
                      Kategori
                    </th>
                    <th className="py-3 px-4 border-b border-gray-200 w-12"></th>
                  </tr>
                </thead>
                <tbody>{renderHistoryRows()}</tbody>
              </table>
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={clearHistory}
                className="text-sm text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition flex items-center gap-2"
              >
                <Trash2 size={16} />
                Hapus semua
              </button>
            </div>
          </div>

          {/* Animasi toast */}
          <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateX(-50%) translateY(20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.4s ease forwards;
          }
        `}</style>
        </div>
      </div>
    </AdminLayout>
  );
};

export default InventarisCode;
