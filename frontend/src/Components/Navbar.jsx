import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

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

        {/* Links */}
        <ul className="hidden md:flex space-x-8 font-semibold text-lg text-white">
          <li><Link to="/" className="hover:text-yellow-300 transition">Home</Link></li>
          <li><Link to="/about" className="hover:text-yellow-300 transition">About</Link></li>
          <li><Link to="/courses" className="hover:text-yellow-300 transition">Courses</Link></li>
          <li><Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link></li>
        </ul>

        {/* Button */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-300 transition"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
