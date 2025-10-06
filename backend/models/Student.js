import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = new mongoose.Schema({
  // User info embedded
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, unique: true, sparse: true },
  role: { type: String, default: "Student" },

  // Student specific info
  class: { type: String, required: true },
  section: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },

  attendance: [{
    date: Date,
    status: { type: String, enum: ["Present", "Absent", "Leave"] },
    remarks: String
  }],

  homework: [{ type: mongoose.Schema.Types.ObjectId, ref: "Homework" }],
  examResults: [{
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
    marks: Number,
    grade: String
  }],
  leaveRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "LeaveRequest" }]
}, { timestamps: true });

// Auto email generation before save
studentSchema.pre("save", async function (next) {
  // Agar email nahi hai to automatically generate karein
  if (!this.email) {
    const nameClean = this.name.toLowerCase().replace(/[^a-z]/g, '');
    const lastnameClean = this.lastname.toLowerCase().replace(/[^a-z]/g, '');
    
    let baseEmail = `${nameClean}.${lastnameClean}`;
    let finalEmail = `${baseEmail}@college.edu`;
    let counter = 1;
    
    // Duplicate email check karein
    while (await mongoose.models.students.findOne({ email: finalEmail })) {
      finalEmail = `${baseEmail}${counter}@college.edu`;
      counter++;
    }
    
    this.email = finalEmail;
  }
  next();
});

// Password hashing before save
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password verification
studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Student = mongoose.model("students", studentSchema);
export default Student;