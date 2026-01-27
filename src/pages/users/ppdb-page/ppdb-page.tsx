import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  FileText,
  User,
  GraduationCap,
  Phone,
  CheckCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  X,
} from "lucide-react";
import {
  AcademicData,
  DocumentsData,
  ParentsData,
  StepIndicator,
  StudentsData,
} from "../../../components";
import { PpdbLayout } from "../../../layouts";

const steps = [
  { icon: User, label: "Data Diri", step: 1 },
  { icon: GraduationCap, label: "Akademik", step: 2 },
  { icon: Phone, label: "Wali", step: 3 },
  { icon: FileText, label: "Dokumen", step: 4 },
];

const PpdbPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [pendingStep, setPendingStep] = useState<number | null>(null);
  const [modalType, setModalType] = useState<"next" | "prev" | "submit">(
    "next",
  );

  const [formData, setFormData] = useState({
    // Step 1
    nama: "",
    nik: "",
    ttl: "",
    jenisKelamin: "",
    alamat: "",
    agama: "",
    telp: "",

    // Step 2
    asalSekolah: "",
    nisn: "",
    jurusan: "",
    nilaiUN: "",
    prestasi: "",

    // Step 3
    namaAyah: "",
    namaIbu: "",
    pekerjaanAyah: "",
    pekerjaanIbu: "",
    telpOrtu: "",
    emailOrtu: "",

    // Step 4
    persetujuan: false,
    aktaKelahiran: null as File | null,
    kartuKeluarga: null as File | null,
    ijazahSMP: null as File | null,
    pasFoto: null as File | null,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    setModalType("submit");
    setShowConfirmModal(true);
  };

  const confirmSubmit = () => {
    // Logic untuk submit form
    console.log("Form data submitted:", formData);

    // Tutup modal konfirmasi
    setShowConfirmModal(false);

    // Tampilkan notifikasi sukses
    setShowSuccessNotification(true);

    // Auto-hide notifikasi setelah 5 detik
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 5000);
  };

  const handleNavigation = (direction: "next" | "prev") => {
    setModalType(direction);
    const targetStep = direction === "next" ? currentStep + 1 : currentStep - 1;
    setPendingStep(targetStep);
    setShowConfirmModal(true);
  };

  const confirmNavigation = () => {
    if (pendingStep !== null) {
      setCurrentStep(pendingStep);
    }
    setShowConfirmModal(false);
    setPendingStep(null);
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case 1:
        return User;
      case 2:
        return GraduationCap;
      case 3:
        return Phone;
      case 4:
        return FileText;
      default:
        return User;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Data Diri Calon Siswa";
      case 2:
        return "Data Akademik";
      case 3:
        return "Data Orang Tua / Wali";
      case 4:
        return "Upload Dokumen";
      default:
        return "";
    }
  };

  const getModalMessage = () => {
    switch (modalType) {
      case "next":
        return "Apakah Anda yakin ingin melanjutkan ke langkah berikutnya? Pastikan data yang Anda isi sudah benar.";
      case "prev":
        return "Apakah Anda yakin ingin kembali ke langkah sebelumnya? Data yang belum disimpan mungkin akan hilang.";
      case "submit":
        return "Apakah Anda yakin ingin mengirimkan formulir pendaftaran ini? Pastikan semua data dan dokumen sudah lengkap dan benar.";
      default:
        return "";
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case "next":
        return "Lanjut ke Langkah Berikutnya";
      case "prev":
        return "Kembali ke Langkah Sebelumnya";
      case "submit":
        return "Kirim Pendaftaran";
      default:
        return "Konfirmasi";
    }
  };

  return (
    <div>
      <PpdbLayout>
        {/* Success Notification */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{
            opacity: showSuccessNotification ? 1 : 0,
            y: showSuccessNotification ? 0 : -50,
            scale: showSuccessNotification ? 1 : 0.9,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.3,
          }}
          className={`fixed top-6 right-6 z-[60] max-w-sm w-full ${showSuccessNotification ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <div className="bg-white border-l-4 border-yellow-500 rounded-lg shadow-xl p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-yellow-500" />
                    </div>
                  </motion.div>
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 className="font-bold text-gray-800">
                    Pendaftaran Berhasil!
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Formulir pendaftaran Anda telah berhasil dikirim. Kami akan
                    menghubungi Anda melalui email/telepon untuk informasi lebih
                    lanjut.
                  </p>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: showSuccessNotification ? "100%" : 0 }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-1 bg-yellow-500 mt-2 rounded-full"
                  />
                </div>
              </div>
              <button
                onClick={() => setShowSuccessNotification(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border-2 border-yellow-500 rounded-xl shadow-xl max-w-md w-full"
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {getModalTitle()}
                </h3>
                <p className="text-gray-600 mb-6">{getModalMessage()}</p>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setShowConfirmModal(false);
                      setPendingStep(null);
                    }}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
                      modalType === "submit"
                        ? "bg-[#d9ab3f] hover:bg-[#c79a2e]"
                        : "bg-[#23305d] hover:bg-[#1a2445]"
                    }`}
                    onClick={() => {
                      if (modalType === "submit") {
                        confirmSubmit();
                      } else {
                        confirmNavigation();
                      }
                    }}
                  >
                    {modalType === "submit" ? "Ya, Kirim" : "Ya, Lanjutkan"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Form Section */}
        <section className="py-12 md:py-20">
          {/* text */}
          <div className="container mx-auto px-4 text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.span
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
                style={{
                  background: "rgba(217, 171, 63, 0.15)",
                  color: "#d9ab3f",
                }}
                whileHover={{ scale: 1.05 }}
              >
                Tahun Ajaran 2025/2026
              </motion.span>
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-blu-100 mb-4"
                style={{ color: "#23305d" }}
              >
                Pendaftaran Peserta Didik Baru
              </h1>
              <p
                className="text-blue/70 max-w-2xl mx-auto"
                style={{ color: "#23305d" }}
              >
                Lengkapi formulir pendaftaran online untuk bergabung dengan SMA
                Nusantara. Pastikan data yang diisi sudah benar.
              </p>
            </motion.div>
          </div>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Step Indicator */}
              <StepIndicator steps={steps} currentStep={currentStep} />

              {/* Form Card */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      {React.createElement(getStepIcon(), {
                        className: "w-5 h-5 text-[#d9ab3f]",
                      })}
                      {getStepTitle()}
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {/* Render step yang sesuai */}
                    {currentStep === 1 && (
                      <StudentsData
                        formData={formData}
                        onChange={handleChange}
                      />
                    )}
                    {currentStep === 2 && (
                      <AcademicData
                        formData={formData}
                        onChange={handleChange}
                      />
                    )}
                    {currentStep === 3 && (
                      <ParentsData
                        formData={formData}
                        onChange={handleChange}
                      />
                    )}
                    {currentStep === 4 && (
                      <DocumentsData
                        formData={formData}
                        onChange={handleChange}
                      />
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        className={`px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium flex items-center gap-2 ${
                          currentStep === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                        }`}
                        onClick={() => {
                          if (currentStep > 1) {
                            handleNavigation("prev");
                          }
                        }}
                        disabled={currentStep === 1}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Sebelumnya
                      </button>
                      {currentStep < 4 ? (
                        <button
                          type="button"
                          className="px-4 py-2 bg-[#23305d] text-white rounded-lg text-sm font-medium hover:bg-[#1a2445] flex items-center gap-2 transition-colors"
                          onClick={() => handleNavigation("next")}
                        >
                          Selanjutnya
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="px-4 py-2 bg-[#d9ab3f] text-white rounded-lg text-sm font-medium hover:bg-[#c79a2e] flex items-center gap-2 transition-colors"
                          onClick={handleSubmit}
                        >
                          <CheckCircle className="w-4 h-4" />
                          Kirim Pendaftaran
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Info */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#d9ab3f] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">
                    Batas Waktu Pendaftaran
                  </p>
                  <p className="text-sm text-gray-600">
                    30 Juni 2025 pukul 23:59 WIB. Pastikan data sudah lengkap
                    sebelum mengirim.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PpdbLayout>
    </div>
  );
};

export default PpdbPage;
