import React, { useState } from "react";
import { motion } from "framer-motion"; // eslint-disable-line
import { FaBookOpen, FaClipboardList, FaUpload } from "react-icons/fa";
import { MdCampaign, MdEventNote } from "react-icons/md";
import { IoIosPaper } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { Navigate } from "react-router-dom";
import AddHomework from "./AddHomework";
import ViewNotice from "./ViewNotice";
import MarkAttendance from "./MarkAttendence";
import PostExam from "./PostExam";
import LeaveRequests from "./LeaveRequest";
import MarksUpload from "./UplodeMarks";

export default function TeacherDashboard({ setUser }) {
  const [active, setActive] = useState("Teacher Dashboard");

    const handleLogout = () => {
    if (setUser) setUser(null);
    navigate("/");
  };

  const menuItems = [
    { name: "Add Homework", icon: <FaBookOpen />, key: "homework" },
    { name: "View Notice", icon: <MdCampaign />, key: "notice" },
    { name: "Mark Attendance", icon: <MdEventNote />, key: "attendance" },
    { name: "Post Exam", icon: <IoIosPaper />, key: "exam" },
    { name: "Leave Request", icon: <FaClipboardList />, key: "leave" },
    { name: "Upload Marks", icon: <FaUpload />, key: "marks" },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md flex flex-col items-center py-6">
        <motion.img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-20 h-20 md:w-24 md:h-24 rounded-full mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <h2 className="font-bold text-base md:text-lg">RAVI KUMAR</h2>
        <p className="text-gray-500 text-sm md:text-base">Skill: Mathematics</p>
        <p className="text-gray-500 text-sm md:text-base">Class: 10th A</p>
        <p className="text-gray-500 text-sm md:text-base mb-6 md:mb-8">
          Address: Bhopal, MP
        </p>

        <nav className="flex-1 w-full px-2 md:px-4 space-y-2 md:space-y-3">
          {menuItems.map((item) => (
            <motion.button
              key={item.key}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-2 md:gap-3 w-full px-3 md:px-4 py-2 md:py-3 rounded-lg text-left font-medium transition-all duration-200 ${
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

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">{active}</h1>
          <motion.button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-100 text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiLogOut /> Logout
          </motion.button>
        </div>

        {/* Render Section Based on Menu Selection */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-4 md:p-6 rounded-xl shadow-sm"
        >
          {active === "Add Homework" ? (
            <AddHomework />
          ) :
          active==="View Notice"?(
            <ViewNotice/>
          ):active==="Mark Attendance"?(
            <MarkAttendance/>
          ):active==="Post Exam"?(
            <PostExam/>
          ):active==="Leave Request"?(
            <LeaveRequests/>
          ):active==="Upload Marks"?(
            <MarksUpload/>
          ):
          (
            <p className="text-gray-600 text-sm md:text-base">
              You have selected "{active}". Content for this section will be displayed here.
            </p>
          )}
        </motion.div>
      </main>
    </div>
  );
}
