import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import dayjs from "dayjs";
import { lowonganAPI } from "../services/lowonganAPI";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";

const LowonganPekerjaan = () => {
  const [lowongan, setLowongan] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    judul_lowongan: "",
    posisi: "",
    syarat: "",
    email_hrd: "",
    no_telpon_hrd: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await lowonganAPI.fetchLowongan();
      setLowongan(data);
    } catch (err) {
      setAlert({ type: "error", message: "Gagal mengambil data lowongan." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      "judul_lowongan",
      "posisi",
      "syarat",
      "email_hrd",
      "no_telpon_hrd",
    ];
    if (requiredFields.some((field) => !form[field])) {
      setAlert({ type: "error", message: "Semua field wajib diisi." });
      return;
    }

    try {
      if (editingId) {
        await lowonganAPI.updateLowongan(editingId, form);
        setAlert({ type: "success", message: "Lowongan berhasil diperbarui." });
        setEditingId(null);
      } else {
        await lowonganAPI.createLowongan(form);
        setAlert({
          type: "success",
          message: "Lowongan berhasil ditambahkan.",
        });
      }
      setForm({
        judul_lowongan: "",
        posisi: "",
        syarat: "",
        email_hrd: "",
        no_telpon_hrd: "",
      });
      fetchData();
    } catch (err) {
      setAlert({ type: "error", message: "Gagal menyimpan data." });
    }
  };

  const handleEdit = (id) => {
    const selected = lowongan.find((item) => item.id === id);
    if (selected) {
      setForm({
        judul_lowongan: selected.judul_lowongan,
        posisi: selected.posisi,
        syarat: selected.syarat,
        email_hrd: selected.email_hrd,
        no_telpon_hrd: selected.no_telpon_hrd,
      });
      setEditingId(id);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus lowongan ini?")) {
      try {
        await lowonganAPI.deleteLowongan(id);
        setAlert({ type: "success", message: "Lowongan berhasil dihapus." });
        fetchData();
      } catch (err) {
        setAlert({ type: "error", message: "Gagal menghapus lowongan." });
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Lowongan" : "Tambah Lowongan"}
        </h2>
        {alert && <AlertBox type={alert.type}>{alert.message}</AlertBox>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="judul_lowongan"
            placeholder="Judul Lowongan"
            value={form.judul_lowongan}
            onChange={handleChange}
            className="w-full p-2 bg-gray-50 border rounded-xl"
          />
          <input
            type="text"
            name="posisi"
            placeholder="Posisi"
            value={form.posisi}
            onChange={handleChange}
            className="w-full p-2 bg-gray-50 border rounded-xl"
          />
          <textarea
            name="syarat"
            placeholder="Syarat"
            value={form.syarat}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 bg-gray-50 border rounded-xl"
          />
          <input
            type="email"
            name="email_hrd"
            placeholder="Email HRD"
            value={form.email_hrd}
            onChange={handleChange}
            className="w-full p-2 bg-gray-50 border rounded-xl"
          />
          <input
            type="text"
            name="no_telpon_hrd"
            placeholder="No Telepon HRD"
            value={form.no_telpon_hrd}
            onChange={handleChange}
            className="w-full p-2 bg-gray-50 border rounded-xl"
          />
          <button
            type="submit"
            className="bg-coklat hover:bg-coklat2 text-white px-6 py-2 rounded-xl shadow cursor-pointer"
          >
            {editingId ? "Update" : "Tambah"}
          </button>
        </form>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Daftar Lowongan</h2>
        {loading ? (
          <LoadingSpinner text="Memuat data lowongan..." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="px-6 py-3 border-b">Judul</th>
                  <th className="px-6 py-3 border-b">Posisi</th>
                  <th className="px-6 py-3 border-b">Syarat</th>
                  <th className="px-6 py-3 border-b">Email HRD</th>
                  <th className="px-6 py-3 border-b">Telp HRD</th>
                  <th className="px-6 py-3 border-b">Tanggal Publikasi</th>
                  <th className="px-6 py-3 border-b text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {lowongan.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 text-sm text-gray-700"
                  >
                    <td className="px-6 py-4 border-b">
                      {item.judul_lowongan}
                    </td>
                    <td className="px-6 py-4 border-b">{item.posisi}</td>
                    <td className="px-6 py-4 border-b">
                      {item.syarat?.length > 50
                        ? item.syarat.substring(0, 50) + "..."
                        : item.syarat}
                    </td>
                    <td className="px-6 py-4 border-b">{item.email_hrd}</td>
                    <td className="px-6 py-4 border-b">{item.no_telpon_hrd}</td>
                    <td className="px-6 py-4 border-b">
                      {dayjs(item.tanggal_publikasi).isValid()
                        ? dayjs(item.tanggal_publikasi).format("DD MMM YYYY")
                        : "Tanggal tidak valid"}
                    </td>
                    <td className="px-6 py-4 border-b text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="hover:bg-orange-100 rounded-full p-2"
                        >
                          <AiFillEdit className="text-orange-500 text-xl cursor-pointer" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="hover:bg-red-100 rounded-full p-2"
                        >
                          <AiFillDelete className="text-red-500 text-xl cursor-pointer" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && lowongan.length === 0 && !error && (
          <EmptyState text="Belum ada daftar data lowongan pekerjaan dibuka!" />
        )}

        {!loading && lowongan.length === 0 && error && (
          <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
        )}
      </div>
    </div>
  );
};

export default LowonganPekerjaan;
