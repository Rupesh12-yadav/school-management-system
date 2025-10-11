import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";// eslint-disable-line

const MarkAttendance = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dummy students data
  const allStudents = {
    "1": [
      { id: 1, name: "Rohan Kumar" },
      { id: 2, name: "Anjali Singh" },
    ],
    "2": [
      { id: 3, name: "Aman Verma" },
      { id: 4, name: "Sanya Gupta" },
    ],
    // Add more classes as needed
  };

  useEffect(() => {
    if (selectedClass) {
      setLoading(true);
      setTimeout(() => {
        const classStudents = allStudents[selectedClass] || [];
        const studentsWithAttendance = classStudents.map((stu) => ({
          ...stu,
          attendance: "",
        }));
        setStudents(studentsWithAttendance);
        setLoading(false);
      }, 300);
    } else {
      setStudents([]);
    }
  }, [selectedClass]);

  const handleAttendanceChange = (id, value) => {
    setStudents((prev) =>
      prev.map((stu) =>
        stu.id === id ? { ...stu, attendance: value } : stu
      )
    );
  };

  const handleSave = () => {
    console.log("Saved Attendance:", students);
    alert("Attendance saved successfully!");
  };

  const handleRefresh = () => {
    setSelectedClass("");
    setStudents([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6"
    >
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Mark Attendance
        </h1>

        {/* Class Select */}
        <div className="flex justify-center mb-8">
          <label className="font-semibold text-gray-700 mr-4 self-center">
            Select Class:
          </label>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-green-400 focus:border-green-400"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">-- Select Class --</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Class {i + 1}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <p className="text-center text-gray-500 mb-4">Loading students...</p>
        )}

        {/* Students Table */}
        {students.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-xl shadow-lg bg-white">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700 font-medium">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-center text-gray-700 font-medium">
                    Class
                  </th>
                  <th className="px-6 py-3 text-center text-gray-700 font-medium">
                    Date
                  </th>
                  <th className="px-6 py-3 text-center text-gray-700 font-medium">
                    P
                  </th>
                  <th className="px-6 py-3 text-center text-gray-700 font-medium">
                    A
                  </th>
                  <th className="px-6 py-3 text-center text-gray-700 font-medium">
                    L
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {students.map((stu) => (
                  <tr
                    key={stu.id}
                    className="hover:bg-green-50 transition duration-200"
                  >
                    <td className="px-6 py-4 text-gray-800 font-medium">
                      {stu.name}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">
                      {selectedClass}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">
                      {new Date().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleAttendanceChange(stu.id, "P")}
                        className={`px-3 py-1 rounded-full font-semibold transition ${
                          stu.attendance === "P"
                            ? "bg-green-500 text-white"
                            : "bg-green-100 text-green-700 hover:bg-green-300"
                        }`}
                      >
                        P
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleAttendanceChange(stu.id, "A")}
                        className={`px-3 py-1 rounded-full font-semibold transition ${
                          stu.attendance === "A"
                            ? "bg-red-500 text-white"
                            : "bg-red-100 text-red-700 hover:bg-red-300"
                        }`}
                      >
                        A
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleAttendanceChange(stu.id, "L")}
                        className={`px-3 py-1 rounded-full font-semibold transition ${
                          stu.attendance === "L"
                            ? "bg-yellow-500 text-white"
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-300"
                        }`}
                      >
                        L
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Buttons */}
        {students.length > 0 && (
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={handleRefresh}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-xl transition"
            >
              Refresh
            </button>
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl transition"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MarkAttendance;
