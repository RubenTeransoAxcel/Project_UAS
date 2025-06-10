import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../assets/reservasi.json";
import { MdArrowBack } from "react-icons/md";

export default function ReservasiDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const reservasi = data.find(
    (item) => item["Reservasi ID"].toString() === id
  );

  if (!reservasi) {
    return (
      <div className="p-6">
        <p className="text-red-600">Reservasi tidak ditemukan.</p>
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
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
      >
        <MdArrowBack className="mr-2 text-lg" /> Kembali
      </button>

      <div className="flex flex-col md:flex-row bg-white rounded-4xl shadow-md overflow-hidden border border-gray-200">
        {/* Foto profil full height & width di kiri */}
        <div className="md:w-1/3 w-full h-64 md:h-auto">
          <img
            src={
              reservasi["Foto"] ||
              `https://i.pravatar.cc/600?u=${reservasi["Reservasi ID"]}`
            }
            alt={reservasi["Customer Name"]}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Detail info */}
        <div className="p-6 flex flex-col justify-center md:w-2/3 space-y-2 text-sm text-gray-800">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Detail Reservasi</h2>
          <p><b>ID Reservasi:</b> {reservasi["Reservasi ID"]}</p>
          <p><b>Nama Customer:</b> {reservasi["Customer Name"]}</p>
          <p><b>Barber:</b> {reservasi["Barber"]}</p>
          <p><b>Tanggal:</b> {reservasi["Tanggal"]}</p>
          <p><b>Jam:</b> {reservasi["Jam"]}</p>
          <p><b>Jenis Layanan:</b> {reservasi["Jenis Layanan"]}</p>
          <p><b>Total Harga:</b> Rp {reservasi["Total Harga"].toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
