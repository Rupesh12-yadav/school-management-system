import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "students", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Present", "Absent", "Leave"], required: true },
  remarks: { type: String }
}, { timestamps: true });

const Attendance = mongoose.model("studentAttendance", attendanceSchema);
export default Attendance;
