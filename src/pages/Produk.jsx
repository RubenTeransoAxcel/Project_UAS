import React, { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { AiFillEye } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import PageHeader2 from "../components/PageHeader";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import AlertBox from "../components/AlertBox";
import { produkAPI } from "../services/produkAPI";

export default function Produk() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    kategori: "",
    deskripsi: "",
    ingredients: "",
    usage: "",
    nama_brand: "",
    negara: "",
    founded: "",
    weight: "",
    gambar: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  const kategoriOptions = ["styling", "perawatan", "alat", "pembersih"];

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await produkAPI.fetchProduk();
      setData(res);
    } catch {
      setAlert({ type: "error", message: "Gagal mengambil data produk." });
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
    const requiredFields = ["name", "price", "stock", "kategori", "deskripsi", "gambar"];
    if (requiredFields.some((f) => !form[f])) {
      setAlert({ type: "error", message: "Field wajib tidak boleh kosong." });
      return;
    }

    try {
      if (editingId) {
        await produkAPI.updateProduk(editingId, form);
        setAlert({ type: "success", message: "Produk berhasil diperbarui." });
        setEditingId(null);
      } else {
        await produkAPI.createProduk(form);
        setAlert({ type: "success", message: "Produk berhasil ditambahkan." });
      }
      setForm({
        name: "", price: "", stock: "", kategori: "", deskripsi: "", ingredients: "",
        usage: "", nama_brand: "", negara: "", founded: "", weight: "", gambar: ""
      });
      fetchData();
    } catch {
      setAlert({ type: "error", message: "Gagal menyimpan data." });
    }
  };

  const handleEdit = (id) => {
    const item = data.find((d) => d.id === id);
    if (item) {
      setForm(item);
      setEditingId(id);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Hapus produk ini?")) {
      try {
        await produkAPI.deleteProduk(id);
        setAlert({ type: "success", message: "Produk berhasil dihapus." });
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
      <PageHeader2 title="Manajemen Produk" breadcrumb={["Dashboard", "Produk"]} />

      {/* Form Tambah/Edit Produk */}
      <div className="mt-6 bg-white rounded-xl shadow-md p-6 max-w-5xl mx-auto mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Produk" : "Tambah Produk"}
        </h2>
        {alert && <AlertBox type={alert.type}>{alert.message}</AlertBox>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" placeholder="Nama Produk" value={form.name} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-xl" />
          <input name="price" placeholder="Harga (contoh: 25000)" value={form.price} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-xl" />
          <input name="stock" placeholder="Stok" value={form.stock} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-xl" />

          <select name="kategori" value={form.kategori} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-xl">
            <option value="">Pilih Kategori</option>
            {kategoriOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

          <textarea name="deskripsi" placeholder="Deskripsi" value={form.deskripsi} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-xl" />
          <textarea name="ingredients" placeholder="Ingredients" value={form.ingredients} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-xl" />
          <textarea name="usage" placeholder="Cara Pakai" value={form.usage} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-xl" />
          <input name="nama_brand" placeholder="Nama Brand" value={form.nama_brand} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-xl" />
          <input name="negara" placeholder="Negara Asal" value={form.negara} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-xl" />
          <input name="founded" placeholder="Tahun Didirikan" value={form.founded} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-xl" />
          <input name="weight" placeholder="Berat (contoh: 100ml)" value={form.weight} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-xl" />
          <input name="gambar" placeholder="Masukkan link gambar produk" value={form.gambar} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-xl" />
          <button type="submit" className="bg-coklat hover:bg-coklat2 text-white px-6 py-2 rounded-xl shadow">
            {editingId ? "Update" : "Tambah"}
          </button>
        </form>
      </div>

      {/* Tabel Produk */}
      <div className="mt-6 bg-white rounded-xl shadow-md p-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Daftar Produk</h2>
        {loading ? (
          <LoadingSpinner text="Memuat data produk..." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="px-6 py-3 border-b">Gambar</th>
                  <th className="px-6 py-3 border-b">Nama</th>
                  <th className="px-6 py-3 border-b">Harga</th>
                  <th className="px-6 py-3 border-b">Stok</th>
                  <th className="px-6 py-3 border-b">Kategori</th>
                  <th className="px-6 py-3 border-b text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, idx) => (
                  <tr key={item.id} className={`hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-6 py-3 border-b">
                      <img src={item.gambar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                    </td>
                    <td className="px-6 py-3 border-b">{item.name}</td>
                    <td className="px-6 py-3 border-b">
                      {Number(item.price).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td className="px-6 py-3 border-b">{item.stock}</td>
                    <td className="px-6 py-3 border-b">{item.kategori}</td>
                    <td className="px-6 py-3 border-b text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(item.id)} className="hover:bg-orange-100 rounded-full p-2">
                          <FiEdit className="text-orange-500 text-xl" />
                        </button>
                        <Link to={`/produk/${item.id}`} className="hover:bg-blue-100 rounded-full p-2">
                          <AiFillEye className="text-blue-500 text-xl" />
                        </Link>
                        <button onClick={() => handleDelete(item.id)} className="hover:bg-red-100 rounded-full p-2">
                          <MdOutlineDeleteOutline className="text-red-500 text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!loading && data.length === 0 && <EmptyState text="Belum ada produk." />}
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
