import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../assets/produk.json";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // ref untuk input file

  const product = data.find((item) => item.id.toString() === id);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    newImageFile: null,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        stock: product.stock,
        category: product.category,
        image: product.image,
        newImageFile: null,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      setFormData((prev) => ({
        ...prev,
        newImageFile: file,
      }));
    } else {
      alert("Hanya file PNG yang diperbolehkan");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      name: formData.name,
      price: parseInt(formData.price),
      stock: parseInt(formData.stock),
      category: formData.category,
      image: formData.newImageFile
        ? URL.createObjectURL(formData.newImageFile)
        : formData.image,
    };

    console.log("Produk berhasil diupdate:", updatedProduct);

    navigate("/produk");
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // buka file picker
    }
  };

  if (!product) return <div className="p-6">Produk tidak ditemukan</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Produk</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nama Produk</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Harga</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Stok</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Kategori</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Gambar Saat Ini</label>
          <img
            src={formData.image}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-md mb-2"
          />

          {/* Tombol Pilih Gambar */}
          <button
            type="button"
            onClick={handleFileButtonClick}
            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md"
          >
            Pilih Gambar PNG
          </button>

          {/* Input File Tersembunyi */}
          <input
            type="file"
            accept="image/png"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          {/* Preview Gambar Baru */}
          {formData.newImageFile && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Preview Gambar Baru:</p>
              <img
                src={URL.createObjectURL(formData.newImageFile)}
                alt="Baru"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Simpan Perubahan
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
