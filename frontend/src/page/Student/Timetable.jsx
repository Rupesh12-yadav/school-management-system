import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDaysIcon, Clock, BookOpen, Download, Timer } from "lucide-react";

const ExamTimetable = () => {
  const [exams, setExams] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [currentExam, setCurrentExam] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // Mock Exam Data
    const mockData = [
      {
        id: 1,
        subject: "Mathematics",
        date: "2025-10-29", // today's date for testing
        time: "10:09 AM - 10:10 AM",
        room: "Room 201",
        invigilator: "Mr. Sharma",
      },
      {
        id: 2,
        subject: "Physics",
        date: "2025-11-07",
        time: "10:00 AM - 12:00 PM",
        room: "Room 305",
        invigilator: "Dr. Meena",
      },
      {
        id: 3,
        subject: "Computer Science",
        date: "2025-11-09",
        time: "01:00 PM - 03:00 PM",
        room: "Lab A1",
        invigilator: "Prof. Verma",
      },
    ];
    setExams(mockData);
  }, []);

  // Helper — convert "12:00 PM" to Date object
  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  };

  // Timer logic with remove animation after exam start
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const todayExam = exams.find(
        (exam) => exam.date === now.toISOString().split("T")[0]
      );

      if (!todayExam) {
        setCurrentExam(null);
        setTimeLeft("");
        return;
      }

      const startTime = parseTime(todayExam.time.split(" - ")[0]);
      const endTime = parseTime(todayExam.time.split(" - ")[1]);
      const diff = startTime - now;

      if (diff > 0 && diff <= 60 * 60 * 1000) {
        // 1 hour before exam
        setCurrentExam(todayExam);
        const mins = Math.floor((diff / 1000 / 60) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${mins}m ${secs}s`);
      } else if (now >= startTime && now <= endTime) {
        // during exam — show “Exam Started”
        setTimeLeft("🕒 Exam Started!");
      } else {
        // after exam — remove timer smoothly
        setTimeout(() => setCurrentExam(null), 1000);
        setTimeLeft("");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [exams]);

  const filteredExams = filterDate
    ? exams.filter((exam) => exam.date === filterDate)
    : exams;

  const handleDownload = () => {
    alert("📄 Report downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 flex flex-col items-center">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mb-8 gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <CalendarDaysIcon className="text-blue-600 w-8 h-8" />
          <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
            📅 Exam Timetable
          </h1>
        </div>

        {/* Filter & Download */}
        <div className="flex gap-3 items-center">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={() => setFilterDate("")}
            className="bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 text-sm"
          >
            Clear
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </motion.div>

      {/* Animated Timer */}
      <AnimatePresence>
        {currentExam && (
          <motion.div
            key={currentExam.id}
            className={`w-full max-w-6xl mb-6 p-5 rounded-xl text-center shadow-lg
            ${
              timeLeft === "🕒 Exam Started!"
                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                : "bg-gradient-to-r from-green-500 to-teal-500"
            } text-white`}
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="flex justify-center items-center gap-2 text-lg font-semibold"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <Timer className="animate-pulse w-5 h-5" />
              {timeLeft === "🕒 Exam Started!" ? (
                <span>🚀 Exam <b>{currentExam.subject}</b> has started!</span>
              ) : (
                <span>
                  Exam <b>{currentExam.subject}</b> starts in <b>{timeLeft}</b>
                </span>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="w-full max-w-6xl overflow-x-auto shadow-xl rounded-2xl bg-white/80 backdrop-blur-lg border border-gray-100">
        <table className="min-w-full table-auto text-gray-700">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm md:text-base">
              <th className="py-3 px-4 text-left">Subject</th>
              <th className="py-3 px-4 text-left">Time</th>
              <th className="py-3 px-4 text-left">Room</th>
              <th className="py-3 px-4 text-left">Invigilator</th>
            </tr>
          </thead>
          <tbody>
            {filteredExams.map((exam, index) => (
              <motion.tr
                key={exam.id}
                className={`border-b hover:bg-blue-50 transition-all ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="py-3 px-4 font-semibold flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  {exam.subject}
                </td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  {exam.time}
                </td>
                <td className="py-3 px-4">{exam.room}</td>
                <td className="py-3 px-4 text-gray-600">{exam.invigilator}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <motion.div
        className="mt-8 text-gray-600 text-sm text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Total Exams: <b>{filteredExams.length}</b> | Last Updated:{" "}
        <b>Oct 29, 2025</b>
      </motion.div>
    </div>
  );
};

export default ExamTimetable;
