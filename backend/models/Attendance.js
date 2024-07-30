const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    attendance: { type: Number, default: 0 }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;