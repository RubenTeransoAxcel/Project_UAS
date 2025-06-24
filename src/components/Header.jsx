import { SlSettings } from "react-icons/sl";
import React, { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo_no_bg.png";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Ambil user dari localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full px-6 py-3 flex justify-end">

      {/* Ikon kanan */}
      <div className="flex items-center space-x-4 relative">
        {/* Notifikasi */}
        <div
          className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer hover:shadow-xl shadow-biru hover:-translate-y-1 transition-all duration-300"
        >
          <FaBell />
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full px-2 py-1 text-xs">
            50
          </span>
        </div>

        {/* Settings */}
        <div
          className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer hover:shadow-xl shadow-biru hover:-translate-y-1 transition-all duration-300"
        >
          <SlSettings />
        </div>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-white py-2 px-2 rounded-2xl shadow hover:shadow-xl shadow-biru hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <img
              src={user?.image || "https://i.pravatar.cc/40"}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-800 font-medium">
              {user?.firstName || "Guest"}
            </span>
            <MdKeyboardArrowDown className="text-gray-600" />
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
              <Link
                to={`/users/${user?.id}`}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Lihat Profil
              </Link>
              <Link
                to="https://vamosbarber.vercel.app/"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Guest Page
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("accessToken");
                  navigate("/");
                }}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
