import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ILoveGGS } from "../../../assets";
import confetti from "canvas-confetti"; // [CONFETTI] import library

const dummyStudents = [
  { nisn: "1234567890", name: "Alya Khansa", status: "GRADUATED" },
  { nisn: "0987654321", name: "Bima Aditya", status: "NOT_GRADUATED" },
  { nisn: "1122334455", name: "Citra Lestari", status: "GRADUATED" },
  { nisn: "5566778899", name: "Dimas Pratama", status: "GRADUATED" },
];

const GraduationPage: React.FC = () => {
  const [nisn, setNisn] = useState("");
  const [result, setResult] = useState<{
    found: boolean;
    name?: string;
    status?: string;
  } | null>(null);
  const [glitchActive, setGlitchActive] = useState(false);

  const handleCheck = () => {
    const student = dummyStudents.find((s) => s.nisn === nisn.trim());
    if (student) {
      setResult({ found: true, name: student.name, status: student.status });
      // [CONFETTI] Jika lulus, ledakkan confetti
      if (student.status === "GRADUATED") {
        // Konfetti utama dari tengah
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
          startVelocity: 20,
          colors: ["#fbbf24", "#34d399", "#60a5fa", "#f472b6"],
        });
        // Konfetti tambahan dari kiri
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.7, x: 0.2 },
          startVelocity: 25,
        });
        // Konfetti tambahan dari kanan
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
        /* Background gradien gelap + grid yang jelas */
        .bg-dark {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0a0c12 0%, #0f111a 100%);
          z-index: -3;
        }
        /* Grid yang jelas dan tebal */
        .grid-clear {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(to right, rgba(0, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.15) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: -2;
        }
        /* Noise grunge halus */
        .noise-light {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.2'/%3E%3C/svg%3E");
          background-repeat: repeat;
          pointer-events: none;
          z-index: -1;
          mix-blend-mode: overlay;
        }
        /* Scanline sangat tipis */
        .scanline-faint {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 4px);
          pointer-events: none;
          z-index: 1;
        }
        /* Efek glitch sederhana namun terlihat */
        @keyframes glitchSimple {
          0% { text-shadow: -2px 0 #ff00c1, 2px 0 #00fff9; transform: skew(0deg); }
          25% { text-shadow: -3px 0 #ff00c1, 3px 0 #00fff9; transform: skew(2deg); }
          50% { text-shadow: -1px 0 #ff00c1, 1px 0 #00fff9; transform: skew(-1deg); }
          75% { text-shadow: -2px 0 #ff00c1, 2px 0 #00fff9; transform: skew(1deg); }
          100% { text-shadow: 0 0 0 transparent; transform: skew(0deg); }
        }
        .glitch-text {
          animation: glitchSimple 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .glitch-hover:hover {
          animation: glitchSimple 0.25s steps(2) forwards;
        }
        /* Glitch border ringan */
        @keyframes borderGlitch {
          0% { border-color: rgba(0, 255, 255, 0.6); box-shadow: 0 0 0 rgba(255,0,200,0); }
          50% { border-color: #ff00c1; box-shadow: 0 0 6px #ff00c1; }
          100% { border-color: rgba(0, 255, 255, 0.6); box-shadow: 0 0 0 rgba(255,0,200,0); }
        }
        .border-glitch {
          animation: borderGlitch 0.3s ease-out;
        }
      `}</style>

      <div className="min-h-screen text-white font-body relative">
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
              className={`text-xl sm:text-2xl md:text-3xl font-heading leading-tight ${
                glitchActive ? "glitch-text" : "glitch-hover"
              }`}
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

          {/* Principal Message - lebih besar dan jelas */}
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

          {/* Tombol Login */}
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
                      {result.status === "GRADUATED" ? (
                        <div className="mt-3 text-green-300/80 text-xs border-t border-yellow-400/30 pt-2">
                          🎉 Congratulations! You have successfully graduated.
                        </div>
                      ) : (
                        <div className="mt-3 text-red-300/80 text-xs border-t border-yellow-400/30 pt-2">
                          Please contact your homeroom teacher for guidance.
                        </div>
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
    </>
  );
};

export default GraduationPage;
