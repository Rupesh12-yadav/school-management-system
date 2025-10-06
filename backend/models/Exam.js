// backend/models/Exam.js
import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  subjectName: { type: String, required: true },
  examDate: { type: Date, required: true },
  examDay: { type: String, required: true }, // "Monday", "Tuesday" etc.
  totalMarks: { type: Number, required: true },
  marks: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      mark: Number,
      grade: String
    }
  ]
}, { timestamps: true });

export default mongoose.model("Exam", examSchema);
