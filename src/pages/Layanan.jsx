import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { layananAPI } from "../services/layananAPI";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";

const Layanan = () => {
  const [layanan, setLayanan] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    nama_paket: "",
    rincian: "",
    harga: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await layananAPI.fetchLowongan();
      setLayanan(data);
    } catch (err) {
      setAlert({ type: "error", message: "Gagal mengambil data layanan." });
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
    const requiredFields = ["nama_paket", "rincian", "harga"];
    if (requiredFields.some((field) => !form[field])) {
      setAlert({ type: "error", message: "Semua field wajib diisi." });
      return;
    }

    try {
      if (editingId) {
        await layananAPI.updateLowongan(editingId, form);
        setAlert({ type: "success", message: "Layanan berhasil diperbarui." });
        setEditingId(null);
      } else {
        await layananAPI.createLowongan(form);
        setAlert({ type: "success", message: "Layanan berhasil ditambahkan." });
      }
      setForm({ nama_paket: "", rincian: "", harga: "" });
      fetchData();
    } catch (err) {
      setAlert({ type: "error", message: "Gagal menyimpan data." });
    }
  };

  const handleEdit = (id) => {
    const selected = layanan.find((item) => item.id === id);
    if (selected) {
      setForm({
        nama_paket: selected.nama_paket,
        rincian: selected.rincian,
        harga: selected.harga,
      });
      setEditingId(id);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus layanan ini?")) {
      try {
        await layananAPI.deleteLowongan(id);
        setAlert({ type: "success", message: "Layanan berhasil dihapus." });
        fetchData();
      } catch (err) {
        setAlert({ type: "error", message: "Gagal menghapus layanan." });
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Layanan" : "Tambah Layanan"}
        </h2>
        {alert && <AlertBox type={alert.type}>{alert.message}</AlertBox>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama_paket"
            placeholder="Nama Paket"
            value={form.nama_paket}
            onChange={handleChange}
            className="w-full p-2 bg-gray-50 border rounded-xl"
          />
          <textarea
            name="rincian"
            placeholder="Rincian"
            value={form.rincian}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 bg-gray-50 border rounded-xl"
          />
          <input
            type="number"
            name="harga"
            placeholder="Harga"
            value={form.harga}
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
        <h2 className="text-xl font-semibold mb-4">Daftar Layanan</h2>
        {loading ? (
          <LoadingSpinner text="Memuat data layanan..." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="px-6 py-3 border-b">Nama Paket</th>
                  <th className="px-6 py-3 border-b">Rincian</th>
                  <th className="px-6 py-3 border-b">Harga</th>
                  <th className="px-6 py-3 border-b text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {layanan.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 text-sm text-gray-700"
                  >
                    <td className="px-6 py-4 border-b">{item.nama_paket}</td>
                    <td className="px-6 py-4 border-b">{item.rincian}</td>
                    <td className="px-6 py-4 border-b">
                      {Number(item.harga).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
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
        {!loading && layanan.length === 0 && !error && (
          <EmptyState text="Belum ada layanan tersedia." />
        )}
        {!loading && layanan.length === 0 && error && (
          <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
        )}
      </div>
    </div>
  );
};

export default Layanan;
