import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line
import { FaExclamationTriangle } from "react-icons/fa";

const AdminAddSection = () => {
  const [activeTab, setActiveTab] = useState("student");

  // Animation Variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      {/* Toggle Buttons */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
        <button
          onClick={() => setActiveTab("student")}
          className={`w-full sm:w-auto px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === "student"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Student
        </button>

        <button
          onClick={() => setActiveTab("teacher")}
          className={`w-full sm:w-auto px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === "teacher"
              ? "bg-pink-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Teacher
        </button>
      </div>

      {/* Forms Section */}
      <AnimatePresence mode="wait">
        {activeTab === "student" && (
          <motion.div
            key="student"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-lg max-w-3xl mx-auto w-full"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-5 text-gray-800 text-center sm:text-left">
              Add Student
            </h2>

            {/* Form Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input className="p-3 rounded-lg border" placeholder="First Name" />
              <input className="p-3 rounded-lg border" placeholder="Last Name" />
              <input className="p-3 rounded-lg border" placeholder="Father Name" />
              <input className="p-3 rounded-lg border" placeholder="Mother Name" />
              <input className="p-3 rounded-lg border" placeholder="Category" />
              <input className="p-3 rounded-lg border" placeholder="Class" />
              <input className="p-3 rounded-lg border" placeholder="Age" />
              <input className="p-3 rounded-lg border" placeholder="Mobile Number" />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-8">
              <button className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:scale-105 transition">
                Upload via Excel
              </button>
              <button className="w-full sm:w-auto px-5 py-2 rounded-lg bg-green-500 text-white shadow-md hover:scale-105 transition">
                Submit
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mt-6 rounded-lg flex items-start gap-3 text-sm sm:text-base text-gray-800">
              <FaExclamationTriangle className="text-yellow-600 mt-1" />
              <p>
                Please insert your file in this format: <br />
                <b>name</b>, <b>father_name</b>, <b>mother_name</b>,{" "}
                <b>category</b>, <b>class</b>, <b>age</b>
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === "teacher" && (
          <motion.div
            key="teacher"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-lg max-w-3xl mx-auto w-full"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-5 text-gray-800 text-center sm:text-left">
              Add Teacher
            </h2>

            {/* Form Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input className="p-3 rounded-lg border" placeholder="First Name" />
              <input className="p-3 rounded-lg border" placeholder="Last Name" />
              <input className="p-3 rounded-lg border" placeholder="Mobile Number" />
              <input className="p-3 rounded-lg border" placeholder="Class Assign" />
              <input className="p-3 rounded-lg border" placeholder="Age" />
              <input className="p-3 rounded-lg border" placeholder="Subject Assign" />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-8">
              <button className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md hover:scale-105 transition">
                Upload via Excel
              </button>
              <button className="w-full sm:w-auto px-5 py-2 rounded-lg bg-green-500 text-white shadow-md hover:scale-105 transition">
                Submit
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mt-6 rounded-lg flex items-start gap-3 text-sm sm:text-base text-gray-800">
              <FaExclamationTriangle className="text-yellow-600 mt-1" />
              <p>
                Please insert your file in this format: <br />
                <b>name</b>, <b>skill</b>, <b>class assign</b>, <b>age</b>,{" "}
                <b>subject assign</b>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminAddSection;
