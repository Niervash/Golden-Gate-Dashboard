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
  label: string; // filename or Sheets URL
  importedAt: string; // ISO timestamp
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
  clearStudents: () => void;
  addOrUpdateStudent: (student: Student) => void;
  removeStudent: (id: string) => void;
  /** Reset only import status messages */
  resetStatus: () => void;
  /** Download a ready-to-use Excel template for student data */
  downloadTemplate: () => Promise<void>;
}

// ─── Column mapping ──────────────────────────────────────────────────────────

const COL: Record<string, keyof Student> = {
  // NIS
  nis: "nis",
  "no induk": "nis",
  "no.induk": "nis",
  "nomor induk": "nis",
  // NISN
  nisn: "nisn",
  // Nama
  nama: "namaLengkap",
  "nama siswa": "namaLengkap",
  "nama lengkap": "namaLengkap",
  "nama peserta didik": "namaLengkap",
  // Kelas
  kelas: "kelas",
  class: "kelas",
  rombel: "kelas",
  // Jurusan
  jurusan: "jurusan",
  "program studi": "jurusan",
  // JK
  "jenis kelamin": "jenisKelamin",
  jk: "jenisKelamin",
  gender: "jenisKelamin",
  // Status
  status: "status",
  // Tanggal Lahir
  "tanggal lahir": "tanggalLahir",
  "tgl lahir": "tanggalLahir",
  ttl: "tanggalLahir",
  // Tempat Lahir
  "tempat lahir": "tempatLahir",
  // Alamat
  alamat: "alamat",
  // No Telp
  "no telp": "noTelp",
  "no.telp": "noTelp",
  "nomor hp": "noTelp",
  hp: "noTelp",
  // Email
  email: "email",
  // Wali
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
      return {
        id: `sheet-${idx}-${Date.now()}`,
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

  const DEFAULT_GSHEETS_URL =
    "https://docs.google.com/spreadsheets/d/1xg1keWXGRB4h8HB_ZxmFh1q9sPQBGx74HAUgOAcVL2Q/edit?usp=sharing";

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

  // ── Import from Google Sheets ─────────────────────────────────────────────
  const importFromGSheets = useCallback(
    async (url?: string) => {
      const targetUrl = url ?? gsheetsUrl;
      if (!targetUrl.trim()) {
        setImportStatus("error");
        setImportMessage("Masukkan URL Google Sheets terlebih dahulu.");
        return;
      }

      const match = targetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
      if (!match) {
        setImportStatus("error");
        setImportMessage(
          "URL tidak valid. Gunakan link Google Sheets yang benar.",
        );
        return;
      }

      const sheetId = match[1];
      const gidMatch = targetUrl.match(/[#&?]gid=(\d+)/);
      const gid = gidMatch ? gidMatch[1] : "0";
      const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;

      setImportStatus("loading");
      setImportMessage("");

      try {
        const res = await fetch(csvUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
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
            "Tidak ada data ditemukan. Pastikan ada kolom: NIS, Nama, Kelas.",
          );
          return;
        }

        const src: SpreadsheetSource = {
          type: "gsheets",
          label: targetUrl,
          importedAt: new Date().toISOString(),
          count: parsed.length,
        };
        applyImport(parsed, src);
        localStorage.setItem("local_gsheets_url", targetUrl);
        if (url) setGsheetsUrl(url);
      } catch {
        setImportStatus("error");
        setImportMessage(
          "Gagal mengimpor. Pastikan: (1) Spreadsheet dibagikan 'Anyone with the link — Viewer', (2) URL benar.",
        );
      }
    },
    [gsheetsUrl],
  );

  // ── Auto-sync on mount when source is GSheets ────────────────────────────
  // We use a ref to ensure this only runs once on initial mount
  const hasSyncedOnMount = useRef(false);

  // DEFAULT_GSHEETS_URL sudah dideklarasikan di atas (scope komponen) — tidak perlu dideklarasi ulang

  useEffect(() => {
    if (hasSyncedOnMount.current) return;
    hasSyncedOnMount.current = true;

    // Load local spreadsheet link if exists in local storage, otherwise use hardcoded default URL
    const savedLink = localStorage.getItem("local_gsheets_url");
    const activeUrl = savedLink || DEFAULT_GSHEETS_URL;

    if (activeUrl) {
      const match = activeUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
      if (match) {
        const sheetId = match[1];
        const gidMatch = activeUrl.match(/[#&?]gid=(\d+)/);
        const gid = gidMatch ? gidMatch[1] : "0";
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;

        // Background refresh from stored sheet URL
        fetch(csvUrl)
          .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
          .then((text) => {
            const wb = XLSX.read(text, { type: "string" });
            const ws = wb.Sheets[wb.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json<Record<string, string>>(ws, {
              defval: "",
            });
            const parsed = parseRows(rows);
            if (parsed.length > 0) {
              const now = new Date().toISOString();
              const newSource: SpreadsheetSource = {
                type: "gsheets",
                label: activeUrl,
                importedAt: now,
                count: parsed.length,
              };
              setStudents(parsed);
              setSource(newSource);
              setLastSyncAt(now);
              localStorage.setItem(LS_KEY_STUDENTS, JSON.stringify(parsed));
              localStorage.setItem(LS_KEY_SOURCE, JSON.stringify(newSource));
              localStorage.setItem("local_gsheets_url", activeUrl);
            }
          })
          .catch(() => {
            /* silently fail on background sync */
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
