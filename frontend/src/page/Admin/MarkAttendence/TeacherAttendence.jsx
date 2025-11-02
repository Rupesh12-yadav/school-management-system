// 📁 src/components/Attendence/TeacherAttendance.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";// eslint-disable-line

export default function TeacherAttendance({ goBack }) {
  const teachers = [
    { id: 1, name: "Mr. Sharma" },
    { id: 2, name: "Mrs. Gupta" },
    { id: 3, name: "Mr. Singh" },
  ];

  const [attendance, setAttendance] = useState({});

  const handleMark = (id, status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <button
        onClick={goBack}
        className="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Teacher Attendance</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-100">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-center">Mark Attendance</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <motion.tr
              key={teacher.id}
              whileHover={{ scale: 1.02 }}
              className="border-b"
            >
              <td className="p-3">{teacher.name}</td>
              <td className="p-3 text-center space-x-3">
                {["Present", "Absent", "Leave"].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleMark(teacher.id, status)}
                    className={`px-3 py-1 rounded-lg ${
                      attendance[teacher.id] === status
                        ? status === "Present"
                          ? "bg-green-500 text-white"
                          : status === "Absent"
                          ? "bg-red-500 text-white"
                          : "bg-yellow-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
