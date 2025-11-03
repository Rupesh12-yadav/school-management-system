import React, { useState } from "react";
import { motion } from "framer-motion"; // eslint-disable-line
import {
  FaUserPlus,
  FaSchool,
  FaChalkboardTeacher,
  FaBookOpen,
  FaRegCalendarCheck,
} from "react-icons/fa";
import {
  MdAssessment,
  MdLeaderboard,
  MdCampaign,
  MdOutlineAssignmentTurnedIn,
} from "react-icons/md";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ManageStudents from "./ManageStudent/ManageStudents";
import ManageTeachers from "./ManageTeacher/Manageteacher";
import AttendanceReport from "./AttendenceReport";
import ManageClasses from "./Manageclass/ViewClassDetail";
import MarkAttendance from "./MarkAttendence/MarkAttendence";
import HomeworkOverview from "./HomeworkOverview";

export default function AdminDashboard({ admin, setUser }) {
  const [active, setActive] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <MdAssessment /> },
    { name: "Manage Student", icon: <FaUserPlus /> },
    { name: "Manage Teacher", icon: <FaChalkboardTeacher /> },
    { name: "Manage Classes", icon: <FaSchool /> },
    { name: "Mark Attendance", icon: <MdOutlineAssignmentTurnedIn /> },
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
   <div
  className="flex min-h-screen bg-gradient-to-br from-[#fffdf3] via-[#fffbea] to-[#fff6d9]"
>
  {/* ===== Sidebar ===== */}
  <motion.aside
    animate={{
      width: isSidebarOpen ? 240 : 80,
      boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
    }}
    transition={{ duration: 0.4 }}
    style={{
      backgroundColor: "var(--sidebar-bg)",
      position: "fixed", // 👈 Sidebar fixed
      top: 0,
      left: 0,
      bottom: 0,
      overflowY: "auto", // in case menu list bada ho
    }}
    className="text-gray-900 p-4 flex flex-col border-r border-yellow-200"
  >
    <div className="flex items-center justify-between mb-6">
      {isSidebarOpen && (
        <h1 className="text-xl font-bold text-gray-800 drop-shadow-sm">
          🏫 Admin Panel
        </h1>
      )}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="text-gray-700 hover:text-gray-900 transition"
      >
        <FiMenu size={22} />
      </button>
    </div>

    {/* Sidebar Menu */}
    <nav className="space-y-2">
      {menuItems.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          style={{
            backgroundColor:
              active === item.name ? "var(--sidebar-active)" : "transparent",
          }}
          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
            active === item.name
              ? "text-gray-900 font-semibold"
              : "hover:bg-[var(--sidebar-hover)] text-gray-800"
          }`}
          onClick={() => setActive(item.name)}
        >
          <span className="text-lg">{item.icon}</span>
          {isSidebarOpen && <span className="text-sm">{item.name}</span>}
        </motion.div>
      ))}
    </nav>
  </motion.aside>

  {/* ===== Main Content ===== */}
  <div
    className="flex-1 flex flex-col"
    style={{
      marginLeft: isSidebarOpen ? 240 : 80, // 👈 Adjust for sidebar width
      transition: "margin-left 0.4s ease",
    }}
  >
    {/* Navbar */}
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "var(--background-color)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
      }}
      className="text-gray-900 flex justify-between items-center px-6 py-4 backdrop-blur-md"
    >
      <h2 className="text-lg font-semibold tracking-wide">
        Welcome, {admin?.name || "Admin"} 👋
      </h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={handleLogout}
        style={{
          backgroundColor: "var(--primary-color)",
          color: "var(--button-text)",
          boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
        }}
        className="font-semibold px-4 py-2 rounded-xl transition"
      >
        <FiLogOut className="inline mr-1" /> Logout
      </motion.button>
    </header>

    {/* Scrollable Dashboard Content */}
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 flex-1 overflow-y-auto"
      style={{
        background:
          "linear-gradient(to bottom right, #fffdf3, #fffbea, #fff6d9)",
      }}
    >
      {/* ... your existing dashboard content remains same ... */}
      {/* Keep your Dashboard, ManageStudent, etc. code as it is */}
      {active === "Dashboard" ? (
        <>
          <h2 className="text-2xl font-bold mb-6 text-[var(--text-secondary)]">
            📊 Dashboard Overview
          </h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-10">
            {[
              { title: "Total Students", value: "1,245", icon: <FaUserPlus /> },
              { title: "Total Teachers", value: "58", icon: <FaChalkboardTeacher /> },
              { title: "Total Classes", value: "12", icon: <FaSchool /> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                style={{
                  backgroundColor: "var(--card-bg)",
                  boxShadow: `-6px 4px 12px rgba(0, 0, 0, 0.25)`,
                }}
                className="p-5 rounded-2xl hover:shadow-[ -8px_6px_16px_rgba(0,0,0,0.35) ] transition duration-300"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-gray-700">{stat.title}</h3>
                    <p className="text-3xl font-bold text-[var(--text-secondary)] mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className="text-[var(--icon)] text-4xl">{stat.icon}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Welcome Box */}
          <motion.div
            className="p-6 rounded-2xl shadow-sm mt-7"
            style={{
              backgroundColor: "var(--background-color)",
              boxShadow: `-6px 4px 12px rgba(0, 0, 0, 0.25)`,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-[var(--text-secondary)] mb-2">
              🌟 Welcome to the School Admin Dashboard
            </h3>
            <p className="text-gray-700">
              Manage students, teachers, classes, attendance, and announcements — all from one clean dashboard.
            </p>
          </motion.div>
        </>
      ) : active === "Manage Student" ? (
        <ManageStudents />
      ) : active === "Manage Teacher" ? (
        <ManageTeachers />
      ) : active === "Manage Classes" ? (
        <ManageClasses />
      ) : active === "Mark Attendance" ? (
        <MarkAttendance />
      ) : active === "Attendance Report" ? (
        <AttendanceReport />
      ) : active === "Homework Overview" ? (
        <HomeworkOverview />
      ) : (
        <p className="text-gray-700">
          You selected <strong>{active}</strong>. Content for this section will appear here.
        </p>
      )}
    </motion.main>
  </div>
</div>

  );
}
