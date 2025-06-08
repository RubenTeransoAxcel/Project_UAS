import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { artikelAPI } from "../services/artikelAPI";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";

const Artikel = () => {
  const [artikel, setArtikel] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    id: "",
    judul: "",
    penulis: "",
    isi: "",
    gambar: [],
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await artikelAPI.fetchArtikel();
      setArtikel(data);
    } catch (err) {
      setAlert({ type: "error", message: "Gagal memuat artikel." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar") {
      if (files.length > 10) {
        setAlert({ type: "error", message: "Maksimal 10 gambar." });
        return;
      }
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setForm((prev) => ({
        ...prev,
        gambar: fileArray,
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.judul || !form.penulis || !form.isi || form.gambar.length === 0) {
      setAlert({ type: "error", message: "Semua field wajib diisi." });
      return;
    }

    const newData = {
      judul: form.judul,
      penulis: form.penulis,
      isi: form.isi,
      gambar: form.gambar,
    };

    try {
      if (editingId) {
        await artikelAPI.updateArtikel(editingId, newData);
        setAlert({ type: "success", message: "Artikel berhasil diperbarui." });
        setEditingId(null);
      } else {
        await artikelAPI.createArtikel(newData);
        setAlert({ type: "success", message: "Artikel berhasil ditambahkan." });
      }
      setForm({ id: "", judul: "", penulis: "", isi: "", gambar: [] });
      fetchData();
    } catch (err) {
      setAlert({ type: "error", message: "Gagal menyimpan data ke Supabase." });
    }
  };

  const handleEdit = (id) => {
    const artikelToEdit = artikel.find((item) => item.id === id);
    if (artikelToEdit) {
      setForm({
        id: artikelToEdit.id,
        judul: artikelToEdit.judul,
        penulis: artikelToEdit.penulis,
        isi: artikelToEdit.isi,
        gambar: Array.isArray(artikelToEdit.gambar)
          ? artikelToEdit.gambar
          : artikelToEdit.gambar
          ? [artikelToEdit.gambar]
          : [],
      });
      setEditingId(id);
    }
  };

  const handleRemoveImage = (index) => {
    const newGambar = [...form.gambar];
    newGambar.splice(index, 1);
    setForm((prevForm) => ({
      ...prevForm,
      gambar: newGambar,
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus artikel ini?")) {
      try {
        await artikelAPI.deleteArtikel(id);
        setAlert({ type: "success", message: "Artikel berhasil dihapus." });
        fetchData();
      } catch {
        setAlert({ type: "error", message: "Gagal menghapus artikel." });
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Artikel" : "Tambah Artikel"}
        </h2>

        {alert.message && (
          <AlertBox type={alert.type}>{alert.message}</AlertBox>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="judul"
            placeholder="Judul"
            value={form.judul}
            onChange={handleChange}
            className="w-full p-2 bg-gray-50 border rounded-xl"
          />
          <input
            type="text"
            name="penulis"
            placeholder="Penulis"
            value={form.penulis}
            onChange={handleChange}
            className="w-full p-2 bg-gray-50 border rounded-xl"
          />
          <textarea
            name="isi"
            placeholder="Isi Artikel"
            value={form.isi}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 bg-gray-50 border rounded-xl"
          />
          <input
            type="file"
            name="gambar"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="bg-blue-500 border-2 border-white rounded-xl px-2 py-1 text-white size-1/8"
          />
          {Array.isArray(form.gambar) &&
            form.gambar.map((img, index) => (
              <div
                key={index}
                className="w-16 h-16 border rounded overflow-hidden relative"
              >
                <img
                  src={img}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 cursor-pointer rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}

          <button
            type="submit"
            className="bg-coklat hover:bg-coklat2 text-white px-6 py-2 rounded-xl shadow"
          >
            {editingId ? "Update" : "Tambah"}
          </button>
        </form>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Daftar Artikel</h2>
        {loading ? (
          <LoadingSpinner text="Memuat artikel..." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="px-6 py-3 border-b">Judul</th>
                  <th className="px-6 py-3 border-b">Penulis</th>
                  <th className="px-6 py-3 border-b">Isi</th>
                  <th className="px-6 py-3 border-b text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {artikel.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 text-sm text-gray-700"
                  >
                    <td className="px-6 py-4 border-b">{item.judul}</td>
                    <td className="px-6 py-4 border-b">{item.penulis}</td>
                    <td className="px-6 py-4 border-b">
                      {item.isi.length > 100
                        ? item.isi.substring(0, 100) + "..."
                        : item.isi}
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
        {!loading && artikel.length === 0 && !error && (
          <EmptyState text="Belum ada daftar artikel yang dibuat! Tambah Artikel Sekarang" />
        )}

        {!loading && artikel.length === 0 && error && (
          <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
        )}
      </div>
    </div>
  );
};

export default Artikel;
