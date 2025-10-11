import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AuthProvider from "./context/authContext";
import Navbar from "./Components/Navbar";
import Home from "./page/Homepage/Home";
import Login from "./Components/Login";
import AdminDashboard from "./page/Admin/AdminDashboard";
import TeacherDashboard from "./page/Teacher/TeacherDashboard";

function Layout() {
  const location = useLocation();

  // ✅ Hide Navbar on dashboard pages
  const hideNavbarRoutes = [
    "/admin-dashboard",
    "/teacher-dashboard",
    "/student-dashboard",
  ];

  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* ✅ Show Navbar only if not on dashboard */}
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />

        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
