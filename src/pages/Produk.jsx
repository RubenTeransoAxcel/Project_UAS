import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import data from "../assets/produk.json";

export default function ProductTable() {
  const [products, setProducts] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus produk ini?");
    if (confirmDelete) {
      const updatedProducts = products.filter((item) => item.id !== id);
      setProducts(updatedProducts);
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

        <table className="w-full text-sm text-left">
          <thead className="bg-white border-b border-gray-200 text-gray-600 font-medium">
            <tr>
              <th className="px-4 py-3">Gambar</th>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Harga</th>
              <th className="px-4 py-3">Stok</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={item.id}
                className={`transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
              >
                <td className="px-4 py-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border border-gray-200"
                  />
                </td>
                <td className="px-4 py-2">
                  <b><Link
                    to={`/produk/${item.id}`}
                    className="text-coklat hover:underline"
                  >
                    {item.name}
                  </Link></b>
                </td>
                <td className="px-4 py-2 text-gray-800">
                  Rp {item.price.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-gray-800">{item.stock}</td>
                <td className="px-4 py-2 text-gray-800">{item.category}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    to={`/produk/edit/${item.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded cursor-pointer"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
