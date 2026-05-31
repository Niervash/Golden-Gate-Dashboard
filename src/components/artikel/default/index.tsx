import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Article {
  id: number;
  image: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
}

const articles: Article[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Prestasi",
    title: "Siswa Golden Gate School Raih Medali Emas Olimpiade Sains Nasional",
    date: "24 Mei 2026",
    excerpt:
      "Dua siswa SMA Golden Gate School berhasil mengharumkan nama sekolah dengan meraih medali emas dalam ajang Olimpiade Sains Nasional (OSN) 2026.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Akademik",
    title: "Kurikulum Merdeka: Implementasi Kreatif di Golden Gate School",
    date: "18 Mei 2026",
    excerpt:
      "Golden Gate School terus mengembangkan metode pembelajaran inovatif melalui Kurikulum Merdeka yang menekankan proyek kolaboratif dan karakter siswa.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Kegiatan",
    title:
      "Pekan Olahraga dan Seni (PORSENI) 2026 Meriahkan Akhir Tahun Ajaran",
    date: "10 Mei 2026",
    excerpt:
      "Seluruh siswa dari berbagai jenjang berpartisipasi dalam PORSENI yang menampilkan beragam pertandingan olahraga dan pertunjukan seni.",
  },
];

const ArticleSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Artikel & <span>Berita Terbaru</span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-base md:text-lg"
            style={{ color: "#af9151" }}
          >
            Ikuti perkembangan terbaru seputar prestasi, kegiatan, dan informasi
            akademik dari Golden Gate School.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden  duration-300 "
            >
              {/* Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500  rounded-2xl "
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <time
                  className="text-xs mb-2 block"
                  style={{ color: "#94a3b8" }}
                >
                  {article.date}
                  <span
                    className=" ml-4  px-2 py-1 rounded-full text-xs font-semibold "
                    style={{
                      background: "#d9ab3f",
                      color: "#23305d",
                    }}
                  >
                    {article.category}
                  </span>
                </time>

                <h3 className="text-lg md:text-xl font-bold mb-3 leading-tight line-clamp-2 text-black">
                  {article.title}
                </h3>
                <p className="text-sm text-black leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Read More Link */}
                <Link
                  to={`/artikel/${article.id}`}
                  className="inline-flex items-center text-sm font-semibold transition-colors"
                  style={{ color: "#d9ab3f" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#f0d78c";
                    e.currentTarget.style.gap = "0.5rem";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#d9ab3f";
                    e.currentTarget.style.gap = "0.25rem";
                  }}
                >
                  Baca Selengkapnya
                  <svg
                    className="w-4 h-4 ml-1 transition-all"
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
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleSection;
