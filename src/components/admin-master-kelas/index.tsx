import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  BookOpen,
  Users,
  Award,
  Layers,
  GraduationCap,
  RefreshCw,
  X,
  CheckCircle,
  Save,
} from "lucide-react";
import {
  Table,
  Button,
  Input,
  Select,
  Modal,
  Badge,
  Form,
  message,
  Popconfirm,
  Tag,
  Tooltip,
  Empty,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { classesApi, teachersApi } from "../../utils/api";

const { Option } = Select;

// ─── Design Tokens ───────────────────────────────────────────────────────────
const C = {
  primary: "#23305d",
  accent: "#d9ab3f",
  accentLight: "rgba(217,171,63,0.12)",
  accentBorder: "rgba(217,171,63,0.35)",
  bg: "#f4f6fb",
  card: "#ffffff",
  border: "#e4e7f0",
  muted: "#64748b",
  danger: "#ef4444",
  success: "#22c55e",
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface KelasItem {
  id: number;
  nama_kelas: string;
  tingkat: string;
  jurusan: string | null;
  wali_kelas_nip: string | null;
  wali_kelas_nama?: string; // resolved from teacher list
  created_at?: string;
}

interface TeacherOption {
  nip: string;
  nama: string;
}

// ─── Tingkat config ───────────────────────────────────────────────────────────
const TINGKAT_OPTIONS = ["7", "8", "9", "10", "11", "12", "X", "XI", "XII"];
const TINGKAT_COLOR: Record<string, string> = {
  "7": "#6366f1",
  "8": "#8b5cf6",
  "9": "#ec4899",
  "10": "#f59e0b",
  "11": "#14b8a6",
  "12": "#10b981",
  X: "#f59e0b",
  XI: "#14b8a6",
  XII: "#10b981",
};

const getTingkatColor = (t: string) => TINGKAT_COLOR[t] ?? C.primary;

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({
  icon,
  label,
  value,
  color,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: "easeOut" }}
    className="rounded-2xl p-5 flex items-center gap-4 shadow-sm"
    style={{ background: C.card, border: `1px solid ${C.border}` }}
  >
    <div
      className="rounded-xl flex items-center justify-center flex-shrink-0"
      style={{
        width: 48,
        height: 48,
        background: `${color}18`,
        color,
      }}
    >
      {icon}
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: C.muted }}>
        {label}
      </p>
      <p className="text-2xl font-bold" style={{ color: C.primary }}>
        {value}
      </p>
    </div>
  </motion.div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const MasterKelasPage = () => {
  const [kelasList, setKelasList] = useState<KelasItem[]>([]);
  const [teachers, setTeachers] = useState<TeacherOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTingkat, setFilterTingkat] = useState<string>("all");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKelas, setEditingKelas] = useState<KelasItem | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [form] = Form.useForm();

  // ── Load Data ──────────────────────────────────────────────────────────────
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [classRes, teacherRes] = await Promise.all([
        classesApi.getAll(),
        teachersApi.getAll(),
      ]);

      const rawTeachers = Array.isArray(teacherRes.data)
        ? teacherRes.data
        : teacherRes.data?.data || [];

      const teacherOptions: TeacherOption[] = rawTeachers.map((t: any) => ({
        nip: t.nip,
        nama: t.nama_lengkap,
      }));
      setTeachers(teacherOptions);

      // Build NIP→Nama lookup
      const nipToName: Record<string, string> = {};
      teacherOptions.forEach((t) => {
        nipToName[t.nip] = t.nama;
      });

      const rawClasses = Array.isArray(classRes.data)
        ? classRes.data
        : classRes.data?.data || [];

      setKelasList(
        rawClasses.map((k: any) => ({
          ...k,
          wali_kelas_nama: k.wali_kelas_nip ? nipToName[k.wali_kelas_nip] ?? k.wali_kelas_nip : undefined,
        }))
      );
    } catch {
      message.error("Gagal memuat data kelas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ── Filtered list ──────────────────────────────────────────────────────────
  const filtered = kelasList.filter((k) => {
    const matchSearch =
      k.nama_kelas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (k.jurusan || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (k.wali_kelas_nama || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchTingkat = filterTingkat === "all" || k.tingkat === filterTingkat;
    return matchSearch && matchTingkat;
  });

  // ── Stats ──────────────────────────────────────────────────────────────────
  const uniqueTingkat = [...new Set(kelasList.map((k) => k.tingkat))];
  const withWali = kelasList.filter((k) => k.wali_kelas_nip).length;
  const withoutWali = kelasList.length - withWali;

  // ── Modal helpers ──────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditingKelas(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEdit = (kelas: KelasItem) => {
    setEditingKelas(kelas);
    form.setFieldsValue({
      nama_kelas: kelas.nama_kelas,
      tingkat: kelas.tingkat,
      jurusan: kelas.jurusan || "",
      wali_kelas_nip: kelas.wali_kelas_nip || "none",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingKelas(null);
    form.resetFields();
  };

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      const payload = {
        nama_kelas: (values.nama_kelas as string).trim().toUpperCase(),
        tingkat: values.tingkat,
        jurusan: values.jurusan?.trim() || null,
        wali_kelas_nip:
          values.wali_kelas_nip && values.wali_kelas_nip !== "none"
            ? values.wali_kelas_nip
            : null,
      };

      if (editingKelas) {
        await classesApi.update(editingKelas.id, payload);
        message.success(`Kelas ${payload.nama_kelas} berhasil diperbarui`);
      } else {
        await classesApi.create(payload);
        message.success(`Kelas ${payload.nama_kelas} berhasil ditambahkan`);
      }
      closeModal();
      await loadData();
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.message || "Gagal menyimpan data kelas";
      message.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, nama: string) => {
    try {
      await classesApi.delete(id);
      message.success(`Kelas ${nama} berhasil dihapus`);
      await loadData();
    } catch (err: any) {
      message.error(
        err.response?.data?.message || err.message || "Gagal menghapus kelas"
      );
    }
  };

  // ── Table columns ──────────────────────────────────────────────────────────
  const columns: ColumnsType<KelasItem> = [
    {
      title: "No",
      key: "no",
      width: 56,
      render: (_, __, index) => (
        <span className="text-xs font-medium" style={{ color: C.muted }}>
          {index + 1}
        </span>
      ),
    },
    {
      title: "Nama Kelas",
      dataIndex: "nama_kelas",
      key: "nama_kelas",
      sorter: (a, b) => a.nama_kelas.localeCompare(b.nama_kelas),
      render: (text) => (
        <div className="flex items-center gap-2">
          <div
            className="rounded-lg flex items-center justify-center"
            style={{ width: 32, height: 32, background: C.accentLight }}
          >
            <BookOpen size={14} style={{ color: C.accent }} />
          </div>
          <span className="font-semibold text-sm" style={{ color: C.primary }}>
            {text}
          </span>
        </div>
      ),
    },
    {
      title: "Tingkat",
      dataIndex: "tingkat",
      key: "tingkat",
      width: 110,
      render: (t) => (
        <Tag
          style={{
            background: `${getTingkatColor(t)}18`,
            color: getTingkatColor(t),
            border: `1px solid ${getTingkatColor(t)}40`,
            fontWeight: 600,
            borderRadius: 8,
          }}
        >
          Kelas {t}
        </Tag>
      ),
    },
    {
      title: "Jurusan",
      dataIndex: "jurusan",
      key: "jurusan",
      render: (text) =>
        text ? (
          <span className="text-sm" style={{ color: C.primary }}>
            {text}
          </span>
        ) : (
          <span className="text-xs italic" style={{ color: C.muted }}>
            —
          </span>
        ),
    },
    {
      title: "Wali Kelas",
      key: "wali_kelas",
      render: (_, record) =>
        record.wali_kelas_nama ? (
          <div className="flex items-center gap-2">
            <div
              className="rounded-full flex items-center justify-center flex-shrink-0"
              style={{ width: 28, height: 28, background: `${C.success}15`, color: C.success }}
            >
              <CheckCircle size={14} />
            </div>
            <span className="text-sm font-medium" style={{ color: C.primary }}>
              {record.wali_kelas_nama}
            </span>
          </div>
        ) : (
          <Badge
            status="warning"
            text={
              <span className="text-xs italic" style={{ color: "#f59e0b" }}>
                Belum ditetapkan
              </span>
            }
          />
        ),
    },
    {
      title: "Aksi",
      key: "aksi",
      width: 100,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Tooltip title="Edit Kelas">
            <button
              onClick={() => openEdit(record)}
              className="rounded-lg p-1.5 transition-all duration-150"
              style={{ background: C.accentLight, color: C.accent }}
            >
              <Edit2 size={14} />
            </button>
          </Tooltip>
          <Popconfirm
            title="Hapus Kelas"
            description={`Yakin ingin menghapus kelas "${record.nama_kelas}"?`}
            onConfirm={() => handleDelete(record.id, record.nama_kelas)}
            okText="Hapus"
            cancelText="Batal"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Hapus Kelas">
              <button
                className="rounded-lg p-1.5 transition-all duration-150"
                style={{ background: "#fef2f2", color: C.danger }}
              >
                <Trash2 size={14} />
              </button>
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen"
      style={{ background: C.bg, padding: "24px 20px" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <div
            className="rounded-xl flex items-center justify-center"
            style={{ width: 44, height: 44, background: C.accentLight }}
          >
            <Layers size={22} style={{ color: C.accent }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: C.primary }}>
              Master Kelas
            </h1>
            <p className="text-sm" style={{ color: C.muted }}>
              Kelola semua data kelas yang ada di sekolah
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
        <StatCard icon={<BookOpen size={22} />} label="Total Kelas" value={kelasList.length} color={C.primary} delay={0} />
        <StatCard icon={<Layers size={22} />} label="Tingkat" value={uniqueTingkat.length} color="#6366f1" delay={0.07} />
        <StatCard icon={<Users size={22} />} label="Sudah Ada Wali Kelas" value={withWali} color={C.success} delay={0.14} />
        <StatCard icon={<GraduationCap size={22} />} label="Belum Ada Wali Kelas" value={withoutWali} color="#f59e0b" delay={0.21} />
      </div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-3 mb-5"
      >
        <div className="flex-1 relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: C.muted }}
          />
          <input
            type="text"
            placeholder="Cari nama kelas, jurusan, atau wali kelas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-shadow"
            style={{
              borderColor: C.border,
              background: C.card,
              color: C.primary,
            }}
          />
        </div>
        <Select
          value={filterTingkat}
          onChange={setFilterTingkat}
          style={{ minWidth: 160 }}
          className="rounded-xl"
        >
          <Option value="all">Semua Tingkat</Option>
          {TINGKAT_OPTIONS.map((t) => (
            <Option key={t} value={t}>
              Kelas {t}
            </Option>
          ))}
        </Select>
        <Button
          icon={<RefreshCw size={15} />}
          onClick={loadData}
          loading={loading}
          style={{ borderColor: C.border, color: C.muted, borderRadius: 12 }}
        >
          Refresh
        </Button>
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={openAdd}
          style={{
            background: `linear-gradient(135deg, ${C.accent}, #c9922f)`,
            border: "none",
            borderRadius: 12,
            fontWeight: 600,
            boxShadow: `0 4px 14px rgba(217,171,63,0.35)`,
          }}
        >
          Tambah Kelas
        </Button>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34, duration: 0.4 }}
        className="rounded-2xl overflow-hidden shadow-sm"
        style={{ border: `1px solid ${C.border}`, background: C.card }}
      >
        <Table
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 12,
            size: "small",
            showTotal: (total, range) =>
              `${range[0]}–${range[1]} dari ${total} kelas`,
          }}
          scroll={{ x: "max-content" }}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span style={{ color: C.muted }}>
                    {searchTerm || filterTingkat !== "all"
                      ? "Tidak ada kelas yang cocok"
                      : "Belum ada kelas. Klik \"Tambah Kelas\" untuk mulai."}
                  </span>
                }
              />
            ),
          }}
          style={{ background: C.card }}
        />
      </motion.div>

      {/* ── Add / Edit Modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            title={
              <div className="flex items-center gap-2">
                <div
                  className="rounded-lg flex items-center justify-center"
                  style={{ width: 32, height: 32, background: C.accentLight }}
                >
                  {editingKelas ? <Edit2 size={15} style={{ color: C.accent }} /> : <Plus size={15} style={{ color: C.accent }} />}
                </div>
                <span style={{ color: C.primary, fontWeight: 700 }}>
                  {editingKelas ? `Edit Kelas — ${editingKelas.nama_kelas}` : "Tambah Kelas Baru"}
                </span>
              </div>
            }
            open={isModalOpen}
            onCancel={closeModal}
            footer={null}
            width={520}
            destroyOnClose
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="pt-2"
            >
              {/* Nama Kelas */}
              <Form.Item
                label={<span style={{ fontWeight: 600, color: C.primary }}>Nama Kelas</span>}
                name="nama_kelas"
                rules={[
                  { required: true, message: "Nama kelas wajib diisi" },
                  {
                    pattern: /^[A-Za-z0-9\- ]+$/,
                    message: "Nama kelas hanya boleh huruf, angka, spasi, dan tanda -",
                  },
                ]}
                extra={
                  <span className="text-xs" style={{ color: C.muted }}>
                    Contoh: <strong>7-A</strong>, <strong>X-IPA-1</strong>, <strong>XII-IPS-2</strong>
                  </span>
                }
              >
                <Input
                  placeholder="Masukkan nama kelas"
                  size="large"
                  style={{ borderRadius: 10, borderColor: C.border }}
                />
              </Form.Item>

              {/* Tingkat */}
              <Form.Item
                label={<span style={{ fontWeight: 600, color: C.primary }}>Tingkat</span>}
                name="tingkat"
                rules={[{ required: true, message: "Pilih tingkat kelas" }]}
              >
                <Select
                  placeholder="Pilih tingkat..."
                  size="large"
                  style={{ borderRadius: 10 }}
                >
                  {TINGKAT_OPTIONS.map((t) => (
                    <Option key={t} value={t}>
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block rounded-md px-2 py-0.5 text-xs font-bold"
                          style={{
                            background: `${getTingkatColor(t)}18`,
                            color: getTingkatColor(t),
                          }}
                        >
                          {t}
                        </span>
                        <span>Kelas {t}</span>
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Jurusan (optional) */}
              <Form.Item
                label={
                  <span style={{ fontWeight: 600, color: C.primary }}>
                    Jurusan{" "}
                    <span className="text-xs font-normal" style={{ color: C.muted }}>
                      (opsional)
                    </span>
                  </span>
                }
                name="jurusan"
              >
                <Select
                  placeholder="Pilih jurusan (kosongkan jika tidak ada)"
                  size="large"
                  allowClear
                  style={{ borderRadius: 10 }}
                >
                  <Option value="IPA">IPA — Ilmu Pengetahuan Alam</Option>
                  <Option value="IPS">IPS — Ilmu Pengetahuan Sosial</Option>
                  <Option value="Bahasa">Bahasa</Option>
                  <Option value="Agama">Agama</Option>
                  <Option value="Teknik Komputer Jaringan">Teknik Komputer Jaringan</Option>
                  <Option value="Akuntansi">Akuntansi</Option>
                  <Option value="Multimedia">Multimedia</Option>
                </Select>
              </Form.Item>

              {/* Wali Kelas (optional) */}
              <Form.Item
                label={
                  <span style={{ fontWeight: 600, color: C.primary }}>
                    Wali Kelas{" "}
                    <span className="text-xs font-normal" style={{ color: C.muted }}>
                      (opsional, dapat diatur di menu Data Guru)
                    </span>
                  </span>
                }
                name="wali_kelas_nip"
              >
                <Select
                  placeholder="Pilih guru sebagai wali kelas..."
                  size="large"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  style={{ borderRadius: 10 }}
                >
                  <Option value="none">
                    <span style={{ color: C.muted, fontStyle: "italic" }}>
                      — Tidak ada wali kelas —
                    </span>
                  </Option>
                  {teachers.map((t) => (
                    <Option key={t.nip} value={t.nip}>
                      <div className="flex items-center gap-2">
                        <Users size={13} style={{ color: C.muted }} />
                        <span>{t.nama}</span>
                        <span className="text-xs" style={{ color: C.muted }}>
                          ({t.nip})
                        </span>
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Footer buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  onClick={closeModal}
                  icon={<X size={14} />}
                  style={{ borderRadius: 10 }}
                >
                  Batal
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  icon={<Save size={14} />}
                  style={{
                    background: `linear-gradient(135deg, ${C.accent}, #c9922f)`,
                    border: "none",
                    borderRadius: 10,
                    fontWeight: 600,
                    boxShadow: `0 4px 12px rgba(217,171,63,0.3)`,
                  }}
                >
                  {editingKelas ? "Simpan Perubahan" : "Tambah Kelas"}
                </Button>
              </div>
            </Form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MasterKelasPage;
