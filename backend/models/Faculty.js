const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  isAdmin: { type: Boolean, default: false }
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
