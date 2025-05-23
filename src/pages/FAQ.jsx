import React, { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import PageHeader2 from "../components/PageHeader";
import initialFaqs from "../assets/faq.json";
import Pagination from "../components/Pagination";

export default function CustomerPage() {
  const itemsPerPage = 10;
  const [faqs, setFaqs] = useState(initialFaqs);
  const [editingId, setEditingId] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(faqs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFaqs = faqs.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id) => {
    const confirmed = window.confirm("Yakin ingin menghapus data ini?");
    if (confirmed) {
      const updated = faqs.filter((faq) => faq.ID !== id);
      setFaqs(updated);
    }
  };

  const handleAnswerSubmit = (id) => {
    const updatedFaqs = faqs.map((faq) =>
      faq.ID === id ? { ...faq, Answer: answerText } : faq
    );
    setFaqs(updatedFaqs);
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
    <div id="dashboard-container">
      <PageHeader2
        title="FAQ Customer"
        breadcrumb={["Dashboard", "Customer Questions"]}
      />

      <div className="mt-6 overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Customer</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Pertanyaan</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Jawaban</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Tanggal</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Jam</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Feedback</th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentFaqs.map((faq) => (
              <tr key={faq.ID} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{faq.ID}</td>
                <td className="px-4 py-2 text-sm">{faq["Customer Name"]}</td>
                <td className="px-4 py-2 text-sm">{faq.Question}</td>
                <td className="px-4 py-2 text-sm">
                  {editingId === faq.ID ? (
                    <div className="flex flex-col">
                      <textarea
                        className="border p-1 rounded text-sm"
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        rows={2}
                      />
                      <button
                        onClick={() => handleAnswerSubmit(faq.ID)}
                        className="mt-1 bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                      >
                        Simpan
                      </button>
                    </div>
                  ) : faq.Answer ? (
                    <span>{faq.Answer}</span>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(faq.ID);
                        setAnswerText("");
                      }}
                      className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600 cursor-pointer"
                    >
                      Jawab
                    </button>
                  )}
                </td>
                <td className="px-4 py-2 text-sm">{faq.Tanggal}</td>
                <td className="px-4 py-2 text-sm">{faq.Waktu}</td>
                <td className="px-4 py-2 text-sm">{faq.Feedback}</td>
                <td className="px-4 py-2 text-center text-sm">
                  <button
                    onClick={() => handleDelete(faq.ID)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    title="Hapus"
                  >
                    <MdOutlineDeleteOutline size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Gunakan Pagination Component */}
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
