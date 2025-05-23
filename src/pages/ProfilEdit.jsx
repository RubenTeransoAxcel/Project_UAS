import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProfilEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: null,
    namaPerusahaan: "",
    alamat: "",
    telepon: "",
    email: "",
    jamOperasional: {
      "senin-jumat": "",
      "sabtu-minggu": "",
    },
    Deskripsi: "",
  });

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profilPerusahaan"));

    if (savedProfile && (!id || Number(id) === savedProfile.id)) {
      setForm(savedProfile);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "senin-jumat" || name === "sabtu-minggu") {
      setForm((prev) => ({
        ...prev,
        jamOperasional: {
          ...prev.jamOperasional,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      namaPerusahaan,
      alamat,
      telepon,
      email,
      jamOperasional,
      Deskripsi,
    } = form;

    if (
      !namaPerusahaan ||
      !alamat ||
      !telepon ||
      !email ||
      !jamOperasional["senin-jumat"] ||
      !jamOperasional["sabtu-minggu"] ||
      !Deskripsi
    ) {
      alert("Semua field harus diisi!");
      return;
    }

    // Simpan perubahan
    localStorage.setItem("profilPerusahaan", JSON.stringify(form));
    alert("Profil perusahaan berhasil diperbarui!");
    navigate("/profil");
  };

  const handleCancel = () => {
    if (window.confirm("Batal mengedit? Perubahan tidak akan disimpan.")) {
      navigate("/profil");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Profil Perusahaan</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nama Perusahaan</label>
          <input
            type="text"
            name="namaPerusahaan"
            value={form.namaPerusahaan}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Alamat</label>
          <textarea
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Telepon</label>
          <input
            type="text"
            name="telepon"
            value={form.telepon}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Jam Operasional Senin-Jumat</label>
          <input
            type="text"
            name="senin-jumat"
            value={form.jamOperasional["senin-jumat"]}
            onChange={handleChange}
            placeholder="Contoh: 09:00 - 20:00"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Jam Operasional Sabtu-Minggu</label>
          <input
            type="text"
            name="sabtu-minggu"
            value={form.jamOperasional["sabtu-minggu"]}
            onChange={handleChange}
            placeholder="Contoh: 10:00 - 18:00"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Deskripsi</label>
          <textarea
            name="Deskripsi"
            value={form.Deskripsi}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={4}
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Simpan Perubahan
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
