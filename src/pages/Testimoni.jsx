import React, { useState } from "react";
import data from "../assets/testimoni.json";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

export default function TestimoniTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter berdasarkan nama & rating
  const filteredData = data.filter((item) => {
    const matchesName = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === "" || item.rating === parseInt(ratingFilter);
    return matchesName && matchesRating;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Testimoni" breadcrumb={["Dashboard", "Testimoni"]} />

      <div className="p-6 bg-white rounded-xl shadow-md overflow-hidden">
        <h2 className="text-xl font-bold mb-4">Daftar Testimoni</h2>

        {/* Filter */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Cari nama..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-1/2"
          />
          <select
            value={ratingFilter}
            onChange={(e) => {
              setRatingFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-1/4"
          >
            <option value="">Semua Rating</option>
            <option value="5">5 Bintang</option>
            <option value="4">4 Bintang</option>
            <option value="3">3 Bintang</option>
            <option value="2">2 Bintang</option>
            <option value="1">1 Bintang</option>
          </select>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white border-b border-gray-200 text-gray-600 font-medium">
              <tr>
                <th className="px-4 py-3">Avatar</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Review</th>
                <th className="px-4 py-3">Rating</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={`transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                >
                  <td className="px-4 py-2">
                    <Link to={`/testimoni/${item.id}`}>
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </Link>
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-800">
                    <Link
                      to={`/testimoni/${item.id}`}
                      className="text-coklat hover:underline hover:text-coklat2"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-gray-700">{item.review}</td>
                  <td className="px-4 py-2 text-yellow-500">
                    {"⭐".repeat(item.rating)}
                    {"☆".repeat(5 - item.rating)}
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    Tidak ada testimoni ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination modern */}
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
