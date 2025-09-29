import React, { useState } from "react";
import { motion } from "framer-motion"; // eslint-disable-line
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "student@example.com" && password === "1234") {
      setUser({ role: "student", email });
      navigate("/dashboard"); // redirect student
    } else if (email === "teacher@example.com" && password === "1234") {
      setUser({ role: "teacher", email });
      navigate("/teacher-dashboard"); // teacher route (banana hoga)
    } else if (email === "admin@example.com" && password === "1234") {
      setUser({ role: "admin", email });
      navigate("/admin-dashboard"); // admin route (banana hoga)
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 p-4"
      onClick={() => navigate("/")} // 👈 agar background pe click kare to homepage pe bhej do
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative"
        onClick={(e) => e.stopPropagation()} // 👈 andar form pe click karne se background ka event trigger na ho
      >
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-gray-600 hover:text-black"
        >
          ⬅ Back
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
