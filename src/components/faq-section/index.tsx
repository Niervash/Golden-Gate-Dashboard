import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "Kapan pendaftaran siswa baru (PPDB) Golden Gate School dibuka?",
    a: "Pendaftaran siswa baru dibuka dalam 2 gelombang utama. Gelombang 1 dimulai pada Oktober - Desember, dan Gelombang 2 dibuka pada Januari - Mei. Kami menyarankan mendaftar awal karena kuota terbatas.",
  },
  {
    q: "Bagaimana proses dan syarat pendaftaran PPDB secara online?",
    a: "Proses pendaftaran sangat mudah! Anda cukup menekan tombol 'Daftar PPDB', mengisi formulir identitas calon siswa & orang tua, mengunggah dokumen (Akta, KK, Rapor), dan melakukan konfirmasi tes pemetaan bakat.",
  },
  {
    q: "Kurikulum apa yang diterapkan di Golden Gate School?",
    a: "Golden Gate School menerapkan Kurikulum Merdeka yang dikombinasikan secara holistik dengan standar pendidikan global (STEM & Bilingual Integration) serta penguatan karakter dan keagamaan.",
  },
  {
    q: "Apakah tersedia program beasiswa untuk siswa berprestasi?",
    a: "Ya, kami menyediakan Beasiswa Jalur Prestasi Akademik & Non-Akademik (Seni/Olahraga) berupa potongan biaya masuk dan biaya SPP bulanan hingga 100%.",
  },
  {
    q: "Bagaimana sistem keamanan dan pemantauan siswa di kampus?",
    a: "Kampus dilengkapi CCTV 24 jam, sistem pintu masuk terintegrasi ID Card, petugas keamanan profesional, serta aplikasi pemantauan presensi siswa otomatis yang terhubung ke ponsel orang tua.",
  },
];

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-4 mb-16">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-800 border border-purple-200">
            Pusat Informasi
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold" style={{ color: "#23305d" }}>
            Pertanyaan Sering <span style={{ color: "#d9ab3f" }}>Diajukan (FAQ)</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-base">
            Temukan jawaban atas pertanyaan umum seputar pendaftaran, kurikulum, dan fasilitas sekolah.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-shadow"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base md:text-lg focus:outline-none"
                  style={{ color: "#23305d" }}
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#d9ab3f] flex-shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-amber-500" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
