import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Ravi Kumar",
      subject: "Mathematics",
      email: "ravi@school.com",
      contact: "9876543210",
      assignedClass: "10th A",
    },
    {
      id: 2,
      name: "Neha Sharma",
      subject: "English",
      email: "neha@school.com",
      contact: "9876500000",
      assignedClass: "9th B",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    contact: "",
    assignedClass: "",
  });

  const openModal = (type, teacher = null) => {
    setModalType(type);
    setSelectedTeacher(teacher);
    if (teacher) setFormData(teacher);
    else
      setFormData({
        name: "",
        subject: "",
        email: "",
        contact: "",
        assignedClass: "",
      });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTeacher(null);
    setModalType("");
  };

  const handleSave = () => {
    if (modalType === "add") {
      const newTeacher = { ...formData, id: Date.now() };
      setTeachers([...teachers, newTeacher]);
    } else if (modalType === "edit") {
      setTeachers(
        teachers.map((t) =>
          t.id === selectedTeacher.id ? { ...t, ...formData } : t
        )
      );
    }
    closeModal();
  };

  const handleDelete = () => {
    setTeachers(teachers.filter((t) => t.id !== selectedTeacher.id));
    closeModal();
  };

  const handleAssignClass = () => {
    setTeachers(
      teachers.map((t) =>
        t.id === selectedTeacher.id
          ? { ...t, assignedClass: formData.assignedClass }
          : t
      )
    );
    closeModal();
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          👨‍🏫 Manage Teachers
        </h2>
        <button
          onClick={() => openModal("add")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-200"
        >
          ➕ Add Teacher
        </button>
      </div>

      {/* Table Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
      >
        {teachers.length > 0 ? (
          <table className="min-w-full border-collapse">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="p-4 text-left font-medium">Name</th>
                <th className="p-4 text-left font-medium">Subject</th>
                <th className="p-4 text-left font-medium">Email</th>
                <th className="p-4 text-left font-medium">Contact</th>
                <th className="p-4 text-left font-medium">Assigned Class</th>
                <th className="p-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t, index) => (
                <tr
                  key={t.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition-all duration-200`}
                >
                  <td className="p-4 text-gray-700 font-medium">{t.name}</td>
                  <td className="p-4 text-gray-600">{t.subject}</td>
                  <td className="p-4 text-gray-600">{t.email}</td>
                  <td className="p-4 text-gray-600">{t.contact}</td>
                  <td className="p-4 text-gray-700 font-semibold">
                    {t.assignedClass || "—"}
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded shadow"
                      onClick={() => openModal("view", t)}
                    >
                      👁️
                    </button>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded shadow"
                      onClick={() => openModal("edit", t)}
                    >
                      ✏️
                    </button>
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded shadow"
                      onClick={() => openModal("assign", t)}
                    >
                      📚
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded shadow"
                      onClick={() => openModal("delete", t)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 p-6">
            No teachers found. Add new teachers to get started.
          </p>
        )}
      </motion.div>

      {/* 🔽 MODAL SECTION */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-8 w-[420px]"
            >
              {/* ADD / EDIT Modal */}
              {(modalType === "add" || modalType === "edit") && (
                <>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">
                    {modalType === "add" ? "Add Teacher" : "Edit Teacher"}
                  </h3>
                  <div className="space-y-4">
                    {["name", "subject", "email", "contact", "assignedClass"].map(
                      (field, i) => (
                        <input
                          key={i}
                          type="text"
                          placeholder={
                            field === "assignedClass"
                              ? "Assigned Class"
                              : field.charAt(0).toUpperCase() +
                                field.slice(1)
                          }
                          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                          value={formData[field]}
                          onChange={(e) =>
                            setFormData({ ...formData, [field]: e.target.value })
                          }
                        />
                      )
                    )}

                    <div className="flex justify-end space-x-2 pt-4">
                      <button
                        onClick={closeModal}
                        className="bg-gray-300 text-black hover:bg-gray-400 px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* VIEW Modal */}
              {modalType === "view" && selectedTeacher && (
                <>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">
                    Teacher Profile
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Name:</strong> {selectedTeacher.name}</p>
                    <p><strong>Subject:</strong> {selectedTeacher.subject}</p>
                    <p><strong>Email:</strong> {selectedTeacher.email}</p>
                    <p><strong>Contact:</strong> {selectedTeacher.contact}</p>
                    <p><strong>Assigned Class:</strong> {selectedTeacher.assignedClass || "Not Assigned"}</p>
                  </div>
                  <div className="text-right mt-5">
                    <button
                      onClick={closeModal}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}

              {/* ASSIGN CLASS Modal */}
              {modalType === "assign" && selectedTeacher && (
                <>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">
                    Assign Class
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Assign a class to{" "}
                    <strong>{selectedTeacher.name}</strong>:
                  </p>
                  <input
                    type="text"
                    placeholder="Enter class name (e.g., 8th A)"
                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-400 outline-none mb-4"
                    value={formData.assignedClass}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        assignedClass: e.target.value,
                      })
                    }
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={closeModal}
                      className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAssignClass}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      Assign
                    </button>
                  </div>
                </>
              )}

              {/* DELETE Modal */}
              {modalType === "delete" && selectedTeacher && (
                <>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">
                    Confirm Delete
                  </h3>
                  <p className="text-gray-700">
                    Are you sure you want to delete{" "}
                    <strong>{selectedTeacher.name}</strong>?
                  </p>
                  <div className="flex justify-end mt-6 space-x-2">
                    <button
                      onClick={closeModal}
                      className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
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
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageTeachers;
