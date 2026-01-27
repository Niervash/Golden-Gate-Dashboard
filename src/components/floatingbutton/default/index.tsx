import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Phone,
  Mail,
  ChevronUp,
  MapPin,
  X,
  HelpCircle,
  FileText,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<
    "whatsapp" | "contact" | "ppdb" | null
  >(null);
  const navigate = useNavigate();

  // Data kontak sekolah
  const contactInfo = {
    whatsapp: {
      number: "+62 812-3456-7890",
      link: "https://wa.me/6281234567890?text=Halo%20GOLDEN%20GATE%20SCHOOL%2C%20saya%20ingin%20bertanya%20tentang...",
      label: "Chat via WhatsApp",
    },
    phone: {
      number: "(021) 123-4567",
      link: "tel:+62211234567",
      label: "Telepon Sekarang",
    },
    email: {
      address: "info@ggschool.sch.id",
      link: "mailto:info@ggschool.sch.id?subject=Pertanyaan%20tentang%20GOLDEN%20GATE%20SCHOOL",
      label: "Kirim Email",
    },
    address: {
      text: "Jl. Pendidikan No. 123, Jakarta Selatan",
      link: "https://maps.google.com/?q=Jl.+Pendidikan+No.+123,+Jakarta+Selatan",
      label: "Lihat Peta",
    },
  };

  // Data PPDB
  const ppdbInfo = {
    title: "Formulir Pendaftaran PPDB",
    description: "Daftarkan putra/putri Anda sekarang! Tahun Ajaran 2025/2026",
    deadline: "30 Juni 2025",
    requirements: [
      "Fotokopi Akta Kelahiran",
      "Fotokopi Kartu Keluarga",
      "Pas Foto 3x4 (2 lembar)",
      "Rapor Kelas 9 (semester 1-5)",
      "Sertifikat Prestasi (jika ada)",
    ],
  };

  // Scroll ke atas
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsOpen(false);
    setActiveModal(null);
  };

  // Navigasi ke halaman PPDB
  const goToPPDB = () => {
    navigate("/ppdb");
    setIsOpen(false);
    setActiveModal(null);
  };

  // Buka modal PPDB
  const openPPDBModal = () => {
    setActiveModal("ppdb");
    setIsOpen(true);
  };

  // Toggle modal dengan fungsi close jika sudah terbuka
  const toggleModal = (modalType: "whatsapp" | "contact" | "ppdb") => {
    if (activeModal === modalType) {
      // Jika modal yang sama diklik lagi, tutup modal dan reset floating button
      setActiveModal(null);
      setIsOpen(false);
    } else {
      // Buka modal yang baru
      setActiveModal(modalType);
      setIsOpen(true);
    }
  };

  // Tutup semua modal dan reset floating button
  const closeAll = () => {
    setActiveModal(null);
    setIsOpen(false);
  };

  // Menu items yang akan muncul
  const menuItems = [
    {
      icon: FileText,
      label: "Form PPDB",
      color: "#d9ab3f",
      iconColor: "#23305d",
      action: openPPDBModal,
      isSpecial: true,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      color: "#25D366",
      iconColor: "#ffffff",
      action: () => toggleModal("whatsapp"),
      isSpecial: false,
    },
    {
      icon: HelpCircle,
      label: "Kontak",
      color: "#23305d",
      iconColor: "#d9ab3f",
      action: () => toggleModal("contact"),
      isSpecial: false,
    },
    {
      icon: ChevronUp,
      label: "Ke Atas",
      color: "#23305d",
      iconColor: "#d9ab3f",
      action: scrollToTop,
      isSpecial: false,
    },
  ];

  return (
    <>
      {/* Floating Button Container */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Menu Items */}
        <AnimatePresence>
          {isOpen && !activeModal && (
            <div className="absolute bottom-20 right-0 space-y-3 mb-4">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, y: 20, scale: 0.5 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.3,
                      type: "spring",
                      stiffness: 150,
                    }}
                    exit={{
                      opacity: 0,
                      y: 20,
                      scale: 0.5,
                    }}
                    onClick={item.action}
                    className="w-14 h-14 rounded-full shadow-xl flex flex-col items-center justify-center relative group"
                    style={{
                      background: item.color,
                      border: item.isSpecial ? "2px solid #23305d" : "none",
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotate: item.isSpecial ? [0, 10, -10, 0] : 0,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: item.iconColor }}
                    />

                    {/* Badge untuk PPDB */}
                    {item.isSpecial && (
                      <motion.span
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: "#ef4444", color: "#ffffff" }}
                        animate={{
                          scale: [1, 1.2, 1],
                          transition: { repeat: Infinity, duration: 1.5 },
                        }}
                      >
                        <Calendar className="w-3 h-3" />
                      </motion.span>
                    )}

                    {/* Tooltip */}
                    <div className="absolute right-16 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {item.label}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Main Floating Button */}
        <motion.button
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            scale: 1,
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            scale: { type: "spring", stiffness: 200, damping: 15 },
            rotate: { duration: 0.3 },
          }}
          onClick={() => {
            if (activeModal) {
              // Jika ada modal terbuka, tutup semua
              closeAll();
            } else {
              // Jika tidak ada modal terbuka, toggle menu
              setIsOpen(!isOpen);
            }
          }}
          className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center relative group"
          style={{
            background: activeModal ? "#23305d" : "#d9ab3f",
            border: "2px solid #23305d",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeModal ? (
            <X className="w-7 h-7" style={{ color: "#d9ab3f" }} />
          ) : isOpen ? (
            <X className="w-7 h-7" style={{ color: "#23305d" }} />
          ) : (
            <MessageCircle className="w-7 h-7" style={{ color: "#23305d" }} />
          )}

          {/* Notification Badge */}
          {!activeModal && (
            <motion.div
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "#ef4444", color: "#ffffff" }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                times: [0, 0.2, 0.4, 1],
              }}
            >
              !
            </motion.div>
          )}

          {/* Tooltip */}
          <div className="absolute right-20 bg-gray-900 text-white text-sm py-2 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {activeModal ? "Tutup" : "Butuh Bantuan?"}
          </div>
        </motion.button>
      </div>

      {/* Modal WhatsApp (di tengah layar) */}
      <AnimatePresence>
        {activeModal === "whatsapp" && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAll}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                style={{ border: "2px solid #25D366" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3
                      className="font-bold text-lg flex items-center gap-2"
                      style={{ color: "#23305d" }}
                    >
                      <MessageCircle
                        className="w-5 h-5"
                        style={{ color: "#25D366" }}
                      />
                      WhatsApp Support
                    </h3>
                    <button
                      onClick={closeAll}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm mb-3" style={{ color: "#43424e" }}>
                      Hubungi admin kami untuk informasi lebih lanjut tentang
                      pendaftaran, program, dan lainnya.
                    </p>
                    <div
                      className="flex items-center gap-3 p-3 rounded-lg"
                      style={{ background: "#f0fdf4" }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background: "#dcfce7" }}
                      >
                        <MessageCircle
                          className="w-5 h-5"
                          style={{ color: "#16a34a" }}
                        />
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: "#23305d" }}>
                          Admin Sekolah
                        </p>
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "#25D366" }}
                        >
                          {contactInfo.whatsapp.number}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={contactInfo.whatsapp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 rounded-lg font-medium text-center transition-colors hover:opacity-90"
                      style={{
                        background: "#25D366",
                        color: "#ffffff",
                      }}
                      onClick={closeAll}
                    >
                      Buka WhatsApp
                    </a>
                    <button
                      onClick={closeAll}
                      className="py-3 px-4 rounded-lg font-medium text-center transition-colors"
                      style={{
                        border: "1px solid #d1d5db",
                        color: "#6b7280",
                      }}
                    >
                      Nanti Saja
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Modal Kontak (di tengah layar) */}
      <AnimatePresence>
        {activeModal === "contact" && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAll}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                style={{ border: "2px solid #d9ab3f" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3
                      className="font-bold text-lg"
                      style={{ color: "#23305d" }}
                    >
                      Kontak Sekolah
                    </h3>
                    <button
                      onClick={closeAll}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  <div className="space-y-3 mb-4">
                    <a
                      href={contactInfo.phone.link}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={closeAll}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(217, 171, 63, 0.1)" }}
                      >
                        <Phone
                          className="w-5 h-5"
                          style={{ color: "#d9ab3f" }}
                        />
                      </div>
                      <div className="flex-1">
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#23305d" }}
                        >
                          Telepon
                        </p>
                        <p className="text-sm" style={{ color: "#43424e" }}>
                          {contactInfo.phone.number}
                        </p>
                      </div>
                    </a>

                    <a
                      href={contactInfo.email.link}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={closeAll}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(217, 171, 63, 0.1)" }}
                      >
                        <Mail
                          className="w-5 h-5"
                          style={{ color: "#d9ab3f" }}
                        />
                      </div>
                      <div className="flex-1">
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#23305d" }}
                        >
                          Email
                        </p>
                        <p className="text-sm" style={{ color: "#43424e" }}>
                          {contactInfo.email.address}
                        </p>
                      </div>
                    </a>

                    <a
                      href={contactInfo.address.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={closeAll}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(217, 171, 63, 0.1)" }}
                      >
                        <MapPin
                          className="w-5 h-5"
                          style={{ color: "#d9ab3f" }}
                        />
                      </div>
                      <div className="flex-1">
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#23305d" }}
                        >
                          Alamat
                        </p>
                        <p className="text-sm" style={{ color: "#43424e" }}>
                          {contactInfo.address.text}
                        </p>
                      </div>
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        setActiveModal("whatsapp");
                      }}
                      className="flex-1 py-3 rounded-lg font-medium text-center transition-colors hover:opacity-90"
                      style={{
                        background: "#25D366",
                        color: "#ffffff",
                      }}
                    >
                      Chat via WhatsApp
                    </button>
                    <button
                      onClick={closeAll}
                      className="py-3 px-4 rounded-lg font-medium text-center transition-colors"
                      style={{
                        border: "1px solid #d1d5db",
                        color: "#6b7280",
                      }}
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Modal PPDB (di tengah layar) */}
      <AnimatePresence>
        {activeModal === "ppdb" && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAll}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                style={{
                  border: "2px solid #d9ab3f",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #fefce8 100%)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3
                        className="font-bold text-lg flex items-center gap-2"
                        style={{ color: "#23305d" }}
                      >
                        <FileText
                          className="w-5 h-5"
                          style={{ color: "#d9ab3f" }}
                        />
                        {ppdbInfo.title}
                      </h3>
                      <p className="text-xs mt-1" style={{ color: "#43424e" }}>
                        Tahun Ajaran 2025/2026
                      </p>
                    </div>
                    <button
                      onClick={closeAll}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm mb-4" style={{ color: "#43424e" }}>
                      {ppdbInfo.description}
                    </p>

                    {/* Deadline Info */}
                    <div
                      className="mb-4 p-3 rounded-lg"
                      style={{ background: "rgba(217, 171, 63, 0.1)" }}
                    >
                      <p
                        className="text-sm font-medium flex items-center gap-2"
                        style={{ color: "#23305d" }}
                      >
                        <Calendar
                          className="w-4 h-4"
                          style={{ color: "#d9ab3f" }}
                        />
                        Batas Pendaftaran:
                        <span
                          className="font-bold"
                          style={{ color: "#ef4444" }}
                        >
                          {ppdbInfo.deadline}
                        </span>
                      </p>
                    </div>

                    {/* Persyaratan */}
                    <div className="mb-4">
                      <h4
                        className="font-semibold text-sm mb-2"
                        style={{ color: "#23305d" }}
                      >
                        Persyaratan Dokumen:
                      </h4>
                      <ul className="space-y-1">
                        {ppdbInfo.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span
                              className="text-xs mt-0.5"
                              style={{ color: "#d9ab3f" }}
                            >
                              •
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: "#43424e" }}
                            >
                              {req}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={goToPPDB}
                      className="w-full py-3 rounded-lg font-bold text-center transition-colors hover:opacity-90"
                      style={{
                        background: "#d9ab3f",
                        color: "#23305d",
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Daftar Sekarang
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setActiveModal("whatsapp");
                        }}
                        className="py-2 rounded-lg font-medium text-center transition-colors hover:opacity-90"
                        style={{
                          background: "rgba(37, 211, 102, 0.1)",
                          color: "#25D366",
                          border: "1px solid #25D366",
                        }}
                      >
                        Tanya via WhatsApp
                      </button>
                      <button
                        onClick={closeAll}
                        className="py-2 rounded-lg font-medium text-center transition-colors"
                        style={{
                          border: "1px solid #d1d5db",
                          color: "#6b7280",
                        }}
                      >
                        Lihat Nanti
                      </button>
                    </div>
                  </div>

                  {/* Info Tambahan */}
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <p
                      className="text-xs text-center"
                      style={{ color: "#76674f" }}
                    >
                      Formulir pendaftaran dapat diisi secara online maupun
                      offline di sekolah.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingButton;
