// ✅ Fully Responsive Student Dashboard Page (Mobile + Tablet + Desktop)
// Paste this as Dashboard.jsx

import React from "react";
import { Bell, BookOpen, GraduationCap, CalendarCheck, Users, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const stats = [
    { title: "Attendance", value: "92%", icon: <CalendarCheck className="w-8 h-8 md:w-10 md:h-10" /> },
    { title: "Total Students", value: "1,245", icon: <Users className="w-8 h-8 md:w-10 md:h-10" /> },
    { title: "Homework Today", value: "Math, English", icon: <BookOpen className="w-8 h-8 md:w-10 md:h-10" /> },
    { title: "Top Result", value: "A+ Grade", icon: <GraduationCap className="w-8 h-8 md:w-10 md:h-10" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-50 p-3 sm:p-4 md:p-6">

      {/* Header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 text-yellow-700 drop-shadow-lg text-center md:text-left">
        🏫 Welcome to Yellow School Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-10">
        {stats.map((item, i) => (
          <motion.div key={i} whileHover={{ scale: 1.07 }} transition={{ duration: 0.3 }}>
            <div className="rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 bg-white/90 backdrop-blur-md shadow-lg border border-yellow-300 hover:shadow-xl">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-yellow-600">{item.icon}</div>
                <div>
                  <p className="text-yellow-700 text-xs sm:text-sm md:text-base">{item.title}</p>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{item.value}</h2>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 md:mb-10">
        {/* Announcements */}
        <div className="rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 bg-white/90 backdrop-blur-md border-l-4 border-yellow-500">
          <h2 className="text-lg sm:text-xl font-bold mb-2 flex items-center gap-2 text-yellow-700">
            <Bell className="text-yellow-600" /> Latest Announcements
          </h2>
          <ul className="text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
            <li>✔️ Parent-Teacher Meeting on Friday</li>
            <li>✔️ Science Exhibition Next Week</li>
            <li>✔️ Sports Practice Starts Monday</li>
          </ul>
        </div>

        {/* Rank / Awards */}
        <div className="rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 bg-white/90 backdrop-blur-md border-l-4 border-yellow-500">
          <h2 className="text-lg sm:text-xl font-bold mb-2 flex items-center gap-2 text-yellow-700">
            <Trophy className="text-yellow-600" /> Achievements
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">🏆 Our school secured 1st place in District Quiz!</p>
        </div>
      </div>

      {/* Homework */}
      <div className="rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 bg-white/90 backdrop-blur-md border-l-4 border-yellow-500">
        <h2 className="text-lg sm:text-xl font-bold mb-3 text-yellow-700">Homework Today</h2>
        <ul className="text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
          <li>📘 English — Essay Writing</li>
          <li>🧮 Math — Algebra Practice</li>
          <li>🔬 Science — Lab Report</li>
          <li>🌍 Social — Map Assignment</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;