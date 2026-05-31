import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ILoveGGS } from "../../../assets";
import confetti from "canvas-confetti";
import { ArrowBigLeft, X } from "lucide-react";

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
  const [glitchActive, setGlitchActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<{
    name: string;
    score: number;
  } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

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
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
          startVelocity: 20,
          colors: ["#fbbf24", "#34d399", "#60a5fa", "#f472b6"],
        });
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.7, x: 0.2 },
          startVelocity: 25,
        });
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.7, x: 0.8 },
          startVelocity: 25,
        });
      }
    } else {
      setResult({ found: false });
    }
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 500);
  };

  return (
    <>
      <style>{`
        .bg-dark { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #0a0c12 0%, #0f111a 100%); z-index: -3; }
        .grid-clear { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(to right, rgba(0, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 255, 0.15) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; z-index: -2; }
        .noise-light { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.2'/%3E%3C/svg%3E"); background-repeat: repeat; pointer-events: none; z-index: -1; mix-blend-mode: overlay; }
        .scanline-faint { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 4px); pointer-events: none; z-index: 1; }
        @keyframes glitchSimple { 0% { text-shadow: -2px 0 #ff00c1, 2px 0 #00fff9; transform: skew(0deg); } 25% { text-shadow: -3px 0 #ff00c1, 3px 0 #00fff9; transform: skew(2deg); } 50% { text-shadow: -1px 0 #ff00c1, 1px 0 #00fff9; transform: skew(-1deg); } 75% { text-shadow: -2px 0 #ff00c1, 2px 0 #00fff9; transform: skew(1deg); } 100% { text-shadow: 0 0 0 transparent; transform: skew(0deg); } }
        .glitch-text { animation: glitchSimple 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .glitch-hover:hover { animation: glitchSimple 0.25s steps(2) forwards; }
        @keyframes borderGlitch { 0% { border-color: rgba(0, 255, 255, 0.6); box-shadow: 0 0 0 rgba(255,0,200,0); } 50% { border-color: #ff00c1; box-shadow: 0 0 6px #ff00c1; } 100% { border-color: rgba(0, 255, 255, 0.6); box-shadow: 0 0 0 rgba(255,0,200,0); } }
        .border-glitch { animation: borderGlitch 0.3s ease-out; }
        /* Modal styles */
        .modal-overlay { background: rgba(0,0,0,0.8); backdrop-filter: blur(4px); }
        .modal-content { box-shadow: 0 0 30px rgba(251,191,36,0.3); border: 1px solid rgba(251,191,36,0.5); background: linear-gradient(135deg, #1e1b2e, #0f0c1a); }
      `}</style>

      <div className="min-h-screen text-white font-body relative">
        {/* Tombol Kembali */}
        <button
          onClick={() => window.history.back()}
          className="fixed top-4 left-4 z-50 px-3 py-2 text-[10px] sm:text-xs font-heading bg-black/70 text-yellow-400 border-2 border-yellow-400/70 rounded-sm hover:bg-yellow-400 hover:text-black transition-all glitch-hover"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          <ArrowBigLeft />
        </button>

        <div className="bg-dark" />
        <div className="grid-clear" />
        <div className="noise-light" />
        <div className="scanline-faint" />

        {/* HERO SECTION */}
        <section className="relative flex flex-col items-center justify-center px-4 pt-12 pb-8 min-h-[70vh]">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 md:w-32 h-auto mb-4"
          >
            <img src={ILoveGGS} alt="Logo" className="w-full object-contain" />
          </motion.div>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-center mb-5"
          >
            <h1
              className={`text-xl sm:text-2xl md:text-3xl font-heading leading-tight ${glitchActive ? "glitch-text" : "glitch-hover"}`}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                color: "#fbbf24",
              }}
            >
              GRADUATION
              <br />
              ANNOUNCEMENT
              <br />
              2026
            </h1>
            <h2 className="text-base sm:text-lg md:text-xl font-heading mt-2 text-white/90">
              GGS International School
            </h2>
            <p className="text-xs sm:text-sm mt-2 text-cyan-300/80 max-w-md">
              "Celebrating Achievement, Excellence, and New Beginnings"
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-lg bg-black/50 backdrop-blur-sm p-5 rounded-md border-l-4 border-yellow-400 mb-6"
          >
            <p className="text-sm md:text-base leading-relaxed text-white/90">
              <span className="text-yellow-400 font-bold text-base md:text-lg">
                Dear Students & Families,
              </span>
              <br />
              With great pride, we congratulate the Class of 2026. Your
              dedication and resilience have brought you to this milestone. May
              you continue to shine and lead with integrity.
            </p>
            <p
              className="mt-3 text-yellow-400 text-xs md:text-sm font-heading text-right"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              — PRINCIPAL
            </p>
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
            className="px-6 py-2 text-xs sm:text-sm font-heading bg-yellow-500 text-black rounded-sm border-b-2 border-yellow-700 hover:border-b-0 hover:translate-y-0.5 transition-all glitch-hover"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            LOGIN TO VIEW RESULTS
          </motion.button>
        </section>

        {/* CHECK RESULTS SECTION */}
        <section
          id="check-section"
          className="relative py-12 px-4 flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <h2 className="text-lg sm:text-xl font-heading text-yellow-400 mb-1">
              CHECK RESULTS
            </h2>
            <p className="text-xs text-cyan-300/70">
              Enter your NISN to view graduation status
            </p>
          </motion.div>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mb-8">
            <input
              type="text"
              inputMode="numeric"
              placeholder="NISN (10 digits)"
              value={nisn}
              onChange={(e) => {
                setResult(null);
                setNisn(e.target.value.replace(/\D/g, "").slice(0, 10));
              }}
              className="flex-1 px-4 py-2 bg-black/60 border border-yellow-400/50 text-white placeholder-white/40 font-mono text-sm rounded-sm focus:outline-none focus:border-yellow-400 transition"
            />
            <button
              onClick={handleCheck}
              disabled={!nisn}
              className="px-5 py-2 bg-yellow-500 text-black font-heading text-xs sm:text-sm rounded-sm border-b-2 border-yellow-700 hover:border-b-0 hover:translate-y-0.5 disabled:opacity-40 transition-all glitch-hover"
            >
              CHECK
            </button>
          </div>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                ref={resultRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`w-full max-w-sm ${glitchActive ? "border-glitch" : ""}`}
              >
                {result.found ? (
                  <div className="bg-black/70 backdrop-blur-sm p-5 rounded-md border border-yellow-400/40 shadow-lg">
                    <h3 className="text-sm font-heading text-yellow-400 text-center mb-3">
                      GRADUATION CARD
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-cyan-300">NAME:</span>{" "}
                        <span className="font-semibold">{result.name}</span>
                      </p>
                      <p>
                        <span className="text-cyan-300">NISN:</span>{" "}
                        <span className="font-mono">{nisn}</span>
                      </p>
                      <p className="mt-2">
                        STATUS:{" "}
                        <span
                          className={`font-heading text-sm ${result.status === "GRADUATED" ? "text-green-400" : "text-red-400"} ${glitchActive ? "glitch-text" : ""}`}
                        >
                          {result.status === "GRADUATED"
                            ? "GRADUATED"
                            : "NOT GRADUATED"}
                        </span>
                      </p>
                      {result.status === "GRADUATED" &&
                        result.averageScore !== undefined && (
                          <p className="text-sm">
                            <span className="text-cyan-300">
                              AVERAGE SCORE:
                            </span>{" "}
                            <span className="font-mono text-yellow-300">
                              {result.averageScore.toFixed(1)}
                            </span>
                          </p>
                        )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-black/70 backdrop-blur-sm p-5 rounded-md border border-red-400/40 text-center">
                    <p className="text-red-400 text-sm font-heading">
                      NISN NOT FOUND
                    </p>
                    <p className="text-white/60 text-xs mt-1">
                      Please check your input and try again.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <footer className="py-5 text-center border-t border-yellow-400/20">
          <p className="text-[10px] text-cyan-300/50 font-mono">
            © 2026 GGS International School
          </p>
        </footer>
      </div>

      {/* MODAL CONGRATULATIONS */}
      <AnimatePresence>
        {showModal && modalData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="modal-content relative max-w-md w-full rounded-xl p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-white/60 hover:text-white transition"
              >
                <X size={20} />
              </button>
              <div className="mb-4 text-6xl">🎓✨</div>
              <h2
                className="text-2xl sm:text-3xl font-heading text-yellow-400 mb-2"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                CONGRATULATIONS!
              </h2>
              <p className="text-white text-lg mt-2">
                You have successfully graduated from
              </p>
              <p className="text-cyan-300 font-bold text-xl">
                GGS International School
              </p>
              <div className="my-4 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
              <p className="text-sm">
                <span className="text-cyan-300">Name:</span>{" "}
                <span className="font-semibold text-white">
                  {modalData.name}
                </span>
              </p>
              <p className="text-sm">
                <span className="text-cyan-300">Final Average Score:</span>{" "}
                <span className="text-yellow-300 font-mono font-bold">
                  {modalData.score.toFixed(1)}
                </span>
              </p>
              {modalData.score >= 85 && (
                <p className="mt-2 text-yellow-300 text-sm">
                  🌟 Excellent Performance! 🌟
                </p>
              )}
              <button
                onClick={() => setShowModal(false)}
                className="mt-6 px-6 py-2 bg-yellow-500 text-black font-heading text-sm rounded-sm border-b-2 border-yellow-700 hover:border-b-0 hover:translate-y-0.5 transition-all glitch-hover"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
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
