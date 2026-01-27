import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, FileText, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface StepItem {
  icon: React.ComponentType<any>;
  step: string;
  title: string;
  description: string;
}

const steps: StepItem[] = [
  {
    icon: FileText,
    step: "01",
    title: "Isi Formulir",
    description: "Lengkapi data pendaftaran online",
  },
  {
    icon: CalendarDays,
    step: "02",
    title: "Pilih Jadwal",
    description: "Tentukan jadwal tes seleksi",
  },
  {
    icon: HelpCircle,
    step: "03",
    title: "Ikuti Tes",
    description: "Laksanakan tes akademik & wawancara",
  },
];

const CtaSection: React.FC = () => {
  return (
    <section
      className="py-20 md:py-32"
      style={{
        background:
          "linear-gradient(135deg, rgba(35, 48, 93, 0.05) 0%, rgba(35, 48, 93, 0.15) 100%)",
      }}
      id="ppdb"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
              style={{
                background: "rgba(217, 171, 63, 0.15)",
                color: "#d9ab3f",
              }}
              whileHover={{ scale: 1.05 }}
            >
              PPDB 2025/2026
            </motion.span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: "#23305d" }}
            >
              Bergabunglah Bersama Kami
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "#43424e" }}
            >
              Pendaftaran Peserta Didik Baru tahun ajaran 2025/2026 telah
              dibuka. Daftarkan putra-putri Anda sekarang!
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, staggerChildren: 0.1 }}
            className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12"
          >
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="relative bg-white rounded-2xl p-6 shadow-lg border text-center"
                  style={{ borderColor: "#e5e7eb" }}
                  whileHover={{
                    y: -10,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { duration: 0.3 },
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Step Number */}
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-sm font-bold rounded-full"
                    style={{
                      background: "#d9ab3f",
                      color: "#23305d",
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    Step {item.step}
                  </motion.div>

                  <motion.div
                    className="w-16 h-16 mx-auto mt-4 mb-4 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(217, 171, 63, 0.1)" }}
                    whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                  >
                    <Icon className="w-8 h-8" style={{ color: "#d9ab3f" }} />
                  </motion.div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: "#23305d" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: "#43424e" }}>
                    {item.description}
                  </p>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className="hidden md:block absolute top-1/2 -right-4 w-8"
                      style={{ borderColor: "#d9ab3f" }}
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden rounded-3xl p-8 md:p-12"
            style={{
              background: "linear-gradient(135deg, #23305d 0%, #1a2447 100%)",
              boxShadow: "0 20px 25px -5px rgba(35, 48, 93, 0.3)",
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
                style={{ background: "#d9ab3f" }}
              />
            </div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Siap Memulai Perjalanan?
                </h3>
                <p className="text-white/70 max-w-md">
                  Batas pendaftaran:{" "}
                  <span style={{ color: "#d9ab3f" }} className="font-semibold">
                    30 Juni 2025
                  </span>
                  . Jangan lewatkan kesempatan ini!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/ppdb"
                    className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors h-12 px-6"
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
                    Daftar PPDB Online
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors h-12 px-6"
                    style={{
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      color: "#ffffff",
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.borderColor = "#d9ab3f";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor =
                        "rgba(255, 255, 255, 0.3)";
                    }}
                  >
                    Unduh Brosur
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
