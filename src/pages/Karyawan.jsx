import React, { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import PageHeader2 from "../components/PageHeader";
import initialData from "../assets/karyawan.json";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

const itemsPerPage = 10;

export default function CustomerPage() {
  const [employees, setEmployees] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirmed = window.confirm("Hapus data karyawan?");
    if (confirmed) {
      setEmployees(employees.filter((emp) => emp["Karyawan ID"] !== id));
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = employees.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div id="dashboard-container">
      <PageHeader2
        title="Karyawan Barber"
        breadcrumb={["Dashboard", "Karyawan"]}
      >
        <button
          className="bg-hijau text-white px-4 py-2 rounded-lg flex items-center cursor-pointer"
          onClick={() => navigate("/karyawan/tambah")}
        >
          <IoMdAdd className="mr-2 text-sm" />
          Tambah Karyawan
        </button>
      </PageHeader2>

      {/* Table */}
      <div className="mt-6 overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Foto</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Alamat</th>
              <th className="px-4 py-2">Jabatan</th>
              <th className="px-4 py-2">Tanggal Masuk</th>
              <th className="px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentItems.map((emp) => (
              <tr key={emp["Karyawan ID"]} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={emp.Foto}
                    alt={emp.Name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-2">
                  <Link
                    to={`/karyawan/${emp["Karyawan ID"]}`}
                    className="text-blue-600 hover:underline"
                  >
                    {emp.Name}
                  </Link>
                </td>
                <td className="px-4 py-2">{emp.Email}</td>
                <td className="px-4 py-2">{emp.Phone}</td>
                <td className="px-4 py-2">{emp.Alamat}</td>
                <td className="px-4 py-2">{emp.Jabatan}</td>
                <td className="px-4 py-2">{emp["Tanggal Masuk"]}</td>
                <td className="px-4 py-2 text-center flex gap-2 justify-center">
                  <button
                    className="text-orange-500 hover:text-orange-700 cursor-pointer"
                    title="Edit"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(emp["Karyawan ID"])}
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
