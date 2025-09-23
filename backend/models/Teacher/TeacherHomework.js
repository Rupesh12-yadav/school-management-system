const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    class: { type: String, required: true },
    section: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Homework', homeworkSchema);
