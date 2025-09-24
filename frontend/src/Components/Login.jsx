import { useState } from "react";
import { motion } from "framer-motion";// eslint-disable-line
import React from "react";

const Login = ({ goBack ,setUser}) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // console.log(setUser)

  const handleSubmit = (e) => {
    e.preventDefault();
   if (email === "student@example.com" && password === "1234") {
      setUser({ role: "student", email }); // user logged in
      goBack(); // popup close ho jaye
    } else if (email === "teacher@example.com" && password === "1234") {
      setUser({ role: "teacher", email });
      goBack();
    } else if (email === "admin@example.com" && password === "1234") {
      setUser({ role: "admin", email });
      goBack();
    } else {
      alert("Invalid credentials");
    }
  };


  const handleBackgroundClick = (e) => {
    if (e.target.id === "login-bg") {
      goBack();
    }
  };

  return (
    <div
      id="login-bg"
      onClick={handleBackgroundClick}
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
    >
      {/* Animated Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Back Arrow Button (Top Left) */}
        <button
          onClick={goBack}
          className="absolute top-4 left-4 text-red-500 text-2xl font-bold hover:text-red-700 transition"
        >
          ←
        </button>

        {/* Heading */}
        <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-8">
          School Management
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 transition"
            />
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg 
                       font-semibold shadow-md hover:bg-indigo-700 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       transition"
          >
            Login
          </motion.button>
        </form>

        {/* Forgot Password */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <a
            href="#"
            className="text-blue-600 font-medium hover:text-blue-800 transition"
          >
            Forgot password?
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
