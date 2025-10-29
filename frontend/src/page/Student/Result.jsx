import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiEye, FiX } from "react-icons/fi";
import confetti from "canvas-confetti";

export default function Results() {
  const [showPreview, setShowPreview] = useState(false);

  const results = [
    { subject: "Mathematics", marks: 92, total: 100 },
    { subject: "Science", marks: 87, total: 100 },
    { subject: "English", marks: 79, total: 100 },
    { subject: "History", marks: 85, total: 100 },
    { subject: "Computer Science", marks: 95, total: 100 },
  ];

  const totalMarks = results.reduce((sum, r) => sum + r.marks, 0);
  const overallPercentage = (totalMarks / (results.length * 100)) * 100;

  // 🎉 Trigger confetti when opening modal
  const handleViewResult = () => {
    setShowPreview(true);
    setTimeout(() => {
      confetti({
        particleCount: 500,
        spread: 80,
        origin: { y: 0.9 },
        colors: ["#00b4d8", "#90e0ef", "#caf0f8", "#ffd60a", "#ff006e"],
      });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Student Results</h1>
            <p className="text-slate-500 mt-1 text-sm">
              View your performance and download your report card.
            </p>
          </div>

          <div className="flex gap-3 mt-4 sm:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleViewResult}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md"
            >
              <FiEye /> View Result
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => alert("PDF Download Feature Coming Soon 🚀")}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl shadow-md"
            >
              <FiDownload /> Download PDF
            </motion.button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="hidden md:grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-blue-50 to-white border-b">
            <div className="text-sm font-semibold text-slate-600">Subject</div>
            <div className="text-sm font-semibold text-slate-600">Marks Obtained</div>
            <div className="text-sm font-semibold text-slate-600">Total Marks</div>
          </div>

          {results.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-b last:border-none"
            >
              <div className="font-medium text-slate-800">{r.subject}</div>
              <div className="text-blue-600 font-semibold">{r.marks}</div>
              <div className="text-slate-600">{r.total}</div>
            </motion.div>
          ))}

          <div className="p-4 bg-blue-50 flex justify-between items-center">
            <div className="text-slate-700 font-semibold">Overall Percentage:</div>
            <div className="text-xl font-bold text-blue-700">
              {overallPercentage.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 Live Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40"
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden relative"
            >
              {/* ✨ Floating sparkles animation background */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="absolute w-3 h-3 bg-yellow-400 rounded-full top-8 left-10 animate-ping" />
                <div className="absolute w-3 h-3 bg-pink-400 rounded-full top-20 right-10 animate-bounce" />
                <div className="absolute w-2 h-2 bg-blue-400 rounded-full bottom-10 left-1/2 animate-pulse" />
              </motion.div>

              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold text-slate-800">🎉 Report Card Preview</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Student Name: <span className="font-normal">Rupesh Yadav</span>
                  </h3>
                  <p className="text-slate-500 text-sm">Class: BCA Final Year</p>
                  <p className="text-slate-500 text-sm">Session: 2025</p>
                </div>

                <div className="overflow-x-auto mt-4">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-blue-100 text-slate-700">
                        <th className="py-2 px-4 text-left">Subject</th>
                        <th className="py-2 px-4 text-center">Marks</th>
                        <th className="py-2 px-4 text-center">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r, i) => (
                        <tr key={i} className="border-b">
                          <td className="py-2 px-4">{r.subject}</td>
                          <td className="py-2 px-4 text-center font-semibold text-blue-600">
                            {r.marks}
                          </td>
                          <td className="py-2 px-4 text-center">{r.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-center mt-4">
                  <p className="text-slate-700 font-semibold">
                    Overall Percentage:{" "}
                    <span className="text-blue-700 text-lg">
                      {overallPercentage.toFixed(2)}%
                    </span>
                  </p>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <p className="text-sm text-slate-500">Signature: ___________________</p>
                  <button
                    onClick={() => alert("Downloading PDF...")}
                    className="bg-green-600 text-white px-4 py-2 rounded-xl shadow-md"
                  >
                    <FiDownload className="inline mr-1" /> Download PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
