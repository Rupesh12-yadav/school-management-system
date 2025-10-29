import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, CalendarDays, X } from "lucide-react";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // 🧠 Simulated API Data
    const mockData = [
      {
        id: 1,
        title: "Mid-Term Exam Schedule Released",
        author: "Admin",
        date: "2025-10-25",
        description:
          "The mid-term exam schedule has been uploaded. Please check the exam section for your respective subjects. Attendance is mandatory for all students.",
        image:
          "https://images.unsplash.com/photo-1559027615-5bdf7f3e3c55?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 2,
        title: "Holiday Notice: Diwali Break",
        author: "Principal Office",
        date: "2025-11-02",
        description:
          "School will remain closed from November 5 to November 10 due to Diwali holidays. Regular classes will resume on November 11.",
        image:
          "https://images.unsplash.com/photo-1606300050870-82cbbf0a2f3b?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 3,
        title: "Science Project Submission Date Extended",
        author: "Mr. Verma (Science Dept.)",
        date: "2025-10-28",
        description:
          "The submission deadline for the science model project has been extended to November 3. Make sure to attach your report files properly.",
        image:
          "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80",
      },
    ];
    setAnnouncements(mockData);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      {/* Header */}
      <motion.div
        className="flex items-center justify-center gap-3 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Megaphone className="text-blue-600 w-8 h-8" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
          📢 Announcements
        </h1>
      </motion.div>

      {/* Announcements List */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {announcements.map((notice, i) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all"
            onClick={() => setSelected(notice)}
          >
            <div className="relative">
              <img
                src={notice.image}
                alt={notice.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white text-sm flex items-center gap-2">
                <CalendarDays size={14} />
                {notice.date}
              </div>
            </div>

            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-800">
                {notice.title}
              </h2>
              <p className="text-gray-500 text-sm mt-1">By {notice.author}</p>
              <p className="text-gray-600 mt-3 line-clamp-3">
                {notice.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Full Announcement */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
            >
              <div className="relative">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-56 object-cover"
                />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selected.title}
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  {selected.author} • {selected.date}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {selected.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Announcements;
