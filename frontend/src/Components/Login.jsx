import React, { useState } from "react";
import { motion } from "framer-motion";// eslint-disable-line
import { useNavigate } from "react-router-dom";
import backButton from "../assets/back button.png";

// ✅ Frontend will use REACT_APP_API_URL from .env



const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      alert("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error((errData && errData.message) || "Login failed");
      }

      const data = await res.json();

      if (data && data.user) {
        setUser(data.user); // App.jsx will handle localStorage if needed
        if (data.token) localStorage.setItem("auth_token", data.token);

        const role = (data.user.role || "").toLowerCase();
        if (role === "admin") navigate("/admin-dashboard");
        else if (role === "teacher") navigate("/teacher-dashboard");
        else if (role === "student") navigate("/student-dashboard");
        else navigate("/"); // fallback
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      alert(err.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 p-4"
      onClick={() => navigate("/")}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 focus:outline-none"
        >
          <img
            src={backButton}
            alt="Back"
            className="w-8 h-8 filter grayscale hover:grayscale-0 hover:scale-110 transition-all duration-200"
          />
        </button>

        <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-8">
          School Management Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white ${
              loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
