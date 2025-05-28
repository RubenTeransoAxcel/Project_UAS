import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { FaShoppingCart, FaCalendarCheck, FaMoneyBill } from "react-icons/fa";
import axios from "axios";

export default function Dashboard() {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      axios
        .get("https://api.adviceslip.com/advice")
        .then((res) => {
          if (res.status === 200) {
            setQuote(res.data.slip.advice);
          } else {
            setError("Gagal mengambil quote.");
          }
        })
        .catch((err) => {
          setError(err.message || "Terjadi kesalahan.");
        });
    }, 300); // 300ms debounce

    return () => clearTimeout(timeout); // cleanup
  }, []); // Kosong karena hanya dijalankan sekali saat mount

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Home" breadcrumb={["Dashboard", "Home"]} />

      {/* Quote Section */}
      <div className="bg-white p-5 mt-4 rounded-lg shadow text-center">
        <h2 className="text-lg font-semibold text-emerald-600">Quote of the Day</h2>
        {quote ? (
          <p className="mt-2 text-gray-700 italic text-md">"{quote}"</p>
        ) : error ? (
          <p className="mt-2 text-red-500 text-sm">{error}</p>
        ) : (
          <p className="mt-2 text-gray-400 text-sm">Loading quote...</p>
        )}
      </div>

      {/* Statistik Section */}
      <div className="flex flex-wrap gap-4 mt-6">
        <div className="flex-1 min-w-[220px] bg-white p-5 rounded-lg shadow flex items-center space-x-4">
          <div className="bg-green-500 p-3 rounded-full text-white text-xl">
            <FaShoppingCart />
          </div>
          <div>
            <div className="text-2xl font-bold">20</div>
            <div className="text-gray-500 text-sm">Produk Terjual</div>
          </div>
        </div>

        <div className="flex-1 min-w-[220px] bg-white p-5 rounded-lg shadow flex items-center space-x-4">
          <div className="bg-green-600 p-3 rounded-full text-white text-xl">
            <FaCalendarCheck />
          </div>
          <div>
            <div className="text-2xl font-bold">8</div>
            <div className="text-gray-500 text-sm">Total Reservasi</div>
          </div>
        </div>

        <div className="flex-1 min-w-[220px] bg-white p-5 rounded-lg shadow flex items-center space-x-4">
          <div className="bg-yellow-400 p-3 rounded-full text-white text-xl">
            <FaMoneyBill />
          </div>
          <div>
            <div className="text-2xl font-bold">Rp 150.000</div>
            <div className="text-gray-500 text-sm">Total Pemasukan</div>
          </div>
        </div>
      </div>
    </div>
  );
}
