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
        <MdArrowBack className="mr-2 text-lg " /> Kembali
      </button>

      {/* Card style layout */}
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        {/* Gambar produk */}
        <div className="md:w-1/3 w-full max-h-72 md:max-h-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Isi detail produk */}
        <div className="p-6 flex flex-col justify-between md:w-2/3 space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.details?.description}</p>

            <ul className="text-sm text-gray-700 space-y-1">
              <li><b>Kategori:</b> {product.category}</li>
              <li><b>Brand:</b> {product.manufacturer?.name || "-"}</li>
              <li><b>Stok:</b> {product.stock}</li>
              <li><b>Harga:</b> Rp{product.price.toLocaleString()}</li>
              <li><b>Cara Pakai:</b> {product.details?.usage}</li>
              <li>
                <b>Ingredients:</b>{" "}
                {product.details?.ingredients?.join(", ") || "-"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
