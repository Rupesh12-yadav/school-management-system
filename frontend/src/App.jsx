import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./page/Homepage/Home";
import Login from "./Components/Login";
import Dashboard from "./page/Student/Dashboard";
import AdminDashboard from "./page/Admin/AdminDashboard";

const App = () => {
  const [user, setUser] = useState(null); // user: null ya {role, email}
   const getDashboardPath = (role) => {
    if (role === "admin") return "/admin-dashboard";
    if (role === "teacher") return "/teacher-dashboard";
    // if (role === "student") return "/Student-dashboard";
    return "/dashboard"; // student default
  };

  return (
    <Router>
      {/* Navbar */}
      {!user && <Navbar />}

      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home setUser={setUser} />} />

        {/* Login Route */}
        <Route
          path="/login"
          element={
            !user ? <Login setUser={setUser} /> : <Navigate to={getDashboardPath(user.role)} replace />
          }
        />

        {/* Dashboard Route (Protected for Student) */}
        <Route
          path="/dashboard"
          element={
            user && user.role ==="student" ? <Dashboard setUser={setUser} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            user && user.role ==="admin" ? <AdminDashboard admin={{
            image: "https://via.placeholder.com/100",
             name: "Rupesh",
              role: "Principal"
  }} user={user} setUser={setUser} /> : <Navigate to="/login" />
          }
        />

        {/* Fallback Route (agar koi wrong URL likhe to Home pr bhej do) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
