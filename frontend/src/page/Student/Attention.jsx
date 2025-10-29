import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const mock = [
      { date: "2025-10-01", status: "Present" },
      { date: "2025-10-02", status: "Absent" },
      { date: "2025-10-03", status: "Present" },
      { date: "2025-10-04", status: "Present" },
      { date: "2025-10-05", status: "Absent" },
    ];
    setAttendance(mock);
  }, []);

  const filtered = attendance.filter((r) => {
    if (!fromDate || !toDate) return true;
    const d = new Date(r.date);
    return d >= new Date(fromDate) && d <= new Date(toDate);
  });

  const present = filtered.filter((r) => r.status === "Present").length;
  const absent = filtered.length - present;
  const rate = ((present / filtered.length) * 100).toFixed(1);

  const chartData = {
    labels: filtered.map((r) => r.date),
    datasets: [
      {
        label: "Attendance",
        data: filtered.map((r) => (r.status === "Present" ? 1 : 0)),
        borderColor: "#3B82F6",
        backgroundColor: filtered.map((r) =>
          r.status === "Present" ? "#16A34A" : "#DC2626"
        ),
        tension: 0.4,
        pointRadius: 6,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-100 to-blue-100 flex flex-col items-center p-6">
      {/* Header */}
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        📅 Attendance Overview
      </motion.h1>

      {/* Filter Section */}
      <motion.div
        className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 w-full"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 w-full"
        />
        <button className="bg-blue-600 text-white font-semibold rounded-xl px-6 py-3 shadow hover:bg-blue-700 transition-all">
          Apply Filter
        </button>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl mb-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/70 backdrop-blur-xl shadow-lg rounded-2xl p-6 border border-gray-100"
        >
          <h3 className="text-gray-600 font-semibold">✅ Present Days</h3>
          <p className="text-3xl font-bold text-green-600">{present}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/70 backdrop-blur-xl shadow-lg rounded-2xl p-6 border border-gray-100"
        >
          <h3 className="text-gray-600 font-semibold">❌ Absent Days</h3>
          <p className="text-3xl font-bold text-red-600">{absent}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/70 backdrop-blur-xl shadow-lg rounded-2xl p-6 border border-gray-100"
        >
          <h3 className="text-gray-600 font-semibold">📊 Attendance Rate</h3>
          <p className="text-3xl font-bold text-blue-600">{rate}%</p>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div
        className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl w-full max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          📈 Attendance Chart
        </h2>
        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              y: {
                ticks: {
                  stepSize: 1,
                  callback: (value) => (value === 1 ? "Present" : "Absent"),
                },
              },
            },
            plugins: {
              legend: { display: false },
            },
          }}
        />
      </motion.div>
    </div>
  );
};

export default AttendancePage;
