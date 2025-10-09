import React, { useState } from "react";
import { motion } from "framer-motion";// eslint-disable-line

const ManageHolidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
  });

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.date) {
      alert("Please fill all fields!");
      return;
    }

    const newHoliday = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      date: form.date,
    };

    setHolidays((prev) => [...prev, newHoliday]);
    setForm({ title: "", description: "", date: "" });
  };

  // delete holiday
  const handleDelete = (id) => {
    setHolidays((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Heading */}
      <h2 className="text-xl md:text-2xl font-semibold text-purple-700">
        Manage Holidays
      </h2>

      {/* Add Holiday Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-inner space-y-4"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1">Holiday Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter holiday title"
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter holiday description"
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Add Holiday
        </button>
      </form>

      {/* Holiday List */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Holiday List</h3>
        {holidays.length === 0 ? (
          <p className="text-gray-500">No holidays added yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {holidays.map((holiday) => (
              <li
                key={holiday.id}
                className="py-3 flex justify-between items-start"
              >
                <div>
                  <h4 className="font-semibold text-gray-800">{holiday.title}</h4>
                  <p className="text-gray-600 text-sm">{holiday.description}</p>
                  <p className="text-purple-600 text-sm mt-1">
                    📅 {new Date(holiday.date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(holiday.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default ManageHolidays;
