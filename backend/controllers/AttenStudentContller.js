import mongoose from "mongoose";
import Attendance from "../models/AttendStudent.js";
import Student from "../models/Student.js";

// 1️⃣ Add Student Attendance (secure & one per day)
export const addStudentAttendance = async (req, res) => {
  try {
    const { studentId, status, remarks, date } = req.body;

    // Check if studentId is valid ObjectId
    if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid studentId" });
    }

    // Check if student exists in DB
    const studentExists = await Student.findById(studentId);
    if (!studentExists) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Validate status
    if (!status || !["Present", "Absent", "Leave"].includes(status)) {
      return res.status(400).json({ message: "Valid status is required" });
    }

    // Check if attendance already exists for this student on the same day
    const attendanceDate = date ? new Date(date) : new Date();
    attendanceDate.setHours(0, 0, 0, 0);

    const existingAttendance = await Attendance.findOne({
      student: studentId,
      date: {
        $gte: attendanceDate,
        $lt: new Date(attendanceDate.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (existingAttendance) {
      return res.status(400).json({ message: "Attendance already marked for today" });
    }

    // Create attendance
    const attendance = await Attendance.create({
      student: studentId,
      date: date || new Date(),
      status,
      remarks
    });

    // Update student document
    await Student.findByIdAndUpdate(studentId, {
      $push: { attendance: attendance._id }
    });

    res.status(201).json({ message: "Student attendance added", attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// 2️⃣ Get Student Attendance
export const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid studentId" });
    }

    const student = await Student.findById(studentId)
      .populate("attendance")
      .exec();

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ attendance: student.attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};
