// src/layouts/Header.jsx
import React from "react";
import { FaBell, FaCog } from "react-icons/fa";

export default function Header() {
  return (
    <div className="flex justify-between items-center">
      <input
        type="text"
        placeholder="Search Here"
        className="border border-black p-2 pr-10 bg-white w-full 
                    max-w-lg rounded-md outline-none"
      />
      <div className="flex items-center gap-4">
        <FaBell className="text-gray-600" />
        <FaCog className="text-gray-600" />
        <span>Hello, <b>Ruben</b></span>
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
}
