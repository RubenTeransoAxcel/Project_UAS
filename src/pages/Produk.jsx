import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination"; // ✅ Tambah ini
import data from "../assets/produk.json";

const itemsPerPage = 10;

export default function ProductTable() {
  const [products, setProducts] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus produk ini?");
    if (confirmDelete) {
      const updatedProducts = products.filter((item) => item.id !== id);
      setProducts(updatedProducts);
      console.log("Data setelah hapus:", updatedProducts);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Produk" breadcrumb={["Dashboard", "Produk"]} />

      <div className="p-6 bg-white rounded-xl shadow-md overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Daftar Produk Barbershop</h2>
          <Link
            to="/produk/tambah"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Tambah Produk
          </Link>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Gambar
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Nama
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Harga
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Stok
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Kategori
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-2">
                  <Link
                    to={`/produk/${item.id}`}
                    className="text-emerald-600 hover:underline"
                  >
                    {item.name}
                  </Link>
                </td>
                <td className="px-4 py-2">Rp {item.price.toLocaleString()}</td>
                <td className="px-4 py-2">{item.stock}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    to={`/produk/edit/${item.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ✅ Ganti Pagination Manual dengan Komponen */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={prevPage}
          onNext={nextPage}
        />
      </div>
    </div>
  );
}
