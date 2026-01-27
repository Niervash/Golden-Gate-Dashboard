import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  GraduationCap,
  Phone,
  FileText,
} from "lucide-react";

interface StepConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  step: number;
  loading?: boolean;
}

const ConfirmationModal: React.FC<StepConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  step,
  loading = false,
}) => {
  const getStepInfo = () => {
    switch (step) {
      case 1:
        return {
          icon: User,
          title: "Konfirmasi Data Diri",
          message: "Apakah data diri calon siswa sudah benar?",
          note: "Pastikan nama, NIK, dan data pribadi sesuai dokumen.",
        };
      case 2:
        return {
          icon: GraduationCap,
          title: "Konfirmasi Data Akademik",
          message: "Apakah data akademik sudah benar?",
          note: "Pastikan NISN dan nilai sesuai dengan dokumen asli.",
        };
      case 3:
        return {
          icon: Phone,
          title: "Konfirmasi Data Wali",
          message: "Apakah data orang tua/wali sudah benar?",
          note: "Pastikan kontak orang tua dapat dihubungi.",
        };
      case 4:
        return {
          icon: FileText,
          title: "Konfirmasi Final",
          message: "Apakah semua data sudah benar?",
          note: "Data yang sudah dikirim tidak dapat diubah.",
        };
      default:
        return {
          icon: AlertCircle,
          title: "Konfirmasi",
          message: "Apakah anda yakin?",
          note: "",
        };
    }
  };

  const stepInfo = getStepInfo();
  const isFinalStep = step === 4;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[9999]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 bg-[#23305d] text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      {React.createElement(stepInfo.icon, {
                        className: "w-6 h-6",
                      })}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{stepInfo.title}</h2>
                      <p className="text-white/80 text-sm">
                        Step {step} dari 4
                      </p>
                    </div>
                  </div>
                  {!loading && (
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-white/20 rounded-lg"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#23305d]/10 flex items-center justify-center">
                    {React.createElement(stepInfo.icon, {
                      className: "w-10 h-10 text-[#23305d]",
                    })}
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {stepInfo.message}
                  </h3>

                  <p className="text-gray-600">{stepInfo.note}</p>

                  {isFinalStep && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-amber-800">
                        ⚠️ Setelah dikirim, data tidak dapat diubah
                      </p>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    disabled={loading}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Tidak
                  </button>
                  <button
                    onClick={onConfirm}
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-[#23305d] text-white rounded-lg font-medium hover:bg-[#1a2445] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Ya, Lanjut
                        {!isFinalStep && (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        )}
                      </>
                    )}
                  </button>
                </div>

                {!isFinalStep && (
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Masih bisa diperbaiki di step berikutnya
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
