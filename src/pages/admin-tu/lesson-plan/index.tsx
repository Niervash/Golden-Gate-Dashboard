import React, { useState, useEffect, useCallback } from "react";
import { AdminLayout } from "../../../layouts";
import {
  FileSpreadsheet,
  ExternalLink,
  RefreshCw,
  Plus,
  Trash2,
  Pencil,
  X,
  Save,
} from "lucide-react";
import { Button, Spin, Select, message } from "antd";
import { lessonPlansApi } from "../../../utils/api";

const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  accentLight: "#af9151",
  white: "#ffffff",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
};

interface LessonPlan {
  id: number | string;
  teacher_name: string;
  spreadsheet_link: string;
}

const extractList = (res: any): LessonPlan[] => {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  if (Array.isArray(d?.data)) return d.data;
  return [];
};

const LessonPlanPage: React.FC = () => {
  const [plans, setPlans] = useState<LessonPlan[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [saving, setSaving] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<LessonPlan | null>(null);
  const [form, setForm] = useState({ teacher_name: "", spreadsheet_link: "" });

  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true);
      const res = await lessonPlansApi.getAll();
      const list = extractList(res);
      setPlans(list);
      if (list.length > 0) {
        setSelectedId((prev) => {
          if (prev && list.some((p) => String(p.id) === prev)) return prev;
          return String(list[0].id);
        });
      } else {
        setSelectedId("");
      }
    } catch {
      message.error("Gagal memuat data lesson plan dari server");
      setPlans([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  useEffect(() => {
    setIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  }, [selectedId]);

  const activePlan = plans.find((p) => String(p.id) === selectedId) || plans[0];
  const spreadsheetUrl = activePlan?.spreadsheet_link || "";

  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes("docs.google.com/spreadsheets")) {
        if (url.includes("/preview")) {
          return url.replace(/\/preview(\?.*)?$/, "/edit");
        }
        return url;
      }
      return url;
    } catch {
      return url;
    }
  };

  const handleRefresh = () => {
    setIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ teacher_name: "", spreadsheet_link: "" });
    setIsModalOpen(true);
  };

  const openEdit = () => {
    if (!activePlan) return;
    setEditing(activePlan);
    setForm({
      teacher_name: activePlan.teacher_name,
      spreadsheet_link: activePlan.spreadsheet_link,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.teacher_name.trim() || !form.spreadsheet_link.trim()) {
      message.warning("Nama guru dan link spreadsheet wajib diisi");
      return;
    }
    try {
      setSaving(true);
      const payload = {
        teacher_name: form.teacher_name.trim(),
        spreadsheet_link: form.spreadsheet_link.trim(),
      };
      if (editing) {
        await lessonPlansApi.update(editing.id, payload);
        message.success("Lesson plan diperbarui");
      } else {
        await lessonPlansApi.create(payload);
        message.success("Lesson plan ditambahkan");
      }
      setIsModalOpen(false);
      await fetchPlans();
    } catch {
      message.error("Gagal menyimpan lesson plan");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!activePlan) return;
    if (!window.confirm(`Hapus lesson plan "${activePlan.teacher_name}"?`)) return;
    try {
      await lessonPlansApi.delete(activePlan.id);
      message.success("Lesson plan dihapus");
      await fetchPlans();
    } catch {
      message.error("Gagal menghapus lesson plan");
    }
  };

  const selectOptions = plans.map((p) => ({
    value: String(p.id),
    label: p.teacher_name,
  }));

  return (
    <AdminLayout>
      <div className="space-y-6 pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-left" style={{ color: COLORS.primary }}>
              Daily Lesson Plan
            </h1>
            <p className="text-sm text-left" style={{ color: COLORS.secondary }}>
              Monitoring RPP harian guru dari database (tabel lesson_plans).
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 flex-grow md:flex-grow-0 min-w-[250px]">
              <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                Pilih Guru:
              </span>
              <Select
                value={selectedId || undefined}
                onChange={(v) => setSelectedId(v)}
                options={selectOptions}
                className="w-full"
                style={{ height: 38 }}
                placeholder={loading ? "Memuat..." : "Belum ada data"}
                loading={loading}
                disabled={plans.length === 0}
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button icon={<Plus className="w-4 h-4" />} onClick={openAdd} style={{ height: 38 }}>
                Tambah
              </Button>
              <Button
                icon={<Pencil className="w-4 h-4" />}
                onClick={openEdit}
                disabled={!activePlan}
                style={{ height: 38 }}
              >
                Edit
              </Button>
              <Button
                danger
                icon={<Trash2 className="w-4 h-4" />}
                onClick={handleDelete}
                disabled={!activePlan}
                style={{ height: 38 }}
              >
                Hapus
              </Button>
              <Button
                icon={<RefreshCw className="w-4 h-4" />}
                onClick={handleRefresh}
                disabled={!spreadsheetUrl}
                style={{ height: 38 }}
              >
                Refresh
              </Button>
              {spreadsheetUrl && (
                <Button
                  type="primary"
                  icon={<ExternalLink className="w-4 h-4" />}
                  href={spreadsheetUrl}
                  target="_blank"
                  style={{
                    backgroundColor: COLORS.accent,
                    borderColor: COLORS.accent,
                    height: 38,
                  }}
                >
                  Buka di Tab Baru
                </Button>
              )}
            </div>
          </div>
        </div>

        <div
          className="p-4 rounded-xl border flex items-start gap-3 bg-[#fdfaf2]"
          style={{ borderColor: "rgba(217, 171, 63, 0.3)" }}
        >
          <FileSpreadsheet className="w-5 h-5 text-[#d9ab3f] mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-800 text-left">
              {activePlan
                ? `Lembar Kerja Terintegrasi — ${activePlan.teacher_name}`
                : "Belum ada lesson plan"}
            </p>
            <p className="text-xs text-gray-500 text-left">
              Data diambil dari API <code>/api/lesson-plans</code>. Tambah link Google Spreadsheet
              RPP per guru agar dapat dipantau di sini.
            </p>
          </div>
        </div>

        <div
          className="relative w-full rounded-2xl border bg-white overflow-hidden shadow-sm flex flex-col"
          style={{
            borderColor: COLORS.grayMedium,
            height: "calc(100vh - 210px)",
            minHeight: "680px",
          }}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
              <div className="text-center space-y-3">
                <Spin size="large" />
                <p className="text-sm text-gray-500 font-medium">Memuat data lesson plan...</p>
              </div>
            </div>
          )}

          {!loading && !activePlan && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
              <div className="text-center space-y-3 max-w-sm px-4">
                <FileSpreadsheet className="w-12 h-12 mx-auto text-gray-300" />
                <p className="text-sm text-gray-600 font-medium">
                  Belum ada lesson plan di database.
                </p>
                <Button type="primary" icon={<Plus className="w-4 h-4" />} onClick={openAdd}>
                  Tambah Lesson Plan Pertama
                </Button>
              </div>
            </div>
          )}

          {!loading && activePlan && spreadsheetUrl && (
            <>
              {iframeLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                  <div className="text-center space-y-3">
                    <Spin size="large" />
                    <p className="text-sm text-gray-500 font-medium">
                      Memuat Google Spreadsheet...
                    </p>
                  </div>
                </div>
              )}
              <iframe
                key={iframeKey}
                src={getEmbedUrl(spreadsheetUrl)}
                className="w-full h-full border-none"
                onLoad={() => setIframeLoading(false)}
                title={activePlan.teacher_name}
                allowFullScreen
              />
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold" style={{ color: COLORS.primary }}>
                {editing ? "Edit Lesson Plan" : "Tambah Lesson Plan"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Nama Guru
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/40"
                  style={{ borderColor: COLORS.grayMedium }}
                  value={form.teacher_name}
                  onChange={(e) => setForm({ ...form, teacher_name: e.target.value })}
                  placeholder="Contoh: Budi Santoso, S.Pd"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Link Google Spreadsheet
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d9ab3f]/40"
                  style={{ borderColor: COLORS.grayMedium }}
                  value={form.spreadsheet_link}
                  onChange={(e) => setForm({ ...form, spreadsheet_link: e.target.value })}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button onClick={() => setIsModalOpen(false)}>Batal</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={saving}
                  icon={<Save className="w-4 h-4" />}
                  style={{ backgroundColor: COLORS.accent, borderColor: COLORS.accent }}
                >
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default LessonPlanPage;
