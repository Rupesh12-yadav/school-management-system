import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "Teacher" },
  mobile: { type: String, unique: true },
  location: { type: String },
  experience: { type: Number },
  subjects: [String],
<<<<<<< HEAD
<<<<<<< HEAD

  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  homeworkCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Homework" }],
  marksUploaded: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],
  leaveRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "LeaveRequest" }],
  Attentions: [{ type: mongoose.Schema.Types.ObjectId, ref: "TeacherAttendance" }]
}, { timestamps: true });

// Password hashing before save
teacherSchema.pre("save", async function (next) {
=======
=======

>>>>>>> 7cd3b19 (All api working)
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  homeworkCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Homework" }],
  marksUploaded: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],
  leaveRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "LeaveRequest" }],
  Attentions: [{ type: mongoose.Schema.Types.ObjectId, ref: "TeacherAttendance" }]
}, { timestamps: true });

// Password hashing before save
<<<<<<< HEAD
teacherSchema.pre("save", async function(next) {
>>>>>>> a1fd582
=======
teacherSchema.pre("save", async function (next) {
>>>>>>> 7cd3b19 (All api working)
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
<<<<<<< HEAD
<<<<<<< HEAD
// Password verification
teacherSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Teacher = mongoose.model("Teacher", teacherSchema);
=======

=======
>>>>>>> 7cd3b19 (All api working)
// Password verification
teacherSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

<<<<<<< HEAD
const Teacher= mongoose.model("Teacher", teacherSchema);
>>>>>>> a1fd582
=======
const Teacher = mongoose.model("Teacher", teacherSchema);
>>>>>>> 7cd3b19 (All api working)
export default Teacher;