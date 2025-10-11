import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";// eslint-disable-line

const LeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaves = async () => {
      const dummyData = [
        { id: 1, student: "Aman Verma", className: "10th", date: "2025-10-12", reason: "Medical leave" },
        { id: 2, student: "Riya Sharma", className: "9th", date: "2025-10-12", reason: "Family emergency" },
        { id: 3, student: "Rahul Singh", className: "8th", date: "2025-10-12", reason: "Personal work" },
      ];
      setLeaves(dummyData);
      setLoading(false);
    };
    fetchLeaves();
  }, []);

  const handleOpenApplication = (leave) => setSelectedLeave(leave);
  const handleBack = () => setSelectedLeave(null);
  const handleConfirmLeave = (id) => {
    alert("Leave confirmed for ID: " + id);
    setLeaves(prev => prev.filter(l => l.id !== id));
    setSelectedLeave(null);
  };
  const handleCancelLeave = (id) => {
    alert("Leave cancelled for ID: " + id);
    setLeaves(prev => prev.filter(l => l.id !== id));
    setSelectedLeave(null);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading leaves...</div>;

  // Application view in proper school format
  if (selectedLeave) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex justify-center items-start pt-10"
      >
        <div className="bg-white shadow-xl rounded-2xl max-w-lg w-full p-8 text-gray-700">
          {/* Header */}
          <p className="text-left mb-6">To,</p>
          <p className="font-semibold mb-1">The Principal</p>
          <p className="mb-4">Your School Name</p>

          {/* Subject */}
          <p className="font-semibold mb-3">Subject: Leave Application</p>

          {/* Body */}
          <p className="mb-4">
            Respected Sir/Madam,
          </p>
          <p className="mb-4">
            I, <span className="font-semibold">{selectedLeave.student}</span>, of class <span className="font-semibold">{selectedLeave.className}</span>, would like to inform you that I am unable to attend school on <span className="font-semibold">{selectedLeave.date}</span> due to <span className="font-semibold">{selectedLeave.reason}</span>.
          </p>
          <p className="mb-4">
            Kindly grant me leave for the mentioned date.
          </p>

          {/* Closing */}
          <p className="mb-6">Thanking you,</p>
          <p className="font-semibold">From: {selectedLeave.student}</p>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => handleConfirmLeave(selectedLeave.id)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
            >
              Confirm Leave
            </button>
            <button
              onClick={() => handleCancelLeave(selectedLeave.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
            >
              Cancel Leave
            </button>
          </div>

          <button
            onClick={handleBack}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            &larr; Back
          </button>
        </div>
      </motion.div>
    );
  }

  // Leave list view
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Pending Leave Requests</h1>
        {leaves.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No pending leave requests.</p>
        ) : (
          <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-2 border text-left">Student</th>
                <th className="px-4 py-2 border text-left">Class</th>
                <th className="px-4 py-2 border text-left">Date</th>
                <th className="px-4 py-2 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-blue-50">
                  <td className="px-4 py-2 border">{leave.student}</td>
                  <td className="px-4 py-2 border">{leave.className}</td>
                  <td className="px-4 py-2 border">{leave.date}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleOpenApplication(leave)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-xl"
                    >
                      Open Application
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
};

export default LeaveRequests;
