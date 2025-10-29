import React, { useState } from "react";
import { motion } from "framer-motion";// eslint-disable-line
import { useNavigate } from "react-router-dom";
import backButton from "../assets/back button.png"; // 👈 adjust path as needed

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });

      if (data.token) {
        // API se aaya hua user data
        login({ token: data.token, role: data.role, email: data.email });

        toast.success("Login successful!", { autoClose: 2000 });

        // Role ke hisaab se redirect
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
        }, 2000); // toast ke baad redirect
      } else {
        toast.error(data.message || "Login failed", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Login error:", error.response || error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again!",
        { autoClose: 3000 }
      );
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
        {/* Back button image */}
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
