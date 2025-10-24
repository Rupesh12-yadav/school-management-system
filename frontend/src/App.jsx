import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import Navbar from "./Components/Navbar";
import Home from "./page/Homepage/Home";
import Login from "./Components/Login";
import AdminDashboard from "./page/Admin/AdminDashboard";
import TeacherDashboard from "./page/Teacher/TeacherDashboard";
import StudentDashboard from "./page/Student/Dashboard";

const App = () => {
  const [user, setUser] = useState(null);

  // ✅ 1. Page reload hone ke baad user ko login state me rakhne ke liye
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ✅ 2. Login hone ke baad user data localStorage me save karne ke liye
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ✅ 3. Logout hone par localStorage se user data delete karne ke liye
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ✅ 4. User ke role ke hisaab se dashboard route set karne ke liye
  const getDashboardPath = (role) => {
    if (role === "admin") return "/admin-dashboard";
    if (role === "teacher") return "/teacher-dashboard";
    if (role === "student") return "/student-dashboard";
    return "/dashboard";
  };

  return (
    <Router>
      {/* Navbar sirf tab dikhana jab user login nahi hua ho */}
      {!user && <Navbar />}

      <Routes>
        <Route path="/" element={<Home setUser={setUser} />} />

        <Route
          path="/login"
          element={
            !user ? (
              <Login setUser={handleLogin} />
            ) : (
              <Navigate to={getDashboardPath(user.role)} replace />
            )
          }
        />

        <Route
          path="/student-dashboard"
          element={
            user && user.role === "student" ? (
              <StudentDashboard setUser={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            user && user.role === "admin" ? (
              <AdminDashboard
                admin={{
                  image: "https://via.placeholder.com/100",
                  name: "Rupesh",
                  role: "Principal",
                }}
                user={user}
                setUser={handleLogout}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/teacher-dashboard"
          element={
            user && user.role === "teacher" ? (
              <TeacherDashboard setUser={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
