import React from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, Compass, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";

const COLORS = {
  primary: "#23305d",
  accent: "#d9ab3f",
};

const FEATURES = [
  {
    icon: Compass,
    title: "Kurikulum Berstandar Global",
    desc: "Menggabungkan Kurikulum Merdeka dengan standar pembelajaran kritis, STEM, dan keterampilan abad ke-21.",
  },
  {
    icon: ShieldCheck,
    title: "Pembentukan Karakter & Karakter",
    desc: "Fokus pada kedisiplinan, integritas moral, kepemimpinan, dan nilai keagamaan yang kuat.",
  },
  {
    icon: Sparkles,
    title: "Fasilitas Digital & Modern",
    desc: "Laboratorium sains berstandar internasional, ruang kelas pintar ber-AC, & perpustakaan digital interaktif.",
  },
  {
    icon: Award,
    title: "Pembinaan Prestasi Berkelanjutan",
    desc: "Mentoring intensif untuk olimpiade akademik, seni, dan ajang olahraga hingga tingkat nasional & internasional.",
  },
];

export const SchoolFeaturesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
            Mengapa Golden Gate School?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold" style={{ color: COLORS.primary }}>
            Keunggulan Pendidikan <span style={{ color: COLORS.accent }}>Terdepan</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
            Komitmen kami dalam menciptakan ekosistem belajar holistik yang nyaman dan menginspirasi tiap generasi muda.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-slate-200 text-[#d9ab3f] shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
