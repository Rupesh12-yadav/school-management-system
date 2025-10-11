import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";// eslint-disable-line

// Dummy subjects
const subjects = ["MATHS", "SCIENCE", "ENGLISH", "SOCIAL-SCIENCE", "HINDI"];

const MarksUpload = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [marksData, setMarksData] = useState({});
  const [activeStudent, setActiveStudent] = useState(null);
  const [activeSubject, setActiveSubject] = useState("");
  const [currentMark, setCurrentMark] = useState("");
  const [examInfo, setExamInfo] = useState({}); // {totalMarks: 100}

  // Dummy classes & students
  const classes = ["6th", "7th", "8th", "9th", "10th"];
  const dummyStudents = {
    "6th": [
      { id: 1, name: "Aman Verma" },
      { id: 2, name: "Riya Sharma" }
    ],
    "7th": [
      { id: 3, name: "Rahul Singh" },
      { id: 4, name: "Priya Patel" }
    ]
  };

  // Simulate fetching exam info from backend
  useEffect(() => {
    if (selectedClass) {
      setStudents(dummyStudents[selectedClass] || []);
      setMarksData({}); // reset
      setExamInfo({ totalMarks: 100 }); // Example: exam total marks
    }
  }, [selectedClass]);

  const handleOpenMarks = (student) => {
    setActiveStudent(student);
    setActiveSubject("");
    setCurrentMark("");
  };

  const handleSaveSubjectMark = () => {
    const markNum = Number(currentMark);
    if (!activeSubject || currentMark === "") return alert("Select subject & enter marks");
    if (markNum < 0 || markNum > examInfo.totalMarks)
      return alert(`Marks should be between 0 and ${examInfo.totalMarks}`);
    
    setMarksData(prev => ({
      ...prev,
      [activeStudent.id]: {
        ...prev[activeStudent.id],
        [activeSubject]: markNum
      }
    }));
    setCurrentMark("");
    setActiveSubject("");
  };

  const handleEditMark = (studentId, subject) => {
    setActiveStudent(students.find(s => s.id === studentId));
    setActiveSubject(subject);
    setCurrentMark(marksData[studentId][subject]);
  };

  const handleRemoveMark = (studentId, subject) => {
    setMarksData(prev => {
      const updated = { ...prev };
      delete updated[studentId][subject];
      return updated;
    });
  };

  const handleUploadAll = () => {
    console.log("Uploading marks:", marksData);
    alert("Marks uploaded successfully!");
    setActiveStudent(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6"
    >
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Upload Student Marks</h1>

        {/* Class dropdown */}
        <div className="mb-6">
          <label className="font-semibold mr-3">Select Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">--Select Class--</option>
            {classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Student List */}
        {students.length > 0 && (
          <table className="min-w-full border border-gray-200 rounded-xl mb-6">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-2 border">Student Name</th>
                <th className="px-4 py-2 border text-center">Status</th>
                <th className="px-4 py-2 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} className="hover:bg-blue-50">
                  <td className="px-4 py-2 border">{student.name}</td>
                  <td className="px-4 py-2 border text-center">
                    {marksData[student.id] ? "Uploaded" : "Pending"}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleOpenMarks(student)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-xl"
                    >
                      {marksData[student.id] ? "View / Edit" : "Upload Marks"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Marks Entry Section */}
        {activeStudent && (
          <div className="bg-gray-50 p-4 rounded-xl mb-6">
            <h2 className="font-semibold text-gray-700 mb-3">Marks for: {activeStudent.name}</h2>

            <p className="mb-2 text-gray-600">Total marks for exam: {examInfo.totalMarks}</p>

            <div className="mb-3">
              {subjects.map(sub => (
                <label key={sub} className="mr-4 font-medium text-gray-700">
                  <input
                    type="radio"
                    name="subject"
                    value={sub}
                    checked={activeSubject === sub}
                    onChange={() => setActiveSubject(sub)}
                    className="mr-1"
                  />
                  {sub}
                </label>
              ))}
            </div>

            {activeSubject && (
              <div className="flex gap-3 mb-3 items-center">
                <input
                  type="number"
                  placeholder={`Enter marks for ${activeSubject}`}
                  value={currentMark}
                  onChange={(e) => setCurrentMark(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-32"
                />
                <button
                  onClick={handleSaveSubjectMark}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
                >
                  Done
                </button>
              </div>
            )}

            {marksData[activeStudent.id] && (
              <div className="mt-3">
                <h3 className="font-semibold text-gray-700">Entered Marks:</h3>
                <ul>
                  {Object.entries(marksData[activeStudent.id]).map(([subject, mark]) => (
                    <li key={subject} className="flex justify-between items-center">
                      {subject}: {mark}
                      <div className="flex gap-2">
                        <button onClick={() => handleEditMark(activeStudent.id, subject)} className="text-blue-600">Edit</button>
                        <button onClick={() => handleRemoveMark(activeStudent.id, subject)} className="text-red-600">Remove</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Preview Table */}
        {Object.keys(marksData).length > 0 && (
          <div className="mb-6">
            <h2 className="font-semibold text-gray-700 mb-3">Preview Marks</h2>
            <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-2 border">Student</th>
                  {subjects.map(sub => <th key={sub} className="px-4 py-2 border">{sub}</th>)}
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id} className="hover:bg-blue-50">
                    <td className="px-4 py-2 border">{s.name}</td>
                    {subjects.map(sub => (
                      <td key={sub} className="px-4 py-2 border text-center">
                        {marksData[s.id]?.[sub] || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Upload All Button */}
        {Object.keys(marksData).length > 0 && (
          <div className="flex justify-end">
            <button
              onClick={handleUploadAll}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold"
            >
              Upload Marks
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MarksUpload;
