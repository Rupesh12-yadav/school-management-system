import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";// eslint-disable-line
import * as XLSX from "xlsx"; // npm install xlsx

const ManageStudents = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      firstname: "Aman",
      lastname: "Verma",
      email: "aman@gmail.com",
      password: "1234",
      mobile: "9876543210",
      roll: "01",
      class: "10th",
    },
    {
      id: 2,
      firstname: "Priya",
      lastname: "Sharma",
      email: "priya@gmail.com",
      password: "abcd",
      mobile: "9876500000",
      roll: "02",
      class: "9th",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // new states for filter and search
  const [selectedClass, setSelectedClass] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fileInputRef = useRef();

  // ✅ Open file dialog
  const handleAddStudentExcel = () => {
    fileInputRef.current.click();
  };

  // ✅ Handle file selection
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate only Excel files
    const validExtensions = ["xlsx", "xls"];
    const fileExtension = file.name.split(".").pop();
    if (!validExtensions.includes(fileExtension)) {
      alert("Please select a valid Excel file (.xls or .xlsx)");
      return;
    }

    // Read Excel file
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      // Add unique ID to each student
      const newStudents = jsonData.map((s) => ({ ...s, id: Date.now() + Math.random() }));
      setStudents((prev) => [...prev, ...newStudents]);
    };
    reader.readAsBinaryString(file);
  };

  const openModal = (type, student = null) => {
    setModalType(type);
    setSelectedStudent(student);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
    setModalType("");
  };

  const handleDelete = () => {
    setStudents(students.filter((s) => s.id !== selectedStudent.id));
    closeModal();
  };

  // ✅ Search logic (only on button click)
  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  // ✅ Filtered and searched list
  const filteredStudents = students.filter((s) => {
    const matchesClass = selectedClass === "All" || s.class === selectedClass;
    const matchesSearch = `${s.firstname} ${s.lastname}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  // ✅ Unique class list for dropdown
  const classList = ["All", ...new Set(students.map((s) => s.class))];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Manage Students</h2>
        <button
          onClick={handleAddStudentExcel}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          + Add Student with Excel
        </button>
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".xlsx,.xls"
          className="hidden"
        />
      </div>

      {/* 🔍 Filter + Search Section */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <select
          className="border border-gray-400 rounded-lg p-2"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          {classList.map((cls) => (
            <option key={cls} value={cls}>
              {cls === "All" ? "All Classes" : cls}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by student name..."
          className="border border-gray-400 rounded-lg p-2 flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          Search
        </button>
      </div>

      {/* Student Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 rounded-2xl shadow-md"
      >
        {filteredStudents.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="p-3 text-left">First Name</th>
                <th className="p-3 text-left">Last Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Class</th>
                <th className="p-3 text-left">Roll</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr
                  key={s.id}
                  className="border-b hover:bg-slate-100 transition-all duration-200"
                >
                  <td className="p-3">{s.firstname}</td>
                  <td className="p-3">{s.lastname}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{s.class}</td>
                  <td className="p-3">{s.roll}</td>
                  <td className="p-3">{s.mobile}</td>
                  <td className="p-3 text-center">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm mr-2 px-3 py-1 rounded"
                      onClick={() => openModal("view", s)}
                    >
                      View
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
                      onClick={() => openModal("delete", s)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 p-4">
            No students found for this class or search query.
          </p>
        )}
      </motion.div>

      {/* 🔽 Modal Section */}
      <AnimatePresence>
        {showModal && modalType === "view" && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 w-[400px]"
            >
              <h3 className="text-xl font-semibold mb-4 text-slate-700">
                Student Details
              </h3>
              <p>
                <strong>Name:</strong> {selectedStudent.firstname}{" "}
                {selectedStudent.lastname}
              </p>
              <p>
                <strong>Email:</strong> {selectedStudent.email}
              </p>
              <p>
                <strong>Class:</strong> {selectedStudent.class}
              </p>
              <p>
                <strong>Roll:</strong> {selectedStudent.roll}
              </p>
              <p>
                <strong>Mobile:</strong> {selectedStudent.mobile}
              </p>
              <div className="text-right mt-4">
                <button
                  onClick={closeModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showModal && modalType === "delete" && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 w-[400px]"
            >
              <h3 className="text-xl font-semibold mb-4 text-slate-700">
                Confirm Delete
              </h3>
              <p>
                Are you sure you want to delete{" "}
                <strong>
                  {selectedStudent.firstname} {selectedStudent.lastname}
                </strong>
                ?
              </p>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-black hover:bg-gray-400 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageStudents;
