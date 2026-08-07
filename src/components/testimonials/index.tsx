import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Dr. Hendra Wijaya",
    role: "Orang Tua Siswa",
    text: "Saya sangat puas dengan perkembangan akademis & kepribadian anak saya. Guru-gurunya sangat perhatian dan lingkungan sekolah sangat positif.",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
  },
  {
    name: "Risa Amanda, S.T",
    role: "Alumni 2022 (Mahasiswa ITB)",
    text: "Bimbingan dan kurikulum berbasis proyek di Golden Gate School sangat membantunya siap bersaing di perguruan tinggi negeri favorit.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  },
  {
    name: "Prof. Bambang Sutrisno",
    role: "Pengamat Pendidikan",
    text: "Golden Gate School adalah contoh nyata sekolah yang sukses memadukan pendidikan teknologi abad 21 dengan integritas etika moral.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
            Kata Mereka
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold" style={{ color: "#23305d" }}>
            Testimoni & <span style={{ color: "#d9ab3f" }}>Kepercayaan</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
            Pengalaman nyata dari siswa, alumni, dan orang tua wali murid Golden Gate School.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 relative"
            >
              <Quote className="w-8 h-8 text-amber-300 opacity-60 absolute top-6 right-6" />
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed italic">"{item.text}"</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img src={item.photo} alt={item.name} className="w-11 h-11 rounded-full object-cover border" />
                <div>
                  <h4 className="font-bold text-sm" style={{ color: "#23305d" }}>{item.name}</h4>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
