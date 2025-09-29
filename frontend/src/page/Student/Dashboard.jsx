import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // eslint-disable-line
import Student_img from "../../assets/student.jpg";
import { 
  FaBook, 
  FaClipboardList, 
  FaBullhorn, 
  FaCalendarAlt, 
  FaGraduationCap, 
  FaRegCalendarCheck 
} from "react-icons/fa";

const Dashboard = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Profile Section */}
      {/* Profile Info */}
<div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full">
  {/* Image + Role */}
  <div className="flex flex-col items-center gap-2">
    <img
      src={Student_img}
      alt="Profile"
      className="w-28 h-28 rounded-full object-cover border-2 border-gray-300 shadow-md"
    />
    {/* Role below image */}
    <p className="text-indigo-500 font-medium mt-1 capitalize">
      Role: {user?.role || "Student"}
    </p>
  </div>

  {/* Other Profile Info */}
  <div className="text-center sm:text-left flex-1 sm:ml-6 space-y-2">
    <h2 className="text-3xl font-semibold text-gray-800">{user?.email || "Shivangi Gour"}</h2>
    <p className="text-gray-600">
      <span className="font-semibold">School:</span> Gyan Ganga School
    </p>
    <p className="text-gray-600">
      <span className="font-semibold">Address:</span> Harda
    </p>
  </div>




  {/* Logout Button */}
  <motion.button
    onClick={handleLogout}
    whileHover={{ scale: 1.05, backgroundColor: "#f87171" }}
    className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-red-400 transition mt-4 sm:mt-0"
  >
    Logout
  </motion.button>
</div>


      {/* Options Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        <motion.div 
          variants={cardVariants} 
          initial="hidden" 
          animate="visible" 
          whileHover="hover"
          className="bg-white/70 backdrop-blur-md rounded-xl p-6 flex flex-col items-center cursor-pointer border border-gray-200 shadow-sm hover:shadow-lg transition"
        >
          <FaBook className="text-indigo-500 text-4xl mb-3" />
          <p className="font-semibold text-gray-700">Today's Homework</p>
        </motion.div>

        <motion.div 
          variants={cardVariants} 
          initial="hidden" 
          animate="visible" 
          whileHover="hover"
          className="bg-white/70 backdrop-blur-md rounded-xl p-6 flex flex-col items-center cursor-pointer border border-gray-200 shadow-sm hover:shadow-lg transition"
        >
          <FaClipboardList className="text-green-500 text-4xl mb-3" />
          <p className="font-semibold text-gray-700">Attendance Report</p>
        </motion.div>

        <motion.div 
          variants={cardVariants} 
          initial="hidden" 
          animate="visible" 
          whileHover="hover"
          className="bg-white/70 backdrop-blur-md rounded-xl p-6 flex flex-col items-center cursor-pointer border border-gray-200 shadow-sm hover:shadow-lg transition"
        >
          <FaBullhorn className="text-yellow-500 text-4xl mb-3" />
          <p className="font-semibold text-gray-700">View Notice</p>
        </motion.div>

        <motion.div 
          variants={cardVariants} 
          initial="hidden" 
          animate="visible" 
          whileHover="hover"
          className="bg-white/70 backdrop-blur-md rounded-xl p-6 flex flex-col items-center cursor-pointer border border-gray-200 shadow-sm hover:shadow-lg transition"
        >
          <FaCalendarAlt className="text-purple-500 text-4xl mb-3" />
          <p className="font-semibold text-gray-700">Exam Timetable</p>
        </motion.div>

        <motion.div 
          variants={cardVariants} 
          initial="hidden" 
          animate="visible" 
          whileHover="hover"
          className="bg-white/70 backdrop-blur-md rounded-xl p-6 flex flex-col items-center cursor-pointer border border-gray-200 shadow-sm hover:shadow-lg transition"
        >
          <FaGraduationCap className="text-pink-500 text-4xl mb-3" />
          <p className="font-semibold text-gray-700">View Result</p>
        </motion.div>

        <motion.div 
          variants={cardVariants} 
          initial="hidden" 
          animate="visible" 
          whileHover="hover"
          className="bg-white/70 backdrop-blur-md rounded-xl p-6 flex flex-col items-center cursor-pointer border border-gray-200 shadow-sm hover:shadow-lg transition"
        >
          <FaRegCalendarCheck className="text-red-500 text-4xl mb-3" />
          <p className="font-semibold text-gray-700">Request for Leave</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
