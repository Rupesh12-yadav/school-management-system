import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line

const AdminNoticeBoard = () => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [date] = useState(new Date().toLocaleDateString());
  const [notices, setNotices] = useState([]);
  const [editId, setEditId] = useState(null);
  const [previewNotice, setPreviewNotice] = useState(null); // 👈 For modal preview

  // Express backend base URL
  const API_URL = "http://localhost:5000/api/notice";

  // Fetch notices from MongoDB
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setNotices(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch notices");
    }
  };

  // Create / Update Notice
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!heading || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${API_URL}/${editId}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heading, description, date }),
      });

      const data = await res.json();
      alert(data.message || "Notice saved successfully!");

      setHeading("");
      setDescription("");
      setEditId(null);
      fetchNotices();
    } catch (error) {
      console.error(error);
      alert("Error saving notice");
    }
  };

  // Delete Notice
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to delete this notice permanently?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const data = await res.json();
      alert(data.message || "Notice deleted successfully");
      fetchNotices();
    } catch (error) {
      console.error(error);
      alert("Error deleting notice");
    }
  };

  // Edit Notice
  const handleEdit = (notice) => {
    setHeading(notice.heading);
    setDescription(notice.description);
    setEditId(notice._id);
  };

  // Modal Close
  const closePreview = () => setPreviewNotice(null);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl mb-10">
        <h1 className="text-2xl font-bold text-center mb-4">
          🏫 Admin Notice Board
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Notice Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <textarea
            placeholder="Notice Description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          ></textarea>

          <div className="text-sm text-gray-600">📅 Date: {date}</div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition transform hover:scale-105"
          >
            {editId ? "Update Notice" : "Create Notice"}
          </button>
        </form>
      </div>

      {/* 📋 All Notices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {notices.map((notice) => (
          <div
            key={notice._id}
            className="bg-white p-5 shadow-md rounded-lg border-l-4 border-blue-500 hover:shadow-lg transition"
          >
            <p className="text-sm text-gray-500">{notice.date}</p>
            <h2 className="text-lg font-bold text-gray-800 mt-1 mb-2">
              {notice.heading}
            </h2>
            <p className="text-gray-700 text-sm line-clamp-3 mb-4">
              {notice.description}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setPreviewNotice(notice)} // 👈 Preview button
                className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm"
              >
                Preview
              </button>
              <button
                onClick={() => handleEdit(notice)}
                className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(notice._id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔍 Notice Preview Modal */}
      <AnimatePresence>
        {previewNotice && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-lg w-full p-8 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {/* Close Button */}
              <button
                onClick={closePreview}
                className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg font-bold"
              >
                ✖
              </button>

              <h3 className="text-center font-semibold text-lg mb-2">
                Delhi Public School
              </h3>
              <p className="text-center text-sm text-gray-600 mb-1">
                Kamptee road, Nagpur
              </p>
              <h4 className="text-center font-bold mt-3 underline">NOTICE</h4>
              <p className="text-right text-gray-600 mt-4 mb-4">
                {previewNotice.date}
              </p>
              <h2 className="font-bold mb-2">
                {previewNotice.heading}
              </h2>
              <p className="text-gray-700 mb-6">{previewNotice.description}</p>
              <div className="mt-6 text-sm">
                <p>Head boy/Head girl’s signature</p>
                <p>Head boy / Head girl</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminNoticeBoard;
