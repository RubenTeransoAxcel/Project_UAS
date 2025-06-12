import React, { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { AiFillEye } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import dayjs from "dayjs";
import PageHeader2 from "../components/PageHeader";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import AlertBox from "../components/AlertBox";
import { karyawanAPI } from "../services/karyawanAPI";

export default function Karyawan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    alamat: "",
    jabatan: "",
    foto: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await karyawanAPI.fetchKaryawan();
      setData(res);
    } catch (err) {
      setAlert({ type: "error", message: "Gagal mengambil data karyawan." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ["name", "email", "phone", "alamat", "jabatan", "foto"];
    if (requiredFields.some((field) => !form[field])) {
      setAlert({ type: "error", message: "Semua field wajib diisi." });
      return;
    }

    try {
      if (editingId) {
        await karyawanAPI.updateKaryawan(editingId, form);
        setAlert({ type: "success", message: "Data berhasil diperbarui." });
        setEditingId(null);
      } else {
        await karyawanAPI.createKaryawan(form);
        setAlert({ type: "success", message: "Data berhasil ditambahkan." });
      }
      setForm({ name: "", email: "", phone: "", alamat: "", jabatan: "", foto: "" });
      fetchData();
    } catch {
      setAlert({ type: "error", message: "Gagal menyimpan data." });
    }
  };

  const handleEdit = (id) => {
    const selected = data.find((d) => d.id === id);
    if (selected) {
      setForm({
        name: selected.name,
        email: selected.email,
        phone: selected.phone,
        alamat: selected.alamat,
        jabatan: selected.jabatan,
        foto: selected.foto,
      });
      setEditingId(id);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Hapus data karyawan?")) {
      try {
        await karyawanAPI.deleteKaryawan(id);
        setAlert({ type: "success", message: "Data berhasil dihapus." });
        fetchData();
      } catch {
        setAlert({ type: "error", message: "Gagal menghapus data." });
      }
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="w-full">
      <PageHeader2 title="Karyawan Barber" breadcrumb={["Dashboard", "Karyawan"]} />

      <div className="mt-6 bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Karyawan" : "Tambah Karyawan"}
        </h2>
        {alert && <AlertBox type={alert.type}>{alert.message}</AlertBox>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Nama" value={form.name} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-xl" />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-xl" />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-xl" />
          <input name="alamat" placeholder="Alamat" value={form.alamat} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-xl" />
          <input name="jabatan" placeholder="Jabatan" value={form.jabatan} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-xl" />
          <input name="foto" placeholder="Masukkan link foto anda" value={form.foto} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-xl" />
          <button type="submit" className="bg-coklat hover:bg-coklat2 text-white px-6 py-2 rounded-xl shadow">
            {editingId ? "Update" : "Tambah"}
          </button>
        </form>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-md p-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Daftar Karyawan</h2>
        {loading ? (
          <LoadingSpinner text="Memuat data karyawan..." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="px-6 py-3 border-b">Foto</th>
                  <th className="px-6 py-3 border-b">Nama</th>
                  <th className="px-6 py-3 border-b">Email</th>
                  <th className="px-6 py-3 border-b">Phone</th>
                  <th className="px-6 py-3 border-b">Alamat</th>
                  <th className="px-6 py-3 border-b">Jabatan</th>
                  <th className="px-6 py-3 border-b">Tanggal Masuk</th>
                  <th className="px-6 py-3 border-b text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((emp, index) => (
                  <tr key={emp.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-6 py-3 border-b">
                      <img src={emp.foto} alt={emp.name} className="w-10 h-10 rounded-full object-cover" />
                    </td>
                    <td className="px-6 py-3 border-b">{emp.name}</td>
                    <td className="px-6 py-3 border-b">{emp.email}</td>
                    <td className="px-6 py-3 border-b">{emp.phone}</td>
                    <td className="px-6 py-3 border-b">{emp.alamat}</td>
                    <td className="px-6 py-3 border-b">{emp.jabatan}</td>
                    <td className="px-6 py-3 border-b">
                      {dayjs(emp.tanggal_masuk).isValid()
                        ? dayjs(emp.tanggal_masuk).format("DD MMM YYYY")
                        : "-"}
                    </td>
                    <td className="px-6 py-3 border-b text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(emp.id)} className="hover:bg-orange-100 rounded-full p-2">
                          <FiEdit className="text-orange-500 text-xl" />
                        </button>
                        <Link to={`/karyawan/${emp.id}`} className="hover:bg-blue-100 rounded-full p-2">
                          <AiFillEye className="text-blue-500 text-xl" />
                        </Link>
                        <button onClick={() => handleDelete(emp.id)} className="hover:bg-red-100 rounded-full p-2">
                          <MdOutlineDeleteOutline className="text-red-500 text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!loading && data.length === 0 && <EmptyState text="Belum ada data karyawan." />}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onPageSizeChange={setItemsPerPage}
        />
      </div>
    </div>
  );
}
