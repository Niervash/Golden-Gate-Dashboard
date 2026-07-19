import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import * as XLSX from "xlsx";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface Student {
  id: string;
  nis: string;
  nisn?: string;
  namaLengkap: string;
  kelas: string;
  jurusan?: string;
  jenisKelamin?: "L" | "P" | string;
  status?: "Aktif" | "Alumni" | "Pindah" | "Cuti" | string;
  tanggalLahir?: string;
  tempatLahir?: string;
  alamat?: string;
  noTelp?: string;
  email?: string;
  namaWali?: string;
  pekerjaanWali?: string;
  noTelpWali?: string;
}

export type ImportStatus = "idle" | "loading" | "success" | "error";

interface SpreadsheetSource {
  type: "file" | "gsheets" | "manual";
  label: string;
  importedAt: string;
  count: number;
}

interface StudentContextType {
  students: Student[];
  source: SpreadsheetSource | null;
  importStatus: ImportStatus;
  importMessage: string;
  lastSyncAt: string | null;
  gsheetsUrl: string;
  setGsheetsUrl: (url: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  importFromFile: (file: File) => Promise<void>;
  importFromGSheets: (url?: string) => Promise<void>;
  saveStudentToSheets: (student: Student) => Promise<void>;
  clearStudents: () => void;
  addOrUpdateStudent: (student: Student) => void;
  removeStudent: (id: string) => void;
  resetStatus: () => void;
  downloadTemplate: () => Promise<void>;
}

// ─── Column mapping ──────────────────────────────────────────────────────────

const COL: Record<string, keyof Student> = {
  nis: "nis",
  "no induk": "nis",
  "no.induk": "nis",
  "nomor induk": "nis",
  nisn: "nisn",
  nama: "namaLengkap",
  "nama siswa": "namaLengkap",
  "nama lengkap": "namaLengkap",
  "nama peserta didik": "namaLengkap",
  kelas: "kelas",
  class: "kelas",
  rombel: "kelas",
  jurusan: "jurusan",
  "program studi": "jurusan",
  "jenis kelamin": "jenisKelamin",
  jk: "jenisKelamin",
  gender: "jenisKelamin",
  status: "status",
  "tanggal lahir": "tanggalLahir",
  "tgl lahir": "tanggalLahir",
  ttl: "tanggalLahir",
  "tempat lahir": "tempatLahir",
  alamat: "alamat",
  "no telp": "noTelp",
  "no.telp": "noTelp",
  "nomor hp": "noTelp",
  hp: "noTelp",
  email: "email",
  "nama wali": "namaWali",
  "nama orang tua": "namaWali",
  wali: "namaWali",
  "pekerjaan wali": "pekerjaanWali",
  pekerjaan: "pekerjaanWali",
  "no telp wali": "noTelpWali",
  "hp wali": "noTelpWali",
};

function parseRows(rows: Record<string, string>[]): Student[] {
  return rows
    .map((row, idx) => {
      const s: Partial<Student> = {};
      for (const [key, val] of Object.entries(row)) {
        const normalized = key.toLowerCase().trim().replace(/\s+/g, " ");
        const field = COL[normalized];
        if (field && val) {
          (s as Record<string, string>)[field] = String(val).trim();
        }
      }
      if (!s.namaLengkap && !s.nis) return null;
      const uniqueId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `sheet-${idx}-${Date.now()}-${Math.random()}`;
      return {
        id: uniqueId,
        nis: s.nis || "-",
        nisn: s.nisn,
        namaLengkap: s.namaLengkap || "-",
        kelas: s.kelas || "-",
        jurusan: s.jurusan || "-",
        jenisKelamin: s.jenisKelamin,
        status: s.status || "Aktif",
        tanggalLahir: s.tanggalLahir,
        tempatLahir: s.tempatLahir,
        alamat: s.alamat,
        noTelp: s.noTelp,
        email: s.email,
        namaWali: s.namaWali,
        pekerjaanWali: s.pekerjaanWali,
        noTelpWali: s.noTelpWali,
      } as Student;
    })
    .filter(Boolean) as Student[];
}

const LS_KEY_STUDENTS = "ggs_students";
const LS_KEY_SOURCE = "ggs_students_source";

function loadFromStorage(): {
  students: Student[];
  source: SpreadsheetSource | null;
} {
  try {
    const raw = localStorage.getItem(LS_KEY_STUDENTS);
    const src = localStorage.getItem(LS_KEY_SOURCE);
    return {
      students: raw ? JSON.parse(raw) : [],
      source: src ? JSON.parse(src) : null,
    };
  } catch {
    return { students: [], source: null };
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────
const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const saved = loadFromStorage();

  // ⚠️ Ganti dengan URL CSV publik dari Google Sheets (harus di‑publish)
  const DEFAULT_GSHEETS_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQEJXU6ZIueGPFp0W7o7ypZVtZ7Seiya1cESF2NoOSI0SOoIJ-Riul8-sLc_KyH5xtEUjTqIaqukXfi/pub?gid=31445495&single=true&output=csv";

  // ⚠️ Ganti dengan URL Apps Script yang sudah dideploy
  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbyz-zixlx2IfXLCYg2upGLlehp32JRYZJqlFb-McYZVT0BV7SxgSGsUPTB3FCHh00nv/exec";

  const [students, setStudents] = useState<Student[]>(saved.students);
  const [source, setSource] = useState<SpreadsheetSource | null>(saved.source);
  const [importStatus, setImportStatus] = useState<ImportStatus>("idle");
  const [importMessage, setImportMessage] = useState("");
  const [lastSyncAt, setLastSyncAt] = useState<string | null>(
    saved.source?.importedAt ?? null,
  );
  const [gsheetsUrl, setGsheetsUrl] = useState(
    localStorage.getItem("local_gsheets_url") ||
      (saved.source?.type === "gsheets"
        ? saved.source.label
        : DEFAULT_GSHEETS_URL),
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const persist = (data: Student[], src: SpreadsheetSource | null) => {
    localStorage.setItem(LS_KEY_STUDENTS, JSON.stringify(data));
    localStorage.setItem(LS_KEY_SOURCE, JSON.stringify(src));
  };

  const applyImport = (parsed: Student[], src: SpreadsheetSource) => {
    const now = new Date().toISOString();
    const srcWithTime = { ...src, importedAt: now };
    setStudents(parsed);
    setSource(srcWithTime);
    setLastSyncAt(now);
    persist(parsed, srcWithTime);
    setImportStatus("success");
    setImportMessage(
      `✓ ${parsed.length} data siswa berhasil disinkronkan dari ${src.type === "gsheets" ? "Google Sheets" : src.label}`,
    );
  };

  // ── Import from local file ────────────────────────────────────────────────
  const importFromFile = useCallback(async (file: File) => {
    setImportStatus("loading");
    setImportMessage("");

    const ext = file.name.split(".").pop()?.toLowerCase();

    try {
      const rows = await new Promise<Record<string, string>[]>(
        (resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (ev) => {
            try {
              let wb: XLSX.WorkBook;
              if (ext === "csv") {
                wb = XLSX.read(ev.target?.result as string, { type: "string" });
              } else {
                wb = XLSX.read(
                  new Uint8Array(ev.target?.result as ArrayBuffer),
                  { type: "array" },
                );
              }
              const ws = wb.Sheets[wb.SheetNames[0]];
              resolve(
                XLSX.utils.sheet_to_json<Record<string, string>>(ws, {
                  defval: "",
                }),
              );
            } catch (e) {
              reject(e);
            }
          };
          reader.onerror = reject;
          if (ext === "csv") reader.readAsText(file);
          else reader.readAsArrayBuffer(file);
        },
      );

      const parsed = parseRows(rows);
      if (parsed.length === 0) {
        setImportStatus("error");
        setImportMessage(
          "Tidak ada data ditemukan. Pastikan ada kolom: NIS, Nama, Kelas.",
        );
        return;
      }

      const src: SpreadsheetSource = {
        type: "file",
        label: file.name,
        importedAt: new Date().toISOString(),
        count: parsed.length,
      };
      applyImport(parsed, src);
    } catch {
      setImportStatus("error");
      setImportMessage(
        "Gagal membaca file. Pastikan format .xlsx atau .csv yang valid.",
      );
    }
  }, []);

  // ── Import / Refresh from Google Sheets ──────────────────────────────────
  const importFromGSheets = useCallback(async () => {
    setImportStatus("loading");
    setImportMessage("");

    try {
      const res = await fetch(DEFAULT_GSHEETS_URL);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const text = await res.text();
      const wb = XLSX.read(text, { type: "string" });
      const ws = wb.Sheets[wb.SheetNames[0]];

      const rows = XLSX.utils.sheet_to_json<Record<string, string>>(ws, {
        defval: "",
      });

      const parsed = parseRows(rows);

      if (parsed.length === 0) {
        setImportStatus("error");
        setImportMessage(
          "Tidak ada data ditemukan. Pastikan ada kolom NIS, Nama, dan Kelas.",
        );
        return;
      }

      const src: SpreadsheetSource = {
        type: "gsheets",
        label: DEFAULT_GSHEETS_URL,
        importedAt: new Date().toISOString(),
        count: parsed.length,
      };

      applyImport(parsed, src);
    } catch (err) {
      console.error(err);
      setImportStatus("error");
      setImportMessage(
        "Gagal mengambil data dari Google Sheets. Pastikan spreadsheet masih dipublish sebagai CSV.",
      );
    }
  }, []);

  // ── Simpan ke Google Sheets via Apps Script ──────────────────────────────
  const saveStudentToSheets = useCallback(
    async (student: Student) => {
      try {
        const response = await fetch(GAS_URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(student),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const text = await response.text();
        const result = JSON.parse(text);
        if (!result.success) {
          throw new Error(result.error || "Gagal menyimpan ke Sheets");
        }

        // Tunggu sebentar agar sheet sempat update, lalu refresh data
        await new Promise((resolve) => setTimeout(resolve, 500));
        await importFromGSheets();
      } catch (err) {
        console.error("saveStudentToSheets error:", err);
        throw err;
      }
    },
    [importFromGSheets],
  );

  // ── Auto-sync on mount ────────────────────────────────────────────────────
  const hasSyncedOnMount = useRef(false);

  useEffect(() => {
    if (hasSyncedOnMount.current) return;
    hasSyncedOnMount.current = true;

    setImportStatus("loading");

    fetch(DEFAULT_GSHEETS_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        const wb = XLSX.read(text, { type: "string" });
        const ws = wb.Sheets[wb.SheetNames[0]];

        const rows = XLSX.utils.sheet_to_json<Record<string, string>>(ws, {
          defval: "",
        });

        const parsed = parseRows(rows);

        if (parsed.length === 0) {
          setImportStatus("error");
          setImportMessage("Spreadsheet kosong.");
          return;
        }

        const now = new Date().toISOString();

        const src: SpreadsheetSource = {
          type: "gsheets",
          label: DEFAULT_GSHEETS_URL,
          importedAt: now,
          count: parsed.length,
        };

        setStudents(parsed);
        setSource(src);
        setLastSyncAt(now);
        persist(parsed, src);

        setImportStatus("success");
        setImportMessage(
          `✓ ${parsed.length} data siswa berhasil dimuat dari Google Sheets.`,
        );
      })
      .catch((err) => {
        console.error(err);
        setImportStatus("error");
        setImportMessage("Tidak dapat mengambil data dari Google Sheets.");
      });
  }, []);

  // ── Download template ─────────────────────────────────────────────────────
  const downloadTemplate = useCallback(async () => {
    const { utils, writeFile } = await import("xlsx");
    const templateData = [
      {
        NIS: "2024001",
        NISN: "1234567890",
        "Nama Lengkap": "Contoh Nama Siswa",
        Kelas: "X-1",
        Jurusan: "MIPA",
        "Jenis Kelamin": "L",
        Status: "Aktif",
        "Tanggal Lahir": "2008-01-15",
        "Tempat Lahir": "Makassar",
        Alamat: "Jl. Contoh No. 1",
        "No Telp": "08123456789",
        Email: "siswa@email.com",
        "Nama Wali": "Nama Orang Tua",
        "Pekerjaan Wali": "Wiraswasta",
        "No Telp Wali": "08987654321",
      },
      {
        NIS: "2024002",
        NISN: "0987654321",
        "Nama Lengkap": "Contoh Siswa Kedua",
        Kelas: "X-2",
        Jurusan: "IPS",
        "Jenis Kelamin": "P",
        Status: "Aktif",
        "Tanggal Lahir": "2008-03-20",
        "Tempat Lahir": "Gowa",
        Alamat: "Jl. Contoh No. 2",
        "No Telp": "08234567890",
        Email: "siswa2@email.com",
        "Nama Wali": "Nama Wali Kedua",
        "Pekerjaan Wali": "PNS",
        "No Telp Wali": "08876543210",
      },
    ];
    const ws = utils.json_to_sheet(templateData);
    ws["!cols"] = Object.keys(templateData[0]).map(() => ({ wch: 20 }));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data Siswa");
    writeFile(wb, "Template_DataSiswa_GoldenGate.xlsx");
  }, []);

  // ── CRUD helpers ─────────────────────────────────────────────────────────
  const clearStudents = useCallback(() => {
    setStudents([]);
    setSource(null);
    setLastSyncAt(null);
    setImportStatus("idle");
    setImportMessage("");
    setGsheetsUrl("");
    localStorage.removeItem(LS_KEY_STUDENTS);
    localStorage.removeItem(LS_KEY_SOURCE);
    localStorage.removeItem("local_gsheets_url");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const addOrUpdateStudent = useCallback(
    (student: Student) => {
      setStudents((prev) => {
        const exists = prev.findIndex(
          (s) =>
            s.id === student.id || (s.nis === student.nis && s.nis !== "-"),
        );
        let next;
        if (exists >= 0) {
          next = prev.map((s, idx) =>
            idx === exists ? { ...s, ...student } : s,
          );
        } else {
          next = [...prev, student];
        }

        const newSource: SpreadsheetSource = source || {
          type: "manual",
          label: localStorage.getItem("local_gsheets_url") || "Local Database",
          importedAt: new Date().toISOString(),
          count: next.length,
        };
        newSource.count = next.length;

        persist(next, newSource);
        setSource(newSource);
        return next;
      });
    },
    [source],
  );

  const removeStudent = useCallback(
    (id: string) => {
      setStudents((prev) => {
        const next = prev.filter((s) => s.id !== id);
        const newSource = source ? { ...source, count: next.length } : null;
        persist(next, newSource);
        setSource(newSource);
        return next;
      });
    },
    [source],
  );

  const resetStatus = useCallback(() => {
    setImportStatus("idle");
    setImportMessage("");
  }, []);

  return (
    <StudentContext.Provider
      value={{
        students,
        source,
        importStatus,
        importMessage,
        lastSyncAt,
        gsheetsUrl,
        setGsheetsUrl,
        fileInputRef,
        importFromFile,
        importFromGSheets,
        saveStudentToSheets,
        clearStudents,
        addOrUpdateStudent,
        removeStudent,
        resetStatus,
        downloadTemplate,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudents must be used within StudentProvider");
  return ctx;
};
