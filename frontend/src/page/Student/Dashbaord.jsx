import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  // simulate API or route load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 sec delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          // 🌪️ Rotating Spinner Animation
          <motion.div
            key="loader"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full shadow-lg"
          ></motion.div>
        ) : (
          // 🌈 Dashboard Content Animation
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold text-slate-800">
              🎯 Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Welcome back, <span className="font-semibold">Rupesh!</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
