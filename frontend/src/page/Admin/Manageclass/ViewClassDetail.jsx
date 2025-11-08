import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line

const initialClasses = [
  { id: 1, name: "1st", teacher: "Mr. Sharma", totalStudents: 30 },
  { id: 2, name: "2nd", teacher: "Mrs. Meena", totalStudents: 28 },
  { id: 3, name: "3rd", teacher: "Mr. Arjun", totalStudents: 32 },
  { id: 4, name: "4th", teacher: "Ms. Neha", totalStudents: 27 },
  { id: 5, name: "5th", teacher: "Mr. Raj", totalStudents: 35 },
];

const initialClassDetails = {
  teacher: "Mr. Verma",
  subjects: ["Maths", "Science", "English", "Hindi"],
  students: [
    { name: "Aditi Sharma", roll: "01", attendance: "95%" },
    { name: "Rohan Kumar", roll: "02", attendance: "88%" },
    { name: "Priya Singh", roll: "03", attendance: "92%" },
    { name: "Vikas Yadav", roll: "04", attendance: "85%" },
    { name: "Simran Kaur", roll: "05", attendance: "90%" },
  ],
  totalAttendance: "91%",
};

const ManageClasses = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [classes, setClasses] = useState(initialClasses);

  const handleRowClick = (e, cls) => {
    if (e.target.nodeName === "BUTTON") return;
    setSelectedClass(cls);
  };

  const handleEdit = (cls) => {
    alert(`Edit feature for "${cls.name}" coming soon.`);
  };

  const handleDelete = (cls) => {
    if (window.confirm(`Delete "${cls.name}"?`)) {
      setClasses(classes.filter((c) => c.id !== cls.id));
      if (selectedClass?.id === cls.id) setSelectedClass(null);
    }
  };

  return (
    <div className="min-h-screen  p-6 flex justify-center">
      <motion.div
        className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-5xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {!selectedClass ? (
            <motion.div
              key="classList"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                🏫 Manage Classes
              </h1>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition">
                ➕ Add Class
              </button>
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-center rounded-lg overflow-hidden">
                  <thead style={{background:"var(--gradient-yellow)"}}>
                    <tr>
                      <th className="py-2 px-4">Class</th>
                      <th className="py-2 px-4">Class Teacher</th>
                      <th className="py-2 px-4">Total Students</th>
                      <th className="py-2 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-gray-700">
                    {classes.map((cls) => (
                      <tr
                        key={cls.id}
                        className="border-b hover:bg-slate-100 transition cursor-pointer"
                        onClick={(e) => handleRowClick(e, cls)}
                      >
                        <td className="py-2 px-4 font-semibold text-slate-800">
                          {cls.name}
                        </td>
                        <td className="py-2 px-4">{cls.teacher}</td>
                        <td className="py-2 px-4">{cls.totalStudents}</td>
                        <td className="py-2 px-4 flex justify-center gap-3">
                          <button
                            className="text-blue-600 hover:scale-110 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedClass(cls);
                            }}
                          >
                            👁️
                          </button>
                          <button
                            className="text-green-600 hover:scale-110 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(cls);
                            }}
                          >
                            ✏️
                          </button>
                          <button
                            className="text-red-600 hover:scale-110 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(cls);
                            }}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="classDetails"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <h1 className="text-2xl font-bold text-slate-800 mb-4">
                🏫 Class: {selectedClass.name}
              </h1>
              <p className="text-lg mb-2">
                👨‍🏫 <b>Class Teacher:</b> {initialClassDetails.teacher}
              </p>
              <p className="text-lg mb-4">
                📚 <b>Subjects:</b> {initialClassDetails.subjects.join(", ")}
              </p>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-slate-800">
                  👥 Students List (with attendance %)
                </h2>
              </div>
              <table className="min-w-full border border-gray-300 text-center rounded-lg overflow-hidden">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Roll No</th>
                    <th className="py-2 px-4">Attendance %</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-gray-700">
                  {initialClassDetails.students.map((s, i) => (
                    <tr key={i} className="border-b hover:bg-slate-100">
                      <td className="py-2 px-4 font-medium">{s.name}</td>
                      <td className="py-2 px-4">{s.roll}</td>
                      <td className="py-2 px-4">{s.attendance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-lg font-semibold text-slate-800">
                📊 Total Attendance: {initialClassDetails.totalAttendance}
              </p>
              <button
                onClick={() => setSelectedClass(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition mt-6"
              >
                ⬅️ Back
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ManageClasses;
