import { motion, AnimatePresence } from "framer-motion";
import { ILoveGGS } from "../../assets";

interface PreloaderProps {
  show: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#23305d] via-[#1a2445] to-[#0f172a] z-[9999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            {/* Logo dengan animasi */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 180 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
            >
              <img
                src={ILoveGGS}
                alt="Golden Gate School"
                className="w-32 h-32 md:w-40 md:h-40"
              />
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center"
            >
              <p className="text-white text-lg font-semibold">Loading...</p>
              <p className="text-[#af9151] text-sm mt-1">Tunggu sebentar</p>
            </motion.div>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#d9ab3f] via-[#af9151] to-[#d9ab3f]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
