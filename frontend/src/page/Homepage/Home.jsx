import React, { useState } from "react";
import { motion } from "framer-motion";// eslint-disable-line
import background from "../../assets/download.jpg";
import Login from "../../Components/Login"; // Login import kiya

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      {/* Agar showLogin true h to Login dikhao */}
      {showLogin ? (
        <Login goBack={() => setShowLogin(false)} />
      ) : (
        <>
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src={background}
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Overlay Text + Button */}
          <div className="relative z-10 text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold mb-4 text-black drop-shadow-2xl"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              ALL-IN-ONE SCHOOL PORTAL
            </motion.h1>

            <motion.h5
              className="text-lg md:text-2xl font-medium text-gray-800 drop-shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Simplify Learning, Attendance, and Results Online
            </motion.h5>

            <motion.button
              onClick={() => setShowLogin(true)}
              className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-500 transition"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              GET STARTED
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
