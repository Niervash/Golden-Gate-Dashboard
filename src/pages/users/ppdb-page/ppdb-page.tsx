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
import { ppdbApi } from "../../../utils/api";

const steps = [
  { icon: User, label: "Data Diri", step: 1 },
  { icon: GraduationCap, label: "Akademik", step: 2 },
  { icon: Phone, label: "Wali", step: 3 },
  { icon: FileText, label: "Dokumen", step: 4 },
];

const initialFormData = {
  // Step 1
  nama: "",
  nik: "",
  tempatLahir: "",
  tanggalLahir: "",
  jenisKelamin: "",
  alamat: "",
  agama: "",
  telp: "",

  // Step 2
  asalSekolah: "",
  nisn: "",
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
  ijazahSD: null as File | null,
  pasFoto: null as File | null,
};

const mapJenisKelamin = (jk: string): "L" | "P" => {
  const v = (jk || "").trim().toUpperCase();
  if (v === "P" || v === "PEREMPUAN" || v.startsWith("P")) return "P";
  return "L";
};

const PpdbPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [pendingStep, setPendingStep] = useState<number | null>(null);
  const [modalType, setModalType] = useState<"next" | "prev" | "submit">(
    "next",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const requiredFields = [
      formData.nama, formData.nik, formData.tempatLahir, formData.tanggalLahir, formData.jenisKelamin,
      formData.alamat, formData.telp, formData.asalSekolah, formData.nisn,
      formData.nilaiUN, formData.namaAyah, formData.namaIbu,
      formData.pekerjaanAyah, formData.pekerjaanIbu, formData.telpOrtu,
    ];
    if (requiredFields.some((value) => !String(value).trim())) {
      setSubmitError("Lengkapi seluruh data wajib sebelum mengirim pendaftaran.");
      return;
    }
    if (!formData.persetujuan) {
      setSubmitError("Anda harus menyetujui pernyataan kebenaran data.");
      return;
    }
    setSubmitError(null);
    setModalType("submit");
    setShowConfirmModal(true);
  };

  const confirmSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const hasFiles = Boolean(
        formData.aktaKelahiran ||
          formData.kartuKeluarga ||
          formData.ijazahSD ||
          formData.pasFoto,
      );

      const catatanParts: string[] = [];
      if (formData.prestasi?.trim()) {
        catatanParts.push(`Prestasi: ${formData.prestasi.trim()}`);
      }
      if (formData.agama?.trim()) {
        catatanParts.push(`Agama: ${formData.agama.trim()}`);
      }
      if (formData.nik?.trim()) {
        catatanParts.push(`NIK: ${formData.nik.trim()}`);
      }
      if (formData.telpOrtu?.trim()) {
        catatanParts.push(`Telp Ortu: ${formData.telpOrtu.trim()}`);
      }
      if (hasFiles) {
        catatanParts.push(
          "dokumen diunggah di form (belum disimpan server)",
        );
      }

      const nilai = parseFloat(String(formData.nilaiUN));
      const payload = {
        nomor_pendaftaran: `PPDB-${Date.now()}`,
        namaLengkap: formData.nama.trim(),
        nisn: formData.nisn.trim(),
        jenisKelamin: mapJenisKelamin(formData.jenisKelamin),
        tempatLahir: formData.tempatLahir.trim(),
        tanggalLahir: formData.tanggalLahir,
        asalSekolah: formData.asalSekolah.trim(),
        nilaiRataRata: Number.isFinite(nilai) ? nilai : 0,
        tanggal_daftar: new Date().toISOString().slice(0, 10),
        nomorTelepon: formData.telp.trim(),
        email: formData.emailOrtu.trim(),
        alamat: formData.alamat.trim(),
        namaAyah: formData.namaAyah.trim(),
        namaIbu: formData.namaIbu.trim(),
        pekerjaanAyah: formData.pekerjaanAyah.trim(),
        pekerjaanIbu: formData.pekerjaanIbu.trim(),
        dokumenLengkap: hasFiles,
        catatan: catatanParts.join(" | "),
      };

      await ppdbApi.create(payload);

      setShowConfirmModal(false);
      setFormData(initialFormData);
      setCurrentStep(1);
      setShowSuccessNotification(true);
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 5000);
    } catch (err: unknown) {
      const ax = err as {
        response?: { data?: { message?: string; error?: string } };
        message?: string;
      };
      const msg =
        ax?.response?.data?.message ||
        ax?.response?.data?.error ||
        ax?.message ||
        "Gagal mengirim pendaftaran. Silakan coba lagi.";
      setSubmitError(msg);
      // Keep confirm modal open so user can retry or cancel
    } finally {
      setIsSubmitting(false);
    }
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
                <p className="text-gray-600 mb-4">{getModalMessage()}</p>
                {modalType === "submit" && submitError && (
                  <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {submitError}
                  </div>
                )}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    disabled={isSubmitting}
                    onClick={() => {
                      setShowConfirmModal(false);
                      setPendingStep(null);
                      setSubmitError(null);
                    }}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                      modalType === "submit"
                        ? "bg-[#d9ab3f] hover:bg-[#c79a2e]"
                        : "bg-[#23305d] hover:bg-[#1a2445]"
                    }`}
                    onClick={() => {
                      if (modalType === "submit") {
                        void confirmSubmit();
                      } else {
                        confirmNavigation();
                      }
                    }}
                  >
                    {modalType === "submit"
                      ? isSubmitting
                        ? "Mengirim..."
                        : "Ya, Kirim"
                      : "Ya, Lanjutkan"}
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
                Lengkapi formulir pendaftaran online untuk bergabung dengan SMP
                Golden Gate. Pastikan data yang diisi sudah benar.
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
                          disabled={isSubmitting}
                          className="px-4 py-2 bg-[#d9ab3f] text-white rounded-lg text-sm font-medium hover:bg-[#c79a2e] flex items-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                          onClick={handleSubmit}
                        >
                          <CheckCircle className="w-4 h-4" />
                          {isSubmitting ? "Mengirim..." : "Kirim Pendaftaran"}
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
