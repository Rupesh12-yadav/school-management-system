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
    alert("Leave Request Submitted Successfully ✅");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">

      {/* 🌿 Floating Papers Animation */}
      <AnimatePresence>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/70 w-6 h-8 rounded shadow-md"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: ["0%", "110%"],
              opacity: [0, 1, 0],
              rotate: [0, 45, -30],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* 💚 Main Card */}
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-center text-emerald-700 mb-6">
          🪷 Leave Application
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Reason
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Enter reason for leave..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Upload File (optional)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <Upload className="w-5 h-5 text-emerald-600" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition"
            >
              <Send className="w-5 h-5" />
              Submit Request
            </button>

            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Eye className="w-5 h-5" />
              Live Preview
            </button>
          </div>

          {status && (
            <p className="text-center mt-4 font-semibold text-yellow-600">
              Status: {status}
            </p>
          )}
        </form>
      </motion.div>

      {/* 🌸 Calm Bloom Live Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl w-11/12 max-w-md p-8 relative overflow-hidden"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { type: "spring", stiffness: 80 },
              }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* Soft Glow Border */}
              <motion.div
                className="absolute inset-0 rounded-3xl border-2 border-emerald-300"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              ></motion.div>

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500 z-10"
                onClick={() => setShowPreview(false)}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Content */}
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-center text-emerald-700 mb-6">
                  🌸 Leave Preview
                </h2>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4 shadow-inner">
                  <p className="text-gray-700 font-semibold">
                    From Date:{" "}
                    <span className="text-emerald-700">
                      {formData.fromDate || "Not selected"}
                    </span>
                  </p>
                  <p className="text-gray-700 font-semibold">
                    To Date:{" "}
                    <span className="text-emerald-700">
                      {formData.toDate || "Not selected"}
                    </span>
                  </p>
                  <p className="text-gray-700 font-semibold">
                    Reason:{" "}
                    <span className="text-emerald-700">
                      {formData.reason || "No reason entered"}
                    </span>
                  </p>
                  {formData.file && (
                    <div className="mt-3">
                      <p className="text-gray-700 font-semibold">Attached File:</p>
                      <p className="text-sm text-gray-600 italic">
                        {formData.file.name}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <h3 className="text-lg font-semibold text-emerald-700">
                    Status: {status || "Not Submitted"}
                  </h3>
                  <p className="text-gray-600 text-sm italic">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeaveApply;
