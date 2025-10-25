import React, { useState } from "react";
import { motion } from "framer-motion";// eslint-disable-line
import {
  FaUserPlus,
  FaSchool,
  FaChalkboardTeacher,
  FaBookOpen,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { MdAssessment, MdLeaderboard, MdCampaign, MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ManageStudents from "./ManageStudent/ManageStudents";
import ManageTeachers from "./ManageTeacher/Manageteacher";
import AttendanceReport from "./AttendenceReport";

export default function AdminDashboard({ admin, setUser }) {
  const [active, setActive] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <MdAssessment /> },
    { name: "Manage Student", icon: <FaUserPlus /> },
    { name: "Manage Teacher", icon: <FaChalkboardTeacher /> },
    { name: "Manage Classes", icon: <FaSchool /> },
    { name: "Attendance Report", icon: <MdOutlineAssignmentTurnedIn /> },
    { name: "Homework Overview", icon: <FaBookOpen /> },
    { name: "Result Overview", icon: <MdLeaderboard /> },
    { name: "Leave Management", icon: <FaRegCalendarCheck /> },
    { name: "Announcements", icon: <MdCampaign /> },
  ];

  const handleLogout = () => {
    if (setUser) setUser(null);
    navigate("/");
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
          {isSidebarOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-300 hover:text-white transition">
            <FiMenu size={22} />
          </button>
        </div>

        <nav className="space-y-3">
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
        {/* Navbar */}
        <header className="bg-[#0F172A] text-white flex justify-between items-center px-6 py-4 shadow-md">
          <h2 className="text-lg font-semibold tracking-wide">
            Welcome, {admin?.name || "Admin"} 👋
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition"
          >
            <FiLogOut className="inline mr-1" /> Logout
          </motion.button>
        </header>

        {/* Dashboard Content */}
        <motion.main
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 bg-gray-50 flex-1 overflow-y-auto"
        >
          {active === "Dashboard" ? (
            <>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 Dashboard Overview</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {[
                  { title: "Total Students", value: "1,245", icon: <FaUserPlus /> },
                  { title: "Total Teachers", value: "58", icon: <FaChalkboardTeacher /> },
                  { title: "Total Classes", value: "12", icon: <FaSchool /> },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-gray-600">{stat.title}</h3>
                        <p className="text-3xl font-bold text-blue-700 mt-2">{stat.value}</p>
                      </div>
                      <div className="text-blue-600 text-4xl">{stat.icon}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="p-6 bg-blue-50 border border-blue-200 rounded-2xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                  Welcome to the School Admin Dashboard 🎉
                </h3>
                <p className="text-gray-700">
                  Manage students, teachers, classes, attendance, and announcements all from one place.
                </p>
              </motion.div>
            </>
          ) : active === "Manage Student" ? (
            <ManageStudents />
          ) : active === "Manage Teacher" ? (
            <ManageTeachers />
          ) : (
            <p className="text-gray-600">
              You selected <strong>{active}</strong>. Content for this section will appear here.
            </p>
          )}
        </motion.main>
      </div>
    </div>
  );
}
