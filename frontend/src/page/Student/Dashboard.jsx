import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";// eslint-disable-line
import Student_img from "../../assets/student.jpg";
import {
  FaBook,
  FaClipboardList,
  FaBullhorn,
  FaCalendarAlt,
  FaGraduationCap,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const StudentDashboard = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [activeOption, setActiveOption] = useState("Dashboard");

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const menuItems = [
    { name: "Today's Homework", icon: <FaBook size={20} /> },
    { name: "Attendance Report", icon: <FaClipboardList size={20} /> },
    { name: "View Notice", icon: <FaBullhorn size={20} /> },
    { name: "Exam Timetable", icon: <FaCalendarAlt size={20} /> },
    { name: "View Result", icon: <FaGraduationCap size={20} /> },
    { name: "Request for Leave", icon: <FaRegCalendarCheck size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 p-6 flex flex-col">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <img
            src={Student_img}
            alt="Student"
            className="w-28 h-28 rounded-full object-cover border-2 border-gray-300 shadow-md"
          />
          <h2 className="mt-4 text-lg font-semibold text-gray-800">
            {user?.name || "Shivangi Gour"}
          </h2>
          <p className="text-sm text-indigo-500 font-medium">
            Role: {user?.role || "Student"}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Class: {user?.class || "10th A"}
          </p>
          <p className="text-sm text-gray-600">Address: Harda</p>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveOption(item.name)}
              whileHover={{ scale: 1.05, x: 5 }}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition cursor-pointer
                ${
                  activeOption === item.name
                    ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{activeOption}</h1>

          {/* White Logout Button */}
          <motion.button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiLogOut /> Logout
          </motion.button>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-600">
            You have selected:{" "}
            <span className="font-semibold text-indigo-600">
              {activeOption}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
