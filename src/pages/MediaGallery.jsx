import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { AiFillDelete } from "react-icons/ai";
import { galeriAPI } from "../services/galeriAPI";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";

const MediaGallery = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    judul_media: "",
    deskripsi: "",
    media_file: null,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await galeriAPI.fetchMedia();
      setMediaList(data);
    } catch (err) {
      console.error("Gagal fetch media:", err);
      setAlert({ type: "error", message: "Gagal memuat data media." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.judul_media) {
      setAlert({ type: "error", message: "Judul wajib diisi." });
      return;
    }

    try {
      setSubmitting(true);
      if (editId) {
        // Update
        await galeriAPI.updateMedia(editId, {
          judul_media: form.judul_media,
          deskripsi: form.deskripsi,
        });
        setAlert({ type: "success", message: "Media berhasil diperbarui." });
      } else {
        // Create baru
        if (!form.media_file) {
          setAlert({ type: "error", message: "File media wajib diisi." });
          return;
        }

        if (form.media_file.size > 5 * 1024 * 1024) {
          setAlert({ type: "error", message: "Ukuran file maksimal 5MB." });
          return;
        }

        await galeriAPI.createMedia(form);
        setAlert({ type: "success", message: "Media berhasil ditambahkan." });
      }

      setForm({ judul_media: "", deskripsi: "", media_file: null });
      setEditId(null);
      document.querySelector('input[name="media_file"]').value = null;
      fetchData();
    } catch (err) {
      console.error("❌ Error:", err);
      setAlert({ type: "error", message: "Gagal menyimpan media." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, mediaUrl) => {
    if (window.confirm("Hapus media ini?")) {
      try {
        await galeriAPI.deleteMedia(id, mediaUrl);
        setAlert({ type: "success", message: "Media berhasil dihapus." });
        fetchData();
      } catch (err) {
        console.error("❌ Gagal hapus media:", err);
        setAlert({ type: "error", message: "Gagal menghapus media." });
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Tambah Media</h2>
        {alert && <AlertBox type={alert.type}>{alert.message}</AlertBox>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="judul_media"
            placeholder="Judul Media"
            value={form.judul_media}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl bg-gray-50"
          />
          <textarea
            name="deskripsi"
            placeholder="Deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded-xl bg-gray-50"
          />
          <input
            type="file"
            name="media_file"
            accept="image/*,video/*"
            onChange={handleChange}
            className="bg-blue-500 border-2 border-white rounded-xl px-2 py-1 text-white size-1/3"
          />
          <br />
          <button
            type="submit"
            disabled={submitting}
            className="bg-coklat hover:bg-coklat2 text-white px-6 py-2 rounded-xl disabled:opacity-50"
          >
            {submitting
              ? "Mengunggah..."
              : editId
              ? "Simpan Perubahan"
              : "Tambah"}
          </button>
        </form>
        
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ judul_media: "", deskripsi: "", media_file: null });
              document.querySelector('input[name="media_file"]').value = null;
            }}
            className="ml-4 text-sm text-gray-600 underline"
          >
            Batal Edit
          </button>
        )}
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Media</h2>
        {loading ? (
          <LoadingSpinner text="Memuat media..." />
        ) : mediaList.length === 0 ? (
          <EmptyState text="Belum ada media." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border-b">Judul</th>
                  <th className="px-4 py-2 border-b">Tipe</th>
                  <th className="px-4 py-2 border-b">Preview</th>
                  <th className="px-4 py-2 border-b">Deskripsi</th>
                  <th className="px-4 py-2 border-b">Tanggal</th>
                  <th className="px-4 py-2 border-b text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mediaList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{item.judul_media}</td>
                    <td className="px-4 py-2 border-b">{item.media_type}</td>
                    <td className="px-4 py-2 border-b">
                      {item.media_type === "image" ? (
                        <img
                          src={item.media}
                          alt="media"
                          className="w-20 h-14 object-cover rounded"
                        />
                      ) : (
                        <video
                          src={item.media}
                          controls
                          className="w-28 h-20 rounded"
                        />
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">{item.deskripsi}</td>
                    <td className="px-4 py-2 border-b">
                      {item.tanggal_pembuatan
                        ? dayjs(item.tanggal_pembuatan).format("DD MMM YYYY")
                        : "-"}
                    </td>

                    <td className="px-4 py-2 border-b text-center">
                      <button
                        onClick={() => {
                          setForm({
                            judul_media: item.judul_media,
                            deskripsi: item.deskripsi,
                            media_file: null,
                          });
                          setEditId(item.id);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="hover:bg-blue-100 rounded-full p-2 mr-2"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.media)}
                        className="hover:bg-red-100 rounded-full p-2"
                      >
                        <AiFillDelete className="text-red-500 text-xl cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;
