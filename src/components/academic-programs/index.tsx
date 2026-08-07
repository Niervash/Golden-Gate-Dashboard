import React from "react";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, Layers, ShieldCheck } from "lucide-react";

const PROGRAMS = [
  {
    level: "SMP Kelas 1",
    badge: "Tahun Pertama",
    desc: "Masa adaptasi yang menguatkan fondasi literasi, numerasi, karakter, dan kemandirian belajar.",
    features: ["Fondasi Akademik", "Karakter Positif", "Literasi Digital"],
    color: "border-blue-200 bg-blue-50/50",
  },
  {
    level: "SMP Kelas 2",
    badge: "Tahun Kedua",
    desc: "Pendalaman kompetensi, berpikir kritis, kolaborasi, serta pengembangan minat dan bakat siswa.",
    features: ["Project Based Learning", "Olimpiade Club", "Leadership Camp"],
    color: "border-indigo-200 bg-indigo-50/50",
  },
  {
    level: "SMP Kelas 3",
    badge: "Tahun Akhir",
    desc: "Penguatan capaian akademik dan kesiapan melanjutkan pendidikan ke jenjang berikutnya.",
    features: ["Persiapan Kelulusan", "Bimbingan Karier", "Portofolio Prestasi"],
    color: "border-amber-200 bg-amber-50/50",
  },
];

export const AcademicProgramsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-800 border border-indigo-200">
            Jenjang Pendidikan
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold" style={{ color: "#23305d" }}>
            Program Akademik <span style={{ color: "#d9ab3f" }}>Unggulan</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
            Kurikulum holistik terpadu dirancang untuk setiap tahap perkembangan usia anak.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROGRAMS.map((prog, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`p-8 rounded-3xl border ${prog.color} bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold" style={{ color: "#23305d" }}>
                    {prog.level}
                  </h3>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {prog.badge}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{prog.desc}</p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Fokus Utama</div>
                <div className="flex flex-wrap gap-2">
                  {prog.features.map((feat, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-[#d9ab3f]" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
