import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ILoveGGS, ILovemyMusic } from "../../../assets";
import confetti from "canvas-confetti";
import { ArrowBigLeft, X, Music, Pause } from "lucide-react";

// Data siswa
const dummyStudents = [
  {
    nisn: "0101609144",
    name: "Ariqah Jinan Khayyirah",
    status: "GRADUATED",
    averageScore: 83,
  },
  {
    nisn: "0105891076",
    name: "Naylah Nafisa Ayu",
    status: "GRADUATED",
    averageScore: 82,
  },
  {
    nisn: "0113844726",
    name: "Damai Gratia Tri Tanga Putri",
    status: "GRADUATED",
    averageScore: 89,
  },
];

const GraduationPage: React.FC = () => {
  const [nisn, setNisn] = useState("");
  const [result, setResult] = useState<{
    found: boolean;
    name?: string;
    status?: string;
    averageScore?: number;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<{
    name: string;
    score: number;
  } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Music entrance state
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (
      result &&
      result.found &&
      result.status === "GRADUATED" &&
      result.name &&
      result.averageScore !== undefined
    ) {
      setModalData({ name: result.name, score: result.averageScore });
      setShowModal(true);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    } else if (result && !result.found) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [result]);

  // Initialize audio and attempt autoplay
  useEffect(() => {
    const audio = new Audio(ILovemyMusic);
    audio.loop = true;
    audio.volume = 0.8;
    audio.preload = "auto";
    audioRef.current = audio;

    // Auto-play music when page loads
    audio
      .play()
      .then(() => {
        setIsMusicPlaying(true);
      })
      .catch((err) => {
        console.warn("Autoplay was prevented by browser:", err);
        setIsMusicPlaying(false);
        // Optional: show a subtle hint that user needs to click the music button
      });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Audio play failed:", err);
        setIsMusicPlaying(false);
      });
      setIsMusicPlaying(true);
    }
  };

  const handleCheck = () => {
    const student = dummyStudents.find((s) => s.nisn === nisn.trim());
    if (student) {
      setResult({
        found: true,
        name: student.name,
        status: student.status,
        averageScore: student.averageScore,
      });
      if (student.status === "GRADUATED") {
        confetti({
          particleCount: 180,
          spread: 100,
          origin: { y: 0.6 },
          startVelocity: 20,
          colors: ["#C5A059", "#D4AF37", "#F8F6F0", "#23305d"],
        });
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7, x: 0.2 },
          startVelocity: 25,
          colors: ["#C5A059", "#FFFFFF"],
        });
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7, x: 0.8 },
          startVelocity: 25,
          colors: ["#C5A059", "#FFFFFF"],
        });
      }
    } else {
      setResult({ found: false });
    }
  };

  return (
    <>
      <style>{`
        /* Elegant GGS Theme - Official Colors: #23305d (Navy) & #C5A059 (Gold) */
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .font-serif-elegant {
          font-family: 'Cormorant Garamond', serif;
        }
        .font-sans-modern {
          font-family: 'Inter', sans-serif;
        }
        
        .bg-gradient-ceremony {
          background: linear-gradient(145deg, #FEFCF5 0%, #F7F4EC 100%);
        }
        
        .gold-border-bottom {
          border-bottom: 2px solid #C5A059;
        }
        
        .gold-shadow {
          box-shadow: 0 8px 20px -6px rgba(197, 160, 89, 0.2);
        }
        
        .card-elegant {
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(0px);
          border: 1px solid rgba(197, 160, 89, 0.35);
          transition: all 0.25s ease;
        }
        
        .input-elegant {
          background: #FFFFFF;
          border: 1px solid #E2DCCD;
          transition: all 0.2s;
        }
        
        .input-elegant:focus {
          border-color: #C5A059;
          outline: none;
          box-shadow: 0 0 0 2px rgba(197, 160, 89, 0.2);
        }
        
        .btn-gold {
          background: #C5A059;
          color: #23305d;
          font-weight: 600;
          transition: all 0.2s;
          border-bottom: 2px solid #9E793E;
        }
        
        .btn-gold:hover {
          background: #D4AF37;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(197, 160, 89, 0.3);
        }
        
        .modal-gold {
          background: #FFFFFF;
          border-top: 6px solid #C5A059;
          box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.25);
        }
        
        .music-btn {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(4px);
          border: 1px solid #C5A059;
          color: #23305d;
          transition: all 0.2s;
        }
        
        .music-btn:hover {
          background: #C5A059;
          color: white;
          border-color: #C5A059;
        }
        
        @keyframes softRise {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-soft-rise {
          animation: softRise 0.5s ease-out forwards;
        }
        
        .decor-line {
          height: 2px;
          background: linear-gradient(90deg, transparent, #C5A059, #D4AF37, #C5A059, transparent);
          width: 80px;
          margin: 0 auto;
        }
        
        @media (min-width: 640px) {
          .decor-line {
            width: 100px;
          }
        }
        
        .text-navy {
          color: #23305d;
        }
        .bg-navy {
          background-color: #23305d;
        }
        .border-navy {
          border-color: #23305d;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-ceremony font-sans-modern text-gray-800 relative">
        {/* Tombol Kembali - Responsif */}
        <button
          onClick={() => window.history.back()}
          className="fixed top-4 left-4 z-50 flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-white/80 backdrop-blur-sm text-[#23305d] border border-[#C5A059]/50 rounded-full shadow-sm hover:bg-[#C5A059] hover:text-white hover:border-[#C5A059] transition-all sm:top-5 sm:left-5 sm:px-4 sm:py-2"
        >
          <ArrowBigLeft size={14} className="sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">Back</span>
        </button>

        {/* Music Entrance Button - Responsif (lebih kecil di mobile) */}
        <button
          onClick={toggleMusic}
          className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-10 h-10 rounded-full music-btn shadow-md sm:bottom-6 sm:right-6 sm:w-12 sm:h-12"
          aria-label="Entrance Music"
        >
          {isMusicPlaying ? (
            <Pause size={18} className="sm:w-5 sm:h-5" />
          ) : (
            <Music size={18} className="sm:w-5 sm:h-5" />
          )}
        </button>

        {/* HERO SECTION - Padding dan min-height lebih kecil di mobile */}
        <section className="relative flex flex-col items-center justify-center px-4 pt-10 pb-8 min-h-[60vh] sm:pt-16 sm:pb-12 sm:min-h-[75vh] text-center">
          <motion.div
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-20 md:w-28 h-auto mb-4 sm:w-28 sm:mb-5"
          >
            <img
              src={ILoveGGS}
              alt="GGS Logo"
              className="w-full object-contain drop-shadow-sm"
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <h1 className="font-serif-elegant text-2xl sm:text-4xl md:text-5xl font-bold tracking-wide leading-tight">
              <span className="text-[#23305d]">Graduation</span>
              <br />
              <span className="text-[#C5A059]">Announcement 2026</span>
            </h1>
            <div className="decor-line my-3 sm:my-4"></div>
            <h2 className="text-base sm:text-xl md:text-2xl font-medium text-[#23305d] mt-2">
              GGS International School
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-md mx-auto italic px-2">
              "Honoring Excellence, Embracing the Future"
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="w-full max-w-2xl mx-auto mt-6 sm:mt-8"
          >
            <div className="bg-white/90 card-elegant rounded-xl p-5 md:p-7 gold-shadow">
              <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700">
                <span className="font-serif-elegant text-lg sm:text-xl font-semibold text-[#C5A059] block mb-2">
                  Dear Students & Families,
                </span>
                With immense pride and joy, we celebrate the graduation of the
                Class of 2026. Your perseverance, curiosity, and integrity have
                led you to this historic milestone. May you continue to
                illuminate the world with knowledge and compassion.
              </p>
              <p className="mt-4 text-[#23305d] font-serif-elegant font-semibold text-right text-xs sm:text-sm tracking-wide">
                — Principal of Golden Gate School
              </p>
            </div>
          </motion.div>

          <motion.button
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() =>
              document
                .getElementById("check-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 sm:mt-10 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full btn-gold shadow-md"
          >
            VIEW YOUR GRADUATION STATUS
          </motion.button>
        </section>

        {/* CHECK RESULTS SECTION */}
        <section
          id="check-section"
          className="relative py-12 px-4 flex flex-col items-center bg-white/40 sm:py-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-6 sm:mb-7"
          >
            <h2 className="font-serif-elegant text-2xl sm:text-3xl md:text-4xl font-semibold text-[#23305d]">
              Check Your Result
            </h2>
            <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mt-2 mb-2 sm:w-16 sm:mt-3 sm:mb-3"></div>
            <p className="text-gray-600 text-xs sm:text-sm max-w-md">
              Please enter your 10-digit NISN to verify graduation status
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-8 sm:mb-10">
            <input
              type="text"
              inputMode="numeric"
              placeholder="NISN (e.g., 0101609144)"
              value={nisn}
              onChange={(e) => {
                setResult(null);
                setNisn(e.target.value.replace(/\D/g, "").slice(0, 10));
              }}
              className="flex-1 px-4 py-2.5 rounded-full input-elegant font-mono text-sm shadow-sm sm:px-5 sm:py-3"
            />
            <button
              onClick={handleCheck}
              disabled={!nisn}
              className="px-5 py-2.5 rounded-full btn-gold text-sm font-semibold disabled:opacity-40 disabled:pointer-events-none shadow-sm sm:px-6 sm:py-3"
            >
              VERIFY NISN
            </button>
          </div>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                ref={resultRef}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md"
              >
                {result.found ? (
                  <div className="card-elegant bg-white rounded-2xl p-5 gold-shadow sm:p-6">
                    <h3 className="font-serif-elegant text-lg sm:text-xl font-bold text-[#C5A059] text-center border-b border-[#C5A059]/30 pb-2 mb-3 sm:mb-4">
                      Graduation Credential
                    </h3>
                    <div className="space-y-2 text-gray-800 sm:space-y-3">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="font-semibold text-gray-600 text-sm sm:text-base">
                          NAME
                        </span>
                        <span className="font-medium text-right text-sm sm:text-base">
                          {result.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="font-semibold text-gray-600 text-sm sm:text-base">
                          NISN
                        </span>
                        <span className="font-mono text-xs sm:text-sm">
                          {nisn}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <span className="font-semibold text-gray-600 text-sm sm:text-base">
                          STATUS
                        </span>
                        <span
                          className={`font-bold text-sm sm:text-base ${result.status === "GRADUATED" ? "text-green-700" : "text-red-600"}`}
                        >
                          {result.status === "GRADUATED"
                            ? "GRADUATED ✓"
                            : "NOT GRADUATED"}
                        </span>
                      </div>
                      {result.status === "GRADUATED" &&
                        result.averageScore !== undefined && (
                          <div className="flex justify-between items-center bg-[#F9F5EB] p-3 rounded-lg mt-2">
                            <span className="font-semibold text-gray-700 text-sm sm:text-base">
                              FINAL AVERAGE
                            </span>
                            <span className="font-mono text-base sm:text-lg font-bold text-[#C5A059]">
                              {result.averageScore.toFixed(1)}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-5 text-center border border-red-200 shadow-sm sm:p-6">
                    <p className="text-red-600 font-semibold text-base sm:text-lg">
                      NISN Not Found
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">
                      Please verify your number and try again.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <footer className="py-5 text-center border-t border-[#C5A059]/20 bg-white/50 sm:py-6">
          <p className="text-[10px] text-gray-500 font-mono tracking-wide sm:text-xs">
            © 2026 GGS International School — All Rights Reserved
          </p>
        </footer>
      </div>

      {/* MODAL CONGRATULATIONS - Responsif */}
      <AnimatePresence>
        {showModal && modalData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-[#23305d]/60 backdrop-blur-sm sm:p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 28, stiffness: 400 }}
              className="modal-gold relative max-w-sm sm:max-w-md w-full rounded-2xl p-5 text-center sm:p-7"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-[#C5A059] transition sm:top-4 sm:right-4"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
              <div className="mb-2 text-5xl sm:mb-3 sm:text-6xl">🎓✨</div>
              <h2 className="font-serif-elegant text-xl sm:text-2xl md:text-3xl font-bold text-[#23305d]">
                Congratulations!
              </h2>
              <p className="text-gray-700 text-xs sm:text-sm mt-2">
                You have officially graduated from
              </p>
              <p className="text-[#C5A059] font-serif-elegant text-lg sm:text-xl font-semibold mt-1">
                GGS International School
              </p>
              <div className="my-3 w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto sm:my-4 sm:w-20"></div>
              <div className="space-y-1 text-gray-800">
                <p className="text-sm sm:text-base">
                  <span className="font-semibold text-gray-600">Name:</span>{" "}
                  <span className="font-medium">{modalData.name}</span>
                </p>
                <p className="text-sm sm:text-base">
                  <span className="font-semibold text-gray-600">
                    Average Score:
                  </span>{" "}
                  <span className="font-mono font-bold text-[#C5A059] text-base sm:text-lg">
                    {modalData.score.toFixed(1)}
                  </span>
                </p>
              </div>
              {modalData.score >= 85 && (
                <p className="mt-2 text-[#C5A059] text-xs sm:text-sm font-medium sm:mt-3">
                  ⭐ Distinction Honors ⭐
                </p>
              )}
              <button
                onClick={() => setShowModal(false)}
                className="mt-5 px-5 py-1.5 rounded-full btn-gold text-xs sm:text-sm font-semibold sm:mt-6 sm:px-6 sm:py-2"
              >
                CLOSE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GraduationPage;
