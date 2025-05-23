import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHeader2 from "../components/PageHeader";
import { IoMdAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Pagination from "../components/Pagination";

export default function UsersPage() {
  const itemsPerPage = 10;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = users.slice(startIndex, endIndex);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((response) => {
        const updatedUsers = response.data.users.map((user) => ({
          ...user,
          role: Math.random() > 0.5 ? "admin" : "user", // dummy role
        }));
        setUsers(updatedUsers);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading Users...</p>
      </div>
    );

  return (
    <div id="users-container">
      <PageHeader2 title="Users" breadcrumb={["Dashboard", "Users"]}>
        <button className="bg-hijau text-white px-4 py-2 rounded-lg flex items-center">
          <IoMdAdd className="mr-2 text-sm" />
          Add New User
        </button>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center">
          <FiEdit className="mr-2 text-sm" />
          Edit
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center">
          <MdOutlineDeleteOutline className="mr-2 text-sm" />
          Delete
        </button>
      </PageHeader2>

      {/* Tabel Users */}
      <div className="mt-6 overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700">ID</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700">Username</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700">Phone</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentData.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800">{user.id}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">{user.username}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{user.email}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{user.phone}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={prevPage}
          onNext={nextPage}
        />
      </div>
    </div>
  );
}
