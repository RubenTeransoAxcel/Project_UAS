import React from "react";
import { FaHome, FaBox, FaClipboardList, FaQuestionCircle } from "react-icons/fa";

export default function Sidebar() {
  const menuClass = "flex items-center gap-3 p-2 rounded-lg hover:bg-[#7a4c43]";

  return (
    <div className="w-64 bg-[#5C332D] text-white flex flex-col justify-between min-h-screen">
      <div>
        <h1 className="text-2xl font-bold p-5">Barbershop</h1>
        <p className="text-gray-300 px-5 mb-5">-Admin-</p>
        <nav className="space-y-2 px-5">
          <a href="/dashboard.html" className={menuClass}>
            <FaHome /> Home
          </a>
          <a href="/listproduk.html" className={menuClass}>
            <FaBox /> Produk
          </a>
          <a href="/reservasi.html" className={menuClass}>
            <FaClipboardList /> Reservasi
          </a>
          <a href="/faq.html" className={menuClass}>
            <FaQuestionCircle /> FAQ
          </a>
        </nav>
      </div>
      <div className="p-5 text-xs text-gray-300 border-t border-gray-400/50">
        <p>Barbershop Admin Home</p>
        <p className="mt-1">© Made by Ruben Teranso Axcel</p>
      </div>
    </div>
  );
}
