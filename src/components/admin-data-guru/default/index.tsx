import { useState } from "react";
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
}

// Data dummy awal
const initialGuruData: Guru[] = [
  {
    id: 1,
    nip: "198501152010011001",
    nama: "Dr. Ahmad Suryadi, M.Pd",
    mapel: "Matematika",
    jabatan: "Kepala Sekolah",
    status: "Aktif",
    email: "ahmad.suryadi@smanusantara.sch.id",
    telepon: "081234567890",
    bebanMengajar: 12,
  },
  {
    id: 2,
    nip: "198702202011012002",
    nama: "Dra. Siti Nurhaliza, M.M",
    mapel: "Bahasa Indonesia",
    jabatan: "Wakil Kepala Sekolah",
    status: "Aktif",
    email: "siti.nurhaliza@smanusantara.sch.id",
    telepon: "081234567891",
    bebanMengajar: 18,
  },
  {
    id: 3,
    nip: "199003152012011003",
    nama: "Budi Santoso, S.Pd",
    mapel: "Fisika",
    jabatan: "Wali Kelas XII IPA 1",
    status: "Aktif",
    email: "budi.santoso@smanusantara.sch.id",
    telepon: "081234567892",
    bebanMengajar: 24,
  },
  {
    id: 4,
    nip: "198805102013012004",
    nama: "Dewi Anggraini, S.Pd",
    mapel: "Kimia",
    jabatan: "Guru",
    status: "Aktif",
    email: "dewi.anggraini@smanusantara.sch.id",
    telepon: "081234567893",
    bebanMengajar: 24,
  },
  {
    id: 5,
    nip: "199108252014011005",
    nama: "Rizky Pratama, S.Pd",
    mapel: "Biologi",
    jabatan: "Wali Kelas XI IPA 2",
    status: "Aktif",
    email: "rizky.pratama@smanusantara.sch.id",
    telepon: "081234567894",
    bebanMengajar: 22,
  },
  {
    id: 6,
    nip: "198604152015012006",
    nama: "Nur Aini, S.Pd",
    mapel: "Bahasa Inggris",
    jabatan: "Koordinator BK",
    status: "Aktif",
    email: "nur.aini@smanusantara.sch.id",
    telepon: "081234567895",
    bebanMengajar: 20,
  },
  {
    id: 7,
    nip: "199205102016011007",
    nama: "Agus Setiawan, S.Kom",
    mapel: "Informatika",
    jabatan: "Guru",
    status: "Cuti",
    email: "agus.setiawan@smanusantara.sch.id",
    telepon: "081234567896",
    bebanMengajar: 0,
  },
  {
    id: 8,
    nip: "198909152017012008",
    nama: "Rina Wulandari, S.Pd",
    mapel: "Ekonomi",
    jabatan: "Wali Kelas X IPS 1",
    status: "Aktif",
    email: "rina.wulandari@smanusantara.sch.id",
    telepon: "081234567897",
    bebanMengajar: 24,
  },
];

const DashboardGuru: React.FC = () => {
  const [guruData, setGuruData] = useState<Guru[]>(initialGuruData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMapel, setFilterMapel] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedGuru, setSelectedGuru] = useState<Guru | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");

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
      onOk() {
        setGuruData((prev) => prev.filter((g) => g.id !== id));
        message.success("Data guru berhasil dihapus");
        setIsDetailModalOpen(false);
      },
    });
  };

  // Handler untuk update data
  const handleUpdate = (values: any) => {
    setGuruData((prev) =>
      prev.map((g) => (g.id === selectedGuru?.id ? { ...g, ...values } : g)),
    );
    message.success("Data guru berhasil diperbarui");
    setIsDetailModalOpen(false);
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
        <Space size="middle">
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
              onClick={() => setIsAddModalOpen(false)}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div>
              <Text strong style={{ color: COLORS.secondary }}>
                NIP
              </Text>
              <Input
                placeholder="Masukkan NIP"
                style={{ borderColor: COLORS.secondary }}
              />
            </div>
            <div>
              <Text strong style={{ color: COLORS.secondary }}>
                Nama Lengkap
              </Text>
              <Input
                placeholder="Masukkan nama lengkap"
                style={{ borderColor: COLORS.secondary }}
              />
            </div>
            <div>
              <Text strong style={{ color: COLORS.secondary }}>
                Email
              </Text>
              <Input
                type="email"
                placeholder="Masukkan email"
                style={{ borderColor: COLORS.secondary }}
              />
            </div>
            <div>
              <Text strong style={{ color: COLORS.secondary }}>
                No. Telepon
              </Text>
              <Input
                placeholder="Masukkan no. telepon"
                style={{ borderColor: COLORS.secondary }}
              />
            </div>
            <div>
              <Text strong style={{ color: COLORS.secondary }}>
                Mata Pelajaran
              </Text>
              <Select
                placeholder="Pilih mata pelajaran"
                style={{ width: "100%" }}
              >
                {mapelList.map((mapel) => (
                  <Option key={mapel} value={mapel}>
                    {mapel}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <Text strong style={{ color: COLORS.secondary }}>
                Jabatan
              </Text>
              <Select placeholder="Pilih jabatan" style={{ width: "100%" }}>
                <Option value="Guru">Guru</Option>
                <Option value="Wali Kelas">Wali Kelas</Option>
                <Option value="Wakil Kepala Sekolah">
                  Wakil Kepala Sekolah
                </Option>
                <Option value="Kepala Sekolah">Kepala Sekolah</Option>
              </Select>
            </div>
          </div>
        </Modal>

        {/* Modal Detail/Edit */}
        {renderDetailModal()}
      </div>
    </>
  );
};

export default DashboardGuru;
