import React, { useState } from "react";
import data from "../assets/reservasi.json";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

export default function ReservationTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Reservasi" breadcrumb={["Dashboard", "Reservasi"]} />

      <div className="p-6 bg-white rounded-xl shadow-md overflow-hidden">
        <h2 className="text-xl font-bold mb-4">Daftar Reservasi</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white border-b border-gray-200 text-gray-600 font-medium">
              <tr>
                <th className="px-4 py-3">ID Reservasi</th>
                <th className="px-4 py-3">Nama Customer</th>
                <th className="px-4 py-3">Barber</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Jam</th>
                <th className="px-4 py-3">Layanan</th>
                <th className="px-4 py-3">Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr
                  key={item["Reservasi ID"]}
                  className={`transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                >
                  <td className="px-4 py-4 text-gray-800">{item["Reservasi ID"]}</td>
                  <td className="px-4 py-2">
                    <b><Link
                      to={`/reservasi/${item["Reservasi ID"]}`}
                      className="text-coklat hover:underline hover:text-coklat2"
                    >
                      {item["Customer Name"]}
                    </Link></b>
                  </td>
                  <td className="px-4 py-2 text-gray-800">{item["Barber"]}</td>
                  <td className="px-4 py-2 text-gray-800">{item["Tanggal"]}</td>
                  <td className="px-4 py-2 text-gray-800">{item["Jam"]}</td>
                  <td className="px-4 py-2 text-gray-800">{item["Jenis Layanan"]}</td>
                  <td className="px-4 py-2 text-gray-800">Rp {item["Total Harga"].toLocaleString()}</td>
                </tr>
              ))}
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
