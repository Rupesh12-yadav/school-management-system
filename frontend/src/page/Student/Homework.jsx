import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Homework = () => {
  const [selectedHomework, setSelectedHomework] = useState(null);

  // 🔹 Sample Homework Data
  const homeworkData = [
    {
      id: 1,
      subject: "Mathematics",
      teacher: "Mr. Sharma",
      date: "2025-10-25",
      file: "/files/math-homework.pdf",
      description:
        "Complete the exercises from Chapter 5: Linear Equations (page 85–92). Submit by next Monday.",
    },
    {
      id: 2,
      subject: "English",
      teacher: "Ms. Gupta",
      date: "2025-10-26",
      file: "/files/english-essay.pdf",
      description:
        "Write a short essay on 'The Importance of Reading'. Minimum 300 words.",
    },
    {
      id: 3,
      subject: "Science",
      teacher: "Mr. Verma",
      date: "2025-10-28",
      file: "/files/science-lab.pdf",
      description:
        "Prepare the lab report for Experiment 4: Chemical Reactions. Include diagrams.",
    },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans">
      {/* ✨ Floating Background Animation */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute bg-blue-200 rounded-full opacity-40"
            style={{
              width: Math.random() * 40 + 20,
              height: Math.random() * 40 + 20,
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-8 text-blue-700 text-center drop-shadow-md">
          📝 Assigned Homework
        </h2>

        {/* Homework Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-2xl backdrop-blur-sm border border-blue-100">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-600 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Teacher</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">File</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {homeworkData.map((hw) => (
                <motion.tr
                  key={hw.id}
                  whileHover={{ scale: 1.02, backgroundColor: "#E0F2FE" }}
                  transition={{ duration: 0.2 }}
                  className="border-b hover:cursor-pointer"
                >
                  <td className="px-4 py-3">{hw.subject}</td>
                  <td className="px-4 py-3">{hw.teacher}</td>
                  <td className="px-4 py-3">{hw.date}</td>
                  <td className="px-4 py-3">
                    <a
                      href={hw.file}
                      download
                      className="text-blue-600 hover:underline"
                    >
                      📎 Download
                    </a>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelectedHomework(hw)}
                      className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔹 Animated Modal */}
      <AnimatePresence>
        {selectedHomework && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedHomework(null)}
          >
            <motion.div
              className="bg-white w-96 rounded-2xl shadow-2xl p-6 relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {selectedHomework.subject}
              </h3>
              <p className="text-gray-700 mb-1">
                <strong>Teacher:</strong> {selectedHomework.teacher}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Date:</strong> {selectedHomework.date}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Description:</strong> {selectedHomework.description}
              </p>

              <a
                href={selectedHomework.file}
                download
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                📎 Download File
              </a>

              <button
                onClick={() => setSelectedHomework(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-lg"
              >
                ✖
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Homework;
