import React from "react";
import { FaBook, FaClipboardList, FaBullhorn, FaCalendarAlt, FaGraduationCap, FaRegCalendarCheck } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Profile Section */}
      <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6">
        {/* Profile Image */}
        <div>
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div>
          <h2 className="text-2xl font-bold">Sophia Clark</h2>
          <p className="text-blue-500 font-medium">Class 10A</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2 text-gray-700">
            <p>
              <span className="font-semibold">Father's Name:</span> Robert Clark
            </p>
            <p>
              <span className="font-semibold">Mother's Name:</span> Emily Clark
            </p>
          </div>
          <p className="text-gray-700">
            <span className="font-semibold">School Name:</span> Greenwood High School
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Address:</span> 123 Maple Street, Anytown, USA
          </p>
        </div>
      </div>

      {/* Options Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition">
          <FaBook className="text-blue-500 text-3xl mb-2" />
          <p className="font-medium">Today's Homework</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition">
          <FaClipboardList className="text-blue-500 text-3xl mb-2" />
          <p className="font-medium">Attendance Report</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition">
          <FaBullhorn className="text-blue-500 text-3xl mb-2" />
          <p className="font-medium">View Notice</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition">
          <FaCalendarAlt className="text-blue-500 text-3xl mb-2" />
          <p className="font-medium">Exam Timetable</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition">
          <FaGraduationCap className="text-blue-500 text-3xl mb-2" />
          <p className="font-medium">View Result</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition">
          <FaRegCalendarCheck className="text-blue-500 text-3xl mb-2" />
          <p className="font-medium">Request for Leave</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
