import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import * as XLSX from "xlsx";
import { studentsApi } from "../utils/api";
import { useAuth } from "./index";

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
  type: "file" | "gsheets" | "manual" | "database";
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
  addOrUpdateStudent: (student: Student) => Promise<void>;
  removeStudent: (id: string) => Promise<void>;
  resetStatus: () => void;
  downloadTemplate: () => Promise<void>;
}

// ─── Column mapping for Excel imports ──────────────────────────────────────────

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

export function toFEStudent(s: any): Student {
  return {
    id: String(s.id),
    nis: s.nis || "-",
    nisn: s.nisn || "",
    namaLengkap: s.nama_lengkap || "-",
    kelas: s.kelas || "-",
    jurusan: s.jurusan || "-",
    jenisKelamin: s.jenis_kelamin || "",
    status: s.status ? (s.status.charAt(0).toUpperCase() + s.status.slice(1)) : "Aktif",
    tanggalLahir: s.tanggal_lahir || "",
    tempatLahir: s.tempat_lahir || "",
    alamat: s.alamat || "",
    noTelp: s.no_telp || "",
    email: s.email || "",
    namaWali: s.nama_wali || "",
    pekerjaanWali: s.pekerjaan_wali || "",
    noTelpWali: s.no_telp_wali || "",
  };
}

export function toBEStudent(s: Student): any {
  return {
    nis: s.nis,
    nisn: s.nisn || null,
    nama_lengkap: s.namaLengkap,
    kelas: s.kelas,
    jurusan: s.jurusan || null,
    jenis_kelamin: s.jenisKelamin || null,
    status: s.status ? s.status.toLowerCase() : "aktif",
    tanggal_lahir: s.tanggalLahir || null,
    tempat_lahir: s.tempatLahir || null,
    alamat: s.alamat || null,
    no_telp: s.noTelp || null,
    email: s.email || null,
    nama_wali: s.namaWali || null,
    pekerjaan_wali: s.pekerjaanWali || null,
    no_telp_wali: s.noTelpWali || null,
  };
}

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
      const uniqueId = `sheet-${idx}-${Date.now()}`;
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

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [source, setSource] = useState<SpreadsheetSource | null>(null);
  const [importStatus, setImportStatus] = useState<ImportStatus>("idle");
  const [importMessage, setImportMessage] = useState("");
  const [lastSyncAt, setLastSyncAt] = useState<string | null>(null);
  const [gsheetsUrl, setGsheetsUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { user, authReady } = useAuth();

  const fetchStudents = useCallback(async () => {
    setImportStatus("loading");
    try {
      if (!authReady || !user) return;
      const response = user.role === "murid" ? await studentsApi.getMe() : await studentsApi.getAll();
      const payload = response.data?.data || response.data;
      const list = Array.isArray(payload) ? payload : payload ? [payload] : [];
      const mapped = list.map(toFEStudent);
      setStudents(mapped);
      setSource({
        type: "database",
        label: "Database Sekolah",
        importedAt: new Date().toISOString(),
        count: mapped.length,
      });
      setLastSyncAt(new Date().toISOString());
      setImportStatus("success");
    } catch (err: any) {
      console.error(err);
      setImportStatus("error");
      setImportMessage("Gagal memuat data dari database.");
    }
  }, [authReady, user]);

  useEffect(() => {
    if (authReady && user) fetchStudents();
  }, [fetchStudents]);

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

      // Save all parsed students to DB
      for (const s of parsed) {
        await studentsApi.create(toBEStudent(s));
      }

      await fetchStudents();
      setImportStatus("success");
      setImportMessage(`✓ ${parsed.length} data siswa berhasil diimpor ke database.`);
    } catch (err) {
      console.error(err);
      setImportStatus("error");
      setImportMessage("Gagal membaca atau menyimpan file ke database.");
    }
  }, [fetchStudents]);

  // ── Import / Refresh from Google Sheets ──────────────────────────────────
  const importFromGSheets = useCallback(async (url?: string) => {
    setImportStatus("loading");
    setImportMessage("");
    const targetUrl = url || gsheetsUrl;
    if (!targetUrl) {
      setImportStatus("error");
      setImportMessage("URL Google Sheets kosong.");
      return;
    }

    try {
      const res = await fetch(targetUrl);
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
        setImportMessage("Tidak ada data ditemukan.");
        return;
      }

      for (const s of parsed) {
        await studentsApi.create(toBEStudent(s));
      }

      await fetchStudents();
      setImportStatus("success");
      setImportMessage(`✓ ${parsed.length} data siswa berhasil diimpor dari Google Sheets.`);
    } catch (err) {
      console.error(err);
      setImportStatus("error");
      setImportMessage("Gagal mengambil atau mengimpor data Google Sheets.");
    }
  }, [gsheetsUrl, fetchStudents]);

  // ── Simpan ke Google Sheets via Apps Script (Dummy wrapper now) ──────────────────────────────
  const saveStudentToSheets = useCallback(
    async (student: Student) => {
      // Directly resolving since it's already saved in DB
      return Promise.resolve();
    },
    [],
  );

  const downloadTemplate = useCallback(async () => {
    const { utils, writeFile } = await import("xlsx");
    const templateData = [
      {
        NIS: "2024001",
        NISN: "1234567890",
        "Nama Lengkap": "Contoh Nama Siswa",
        Kelas: "1-A",
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
    ];
    const ws = utils.json_to_sheet(templateData);
    ws["!cols"] = Object.keys(templateData[0]).map(() => ({ wch: 20 }));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data Siswa");
    writeFile(wb, "Template_DataSiswa_GoldenGate.xlsx");
  }, []);

  const clearStudents = useCallback(async () => {
    // We do not clear database, but reset local state to empty
    setStudents([]);
    setSource(null);
    setLastSyncAt(null);
    setImportStatus("idle");
    setImportMessage("");
  }, []);

  const addOrUpdateStudent = useCallback(
    async (student: Student) => {
      const payload = toBEStudent(student);
      const isNew = !student.id || student.id.startsWith("sheet-") || isNaN(Number(student.id));

      if (isNew) {
        await studentsApi.create(payload);
      } else {
        await studentsApi.update(student.id, payload);
      }
      await fetchStudents();
    },
    [fetchStudents],
  );

  const removeStudent = useCallback(
    async (id: string) => {
      await studentsApi.delete(id);
      await fetchStudents();
    },
    [fetchStudents],
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
