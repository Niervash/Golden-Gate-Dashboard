import React, { useState } from "react";
import { AdminLayout } from "../../../layouts";
import {
  QrCode,
  Download,
  Printer,
  Users,
  Search,
  Plus,
  UserCheck,
  ChevronDown,
  Loader2,
  Database,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useStudents } from "../../../context/student-context";
import { useNavigate } from "react-router-dom";
import type { Student } from "../../../context/student-context";

type DataSource = "from_db" | "manual";

const StudentCardsGeneratorPage: React.FC = () => {
  const { students, source, importStatus, importFromGSheets, lastSyncAt } = useStudents();
  const navigate = useNavigate();

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(
    students.length > 0 ? students[0] : null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [dataSource, setDataSource] = useState<DataSource>("from_db");
  const [customNis, setCustomNis] = useState("");
  const [customName, setCustomName] = useState("");
  const [customClass, setCustomClass] = useState("X-1");
  const [downloading, setDownloading] = useState(false);

  const filteredStudents = students.filter(
    (s) =>
      s.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nis.includes(searchQuery)
  );

  const getQrUrl = (data: string) =>
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}&color=23305d&bgcolor=ffffff`;

  const handleAddCustomStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNis || !customName) return;
    setSelectedStudent({ id: `manual-${Date.now()}`, nis: customNis, namaLengkap: customName, kelas: customClass });
    confetti({ particleCount: 50, spread: 40, colors: ["#d9ab3f", "#10b981"] });
  };

  const handlePrint = () => {
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 }, colors: ["#d9ab3f", "#ffffff", "#23305d"] });
    window.print();
  };

  const handleDownloadQr = async () => {
    if (!selectedStudent) return;
    setDownloading(true);
    try {
      const qrUrl = getQrUrl(selectedStudent.nis);
      const response = await fetch(qrUrl);
      const qrBlob = await response.blob();
      const qrDataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(qrBlob);
      });

      const canvas = document.createElement("canvas");
      const CARD_W = 600, CARD_H = 700;
      canvas.width = CARD_W; canvas.height = CARD_H;
      const ctx = canvas.getContext("2d")!;

      const grad = ctx.createLinearGradient(0, 0, CARD_W, CARD_H);
      grad.addColorStop(0, "#23305d"); grad.addColorStop(1, "#151e3d");
      ctx.fillStyle = grad;
      ctx.roundRect(0, 0, CARD_W, CARD_H, 24); ctx.fill();

      ctx.strokeStyle = "rgba(217,171,63,0.6)"; ctx.lineWidth = 3;
      ctx.roundRect(4, 4, CARD_W - 8, CARD_H - 8, 22); ctx.stroke();

      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff"; ctx.font = "bold 26px Arial";
      ctx.fillText("GOLDEN GATE SCHOOL", CARD_W / 2, 60);
      ctx.fillStyle = "#af9151"; ctx.font = "13px Arial";
      ctx.fillText("ABSENSI QR CODE SISWA", CARD_W / 2, 90);
      ctx.strokeStyle = "rgba(217,171,63,0.3)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(40, 108); ctx.lineTo(CARD_W - 40, 108); ctx.stroke();

      const qrImg = new Image();
      await new Promise<void>((res, rej) => { qrImg.onload = () => res(); qrImg.onerror = rej; qrImg.src = qrDataUrl; });
      const QR_SIZE = 280, QR_X = (CARD_W - QR_SIZE) / 2, QR_Y = 130;
      ctx.fillStyle = "#ffffff"; ctx.roundRect(QR_X - 16, QR_Y - 16, QR_SIZE + 32, QR_SIZE + 32, 16); ctx.fill();
      ctx.strokeStyle = "rgba(217,171,63,0.4)"; ctx.lineWidth = 2;
      ctx.roundRect(QR_X - 16, QR_Y - 16, QR_SIZE + 32, QR_SIZE + 32, 16); ctx.stroke();
      ctx.drawImage(qrImg, QR_X, QR_Y, QR_SIZE, QR_SIZE);

      const INFO_Y = QR_Y + QR_SIZE + 48;
      ctx.fillStyle = "rgba(0,0,0,0.15)"; ctx.roundRect(40, INFO_Y, CARD_W - 80, 150, 16); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.07)"; ctx.lineWidth = 1;
      ctx.roundRect(40, INFO_Y, CARD_W - 80, 150, 16); ctx.stroke();
      ctx.fillStyle = "#af9151"; ctx.font = "bold 11px Arial";
      ctx.fillText("NAMA SISWA", CARD_W / 2, INFO_Y + 32);
      ctx.fillStyle = "#ffffff"; ctx.font = "bold 22px Arial";
      ctx.fillText(selectedStudent.namaLengkap, CARD_W / 2, INFO_Y + 68);
      ctx.fillStyle = "#94a3b8"; ctx.font = "15px Arial";
      ctx.fillText(`NIS: ${selectedStudent.nis}  •  Kelas: ${selectedStudent.kelas}`, CARD_W / 2, INFO_Y + 106);

      const link = document.createElement("a");
      link.download = `QR_${selectedStudent.namaLengkap}_${selectedStudent.nis}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      confetti({ particleCount: 40, spread: 45, origin: { y: 0.9 }, colors: ["#d9ab3f", "#10b981"] });
    } catch {
      alert("Gagal mengunduh QR. Coba lagi.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12 text-white">
        {/* Header */}
        <div
          className="p-6 rounded-2xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          style={{ background: "linear-gradient(135deg, #23305d 0%, #151e3d 100%)", borderColor: "rgba(217, 171, 63, 0.3)" }}
        >
          <div className="space-y-1">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider" style={{ backgroundColor: "#d9ab3f", color: "#23305d" }}>
              Lainnya • Pembuat Kartu & QR
            </span>
            <h1 className="text-xl sm:text-2xl font-bold mt-2 text-white">Generate & Download QR Code Absensi</h1>
            <p className="text-sm" style={{ color: "#af9151" }}>
              Data siswa tersinkronisasi otomatis dari halaman <strong className="text-[#d9ab3f]">Data Siswa</strong>. Pilih siswa lalu download QR.
            </p>
            {lastSyncAt && (
              <p className="text-[10px] text-slate-400 mt-1">
                Terakhir sync: {new Date(lastSyncAt).toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {source && (
              <div className="flex items-center gap-2 text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-2 rounded-xl">
                <CheckCircle2 size={13} />
                <span><strong>{students.length}</strong> siswa · {source.type === "gsheets" ? "Google Sheets" : source.label}</span>
              </div>
            )}
            {source?.type === "gsheets" && (
              <>
                <button
                  onClick={() => window.open(source.label, "_blank")}
                  className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl border border-[#43424e] bg-white/5 hover:bg-white/10 transition-all"
                  title="Buka Google Sheets sumber data"
                >
                  <Database size={13} /> Buka Sheets
                </button>
                <button
                  onClick={() => importFromGSheets(source.label)}
                  disabled={importStatus === "loading"}
                  className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl border border-[#43424e] bg-white/5 hover:bg-white/10 transition-all disabled:opacity-50"
                >
                  <RefreshCw size={13} className={importStatus === "loading" ? "animate-spin" : ""} />
                  Sinkronkan
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left Column */}
          <div className="lg:col-span-5 space-y-4">
            {/* Source Tabs */}
            <div className="bg-[#1a2347]/60 border border-[#43424e] p-1.5 rounded-2xl flex gap-1">
              <button
                onClick={() => setDataSource("from_db")}
                className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  dataSource === "from_db" ? "bg-[#d9ab3f] text-[#23305d]" : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <Database size={13} /> Dari Data Siswa
              </button>
              <button
                onClick={() => setDataSource("manual")}
                className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  dataSource === "manual" ? "bg-[#d9ab3f] text-[#23305d]" : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <UserCheck size={13} /> Input Manual
              </button>
            </div>

            {/* FROM DATABASE PANEL */}
            {dataSource === "from_db" && (
              <div className="bg-[#1a2347]/60 backdrop-blur-xl rounded-3xl border border-[#43424e] p-5 space-y-4">
                {students.length === 0 ? (
                  <div className="text-center py-8 space-y-4">
                    <Database size={40} className="mx-auto text-slate-600" />
                    <div>
                      <p className="text-slate-300 text-sm font-semibold">Data siswa belum tersedia</p>
                      <p className="text-slate-500 text-xs mt-1">Import data dari Google Sheets atau file Excel di halaman Data Siswa terlebih dahulu.</p>
                    </div>
                    <button
                      onClick={() => navigate("/dashboard/siswa")}
                      className="mx-auto flex items-center gap-2 px-4 py-2.5 bg-[#d9ab3f] text-[#23305d] font-bold rounded-xl text-xs hover:scale-[1.02] transition-all"
                    >
                      Pergi ke Data Siswa <ArrowRight size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[11px] text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Users size={13} className="text-[#d9ab3f]" /> Pilih Siswa
                      </h3>
                      <span className="text-[10px] text-slate-500">{filteredStudents.length}/{students.length}</span>
                    </div>
                    <div className="bg-[#1d2950] border border-[#43424e] rounded-xl px-3 py-2 flex items-center gap-2">
                      <Search size={14} className="text-slate-400" />
                      <input
                        type="text"
                        placeholder="Cari nama atau NIS..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none text-xs text-white placeholder-slate-400/50 focus:outline-none w-full"
                      />
                    </div>
                    <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                      {filteredStudents.map((st, idx) => (
                        <button
                          key={`${st.id}-${idx}`}
                          type="button"
                          onClick={() => setSelectedStudent(st)}
                          className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                            selectedStudent?.id === st.id
                              ? "bg-[#d9ab3f]/20 border-[#d9ab3f] text-[#d9ab3f]"
                              : "bg-[#1d2950]/50 border-[#43424e] text-white hover:bg-white/5"
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="font-semibold text-xs truncate">{st.namaLengkap}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">NIS: {st.nis} • Kelas: {st.kelas}</p>
                          </div>
                          <ChevronDown size={13} className="rotate-270 text-slate-400 shrink-0" />
                        </button>
                      ))}
                      {filteredStudents.length === 0 && (
                        <p className="text-center text-[11px] text-slate-500 py-4">Tidak ada hasil pencarian</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* MANUAL PANEL */}
            {dataSource === "manual" && (
              <div className="bg-[#1a2347]/60 backdrop-blur-xl rounded-3xl border border-[#43424e] p-6">
                <form onSubmit={handleAddCustomStudent} className="space-y-4">
                  <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider flex items-center gap-2 mb-2">
                    <UserCheck size={16} className="text-[#d9ab3f]" /> Data Siswa Kustom
                  </h3>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300">Nama Lengkap</label>
                    <input type="text" placeholder="Masukkan nama lengkap" value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1d2950] text-white border border-[#43424e] rounded-xl focus:border-[#d9ab3f] focus:outline-none text-xs placeholder:text-slate-400/40" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300">NIS</label>
                      <input type="text" placeholder="Contoh: 2023010" value={customNis}
                        onChange={(e) => setCustomNis(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1d2950] text-white border border-[#43424e] rounded-xl focus:border-[#d9ab3f] focus:outline-none text-xs placeholder:text-slate-400/40" required />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300">Kelas</label>
                      <input type="text" placeholder="Contoh: X-1" value={customClass}
                        onChange={(e) => setCustomClass(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1d2950] text-white border border-[#43424e] rounded-xl focus:border-[#d9ab3f] focus:outline-none text-xs placeholder:text-slate-400/40" />
                    </div>
                  </div>
                  <button type="submit"
                    className="w-full py-3 bg-[#d9ab3f] text-[#23305d] font-bold rounded-xl text-xs transition-all hover:scale-[1.01] flex items-center justify-center gap-2">
                    <Plus size={16} /> Buat Preview QR
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: QR Card Preview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#1a2347]/60 backdrop-blur-xl rounded-3xl border border-[#43424e] p-6 sm:p-8 flex flex-col items-center justify-center">
              <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider self-start mb-6 flex items-center gap-2">
                <QrCode size={16} className="text-[#d9ab3f]" /> Pratinjau QR Code Siswa
              </h3>

              {selectedStudent ? (
                <>
                  <div
                    id="printable-student-card"
                    className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl relative border-2 border-[#d9ab3f]/40 flex flex-col justify-between items-center p-6 text-white"
                    style={{ background: "linear-gradient(135deg, #23305d 0%, #151e3d 100%)" }}
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#d9ab3f]/5 rounded-bl-full pointer-events-none" />
                    <div className="text-center w-full pb-3 border-b border-[#d9ab3f]/20">
                      <h2 className="text-xs font-bold tracking-wider leading-none text-white">GOLDEN GATE SCHOOL</h2>
                      <p className="text-[8px] text-[#af9151] mt-1 font-semibold tracking-widest uppercase">Absensi QR Code Siswa</p>
                    </div>
                    <div className="my-6 w-44 h-44 bg-white p-3 rounded-2xl border-2 border-[#d9ab3f]/30 flex items-center justify-center shadow-lg">
                      <img src={getQrUrl(selectedStudent.nis)} alt="Student QR Code" className="w-full h-full object-contain" crossOrigin="anonymous" />
                    </div>
                    <div className="text-center space-y-1 w-full bg-black/10 p-3 rounded-xl border border-white/5">
                      <p className="text-[9px] text-[#af9151] uppercase font-bold tracking-wider leading-none">Nama Siswa</p>
                      <p className="text-sm font-bold text-white leading-tight">{selectedStudent.namaLengkap}</p>
                      <p className="text-xs font-mono font-medium text-slate-300 mt-1">NIS: {selectedStudent.nis} • Kelas: {selectedStudent.kelas}</p>
                    </div>
                  </div>

                  <div className="w-full max-w-sm grid grid-cols-2 gap-3 mt-6">
                    <button onClick={handlePrint}
                      className="py-3 bg-[#d9ab3f] text-[#23305d] font-bold rounded-xl text-xs transition-all hover:scale-[1.01] flex items-center justify-center gap-2">
                      <Printer size={16} /> Cetak QR Code
                    </button>
                    <button onClick={handleDownloadQr} disabled={downloading}
                      className="py-3 bg-[#1d2950] border border-[#43424e] text-white font-semibold rounded-xl text-xs transition-all hover:bg-white/5 flex items-center justify-center gap-2 disabled:opacity-60">
                      {downloading ? <><Loader2 size={14} className="animate-spin" /> Mengunduh...</> : <><Download size={14} /> Download PNG</>}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-3 text-center">
                    Disimpan sebagai <code className="bg-white/10 px-1 rounded">QR_{selectedStudent.namaLengkap}_{selectedStudent.nis}.png</code>
                  </p>
                </>
              ) : (
                <div className="text-center py-16 space-y-3">
                  <QrCode size={48} className="mx-auto text-slate-600" />
                  <p className="text-slate-400 text-sm font-semibold">Belum ada siswa dipilih</p>
                  <p className="text-slate-500 text-xs">
                    {students.length === 0
                      ? "Import data dari Data Siswa terlebih dahulu."
                      : "Pilih siswa dari daftar di sebelah kiri."}
                  </p>
                  {students.length === 0 && (
                    <button onClick={() => navigate("/dashboard/siswa")}
                      className="mx-auto flex items-center gap-2 px-4 py-2 bg-[#d9ab3f] text-[#23305d] font-bold rounded-xl text-xs hover:scale-[1.02] transition-all">
                      Pergi ke Data Siswa <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #printable-student-card, #printable-student-card * { visibility: visible; }
          #printable-student-card {
            position: absolute; left: 50%; top: 50%;
            transform: translate(-50%, -50%) scale(1.5);
            border: 2px solid #d9ab3f !important;
            box-shadow: none !important;
            background: linear-gradient(135deg, #23305d 0%, #151e3d 100%) !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </AdminLayout>
  );
};

export default StudentCardsGeneratorPage;
