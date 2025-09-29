import React, { useState } from "react";
import { motion } from "framer-motion"; // eslint-disable-line
import { FaUserPlus, FaTrash, FaCalendarAlt } from "react-icons/fa";
import { MdAssessment, MdCampaign } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { Navigate } from "react-router-dom";

export default function AdminDashboard({ admin ,setUser }) {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Add Student/Teacher", icon: <FaUserPlus />, key: "add" },
    { name: "Delete Student/Teacher", icon: <FaTrash />, key: "delete" },
    { name: "View Attendance Report", icon: <MdAssessment />, key: "attendance" },
    { name: "Create Notice", icon: <MdCampaign />, key: "notice" },
    { name: "Manage Holidays", icon: <FaCalendarAlt />, key: "holidays" },
  ];
  const handleLogout = () => {
    setUser(null);
    Navigate("/")
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col items-center py-6">
        <motion.img
          src={admin.image}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <h2 className="font-bold text-lg">{admin.name}</h2>
        <p className="text-gray-500 mb-8">{admin.role}</p>

        <nav className="flex-1 w-full px-4 space-y-3">
          {menuItems.map((item) => (
            <motion.button
              key={item.key}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${
                active === item.name
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
              {item.name}
            </motion.button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{active}</h1>
          <motion.button
           onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-100"
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
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <p className="text-gray-600">
            {`You have selected "${active}". Content for this section will be displayed here.`}
          </p>
        </motion.div>
      </main>
    </div>
  );
}
