import mongoose from "mongoose";

const teacherAttendanceSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Present", "Absent", "Leave"], required: true },
  remarks: { type: String }
}, { timestamps: true });

const TeacherAttendance = mongoose.model("TeacherAttendance", teacherAttendanceSchema);
export default TeacherAttendance;
