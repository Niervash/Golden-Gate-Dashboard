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
    <section className="relative min-h-screen md:min-h-[100vh] flex items-center overflow-hidden ">
      {/* Background Image dengan Overlay */}
      <div className="absolute inset-0">
        <motion.img
          src={IloveBG}
          alt="GOLDEN GATE SCHOOL"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#23305d]/95 via-[#23305d]/85 to-[#23305d]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#23305d]/90 via-transparent to-transparent" />
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl"
        style={{ background: "rgba(217, 171, 63, 0.2)" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "rgba(175, 145, 81, 0.1)" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      />

      <div className="container mx-auto px-4 relative z-10 pt-22">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border text-white text-sm mb-6"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse "
              style={{ background: "#d9ab3f" }}
            />
            Pendaftaran PPDB 2025/2026 Telah Dibuka
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Membentuk Generasi <span style={{ color: "#d9ab3f" }}>Unggul</span>,{" "}
            <span style={{ color: "#d9ab3f" }}>Berkarakter</span>, dan{" "}
            <span style={{ color: "#d9ab3f" }}>Berprestasi</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            GOLDEN GATE SCHOOL berkomitmen untuk memberikan pendidikan
            berkualitas yang mempersiapkan siswa menghadapi tantangan masa depan
            dengan karakter kuat dan prestasi gemilang.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/ppdb"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 md:px-8 md:py-4 text-lg font-medium transition-colors group"
                style={{
                  background: "#d9ab3f",
                  color: "#23305d",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#af9151";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#d9ab3f";
                }}
              >
                Daftar PPDB Sekarang
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap gap-6 md:gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(217, 171, 63, 0.2)" }}
                  >
                    <Icon className="w-6 h-6" style={{ color: "#d9ab3f" }} />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                    <div className="text-xs text-white/40">
                      {stat.description}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
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
