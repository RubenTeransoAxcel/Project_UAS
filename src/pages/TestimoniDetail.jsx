import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../assets/testimoni.json";
import { MdArrowBack } from "react-icons/md";

export default function TestimoniDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = data.find((d) => d.id.toString() === id);

  if (!item) {
    return (
      <div className="p-6">
        <p className="text-red-600">Testimoni tidak ditemukan.</p>
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
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
      >
        <MdArrowBack className="mr-2 text-lg" /> Kembali
      </button>

      <div className="flex flex-col md:flex-row bg-white rounded-4xl shadow-md overflow-hidden border border-gray-200">
        {/* Avatar */}
        <div className="md:w-1/3 w-full h-64 md:h-auto bg-gray-100">
          <img
            src={item.avatar}
            alt={item.name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Detail */}
        <div className="p-6 flex flex-col justify-center md:w-2/3 space-y-2 text-gray-700 text-sm">
          <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
          <div className="text-yellow-500 text-base">
            {"⭐".repeat(item.rating)}{" "}
            <span className="text-gray-400 text-xs">
              ({item.rating}/5)
            </span>
          </div>
          <p className="mt-2 italic text-gray-600">"{item.review}"</p>
        </div>
      </div>
    </div>
  );
}
