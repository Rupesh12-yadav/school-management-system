import mongoose from "mongoose";

const leaveRequestSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  reason: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
}, { timestamps: true });

export default mongoose.model("LeaveRequest", leaveRequestSchema);
