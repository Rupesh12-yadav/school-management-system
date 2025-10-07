import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";// eslint-disable-line

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-transparent shadow-md fixed w-full top-0 left-0 z-20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-3xl font-extrabold text-white cursor-pointer"
          onClick={() => navigate("/")}
        >
          MySchool
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 font-semibold text-lg text-white">
          <li>
            <Link to="/" className="hover:text-yellow-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-yellow-300 transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/courses" className="hover:text-yellow-300 transition">
              Courses
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-300 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Login Button (Always visible) */}
        <div className="hidden md:flex space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-300 transition"
          >
            Login
          </button>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-3xl focus:outline-none"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-900 bg-opacity-90 backdrop-blur-md text-white py-4 space-y-4 flex flex-col items-center shadow-lg"
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-semibold hover:text-yellow-300 transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-semibold hover:text-yellow-300 transition"
          >
            About
          </Link>
          <Link
            to="/courses"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-semibold hover:text-yellow-300 transition"
          >
            Courses
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-semibold hover:text-yellow-300 transition"
          >
            Contact
          </Link>

          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/login");
            }}
            className="bg-yellow-400 text-black px-8 py-2 rounded-lg font-bold hover:bg-yellow-300 transition"
          >
            Login
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
