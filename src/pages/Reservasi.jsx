import React, { useState } from "react";
import data from "../assets/reservasi.json";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

const itemsPerPage = 10;

export default function ReservationTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Reservasi" breadcrumb={["Dashboard", "Reservasi"]} />

      <div className="p-6 bg-white rounded-xl shadow-md overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Daftar Reservasi</h2>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                ID Reservasi
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Nama Customer
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Barber
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Tanggal
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Jam
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Layanan
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Total Harga
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentItems.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2">{item["Reservasi ID"]}</td>
                <td className="px-4 py-2">
                  <Link
                    to={`/reservasi/${item["Reservasi ID"]}`}
                    className="text-blue-600 hover:underline"
                  >
                    {item["Customer Name"]}
                  </Link>
                </td>
                <td className="px-4 py-2">{item["Barber"]}</td>
                <td className="px-4 py-2">{item["Tanggal"]}</td>
                <td className="px-4 py-2">{item["Jam"]}</td>
                <td className="px-4 py-2">{item["Jenis Layanan"]}</td>
                <td className="px-4 py-2">
                  Rp {item["Total Harga"].toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
