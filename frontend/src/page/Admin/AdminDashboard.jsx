import React, { useState } from "react";
import { motion } from "framer-motion"; // eslint-disable-line
import { FaUserPlus, FaTrash, FaCalendarAlt } from "react-icons/fa";
import { MdAssessment, MdCampaign } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
// <<<<<<< HEAD
// import { useNavigate } from "react-router-dom"; // ✅ Navigate ko replace kiya useNavigate se
// import AdminAddSection from "./Add_Student&Teacher";

import { Navigate } from "react-router-dom";
import AdminAddSection from "./AdminAdd";

export default function AdminDashboard({ admin, setUser }) {
  const [active, setActive] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Add Student/Teacher", icon: <FaUserPlus />, key: "add" },
    { name: "Delete Student/Teacher", icon: <FaTrash />, key: "delete" },
    { name: "View Attendance Report", icon: <MdAssessment />, key: "attendance" },
    { name: "Create Notice", icon: <MdCampaign />, key: "notice" },
    { name: "Manage Holidays", icon: <FaCalendarAlt />, key: "holidays" },
  ];

  const handleLogout = () => {
    setUser(null);
    Navigate("/");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center justify-between bg-white p-4 shadow-md">
        <h1 className="text-lg font-bold">{active}</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="px-3 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-20 bg-white shadow-md flex flex-col items-center py-6 transition-transform duration-300 ease-in-out
        w-64 h-full md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <motion.img
          src={admin.image}
          alt="Profile"
          className="w-20 h-20 md:w-24 md:h-24 rounded-full mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <h2 className="font-bold text-base md:text-lg">{admin.name}</h2>
        <p className="text-gray-500 mb-6 text-sm md:text-base">{admin.role}</p>

        <nav className="flex-1 w-full px-4 space-y-3 overflow-y-auto">
          {menuItems.map((item) => (
            <motion.button
              key={item.key}
              onClick={() => {
                setActive(item.name);
                setIsSidebarOpen(false); // close sidebar on mobile click
              }}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${
                active === item.name
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
              <span className="text-sm md:text-base">{item.name}</span>
            </motion.button>
          ))}
        </nav>
      </aside>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black opacity-40 z-10 md:hidden"
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center sm:text-left">
            {active}
          </h1>
          <motion.button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-100 text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiLogOut /> Logout
          </motion.button>
        </div>


       


        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-4 md:p-6 rounded-xl shadow-sm"
        >
          {active === "Add Student/Teacher" ? (
            <AdminAddSection /> // ✅ Render add section UI
          ) : (
            <p className="text-gray-600 text-sm md:text-base">
              {`You have selected "${active}". Content for this section will be displayed here.`}
            </p>
          )}
        </motion.div>
      </main>
    </div>
  );
}
