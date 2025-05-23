// src/pages/Dashboard.jsx
import React from "react";
import PageHeader from "../components/PageHeader";
import { FaShoppingCart, FaCalendarCheck, FaMoneyBill } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full">
      <PageHeader 
      title="Home" 
      breadcrumb={["Dashboard", "Home"]}/>
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex-1 min-w-[220px] bg-white p-5 rounded-lg shadow flex items-center space-x-4">
          <div className="bg-green-500 p-3 rounded-full text-white text-xl">
            <FaShoppingCart />
          </div>
          <div>
            <div className="text-2xl font-bold">20</div>
            <div className="text-gray-500 text-sm">Produk Terjual</div>
          </div>
        </div>

        <div className="flex-1 min-w-[220px] bg-white p-5 rounded-lg shadow flex items-center space-x-4">
          <div className="bg-green-600 p-3 rounded-full text-white text-xl">
            <FaCalendarCheck />
          </div>
          <div>
            <div className="text-2xl font-bold">8</div>
            <div className="text-gray-500 text-sm">Total Reservasi</div>
          </div>
        </div>

        <div className="flex-1 min-w-[220px] bg-white p-5 rounded-lg shadow flex items-center space-x-4">
          <div className="bg-yellow-400 p-3 rounded-full text-white text-xl">
            <FaMoneyBill />
          </div>
          <div>
            <div className="text-2xl font-bold">Rp 150.000</div>
            <div className="text-gray-500 text-sm">Total Pemasukan</div>
          </div>
        </div>
      </div>
    </div>
  );
}
