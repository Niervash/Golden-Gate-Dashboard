import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ILoveGGS } from "../../../assets";

const NavbarPpdb: React.FC = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      className="sticky top-0 left-0 right-0 z-50 py-4"
      style={{
        background: "#23305d",
        color: "#ffffff",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0">
              <img
                src={ILoveGGS}
                alt="Logo Golden Gate School"
                className="w-23 h-10 md:w-23 md:h-12"
              />
            </div>
            <div className="block">
              <h1
                className="text-sm md:text-lg lg:text-xl font-bold leading-tight"
                style={{ color: "#ffffff" }}
              >
                GOLDEN
                <span style={{ color: "#d9ab3f" }}> GATE </span>
                <span> SCHOOL </span>
              </h1>
              <p className="text-xs mt-0.5" style={{ color: "#af9151" }}>
                Unggul • Berkarakter • Berprestasi
              </p>
            </div>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2"
            style={{
              border: "1px solid #d9ab3f", // gray orange1
              color: "#d9ab3f", // gray orange1
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#d9ab3f"; // gray orange1
              e.currentTarget.style.color = "#23305d"; // dark blue
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#d9ab3f"; // gray orange1
            }}
          >
            <motion.div
              animate={{
                x: [0, -3, 0],
              }}
              transition={{
                repeat: Infinity,
                repeatDelay: 2,
                duration: 1.5,
              }}
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.div>

            <span className="ml-2 font-medium xs:hidden">Back</span>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default NavbarPpdb;
