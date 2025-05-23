import { SlSettings } from "react-icons/sl";
import React from "react";
import { FaBell } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="w-full px-6 py- flex justify-end items-center gap-6 rounded-3xl">
      {/* Notification Icon with Red Dot */}
      <div id="icons-container" className="flex items-center space-x-4">
        {/* Icons */}
        <div
          id="notification-icon"
          className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer hover:shadow-xl shadow-biru hover:-translate-y-1 transition-all duration-300"
        >
          <FaBell />
          <span
            id="notification-badge"
            className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full px-2 py-1 text-xs"
          >
            50
          </span>
        </div>
        <div
          id="settings-icon"
          className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer hover:shadow-xl shadow-biru hover:-translate-y-1 transition-all duration-300"
        >
          <SlSettings />
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2 bg-white py-2 px-2 rounded-2xl shadow hover:shadow-xl shadow-biru hover:-translate-y-1 transition-all duration-300">
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm text-gray-800 font-medium">
            Derek Alvarado
          </span>
          <MdKeyboardArrowDown className="text-gray-600 cursor-pointer" />
        </div>

        <Link
          to="/login"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          LogOut
        </Link>
      </div>
    </div>
  );
}
