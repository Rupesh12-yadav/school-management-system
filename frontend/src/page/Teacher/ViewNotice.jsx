import React, { useState } from "react";
import { motion } from "framer-motion";// eslint-disable-line
import { ArrowLeft, Bell } from "lucide-react";

const ViewNotice = () => {
  // 🟢 Dummy data for testing
  const dummyNotices = [
    {
      _id: "1",
      title: "School Annual Function",
      description: "School annual function will be held on 25th October. All students must attend.",
      image: "https://via.placeholder.com/400x200.png?text=Annual+Function",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      title: "Holiday Announcement",
      description: "School will remain closed on 2nd November due to public holiday.",
      image: "https://via.placeholder.com/400x200.png?text=Holiday",
      createdAt: new Date(Date.now() - 86400000).toISOString(), // yesterday
    },
    {
      _id: "3",
      title: "New Library Books",
      description: "New books have arrived in the library. Students are encouraged to check them out.",
      image: "",
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
    },
  ];

  const [notices] = useState(dummyNotices); // use dummy data
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [loading] = useState(false); // no need to wait for API

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
  };

  const handleBack = () => {
    setSelectedNotice(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading notices...
      </div>
    );
  }

  if (selectedNotice) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-6"
      >
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
              <Bell className="w-6 h-6 text-blue-600" /> Notice Details
            </h1>
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
            >
              <ArrowLeft size={18} /> Back
            </button>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            {selectedNotice.title}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {selectedNotice.description}
          </p>
          {selectedNotice.image && (
            <img
              src={selectedNotice.image}
              alt="Notice"
              className="rounded-xl w-full max-h-80 object-contain border"
            />
          )}
          <div className="text-sm text-gray-500 mt-3">
            Posted on: {new Date(selectedNotice.createdAt).toLocaleDateString()}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-6"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="text-blue-600 w-7 h-7" />
          <h1 className="text-2xl font-bold text-blue-700">School Notices</h1>
        </div>

        {notices.length > 0 && (
          <div
            onClick={() => handleNoticeClick(notices[0])}
            className="cursor-pointer bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-sm mb-8 hover:bg-blue-100 transition"
          >
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              📢 Latest Notice:
            </h2>
            <p className="text-gray-700 font-medium">{notices[0].title}</p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(notices[0].createdAt).toLocaleDateString()}
            </p>
          </div>
        )}

        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Previous Notices:
        </h3>
        <ul className="space-y-3">
          {notices.slice(1).map((notice) => (
            <li
              key={notice._id}
              onClick={() => handleNoticeClick(notice)}
              className="p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition flex justify-between items-center"
            >
              <span className="font-medium text-gray-700">{notice.title}</span>
              <span className="text-sm text-gray-500">
                {new Date(notice.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ViewNotice;
