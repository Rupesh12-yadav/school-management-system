import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDaysIcon, Clock, BookOpen, Download, Timer } from "lucide-react";

const ExamTimetable = () => {
  const [exams, setExams] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [currentExam, setCurrentExam] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        subject: "Mathematics",
        date: "2025-10-29",
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

  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  };

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
        const mins = Math.floor((diff / 1000 / 60) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        setCurrentExam(todayExam);
        setTimeLeft(`${mins}m ${secs}s`);
      } else if (now >= startTime && now <= endTime) {
        setTimeLeft("🕒 Exam Started!");
      } else {
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
    alert("✅ Timetable downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-100 p-6 flex flex-col items-center">

      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mb-8 gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <CalendarDaysIcon className="text-yellow-600 w-8 h-8" />
          <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-amber-700">
            📅 Royal School Exam Timetable
          </h1>
        </div>

        {/* Filter + Download */}
        <div className="flex gap-3 items-center">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border border-amber-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
          />
          <button
            onClick={() => setFilterDate("")}
            className="bg-yellow-100 px-3 py-2 rounded-lg hover:bg-yellow-200 text-sm"
          >
            Clear
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </motion.div>

      {/* Live Countdown */}
      <AnimatePresence>
        {currentExam && (
          <motion.div
            key={currentExam.id}
            className={`w-full max-w-6xl mb-6 p-5 rounded-xl text-center shadow-lg text-white
           ${
             timeLeft === "🕒 Exam Started!"
               ? "bg-gradient-to-r from-orange-500 to-yellow-600"
               : "bg-gradient-to-r from-green-500 to-lime-500"
           }`}
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: -20 }}
          >
            <motion.div
              className="flex justify-center items-center gap-2 text-lg font-semibold"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
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
      <div className="w-full max-w-6xl overflow-x-auto shadow-xl rounded-2xl bg-white/80 backdrop-blur-lg border border-yellow-200">
        <table className="min-w-full table-auto text-gray-700">
          <thead>
            <tr className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-sm md:text-base">
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
                className={`${index % 2 === 0 ? "bg-white" : "bg-yellow-50"} border-b hover:bg-yellow-100 transition-all`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="py-3 px-4 flex items-center gap-2 font-semibold">
                  <BookOpen className="text-yellow-600 w-4 h-4" />
                  {exam.subject}
                </td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <Clock className="text-gray-600 w-4 h-4" /> {exam.time}
                </td>
                <td className="py-3 px-4">{exam.room}</td>
                <td className="py-3 px-4 text-gray-700">{exam.invigilator}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <motion.div
        className="mt-8 text-gray-700 text-sm text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🏫 Academic Year: <b>2025</b> | Total Exams: <b>{filteredExams.length}</b>
      </motion.div>
    </div>
  );
};

export default ExamTimetable;
