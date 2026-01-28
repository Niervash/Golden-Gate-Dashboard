import {
  GraduationCap,
  Users,
  BookOpen,
  Shield,
  CheckCircle,
  Award,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { ILoveGGS } from "../../assets";

interface props {}

const LoginBranding: React.FC<props> = () => {
  const features = [
    {
      icon: Shield,
      text: "Manajemen akademik terintegrasi",
      color: "#23305d",
    },
    {
      icon: BookOpen,
      text: "Absensi digital real-time",
      color: "#d9ab3f",
    },
    {
      icon: Users,
      text: "Raport digital otomatis",
      color: "#af9151",
    },
    {
      icon: CheckCircle,
      text: "Laporan & analitik lengkap",
      color: "#23305d",
    },
  ];

  return (
    <div
      className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #23305d 0%, #1a2449 50%, #151e3d 100%)",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, rgba(217, 171, 63, 0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Golden Accent Pattern */}
      <div
        className="absolute inset-0 opacity-3"
        style={{
          backgroundImage: `linear-gradient(45deg, #d9ab3f 25%, transparent 25%, transparent 50%, #d9ab3f 50%, #d9ab3f 75%, transparent 75%, transparent)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated Background Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-10 w-64 h-64 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(217, 171, 63, 0.1) 0%, transparent 70%)",
        }}
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/4 right-10 w-72 h-72 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(175, 145, 81, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col justify-center items-center w-full p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full shadow-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #23305d 0%, #1a2449 100%)",
              border: "2px solid #d9ab3f",
            }}
          >
            <img
              src={ILoveGGS}
              alt="Logo Golden Gate School"
              className="w-20 h-20 md:w-20 md:h-20"
            />
          </motion.div>

          {/* School Name */}
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#ffffff" }}>
            GOLDEN <span style={{ color: "#d9ab3f" }}>GATE</span> SCHOOL
          </h1>

          <p className="text-sm mb-6 font-normal" style={{ color: "#af9151" }}>
            Unggul • Berkarakter • Berprestasi
          </p>

          {/* School Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm mb-8 max-w-xs mx-auto leading-relaxed"
            style={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            Sistem Informasi Sekolah terintegrasi yang mendukung pembelajaran
            digital dan manajemen pendidikan modern.
          </motion.p>

          {/* Features Grid */}
          <div className="space-y-3 mb-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:shadow-sm group"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(217, 171, 63, 0.08)",
                  }}
                  whileHover={{
                    scale: 1.01,
                    backgroundColor: "rgba(217, 171, 63, 0.08)",
                    borderColor: "rgba(217, 171, 63, 0.2)",
                  }}
                >
                  <div
                    className="p-2 rounded-md transition-transform duration-200 group-hover:scale-105"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      color: feature.color,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className="text-xs font-medium leading-tight"
                    style={{ color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    {feature.text}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 p-4 rounded-xl"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(217, 171, 63, 0.08)",
            }}
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div
                  className="text-lg font-bold mb-1"
                  style={{ color: "#d9ab3f" }}
                >
                  1000+
                </div>
                <div
                  className="text-xs"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                >
                  Siswa
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-lg font-bold mb-1"
                  style={{ color: "#d9ab3f" }}
                >
                  150+
                </div>
                <div
                  className="text-xs"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                >
                  Guru
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-lg font-bold mb-1"
                  style={{ color: "#d9ab3f" }}
                >
                  98%
                </div>
                <div
                  className="text-xs"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                >
                  Kepuasan
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-6 border-t"
            style={{ borderColor: "rgba(217, 171, 63, 0.15)" }}
          >
            <p
              className="text-xs italic mb-3 leading-relaxed"
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
            >
              "Sistem ini telah meningkatkan efisiensi administrasi sekolah kami
              hingga 70%."
            </p>
            <div>
              <p className="text-xs font-semibold" style={{ color: "#d9ab3f" }}>
                Dr. Ahmad Rahman, S.Pd., M.Pd.
              </p>
              <p
                className="text-xs"
                style={{ color: "rgba(255, 255, 255, 0.5)" }}
              >
                Kepala Sekolah
              </p>
            </div>
          </motion.div>

          {/* Security Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 flex items-center justify-center gap-2 text-xs"
            style={{ color: "rgba(255, 255, 255, 0.4)" }}
          >
            <Shield className="w-3 h-3" />
            <span className="text-xs">
              Sistem terenkripsi dengan keamanan tinggi
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginBranding;
