import { ImSpinner2 } from "react-icons/im";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: dataForm.username,
        password: dataForm.password,
        expiresInMins: 30,
      });

      // ✅ Simpan token dan user data (optional)
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));

      // ✅ Navigasi ke dashboard
      navigate("/dashboard-barber");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login gagal");
      } else {
        setError("Terjadi kesalahan jaringan");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">
        Login
      </h2>

      {error && (
        <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
          <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
          <ImSpinner2 className="me-2 animate-spin" />
          Mohon Tunggu...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-sm font-medium text-white mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={dataForm.username}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="emilys"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="emilyspass"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-biru hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Login
        </button>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => navigate("/forgot")}
            className="text-biru hover:underline text-sm"
          >
            Forgot Password?
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-biru hover:underline text-sm"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
