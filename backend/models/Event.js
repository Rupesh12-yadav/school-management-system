// backend/models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },          // Event ka naam
    date: { type: Date, required: true },            // Event ki date
    description: { type: String },                   // Event ka description
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }, // Admin ya Teacher jo event create kare
    audience: { type: String, enum: ["All", "Students", "Teachers"], default: "All" }, // Kis ke liye event hai
    isHoliday: { type: Boolean, default: false },   // Agar school holiday hai to true
    location: { type: String },                      // Event ka location
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
