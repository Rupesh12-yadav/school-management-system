const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Student ka ID
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, // Approving teacher ka ID
    reason: { type: String, required: true }, // Leave ka reason
    startDate: { type: Date, required: true }, // Leave start date
    endDate: { type: Date, required: true },   // Leave end date
    status: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending' 
    }, // Leave status
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);
