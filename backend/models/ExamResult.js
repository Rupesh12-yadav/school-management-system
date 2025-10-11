// backend/models/ExamResult.js
import mongoose from "mongoose";

const examResultSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  marks: { type: Number, required: true },
  grade: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true }
}, { timestamps: true });

export default mongoose.model("ExamResult", examResultSchema);
