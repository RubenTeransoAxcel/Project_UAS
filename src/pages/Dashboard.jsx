import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import {
  FaShoppingCart,
  FaCalendarCheck,
  FaMoneyBill,
} from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import {
  BarChart, Bar, PieChart, Pie, LineChart, Line,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import { produkAPI } from "../services/produkAPI";
import { karyawanAPI } from "../services/karyawanAPI";
import reservasiData from "../assets/reservasi.json";

export default function Dashboard() {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);
  const [produkStats, setProdukStats] = useState([]);
  const [reservasiStats, setReservasiStats] = useState([]);
  const [pemasukanStats, setPemasukanStats] = useState([]);
  const [produkTerjual, setProdukTerjual] = useState(0);
  const [totalReservasi, setTotalReservasi] = useState(0);
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalKaryawan, setTotalKaryawan] = useState(0);

  useEffect(() => {
    // Ambil data produk & hitung stok per kategori
    produkAPI.fetchProduk().then((produk) => {
      const kategoriGroup = {};
      let totalProduk = 0;

      produk.forEach(p => {
        const stok = parseInt(p.stock || 0);
        kategoriGroup[p.kategori] = (kategoriGroup[p.kategori] || 0) + stok;
        totalProduk += stok;
      });

      const formatted = Object.entries(kategoriGroup).map(([kategori, total]) => ({ kategori, total }));
      setProdukStats(formatted);
      setProdukTerjual(totalProduk);
    });

    // Hitung jumlah reservasi & pemasukan dari file lokal
    const byDate = {};
    const pemasukanByDate = {};
    let totalRes = 0;
    let totalIncome = 0;

    reservasiData.forEach(r => {
      const tgl = r.Tanggal;
      const harga = r["Total Harga"] || 0;
      byDate[tgl] = (byDate[tgl] || 0) + 1;
      pemasukanByDate[tgl] = (pemasukanByDate[tgl] || 0) + harga;
      totalRes += 1;
      totalIncome += harga;
    });

    setReservasiStats(Object.entries(byDate).map(([tgl, jumlah]) => ({ tgl, jumlah })));
    setPemasukanStats(Object.entries(pemasukanByDate).map(([tgl, jumlah]) => ({ tgl, jumlah })));
    setTotalReservasi(totalRes);
    setTotalPemasukan(totalIncome);

    // Ambil data karyawan
    karyawanAPI.fetchKaryawan().then(data => {
      setTotalKaryawan(data.length);
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch("https://api.adviceslip.com/advice")
        .then((res) => res.json())
        .then((data) => setQuote(data.slip.advice))
        .catch(() => setError("Gagal mengambil quote."));
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Home" breadcrumb={["Dashboard", "Home"]} />
      <br />

      {/* Quote */}
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

      {/* Statistik */}
      <div className="flex flex-wrap gap-4 mt-6">
        <StatCard icon={<FaShoppingCart />} color="bg-red-500" value={produkTerjual} label="Total Produk" />
        <StatCard icon={<FaCalendarCheck />} color="bg-blue-600" value={totalReservasi} label="Total Reservasi" />
        <StatCard icon={<FaMoneyBill />} color="bg-yellow-500" value={`Rp ${totalPemasukan.toLocaleString("id-ID")}`} label="Total Pemasukan" />
        <StatCard icon={<IoIosPeople />} color="bg-black" value={`${totalKaryawan} Orang`} label="Total Karyawan" />
      </div>

      {/* Grafik */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <ChartCard title="Stok Produk per Kategori">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={produkStats}>
              <XAxis dataKey="kategori" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Komposisi Produk (Pie Chart)">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={produkStats} dataKey="total" nameKey="kategori" cx="50%" cy="50%" outerRadius={80}>
                {produkStats.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={["#f87171", "#60a5fa", "#34d399", "#fbbf24"][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Jumlah Reservasi per Tanggal">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={reservasiStats}>
              <XAxis dataKey="tgl" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="jumlah" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Total Pemasukan Harian">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pemasukanStats}>
              <XAxis dataKey="tgl" />
              <YAxis />
              <Tooltip formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`} />
              <Legend />
              <Bar dataKey="jumlah" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

// Komponen kecil
const StatCard = ({ icon, color, value, label }) => (
  <div className="flex-1 min-w-[220px] bg-white p-5 rounded-lg shadow flex items-center space-x-4">
    <div className={`${color} p-3 rounded-full text-white text-xl`}>
      {icon}
    </div>
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-gray-500 text-sm">{label}</div>
    </div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="font-semibold text-lg mb-4">{title}</h3>
    {children}
  </div>
);
