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
        <p className="text-red-500">Karyawan tidak ditemukan.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-500 underline">
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
      >
        <MdArrowBack className="mr-2" /> Kembali
      </button>

      <div className="flex gap-4 items-center mb-6">
        <img
          src={employee.Foto}
          alt={employee.Name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{employee.Name}</h2>
          <p className="text-gray-500">{employee.Jabatan}</p>
        </div>
      </div>

      <div className="text-gray-700 space-y-2 text-sm">
        <p><b>Karyawan ID:</b> {employee["Karyawan ID"]}</p>
        <p><b>Email:</b> {employee.Email}</p>
        <p><b>Phone:</b> {employee.Phone}</p>
        <p><b>Alamat:</b> {employee.Alamat}</p>
        <p><b>Tanggal Masuk:</b> {employee["Tanggal Masuk"]}</p>
      </div>
    </div>
  );
}
