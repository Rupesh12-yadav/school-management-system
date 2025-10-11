import React from "react";
import { motion } from "framer-motion"; // eslint-disable-line
import { useNavigate } from "react-router-dom";
import background from "../../assets/download (3).jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={background}
          alt="Hero"
          className="w-full h-full object-cover"
        />
<<<<<<< HEAD
        {/* Darker overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
=======
        <div className="absolute inset-0 bg-black/20"></div>
>>>>>>> 83ece6d08543bfbbe4693b66af24233dd095c86b
      </div>

      {/* Overlay Text + Button */}
      <div className="relative z-10 text-center">
        <motion.h1
<<<<<<< HEAD
          className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-2xl"
=======
          className="text-4xl md:text-6xl font-extrabold mb-4 text-black drop-shadow-2xl"
>>>>>>> 83ece6d08543bfbbe4693b66af24233dd095c86b
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          ALL-IN-ONE SCHOOL PORTAL
        </motion.h1>

        <motion.h5
<<<<<<< HEAD
          className="text-lg md:text-2xl font-medium text-gray-200 drop-shadow-xl"
=======
          className="text-lg md:text-2xl font-medium text-gray-800 drop-shadow-xl"
>>>>>>> 83ece6d08543bfbbe4693b66af24233dd095c86b
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Simplify Learning, Attendance, and Results Online
        </motion.h5>

        <motion.button
          onClick={() => navigate("/login")}
          className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-500 transition"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          GET STARTED
        </motion.button>
      </div>
    </div>
  );
};

export default Home;
