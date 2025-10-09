import React, { useState } from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaTrashAlt } from "react-icons/fa";

const DeleteUser = () => {
  // State Management
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");

  // Delete Student Handler
  const handleDeleteStudent = async () => {
    if (!studentEmail || !studentPassword) {
      alert("Please fill all student fields before deleting.");
      return;
    }
    if (!window.confirm("⚠️ This will permanently delete the student record. Continue?")) return;

    try {
      const res = await fetch("http://localhost:5000/api/delete/student", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: studentEmail, password: studentPassword }),
      });
      const data = await res.json();
      alert(data.message || "Student deleted successfully!");
      setStudentEmail("");
      setStudentPassword("");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Error deleting student!");
    }
  };

  // Delete Teacher Handler
  const handleDeleteTeacher = async () => {
    if (!teacherEmail || !teacherPassword) {
      alert("Please fill all teacher fields before deleting.");
      return;
    }
    if (!window.confirm("⚠️ This will permanently delete the teacher record. Continue?")) return;

    try {
      const res = await fetch("http://localhost:5000/api/delete/teacher", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: teacherEmail, password: teacherPassword }),
      });
      const data = await res.json();
      alert(data.message || "Teacher deleted successfully!");
      setTeacherEmail("");
      setTeacherPassword("");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Error deleting teacher!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        
        {/* 🔴 Delete Student Card */}
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <div className="flex items-center gap-3 mb-5">
            <FaUserGraduate className="text-red-500 text-2xl" />
            <h2 className="text-xl font-bold text-gray-800">Delete Student</h2>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter Student Email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            />
            <input
              type="password"
              placeholder="Enter Student Password"
              value={studentPassword}
              onChange={(e) => setStudentPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            />

            <button
              onClick={handleDeleteStudent}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition transform hover:scale-105"
            >
              <FaTrashAlt /> Delete Student
            </button>
          </div>
        </div>

        {/* 🟣 Delete Teacher Card */}
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <div className="flex items-center gap-3 mb-5">
            <FaChalkboardTeacher className="text-purple-500 text-2xl" />
            <h2 className="text-xl font-bold text-gray-800">Delete Teacher</h2>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter Teacher Email"
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            />
            <input
              type="password"
              placeholder="Enter Teacher Password"
              value={teacherPassword}
              onChange={(e) => setTeacherPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            />

            <button
              onClick={handleDeleteTeacher}
              className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition transform hover:scale-105"
            >
              <FaTrashAlt /> Delete Teacher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
