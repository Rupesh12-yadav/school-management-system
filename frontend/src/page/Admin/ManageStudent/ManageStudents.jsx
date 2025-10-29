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
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
    <div className="p-6 bg-gray-50 min-h-screen overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Manage Students</h2>

      {/* ✅ Add Student Form */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <form onSubmit={handleAddStudent} className="flex gap-2 flex-wrap">
          <input
            type="text"
            name="name"
            placeholder="First Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={form.lastname}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={form.mobile}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
          <input
            type="text"
            name="class"
            placeholder="Class"
            value={form.class}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
          <input
            type="text"
            name="section"
            placeholder="Section"
            value={form.section}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
          <input
            type="text"
            name="rollNumber"
            placeholder="Roll No"
            value={form.rollNumber}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </form>

        {/* ✅ Excel Upload */}
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
          <FiUpload /> Upload Excel
        </button>
      </div>

      {/* ✅ Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search by name, class, or roll no"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border w-full md:w-1/2 rounded-lg p-2 shadow-sm"
        />
      </div>

      {/* ✅ Students Table */}
      <div className="bg-white shadow-md rounded-lg overflow-y-auto max-h-[60vh]">
        {filtered.length > 0 ? (
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-slate-800 text-white z-10">
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
                  className="border-b hover:bg-gray-100 transition-all"
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
                    <button className="text-yellow-500 hover:text-yellow-700">
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
