import React from "react";
import { motion } from "framer-motion";
import { Building, Monitor, BookOpen, Shield, Trophy } from "lucide-react";

const FACILITIES = [
  {
    title: "Laboratorium Sains & Teknologi Modern",
    category: "Fasilitas Belajar",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600",
    desc: "Dilengkapi peralatan riset digital berstandar internasional untuk eksperimen fisika, kimia, biologi, dan robotik.",
  },
  {
    title: "Perpustakaan & Learning Hub Digital",
    category: "Pusat Literasi",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600",
    desc: "Akses ke ribuan koleksi buku fisik, e-journal internasional, dan area diskusi yang tenang dan nyaman.",
  },
  {
    title: "Smart Classroom Ber-AC & Multimedia",
    category: "Ruang Kelas",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600",
    desc: "Setiap kelas didukung Interactive Flat Panel (IFP), pendingin udara, dan pencahayaan ergonomis.",
  },
  {
    title: "Kompleks Olahraga Multiguna",
    category: "Olahraga & Kesehatan",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600",
    desc: "Lapangan basket indoor, futsal, bulutangkis, serta kolam renang untuk mendukung kebugaran jasmani siswa.",
  },
];

export const CampusFacilitiesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
            Fasilitas Kampus
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold" style={{ color: "#23305d" }}>
            Lingkungan Belajar <span style={{ color: "#d9ab3f" }}>Inspiratif</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
            Sarana pendukung belajar dan pengembangan bakat terlengkap untuk kenyamanan putra-putri Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FACILITIES.map((fac, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm hover:shadow-lg transition-all flex flex-col"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={fac.image}
                  alt={fac.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow">
                  {fac.category}
                </span>
              </div>
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-600 transition-colors" style={{ color: "#23305d" }}>
                    {fac.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{fac.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
