import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../assets/contactUs.json";
import { MdArrowBack } from "react-icons/md";

export default function FormKontakDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const kontak = data.find((item) => item.id.toString() === id);

  if (!kontak) {
    return (
      <div className="p-6">
        <p className="text-red-600">Data kontak tidak ditemukan.</p>
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
        {/* Avatar */}
        <div className="md:w-1/3 w-full flex justify-center items-center bg-gray-50 p-4">
          <img
            src={kontak.user.avatar}
            alt={kontak.user.nama}
            className="w-32 h-32 rounded-full object-cover border"
          />
        </div>

        {/* Detail Kontak */}
        <div className="p-6 md:w-2/3 flex flex-col justify-between space-y-4 text-sm text-gray-700">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {kontak.user.nama}
            </h2>
            <p className="text-gray-500 mb-4">{kontak.user.email}</p>

            <ul className="space-y-1">
              <li><b>ID:</b> {kontak.id}</li>
              <li><b>Tujuan:</b> {kontak.kontak.tujuan}</li>
              <li><b>Pesan:</b> {kontak.kontak.pesan}</li>
              <li><b>Tanggal:</b> {kontak.tanggal}</li>
            </ul>

            {kontak.jawabanAdmin && (
              <div className="mt-4 bg-blue-50 border border-blue-200 p-3 rounded-md">
                <b>Jawaban Admin:</b>
                <p className="mt-1">{kontak.jawabanAdmin}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
