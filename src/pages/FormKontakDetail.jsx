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
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-500 underline">
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
      >
        <MdArrowBack className="mr-2" /> Kembali
      </button>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={kontak.user.avatar}
          alt={kontak.user.nama}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{kontak.user.nama}</h2>
          <p className="text-gray-500">{kontak.user.email}</p>
        </div>
      </div>

      <div className="text-gray-700 space-y-3 text-sm">
        <p><b>ID:</b> {kontak.id}</p>
        <p><b>Tujuan:</b> {kontak.kontak.tujuan}</p>
        <p><b>Pesan:</b> {kontak.kontak.pesan}</p>
        <p><b>Tanggal:</b> {kontak.tanggal}</p>
        {kontak.jawabanAdmin && (
          <p className="bg-blue-50 border border-blue-200 p-3 rounded-md">
            <b>Jawaban Admin:</b><br />{kontak.jawabanAdmin}
          </p>
        )}
      </div>
    </div>
  );
}
