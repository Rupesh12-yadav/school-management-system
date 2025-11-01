import React, { useState, useEffect } from "react";
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
  const rate = filtered.length > 0 ? ((present / filtered.length) * 100).toFixed(1) : 0;

  const chartData = {
    labels: filtered.map((r) => r.date),
    datasets: [
      {
        label: "Attendance",
        data: filtered.map((r) => (r.status === "Present" ? 1 : 0)),
        borderColor: "#fbbf24",
        backgroundColor: "#facc15",
        pointBackgroundColor: filtered.map((r) =>
          r.status === "Present" ? "#16A34A" : "#DC2626"
        ),
        tension: 0.35,
        pointRadius: 5,
        borderWidth: 3,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-4 sm:p-6 md:p-10">

      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-yellow-700 mb-6 text-center md:text-left">
        📅 Attendance Overview
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="p-3 rounded-lg border w-full sm:w-52 border-gray-300 shadow-sm focus:ring-2 focus:ring-yellow-400"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="p-3 rounded-lg border w-full sm:w-52 border-gray-300 shadow-sm focus:ring-2 focus:ring-yellow-400"
        />

        <button
          onClick={() => {
            setFromDate("");
            setToDate("");
          }}
          className="bg-yellow-600 text-white font-semibold rounded-lg px-6 py-3 w-full sm:w-auto hover:bg-yellow-700"
        >
          Reset Filter
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow-md p-5 rounded-xl text-center border border-yellow-100 w-full">
          <h3 className="text-gray-600 font-semibold">✅ Present</h3>
          <p className="text-3xl font-bold text-green-600">{present}</p>
        </div>

        <div className="bg-white shadow-md p-5 rounded-xl text-center border border-yellow-100 w-full">
          <h3 className="text-gray-600 font-semibold">❌ Absent</h3>
          <p className="text-3xl font-bold text-red-600">{absent}</p>
        </div>

        <div className="bg-white shadow-md p-5 rounded-xl text-center border border-yellow-100 col-span-2 lg:col-span-1 w-full">
          <h3 className="text-gray-600 font-semibold">📊 Attendance</h3>
          <p className="text-3xl font-bold text-yellow-600">{rate}%</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white border border-yellow-100 p-6 rounded-xl shadow-md w-full">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">📈 Attendance Chart</h2>

        <div className="h-[250px] sm:h-[340px] lg:h-[400px]">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
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
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
