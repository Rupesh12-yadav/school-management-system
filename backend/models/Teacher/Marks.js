const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    subject: { type: String, required: true },
    marks: { type: Number, required: true },
    examDate: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Marks', marksSchema);
