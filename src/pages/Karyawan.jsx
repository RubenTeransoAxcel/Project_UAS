import React, { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import PageHeader2 from "../components/PageHeader";
import initialData from "../assets/karyawan.json";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

export default function CustomerPage() {
  const [employees, setEmployees] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
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

  return (
    <div className="w-full">
      <PageHeader2 title="Karyawan Barber" breadcrumb={["Dashboard", "Karyawan"]}>
        <button
          className="bg-hijau text-white px-4 py-2 rounded-lg flex items-center cursor-pointer"
          onClick={() => navigate("/karyawan/tambah")}
        >
          <IoMdAdd className="mr-2 text-sm" />
          Tambah Karyawan
        </button>
      </PageHeader2>

      <div className="mt-6 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Daftar Karyawan</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white border-b border-gray-200 text-gray-600 font-medium">
              <tr>
                <th className="px-4 py-3">Foto</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Alamat</th>
                <th className="px-4 py-3">Jabatan</th>
                <th className="px-4 py-3">Tanggal Masuk</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((emp, index) => (
                <tr
                  key={emp["Karyawan ID"]}
                  className={`transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-3">
                    <img
                      src={emp.Foto}
                      alt={emp.Name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    <Link
                      to={`/karyawan/${emp["Karyawan ID"]}`}
                      className="text-coklat hover:underline hover:text-coklat2"
                    >
                      {emp.Name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{emp.Email}</td>
                  <td className="px-4 py-3 text-gray-600">{emp.Phone}</td>
                  <td className="px-4 py-3 text-gray-600">{emp.Alamat}</td>
                  <td className="px-4 py-3 text-gray-600">{emp.Jabatan}</td>
                  <td className="px-4 py-3 text-gray-600">{emp["Tanggal Masuk"]}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="p-1.5 rounded-md hover:bg-gray-100 border"
                        title="Edit"
                      >
                        <FiEdit className="text-orange-500 text-[14px]" />
                      </button>
                      <button
                        onClick={() => handleDelete(emp["Karyawan ID"])}
                        className="p-1.5 rounded-md hover:bg-gray-100 border"
                        title="Hapus"
                      >
                        <MdOutlineDeleteOutline className="text-red-500 text-[16px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center text-gray-500 py-4">
                    Tidak ada data karyawan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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
