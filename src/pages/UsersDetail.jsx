import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdArrowBack } from "react-icons/md";

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/users/${id}`).then((res) => {
      setUser(res.data);
    });
  }, [id]);

  if (!user)
    return (
      <div className="p-4 text-gray-500 text-sm">Loading user details...</div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
      >
        <MdArrowBack className="mr-2 text-lg" /> Kembali
      </button>

      {/* Profile Card */}
      <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.image}
          alt={user.firstName}
          className="w-32 h-32 rounded-full object-cover border shadow"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-sm text-gray-600 mb-1">@{user.username}</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">
              {user.email}
            </span>
            <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">
              {user.phone}
            </span>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {user.gender}
            </span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
              Age: {user.age}
            </span>
          </div>
        </div>
      </div>

      {/* Section: Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Personal Information
          </h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Birth Date:</strong> {user.birthDate}
            </p>
            <p>
              <strong>Blood Group:</strong> {user.bloodGroup}
            </p>
            <p>
              <strong>Height:</strong> {user.height} cm
            </p>
            <p>
              <strong>Weight:</strong> {user.weight} kg
            </p>
            <p>
              <strong>Eye Color:</strong> {user.eyeColor}
            </p>
            <p>
              <strong>Hair:</strong> {user.hair?.color} / {user.hair?.type}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Address</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Address:</strong> {user.address?.address}
            </p>
            <p>
              <strong>City:</strong> {user.address?.city}
            </p>
            <p>
              <strong>State:</strong> {user.address?.state}
            </p>
            <p>
              <strong>Postal Code:</strong> {user.address?.postalCode}
            </p>
            <p>
              <strong>Coordinates:</strong> {user.address?.coordinates?.lat},{" "}
              {user.address?.coordinates?.lng}
            </p>
          </div>
        </div>

        {/* Section: Company */}
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Company</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Name:</strong> {user.company?.name}
            </p>
            <p>
              <strong>Department:</strong> {user.company?.department}
            </p>
            <p>
              <strong>Title:</strong> {user.company?.title}
            </p>
            <p>
              <strong>Address:</strong> {user.company?.address?.address}
            </p>
            <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded">
              {user.company?.name}
            </span>
          </div>
        </div>

        {/* Section: Identity */}
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Identity & Access
          </h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>IP Address:</strong> {user.ip}
            </p>
            <p>
              <strong>MAC Address:</strong> {user.macAddress}
            </p>
            <p>
              <strong>University:</strong> {user.university}
            </p>
            <p>
              <strong>SSN:</strong> {user.ssn}
            </p>
            <p>
              <strong>EIN:</strong> {user.ein}
            </p>
            <p>
              <strong>User Agent:</strong>{" "}
              <span className="break-words">{user.userAgent}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
