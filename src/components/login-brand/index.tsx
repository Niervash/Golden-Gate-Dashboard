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
      className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-50 border-r border-slate-200"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, rgba(35, 48, 93, 0.05) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Animated Background Light Glows */}
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
        className="absolute top-1/4 left-10 w-72 h-72 rounded-full blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(217, 171, 63, 0.2) 0%, transparent 70%)",
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
        className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(35, 48, 93, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col justify-center items-center w-full p-10">
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
            className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-white shadow-md border border-slate-200 p-2 flex items-center justify-center"
          >
            <img
              src={ILoveGGS}
              alt="Logo Golden Gate School"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* School Name */}
          <h1 className="text-2xl font-black mb-1 text-[#23305d] tracking-tight">
            GOLDEN <span className="text-[#d9ab3f]">GATE</span> SCHOOL
          </h1>

          <p className="text-xs mb-6 font-bold uppercase tracking-widest text-slate-500">
            Unggul • Berkarakter • Berprestasi
          </p>

          {/* School Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm mb-8 max-w-xs mx-auto leading-relaxed text-slate-600"
          >
            Sistem Informasi Sekolah terintegrasi yang mendukung pembelajaran
            digital dan manajemen pendidikan modern.
          </motion.p>

          {/* Features Grid */}
          <div className="space-y-2.5 mb-8 text-left">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs transition-all hover:border-amber-300 hover:shadow-sm"
                >
                  <div className="p-2 rounded-lg bg-amber-50 text-[#d9ab3f] border border-amber-100 flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
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
            className="mb-8 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs"
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center border-r border-slate-100">
                <div className="text-lg font-black text-[#23305d]">1000+</div>
                <div className="text-[11px] font-medium text-slate-500">Siswa</div>
              </div>
              <div className="text-center border-r border-slate-100">
                <div className="text-lg font-black text-[#d9ab3f]">150+</div>
                <div className="text-[11px] font-medium text-slate-500">Guru</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-black text-[#23305d]">98%</div>
                <div className="text-[11px] font-medium text-slate-500">Kepuasan</div>
              </div>
            </div>
          </motion.div>

          {/* Security Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium"
          >
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span>Sistem Terenkripsi & Aman</span>
          </motion.div>
        </motion.div>
      </div>
    </div>

  );
};

export default LoginBranding;
