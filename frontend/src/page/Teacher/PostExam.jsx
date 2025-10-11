import React, { useState } from "react";
import { motion } from "framer-motion"; // eslint-disable-line

const PostExam = () => {
  const [examType, setExamType] = useState("");
  const [headings, setHeadings] = useState([]);
  const [newHeading, setNewHeading] = useState("");
  const [editingHeadingIndex, setEditingHeadingIndex] = useState(-1);
  const [editingHeadingValue, setEditingHeadingValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [rowData, setRowData] = useState({});
  const [editingRowIndex, setEditingRowIndex] = useState(-1);

  // ----- Headings -----
  const handleAddHeading = () => {
    const heading = newHeading.trim();
    if (!heading) return alert("Heading empty nahi ho sakta.");
    if (headings.includes(heading)) return alert("Ye heading already exists.");
    setHeadings([...headings, heading]);
    setNewHeading("");
  };

  const handleDeleteHeading = (idx) => {
    if (!confirm("Delete heading? Related data bhi delete ho jayega.")) return;
    const h = [...headings];
    const removed = h.splice(idx, 1);
    setHeadings(h);
    const newTable = tableData.map((row) => {
      const copy = { ...row };
      delete copy[removed[0]];
      return copy;
    });
    setTableData(newTable);
  };

  const handleStartEditHeading = (idx) => {
    setEditingHeadingIndex(idx);
    setEditingHeadingValue(headings[idx]);
  };

  const handleSaveEditedHeading = () => {
    const val = editingHeadingValue.trim();
    if (!val) return alert("Heading empty nahi ho sakta.");
    if (headings.some((h, i) => h === val && i !== editingHeadingIndex))
      return alert("Same naam ka heading already exists.");
    const h = [...headings];
    const oldKey = h[editingHeadingIndex];
    h[editingHeadingIndex] = val;
    setHeadings(h);

    const newTable = tableData.map((row) => {
      const copy = { ...row };
      copy[val] = copy[oldKey] ?? "";
      if (oldKey in copy) delete copy[oldKey];
      return copy;
    });
    setTableData(newTable);
    setEditingHeadingIndex(-1);
    setEditingHeadingValue("");
  };

  // ----- Rows -----
  const handleRowChange = (heading, value) => {
    setRowData((prev) => ({ ...prev, [heading]: value }));
  };

  const handleAddOrSaveRow = () => {
    if (headings.length === 0) return alert("Pehle headings add karo.");
    const missing = headings.filter((h) => !(rowData[h] && String(rowData[h]).trim() !== ""));
    if (missing.length > 0) return alert("Please fill: " + missing.join(", "));

    if (editingRowIndex === -1) {
      setTableData((prev) => [...prev, { ...rowData }]);
      setRowData({});
    } else {
      const t = [...tableData];
      t[editingRowIndex] = { ...rowData };
      setTableData(t);
      setEditingRowIndex(-1);
      setRowData({});
    }
  };

  const handleEditRow = (idx) => {
    setEditingRowIndex(idx);
    setRowData({ ...tableData[idx] });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteRow = (idx) => {
    if (!confirm("Delete row?")) return;
    const t = [...tableData];
    t.splice(idx, 1);
    setTableData(t);
  };

  const handleCancelEditHeading = () => {
    setEditingHeadingIndex(-1);
    setEditingHeadingValue("");
  };

  const handleCancelEditRow = () => {
    setEditingRowIndex(-1);
    setRowData({});
  };

  const handlePostExam = () => {
    if (!examType) return alert("Exam type select karo.");
    if (headings.length === 0) return alert("Add headings first.");
    if (tableData.length === 0) return alert("Add some exam data first.");
    console.log("Posting exam:", { examType, headings, tableData });
    alert("Exam posted (check console).");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-[calc(100vh-2rem)] bg-gradient-to-br from-blue-50 to-blue-100 py-6"
    >
      <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6 text-center">
          Post Exam
        </h1>

        {/* Exam Type */}
        <div className="mb-6 flex flex-wrap items-center gap-4 justify-center md:justify-start">
          <span className="font-semibold text-gray-700">Select Exam Type:</span>
          {["Quarterly", "Half-Yearly", "Annual"].map((type) => (
            <label key={type} className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="examType"
                value={type}
                checked={examType === type}
                onChange={(e) => setExamType(e.target.value)}
                className="accent-blue-600"
              />
              {type}
            </label>
          ))}
        </div>

        {/* Headings */}
        <div className="mb-6">
          <h2 className="font-semibold text-gray-700 mb-3">Add Headings for Exam Table</h2>
          <div className="flex gap-2 flex-wrap mb-3">
            <input
              type="text"
              placeholder="Enter heading e.g. Subject, Date, Total Marks, Day"
              value={newHeading}
              onChange={(e) => setNewHeading(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 flex-1 focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition" onClick={handleAddHeading}>
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {headings.map((h, idx) =>
              editingHeadingIndex === idx ? (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    value={editingHeadingValue}
                    onChange={(e) => setEditingHeadingValue(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                  <button onClick={handleSaveEditedHeading} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                  <button onClick={handleCancelEditHeading} className="bg-gray-200 px-3 py-1 rounded">Cancel</button>
                </div>
              ) : (
                <div key={idx} className="bg-blue-50 border border-blue-100 px-3 py-1 rounded-full flex items-center gap-1 text-sm md:text-base">
                  <span className="text-blue-800 font-medium">{h}</span>
                  <button onClick={() => handleStartEditHeading(idx)} className="text-blue-600 px-1">Edit</button>
                  <button onClick={() => handleDeleteHeading(idx)} className="text-red-600 px-1">Del</button>
                </div>
              )
            )}
          </div>
        </div>

        {/* Exam Data Input */}
        {headings.length > 0 && (
          <div className="mb-6">
            <h2 className="font-semibold text-gray-700 mb-2">Add / Edit Exam Data</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-xl shadow-sm">
                <thead className="bg-blue-50">
                  <tr>
                    {headings.map((h, idx) => (
                      <th key={idx} className="px-4 py-2 text-left text-gray-700 font-medium border">{h}</th>
                    ))}
                    <th className="px-4 py-2 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {headings.map((h, idx) => (
                      <td key={idx} className="px-2 py-1 border">
                        <input
                          type="text"
                          value={rowData[h] || ""}
                          onChange={(e) => handleRowChange(h, e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-400 text-sm"
                          placeholder={h}
                        />
                      </td>
                    ))}
                    <td className="px-2 py-1 border text-center">
                      {editingRowIndex === -1 ? (
                        <button onClick={handleAddOrSaveRow} className="bg-indigo-600 text-white px-3 py-1 rounded mr-1 text-sm">Add</button>
                      ) : (
                        <>
                          <button onClick={handleAddOrSaveRow} className="bg-green-600 text-white px-3 py-1 rounded mr-1 text-sm">Save</button>
                          <button onClick={handleCancelEditRow} className="bg-gray-200 px-2 py-1 rounded text-sm">Cancel</button>
                        </>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Preview */}
        {tableData.length > 0 && (
          <div className="mb-4">
            <h2 className="font-semibold text-gray-700 mb-2">Preview Exam Table</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-xl shadow-sm">
                <thead className="bg-blue-50">
                  <tr>
                    {headings.map((h, idx) => (
                      <th key={idx} className="px-4 py-2 text-left text-gray-700 font-medium border">{h}</th>
                    ))}
                    <th className="px-4 py-2 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, rIdx) => (
                    <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                      {headings.map((h, cIdx) => (
                        <td key={cIdx} className="px-2 py-1 border text-sm">{row[h]}</td>
                      ))}
                      <td className="px-2 py-1 border text-center">
                        <button onClick={() => handleEditRow(rIdx)} className="text-sm text-blue-600 mr-2">Edit</button>
                        <button onClick={() => handleDeleteRow(rIdx)} className="text-sm text-red-600">Del</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button onClick={() => alert("Preview ready")} className="bg-gray-200 px-4 py-2 rounded-xl text-sm md:text-base">Preview</button>
          <button onClick={handlePostExam} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold text-sm md:text-base">Post Exam</button>
        </div>
      </div>
    </motion.div>
  );
};

export default PostExam;
