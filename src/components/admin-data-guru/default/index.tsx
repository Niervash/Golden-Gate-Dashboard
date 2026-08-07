import { useState, useEffect } from "react";
import { teachersApi, classesApi, usersApi } from "../../../utils/api";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  Mail,
  KeyRound,
} from "lucide-react";
import {
  Table,
  Button,
  Input,
  Select,
  Modal,
  Badge,
  Space,
  Typography,
  Tabs,
  Form,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TabsProps } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

// Palet warna (sama dengan PPDBAdminDashboard)
const COLORS = {
  primary: "#23305d",
  secondary: "#43424e",
  accent: "#d9ab3f",
  accentLight: "#af9151",
  white: "#ffffff",
  goldTransparent: "rgba(217, 171, 63, 0.1)",
  goldTransparent20: "rgba(217, 171, 63, 0.2)",
  blueTransparent10: "rgba(35, 48, 93, 0.1)",
  blueTransparent20: "rgba(35, 48, 93, 0.2)",
  grayLight: "#f8f9fa",
  grayMedium: "#e9ecef",
};

// Tipe data guru
interface Guru {
  id: number;
  nip: string;
  nama: string;
  mapel: string;
  jabatan: string;
  status: "Aktif" | "Cuti";
  email: string;
  telepon: string;
  bebanMengajar: number;
  isHomeroom: boolean;
  homeroomClass?: string;
}

// Data dummy awal
const initialGuruData: Guru[] = [];

