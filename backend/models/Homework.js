// backend/models/Homework.js
import mongoose from "mongoose";

const homeworkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    dueDate: Date
}, { timestamps: true });

export default mongoose.model("Homework", homeworkSchema);
