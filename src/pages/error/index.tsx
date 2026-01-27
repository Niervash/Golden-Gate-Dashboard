import { motion } from "framer-motion";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

const Error404 = () => {
  const error = useRouteError();
  let errorMessage = "Halaman yang Anda cari tidak ditemukan.";
  let errorStatus = 404;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || errorMessage;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  // Animasi untuk kontainer utama
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  // Animasi untuk item
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Animasi untuk angka 404
  const numberVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.8,
      },
    },
    hover: {
      rotate: [0, 10, -10, 10, 0],
      transition: { duration: 0.5 },
    },
  };

  // Animasi untuk ikon
  const iconVariants = {
    hidden: { scale: 0, rotate: 180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 150,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "#23305d" }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Pattern Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "#d9ab3f" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "#af9151" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Error Icon */}
        <motion.div className="mb-8" variants={iconVariants} whileHover="hover">
          <AlertTriangle
            className="w-24 h-24 mx-auto"
            style={{ color: "#d9ab3f" }}
          />
        </motion.div>

        {/* Error Number */}
        <motion.div
          className="mb-6"
          variants={numberVariants}
          whileHover="hover"
        >
          <div className="relative inline-block">
            <h1 className="text-9xl md:text-[12rem] font-bold tracking-tighter leading-none">
              <span style={{ color: "#d9ab3f" }}>4</span>
              <span style={{ color: "#af9151" }}>0</span>
              <span style={{ color: "#d9ab3f" }}>4</span>
            </h1>
            <div
              className="absolute -inset-4 rounded-full blur-lg opacity-30"
              style={{
                background:
                  "radial-gradient(circle, #d9ab3f 0%, transparent 70%)",
              }}
            />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! Halaman Tidak Ditemukan
          </h2>
          <p className="text-xl" style={{ color: "#af9151" }}>
            {errorMessage}
          </p>
          <p className="mt-4" style={{ color: "#af9151" }}>
            Error Code: {errorStatus}
          </p>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants} className="mb-12 max-w-2xl mx-auto">
          <p className="text-lg" style={{ color: "#af9151" }}>
            Sepertinya halaman yang Anda cari telah dipindahkan, dihapus, atau
            mungkin Anda salah mengetik URL. Jangan khawatir, kami akan membantu
            Anda kembali ke jalur yang benar.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-lg font-medium transition-colors"
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
              <Home className="w-5 h-5 mr-2" />
              Kembali ke Beranda
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-lg font-medium transition-colors"
              style={{
                border: "2px solid #d9ab3f",
                color: "#d9ab3f",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(217, 171, 63, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Muat Ulang Halaman
            </button>
          </motion.div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-bold text-white mb-4">
            💡 Tips untuk menghindari error ini:
          </h3>
          <ul className="text-left space-y-2" style={{ color: "#af9151" }}>
            <li className="flex items-start">
              <span className="mr-2" style={{ color: "#d9ab3f" }}>
                •
              </span>
              Pastikan URL yang Anda ketik sudah benar
            </li>
            <li className="flex items-start">
              <span className="mr-2" style={{ color: "#d9ab3f" }}>
                •
              </span>
              Gunakan menu navigasi untuk berpindah halaman
            </li>
            <li className="flex items-start">
              <span className="mr-2" style={{ color: "#d9ab3f" }}>
                •
              </span>
              Periksa koneksi internet Anda
            </li>
            <li className="flex items-start">
              <span className="mr-2" style={{ color: "#d9ab3f" }}>
                •
              </span>
              Jika masalah berlanjut, hubungi administrator
            </li>
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t"
          style={{ borderColor: "#43424e" }}
        >
          <p className="text-white">
            Butuh bantuan?{" "}
            <a
              href="mailto:support@ggschool.sch.id"
              className="font-semibold hover:underline"
              style={{ color: "#d9ab3f" }}
            >
              support@ggschool.sch.id
            </a>
          </p>
        </motion.div>
      </div>

      {/* Floating Elements Animation */}
      <div className="absolute bottom-10 left-10">
        <motion.div
          className="w-4 h-4 rounded-full"
          style={{ background: "#d9ab3f" }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <div className="absolute top-10 right-10">
        <motion.div
          className="w-6 h-6 rounded-full"
          style={{ background: "#af9151" }}
          animate={{
            y: [0, 20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </motion.div>
  );
};

export default Error404;
