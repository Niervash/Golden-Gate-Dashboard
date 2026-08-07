import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users, Award, BookOpen } from "lucide-react";

const STATS = [
  { icon: Users, label: "Siswa Aktif", value: "1,500+" },
  { icon: GraduationCap, label: "Alumni Diterima PTN / LN", value: "98%" },
  { icon: Award, label: "Penghargaan & Prestasi", value: "250+" },
  { icon: BookOpen, label: "Program & Ekstrakulikuler", value: "45+" },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="py-12 bg-[#23305d] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center space-y-2 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#d9ab3f]/20 text-[#d9ab3f] flex items-center justify-center mb-1">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{stat.value}</div>
                <div className="text-xs md:text-sm text-slate-300 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
