// src/pages/KaryawanDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../assets/karyawan.json";
import { MdArrowBack } from "react-icons/md";

export default function KaryawanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const employee = data.find((emp) => emp["Karyawan ID"].toString() === id);

  if (!employee) {
    return (
      <div className="p-6">
        <p className="text-red-600">Karyawan tidak ditemukan.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-500 underline cursor-pointer"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      {/* Tombol kembali */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
      >
        <MdArrowBack className="mr-2 text-lg" /> Kembali
      </button>

      {/* Card layout */}
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        {/* Foto profil */}
        <div className="md:w-1/3 w-full flex justify-center items-center bg-gray-50 p-4">
          <img
            src={employee.Foto}
            alt={employee.Name}
            className="w-32 h-32 rounded-full object-cover border"
          />
        </div>

        {/* Detail karyawan */}
        <div className="p-6 md:w-2/3 flex flex-col justify-between space-y-4 text-sm text-gray-700">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {employee.Name}
            </h2>
            <p className="text-gray-500 mb-4">{employee.Jabatan}</p>

            <ul className="space-y-1">
              <li><b>Karyawan ID:</b> {employee["Karyawan ID"]}</li>
              <li><b>Email:</b> {employee.Email}</li>
              <li><b>Phone:</b> {employee.Phone}</li>
              <li><b>Alamat:</b> {employee.Alamat}</li>
              <li><b>Tanggal Masuk:</b> {employee["Tanggal Masuk"]}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
