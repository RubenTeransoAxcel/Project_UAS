import React, { useState } from "react";
import data from "../assets/testimoni.json";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";

const itemsPerPage = 10;

export default function TestimoniTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter berdasarkan nama & rating
  const filteredData = data.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === "" || item.rating === parseInt(ratingFilter);
    return matchesName && matchesRating;
  });

  // Pagination data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Pagination handlers
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset page ketika filter berubah
  };

  const handleRatingChange = (e) => {
    setRatingFilter(e.target.value);
    setCurrentPage(1); // Reset page ketika filter berubah
  };

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Testimoni" breadcrumb={["Dashboard", "Testimoni"]} />

      <div className="p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Daftar Testimoni</h2>

        {/* Filter */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Cari nama..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-1/2"
          />
          <select
            value={ratingFilter}
            onChange={handleRatingChange}
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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Avatar</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nama</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Review</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-800">{item.name}</td>
                  <td className="px-4 py-2 text-gray-600">{item.review}</td>
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

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
