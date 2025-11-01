import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Send, Eye, X } from "lucide-react";

const LeaveApply = () => {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
    file: null,
  });

  const [status, setStatus] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Pending");
    alert("✅ Leave Request Submitted Successfully!");
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex justify-center items-center p-6 overflow-hidden relative">

      {/* ✨ Floating Papers */}
      <AnimatePresence>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/80 w-6 h-8 rounded shadow-md border border-yellow-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: ["0%", "110%"] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity }}
          />
        ))}
      </AnimatePresence>

      {/* 🏫 Notebook Card */}
      <motion.div
        className="bg-white border-4 border-yellow-400 rounded-[2rem] shadow-xl p-8 w-full max-w-xl relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {/* Sticker */}
        <span className="absolute -top-6 left-6 text-4xl">📒</span>
        <span className="absolute -top-6 right-6 text-4xl">✏️</span>

        <h1 className="text-3xl font-extrabold text-yellow-600 text-center mb-6">
          🏫 School Leave Form
        </h1>

        {/* Dotted Paper Form */}
        <div className="border border-yellow-300 bg-yellow-50 p-5 rounded-xl shadow-inner">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* From Date */}
            <div>
              <label className="font-semibold text-gray-700">From Date</label>
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                className="w-full border border-yellow-400 p-2 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                required
              />
            </div>

            {/* To Date */}
            <div>
              <label className="font-semibold text-gray-700">To Date</label>
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                className="w-full border border-yellow-400 p-2 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                required
              />
            </div>

            {/* Reason */}
            <div>
              <label className="font-semibold text-gray-700">Reason</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Example: Fever / Family Function / Travel"
                rows="3"
                className="w-full border border-yellow-400 p-2 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                required
              ></textarea>
            </div>

            {/* File */}
            <div>
              <label className="font-semibold text-gray-700 flex gap-2 items-center">
                Upload Attachment <Upload className="w-5 h-5 text-yellow-600" />
              </label>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="w-full border border-yellow-300 p-2 rounded-lg"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center gap-4">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl flex gap-2 items-center font-semibold"
              >
                <Send className="w-5 h-5" /> Submit
              </button>

              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="bg-black text-white px-5 py-2 rounded-xl flex gap-2 items-center font-semibold"
              >
                <Eye className="w-5 h-5" /> Preview
              </button>
            </div>

            {status && <p className="text-yellow-700 font-bold text-center mt-4">Status: {status}</p>}
          </form>
        </div>
      </motion.div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white p-8 rounded-3xl border-4 border-yellow-400 shadow-xl w-11/12 max-w-md relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <button
                className="absolute right-4 top-4 text-red-500"
                onClick={() => setShowPreview(false)}
              >
                <X className="w-7 h-7" />
              </button>

              <h2 className="text-2xl font-bold text-yellow-600 text-center mb-4">📘 Preview</h2>

              <p><b>From:</b> {formData.fromDate}</p>
              <p><b>To:</b> {formData.toDate}</p>
              <p><b>Reason:</b> {formData.reason}</p>
              {formData.file && <p><b>File:</b> {formData.file.name}</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeaveApply;
