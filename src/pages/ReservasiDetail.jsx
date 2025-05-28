import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../assets/reservasi.json";
import { MdArrowBack } from "react-icons/md";

export default function ReservasiDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const reservasi = data.find((item) => item["Reservasi ID"].toString() === id);

  if (!reservasi) {
    return (
      <div className="p-6">
        <p className="text-red-500">Reservasi tidak ditemukan.</p>
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

      <h2 className="text-2xl font-bold mb-4">Detail Reservasi</h2>
      <div className="text-gray-700 space-y-2 text-sm">
        <p><b>ID Reservasi:</b> {reservasi["Reservasi ID"]}</p>
        <p><b>Nama Customer:</b> {reservasi["Customer Name"]}</p>
        <p><b>Barber:</b> {reservasi["Barber"]}</p>
        <p><b>Tanggal:</b> {reservasi["Tanggal"]}</p>
        <p><b>Jam:</b> {reservasi["Jam"]}</p>
        <p><b>Jenis Layanan:</b> {reservasi["Jenis Layanan"]}</p>
        <p><b>Total Harga:</b> Rp {reservasi["Total Harga"].toLocaleString()}</p>
      </div>
    </div>
  );
}
