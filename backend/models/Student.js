const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  attendance: { type: Number, default: 0 }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
