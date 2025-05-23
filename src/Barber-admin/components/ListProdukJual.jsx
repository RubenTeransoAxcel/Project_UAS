import DataProduk from "../assets/produk.json";
import { useState } from "react";
import { FaTag, FaWeight, FaBoxOpen, FaMoneyBillWave, FaSwatchbook, FaCartPlus } from "react-icons/fa";
import { MdCategory, MdClose } from "react-icons/md";
import { GiHairStrands } from "react-icons/gi";

export default function ProductList2() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedCategory: "",
    selectedBrand: ""
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleChange = (evt) => {
    const { title, value } = evt.target;
    setDataForm({
      ...dataForm,
      [title]: value,
    });
  };

  const _searchTerm = dataForm.searchTerm.toLowerCase();

  const filterProduct = DataProduk.filter((produk) => {
    const matchesSearch =
      produk.name.toLowerCase().includes(_searchTerm) ||
      produk.category.toLowerCase().includes(_searchTerm);

    const matchesCategory = dataForm.selectedCategory
      ? produk.category === dataForm.selectedCategory
      : true;

    const matchesBrand = dataForm.selectedBrand
      ? produk.manufacturer.name === dataForm.selectedBrand
      : true;

    return matchesSearch && matchesCategory && matchesBrand;
  });

  const allCategories = [...new Set(DataProduk.map((item) => item.category))];
  const allBrands = [...new Set(DataProduk.map((item) => item.manufacturer.name))];

  return (
    <div className="min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 flex justify-center items-center gap-2">
        {/* <GiHairStrands className="text-green-600" /> Produk Barbershop */}
        Produk Barbershop 
      </h1>


      {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          title="searchTerm"
          placeholder="🔍 Cari produk..."
          className="p-2 border border-gray-300 rounded-lg shadow w-full"
          value={dataForm.searchTerm}
          onChange={handleChange}
        />
        <select
          title="selectedCategory"
          className="p-2 border border-gray-300 rounded-lg shadow w-full"
          value={dataForm.selectedCategory}
          onChange={handleChange}
        >
          <option value="">📂 Semua Kategori</option>
          {allCategories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          title="selectedBrand"
          className="p-2 border border-gray-300 rounded-lg shadow w-full"
          value={dataForm.selectedBrand}
          onChange={handleChange}
        >
          <option value="">🏷️ Semua Brand</option>
          {allBrands.map((brand, idx) => (
            <option key={idx} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div> */}

   
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterProduct.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedProduct(item)}
            className="cursor-pointer bg-white rounded-xl p-4 shadow-md hover:shadow-xl shadow-emerald-400 hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <MdCategory /> {item.category}
            </p>
            <p className="text-sm text-gray-700">
                <span className="font-semibold">
                <FaCartPlus className="inline mr-2"/>{item.stock}</span>
            </p>

            <p className="text-sm text-green-600 font-semibold flex items-center gap-2">
              <FaMoneyBillWave /> Rp{item.price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>


      {selectedProduct && (
        <div className="fixed inset-0 bg-gradient-to-b from-0% to-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full relative shadow-2xl">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-600"
            >
              <MdClose />
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-52 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
            <p className="text-gray-600 mb-2">{selectedProduct.details.description}</p>

            <div className="text-sm text-gray-700 space-y-1">
              <p><FaBoxOpen className="inline mr-2" /> <b>Brand:</b> {selectedProduct.manufacturer.name}</p>
              <p><MdCategory className="inline mr-2" /> <b>Kategori:</b> {selectedProduct.category}</p>
              <p><FaWeight className="inline mr-2" /> <b>Berat:</b> {selectedProduct.shipping.weight}</p>
              <p><FaCartPlus className="inline mr-2"/><b>Stok tersedia:</b> {selectedProduct.stock}</p>
              <p><FaMoneyBillWave className="inline mr-2" /> <b>Harga:</b> Rp{selectedProduct.price.toLocaleString()}</p>
              <p><b>Cara Pakai:</b> {selectedProduct.details.usage}</p>
              <p><b>Ingredients:</b> {selectedProduct.details.ingredients.join(", ")}</p>
            </div>

            <button
              onClick={() => alert("Ditambahkan ke keranjang!")}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              🛒 Beli Sekarang
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