const DashboardGuru: React.FC = () => {
  const [guruData, setGuruData] = useState<Guru[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMapel, setFilterMapel] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedGuru, setSelectedGuru] = useState<Guru | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");

  // Modal penetapan Wali Kelas
  const [isHomeroomModalOpen, setIsHomeroomModalOpen] = useState(false);
  const [targetGuruForHomeroom, setTargetGuruForHomeroom] = useState<Guru | null>(null);
  const [homeroomClassInput, setHomeroomClassInput] = useState("");
  const [accountEmails, setAccountEmails] = useState<Set<string>>(new Set());
  const [activationGuru, setActivationGuru] = useState<Guru | null>(null);
  const [activationPassword, setActivationPassword] = useState("");

  const [addForm] = Form.useForm();

  const mapToFE = (g: any): Guru => ({
    id: g.id,
    nip: g.nip,
    nama: g.nama_lengkap,
    mapel: g.mapel,
    jabatan: g.jabatan,
    status: g.status,
    email: g.email || "",
    telepon: g.telepon || "",
    bebanMengajar: g.beban_mengajar || 0,
    isHomeroom: Boolean(g.is_homeroom),
    homeroomClass: g.homeroom_class || "",
  });

  const mapToBE = (g: any) => ({
    nip: g.nip,
    nama_lengkap: g.nama,
    mapel: g.mapel,
    jabatan: g.jabatan,
    status: g.status,
    email: g.email || null,
    telepon: g.telepon || null,
    beban_mengajar: Number(g.bebanMengajar),
    is_homeroom: g.isHomeroom ? 1 : 0,
    homeroom_class: g.homeroomClass || null,
  });

  const loadTeachers = async () => {
    setLoading(true);
    try {
      const [teachersRes, usersRes] = await Promise.all([teachersApi.getAll(), usersApi.getAll()]);
      const teacherList = Array.isArray(teachersRes.data) ? teachersRes.data : teachersRes.data?.data || [];
      const userList = usersRes.data?.users || usersRes.data?.data || [];
      setGuruData(teacherList.map(mapToFE));
      setAccountEmails(new Set(userList
        .filter((user: any) => user.role === "guru")
        .map((user: any) => String(user.email || "").toLowerCase())));
    } catch (err) {
      console.error(err);
      message.error("Gagal mengambil data guru dari server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  // Filter data
  const filteredGuru = guruData.filter((guru) => {
    const matchSearch =
      guru.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guru.nip.includes(searchTerm);
    const matchMapel = filterMapel === "all" || guru.mapel === filterMapel;
    return matchSearch && matchMapel;
  });

  const mapelList = [...new Set(guruData.map((g) => g.mapel))];

  // Statistik
  const totalGuru = guruData.length;
  const guruAktif = guruData.filter((g) => g.status === "Aktif").length;
  const guruCuti = guruData.filter((g) => g.status === "Cuti").length;
  const totalStaf = guruData.length; // jika ada data staf terpisah, sesuaikan

  // Handler untuk melihat detail
  const handleViewDetail = (guru: Guru) => {
    setSelectedGuru(guru);
    setModalMode("view");
    setIsDetailModalOpen(true);
  };

  // Handler untuk edit
  const handleEdit = (guru: Guru) => {
    setSelectedGuru(guru);
    setModalMode("edit");
    setIsDetailModalOpen(true);
  };

  // Handler untuk hapus dengan konfirmasi
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Konfirmasi Hapus",
      content: "Apakah Anda yakin ingin menghapus data guru ini?",
      okText: "Ya",
      cancelText: "Tidak",
      async onOk() {
        try {
          await teachersApi.delete(id);
          message.success("Data guru berhasil dihapus");
          setIsDetailModalOpen(false);
          await loadTeachers();
        } catch (err: any) {
          console.error(err);
          message.error(err.response?.data?.message || err.message || "Gagal menghapus data guru");
        }
      },
    });
  };

  // Handler untuk update data
  const handleUpdate = async (values: any) => {
    if (!selectedGuru) return;
    try {
      const payload = mapToBE(values);
      await teachersApi.update(selectedGuru.id, payload);
      message.success("Data guru berhasil diperbarui");
      setIsDetailModalOpen(false);
      await loadTeachers();
    } catch (err: any) {
      console.error(err);
      message.error(err.response?.data?.message || err.message || "Gagal memperbarui data guru");
    }
  };

  // State pilihan kelas dari Master Kelas
  const [classListOptions, setClassListOptions] = useState<string[]>([]);

  const loadClassesForSelect = async () => {
    try {
      const res = await classesApi.getAll();
      const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
      if (list.length > 0) {
        setClassListOptions(list.map((c: any) => c.nama_kelas).filter(Boolean));
      } else {
        const studRes = await teachersApi.getAll(); // fallback
        const teachers = Array.isArray(studRes.data) ? studRes.data : [];
        const existing = Array.from(new Set(teachers.map((t: any) => t.homeroom_class).filter(Boolean))) as string[];
        setClassListOptions(existing.length > 0 ? existing : ["7-A", "7-B", "8-A", "8-B", "9-A", "X-IPA-1", "XI-IPA-1"]);
      }
    } catch {
      setClassListOptions(["7-A", "7-B", "8-A", "8-B", "9-A", "X-IPA-1", "XI-IPA-1"]);
    }
  };

  useEffect(() => {
    loadClassesForSelect();
  }, []);

  // Handler penetapan Wali Kelas oleh TU
  const handleOpenHomeroomModal = (guru: Guru) => {
    setTargetGuruForHomeroom(guru);
    setHomeroomClassInput(guru.homeroomClass || "");
    setIsHomeroomModalOpen(true);
  };

  const handleSaveHomeroomAssignment = async () => {
    if (!targetGuruForHomeroom) return;
    try {
      const classValue = (homeroomClassInput || "").trim();
      await teachersApi.assignHomeroom(targetGuruForHomeroom.id, {
        is_homeroom: Boolean(classValue && classValue !== "none"),
        homeroom_class: classValue && classValue !== "none" ? classValue : undefined,
      });
      message.success(
        classValue && classValue !== "none"
          ? `Berhasil menetapkan ${targetGuruForHomeroom.nama} sebagai Wali Kelas ${classValue}`
          : `Status Wali Kelas ${targetGuruForHomeroom.nama} dicabut`
      );
      setIsHomeroomModalOpen(false);
      await loadTeachers();
    } catch (err: any) {
      console.error(err);
      message.error(err.response?.data?.message || err.message || "Gagal memperbarui status Wali Kelas");
    }
  };

  const handleActivateAccount = async () => {
    if (!activationGuru?.email || !/^\S+@\S+\.\S+$/.test(activationGuru.email)) {
      message.error("Lengkapi email yang valid pada data guru sebelum mengaktifkan akun.");
      return;
    }
    if (!activationPassword || activationPassword.length < 6) {
      message.error("Password awal minimal 6 karakter");
      return;
    }
    try {
      await usersApi.create({
        name: activationGuru.nama,
        email: activationGuru.email,
        password: activationPassword,
        role: "guru",
      });
      message.success(`Akun Guru untuk ${activationGuru.nama} berhasil diaktifkan`);
      setActivationGuru(null);
      setActivationPassword("");
      await loadTeachers();
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Gagal mengaktifkan akun guru");
    }
  };

  // Kolom tabel Ant Design
  const columns: ColumnsType<Guru> = [
    {
      title: "NIP",
      dataIndex: "nip",
      key: "nip",
      render: (text) => <span style={{ fontFamily: "monospace" }}>{text}</span>,
    },
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500, color: COLORS.primary }}>
            {record.nama}
          </div>
          <Space size="small" style={{ color: COLORS.secondary, fontSize: 12 }}>
            <Mail size={12} />
            <span>{record.email}</span>
          </Space>
        </div>
      ),
    },
    {
      title: "Mata Pelajaran",
      dataIndex: "mapel",
      key: "mapel",
      render: (text) => <span style={{ color: COLORS.primary }}>{text}</span>,
    },
    {
      title: "Wali Kelas",
      key: "homeroom",
      render: (_, record) =>
        record.isHomeroom && record.homeroomClass ? (
          <Badge
            color={COLORS.primary}
            text={`Wali Kelas ${record.homeroomClass}`}
            style={{
              backgroundColor: COLORS.blueTransparent10,
              color: COLORS.primary,
              padding: "4px 8px",
              borderRadius: "12px",
              fontWeight: 600,
            }}
          />
        ) : (
          <span style={{ color: COLORS.secondary, fontSize: 12 }}>-</span>
        ),
    },
    {
      title: "Jabatan",
      dataIndex: "jabatan",
      key: "jabatan",
    },
    {
      title: "Beban Mengajar",
      dataIndex: "bebanMengajar",
      key: "bebanMengajar",
      render: (text) => <span>{text} JP/minggu</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Badge
          color={status === "Aktif" ? COLORS.accent : COLORS.secondary}
          text={status}
          style={{
            backgroundColor:
              status === "Aktif" ? COLORS.goldTransparent : COLORS.grayMedium,
            color: status === "Aktif" ? COLORS.accent : COLORS.secondary,
            padding: "4px 8px",
            borderRadius: "12px",
            fontWeight: 500,
          }}
        />
      ),
    },
    {
      title: "Aksi",
      key: "aksi",
      align: "right",
      render: (_, record) => (
        <Space size="small">
          {record.email && accountEmails.has(String(record.email).toLowerCase()) ? (
            <span className="text-xs font-semibold text-emerald-600">Akun Aktif</span>
          ) : (
            <Button
              type="primary"
              size="small"
              icon={<KeyRound size={14} />}
              onClick={() => { setActivationGuru(record); setActivationPassword(""); }}
              style={{ backgroundColor: COLORS.primary, borderColor: COLORS.primary, fontSize: 12 }}
            >
              Aktifkan Akun
            </Button>
          )}
          <Button
            type="outline"
            size="small"
            onClick={() => handleOpenHomeroomModal(record)}
            style={{ borderColor: COLORS.accent, color: COLORS.primary, fontSize: 12 }}
          >
            Set Wali Kelas
          </Button>
          <Button
            type="text"
            icon={<Eye size={16} />}
            style={{ color: COLORS.primary }}
            onClick={() => handleViewDetail(record)}
          />
          <Button
            type="text"
            icon={<Edit size={16} />}
            style={{ color: COLORS.accent }}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            icon={<Trash2 size={16} />}
            style={{ color: "#ef4444" }}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  // Render modal detail/edit
  const renderDetailModal = () => {
    if (!selectedGuru) return null;

    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "Informasi Pribadi",
        children: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Text type="secondary">NIP</Text>
                <div className="font-medium">{selectedGuru.nip}</div>
              </div>
              <div>
                <Text type="secondary">Nama Lengkap</Text>
                <div className="font-medium">{selectedGuru.nama}</div>
              </div>
              <div>
                <Text type="secondary">Status</Text>
                <Badge
                  color={
                    selectedGuru.status === "Aktif"
                      ? COLORS.accent
                      : COLORS.secondary
                  }
                  text={selectedGuru.status}
                  style={{
                    backgroundColor:
                      selectedGuru.status === "Aktif"
                        ? COLORS.goldTransparent
                        : COLORS.grayMedium,
                    color:
                      selectedGuru.status === "Aktif"
                        ? COLORS.accent
                        : COLORS.secondary,
                    padding: "4px 8px",
                    borderRadius: "12px",
                    fontWeight: 500,
                  }}
                />
              </div>
            </div>
          </div>
        ),
      },
      {
        key: "2",
        label: "Kontak & Jabatan",
        children: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Text type="secondary">Email</Text>
                <div className="font-medium">{selectedGuru.email}</div>
              </div>
              <div>
                <Text type="secondary">Telepon</Text>
                <div className="font-medium">{selectedGuru.telepon}</div>
              </div>
              <div>
                <Text type="secondary">Mata Pelajaran</Text>
                <div className="font-medium">{selectedGuru.mapel}</div>
              </div>
              <div>
                <Text type="secondary">Jabatan</Text>
                <div className="font-medium">{selectedGuru.jabatan}</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        key: "3",
        label: "Beban Mengajar",
        children: (
          <div className="space-y-4">
            <div>
              <Text type="secondary">Jumlah jam mengajar per minggu</Text>
              <div
                className="text-2xl font-bold"
                style={{ color: COLORS.accent }}
              >
                {selectedGuru.bebanMengajar} JP
              </div>
            </div>
          </div>
        ),
      },
    ];

    return (
      <Modal
        title={
          <span style={{ color: COLORS.primary }}>
            {modalMode === "view" ? "Detail Guru" : "Edit Data Guru"}
          </span>
        }
        open={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
        footer={null}
        width={700}
        className="mx-4 sm:mx-auto"
      >
        {modalMode === "view" ? (
          <>
            <Tabs defaultActiveKey="1" items={items} />
            <div className="flex justify-end gap-2 mt-6">
              <Button onClick={() => setIsDetailModalOpen(false)}>Tutup</Button>
              <Button
                type="primary"
                style={{
                  backgroundColor: COLORS.accent,
                  borderColor: COLORS.accent,
                }}
                onClick={() => setModalMode("edit")}
              >
                Edit
              </Button>
              <Button danger onClick={() => handleDelete(selectedGuru.id)}>
                Hapus
              </Button>
            </div>
          </>
        ) : (
          <Form
            layout="vertical"
            initialValues={selectedGuru}
            onFinish={handleUpdate}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="NIP" name="nip" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Nama Lengkap"
                name="nama"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Telepon"
                name="telepon"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Mata Pelajaran"
                name="mapel"
                rules={[{ required: true }]}
              >
                <Select>
                  {mapelList.map((m) => (
                    <Option key={m} value={m}>
                      {m}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Jabatan"
                name="jabatan"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="Guru">Guru</Option>
                  <Option value="Wali Kelas">Wali Kelas</Option>
                  <Option value="Wakil Kepala Sekolah">
                    Wakil Kepala Sekolah
                  </Option>
                  <Option value="Kepala Sekolah">Kepala Sekolah</Option>
                  <Option value="Koordinator BK">Koordinator BK</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="Aktif">Aktif</Option>
                  <Option value="Cuti">Cuti</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Beban Mengajar (JP/minggu)"
                name="bebanMengajar"
                rules={[{ required: true }]}
              >
                <Input type="number" />
              </Form.Item>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={() => setModalMode("view")}>Batal</Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: COLORS.accent,
                  borderColor: COLORS.accent,
                }}
              >
                Simpan
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    );
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <Title
              level={2}
              style={{ color: COLORS.primary, margin: 0 }}
              className="text-xl sm:text-2xl"
            >
              Manajemen Guru & Pegawai
            </Title>
            <Text
              style={{ color: COLORS.secondary }}
              className="text-sm sm:text-base"
            >
              Kelola data guru dan staf sekolah
            </Text>
          </div>
          <Button
            type="primary"
            icon={<Plus size={16} />}
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto"
            style={{
              backgroundColor: COLORS.accent,
              borderColor: COLORS.accent,
              boxShadow: "none",
            }}
          >
            Tambah Guru
          </Button>
        </div>

        {/* Statistik Cards - 2 kolom di mobile, 4 kolom di desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              label: "Total Guru",
              value: totalGuru,
              color: COLORS.primary,
              bgColor: COLORS.blueTransparent10,
            },
            {
              label: "Guru Aktif",
              value: guruAktif,
              color: "#10b981",
              bgColor: "rgba(16,185,129,0.1)",
            },
            {
              label: "Guru Cuti",
              value: guruCuti,
              color: "#f59e0b",
              bgColor: "rgba(245,158,11,0.1)",
            },
            {
              label: "Total Staf TU",
              value: totalStaf,
              color: "#3b82f6",
              bgColor: "rgba(59,130,246,0.1)",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-3 sm:p-4 border"
              style={{ borderColor: COLORS.grayMedium }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <Text
                    style={{ color: COLORS.secondary }}
                    className="text-xs sm:text-sm"
                  >
                    {stat.label}
                  </Text>
                  <div
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: stat.color,
                    }}
                    className="text-lg sm:text-2xl"
                  >
                    {stat.value}
                  </div>
                </div>
                <div
                  className="p-1.5 sm:p-2 rounded-lg"
                  style={{ backgroundColor: stat.bgColor }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Input
            placeholder="Cari berdasarkan nama atau NIP..."
            prefix={<Search size={16} style={{ color: COLORS.secondary }} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            style={{ borderColor: COLORS.secondary }}
          />
          <Select
            value={filterMapel}
            onChange={(value) => setFilterMapel(value)}
            className="w-full sm:w-48"
            placeholder="Filter Mapel"
            suffixIcon={
              <Filter size={16} style={{ color: COLORS.secondary }} />
            }
          >
            <Option value="all">Semua Mapel</Option>
            {mapelList.map((mapel) => (
              <Option key={mapel} value={mapel}>
                {mapel}
              </Option>
            ))}
          </Select>
          <Button
            icon={<Download size={16} />}
            className="w-full sm:w-auto"
            style={{
              borderColor: COLORS.primary,
              color: COLORS.primary,
            }}
          >
            Export
          </Button>
        </div>

        {/* Tabel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border overflow-hidden"
          style={{ borderColor: COLORS.grayMedium }}
        >
          <Table
            columns={columns}
            dataSource={filteredGuru}
            rowKey="id"
            pagination={{ pageSize: 10, size: "small" }}
            scroll={{ x: "max-content" }}
            style={{ backgroundColor: COLORS.white }}
          />
        </motion.div>

        {/* Modal Tambah Guru (tetap seperti sebelumnya) */}
        <Modal
          title="Tambah Data Guru Baru"
          open={isAddModalOpen}
          onCancel={() => setIsAddModalOpen(false)}
          footer={[
            <Button
              key="cancel"
              onClick={() => setIsAddModalOpen(false)}
              className="w-full sm:w-auto"
            >
              Batal
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => addForm.submit()}
              className="w-full sm:w-auto"
              style={{
                backgroundColor: COLORS.accent,
                borderColor: COLORS.accent,
              }}
            >
              Simpan
            </Button>,
          ]}
          width={600}
          className="mx-4 sm:mx-auto"
        >
          <Form
            form={addForm}
            layout="vertical"
            onFinish={async (values) => {
              try {
                const payload = mapToBE(values);
                await teachersApi.create(payload);
                message.success("Guru baru berhasil ditambahkan");
                setIsAddModalOpen(false);
                addForm.resetFields();
                await loadTeachers();
              } catch (err: any) {
                console.error(err);
                message.error(err.response?.data?.message || err.message || "Gagal menambahkan guru");
              }
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <Form.Item label="NIP" name="nip" rules={[{ required: true, message: "NIP wajib diisi" }]}>
                <Input placeholder="Masukkan NIP" style={{ borderColor: COLORS.secondary }} />
              </Form.Item>
              <Form.Item label="Nama Lengkap" name="nama" rules={[{ required: true, message: "Nama wajib diisi" }]}>
                <Input placeholder="Masukkan nama lengkap" style={{ borderColor: COLORS.secondary }} />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Email tidak valid" }]}>
                <Input type="email" placeholder="Masukkan email" style={{ borderColor: COLORS.secondary }} />
              </Form.Item>
              <Form.Item label="No. Telepon" name="telepon" rules={[{ required: true, message: "Telepon wajib diisi" }]}>
                <Input placeholder="Masukkan no. telepon" style={{ borderColor: COLORS.secondary }} />
              </Form.Item>
              <Form.Item label="Mata Pelajaran" name="mapel" rules={[{ required: true, message: "Pilih mata pelajaran" }]}>
                <Select placeholder="Pilih mata pelajaran" style={{ width: "100%" }}>
                  <Option value="Matematika">Matematika</Option>
                  <Option value="Fisika">Fisika</Option>
                  <Option value="Bahasa Indonesia">Bahasa Indonesia</Option>
                  <Option value="Informatika">Informatika</Option>
                  <Option value="Kimia">Kimia</Option>
                  <Option value="Biologi">Biologi</Option>
                  <Option value="Bahasa Inggris">Bahasa Inggris</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Jabatan" name="jabatan" rules={[{ required: true, message: "Pilih jabatan" }]}>
                <Select placeholder="Pilih jabatan" style={{ width: "100%" }}>
                  <Option value="Guru">Guru</Option>
                  <Option value="Wali Kelas">Wali Kelas</Option>
                  <Option value="Wakil Kepala Sekolah">Wakil Kepala Sekolah</Option>
                  <Option value="Kepala Sekolah">Kepala Sekolah</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Status" name="status" initialValue="Aktif" rules={[{ required: true }]}>
                <Select style={{ width: "100%" }}>
                  <Option value="Aktif">Aktif</Option>
                  <Option value="Cuti">Cuti</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Beban Mengajar" name="bebanMengajar" initialValue={18} rules={[{ required: true }]}>
                <Input type="number" placeholder="Beban mengajar (JP)" style={{ borderColor: COLORS.secondary }} />
              </Form.Item>
            </div>
          </Form>
        </Modal>

        {/* Modal Detail/Edit */}
        {renderDetailModal()}

        {/* Aktivasi Akun Login dari Data Guru */}
        <Modal
          title={`Aktifkan Akun Guru — ${activationGuru?.nama || ""}`}
          open={Boolean(activationGuru)}
          onOk={handleActivateAccount}
          onCancel={() => { setActivationGuru(null); setActivationPassword(""); }}
          okText="Aktifkan Akun"
          cancelText="Batal"
        >
          <div className="space-y-3 py-2">
            <p className="text-sm text-gray-600">
              Akun dibuat dari data guru yang sudah terdaftar. Guru akan login menggunakan email <strong>{activationGuru?.email}</strong>.
            </p>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Password awal</label>
              <Input.Password
                value={activationPassword}
                onChange={(event) => setActivationPassword(event.target.value)}
                placeholder="Minimal 6 karakter"
              />
            </div>
          </div>
        </Modal>

        {/* Modal Penetapan Wali Kelas oleh TU */}
        <Modal
          title={`Penetapan Wali Kelas — ${targetGuruForHomeroom?.nama || ""}`}
          open={isHomeroomModalOpen}
          onOk={handleSaveHomeroomAssignment}
          onCancel={() => setIsHomeroomModalOpen(false)}
          okText="Simpan Penugasan"
          cancelText="Batal"
        >
          <div className="py-2 space-y-4">
            <p className="text-sm text-gray-600">
              Pilih kelas untuk menetapkan guru ini sebagai <strong>Wali Kelas</strong>. Pilih <em>"Tidak ada (cabut wali kelas)"</em> untuk mencabut status Wali Kelas.
            </p>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                Nama Kelas Binaan
              </label>
              <Select
                placeholder="Pilih kelas..."
                value={homeroomClassInput || "none"}
                onChange={(val) => setHomeroomClassInput(val === "none" ? "" : val)}
                style={{ width: "100%" }}
                showSearch
                optionFilterProp="children"
              >
                <Option value="none">— Tidak ada (cabut wali kelas) —</Option>
                {classListOptions.map((kelas) => (
                  <Option key={kelas} value={kelas}>
                    {kelas}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default DashboardGuru;
