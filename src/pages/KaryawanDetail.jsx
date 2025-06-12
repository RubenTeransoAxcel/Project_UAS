import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { karyawanAPI } from "../services/karyawanAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertBox from "../components/AlertBox";
import dayjs from "dayjs";

export default function KaryawanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await karyawanAPI.fetchKaryawan();
      const found = res.find((item) => item.id.toString() === id);
      if (!found) {
        setError("Karyawan tidak ditemukan.");
      } else {
        setData(found);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  if (loading) return <LoadingSpinner text="Memuat data karyawan..." />;
  if (error) return <AlertBox type="error">{error}</AlertBox>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      {/* Tombol kembali */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer mb-4"
      >
        <MdArrowBack className="mr-2 text-lg" /> Kembali
      </button>

      {/* Card style layout */}
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Gambar karyawan */}
        <div className="md:w-1/3 w-full flex justify-center items-center bg-gray-100 p-6">
          <img
            src={data.foto}
            alt={data.name}
            className="w-32 h-32 rounded-full object-cover border"
          />
        </div>

        {/* Detail karyawan */}
        <div className="p-6 md:w-2/3 space-y-3 text-sm text-gray-700">
          <div>
            <h2 className="text-2xl font-bold mb-1 text-gray-800">{data.name}</h2>
            <p className="text-gray-500 mb-4 italic">{data.jabatan}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              <div>
                <span className="text-gray-500">Email:</span>
                <div className="font-medium">{data.email}</div>
              </div>
              <div>
                <span className="text-gray-500">Phone:</span>
                <div className="font-medium">{data.phone}</div>
              </div>
              <div>
                <span className="text-gray-500">Alamat:</span>
                <div className="font-medium">{data.alamat}</div>
              </div>
              <div>
                <span className="text-gray-500">Tanggal Masuk:</span>
                <div className="font-medium">
                  {dayjs(data.tanggal_masuk).isValid()
                    ? dayjs(data.tanggal_masuk).format("DD MMMM YYYY")
                    : "-"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
