import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiEye, FiTrash2, FiUpload } from "react-icons/fi";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
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

  // ✅ Fetch all students
  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:3000/api/admin/students/student/all",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
      alert("❌ Failed to load students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add new student
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/api/admin/students/student/add",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 201) {
        alert("🎉 Student added successfully!");
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
        fetchStudents();
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add student");
    }
  };

  // ✅ Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:3000/api/admin/students/student/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200 || res.status === 204) {
        alert("🗑️ Student deleted successfully!");
        fetchStudents();
      } else {
        alert("⚠️ Something went wrong while deleting.");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert("❌ Error deleting student. Check console for details.");
    }
  };

  // ✅ Search Filter
  const filtered = students.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.lastname?.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNumber?.toLowerCase().includes(search.toLowerCase()) ||
      s.class?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gradient-to-br min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-[var(--text-secondary)]">🎓 Manage Students</h2>

      {/* ✅ Add Student Form */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <form
          onSubmit={handleAddStudent}
          className="flex flex-wrap items-center gap-3"
        >
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
              value={form[input.name]}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-2 w-[180px] focus:ring-2 focus:ring-blue-500 outline-none"
              required={input.name !== "email" && input.name !== "mobile"}
            />
          ))}

          <button
            type="submit"
            className=" bg-[var(--button-primary-text)] text-[var(--button-primary-bg)] font-semibold px-5 py-2 rounded-xl shadow-md"
          >
            ➕ Add Student
          </button>    

          <button
            type="button"
            className="flex items-center gap-2 bg-[var(--sidebar-active)] text-[var(--button-primary-bg)]  hover:bg-[var(--button-primary-text)]  px-4 py-2 rounded-xl shadow-md"
          >
            <FiUpload /> Uploade
          </button>
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
            <thead className="sticky top-0 bg-gradient-to-r from-yellow-200 to-yellow-100 text-gray-800">
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
                <tr
                  key={s._id}
                  className="border-b hover:bg-yellow-50 transition-all"
                >
                  <td className="p-3">
                    {s.name} {s.lastname}
                  </td>
                  <td className="p-3">{s.class}</td>
                  <td className="p-3">{s.section}</td>
                  <td className="p-3">{s.rollNumber}</td>
                  <td className="p-3">{s.mobile}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3 flex gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FiEye />
                    </button>
                    <button className="text-amber-500 hover:text-amber-700">
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
