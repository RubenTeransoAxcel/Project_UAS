import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../assets/produk.json";
import fs from "fs";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct((prev) => ({ ...prev, image: files[0] }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = () => {
      const newProduct = {
        ...product,
        id: Date.now(),
        image: reader.result,
      };
      const updatedData = [...data, newProduct];
      // Simpan ke JSON: menggunakan backend atau file system write
      // Simulasi lokal:
      console.log("Produk baru:", newProduct);
      navigate("/produk");
    };
    if (product.image) reader.readAsDataURL(product.image);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tambah Produk</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          required
          placeholder="Nama Produk"
          onChange={handleChange}
          className="input"
        />
        <input
          name="price"
          type="number"
          required
          placeholder="Harga"
          onChange={handleChange}
          className="input"
        />
        <input
          name="stock"
          type="number"
          required
          placeholder="Stok"
          onChange={handleChange}
          className="input"
        />
        <input
          name="category"
          type="text"
          required
          placeholder="Kategori"
          onChange={handleChange}
          className="input"
        />
        <input
          name="image"
          type="file"
          accept=".png"
          required
          onChange={handleChange}
          className="input"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Simpan
        </button>
        <button
          type="button"
          onClick={() => navigate("/produk")}
          className="ml-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Batal
        </button>
      </form>
    </div>
  );
}
