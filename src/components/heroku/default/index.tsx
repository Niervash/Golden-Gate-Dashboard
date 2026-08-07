import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, GraduationCap, Trophy, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { IloveBG } from "../../../assets";

// Statistik sekolah
const stats = [
  {
    icon: Users,
    label: "Siswa Aktif",
    value: "1,200+",
    description: "Siswa berprestasi",
  },
  {
    icon: GraduationCap,
    label: "Lulusan",
    value: "8,500+",
    description: "Alumni sukses",
  },
  {
    icon: Trophy,
    label: "Prestasi",
    value: "200+",
    description: "Juara nasional",
  },
  {
    icon: Award,
    label: "Akreditasi",
    value: "A",
    description: "Unggul",
  },
];

const MainHero: React.FC = () => {
  return (
    <section className="relative min-h-screen md:min-h-[90vh] flex items-center overflow-hidden bg-slate-50 pt-16 pb-20">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-size-[16px_16px] opacity-60" />

      {/* Subtle Glow Spheres */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider shadow-sm"
              style={{
                background: "#ffffff",
                borderColor: "#e2e8f0",
                color: "#23305d",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ background: "#d9ab3f" }}
              />
              Pendaftaran PPDB 2026/2027 Telah Dibuka
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none"
              style={{ color: "#23305d" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Membentuk Generasi{" "}
              <span style={{ color: "#d9ab3f" }}>Unggul</span>,{" "}
              <span className="text-slate-800">Berkarakter</span>, dan{" "}
              <span style={{ color: "#d9ab3f" }}>Berprestasi</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              GOLDEN GATE SCHOOL berkomitmen untuk memberikan pendidikan
              berkualitas tinggi yang membekali siswa dengan karakter moral yang
              kuat, kecerdasan digital, dan keunggulan akademik.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/ppdb"
                  className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-base font-bold shadow-md transition-all group"
                  style={{
                    background: "#23305d",
                    color: "#ffffff",
                  }}
                >
                  Daftar PPDB Sekarang
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform text-[#d9ab3f]" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/berita"
                  className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-base font-semibold border transition-all"
                  style={{
                    background: "#ffffff",
                    borderColor: "#cbd5e1",
                    color: "#334155",
                  }}
                >
                  Jelajahi Berita & Aktivitas
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5" style={{ color: "#d9ab3f" }} />
                      <span
                        className="text-xl font-extrabold"
                        style={{ color: "#23305d" }}
                      >
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column Image Banner */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white max-w-md w-full"
            >
              <img
                src={IloveBG}
                alt="Golden Gate School Students"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#23305d]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="px-2.5 py-1 rounded-md bg-[#d9ab3f] text-[#23305d] text-xs font-bold uppercase">
                  Kampus Utama
                </span>
                <h3 className="text-lg font-bold text-white">
                  Fasilitas Modern & Kondusif
                </h3>
                <p className="text-xs text-slate-200">
                  Lingkungan belajar ramah dan mendukung potensi penuh tiap
                  siswa.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
};

export default MainHero;
