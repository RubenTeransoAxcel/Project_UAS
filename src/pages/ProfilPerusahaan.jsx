import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ProfilPerusahaan from "../assets/profilPerusahaan.json";

export default function CompanyProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("profilPerusahaan");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      // Jika localStorage kosong, pakai data default dari JSON import
      setProfile(ProfilPerusahaan);
      // Simpan juga ke localStorage agar konsisten
      localStorage.setItem("profilPerusahaan", JSON.stringify(ProfilPerusahaan));
    }
  }, []);

  const hasProfile = profile && Object.keys(profile).length > 0;

  const handleDelete = () => {
    if (window.confirm("Yakin ingin menghapus profil perusahaan?")) {
      localStorage.removeItem("profilPerusahaan");
      setProfile(null);
      alert("Profil perusahaan telah dihapus.");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <PageHeader
        title="Profil Perusahaan"
        breadcrumb={["Dashboard", "Profil Perusahaan"]}
      />
      <div className="p-6 bg-white rounded-xl shadow-md overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Data Profil Perusahaan</h2>
          {!hasProfile && (
            <Link
              to="/profil/tambah"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Tambah Profil
            </Link>
          )}
        </div>

        {!hasProfile ? (
          <p className="text-center text-gray-500">
            Belum ada data profil perusahaan.
          </p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-sm text-left text-gray-700">Nama</th>
                <th className="px-4 py-2 text-sm text-left text-gray-700">Alamat</th>
                <th className="px-4 py-2 text-sm text-left text-gray-700">Telepon</th>
                <th className="px-4 py-2 text-sm text-left text-gray-700">Email</th>
                <th className="px-4 py-2 text-sm text-left text-gray-700">Jam Operasional</th>
                <th className="px-4 py-2 text-sm text-left text-gray-700">Deskripsi</th>
                <th className="px-4 py-2 text-sm text-left text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2">{profile.namaPerusahaan}</td>
                <td className="px-4 py-2">{profile.alamat}</td>
                <td className="px-4 py-2">{profile.telepon}</td>
                <td className="px-4 py-2">{profile.email}</td>
                <td className="px-4 py-2">
                  <div>Senin-Jumat: {profile.jamOperasional["senin-jumat"]}</div>
                  <div>Sabtu-Minggu: {profile.jamOperasional["sabtu-minggu"]}</div>
                </td>
                <td className="px-4 py-2">{profile.Deskripsi}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    to={`/profil/edit/${profile.id ?? 1}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
