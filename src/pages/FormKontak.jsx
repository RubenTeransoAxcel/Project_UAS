import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import data from "../assets/contactUs.json";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

const itemsPerPage = 10;

export default function FormKontakTable() {
  const [formKontak, setFormKontak] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Untuk fitur jawab
  const [editingId, setEditingId] = useState(null);
  const [answerText, setAnswerText] = useState("");

  // Filter berdasarkan nama/email dan tanggal
  const filteredData = formKontak.filter((item) => {
    const nama = item.user.nama.toLowerCase();
    const email = item.user.email.toLowerCase();
    const tanggal = item.tanggal;
    const term = searchTerm.toLowerCase();

    const matchesText = nama.includes(term) || email.includes(term);
    const matchesDate = searchDate === "" || tanggal === searchDate;

    return matchesText && matchesDate;
  });

  // Pagination data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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

  // Handler simpan jawaban admin
  const handleAnswerSubmit = (id) => {
    const updatedData = formKontak.map((item) =>
      item.id === id ? { ...item, jawabanAdmin: answerText } : item
    );
    setFormKontak(updatedData);
    setEditingId(null);
    setAnswerText("");
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col w-full">
      <PageHeader
        title="Form Kontak"
        breadcrumb={["Dashboard", "Form Kontak"]}
      />

      <div className="p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Daftar Form Kontak</h2>

        {/* Filter */}
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-1/2"
          />
          <input
            type="date"
            value={searchDate}
            onChange={(e) => {
              setSearchDate(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-1/4"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Avatar
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Nama
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Tujuan
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Pesan
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Tanggal
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Jawaban Admin
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 align-top">
                  <td className="px-4 py-2">
                    <img
                      src={item.user.avatar}
                      alt={item.user.nama}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-800">
                    <Link
                      to={`/contactUs/${item.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {item.user.nama}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-gray-600">{item.user.email}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {item.kontak.tujuan}
                  </td>
                  <td className="px-4 py-2 text-gray-600 max-w-xs break-words">
                    {item.kontak.pesan}
                  </td>
                  <td className="px-4 py-2 text-gray-600">{item.tanggal}</td>
                  <td className="px-4 py-2">
                    {editingId === item.id ? (
                      <div className="flex flex-col">
                        <textarea
                          className="border p-1 rounded text-sm"
                          value={answerText}
                          onChange={(e) => setAnswerText(e.target.value)}
                          rows={2}
                        />
                        <button
                          onClick={() => handleAnswerSubmit(item.id)}
                          className="mt-1 bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                        >
                          Simpan
                        </button>
                      </div>
                    ) : item.jawabanAdmin ? (
                      <span>{item.jawabanAdmin}</span>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(item.id);
                          setAnswerText(item.jawabanAdmin || "");
                        }}
                        className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600 cursor-pointer"
                      >
                        Jawab
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-4">
                    Tidak ada data form kontak ditemukan.
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
          onPrev={prevPage}
          onNext={nextPage}
        />
      </div>
    </div>
  );
}
