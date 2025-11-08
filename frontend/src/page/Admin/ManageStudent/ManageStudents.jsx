/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FiEdit, FiEye, FiTrash2, FiUpload } from "react-icons/fi";
import {
  useGetStudentsQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} from "../../../../Api/SchoolApi"; // ✅ RTK hooks

const ManageStudents = () => {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null); // ✅ Edit mode track karega
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
    class: "",
    section: "",
    rollNumber: "",
  });

  // ✅ RTK Query Hooks
  const { data: students = [], isLoading, isError, refetch } = useGetStudentsQuery();
  const [addStudent] = useAddStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add or Update Student
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // 🔹 Update Mode
        await updateStudent({ id: editingId, data: form }).unwrap();

        alert("✅ Student updated successfully!");
        setEditingId(null);
      } else {
        // 🔹 Add Mode
        await addStudent(form).unwrap();
        alert("🎉 Student added successfully!");
      }

      // Reset form
      setForm({
        name: "",
        lastname: "",
        email: "",
        password: "",
        mobile: "",
        class: "",
        section: "",
        rollNumber: "",
      });
      refetch();
    } catch (err) {
      console.error("❌ Operation failed:", err);
      alert("❌ Something went wrong");
    }
  };

  // ✅ Delete Student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await deleteStudent(id).unwrap();
      alert("🗑️ Student deleted successfully!");
      refetch();
    } catch (err) {
      console.error("Delete Error:", err);
      alert("❌ Error deleting student");
    }
  };

  // ✅ Edit Student (fill data in form)
  const handleEditClick = (student) => {
    setForm(student); // Form me uska data bhar do
    setEditingId(student._id); // Edit mode ON
    window.scrollTo({ top: 0, behavior: "smooth" }); // Form tak scroll
  };

  // ✅ Filter for search
  const filtered = students.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.lastname?.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNumber?.toLowerCase().includes(search.toLowerCase()) ||
      s.class?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <p className="p-6 text-gray-600">⏳ Loading students...</p>;
  if (isError) return <p className="p-6 text-red-600">❌ Error loading students.</p>;

  return (
    <div className="p-8 bg-gradient-to-br min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-[var(--text-secondary)]">
        🎓 Manage Students
      </h2>

      {/* ✅ Add / Update Student Form */}
      <div
        className={`rounded-2xl shadow-md p-6 mb-6 transition-all duration-300 ${
          editingId ? "bg-yellow-50 border border-yellow-400" : "bg-white"
        }`}
      >
        <form onSubmit={handleAddStudent} className="flex flex-wrap items-center gap-3">
          {[
            { name: "name", placeholder: "First Name" },
            { name: "lastname", placeholder: "Last Name" },
            { name: "email", placeholder: "Email (optional)", type: "email" },
            { name: "password", placeholder: "Password", type: "password" },
            { name: "mobile", placeholder: "Mobile" },
            { name: "class", placeholder: "Class" },
            { name: "section", placeholder: "Section" },
            { name: "rollNumber", placeholder: "Roll No" },
          ].map((input) => (
            <input
              key={input.name}
              type={input.type || "text"}
              name={input.name}
              placeholder={input.placeholder}
              value={form[input.name] || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-2 w-[180px] focus:ring-2 focus:ring-blue-500 outline-none"
              required={input.name !== "email" && input.name !== "mobile"}
            />
          ))}

          <button
            type="submit"
            className={`${
              editingId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-200`}
          >
            {editingId ? "✏️ Update Student" : "➕ Add Student"}
          </button>

          {!editingId && (
            <button
              type="button"
              className="flex items-center gap-2 bg-[var(--button-uplode)] text-white hover:bg-[var(--button-ulode-hover)] px-4 py-2 rounded-xl shadow-md"
            >
              <FiUpload /> Upload Excel
            </button>
          )}
        </form>
      </div>

      {/* ✅ Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="🔍 Search by name, class, or roll no"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border w-full md:w-1/2 rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-yellow-400 outline-none"
        />
      </div>

      {/* ✅ Students Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-y-auto max-h-[60vh]">
        {filtered.length > 0 ? (
          <table className="w-full border-collapse text-gray-800">
            <thead
              className="sticky top-0 bg-gradient-to-r"
              style={{ background: "var(--gradient-yellow)" }}
            >
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Class</th>
                <th className="p-3 text-left">Section</th>
                <th className="p-3 text-left">Roll No</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s._id} className="border-b hover:bg-yellow-50 transition-all">
                  <td className="p-3">{s.name} {s.lastname}</td>
                  <td className="p-3">{s.class}</td>
                  <td className="p-3">{s.section}</td>
                  <td className="p-3">{s.rollNumber}</td>
                  <td className="p-3">{s.mobile}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3 flex gap-3">
                    <button className="text-blue-600 hover:text-blue-800"><FiEye /></button>
                    <button
                      onClick={() => handleEditClick(s)}
                      className="text-amber-500 hover:text-amber-700"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center p-4">No students found</p>
        )}
      </div>
    </div>
  );
};

export default ManageStudents;
