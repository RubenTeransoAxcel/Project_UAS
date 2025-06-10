import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import data from "../assets/contactUs.json";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

export default function FormKontakTable() {
  const [formKontak, setFormKontak] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editingId, setEditingId] = useState(null);
  const [answerText, setAnswerText] = useState("");

  const filteredData = formKontak.filter((item) => {
    const nama = item.user.nama.toLowerCase();
    const email = item.user.email.toLowerCase();
    const tanggal = item.tanggal;
    const term = searchTerm.toLowerCase();
    const matchesText = nama.includes(term) || email.includes(term);
    const matchesDate = searchDate === "" || tanggal === searchDate;
    return matchesText && matchesDate;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleAnswerSubmit = (id) => {
    const updatedData = formKontak.map((item) =>
      item.id === id ? { ...item, jawabanAdmin: answerText } : item
    );
    setFormKontak(updatedData);
    setEditingId(null);
    setAnswerText("");
  };

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Form Kontak" breadcrumb={["Dashboard", "Form Kontak"]} />

      <div className="p-6 bg-white rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Daftar Form Kontak</h2>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Cari nama/email..."
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

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white border-b border-gray-200 text-gray-600 font-medium">
              <tr>
                <th className="px-4 py-3">Avatar</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Tujuan</th>
                <th className="px-4 py-3">Pesan</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Jawaban Admin</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={`transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 align-top`}
                >
                  <td className="px-4 py-2">
                    <img
                      src={item.user.avatar}
                      alt={item.user.nama}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-800">
                    <b><Link to={`/contactUs/${item.id}`} className="text-coklat hover:underline hover:text-coklat2">
                      {item.user.nama}
                    </Link></b>
                  </td>
                  <td className="px-4 py-2 text-gray-600">{item.user.email}</td>
                  <td className="px-4 py-2 text-gray-600">{item.kontak.tujuan}</td>
                  <td className="px-4 py-2 text-gray-600 max-w-xs break-words">{item.kontak.pesan}</td>
                  <td className="px-4 py-2 text-gray-600">{item.tanggal}</td>
                  <td className="px-4 py-2">
                    {editingId === item.id ? (
                      <div className="flex flex-col gap-1">
                        <textarea
                          className="border p-1 rounded text-sm"
                          value={answerText}
                          onChange={(e) => setAnswerText(e.target.value)}
                          rows={2}
                        />
                        <button
                          onClick={() => handleAnswerSubmit(item.id)}
                          className="bg-blue-600 text-white px-3 py-1 text-xs rounded hover:bg-blue-700"
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
                        className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600"
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
                    Tidak ada data ditemukan.
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
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onPageSizeChange={setItemsPerPage}
        />
      </div>
    </div>
  );
}
