import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaClipboardList,
  FaBullhorn,
  FaCalendarAlt,
  FaGraduationCap,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { FiLogOut, FiMenu } from "react-icons/fi";
import Student_img from "../../assets/student.jpg";

// ✅ Step 1: Create small components for each section
import Dashboard from "./Dashbaord"
import Homework from "./Homework";
import Attendance from "./Attention";
import Notice from "./Notice";
import Exam from "./Timetable";
import Result from "./Result";
import Leave from "./Leave";


export default function StudentDashboard({ user, setUser }) {
  const [active, setActive] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (setUser) setUser(null);
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaGraduationCap /> },
    { name: "Today's Homework", icon: <FaBook /> },
    { name: "Attendance Report", icon: <FaClipboardList /> },
    { name: "View Notice", icon: <FaBullhorn /> },
    { name: "Exam Timetable", icon: <FaCalendarAlt /> },
    { name: "View Result", icon: <FaGraduationCap /> },
    { name: "Request for Leave", icon: <FaRegCalendarCheck /> },
  ];

  // ✅ Step 2: Switch between components
  const renderContent = () => {
    switch (active) {
      case "Dashboard": return <Dashboard />;
      case "Today's Homework": return <Homework />;
      case "Attendance Report": return <Attendance />;
      case "View Notice": return <Notice />;
      case "Exam Timetable": return <Exam />;
      case "View Result": return <Result />;
      case "Request for Leave": return <Leave />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 240 : 80 }}
        transition={{ duration: 0.3 }}
        className="bg-[#1E293B] text-white p-4 flex flex-col shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          {isSidebarOpen && <h1 className="text-xl font-bold">Student Panel</h1>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-300 hover:text-white"
          >
            <FiMenu size={22} />
          </button>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center mb-1">
          <img
            src={Student_img}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 mb-1"
          />
          {isSidebarOpen && (
            <>
              <h2 className="text-sm font-semibold">{user?.email || "student@example.com"}</h2>
              <p className="text-gray-400 text-xs">{user?.role || "Student"}</p>
            </>
          )}
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                active === item.name ? "bg-blue-600 text-white" : "hover:bg-gray-700 text-gray-300"
              }`}
              onClick={() => setActive(item.name)}
            >
              <span className="text-lg">{item.icon}</span>
              {isSidebarOpen && <span className="text-sm">{item.name}</span>}
            </motion.div>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#0F172A] text-white flex justify-between items-center px-6 py-4 shadow-md">
          <h2 className="text-lg font-semibold">Welcome, {user?.name || "Student"} 👋</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl"
          >
            <FiLogOut className="inline mr-1" /> Logout
          </motion.button>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 bg-gray-50">{renderContent()}</main>
      </div>
    </div>
  );
}
