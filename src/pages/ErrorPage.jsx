import React from "react";
import { Link } from "react-router-dom";
import Error from "../assets/error.png";

export default function ErrorPage({
  code = "404",
  message = "Page Not Found",
  image,
}) {
  const styles = {
    400: { glitch: "text-cyan-500"},
    401: { glitch: "text-yellow-500"},
    403: { glitch: "text-red-500"},
    404: { glitch: "text-green-500"},
  };

  const style = styles[code] || styles[404];
  const isFullScreen = code === "404";

  return (
    <div
      className={`flex items-center justify-center ${
        isFullScreen ? "h-screen" : "min-h-screen"
      } bg-gradient-to-br ${style.bg} px-4`}
    >
      <div className="bg-white border-4 border-gray-300 rounded-xl shadow-lg p-8 max-w-xl w-full text-center animate-fade-in-up">
        {/* Gambar Error */}
        {image && (
          <img
            src={Error}
            alt={`Error ${code}`}
            className="w-1/2 max-w-[200px] mx-auto"
          />
        )}

        {/* Kode Error */}
        <div className="relative inline-block">
          <h1 className="text-[6rem] font-extrabold text-black select-none animate-glitch relative z-10">
            {code}
          </h1>
          <h1
            className={`absolute top-0 left-[-4px] text-[6rem] font-extrabold ${style.glitch} opacity-60 blur-sm animate-glitch2 z-0`}
          >
            {code}
          </h1>
          <h1
            className={`absolute top-0 left-[4px] text-[6rem] font-extrabold ${style.glitch} opacity-60 blur-sm animate-glitch z-0`}
          >
            {code}
          </h1>
        </div>

        {/* Pesan Error */}
        <p className="mt-4 text-xl font-semibold text-gray-800">{message}</p>

        {/* Tombol kembali */}
        <Link
          to="/dashboard-barber"
          className="mt-6 inline-block text-sm font-medium text-gray-700 border border-gray-500 bg-green-400 px-6 py-2 rounded-md hover:bg-gray-200 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
