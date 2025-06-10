import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import { FiEdit, FiEye } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const navigate = useNavigate();

  // 1. Fetch full user list with role included
  useEffect(() => {
    axios.get("https://dummyjson.com/users?limit=100").then((res) => {
      setUsers(res.data.users);
      setFilteredUsers(res.data.users);
    });
  }, []);

  // 2. Apply filters (search and role)
  useEffect(() => {
    let filtered = users.filter(
      (u) =>
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (roleFilter) {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, roleFilter, users]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const pagedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const roleColor = {
    admin: "bg-green-500",
    moderator: "bg-orange-500",
    user: "bg-blue-500",
  };

  const allRoles = Array.from(new Set(users.map((u) => u.role))).filter(Boolean);

  return (
    <div className="p-4">
      <PageHeader
        title="Users"
        breadcrumbItems={[
          { label: "Dashboard", href: "/" },
          { label: "Users" },
        ]}
      >
        <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md flex items-center text-sm hover:bg-blue-50">
          <IoMdAdd className="mr-2" /> NEW CUSTOMER
        </button>
      </PageHeader>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 my-4">
        <input
          type="text"
          placeholder="🔍 Search..."
          className="border px-3 py-2 rounded-md w-full md:w-1/3 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border px-3 py-2 rounded-md text-sm cursor-pointer"
        >
          <option value="">All Roles</option>
          {allRoles.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden bg-white rounded-lg shadow-sm">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-white border-b border-gray-200 text-gray-600 font-medium">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">E-Mail</th>
              <th className="px-4 py-3">Date of Birth</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
              >
                <td className="px-4 py-3 text-gray-700">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 py-3 text-gray-900">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-4 py-3 capitalize">
                  <span className="inline-flex items-center gap-2 text-sm">
                    <span className={`w-2 h-2 rounded-full ${roleColor[user.role] || "bg-gray-400"}`} />
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">{user.email}</td>
                <td className="px-4 py-3 text-gray-700">{user.birthDate || "N/A"}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/users/${user.id}`)}
                      className="p-1.5 rounded-md hover:bg-gray-100 border cursor-pointer"
                    >
                      <FiEye className="text-gray-500 text-[14px]" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-gray-100 border cursor-pointer">
                      <FiEdit className="text-gray-500 text-[14px]" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-gray-100 border cursor-pointer">
                      <MdOutlineDeleteOutline className="text-red-500 text-[16px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onPageSizeChange={setItemsPerPage}
        />
      </div>
    </div>
  );
}
