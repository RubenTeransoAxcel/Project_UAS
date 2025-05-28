// src/pages/ProdukDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../assets/produk.json";
import { MdArrowBack } from "react-icons/md";

export default function ProdukDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = data.find((item) => item.id.toString() === id);

  if (!product) {
    return (
      <div className="p-6">
        <p className="text-red-600">Produk tidak ditemukan.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-500 underline cursor-pointer">
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
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">{product.details?.description}</p>
      <ul className="text-sm text-gray-600 space-y-1">
        <li><b>Kategori:</b> {product.category}</li>
        <li><b>Brand:</b> {product.manufacturer?.name}</li>
        <li><b>Stok:</b> {product.stock}</li>
        <li><b>Harga:</b> Rp{product.price.toLocaleString()}</li>
        <li><b>Cara Pakai:</b> {product.details?.usage}</li>
        <li><b>Ingredients:</b> {product.details?.ingredients?.join(", ")}</li>
      </ul>
    </div>
  );
}
