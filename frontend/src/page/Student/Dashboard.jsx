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

import Dashboard from "./Dashbaord";
import Homework from "./Homework";
import Attendance from "./Attention";
import Notice from "./Notice";
import Exam from "./Timetable";
import Result from "./Result";
import Leave from "./Leave";

export default function StudentDashboard({ user, setUser }) {
  const [active, setActive] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
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
    <div className="flex full-h-screen bg-yellow-50">
      
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 240 : 80 }}
        className={`bg-yellow-600 text-white p-4 flex flex-col shadow-xl fixed md:static z-50 h-full 
          ${mobileMenu ? "left-0" : "-left-64"} md:left-0 transition-all duration-1`}
      >
        <div className="flex items-center justify-between mb-6">
          {isSidebarOpen && <h1 className="text-lg font-bold">Student Panel</h1>}
          <button
            onClick={() => {
              if (window.innerWidth < 768) {
                setMobileMenu(false);
              } else {
                setIsSidebarOpen(!isSidebarOpen);
              }
            }}
            className="text-yellow-200 hover:text-white"
          >
            <FiMenu size={22} />
          </button>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center mb-5">
          <img src={Student_img} className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover" />
          {isSidebarOpen && (
            <>
              <h2 className="text-sm font-semibold mt-2">{user?.email || "student@example.com"}</h2>
              <p className="text-yellow-100 text-xs">{user?.role || "Student"}</p>
            </>
          )}
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.03 }}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer
                ${active === item.name ? "bg-white text-yellow-700 font-semibold" : "text-yellow-50 hover:bg-yellow-500"}`}
              onClick={() => {
                setActive(item.name);
                setMobileMenu(false);
              }}
            >
              <span className="text-lg">{item.icon}</span>
              {isSidebarOpen && <span className="text-sm">{item.name}</span>}
            </motion.div>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-0 ml-0 flex flex-col">
        
        {/* Header */}
        <header className="bg-yellow-700 text-white flex justify-between items-center px-4 md:px-6 py-4 shadow-lg">
          <button className="md:hidden text-2xl" onClick={() => setMobileMenu(true)}>
            <FiMenu />
          </button>

          <h2 className="text-md md:text-lg font-bold">
            Welcome, {user?.name || "Student"} 👋
          </h2>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleLogout}
            className="bg-white text-yellow-700 font-semibold px-3 md:px-4 py-2 rounded-xl shadow-md text-sm md:text-base"
          >
            <FiLogOut className="inline mr-1" /> Logout
          </motion.button>
        </header>

        <main className="p-4 md:p-6 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
