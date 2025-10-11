import mongoose from "mongoose";
import TeacherAttendance from "../models/AttendTeacher.js";
import Teacher from "../models/Teacher.js";

// 1️⃣ Add Teacher Attendance (secure & one per day)
export const addTeacherAttendance = async (req, res) => {
  try {
    const { teacherId, status, remarks, date } = req.body;

    // Check if teacherId is valid ObjectId
    if (!teacherId || !mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: "Invalid teacherId" });
    }

    // Check if teacher exists in DB
    const teacherExists = await Teacher.findById(teacherId);
    if (!teacherExists) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Validate status
    if (!status || !["Present", "Absent", "Leave"].includes(status)) {
      return res.status(400).json({ message: "Valid status is required" });
    }

    // Check if attendance already exists for this teacher on the same day
    const attendanceDate = date ? new Date(date) : new Date();
    attendanceDate.setHours(0, 0, 0, 0);

    const existingAttendance = await TeacherAttendance.findOne({
      teacher: teacherId,
      date: {
        $gte: attendanceDate,
        $lt: new Date(attendanceDate.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (existingAttendance) {
      return res.status(400).json({ message: "Attendance already marked for today" });
    }

    // Create attendance
    const attendance = await TeacherAttendance.create({
      teacher: teacherId,
      date: date || new Date(),
      status,
      remarks
    });

    // Update teacher document
    await Teacher.findByIdAndUpdate(teacherId, {
      $push: { attendance: attendance._id }
    });

    res.status(201).json({ message: "Teacher attendance added", attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// 2️⃣ Get Teacher Attendance
export const getTeacherAttendance = async (req, res) => {
  try {
    const { teacherId } = req.params;

    if (!teacherId || !mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: "Invalid teacherId" });
    }

    const teacher = await Teacher.findById(teacherId)
      .populate("attendance")
      .exec();

    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    res.status(200).json({ attendance: teacher.attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};
