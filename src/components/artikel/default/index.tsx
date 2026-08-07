import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { newsApi } from "../../../utils/api";

interface Article {
  id: number | string;
  image: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  slug?: string;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

const extractList = (res: any): any[] => {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  if (Array.isArray(d?.data)) return d.data;
  return [];
};

const formatDateId = (raw?: string) => {
  if (!raw) return "—";
  const d = new Date(raw.includes("T") ? raw : `${raw}T00:00:00`);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const mapNews = (row: any): Article => ({
  id: row.id,
  image: row.foto_url || FALLBACK_IMAGE,
  category: row.kategori || "Berita",
  title: row.judul || "Tanpa judul",
  date: formatDateId(row.tanggal_publish),
  excerpt: row.ringkasan || (row.konten ? String(row.konten).slice(0, 160) + "…" : ""),
  slug: row.slug,
});

const ArticleSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await newsApi.getAll();
      const published = extractList(res)
        // Artikel lama yang belum memiliki kolom is_published tetap dianggap publik.
        .filter((n) => n.is_published === undefined || n.is_published === null || n.is_published === 1 || n.is_published === true || n.is_published === "1")
        .sort((a, b) =>
          String(b.tanggal_publish || "").localeCompare(String(a.tanggal_publish || "")),
        )
        .slice(0, 6)
        .map(mapNews);
      setArticles(published);
    } catch (error: any) {
      const serverMessage = error?.response?.data?.message;
      setError(serverMessage || (error?.request
        ? "Server berita tidak dapat dihubungi. Pastikan backend port 5003 sedang berjalan."
        : "Gagal memuat berita."));
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4"
            style={{ color: "#23305d" }}
          >
            Artikel & <span style={{ color: "#d9ab3f" }}>Berita Terbaru</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 font-normal">
            Ikuti perkembangan terbaru seputar prestasi, kegiatan, dan informasi akademik dari
            Golden Gate School.
          </p>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </motion.div>

        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-[#23305d]" />
          </div>
        )}

        {!loading && articles.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <p className="font-medium">Belum ada berita yang dipublikasikan.</p>
            <p className="text-sm mt-1">Admin dapat menambahkan lewat menu News CMS.</p>
          </div>
        )}

        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                    />
                    <span
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow"
                      style={{ background: "#d9ab3f", color: "#23305d" }}
                    >
                      {article.category}
                    </span>
                  </div>

                  <div className="p-5 md:p-6 space-y-3">
                    <time className="text-xs font-semibold text-slate-400 block">
                      {article.date}
                    </time>
                    <h3
                      className="text-lg md:text-xl font-bold leading-snug line-clamp-2"
                      style={{ color: "#23305d" }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-6 md:px-6">
                  <Link
                    to={`/berita/${article.id}`}
                    className="inline-flex items-center text-sm font-bold transition-all text-[#23305d] hover:text-[#d9ab3f]"
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
        )}
      </div>
    </section>
  );
};

export default ArticleSection;
