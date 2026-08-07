import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Loader2, UserRound } from "lucide-react";
import { UsersLayout } from "../../../layouts";
import { newsApi } from "../../../utils/api";

type NewsDetail = {
  id: string | number;
  judul: string;
  konten: string;
  ringkasan?: string;
  kategori?: string;
  penulis?: string;
  tanggal_publish?: string;
  tanggal?: string;
  foto_url?: string;
  gambar?: string;
  is_published?: boolean | number | string;
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85";

const isPublished = (value: NewsDetail["is_published"]) =>
  value === undefined || value === null || value === true || value === 1 || value === "1";

const formatDate = (raw?: string) => {
  if (!raw) return "—";
  const date = new Date(raw.includes("T") ? raw : `${raw}T00:00:00`);
  return Number.isNaN(date.getTime()) ? raw : date.toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });
};

const PublicNewsDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) return;
      setLoading(true);
      setError("");
      try {
        const response = await newsApi.getById(id);
        const data = response.data?.data || response.data;
        if (!data || !isPublished(data.is_published)) {
          setError("Artikel tidak ditemukan atau belum dipublikasikan.");
          return;
        }
        setArticle(data);
      } catch (error: any) {
        setError(error?.response?.status === 404
          ? "Artikel tidak ditemukan."
          : "Artikel tidak dapat dimuat. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [id]);

  return (
    <UsersLayout>
      <main className="min-h-screen bg-slate-50 pb-16 pt-28 md:pt-32">
        <div className="mx-auto max-w-4xl px-4">
          <Link to="/berita" className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-[#23305d] transition hover:text-[#d9ab3f]">
            <ArrowLeft size={17} /> Kembali ke Berita
          </Link>

          {loading && <div className="flex justify-center py-24"><Loader2 className="h-9 w-9 animate-spin text-[#23305d]" /></div>}

          {!loading && error && (
            <section className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
              <h1 className="text-xl font-bold text-[#23305d]">{error}</h1>
              <Link to="/berita" className="mt-5 inline-flex rounded-xl bg-[#23305d] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#182244]">Lihat semua berita</Link>
            </section>
          )}

          {!loading && article && (
            <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <img
                src={article.foto_url || article.gambar || FALLBACK_IMAGE}
                alt={article.judul}
                className="h-56 w-full object-cover sm:h-80 md:h-[430px]"
                onError={(event) => { event.currentTarget.src = FALLBACK_IMAGE; }}
              />
              <div className="p-6 sm:p-10 md:p-12">
                <span className="inline-flex rounded-full bg-[#d9ab3f]/15 px-3 py-1 text-xs font-bold text-[#23305d]">{article.kategori || "Berita"}</span>
                <h1 className="mt-4 text-3xl font-extrabold leading-tight text-[#23305d] sm:text-4xl">{article.judul}</h1>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2"><CalendarDays size={16} /> {formatDate(article.tanggal_publish || article.tanggal)}</span>
                  <span className="inline-flex items-center gap-2"><UserRound size={16} /> {article.penulis || "Golden Gate School"}</span>
                </div>
                {article.ringkasan && <p className="mt-7 border-l-4 border-[#d9ab3f] pl-4 text-lg leading-relaxed text-slate-600">{article.ringkasan}</p>}
                <div className="mt-8 whitespace-pre-wrap text-[16px] leading-8 text-slate-700">{article.konten}</div>
              </div>
            </article>
          )}
        </div>
      </main>
    </UsersLayout>
  );
};

export default PublicNewsDetailPage;
