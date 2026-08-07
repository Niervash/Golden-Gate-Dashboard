import React from "react";
import { UsersLayout } from "../../../layouts";
import { motion } from "framer-motion";
import { Target, Compass, Award, CheckCircle2 } from "lucide-react";

const VisiMisiPage: React.FC = () => {
  return (
    <UsersLayout>
      <div className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
              Profil Sekolah
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold" style={{ color: "#23305d" }}>
              Visi & Misi Golden Gate School
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
              Landasan filosofis dan komitmen kami dalam memberikan pendidikan berkelas dunia untuk mencetak generasi pemimpin masa depan.
            </p>
          </div>

          {/* Grid Visi & Misi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card Visi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#d9ab3f] flex items-center justify-center border border-amber-200">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: "#23305d" }}>
                Visi Sekolah
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                "Menjadi lembaga pendidikan unggul berstandar internasional yang mencetak generasi cerdas, berkarakter mulia, inovatif, dan berdaya saing global."
              </p>
            </motion.div>

            {/* Card Misi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#23305d] flex items-center justify-center border border-blue-200">
                <Compass className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: "#23305d" }}>
                Misi Sekolah
              </h2>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Menyelenggarakan proses pembelajaran yang inovatif, efektif, dan berbasis teknologi digital modern.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Membina pembentukan karakter kepemimpinan, kedisiplinan, dan nilai-nilai etika moral yang kuat.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Mendorong potensi akademik dan non-akademik siswa melalui ekstrakurikuler & kejuaraan kompetitif.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </UsersLayout>
  );
};

export default VisiMisiPage;
