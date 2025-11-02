import React, { useState } from "react";
import { motion } from "framer-motion";// eslint-disable-line
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = ({ closeLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      if (data.token) {
        login({ token: data.token, role: data.role, email: data.email });
        toast.success("Login successful!", { autoClose: 1500 });

        setTimeout(() => {
          switch (data.role.toLowerCase()) {
            case "admin":
              navigate("/admin-dashboard");
              break;
            case "teacher":
              navigate("/teacher-dashboard");
              break;
            case "student":
              navigate("/student-dashboard");
              break;
            default:
              navigate("/");
          }
        }, 1500);
      } else {
        toast.error(data.message || "Login failed", { autoClose: 3000 });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        autoClose: 3000,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative w-full max-w-md bg-white/90 backdrop-blur-sm border border-yellow-300 rounded-2xl shadow-2xl p-8"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Welcome Back 👋
      </h2>
      <p className="text-center text-gray-600 mb-6 text-sm">
        Please log in to continue to your dashboard
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 mb-1 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-yellow-400 text-white font-semibold rounded-lg hover:bg-yellow-500 transition-all"
        >
          Login
        </button>
      </form>

      <button
        onClick={closeLogin}
        className="w-full py-2 mt-4 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <ToastContainer position="top-right" newestOnTop />
    </motion.div>
  );
};

export default Login;
